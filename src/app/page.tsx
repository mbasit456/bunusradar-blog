import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import MagazineHero from '@/components/MagazineHero';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';
import { ChevronRight } from 'lucide-react';

interface HomePageProps {
  searchParams?: {
    search?: string;
  };
}

export const revalidate = 60;

const baseUrl = 'https://bunusradar.site';

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'BunusRadar',
  url: baseUrl,
  description: 'Daily insights on Technology, AI, Business & Growth, Productivity, and Lifestyle.',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${baseUrl}/?search={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'BunusRadar',
  url: baseUrl,
  logo: `${baseUrl}/logo.png`,
  sameAs: [],
};

export default function HomePage({ searchParams }: HomePageProps) {
  const allPosts = getAllPosts();
  const searchQuery = searchParams?.search?.toLowerCase().trim();

  // If search query is provided via URL
  const displayPosts = searchQuery
    ? allPosts.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery) ||
          p.excerpt.toLowerCase().includes(searchQuery) ||
          p.category.toLowerCase().includes(searchQuery)
      )
    : allPosts;

  const heroPosts = displayPosts.slice(0, 5);
  const latestArticles = displayPosts.slice(1);
  const mustReadPosts = allPosts.slice(0, 5);

  return (
    <div className="space-y-6 pb-16">
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      {/* Search notification banner if search is active */}
      {searchQuery && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="bg-white p-4 rounded border border-zinc-200 flex items-center justify-between shadow-sm">
            <p className="text-xs font-bold text-zinc-800">
              Showing search results for: <span className="text-[#1b2e67]">&ldquo;{searchQuery}&rdquo;</span> ({displayPosts.length} found)
            </p>
            <Link href="/" className="text-xs text-[#1b2e67] font-semibold hover:underline">
              Clear Search
            </Link>
          </div>
        </div>
      )}

      {/* 1. TG Daily Signature Magazine Hero (Top 5 Stories) */}
      {!searchQuery && <MagazineHero posts={heroPosts} />}

      {/* 2. Main 2-Column Body (70% News Feed, 30% Sidebar) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Feed (8 Cols / 67%) */}
          <main className="lg:col-span-8 space-y-10">
            {/* Latest Articles Section */}
            <section>
              <div className="tg-section-header">
                <h2 className="tg-section-title">Latest Articles</h2>
                <Link
                  href="/category/technology"
                  className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#1b2e67] hover:text-[#f9b44d] transition-colors"
                >
                  More <ChevronRight className="w-4 h-4 ml-0.5" />
                </Link>
              </div>

              {latestArticles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {latestArticles.map((post) => (
                    <ArticleCard key={post.slug} post={post} />
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 rounded text-center text-zinc-500 border border-zinc-200">
                  No articles found matching your query.
                </div>
              )}
            </section>

            {/* In-depth Technology & AI Highlight Bar */}
            <section className="bg-gradient-to-r from-[#1b2e67] to-[#26418f] text-white p-6 sm:p-8 rounded shadow-sm">
              <div className="max-w-2xl space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#f9b44d]">
                  Special Report
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold leading-tight">
                  The Enterprise AI Frontier: How Agent Swarms Are Replacing Traditional Workflows
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed pt-1">
                  From autonomous coding systems to real-time hardware isolation, deep dive into our ongoing investigative series on high-frequency intelligence.
                </p>
                <div className="pt-3">
                  <Link
                    href="/category/ai"
                    className="inline-block px-4 py-2 text-xs font-bold uppercase tracking-wider bg-[#f9b44d] text-[#1b2e67] hover:bg-white rounded transition-colors"
                  >
                    Read The AI Series
                  </Link>
                </div>
              </div>
            </section>
          </main>

          {/* Sticky Right Sidebar (4 Cols / 33%) */}
          <aside className="lg:col-span-4 sticky top-24">
            <Sidebar mustReadPosts={mustReadPosts} />
          </aside>
        </div>
      </div>
    </div>
  );
}
