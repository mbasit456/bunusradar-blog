import { Metadata } from 'next';
import Link from 'next/link';
import ChatPlaygroundClient from './ChatPlaygroundClient';
import { Bot, Sparkles, Code2, Cpu, ShieldCheck, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Chat, Image Generator & Canvas - ChatGPT & Claude Alternative',
  description: 'Free interactive AI Chat, Flux Image Generator, and Code Canvas Workspace. Multi-model support for Claude 3.5 Sonnet, GPT-4o, and DeepSeek R1. Generate high-res AI images and run live web apps.',
  keywords: [
    'free ai chat',
    'free ai image generator',
    'chatgpt alternative',
    'claude online free',
    'flux image generator online',
    'ai art generator free',
    'claude artifacts free',
    'ai code canvas',
    'deepseek r1 chat online',
    'ai reasoning playground'
  ],
  openGraph: {
    title: 'Free AI Chat & Code Canvas Workspace - ChatGPT & Claude Alternative',
    description: 'Interactive multi-model AI workspace featuring live code canvas execution, chain-of-thought reasoning, and artifact exports.',
    url: 'https://bunusradar.site/tools/free-ai-chat',
    siteName: 'BunusRadar',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Chat & Code Canvas Workspace - ChatGPT & Claude Alternative',
    description: 'Experience Claude-style artifacts, GPT-4o creative reasoning, and DeepSeek R1 thinking chains in a unified free developer workspace.',
  },
  alternates: {
    canonical: 'https://bunusradar.site/tools/free-ai-chat',
  },
};

export default function FreeAiChatPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'BunusRadar AI Workspace & Code Canvas',
    'url': 'https://bunusradar.site/tools/free-ai-chat',
    'description': 'Free multi-model AI reasoning playground and Claude-style interactive code canvas. Execute HTML5/JS apps, inspect chain-of-thought thinking, and export artifacts.',
    'applicationCategory': 'DeveloperApplication',
    'operatingSystem': 'Any',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
    },
    'featureList': [
      'Multi-model persona architecture: Claude 3.5 Sonnet, GPT-4o, and DeepSeek R1',
      'Native high-resolution AI Image Generator powered by Flux with direct downloads and aspect ratio controls',
      'Interactive Claude-style Artifacts Canvas with live sandboxed HTML/JS execution',
      'Chain-of-thought reasoning process visibility and step-by-step logic breakdown',
      'Local conversation persistence with zero tracking and privacy preservation',
      'One-click artifact export in HTML, Python, TypeScript, Markdown, and JSON',
      'Optional Bring-Your-Own-Key (BYOK) for OpenAI, Anthropic, and Gemini',
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'Is the BunusRadar AI Workspace free to use?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes. BunusRadar provides free interactive access to AI reasoning models and interactive code canvases with zero subscription requirements or mandatory login.',
        },
      },
      {
        '@type': 'Question',
        'name': 'How does the Claude-style Code Canvas work?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'When an AI model generates source code (such as HTML5, CSS, SVG, or JavaScript), the Canvas automatically detects the artifact and renders it inside a sandboxed live preview iframe. Users can interact with games, test components, inspect raw code, and download source files directly.',
        },
      },
      {
        '@type': 'Question',
        'name': 'Are my conversations private and secure?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'All conversation histories and optional personal API keys are stored exclusively in your local browser localStorage. No chat logs are harvested, sold, or retained on external databases.',
        },
      },
      {
        '@type': 'Question',
        'name': 'Can I connect my own OpenAI, Anthropic, or Gemini API keys?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes. Click the Settings icon in the top right control bar to enter your personal API key (BYOK). This allows direct, high-volume streaming completions through your preferred AI provider.',
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#070d1e] text-slate-100 flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Main Interactive Tool Full-Width Screen */}
      <main className="flex-1 w-full">
        <ChatPlaygroundClient />
      </main>

      {/* Comprehensive Architectural & SEO Documentation Below */}
      <section className="bg-[#0b1329] border-t border-slate-800 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-16">
          
          {/* Header Overview */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b2e67] border border-blue-500/30 text-xs font-bold uppercase tracking-wider text-[#f9b44d]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen Developer Workspace</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              An Open AI Reasoning Playground & Live Code Canvas
            </h2>
            <p className="text-base text-slate-300 leading-relaxed max-w-3xl">
              Engineered for software engineers, product architects, and technology leaders. The BunusRadar AI Workspace integrates multi-turn conversational reasoning, Claude-style artifact execution, and multi-model flexibility into a unified, free developer interface.
            </p>
          </div>

          {/* Core Feature Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#0e1938] border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Live Artifact Canvas</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Generate complete web applications, interactive canvas games, and SVG graphics that execute immediately in a sandboxed runtime environment alongside your chat.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0e1938] border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Visible Chain of Thought</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Inspect step-by-step reasoning tokens before viewing final answers. Understand how models decompose complex algorithmic constraints, identify edge cases, and structure code.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0e1938] border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Client-Side Privacy</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                All conversations, custom system instructions, and optional API keys persist in local browser storage without server telemetry or database persistence.
              </p>
            </div>
          </div>

          {/* Model Architectural Comparison Table */}
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Model Reasoning & Performance Breakdown
            </h3>
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0e1938]">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-[#14234f] text-xs font-bold uppercase tracking-wider text-slate-200 border-b border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4">Model Mode</th>
                    <th className="py-3.5 px-4">Primary Strength</th>
                    <th className="py-3.5 px-4">Artifact Support</th>
                    <th className="py-3.5 px-4">Reasoning Latency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-3.5 px-4 font-bold text-amber-300">Claude 3.5 Sonnet</td>
                    <td className="py-3.5 px-4">Full-stack software design, HTML/JS canvas apps</td>
                    <td className="py-3.5 px-4 text-emerald-400 font-semibold">Native Split Canvas</td>
                    <td className="py-3.5 px-4 text-slate-400">0.8s - 1.4s</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-3.5 px-4 font-bold text-emerald-300">GPT-4o</td>
                    <td className="py-3.5 px-4">Creative problem solving, executive briefs, copywriting</td>
                    <td className="py-3.5 px-4 text-emerald-400 font-semibold">Supported</td>
                    <td className="py-3.5 px-4 text-slate-400">0.6s - 1.1s</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-3.5 px-4 font-bold text-sky-300">DeepSeek R1</td>
                    <td className="py-3.5 px-4">Mathematical verification, formal logic, multi-turn reasoning</td>
                    <td className="py-3.5 px-4 text-emerald-400 font-semibold">Supported</td>
                    <td className="py-3.5 px-4 text-slate-400">1.2s - 2.8s</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-3.5 px-4 font-bold text-purple-300">Gemini 3.8 Flash</td>
                    <td className="py-3.5 px-4">High-throughput generation, low latency, real-time responses</td>
                    <td className="py-3.5 px-4 text-emerald-400 font-semibold">Supported</td>
                    <td className="py-3.5 px-4 text-slate-400">0.3s - 0.7s</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Frequently Asked Questions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-[#0e1938] border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm">
                  Is there any message limit or paywall?
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  No. The BunusRadar AI Workspace is free and open to all users. You can explore prompt engineering, generate code prototypes, and run interactive canvases with zero subscription barriers.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#0e1938] border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm">
                  How do I download generated code?
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Whenever an artifact is opened in the right Canvas panel, click the Download icon in the top right header to save the file with the appropriate extension (.html, .py, .ts, or .md).
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#0e1938] border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm">
                  Can I use this tool on mobile devices?
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Yes. The layout adapts dynamically to mobile viewports. On smaller screens, the Canvas panel slides up as a dedicated sheet for intuitive mobile testing.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#0e1938] border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm">
                  What other developer tools are available?
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Visit our central <Link href="/tools" className="text-[#f9b44d] hover:underline">Tools Hub</Link> to access the AI Token & Cost Calculator, AI Prompt Optimizer, and Enterprise AI ROI Calculator.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Callout Hub */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-[#14234f] via-[#1b2e67] to-[#14234f] border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-xl font-bold text-white">
                Explore More Free Engineering Utilities
              </h3>
              <p className="text-sm text-slate-300">
                Model API expenses, generate system prompts, and estimate software team ROI.
              </p>
            </div>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#f9b44d] hover:bg-[#e09e38] text-[#1b2e67] font-bold text-sm rounded-xl transition shadow-lg shrink-0"
            >
              <span>Explore All Tools</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
