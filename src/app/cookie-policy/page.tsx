import Link from 'next/link';
import { Metadata } from 'next';
import { Cookie, Settings, ShieldCheck, CheckCircle2, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cookie Policy | BunusRadar',
  description: 'BunusRadar Cookie Policy detailing essential cookies, Google Analytics, Google AdSense advertising cookies, and user opt-out controls.',
  alternates: {
    canonical: 'https://bunusradar.site/cookie-policy',
  },
  openGraph: {
    url: 'https://bunusradar.site/cookie-policy',
    title: 'Cookie Policy | BunusRadar',
    description: 'Learn how BunusRadar uses cookies and tracking technologies, and how you can control your preferences.',
  },
};

export default function CookiePolicyPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-900 shadow-sm">
            <Cookie className="w-3.5 h-3.5" />
            <span>Cookie Transparency</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Cookie Policy
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
            This Cookie Policy explains what cookies are, how <strong>BunusRadar</strong> uses cookies and similar tracking technologies on <a href="https://bunusradar.site" className="text-[#1b2e67] dark:text-[#f9b44d] font-semibold underline">https://bunusradar.site</a>, and your choices regarding cookies.
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Last Updated: October 10, 2026 • Compliant with ePrivacy Directive, GDPR, and Google AdSense
          </p>
        </div>

        {/* What are Cookies */}
        <div className="space-y-8 text-zinc-700 dark:text-zinc-300 leading-relaxed border-t border-zinc-200 dark:border-zinc-800 pt-8 text-sm">
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used by website operators to make websites work properly, improve browsing efficiency, and provide diagnostic reporting information.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">2. Categories of Cookies We Use</h2>
            
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-zinc-900 dark:text-white text-base">A. Strictly Necessary / Functional Cookies</h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-zinc-200 dark:bg-zinc-700 px-2 py-0.5 rounded text-zinc-800 dark:text-zinc-200">Essential</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  These cookies are essential for the operation of BunusRadar. They enable core functionalities such as remembering your preferred dark/light color mode, keeping you logged in if applicable, and securing form submissions.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-zinc-900 dark:text-white text-base">B. Analytics & Performance Cookies (Google Analytics 4)</h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300 px-2 py-0.5 rounded">Analytics</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  We use Google Analytics (Tag ID: <code>G-CGM08JT8KQ</code>) to collect anonymized statistical data about how visitors interact with our content. This helps us understand which AI benchmark articles are most popular and identify navigation bottlenecks. Google Analytics uses IP anonymization so no individual reader can be tracked personally.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-zinc-900 dark:text-white text-base">C. Advertising & Targeting Cookies (Google AdSense & DoubleClick)</h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 px-2 py-0.5 rounded">Advertising</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Google and third-party vendors use cookies to serve ads based on your prior visits to BunusRadar or other websites on the internet. Google&apos;s use of advertising cookies enables it and its partners to serve personalized ads based on your visits to our site and other internet locations.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">3. Third-Party Cookies Overview</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs text-left border border-zinc-200 dark:border-zinc-800 rounded-lg">
                <thead className="bg-zinc-100 dark:bg-zinc-800 font-bold text-zinc-800 dark:text-zinc-200">
                  <tr>
                    <th className="p-3">Vendor</th>
                    <th className="p-3">Purpose</th>
                    <th className="p-3">Duration</th>
                    <th className="p-3">Opt-Out Link</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  <tr>
                    <td className="p-3 font-semibold">Google AdSense</td>
                    <td className="p-3">Personalized and contextual ad delivery</td>
                    <td className="p-3">Up to 24 months</td>
                    <td className="p-3"><a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-[#1b2e67] dark:text-[#f9b44d] underline font-semibold">Google Ads Settings</a></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Google Analytics</td>
                    <td className="p-3">Anonymized readership measurement</td>
                    <td className="p-3">2 months to 2 years</td>
                    <td className="p-3"><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#1b2e67] dark:text-[#f9b44d] underline font-semibold">GA Opt-Out Add-on</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">4. How You Can Control Cookies</h2>
            <p>
              You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in your web browser:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-zinc-600 dark:text-zinc-400">
              <li><strong>Chrome:</strong> Settings &gt; Privacy and security &gt; Cookies and other site data.</li>
              <li><strong>Firefox:</strong> Options &gt; Privacy &amp; Security &gt; Enhanced Tracking Protection.</li>
              <li><strong>Safari:</strong> Preferences &gt; Privacy &gt; Manage Website Data.</li>
              <li><strong>Edge:</strong> Settings &gt; Cookies and site permissions.</li>
            </ul>
            <p>
              In addition, most advertising networks offer you a way to opt out of targeted advertising. You can visit <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-[#1b2e67] dark:text-[#f9b44d] font-semibold underline">aboutads.info/choices</a> or <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-[#1b2e67] dark:text-[#f9b44d] font-semibold underline">youronlinechoices.com</a> to opt out globally.
            </p>
          </section>

          <section className="space-y-3 border-t border-zinc-200 dark:border-zinc-800 pt-6">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">5. Updates to This Cookie Policy</h2>
            <p>
              We may update this Cookie Policy from time to time in order to reflect changes to the cookies we use or for other operational, legal, or regulatory reasons.
            </p>
            <p className="text-xs text-zinc-500">
              Questions? Reach out to our privacy desk at <a href="mailto:privacy@bunusradar.site" className="text-[#1b2e67] dark:text-[#f9b44d] underline font-medium">privacy@bunusradar.site</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
