'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PostMetadata } from '@/lib/posts';
import { CATEGORIES } from '@/lib/categories';
import { Flame, Layers, BarChart3, ArrowRight } from 'lucide-react';

interface SidebarProps {
  mustReadPosts: PostMetadata[];
}

export default function Sidebar({ mustReadPosts }: SidebarProps) {


  return (
    <aside className="space-y-8">
      {/* Must Read Widget - TG Daily Signature */}
      <div className="bg-white border-t-4 border-[#1b2e67] shadow-sm p-5 rounded-b">
        <div className="flex items-center gap-2 pb-3 mb-4 border-b border-zinc-100">
          <Flame className="w-4 h-4 text-[#f9b44d]" />
          <h3 className="font-black text-sm uppercase tracking-wider text-zinc-900">
            Must Read
          </h3>
        </div>

        <div className="space-y-4 divide-y divide-zinc-100">
          {mustReadPosts.slice(0, 5).map((post, idx) => (
            <div key={post.slug} className={idx === 0 ? '' : 'pt-3'}>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1b2e67]">
                {post.category}
              </span>
              <Link
                href={`/blog/${post.slug}`}
                className="block text-sm font-bold leading-snug text-zinc-900 hover:text-[#1b2e67] transition-colors mt-0.5"
              >
                {post.title}
              </Link>
              <div className="flex items-center gap-2 text-[11px] text-zinc-600 mt-1">
                <span>By {post.author.name}</span>
                <span>•</span>
                <span>{post.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Explore Topics Widget */}
      <div className="bg-white border-t-4 border-[#f9b44d] shadow-sm p-5 rounded-b">
        <div className="flex items-center gap-2 pb-3 mb-4 border-b border-zinc-100">
          <Layers className="w-4 h-4 text-[#1b2e67]" />
          <h3 className="font-black text-sm uppercase tracking-wider text-zinc-900">
            Categories
          </h3>
        </div>

        <div className="space-y-2">
          {Object.values(CATEGORIES).map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="flex items-center justify-between py-2.5 px-2.5 min-h-[40px] text-xs font-semibold text-zinc-700 hover:text-[#1b2e67] hover:bg-zinc-50 rounded transition-colors group"
            >
              <span>{cat.name}</span>
              <ArrowRight className="w-3 h-3 text-zinc-400 group-hover:translate-x-1 group-hover:text-[#1b2e67] transition-all" />
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Research & Tools Widget */}
      <div className="bg-[#1b2e67] text-white p-6 rounded shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-[#f9b44d] text-xs font-bold uppercase tracking-wider">
          <BarChart3 className="w-4 h-4" /> Original Research & Tools
        </div>
        <h4 className="text-base font-extrabold leading-snug">
          Independent AI Benchmarks & Real-Time Trackers
        </h4>
        <p className="text-xs text-zinc-300 leading-relaxed">
          Access our open research datasets, coding assistant evaluations, and live token pricing matrices.
        </p>

        <div className="space-y-2 pt-1">
          <Link
            href="/research#ai-coding-benchmark"
            className="flex items-center justify-between p-2.5 rounded bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
          >
            <span>Coding Assistant Benchmark 2026</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#f9b44d]" />
          </Link>
          <Link
            href="/research#llm-pricing"
            className="flex items-center justify-between p-2.5 rounded bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
          >
            <span>Frontier LLM Token Cost Tracker</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#f9b44d]" />
          </Link>
          <Link
            href="/tools/free-ai-chat"
            className="flex items-center justify-between p-2.5 rounded bg-[#f9b44d] hover:bg-[#e09e38] text-xs font-bold text-[#1b2e67] transition-colors"
          >
            <span>Launch Free AI Chatbot</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#1b2e67]" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
