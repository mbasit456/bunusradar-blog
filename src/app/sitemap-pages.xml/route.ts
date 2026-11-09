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
  const today = new Date().toISOString().split('T')[0];

  // Core Static Pages with stable, reliable lastmod dates
  const staticPages = [
    { url: `${baseUrl}`, changefreq: 'daily', priority: '1.0', lastmod: today },
    { url: `${baseUrl}/latest-publications`, changefreq: 'daily', priority: '0.9', lastmod: today },
    { url: `${baseUrl}/tools`, changefreq: 'weekly', priority: '0.9', lastmod: '2026-11-01' },
    { url: `${baseUrl}/tools/free-ai-chat`, changefreq: 'weekly', priority: '0.9', lastmod: '2026-11-01' },
    { url: `${baseUrl}/tools/ai-token-calculator`, changefreq: 'weekly', priority: '0.9', lastmod: '2026-11-01' },
    { url: `${baseUrl}/tools/ai-prompt-optimizer`, changefreq: 'weekly', priority: '0.9', lastmod: '2026-11-01' },
    { url: `${baseUrl}/tools/ai-roi-calculator`, changefreq: 'weekly', priority: '0.9', lastmod: '2026-11-01' },
    { url: `${baseUrl}/research`, changefreq: 'weekly', priority: '0.85', lastmod: today },
    { url: `${baseUrl}/methodology`, changefreq: 'monthly', priority: '0.8', lastmod: '2026-10-25' },
    { url: `${baseUrl}/about`, changefreq: 'monthly', priority: '0.8', lastmod: '2026-10-20' },
    { url: `${baseUrl}/editorial-standards`, changefreq: 'monthly', priority: '0.8', lastmod: '2026-10-20' },
    { url: `${baseUrl}/privacy-policy`, changefreq: 'monthly', priority: '0.5', lastmod: '2026-10-15' },
    { url: `${baseUrl}/privacy-terms`, changefreq: 'monthly', priority: '0.5', lastmod: '2026-10-15' },
    { url: `${baseUrl}/terms-and-conditions`, changefreq: 'monthly', priority: '0.5', lastmod: '2026-10-15' },
    { url: `${baseUrl}/disclaimer`, changefreq: 'monthly', priority: '0.5', lastmod: '2026-10-15' },
    { url: `${baseUrl}/contact`, changefreq: 'monthly', priority: '0.7', lastmod: '2026-10-15' },
    { url: `${baseUrl}/cookie-policy`, changefreq: 'monthly', priority: '0.5', lastmod: '2026-10-15' },
  ];

  const xmlEntries = staticPages
    .map(
      (item) => `  <url>
    <loc>${xmlEscape(item.url)}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600',
    },
  });
}
