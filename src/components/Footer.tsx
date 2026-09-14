import Link from 'next/link';
import { CATEGORIES } from '@/lib/categories';
import { Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800/80 mt-20 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 font-extrabold text-xl tracking-tight text-zinc-900 dark:text-white">
              <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md">
                <Sparkles className="w-4 h-4" />
              </span>
              <span>Gravity<span className="text-blue-600 dark:text-blue-400">Pulse</span></span>
            </Link>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-sm">
              An intelligent, high-velocity blog covering technology, artificial intelligence, modern business, and future trends. Built with Next.js, Vercel, and Antigravity automation.
            </p>
            <div className="text-xs text-zinc-500 dark:text-zinc-500">
              Powered by automated static generation & ultra-fast edge CDN.
            </div>
          </div>

          {/* Categories Col */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-200 mb-4">
              Categories
            </h3>
            <ul className="space-y-2.5 text-sm text-zinc-600 dark:text-zinc-400">
              {Object.values(CATEGORIES).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-200 mb-4">
              Explore & Resources
            </h3>
            <ul className="space-y-2.5 text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  All Posts
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  About the Blog
                </Link>
              </li>
              <li>
                <Link href="/rss.xml" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" target="_blank">
                  RSS Feed (XML)
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" target="_blank">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 dark:text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} GravityPulse. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Automated & Built with <Heart className="w-3.5 h-3.5 text-red-500 inline fill-red-500" /> on Next.js & Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}
