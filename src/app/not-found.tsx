import Link from 'next/link';
import { ArrowLeft, Home, Search, Compass, Sparkles } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | BunusRadar',
  description: 'The requested page could not be found on BunusRadar.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-xl w-full text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/50 text-[#1b2e67] dark:text-blue-300 border border-blue-200/60 dark:border-blue-800">
          <Compass className="w-3.5 h-3.5" />
          Error 404
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-zinc-900 dark:text-white tracking-tight">
          Page Not Found
        </h1>

        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
          The article, resource, or tool you are looking for may have been moved, renamed, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1b2e67] hover:bg-[#142350] text-white font-semibold text-sm transition-colors shadow-sm"
          >
            <Home className="w-4 h-4" />
            Back to Homepage
          </Link>
          <Link
            href="/tools"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white font-semibold text-sm border border-zinc-200 dark:border-zinc-800 transition-colors shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            Explore Free AI Tools
          </Link>
          <Link
            href="/search"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white font-semibold text-sm border border-zinc-200 dark:border-zinc-800 transition-colors shadow-sm"
          >
            <Search className="w-4 h-4" />
            Search Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
