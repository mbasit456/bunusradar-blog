const fs = require('fs');
const js = fs.readFileSync('assets/js/avista-core.js', 'utf8');

function search(term) {
  let idx = 0;
  console.log(`\n=== SEARCH: ${term} ===`);
  while ((idx = js.indexOf(term, idx)) !== -1) {
    console.log(`Found at ${idx}:`);
    console.log(js.substring(Math.max(0, idx - 100), Math.min(js.length, idx + 300)));
    idx += term.length;
    if (idx > js.length) break;
  }
}

search('lenis');
search('wa_title_spilt_1');
search('portfolio1_pin');
search('as-services-4');
search('marquee');
