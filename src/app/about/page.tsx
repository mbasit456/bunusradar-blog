import Link from 'next/link';
import { Metadata } from 'next';
import { Sparkles, Globe, Zap, Cpu, ArrowRight, TrendingUp, Brain, Briefcase, Clock, Heart } from 'lucide-react';
import { CATEGORIES } from '@/lib/categories';

export const metadata: Metadata = {
  title: 'About BunusRadar',
  description: 'BunusRadar is your daily source for the latest in Technology, AI, Business & Growth, Productivity, and Lifestyle. Fresh insights published every day.',
};

export default function AboutPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-900 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Your Daily Intelligence Briefing</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Welcome to BunusRadar
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
            BunusRadar is a modern daily blog covering the topics that matter most: Technology, Artificial Intelligence, Business & Growth, Productivity, and Lifestyle. We publish fresh, high-quality content every single day to keep you ahead of the curve.
          </p>
          <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Whether you want to discover the best AI tools, learn how to grow your business, build smart productivity habits, or explore the future of remote work — BunusRadar has you covered with practical, in-depth guides and analysis.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Brain className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">AI & Technology</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We cover the latest AI tools, models, coding assistants, and technology trends — from ChatGPT alternatives to the best free image generators. Honest, practical comparisons you can act on today.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Business & Growth</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              From micro-SaaS to passive income ideas, side hustles to work-from-home careers — we break down proven strategies to help you earn more and grow faster in 2026.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Productivity</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Deep dives into the best productivity tools, systems, and frameworks. From Notion templates to focus stacks and time-management strategies that actually work.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Lifestyle & Future</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Explore the future of remote work, digital nomad life, career reinvention, and how technology is reshaping the way we live, work, and connect in the years ahead.
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200 dark:border-blue-900 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Our Mission</h2>
          </div>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            BunusRadar exists to democratize access to high-quality information. We believe everyone deserves access to expert-level insights about technology, money, and modern life — presented clearly, without the fluff. That's why we publish every single day, covering the topics with the highest real-world impact for readers like you.
          </p>
        </div>

        {/* Categories Overview */}
        <div className="space-y-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Explore Our Topics
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

        {/* CTA */}
        <div className="text-center space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            New articles published daily. Stay ahead — explore what's new.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors"
          >
            <Globe className="w-4 h-4" />
            Browse Latest Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
