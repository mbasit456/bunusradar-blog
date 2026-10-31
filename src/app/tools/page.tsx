import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Cpu, 
  Sparkles, 
  TrendingUp, 
  Calculator, 
  Wand2, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  CheckCircle2,
  Terminal,
  Layers,
  Bot
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Interactive AI & Developer Tools (2026) - BunusRadar',
  description: 'Explore BunusRadar\'s suite of free, high-performance interactive developer tools: AI Token Cost Calculator, System Prompt Optimizer, and Enterprise AI ROI Calculator.',
  keywords: [
    'free ai tools',
    'developer tools 2026',
    'ai token calculator',
    'ai prompt optimizer',
    'ai roi calculator',
    'llm pricing tracker',
    'system prompt generator'
  ],
  alternates: {
    canonical: 'https://bunusradar.site/tools',
  },
  openGraph: {
    title: 'Free Interactive AI & Developer Tools - BunusRadar',
    description: 'High-performance interactive tools for software engineers, tech leads, and founders evaluating modern artificial intelligence.',
    url: 'https://bunusradar.site/tools',
    type: 'website',
  },
};

const TOOLS = [
  {
    title: 'Free AI Chat, Image Studio & Canvas Workspace',
    slug: 'free-ai-chat',
    category: 'Conversational AI, Art & Code',
    badge: 'Flagship',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    description: 'Conversational assistant with multi-engine AI image generation (Gemini Vision and Open Diffusion Grid), Claude-style interactive code canvases, step-by-step reasoning, and live sandboxed web execution.',
    icon: Bot,
    stats: 'AI Image Studio • Code Canvas Artifacts • DeepSeek Reasoning • Multi-Model',
    cta: 'Launch AI Workspace',
  },
  {
    title: 'AI Token & Model Cost Calculator',
    slug: 'ai-token-calculator',
    category: 'API Economics',
    badge: 'Popular',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    description: 'Real-time pricing comparison across OpenAI o1, GPT-4o, Claude 3.5 Sonnet, Gemini 1.5, and DeepSeek. Model monthly operational costs, batch discounts, and prompt caching savings.',
    icon: Cpu,
    stats: '6 Models Tracked • Prompt Caching • Batch API',
    cta: 'Launch Token Calculator',
  },
  {
    title: 'AI Prompt Optimizer & System Prompt Builder',
    slug: 'ai-prompt-optimizer',
    category: 'Prompt Engineering',
    badge: 'New',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    description: 'Construct production-ready system prompts, CRISPE frameworks, and Chain-of-Thought directives for Claude 3.5, GPT-4o, Cursor IDE, and Midjourney with zero conversational fluff.',
    icon: Wand2,
    stats: 'CRISPE & CoT • Cursor Rules • Negative Guardrails',
    cta: 'Launch Prompt Optimizer',
  },
  {
    title: 'Enterprise AI ROI & Productivity Calculator',
    slug: 'ai-roi-calculator',
    category: 'Financial Modeling',
    badge: 'Executive',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    description: 'Quantify exact dollar returns, reclaimed engineering hours, and break-even payback periods for GitHub Copilot, Cursor, and enterprise LLM subscriptions.',
    icon: TrendingUp,
    stats: 'Hourly Comp Modeling • Payback Horizon • One-Click Executive Report',
    cta: 'Launch ROI Calculator',
  },
];

export default function ToolsIndexPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Free Interactive AI & Developer Tools',
    url: 'https://bunusradar.site/tools',
    description: 'High-performance interactive tools for software engineers and founders evaluating artificial intelligence.',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: TOOLS.map((t, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: t.title,
        url: `https://bunusradar.site/tools/${t.slug}`,
      })),
    },
  };

  return (
    <div className="py-8 md:py-14 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#1b2e67] via-[#14234f] to-zinc-900 text-white shadow-xl space-y-4 border border-blue-500/20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-[#f9b44d] border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            Developer Utilities Hub
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Free Interactive AI & Engineering Tools
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 max-w-3xl leading-relaxed">
            Evidence-based interactive calculators, system prompt architects, and economic models designed for developers, engineering leaders, and digital founders.
          </p>

          <div className="pt-2 flex flex-wrap gap-3 sm:gap-6 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Free Forever
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#f9b44d]" /> Zero Signup Required
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-400" /> Client-Side Privacy
            </span>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.slug}
                className="bg-white border border-zinc-200/90 rounded-2xl p-5 sm:p-7 shadow-sm hover:shadow-md hover:border-[#1b2e67] transition-all flex flex-col justify-between group space-y-5 sm:space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="p-2.5 sm:p-3 rounded-xl bg-blue-50 text-[#1b2e67] group-hover:bg-[#1b2e67] group-hover:text-white transition-all shadow-xs">
                      <Icon className="w-5 h-5 sm:w-6 h-6" />
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${tool.badgeColor}`}>
                      {tool.badge}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-600 block mb-1">
                      {tool.category}
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-zinc-900 group-hover:text-[#1b2e67] transition-colors leading-snug">
                      {tool.title}
                    </h2>
                    <p className="mt-2 text-xs text-zinc-600 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-100 space-y-3">
                  <div className="text-[11px] font-semibold text-zinc-600 break-words">
                    {tool.stats}
                  </div>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#1b2e67] hover:bg-[#14234f] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs group-hover:bg-[#f9b44d] group-hover:text-[#1b2e67]"
                  >
                    <span>{tool.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
