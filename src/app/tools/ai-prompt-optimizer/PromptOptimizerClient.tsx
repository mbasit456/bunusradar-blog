'use client';

import { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  RefreshCw, 
  Wand2, 
  Sliders, 
  Layers, 
  Code2, 
  ExternalLink, 
  Terminal,
  FileText
} from 'lucide-react';

interface Template {
  name: string;
  category: string;
  model: string;
  role: string;
  task: string;
  constraints: string[];
}

const PRESET_TEMPLATES: Template[] = [
  {
    name: 'Production Code Architect & Refactorer',
    category: 'Engineering',
    model: 'Claude 3.5 Sonnet / Cursor',
    role: 'Staff Principal Engineer specializing in high-performance TypeScript and distributed systems',
    task: 'Analyze the provided code module, identify architectural bottlenecks, memory leaks, and concurrency edge cases, then provide a refactored implementation.',
    constraints: ['Strict TypeScript with no any types', 'Preserve all existing public API interfaces', 'Add comprehensive JSDoc annotations', 'Zero external runtime dependencies'],
  },
  {
    name: 'Deep Technical Whitepaper & Research Outline',
    category: 'Research',
    model: 'ChatGPT o1 / GPT-4o',
    role: 'Lead AI Research Scientist with peer-reviewed publications in LLM reasoning and inference systems',
    task: 'Draft an exhaustive, evidence-backed research outline comparing autonomous agent memory architectures and prompt-caching economics.',
    constraints: ['Cite documented software benchmarks', 'Format in clean GitHub markdown', 'Include comparative matrix tables', 'Tone: authoritative and technical'],
  },
  {
    name: 'Micro-SaaS Unit Economics & Pricing Model',
    category: 'Business',
    model: 'GPT-4o',
    role: 'Venture Capital Operating Partner and SaaS Growth Strategist',
    task: 'Formulate an end-to-end pricing tier and monetization architecture for an AI developer utility targeting $20k monthly recurring revenue.',
    constraints: ['Include free tier break-even calculations', 'Analyze margin risk with token pricing', 'Provide 3 distinct packaging tiers', 'Output in structured markdown tables'],
  },
  {
    name: 'Photorealistic Midjourney Cinematic Scene',
    category: 'Generative Media',
    model: 'Midjourney v6',
    role: 'Award-winning Cinematographer and Creative Art Director',
    task: 'Futuristic enterprise AI data center with sleek architectural glass, warm amber volumetric lighting, reflections on polished obsidian floor, 8k resolution.',
    constraints: ['35mm anamorphic lens', 'cinematic lighting, photorealistic, volumetric smoke', '--ar 16:9', '--v 6.0 --style raw'],
  },
];

export default function PromptOptimizerClient() {
  const [model, setModel] = useState('Claude 3.5 Sonnet');
  const [role, setRole] = useState('Senior Software Architect');
  const [task, setTask] = useState('');
  const [framework, setFramework] = useState('CRISPE');
  const [format, setFormat] = useState('Markdown with Step-by-Step Code');
  const [selectedConstraints, setSelectedConstraints] = useState<string[]>([
    'No conversational filler or throat-clearing',
    'Include practical, runnable code snippets',
    'Follow modern software design patterns'
  ]);
  const [copied, setCopied] = useState(false);

  const availableConstraints = [
    'No conversational filler or throat-clearing',
    'Include practical, runnable code snippets',
    'Follow modern software design patterns',
    'Strict type safety with zero any types',
    'Provide step-by-step reasoning before conclusion',
    'Format output strictly as valid JSON schema',
    'Limit response to production-ready deliverables',
    'Highlight security vulnerabilities and edge cases',
  ];

  const toggleConstraint = (c: string) => {
    setSelectedConstraints(prev => 
      prev.includes(c) ? prev.filter(item => item !== c) : [...prev, c]
    );
  };

  const applyTemplate = (t: Template) => {
    setModel(t.model.includes('Claude') ? 'Claude 3.5 Sonnet' : t.model.includes('Midjourney') ? 'Midjourney v6' : 'GPT-4o');
    setRole(t.role);
    setTask(t.task);
    setSelectedConstraints(t.constraints);
  };

  const generatePrompt = (): string => {
    if (model.includes('Midjourney')) {
      return `/imagine prompt: ${task || 'futuristic architectural enterprise technology headquarters, cinematic lighting'} ${selectedConstraints.join(', ')}`;
    }

    const lines: string[] = [];
    lines.push(`# Role & Persona`);
    lines.push(`You are acting as a ${role}.`);
    lines.push(``);
    lines.push(`# Primary Objective`);
    lines.push(task || `Provide expert architectural analysis and actionable execution protocols for the given request.`);
    lines.push(``);
    lines.push(`# Execution Framework (${framework})`);
    if (framework === 'CRISPE') {
      lines.push(`- Context: Analyze the underlying requirements, technical constraints, and domain standards.`);
      lines.push(`- Role: Maintain the specified expert persona throughout all guidance and code.`);
      lines.push(`- Insight: Synthesize best practices and avoid common anti-patterns.`);
      lines.push(`- Statement: Deliver direct, high-value, reproducible technical solutions.`);
      lines.push(`- Personality: Objective, rigorous, concise, and focused on production reliability.`);
    } else if (framework === 'Chain-of-Thought (CoT)') {
      lines.push(`1. Explicit Assumptions: State core technical premises and boundary constraints upfront.`);
      lines.push(`2. Architecture & Trade-Offs: Evaluate alternative approaches, failure modes, and performance trade-offs.`);
      lines.push(`3. Implementation: Provide verified, production-grade code or step-by-step guidance.`);
      lines.push(`4. Verification & Validation: Confirm output correctness with executable examples and test specifications.`);
    } else {
      lines.push(`Follow standard prompt engineering standards with clear structural separation.`);
    }
    lines.push(``);
    lines.push(`# Output Constraints & Guidelines`);
    lines.push(`- Desired Format: ${format}`);
    selectedConstraints.forEach(c => {
      lines.push(`- ${c}`);
    });
    lines.push(``);
    lines.push(`# Context / Input Data`);
    lines.push(`[PASTE YOUR CODEBASE, DOCUMENTATION, OR QUESTION HERE]`);

    return lines.join('\n');
  };

  const generatedPrompt = generatePrompt();

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-10">
      {/* Template Quick Selectors */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1b2e67] dark:text-[#f9b44d]">
          <Wand2 className="w-4 h-4" />
          <span>Curated Prompt Blueprints</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
          {PRESET_TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.name}
              onClick={() => applyTemplate(tmpl)}
              className="p-3 sm:p-3.5 rounded-xl border border-zinc-200 bg-white hover:border-[#1b2e67] hover:shadow-sm text-left transition-all group"
            >
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-zinc-600 mb-1">
                <span>{tmpl.category}</span>
                <span className="text-[#1b2e67]">{tmpl.model.split('/')[0]}</span>
              </div>
              <p className="text-xs font-bold text-zinc-900 group-hover:text-[#1b2e67] line-clamp-2">
                {tmpl.name}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Builder Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Controls Column (5 Cols) */}
        <div className="lg:col-span-5 bg-white border border-zinc-200/90 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
            <h2 className="text-sm font-black uppercase tracking-wider text-[#1b2e67] flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#f9b44d]" /> Prompt Parameters
            </h2>
            <button
              onClick={() => {
                setTask('');
                setRole('Senior Software Architect');
                setSelectedConstraints([availableConstraints[0], availableConstraints[1]]);
              }}
              className="text-xs text-zinc-600 hover:text-zinc-900 flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Model Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700">
              Target AI Model
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1b2e67]"
            >
              <option value="Claude 3.5 Sonnet">Anthropic Claude 3.5 Sonnet (Coding & Analysis)</option>
              <option value="GPT-4o">OpenAI GPT-4o (Multimodal & Fast)</option>
              <option value="OpenAI o1">OpenAI o1 (Complex Mathematical Reasoning)</option>
              <option value="Cursor IDE / Copilot">Cursor IDE / GitHub Copilot System Prompt</option>
              <option value="DeepSeek V3 / R1">DeepSeek V3 / R1 (Open Weights Reasoning)</option>
              <option value="Midjourney v6">Midjourney v6 (Generative Imagery)</option>
            </select>
          </div>

          {/* Persona / Role */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700">
              Expert Persona / Role
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Senior Principal Cloud Engineer"
              className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1b2e67]"
            />
          </div>

          {/* Task / Objective */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700">
              Core Objective / Task
            </label>
            <textarea
              rows={3}
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Describe what you want the AI to analyze, build, design, or solve..."
              className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1b2e67]"
            />
          </div>

          {/* Reasoning Framework */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700">
              Reasoning Framework
            </label>
            <select
              value={framework}
              onChange={(e) => setFramework(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1b2e67]"
            >
              <option value="CRISPE">CRISPE (Context, Role, Insight, Statement, Personality)</option>
              <option value="Chain-of-Thought (CoT)">Chain-of-Thought (Deconstruct before answering)</option>
              <option value="Standard Structured">Standard Structured Specification</option>
            </select>
          </div>

          {/* Output Format */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700">
              Target Output Format
            </label>
            <input
              type="text"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              placeholder="e.g. Markdown with Step-by-Step Code"
              className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1b2e67]"
            />
          </div>

          {/* Guardrails / Constraints */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 block">
              Guardrails & Output Constraints
            </label>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {availableConstraints.map((c) => {
                const active = selectedConstraints.includes(c);
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => toggleConstraint(c)}
                    className={`w-full text-left px-2.5 py-1.5 rounded text-xs flex items-center justify-between border transition-all ${
                      active
                        ? 'bg-blue-50/80 border-[#1b2e67] text-[#1b2e67] font-semibold'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                    }`}
                  >
                    <span className="truncate pr-2">{c}</span>
                    <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${
                      active ? 'bg-[#1b2e67] border-[#1b2e67] text-white' : 'border-zinc-300'
                    }`}>
                      {active && <Check className="w-2.5 h-2.5" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Output Column (7 Cols) */}
        <div className="lg:col-span-7 bg-[#14234f] text-white rounded-2xl p-4 sm:p-6 shadow-xl space-y-4 border border-blue-500/20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-[#f9b44d]" />
              <h3 className="font-bold text-sm tracking-wide text-white">
                Optimized Production Prompt
              </h3>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleCopy}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#f9b44d] hover:bg-[#e09e3a] text-[#1b2e67] font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#1b2e67]" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> Copy Prompt
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Code Window */}
          <div className="relative rounded-xl bg-[#0b132b] p-3 sm:p-4 border border-white/10 font-mono text-xs text-zinc-200 leading-relaxed overflow-x-auto min-h-[260px] sm:min-h-[360px] whitespace-pre-wrap break-words selection:bg-[#f9b44d] selection:text-[#1b2e67]">
            {generatedPrompt}
          </div>

          {/* Quick Launch Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3 text-xs text-zinc-300 border-t border-white/10">
            <span>Launch directly into web workspace:</span>
            <div className="flex items-center gap-2 flex-wrap">
              <a
                href="https://chatgpt.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white flex items-center gap-1 transition-colors"
              >
                ChatGPT <ExternalLink className="w-3 h-3 text-[#f9b44d]" />
              </a>
              <a
                href="https://claude.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white flex items-center gap-1 transition-colors"
              >
                Claude <ExternalLink className="w-3 h-3 text-[#f9b44d]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
