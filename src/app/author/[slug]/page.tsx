import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { getAuthorBySlug, getAllAuthors } from '@/lib/authors';
import { getAllPosts } from '@/lib/posts';
import ArticleCard from '@/components/ArticleCard';
import { ChevronRight, Linkedin, Twitter, Github, Globe, Award, BookOpen } from 'lucide-react';

interface AuthorPageProps {
  params: { slug: string };
}

export const dynamicParams = true;
export const revalidate = 3600;

export async function generateStaticParams() {
  const authors = getAllAuthors();
  return authors.map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const author = getAuthorBySlug(params.slug);
  if (!author) return { title: 'Author Not Found' };

  const canonicalUrl = `https://bunusradar.site/author/${author.slug}`;

  return {
    title: `${author.name} — ${author.role} | BunusRadar`,
    description: author.shortBio,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      url: canonicalUrl,
      title: `${author.name} — ${author.role}`,
      description: author.shortBio,
      type: 'profile',
      images: [{ url: author.avatar, width: 400, height: 400, alt: author.name }],
    },
    twitter: {
      card: 'summary',
      title: `${author.name} | BunusRadar`,
      description: author.shortBio,
      images: [author.avatar],
    },
  };
}

export default function AuthorPage({ params }: AuthorPageProps) {
  const author = getAuthorBySlug(params.slug);
  if (!author) notFound();

  const allPosts = getAllPosts();
  const authorPosts = allPosts.filter(
    (post) =>
      post.authorSlug === author.slug ||
      post.author.name === author.name ||
      post.author.name.toLowerCase().replace(/\s+/g, '-') === author.slug
  );

  const baseUrl = 'https://bunusradar.site';
  const authorUrl = `${baseUrl}/author/${author.slug}`;

  // Person JSON-LD schema — the core entity signal for AI systems
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': authorUrl,
    name: author.name,
    url: authorUrl,
    image: {
      '@type': 'ImageObject',
      url: author.avatar,
      width: 400,
      height: 400,
    },
    jobTitle: author.role,
    description: author.shortBio,
    worksFor: {
      '@type': 'Organization',
      name: 'BunusRadar',
      url: baseUrl,
    },
    knowsAbout: author.expertise,
    sameAs: author.sameAs,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Authors', item: `${baseUrl}/about` },
      { '@type': 'ListItem', position: 3, name: author.name, item: authorUrl },
    ],
  };

  return (
    <div className="py-10 md:py-14">
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-zinc-500 mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#1b2e67] font-semibold">Home</Link>
          <ChevronRight className="w-3 h-3 text-zinc-400" />
          <Link href="/about" className="hover:text-[#1b2e67] font-semibold">About</Link>
          <ChevronRight className="w-3 h-3 text-zinc-400" />
          <span className="text-zinc-700">{author.name}</span>
        </nav>

        {/* Author Profile Card */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 md:p-10 shadow-sm mb-10">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Avatar */}
            <div className="shrink-0">
              <img
                src={author.avatar}
                alt={`${author.name} — ${author.role} at BunusRadar`}
                className="w-24 h-24 rounded-full object-cover border-4 border-[#1b2e67]/10 shadow"
              />
            </div>

            {/* Info */}
            <div className="flex-1 space-y-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">{author.name}</h1>
                <p className="text-sm font-semibold text-[#1b2e67] dark:text-blue-400 mt-0.5">{author.role} · BunusRadar</p>
              </div>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed max-w-2xl">{author.shortBio}</p>

              {/* Social Links */}
              <div className="flex items-center gap-3 flex-wrap pt-1">
                {author.social.linkedin && (
                  <a
                    href={author.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors border border-blue-200"
                    aria-label={`${author.name} on LinkedIn`}
                  >
                    <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                  </a>
                )}
                {author.social.twitter && (
                  <a
                    href={author.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition-colors border border-zinc-200"
                    aria-label={`${author.name} on X / Twitter`}
                  >
                    <Twitter className="w-3.5 h-3.5" /> Twitter / X
                  </a>
                )}
                {author.social.github && (
                  <a
                    href={author.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
                    aria-label={`${author.name} on GitHub`}
                  >
                    <Github className="w-3.5 h-3.5" /> GitHub
                  </a>
                )}
                {author.social.website && (
                  <a
                    href={author.social.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors border border-emerald-200"
                    aria-label={`${author.name}'s website`}
                  >
                    <Globe className="w-3.5 h-3.5" /> Website
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Full Bio */}
          <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-3">About {author.name.split(' ')[0]}</h2>
            <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">{author.bio}</p>
          </div>
        </div>

        {/* Expertise & Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Expertise */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-[#1b2e67] text-white flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <h2 className="font-bold text-zinc-900 dark:text-white">Areas of Expertise</h2>
            </div>
            <ul className="space-y-2">
              {author.expertise.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1b2e67] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Credentials */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-[#f9b44d] text-[#1b2e67] flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
              <h2 className="font-bold text-zinc-900 dark:text-white">Credentials</h2>
            </div>
            <ul className="space-y-2">
              {author.credentials.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f9b44d] shrink-0 mt-1.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Author's Articles */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-zinc-900 dark:text-white">
              Articles by {author.name.split(' ')[0]}
              <span className="ml-2 text-sm font-normal text-zinc-400">({authorPosts.length})</span>
            </h2>
          </div>

          {authorPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {authorPosts.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-zinc-400">
              <p className="text-sm">Articles are being published — check back soon.</p>
              <Link href="/" className="mt-4 inline-block text-sm font-semibold text-[#1b2e67] hover:underline">
                Browse all articles →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
