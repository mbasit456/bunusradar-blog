'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText,
  PlusCircle,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  RefreshCw,
  ExternalLink,
  Calendar,
  User,
  Tag,
  ImageIcon
} from 'lucide-react';
import SafeImage from '@/components/SafeImage';
import { getCategoryFallback } from '@/lib/images';

interface PostSummary {
  slug: string;
  title: string;
  category: string;
  date: string;
  author: { name: string };
  readingTime: string;
  wordCount: number;
  coverImage?: string;
}

export default function AdminPostsListPage() {
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/posts');
      const data = await res.json();
      if (data.success && Array.isArray(data.posts)) {
        setPosts(data.posts);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm(`Are you sure you want to delete "${slug}"? This action removes the article file.`)) {
      return;
    }

    setDeletingSlug(slug);
    try {
      const res = await fetch(`/api/admin/posts/${slug}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setPosts(posts.filter((p) => p.slug !== slug));
      } else {
        alert(data.error || 'Failed to delete');
      }
    } catch {
      alert('Error deleting post');
    } finally {
      setDeletingSlug(null);
    }
  };

  const filteredPosts = posts.filter((p) => {
    const matchesSearch =
      search === '' ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-500" />
            All Articles
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage, edit, search, and delete your published articles and drafts.
          </p>
        </div>

        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          Add New Post
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#111827] border border-slate-800 p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles by title or slug..."
            className="w-full pl-9 pr-3.5 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="ai">Artificial Intelligence</option>
            <option value="technology">Technology</option>
            <option value="business">Business & Growth</option>
            <option value="productivity">Productivity</option>
          </select>

          <button
            onClick={fetchPosts}
            title="Refresh list"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-[#111827] border border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-blue-400" />
            Loading articles from repository...
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="py-20 text-center text-xs text-slate-400">
            No articles found matching your criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px] bg-slate-900/60">
                  <th className="py-3 px-3 font-bold w-16">Cover</th>
                  <th className="py-3 px-4 font-bold">Title</th>
                  <th className="py-3 px-4 font-bold">Category</th>
                  <th className="py-3 px-4 font-bold">Author</th>
                  <th className="py-3 px-4 font-bold">Words</th>
                  <th className="py-3 px-4 font-bold">Date</th>
                  <th className="py-3 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredPosts.map((post) => (
                  <tr key={post.slug} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-3">
                      <div className="w-12 h-8 rounded-lg overflow-hidden bg-slate-800 border border-slate-700 flex-shrink-0">
                        <SafeImage
                          src={post.coverImage}
                          fallbackSrc={getCategoryFallback(post.category)}
                          alt={post.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-white max-w-[340px]">
                      <Link
                        href={`/admin/posts/edit/${post.slug}`}
                        className="hover:text-blue-400 transition-colors block truncate"
                      >
                        {post.title}
                      </Link>
                      <span className="text-[11px] font-normal text-slate-500 block truncate">
                        /blog/{post.slug}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                        {post.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">{post.author?.name || 'BunusRadar'}</td>
                    <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                      {post.wordCount.toLocaleString()} words
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">{post.date}</td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-1.5">
                      <Link
                        href={`/admin/posts/edit/${post.slug}`}
                        className="inline-flex items-center gap-1 p-2 rounded-lg bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-300 transition-colors"
                        title="Edit Article"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                        title="View on Live Site"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.slug)}
                        disabled={deletingSlug === post.slug}
                        className="inline-flex items-center gap-1 p-2 rounded-lg bg-slate-800 hover:bg-red-600 hover:text-white text-slate-400 transition-colors disabled:opacity-50"
                        title="Delete Article"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
