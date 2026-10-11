export interface TopicCluster {
  id: string;
  name: string;
  shortName: string;
  pillarCategory: string;
  pillarUrl: string;
  description: string;
  articles: string[]; // Ordered slugs in learning sequence
}

export const TOPIC_CLUSTERS: Record<string, TopicCluster> = {
  'ai-tools-models': {
    id: 'ai-tools-models',
    name: 'Generative AI, Models & Autonomous Engineering',
    shortName: 'AI Models & Developer Tools',
    pillarCategory: 'ai',
    pillarUrl: '/category/ai',
    description: 'Comprehensive evaluations of large language models, code assistants, autonomous agent architectures, and generative media tools.',
    articles: [
      'best-ai-coding-assistants-2026-cursor-vs-claude-vs-github-copilot',
      'deepseek-ai-vs-chatgpt-vs-claude-ultimate-showdown',
      'autonomous-ai-agents-software-development',
      'best-free-chatgpt-alternatives-2026',
      'best-free-midjourney-alternatives-ai-art-generators',
      'best-free-ai-video-generators-text-to-video-2026',
      'top-free-ai-video-generators-2026',
      'top-character-ai-alternatives-free-conversational-ai',
    ],
  },
  'microsaas-digital-business': {
    id: 'microsaas-digital-business',
    name: 'Digital Business Models & Micro-SaaS Architecture',
    shortName: 'Micro-SaaS & Wealth Systems',
    pillarCategory: 'business',
    pillarUrl: '/category/business',
    description: 'Data-driven blueprints for building recurring software revenue, solopreneur scaling strategies, and remote economic models.',
    articles: [
      'most-profitable-digital-business-models-microsaas-2026',
      'how-to-scale-digital-micro-saas',
      'passive-income-ideas-8-proven-wealth-systems-2026',
      'best-side-hustles-to-make-1000-a-month-2026',
      'how-to-make-money-online-2026-legitimate-methods-beginners',
      'forbes-top-business-and-wealth-tips-2026',
      'future-of-remote-work-digital-nomad-careers-2026',
      'legitimate-work-from-home-jobs-high-paying-remote-careers-2026',
    ],
  },
  'productivity-systems': {
    id: 'productivity-systems',
    name: 'Cognitive Workflows & Personal Focus Systems',
    shortName: 'Deep Work & Productivity',
    pillarCategory: 'productivity',
    pillarUrl: '/category/productivity',
    description: 'Actionable protocols for cognitive throughput, personal knowledge management, and distraction-free execution.',
    articles: [
      'ultimate-personal-productivity-stack-10x-focus',
      'hyper-focused-productivity-systems',
      'best-free-notion-templates-productivity-life-organization',
      'future-of-remote-work-and-ambient-intelligence',
    ],
  },
  'web-engineering': {
    id: 'web-engineering',
    name: 'Modern Web Engineering & Systems Performance',
    shortName: 'Web & Systems Engineering',
    pillarCategory: 'technology',
    pillarUrl: '/category/technology',
    description: 'Deep dives into edge rendering, Core Web Vitals optimization, cybersecurity hygiene, and software careers.',
    articles: [
      'mastering-nextjs-performance-2026',
      'building-high-impact-developer-portfolios',
      'laptop-giveaway-scams-warning-signs-phishing-prevention',
      'inside-epic-systems-tech-giant-shaping-future-of-medicine',
      'tg-daily-tech-news-review-and-best-articles',
      'bbc-tech-coverage-and-digital-media-trends',
    ],
  },
};

export function getClusterForPost(slug: string): TopicCluster | null {
  for (const cluster of Object.values(TOPIC_CLUSTERS)) {
    if (cluster.articles.includes(slug)) {
      return cluster;
    }
  }
  return null;
}

export function getClusterById(id: string): TopicCluster | null {
  return TOPIC_CLUSTERS[id] || null;
}

export function getAllClusters(): TopicCluster[] {
  return Object.values(TOPIC_CLUSTERS);
}
