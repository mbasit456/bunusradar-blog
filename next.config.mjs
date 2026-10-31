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
        source: '/blog/how-to-start-a-photography-business-tech-saas-blueprint',
        destination: '/blog/how-to-scale-digital-micro-saas',
        permanent: true,
      },
      {
        source: '/blog/architecting-enterprise-scale-and-productivity-on-national-coffee-day',
        destination: '/blog/ultimate-personal-productivity-stack-10x-focus',
        permanent: true,
      },
      {
        source: '/blog/architecting-financial-growth-milestone-card-credit-strategy',
        destination: '/blog/artificial-intelligence-in-business-implementation-roi-guide',
        permanent: true,
      },
      {
        source: '/blog/best-myfitnesspal-alternative-options',
        destination: '/blog/ultimate-personal-productivity-stack-10x-focus',
        permanent: true,
      },
      {
        source: '/blog/canine-benadryl-dosage-uses-side-effects-guide',
        destination: '/blog/artificial-intelligence-in-business-implementation-roi-guide',
        permanent: true,
      },
      {
        source: '/blog/decoding-claires-closing-enterprise-strategy-and-market-dynamics',
        destination: '/blog/artificial-intelligence-in-business-implementation-roi-guide',
        permanent: true,
      },
      {
        source: '/blog/future-of-remote-work-and-ambient-intelligence',
        destination: '/blog/future-of-remote-work-digital-nomad-careers-2026',
        permanent: true,
      },
      {
        source: '/blog/gabapentin-for-cats-dosage-uses-side-effects-guide',
        destination: '/blog/artificial-intelligence-in-business-implementation-roi-guide',
        permanent: true,
      },
      {
        source: '/blog/holiday-motivation-architecting-enterprise-velocity',
        destination: '/blog/ultimate-personal-productivity-stack-10x-focus',
        permanent: true,
      },
      {
        source: '/blog/how-to-be-a-global-citizen-be-informed-get-involved',
        destination: '/blog/digital-transformation-and-the-best-ways-to-support-local-businesses',
        permanent: true,
      },
      {
        source: '/blog/how-to-become-a-paralegal-complete-career-guide',
        destination: '/blog/artificial-intelligence-in-business-implementation-roi-guide',
        permanent: true,
      },
      {
        source: '/blog/hypoallergenic-cats-ultimate-guide-allergy-friendly-breeds',
        destination: '/blog/artificial-intelligence-in-business-implementation-roi-guide',
        permanent: true,
      },
      {
        source: '/blog/is-liquid-iv-good-for-you-analyzing-d2c-tech-and-saas-growth',
        destination: '/blog/how-to-scale-digital-micro-saas',
        permanent: true,
      },
      {
        source: '/blog/love-wellness-daily-love-multivitamin-ingredients-efficacy-review',
        destination: '/blog/artificial-intelligence-in-business-implementation-roi-guide',
        permanent: true,
      },
      {
        source: '/blog/lugano-diamonds-and-jewelry-filed-for-chapter-11-bankruptcy-business-analysis',
        destination: '/blog/artificial-intelligence-in-business-implementation-roi-guide',
        permanent: true,
      },
      {
        source: '/blog/maya-angelou-poems-resilience-hope-analysis',
        destination: '/blog/deepseek-ai-vs-chatgpt-vs-claude-ultimate-showdown',
        permanent: true,
      },
      {
        source: '/blog/modern-tooth-fairy-folklore-economics-tech',
        destination: '/blog/evolution-of-technology-future-trends',
        permanent: true,
      },
      {
        source: '/blog/money-piece-hair-trend-styling-maintenance-guide',
        destination: '/blog/how-to-make-money-online-2026-legitimate-methods-beginners',
        permanent: true,
      },
      {
        source: '/blog/optimizing-capital-efficiency-and-tech-stacks-via-0-apr-car-deals',
        destination: '/blog/artificial-intelligence-in-business-implementation-roi-guide',
        permanent: true,
      },
      {
        source: '/blog/optimizing-compensation-workflows-salary-calculator-arkansas',
        destination: '/blog/artificial-intelligence-in-business-implementation-roi-guide',
        permanent: true,
      },
      {
        source: '/blog/optimizing-corporate-intelligence-via-north-carolina-business-search',
        destination: '/blog/scaling-market-intelligence-using-chatgpt-prompts-for-competitive-gap-analysis',
        permanent: true,
      },
      {
        source: '/blog/optimizing-enterprise-analytics-david-benavidez-next-fight',
        destination: '/blog/scaling-market-intelligence-using-chatgpt-prompts-for-competitive-gap-analysis',
        permanent: true,
      },
      {
        source: '/blog/optimizing-field-operations-strategic-impact-mileage-rate-2025',
        destination: '/blog/artificial-intelligence-in-business-implementation-roi-guide',
        permanent: true,
      },
      {
        source: '/blog/optimizing-workforce-operations-with-shiftnote-solutions',
        destination: '/blog/ultimate-personal-productivity-stack-10x-focus',
        permanent: true,
      },
      {
        source: '/blog/owi-meaning-operating-while-intoxicated-legal-penalties-defense',
        destination: '/blog/artificial-intelligence-in-business-implementation-roi-guide',
        permanent: true,
      },
      {
        source: '/blog/phone-prefix-702-location-time-zone-caller-identification',
        destination: '/blog/laptop-giveaway-scams-warning-signs-phishing-prevention',
        permanent: true,
      },
      {
        source: '/blog/sancerre-wine-french-appellation-tasting-notes-pairing-guide',
        destination: '/blog/how-to-scale-digital-micro-saas',
        permanent: true,
      },
      {
        source: '/blog/scaling-edtech-platforms-why-coursehero-promo-code-matters',
        destination: '/blog/how-to-scale-digital-micro-saas',
        permanent: true,
      },
      {
        source: '/blog/ugly-love-colleen-hoover-book-review-themes-analysis',
        destination: '/blog/deepseek-ai-vs-chatgpt-vs-claude-ultimate-showdown',
        permanent: true,
      },
      {
        source: '/blog/where-to-sell-jewelry-online-ecommerce-infrastructure',
        destination: '/blog/how-to-scale-digital-micro-saas',
        permanent: true,
      },
      {
        source: '/blog/woolino-sleep-sack-merino-wool-review',
        destination: '/blog/evolution-of-technology-future-trends',
        permanent: true,
      },
      {
        source: '/blog/vollebak-carbon-fibre-dyneema-pants-top-alternatives',
        destination: '/blog/evolution-of-technology-future-trends',
        permanent: true,
      },
      {
        source: '/blog/architecting-digital-asset-resilience-and-scalability-with-zatcoin',
        destination: '/blog/evolution-of-technology-future-trends',
        permanent: true,
      },
      {
        source: '/blog/architecting-enterprise-compliance-with-an-illinois-paycheck-calculator',
        destination: '/blog/artificial-intelligence-in-business-implementation-roi-guide',
        permanent: true,
      },
      {
        source: '/blog/architecting-enterprise-workflows-black-flats-saas',
        destination: '/blog/how-to-scale-digital-micro-saas',
        permanent: true,
      },
      {
        source: '/blog/navigating-bruce-willis-disease-enterprise-tech-and-digital-continuity',
        destination: '/blog/inside-epic-systems-tech-giant-shaping-future-of-medicine',
        permanent: true,
      },
      {
        source: '/category/lifestyle',
        destination: '/category/technology',
        permanent: true,
      },
      {
        source: '/category/lifestyle/:slug*',
        destination: '/category/technology',
        permanent: true,
      },
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
