import Link from 'next/link';
import { getAllPosts, getFeaturedPost, getAllTags } from '@/lib/posts';
import { CATEGORIES } from '@/lib/categories';
import PostCard from '@/components/PostCard';
import SearchBar from '@/components/SearchBar';
import NewsletterBox from '@/components/NewsletterBox';
import { Sparkles, TrendingUp, Layers } from 'lucide-react';

export default function HomePage() {
  const posts = getAllPosts();
  const featuredPost = getFeaturedPost();
  const recentPosts = featuredPost ? posts.filter((p) => p.slug !== featuredPost.slug) : posts;
  const tags = getAllTags();

  return (
    <div className="space-y-16 py-8 md:py-12">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-900 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>Automated Publishing & Curated Ideas</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 dark:text-white max-w-3xl mx-auto leading-tight">
          Where Curiosity Meets <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Actionable Intelligence</span>
        </h1>

        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          Explore cutting-edge insights across Technology, AI Systems, High-Velocity Business, and Modern Productivity.
        </p>

        {/* Live Search Component */}
        <div className="pt-2">
          <SearchBar posts={posts} />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-4">
          <span className="text-xs font-medium text-zinc-400 mr-1 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" /> Topics:
          </span>
          {Object.values(CATEGORIES).map((cat) => {
            const count = posts.filter((p) => p.category.toLowerCase() === cat.slug.toLowerCase()).length;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors"
              >
                <span>{cat.name}</span>
                <span className="px-1.5 py-0.5 rounded-md bg-white dark:bg-zinc-900 text-[10px] text-zinc-500 font-bold">
                  {count}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6 text-sm font-bold uppercase tracking-wider text-zinc-500">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            Featured Story
          </div>
          <PostCard post={featuredPost} featured={true} />
        </section>
      )}

      {/* Recent Posts Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Latest Publications
            </h2>
            <p className="text-xs text-zinc-500 mt-1">
              Fresh insights generated, curated, and continuously updated.
            </p>
          </div>
          <span className="text-xs text-zinc-400 font-medium">
            Showing {posts.length} {posts.length === 1 ? 'article' : 'articles'}
          </span>
        </div>

        {recentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800">
            <p className="text-zinc-500">No additional articles found.</p>
          </div>
        )}
      </section>

      {/* Tags Cloud Section */}
      {tags.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-4">
              Explore by Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags.map(({ tag, count }) => (
                <Link
                  key={tag}
                  href={`/tag/${encodeURIComponent(tag)}`}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:border-blue-500 hover:text-blue-600 transition-colors"
                >
                  #{tag} <span className="text-zinc-400 ml-1">({count})</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <NewsletterBox />
    </div>
  );
}
