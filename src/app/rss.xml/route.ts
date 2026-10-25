import { getAllPosts } from '@/lib/posts';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function escapeXmlAttr(str: unknown): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function sanitizeCdata(str: unknown): string {
  if (typeof str !== 'string') return '';
  return str.replace(/]]>/g, ']]&gt;');
}

export async function GET() {
  const baseUrl = 'https://bunusradar.site';
  const posts = getAllPosts();
  const buildDate = new Date().toUTCString();

  const rssItems = posts
    .slice(0, 50)
    .map((post) => {
      const pubDate = new Date(post.rawDate || post.date);
      const validDate = isNaN(pubDate.getTime()) ? buildDate : pubDate.toUTCString();
      const articleUrl = `${baseUrl}/blog/${post.slug}`;
      const escapedArticleUrl = escapeXmlAttr(articleUrl);
      const rawImage = post.coverImage || '';
      const fullImageUrl = rawImage
        ? (rawImage.startsWith('http') ? rawImage : `${baseUrl}${rawImage.startsWith('/') ? rawImage : `/${rawImage}`}`)
        : '';
      const escapedImageUrl = fullImageUrl ? escapeXmlAttr(fullImageUrl) : '';
      const authorName = post.author?.name || 'BunusRadar Editorial';
      const escapedAuthorName = escapeXmlAttr(authorName);

      return `
    <item>
      <title><![CDATA[${sanitizeCdata(post.title)}]]></title>
      <link>${escapedArticleUrl}</link>
      <guid isPermaLink="true">${escapedArticleUrl}</guid>
      <description><![CDATA[${sanitizeCdata(post.excerpt || post.title)}]]></description>
      <content:encoded><![CDATA[${sanitizeCdata(post.excerpt || post.title)}]]></content:encoded>
      <dc:creator><![CDATA[${sanitizeCdata(authorName)}]]></dc:creator>
      <author>editorial@bunusradar.site (${escapedAuthorName})</author>
      <pubDate>${validDate}</pubDate>
      <category><![CDATA[${sanitizeCdata(post.category)}]]></category>
      ${escapedImageUrl ? `<enclosure url="${escapedImageUrl}" type="image/jpeg" length="0" />
      <media:content url="${escapedImageUrl}" medium="image" />
      <media:thumbnail url="${escapedImageUrl}" />` : ''}
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
    <lastBuildDate>${buildDate}</lastBuildDate>
    <copyright>Copyright (c) ${new Date().getFullYear()} BunusRadar. All rights reserved.</copyright>
    <docs>https://www.rssboard.org/rss-specification</docs>
    <generator>BunusRadar Custom Feed Generator</generator>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/logos/square-logo.png</url>
      <title>BunusRadar</title>
      <link>${baseUrl}</link>
      <width>144</width>
      <height>144</height>
    </image>
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
