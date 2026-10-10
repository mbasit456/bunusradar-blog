import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { marked } from 'marked';
import { AUTHORS, resolveAuthorSlug, Author } from '@/lib/authors';

const POSTS_DIRECTORY = path.join(process.cwd(), 'content', 'posts');

// Topic/Slug to Author assignment map
export const POST_AUTHOR_ASSIGNMENT: Record<string, string> = {
  // AI & Architecture - Alex Vance
  'best-ai-coding-assistants-2026-cursor-vs-claude-vs-github-copilot': 'alex-vance',
  'deepseek-ai-vs-chatgpt-vs-claude-ultimate-showdown': 'alex-vance',
  'best-free-midjourney-alternatives-ai-art-generators': 'alex-vance',
  'best-free-chatgpt-alternatives-2026': 'alex-vance',
  'best-free-ai-video-generators-text-to-video-2026': 'alex-vance',
  'top-free-ai-video-generators-2026': 'alex-vance',
  'top-character-ai-alternatives-free-conversational-ai': 'alex-vance',
  'autonomous-ai-agents-software-development': 'alex-vance',
  'inside-epic-systems-tech-giant-shaping-future-of-medicine': 'alex-vance',
  
  // Software Engineering & Performance - Sarah Chen
  'mastering-nextjs-performance-2026': 'sarah-chen',
  'building-high-impact-developer-portfolios': 'sarah-chen',
  'bbc-tech-coverage-and-digital-media-trends': 'sarah-chen',
  'tg-daily-tech-news-review-and-best-articles': 'sarah-chen',
  'phone-prefix-702-location-time-zone-caller-identification': 'sarah-chen',
  'vollebak-carbon-fibre-dyneema-pants-top-alternatives': 'sarah-chen',
  'laptop-giveaway-scams-warning-signs-phishing-prevention': 'sarah-chen',

  // Productivity, Knowledge & Cognitive Systems - Elena Rostova
  'ultimate-personal-productivity-stack-10x-focus': 'elena-rostova',
  'best-free-notion-templates-productivity-life-organization': 'elena-rostova',
  'hyper-focused-productivity-systems': 'elena-rostova',
  'future-of-remote-work-digital-nomad-careers-2026': 'elena-rostova',
  'future-of-remote-work-and-ambient-intelligence': 'elena-rostova',
  'legitimate-work-from-home-jobs-high-paying-remote-careers-2026': 'elena-rostova',
  'hypoallergenic-cats-ultimate-guide-allergy-friendly-breeds': 'elena-rostova',
  'best-myfitnesspal-alternative-options': 'elena-rostova',
  'sancerre-wine-french-appellation-tasting-notes-pairing-guide': 'elena-rostova',
  'love-wellness-daily-love-multivitamin-ingredients-efficacy-review': 'elena-rostova',

  // SaaS, Fintech & Digital Wealth - Marcus Sterling
  'most-profitable-digital-business-models-microsaas-2026': 'marcus-sterling',
  'passive-income-ideas-8-proven-wealth-systems-2026': 'marcus-sterling',
  'best-side-hustles-to-make-1000-a-month-2026': 'marcus-sterling',
  'how-to-make-money-online-2026-legitimate-methods-beginners': 'marcus-sterling',
  'how-to-scale-digital-micro-saas': 'marcus-sterling',
  'forbes-top-business-and-wealth-tips-2026': 'marcus-sterling',
  'owi-meaning-operating-while-intoxicated-legal-penalties-defense': 'marcus-sterling',
};

export function resolveAuthorForPost(slug: string, explicitAuthor?: any): {
  slug: string;
  name: string;
  avatar: string;
  role: string;
} {
  // If post has explicit object with name
  const rawName = typeof explicitAuthor === 'string' ? explicitAuthor : explicitAuthor?.name;
  
  // 1. Check direct post mapping first
  let authorSlug = POST_AUTHOR_ASSIGNMENT[slug];
  
  // 2. Fall back to name resolution if not in map
  if (!authorSlug && rawName) {
    authorSlug = resolveAuthorSlug(rawName);
  }
  
  // 3. Fallback default
  if (!authorSlug || !AUTHORS[authorSlug]) {
    authorSlug = 'alex-vance';
  }

  const author = AUTHORS[authorSlug];
  return {
    slug: author.slug,
    name: author.name,
    avatar: author.avatar,
    role: author.role,
  };
}

export interface PostMetadata {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  rawDate?: string;
  category: string;
  tags: string[];
  coverImage?: string;
  authorSlug: string;
  author: {
    name: string;
    avatar?: string;
    role?: string;
  };
  readingTime: string;
  featured?: boolean;
}

export interface PostWithContent extends PostMetadata {
  content: string;
  htmlContent: string;
  toc: { level: number; text: string; id: string }[];
}

// Ensure posts directory exists
function ensurePostsDir() {
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    fs.mkdirSync(POSTS_DIRECTORY, { recursive: true });
  }
}

export function getAllPosts(includeScheduled = false): PostMetadata[] {
  ensurePostsDir();
  const fileNames = fs.readdirSync(POSTS_DIRECTORY);
  const today = new Date().toISOString().split('T')[0];

  const allPosts = fileNames
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, '');
      const fullPath = path.join(POSTS_DIRECTORY, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      const stats = readingTime(content);

      const rawDateStr = data.date ? String(data.date).trim() : '';
      const dateObj = rawDateStr ? new Date(rawDateStr) : new Date();
      const dateDisplay = isNaN(dateObj.getTime())
        ? new Date().toISOString().split('T')[0]
        : dateObj.toISOString().split('T')[0];

      const authorResolved = resolveAuthorForPost(slug, data.author);

      return {
        slug,
        title: data.title || 'Untitled Post',
        excerpt: data.excerpt || data.description || '',
        date: dateDisplay,
        rawDate: rawDateStr,
        category: (data.category || 'general').toLowerCase(),
        tags: Array.isArray(data.tags) ? data.tags : [],
        coverImage: data.coverImage || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
        authorSlug: authorResolved.slug,
        author: {
          name: authorResolved.name,
          avatar: authorResolved.avatar,
          role: authorResolved.role,
        },
        readingTime: stats.text,
        featured: Boolean(data.featured),
      };
    })
    // Only show articles whose publish date & time has arrived (unless includeScheduled=true)
    .filter((post) => {
      if (includeScheduled) return true;
      if (post.rawDate && (post.rawDate.includes('T') || post.rawDate.includes(':'))) {
        const postTime = new Date(post.rawDate).getTime();
        return !isNaN(postTime) && postTime <= Date.now();
      }
      return post.date <= today;
    });

  // Sort descending by date & time
  return allPosts.sort((a, b) => {
    const timeA = new Date(a.rawDate || a.date).getTime();
    const timeB = new Date(b.rawDate || b.date).getTime();
    return timeB - timeA;
  });
}

export function getFeaturedPost(): PostMetadata | null {
  const posts = getAllPosts();
  return posts.find((p) => p.featured) || posts[0] || null;
}

export function getPostsByCategory(categorySlug: string): PostMetadata[] {
  const posts = getAllPosts();
  return posts.filter((post) => post.category.toLowerCase() === categorySlug.toLowerCase());
}

export function getPostsByTag(tag: string): PostMetadata[] {
  const posts = getAllPosts();
  return posts.filter((post) =>
    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

export function getAllTags(): { tag: string; count: number }[] {
  const posts = getAllPosts();
  const tagCounts: Record<string, number> = {};

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      const lower = tag.toLowerCase();
      tagCounts[lower] = (tagCounts[lower] || 0) + 1;
    });
  });

  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export async function getPostBySlug(slug: string, includeScheduled = false): Promise<PostWithContent | null> {
  ensurePostsDir();
  const mdPath = path.join(POSTS_DIRECTORY, `${slug}.md`);
  const mdxPath = path.join(POSTS_DIRECTORY, `${slug}.mdx`);

  const filePath = fs.existsSync(mdPath) ? mdPath : fs.existsSync(mdxPath) ? mdxPath : null;

  if (!filePath) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  const rawDateStr = data.date ? String(data.date).trim() : '';
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  const postDate = rawDateStr && !isNaN(new Date(rawDateStr).getTime())
    ? new Date(rawDateStr).toISOString().split('T')[0]
    : today;

  // Don't show scheduled articles before their date & time unless explicitly requested
  if (!includeScheduled) {
    if (rawDateStr && (rawDateStr.includes('T') || rawDateStr.includes(':'))) {
      const postTime = new Date(rawDateStr).getTime();
      if (!isNaN(postTime) && postTime > Date.now()) {
        return null;
      }
    } else if (postDate > today) {
      return null;
    }
  }

  // Parse Table of Contents
  const headingRegex = /^(#{2,3})\s+(.*)$/gm;
  const toc: { level: number; text: string; id: string }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    toc.push({ level, text, id });
  }

  // Convert markdown to HTML with IDs on headings for TOC anchors
  const renderer = new marked.Renderer();
  renderer.heading = ({ text, depth }) => {
    const id = text
      .toLowerCase()
      .replace(/<[^>]*>/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    return `<h${depth} id="${id}" class="scroll-mt-24 group flex items-center font-bold">${text} <a href="#${id}" class="ml-2 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity text-sm font-normal">#</a></h${depth}>`;
  };

  const htmlContent = await marked.parse(content, { renderer });

  const authorResolved = resolveAuthorForPost(slug, data.author);

  return {
    slug,
    title: data.title || 'Untitled Post',
    excerpt: data.excerpt || data.description || '',
    date: postDate,
    category: (data.category || 'general').toLowerCase(),
    tags: Array.isArray(data.tags) ? data.tags : [],
    coverImage: data.coverImage || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
    authorSlug: authorResolved.slug,
    author: {
      name: authorResolved.name,
      avatar: authorResolved.avatar,
      role: authorResolved.role,
    },
    readingTime: stats.text,
    featured: Boolean(data.featured),
    content,
    htmlContent,
    toc,
  };
}
