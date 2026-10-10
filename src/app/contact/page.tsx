import Link from 'next/link';
import { Metadata } from 'next';
import { Mail, MessageSquare, MapPin, Clock, ShieldCheck, Send } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | BunusRadar Editorial Desk',
  description: 'Get in touch with the BunusRadar editorial team, submit review tips, report corrections, or reach our press and advertising desk.',
  alternates: {
    canonical: 'https://bunusradar.site/contact',
  },
  openGraph: {
    url: 'https://bunusradar.site/contact',
    title: 'Contact Us | BunusRadar Editorial Desk',
    description: 'Direct contact channels for BunusRadar editors, technical researchers, and press inquiries.',
  },
};

export default function ContactPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-900 shadow-sm">
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Editorial Access</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Contact Us
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Have a technical correction, a news tip regarding emerging AI tools, or a press inquiry? We welcome direct communication from researchers, developers, readers, and partners.
          </p>
        </div>

        {/* Contact Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
            <Mail className="w-6 h-6 text-[#1b2e67] dark:text-[#f9b44d]" />
            <h2 className="font-bold text-base text-zinc-900 dark:text-white">Editorial Inquiries</h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              For news tips, review pitches, methodology questions, and corrections:
            </p>
            <a href="mailto:editorial@bunusradar.site" className="text-xs font-bold text-[#1b2e67] dark:text-[#f9b44d] hover:underline block pt-2">
              editorial@bunusradar.site
            </a>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
            <MessageSquare className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <h2 className="font-bold text-base text-zinc-900 dark:text-white">Press & Partnerships</h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              For media interviews, benchmark citations, and syndicate requests:
            </p>
            <a href="mailto:press@bunusradar.site" className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline block pt-2">
              press@bunusradar.site
            </a>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-2">
            <ShieldCheck className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h2 className="font-bold text-base text-zinc-900 dark:text-white">Privacy & Legal</h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              For GDPR/CCPA data requests, DMCA notifications, and compliance:
            </p>
            <a href="mailto:privacy@bunusradar.site" className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline block pt-2">
              privacy@bunusradar.site
            </a>
          </div>
        </div>

        {/* Operating Hours & Physical Address */}
        <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4">
          <h2 className="font-bold text-base text-zinc-900 dark:text-white">Publication Headquarters & Operating Hours</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-600 dark:text-zinc-400">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
              <div>
                <strong>Mailing Office:</strong>
                <p>BunusRadar Media Group</p>
                <p>100 Tech Media Plaza, Suite 400</p>
                <p>Las Vegas, NV 89101, United States</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
              <div>
                <strong>Desk Hours:</strong>
                <p>Monday - Friday: 9:00 AM - 6:00 PM PST</p>
                <p>Typical editorial response time: Within 24-48 business hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Corrections Policy Fast Link */}
        <div className="p-6 rounded-2xl border border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white">Spotted an error in an article?</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
              We maintain a transparent corrections register. Include the article URL and evidence in your email.
            </p>
          </div>
          <Link
            href="/editorial-standards"
            className="px-4 py-2 text-xs font-bold bg-[#1b2e67] text-[#f9b44d] hover:bg-[#14234f] rounded-lg transition-colors shrink-0"
          >
            Review Correction Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
