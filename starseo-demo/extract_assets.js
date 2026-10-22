const fs = require('fs');
const html = fs.readFileSync('avista_dump.html', 'utf8');

const cssMatches = [...html.matchAll(/href=["']([^"']+\.css[^"']*)["']/g)].map(m => m[1]);
console.log('All CSS:');
cssMatches.forEach(c => console.log(' -', c));

const jsMatches = [...html.matchAll(/src=["']([^"']+\.js[^"']*)["']/g)].map(m => m[1]);
console.log('\nAll JS:');
jsMatches.forEach(j => console.log(' -', j));
