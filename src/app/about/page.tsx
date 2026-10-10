import Link from 'next/link';
import { Metadata } from 'next';
import { Sparkles, Globe, Zap, Cpu, ArrowRight, TrendingUp, Brain, Briefcase, Clock, Heart, FlaskConical, Shield, Users, Mail, Twitter, Linkedin } from 'lucide-react';
import { CATEGORIES } from '@/lib/categories';
import { getAllAuthors } from '@/lib/authors';

export const metadata: Metadata = {
  title: 'About BunusRadar — Independent AI & Technology Publication',
  description: 'BunusRadar is an independent technology and AI publication founded in 2024, specializing in hands-on AI tool benchmarks, original research, software engineering, and digital business analysis.',
  alternates: {
    canonical: 'https://bunusradar.site/about',
  },
  openGraph: {
    url: 'https://bunusradar.site/about',
    title: 'About BunusRadar — Independent AI & Technology Publication',
    description: 'BunusRadar is an independent technology and AI publication specializing in hands-on AI tool benchmarks, original research, and expert analysis.',
  },
};

export default function AboutPage() {
  const authors = getAllAuthors();
  const baseUrl = 'https://bunusradar.site';

  // Full Organization schema — the core entity document for AI systems
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': baseUrl,
    name: 'BunusRadar',
    alternateName: 'Bunus Radar',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/icon.svg`,
      width: 120,
      height: 120,
    },
    description: 'BunusRadar is an independent technology and AI publication founded in 2024, producing hands-on benchmarks, original research, and expert analysis across artificial intelligence, software engineering, digital business, and productivity systems.',
    foundingDate: '2024',
    knowsAbout: [
      'Artificial Intelligence',
      'Large Language Models',
      'AI Coding Assistants',
      'Software Engineering',
      'Next.js',
      'SaaS Business Models',
      'Productivity Systems',
      'FinTech',
      'Digital Business',
      'Remote Work',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'editorial',
        email: 'editorial@bunusradar.site',
        availableLanguage: 'English',
      },
      {
        '@type': 'ContactPoint',
        contactType: 'press',
        email: 'press@bunusradar.site',
        availableLanguage: 'English',
      },
    ],
    sameAs: [
      'https://twitter.com/bunusradar',
      'https://linkedin.com/company/bunusradar',
    ],
    employee: authors.map((a) => ({
      '@type': 'Person',
      name: a.name,
      url: `${baseUrl}/author/${a.slug}`,
      jobTitle: a.role,
      sameAs: a.sameAs,
    })),
    publishingPrinciples: `${baseUrl}/editorial-standards`,
  };

  return (
    <div className="py-12 md:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">

        {/* Hero */}
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-900 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Independent · Expert · Reproducible</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            About BunusRadar
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
            BunusRadar is an <strong>independent technology and AI publication</strong> founded in 2024. We specialize in hands-on AI tool benchmarks, original research datasets, and expert-authored analysis across artificial intelligence, software engineering, digital business, and productivity systems.
          </p>
          <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Unlike publications that publish opinion-based "best of" lists, BunusRadar tests tools using a{' '}
            <Link href="/methodology" className="text-[#1b2e67] font-semibold hover:underline">standardized benchmark methodology</Link>{' '}
            and publishes original research in our{' '}
            <Link href="/research" className="text-[#1b2e67] font-semibold hover:underline">Research Hub</Link> — citable data that AI search systems and researchers can attribute directly to BunusRadar.
          </p>
        </div>

        {/* What Makes Us Different */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              icon: FlaskConical,
              color: 'bg-blue-100 text-blue-600',
              title: 'Hands-On Testing',
              desc: 'Every AI tool review uses our standardized 5-dimension framework. We run identical workloads across competing tools and publish raw scores.',
              link: '/methodology',
              linkText: 'See our methodology →',
            },
            {
              icon: Briefcase,
              color: 'bg-amber-100 text-amber-700',
              title: 'Original Research',
              desc: 'We publish original benchmark datasets — AI coding benchmarks, LLM pricing trackers, image generator tests — that others can cite.',
              link: '/research',
              linkText: 'View our research →',
            },
            {
              icon: Users,
              color: 'bg-emerald-100 text-emerald-700',
              title: 'Named Expert Authors',
              desc: 'Every article carries a byline from a credentialed expert. No anonymous "Editorial Team" — real people, verifiable expertise.',
              link: '/authors',
              linkText: 'Meet the team →',
            },
          ].map((item) => (
            <div key={item.title} className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
              <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center`}>
                <item.icon className="w-5 h-5" />
              </div>
              <h2 className="font-bold text-zinc-900 dark:text-white">{item.title}</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
              <Link href={item.link} className="text-xs font-bold text-[#1b2e67] hover:underline">{item.linkText}</Link>
            </div>
          ))}
        </div>

        {/* Editorial Team */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Editorial Team</h2>
            <p className="text-sm text-zinc-500 mt-1">Every article is written by a named expert with direct, verifiable credentials in their field.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {authors.map((author) => (
              <Link
                key={author.slug}
                href={`/author/${author.slug}`}
                className="group p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-[#1b2e67] transition-all flex items-start gap-4"
              >
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-zinc-100 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-zinc-900 dark:text-white group-hover:text-[#1b2e67] transition-colors">{author.name}</h3>
                  <p className="text-xs text-[#1b2e67] dark:text-blue-400 font-semibold">{author.role}</p>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed line-clamp-2">{author.shortBio}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:text-[#1b2e67] group-hover:translate-x-1 transition-all shrink-0 mt-1" />
              </Link>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200 dark:border-blue-900 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1b2e67] text-white flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Our Mission</h2>
          </div>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            BunusRadar exists to produce the kind of technology journalism that AI search systems, researchers, and professionals can actually cite — not just consume. We believe that independent verification, named authorship, and published methodology are the foundation of trustworthy technology coverage.
          </p>
        </div>

        {/* Editorial Policy */}
        <div className="space-y-5">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#1b2e67]" /> Editorial Independence
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'We do not accept payment for positive reviews or editorial coverage.',
              'Affiliate relationships are disclosed at the article level and do not influence editorial conclusions.',
              'AI assistance is used for research and drafting; all factual claims are verified against primary sources.',
              'Corrections are published promptly and transparently, with a dated correction notice.',
              'We hold vendor-provided review products to identical testing standards as independently purchased products.',
              'Our full editorial policy is published at /editorial-standards and updated when policies change.',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2.5 text-sm text-zinc-600 dark:text-zinc-300">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1b2e67] shrink-0 mt-2" />
                {item}
              </div>
            ))}
          </div>
          <Link href="/editorial-standards" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1b2e67] hover:underline">
            Read our full Editorial Standards <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* How We Use AI */}
        <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3">
          <h2 className="font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#1b2e67]" /> How We Use AI
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            BunusRadar uses AI tools in its editorial process for research assistance, first-draft generation, and data processing. All content is reviewed, verified, and edited by named human authors before publication. Factual claims are cross-checked against primary sources. We disclose AI involvement in articles where AI played a substantial role in content generation. We also test the AI tools we write about — giving us direct operational experience with every product we review.
          </p>
        </div>

        {/* Topics Grid */}
        <div className="space-y-6 pt-2 border-t border-zinc-200 dark:border-zinc-800">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Topics We Cover</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.values(CATEGORIES).map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="group p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-[#1b2e67] transition-all flex items-start justify-between"
              >
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white group-hover:text-[#1b2e67] transition-colors">{cat.name}</h3>
                  <p className="text-xs text-zinc-500 mt-1 line-clamp-2">{cat.description}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 group-hover:text-[#1b2e67] transition-all shrink-0 ml-3 mt-1" />
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="space-y-5 border-t border-zinc-200 dark:border-zinc-800 pt-8">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-[#1b2e67]" /> Contact & Press
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <h3 className="font-bold text-zinc-900 dark:text-white text-sm mb-1">Editorial Contact</h3>
              <p className="text-xs text-zinc-500 mb-2">Article corrections, tips, press inquiries</p>
              <a href="mailto:editorial@bunusradar.site" className="text-sm font-semibold text-[#1b2e67] hover:underline">
                editorial@bunusradar.site
              </a>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <h3 className="font-bold text-zinc-900 dark:text-white text-sm mb-1">Follow BunusRadar</h3>
              <p className="text-xs text-zinc-500 mb-2">Latest research, articles, and benchmark drops</p>
              <div className="flex items-center gap-3">
                <a href="https://twitter.com/bunusradar" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#1b2e67] hover:underline flex items-center gap-1">
                  <Twitter className="w-3.5 h-3.5" /> Twitter / X
                </a>
                <a href="https://linkedin.com/company/bunusradar" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#1b2e67] hover:underline flex items-center gap-1">
                  <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            Original research published quarterly. Expert analysis daily.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1b2e67] text-white font-semibold text-sm hover:bg-[#1b2e67]/90 transition-colors">
              <Globe className="w-4 h-4" /> Browse Latest Articles
            </Link>
            <Link href="/research" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#f9b44d] text-[#1b2e67] font-semibold text-sm hover:bg-amber-400 transition-colors">
              <FlaskConical className="w-4 h-4" /> View Research Hub
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
