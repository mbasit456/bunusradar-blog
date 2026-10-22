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

function fetchRaw(p) {
  return new Promise((resolve) => {
    https.get('https://www.starseo78.com' + p, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ page: p, html: data });
      });
    }).on('error', (err) => resolve({ page: p, error: err.message }));
  });
}

async function run() {
  for (const p of pages) {
    const { page, html } = await fetchRaw(p);
    if (!html) continue;

    // Search for pricing or packages block
    console.log(`\n======================================================`);
    console.log(`PAGE: ${page}`);

    // Find GoPricing tables or Elementor price tables
    // Look for all text blocks containing '$' or 'Price' or 'Pack'
    const priceBlocks = [];
    const regex = /(?:<div[^>]*class="[^"]*(?:go-pricing|gw-go|pricing|gt3_price|elementor-price)[^"]*"[^>]*>[\s\S]*?<\/div>)/gi;
    
    // Simple text search for packages
    const lines = html.split('\n');
    const relevant = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.includes('woocommerce-Price-amount') || line.includes('gw-go-price') || line.includes('gt3_item_cost') || line.includes('$') || line.toLowerCase().includes('package') || line.toLowerCase().includes('order now')) {
        const cleaned = line.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        if (cleaned.length > 0 && cleaned.length < 200 && !cleaned.includes('wp-content')) {
          relevant.push(cleaned);
        }
      }
    }

    console.log(`Matches (${relevant.length}):`);
    console.log(relevant.slice(0, 30).join('\n'));
  }
}

run();
