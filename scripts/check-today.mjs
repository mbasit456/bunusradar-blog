import fs from 'fs';
import path from 'path';

const dir = 'content/posts';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
const today = '2026-10-15';

console.log(`Checking articles for: ${today}`);
const matching = [];
for (const f of files) {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const match = content.match(/^date:\s*"?([^"\r\n]+)"?/m);
  if (match && match[1].startsWith(today)) {
    matching.push({ file: f, date: match[1] });
  }
}

matching.forEach(m => console.log(`- [${m.date}] ${m.file}`));
console.log(`Total: ${matching.length} articles found for today.`);
