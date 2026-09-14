'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PostMetadata } from '@/lib/posts';
import { CATEGORIES } from '@/lib/categories';
import { Flame, Layers, Mail, ArrowRight, Check } from 'lucide-react';

interface SidebarProps {
  mustReadPosts: PostMetadata[];
}

export default function Sidebar({ mustReadPosts }: SidebarProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

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
              <div className="flex items-center gap-2 text-[11px] text-zinc-500 mt-1">
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
              className="flex items-center justify-between py-1.5 px-2 text-xs font-semibold text-zinc-700 hover:text-[#1b2e67] hover:bg-zinc-50 rounded transition-colors group"
            >
              <span>{cat.name}</span>
              <ArrowRight className="w-3 h-3 text-zinc-400 group-hover:translate-x-1 group-hover:text-[#1b2e67] transition-all" />
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter Signup Widget */}
      <div className="bg-[#1b2e67] text-white p-6 rounded shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-[#f9b44d] text-xs font-bold uppercase tracking-wider">
          <Mail className="w-4 h-4" /> Daily Tech Digest
        </div>
        <h4 className="text-base font-extrabold leading-snug">
          Get breaking technology & AI intelligence delivered daily.
        </h4>
        <p className="text-xs text-zinc-300">
          Join over 45,000 engineers and leaders who read BonusRadar every morning.
        </p>

        {subscribed ? (
          <div className="p-3 bg-white/20 rounded text-xs font-semibold flex items-center gap-2 text-emerald-300">
            <Check className="w-4 h-4" /> You are subscribed!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2 pt-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full px-3 py-2 text-xs bg-white text-zinc-900 rounded focus:outline-none"
              required
            />
            <button
              type="submit"
              className="w-full py-2 text-xs font-bold uppercase tracking-wider bg-[#f9b44d] hover:bg-[#e09e38] text-[#1b2e67] rounded transition-colors"
            >
              Subscribe Now
            </button>
          </form>
        )}
      </div>
    </aside>
  );
}
