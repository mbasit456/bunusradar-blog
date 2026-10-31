/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  compress: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/blog/navigating-ai-news-updates-for-strategic-enterprise-growth',
        destination: '/blog/decoding-ai-news-last-24-hours-enterprise-ai-impact-and-strategy',
        permanent: true,
      },
      {
        source: '/blog/llm-news-today-enterprise-ai-architectures-market-dynamics',
        destination: '/blog/decoding-ai-news-last-24-hours-enterprise-ai-impact-and-strategy',
        permanent: true,
      },
      {
        source: '/blog/decoding-chatgpt-news-enterprise-ai-architectures-and-roi',
        destination: '/blog/chatgpt-vs-claude-vs-gemini-practical-comparison',
        permanent: true,
      },
      {
        source: '/blog/scaling-enterprise-content-pipelines-with-a-strategic-blog-post-about-ai',
        destination: '/blog/artificial-intelligence-in-business-implementation-roi-guide',
        permanent: true,
      },
      {
        source: '/feed',
        destination: '/rss.xml',
        permanent: true,
      },
      {
        source: '/feed/',
        destination: '/rss.xml',
        permanent: true,
      },
      {
        source: '/rss',
        destination: '/rss.xml',
        permanent: true,
      },
      {
        source: '/rss/',
        destination: '/rss.xml',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/icon.svg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/rss.xml',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, follow',
          },
        ],
      },
      {
        source: '/llms.txt',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, follow',
          },
        ],
      },
      {
        source: '/llms-full.txt',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, follow',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
