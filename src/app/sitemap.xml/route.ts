import { getAllPosts } from '@/lib/posts';
import { CATEGORIES } from '@/lib/categories';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export async function GET() {
  const baseUrl = 'https://bunusradar.site';
  const posts = getAllPosts();
  const nowIso = new Date().toISOString();

  // Static Pages
  const staticPages = [
    { url: `${baseUrl}`, changefreq: 'daily', priority: '1.0', lastmod: nowIso },
    { url: `${baseUrl}/latest-publications`, changefreq: 'daily', priority: '0.9', lastmod: nowIso },
    { url: `${baseUrl}/about`, changefreq: 'monthly', priority: '0.8', lastmod: '2026-09-22T00:00:00+00:00' },
    { url: `${baseUrl}/editorial-standards`, changefreq: 'monthly', priority: '0.8', lastmod: '2026-09-23T00:00:00+00:00' },
    { url: `${baseUrl}/privacy-terms`, changefreq: 'monthly', priority: '0.7', lastmod: '2026-09-23T00:00:00+00:00' },
  ];

  // Category Pages
  const categoryPages = Object.values(CATEGORIES).map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    changefreq: 'daily',
    priority: '0.8',
    lastmod: nowIso,
  }));

  // Article Pages
  const articlePages = posts.map((post) => {
    const postDate = new Date(post.rawDate || post.date);
    const lastmod = isNaN(postDate.getTime()) ? nowIso : postDate.toISOString();
    return {
      url: `${baseUrl}/blog/${post.slug}`,
      changefreq: 'weekly',
      priority: '0.8',
      lastmod,
    };
  });

  const allUrls = [...staticPages, ...categoryPages, ...articlePages];

  const xmlEntries = allUrls
    .map(
      (item) => `  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
    )
    .join('\n');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${xmlEntries}
</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
