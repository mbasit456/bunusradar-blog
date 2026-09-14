import Link from 'next/link';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import CategoryBadge from './CategoryBadge';
import { PostMetadata } from '@/lib/posts';

interface PostCardProps {
  post: PostMetadata;
  featured?: boolean;
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  if (featured) {
    return (
      <article className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300">
        <div className="lg:col-span-7 relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800">
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-4 left-4">
            <CategoryBadge category={post.category} size="md" />
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-between h-full py-2">
          <div>
            <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400 mb-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime}
              </span>
            </div>

            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                {post.title}
              </h2>
            </Link>

            <p className="mt-4 text-zinc-600 dark:text-zinc-300 text-sm md:text-base line-clamp-3">
              {post.excerpt}
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{post.author.name}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{post.author.role}</p>
              </div>
            </div>

            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:gap-2.5 transition-all"
            >
              Read Article <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <img
          src={post.coverImage}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <CategoryBadge category={post.category} size="sm" />
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 md:p-6 justify-between">
        <div>
          <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 mb-2.5">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readingTime}
            </span>
          </div>

          <Link href={`/blog/${post.slug}`}>
            <h3 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
              {post.title}
            </h3>
          </Link>

          <p className="mt-2.5 text-zinc-600 dark:text-zinc-400 text-sm line-clamp-2">
            {post.excerpt}
          </p>
        </div>

        <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-7 h-7 rounded-full object-cover"
            />
            <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{post.author.name}</span>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:underline"
          >
            Read <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
