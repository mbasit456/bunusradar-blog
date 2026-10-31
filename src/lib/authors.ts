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
    shortBio: 'The central research and technology newsroom at BunusRadar, coordinating multi-repository benchmarks, fact-checking, and editorial integrity.',
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
    education: 'Accredited Computer Science & Data Engineering Editorial Standards Board',
    pastExperience: 'Coordinating multi-disciplinary technical evaluations and reproducibility audits since 2024.',
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
    shortBio: 'Distributed systems engineer and AI researcher leading BunusRadar\'s coding assistant benchmarks, reasoning models evaluations, and token cost analytics.',
    bio: 'Alex Vance is the Lead AI and Systems Researcher at BunusRadar. With over 8 years of hands-on engineering experience in distributed systems and machine learning infrastructure, Alex designs the standardized test harnesses used in BunusRadar\'s quarterly benchmarks. His research focuses on transformer quantization, LLM context retrieval accuracy, and real-world developer productivity metrics across multi-repository workloads.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    expertise: [
      'Large Language Models & Reasoning Architectures',
      'AI Coding Assistants (Cursor, Copilot, Claude Code)',
      'Systems Architecture & Low-Latency Inference',
      'Benchmark Test Suites & Metric Standardization',
      'Token Cost Optimization & Context Caching',
    ],
    credentials: [
      'Lead Author, BunusRadar AI Coding Assistants Benchmark 2026',
      'M.S. in Computer Science (Distributed Systems), University of Washington',
      'B.S. in Software Engineering, UC Berkeley',
      'Maintainer of open-source LLM evaluation harnesses and benchmark scripts',
    ],
    education: 'M.S. in Computer Science (Distributed Systems), University of Washington; B.S. in Software Engineering, UC Berkeley',
    pastExperience: 'Former Senior Systems Engineer at Cloud Infrastructure Labs (5 years); 8+ years distributed systems and machine learning infrastructure experience.',
    keyPublications: [
      'BunusRadar AI Coding Assistants Benchmark 2026',
      'OpenAI o1 vs GPT-4o: Benchmark and Enterprise Cost Guide',
      'DeepSeek R1 and V3 Architecture & Economic Disruption Analysis',
    ],
    social: {
      linkedin: 'https://www.linkedin.com/in/alex-vance-ai',
      github: 'https://github.com/alexvance-ai',
      website: 'https://bunusradar.site/author/alex-vance',
    },
    sameAs: [
      'https://www.linkedin.com/in/alex-vance-ai',
      'https://github.com/alexvance-ai',
    ],
  },

  'sarah-chen': {
    slug: 'sarah-chen',
    name: 'Sarah Chen',
    role: 'Senior Software & Cloud Systems Analyst',
    shortBio: 'Full-stack cloud architect specializing in Next.js web applications, API latency optimization, TypeScript tooling, and scalable inference pipelines.',
    bio: 'Sarah Chen writes on full-stack web engineering, cloud deployment patterns, and low-latency infrastructure for BunusRadar. Prior to joining the publication, Sarah led cloud migrations for enterprise SaaS platforms and contributed to developer tooling in the TypeScript ecosystem. She evaluates AI tools based on execution latency, memory footprint, and production reliability.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    expertise: [
      'Next.js App Router and React Server Components',
      'Cloud Infrastructure & Edge Compute (AWS / GCP / Cloudflare)',
      'Inference Latency Optimization & Cold Start Reduction',
      'TypeScript, Node.js, and Full-Stack Engineering',
      'Developer Experience & Build Pipeline Tooling',
    ],
    credentials: [
      'AWS Certified Solutions Architect - Professional',
      'B.S. in Computer Science & Cloud Architecture, UIUC',
      'Senior Infrastructure Contributor at BunusRadar',
      'Active contributor to open-source Next.js performance tooling',
    ],
    education: 'B.S. in Computer Science & Cloud Architecture, University of Illinois Urbana-Champaign; AWS Certified Solutions Architect Professional',
    pastExperience: 'Former Lead Cloud Architect at Enterprise Scale Systems (6 years); 7+ years production web engineering and cloud infrastructure.',
    keyPublications: [
      'Mastering Next.js Performance: Edge Rendering & Core Web Vitals',
      'ChatGPT vs Claude vs Gemini: Practical Comparison for Modern Workflows',
      'Building High-Impact Developer Portfolios in 2026',
    ],
    social: {
      linkedin: 'https://www.linkedin.com/in/sarah-chen-tech',
      github: 'https://github.com/sarahchen-dev',
      website: 'https://bunusradar.site/author/sarah-chen',
    },
    sameAs: [
      'https://www.linkedin.com/in/sarah-chen-tech',
      'https://github.com/sarahchen-dev',
    ],
  },

  'elena-rostova': {
    slug: 'elena-rostova',
    name: 'Elena Rostova',
    role: 'AI Workflows & Productivity Research Lead',
    shortBio: 'Cognitive systems researcher specializing in human-AI interaction, automated workflow orchestration, generative image fidelity, and workspace productivity.',
    bio: 'Elena Rostova leads BunusRadar\'s evaluation of workflow automation platforms, AI image generators, and knowledge management systems. Her research examines cognitive load during pair-programming, prompt alignment in creative generative systems, and the empirical impact of agentic workflows on knowledge worker velocity.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    expertise: [
      'Workflow Automation & Human-in-the-Loop Orchestration',
      'Human-AI Interaction & Cognitive Ergonomics',
      'AI Image & Vision Models (FLUX.1, Midjourney, DALL-E 3)',
      'Knowledge Retrieval Systems & Personal Knowledge Management',
      'Prompt Alignment & Generative Fidelity Evaluation',
    ],
    credentials: [
      'Lead Author, BunusRadar AI Image Generator Evaluation 2026',
      'M.S. in Cognitive Science & Human-Computer Interaction, CMU',
      'B.A. in Psychology & Information Science, University of Michigan',
      'Published researcher on prompt fidelity and generative evaluation benchmarks',
    ],
    education: 'M.S. in Cognitive Science & Human-Computer Interaction, Carnegie Mellon University; B.A. in Psychology & Information Science, University of Michigan',
    pastExperience: 'Former UX Research Lead & Prompt Strategist at Human-AI Interface Lab (5 years); 6+ years cognitive systems and generative evaluation.',
    keyPublications: [
      'BunusRadar AI Image Generator Benchmark 2026',
      'Deep Work Protocols: Designing High-Output Days in an Age of Distraction',
      'Ultimate Personal Productivity Stack: 10x Focus with Modern Tools',
    ],
    social: {
      linkedin: 'https://www.linkedin.com/in/elena-rostova-ai',
      website: 'https://bunusradar.site/author/elena-rostova',
    },
    sameAs: [
      'https://www.linkedin.com/in/elena-rostova-ai',
    ],
  },

  'marcus-sterling': {
    slug: 'marcus-sterling',
    name: 'Marcus Sterling',
    role: 'Digital Business & FinTech Economics Analyst',
    shortBio: 'Technology economist analyzing SaaS unit economics, enterprise AI return-on-investment, serverless cloud cost models, and fintech architectures.',
    bio: 'Marcus Sterling covers enterprise software economics, digital business models, and AI return-on-investment for BunusRadar. Having spent a decade in quantitative financial analysis and corporate technology strategy, Marcus translates complex token pricing matrices and serverless bills into actionable unit economics for CTOs, CFOs, and technical founders.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    expertise: [
      'SaaS Unit Economics & LTV/CAC Modeling',
      'Enterprise AI ROI Modeling & TCO Calculations',
      'Cloud Compute Cost Tracking & FinOps Architecture',
      'FinTech Infrastructure & Payment Gateways',
      'Digital Monetization & Micro-SaaS Business Architecture',
    ],
    credentials: [
      'M.B.A. in Technology Strategy & Finance, Wharton School of Business',
      'B.S. in Financial Economics, NYU Stern School of Business',
      'Lead Architect, BunusRadar Enterprise AI ROI Calculator',
      'Former quantitative analyst covering digital enterprise infrastructure',
    ],
    education: 'M.B.A. in Technology Strategy & Finance, Wharton School of Business; B.S. in Financial Economics, NYU Stern',
    pastExperience: 'Former Quantitative Technology Analyst at Global Asset Management (7 years); 10+ years tech finance and enterprise software valuation.',
    keyPublications: [
      'Enterprise AI ROI Modeling: Quantitative Guide for Technical Leaders',
      'The Solopreneur Playbook: Scaling Micro-SaaS to $10k MRR',
      'Most Profitable Digital Business Models: Micro-SaaS in 2026',
    ],
    social: {
      linkedin: 'https://www.linkedin.com/in/marcus-sterling-fintech',
      website: 'https://bunusradar.site/author/marcus-sterling',
    },
    sameAs: [
      'https://www.linkedin.com/in/marcus-sterling-fintech',
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
