'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/lib/categories';
import { 
  Rss, 
  Mail, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowUp, 
  Send, 
  Sparkles,
  Layers,
  ExternalLink
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#121f45] text-white mt-20 border-t border-slate-800 relative">
      {/* Top Accent Strip */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#1b2e67] via-[#f9b44d] to-[#1b2e67]" />

      {/* Pre-Footer Newsletter & Trust Section */}
      <div className="border-b border-white/10 bg-[#0d1733]/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Newsletter Pitch */}
            <div className="lg:col-span-6 space-y-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#f9b44d]/15 text-[#f9b44d] text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Executive Intelligence Briefing</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Get the morning breakdown top engineers rely on
              </h3>
              <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
                Curated AI model benchmarks, edge computing architecture, and software analysis delivered directly to your inbox every weekday morning.
              </p>
            </div>

            {/* Newsletter Form */}
            <div className="lg:col-span-6">
              {subscribed ? (
                <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-4 flex items-center gap-3 text-emerald-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <p className="text-sm">
                    Thank you for subscribing. Check your inbox for the latest intelligence briefing.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your professional email address..."
                      required
                      className="w-full bg-slate-900/90 border border-slate-700/80 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#f9b44d] focus:border-transparent transition"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#f9b44d] hover:bg-[#e09e3a] text-[#1b2e67] font-bold text-sm rounded-lg transition-all shadow-md hover:shadow-lg shrink-0 cursor-pointer"
                  >
                    <span>Subscribe</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
              <div className="mt-3 flex items-center gap-6 text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Zero spam guaranteed
                </span>
                <span>•</span>
                <span>Unsubscribe anytime in 1 click</span>
                <span>•</span>
                <span>Strict privacy standard</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Column 1: Brand Info (5 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="bg-white text-[#1b2e67] font-black text-xl tracking-tighter px-2.5 py-1 rounded shadow-sm group-hover:bg-[#f9b44d] transition-colors">
                BR
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-extrabold text-2xl tracking-tight text-white group-hover:text-[#f9b44d] transition-colors">
                  BUNUS<span className="text-[#f9b44d]">RADAR</span>
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-widest text-slate-300 mt-1">
                  More Than The News
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-300 leading-relaxed">
              BunusRadar is an independent technology newsroom delivering objective evaluations of artificial intelligence models, enterprise software systems, developer tooling, and modern digital hardware.
            </p>

            <div className="p-3.5 rounded-lg bg-white/5 border border-white/10 space-y-2">
              <div className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Editorial Newsroom Desk
              </div>
              <p className="text-xs text-slate-400">
                Direct tips, corrections, or researcher briefings:
              </p>
              <a
                href="mailto:editorial@bunusradar.site"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#f9b44d] hover:underline"
              >
                <Mail className="w-3.5 h-3.5" />
                editorial@bunusradar.site
              </a>
            </div>

            <div className="flex items-center gap-4 pt-1">
              <Link
                href="/rss.xml"
                target="_blank"
                className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-[#f9b44d] transition-colors"
              >
                <Rss className="w-3.5 h-3.5 text-[#f9b44d]" />
                <span>RSS Feed</span>
              </Link>
              <span className="text-slate-600">•</span>
              <Link
                href="/sitemap.xml"
                target="_blank"
                className="text-xs text-slate-300 hover:text-[#f9b44d] transition-colors"
              >
                XML Sitemap
              </Link>
              <span className="text-slate-600">•</span>
              <Link
                href="/latest-publications"
                className="text-xs text-slate-300 hover:text-[#f9b44d] transition-colors"
              >
                Archive
              </Link>
            </div>
          </div>

          {/* Column 2: Topical Categories (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#f9b44d] pb-2 border-b border-white/10 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              Coverage
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              {Object.values(CATEGORIES).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="hover:text-[#f9b44d] transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="text-slate-500 group-hover:text-[#f9b44d] text-xs">›</span>
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/latest-publications"
                  className="text-xs text-[#f9b44d] hover:underline inline-flex items-center gap-1"
                >
                  <span>All Articles</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Editorial & Methodology (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#f9b44d] pb-2 border-b border-white/10 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Editorial Standards
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link href="/about" className="hover:text-[#f9b44d] transition-colors flex items-center gap-1.5 group">
                  <span className="text-slate-500 group-hover:text-[#f9b44d] text-xs">›</span>
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/editorial-standards" className="hover:text-[#f9b44d] transition-colors flex items-center gap-1.5 group">
                  <span className="text-slate-500 group-hover:text-[#f9b44d] text-xs">›</span>
                  <span>Editorial Guidelines</span>
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="hover:text-[#f9b44d] transition-colors flex items-center gap-1.5 group">
                  <span className="text-slate-500 group-hover:text-[#f9b44d] text-xs">›</span>
                  <span>Testing Methodology</span>
                </Link>
              </li>
              <li>
                <Link href="/research" className="hover:text-[#f9b44d] transition-colors flex items-center gap-1.5 group">
                  <span className="text-slate-500 group-hover:text-[#f9b44d] text-xs">›</span>
                  <span>Research & Benchmarks</span>
                </Link>
              </li>
              <li>
                <Link href="/authors" className="hover:text-[#f9b44d] transition-colors flex items-center gap-1.5 group">
                  <span className="text-slate-500 group-hover:text-[#f9b44d] text-xs">›</span>
                  <span>Editorial Staff & Authors</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#f9b44d] transition-colors flex items-center gap-1.5 group">
                  <span className="text-slate-500 group-hover:text-[#f9b44d] text-xs">›</span>
                  <span>Contact Our Newsroom</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: AdSense & Regulatory Compliance (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#f9b44d] pb-2 border-b border-white/10 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Legal & Compliance
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link href="/privacy-policy" className="hover:text-[#f9b44d] transition-colors flex items-center gap-1.5 group font-medium text-white">
                  <span className="text-[#f9b44d] text-xs">›</span>
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-[#f9b44d] transition-colors flex items-center gap-1.5 group">
                  <span className="text-slate-500 group-hover:text-[#f9b44d] text-xs">›</span>
                  <span>Terms and Conditions</span>
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-[#f9b44d] transition-colors flex items-center gap-1.5 group">
                  <span className="text-slate-500 group-hover:text-[#f9b44d] text-xs">›</span>
                  <span>Disclaimer</span>
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="hover:text-[#f9b44d] transition-colors flex items-center gap-1.5 group">
                  <span className="text-slate-500 group-hover:text-[#f9b44d] text-xs">›</span>
                  <span>Cookie Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy-terms" className="hover:text-[#f9b44d] transition-colors flex items-center gap-1.5 group">
                  <span className="text-slate-500 group-hover:text-[#f9b44d] text-xs">›</span>
                  <span>User Rights Overview</span>
                </Link>
              </li>
            </ul>

            <div className="pt-2 text-[11px] text-slate-400 bg-black/20 p-2.5 rounded border border-white/5 leading-relaxed">
              Google AdSense certified publisher. Compliant with GDPR, CCPA, and FTC disclosure guidelines.
            </div>
          </div>
        </div>

        {/* Bottom Legal Notice & Copyright Strip */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="space-y-1 text-center md:text-left">
            <p className="text-slate-300">
              © {new Date().getFullYear()} BunusRadar. All rights reserved.
            </p>
            <p className="text-[11px] text-slate-500 max-w-2xl">
              Independent technology reporting and software evaluation. Registered trademarks and brand logos mentioned on this site belong to their respective copyright holders.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              Edge-rendered on Next.js
            </span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors cursor-pointer text-xs"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
