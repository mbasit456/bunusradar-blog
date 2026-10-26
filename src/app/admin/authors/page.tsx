import SafeImage from '@/components/SafeImage';
'use client';

import Link from 'next/link';
import { Users, ExternalLink, ShieldCheck, Award } from 'lucide-react';

const AUTHORS = [
  {
    name: 'Alex Vance',
    slug: 'alex-vance',
    role: 'AI & Systems Contributor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    expertise: ['Large Language Models', 'AI Coding Assistants', 'Systems Architecture', 'Developer Tools'],
    bio: 'Specializes in comparative AI benchmarks, model evals, and developer architectures.',
  },
  {
    name: 'Sarah Chen',
    slug: 'sarah-chen',
    role: 'Software Engineering Contributor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    expertise: ['Next.js Architecture', 'Web Performance Optimization', 'Frontend Systems', 'API Design'],
    bio: 'Covers modern JavaScript runtimes, rendering strategies, and Core Web Vitals.',
  },
  {
    name: 'Elena Rostova',
    slug: 'elena-rostova',
    role: 'Productivity & Cognitive Systems Contributor',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    expertise: ['Personal Knowledge Management', 'Deep Work Systems', 'Remote Work Culture', 'Cognitive Ergonomics'],
    bio: 'Explores workflow stacks, habit engines, and focus architectures for high-output knowledge workers.',
  },
  {
    name: 'Marcus Sterling',
    slug: 'marcus-sterling',
    role: 'SaaS & Digital Wealth Contributor',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    expertise: ['Micro-SaaS Models', 'Digital Business Architecture', 'Subscription Economics', 'Automated Income Systems'],
    bio: 'Focuses on boot-strapped software economics, monetization systems, and programmatic revenue.',
  },
  {
    name: 'BunusRadar Editorial',
    slug: 'bunusradar-editorial',
    role: 'Central Editorial Desk',
    avatar: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=150&q=80',
    expertise: ['Technology Analysis', 'Fact Checking', 'Editorial Guidelines', 'Industry Syntheses'],
    bio: 'The collaborative staff editorial desk adhering to BunusRadar fact-checking and news standards.',
  },
];

export default function AdminAuthorsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <Users className="w-6 h-6 text-amber-400" />
          Editorial Authors & Bylines
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Review registered contributor profiles and Person schema entities for Google Search attribution.
        </p>
      </div>

      {/* Authors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {AUTHORS.map((author) => (
          <div
            key={author.slug}
            className="bg-[#111827] border border-slate-800 p-6 rounded-2xl shadow-sm space-y-4 hover:border-slate-700 transition-colors flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <SafeImage
                  src={author.avatar}
                  alt={author.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-slate-700 shadow-sm"
                />
                <div>
                  <h2 className="text-sm font-bold text-white">{author.name}</h2>
                  <p className="text-[11px] text-amber-400 font-semibold">{author.role}</p>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">{author.bio}</p>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block mb-1.5">
                  Core Expertise
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {author.expertise.map((exp) => (
                    <span
                      key={exp}
                      className="px-2 py-0.5 rounded text-[10px] bg-slate-800 border border-slate-700/80 text-slate-300 font-medium"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <Link
                href={`/admin/posts?author=${author.name}`}
                className="text-blue-400 hover:text-blue-300 font-semibold text-xs"
              >
                View Articles &rarr;
              </Link>
              <Link
                href={`/author/${author.slug}`}
                target="_blank"
                className="text-slate-400 hover:text-white flex items-center gap-1 text-xs"
              >
                <span>Live Profile</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
