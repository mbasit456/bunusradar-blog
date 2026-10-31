import Link from 'next/link';
import { Metadata } from 'next';
import { Shield, Lock, Eye, CheckCircle2, Server, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | BunusRadar',
  description: 'BunusRadar Privacy Policy outlining our compliance with Google AdSense, GDPR, CCPA/CPRA, cookie tracking, IP address processing, and data protection practices.',
  alternates: {
    canonical: 'https://bunusradar.site/privacy-policy',
  },
  openGraph: {
    url: 'https://bunusradar.site/privacy-policy',
    title: 'Privacy Policy | BunusRadar',
    description: 'Learn how BunusRadar protects your personal data and maintains compliance with advertising and analytics policies.',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900 shadow-sm">
            <Lock className="w-3.5 h-3.5" />
            <span>Data Transparency & Privacy</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
            At <strong>BunusRadar</strong>, accessible from <a href="https://bunusradar.site" className="text-[#1b2e67] dark:text-[#f9b44d] font-semibold underline">https://bunusradar.site</a>, we maintain strict standards regarding visitor privacy and data transparency. This Privacy Policy documents the types of information we collect, the lawful bases for processing, retention schedules, and your rights under global privacy regulations.
          </p>
          <p data-nosnippet="true" className="text-sm text-zinc-500 dark:text-zinc-400">
            Last Updated: October 31, 2026 • Effective Date: October 31, 2026 (Originally Published: January 1, 2024)
          </p>
        </div>

        {/* Core Commitments */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
            <Shield className="w-5 h-5 text-emerald-600" />
            <h2 className="font-bold text-sm text-zinc-900 dark:text-white">Zero Data Selling</h2>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              We never sell, rent, or trade your personal information or email addresses to data brokers or commercial third parties.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
            <Eye className="w-5 h-5 text-blue-600" />
            <h2 className="font-bold text-sm text-zinc-900 dark:text-white">AdSense Compliant</h2>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Full disclosure of third-party advertising cookies, interest-based ad targeting, and opt-out mechanisms.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
            <Globe className="w-5 h-5 text-purple-600" />
            <h2 className="font-bold text-sm text-zinc-900 dark:text-white">GDPR & CCPA Rights</h2>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Complete support for European and Californian data access, rectification, portability, and statutory erasure requests.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8 text-zinc-700 dark:text-zinc-300 leading-relaxed border-t border-zinc-200 dark:border-zinc-800 pt-8">
          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">1. Consent</h2>
            <p className="text-sm">
              By using our website, you hereby consent to our Privacy Policy and agree to its terms. If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <a href="mailto:privacy@bunusradar.site" className="text-[#1b2e67] dark:text-[#f9b44d] underline font-medium">privacy@bunusradar.site</a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">2. Information We Collect and Legal Bases for Processing</h2>
            <p className="text-sm">
              We process personal information under specific lawful bases defined in Article 6 of the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA/CPRA):
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                <strong>Direct Editorial Communications:</strong> If you contact us directly (via our contact forms or editorial desk), we collect your name, email address, and message content under our legitimate interest to respond to your inquiries and address factual corrections.
              </li>
              <li>
                <strong>Newsletter Subscriptions:</strong> If you subscribe to our twice-weekly intelligence briefings, we collect your email address based on your explicit consent. You may withdraw consent at any time via the one-click unsubscribe link included in every dispatch.
              </li>
              <li>
                <strong>Server Logs & IP Addresses:</strong> BunusRadar logs standard network diagnostic requests. Under GDPR (Article 4(1)) and CCPA/CPRA, Internet Protocol (IP) addresses are categorized as personal data and unique online identifiers. We process IP addresses, user agent strings, timestamps, and referring URLs under our legitimate interest (GDPR Art. 6(1)(f)) strictly to ensure server infrastructure security, prevent distributed denial-of-service (DDoS) attacks, detect automated abuse, and maintain site stability.
              </li>
              <li>
                <strong>Data Retention Schedule:</strong> Raw server access and security logs containing full IP addresses are retained for an operational period of exactly 30 days for cybersecurity auditing, after which they are automatically deleted or permanently aggregated and anonymized (IP truncation) for technical traffic metrics.
              </li>
            </ul>
          </section>

          {/* Interactive AI Tools & Chatbot Data Processing Section */}
          <section className="space-y-4 p-6 rounded-2xl bg-purple-50/60 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-purple-600" />
              3. Interactive AI Tools, Chatbot & Image Generation Data Practices
            </h2>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              BunusRadar hosts client-side interactive utilities, including the AI Token Calculator, AI Prompt Optimizer, Enterprise AI ROI Calculator, and the Free AI Chat & Image Studio workspace. Our data handling for these utilities is strictly separated into local client-side state and stateless transit:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              <li><strong>Local Browser Storage:</strong> Your conversation histories, created personas, canvas artifacts, and optional Bring-Your-Own-Key (BYOK) credentials are stored solely in your browser local storage (localStorage). They are never written to any BunusRadar server database, nor are they harvested for user profiling.</li>
              <li><strong>Stateless API Transit:</strong> When you submit a prompt or request an image generation, your query is sent over encrypted HTTPS to our stateless Next.js server endpoints (/api/chat and /api/chat/image). Our servers immediately proxy the payload to upstream AI providers (such as Google Generative AI or the Open Diffusion Grid) strictly to return the response stream, without persistent server logging or text retention.</li>
              <li><strong>Upstream Model Providers:</strong> Queries forwarded to upstream AI API providers are processed under their commercial API privacy terms, which prohibit utilizing customer API inputs for model pre-training.</li>
              <li><strong>Client-Side Sandboxing:</strong> All HTML, SVG, and JavaScript code generated inside our interactive Canvas workspace is isolated inside an iframe sandbox with opaque origin restrictions, preventing generated scripts from accessing cookies, storage, or parent window state.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">4. Cookies and Web Beacons</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Like any other website, BunusRadar uses cookies. These cookies are used to store information including visitors&apos; preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users&apos; experience by customizing our web page content based on visitors&apos; browser type and/or other information.
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              For more comprehensive details on how we utilize cookies and how you can manage your preferences, please consult our dedicated <Link href="/cookie-policy" className="text-[#1b2e67] dark:text-[#f9b44d] font-semibold underline">Cookie Policy</Link>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">5. Google DoubleClick DART Cookie & Third-Party Advertising</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to bunusradar.site and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-[#1b2e67] dark:text-[#f9b44d] underline break-all">https://policies.google.com/technologies/ads</a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">6. CCPA / CPRA Privacy Rights (California Consumer Privacy Act)</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Under the California Consumer Privacy Act as amended by the California Privacy Rights Act (CPRA), California residents are entitled to specific statutory rights:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-sm text-zinc-600 dark:text-zinc-400">
              <li><strong>Right to Know / Access:</strong> Request disclosure of the specific categories and pieces of personal data collected, categories of sources, and commercial purposes.</li>
              <li><strong>Right to Delete:</strong> Request the deletion of personal information collected from you, subject to statutory exceptions (such as security log retention).</li>
              <li><strong>Right to Correct:</strong> Request correction of inaccurate personal information maintained about you.</li>
              <li><strong>Right to Opt-Out of Sale or Sharing:</strong> Direct a business not to sell or share your personal data. BunusRadar does not sell or share personal data with third parties.</li>
              <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising any of your CCPA/CPRA rights.</li>
            </ul>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 pt-1">
              <strong>Statutory Response Deadlines:</strong> In accordance with California Civil Code § 1798.130, we will confirm receipt of your verifiable consumer request within 10 business days and provide information about how we will process the request. We will substantively respond to your request within <strong>45 calendar days</strong> of receipt. If reasonably necessary, we may extend the response period by an additional 45 days (up to 90 calendar days total), provided we deliver written notice explaining the reason for the extension within the initial 45-day window.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">7. GDPR Data Protection Rights (European Economic Area & UK)</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Under the General Data Protection Regulation (GDPR), users located in the European Economic Area (EEA) and the United Kingdom possess the following statutory rights:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-sm text-zinc-600 dark:text-zinc-400">
              <li><strong>The right to access:</strong> You have the right to request copies of your personal data.</li>
              <li><strong>The right to rectification:</strong> You have the right to request correction of inaccurate or incomplete personal data.</li>
              <li><strong>The right to erasure:</strong> You have the right to request deletion of your personal data under conditions set out in GDPR Article 17.</li>
              <li><strong>The right to restrict processing:</strong> You have the right to request restriction of processing under GDPR Article 18.</li>
              <li><strong>The right to object to processing:</strong> You have the right to object to our processing based on legitimate interests (such as direct marketing or analytics).</li>
              <li><strong>The right to data portability:</strong> You have the right to request transfer of collected data to another organization or directly to you in a structured, commonly used format.</li>
            </ul>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 pt-1">
              Under GDPR Article 12(3), we respond to verifiable requests within <strong>one month</strong> of receipt. That period may be extended by two further months where necessary, taking into account the complexity and number of requests.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">8. Children&apos;s Information</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Protecting children online is an absolute priority. BunusRadar does not knowingly collect any personally identifiable information from children under the age of 13. If you believe your child provided personal information on our website, please contact us immediately and we will promptly remove such records.
            </p>
          </section>

          <section className="space-y-3 border-t border-zinc-200 dark:border-zinc-800 pt-6">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">9. Contact Us Regarding Privacy</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              To exercise your GDPR or CCPA/CPRA rights, or for inquiries regarding our data protection practices, please contact our designated privacy desk:
            </p>
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs space-y-1.5">
              <p><strong>Privacy Inquiries & Data Rights:</strong> privacy@bunusradar.site</p>
              <p><strong>Editorial Newsroom:</strong> editorial@bunusradar.site</p>
              <p><strong>Digital Newsroom:</strong> BunusRadar Media Group (Remote-First Independent Publication)</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
