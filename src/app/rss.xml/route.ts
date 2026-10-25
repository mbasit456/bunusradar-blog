import { getAllPosts } from '@/lib/posts';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const baseUrl = 'https://bunusradar.site';
  const posts = getAllPosts();

  const rssItems = posts
    .slice(0, 50)
    .map((post) => {
      const pubDate = new Date(post.rawDate || post.date);
      const validDate = isNaN(pubDate.getTime()) ? new Date().toUTCString() : pubDate.toUTCString();
      const articleUrl = `${baseUrl}/blog/${post.slug}`;
      const rawImage = post.coverImage || '';
      const fullImageUrl = rawImage
        ? (rawImage.startsWith('http') ? rawImage : `${baseUrl}${rawImage.startsWith('/') ? rawImage : `/${rawImage}`}`)
        : '';
      const authorName = post.author?.name || 'BunusRadar Editorial';

      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${articleUrl}</link>
      <guid isPermaLink="true">${articleUrl}</guid>
      <description><![CDATA[${post.excerpt || post.title}]]></description>
      <content:encoded><![CDATA[${post.excerpt || post.title}]]></content:encoded>
      <dc:creator><![CDATA[${authorName}]]></dc:creator>
      <author>editorial@bunusradar.site (${authorName})</author>
      <pubDate>${validDate}</pubDate>
      <category><![CDATA[${post.category}]]></category>
      ${fullImageUrl ? `<enclosure url="${fullImageUrl}" type="image/jpeg" length="0" />
      <media:content url="${fullImageUrl}" medium="image" />
      <media:thumbnail url="${fullImageUrl}" />` : ''}
    </item>`;
    })
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:atom="http://www.w3.org/2005/Atom" 
     xmlns:media="http://search.yahoo.com/mrss/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:content="http://purl.org/rss/1.0/modules/content/">
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
      'Cache-Control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=600',
    },
  });
}
