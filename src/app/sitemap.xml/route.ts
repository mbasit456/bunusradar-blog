import { getAllPosts } from '@/lib/posts';
import { CATEGORIES } from '@/lib/categories';
import { getAllAuthors } from '@/lib/authors';

export const dynamic = 'force-static';
export const revalidate = false;

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
  const authors = getAllAuthors();
  const today = new Date().toISOString().split('T')[0];

  // Core Static Pages
  const staticPages = [
    { url: `${baseUrl}`, changefreq: 'daily', priority: '1.0', lastmod: today },
    { url: `${baseUrl}/latest-publications`, changefreq: 'daily', priority: '0.9', lastmod: today },
    { url: `${baseUrl}/tools`, changefreq: 'weekly', priority: '0.9', lastmod: today },
    { url: `${baseUrl}/tools/free-ai-chat`, changefreq: 'weekly', priority: '0.9', lastmod: today },
    { url: `${baseUrl}/tools/ai-token-calculator`, changefreq: 'weekly', priority: '0.9', lastmod: today },
    { url: `${baseUrl}/tools/ai-prompt-optimizer`, changefreq: 'weekly', priority: '0.9', lastmod: today },
    { url: `${baseUrl}/tools/ai-roi-calculator`, changefreq: 'weekly', priority: '0.9', lastmod: today },
    { url: `${baseUrl}/research`, changefreq: 'monthly', priority: '0.8', lastmod: today },
    { url: `${baseUrl}/methodology`, changefreq: 'monthly', priority: '0.8', lastmod: today },
    { url: `${baseUrl}/authors`, changefreq: 'monthly', priority: '0.8', lastmod: today },
    { url: `${baseUrl}/about`, changefreq: 'monthly', priority: '0.8', lastmod: today },
    { url: `${baseUrl}/editorial-standards`, changefreq: 'monthly', priority: '0.8', lastmod: today },
    { url: `${baseUrl}/privacy-policy`, changefreq: 'monthly', priority: '0.5', lastmod: today },
    { url: `${baseUrl}/terms-and-conditions`, changefreq: 'monthly', priority: '0.5', lastmod: today },
    { url: `${baseUrl}/disclaimer`, changefreq: 'monthly', priority: '0.5', lastmod: today },
    { url: `${baseUrl}/contact`, changefreq: 'monthly', priority: '0.7', lastmod: today },
    { url: `${baseUrl}/cookie-policy`, changefreq: 'monthly', priority: '0.5', lastmod: today },
  ];

  // Category Hub Pages
  const categoryPages = Object.values(CATEGORIES).map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    changefreq: 'daily',
    priority: '0.8',
    lastmod: today,
  }));

  // Author Profile Pages
  const authorPages = authors.map((author) => ({
    url: `${baseUrl}/author/${author.slug}`,
    changefreq: 'weekly',
    priority: '0.7',
    lastmod: today,
  }));

  // Article Pages with Google Image extension
  const articlePages = posts.map((post) => {
    const d = new Date(post.rawDate || post.date);
    const lastmod = !isNaN(d.getTime()) ? d.toISOString().split('T')[0] : today;

    const rawCover = post.coverImage || '';
    const fullCoverImageUrl = rawCover
      ? (rawCover.startsWith('http') ? rawCover : `${baseUrl}${rawCover.startsWith('/') ? rawCover : `/${rawCover}`}`)
      : null;

    return {
      url: `${baseUrl}/blog/${post.slug}`,
      changefreq: 'weekly',
      priority: '1.0',
      lastmod,
      imageUrl: fullCoverImageUrl,
      imageTitle: post.title,
    };
  });

  const staticXml = [...staticPages, ...categoryPages, ...authorPages]
    .map(
      (item) => `  <url>
    <loc>${xmlEscape(item.url)}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
    )
    .join('\n');

  const articlesXml = articlePages
    .map((item) => {
      const imageTag = item.imageUrl
        ? `\n    <image:image>
      <image:loc>${xmlEscape(item.imageUrl)}</image:loc>
      <image:title>${xmlEscape(item.imageTitle)}</image:title>
    </image:image>`
        : '';
      return `  <url>
    <loc>${xmlEscape(item.url)}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>${imageTag}
  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${staticXml}
${articlesXml}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
