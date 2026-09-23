import Link from 'next/link';
import { Metadata } from 'next';
import { Lock, FileCheck, Cookie, Shield, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy & Terms of Service | BunusRadar',
  description: 'BunusRadar privacy policy, cookie disclosures, data collection practices, and terms of service.',
};

export default function PrivacyTermsPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900 shadow-sm">
            <Lock className="w-3.5 h-3.5" />
            <span>Legal & Data Transparency</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Privacy Policy & Terms of Service
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
            This document outlines how <strong>BunusRadar</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) collects, uses, and protects your information when you visit <a href="https://bunusradar.site" className="text-[#1b2e67] dark:text-[#f9b44d] underline">bunusradar.site</a>, along with the terms governing your use of our publication.
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Effective Date: September 23, 2026
          </p>
        </div>

        {/* Quick Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
            <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-bold text-zinc-900 dark:text-white">Zero Data Selling</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We never sell, rent, or trade your personal data or browsing behavior to third-party data brokers.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
            <Cookie className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h3 className="font-bold text-zinc-900 dark:text-white">Anonymized Analytics</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We utilize Google Analytics 4 with IP anonymization to understand aggregate readership patterns.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
            <FileCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-bold text-zinc-900 dark:text-white">Copyright Protection</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              All editorial content, original illustrations, and benchmarks are protected intellectual property.
            </p>
          </div>
        </div>

        {/* Section 1: Privacy Policy */}
        <div className="space-y-6 text-zinc-700 dark:text-zinc-300 leading-relaxed border-t border-zinc-200 dark:border-zinc-800 pt-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Part 1: Privacy Policy</h2>
          
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">1.1 Information We Collect</h3>
          <p className="text-sm">
            When you access BunusRadar, our servers and analytics infrastructure may automatically collect non-personally identifiable diagnostic information, including:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            <li>Browser type, operating system version, and screen resolution.</li>
            <li>Pages visited, time spent per article, and referrers (e.g. search engines or social media links).</li>
            <li>Aggregated geographic data (country/city level, without precise GPS locations).</li>
          </ul>

          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white pt-2">1.2 Cookies and Web Beacons</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            We use standard session cookies to preserve user preferences (such as dark/light display modes) and aggregated analytics cookies via Google Analytics (Tag ID: G-CGM08JT8KQ). You can easily disable or clear cookies at any time via your browser settings without restricting access to our articles.
          </p>

          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white pt-2">1.3 Third-Party Services & External Links</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Our articles may contain links to external websites, documentation repositories, or retail partners. We do not control and are not responsible for the privacy practices or content of third-party domains.
          </p>
        </div>

        {/* Section 2: Terms of Service */}
        <div className="space-y-6 text-zinc-700 dark:text-zinc-300 leading-relaxed border-t border-zinc-200 dark:border-zinc-800 pt-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Part 2: Terms of Service</h2>

          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">2.1 Intellectual Property & Fair Use</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            All text, layout designs, and original articles published on BunusRadar are the exclusive property of BunusRadar. You are welcome to quote short excerpts (up to 150 words) provided that explicit attribution and a direct, do-follow hyperlink to the original article on <a href="https://bunusradar.site" className="text-[#1b2e67] dark:text-[#f9b44d] underline">bunusradar.site</a> are included. Full article scraping or automated reproduction is strictly prohibited.
          </p>

          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white pt-2">2.2 Informational Disclaimer</h3>
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Notice:</strong> Content published on BunusRadar is created for general educational and informational purposes only. It should not be construed as professional financial, legal, medical, or veterinary advice. Always consult a qualified professional regarding specific personal decisions.
            </p>
          </div>

          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white pt-2">2.3 Modifications to Terms</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            We reserve the right to amend these policies as digital regulations or publication features evolve. Continued use of BunusRadar following updates constitutes your acceptance of the revised terms.
          </p>
        </div>

        {/* Footer Link */}
        <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
          <span>BunusRadar Legal Documentation</span>
          <Link href="/about" className="hover:text-[#f9b44d] underline">
            Back to About BunusRadar
          </Link>
        </div>
      </div>
    </div>
  );
}
