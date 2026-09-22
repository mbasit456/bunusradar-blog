import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { getPostBySlug, getAllPosts, getPostsByCategory } from '@/lib/posts';
import ShareButtons from '@/components/ShareButtons';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';
import { ChevronRight, Calendar, Clock, User } from 'lucide-react';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export const dynamicParams = true;
export const revalidate = 60;

export async function generateStaticParams() {
  const posts = getAllPosts();
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

  return {
    title: `${post.title} - BunusRadar`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
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
  const relatedPosts = getPostsByCategory(post.category)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bunusradar.site';
  const articleUrl = `${baseUrl}/blog/${post.slug}`;

  // JSON-LD structured data for rich snippets
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage ? [post.coverImage] : [],
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'BunusRadar',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
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
      { '@type': 'ListItem', position: 2, name: post.category, item: `${baseUrl}/category/${post.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}` },
      { '@type': 'ListItem', position: 3, name: post.title, item: articleUrl },
    ],
  };

  return (
    <div className="py-6 space-y-8">
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* Breadcrumb Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
          <Link href="/" className="hover:text-[#1b2e67] font-semibold">Home</Link>
          <ChevronRight className="w-3 h-3 text-zinc-400" />
          <Link href={`/category/${post.category}`} className="hover:text-[#1b2e67] font-semibold uppercase">
            {post.category}
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
                href={`/category/${post.category}`}
                className="inline-block px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-[#1b2e67] text-[#f9b44d] rounded"
              >
                {post.category}
              </Link>
            </div>

            {/* Headline */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-900 leading-[1.25]">
              {post.title}
            </h1>

            {/* Byline & Date & Share */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-zinc-100 text-xs text-zinc-500">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="flex items-center gap-1.5 font-bold text-zinc-800">
                  <User className="w-3.5 h-3.5 text-[#1b2e67]" />
                  BY <span className="uppercase text-[#1b2e67]">{post.author.name}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
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
