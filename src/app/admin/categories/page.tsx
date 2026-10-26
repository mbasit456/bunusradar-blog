'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FolderTree, FileText, ArrowRight, ExternalLink } from 'lucide-react';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([
    {
      name: 'Technology',
      slug: 'technology',
      desc: 'Next.js, Web Performance, Systems Engineering, Modern Frameworks',
      color: 'blue',
      count: 0,
    },
    {
      name: 'Artificial Intelligence',
      slug: 'ai',
      desc: 'Large Language Models, Autonomous Agents, Developer Tooling, Reasoning',
      color: 'purple',
      count: 0,
    },
    {
      name: 'Business & Growth',
      slug: 'business',
      desc: 'Micro-SaaS Models, Fintech, Unit Economics, Digital Monetization',
      color: 'emerald',
      count: 0,
    },
    {
      name: 'Productivity',
      slug: 'productivity',
      desc: 'Workflow Stacks, Focus Architectures, Cognitive Systems',
      color: 'amber',
      count: 0,
    },
  ]);

  useEffect(() => {
    fetch('/api/admin/posts')
      .then((r) => r.json())
      .then((data) => {
        if (data.success && Array.isArray(data.posts)) {
          const counts: Record<string, number> = {};
          data.posts.forEach((p: any) => {
            const cat = (p.category || '').toLowerCase();
            counts[cat] = (counts[cat] || 0) + 1;
          });

          setCategories((prev) =>
            prev.map((c) => ({
              ...c,
              count: counts[c.slug] || 0,
            }))
          );
        }
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <FolderTree className="w-6 h-6 text-purple-400" />
          Categories & Content Hubs
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Review core topical pillars and article distribution across BunusRadar.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {categories.map((cat) => (
          <div
            key={cat.slug}
            className="bg-[#111827] border border-slate-800 p-6 rounded-2xl shadow-sm space-y-4 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>{cat.name}</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-semibold font-mono">
                    /category/{cat.slug}
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{cat.desc}</p>
              </div>

              <div className="text-right">
                <span className="text-2xl font-black text-white">{cat.count}</span>
                <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                  Articles
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <Link
                href={`/admin/posts?category=${cat.slug}`}
                className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
              >
                <span>Filter Articles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href={`/category/${cat.slug}`}
                target="_blank"
                className="text-slate-400 hover:text-white flex items-center gap-1"
              >
                <span>View Live Hub</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
