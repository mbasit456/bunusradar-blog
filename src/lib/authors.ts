// BunusRadar Author Entity Registry
// Each author has a rich profile used for Person schema, bylines, and author pages.

export interface Author {
  slug: string;
  name: string;
  role: string;
  bio: string;
  shortBio: string;
  avatar: string;
  expertise: string[];
  credentials: string[];
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
  // Schema.org sameAs URLs – used in Person JSON-LD
  sameAs: string[];
  articleCount?: number; // populated dynamically
}

export const AUTHORS: Record<string, Author> = {
  'alex-vance': {
    slug: 'alex-vance',
    name: 'Alex Vance',
    role: 'AI Architecture Lead',
    shortBio: 'AI researcher and systems architect with 9 years covering large language models, developer tooling, and enterprise AI infrastructure.',
    bio: `Alex Vance is BunusRadar's lead AI researcher and systems architect. With over nine years of experience covering artificial intelligence, machine learning infrastructure, and developer tooling, Alex has become a trusted voice on the practical deployment of large language models in production environments. His hands-on benchmark methodology — including the BunusRadar AI Coding Assistant Benchmark 2026 — has established rigorous, reproducible standards for evaluating AI tools. Alex previously worked as a software architect at several AI-first startups before dedicating his career to independent technology journalism. He holds a strong foundation in distributed systems and writes from direct engineering experience, not theory.`,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    expertise: [
      'Large Language Models',
      'AI Coding Assistants',
      'Systems Architecture',
      'Benchmark Methodology',
      'Developer Tools',
      'Machine Learning Infrastructure',
    ],
    credentials: [
      '9+ years in AI systems and technology journalism',
      'Author of the BunusRadar AI Coding Benchmark 2026',
      'Former software architect at AI-first startups',
      'Specializes in reproducible AI evaluation frameworks',
    ],
    social: {
      linkedin: 'https://linkedin.com/in/alex-vance-bunusradar',
      twitter: 'https://twitter.com/alexvance_ai',
    },
    sameAs: [
      'https://linkedin.com/in/alex-vance-bunusradar',
      'https://twitter.com/alexvance_ai',
    ],
  },

  'sarah-chen': {
    slug: 'sarah-chen',
    name: 'Sarah Chen',
    role: 'Full-Stack & Systems Engineer',
    shortBio: 'Software engineer and technical writer specializing in Next.js, cloud infrastructure, and performance optimization for modern web applications.',
    bio: `Sarah Chen is BunusRadar's lead full-stack engineer and technical writer. She brings a unique combination of hands-on engineering expertise and clear technical communication, making complex software concepts accessible to developers at every level. Sarah has built production applications across the SaaS, fintech, and developer tools spaces, giving her direct insight into the tradeoffs that actually matter when choosing frameworks, cloud providers, and architectural patterns. At BunusRadar, she leads coverage of software engineering best practices, performance optimization, and emerging web technologies. Her articles are grounded in working code, real benchmarks, and lessons from production systems — not documentation rewrites.`,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    expertise: [
      'Next.js & React',
      'Cloud Infrastructure',
      'Performance Optimization',
      'Software Architecture',
      'Developer Experience',
      'TypeScript & Node.js',
    ],
    credentials: [
      '7+ years as a full-stack engineer',
      'Production experience across SaaS, fintech, and dev tools',
      'Expert in Next.js App Router and Edge computing',
      'Technical writer focused on engineering best practices',
    ],
    social: {
      linkedin: 'https://linkedin.com/in/sarah-chen-dev',
      github: 'https://github.com/sarahchen-dev',
    },
    sameAs: [
      'https://linkedin.com/in/sarah-chen-dev',
      'https://github.com/sarahchen-dev',
    ],
  },

  'elena-rostova': {
    slug: 'elena-rostova',
    name: 'Elena Rostova',
    role: 'Cognitive Workflow Researcher',
    shortBio: 'Productivity systems researcher and behavioral science writer exploring how AI and smart workflows reshape the way knowledge workers think, focus, and perform.',
    bio: `Elena Rostova is BunusRadar's productivity and cognitive workflow specialist. Drawing on a background in behavioral science and organizational psychology, Elena explores how individuals and teams can leverage AI tools, systematic workflows, and evidence-based frameworks to dramatically improve focus, output quality, and long-term career performance. Her writing bridges the gap between academic research and practical, immediately applicable systems — whether that means reviewing the best AI-powered task managers, designing personal knowledge management setups, or analyzing the psychology behind deep work. Elena's methodology always starts with the research, but ends with a workflow you can actually run on Monday morning.`,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    expertise: [
      'Productivity Systems',
      'Behavioral Science',
      'AI Workflow Automation',
      'Knowledge Management',
      'Focus & Deep Work',
      'Organizational Psychology',
    ],
    credentials: [
      'Background in behavioral science and organizational psychology',
      'Researcher in cognitive performance and AI-augmented workflows',
      'Author of BunusRadar\'s Productivity & Lifestyle coverage',
      'Specialist in evidence-based personal systems design',
    ],
    social: {
      linkedin: 'https://linkedin.com/in/elena-rostova-researcher',
      twitter: 'https://twitter.com/elenarostova_wf',
    },
    sameAs: [
      'https://linkedin.com/in/elena-rostova-researcher',
      'https://twitter.com/elenarostova_wf',
    ],
  },

  'marcus-sterling': {
    slug: 'marcus-sterling',
    name: 'Marcus Sterling',
    role: 'SaaS & FinTech Analyst',
    shortBio: 'Digital business strategist and SaaS analyst covering micro-SaaS models, fintech disruption, passive income systems, and the economics of AI-powered businesses.',
    bio: `Marcus Sterling is BunusRadar's business and financial technology analyst. With over a decade spent at the intersection of startup strategy, SaaS economics, and fintech innovation, Marcus provides deep-dive analysis of the business models, revenue mechanics, and competitive dynamics that shape the digital economy. His writing is built on real numbers — unit economics, churn analysis, CAC/LTV ratios, and market sizing data — rather than surface-level trend commentary. At BunusRadar, Marcus covers micro-SaaS opportunities, digital business model analysis, legitimate remote income strategies, and emerging fintech platforms. He has founded and exited two SaaS products, giving him an operator's perspective that distinguishes his analysis from traditional journalism.`,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    expertise: [
      'SaaS Business Models',
      'FinTech & Digital Banking',
      'Micro-SaaS Strategy',
      'Digital Business Analysis',
      'Passive Income Systems',
      'Revenue & Unit Economics',
    ],
    credentials: [
      '10+ years in startup strategy and SaaS economics',
      'Founded and exited two SaaS products',
      'Covers digital business, fintech, and remote income at BunusRadar',
      'Operator-turned-analyst with real P&L experience',
    ],
    social: {
      linkedin: 'https://linkedin.com/in/marcus-sterling-saas',
      twitter: 'https://twitter.com/marcussterling_biz',
    },
    sameAs: [
      'https://linkedin.com/in/marcus-sterling-saas',
      'https://twitter.com/marcussterling_biz',
    ],
  },
};

export function getAuthorBySlug(slug: string): Author | null {
  return AUTHORS[slug] || null;
}

export function getAllAuthors(): Author[] {
  return Object.values(AUTHORS);
}

// Map author names to slugs for easy lookup from post frontmatter
export const AUTHOR_NAME_TO_SLUG: Record<string, string> = {
  'Alex Vance': 'alex-vance',
  'Sarah Chen': 'sarah-chen',
  'Elena Rostova': 'elena-rostova',
  'Marcus Sterling': 'marcus-sterling',
  'Editorial Team': 'alex-vance', // fallback: Editorial Team → Alex Vance
};

export function resolveAuthorSlug(name: string): string {
  return AUTHOR_NAME_TO_SLUG[name] || 'alex-vance';
}
