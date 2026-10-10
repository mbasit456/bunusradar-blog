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
    title: 'BunusRadar Testing Methodology — How We Evaluate AI Tools',
    description: 'Reproducible, standardized benchmarks for every AI tool review. Task accuracy, latency, cost, hallucination rate, and UX — all tested on identical workloads.',
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
      { '@type': 'HowToStep', position: 1, name: 'Define Task Suite', text: 'Select a standardized set of 20–50 representative tasks matched to the tool category.' },
      { '@type': 'HowToStep', position: 2, name: 'Establish Baseline Environment', text: 'Deploy each tool on identical hardware and network conditions with default settings unless otherwise noted.' },
      { '@type': 'HowToStep', position: 3, name: 'Run Task Suite', text: 'Execute all tasks three times. Record successful completions, failures, partial completions, and hallucinations.' },
      { '@type': 'HowToStep', position: 4, name: 'Measure 5 Core Dimensions', text: 'Score each tool on: Task Accuracy, Speed/Latency, Cost per Task, Hallucination Rate, and User Experience.' },
      { '@type': 'HowToStep', position: 5, name: 'Validate & Publish', text: 'Results reviewed by a second BunusRadar analyst before publication. Raw data retained for 12 months.' },
    ],
  };

  const criteria = [
    {
      icon: Target,
      color: 'bg-blue-100 text-blue-600',
      title: 'Task Accuracy',
      weight: '35%',
      description: 'The percentage of tasks completed correctly without manual correction. We define "correct" with explicit pass/fail criteria before testing begins — never retroactively.',
      detail: 'For coding tools: does the code run, does it produce correct output, does it follow the specified requirements? For chatbots: factual accuracy verified against primary sources. For image generators: prompt adherence scored on a 5-point rubric.',
    },
    {
      icon: Clock,
      color: 'bg-emerald-100 text-emerald-600',
      title: 'Speed & Latency',
      weight: '20%',
      description: 'Median time-to-first-token and total task completion time, measured across 3 runs and averaged. Network latency is normalized.',
      detail: 'Tested on a standardized fiber connection (500 Mbps symmetric). Outliers (>2σ from median) are noted but excluded from the headline figure.',
    },
    {
      icon: DollarSign,
      color: 'bg-amber-100 text-amber-600',
      title: 'Cost Per Task',
      weight: '20%',
      description: 'Real-world cost to complete one standard task at the tool\'s listed pricing tier. Calculated as: (tokens consumed × price per token) + subscription cost amortized over task volume.',
      detail: 'We report cost in USD at public pricing. Enterprise/negotiated pricing is noted separately. Pricing snapshots are dated — check the article date.',
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
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
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
          <p className="text-zinc-500 text-sm">Each AI tool is scored across these five dimensions. Weights are category-specific — see individual benchmark reports for category-adjusted weights.</p>

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

        {/* Test Environment */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#1b2e67]" /> Standard Test Environment
          </h2>
          <div className="bg-zinc-900 text-zinc-100 rounded-2xl p-6 font-mono text-sm space-y-2 shadow-inner">
            <div className="text-[#f9b44d] text-xs uppercase tracking-wider mb-4">BunusRadar Test Rig — Spec Sheet</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
              <div><span className="text-zinc-400">Hardware:</span> MacBook Pro M3 Max, 36GB</div>
              <div><span className="text-zinc-400">OS:</span> macOS Sequoia 15.x</div>
              <div><span className="text-zinc-400">Network:</span> 500 Mbps symmetric fiber</div>
              <div><span className="text-zinc-400">Browser:</span> Chrome stable (latest)</div>
              <div><span className="text-zinc-400">API Testing:</span> Cursor + direct API calls</div>
              <div><span className="text-zinc-400">Pricing Snapshot:</span> Public tier, dated</div>
              <div><span className="text-zinc-400">Run Count:</span> 3× per task, median reported</div>
              <div><span className="text-zinc-400">Blind Review:</span> Second analyst validates</div>
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
          <h2 className="text-xl font-bold">See the Methodology in Action</h2>
          <p className="text-zinc-300 text-sm leading-relaxed">
            The BunusRadar Research Hub publishes our full benchmark datasets — including raw scores, per-task breakdowns, and reproducible results for every AI tool category we test.
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
