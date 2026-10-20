import https from 'https';

const PINGS = [
  'https://www.google.com/ping?sitemap=https://bunusradar.site/sitemap.xml',
  'https://www.google.com/ping?sitemap=https://bunusradar.site/sitemap-news.xml',
  'https://www.bing.com/ping?sitemap=https://bunusradar.site/sitemap.xml',
];

export async function pingSearchEngines() {
  console.log('📡 Pinging Google and Bing sitemaps for rapid crawling...');
  for (const url of PINGS) {
    try {
      await new Promise((resolve) => {
        https.get(url, (res) => {
          console.log(`  • Pinged ${new URL(url).hostname} -> Status ${res.statusCode}`);
          resolve(res.statusCode);
        }).on('error', (e) => {
          console.log(`  • Ping to ${new URL(url).hostname} skipped: ${e.message}`);
          resolve(null);
        });
      });
    } catch {}
  }
}

if (process.argv[1] && process.argv[1].endsWith('ping-search-engines.mjs')) {
  pingSearchEngines().then(() => process.exit(0));
}
