import { Metadata } from 'next';
import RoiCalculatorClient from './RoiCalculatorClient';
import Link from 'next/link';
import { ArrowLeft, Sparkles, TrendingUp, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Enterprise AI ROI & Productivity Cost Savings Calculator (2026) - BunusRadar',
  description: 'Free interactive Enterprise AI ROI Calculator. Calculate net dollar savings, annual engineering hours reclaimed, and payback period for Cursor, GitHub Copilot, and ChatGPT Enterprise.',
  keywords: [
    'ai roi calculator',
    'github copilot roi calculator',
    'chatgpt enterprise cost savings calculator',
    'developer productivity calculator',
    'ai software investment return'
  ],
  alternates: {
    canonical: 'https://bunusradar.site/tools/ai-roi-calculator',
  },
  openGraph: {
    title: 'Enterprise AI ROI & Productivity Cost Savings Calculator - BunusRadar',
    description: 'Calculate net dollar savings, annual hours reclaimed, and payback period for modern AI tools.',
    url: 'https://bunusradar.site/tools/ai-roi-calculator',
    type: 'website',
  },
};

export default function RoiCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Enterprise AI ROI & Productivity Savings Calculator',
    'url': 'https://bunusradar.site/tools/ai-roi-calculator',
    'applicationCategory': 'BusinessApplication',
    'operatingSystem': 'All',
    'description': 'Free real-time calculator modeling the economic impact, annual hours saved, and return on investment for enterprise AI tools.',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'How do you calculate ROI for AI developer tools?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'AI ROI is calculated by multiplying the annual hours saved per employee by their hourly compensation rate to determine gross productivity value, subtracting the annual license fees, and dividing net savings by the software cost.',
        },
      },
      {
        '@type': 'Question',
        'name': 'How many hours do developers realistically save with AI coding tools?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'According to published developer productivity benchmarks from GitHub, Google Cloud, and McKinsey, software engineers utilizing AI assistants like Cursor, Copilot, or Claude save between 3.5 and 5.5 hours per week on boilerplate code generation, refactoring, and test writing.',
        },
      },
      {
        '@type': 'Question',
        'name': 'What is a typical payback period for GitHub Copilot or Cursor?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Because monthly seats cost between $19 and $25 per developer while reclaiming multiple hours of high-value engineering time, most engineering teams achieve 100% break-even within 3 to 10 working days.',
        },
      },
    ],
  };

  return (
    <div className="py-8 md:py-14 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-zinc-900 transition-colors mb-4 sm:mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Free Developer Tools
        </Link>

        <div className="p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#1b2e67] via-[#14234f] to-zinc-900 text-white shadow-xl space-y-4 border border-blue-500/20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-[#f9b44d] border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            Free Financial Analysis Tool
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Enterprise AI ROI & Productivity Calculator
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 max-w-3xl leading-relaxed">
            Quantify the exact dollar return and annual hours saved from deploying modern AI coding assistants and LLM workspaces across engineering, design, and product teams.
          </p>

          <div className="pt-2 flex flex-wrap gap-3 sm:gap-6 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Evidence-Based Methodology
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#f9b44d]" /> Instant Real-Time Modeling
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-400" /> Executive Ready Output
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Tool Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <RoiCalculatorClient />
      </div>

      {/* Methodology & Research Citations */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-8 border-t border-zinc-200">
        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-900">
            Calculation Methodology & Productivity Benchmarks
          </h2>
          <p className="text-sm text-zinc-700 leading-relaxed">
            The BunusRadar AI ROI Model synthesizes empirical telemetry from Fortune 500 engineering deployments and peer-reviewed software studies. Calculations assume a standard 50-week operating year, excluding paid time off and national holidays.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-zinc-200 bg-white space-y-1.5 shadow-xs">
            <strong className="text-xs font-black uppercase text-[#1b2e67]">GitHub Copilot Study</strong>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Developers completed coding tasks 55.8% faster and felt 88% more fulfilled in their work when assisted by AI code generation.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-zinc-200 bg-white space-y-1.5 shadow-xs">
            <strong className="text-xs font-black uppercase text-[#1b2e67]">McKinsey Global Institute</strong>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Generative AI accelerates software development throughput by 20% to 45% of annual engineering overhead, predominantly in refactoring and documentation.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-zinc-200 bg-white space-y-1.5 shadow-xs">
            <strong className="text-xs font-black uppercase text-[#1b2e67]">Capital Efficiency Horizon</strong>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Because modern tooling seats cost $19 to $25 per month while senior engineers cost over $65/hr, reclaiming less than 30 minutes monthly pays for the entire license.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="space-y-4 pt-6">
          <h3 className="text-lg font-bold text-zinc-900">Frequently Asked Questions</h3>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200 space-y-1">
              <h4 className="text-xs sm:text-sm font-bold text-zinc-900">
                How should we factor in onboarding time and learning curve?
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Initial productivity gains typically stabilize within 2 to 3 weeks. To model a conservative ramp, consider reducing initial hours saved to 2.5 hours per week during the first quarter.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200 space-y-1">
              <h4 className="text-xs sm:text-sm font-bold text-zinc-900">
                Can I present this calculation to my CFO or executive committee?
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Yes. Use the 'Copy Executive Report' button above to generate a formatted executive brief detailing software expenditure, gross reclaimed hours, and net annual profit impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
