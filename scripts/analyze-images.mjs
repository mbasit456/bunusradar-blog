import fs from 'fs';
import path from 'path';

const dir = 'content/posts';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
const imageMap = new Map();

for (const f of files) {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const match = content.match(/^coverImage:\s*"?([^"\r\n]+)"?/m);
  const raw = match ? match[1].trim() : 'NONE';
  const baseImg = raw.split('?')[0];
  if (!imageMap.has(baseImg)) imageMap.set(baseImg, []);
  imageMap.get(baseImg).push({ file: f, fullUrl: raw });
}

console.log(`Total posts: ${files.length}`);
console.log(`Unique base images: ${imageMap.size}`);

let duplicateCount = 0;
for (const [baseImg, list] of imageMap.entries()) {
  if (list.length > 1) {
    duplicateCount += list.length;
    console.log(`\nBase Image used by ${list.length} posts: ${baseImg}`);
    list.forEach(p => console.log(`   • ${p.file} -> ${p.fullUrl}`));
  }
}

console.log(`\nTotal posts sharing duplicates: ${duplicateCount}`);
