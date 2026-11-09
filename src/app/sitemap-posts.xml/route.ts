import { getAllPosts } from '@/lib/posts';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function xmlEscape(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const baseUrl = 'https://bunusradar.site';
  const posts = getAllPosts(true);
  const today = new Date().toISOString().split('T')[0];

  const xmlEntries = posts.map((post) => {
    const postUrl = `${baseUrl}/blog/${post.slug}`;
    const d = new Date(post.rawDate || post.date);
    const lastmod = !isNaN(d.getTime()) ? d.toISOString().split('T')[0] : today;

    const rawCover = post.coverImage || '';
    const fullCoverImageUrl = rawCover
      ? (rawCover.startsWith('http') ? rawCover : `${baseUrl}${rawCover.startsWith('/') ? rawCover : `/${rawCover}`}`)
      : null;

    const imageXml = fullCoverImageUrl
      ? `\n    <image:image>
      <image:loc>${xmlEscape(fullCoverImageUrl)}</image:loc>
      <image:title>${xmlEscape(post.title)}</image:title>
    </image:image>`
      : '';

    return `  <url>
    <loc>${postUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>${imageXml}
  </url>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${xmlEntries}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600',
    },
  });
}
