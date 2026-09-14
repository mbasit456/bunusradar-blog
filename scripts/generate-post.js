#!/usr/bin/env node

/**
 * Automated Blog Post Generator for GravityPulse
 * Usage:
 *   node scripts/generate-post.js --title="My New Article" --category="technology" --tags="web,nextjs"
 * Or interactive mode:
 *   node scripts/generate-post.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

function parseArgs() {
  const args = {};
  process.argv.slice(2).forEach((arg) => {
    if (arg.startsWith('--')) {
      const [key, value] = arg.slice(2).split('=');
      args[key] = value || true;
    }
  });
  return args;
}

const CATEGORY_IMAGES = {
  technology: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
  ai: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  business: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
  productivity: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80',
  lifestyle: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  general: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
};

async function createPost({ title, category, excerpt, tags, content }) {
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }

  const slug = slugify(title);
  const filePath = path.join(POSTS_DIR, `${slug}.md`);

  if (fs.existsSync(filePath)) {
    console.warn(`[WARNING] File already exists at: ${filePath}`);
    return filePath;
  }

  const date = new Date().toISOString().split('T')[0];
  const coverImage = CATEGORY_IMAGES[category.toLowerCase()] || CATEGORY_IMAGES.general;
  const tagList = Array.isArray(tags) ? tags : tags.split(',').map((t) => t.trim().toLowerCase());

  const template = `---
title: "${title.replace(/"/g, '\\"')}"
excerpt: "${(excerpt || 'An in-depth guide on ' + title).replace(/"/g, '\\"')}"
date: "${date}"
category: "${category.toLowerCase()}"
tags: ${JSON.stringify(tagList)}
coverImage: "${coverImage}"
featured: false
author:
  name: "Antigravity Editorial"
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
  role: "AI & Technology Columnist"
---

${content || `## Introduction\n\nStart writing your thoughts about ${title} here.\n\n## Key Takeaways\n\n- Key point 1\n- Key point 2\n- Key point 3\n\n## Deep Dive\n\nDetailed breakdown...\n\n## Conclusion\n\nSummary and final thoughts.`}
`;

  fs.writeFileSync(filePath, template, 'utf8');
  console.log(`\n[SUCCESS] New post created:`);
  console.log(`- Title: ${title}`);
  console.log(`- Category: ${category}`);
  console.log(`- File: ${filePath}\n`);

  return filePath;
}

async function main() {
  const args = parseArgs();

  if (args.title) {
    await createPost({
      title: args.title,
      category: args.category || 'technology',
      excerpt: args.excerpt || '',
      tags: args.tags ? args.tags.split(',') : ['general'],
      content: args.content || null,
    });
    return;
  }

  // Interactive CLI if no args provided
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (query) => new Promise((resolve) => rl.question(query, resolve));

  console.log('\n--- GravityPulse: Create New Blog Post ---');
  const title = await question('Article Title: ');
  const category = (await question('Category (technology, ai, business, productivity, lifestyle) [technology]: ')) || 'technology';
  const tagsStr = (await question('Tags (comma-separated) [general]: ')) || 'general';
  const excerpt = await question('Short Excerpt / Meta Description: ');

  rl.close();

  if (!title.trim()) {
    console.error('Title is required!');
    process.exit(1);
  }

  await createPost({
    title,
    category,
    tags: tagsStr.split(','),
    excerpt,
  });
}

main().catch(console.error);
