import { Metadata } from 'next';
import PromptOptimizerClient from './PromptOptimizerClient';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Terminal, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Prompt Optimizer & System Prompt Generator (2026) - Claude, ChatGPT, Cursor',
  description: 'Free interactive AI Prompt Optimizer. Craft high-performance system prompts, CRISPE frameworks, and Chain-of-Thought instructions for Claude 3.5 Sonnet, GPT-4o, Cursor IDE, and Midjourney.',
  keywords: [
    'ai prompt optimizer',
    'system prompt generator',
    'chatgpt prompt generator',
    'claude prompt enhancer',
    'cursor system prompt builder',
    'midjourney prompt builder',
    'prompt engineering tool 2026'
  ],
  alternates: {
    canonical: 'https://bunusradar.site/tools/ai-prompt-optimizer',
  },
  openGraph: {
    title: 'AI Prompt Optimizer & System Prompt Generator - BunusRadar',
    description: 'Transform vague AI instructions into production-grade, structured system prompts for Claude, ChatGPT, and Cursor.',
    url: 'https://bunusradar.site/tools/ai-prompt-optimizer',
    type: 'website',
  },
};

export default function PromptOptimizerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'AI Prompt Optimizer & System Prompt Generator',
    'url': 'https://bunusradar.site/tools/ai-prompt-optimizer',
    'applicationCategory': 'DeveloperApplication',
    'operatingSystem': 'All',
    'description': 'Free developer tool for crafting structured CRISPE and Chain-of-Thought system prompts for modern foundation models.',
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
        'name': 'What is the CRISPE prompt framework?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'CRISPE stands for Context, Role, Insight, Statement, Personality, and Experiment. It is a structured prompt engineering methodology that grounds large language models in a specific persona and strict execution constraints.',
        },
      },
      {
        '@type': 'Question',
        'name': 'Why are system prompts crucial for Claude 3.5 and GPT-4o?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'System prompts set the persistent behavioral baseline for AI models. They prevent conversational filler, enforce strict coding conventions, eliminate hallucinations, and ensure responses follow production-ready schemas.',
        },
      },
      {
        '@type': 'Question',
        'name': 'Can I use this tool for Cursor IDE and GitHub Copilot?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes. You can select the Cursor / Copilot preset to generate .cursorrules and system instructions that guide autonomous IDE code completion across your codebase.',
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
            Free Developer Tool
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            AI Prompt Optimizer & System Prompt Generator
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 max-w-3xl leading-relaxed">
            Eliminate conversational fluff and hallucinations. Construct production-grade system prompts, CRISPE frameworks, and Chain-of-Thought directives optimized for Claude 3.5 Sonnet, GPT-4o, Cursor IDE, and Midjourney.
          </p>

          <div className="pt-2 flex flex-wrap gap-3 sm:gap-6 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Free & Client-Side
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#f9b44d]" /> Zero Latency
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-400" /> No Data Logged
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Tool Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <PromptOptimizerClient />
      </div>

      {/* Educational Guide & Documentation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-8 border-t border-zinc-200">
        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-black text-zinc-900">
            Why Prompt Engineering Frameworks Matter in 2026
          </h2>
          <p className="text-sm text-zinc-700 leading-relaxed">
            As foundation models advance in reasoning ability, naive one-sentence prompts produce generic responses filled with boilerplate apologies and conversational filler. Modern prompt engineering leverages structured methodologies such as <strong>CRISPE</strong> and <strong>Chain-of-Thought (CoT)</strong> to anchor the model in high-dimensional domain expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-zinc-200 bg-white space-y-1.5 shadow-xs">
            <strong className="text-xs font-black uppercase text-[#1b2e67]">1. Clear Persona Role</strong>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Specifying an exact seniority level (e.g. Staff Distributed Systems Architect) biases the model toward verified engineering patterns rather than introductory tutorials.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-zinc-200 bg-white space-y-1.5 shadow-xs">
            <strong className="text-xs font-black uppercase text-[#1b2e67]">2. Negative Guardrails</strong>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Explicit negative constraints (e.g. 'no any types', 'no conversational throat-clearing') cut token overhead by up to 40% and keep outputs strictly actionable.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-zinc-200 bg-white space-y-1.5 shadow-xs">
            <strong className="text-xs font-black uppercase text-[#1b2e67]">3. Format Enforcement</strong>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Demanding markdown code blocks, strict JSON schema, or matrix tables allows seamless integration into automated CI/CD pipelines and production software stacks.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="space-y-4 pt-6">
          <h3 className="text-lg font-bold text-zinc-900">Frequently Asked Questions</h3>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200 space-y-1">
              <h4 className="text-xs sm:text-sm font-bold text-zinc-900">
                Can I use these prompts directly in Cursor .cursorrules?
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Yes. Copy the generated prompt and paste it into the <code>.cursorrules</code> file in the root of your project repository. Cursor will automatically inject these instructions on every file edit and chat query.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200 space-y-1">
              <h4 className="text-xs sm:text-sm font-bold text-zinc-900">
                How does CRISPE compare to Few-Shot Prompting?
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                CRISPE establishes the broad role, context, and philosophical constraints of the interaction. For optimal accuracy, combine CRISPE with 2 or 3 few-shot input/output examples in the Input Data section.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
