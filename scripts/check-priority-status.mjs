import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const POSTS_DIR = path.join(ROOT, 'content', 'posts');
const PRIORITY_FILE = path.join(__dirname, 'priority-keywords.json');

const priority = JSON.parse(fs.readFileSync(PRIORITY_FILE, 'utf8'));
const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
const slugs = files.map(f => f.replace(/\.md$/, ''));
const titles = files.map(f => {
  const c = fs.readFileSync(path.join(POSTS_DIR, f), 'utf8');
  const m = c.match(/^title:\s*"([^"]+)"/m);
  return m ? m[1].toLowerCase() : '';
});

function slugify(text) {
  const ascii = text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .substring(0, 80);

  if (ascii.length >= 2) return ascii;
  const clean = text.replace(/\s+/g, '-').replace(/[\\/:*?"<>|]/g, '').trim().substring(0, 80);
  return clean.length > 0 ? clean : 'post';
}

console.log('Priority Keywords Queue:');
priority.forEach((kw, idx) => {
  const s = slugify(kw);
  const kwLower = kw.toLowerCase();
  const covered = (s.length >= 3 && slugs.some(slug => slug.includes(s) || s.includes(slug))) ||
                  titles.some(title => title.includes(kwLower));
  console.log(`${idx + 1}. [${covered ? 'PUBLISHED' : 'QUEUED'}] ${kw}`);
});
