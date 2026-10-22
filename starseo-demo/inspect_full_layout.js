const fs = require('fs');
const html = fs.readFileSync('avista_dump.html', 'utf8');

// Find header
const hStart = html.indexOf('<header');
const hEnd = html.indexOf('</header>');
console.log('HEADER:');
console.log(html.substring(hStart, hStart + 1500));

// Find all section class names in order
const re = /<section[^>]*class=["']([^"']+)["']/g;
let m;
console.log('\nALL SECTIONS IN ORDER:');
while ((m = re.exec(html)) !== null) {
  console.log(' - ' + m[1]);
}

// Find footer
const fStart = html.indexOf('<footer');
console.log('\nFOOTER:');
console.log(html.substring(fStart, fStart + 1500));
