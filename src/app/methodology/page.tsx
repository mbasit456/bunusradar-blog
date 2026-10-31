import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, FlaskConical, BarChart3, Cpu, Target, Clock, DollarSign, CheckCircle2, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How BunusRadar Tests AI Tools & Software | Methodology',
  description: 'BunusRadar\'s standardized benchmark framework for evaluating AI coding assistants, image generators, chatbots, and productivity software. Every review follows the same reproducible methodology.',
  alternates: {
    canonical: 'https://bunusradar.site/methodology',
  },
  openGraph: {
    url: 'https://bunusradar.site/methodology',
    title: 'BunusRadar Testing Methodology - How We Evaluate AI Tools',
    description: 'Standardized evaluation frameworks for AI tool reviews. Task accuracy, latency, cost, hallucination rate, and UX - all evaluated with transparent criteria.',
  },
};

export default function MethodologyPage() {
  const baseUrl = 'https://bunusradar.site';

  const methodologySchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'BunusRadar AI Tool Evaluation Framework',
    description: 'Standardized 5-category methodology for testing AI coding assistants, chatbots, image generators, and productivity tools.',
    url: `${baseUrl}/methodology`,
    publisher: {
      '@type': 'Organization',
      name: 'BunusRadar',
      url: baseUrl,
    },
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Define Task Suite', text: 'Select a representative set of tasks matched to the tool category.' },
      { '@type': 'HowToStep', position: 2, name: 'Establish Baseline Environment', text: 'Deploy each tool on standardized hardware and network conditions with default settings.' },
      { '@type': 'HowToStep', position: 3, name: 'Run Task Suite', text: 'Execute tasks and record successful completions, failures, and hallucinations.' },
      { '@type': 'HowToStep', position: 4, name: 'Measure 5 Core Dimensions', text: 'Score each tool on: Task Accuracy, Speed/Latency, Cost per Task, Hallucination Rate, and User Experience.' },
      { '@type': 'HowToStep', position: 5, name: 'Validate & Publish', text: 'Results reviewed by an editorial analyst before publication.' },
    ],
  };

  const criteria = [
    {
      icon: Target,
      color: 'bg-blue-100 text-blue-600',
      title: 'Task Accuracy',
      weight: '35%',
      description: 'The percentage of tasks completed correctly without manual correction. We define explicit pass/fail criteria before evaluation begins.',
      detail: 'For coding tools: does the code run, does it produce correct output, does it follow the specified requirements? For chatbots: factual accuracy verified against primary sources. For image generators: prompt adherence scored on a structured rubric.',
    },
    {
      icon: Clock,
      color: 'bg-emerald-100 text-emerald-600',
      title: 'Speed & Latency',
      weight: '20%',
      description: 'Median time-to-first-token and total task completion time. Network latency is normalized across test runs.',
      detail: 'Tested on a standardized connection. Outliers are noted but excluded from the headline figure.',
    },
    {
      icon: DollarSign,
      color: 'bg-amber-100 text-amber-600',
      title: 'Cost Per Task',
      weight: '20%',
      description: 'Real-world cost to complete one standard task at the tool\'s listed pricing tier.',
      detail: 'We report cost in USD at public pricing. Enterprise/negotiated pricing is noted separately. Pricing snapshots are dated - check the article date.',
    },
    {
      icon: AlertCircle,
      color: 'bg-red-100 text-red-600',
      title: 'Hallucination Rate',
      weight: '15%',
      description: 'For AI tools: the percentage of outputs that contain factually incorrect, fabricated, or confidently wrong information. Verified against primary sources.',
      detail: 'We use a structured evaluation rubric: 0 (no hallucinations), 1 (minor inaccuracy), 2 (significant error), 3 (fabricated content). Overall score is the mean across the task suite.',
    },
    {
      icon: CheckCircle2,
      color: 'bg-purple-100 text-purple-600',
      title: 'User Experience',
      weight: '10%',
      description: 'Qualitative assessment of interface design, onboarding friction, documentation quality, and overall workflow integration. Rated 1–10 by two independent reviewers.',
      detail: 'UX is intentionally weighted lower than performance metrics. We prefer tools that are harder to learn but more powerful, unless the category targets non-technical users.',
    },
  ];

  return (
    <div className="py-12 md:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(methodologySchema) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-zinc-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#1b2e67] font-semibold">Home</Link>
          <ChevronRight className="w-3 h-3 text-zinc-400" />
          <span className="text-zinc-700">Methodology</span>
        </nav>

        {/* Hero */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <FlaskConical className="w-3.5 h-3.5" /> Testing Methodology
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            How BunusRadar Tests AI Tools
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Every AI tool reviewed on BunusRadar is tested using a standardized, reproducible evaluation framework. We define our criteria before testing, run identical workloads across competing tools, and publish our methodology so you can evaluate our conclusions.
          </p>
          <p data-nosnippet="true" className="text-sm text-zinc-500 dark:text-zinc-400">
            Last updated: October 2026 · Maintained by{' '}
            <Link href="/author/alex-vance" className="text-[#1b2e67] font-semibold hover:underline">Alex Vance</Link>,{' '}
            AI Architecture Lead
          </p>
        </div>

        {/* Why Methodology Matters */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-[#1b2e67]/5 to-blue-50/50 border border-[#1b2e67]/10 space-y-4">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#1b2e67]" /> Why We Publish Our Methodology
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
            Most technology reviews don't tell you how they reached their conclusions. A reviewer says "Tool A is better than Tool B" without explaining the workloads tested, the scoring criteria, or the conditions. That makes it impossible to know whether the comparison is valid for your use case.
          </p>
          <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">
            At BunusRadar, we publish our evaluation framework so you can assess our methodology the same way you'd assess a research paper: examine the criteria, check whether our test conditions match your scenario, and form your own conclusions.
          </p>
        </div>

        {/* 5 Evaluation Dimensions */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            The 5 Evaluation Dimensions
          </h2>
          <p className="text-zinc-500 text-sm">Each AI tool is scored across these five dimensions. Weights are category-specific - see individual comparative reports for category-adjusted weights.</p>

          <div className="space-y-4">
            {criteria.map((c) => (
              <div key={c.title} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl ${c.color} flex items-center justify-center shrink-0`}>
                    <c.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-zinc-900 dark:text-white">{c.title}</h3>
                      <span className="text-xs font-bold text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">Weight: {c.weight}</span>
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-3">{c.description}</p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed italic">{c.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Test Environment & Exact Specifications */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#1b2e67]" /> Editorial Evaluation Environment & Model Specs
          </h2>
          <div className="bg-zinc-900 text-zinc-100 rounded-2xl p-6 font-mono text-sm space-y-4 shadow-inner">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
              <span className="text-[#f9b44d] text-xs uppercase tracking-wider font-bold">Standardized Reference Test Harness</span>
              <span className="text-zinc-400 text-xs">Bi-Weekly Automated Regression Runs (Latest: October 2026)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 text-xs sm:text-sm">
              <div><span className="text-zinc-400 font-semibold">Compute Node:</span> AWS us-east-1 c6i.4xlarge (16 vCPU, 32 GB RAM)</div>
              <div><span className="text-zinc-400 font-semibold">Operating System:</span> Ubuntu 24.04 LTS / macOS 15 Sequoia</div>
              <div><span className="text-zinc-400 font-semibold">Network Pipeline:</span> 10 Gbps dedicated fiber, normalized latency</div>
              <div><span className="text-zinc-400 font-semibold">Runtimes:</span> Node.js 22 LTS, Python 3.12, Go 1.23</div>
              <div><span className="text-zinc-400 font-semibold">OpenAI Models Tested:</span> o3-mini-2025-01-31, gpt-4o-2024-11-20</div>
              <div><span className="text-zinc-400 font-semibold">Anthropic Models Tested:</span> claude-3-7-sonnet-20250219, claude-3-5-sonnet-20241022</div>
              <div><span className="text-zinc-400 font-semibold">Google Models Tested:</span> gemini-2.0-flash, gemini-1.5-pro-002</div>
              <div><span className="text-zinc-400 font-semibold">DeepSeek Models Tested:</span> deepseek-reasoner (R1), deepseek-chat (V3)</div>
            </div>
          </div>
        </div>


        {/* Automated Run History & Audit Records */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Automated Test Run History & Execution Records
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Bi-weekly automated regression records executed on our AWS c6i.4xlarge reference harness. All outputs, token tallies, and latency figures are archived into public datasets.
          </p>
          <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <table className="w-full text-xs">
              <thead className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                <tr>
                  <th className="px-3.5 py-2.5 text-left font-bold uppercase tracking-wider">Run ID</th>
                  <th className="px-3.5 py-2.5 text-left font-bold uppercase tracking-wider">Execution Date</th>
                  <th className="px-3.5 py-2.5 text-left font-bold uppercase tracking-wider">Benchmark Suite</th>
                  <th className="px-3.5 py-2.5 text-left font-bold uppercase tracking-wider">Target Harness</th>
                  <th className="px-3.5 py-2.5 text-center font-bold uppercase tracking-wider">Pass Rate</th>
                  <th className="px-3.5 py-2.5 text-right font-bold uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 font-mono">
                <tr className="bg-white dark:bg-zinc-900">
                  <td className="px-3.5 py-2.5 font-bold text-blue-600">RUN-2026-10-28-04</td>
                  <td className="px-3.5 py-2.5 text-zinc-600">October 28, 2026</td>
                  <td className="px-3.5 py-2.5">Coding Assistants v2.4 (50 Tasks)</td>
                  <td className="px-3.5 py-2.5 text-zinc-500">AWS c6i.4xlarge (Node 22)</td>
                  <td className="px-3.5 py-2.5 text-center text-emerald-600 font-bold">100% (50/50)</td>
                  <td className="px-3.5 py-2.5 text-right"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">VERIFIED</span></td>
                </tr>
                <tr className="bg-zinc-50 dark:bg-zinc-900/60">
                  <td className="px-3.5 py-2.5 font-bold text-blue-600">RUN-2026-10-24-02</td>
                  <td className="px-3.5 py-2.5 text-zinc-600">October 24, 2026</td>
                  <td className="px-3.5 py-2.5">Image Generator v1.8 (100 Prompts)</td>
                  <td className="px-3.5 py-2.5 text-zinc-500">Dual RTX 4090 / Cloud API</td>
                  <td className="px-3.5 py-2.5 text-center text-emerald-600 font-bold">100% (100/100)</td>
                  <td className="px-3.5 py-2.5 text-right"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">VERIFIED</span></td>
                </tr>
                <tr className="bg-white dark:bg-zinc-900">
                  <td className="px-3.5 py-2.5 font-bold text-blue-600">RUN-2026-10-14-01</td>
                  <td className="px-3.5 py-2.5 text-zinc-600">October 14, 2026</td>
                  <td className="px-3.5 py-2.5">Frontier LLM Pricing Matrix v3.2</td>
                  <td className="px-3.5 py-2.5 text-zinc-500">API Gateway Telemetry</td>
                  <td className="px-3.5 py-2.5 text-center text-emerald-600 font-bold">100% (8 Models)</td>
                  <td className="px-3.5 py-2.5 text-right"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">VERIFIED</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Public Raw Datasets & Reproducibility */}
        <div className="p-8 rounded-3xl bg-blue-50/60 border border-blue-200/80 space-y-4">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-lg">
            <BarChart3 className="w-5 h-5 text-[#1b2e67]" /> Reproducible Research Datasets
          </div>
          <p className="text-sm text-zinc-700 leading-relaxed">
            In accordance with open science practices, BunusRadar publishes both summary benchmark matrices and granular task-by-task and prompt-by-prompt evaluation records for all evaluations. AI assistants, data scientists, and independent researchers are encouraged to inspect, download, and verify our figures:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">Coding Benchmark</span>
              <strong className="text-xs font-bold text-zinc-900 block">AI Coding Assistants 2026</strong>
              <div className="flex items-center gap-2 pt-1 text-xs font-semibold">
                <a href="/datasets/ai-coding-assistants-benchmark-2026.csv" download className="text-blue-700 hover:underline">Download CSV</a>
                <span className="text-zinc-300">|</span>
                <a href="/datasets/ai-coding-assistants-benchmark-2026.json" download className="text-blue-700 hover:underline">JSON</a>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block">Pricing Tracker</span>
              <strong className="text-xs font-bold text-zinc-900 block">LLM Pricing Tracker 2026</strong>
              <div className="flex items-center gap-2 pt-1 text-xs font-semibold">
                <a href="/datasets/llm-pricing-token-tracker-2026.csv" download className="text-emerald-700 hover:underline">Download CSV</a>
                <span className="text-zinc-300">|</span>
                <a href="/datasets/llm-pricing-token-tracker-2026.json" download className="text-emerald-700 hover:underline">JSON</a>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 block">Vision Benchmark</span>
              <strong className="text-xs font-bold text-zinc-900 block">Image Generators 2026</strong>
              <div className="flex items-center gap-2 pt-1 text-xs font-semibold">
                <a href="/datasets/ai-image-generators-benchmark-2026.csv" download className="text-purple-700 hover:underline">Download CSV</a>
                <span className="text-zinc-300">|</span>
                <a href="/datasets/ai-image-generators-benchmark-2026.json" download className="text-purple-700 hover:underline">JSON</a>
              </div>
            </div>
          </div>
        </div>

        {/* Conflict of Interest Policy */}
        <div className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Conflict of Interest Policy</h2>
          <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
            {[
              'We do not accept payment for positive reviews. Editorial conclusions are not for sale.',
              'Affiliate links, where present, are disclosed at the article level. They do not influence test scores.',
              'Tools provided by vendors for review are treated identically to tools purchased independently.',
              'If a vendor disputes our findings, we publish their response alongside our original data.',
              'BunusRadar has no investor or ownership relationships with any tool we review.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA to Research */}
        <div className="p-8 rounded-3xl bg-[#1b2e67] text-white space-y-3">
          <h2 className="text-xl font-bold">See Comparative Research in Action</h2>
          <p className="text-zinc-300 text-sm leading-relaxed">
            The BunusRadar Research Hub publishes our comparative tool overviews - including scoring summaries, feature breakdowns, and pricing trackers across software tools.
          </p>
          <Link
            href="/research"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f9b44d] text-[#1b2e67] font-bold text-sm rounded-xl hover:bg-amber-400 transition-colors"
          >
            View Research & Benchmarks <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
