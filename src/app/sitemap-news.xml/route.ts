import { getAllPosts } from '@/lib/posts';

export const dynamic = 'force-static';
export const revalidate = 86400;

export async function GET() {
  const baseUrl = 'https://bunusradar.site';
  const posts = getAllPosts();
  const now = Date.now();
  const FORTY_EIGHT_HOURS = 48 * 60 * 60 * 1000;

  // Google News requirement: Articles published in the last 48 hours
  let qualifyingPosts = posts.filter((post) => {
    const postTime = new Date(post.rawDate || post.date).getTime();
    return !isNaN(postTime) && (now - postTime) <= FORTY_EIGHT_HOURS && postTime <= now;
  });

  // Safe fallback: If no articles in exact 48h window, include latest 2 articles to ensure valid XML
  if (qualifyingPosts.length === 0 && posts.length > 0) {
    qualifyingPosts = posts.slice(0, 2);
  }

  const xmlEntries = qualifyingPosts
    .map((post) => {
      const pubDate = new Date(post.rawDate || post.date).toISOString();
      const escapedTitle = post.title
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');

      return `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>BunusRadar</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${escapedTitle}</news:title>
    </news:news>
  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${xmlEntries}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=60, s-maxage=60, stale-while-revalidate=300',
    },
  });
}
