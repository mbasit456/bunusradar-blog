import Link from 'next/link';
import { PostMetadata } from '@/lib/posts';
import { getCategoryBySlug } from '@/lib/categories';
import { getOptimizedImageUrl, getResponsiveSrcSet } from '@/lib/images';

interface ArticleCardProps {
  post: PostMetadata;
}

export default function ArticleCard({ post }: ArticleCardProps) {
  const catMeta = getCategoryBySlug(post.category);

  return (
    <article className="bg-white border border-zinc-200/80 rounded overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full group">
      {/* Thumbnail */}
      <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/9] w-full overflow-hidden bg-zinc-100">
        <img
          src={getOptimizedImageUrl(post.coverImage, 480)}
          srcSet={getResponsiveSrcSet(post.coverImage, [320, 480, 640]) || undefined}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          alt={post.title}
          width={480}
          height={270}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between space-y-3">
        <div>
          <div className="mb-1.5">
            <Link
              href={`/category/${catMeta.slug}`}
              className="text-[11px] font-bold uppercase tracking-wider text-[#1b2e67] hover:text-[#f9b44d] transition-colors"
            >
              {catMeta.name}
            </Link>
          </div>

          <Link href={`/blog/${post.slug}`}>
            <h3 className="text-base sm:text-lg font-bold leading-snug text-zinc-900 group-hover:text-[#1b2e67] transition-colors line-clamp-2">
              {post.title}
            </h3>
          </Link>

          <p className="mt-2 text-xs text-zinc-600 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-600">
          <span className="font-semibold text-zinc-700">By {post.author.name}</span>
          <span data-nosnippet="true">{post.date}</span>
        </div>
      </div>
    </article>
  );
}
