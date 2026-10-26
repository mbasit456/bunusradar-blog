'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Wand2,
  Sparkles,
  RefreshCw,
  ArrowRight,
  CheckCircle,
  FileText,
  ImageIcon,
  FolderTree,
  User,
  Sliders,
  ExternalLink
} from 'lucide-react';

export default function AiContentStudioPage() {
  const router = useRouter();

  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState('technology');
  const [author, setAuthor] = useState('Alex Vance');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/admin/ai-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topic.trim(),
          category,
          author,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.article) {
        setResult(data.article);
      } else {
        setError(data.error || 'Failed to generate article');
      }
    } catch {
      setError('Connection error while communicating with AI generation pipeline');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenInEditor = () => {
    if (!result) return;
    sessionStorage.setItem('ai_draft', JSON.stringify(result));
    router.push('/admin/posts/new');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-950/60 text-indigo-300 border border-indigo-800/40 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          Autonomous Publishing Assistant
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <Wand2 className="w-6 h-6 text-indigo-400" />
          AI Content Studio
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Draft structured, SEO-optimized, 1,500+ word technology articles complete with TOC, FAQs, and Flux cover art in 1 click.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-950/60 border border-red-800 text-red-200 text-xs">
          {error}
        </div>
      )}

      {/* Generator Form */}
      <div className="bg-[#111827] border border-slate-800 p-6 rounded-2xl shadow-sm space-y-5">
        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Article Topic, Keyword, or Question
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Next.js 15 Server Actions Architecture, DeepSeek R1 vs OpenAI o1, Micro-SaaS Pricing Strategies"
              className="w-full px-4 py-3 bg-[#090d16] border border-slate-700 rounded-xl text-sm font-semibold text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <FolderTree className="w-3.5 h-3.5 text-blue-400" />
                Target Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#090d16] border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="technology">Technology</option>
                <option value="ai">Artificial Intelligence</option>
                <option value="business">Business & Growth</option>
                <option value="productivity">Productivity</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-purple-400" />
                Assigned Author Byline
              </label>
              <select
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#090d16] border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Alex Vance">Alex Vance (AI & Systems)</option>
                <option value="Sarah Chen">Sarah Chen (Software Engineering)</option>
                <option value="Elena Rostova">Elena Rostova (Productivity & Cognitive)</option>
                <option value="Marcus Sterling">Marcus Sterling (SaaS & Digital Wealth)</option>
                <option value="BunusRadar Editorial">BunusRadar Editorial Desk</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/20 transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>AI is researching, outlining, and writing article...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                <span>Generate Complete Article</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Generated Result Preview Card */}
      {result && (
        <div className="bg-[#111827] border border-emerald-800/60 rounded-2xl p-6 shadow-md space-y-5 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span>Article Draft Ready!</span>
            </div>
            <button
              onClick={handleOpenInEditor}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all"
            >
              <span>Open in Post Editor & Publish</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-black text-white">{result.title}</h2>
            <p className="text-xs text-slate-300 leading-relaxed italic">{result.excerpt}</p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-semibold uppercase text-[10px]">
                {result.category}
              </span>
              <span>Slug: <code className="text-blue-400 font-mono">/blog/{result.slug}</code></span>
              <span>Tags: {result.tags?.join(', ')}</span>
            </div>

            {result.coverImage && (
              <div className="aspect-video max-w-md rounded-xl overflow-hidden border border-slate-800 bg-[#090d16] mt-3">
                <img src={result.coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
