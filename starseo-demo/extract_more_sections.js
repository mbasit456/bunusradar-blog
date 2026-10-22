const fs = require('fs');
const html = fs.readFileSync('avista_dump.html', 'utf8');

function showSection(name, length = 1500) {
  const idx = html.indexOf(name);
  if (idx !== -1) {
    console.log(`\n=================== ${name} ===================`);
    console.log(html.substring(idx - 40, idx + length));
  }
}

showSection('as-home-4-logo-fixed', 600);
showSection('as-marquee-text-4-area', 1000);
showSection('as-services-4-area', 2000);
showSection('as-faqs-4-area', 1200);
showSection('as-partner-4-area', 800);
showSection('as-contact-4-area', 1200);
showSection('as-marquee-5-area', 800);
