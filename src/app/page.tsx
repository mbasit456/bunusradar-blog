import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/posts';
import MagazineHero from '@/components/MagazineHero';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';
import { ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'BunusRadar - Independent AI Tool Reviews, Tests & Developer Research',
  description: 'BunusRadar helps developers, engineers, and businesses evaluate AI tools through practical benchmarks, reproducible tests, and evidence-based software research.',
  alternates: {
    canonical: 'https://bunusradar.site',
  },
  openGraph: {
    url: 'https://bunusradar.site',
    title: 'BunusRadar - Independent AI Tool Reviews, Tests & Developer Research',
    description: 'Practical AI benchmarks, developer software evaluations, and reproducible research.',
  },
};

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
            {/* Editorial Positioning & Original Research Banner */}
            <section className="bg-white border border-zinc-200/90 rounded-xl p-6 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-[#1b2e67] border border-blue-100">
                    Editorial Promise
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-zinc-900 mt-1">
                    Independent AI Tool Reviews, Tests & Research
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mt-1">
                    BunusRadar helps developers, engineers, and tech leaders evaluate emerging AI systems through hands-on testing, reproducible benchmarks, and documented methodologies.
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Link
                    href="/research"
                    className="px-3.5 py-2 text-xs font-bold uppercase tracking-wider bg-[#1b2e67] text-[#f9b44d] hover:bg-[#14234f] rounded transition-colors"
                  >
                    Research Hub →
                  </Link>
                  <Link
                    href="/methodology"
                    className="px-3.5 py-2 text-xs font-bold uppercase tracking-wider bg-zinc-100 text-zinc-700 hover:bg-zinc-200 rounded transition-colors"
                  >
                    Methodology
                  </Link>
                </div>
              </div>

              {/* Research Benchmarks Quick Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <Link
                  href="/research#ai-coding-benchmark"
                  className="p-3.5 rounded-lg border border-zinc-100 bg-zinc-50/70 hover:bg-zinc-100 transition-colors group"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">Benchmark</span>
                  <strong className="text-xs font-bold text-zinc-900 group-hover:text-[#1b2e67] block mt-0.5">
                    AI Coding Assistants 2026
                  </strong>
                  <span className="text-[11px] text-zinc-500 block mt-1">50 tasks across 5 repos. Accuracy, latency & cost.</span>
                </Link>

                <Link
                  href="/research#llm-pricing"
                  className="p-3.5 rounded-lg border border-zinc-100 bg-zinc-50/70 hover:bg-zinc-100 transition-colors group"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block">Pricing Tracker</span>
                  <strong className="text-xs font-bold text-zinc-900 group-hover:text-[#1b2e67] block mt-0.5">
                    LLM Cost & Token Tracker
                  </strong>
                  <span className="text-[11px] text-zinc-500 block mt-1">GPT-4o, Claude 3.5, Gemini 1.5, DeepSeek V3 per 1M.</span>
                </Link>

                <Link
                  href="/research#image-generator-benchmark"
                  className="p-3.5 rounded-lg border border-zinc-100 bg-zinc-50/70 hover:bg-zinc-100 transition-colors group"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 block">Evaluation</span>
                  <strong className="text-xs font-bold text-zinc-900 group-hover:text-[#1b2e67] block mt-0.5">
                    AI Image Generators
                  </strong>
                  <span className="text-[11px] text-zinc-500 block mt-1">Prompt adherence & fidelity across 100 test prompts.</span>
                </Link>
              </div>
            </section>

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
