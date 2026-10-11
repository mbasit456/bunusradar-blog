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
    role: 'Editorial Team',
    shortBio: 'The core editorial team at BunusRadar, covering technology, artificial intelligence, software engineering, and digital growth.',
    bio: 'The BunusRadar Editorial Team comprises staff writers, researchers, and technology analysts who research and synthesize developments across artificial intelligence, modern software engineering, digital business models, and productivity workflows. All coverage follows our published editorial standards and fact-checking guidelines.',
    avatar: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=150&q=80',
    expertise: [
      'Artificial Intelligence',
      'Software Engineering',
      'Digital Business Models',
      'Productivity Systems',
      'Technology Analysis',
    ],
    credentials: [
      'BunusRadar Central Editorial Desk',
      'Adheres to BunusRadar Editorial Guidelines and Standards',
    ],
    social: {},
    sameAs: [],
  },

  'alex-vance': {
    slug: 'alex-vance',
    name: 'Alex Vance',
    role: 'AI & Systems Contributor',
    shortBio: 'Technical writer and systems contributor covering large language models, developer tooling, and enterprise AI infrastructure.',
    bio: 'Alex Vance covers artificial intelligence, developer tooling, and software systems for BunusRadar. His articles focus on practical architectural patterns, model comparisons, and developer productivity tools, drawing on publicly available technical documentation and industry specifications.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    expertise: [
      'Large Language Models',
      'AI Coding Assistants',
      'Systems Architecture',
      'Developer Tools',
    ],
    credentials: [
      'Technical Contributor at BunusRadar',
      'Specializes in AI tooling analysis and comparative guides',
    ],
    social: {},
    sameAs: [],
  },

  'sarah-chen': {
    slug: 'sarah-chen',
    name: 'Sarah Chen',
    role: 'Software Engineering Contributor',
    shortBio: 'Software engineering contributor writing on modern web frameworks, cloud infrastructure, and application performance.',
    bio: 'Sarah Chen writes on full-stack web development, framework performance, and cloud deployment patterns for BunusRadar. Her work covers practical engineering workflows across TypeScript, React, Next.js, and modern dev tools.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    expertise: [
      'Next.js and React',
      'Cloud Infrastructure',
      'Performance Optimization',
      'TypeScript and Node.js',
    ],
    credentials: [
      'Software Engineering Contributor at BunusRadar',
      'Focus on modern frontend architecture and developer workflows',
    ],
    social: {},
    sameAs: [],
  },

  'elena-rostova': {
    slug: 'elena-rostova',
    name: 'Elena Rostova',
    role: 'Productivity & Workflows Contributor',
    shortBio: 'Workflow researcher and writer exploring productivity systems, knowledge management, and AI-assisted workflows.',
    bio: 'Elena Rostova covers cognitive productivity, workspace systems, and digital organization for BunusRadar. She writes on evidence-based workflow design, task management software, and sustainable remote work practices.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    expertise: [
      'Productivity Systems',
      'Workflow Automation',
      'Knowledge Management',
      'Remote Work Strategy',
    ],
    credentials: [
      'Productivity Contributor at BunusRadar',
      'Focus on digital organization frameworks and workflow tools',
    ],
    social: {},
    sameAs: [],
  },

  'marcus-sterling': {
    slug: 'marcus-sterling',
    name: 'Marcus Sterling',
    role: 'Business & FinTech Contributor',
    shortBio: 'Digital business and fintech contributor covering SaaS economics, online business models, and remote monetization.',
    bio: 'Marcus Sterling covers digital business models, software economics, and financial technology for BunusRadar. His writing examines recurring revenue models, market dynamics, and operational strategies for online businesses.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    expertise: [
      'SaaS Business Models',
      'Digital Business Analysis',
      'FinTech and Payments',
      'Online Monetization',
    ],
    credentials: [
      'Digital Business Contributor at BunusRadar',
      'Focus on business model unit economics and digital strategy',
    ],
    social: {},
    sameAs: [],
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
