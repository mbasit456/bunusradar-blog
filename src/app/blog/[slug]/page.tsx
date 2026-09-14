import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { getPostBySlug, getAllPosts, getPostsByCategory } from '@/lib/posts';
import CategoryBadge from '@/components/CategoryBadge';
import TableOfContents from '@/components/TableOfContents';
import ShareButtons from '@/components/ShareButtons';
import PostCard from '@/components/PostCard';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
      images: [
        {
          url: post.coverImage || '',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage || ''],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getPostsByCategory(post.category)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <article className="py-8 md:py-12">
      {/* Top Breadcrumb / Back */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to all articles
        </Link>
      </div>

      {/* Header Container */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <CategoryBadge category={post.category} size="md" />
          <span className="text-xs text-zinc-400">•</span>
          <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
            <Calendar className="w-3.5 h-3.5" />
            {post.date}
          </span>
          <span className="text-xs text-zinc-400">•</span>
          <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
            <Clock className="w-3.5 h-3.5" />
            {post.readingTime}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.2]">
          {post.title}
        </h1>

        <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
          {post.excerpt}
        </p>

        {/* Author & Share Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 pb-6 border-y border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-11 h-11 rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
            />
            <div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{post.author.name}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{post.author.role}</p>
            </div>
          </div>

          <ShareButtons title={post.title} />
        </div>
      </header>

      {/* Hero Cover Image */}
      {post.coverImage && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-800 shadow-md">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Main Content Layout with Sticky Sidebar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Article Body */}
          <div className="lg:col-span-8">
            <div
              className="prose prose-zinc dark:prose-invert lg:prose-lg max-w-none prose-headings:scroll-mt-24 prose-img:rounded-2xl"
              dangerouslySetInnerHTML={{ __html: post.htmlContent }}
            />

            {/* Post Tags */}
            {post.tags.length > 0 && (
              <div className="mt-12 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-zinc-400 flex items-center gap-1 mr-1">
                    <Tag className="w-3.5 h-3.5" /> Tags:
                  </span>
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tag/${encodeURIComponent(tag)}`}
                      className="px-3 py-1 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Share Bar */}
            <div className="mt-8 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                Did you find this insightful?
              </span>
              <ShareButtons title={post.title} />
            </div>
          </div>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-6">
              <TableOfContents toc={post.toc} />

              {/* Author Bio Box */}
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  About the Author
                </h3>
                <div className="flex items-center gap-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      {post.author.name}
                    </h4>
                    <p className="text-xs text-zinc-500">{post.author.role}</p>
                  </div>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Curating ideas, software architecture frameworks, and automated methodologies.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-12 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Related Articles in {post.category.toUpperCase()}
            </h3>
            <Link
              href={`/category/${post.category}`}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((related) => (
              <PostCard key={related.slug} post={related} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
