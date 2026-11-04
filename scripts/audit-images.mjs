import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'content', 'posts');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

console.log(`Total Posts: ${files.length}\n`);

const seen = new Map();
const list = [];

files.sort().forEach((f, idx) => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const m = content.match(/^coverImage:\s*"([^"]+)"/m);
  const img = m ? m[1].trim() : 'NONE';
  const photoMatch = img.match(/photo-[a-zA-Z0-9-]+/);
  const photoId = photoMatch ? photoMatch[0] : img;
  
  if (!seen.has(photoId)) seen.set(photoId, []);
  seen.get(photoId).push(f);

  list.push({ idx: idx + 1, file: f, photoId, fullUrl: img });
});

list.forEach(item => {
  const dupCount = seen.get(item.photoId).length;
  const flag = dupCount > 1 ? `[REPEAT x${dupCount}]` : '  [UNIQUE] ';
  console.log(`${String(item.idx).padStart(2, ' ')}. ${flag} ${item.file.padEnd(65)} -> ${item.photoId}`);
});

console.log('\n--- Summary of Duplicates ---');
for (const [id, postList] of seen.entries()) {
  if (postList.length > 1) {
    console.log(`\nImage ID ${id} is shared by ${postList.length} articles:`);
    postList.forEach(p => console.log(`  * ${p}`));
  }
}
