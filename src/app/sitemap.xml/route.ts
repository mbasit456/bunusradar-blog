import { getAllPosts, getAllTags } from '@/lib/posts';
import { CATEGORIES } from '@/lib/categories';
import { getAllAuthors } from '@/lib/authors';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export async function GET() {
  const baseUrl = 'https://bunusradar.site';
  const posts = getAllPosts(true);
  const authors = getAllAuthors();
  const today = new Date().toISOString().split('T')[0];

  // Static Pages with lastmod for Google Search Console freshness signals
  const staticPages = [
    { url: `${baseUrl}`, changefreq: 'daily', priority: '1.0', lastmod: today },
    { url: `${baseUrl}/latest-publications`, changefreq: 'daily', priority: '0.9', lastmod: today },
    { url: `${baseUrl}/tools`, changefreq: 'weekly', priority: '0.95', lastmod: today },
    { url: `${baseUrl}/tools/free-ai-chat`, changefreq: 'weekly', priority: '1.0', lastmod: today },
    { url: `${baseUrl}/tools/ai-token-calculator`, changefreq: 'weekly', priority: '0.95', lastmod: today },
    { url: `${baseUrl}/tools/ai-prompt-optimizer`, changefreq: 'weekly', priority: '0.95', lastmod: today },
    { url: `${baseUrl}/tools/ai-roi-calculator`, changefreq: 'weekly', priority: '0.95', lastmod: today },
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

  // Category Hub Pages
  const categoryPages = Object.values(CATEGORIES).map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    changefreq: 'daily',
    priority: '0.8',
    lastmod: today,
  }));

  // Article Pages with W3C YYYY-MM-DD lastmod
  const articlePages = posts.map((post) => {
    const d = new Date(post.rawDate || post.date);
    const lastmod = !isNaN(d.getTime()) ? d.toISOString().split('T')[0] : undefined;
    return {
      url: `${baseUrl}/blog/${post.slug}`,
      changefreq: 'weekly',
      priority: '0.9',
      lastmod,
    };
  });

  // Tag Hub Pages - only include substantial tags with 2 or more articles to avoid thin content indexing warnings
  const substantialTags = getAllTags().filter(({ count }) => count >= 2);
  const tagPages = substantialTags.map(({ tag }) => ({
    url: `${baseUrl}/tag/${encodeURIComponent(tag.trim().toLowerCase())}`,
    changefreq: 'weekly',
    priority: '0.6',
  }));

  const allUrls = [...staticPages, ...authorPages, ...categoryPages, ...articlePages, ...tagPages];

  const xmlEntries = allUrls
    .map(
      (item: { url: string; changefreq: string; priority: string; lastmod?: string }) => `  <url>
    <loc>${item.url}</loc>${item.lastmod ? `\n    <lastmod>${item.lastmod}</lastmod>` : ''}
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
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
