import { getAllTags } from '@/lib/posts';

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
  const allTags = getAllTags();
  const today = new Date().toISOString().split('T')[0];

  // Only include substantial tags with 2 or more articles
  // Single-article tags are marked noindex, follow to avoid thin content penalties
  const substantialTags = allTags.filter(({ count }) => count >= 2);

  const tagEntries = substantialTags.map(({ tag, count }) => {
    const slug = encodeURIComponent(tag.trim().toLowerCase().replace(/[-\s]+/g, '-'));
    const priority = count >= 5 ? '0.75' : count >= 3 ? '0.65' : '0.55';
    return `  <url>
    <loc>${xmlEscape(`${baseUrl}/tag/${slug}`)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${tagEntries}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600',
    },
  });
}
