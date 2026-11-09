import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://bunusradar.site';

  return {
    rules: [
      // Google AdSense Crawlers
      {
        userAgent: 'Mediapartners-Google',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: 'AdsBot-Google',
        allow: '/',
        disallow: ['/api/'],
      },
      // Standard search engines and Google News
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/search'],
      },
      {
        userAgent: 'Googlebot-News',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/search'],
      },
      // OpenAI ChatGPT Search Indexer (Primary crawler for ChatGPT Search)
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        disallow: ['/api/'],
      },
      // OpenAI User-Initiated Retrieval Agent (Live browsing lookups)
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: ['/api/'],
      },
      // OpenAI Training Crawler
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/api/'],
      },
      // Anthropic Search Crawler
      {
        userAgent: 'Claude-SearchBot',
        allow: '/',
        disallow: ['/api/'],
      },
      // Anthropic Training and Web Crawlers
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
        disallow: ['/api/'],
      },
      // Perplexity AI Search Crawler
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/api/'],
      },
      // Google Gemini, AI Overviews, and SGE
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: ['/api/'],
      },
      // Apple Intelligence and Siri
      {
        userAgent: 'Applebot',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
        disallow: ['/api/'],
      },
      // Meta AI
      {
        userAgent: 'Meta-ExternalAgent',
        allow: '/',
        disallow: ['/api/'],
      },
      // Common Crawl (Foundation for pretraining)
      {
        userAgent: 'CCBot',
        allow: '/',
        disallow: ['/api/'],
      },
      // Catch-all: all other bots granted public access (excluding internal search and APIs)
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/search', '/api/'],
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap_index.xml`,
      `${baseUrl}/sitemap-posts.xml`,
      `${baseUrl}/sitemap-pages.xml`,
      `${baseUrl}/sitemap-categories.xml`,
      `${baseUrl}/sitemap-authors.xml`,
      `${baseUrl}/sitemap-tags.xml`,
      `${baseUrl}/sitemap-news.xml`,
    ],
    host: baseUrl,
  };
}
