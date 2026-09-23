import { getAllPosts } from '@/lib/posts';

function escapeXml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const baseUrl = 'https://bunusradar.site';
  const posts = getAllPosts();

  const rssItems = posts
    .map((post) => {
      const pubDate = new Date(post.rawDate || post.date);
      const validDate = isNaN(pubDate.getTime()) ? new Date().toUTCString() : pubDate.toUTCString();
      const articleUrl = `${baseUrl}/blog/${post.slug}`;

      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${articleUrl}</link>
      <guid isPermaLink="true">${articleUrl}</guid>
      <description><![CDATA[${post.excerpt || post.title}]]></description>
      <pubDate>${validDate}</pubDate>
      <category><![CDATA[${post.category}]]></category>
      <author><![CDATA[${post.author?.name || 'BunusRadar Editorial'}]]></author>
    </item>`;
    })
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>BunusRadar</title>
    <link>${baseUrl}</link>
    <description><![CDATA[Insights on Technology, AI Systems, Digital Business, and Productivity]]></description>
    <language>en-us</language>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
