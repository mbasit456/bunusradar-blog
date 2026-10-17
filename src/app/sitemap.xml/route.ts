import { getAllPosts, getAllTags } from '@/lib/posts';
import { CATEGORIES } from '@/lib/categories';
import { getAllAuthors } from '@/lib/authors';

export const dynamic = 'force-static';
export const revalidate = 86400;

export async function GET() {
  const baseUrl = 'https://bunusradar.site';
  const posts = getAllPosts();
  const authors = getAllAuthors();
  const tags = getAllTags();
  const nowIso = new Date().toISOString();

  // Static Pages (no lastmod to prevent Google from showing snippet dates on evergreen pages)
  const staticPages = [
    { url: `${baseUrl}`, changefreq: 'daily', priority: '1.0' },
    { url: `${baseUrl}/latest-publications`, changefreq: 'daily', priority: '0.9' },
    { url: `${baseUrl}/research`, changefreq: 'monthly', priority: '0.9' },
    { url: `${baseUrl}/methodology`, changefreq: 'monthly', priority: '0.9' },
    { url: `${baseUrl}/authors`, changefreq: 'monthly', priority: '0.8' },
    { url: `${baseUrl}/about`, changefreq: 'monthly', priority: '0.8' },
    { url: `${baseUrl}/editorial-standards`, changefreq: 'monthly', priority: '0.8' },
    { url: `${baseUrl}/privacy-policy`, changefreq: 'monthly', priority: '0.7' },
    { url: `${baseUrl}/terms-and-conditions`, changefreq: 'monthly', priority: '0.7' },
    { url: `${baseUrl}/disclaimer`, changefreq: 'monthly', priority: '0.7' },
    { url: `${baseUrl}/contact`, changefreq: 'monthly', priority: '0.7' },
    { url: `${baseUrl}/cookie-policy`, changefreq: 'monthly', priority: '0.7' },
  ];

  // Author Profile Pages
  const authorPages = authors.map((author) => ({
    url: `${baseUrl}/author/${author.slug}`,
    changefreq: 'weekly',
    priority: '0.8',
  }));

  // Category Pages
  const categoryPages = Object.values(CATEGORIES).map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    changefreq: 'daily',
    priority: '0.8',
  }));

  // Tag Pages
  const tagPages = tags.map(({ tag }) => ({
    url: `${baseUrl}/tag/${encodeURIComponent(tag.trim())}`,
    changefreq: 'weekly',
    priority: '0.6',
  }));

  // Article Pages (retains lastmod for article freshness and Google News)
  const articlePages = posts.map((post) => {
    const postDate = new Date(post.rawDate || post.date);
    const lastmod = isNaN(postDate.getTime()) ? nowIso : postDate.toISOString();
    return {
      url: `${baseUrl}/blog/${post.slug}`,
      changefreq: 'daily',
      priority: '0.9',
      lastmod,
    };
  });

  const allUrls = [...staticPages, ...authorPages, ...categoryPages, ...tagPages, ...articlePages];

  const xmlEntries = allUrls
    .map(
      (item: { url: string; changefreq: string; priority: string; lastmod?: string }) => `  <url>
    <loc>${item.url}</loc>${item.lastmod ? `\n    <lastmod>${item.lastmod}</lastmod>` : ''}
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
