const fs = require('fs');
const html = fs.readFileSync('avista_dump.html', 'utf8');

const heroStart = html.indexOf('as-hero-4-area');
const heroEnd = html.indexOf('as-portfolio-4-area');

console.log(html.substring(heroStart - 50, heroEnd));
