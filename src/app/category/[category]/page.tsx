import Link from 'next/link';
import { Metadata } from 'next';
import { getPostsByCategory } from '@/lib/posts';
import { CATEGORIES, getCategoryBySlug } from '@/lib/categories';
import PostCard from '@/components/PostCard';
import { ArrowLeft, Layers } from 'lucide-react';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const meta = getCategoryBySlug(params.category);
  return {
    title: `${meta.name} - GravityPulse`,
    description: meta.description,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const meta = getCategoryBySlug(params.category);
  const posts = getPostsByCategory(params.category);

  return (
    <div className="py-8 md:py-12 space-y-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to all articles
        </Link>

        {/* Category Header */}
        <div className="p-8 md:p-12 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            Category
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
            {meta.name}
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg max-w-2xl leading-relaxed">
            {meta.description}
          </p>
          <div className="text-xs font-semibold text-zinc-400">
            {posts.length} {posts.length === 1 ? 'article' : 'articles'} in this category
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800">
            <p className="text-zinc-500">No articles found in this category yet.</p>
            <p className="text-xs text-zinc-400 mt-2">
              Use the Antigravity generator to create a new post for {meta.name}!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
