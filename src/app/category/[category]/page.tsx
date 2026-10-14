import Link from 'next/link';
import { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';
import { getPostsByCategory, getAllPosts } from '@/lib/posts';
import { CATEGORIES, getCategoryBySlug, normalizeCategorySlug } from '@/lib/categories';
import { getAllClusters } from '@/lib/clusters';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';
import { ChevronRight, Layers, ArrowRight } from 'lucide-react';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export const revalidate = 60;

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const canonicalSlug = normalizeCategorySlug(params.category);
  const meta = getCategoryBySlug(canonicalSlug);
  const canonicalUrl = `https://bunusradar.site/category/${canonicalSlug}`;
  return {
    title: `${meta.name} News & Analysis - BunusRadar`,
    description: meta.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      url: canonicalUrl,
      title: `${meta.name} - BunusRadar`,
      description: meta.description,
      type: 'website',
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const canonicalSlug = normalizeCategorySlug(params.category);
  if (params.category !== canonicalSlug) {
    permanentRedirect(`/category/${canonicalSlug}`);
  }

  const meta = getCategoryBySlug(canonicalSlug);
  const posts = getPostsByCategory(canonicalSlug);
  const allPosts = getAllPosts();
  const baseUrl = 'https://bunusradar.site';
  const categoryUrl = `${baseUrl}/category/${canonicalSlug}`;

  const categoryClusters = getAllClusters().filter(
    (c) => normalizeCategorySlug(c.pillarCategory) === canonicalSlug
  );

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: meta.name,
        item: categoryUrl,
      },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${meta.name} - BunusRadar`,
    url: categoryUrl,
    description: meta.description,
    isPartOf: {
      '@type': 'WebSite',
      name: 'BunusRadar',
      url: baseUrl,
    },
    about: {
      '@type': 'Thing',
      name: meta.name,
      ...(meta.wikidataUrl || meta.wikipediaUrl
        ? {
            sameAs: [meta.wikidataUrl, meta.wikipediaUrl].filter(Boolean) as string[],
          }
        : {}),
    },
    ...(categoryClusters.length > 0
      ? {
          hasPart: categoryClusters.flatMap((c) =>
            c.articles.map((slug) => ({
              '@type': 'Article',
              url: `${baseUrl}/blog/${slug}`,
            }))
          ),
        }
      : {}),
  };

  return (
    <div className="py-6 space-y-8">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      {/* Breadcrumb Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
          <Link href="/" className="hover:text-[#1b2e67] font-semibold">Home</Link>
          <ChevronRight className="w-3 h-3 text-zinc-400" />
          <span className="text-zinc-800 font-bold uppercase">{meta.name}</span>
        </div>
      </div>

      {/* Category Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border-l-4 border-[#1b2e67] p-6 sm:p-8 rounded-r shadow-sm">
          <h1 className="text-2xl sm:text-3xl font-black uppercase text-[#1b2e67] tracking-tight">
            {meta.name}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-zinc-600 max-w-2xl leading-relaxed">
            {meta.description}
          </p>
          <div className="mt-3 text-xs font-bold text-[#f9b44d] uppercase tracking-wider">
            {posts.length} {posts.length === 1 ? 'Article' : 'Articles'} Published
          </div>
        </div>
      </div>

      {/* Topical Authority Cluster Blueprint */}
      {categoryClusters.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#14234f]/5 via-[#1b2e67]/5 to-[#f9b44d]/10 border border-[#1b2e67]/15 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1b2e67]">
              <Layers className="w-4 h-4 text-[#f9b44d]" />
              <span>Topical Authority Pillar Architecture</span>
            </div>
            {categoryClusters.map((cluster) => (
              <div key={cluster.id} className="space-y-3">
                <div>
                  <h2 className="text-xl font-black text-zinc-900 tracking-tight">
                    {cluster.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-2xl leading-relaxed">
                    {cluster.description}
                  </p>
                </div>
                <div className="pt-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 mb-2">
                    Cluster Deep Dives ({cluster.articles.length} Core Guides):
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cluster.articles.map((slug) => {
                      const postMatch = allPosts.find((p) => p.slug === slug);
                      if (!postMatch) return null;
                      return (
                        <Link
                          key={slug}
                          href={`/blog/${slug}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-white border border-zinc-200 hover:border-[#1b2e67] hover:shadow-xs text-zinc-800 hover:text-[#1b2e67] transition-all font-medium"
                        >
                          <span className="line-clamp-1">{postMatch.title}</span>
                          <ArrowRight className="w-3 h-3 text-[#f9b44d] shrink-0" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2-Column Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <main className="lg:col-span-8">
            <div className="tg-section-header">
              <h2 className="tg-section-title">{meta.name} Coverage</h2>
            </div>

            {posts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {posts.map((post) => (
                  <ArticleCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 text-center rounded border border-zinc-200 text-zinc-500">
                No articles found in this category yet.
              </div>
            )}
          </main>

          <aside className="lg:col-span-4 sticky top-24">
            <Sidebar mustReadPosts={allPosts.slice(0, 5)} />
          </aside>
        </div>
      </div>
    </div>
  );
}
