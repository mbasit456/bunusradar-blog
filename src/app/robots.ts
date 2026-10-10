import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://bunusradar.site';

  return {
    rules: [
      // Standard search engines — full access
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
      // AI crawlers — explicitly welcome, full access
      // GPTBot: ChatGPT and OpenAI training/retrieval
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      // ChatGPT-User: real-time ChatGPT browsing
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      // ClaudeBot: Anthropic Claude AI
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      // Claude-Web: Claude browser tool
      {
        userAgent: 'Claude-Web',
        allow: '/',
      },
      // PerplexityBot: Perplexity AI search
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      // Google-Extended: Google AI products (Gemini, SGE, Bard)
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      // Applebot-Extended: Apple Intelligence, Siri
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
      },
      // YouBot: You.com AI search
      {
        userAgent: 'YouBot',
        allow: '/',
      },
      // cohere-ai: Cohere AI
      {
        userAgent: 'cohere-ai',
        allow: '/',
      },
      // Catch-all: all other bots — full access
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
