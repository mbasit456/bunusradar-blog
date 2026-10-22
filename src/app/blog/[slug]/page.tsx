import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { getPostBySlug, getAllPosts, getPostsByCategory } from '@/lib/posts';
import { getAuthorBySlug, resolveAuthorSlug } from '@/lib/authors';
import { getCategoryBySlug } from '@/lib/categories';
import { resolveArticleEntities, formatEntityForSchema } from '@/lib/entities';
import { getClusterForPost } from '@/lib/clusters';
import ShareButtons from '@/components/ShareButtons';
import ArticleCard from '@/components/ArticleCard';
import TopicClusterWidget from '@/components/TopicClusterWidget';
import Sidebar from '@/components/Sidebar';
import { ChevronRight, Calendar, Clock, User, CheckCircle2, ShieldCheck, Sparkles, HelpCircle } from 'lucide-react';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export const dynamicParams = true;
export const revalidate = 60;

export async function generateStaticParams() {
  const posts = getAllPosts(true);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const canonicalUrl = `https://bunusradar.site/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author.name }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      url: canonicalUrl,
      title: post.title,
      description: post.excerpt,
      type: 'article',
      authors: [post.author.name],
      images: [
        {
          url: post.coverImage || '',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage || ''],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const categoryPosts = getPostsByCategory(post.category).filter((p) => p.slug !== post.slug);
  const fallbackPosts = allPosts.filter((p) => p.slug !== post.slug && !categoryPosts.some((cp) => cp.slug === p.slug));
  const relatedPosts = [...categoryPosts, ...fallbackPosts].slice(0, 4);
  const cluster = getClusterForPost(post.slug);

  const baseUrl = 'https://bunusradar.site';
  const articleUrl = `${baseUrl}/blog/${post.slug}`;

  // Resolve rich author data from the authors registry
  const authorSlug = post.authorSlug || resolveAuthorSlug(post.author.name);
  const authorData = getAuthorBySlug(authorSlug);
  const authorUrl = `${baseUrl}/author/${authorSlug}`;

  // Resolve Semantic Entities for Knowledge Graph
  const categoryMeta = getCategoryBySlug(post.category);
  const { aboutEntities, mentionEntities } = resolveArticleEntities(
    post.title,
    post.category,
    post.tags
  );

  const aboutList = aboutEntities.length > 0
    ? aboutEntities.map(formatEntityForSchema)
    : [
        {
          '@type': 'Thing',
          name: categoryMeta.name,
          ...(categoryMeta.wikidataUrl ? { sameAs: categoryMeta.wikidataUrl } : {}),
        },
      ];

  const mentionsList = mentionEntities.map(formatEntityForSchema);

  // JSON-LD structured data for rich snippets - full Person or Organization schema for attribution
  const isOrgAuthor = authorSlug === 'bunusradar-editorial';
  const isNewsReporting = ['technology', 'ai', 'business'].includes(post.category?.toLowerCase());

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': isNewsReporting ? ['Article', 'NewsArticle'] : 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage ? [post.coverImage] : [],
    wordCount: post.content?.split(/\s+/).length,
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    about: aboutList,
    ...(mentionsList.length > 0 ? { mentions: mentionsList } : {}),
    isPartOf: {
      '@type': ['CreativeWork', 'Product'],
      name: 'BunusRadar',
      productID: 'CAow26rODA:openaccess',
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.ai-quick-summary', '.article-headline'],
    },
    author: {
      '@type': isOrgAuthor ? 'Organization' : 'Person',
      '@id': authorUrl,
      name: authorData?.name || post.author.name,
      url: authorUrl,
      image: authorData?.avatar || post.author.avatar,
      jobTitle: isOrgAuthor ? undefined : (authorData?.role || post.author.role),
      worksFor: {
        '@type': 'Organization',
        name: 'BunusRadar',
        url: baseUrl,
      },
      sameAs: authorData?.sameAs || [],
    },
    publisher: {
      '@type': 'Organization',
      name: 'BunusRadar',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/icon.svg`,
        width: 120,
        height: 120,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
      url: articleUrl,
      name: post.title,
    },
    url: articleUrl,
    keywords: post.tags.join(', '),
    articleSection: post.category,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: categoryMeta.name, item: `${baseUrl}/category/${categoryMeta.slug}` },
      { '@type': 'ListItem', position: 3, name: post.title, item: articleUrl },
    ],
  };

  const faqSchema = post.faqs && post.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

  return (
    <div className="py-6 space-y-8">
      {/* Subscribe with Google (SwG Basic) */}
      <script
        async
        type="application/javascript"
        src="https://news.google.com/swg/js/v1/swg-basic.js"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (self.SWG_BASIC = self.SWG_BASIC || []).push( basicSubscriptions => {
              basicSubscriptions.init({
                type: "NewsArticle",
                isPartOfType: ["Product"],
                isPartOfProductId: "CAow26rODA:openaccess",
                clientOptions: { theme: "light", lang: "en" },
              });
            });
          `,
        }}
      />
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      {/* Breadcrumb Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
          <Link href="/" className="hover:text-[#1b2e67] font-semibold">Home</Link>
          <ChevronRight className="w-3 h-3 text-zinc-400" />
          <Link href={`/category/${categoryMeta.slug}`} className="hover:text-[#1b2e67] font-semibold uppercase">
            {categoryMeta.name}
          </Link>
          <ChevronRight className="w-3 h-3 text-zinc-400" />
          <span className="truncate max-w-xs text-zinc-700">{post.title}</span>
        </div>
      </div>

      {/* Main Content Layout with 2 Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Article (8 Cols) */}
          <article className="lg:col-span-8 bg-white border border-zinc-200/80 rounded p-6 sm:p-10 shadow-sm space-y-6">
            {/* Category Tag */}
            <div>
              <Link
                href={`/category/${categoryMeta.slug}`}
                className="inline-block px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-[#1b2e67] text-[#f9b44d] rounded"
              >
                {categoryMeta.name}
              </Link>
            </div>

            {/* Headline */}
            <h1 className="article-headline text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-900 leading-[1.25]">
              {post.title}
            </h1>

            {/* Byline & Date & Share */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-zinc-100 text-xs text-zinc-500">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="flex items-center gap-1.5 font-bold text-zinc-800">
                  <User className="w-3.5 h-3.5 text-[#1b2e67]" />
                  BY{' '}
                  <Link href={authorUrl} className="uppercase text-[#1b2e67] hover:underline">
                    {authorData?.name || post.author.name}
                  </Link>
                </span>
                <span>•</span>
                <span data-nosnippet="true" className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readingTime}
                </span>
              </div>

              <ShareButtons title={post.title} />
            </div>

            {/* Featured Hero Image */}
            {post.coverImage && (
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded bg-zinc-100">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Executive Intelligence & Key Takeaways Box */}
            <div className="ai-quick-summary bg-gradient-to-br from-blue-50/70 via-slate-50 to-amber-50/30 border border-blue-200/80 rounded-lg p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-blue-100">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded bg-[#1b2e67] text-white">
                    <Sparkles className="w-4 h-4 text-[#f9b44d]" />
                  </span>
                  <span className="font-black text-xs uppercase tracking-wider text-[#1b2e67]">
                    Executive Summary & Key Insights
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-semibold text-zinc-600">
                  <span className="inline-flex items-center gap-1 text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    <CheckCircle2 className="w-3 h-3 text-blue-600" /> Editorial Review
                  </span>
                  <Link
                    href="/editorial-standards"
                    className="inline-flex items-center gap-1 text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200 hover:underline"
                  >
                    <ShieldCheck className="w-3 h-3 text-zinc-600" /> Editorial Standards
                  </Link>
                </div>
              </div>

              {/* Direct Answer / Core Finding */}
              <div className="text-sm sm:text-base font-medium text-zinc-900 leading-relaxed">
                <span className="font-bold text-[#1b2e67]">Core Finding: </span>
                {post.excerpt}
              </div>

              {/* Extracted Key Takeaways */}
              {post.keyTakeaways && post.keyTakeaways.length > 0 && (
                <div className="pt-2 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Key Actionable Takeaways:
                  </div>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-700">
                    {post.keyTakeaways.map((takeaway, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#1b2e67] mt-1.5 flex-shrink-0" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Citation & Attribution Footer */}
              <div className="pt-3 border-t border-blue-100/70 flex flex-wrap items-center justify-between text-[11px] text-zinc-500 gap-2">
                <span>
                  Byline: <strong className="text-zinc-700">{authorData?.name || post.author.name}</strong> ({authorData?.role || post.author.role})
                </span>
                <span>
                  Published under BunusRadar Editorial Guidelines
                </span>
              </div>
            </div>

            {/* Article Content */}
            <div
              className="prose prose-zinc max-w-none text-zinc-800 leading-relaxed prose-headings:font-bold prose-headings:text-zinc-900 prose-a:text-[#1b2e67] prose-a:font-semibold"
              dangerouslySetInnerHTML={{ __html: post.htmlContent }}
            />

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="pt-6 border-t border-zinc-100 flex flex-wrap gap-2 items-center">
                <span className="text-xs font-bold uppercase text-zinc-500 mr-2">Tags:</span>
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tag/${encodeURIComponent(tag)}`}
                    className="px-2.5 py-1 text-xs bg-zinc-100 text-zinc-700 hover:bg-[#1b2e67] hover:text-white rounded transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Verified FAQ Section for Human Readers and AI Crawlers */}
            {post.faqs && post.faqs.length > 0 && (
              <section className="pt-8 border-t border-zinc-200 space-y-4">
                <div className="tg-section-header flex items-center justify-between">
                  <h2 className="tg-section-title flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#1b2e67]" />
                    Frequently Asked Questions
                  </h2>
                  <span className="text-xs text-zinc-400 font-semibold uppercase">Verified QA</span>
                </div>
                <div className="space-y-3">
                  {post.faqs.map((faq, idx) => (
                    <div key={idx} className="p-4 rounded-lg border border-zinc-200 bg-zinc-50/60 space-y-2">
                      <h3 className="font-bold text-sm sm:text-base text-zinc-900 flex items-start gap-2">
                        <span className="text-[#1b2e67] font-black">Q:</span>
                        <span>{faq.question}</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed pl-5">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Topic Authority Cluster Guide */}
            {cluster && (
              <TopicClusterWidget
                cluster={cluster}
                currentSlug={post.slug}
                allPosts={allPosts}
              />
            )}

            {/* Related Articles Box */}
            {relatedPosts.length > 0 && (
              <div className="pt-8 border-t border-zinc-200 space-y-4">
                <div className="tg-section-header">
                  <h3 className="tg-section-title">Related In {post.category}</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedPosts.map((related) => (
                    <ArticleCard key={related.slug} post={related} />
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sticky Sidebar (4 Cols) */}
          <aside className="lg:col-span-4 sticky top-24">
            <Sidebar mustReadPosts={allPosts.slice(0, 5)} />
          </aside>
        </div>
      </div>
    </div>
  );
}
