import Link from 'next/link';
import { Metadata } from 'next';
import { FileCheck, Shield, Scale, AlertOctagon, RefreshCw, Database } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms and Conditions | BunusRadar',
  description: 'BunusRadar Terms and Conditions governing user access, dual licensing for open research datasets (CC BY 4.0), intellectual property, and permissible usage.',
  alternates: {
    canonical: 'https://bunusradar.site/terms-and-conditions',
  },
  openGraph: {
    url: 'https://bunusradar.site/terms-and-conditions',
    title: 'Terms and Conditions | BunusRadar',
    description: 'Read the terms governing access and permissible use of BunusRadar publications, open research datasets, and interactive developer tools.',
  },
};

export default function TermsAndConditionsPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-900 shadow-sm">
            <FileCheck className="w-3.5 h-3.5" />
            <span>User Agreement & Licensing</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Terms and Conditions
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Welcome to <strong>BunusRadar</strong> (&ldquo;Website&rdquo;). These terms and conditions outline the rules, licensing frameworks, and permissible usage standards for BunusRadar, located at <a href="https://bunusradar.site" className="text-[#1b2e67] dark:text-[#f9b44d] font-semibold underline">https://bunusradar.site</a>.
          </p>
          <p data-nosnippet="true" className="text-sm text-zinc-500 dark:text-zinc-400">
            Last Updated: October 31, 2026 • Effective Date: October 31, 2026 (Originally Published: January 1, 2024)
          </p>
        </div>

        {/* Core Provisions */}
        <div className="space-y-8 text-zinc-700 dark:text-zinc-300 leading-relaxed border-t border-zinc-200 dark:border-zinc-800 pt-8 text-sm">
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use BunusRadar if you do not agree to take all of the terms and conditions stated on this page.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">2. Intellectual Property Rights (General Content)</h2>
            <p>
              Unless otherwise explicitly stated, BunusRadar and its licensors own all intellectual property rights for editorial articles, visual illustrations, brand marks, and software layouts across the publication. All intellectual property rights are reserved. You may access editorial content from BunusRadar for your personal or internal reference subject to restrictions set forth in these terms.
            </p>
            <p className="font-semibold text-zinc-900 dark:text-white">You must not:</p>
            <ul className="list-disc pl-6 space-y-1 text-zinc-600 dark:text-zinc-400">
              <li>Republish full editorial articles from BunusRadar without explicit written syndication permission.</li>
              <li>Sell, rent, or sub-license editorial narrative content from BunusRadar.</li>
              <li>Scrape or reproduce full editorial narratives for commercial resale or uncredited automated publishing.</li>
            </ul>
          </section>

          {/* Dedicated Dual Licensing Section for Research Datasets */}
          <section className="space-y-4 p-6 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-600" />
              3. Dual Licensing: Open Benchmark Datasets vs. Proprietary Editorial Content
            </h2>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              To support academic reproducibility, AI transparency, and independent technical verification, BunusRadar maintains a clear distinction between open research datasets and proprietary editorial prose:
            </p>
            <div className="space-y-3 text-xs leading-relaxed">
              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-blue-200/80 dark:border-blue-800/80">
                <strong className="block text-zinc-900 dark:text-white text-sm font-semibold mb-1">
                  Open Research Datasets (Licensed under CC BY 4.0):
                </strong>
                <p className="text-zinc-600 dark:text-zinc-300">
                  All machine-readable benchmark JSON datasets hosted in the <Link href="/research" className="text-[#1b2e67] dark:text-blue-400 underline font-semibold">BunusRadar Research Hub</Link> (specifically <code>/datasets/ai-coding-assistants-benchmark-2026.json</code>, <code>/datasets/ai-image-generators-benchmark-2026.json</code>, and <code>/datasets/llm-pricing-benchmarks-2026.json</code>) are published under the <strong>Creative Commons Attribution 4.0 International License (CC BY 4.0)</strong>.
                </p>
                <p className="text-zinc-600 dark:text-zinc-300 mt-1.5">
                  You are expressly permitted to copy, redistribute, transform, and build upon these datasets in any medium or format, for any purpose (including commercial use), provided that you give appropriate credit to BunusRadar, include a link to the license, and cite the canonical source URL (<code>https://bunusradar.site/research</code>).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <strong className="block text-zinc-900 dark:text-white text-sm font-semibold mb-1">
                  Proprietary Editorial Content (All Rights Reserved):
                </strong>
                <p className="text-zinc-600 dark:text-zinc-300">
                  Full-length analytical articles, investigative commentaries, custom diagrams, brand assets, logos, and website user interface source code are proprietary works protected under international copyright law. Commercial redistribution or mass mirroring of editorial prose is strictly prohibited without written consent.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">4. Research Citation & Fair Use Policy</h2>
            <p>
              We actively encourage journalists, academic researchers, and engineers to cite BunusRadar benchmarks and original research. You are permitted to quote excerpts (up to 150 words) of editorial commentary or summarize benchmark metrics provided that you provide clear attribution with a direct do-follow link to the specific canonical article URL on <a href="https://bunusradar.site" className="text-[#1b2e67] dark:text-[#f9b44d] underline font-medium">bunusradar.site</a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">5. Hyperlinking and AI Answer Engine Citation</h2>
            <p>
              The following entities may link to or index our Website without prior written approval:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-zinc-600 dark:text-zinc-400">
              <li>Search engines and AI answer engines (Google, Bing, Perplexity, OpenAI, Claude, DuckDuckGo);</li>
              <li>Technology journalism outlets and academic research repositories citing empirical benchmark data;</li>
              <li>Open-source software documentation linking to developer tool evaluations.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">6. Disclaimer of Warranties & Limitation of Liability</h2>
            <p>
              The materials on BunusRadar are provided on an &quot;as is&quot; basis for informational, educational, and research evaluation purposes. BunusRadar disclaims all warranties, expressed or implied, including without limitation implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
            </p>
            <p>
              In no event shall BunusRadar, its contributors, or research analysts be liable for any damages (including without limitation damages for loss of data, compute costs, or profit) arising out of the use or inability to use our tools, benchmarks, or publications.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">7. Governing Law & Dispute Resolution</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of the State of Nevada, United States, and you submit to the jurisdiction of the state and federal courts located in Clark County, Nevada.
            </p>
          </section>

          <section className="space-y-3 border-t border-zinc-200 dark:border-zinc-800 pt-6">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">8. Inquiries Regarding Terms & Licensing</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              For questions concerning research dataset reuse, syndication permissions, or legal notices, please contact our legal desk at <a href="mailto:privacy@bunusradar.site" className="text-[#1b2e67] dark:text-[#f9b44d] underline font-medium">privacy@bunusradar.site</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
