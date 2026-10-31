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
    name: 'BunusRadar Editorial',
    role: 'Editorial & Research Team',
    shortBio: 'The central research and technology newsroom at BunusRadar, publishing independent AI evaluations, coding benchmarks, and software architecture guides.',
    bio: 'The BunusRadar Editorial Team comprises technical analysts, software engineers, and machine learning researchers dedicated to rigorous, empirical evaluation of modern AI systems. Operating under strict conflict-of-interest policies, the team runs standardized, multi-repo benchmark suites and publishes reproducible datasets covering developer tools, large language models, and enterprise software stacks.',
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
    shortBio: 'Distributed systems engineer and AI researcher leading BunusRadar\'s coding assistant benchmarks and token cost analytics.',
    bio: 'Alex Vance is the Lead AI and Systems Researcher at BunusRadar. With over 8 years of experience in distributed systems and machine learning infrastructure, Alex designs the standardized test harnesses used in BunusRadar\'s quarterly benchmarks. His research focuses on transformer quantization, LLM context retrieval accuracy, and real-world developer productivity metrics across multi-repository workloads.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    expertise: [
      'Large Language Models',
      'AI Coding Assistants',
      'Systems Architecture',
      'Benchmark Test Suites',
      'Token Cost Optimization',
    ],
    credentials: [
      'Lead Author, BunusRadar AI Coding Assistants Benchmark 2026',
      'M.S. in Computer Science (Distributed Systems)',
      'Contributor to open-source model evaluation frameworks',
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
    shortBio: 'Full-stack cloud architect specializing in Next.js web applications, API latency optimization, and scalable inference pipelines.',
    bio: 'Sarah Chen writes on full-stack web engineering, cloud deployment patterns, and low-latency infrastructure for BunusRadar. Prior to joining the publication, Sarah led cloud migrations for enterprise SaaS platforms and contributed to developer tooling in the TypeScript ecosystem. She evaluates AI tools based on execution latency, memory footprint, and production reliability.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    expertise: [
      'Next.js and React Architecture',
      'Cloud Infrastructure (AWS/GCP)',
      'Inference Latency Optimization',
      'TypeScript and Node.js',
      'Developer Experience',
    ],
    credentials: [
      'AWS Certified Solutions Architect Professional',
      'Senior Infrastructure Contributor at BunusRadar',
      'Speaker at regional developer conferences on web performance',
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
    shortBio: 'Cognitive systems researcher specializing in human-AI interaction, automated workflow orchestration, and prompt fidelity.',
    bio: 'Elena Rostova leads BunusRadar\'s evaluation of workflow automation platforms, AI image generators, and knowledge management systems. Her research examines cognitive load during pair-programming, prompt alignment in creative generative systems, and the empirical impact of agentic workflows on knowledge worker velocity.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    expertise: [
      'Workflow Automation',
      'Human-AI Interaction',
      'AI Image & Vision Models',
      'Knowledge Retrieval Systems',
      'Cognitive Ergonomics',
    ],
    credentials: [
      'Lead Author, BunusRadar AI Image Generator Evaluation 2026',
      'M.S. in Cognitive Science & Human-Computer Interaction',
      'Published researcher on prompt fidelity and generative evaluation',
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
    shortBio: 'Technology economist analyzing SaaS unit economics, enterprise AI return-on-investment, and cloud infrastructure cost structures.',
    bio: 'Marcus Sterling covers enterprise software economics, digital business models, and AI return-on-investment for BunusRadar. Having spent a decade in quantitative financial analysis and corporate technology strategy, Marcus translates complex token pricing matrices and serverless bills into actionable unit economics for CTOs, CFOs, and technical founders.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    expertise: [
      'SaaS Unit Economics',
      'Enterprise AI ROI Modeling',
      'Cloud Compute Cost Tracking',
      'FinTech Infrastructure',
      'Digital Monetization',
    ],
    credentials: [
      'MBA in Technology Finance',
      'Lead Architect, BunusRadar Enterprise AI ROI Calculator',
      'Former quantitative analyst covering digital infrastructure',
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

export function getAllAuthors(): Author[] {
  return Object.values(AUTHORS);
}

// Map author names to slugs for easy lookup from post frontmatter
export const AUTHOR_NAME_TO_SLUG: Record<string, string> = {
  'BunusRadar Editorial': 'bunusradar-editorial',
  'BunusRadar': 'bunusradar-editorial',
  'Editorial Team': 'bunusradar-editorial',
  'Alex Vance': 'alex-vance',
  'Sarah Chen': 'sarah-chen',
  'Elena Rostova': 'elena-rostova',
  'Marcus Sterling': 'marcus-sterling',
};

export function resolveAuthorSlug(name: string): string {
  return AUTHOR_NAME_TO_SLUG[name] || 'bunusradar-editorial';
}
