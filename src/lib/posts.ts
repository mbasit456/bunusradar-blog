import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { marked } from 'marked';
import { AUTHORS, resolveAuthorSlug, Author } from '@/lib/authors';
import { normalizeCategorySlug } from '@/lib/categories';

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
  'artificial-intelligence-in-business-implementation-roi-guide': 'alex-vance',
  
  // Software Engineering & Performance - Sarah Chen
  'mastering-nextjs-performance-2026': 'sarah-chen',
  'building-high-impact-developer-portfolios': 'sarah-chen',
  'bbc-tech-coverage-and-digital-media-trends': 'sarah-chen',
  'tg-daily-tech-news-review-and-best-articles': 'sarah-chen',
  'phone-prefix-702-location-time-zone-caller-identification': 'sarah-chen',
  'vollebak-carbon-fibre-dyneema-pants-top-alternatives': 'sarah-chen',
  'laptop-giveaway-scams-warning-signs-phishing-prevention': 'sarah-chen',
  'evolution-of-technology-future-trends': 'sarah-chen',

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
    authorSlug = 'bunusradar-editorial';
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

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PostWithContent extends PostMetadata {
  content: string;
  htmlContent: string;
  toc: { level: number; text: string; id: string }[];
  faqs: FaqItem[];
  keyTakeaways: string[];
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
        category: normalizeCategorySlug(data.category || 'technology'),
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
  const target = normalizeCategorySlug(categorySlug);
  const posts = getAllPosts();
  return posts.filter((post) => post.category === target);
}

export function getPostsByTag(tag: string): PostMetadata[] {
  const normalizedTarget = tag.toLowerCase().replace(/[-\s]+/g, ' ').trim();
  const posts = getAllPosts();
  return posts.filter((post) =>
    post.tags.some((t) => {
      const normalizedTag = t.toLowerCase().replace(/[-\s]+/g, ' ').trim();
      return normalizedTag === normalizedTarget;
    })
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

export async function getPostBySlug(slug: string, includeScheduled = true): Promise<PostWithContent | null> {
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

  // All existing markdown files are always accessible to prevent 404 errors for search engines and users

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
  const faqs = extractFaqsFromContent(content);
  const keyTakeaways = extractKeyTakeaways(content);

  return {
    slug,
    title: data.title || 'Untitled Post',
    excerpt: data.excerpt || data.description || '',
    date: postDate,
    category: normalizeCategorySlug(data.category || 'technology'),
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
    faqs,
    keyTakeaways,
  };
}

export function extractFaqsFromContent(markdown: string): FaqItem[] {
  const faqs: FaqItem[] = [];
  const headingRegex = /^(?:#{2,3})\s+(?:(?:\d+\.|\d+\))\s*)?([^#\n\r]+\?)\s*$/gm;
  const matches: { question: string; index: number; length: number }[] = [];
  let m: RegExpExecArray | null;

  while ((m = headingRegex.exec(markdown)) !== null) {
    const rawQuestion = m[1].trim();
    const cleanQuestion = rawQuestion.replace(/[*_`]/g, '').trim();
    if (cleanQuestion.length > 5) {
      matches.push({
        question: cleanQuestion,
        index: m.index,
        length: m[0].length,
      });
    }
  }

  for (let i = 0; i < matches.length; i++) {
    const current = matches[i];
    const startIndex = current.index + current.length;
    const nextIndex = i + 1 < matches.length ? matches[i + 1].index : markdown.length;

    const sectionBody = markdown.slice(startIndex, nextIndex);
    const subHeadingMatch = sectionBody.search(/\n#{1,3}\s+/);
    const cleanBody = subHeadingMatch !== -1 ? sectionBody.slice(0, subHeadingMatch) : sectionBody;

    const paragraphs = cleanBody
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0 && !p.startsWith('#') && !p.startsWith('>') && !p.startsWith('|') && !p.includes('| ---'))
      .map((p) => p.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'))
      .map((p) => p.replace(/[*_`]/g, ''))
      .map((p) => p.replace(/<[^>]*>/g, ''))
      .map((p) => p.trim())
      .filter((p) => p.length > 20 && !p.startsWith('|'));

    if (paragraphs.length > 0) {
      const answer = paragraphs.slice(0, 2).join(' ').slice(0, 450).trim();
      if (answer.length > 30) {
        faqs.push({
          question: current.question,
          answer,
        });
      }
    }
  }

  if (faqs.length === 0) {
    const qaRegex = /\*\*(?:Q|Question):\s*([^*]+(?:\?|\.))\*\*\s*\n+([^#\n\r]+)/gi;
    let qaMatch: RegExpExecArray | null;
    while ((qaMatch = qaRegex.exec(markdown)) !== null) {
      const q = qaMatch[1].replace(/[*_`]/g, '').trim();
      const a = qaMatch[2].replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_`]/g, '').trim();
      if (q.length > 5 && a.length > 20) {
        faqs.push({ question: q, answer: a.slice(0, 450) });
      }
    }
  }

  return faqs.slice(0, 8);
}

export function extractKeyTakeaways(markdown: string): string[] {
  const bullets: string[] = [];
  const lines = markdown.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if ((trimmed.startsWith('* ') || trimmed.startsWith('- ')) && trimmed.length > 25 && !trimmed.includes('http')) {
      const clean = trimmed
        .replace(/^[\*\-]\s+/, '')
        .replace(/\*\*/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/<[^>]*>/g, '')
        .trim();
      if (clean.length > 30 && clean.length < 240) {
        bullets.push(clean);
        if (bullets.length >= 3) break;
      }
    }
  }

  return bullets;
}


export function savePostFile(postData: {
  slug: string;
  title: string;
  excerpt?: string;
  date?: string;
  category?: string;
  tags?: string[];
  coverImage?: string;
  author?: { name: string; avatar?: string; role?: string } | string;
  content: string;
}): { success: boolean; path: string; slug: string } {
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    fs.mkdirSync(POSTS_DIRECTORY, { recursive: true });
  }

  const cleanSlug = postData.slug
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');

  const frontmatter = {
    title: postData.title,
    excerpt: postData.excerpt || '',
    date: postData.date || new Date().toISOString().split('T')[0],
    category: postData.category || 'technology',
    tags: Array.isArray(postData.tags) ? postData.tags : [],
    coverImage: postData.coverImage || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
    ...(postData.author ? { author: postData.author } : {}),
  };

  const fileContent = matter.stringify(postData.content || '', frontmatter);
  const targetPath = path.join(POSTS_DIRECTORY, `${cleanSlug}.md`);
  fs.writeFileSync(targetPath, fileContent, 'utf-8');

  return { success: true, path: targetPath, slug: cleanSlug };
}

export function deletePostFile(slug: string): boolean {
  const targetPath = path.join(POSTS_DIRECTORY, `${slug}.md`);
  if (fs.existsSync(targetPath)) {
    fs.unlinkSync(targetPath);
    return true;
  }
  return false;
}
