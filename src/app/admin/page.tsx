'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FileText,
  PlusCircle,
  FolderTree,
  Users,
  Eye,
  Edit,
  Clock,
  Sparkles,
  CheckCircle,
  ExternalLink,
  Wand2,
  Globe,
  TrendingUp,
  Activity,
  ArrowRight,
  RefreshCw,
  Search
} from 'lucide-react';

interface PostSummary {
  slug: string;
  title: string;
  category: string;
  date: string;
  author: { name: string };
  readingTime: string;
  wordCount: number;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [quickTitle, setQuickTitle] = useState('');
  const [quickContent, setQuickContent] = useState('');
  const [savingDraft, setSavingDraft] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/admin/posts');
      const data = await res.json();
      if (data.success && Array.isArray(data.posts)) {
        setPosts(data.posts);
      }
    } catch (e) {
      console.error('Failed to load posts', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleQuickDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTitle.trim()) return;

    setSavingDraft(true);
    try {
      const res = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: quickTitle,
          content: quickContent || 'Draft in progress...',
          category: 'technology',
          tags: ['technology'],
        }),
      });

      const data = await res.json();
      if (data.success) {
        setQuickTitle('');
        setQuickContent('');
        fetchPosts();
        alert('Draft saved to Content Hub successfully!');
      }
    } catch {
      alert('Error saving draft');
    } finally {
      setSavingDraft(false);
    }
  };

  const handleAiQuickGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiTopic.trim()) return;

    setAiLoading(true);
    try {
      const res = await fetch('/api/admin/ai-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: aiTopic }),
      });

      const data = await res.json();
      if (data.success && data.article) {
        // Store in sessionStorage and navigate to /admin/posts/new
        sessionStorage.setItem('ai_draft', JSON.stringify(data.article));
        router.push('/admin/posts/new');
      }
    } catch {
      alert('Failed to generate article');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-900/60 via-[#1b2e67]/50 to-indigo-900/60 border border-blue-700/40 rounded-2xl p-6 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            WordPress-Style Control Center
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Welcome to your BunusRadar Backend
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Manage your articles, create content with AI, inspect SEO sitemaps, and publish updates live to your readers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/posts/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            Write New Post
          </Link>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-all"
          >
            <ExternalLink className="w-4 h-4 text-slate-400" />
            View Live Site
          </Link>
        </div>
      </div>

      {/* At a Glance Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#111827] border border-slate-800 p-5 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Published Articles</span>
            <div className="p-2 rounded-xl bg-blue-950/60 text-blue-400 border border-blue-800/40">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">
            {loading ? '...' : posts.length}
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
            <CheckCircle className="w-3 h-3" />
            All live & indexed
          </div>
        </div>

        <div className="bg-[#111827] border border-slate-800 p-5 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Categories</span>
            <div className="p-2 rounded-xl bg-purple-950/60 text-purple-400 border border-purple-800/40">
              <FolderTree className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">4</div>
          <div className="text-[11px] text-slate-400">
            AI, Tech, Business, Productivity
          </div>
        </div>

        <div className="bg-[#111827] border border-slate-800 p-5 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Staff Authors</span>
            <div className="p-2 rounded-xl bg-amber-950/60 text-amber-400 border border-amber-800/40">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">5</div>
          <div className="text-[11px] text-slate-400">
            Registered contributors
          </div>
        </div>

        <div className="bg-[#111827] border border-slate-800 p-5 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">SEO & Sitemaps</span>
            <div className="p-2 rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
              <Globe className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">100%</div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
            <CheckCircle className="w-3 h-3" />
            News & Standard Compliant
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid: Left (Recent Posts), Right (Quick Draft & AI Generator) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): Recent Posts Table */}
        <div className="lg:col-span-8 bg-[#111827] border border-slate-800 rounded-2xl shadow-sm overflow-hidden space-y-4 p-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-400" />
              <h2 className="text-base font-bold text-white">Recent Articles</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
                {posts.length} Total
              </span>
            </div>
            <Link
              href="/admin/posts"
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
            >
              View All Posts &rarr;
            </Link>
          </div>

          {loading ? (
            <div className="py-12 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-blue-400" />
              Loading articles...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                    <th className="py-2.5 font-bold">Title</th>
                    <th className="py-2.5 font-bold">Category</th>
                    <th className="py-2.5 font-bold">Author</th>
                    <th className="py-2.5 font-bold">Date</th>
                    <th className="py-2.5 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {posts.slice(0, 8).map((post) => (
                    <tr key={post.slug} className="hover:bg-slate-800/40 transition-colors group">
                      <td className="py-3 pr-4 font-semibold text-white max-w-[280px] truncate">
                        <Link href={`/admin/posts/edit/${post.slug}`} className="hover:text-blue-400 transition-colors">
                          {post.title}
                        </Link>
                      </td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                          {post.category}
                        </span>
                      </td>
                      <td className="py-3 text-slate-400">{post.author?.name || 'BunusRadar'}</td>
                      <td className="py-3 text-slate-400 whitespace-nowrap">{post.date}</td>
                      <td className="py-3 text-right whitespace-nowrap space-x-2">
                        <Link
                          href={`/admin/posts/edit/${post.slug}`}
                          className="inline-flex items-center gap-1 p-1.5 rounded-lg bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-300 transition-colors"
                          title="Edit Post"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                          title="View on Live Site"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right Column (4 cols): Quick Draft + AI Post Creator */}
        <div className="lg:col-span-4 space-y-6">
          {/* AI Content Studio Quick Creator */}
          <div className="bg-gradient-to-b from-[#1e1b4b] to-[#111827] border border-indigo-800/50 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-indigo-600 text-white">
                <Wand2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">AI Post Generator</h3>
                <p className="text-[11px] text-indigo-300">Generate a full article in 1 click</p>
              </div>
            </div>

            <form onSubmit={handleAiQuickGenerate} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Topic or Keyword
                </label>
                <input
                  type="text"
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  placeholder="e.g. Next.js 15 Server Actions"
                  className="w-full px-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={aiLoading}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all disabled:opacity-50"
              >
                {aiLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Writing Article with AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Draft Full Article</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* WordPress Classic Quick Draft Widget */}
          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <PlusCircle className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-bold text-white">Quick Draft</h3>
            </div>

            <form onSubmit={handleQuickDraft} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={quickTitle}
                  onChange={(e) => setQuickTitle(e.target.value)}
                  placeholder="What is on your mind?"
                  className="w-full px-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Notes / Markdown Content
                </label>
                <textarea
                  rows={4}
                  value={quickContent}
                  onChange={(e) => setQuickContent(e.target.value)}
                  placeholder="Draft ideas, key takeaways, links..."
                  className="w-full px-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={savingDraft}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-all disabled:opacity-50"
              >
                {savingDraft ? 'Saving...' : 'Save Draft to Content Hub'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
