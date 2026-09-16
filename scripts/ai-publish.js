#!/usr/bin/env node
/**
 * AI Article Publisher for BonusRadar Blog
 * =========================================
 * Usage: node scripts/ai-publish.js "keyword1" "keyword2" "keyword3"
 * Or:    npm run ai:publish -- "best productivity apps 2026" "AI tools for bloggers"
 *
 * Automatically schedules articles 1 every 2 days!
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

/** 
 * Computes the starting date for scheduling:
 * Checks all existing posts for their date.
 * If the latest post is today or in the future, the next one begins 2 days after that date.
 * Otherwise, the first post starts today.
 */
function getNextScheduleStart() {
  const postsDir = path.join(ROOT, 'content', 'posts');
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  if (!fs.existsSync(postsDir)) return todayStr;

  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
  let latestDateStr = todayStr;
  let hasPostToday = false;

  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(postsDir, file), 'utf8');
      const match = content.match(/^date:\s*"?(\d{4}-\d{2}-\d{2})"?/m);
      if (match) {
        const dStr = match[1];
        if (dStr === todayStr) hasPostToday = true;
        if (dStr > latestDateStr) {
          latestDateStr = dStr;
        }
      }
    } catch {}
  }

  if (latestDateStr > todayStr) {
    const nextD = new Date(latestDateStr + 'T00:00:00Z');
    nextD.setUTCDate(nextD.getUTCDate() + 2);
    return nextD.toISOString().split('T')[0];
  } else if (hasPostToday) {
    const nextD = new Date(todayStr + 'T00:00:00Z');
    nextD.setUTCDate(nextD.getUTCDate() + 2);
    return nextD.toISOString().split('T')[0];
  } else {
    return todayStr;
  }
}

/** Returns a UTC ISO date string offset by `index * 2` days from the start date */
function scheduledDate(startDateStr, index) {
  const d = new Date(startDateStr + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + index * 2);
  return d.toISOString().split('T')[0];
}

// ─── AI ARTICLE GENERATOR ────────────────────────────────────────────────────

async function generateArticle(keyword, apiKey) {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });

  const prompt = `You are an expert journalist and blogger writing for "${SITE_NAME}", a tech, business, and lifestyle magazine.
Write a comprehensive, SEO-optimized blog article about: "${keyword}"

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
- Title must be engaging and include the main topic/keyword naturally
- Body must be informative, practical, and authoritative
- Use examples, statistics, and actionable advice
- Professional editorial tone matching TG Daily / Forbes / Wired
- No placeholder text, produce a finished publish-ready piece`;

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

function buildMarkdownFile(data, publishDate) {
  const coverImage = randomItem(COVER_IMAGES);
  const tags = Array.isArray(data.tags) ? data.tags : [];

  const frontmatter = `---
title: "${data.title.replace(/"/g, '\\"')}"
date: "${publishDate}"
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
    const gitCmdPath = path.join(process.env.LOCALAPPDATA || '', 'Programs', 'Git', 'cmd');
    if (fs.existsSync(gitCmdPath) && !process.env.PATH.includes(gitCmdPath)) {
      process.env.PATH = `${process.env.PATH};${gitCmdPath}`;
    }

    console.log('\n  📦 Committing and pushing to GitHub...');
    execSync('git add -A', { cwd: ROOT, stdio: 'inherit', env: process.env });
    const msg = `ai: schedule ${filenames.length} article(s) (every 2 days) — ${filenames.join(', ')}`;
    execSync(`git commit -m "${msg}"`, { cwd: ROOT, stdio: 'inherit', env: process.env });
    execSync('git push', { cwd: ROOT, stdio: 'inherit', env: process.env });
    console.log('  ✅ Pushed to GitHub! Vercel updated.');
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

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error(`
❌ GEMINI_API_KEY environment variable not set!

Set it before running:
  $env:GEMINI_API_KEY = "your-api-key"
`);
    process.exit(1);
  }

  console.log(`\n🚀 BonusRadar AI Auto-Scheduler`);
  console.log(`   Scheduling 1 article every 2 days for ${keywords.length} topic(s)...\n`);

  const startDateStr = getNextScheduleStart();
  console.log(`   📅 Queue starting date: ${startDateStr}\n`);

  const published = [];
  let scheduleIndex = 0;

  for (const keyword of keywords) {
    try {
      const pubDate = scheduledDate(startDateStr, scheduleIndex);
      const data = await generateArticle(keyword, apiKey);

      const slug = data.slug ? slugify(data.slug) : slugify(data.title);
      const filename = `${slug}.md`;
      const filepath = path.join(POSTS_DIR, filename);

      if (fs.existsSync(filepath)) {
        console.log(`  ⚠️  Skipping "${keyword}" — file already exists: ${filename}\n`);
        continue;
      }

      const markdown = buildMarkdownFile(data, pubDate);
      fs.writeFileSync(filepath, markdown, 'utf8');

      console.log(`  ✅ Scheduled for: ${pubDate}`);
      console.log(`     File:     ${filename}`);
      console.log(`     Title:    ${data.title}`);
      console.log(`     Category: ${data.category}`);
      console.log(`     Tags:     ${(data.tags || []).join(', ')}\n`);

      published.push({ filename, title: data.title, date: pubDate });
      scheduleIndex++;
    } catch (err) {
      console.error(`  ❌ Failed for "${keyword}": ${err.message}\n`);
    }
  }

  if (published.length === 0) {
    console.log('⚠️  No new articles were scheduled.');
    return;
  }

  console.log(`\n📅 Schedule Summary (1 article every 2 days):`);
  published.forEach(p => console.log(`   • [${p.date}] ${p.title} (${p.filename})`));

  // Push to GitHub
  gitPush(published.map(p => p.filename));

  console.log(`
🎉 All done! Articles are scheduled in your repository.
Each article will automatically go live on its scheduled date.
`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
