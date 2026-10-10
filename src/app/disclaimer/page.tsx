import Link from 'next/link';
import { Metadata } from 'next';
import { AlertTriangle, ShieldCheck, DollarSign, Stethoscope, Scale, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Disclaimer | BunusRadar',
  description: 'BunusRadar general disclaimer covering informational content, financial analysis, software benchmarks, affiliate disclosures, and external links.',
  alternates: {
    canonical: 'https://bunusradar.site/disclaimer',
  },
  openGraph: {
    url: 'https://bunusradar.site/disclaimer',
    title: 'Disclaimer | BunusRadar',
    description: 'Understand the scope, limitations, and informational nature of content published on BunusRadar.',
  },
};

export default function DisclaimerPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-900 shadow-sm">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Legal Disclaimers & Notices</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Disclaimer
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
            The information provided by <strong>BunusRadar</strong> on <a href="https://bunusradar.site" className="text-[#1b2e67] dark:text-[#f9b44d] font-semibold underline">https://bunusradar.site</a> is published for general educational, analytical, and informational purposes only.
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Last Updated: October 10, 2026
          </p>
        </div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <DollarSign className="w-6 h-6 text-emerald-600" />
            <h2 className="font-bold text-base text-zinc-900 dark:text-white">No Financial or Investment Advice</h2>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Discussions of micro-SaaS economics, digital business models, unit economics, and remote income systems represent editorial commentary and industry case studies. They do not constitute financial, investment, accounting, or tax advice. Consult a certified financial planner (CFP) before making capital investments.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <Scale className="w-6 h-6 text-blue-600" />
            <h2 className="font-bold text-base text-zinc-900 dark:text-white">No Legal or Compliance Advice</h2>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Analyses of enterprise software licensing, data privacy regulations (GDPR/CCPA), intellectual property, and sweepstakes laws reflect editorial research. Content does not constitute formal legal counsel. Readers should consult a licensed attorney for binding legal counsel.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <Stethoscope className="w-6 h-6 text-rose-600" />
            <h2 className="font-bold text-base text-zinc-900 dark:text-white">No Medical or Veterinary Advice</h2>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Articles discussing healthcare IT systems (such as electronic health records) or lifestyle topics (such as allergen proteins in felines) are informational overviews. They must never substitute for licensed medical diagnosis or veterinary clinical care.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <FileText className="w-6 h-6 text-purple-600" />
            <h2 className="font-bold text-base text-zinc-900 dark:text-white">Affiliate & Advertising Disclosure</h2>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              BunusRadar participates in affiliate marketing programs and displays digital advertising via Google AdSense. In compliance with FTC guidelines, we may receive compensation when you click certain partner links. This compensation does not affect our objective benchmark scoring or editorial independence.
            </p>
          </div>
        </div>

        {/* Detailed Disclaimer Text */}
        <div className="space-y-6 text-zinc-700 dark:text-zinc-300 leading-relaxed border-t border-zinc-200 dark:border-zinc-800 pt-8 text-sm">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">1. Accuracy and Information Freshness</h2>
            <p>
              While our editorial staff makes every effort to verify facts, benchmark figures, and API pricing against official documentation, the technology and artificial intelligence landscapes evolve rapidly. Specifications, pricing tiers, token limits, and software features may change without notice. BunusRadar assumes no liability for actions taken based on historical or changing specifications.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">2. Software Benchmarks & Test Environments</h2>
            <p>
              All performance benchmarks published on the <Link href="/research" className="text-[#1b2e67] dark:text-[#f9b44d] font-semibold underline">BunusRadar Research Hub</Link> reflect results observed under controlled hardware configurations (documented in our <Link href="/methodology" className="text-[#1b2e67] dark:text-[#f9b44d] font-semibold underline">Methodology</Link>). Individual performance in production environments may differ depending on network topology, repository architecture, and client-side variables.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">3. External Links Disclaimer</h2>
            <p>
              BunusRadar may contain links to external websites that are not provided or maintained by or in any way affiliated with BunusRadar. Please note that BunusRadar does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">4. Fair Use & Quotation</h2>
            <p>
              Product trademarks, logos, and brand names mentioned on BunusRadar belong to their respective owners. Mention of these names does not imply affiliation or endorsement unless explicitly stated.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
