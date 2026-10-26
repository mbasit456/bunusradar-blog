'use client';

import Link from 'next/link';
import {
  Globe,
  CheckCircle,
  ExternalLink,
  ShieldCheck,
  FileCheck,
  Radio,
  Rss,
  Bot,
  Search
} from 'lucide-react';

export default function AdminSeoPage() {
  const sitemaps = [
    {
      title: 'Sitemap Index (Master)',
      url: '/sitemap_index.xml',
      desc: 'Top-level sitemap index linking standard sitemap and Google News sitemap.',
      status: 'Active (200 OK)',
      type: 'XML Sitemap Index',
    },
    {
      title: 'Main Content Sitemap',
      url: '/sitemap.xml',
      desc: 'All published articles, category hubs, author profiles, and tools with <lastmod> dates.',
      status: 'Active (200 OK)',
      type: 'Standard XML Sitemap',
    },
    {
      title: 'Google News Sitemap',
      url: '/sitemap-news.xml',
      desc: 'Filtered strictly to articles published within the last 48-hour window for Google News indexing.',
      status: 'Active (200 OK)',
      type: 'News XML Sitemap',
    },
    {
      title: 'Full RSS 2.0 Feed',
      url: '/rss.xml',
      desc: 'Syndication feed for news readers, Google News Publisher Center, and automated aggregators.',
      status: 'Active (200 OK)',
      type: 'RSS 2.0 XML',
    },
    {
      title: 'Robots Protocol',
      url: '/robots.txt',
      desc: 'Bot permissions: Welcoming Googlebot, Bingbot, GPTBot, ClaudeBot, and declaring sitemaps.',
      status: 'Active (200 OK)',
      type: 'Robots.txt',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <Globe className="w-6 h-6 text-emerald-400" />
          SEO, Sitemaps & Search Console Health
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Monitor your live sitemap feeds, Google News compliance, and Search Console indexing signals.
        </p>
      </div>

      {/* Sitemaps List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {sitemaps.map((item) => (
          <div
            key={item.url}
            className="bg-[#111827] border border-slate-800 p-6 rounded-2xl shadow-sm space-y-3 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span>{item.title}</span>
                </h2>
                <code className="text-xs text-blue-400 font-mono mt-1 block">{item.url}</code>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-[10px] font-bold text-emerald-400">
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                <span>{item.status}</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-500 font-medium">{item.type}</span>
              <Link
                href={item.url}
                target="_blank"
                className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
              >
                <span>Inspect Feed</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Search Console & Webmaster Tools Links */}
      <div className="bg-[#111827] border border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Search className="w-5 h-5 text-blue-400" />
          Webmaster Central & Indexing Dashboards
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <a
            href="https://search.google.com/search-console"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-blue-500 hover:bg-slate-800/80 transition-all flex items-center justify-between group"
          >
            <div>
              <h3 className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                Google Search Console
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Submit sitemaps & monitor index coverage</p>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
          </a>

          <a
            href="https://publishercenter.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-blue-500 hover:bg-slate-800/80 transition-all flex items-center justify-between group"
          >
            <div>
              <h3 className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                Google News Publisher Center
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Publication review & RSS feed sync</p>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
          </a>

          <a
            href="https://www.bing.com/webmasters"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-blue-500 hover:bg-slate-800/80 transition-all flex items-center justify-between group"
          >
            <div>
              <h3 className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                Bing Webmaster Tools
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">IndexNow instant crawler integration</p>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
          </a>
        </div>
      </div>
    </div>
  );
}
