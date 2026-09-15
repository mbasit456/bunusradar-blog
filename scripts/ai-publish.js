#!/usr/bin/env node
/**
 * AI Article Publisher for BonusRadar Blog
 * =========================================
 * Usage: node scripts/ai-publish.js "keyword1" "keyword2" "keyword3"
 * Or:    npm run ai:publish -- "best productivity apps 2026" "AI tools for bloggers"
 *
 * Requires: GEMINI_API_KEY environment variable
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const POSTS_DIR = path.join(ROOT, 'content', 'posts');

// ─── CONFIG ───────────────────────────────────────────────────────────────────

const SITE_NAME = 'BonusRadar';
const AUTHOR = 'BonusRadar Editorial';
const CATEGORIES = ['Technology', 'Artificial Intelligence', 'Business & Growth', 'Productivity', 'Lifestyle'];

const COVER_IMAGES = [
  'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop',
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .substring(0, 80);
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function today() {
  return new Date().toISOString().split('T')[0];
}

// ─── AI ARTICLE GENERATOR ────────────────────────────────────────────────────

async function generateArticle(keyword, apiKey) {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });

  const prompt = `You are an expert blogger writing for "${SITE_NAME}", a tech & lifestyle magazine.
Write a high-quality, SEO-optimized blog article about: "${keyword}"

STRICT OUTPUT FORMAT — Return ONLY valid JSON, no markdown fences, no extra text:
{
  "title": "Engaging, click-worthy article title (60-70 chars)",
  "slug": "url-friendly-slug-with-hyphens",
  "excerpt": "2-3 sentence SEO meta description (150-160 chars)",
  "category": "ONE of: Technology | Artificial Intelligence | Business & Growth | Productivity | Lifestyle",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "readingTime": "estimated reading time like '7 min read'",
  "body": "Full article in markdown (1200-1600 words). Use ## for H2 headings, ### for H3. Include: intro paragraph, 4-6 sections with headings, bullet points where useful, a conclusion with actionable takeaway. NO frontmatter, just the body content."
}

Requirements:
- Title must be engaging and include the main keyword
- Body must be informative, practical, and authoritative
- Use examples, statistics (can be illustrative), and actionable tips
- Conversational but professional tone
- No fluff, every paragraph adds value`;

  console.log(`  ✍️  Generating article for: "${keyword}"...`);

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();

  // Strip markdown fences if model wraps in them
  const cleaned = text.replace(/^```json\s*/i, '').replace(/\s*```$/, '').trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (e) {
    throw new Error(`Failed to parse AI response as JSON.\nRaw response:\n${text.substring(0, 500)}`);
  }

  return parsed;
}

// ─── MARKDOWN FILE BUILDER ───────────────────────────────────────────────────

function buildMarkdownFile(data) {
  const coverImage = randomItem(COVER_IMAGES);
  const tags = Array.isArray(data.tags) ? data.tags : [];

  const frontmatter = `---
title: "${data.title.replace(/"/g, '\\"')}"
date: "${today()}"
excerpt: "${data.excerpt.replace(/"/g, '\\"')}"
category: "${data.category}"
tags: [${tags.map(t => `"${t}"`).join(', ')}]
author: "${AUTHOR}"
coverImage: "${coverImage}"
readingTime: "${data.readingTime || '6 min read'}"
featured: false
---`;

  return `${frontmatter}\n\n${data.body.trim()}\n`;
}

// ─── GIT PUSH ────────────────────────────────────────────────────────────────

function gitPush(filenames) {
  try {
    console.log('\n  📦 Committing and pushing to GitHub...');
    execSync('git add -A', { cwd: ROOT, stdio: 'inherit' });
    const msg = `ai: publish ${filenames.length} new article(s) — ${filenames.join(', ')}`;
    execSync(`git commit -m "${msg}"`, { cwd: ROOT, stdio: 'inherit' });
    execSync('git push', { cwd: ROOT, stdio: 'inherit' });
    console.log('  ✅ Pushed! Vercel will deploy in ~30 seconds.');
  } catch (err) {
    console.error('  ❌ Git push failed:', err.message);
    console.log('  💡 You can push manually: git add -A && git commit -m "add articles" && git push');
  }
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

async function main() {
  const keywords = process.argv.slice(2).filter(Boolean);

  if (keywords.length === 0) {
    console.error(`
❌ No keywords provided!

Usage:
  node scripts/ai-publish.js "keyword 1" "keyword 2" "keyword 3"

Example:
  node scripts/ai-publish.js "best AI tools for freelancers 2026" "how to build passive income online"
`);
    process.exit(1);
  }

  // Get API key
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error(`
❌ GEMINI_API_KEY environment variable not set!

Get your free API key at: https://aistudio.google.com/app/apikey

Then set it:
  Windows PowerShell: $env:GEMINI_API_KEY = "your-key-here"
  Then run the script again.
`);
    process.exit(1);
  }

  console.log(`\n🚀 BonusRadar AI Publisher`);
  console.log(`   Generating ${keywords.length} article(s)...\n`);

  const published = [];

  for (const keyword of keywords) {
    try {
      const data = await generateArticle(keyword, apiKey);

      // Use AI-generated slug or create from title
      const slug = data.slug ? slugify(data.slug) : slugify(data.title);
      const filename = `${slug}.md`;
      const filepath = path.join(POSTS_DIR, filename);

      // Don't overwrite existing articles
      if (fs.existsSync(filepath)) {
        console.log(`  ⚠️  Skipping "${keyword}" — file already exists: ${filename}`);
        continue;
      }

      const markdown = buildMarkdownFile(data);
      fs.writeFileSync(filepath, markdown, 'utf8');

      console.log(`  ✅ Created: ${filename}`);
      console.log(`     Title: ${data.title}`);
      console.log(`     Category: ${data.category}`);
      console.log(`     Tags: ${(data.tags || []).join(', ')}\n`);

      published.push(filename);
    } catch (err) {
      console.error(`  ❌ Failed for "${keyword}": ${err.message}\n`);
    }
  }

  if (published.length === 0) {
    console.log('⚠️  No new articles were created.');
    return;
  }

  console.log(`\n📝 Created ${published.length} article(s):`);
  published.forEach(f => console.log(`   • ${f}`));

  // Auto git push
  gitPush(published);

  console.log(`
🎉 Done! Your article(s) will be live at bonusradar.site in ~1 minute.
`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
