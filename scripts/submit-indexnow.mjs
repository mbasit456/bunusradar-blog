import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const POSTS_DIR = path.join(ROOT, 'content', 'posts');

const HOST = 'bunusradar.site';
const KEY = 'e7b92f44105a415a8c4f92d6e38258b1';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

export async function submitToIndexNow(urlsToSubmit = null) {
  let urls = urlsToSubmit;

  if (!urls || urls.length === 0) {
    urls = [
      `https://${HOST}/`,
      `https://${HOST}/latest-publications`,
      `https://${HOST}/research`,
      `https://${HOST}/methodology`,
      `https://${HOST}/category/technology`,
      `https://${HOST}/category/ai`,
      `https://${HOST}/category/business`,
      `https://${HOST}/category/productivity`,
      `https://${HOST}/category/lifestyle`,
    ];

    if (fs.existsSync(POSTS_DIR)) {
      const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
      for (const file of files) {
        const slug = file.replace(/\.mdx?$/, '');
        urls.push(`https://${HOST}/blog/${slug}`);
      }
    }
  }

  console.log(`📡 Submitting ${urls.length} URLs to IndexNow (Bing, Yandex, Seznam)...`);

  const payload = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  });

  return new Promise((resolve) => {
    const req = https.request(
      'https://api.indexnow.org/indexnow',
      {
        method: 'POST',
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': Buffer.byteLength(payload),
        },
      },
      (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          if (res.statusCode === 200 || res.statusCode === 202) {
            console.log(`  ✅ IndexNow submission successful! Status: ${res.statusCode}`);
          } else {
            console.log(`  ⚠️ IndexNow returned status: ${res.statusCode} (${data || 'Submitted'})`);
          }
          resolve(res.statusCode);
        });
      }
    );

    req.on('timeout', () => {
      console.warn('  ⚠️ IndexNow request timed out after 10s');
      req.destroy();
      resolve(null);
    });

    req.on('error', (err) => {
      console.warn('  ⚠️ IndexNow request failed:', err.message);
      resolve(null);
    });

    req.write(payload);
    req.end();
  });
}

// If executed directly from command line
if (process.argv[1] && process.argv[1].endsWith('submit-indexnow.mjs')) {
  submitToIndexNow().then(() => process.exit(0));
}
