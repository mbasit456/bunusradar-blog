import Link from 'next/link';
import { Metadata } from 'next';
import { Sparkles, Globe, Zap, Cpu, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '@/lib/categories';

export const metadata: Metadata = {
  title: 'About GravityPulse',
  description: 'About GravityPulse - Modern autonomous intelligence, tech insights, and automated publishing.',
};

export default function AboutPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-900 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Publishing Philosophy</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Curating Knowledge at the Speed of Software
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
            GravityPulse is an automated, modern publication built to explore the boundaries of technology, generative intelligence, digital entrepreneurship, and productivity systems.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Autonomous Research</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Powered by Antigravity AI agents, each publication undergoes structured synthesis—distilling complex engineering and market trends into clear, actionable prose.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Sub-second Global Edge</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Hosted on Vercel’s global Edge Network with Next.js static site generation. Content is cached at the edge worldwide with instant loading and 100/100 Lighthouse performance.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Full Markdown Portability</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Zero vendor lock-in. All articles are stored in pure Markdown/MDX with frontmatter inside version-controlled Git repositories.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Built for High Velocity</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Generate an article with one CLI command or AI prompt, push to GitHub, and see it live across the globe within 30 seconds.
            </p>
          </div>
        </div>

        {/* Categories Overview */}
        <div className="space-y-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            What We Write About
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.values(CATEGORIES).map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="group p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 transition-all flex items-start justify-between"
              >
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
                    {cat.description}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 group-hover:text-blue-600 transition-all shrink-0 ml-3 mt-1" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
