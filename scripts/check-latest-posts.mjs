import fs from 'fs';
import path from 'path';

const dir = 'content/posts';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));

const today = new Date().toISOString().split('T')[0];
console.log(`Current system date is: ${today}`);

const posts = files.map(f => {
  const c = fs.readFileSync(path.join(dir, f), 'utf8');
  const dm = c.match(/^date:\s*"([^"]+)"/m);
  const tm = c.match(/^title:\s*"([^"]+)"/m);
  const cm = c.match(/^category:\s*"([^"]+)"/m);
  const im = c.match(/^coverImage:\s*"([^"]+)"/m);
  return {
    file: f,
    date: dm ? dm[1] : '',
    title: tm ? tm[1] : f,
    category: cm ? cm[1] : '',
    coverImage: im ? im[1] : ''
  };
});

posts.sort((a, b) => b.date.localeCompare(a.date));

console.log('\nTop 10 Most Recent Articles in Repository:');
posts.slice(0, 10).forEach(p => {
  console.log(`[${p.date}] (${p.category}) ${p.title}`);
  console.log(`   File: ${p.file}`);
  console.log(`   Image: ${p.coverImage}\n`);
});

const todayPosts = posts.filter(p => p.date.startsWith(today));
console.log(`\nArticles published for today (${today}): ${todayPosts.length}`);
todayPosts.forEach(p => {
  console.log(`- ${p.title} (${p.file})`);
});
