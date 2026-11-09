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
  const tags = getAllTags();
  const today = new Date().toISOString().split('T')[0];

  const tagEntries = tags.map(({ tag, count }) => {
    const slug = encodeURIComponent(tag.trim().toLowerCase());
    const priority = count >= 3 ? '0.7' : count >= 2 ? '0.6' : '0.5';
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
