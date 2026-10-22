const https = require('https');

const pages = [
  '/guest-post-service/',
  '/foreign-link-placements/',
  '/edu-backlinks/',
  '/gmb-accelerated-seo/',
  '/mini-networks/',
  '/seo-plans/'
];

function fetchRaw(p) {
  return new Promise((resolve) => {
    https.get('https://www.starseo78.com' + p, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ page: p, html: data }));
    }).on('error', (err) => resolve({ page: p, error: err.message }));
  });
}

async function run() {
  for (const p of pages) {
    const { page, html } = await fetchRaw(p);
    if (!html) continue;

    console.log(`\n======================================================`);
    console.log(`PAGE: ${page}`);
    
    // Replace &#36; with $
    const cleanHtml = html.replace(/&#36;/g, '$');
    
    // Look for all pricing blocks, e.g. class containing 'gt3_item_cost' or 'gt3_price' or 'price'
    const matches = cleanHtml.match(/(?:<div[^>]*class="[^"]*(?:gt3_price_item|price_item|pricing)[^"]*"[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>)/gi) || [];
    
    if (matches.length > 0) {
      matches.slice(0, 15).forEach((m, idx) => {
        const text = m.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        console.log(`[Item ${idx + 1}]:`, text);
      });
    } else {
      // Find where '$' appears
      const dollarLines = cleanHtml.split('\n').filter(l => l.includes('$')).map(l => l.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
      console.log('Dollar lines:', dollarLines.slice(0, 20));
    }
  }
}

run();
