import Link from 'next/link';
import { Metadata } from 'next';
import { getAllPosts } from '@/lib/posts';
import { CATEGORIES } from '@/lib/categories';
import { Clock, Calendar, ArrowRight, BookOpen, Tag } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Latest Publications | BunusRadar Archive',
  description: 'Browse all published articles, guides, and intelligence briefings on Technology, Artificial Intelligence, Business & Growth, Productivity, and Lifestyle.',
};

export const revalidate = 60;

export default function LatestPublicationsPage() {
  const posts = getAllPosts();

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Banner */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#1b2e67]/10 text-[#1b2e67] dark:bg-white/10 dark:text-[#f9b44d] border border-[#1b2e67]/20 dark:border-white/10 shadow-sm">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Complete Publication Archive</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Latest Publications
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Explore our daily releases across cutting-edge technology, AI applications, sustainable wealth systems, high-leverage productivity frameworks, and modern living.
          </p>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex flex-wrap gap-2 pt-2 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <Link
            href="/latest-publications"
            className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#1b2e67] text-white"
          >
            All Dispatches ({posts.length})
          </Link>
          {Object.values(CATEGORIES).map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="px-4 py-1.5 rounded-full text-xs font-medium bg-zinc-100 hover:bg-[#f9b44d] hover:text-[#1b2e67] text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-[#f9b44d] dark:hover:text-[#1b2e67] transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Cover Image */}
              <Link href={`/blog/${post.slug}`} className="relative h-48 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <img
                  src={post.coverImage || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80'}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-[#1b2e67] text-white rounded shadow-sm">
                  {post.category}
                </span>
              </Link>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#f9b44d]" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-zinc-400" />
                      {post.readingTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-[#1b2e67] dark:group-hover:text-[#f9b44d] transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800">
                  <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    By {post.author.name}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#1b2e67] dark:text-[#f9b44d] hover:underline"
                  >
                    Read Story <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
