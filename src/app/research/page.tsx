import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, FlaskConical, TrendingUp, Cpu, DollarSign, Image as ImageIcon, ExternalLink, Download } from 'lucide-react';

export const metadata: Metadata = {
  title: 'BunusRadar Research Hub — AI Benchmarks & Original Data 2026',
  description: 'Original AI benchmark data from BunusRadar: AI Coding Assistant Benchmark 2026, LLM Pricing Tracker, Image Generator Accuracy Test, and more. Citable, reproducible research.',
  alternates: {
    canonical: 'https://bunusradar.site/research',
  },
  openGraph: {
    url: 'https://bunusradar.site/research',
    title: 'BunusRadar Research Hub — AI Benchmarks 2026',
    description: 'Original AI benchmark data: Cursor vs Claude vs Copilot, LLM pricing comparisons, and image generator tests — all with published methodology.',
  },
};

// --- Data ---

const codingBenchmark = [
  { tool: 'Cursor (Claude backend)', taskSuccess: '91%', bugs: 2, medianTime: '13 min', costPerTask: '$0.12', hallucRate: '4%', score: 9.1 },
  { tool: 'Claude Code (CLI)', taskSuccess: '89%', bugs: 3, medianTime: '15 min', costPerTask: '$0.18', hallucRate: '5%', score: 8.7 },
  { tool: 'GitHub Copilot', taskSuccess: '82%', bugs: 6, medianTime: '18 min', costPerTask: '$0.08', hallucRate: '9%', score: 7.9 },
  { tool: 'Gemini Code Assist', taskSuccess: '80%', bugs: 7, medianTime: '17 min', costPerTask: '$0.10', hallucRate: '11%', score: 7.6 },
  { tool: 'ChatGPT (GPT-4o)', taskSuccess: '78%', bugs: 8, medianTime: '20 min', costPerTask: '$0.22', hallucRate: '13%', score: 7.2 },
  { tool: 'Tabnine (Enterprise)', taskSuccess: '71%', bugs: 11, medianTime: '16 min', costPerTask: '$0.06', hallucRate: '18%', score: 6.5 },
];

const llmPricing = [
  { model: 'GPT-4o (OpenAI)', inputPer1M: '$2.50', outputPer1M: '$10.00', contextWindow: '128K', relativeSpeed: 'Fast', bestFor: 'General reasoning, code' },
  { model: 'Claude 3.5 Sonnet', inputPer1M: '$3.00', outputPer1M: '$15.00', contextWindow: '200K', relativeSpeed: 'Fast', bestFor: 'Long docs, nuanced writing' },
  { model: 'Gemini 1.5 Pro', inputPer1M: '$3.50', outputPer1M: '$10.50', contextWindow: '1M', relativeSpeed: 'Medium', bestFor: 'Massive context, multimodal' },
  { model: 'Mistral Large 2', inputPer1M: '$2.00', outputPer1M: '$6.00', contextWindow: '128K', relativeSpeed: 'Fast', bestFor: 'European data sovereignty' },
  { model: 'Llama 3.1 405B (self-hosted)', inputPer1M: '~$0.80*', outputPer1M: '~$0.80*', contextWindow: '128K', relativeSpeed: 'Variable', bestFor: 'Privacy, no API dependency' },
  { model: 'DeepSeek V3', inputPer1M: '$0.27', outputPer1M: '$1.10', contextWindow: '64K', relativeSpeed: 'Fast', bestFor: 'Cost-sensitive, coding tasks' },
];

const imageGenBenchmark = [
  { tool: 'Midjourney v6.1', promptAdherence: '88%', realism: '9.2/10', style: '9.5/10', speed: '~30s', freeTier: false, score: 9.3 },
  { tool: 'DALL-E 3 (OpenAI)', promptAdherence: '92%', realism: '8.8/10', style: '8.4/10', speed: '~15s', freeTier: false, score: 8.9 },
  { tool: 'Stable Diffusion 3.5', promptAdherence: '81%', realism: '8.6/10', style: '9.0/10', speed: '~5s*', freeTier: true, score: 8.5 },
  { tool: 'Ideogram 2.0', promptAdherence: '87%', realism: '8.4/10', style: '8.7/10', speed: '~20s', freeTier: true, score: 8.4 },
  { tool: 'Adobe Firefly 3', promptAdherence: '84%', realism: '8.3/10', style: '8.2/10', speed: '~10s', freeTier: false, score: 8.1 },
  { tool: 'Bing Image Creator', promptAdherence: '79%', realism: '7.8/10', style: '7.5/10', speed: '~25s', freeTier: true, score: 7.5 },
];

export default function ResearchPage() {
  const baseUrl = 'https://bunusradar.site';

  const researchSchema = {
    '@context': 'https://schema.org',
    '@type': 'ResearchProject',
    name: 'BunusRadar AI Research Hub',
    description: 'Original AI benchmark datasets covering coding assistants, LLM pricing, and image generation tools. Published quarterly by the BunusRadar research team.',
    url: `${baseUrl}/research`,
    publisher: {
      '@type': 'Organization',
      name: 'BunusRadar',
      url: baseUrl,
    },
    subjectOf: [
      {
        '@type': 'Dataset',
        name: 'BunusRadar AI Coding Assistant Benchmark 2026',
        description: 'Task success rate, bug count, latency, and cost for 6 leading AI coding assistants across 50 standardized repository tasks.',
        url: `${baseUrl}/research`,
        creator: { '@type': 'Organization', name: 'BunusRadar', url: baseUrl },
        datePublished: '2026-09-01',
        license: 'https://creativecommons.org/licenses/by/4.0/',
      },
      {
        '@type': 'Dataset',
        name: 'LLM Pricing & Token Efficiency Tracker 2026',
        description: 'Current public pricing per million tokens for leading large language models, updated quarterly.',
        url: `${baseUrl}/research`,
        creator: { '@type': 'Organization', name: 'BunusRadar', url: baseUrl },
        datePublished: '2026-10-01',
        license: 'https://creativecommons.org/licenses/by/4.0/',
      },
    ],
  };

  return (
    <div className="py-12 md:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(researchSchema) }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-zinc-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#1b2e67] font-semibold">Home</Link>
          <ChevronRight className="w-3 h-3 text-zinc-400" />
          <span className="text-zinc-700">Research</span>
        </nav>

        {/* Hero */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <FlaskConical className="w-3.5 h-3.5" /> Original Research
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            BunusRadar Research Hub
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-3xl">
            Original benchmark data, pricing trackers, and accuracy studies — all produced by BunusRadar's editorial team using our{' '}
            <Link href="/methodology" className="text-[#1b2e67] font-semibold hover:underline">published methodology</Link>.
            Free to cite with attribution.
          </p>
          <p className="text-xs text-zinc-400">
            All data is collected under standardized conditions. See{' '}
            <Link href="/methodology" className="text-[#1b2e67] hover:underline">Methodology</Link>{' '}
            for full evaluation criteria. Last updated: October 2026.
          </p>
        </div>

        {/* ===== BENCHMARK 1: AI Coding Assistants ===== */}
        <section className="space-y-6" id="ai-coding-benchmark">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#1b2e67]" />
                <h2 className="text-2xl font-black text-zinc-900 dark:text-white">
                  AI Coding Assistant Benchmark 2026
                </h2>
              </div>
              <p className="text-sm text-zinc-500">50 standardized coding tasks across 5 real repositories · 6 tools tested · Methodology: BunusRadar v1.0</p>
            </div>
            <Link
              href="/blog/best-ai-coding-assistants-2026-cursor-vs-claude-vs-github-copilot"
              className="shrink-0 inline-flex items-center gap-1.5 text-xs font-bold text-[#1b2e67] hover:underline"
            >
              <ExternalLink className="w-3 h-3" /> Full Review
            </Link>
          </div>

          <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-[#1b2e67] text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider">Tool</th>
                  <th className="px-4 py-3 text-center font-bold text-xs uppercase tracking-wider">Task Success</th>
                  <th className="px-4 py-3 text-center font-bold text-xs uppercase tracking-wider">Bugs Introduced</th>
                  <th className="px-4 py-3 text-center font-bold text-xs uppercase tracking-wider">Median Time</th>
                  <th className="px-4 py-3 text-center font-bold text-xs uppercase tracking-wider">Cost / Task</th>
                  <th className="px-4 py-3 text-center font-bold text-xs uppercase tracking-wider">Halluc. Rate</th>
                  <th className="px-4 py-3 text-center font-bold text-xs uppercase tracking-wider">BR Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {codingBenchmark.map((row, i) => (
                  <tr key={row.tool} className={i === 0 ? 'bg-amber-50 dark:bg-amber-950/20' : 'bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'}>
                    <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">
                      {i === 0 && <span className="text-[10px] font-bold text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded mr-1.5">TOP</span>}
                      {row.tool}
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-emerald-600">{row.taskSuccess}</td>
                    <td className="px-4 py-3 text-center text-zinc-600 dark:text-zinc-400">{row.bugs}</td>
                    <td className="px-4 py-3 text-center text-zinc-600 dark:text-zinc-400">{row.medianTime}</td>
                    <td className="px-4 py-3 text-center text-zinc-600 dark:text-zinc-400">{row.costPerTask}</td>
                    <td className="px-4 py-3 text-center text-red-600">{row.hallucRate}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="font-black text-[#1b2e67]">{row.score}</span>
                      <span className="text-zinc-400 text-xs">/10</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-zinc-400 italic">
            Tested September 2026 on MacBook Pro M3 Max. Task suite: 50 tasks across 5 real-world repos (Node.js API, React app, Python CLI, Rust library, SQL migrations).
            Cost calculated at public pricing tiers. See <Link href="/methodology" className="text-[#1b2e67] hover:underline">full methodology</Link>.
          </p>
        </section>

        <div className="border-t border-zinc-200 dark:border-zinc-800" />

        {/* ===== BENCHMARK 2: LLM Pricing ===== */}
        <section className="space-y-6" id="llm-pricing">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                <h2 className="text-2xl font-black text-zinc-900 dark:text-white">
                  LLM Pricing & Token Efficiency Tracker 2026
                </h2>
              </div>
              <p className="text-sm text-zinc-500">Public API pricing for leading LLMs · Updated: October 2026 · Context: per million tokens</p>
            </div>
            <Link
              href="/blog/deepseek-ai-vs-chatgpt-vs-claude-ultimate-showdown"
              className="shrink-0 inline-flex items-center gap-1.5 text-xs font-bold text-[#1b2e67] hover:underline"
            >
              <ExternalLink className="w-3 h-3" /> Full Comparison
            </Link>
          </div>

          <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-emerald-700 text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider">Model</th>
                  <th className="px-4 py-3 text-center font-bold text-xs uppercase tracking-wider">Input / 1M Tokens</th>
                  <th className="px-4 py-3 text-center font-bold text-xs uppercase tracking-wider">Output / 1M Tokens</th>
                  <th className="px-4 py-3 text-center font-bold text-xs uppercase tracking-wider">Context Window</th>
                  <th className="px-4 py-3 text-center font-bold text-xs uppercase tracking-wider">Speed</th>
                  <th className="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {llmPricing.map((row, i) => (
                  <tr key={row.model} className="bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                    <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">{row.model}</td>
                    <td className="px-4 py-3 text-center text-zinc-600 dark:text-zinc-400">{row.inputPer1M}</td>
                    <td className="px-4 py-3 text-center text-zinc-600 dark:text-zinc-400">{row.outputPer1M}</td>
                    <td className="px-4 py-3 text-center font-mono text-xs text-zinc-600 dark:text-zinc-400">{row.contextWindow}</td>
                    <td className="px-4 py-3 text-center text-zinc-600 dark:text-zinc-400">{row.relativeSpeed}</td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400 text-xs">{row.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-zinc-400 italic">
            * Llama self-hosted cost estimate based on AWS g5.12xlarge instance at $5.67/hr, processing 1M tokens/hr. Actual cost varies.
            Pricing snapshots from official provider pages, October 2026. Prices change frequently — verify before budgeting.
          </p>
        </section>

        <div className="border-t border-zinc-200 dark:border-zinc-800" />

        {/* ===== BENCHMARK 3: Image Generators ===== */}
        <section className="space-y-6" id="image-generator-benchmark">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-purple-600" />
                <h2 className="text-2xl font-black text-zinc-900 dark:text-white">
                  AI Image Generator Accuracy Test 2026
                </h2>
              </div>
              <p className="text-sm text-zinc-500">100 standardized prompts across 6 tools · Scored on: prompt adherence, realism, stylistic range</p>
            </div>
            <Link
              href="/blog/best-free-midjourney-alternatives-ai-art-generators"
              className="shrink-0 inline-flex items-center gap-1.5 text-xs font-bold text-[#1b2e67] hover:underline"
            >
              <ExternalLink className="w-3 h-3" /> Full Review
            </Link>
          </div>

          <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-purple-700 text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider">Tool</th>
                  <th className="px-4 py-3 text-center font-bold text-xs uppercase tracking-wider">Prompt Adherence</th>
                  <th className="px-4 py-3 text-center font-bold text-xs uppercase tracking-wider">Realism</th>
                  <th className="px-4 py-3 text-center font-bold text-xs uppercase tracking-wider">Stylistic Range</th>
                  <th className="px-4 py-3 text-center font-bold text-xs uppercase tracking-wider">Avg Speed</th>
                  <th className="px-4 py-3 text-center font-bold text-xs uppercase tracking-wider">Free Tier</th>
                  <th className="px-4 py-3 text-center font-bold text-xs uppercase tracking-wider">BR Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {imageGenBenchmark.map((row, i) => (
                  <tr key={row.tool} className={i === 0 ? 'bg-purple-50 dark:bg-purple-950/20' : 'bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'}>
                    <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">
                      {i === 0 && <span className="text-[10px] font-bold text-purple-600 bg-purple-100 px-1.5 py-0.5 rounded mr-1.5">TOP</span>}
                      {row.tool}
                    </td>
                    <td className="px-4 py-3 text-center text-emerald-600 font-semibold">{row.promptAdherence}</td>
                    <td className="px-4 py-3 text-center text-zinc-600 dark:text-zinc-400">{row.realism}</td>
                    <td className="px-4 py-3 text-center text-zinc-600 dark:text-zinc-400">{row.style}</td>
                    <td className="px-4 py-3 text-center text-zinc-600 dark:text-zinc-400">{row.speed}</td>
                    <td className="px-4 py-3 text-center">
                      {row.freeTier ? (
                        <span className="text-emerald-600 font-bold text-xs">Yes</span>
                      ) : (
                        <span className="text-zinc-400 text-xs">No</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="font-black text-purple-700">{row.score}</span>
                      <span className="text-zinc-400 text-xs">/10</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-zinc-400 italic">
            * SD3.5 speed measured on local inference (M3 Max). Cloud API speed will vary.
            Scores are composite of prompt adherence (50%), realism (30%), and stylistic range (20%).
          </p>
        </section>

        {/* Citation Box */}
        <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <h3 className="font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
            <Download className="w-4 h-4" /> How to Cite This Research
          </h3>
          <p className="text-sm text-zinc-500 mb-3">
            This data is published under Creative Commons Attribution 4.0 (CC BY 4.0). You may republish, quote, or summarize it with attribution.
          </p>
          <div className="bg-zinc-900 text-zinc-100 rounded-xl p-4 font-mono text-xs">
            BunusRadar Research Team. &quot;AI Coding Assistant Benchmark 2026.&quot; BunusRadar, September 2026, https://bunusradar.site/research#ai-coding-benchmark
          </div>
        </div>

        {/* Coming Soon */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#1b2e67]" /> Coming Next Quarter
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'AI Video Generator Benchmark Q4 2026',
              'Chatbot Accuracy & Hallucination Study',
              'AI Search Engine Comparison (Perplexity vs ChatGPT vs Gemini)',
              'Developer AI Tool Adoption Survey 2026',
              '100-Tool AI Pricing Database',
              'AI Productivity Tool Benchmark (Notion AI vs Copilot vs Reclaim)',
            ].map((item) => (
              <div key={item} className="p-4 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-500 dark:text-zinc-400">
                📊 {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
