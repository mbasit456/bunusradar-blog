const fs = require('fs');
const html = fs.readFileSync('avista_dump.html', 'utf8');

function extractSection(name) {
  const idx = html.indexOf(name);
  if (idx !== -1) {
    console.log(`\n=== FOUND ${name} at ${idx} ===`);
    console.log(html.substring(idx - 50, idx + 1200));
  } else {
    console.log(`NOT FOUND: ${name}`);
  }
}

extractSection('as-hero-4-area');
extractSection('as-portfolio-4-area');
extractSection('as-about-4-area');
extractSection('as-services-4-area');
extractSection('as-projects-4-area');
extractSection('as-testimonial-4-area');
