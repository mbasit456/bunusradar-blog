import Link from 'next/link';
import { Metadata } from 'next';
import { FileCheck, Shield, Scale, AlertOctagon, RefreshCw } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms and Conditions | BunusRadar',
  description: 'BunusRadar Terms and Conditions governing user access, intellectual property, permissible usage, and dispute resolution.',
  alternates: {
    canonical: 'https://bunusradar.site/terms-and-conditions',
  },
  openGraph: {
    url: 'https://bunusradar.site/terms-and-conditions',
    title: 'Terms and Conditions | BunusRadar',
    description: 'Read the terms governing access and permissible use of BunusRadar publications and research.',
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
            <span>User Agreement</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Terms and Conditions
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Welcome to <strong>BunusRadar</strong> (&ldquo;Website&rdquo;). These terms and conditions outline the rules and regulations for the use of BunusRadar, located at <a href="https://bunusradar.site" className="text-[#1b2e67] dark:text-[#f9b44d] font-semibold underline">https://bunusradar.site</a>.
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Last Updated: October 10, 2026 • Effective Date: January 1, 2024
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
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">2. Intellectual Property Rights</h2>
            <p>
              Unless otherwise stated, BunusRadar and/or its licensors own the intellectual property rights for all material on BunusRadar. All intellectual property rights are reserved. You may access this from BunusRadar for your own personal use subjected to restrictions set in these terms and conditions.
            </p>
            <p className="font-semibold text-zinc-900 dark:text-white">You must not:</p>
            <ul className="list-disc pl-6 space-y-1 text-zinc-600 dark:text-zinc-400">
              <li>Republish material from BunusRadar without explicit written consent.</li>
              <li>Sell, rent, or sub-license material from BunusRadar.</li>
              <li>Reproduce, duplicate, or copy full editorial articles or benchmark data sets for commercial exploitation.</li>
              <li>Redistribute content from BunusRadar (unless content is specifically made for redistribution under CC BY 4.0 licenses).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">3. Research Citation & Fair Use Policy</h2>
            <p>
              We actively encourage journalists, academic researchers, and developers to cite BunusRadar&apos;s benchmarks and original research. You are permitted to quote up to 150 words of editorial text or summarize benchmark metrics provided that you provide clear attribution with a direct, do-follow link to the specific canonical URL on <a href="https://bunusradar.site" className="text-[#1b2e67] dark:text-[#f9b44d] underline font-medium">bunusradar.site</a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">4. User Comments and Contributions</h2>
            <p>
              Certain parts of this website may offer the opportunity for users to submit feedback, tips, or comments. BunusRadar reserves the right to monitor all comments and to remove any comments which can be considered inappropriate, offensive, or causes breach of these Terms and Conditions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">5. Hyperlinking to Our Content</h2>
            <p>
              The following organizations may link to our Website without prior written approval:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-zinc-600 dark:text-zinc-400">
              <li>Search engines (Google, Bing, DuckDuckGo);</li>
              <li>News and tech journalism publications;</li>
              <li>Academic institutions and educational repositories;</li>
              <li>AI answer engines and research indices citing factual claims.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">6. Disclaimer of Warranties & Limitation of Liability</h2>
            <p>
              The materials on BunusRadar are provided on an &quot;as is&quot; basis. BunusRadar makes no warranties, expressed or implied, and hereby disclaims all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
            </p>
            <p>
              In no event shall BunusRadar or its contributors be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on BunusRadar.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">7. Governing Law & Dispute Resolution</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of the State of Nevada, United States, and you irrevocably submit to the exclusive jurisdiction of the state and federal courts located in Clark County, Nevada.
            </p>
          </section>

          <section className="space-y-3 border-t border-zinc-200 dark:border-zinc-800 pt-6">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">8. Changes to Terms</h2>
            <p>
              BunusRadar may revise these Terms and Conditions at any time without notice. By using this website, you are agreeing to be bound by the then-current version of these Terms and Conditions.
            </p>
            <p className="text-xs text-zinc-500 pt-2">
              For questions concerning these Terms, contact our legal desk at <a href="mailto:privacy@bunusradar.site" className="text-[#1b2e67] dark:text-[#f9b44d] underline font-medium">privacy@bunusradar.site</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
