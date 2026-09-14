import Link from 'next/link';
import { PostMetadata } from '@/lib/posts';

interface MagazineHeroProps {
  posts: PostMetadata[];
}

export default function MagazineHero({ posts }: MagazineHeroProps) {
  if (!posts || posts.length === 0) return null;

  const mainPost = posts[0];
  const subPosts = posts.slice(1, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Main Large Hero Post (7 Cols) */}
        {mainPost && (
          <div className="lg:col-span-7">
            <Link
              href={`/blog/${mainPost.slug}`}
              className="group relative block aspect-[16/11] sm:aspect-[16/10] w-full overflow-hidden rounded bg-zinc-900 shadow-md transition-all duration-300 hover:shadow-xl"
            >
              <img
                src={mainPost.coverImage}
                alt={mainPost.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 space-y-2.5 text-white">
                <span className="inline-block px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-[#1b2e67] text-[#f9b44d] border border-white/20 rounded">
                  {mainPost.category}
                </span>

                <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight text-white group-hover:text-[#f9b44d] transition-colors line-clamp-3">
                  {mainPost.title}
                </h1>

                <div className="flex items-center gap-3 text-xs text-zinc-300 pt-1">
                  <span>BY <strong className="text-white uppercase font-bold">{mainPost.author.name}</strong></span>
                  <span>•</span>
                  <span>{mainPost.date}</span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* 2x2 Sub-Grid (5 Cols) */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {subPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group relative block aspect-[16/10] w-full overflow-hidden rounded bg-zinc-900 shadow-sm transition-all duration-300 hover:shadow-lg"
            >
              <img
                src={post.coverImage}
                alt={post.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-4 space-y-1 text-white">
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#f9b44d]">
                  {post.category}
                </span>

                <h2 className="text-sm font-bold leading-snug text-white group-hover:text-[#f9b44d] transition-colors line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-[11px] text-zinc-400">
                  {post.date}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
