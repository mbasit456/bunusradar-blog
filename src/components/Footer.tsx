import Link from 'next/link';
import { CATEGORIES } from '@/lib/categories';
import { Rss } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1b2e67] text-white mt-16 border-t-4 border-[#f9b44d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="bg-white text-[#1b2e67] font-black text-xl px-2 py-0.5 rounded">
                BR
              </span>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                BUNUS<span className="text-[#f9b44d]">RADAR</span>
              </span>
            </Link>
            <p className="text-xs text-zinc-300 max-w-md leading-relaxed">
              BunusRadar delivers authoritative daily technology journalism, deep dives into artificial intelligence, hardware reviews, software architecture, and enterprise digital strategies.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-[#f9b44d]">
              <Link href="/rss.xml" target="_blank" className="flex items-center gap-1 hover:underline">
                <Rss className="w-3.5 h-3.5" /> RSS Feed
              </Link>
              <span>•</span>
              <Link href="/about" className="hover:underline">
                About Us
              </Link>
              <span>•</span>
              <Link href="/sitemap.xml" target="_blank" className="hover:underline">
                Sitemap
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#f9b44d] mb-3 pb-1 border-b border-white/10">
              Categories
            </h4>
            <ul className="space-y-1.5 text-xs text-zinc-300">
              {Object.values(CATEGORIES).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="hover:text-[#f9b44d] transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#f9b44d] mb-3 pb-1 border-b border-white/10">
              Editorial & Legal
            </h4>
            <ul className="space-y-1.5 text-xs text-zinc-300">
              <li>
                <Link href="/editorial-standards" className="hover:text-[#f9b44d] transition-colors">
                  Editorial Standards
                </Link>
              </li>
              <li>
                <Link href="/latest-publications" className="hover:text-[#f9b44d] transition-colors">
                  Latest Publications
                </Link>
              </li>
              <li>
                <Link href="/privacy-terms" className="hover:text-[#f9b44d] transition-colors">
                  Privacy & Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-400 gap-2">
          <p>© {new Date().getFullYear()} BunusRadar. All rights reserved.</p>
          <p>More than the news. Built on Next.js & edge network architecture.</p>
        </div>
      </div>
    </footer>
  );
}
