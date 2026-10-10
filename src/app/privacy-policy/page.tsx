import Link from 'next/link';
import { Metadata } from 'next';
import { Shield, Lock, Eye, CheckCircle2, Server, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | BunusRadar',
  description: 'BunusRadar Privacy Policy outlining our compliance with Google AdSense, GDPR, CCPA, cookie tracking, and data protection practices.',
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
            At <strong>BunusRadar</strong>, accessible from <a href="https://bunusradar.site" className="text-[#1b2e67] dark:text-[#f9b44d] font-semibold underline">https://bunusradar.site</a>, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by BunusRadar and how we use it.
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Last Updated: October 10, 2026 • Effective Date: January 1, 2024
          </p>
        </div>

        {/* Core Commitments */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
            <Shield className="w-5 h-5 text-emerald-600" />
            <h2 className="font-bold text-sm text-zinc-900 dark:text-white">Zero Data Selling</h2>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              We never sell, rent, or trade your personal information or email addresses to data brokers or third parties.
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
              Complete support for European and Californian data access, rectification, and erasure requests.
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
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">2. Information We Collect</h2>
            <p className="text-sm">
              The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-sm text-zinc-600 dark:text-zinc-400">
              <li><strong>Direct Communications:</strong> If you contact us directly (via our contact forms or editorial desk), we may receive additional information about you such as your name, email address, phone number, and the contents of your message.</li>
              <li><strong>Newsletter Subscriptions:</strong> If you subscribe to our weekly technology digests, we collect your email address solely to deliver requested dispatches. You may unsubscribe at any time via the one-click unsubscribe link in every email.</li>
              <li><strong>Log Files:</strong> BunusRadar follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and number of clicks. These are not linked to any personally identifiable information.</li>
            </ul>
          </section>

          {/* AdSense Mandatory Disclosure Section */}
          <section className="space-y-3 p-6 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Server className="w-5 h-5 text-[#1b2e67]" />
              3. Google AdSense & DoubleClick DART Cookies
            </h2>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              Google is one of our third-party vendors. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to <code className="text-xs bg-white dark:bg-zinc-800 px-1.5 py-0.5 rounded border border-blue-200">bunusradar.site</code> and other sites on the internet.
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
              <li>Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to your website or other websites.</li>
              <li>Google&apos;s use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</li>
              <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-[#1b2e67] dark:text-[#f9b44d] font-semibold underline">Google Ads Settings</a>.</li>
              <li>Alternatively, you can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-[#1b2e67] dark:text-[#f9b44d] font-semibold underline">aboutads.info</a>.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">4. Cookies and Web Beacons</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Like any other website, BunusRadar uses &quot;cookies&quot;. These cookies are used to store information including visitors&apos; preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users&apos; experience by customizing our web page content based on visitors&apos; browser type and/or other information.
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              For more comprehensive details on how we utilize cookies, please inspect our dedicated <Link href="/cookie-policy" className="text-[#1b2e67] dark:text-[#f9b44d] underline font-semibold">Cookie Policy</Link>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">5. Third-Party Privacy Policies</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              BunusRadar&apos;s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers&apos; respective websites.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">6. CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Under the California Consumer Privacy Act (CCPA), California consumers have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
              <li>Request that a business disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
              <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
              <li>Request that a business that sells a consumer&apos;s personal data, not sell the consumer&apos;s personal data. (Note: BunusRadar never sells personal data).</li>
            </ul>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">7. GDPR Data Protection Rights</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              We would like to make sure you are fully aware of all of your data protection rights under the General Data Protection Regulation (GDPR). Every user is entitled to the following:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
              <li><strong>The right to access:</strong> You have the right to request copies of your personal data.</li>
              <li><strong>The right to rectification:</strong> You have the right to request that we correct any information you believe is inaccurate.</li>
              <li><strong>The right to erasure:</strong> You have the right to request that we erase your personal data, under certain conditions.</li>
              <li><strong>The right to restrict processing:</strong> You have the right to request that we restrict the processing of your personal data.</li>
              <li><strong>The right to object to processing:</strong> You have the right to object to our processing of your personal data.</li>
              <li><strong>The right to data portability:</strong> You have the right to request that we transfer the data that we have collected to another organization, or directly to you.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">8. Children&apos;s Information</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. BunusRadar does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
            </p>
          </section>

          <section className="space-y-3 border-t border-zinc-200 dark:border-zinc-800 pt-6">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">9. Contact Us Regarding Privacy</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact our Data Protection Officer:
            </p>
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs space-y-1">
              <p><strong>Email:</strong> privacy@bunusradar.site</p>
              <p><strong>Editorial Desk:</strong> editorial@bunusradar.site</p>
              <p><strong>Mailing Address:</strong> BunusRadar Editorial Desk, 100 Tech Media Plaza, Las Vegas, NV 89101</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
