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
import { submitToIndexNow } from './submit-indexnow.mjs';
import { pingSearchEngines } from './ping-search-engines.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const POSTS_DIR = path.join(ROOT, 'content', 'posts');
const KEYWORDS_FILE = path.join(__dirname, 'keywords.json');
const PRIORITY_KEYWORDS_FILE = path.join(__dirname, 'priority-keywords.json');
const AI_KEYWORDS_FILE = path.join(__dirname, 'ai-keywords.json');
const OPENAI_KEYWORDS_FILE = path.join(__dirname, 'openai-keywords.json');

// ─── CONFIG ───────────────────────────────────────────────────────────────────

const SITE_NAME = 'BunusRadar';
const AUTHOR = 'BunusRadar Editorial';
const DAILY_SLOTS = ['06:00:00Z', '10:00:00Z', '14:00:00Z', '18:00:00Z'];

const CATEGORY_IMAGE_POOLS = {
  'Artificial Intelligence': [
    'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1676299081847-824916de030a?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1674027444485-cec3da58eef4?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1633412802994-5c058f151b66?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop',
  ],
  'Technology': [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop',
  ],
  'Business & Growth': [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop',
  ],
  'Productivity': [
    'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop',
  ],
  'Lifestyle': [
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=800&auto=format&fit=crop',
  ],
};

const USED_IMAGES_IN_SESSION = new Set();

function getUsedCoverImages() {
  const used = new Set();
  if (!fs.existsSync(POSTS_DIR)) return used;
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  for (const f of files) {
    try {
      const content = fs.readFileSync(path.join(POSTS_DIR, f), 'utf8');
      const match = content.match(/^coverImage:\s*"([^"]+)"/m);
      if (match) {
        const raw = match[1].trim();
        used.add(raw);
        used.add(raw.split('?')[0]);
      }
    } catch {}
  }
  return used;
}

function getUniqueCoverImage(category, slug) {
  const existingUsed = getUsedCoverImages();
  const allUsed = new Set([...existingUsed, ...USED_IMAGES_IN_SESSION]);

  const pool = CATEGORY_IMAGE_POOLS[category] || CATEGORY_IMAGE_POOLS['Technology'];
  const unusedInPool = pool.filter(url => !allUsed.has(url) && !allUsed.has(url.split('?')[0]));

  if (unusedInPool.length > 0) {
    const selected = randomItem(unusedInPool);
    USED_IMAGES_IN_SESSION.add(selected);
    USED_IMAGES_IN_SESSION.add(selected.split('?')[0]);
    return selected;
  }

  // Fallback to unused image in any category pool
  const allImages = Object.values(CATEGORY_IMAGE_POOLS).flat();
  const unusedGeneral = allImages.filter(url => !allUsed.has(url) && !allUsed.has(url.split('?')[0]));
  if (unusedGeneral.length > 0) {
    const selected = randomItem(unusedGeneral);
    USED_IMAGES_IN_SESSION.add(selected);
    USED_IMAGES_IN_SESSION.add(selected.split('?')[0]);
    return selected;
  }

  // Fallback with unique slug signature to ensure zero collision
  const seed = slug ? slug.replace(/[^a-z0-9]/g, '') : Date.now().toString();
  const fallbackUrl = `https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&sig=${seed}`;
  USED_IMAGES_IN_SESSION.add(fallbackUrl);
  return fallbackUrl;
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function slugify(text) {
  const ascii = text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .substring(0, 80);

  if (ascii.length >= 2) return ascii;

  const clean = text
    .replace(/\s+/g, '-')
    .replace(/[\\/:*?"<>|]/g, '')
    .trim()
    .substring(0, 80);

  return clean.length > 0 ? clean : `post-${Date.now()}`;
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const BUILTIN_KEY_B64 = 'QVEuQWI4Uk42SUZqdFBYbXdRT2k2LVdPY05OWTlsYjVTVjZrRmVIU0VxT2FxSzVVcHV3Q3c=';

function getApiKey() {
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim()) return process.env.GEMINI_API_KEY.trim();
  const envFiles = ['.env.local', '.env'];
  for (const envFile of envFiles) {
    const p = path.join(ROOT, envFile);
    if (fs.existsSync(p)) {
      const content = fs.readFileSync(p, 'utf8');
      const match = content.match(/^GEMINI_API_KEY=(.+)$/m);
      if (match) return match[1].trim();
    }
  }
  try {
    return Buffer.from(BUILTIN_KEY_B64, 'base64').toString('utf-8');
  } catch {
    return null;
  }
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

const OFF_TOPIC_TERMS = [
  'dog', 'dogs', 'cat', 'cats', 'puppy', 'veterinar', 'rabies', 'pyometra', 'benadryl',
  'gabapentin', 'solensia', 'cytopoint', 'doxycycline', 'ringworm', 'diarrhea',
  'tequila', 'whiskey', 'scotch', 'bourbon', 'wine', 'cocktail', 'gin', 'champagne',
  'sneakers', 'necklace', 'hair', 'blouse', 'pants', 'blanket', 'sofa', 'mattress',
  'crib', 'sleep sack', 'baby', 'newborn', 'tooth fairy', 'aquarium fish', 'invisalign',
  'barbecue', 'grill', 'accent chair', 'swivel chair', 'upholstered bed', 'pokemon',
  'vikings', 'ugly love', 'maya angelou', 'sancerre', 'lapostolle', 'pinot noir', 'chardonnay'
];

function isOffTopicKeyword(kw) {
  const lower = kw.toLowerCase();
  return OFF_TOPIC_TERMS.some(term => lower.includes(term));
}

/**
 * Loads keywords list from a JSON file and finds ones not yet covered in existing posts.
 */
function getUnusedFrom(filePath, requestedCount) {
  if (!fs.existsSync(filePath)) return [];

  const allKeywords = JSON.parse(fs.readFileSync(filePath, 'utf8'));
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
    if (path.basename(filePath) === 'keywords.json' && isOffTopicKeyword(kw)) {
      continue;
    }
    const s = slugify(kw);
    const kwLower = kw.toLowerCase();
    const alreadyExists = (s.length >= 3 && existingSlugs.some(slug => slug.includes(s) || s.includes(slug))) ||
                          existingTitles.some(title => title.includes(kwLower));
    if (!alreadyExists && !unused.includes(kw)) {
      unused.push(kw);
      if (unused.length >= requestedCount) break;
    }
  }

  return unused;
}

/**
 * Returns prioritized keywords: Priority queue first, then OpenAI keywords, then AI keywords, then general.
 */
function getDailyKeywords(totalCount) {
  // 1. Highest priority: user-specified priority keywords
  const priorityKw = getUnusedFrom(PRIORITY_KEYWORDS_FILE, totalCount);
  if (priorityKw.length >= totalCount) {
    return priorityKw;
  }
  const remainingAfterPriority = totalCount - priorityKw.length;

  // 2. Secondary priority: low-competition, high-search-volume OpenAI keywords
  const openAiKw = getUnusedFrom(OPENAI_KEYWORDS_FILE, remainingAfterPriority);
  if (priorityKw.length + openAiKw.length >= totalCount) {
    return [...priorityKw, ...openAiKw];
  }
  const remaining = totalCount - priorityKw.length - openAiKw.length;

  // 3. Tertiary priority: general AI keywords
  const aiKw = getUnusedFrom(AI_KEYWORDS_FILE, remaining);
  if (priorityKw.length + openAiKw.length + aiKw.length >= totalCount) {
    return [...priorityKw, ...openAiKw, ...aiKw];
  }
  const remainingGeneral = totalCount - priorityKw.length - openAiKw.length - aiKw.length;

  // 4. Fallback: general keywords
  const genKw = getUnusedFrom(KEYWORDS_FILE, remainingGeneral);
  return [...priorityKw, ...openAiKw, ...aiKw, ...genKw];
}

// ─── ARTICLE GENERATION VIA GEMINI ─────────────────────────────────────────────

const MODEL_CANDIDATES = [
  'gemini-3.5-flash-lite',
  'gemini-3.5-flash',
  'gemini-flash-latest',
];

function safeJsonParse(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (initialErr) {
    try {
      const sanitized = jsonString.replace(/[\u0000-\u001F\u007F-\u009F]/g, (char) => {
        if (char === '\n') return '\\n';
        if (char === '\r') return '\\r';
        if (char === '\t') return '\\t';
        return '';
      });
      return JSON.parse(sanitized);
    } catch {
      throw initialErr;
    }
  }
}

async function generateArticle(keyword, apiKey, availableArticles = [], attempt = 1) {
  const currentModelName = MODEL_CANDIDATES[(attempt - 1) % MODEL_CANDIDATES.length];
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: currentModelName,
    generationConfig: {
      responseMimeType: 'application/json',
      maxOutputTokens: 8192,
      temperature: 0.7,
    },
  });

  const sampleArticles = availableArticles.slice(0, 10).map(a => `- [${a.title}](/blog/${a.slug})`).join('\n');

  const prompt = `You are a senior tech journalist and industry analyst writing for "${SITE_NAME}" (https://bunusradar.site), a digital publication dedicated exclusively to Technology, Artificial Intelligence, Business & Growth, Productivity, and high-tech Lifestyle & Future trends.

CRITICAL EDITORIAL RULE - ZERO GENERAL/FLUFF CONTENT:
Do NOT write generic lifestyle articles, superficial buyer guides, casual consumer reviews, pet advice, medical remedies, or entertainment gossip.
Every single article MUST be authoritatively framed and analyzed through the lens of one of BunusRadar's official core categories:
1. Technology: Software architectures, digital infrastructure, cloud platforms, developer tools, hardware innovations, enterprise data systems, or cybersecurity.
2. Artificial Intelligence: Large language models, neural networks, autonomous agents, enterprise AI adoption, prompt engineering, or intelligent automation workflows.
3. Business & Growth: Digital business strategies, startups, SaaS metrics, e-commerce infrastructure, monetization models, digital marketing, market dynamics, and financial analysis.
4. Productivity: Workflow optimization, digital productivity tools, time management architectures, automation stacks, operational efficiency, and workplace systems.
5. Lifestyle: High-tech modern living, remote work culture, distributed team operations, digital nomadism, ergonomic workspace design, and future societal tech trends.

HOW TO FRAME THE KEYWORD "${keyword}":
Even if "${keyword}" sounds like a company, tool, or product, you MUST examine it from a business, technological, architectural, or productivity perspective:
- Explain the business model, market strategy, software stack, or workflow efficiency.
- Deliver actionable insights, strategic takeaways, and structured analysis matching Harvard Business Review, MIT Technology Review, Wired, or TechCrunch.
- Naturally include the keyword "${keyword}" in the title, first paragraph, and within subheadings.

STRICT INTERNAL LINKING RULES:
1. NEVER USE HASH LINKS (#, #section, javascript:void(0), placeholder URLs).
2. Every internal link must point ONLY to real pages from this list of verified BunusRadar articles or category pillars:
${sampleArticles}
Category pillars:
- [Artificial Intelligence](/category/ai)
- [Technology](/category/technology)
- [Business & Growth](/category/business)
- [Productivity](/category/productivity)
- [Lifestyle](/category/lifestyle)
3. Include 3 to 5 natural, contextually relevant internal links using descriptive anchor text (e.g. "[autonomous AI agents](/blog/autonomous-ai-agents-software-development)").
4. NEVER use generic anchor text like "click here" or "read more".
5. NEVER invent URLs. If a relevant destination is not available, leave text unlinked.

GENERATIVE ENGINE OPTIMIZATION (GEO) & GOOGLE AI OVERVIEW REQUIREMENTS:
To ensure Google's Gemini and search AI Overviews cite this article as a primary source:
1. Direct Answer Capsule: Immediately after the introduction, write a 40-50 word standalone, factual direct answer to the core question/topic.
2. Key Takeaways: Include a clear bulleted list of 3-5 high-density insights.
3. Structured Data Table: Include at least one markdown table (| Feature / Dimension | Details / Benchmark | Analysis |) comparing key aspects.
4. FAQ Section: End with a "## Frequently Asked Questions" section containing 3 to 4 question subheadings ending with a question mark (e.g., "### What are the main benefits of ...?"), each followed by a concise 2-sentence direct answer.

STRICT OUTPUT FORMAT - Return ONLY a valid JSON object matching this schema:
{
  "title": "Engaging, click-worthy article title containing the keyword naturally (55-70 chars)",
  "slug": "url-friendly-slug-with-hyphens",
  "excerpt": "Compelling 2-3 sentence SEO meta description (150-160 chars)",
  "category": "ONE of: Technology | Artificial Intelligence | Business & Growth | Productivity | Lifestyle",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "readingTime": "estimated reading time like '7 min read'",
  "body": "Full article in markdown (1300-1800 words). Use ## for H2 headings, ### for H3. Include an engaging intro, Direct Answer Capsule, Key Takeaways, 4-6 detailed analytical sections, at least one markdown comparison table, and a dedicated Frequently Asked Questions section with 3-4 questions ending in '?'. NO frontmatter, just the body content."
}`;

  console.log(`  ✍️  Generating: "${keyword}" (Attempt ${attempt})...`);

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    const cleaned = text.replace(/^```json\s*/i, '').replace(/\s*```$/, '').trim();
    return safeJsonParse(cleaned);
  } catch (err) {
    if (attempt < 5) {
      const delay = attempt * 5000;
      console.log(`  ⚠️  Demand spike/error on attempt ${attempt} (${err.message.split('\n')[0]}). Retrying in ${delay / 1000}s...`);
      await sleep(delay);
      return generateArticle(keyword, apiKey, availableArticles, attempt + 1);
    }
    throw err;
  }
}

// ─── MARKDOWN FILE BUILDER WITH STRICT LINK VALIDATION ───────────────────────

function buildMarkdownFile(data, publishTimestamp, currentSlug) {
  const coverImage = getUniqueCoverImage(data.category, currentSlug);
  const tags = Array.isArray(data.tags) ? data.tags : [];

  const safeTitle = data.title.replace(/\u2014/g, ' - ');
  const safeExcerpt = data.excerpt.replace(/\u2014/g, ' - ');
  let body = data.body.replace(/\u2014/g, ' - ').trim();

  // STRICT RULE 1 & 12: Zero tolerance for hash or placeholder links
  body = body.replace(/\[([^\]]+)\]\(#[^)]*\)/g, '$1');
  body = body.replace(/\[([^\]]+)\]\(\s*\)/g, '$1');
  body = body.replace(/\[([^\]]+)\]\(javascript:[^)]*\)/gi, '$1');
  body = body.replace(/<a\s+[^>]*href=["']#[^"']*["'][^>]*>(.*?)<\/a>/gi, '$1');

  // Verify internal links point to real existing slugs
  const validSlugs = fs.existsSync(POSTS_DIR)
    ? new Set(fs.readdirSync(POSTS_DIR).map(f => f.replace(/\.mdx?$/, '')))
    : new Set();

  body = body.replace(/\[([^\]]+)\]\((\/blog\/([a-z0-9-]+))\)/gi, (match, anchor, fullUrl, slug) => {
    // Rule 10: Never link to self
    if (slug === currentSlug) return anchor;
    // Rule 2 & 13: Only link if destination actually exists
    if (!validSlugs.has(slug)) return anchor;
    return match;
  });

  const frontmatter = `---
title: "${safeTitle.replace(/"/g, '\\"')}"
date: "${publishTimestamp}"
excerpt: "${safeExcerpt.replace(/"/g, '\\"')}"
category: "${data.category}"
tags: [${tags.map(t => `"${t}"`).join(', ')}]
author: "${AUTHOR}"
coverImage: "${coverImage}"
readingTime: "${data.readingTime || '7 min read'}"
featured: false
---`;

  return `${frontmatter}\n\n${body}\n`;
}

// ─── GIT PUSH ────────────────────────────────────────────────────────────────

function gitPush(filenames) {
  try {
    const gitCmdPath = path.join(process.env.LOCALAPPDATA || '', 'Programs', 'Git', 'cmd');
    if (fs.existsSync(gitCmdPath) && !process.env.PATH.includes(gitCmdPath)) {
      process.env.PATH = `${process.env.PATH};${gitCmdPath}`;
    }

    console.log('\n  🔄 Regenerating public/llms-full.txt...');
    try {
      execSync('node scripts/generate-llms-full.cjs', { cwd: ROOT, stdio: 'inherit' });
    } catch (e) {
      console.warn('  ⚠️ Could not regenerate llms-full:', e.message);
    }

    console.log('\n  📦 Committing and pushing to GitHub...');
    try {
      execSync('git config user.name', { stdio: 'ignore' });
    } catch {
      execSync('git config user.name "github-actions[bot]"', { stdio: 'inherit' });
      execSync('git config user.email "github-actions[bot]@users.noreply.github.com"', { stdio: 'inherit' });
    }

    execSync('git add -A', { cwd: ROOT, stdio: 'inherit', env: process.env });
    const status = execSync('git status --porcelain', { cwd: ROOT }).toString().trim();
    if (!status) {
      console.log('  ℹ️ No changes detected to commit.');
      return;
    }

    const msg = `ai: schedule ${filenames.length} article(s) (4 daily)`;
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
  let count = 4; // Default: 4 articles daily (100% from ai-keywords.json)
  let explicitKeywords = [];

  for (const arg of args) {
    if (arg.startsWith('--count=')) {
      count = parseInt(arg.split('=')[1], 10) || 4;
    } else if (!arg.startsWith('--')) {
      explicitKeywords.push(arg);
    }
  }

  let keywordsToPublish = [];
  if (explicitKeywords.length > 0) {
    keywordsToPublish = explicitKeywords;
  } else {
    keywordsToPublish = getDailyKeywords(count);
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
  console.log(`\n🚀 BunusRadar AI Auto-Scheduler (4 Articles Daily: 3 General + 1 AI/Tech)`);
  console.log(`   Preparing ${keywordsToPublish.length} article(s)...\n`);

  const allocatedSlots = allocateNextSlots(keywordsToPublish.length);
  const published = [];

  for (let i = 0; i < keywordsToPublish.length; i++) {
    const keyword = keywordsToPublish[i];
    const pubTimestamp = allocatedSlots[i];

    try {
      const availableArticles = fs.readdirSync(POSTS_DIR)
        .filter(f => f.endsWith('.md'))
        .map(f => ({ slug: f.replace(/\.md$/, ''), title: f.replace(/-/g, ' ').replace(/\.md$/, '') }));

      const data = await generateArticle(keyword, apiKey, availableArticles);

      const slug = data.slug ? slugify(data.slug) : slugify(data.title);
      const filename = `${slug}.md`;
      const filepath = path.join(POSTS_DIR, filename);

      if (fs.existsSync(filepath)) {
        console.log(`  ⚠️  File already exists: ${filename}, skipping...\n`);
        continue;
      }

      const markdown = buildMarkdownFile(data, pubTimestamp, slug);
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

  // Programmatic rapid indexing notifications
  try {
    const urls = published.map(p => `https://bunusradar.site/blog/${p.filename.replace(/\.mdx?$/, '')}`);
    await submitToIndexNow(urls);
    await pingSearchEngines();
  } catch (notifyErr) {
    console.warn('  ⚠️ Search engine notification notice:', notifyErr.message);
  }

  console.log(`\n🎉 Success! All articles scheduled with 4-hour intervals.`);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
