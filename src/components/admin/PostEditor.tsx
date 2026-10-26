'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Save,
  Eye,
  Edit3,
  Download,
  Sparkles,
  ArrowLeft,
  Calendar,
  User,
  FolderTree,
  Tag,
  Image as ImageIcon,
  CheckCircle,
  RefreshCw,
  ExternalLink,
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  Link as LinkIcon,
  Quote,
  Table as TableIcon
} from 'lucide-react';
import Link from 'next/link';
import { getCategoryFallback } from '@/lib/images';
import SafeImage from '@/components/SafeImage';

interface PostEditorProps {
  initialData?: {
    slug?: string;
    title?: string;
    excerpt?: string;
    category?: string;
    tags?: string[] | string;
    coverImage?: string;
    authorSlug?: string;
    author?: { name: string };
    date?: string;
    content?: string;
  };
  isEditMode?: boolean;
}

export default function PostEditor({ initialData, isEditMode = false }: PostEditorProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
  const [category, setCategory] = useState(initialData?.category || 'technology');
  const [tags, setTags] = useState(
    Array.isArray(initialData?.tags) ? initialData.tags.join(', ') : initialData?.tags || ''
  );
  const [coverImage, setCoverImage] = useState(
    initialData?.coverImage || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80'
  );
  const [authorName, setAuthorName] = useState(initialData?.author?.name || 'Alex Vance');
  const [date, setDate] = useState(initialData?.date || new Date().toISOString().split('T')[0]);
  const [content, setContent] = useState(initialData?.content || '');
  
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
  const [saving, setSaving] = useState(false);
  const [generatingCover, setGeneratingCover] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Auto-generate slug from title if in create mode and slug was not manually set
  useEffect(() => {
    if (!isEditMode && (!slug || slug === '')) {
      const generated = title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      setSlug(generated);
    }
  }, [title, slug, isEditMode]);

  // Load from sessionStorage if available (from AI post generator)
  useEffect(() => {
    if (!isEditMode && typeof window !== 'undefined') {
      const aiDraft = sessionStorage.getItem('ai_draft');
      if (aiDraft) {
        try {
          const parsed = JSON.parse(aiDraft);
          if (parsed.title) setTitle(parsed.title);
          if (parsed.slug) setSlug(parsed.slug);
          if (parsed.excerpt) setExcerpt(parsed.excerpt);
          if (parsed.category) setCategory(parsed.category);
          if (parsed.tags) setTags(Array.isArray(parsed.tags) ? parsed.tags.join(', ') : parsed.tags);
          if (parsed.coverImage) setCoverImage(parsed.coverImage);
          if (parsed.content) setContent(parsed.content);
          sessionStorage.removeItem('ai_draft');
        } catch (e) {
          console.error('Error loading AI draft', e);
        }
      }
    }
  }, [isEditMode]);

  const wordCount = content ? content.trim().split(/\s+/).filter(Boolean).length : 0;
  const readingTimeMinutes = Math.ceil(wordCount / 200) || 1;

  const handleGenerateCover = () => {
    if (!title.trim()) {
      alert('Please enter an article title first so we can assign a relevant visual scene.');
      return;
    }
    setGeneratingCover(true);
    const fallback = getCategoryFallback(category);
    setCoverImage(fallback);
    setTimeout(() => setGeneratingCover(false), 300);
  };

  const handleInsertMarkdown = (prefix: string, suffix = '') => {
    const textarea = document.getElementById('content-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end) || 'text';
    const replacement = `${prefix}${selected}${suffix}`;
    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
    }, 50);
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!title.trim()) {
      alert('Title is required');
      return;
    }

    setSaving(true);
    setSuccessMessage('');

    try {
      const res = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          slug: slug.trim(),
          excerpt: excerpt.trim(),
          category,
          tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
          coverImage: coverImage.trim(),
          author: { name: authorName },
          date,
          content,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMessage(`Post saved successfully! Saved as ${data.post.slug}.md`);
        setTimeout(() => {
          router.push('/admin/posts');
        }, 1200);
      } else {
        alert(data.error || 'Failed to save post');
      }
    } catch {
      alert('Network error while saving post');
    } finally {
      setSaving(false);
    }
  };

  const handleDownloadMarkdown = () => {
    const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
excerpt: "${excerpt.replace(/"/g, '\\"')}"
date: "${date}"
category: "${category}"
tags: [${tags.split(',').map(t => `"${t.trim()}"`).join(', ')}]
coverImage: "${coverImage}"
author:
  name: "${authorName}"
---

${content}`;

    const blob = new Blob([frontmatter], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${slug || 'article'}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/posts"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {isEditMode ? `Edit Article: ${title || slug}` : 'Add New Article'}
            </h1>
            <p className="text-xs text-slate-400">
              {isEditMode ? 'Modify content and update live publication' : 'Draft, format, and publish to your digital newsroom'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleDownloadMarkdown}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 transition-all"
            title="Download .md file"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download .md</span>
          </button>

          {isEditMode && slug && (
            <Link
              href={`/blog/${slug}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">View Live</span>
            </Link>
          )}

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all disabled:opacity-50"
          >
            {saving ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>{isEditMode ? 'Update Article' : 'Publish Article'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {successMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* 2-Column Layout: Left (Main Content), Right (Publish Meta) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Content (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Title Input */}
          <div className="bg-[#111827] border border-slate-800 p-5 rounded-2xl shadow-sm space-y-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Article Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter article title here..."
                className="w-full px-4 py-3 bg-[#090d16] border border-slate-700 rounded-xl text-base font-bold text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Permalink */}
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-slate-500">Permalink:</span>
              <span className="text-slate-500">bunusradar.site/blog/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="slug-name"
                className="px-2 py-0.5 bg-[#090d16] border border-slate-700 rounded text-blue-400 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Markdown Content Editor with Live Preview */}
          <div className="bg-[#111827] border border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            {/* Editor Toolbar */}
            <div className="p-3 bg-slate-900/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setViewMode('edit')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    viewMode === 'edit' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Editor
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('preview')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    viewMode === 'preview' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  Preview
                </button>
              </div>

              {viewMode === 'edit' && (
                <div className="flex items-center gap-1 overflow-x-auto text-slate-400">
                  <button
                    type="button"
                    onClick={() => handleInsertMarkdown('**', '**')}
                    className="p-1.5 rounded hover:bg-slate-800 hover:text-white transition-colors"
                    title="Bold"
                  >
                    <Bold className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertMarkdown('*', '*')}
                    className="p-1.5 rounded hover:bg-slate-800 hover:text-white transition-colors"
                    title="Italic"
                  >
                    <Italic className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertMarkdown('\n## ')}
                    className="p-1.5 rounded hover:bg-slate-800 hover:text-white transition-colors"
                    title="Heading 2"
                  >
                    <Heading2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertMarkdown('\n### ')}
                    className="p-1.5 rounded hover:bg-slate-800 hover:text-white transition-colors"
                    title="Heading 3"
                  >
                    <Heading3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertMarkdown('[Link Text](', ')')}
                    className="p-1.5 rounded hover:bg-slate-800 hover:text-white transition-colors"
                    title="Link"
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertMarkdown('\n> ')}
                    className="p-1.5 rounded hover:bg-slate-800 hover:text-white transition-colors"
                    title="Blockquote"
                  >
                    <Quote className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertMarkdown('\n- ')}
                    className="p-1.5 rounded hover:bg-slate-800 hover:text-white transition-colors"
                    title="List Item"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertMarkdown('\n| Feature | Benchmark | Value |\n|---|---|---|\n| Metric | 99.8% | High |\n')}
                    className="p-1.5 rounded hover:bg-slate-800 hover:text-white transition-colors"
                    title="Table"
                  >
                    <TableIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <div className="text-[11px] text-slate-400 font-mono">
                {wordCount.toLocaleString()} words &bull; ~{readingTimeMinutes} min read
              </div>
            </div>

            {/* Editor Area */}
            {viewMode === 'edit' ? (
              <textarea
                id="content-editor"
                rows={22}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your article in Markdown format here...
Use ## Heading 2 for main sections
Use ### Heading 3 for subsections
Add comparison tables, bullet points, and code blocks as needed."
                className="w-full p-5 bg-[#090d16] text-slate-100 font-mono text-xs sm:text-sm leading-relaxed border-none focus:outline-none resize-y min-h-[450px]"
              />
            ) : (
              <div className="p-6 bg-[#090d16] min-h-[450px] overflow-y-auto prose prose-invert prose-blue max-w-none text-xs sm:text-sm">
                <div className="border-b border-slate-800 pb-4 mb-4">
                  <h1 className="text-xl sm:text-2xl font-black text-white">{title || 'Untitled Post'}</h1>
                  <p className="text-slate-400 italic mt-1">{excerpt || 'No excerpt provided'}</p>
                </div>
                <div className="whitespace-pre-wrap font-sans leading-relaxed text-slate-200">
                  {content || 'No content written yet. Switch to Editor tab to add content.'}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Settings (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Category & Author Card */}
          <div className="bg-[#111827] border border-slate-800 p-5 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2">
              Publication Settings
            </h3>

            {/* Category */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <FolderTree className="w-3.5 h-3.5 text-blue-400" />
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="technology">Technology</option>
                <option value="ai">Artificial Intelligence</option>
                <option value="business">Business & Growth</option>
                <option value="productivity">Productivity</option>
              </select>
            </div>

            {/* Author */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-purple-400" />
                Author Byline
              </label>
              <select
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Alex Vance">Alex Vance (AI & Systems)</option>
                <option value="Sarah Chen">Sarah Chen (Software Engineering)</option>
                <option value="Elena Rostova">Elena Rostova (Productivity & Cognitive)</option>
                <option value="Marcus Sterling">Marcus Sterling (SaaS & Digital Wealth)</option>
                <option value="BunusRadar Editorial">BunusRadar Editorial Desk</option>
              </select>
            </div>

            {/* Publish Date */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                Publish Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-emerald-400" />
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="ai, nextjs, machine-learning"
                className="w-full px-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Featured Image & Cover Art Card */}
          <div className="bg-[#111827] border border-slate-800 p-5 rounded-2xl shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
                Featured Image
              </h3>
              <button
                type="button"
                onClick={handleGenerateCover}
                disabled={generatingCover}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-indigo-400" />
                {generatingCover ? 'Generating...' : 'AI Flux Art'}
              </button>
            </div>

            <div>
              <input
                type="url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {coverImage && (
              <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-800 bg-[#090d16]">
                <SafeImage
                  src={coverImage}
                  fallbackSrc={getCategoryFallback(category)}
                  alt="Cover Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* SEO Meta Excerpt Card */}
          <div className="bg-[#111827] border border-slate-800 p-5 rounded-2xl shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                SEO Description / Excerpt
              </h3>
              <span className={`text-[10px] font-mono ${excerpt.length > 160 ? 'text-amber-400' : 'text-slate-500'}`}>
                {excerpt.length}/160 chars
              </span>
            </div>

            <textarea
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Concise summary shown on Google search snippets and social media previews..."
              className="w-full px-3 py-2 bg-[#090d16] border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
