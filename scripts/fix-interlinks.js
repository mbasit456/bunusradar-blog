#!/usr/bin/env node
/**
 * fix-interlinks.js
 * Replaces placeholder # links in markdown articles with real /blog/[slug] links.
 * Pattern replaced: [any text](#) or [any text](#anything)
 * Strategy: replace anchor-only links with contextually relevant /blog/[slug] paths
 */

const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, '..', 'content', 'posts');

// Build slug list from all post files
const allFiles = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
const allSlugs = allFiles.map(f => f.replace(/\.md$/, ''));

// Extract title and category from frontmatter for smarter matching
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm = {};
  match[1].split('\n').forEach(line => {
    const [key, ...val] = line.split(':');
    if (key && val.length) fm[key.trim()] = val.join(':').trim().replace(/^["']|["']$/g, '');
  });
  return fm;
}

// Read all post metadata
const posts = allFiles.map(file => {
  const content = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
  const fm = parseFrontmatter(content);
  return {
    slug: file.replace(/\.md$/, ''),
    title: (fm.title || '').toLowerCase(),
    category: (fm.category || '').toLowerCase(),
    tags: (fm.tags || '').toLowerCase(),
  };
});

// Given anchor link text, find the best matching slug from other posts
function findBestSlug(linkText, currentSlug, category) {
  const text = linkText.toLowerCase();
  
  // Exclude current post from candidates
  const candidates = posts.filter(p => p.slug !== currentSlug);
  
  // Score each candidate
  const scored = candidates.map(p => {
    let score = 0;
    const words = text.split(/\s+/).filter(w => w.length > 3);
    words.forEach(word => {
      if (p.slug.includes(word)) score += 3;
      if (p.title.includes(word)) score += 2;
      if (p.tags.includes(word)) score += 1;
    });
    // Bonus for same category
    if (p.category === category) score += 1;
    return { slug: p.slug, score };
  });

  scored.sort((a, b) => b.score - a.score);

  // Return best match if score > 0, otherwise pick a related slug by category
  if (scored[0] && scored[0].score > 0) return scored[0].slug;
  
  // Fallback: same category
  const sameCat = candidates.filter(p => p.category === category);
  if (sameCat.length > 0) return sameCat[Math.floor(Math.random() * sameCat.length)].slug;
  
  // Last resort: first candidate
  return candidates[0]?.slug || allSlugs[0];
}

// Regex to match [link text](#) or [link text](#anchor)
const ANCHOR_LINK_RE = /\[([^\]]+)\]\(#[^)]*\)/g;

let totalFixed = 0;

allFiles.forEach(file => {
  const filePath = path.join(POSTS_DIR, file);
  const currentSlug = file.replace(/\.md$/, '');
  let content = fs.readFileSync(filePath, 'utf8');
  
  const fm = parseFrontmatter(content);
  const category = (fm.category || '').toLowerCase();
  
  // Track replacements used in this file to avoid repeating the same slug consecutively
  const usedSlugs = [];
  let fileFixed = 0;

  const updated = content.replace(ANCHOR_LINK_RE, (match, linkText) => {
    // Find best slug, avoiding most recently used one
    let candidates = posts.filter(p => p.slug !== currentSlug);
    const words = linkText.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    
    const scored = candidates.map(p => {
      let score = 0;
      words.forEach(word => {
        if (p.slug.includes(word)) score += 3;
        if (p.title.includes(word)) score += 2;
        if (p.tags && p.tags.includes(word)) score += 1;
      });
      if (p.category === category) score += 1;
      // Penalize recently used slugs
      const recentIdx = usedSlugs.lastIndexOf(p.slug);
      if (recentIdx >= 0) score -= (usedSlugs.length - recentIdx) * 2;
      return { slug: p.slug, score };
    });
    scored.sort((a, b) => b.score - a.score);
    
    const bestSlug = scored[0]?.slug || allSlugs.find(s => s !== currentSlug) || allSlugs[0];
    usedSlugs.push(bestSlug);
    fileFixed++;
    
    return `[${linkText}](/blog/${bestSlug})`;
  });

  if (fileFixed > 0) {
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`✅ ${file}: fixed ${fileFixed} placeholder link(s)`);
    totalFixed += fileFixed;
  }
});

console.log(`\n🎉 Done! Fixed ${totalFixed} placeholder # links across ${allFiles.length} files.`);
