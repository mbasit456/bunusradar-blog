import fs from 'fs';
import path from 'path';

const dir = 'content/posts';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
const imageMap = new Map();

for (const f of files) {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const match = content.match(/^coverImage:\s*"?([^"\r\n]+)"?/m);
  const img = match ? match[1].trim() : 'NONE';
  if (!imageMap.has(img)) imageMap.set(img, []);
  imageMap.get(img).push(f);
}

console.log(`Total posts: ${files.length}`);
console.log(`Unique images: ${imageMap.size}`);

let duplicateCount = 0;
for (const [img, list] of imageMap.entries()) {
  if (list.length > 1) {
    duplicateCount += list.length;
    console.log(`\nUsed by ${list.length} posts: ${img}`);
    list.forEach(p => console.log(`   • ${p}`));
  }
}
console.log(`\nTotal posts sharing duplicates: ${duplicateCount}`);
