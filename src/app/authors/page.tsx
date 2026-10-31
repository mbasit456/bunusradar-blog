import SafeImage from '@/components/SafeImage';
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllAuthors } from '@/lib/authors';
import { Linkedin, Twitter, Github, Globe, ArrowRight, Award, GraduationCap, Briefcase } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Authors & Domain Experts | BunusRadar',
  description: 'Meet the verified domain experts and technical researchers behind BunusRadar - specializing in LLMs, distributed systems, web engineering, and enterprise AI economics.',
  alternates: {
    canonical: 'https://bunusradar.site/authors',
  },
  openGraph: {
    url: 'https://bunusradar.site/authors',
    title: 'Meet Our Verified Domain Experts | BunusRadar',
    description: 'The specialized researchers and engineering contributors who power BunusRadar\'s empirical technology journalism.',
  },
};

export default function AuthorsPage() {
  const authors = getAllAuthors();
  const baseUrl = 'https://bunusradar.site';

  const teamSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'BunusRadar Verified Domain Experts',
    description: 'The specialized researchers and engineers authoring BunusRadar publications.',
    itemListElement: authors.map((author, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Person',
        name: author.name,
        url: `${baseUrl}/author/${author.slug}`,
        jobTitle: author.role,
        worksFor: { '@type': 'Organization', name: 'BunusRadar', url: baseUrl },
        sameAs: author.sameAs,
      },
    })),
  };

  return (
    <div className="py-12 md:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(teamSchema) }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            Verified Domain Experts
          </div>
          <h1 className="text-4xl font-black text-zinc-900 dark:text-white">Meet Our Authors</h1>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto text-sm leading-relaxed">
            Every analysis, benchmark, and guide on BunusRadar is authored by a named specialist with verifiable engineering credentials, published research, and strict adherence to our empirical testing methodology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {authors.map((author) => (
            <div
              key={author.slug}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm hover:border-[#1b2e67] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start gap-4">
                  <SafeImage
                    src={author.avatar}
                    alt={author.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-zinc-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h2 className="font-black text-zinc-900 dark:text-white text-lg">{author.name}</h2>
                    <p className="text-xs font-semibold text-[#1b2e67] dark:text-blue-400">{author.role}</p>
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1.5 leading-relaxed">
                      {author.shortBio}
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      {author.social.linkedin && (
                        <a href={author.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-zinc-400 hover:text-blue-600 transition-colors">
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                      {author.social.twitter && (
                        <a href={author.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-zinc-400 hover:text-zinc-800 transition-colors">
                          <Twitter className="w-4 h-4" />
                        </a>
                      )}
                      {author.social.github && (
                        <a href={author.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-zinc-400 hover:text-zinc-800 transition-colors">
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {author.social.website && (
                        <a href={author.social.website} target="_blank" rel="noopener noreferrer" aria-label="Website" className="text-zinc-400 hover:text-emerald-600 transition-colors">
                          <Globe className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Verifiable Credentials & Background Snippet */}
                <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                  <div className="flex items-start gap-2">
                    <GraduationCap className="w-3.5 h-3.5 text-[#1b2e67] dark:text-blue-400 shrink-0 mt-0.5" />
                    <span><strong className="text-zinc-700 dark:text-zinc-300">Education:</strong> {author.education}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong className="text-zinc-700 dark:text-zinc-300">Background:</strong> {author.pastExperience}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-zinc-400">Verified Expert Profile</span>
                <Link
                  href={`/author/${author.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#1b2e67] dark:text-blue-400 hover:underline group-hover:gap-2 transition-all"
                >
                  View full credentials & articles <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
