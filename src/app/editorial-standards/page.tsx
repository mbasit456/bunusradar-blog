import Link from 'next/link';
import { Metadata } from 'next';
import { ShieldCheck, CheckCircle2, AlertCircle, RefreshCw, FileText, Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Editorial Standards & Integrity Policy | BunusRadar',
  description: 'Learn about BunusRadar’s commitment to journalistic integrity, rigorous fact-checking, AI disclosure, and unbiased reviews.',
  alternates: {
    canonical: 'https://bunusradar.site/editorial-standards',
  },
  openGraph: {
    url: 'https://bunusradar.site/editorial-standards',
    title: 'Editorial Standards & Integrity Policy | BunusRadar',
    description: 'Learn about BunusRadar’s commitment to journalistic integrity, rigorous fact-checking, AI disclosure, and unbiased reviews.',
  },
};

export default function EditorialStandardsPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-900 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Journalistic Integrity & Quality</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Editorial Standards & Guidelines
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
            At <strong>BunusRadar</strong>, our mission is to provide authoritative, actionable, and transparent intelligence across Technology, Artificial Intelligence, Business & Growth, Productivity, and Modern Lifestyle.
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Last Updated: September 23, 2026 • Published by the BunusRadar Editorial Board
          </p>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">1. Fact-Checking & Primary Sources</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We verify all claims against primary sources—including developer documentation, scientific journals, veterinary consensus, and regulatory filings. Speculative statements are explicitly identified as such.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">2. Unbiased Reviews & Independence</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Our software reviews, buying guides, and product comparisons are completely independent. Advertisers and sponsors have zero influence over rankings, conclusions, or critical evaluations.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">3. Responsible AI Disclosure</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We leverage advanced artificial intelligence tools to augment topic research, code generation benchmarks, and data structuring. Every piece of published content undergoes rigorous editorial curation and formatting.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">4. Transparent Corrections</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              When factual errors or outdated specifications are identified, we correct them promptly. Significant modifications include an explicit editor&apos;s note documenting the change and original context.
            </p>
          </div>
        </div>

        {/* Detailed Guidelines */}
        <div className="space-y-6 pt-4 text-zinc-700 dark:text-zinc-300 leading-relaxed">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Product Testing & Benchmark Methodology</h2>
          <p>
            When our editorial staff and research analysts evaluate digital tools, AI models, or developer software:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <li>We evaluate real-world performance, latency, pricing transparency, and data privacy policies.</li>
            <li>We compare alternatives directly across standardized metrics using our documented <Link href="/methodology" className="text-[#1b2e67] font-semibold underline">5-Dimension Testing Framework</Link>.</li>
            <li>Every software benchmark is run on standardized hardware (Apple Silicon / Linux testbeds) and recorded with public version numbers and dates.</li>
            <li>Raw benchmark outputs and scoring datasets are made publicly accessible via the <Link href="/research" className="text-[#1b2e67] font-semibold underline">BunusRadar Research Hub</Link>.</li>
            <li>We update guides and comparisons on a rolling quarterly cycle or immediately following major model releases.</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white pt-4">Editorial Oversight & Review Team</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            All content published under BunusRadar is reviewed for technical accuracy, code validity, and primary-source integrity by our editorial leads:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs">
              <strong>Alex Vance</strong> · AI Architecture Lead & Senior Technical Editor
              <span className="block text-zinc-500 mt-0.5">Oversight for AI models, coding assistants & benchmark datasets.</span>
            </div>
            <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs">
              <strong>Sarah Chen</strong> · Full-Stack & Systems Engineering Editor
              <span className="block text-zinc-500 mt-0.5">Oversight for web engineering, Next.js performance & cloud architectures.</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white pt-4">Commercial Disclosures (FTC Compliance)</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Some links on BunusRadar may be affiliate links. If you make a purchase after clicking these links, we may earn an affiliate commission at no additional cost to you. This compensation never affects our editorial recommendations or product ratings. Products provided by vendors for review receive zero favorable scoring bias and are evaluated strictly against our public benchmark rubric.
          </p>
        </div>

        {/* CTA */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-[#1b2e67] to-[#14234f] text-white space-y-4">
          <h3 className="text-xl font-bold">Have a correction or feedback?</h3>
          <p className="text-sm text-zinc-300 leading-relaxed">
            We value community vigilance. If you identify an inaccuracy or have questions regarding our research methodology, please reach out to our editorial desk.
          </p>
          <div className="pt-2">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#f9b44d] text-[#1b2e67] hover:bg-white transition-colors"
            >
              Learn More About BunusRadar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
