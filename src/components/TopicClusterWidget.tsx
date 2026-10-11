import Link from 'next/link';
import { TopicCluster } from '@/lib/clusters';
import { Layers, CheckCircle2, ArrowRight } from 'lucide-react';
import { PostMetadata } from '@/lib/posts';

interface TopicClusterWidgetProps {
  cluster: TopicCluster;
  currentSlug: string;
  allPosts: PostMetadata[];
}

export default function TopicClusterWidget({
  cluster,
  currentSlug,
  allPosts,
}: TopicClusterWidgetProps) {
  const postsMap = new Map(allPosts.map((p) => [p.slug, p]));
  const clusterPosts = cluster.articles
    .map((slug) => postsMap.get(slug))
    .filter(Boolean) as PostMetadata[];

  if (clusterPosts.length === 0) return null;

  const currentIndex = cluster.articles.indexOf(currentSlug);

  return (
    <section className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#14234f]/5 via-[#1b2e67]/5 to-[#f9b44d]/10 border border-[#1b2e67]/15 shadow-sm space-y-5 my-8">
      {/* Cluster Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200/80 dark:border-zinc-800">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#1b2e67] text-white">
            <Layers className="w-3.5 h-3.5 text-[#f9b44d]" />
            <span>Topical Authority Cluster</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-zinc-900 tracking-tight pt-1">
            {cluster.name}
          </h3>
          <p className="text-xs text-zinc-600 max-w-xl leading-relaxed">
            {cluster.description}
          </p>
        </div>

        <Link
          href={cluster.pillarUrl}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1b2e67] hover:text-[#f9b44d] hover:underline shrink-0 transition-colors"
        >
          <span>Pillar Hub</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Cluster Articles List */}
      <div className="space-y-2">
        <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
          Articles In This Authority Cluster ({clusterPosts.length} Deep Dives):
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {clusterPosts.map((post, idx) => {
            const isCurrent = post.slug === currentSlug;
            return (
              <div
                key={post.slug}
                className={`p-3 rounded-lg border text-xs transition-all flex items-start gap-2.5 ${
                  isCurrent
                    ? 'bg-white border-[#1b2e67] shadow-sm ring-1 ring-[#1b2e67]/20 font-semibold text-[#1b2e67]'
                    : 'bg-white/70 hover:bg-white border-zinc-200 hover:border-zinc-300 text-zinc-700 hover:text-zinc-900'
                }`}
              >
                <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold shrink-0 mt-0.5 ${
                  isCurrent ? 'bg-[#1b2e67] text-white' : 'bg-zinc-100 text-zinc-500'
                }`}>
                  {idx + 1}
                </span>

                <div className="min-w-0 flex-1 space-y-0.5">
                  {isCurrent ? (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="truncate">{post.title}</span>
                      <span className="text-[10px] uppercase font-bold text-amber-600 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200 shrink-0">
                        Current Guide
                      </span>
                    </div>
                  ) : (
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:underline line-clamp-1 block"
                    >
                      {post.title}
                    </Link>
                  )}
                  <div className="text-[10px] text-zinc-400">
                    {post.readingTime || '5 min read'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
