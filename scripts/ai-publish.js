#!/usr/bin/env node
/**
 * AI Article Publisher for BunusRadar Blog
 * =========================================
 * Usage:
 *   node scripts/ai-publish.js                  -> Publishes next 3 articles from keywords.json (1 day worth)
 *   node scripts/ai-publish.js --count=6        -> Publishes next 6 articles (2 days worth: 3 daily, 4 hours apart)
 *   node scripts/ai-publish.js "keyword1" ...   -> Publishes specified keywords into the 3-daily schedule
 *
 * Schedule: 3 articles daily, separated by 4 hours:
 *   Slot 1: 08:00:00Z
 *   Slot 2: 12:00:00Z (+4 hours)
 *   Slot 3: 16:00:00Z (+4 hours)
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const POSTS_DIR = path.join(ROOT, 'content', 'posts');
const KEYWORDS_FILE = path.join(__dirname, 'keywords.json');

// ─── CONFIG ───────────────────────────────────────────────────────────────────

const SITE_NAME = 'BunusRadar';
const AUTHOR = 'BunusRadar Editorial';
const DAILY_SLOTS = ['08:00:00Z', '12:00:00Z', '16:00:00Z'];

const COVER_IMAGES = [
  'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop',
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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getApiKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;
  const envFiles = ['.env.local', '.env'];
  for (const envFile of envFiles) {
    const p = path.join(ROOT, envFile);
    if (fs.existsSync(p)) {
      const content = fs.readFileSync(p, 'utf8');
      const match = content.match(/^GEMINI_API_KEY=(.+)$/m);
      if (match) return match[1].trim();
    }
  }
  return null;
}

/**
 * Returns map of date (YYYY-MM-DD) -> Array of filled slots ('08:00:00Z', etc.)
 */
function getExistingScheduleMap() {
  if (!fs.existsSync(POSTS_DIR)) return new Map();

  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  const scheduleMap = new Map();

  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
      const match = content.match(/^date:\s*"?([^"\r\n]+)"?/m);
      if (match) {
        const raw = match[1].trim();
        const datePart = raw.split('T')[0];
        const timePart = raw.includes('T') ? raw.split('T')[1] : null;

        if (!scheduleMap.has(datePart)) {
          scheduleMap.set(datePart, []);
        }
        scheduleMap.get(datePart).push(timePart || '08:00:00Z');
      }
    } catch {}
  }

  return scheduleMap;
}

/**
 * Generates an array of N consecutive slots (3 daily, 4 hours difference: 08:00, 12:00, 16:00 UTC)
 * filling any available slots starting from today.
 */
function allocateNextSlots(count) {
  const scheduleMap = getExistingScheduleMap();
  const slots = [];
  const curr = new Date();
  // Format curr to YYYY-MM-DD
  let cursor = new Date(Date.UTC(curr.getUTCFullYear(), curr.getUTCMonth(), curr.getUTCDate()));

  while (slots.length < count) {
    const dateStr = cursor.toISOString().split('T')[0];
    const filledToday = scheduleMap.get(dateStr) || [];

    for (const slotTime of DAILY_SLOTS) {
      if (slots.length >= count) break;
      // If today doesn't have this slot filled yet, allocate it
      if (!filledToday.includes(slotTime)) {
        slots.push(`${dateStr}T${slotTime}`);
        filledToday.push(slotTime);
        scheduleMap.set(dateStr, filledToday);
      }
    }

    // Move to next day
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  return slots;
}

/**
 * Loads keywords list from keywords.json and finds ones not yet covered in existing posts.
 */
function getUnusedKeywords(requestedCount) {
  if (!fs.existsSync(KEYWORDS_FILE)) {
    throw new Error(`Keywords file not found at ${KEYWORDS_FILE}`);
  }

  const allKeywords = JSON.parse(fs.readFileSync(KEYWORDS_FILE, 'utf8'));
  const existingSlugs = fs.existsSync(POSTS_DIR)
    ? fs.readdirSync(POSTS_DIR).map(f => f.replace(/\.mdx?$/, ''))
    : [];

  const existingTitles = [];
  if (fs.existsSync(POSTS_DIR)) {
    const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
    for (const f of files) {
      const c = fs.readFileSync(path.join(POSTS_DIR, f), 'utf8');
      const m = c.match(/^title:\s*"([^"]+)"/m);
      if (m) existingTitles.push(m[1].toLowerCase());
    }
  }

  const unused = [];
  for (const kw of allKeywords) {
    const s = slugify(kw);
    const kwLower = kw.toLowerCase();
    const alreadyExists = existingSlugs.some(slug => slug.includes(s) || s.includes(slug)) ||
                          existingTitles.some(title => title.includes(kwLower));
    if (!alreadyExists) {
      unused.push(kw);
      if (unused.length >= requestedCount) break;
    }
  }

  return unused;
}

// ─── ARTICLE GENERATION VIA GEMINI 3.6 FLASH ──────────────────────────────────

async function generateArticle(keyword, apiKey, attempt = 1) {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: 'gemini-3.6-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      maxOutputTokens: 8192,
      temperature: 0.7,
    },
  });

  const prompt = `You are an expert journalist and authoritative writer writing for "${SITE_NAME}", a high-quality publication covering Technology, Artificial Intelligence, Business & Growth, Productivity, and Lifestyle.

Write an in-depth, original, SEO-optimized blog article about: "${keyword}"

STRICT OUTPUT FORMAT — Return ONLY a valid JSON object matching this schema:
{
  "title": "Engaging, click-worthy article title containing the keyword naturally (55-70 chars)",
  "slug": "url-friendly-slug-with-hyphens",
  "excerpt": "Compelling 2-3 sentence SEO meta description (150-160 chars)",
  "category": "ONE of: Technology | Artificial Intelligence | Business & Growth | Productivity | Lifestyle",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "readingTime": "estimated reading time like '7 min read'",
  "body": "Full article in markdown (1300-1800 words). Use ## for H2 headings, ### for H3. Include an engaging intro, 4-6 detailed sections with actionable insights, bullet points/tables where helpful, and a thoughtful conclusion. NO frontmatter, just the body content."
}

Content Guidelines:
- High editorial quality, practical takeaways, and structured data.
- Naturally include the keyword "${keyword}" in the title, first paragraph, and within subheadings.
- If relevant (e.g. buying guides, comparison keywords, pet food, financial calculators), include comparison markdown tables.
- Professional, engaging tone matching Wired, TechCrunch, or Healthline.`;

  console.log(`  ✍️  Generating: "${keyword}" (Attempt ${attempt})...`);

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    const cleaned = text.replace(/^```json\s*/i, '').replace(/\s*```$/, '').trim();
    return JSON.parse(cleaned);
  } catch (err) {
    if (attempt < 5) {
      const delay = attempt * 5000;
      console.log(`  ⚠️  Demand spike/error on attempt ${attempt} (${err.message.split('\n')[0]}). Retrying in ${delay / 1000}s...`);
      await sleep(delay);
      return generateArticle(keyword, apiKey, attempt + 1);
    }
    throw err;
  }
}

// ─── MARKDOWN FILE BUILDER ───────────────────────────────────────────────────

function buildMarkdownFile(data, publishTimestamp) {
  const coverImage = randomItem(COVER_IMAGES);
  const tags = Array.isArray(data.tags) ? data.tags : [];

  const frontmatter = `---
title: "${data.title.replace(/"/g, '\\"')}"
date: "${publishTimestamp}"
excerpt: "${data.excerpt.replace(/"/g, '\\"')}"
category: "${data.category}"
tags: [${tags.map(t => `"${t}"`).join(', ')}]
author: "${AUTHOR}"
coverImage: "${coverImage}"
readingTime: "${data.readingTime || '7 min read'}"
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
    const msg = `ai: schedule ${filenames.length} article(s) (3 daily, 4h intervals)`;
    execSync(`git commit -m "${msg}"`, { cwd: ROOT, stdio: 'inherit', env: process.env });
    execSync('git push origin main', { cwd: ROOT, stdio: 'inherit', env: process.env });
    console.log('  ✅ Pushed to GitHub! Vercel updated.');
  } catch (err) {
    console.error('  ❌ Git push failed:', err.message);
  }
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  let count = 3; // Default: 3 articles (1 day)
  let explicitKeywords = [];

  for (const arg of args) {
    if (arg.startsWith('--count=')) {
      count = parseInt(arg.split('=')[1], 10) || 3;
    } else if (!arg.startsWith('--')) {
      explicitKeywords.push(arg);
    }
  }

  let keywordsToPublish = [];
  if (explicitKeywords.length > 0) {
    keywordsToPublish = explicitKeywords;
  } else {
    keywordsToPublish = getUnusedKeywords(count);
  }

  if (keywordsToPublish.length === 0) {
    console.error('❌ No available keywords found to publish!');
    process.exit(1);
  }

  const apiKey = getApiKey();
  if (!apiKey) {
    console.error('❌ GEMINI_API_KEY is missing! Set it in your environment or .env.local');
    process.exit(1);
  }
  console.log(`\n🚀 BunusRadar AI Auto-Scheduler (3 Articles Daily, 4h Intervals)`);
  console.log(`   Preparing ${keywordsToPublish.length} article(s)...\n`);

  const allocatedSlots = allocateNextSlots(keywordsToPublish.length);
  const published = [];

  for (let i = 0; i < keywordsToPublish.length; i++) {
    const keyword = keywordsToPublish[i];
    const pubTimestamp = allocatedSlots[i];

    try {
      const data = await generateArticle(keyword, apiKey);

      const slug = data.slug ? slugify(data.slug) : slugify(data.title);
      const filename = `${slug}.md`;
      const filepath = path.join(POSTS_DIR, filename);

      if (fs.existsSync(filepath)) {
        console.log(`  ⚠️  File already exists: ${filename}, skipping...\n`);
        continue;
      }

      const markdown = buildMarkdownFile(data, pubTimestamp);
      fs.writeFileSync(filepath, markdown, 'utf8');

      console.log(`  ✅ Scheduled for: ${pubTimestamp}`);
      console.log(`     File:     ${filename}`);
      console.log(`     Title:    ${data.title}`);
      console.log(`     Category: ${data.category}\n`);

      published.push({ filename, title: data.title, timestamp: pubTimestamp });

      // Delay to avoid hitting rate limits
      await sleep(3000);
    } catch (err) {
      console.error(`  ❌ Failed for "${keyword}": ${err.message}\n`);
    }
  }

  if (published.length === 0) {
    console.log('⚠️  No new articles were generated.');
    return;
  }

  console.log(`\n📅 Scheduled Output (${published.length} articles):`);
  published.forEach(p => console.log(`   • [${p.timestamp}] ${p.title}`));

  gitPush(published.map(p => p.filename));

  console.log(`\n🎉 Success! All articles scheduled with 4-hour intervals.`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
