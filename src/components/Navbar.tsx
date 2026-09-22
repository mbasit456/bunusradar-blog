'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search, ChevronDown, Rss } from 'lucide-react';
import { CATEGORIES } from '@/lib/categories';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header className="w-full bg-[#1b2e67] text-white shadow-md sticky top-0 z-50 transition-colors">
      {/* Top Sub-Bar with Date & Trending */}
      <div className="bg-[#14234f] text-[11px] text-zinc-300 border-b border-white/10 py-1 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[#f9b44d] font-bold uppercase tracking-wider">Trending:</span>
            <span className="hidden sm:inline text-zinc-300 hover:text-white transition-colors truncate max-w-md">
              Enterprise AI & Edge Computing hardware shifts in 2026
            </span>
          </div>
          <div className="flex items-center gap-4 text-zinc-400">
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <Link href="/rss.xml" target="_blank" className="hover:text-[#f9b44d] flex items-center gap-1 transition-colors">
              <Rss className="w-3 h-3 text-[#f9b44d]" /> RSS
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header & Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Brand Logo - TG Daily Style */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-white text-[#1b2e67] font-black text-2xl tracking-tighter px-2.5 py-1 rounded shadow-sm group-hover:bg-[#f9b44d] group-hover:text-[#1b2e67] transition-all">
              BR
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-extrabold text-2xl tracking-tight text-white group-hover:text-[#f9b44d] transition-colors">
                BUNUS<span className="text-[#f9b44d]">RADAR</span>
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-widest text-zinc-300">
                More Than The News
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              href="/"
              className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#f9b44d] hover:bg-white/10 rounded transition-colors"
            >
              Home
            </Link>

            {Object.values(CATEGORIES).map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-white hover:text-[#f9b44d] hover:bg-white/10 rounded transition-colors"
              >
                {cat.name}
              </Link>
            ))}

            <Link
              href="/about"
              className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-white hover:text-[#f9b44d] hover:bg-white/10 rounded transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Search Trigger & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-white hover:text-[#f9b44d] hover:bg-white/10 rounded transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-white hover:text-[#f9b44d] hover:bg-white/10 rounded focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Search Input Bar */}
      {searchOpen && (
        <div className="bg-[#14234f] border-t border-white/10 px-4 py-3 animate-fadeIn">
          <form onSubmit={handleSearchSubmit} className="max-w-4xl mx-auto flex items-center gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news, hardware, software, business, AI..."
              className="w-full px-4 py-2 text-sm bg-white text-zinc-900 rounded focus:outline-none focus:ring-2 focus:ring-[#f9b44d]"
              autoFocus
            />
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold uppercase bg-[#f9b44d] hover:bg-[#e09e38] text-[#1b2e67] rounded transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-[#14234f] border-t border-white/10 px-4 pt-2 pb-6 space-y-1">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-sm font-bold uppercase tracking-wider text-[#f9b44d] hover:bg-white/10 rounded"
          >
            Home
          </Link>
          {Object.values(CATEGORIES).map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-sm font-bold uppercase tracking-wider text-white hover:text-[#f9b44d] hover:bg-white/10 rounded"
            >
              {cat.name}
            </Link>
          ))}
          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-sm font-bold uppercase tracking-wider text-white hover:text-[#f9b44d] hover:bg-white/10 rounded"
          >
            About
          </Link>
        </div>
      )}
    </header>
  );
}
