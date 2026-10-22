const https = require('https');
const fs = require('fs');

const pages = [
  '/guest-post-service/',
  '/niche-edit-backlinks/',
  '/foreign-link-placements/',
  '/white-hat-link-building/',
  '/links-with-guaranteed-traffic-increase/',
  '/wikipedia-backlink-service/',
  '/premium-press-release/',
  '/edu-backlinks/',
  '/gmb-verified-listing/',
  '/gmb-accelerated-seo/',
  '/high-quality-local-citations/',
  '/mini-networks/',
  '/seo-plans/'
];

function fetchPage(p) {
  return new Promise((resolve) => {
    https.get('https://www.starseo78.com' + p, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const rawPrices = data.match(/\$\s*\d+[\d,]*/g) || [];
        const cleanPrices = [...new Set(rawPrices.map(x => x.replace(/\s+/g, '')))];
        
        // Find GoPricing or WooCommerce tables
        const tableMatches = [];
        const colRegex = /class="[^"]*(?:gw-go-col|pricing_table|gt3_price_item)[^"]*"[\s\S]*?<\/div>\s*<\/div>/gi;
        
        // Also extract h1, h2, h3
        const headings = (data.match(/<h[1234][^>]*>([\s\S]*?)<\/h[1234]>/gi) || [])
          .map(h => h.replace(/<[^>]+>/g, '').trim())
          .filter(h => h.length > 2 && !h.includes('&laquo;') && !h.includes('&raquo;'));

        resolve({
          page: p,
          statusCode: res.statusCode,
          prices: cleanPrices,
          headings: headings.slice(0, 12)
        });
      });
    }).on('error', (err) => resolve({ page: p, error: err.message }));
  });
}

async function run() {
  for (const page of pages) {
    const res = await fetchPage(page);
    console.log(`\n========================================`);
    console.log(`PAGE: ${res.page} (${res.statusCode || res.error})`);
    console.log(`PRICES FOUND:`, res.prices);
    console.log(`HEADINGS:`, res.headings);
  }
}

run();
