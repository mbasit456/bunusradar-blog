'use client';

import React, { useState } from 'react';
import { Calculator, Check, Copy, Share2, Layers, DollarSign, Sliders, ArrowUpRight } from 'lucide-react';

interface ModelPricing {
  id: string;
  name: string;
  provider: string;
  inputPerMillion: number;
  outputPerMillion: number;
  color: string;
}

const MODELS: ModelPricing[] = [
  { id: 'gpt-4o-mini', name: 'GPT-4o mini', provider: 'OpenAI', inputPerMillion: 0.15, outputPerMillion: 0.60, color: 'bg-emerald-500' },
  { id: 'deepseek-v3', name: 'DeepSeek V3', provider: 'DeepSeek', inputPerMillion: 0.14, outputPerMillion: 0.28, color: 'bg-teal-500' },
  { id: 'gemini-20-flash', name: 'Gemini 2.0 Flash', provider: 'Google', inputPerMillion: 0.10, outputPerMillion: 0.40, color: 'bg-cyan-500' },
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', inputPerMillion: 2.50, outputPerMillion: 10.00, color: 'bg-blue-600' },
  { id: 'claude-37-sonnet', name: 'Claude 3.7 Sonnet', provider: 'Anthropic', inputPerMillion: 3.00, outputPerMillion: 15.00, color: 'bg-amber-500' },
  { id: 'gemini-20-pro', name: 'Gemini 2.0 Pro', provider: 'Google', inputPerMillion: 2.50, outputPerMillion: 10.00, color: 'bg-indigo-500' },
  { id: 'o3-mini', name: 'o3-mini', provider: 'OpenAI', inputPerMillion: 1.10, outputPerMillion: 4.40, color: 'bg-purple-500' },
  { id: 'deepseek-r1', name: 'DeepSeek R1', provider: 'DeepSeek', inputPerMillion: 0.55, outputPerMillion: 2.19, color: 'bg-rose-500' },
];

export default function TokenCalculatorClient() {
  const [selectedModelId, setSelectedModelId] = useState('gpt-4o');
  const [inputTokens, setInputTokens] = useState(2000);
  const [outputTokens, setOutputTokens] = useState(600);
  const [monthlyRequests, setMonthlyRequests] = useState(25000);
  const [useBatchApi, setUseBatchApi] = useState(false);
  const [usePromptCaching, setUsePromptCaching] = useState(false);
  const [copied, setCopied] = useState(false);

  const selectedModel = MODELS.find(m => m.id === selectedModelId) || MODELS[3];

  const calculateCost = (model: ModelPricing) => {
    let inputRate = model.inputPerMillion;
    let outputRate = model.outputPerMillion;

    if (useBatchApi) {
      inputRate *= 0.5;
      outputRate *= 0.5;
    }

    if (usePromptCaching) {
      inputRate *= 0.5;
    }

    const totalInputTokens = inputTokens * monthlyRequests;
    const totalOutputTokens = outputTokens * monthlyRequests;

    const inputCost = (totalInputTokens / 1_000_000) * inputRate;
    const outputCost = (totalOutputTokens / 1_000_000) * outputRate;
    const totalCost = inputCost + outputCost;

    return {
      totalCost,
      inputCost,
      outputCost,
      costPerThousand: monthlyRequests > 0 ? (totalCost / monthlyRequests) * 1000 : 0,
      totalTokens: totalInputTokens + totalOutputTokens,
    };
  };

  const currentResult = calculateCost(selectedModel);

  const applyPreset = (inTok: number, outTok: number, reqs: number) => {
    setInputTokens(inTok);
    setOutputTokens(outTok);
    setMonthlyRequests(reqs);
  };

  const handleCopySummary = () => {
    const summary = `AI Cost Calculation (${selectedModel.name}) via BunusRadar:
- Monthly Cost: $${currentResult.totalCost.toFixed(2)}
- Input Tokens: ${inputTokens.toLocaleString()} / req
- Output Tokens: ${outputTokens.toLocaleString()} / req
- Total Monthly Requests: ${monthlyRequests.toLocaleString()}
- Batch Discount: ${useBatchApi ? '50% Applied' : 'No'}
- Prompt Caching: ${usePromptCaching ? '50% Input Discount' : 'No'}
Calculate yours at: https://bunusradar.site/tools/ai-token-calculator`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 bg-white dark:bg-zinc-950 p-4 sm:p-6 md:p-10 rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl">
      {/* Controls Column */}
      <div className="lg:col-span-7 space-y-8">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">
            1. Select AI Model
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
            {MODELS.map(m => (
              <button
                key={m.id}
                onClick={() => setSelectedModelId(m.id)}
                className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl text-left border transition-all ${
                  selectedModelId === m.id
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 shadow-sm'
                    : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400'
                }`}
              >
                <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">{m.provider}</div>
                <div className="font-extrabold text-xs truncate mt-0.5">{m.name}</div>
                <div className="text-[10px] text-zinc-500 mt-1">${m.inputPerMillion}/M in</div>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Presets */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Quick Presets</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => applyPreset(1200, 350, 50000)}
              className="px-3 py-1.5 rounded-xl text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
            >
              💬 Support Bot
            </button>
            <button
              onClick={() => applyPreset(4500, 1200, 20000)}
              className="px-3 py-1.5 rounded-xl text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
            >
              💻 Code Reviewer
            </button>
            <button
              onClick={() => applyPreset(9000, 800, 30000)}
              className="px-3 py-1.5 rounded-xl text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
            >
              🔍 RAG Search
            </button>
            <button
              onClick={() => applyPreset(25000, 2500, 5000)}
              className="px-3 py-1.5 rounded-xl text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
            >
              📄 Doc Extraction
            </button>
          </div>
        </div>

        {/* Sliders and Inputs */}
        <div className="space-y-6 pt-2">
          {/* Input Tokens */}
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 text-xs">
              <span className="font-bold text-zinc-700 dark:text-zinc-300">Prompt / Input Tokens per Request</span>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-md w-fit">
                {inputTokens.toLocaleString()} tokens
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="50000"
              step="100"
              value={inputTokens}
              onChange={e => setInputTokens(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-400">
              <span>100</span>
              <span>10,000</span>
              <span>25,000</span>
              <span>50,000</span>
            </div>
          </div>

          {/* Output Tokens */}
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 text-xs">
              <span className="font-bold text-zinc-700 dark:text-zinc-300">Generated / Completion Tokens per Request</span>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-md w-fit">
                {outputTokens.toLocaleString()} tokens
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="10000"
              step="50"
              value={outputTokens}
              onChange={e => setOutputTokens(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-400">
              <span>50</span>
              <span>2,000</span>
              <span>5,000</span>
              <span>10,000</span>
            </div>
          </div>

          {/* Monthly Requests */}
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 text-xs">
              <span className="font-bold text-zinc-700 dark:text-zinc-300">Monthly API Requests</span>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-md w-fit">
                {monthlyRequests.toLocaleString()} calls
              </span>
            </div>
            <input
              type="range"
              min="500"
              max="500000"
              step="500"
              value={monthlyRequests}
              onChange={e => setMonthlyRequests(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-400">
              <span>500</span>
              <span>50,000</span>
              <span>200,000</span>
              <span>500,000</span>
            </div>
          </div>
        </div>

        {/* Cost Optimization Toggles */}
        <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:border-zinc-300 transition-colors">
            <input
              type="checkbox"
              checked={useBatchApi}
              onChange={e => setUseBatchApi(e.target.checked)}
              className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
            />
            <div>
              <div className="text-xs font-bold text-zinc-900 dark:text-white">Batch API (50% Off)</div>
              <div className="text-[10px] text-zinc-500">Asynchronous 24h turnaround</div>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:border-zinc-300 transition-colors">
            <input
              type="checkbox"
              checked={usePromptCaching}
              onChange={e => setUsePromptCaching(e.target.checked)}
              className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
            />
            <div>
              <div className="text-xs font-bold text-zinc-900 dark:text-white">Prompt Caching (50% to 90% In)</div>
              <div className="text-[10px] text-zinc-500">50% OpenAI / up to 90% Anthropic prefix discount</div>
            </div>
          </label>
        </div>
      </div>

      {/* Results Dashboard Column */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-gradient-to-br from-zinc-50 to-blue-50/30 dark:from-zinc-900 dark:to-zinc-900/60 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Monthly Projection</span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
              {selectedModel.name}
            </span>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight break-words">
              ${currentResult.totalCost < 1 ? currentResult.totalCost.toFixed(3) : currentResult.totalCost.toFixed(2)}
            </div>
            <p className="text-xs text-zinc-500 font-medium">
              Estimated monthly total for {monthlyRequests.toLocaleString()} requests
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <div>
              <span className="text-[10px] font-bold uppercase text-zinc-400">Input Tokens Cost</span>
              <p className="text-xs sm:text-sm font-extrabold text-zinc-800 dark:text-zinc-200 mt-0.5 truncate">
                ${currentResult.inputCost.toFixed(2)}
              </p>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-zinc-400">Output Tokens Cost</span>
              <p className="text-xs sm:text-sm font-extrabold text-zinc-800 dark:text-zinc-200 mt-0.5 truncate">
                ${currentResult.outputCost.toFixed(2)}
              </p>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-zinc-400">Cost / 1k Requests</span>
              <p className="text-xs sm:text-sm font-extrabold text-zinc-800 dark:text-zinc-200 mt-0.5 truncate">
                ${currentResult.costPerThousand.toFixed(3)}
              </p>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-zinc-400">Monthly Token Volume</span>
              <p className="text-xs sm:text-sm font-extrabold text-zinc-800 dark:text-zinc-200 mt-0.5 truncate">
                {(currentResult.totalTokens / 1_000_000).toFixed(1)}M tokens
              </p>
            </div>
          </div>
        </div>

        {/* Model Comparison Matrix in Dashboard */}
        <div className="space-y-3 pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <div className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Compare Across Other Models
          </div>
          <div className="space-y-2">
            {MODELS.filter(m => m.id !== selectedModel.id).slice(0, 4).map(m => {
              const comp = calculateCost(m);
              return (
                <div
                  key={m.id}
                  onClick={() => setSelectedModelId(m.id)}
                  className="flex items-center justify-between text-xs p-2 rounded-xl hover:bg-white dark:hover:bg-zinc-800 transition-colors cursor-pointer group"
                >
                  <span className="font-semibold text-zinc-700 dark:text-zinc-300 group-hover:text-blue-600 transition-colors truncate min-w-0 pr-2">
                    {m.name}
                  </span>
                  <span className="font-mono font-bold text-zinc-900 dark:text-white">
                    ${comp.totalCost < 1 ? comp.totalCost.toFixed(3) : comp.totalCost.toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleCopySummary}
          className="w-full py-3.5 px-4 rounded-2xl bg-[#1b2e67] hover:bg-[#14234f] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              Copied to Clipboard!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy Estimate Summary
            </>
          )}
        </button>
      </div>
    </div>
  );
}
