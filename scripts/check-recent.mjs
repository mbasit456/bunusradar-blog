import fs from 'fs';
import path from 'path';

const dir = 'content/posts';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

console.log('--- RECENT POSTS (OCT 15 & 16) ---');
for (const f of files) {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const d = content.match(/^date:\s*"?([^"\r\n]+)"?/m);
  const cat = content.match(/^category:\s*"?([^"\r\n]+)"?/m);
  const t = content.match(/^title:\s*"?([^"\r\n]+)"?/m);
  if (d && (d[1].startsWith('2026-10-15') || d[1].startsWith('2026-10-16'))) {
    console.log(`${d[1]} | [${cat ? cat[1] : 'No Category'}] | ${t ? t[1] : f}`);
  }
}
