import { Metadata } from 'next';
import TokenCalculatorClient from './TokenCalculatorClient';
import Link from 'next/link';
import { ArrowLeft, Cpu, Zap, ShieldCheck, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Token & Model Cost Calculator (2026 Edition) - OpenAI, Claude, Gemini, DeepSeek',
  description: 'Free interactive AI Token Cost Calculator. Compare API pricing for OpenAI o3-mini, GPT-4o, Claude 3.7 Sonnet, Gemini 2.0 Flash, and DeepSeek R1/V3. Estimate monthly costs, batch discounts, and prompt caching savings.',
  keywords: [
    'ai token calculator',
    'openai api cost calculator',
    'gpt 4o token cost calculator',
    'openai o1 pricing calculator',
    'llm pricing comparison 2026',
    'claude vs gpt 4o pricing',
    'token price calculator'
  ],
  alternates: {
    canonical: 'https://bunusradar.site/tools/ai-token-calculator',
  },
  openGraph: {
    title: 'AI Token & Model Cost Calculator (2026 Edition) - BunusRadar',
    description: 'Calculate and compare LLM API costs across OpenAI o3-mini, GPT-4o, Claude 3.7 Sonnet, and Gemini 2.0 with real-time prompt caching and batch discounts.',
    url: 'https://bunusradar.site/tools/ai-token-calculator',
    type: 'website',
  },
};

export default function TokenCalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'AI Token & Model Cost Calculator',
    'url': 'https://bunusradar.site/tools/ai-token-calculator',
    'applicationCategory': 'DeveloperApplication',
    'operatingSystem': 'All',
    'description': 'Free real-time AI Token Cost Calculator comparing OpenAI o3-mini, GPT-4o, Claude 3.7 Sonnet, and Gemini 2.0 Flash/Pro API pricing with batch discounts and prompt caching.',
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
        'name': 'What is an AI token in LLM pricing?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'A token is the basic unit of text processed by large language models. As a general rule of thumb, 1,000 tokens represent approximately 750 words in English. Models charge separately for input prompt tokens and generated output completion tokens.',
        },
      },
      {
        '@type': 'Question',
        'name': 'How does OpenAI Batch API reduce costs by 50%?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'The OpenAI Batch API processes non-urgent workloads asynchronously within a 24-hour window at an automatic 50% discount across supported models including GPT-4o, GPT-4o mini, and text embeddings.',
        },
      },
      {
        '@type': 'Question',
        'name': 'What is the price difference between OpenAI o3-mini and GPT-4o?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'OpenAI o3-mini costs $1.10 per 1 million input tokens and $4.40 per 1 million output tokens, delivering state-of-the-art STEM reasoning at a fraction of legacy frontier costs. In contrast, GPT-4o costs $2.50 per 1 million input tokens and $10.00 per 1 million output tokens.',
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
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors mb-4 sm:mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to BunusRadar Home
        </Link>

        <div className="p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#1b2e67] via-[#14234f] to-zinc-900 text-white shadow-xl space-y-4 border border-blue-500/20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-[#f9b44d] border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            Free Developer Tool
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            AI Token & Model Cost Calculator
          </h1>
          <p className="text-zinc-300 max-w-2xl text-sm md:text-base leading-relaxed">
            Estimate, compare, and forecast monthly LLM API expenditures across OpenAI o3-mini, GPT-4o, Claude 3.7 Sonnet, Gemini 2.0, and DeepSeek R1/V3 with real-time prompt caching and batch discount modeling.
          </p>
        </div>
      </div>

      {/* Interactive Tool Component */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <TokenCalculatorClient />
      </div>

      {/* Educational & SEO Documentation Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-zinc-800 dark:text-zinc-200">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-600" />
            How LLM Token Economics Work
          </h2>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Large Language Model APIs bill developers based on token volume rather than character count or server execution seconds. Because generation requires iterative next-token prediction, output tokens are priced between 3x to 4x higher than input prompt tokens across nearly all major model providers.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <span className="text-xs font-bold uppercase text-zinc-400">Word Ratio</span>
              <p className="text-xl font-black text-zinc-900 dark:text-white mt-1">1k Tokens</p>
              <p className="text-xs text-zinc-500 mt-1">~750 English words or ~4KB of UTF-8 code.</p>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <span className="text-xs font-bold uppercase text-zinc-400">Batch Discounts</span>
              <p className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">50% Off</p>
              <p className="text-xs text-zinc-500 mt-1">Available on non-streaming asynchronous API runs.</p>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <span className="text-xs font-bold uppercase text-zinc-400">Prompt Caching</span>
              <p className="text-xl font-black text-blue-600 dark:text-blue-400 mt-1">50% - 90% Off</p>
              <p className="text-xs text-zinc-500 mt-1">Automatic savings: 50% for OpenAI, up to 90% on Anthropic cached input tokens (audited October 2026).</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            Architectural Guidelines: Which Model to Pick?
          </h2>
          <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
            <li>
              <strong className="text-zinc-900 dark:text-white">High-Speed Microservices & High-Volume Bots:</strong> Use <strong className="text-blue-600">GPT-4o mini</strong> ($0.15/1M input) or <strong className="text-emerald-600">DeepSeek V3</strong>. They provide sub-second responses at fractions of a cent per thousand calls.
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-white">Complex Reasoning & Multi-Step Code Architecture:</strong> Deploy <strong className="text-purple-600">OpenAI o1</strong> ($15.00/1M input) or <strong className="text-blue-500">Claude 3.7 Sonnet</strong>. Their internal chain-of-thought processing prevents logical failures in heavy mathematical and architectural problem spaces.
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-white">Enterprise General Intelligence:</strong> Rely on <strong className="text-zinc-900 dark:text-white">GPT-4o</strong> ($2.50/1M input) for vision, document parsing, and high-quality structured output synthesis.
            </li>
          </ul>
        </section>

        <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <h3 className="font-bold text-zinc-900 dark:text-white text-base">
                How does OpenAI prompt caching reduce monthly bills?
              </h3>
              <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                When sending API calls that share the same long prefix (such as system instructions, codebases, or reference documentation above 1,024 tokens), OpenAI automatically caches the prefix. Cached input tokens receive an automatic 50% discount and cut inference latency significantly.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <h3 className="font-bold text-zinc-900 dark:text-white text-base">
                What is the difference between OpenAI Batch API and Realtime API?
              </h3>
              <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                The Realtime API provides low-latency bidirectional voice and multimodal streaming for customer service and live agents. In contrast, the Batch API is designed for offline evaluation, nightly summarization, and dataset enrichment, cutting standard token costs by 50% in exchange for a 24-hour SLA.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
