import Link from 'next/link';
import { Metadata } from 'next';
import { ShieldCheck, CheckCircle2, AlertCircle, RefreshCw, FileText, Scale, History, Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Editorial Standards & Integrity Policy | BunusRadar',
  description: 'Learn about BunusRadar’s commitment to journalistic integrity, rigorous fact-checking, public corrections register, AI disclosure, and unbiased reviews.',
  alternates: {
    canonical: 'https://bunusradar.site/editorial-standards',
  },
  openGraph: {
    url: 'https://bunusradar.site/editorial-standards',
    title: 'Editorial Standards & Integrity Policy | BunusRadar',
    description: 'Learn about BunusRadar’s commitment to journalistic integrity, rigorous fact-checking, public corrections register, AI disclosure, and unbiased reviews.',
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
            At <strong>BunusRadar</strong>, our mission is to provide authoritative, actionable, and transparent intelligence across Technology, Artificial Intelligence, Software Architecture, and Enterprise AI Productivity Systems.
          </p>
          <p data-nosnippet="true" className="text-sm text-zinc-500 dark:text-zinc-400">
            Last Updated: October 31, 2026 • Published by the BunusRadar Editorial Board
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
              We verify all claims against primary sources - including official developer documentation, peer-reviewed computer science literature, vendor API specifications, and public regulatory filings. Speculative statements are explicitly identified.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">2. Unbiased Reviews & Independence</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Our software reviews, buying guides, and product comparisons are completely independent. Advertisers, venture backers, and model providers have zero influence over rankings, conclusions, or benchmark ratings.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">3. Responsible AI Disclosure</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We use advanced AI tools to assist in data aggregation, code sandbox testing, and initial formatting. Every piece of published content is planned, authored, fact-checked, and finalized by named human domain experts.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">4. Transparent Corrections Policy</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              When factual errors, outdated pricing models, or superseded benchmark metrics are identified, we correct them immediately. Significant updates include an explicit, dated editor note documenting the modification.
            </p>
          </div>
        </div>

        {/* Public Corrections Register */}
        <section className="p-6 sm:p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1b2e67] text-white flex items-center justify-center">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Public Corrections Register & Editorial Changelog</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Auditable log of substantive factual corrections, model updates, and data reconciliations.</p>
            </div>
          </div>

          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            In accordance with our correction commitments, minor typographical or grammatical adjustments are made directly without interrupting reader flow. Substantive factual updates (such as vendor API pricing cuts, updated model versions, or benchmark dataset adjustments) are logged below and appended as a dated Editor Note on the respective article.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-700 dark:text-zinc-300 border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 font-semibold uppercase tracking-wider">
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Article / Asset</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Resolution & Modification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                <tr>
                  <td className="py-3 px-3 font-semibold text-zinc-900 dark:text-white whitespace-nowrap">Oct 31, 2026</td>
                  <td className="py-3 px-3 font-medium">OpenAI o1 vs GPT-4o: Benchmark and Cost Guide</td>
                  <td className="py-3 px-3"><span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-semibold">Pricing Sync</span></td>
                  <td className="py-3 px-3 text-zinc-600 dark:text-zinc-400">Reconciled baseline GPT-4o token rates from legacy $5.00/$15.00 to current official $2.50 input / $10.00 output per 1M tokens to maintain consistency with our live Research Hub tracker.</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-zinc-900 dark:text-white whitespace-nowrap">Oct 31, 2026</td>
                  <td className="py-3 px-3 font-medium">ChatGPT vs Claude vs Gemini: Practical Comparison</td>
                  <td className="py-3 px-3"><span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-semibold">Model Update</span></td>
                  <td className="py-3 px-3 text-zinc-600 dark:text-zinc-400">Updated frontier model comparisons to feature Claude 3.7 Sonnet and Gemini 2.0 Flash; replaced deprecated ChatGPT plugin references with Custom GPT Actions and structured outputs.</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-zinc-900 dark:text-white whitespace-nowrap">Oct 31, 2026</td>
                  <td className="py-3 px-3 font-medium">DeepSeek V3 Benchmark & Research Hub Dataset</td>
                  <td className="py-3 px-3"><span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-semibold">Dataset Audit</span></td>
                  <td className="py-3 px-3 text-zinc-600 dark:text-zinc-400">Harmonized cached versus standard input pricing across the downloadable JSON dataset to match official DeepSeek V3 rates ($0.14 input / $0.28 output per million tokens).</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-semibold text-zinc-900 dark:text-white whitespace-nowrap">Oct 25, 2026</td>
                  <td className="py-3 px-3 font-medium">Best AI Coding Assistants 2026 Benchmark</td>
                  <td className="py-3 px-3"><span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-semibold">Methodology</span></td>
                  <td className="py-3 px-3 text-zinc-600 dark:text-zinc-400">Added detailed multi-file workspace specifications and published reproducible SWE-bench task seeds in the public JSON benchmark repository.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Detailed Guidelines */}
        <div className="space-y-6 pt-4 text-zinc-700 dark:text-zinc-300 leading-relaxed">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Product Testing & Benchmark Methodology</h2>
          <p>
            When our research analysts evaluate developer software, large language models, or AI productivity tools:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <li>We evaluate real-world performance, latency, pricing transparency, and data privacy policies.</li>
            <li>We compare alternatives directly across standardized metrics using our documented <Link href="/methodology" className="text-[#1b2e67] dark:text-blue-400 font-semibold underline">5-Dimension Testing Framework</Link>.</li>
            <li>Every software benchmark is run on standardized hardware (Apple Silicon / Linux testbeds) and recorded with public version numbers and dates.</li>
            <li>Raw benchmark outputs and scoring datasets are made publicly accessible via the <Link href="/research" className="text-[#1b2e67] dark:text-blue-400 font-semibold underline">BunusRadar Research Hub</Link>.</li>
            <li>We update guides and comparisons on a rolling quarterly cycle or immediately following major model releases.</li>
          </ul>

          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white pt-4">Editorial Oversight & Review Team</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            All content published under BunusRadar is reviewed for technical accuracy, code validity, and primary-source integrity by our editorial leads:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs">
              <strong>Alex Vance</strong> · Lead AI & Systems Researcher
              <span className="block text-zinc-500 mt-0.5">Oversight for AI models, coding assistants & benchmark datasets.</span>
            </div>
            <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs">
              <strong>Sarah Chen</strong> · Senior Software & Cloud Systems Analyst
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
            We value community vigilance. If you identify an inaccuracy or have questions regarding our research methodology, please reach out directly to our editorial desk.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#f9b44d] text-[#1b2e67] hover:bg-white transition-colors"
            >
              Submit a Correction Request
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
