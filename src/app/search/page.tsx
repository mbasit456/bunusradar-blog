import Link from 'next/link';
import { Metadata } from 'next';
import { getAllPosts } from '@/lib/posts';
import SearchBar from '@/components/SearchBar';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Search Articles | BunusRadar',
  description: 'Search technology, AI benchmarks, software reviews, and productivity articles on BunusRadar.',
  alternates: {
    canonical: 'https://bunusradar.site/search',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function SearchPage() {
  const allPosts = getAllPosts();

  return (
    <div className="py-8 md:py-12 space-y-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Search BunusRadar
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Find articles, benchmark studies, AI comparisons, and tech guides.
          </p>
        </div>

        <SearchBar posts={allPosts} />
      </div>
    </div>
  );
}
