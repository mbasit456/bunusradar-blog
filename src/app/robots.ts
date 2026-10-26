import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://bunusradar.site';

  return {
    rules: [
      // Google AdSense Crawlers: explicit full access
      {
        userAgent: 'Mediapartners-Google',
        allow: '/',
      },
      {
        userAgent: 'AdsBot-Google',
        allow: '/',
      },
      // Standard search engines and Google News: full access
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Googlebot-News',
        allow: '/',
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
      // AI and Generative Answer Crawlers: explicitly welcomed for AEO, GEO, and AIO
      // OpenAI ChatGPT training and real-time retrieval
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      // Anthropic Claude
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
      },
      // Perplexity AI Search
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      // Google Gemini, AI Overviews, and SGE
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      // Apple Intelligence and Siri
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
      },
      // Meta AI
      {
        userAgent: 'Meta-ExternalAgent',
        allow: '/',
      },
      // Common Crawl (primary foundation for LLM pretraining)
      {
        userAgent: 'CCBot',
        allow: '/',
      },
      // ByteDance / TikTok AI Search
      {
        userAgent: 'Bytespider',
        allow: '/',
      },
      // Diffbot Structured Knowledge Graph
      {
        userAgent: 'Diffbot',
        allow: '/',
      },
      // You.com AI Search
      {
        userAgent: 'YouBot',
        allow: '/',
      },
      // Cohere AI
      {
        userAgent: 'cohere-ai',
        allow: '/',
      },
      // Catch-all: all other bots granted full crawl access (excluding internal search and APIs)
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/search', '/api/'],
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap_index.xml`,
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap-news.xml`,
    ],
    host: baseUrl,
  };
}
