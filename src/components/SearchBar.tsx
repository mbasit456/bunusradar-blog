'use client';

import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import PostCard from './PostCard';
import { PostMetadata } from '@/lib/posts';

interface SearchBarProps {
  posts: PostMetadata[];
}

export default function SearchBar({ posts }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const filteredPosts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query, posts]);

  return (
    <div className="w-full">
      <div className="relative max-w-xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles by title, keyword, category, or tag..."
          className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {query.trim() && (
        <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-sm text-zinc-500 mb-6">
            Found <span className="font-semibold text-zinc-900 dark:text-white">{filteredPosts.length}</span> results for &ldquo;{query}&rdquo;
          </p>
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
              <p className="text-zinc-500">No articles matching your search query.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
