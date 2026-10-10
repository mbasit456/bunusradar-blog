import { Metadata } from 'next';
import Link from 'next/link';
import { getAllAuthors } from '@/lib/authors';
import { Linkedin, Twitter, Github, Globe, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Authors & Editorial Team | BunusRadar',
  description: 'Meet the experts behind BunusRadar — AI researchers, engineers, analysts, and productivity specialists who produce our daily technology journalism.',
  alternates: {
    canonical: 'https://bunusradar.site/authors',
  },
  openGraph: {
    url: 'https://bunusradar.site/authors',
    title: 'Meet the BunusRadar Editorial Team',
    description: 'The expert authors and researchers who power BunusRadar\'s technology journalism.',
  },
};

export default function AuthorsPage() {
  const authors = getAllAuthors();
  const baseUrl = 'https://bunusradar.site';

  const teamSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'BunusRadar Editorial Team',
    description: 'The expert authors and researchers behind BunusRadar.',
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
            Editorial Team
          </div>
          <h1 className="text-4xl font-black text-zinc-900 dark:text-white">Meet Our Authors</h1>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto text-sm leading-relaxed">
            Every article on BunusRadar is written by a named expert with verifiable credentials and direct, hands-on experience in their field.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {authors.map((author) => (
            <div
              key={author.slug}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm hover:border-[#1b2e67] transition-colors group"
            >
              <div className="flex items-start gap-4">
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-zinc-100 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h2 className="font-black text-zinc-900 dark:text-white text-lg">{author.name}</h2>
                  <p className="text-xs font-semibold text-[#1b2e67] dark:text-blue-400">{author.role}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed line-clamp-2">
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
              <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <Link
                  href={`/author/${author.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#1b2e67] hover:underline group-hover:gap-2 transition-all"
                >
                  View profile & articles <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
