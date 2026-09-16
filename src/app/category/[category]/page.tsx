import Link from 'next/link';
import { Metadata } from 'next';
import { getPostsByCategory, getAllPosts } from '@/lib/posts';
import { CATEGORIES, getCategoryBySlug } from '@/lib/categories';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';
import { ChevronRight } from 'lucide-react';

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
  const meta = getCategoryBySlug(params.category);
  return {
    title: `${meta.name} News & Analysis - BonusRadar`,
    description: meta.description,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const meta = getCategoryBySlug(params.category);
  const posts = getPostsByCategory(params.category);
  const allPosts = getAllPosts();

  return (
    <div className="py-6 space-y-8">
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
