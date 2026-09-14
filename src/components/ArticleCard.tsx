import Link from 'next/link';
import { PostMetadata } from '@/lib/posts';

interface ArticleCardProps {
  post: PostMetadata;
}

export default function ArticleCard({ post }: ArticleCardProps) {
  return (
    <article className="bg-white border border-zinc-200/80 rounded overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full group">
      {/* Thumbnail */}
      <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/9] w-full overflow-hidden bg-zinc-100">
        <img
          src={post.coverImage}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </Link>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between space-y-3">
        <div>
          <div className="mb-1.5">
            <Link
              href={`/category/${post.category}`}
              className="text-[11px] font-bold uppercase tracking-wider text-[#1b2e67] hover:text-[#f9b44d] transition-colors"
            >
              {post.category}
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

        <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500">
          <span className="font-semibold text-zinc-700">By {post.author.name}</span>
          <span>{post.date}</span>
        </div>
      </div>
    </article>
  );
}
