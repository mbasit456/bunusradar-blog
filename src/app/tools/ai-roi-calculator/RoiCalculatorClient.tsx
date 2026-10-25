'use client';

import { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Users, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  Copy,
  Briefcase,
  HelpCircle
} from 'lucide-react';

interface ToolPreset {
  name: string;
  cost: number;
}

const TOOL_PRESETS: ToolPreset[] = [
  { name: 'Cursor Pro ($20/seat)', cost: 20 },
  { name: 'GitHub Copilot Business ($19/seat)', cost: 19 },
  { name: 'ChatGPT Team / Plus ($25/seat)', cost: 25 },
  { name: 'Claude Pro / Team ($25/seat)', cost: 25 },
  { name: 'Custom Tool Stack', cost: 35 },
];

export default function RoiCalculatorClient() {
  const [teamSize, setTeamSize] = useState<number>(10);
  const [hourlyRate, setHourlyRate] = useState<number>(65);
  const [hoursSavedPerWeek, setHoursSavedPerWeek] = useState<number>(4.5);
  const [costPerSeat, setCostPerSeat] = useState<number>(20);
  const [activePreset, setActivePreset] = useState<string>('Cursor Pro ($20/seat)');
  const [copied, setCopied] = useState<boolean>(false);

  // Calculations (50 working weeks per year)
  const annualCost = teamSize * costPerSeat * 12;
  const weeklyHoursSaved = teamSize * hoursSavedPerWeek;
  const annualHoursSaved = weeklyHoursSaved * 50;
  const annualGrossValue = annualHoursSaved * hourlyRate;
  const annualNetSavings = Math.max(0, annualGrossValue - annualCost);
  const roiPercentage = annualCost > 0 ? Math.round((annualNetSavings / annualCost) * 100) : 0;
  const breakEvenDays = annualGrossValue > 0 ? ((annualCost / annualGrossValue) * 365).toFixed(1) : '0';

  const selectPreset = (preset: ToolPreset) => {
    setActivePreset(preset.name);
    setCostPerSeat(preset.cost);
  };

  const executiveSummary = `Executive AI ROI Analysis (BunusRadar Model)
- Team Size: ${teamSize} specialists
- Annual Software Investment: $${annualCost.toLocaleString()} ($${costPerSeat}/seat/mo)
- Hours Reclaimed Annually: ${annualHoursSaved.toLocaleString()} hours (${hoursSavedPerWeek} hrs/worker/wk)
- Gross Productivity Value Generated: $${annualGrossValue.toLocaleString()} (at $${hourlyRate}/hr)
- Net Annual Cost Savings: $${annualNetSavings.toLocaleString()}
- Expected ROI: ${roiPercentage.toLocaleString()}%
- Break-Even Horizon: ${breakEvenDays} days`;

  const handleCopySummary = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(executiveSummary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-10">
      {/* 2-Column Responsive Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Parameters (5 Cols) */}
        <div className="lg:col-span-5 bg-white border border-zinc-200/90 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-zinc-100 pb-3">
            <h2 className="text-sm font-black uppercase tracking-wider text-[#1b2e67] flex items-center gap-2">
              <Calculator className="w-4 h-4 text-[#f9b44d]" /> Investment Parameters
            </h2>
          </div>

          {/* Tool Preset Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 block">
              AI Tool Subscription Preset
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {TOOL_PRESETS.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => selectPreset(p)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold text-left border transition-all ${
                    activePreset === p.name
                      ? 'bg-[#1b2e67] border-[#1b2e67] text-white shadow-xs'
                      : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Team Size Slider & Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                Team Size (Seats)
              </label>
              <span className="text-xs font-black text-[#1b2e67] bg-blue-50 px-2 py-0.5 rounded">
                {teamSize} {teamSize === 1 ? 'person' : 'people'}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="250"
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              className="w-full accent-[#1b2e67]"
            />
          </div>

          {/* Hourly Rate Slider & Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                Average Hourly Compensation ($/hr)
              </label>
              <span className="text-xs font-black text-[#1b2e67] bg-blue-50 px-2 py-0.5 rounded">
                ${hourlyRate}/hr (~${(hourlyRate * 2080).toLocaleString()}/yr)
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="200"
              step="5"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              className="w-full accent-[#1b2e67]"
            />
          </div>

          {/* Hours Saved Per Week */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                Weekly Hours Saved Per Person
              </label>
              <span className="text-xs font-black text-[#1b2e67] bg-blue-50 px-2 py-0.5 rounded">
                {hoursSavedPerWeek} hrs / week
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              step="0.5"
              value={hoursSavedPerWeek}
              onChange={(e) => setHoursSavedPerWeek(Number(e.target.value))}
              className="w-full accent-[#1b2e67]"
            />
            <p className="text-[11px] text-zinc-600">
              Industry benchmark: GitHub and McKinsey report 3.5 to 5.5 hours saved per developer weekly on code generation, testing, and documentation.
            </p>
          </div>

          {/* Monthly Tool Cost Per Seat */}
          <div className="space-y-1.5 pt-1">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 block">
              Monthly Tool License Fee ($ / seat / month)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">$</span>
              <input
                type="number"
                min="0"
                value={costPerSeat}
                onChange={(e) => {
                  setCostPerSeat(Number(e.target.value));
                  setActivePreset('Custom');
                }}
                className="w-full pl-7 pr-3 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1b2e67]"
              />
            </div>
          </div>
        </div>

        {/* Results & Executive Metrics (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Hero ROI Banner */}
          <div className="bg-gradient-to-br from-[#1b2e67] via-[#14234f] to-zinc-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-blue-500/20 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#f9b44d] block">
                  Projected Return On Investment
                </span>
                <div className="text-4xl sm:text-5xl font-black tracking-tight text-white mt-1">
                  {roiPercentage.toLocaleString()}% <span className="text-lg text-emerald-400 font-bold">ROI</span>
                </div>
              </div>

              <button
                onClick={handleCopySummary}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#f9b44d] hover:bg-[#e09e3a] text-[#1b2e67] font-bold text-xs uppercase tracking-wider transition-all shadow-md shrink-0 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#1b2e67]" /> Copied Report!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> Copy Executive Report
                  </>
                )}
              </button>
            </div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-1">
                <span className="text-[11px] text-zinc-400 font-semibold block">Net Annual Savings</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-400 block">
                  ${annualNetSavings.toLocaleString()}
                </span>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-1">
                <span className="text-[11px] text-zinc-400 font-semibold block">Annual Hours Reclaimed</span>
                <span className="text-xl sm:text-2xl font-black text-white block">
                  {annualHoursSaved.toLocaleString()} <span className="text-xs font-normal text-zinc-400">hrs</span>
                </span>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-1 col-span-2 sm:col-span-1">
                <span className="text-[11px] text-zinc-400 font-semibold block">Break-Even Horizon</span>
                <span className="text-xl sm:text-2xl font-black text-[#f9b44d] block">
                  {breakEvenDays} <span className="text-xs font-normal text-zinc-400">days</span>
                </span>
              </div>
            </div>

            {/* Progress / Value Visualization Bar */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs text-zinc-300">
                <span>Annual Tool Cost: <strong className="text-white">${annualCost.toLocaleString()}</strong></span>
                <span>Gross Productivity Value: <strong className="text-emerald-400">${annualGrossValue.toLocaleString()}</strong></span>
              </div>
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden flex">
                <div 
                  className="bg-amber-400 h-full"
                  style={{ width: `${Math.min(100, Math.max(3, (annualCost / (annualGrossValue || 1)) * 100))}%` }}
                  title="Software License Cost"
                />
                <div 
                  className="bg-emerald-500 h-full flex-1"
                  title="Net Reclaimed Productivity"
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-zinc-400">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> License Cost ({((annualCost / (annualGrossValue || 1)) * 100).toFixed(1)}%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Net Value Reclaimed ({Math.max(0, 100 - (annualCost / (annualGrossValue || 1)) * 100).toFixed(1)}%)
                </span>
              </div>
            </div>
          </div>

          {/* Breakdown Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-xs space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1b2e67]">Weekly Team Impact</span>
              <p className="text-2xl font-black text-zinc-900">
                {weeklyHoursSaved.toLocaleString()} Hours
              </p>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Equivalent to adding {((weeklyHoursSaved / 40)).toFixed(1)} full-time team members without additional recruiting or overhead.
              </p>
            </div>

            <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-xs space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1b2e67]">Monthly Capital Expenditure</span>
              <p className="text-2xl font-black text-zinc-900">
                ${(teamSize * costPerSeat).toLocaleString()} / mo
              </p>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Total monthly license investment across {teamSize} active seats at ${costPerSeat}/seat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
