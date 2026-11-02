// BunusRadar Author Entity Registry
// Rich profiles used for Person schema, bylines, and author pages.

export interface Author {
  slug: string;
  name: string;
  role: string;
  bio: string;
  shortBio: string;
  avatar: string;
  expertise: string[];
  credentials: string[];
  education: string;
  pastExperience: string;
  keyPublications: string[];
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
  sameAs: string[];
  articleCount?: number;
}

export const AUTHORS: Record<string, Author> = {
  'bunusradar-editorial': {
    slug: 'bunusradar-editorial',
    name: 'BunusRadar Editorial Desk',
    role: 'Editorial & Research Desk',
    shortBio: 'The central research and technology newsroom at BunusRadar, coordinating standardized benchmarks, fact-checking, and editorial integrity.',
    bio: 'The BunusRadar Editorial Desk coordinates our team of specialized technology analysts, software engineers, and machine learning researchers. Operating under strict conflict-of-interest policies, the desk oversees standardized benchmark suites and reproducible datasets covering developer tools, large language models, and enterprise software architectures.',
    avatar: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80',
    expertise: [
      'Artificial Intelligence Benchmarks',
      'Large Language Models (LLMs)',
      'Software Architecture',
      'Developer Tooling',
      'Token Cost Economics',
    ],
    credentials: [
      'BunusRadar Central Editorial & Research Desk',
      'Adheres to BunusRadar Testing Methodology and Fact-Checking Standards',
      'Maintains Publicly Auditable Open Datasets',
    ],
    education: 'Computer Science & Software Engineering Editorial Desk',
    pastExperience: 'Coordinating technical evaluations, reproducibility audits, and comparative software benchmarks.',
    keyPublications: [
      'BunusRadar AI Coding Assistant Benchmark 2026',
      'LLM Pricing and Token Economics Tracker 2026',
      'AI Image Generator Accuracy Test 2026',
    ],
    social: {
      github: 'https://github.com/mbasit456/bunusradar-blog',
      website: 'https://bunusradar.site/about',
    },
    sameAs: [
      'https://github.com/mbasit456/bunusradar-blog',
      'https://bunusradar.site/about',
    ],
  },

  'alex-vance': {
    slug: 'alex-vance',
    name: 'Alex Vance',
    role: 'Lead AI & Systems Researcher',
    shortBio: 'Systems researcher leading BunusRadar\'s coding assistant benchmarks, reasoning model evaluations, and token cost analytics.',
    bio: 'Alex Vance serves as the Lead AI and Systems Researcher at BunusRadar. Specializing in distributed systems, machine learning pipelines, and developer tooling, Alex oversees the standardized benchmark suites and reproducible datasets published in the BunusRadar Research Hub. His work focuses on code completion benchmarks, LLM latency evaluation, and enterprise infrastructure economics.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    expertise: [
      'Large Language Models & Reasoning Architectures',
      'AI Coding Assistants (Cursor, Copilot, Claude Code)',
      'Systems Architecture & Low-Latency Inference',
      'Benchmark Test Suites & Metric Standardization',
      'Token Cost Optimization & Context Caching',
    ],
    credentials: [
      'Lead Researcher, BunusRadar AI Coding Assistants Benchmark 2026',
      'Designer of the BunusRadar 50-task multi-repository benchmark suite',
      'Maintainer of the BunusRadar Open Dataset repository',
      'Adheres to BunusRadar Published Evaluation Methodology',
    ],
    education: 'Computer Science & Distributed Systems Research Track',
    pastExperience: 'Systems research and developer tooling evaluation at BunusRadar since inception.',
    keyPublications: [
      'BunusRadar AI Coding Assistants Benchmark 2026',
      'OpenAI o1 vs GPT-4o: Benchmark and Enterprise Cost Guide',
      'DeepSeek AI vs ChatGPT vs Claude: The Ultimate AI Showdown (2026)',
    ],
    social: {
      github: 'https://github.com/mbasit456/bunusradar-blog',
      website: 'https://bunusradar.site/author/alex-vance',
    },
    sameAs: [
      'https://github.com/mbasit456/bunusradar-blog',
      'https://bunusradar.site/author/alex-vance',
    ],
  },

  'sarah-chen': {
    slug: 'sarah-chen',
    name: 'Sarah Chen',
    role: 'Senior Software & Cloud Systems Analyst',
    shortBio: 'Software engineer and systems analyst specializing in Next.js web applications, API latency optimization, and developer workflows.',
    bio: 'Sarah Chen covers full-stack web engineering, edge runtime performance, and cloud API architectures for BunusRadar. She evaluates developer tooling, code generators, and conversational search platforms based on real-world execution speed, memory efficiency, and developer productivity.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    expertise: [
      'Next.js App Router and React Server Components',
      'Cloud Infrastructure & Edge Compute Architecture',
      'Inference Latency Optimization & Cold Start Benchmarks',
      'TypeScript, Node.js, and Full-Stack Engineering',
      'Developer Experience & Build Pipeline Tooling',
    ],
    credentials: [
      'Senior Technology Analyst at BunusRadar',
      'Contributor to BunusRadar Developer Tooling Benchmarks',
      'Lead Author on Web Performance and Generative Engine Optimization',
      'Adheres to BunusRadar Published Evaluation Methodology',
    ],
    education: 'Software Engineering & Cloud Architecture Research Track',
    pastExperience: 'Full-stack software engineering and developer tooling analysis.',
    keyPublications: [
      'Mastering Next.js Performance: Edge Rendering & Core Web Vitals',
      'ChatGPT vs Claude vs Gemini: Practical Comparison for Modern Workflows',
      'How to Get Your Brand Cited in ChatGPT Search Results: The GEO Framework',
    ],
    social: {
      github: 'https://github.com/mbasit456/bunusradar-blog',
      website: 'https://bunusradar.site/author/sarah-chen',
    },
    sameAs: [
      'https://github.com/mbasit456/bunusradar-blog',
      'https://bunusradar.site/author/sarah-chen',
    ],
  },

  'elena-rostova': {
    slug: 'elena-rostova',
    name: 'Elena Rostova',
    role: 'AI Workflows & Productivity Research Lead',
    shortBio: 'Workflow researcher specializing in human-AI interaction, prompt engineering, generative image fidelity, and productivity stacks.',
    bio: 'Elena Rostova leads BunusRadar\'s evaluations of developer productivity systems, prompt engineering frameworks, and AI image generation platforms. Her analysis focuses on prompt alignment fidelity, cognitive ergonomics in automated workflows, and practical focus architectures for technical teams.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    expertise: [
      'Workflow Automation & Human-in-the-Loop Orchestration',
      'Human-AI Interaction & Cognitive Ergonomics',
      'AI Image & Vision Models (Midjourney, Stable Diffusion, Ideogram)',
      'Knowledge Retrieval Systems & Personal Knowledge Management',
      'Prompt Alignment & Generative Fidelity Evaluation',
    ],
    credentials: [
      'Lead Researcher, BunusRadar AI Image Generator Accuracy Test',
      'Designer of the 100-prompt multi-domain vision evaluation dataset',
      'Author of BunusRadar Deep Work and Focus Protocols',
      'Adheres to BunusRadar Published Evaluation Methodology',
    ],
    education: 'Cognitive Ergonomics & Workflow Automation Research Track',
    pastExperience: 'Research into workflow automation, generative media fidelity, and pair-programming ergonomics.',
    keyPublications: [
      'Best Free AI Video Generators: Top Text-to-Video Tools in 2026',
      'Best Free Midjourney Alternatives: Top AI Art Generators in 2026',
      'Ultimate Personal Productivity Stack: Build Your 10x Focus Engine',
    ],
    social: {
      github: 'https://github.com/mbasit456/bunusradar-blog',
      website: 'https://bunusradar.site/author/elena-rostova',
    },
    sameAs: [
      'https://github.com/mbasit456/bunusradar-blog',
      'https://bunusradar.site/author/elena-rostova',
    ],
  },

  'marcus-sterling': {
    slug: 'marcus-sterling',
    name: 'Marcus Sterling',
    role: 'Enterprise AI & FinTech Economics Analyst',
    shortBio: 'Technology analyst examining SaaS unit economics, enterprise AI return on investment, and token pricing models.',
    bio: 'Marcus Sterling analyzes enterprise software economics, digital business architectures, and AI financial return for BunusRadar. He translates complex cloud token pricing matrices, serverless compute bills, and automation investments into actionable unit economics for founders, engineers, and technology leaders.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    expertise: [
      'SaaS Unit Economics & Payback Horizon Calculations',
      'Enterprise AI ROI Modeling & TCO Calculations',
      'Cloud Compute Cost Tracking & Token Accounting',
      'FinTech Infrastructure & Developer Monetization',
      'Digital Monetization & Micro-SaaS Business Architecture',
    ],
    credentials: [
      'Lead Analyst, BunusRadar Enterprise AI ROI Calculator',
      'Contributor to the BunusRadar LLM Pricing and Token Cost Tracker',
      'Author of Quantitative SaaS Economics Frameworks',
      'Adheres to BunusRadar Published Evaluation Methodology',
    ],
    education: 'Technology Economics & Financial Analysis Research Track',
    pastExperience: 'Quantitative technology analysis and enterprise software ROI modeling.',
    keyPublications: [
      'Artificial Intelligence in Business: Implementation Frameworks and ROI',
      'The Solopreneur Playbook: Scaling Micro-SaaS to $10k MRR',
      'Most Profitable Digital Business Models & Micro-SaaS Ideas for 2026',
    ],
    social: {
      github: 'https://github.com/mbasit456/bunusradar-blog',
      website: 'https://bunusradar.site/author/marcus-sterling',
    },
    sameAs: [
      'https://github.com/mbasit456/bunusradar-blog',
      'https://bunusradar.site/author/marcus-sterling',
    ],
  },
};

export function getAuthorBySlug(slug: string): Author | null {
  return AUTHORS[slug] || null;
}

// Returns only the verified named expert authors for public directories
export function getAllAuthors(): Author[] {
  return [
    AUTHORS['alex-vance'],
    AUTHORS['sarah-chen'],
    AUTHORS['elena-rostova'],
    AUTHORS['marcus-sterling'],
  ];
}

// Map author names to slugs for easy lookup from post frontmatter
export const AUTHOR_NAME_TO_SLUG: Record<string, string> = {
  'Alex Vance': 'alex-vance',
  'Sarah Chen': 'sarah-chen',
  'Elena Rostova': 'elena-rostova',
  'Marcus Sterling': 'marcus-sterling',
  'BunusRadar Editorial': 'alex-vance',
  'BunusRadar': 'alex-vance',
  'Editorial Team': 'alex-vance',
};

export function resolveAuthorSlug(name: string): string {
  return AUTHOR_NAME_TO_SLUG[name] || 'alex-vance';
}
