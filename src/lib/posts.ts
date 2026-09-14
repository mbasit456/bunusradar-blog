import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { marked } from 'marked';

const POSTS_DIRECTORY = path.join(process.cwd(), 'content', 'posts');

export interface PostMetadata {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tags: string[];
  coverImage?: string;
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

export function getAllPosts(): PostMetadata[] {
  ensurePostsDir();
  const fileNames = fs.readdirSync(POSTS_DIRECTORY);
  const allPosts = fileNames
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, '');
      const fullPath = path.join(POSTS_DIRECTORY, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      const stats = readingTime(content);

      return {
        slug,
        title: data.title || 'Untitled Post',
        excerpt: data.excerpt || data.description || '',
        date: data.date ? new Date(data.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        category: (data.category || 'general').toLowerCase(),
        tags: Array.isArray(data.tags) ? data.tags : [],
        coverImage: data.coverImage || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
        author: {
          name: data.author?.name || 'Editorial Team',
          avatar: data.author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
          role: data.author?.role || 'Staff Writer',
        },
        readingTime: stats.text,
        featured: Boolean(data.featured),
      };
    });

  // Sort descending by date
  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
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

export async function getPostBySlug(slug: string): Promise<PostWithContent | null> {
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

  return {
    slug,
    title: data.title || 'Untitled Post',
    excerpt: data.excerpt || data.description || '',
    date: data.date ? new Date(data.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    category: (data.category || 'general').toLowerCase(),
    tags: Array.isArray(data.tags) ? data.tags : [],
    coverImage: data.coverImage || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: data.author?.name || 'Editorial Team',
      avatar: data.author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      role: data.author?.role || 'Staff Writer',
    },
    readingTime: stats.text,
    featured: Boolean(data.featured),
    content,
    htmlContent,
    toc,
  };
}
