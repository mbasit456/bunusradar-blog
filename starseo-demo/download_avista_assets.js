const https = require('https');
const fs = require('fs');
const path = require('path');

const files = [
  { url: 'https://themexriver.com/wp/avista/wp-content/themes/avista/assets/css/bootstrap.min.css', dest: 'assets/css/bootstrap.min.css' },
  { url: 'https://themexriver.com/wp/avista/wp-content/themes/avista/assets/css/animate-min.css', dest: 'assets/css/animate-min.css' },
  { url: 'https://themexriver.com/wp/avista/wp-content/themes/avista/assets/css/avista-core.css', dest: 'assets/css/avista-core.css' },
  { url: 'https://themexriver.com/wp/avista/wp-content/themes/avista/assets/css/fontawesome-min.css', dest: 'assets/css/fontawesome-min.css' },
  { url: 'https://themexriver.com/wp/avista/wp-content/plugins/avista-core/assets/css/flaticon-avista.css', dest: 'assets/css/flaticon-avista.css' },
  { url: 'https://themexriver.com/wp/avista/wp-content/themes/avista/assets/js/lenis.min.js', dest: 'assets/js/lenis.min.js' },
  { url: 'https://themexriver.com/wp/avista/wp-content/themes/avista/assets/js/gsap.min.js', dest: 'assets/js/gsap.min.js' },
  { url: 'https://themexriver.com/wp/avista/wp-content/themes/avista/assets/js/scrollTrigger.min.js', dest: 'assets/js/scrollTrigger.min.js' },
  { url: 'https://themexriver.com/wp/avista/wp-content/themes/avista/assets/js/cursor.js', dest: 'assets/js/cursor.js' },
  { url: 'https://themexriver.com/wp/avista/wp-content/uploads/2025/11/h4-circle-text.webp', dest: 'assets/images/h4-circle-text.webp' },
  { url: 'https://themexriver.com/wp/avista/wp-content/uploads/2025/11/s4-illus.webp', dest: 'assets/images/s4-illus.webp' },
  { url: 'https://themexriver.com/wp/avista/wp-content/uploads/2025/10/author-1.webp', dest: 'assets/images/author-1.webp' },
  { url: 'https://themexriver.com/wp/avista/wp-content/uploads/2025/10/author-2.webp', dest: 'assets/images/author-2.webp' },
  { url: 'https://themexriver.com/wp/avista/wp-content/uploads/2025/10/author-3.webp', dest: 'assets/images/author-3.webp' },
  { url: 'https://themexriver.com/wp/avista/wp-content/uploads/2025/10/author-4.webp', dest: 'assets/images/author-4.webp' },
  { url: 'https://themexriver.com/wp/avista/wp-content/uploads/2025/11/p4-img-1.webp', dest: 'assets/images/p4-img-1.webp' },
  { url: 'https://themexriver.com/wp/avista/wp-content/uploads/2025/11/p4-img-2.webp', dest: 'assets/images/p4-img-2.webp' }
];

['assets', 'assets/css', 'assets/js', 'assets/images'].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

function download(item) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(item.dest);
    https.get(item.url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
      if (res.statusCode !== 200) {
        console.error(`Failed ${item.url}: ${res.statusCode}`);
        return resolve();
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Saved: ${item.dest} (${fs.statSync(item.dest).size} bytes)`);
        resolve();
      });
    }).on('error', err => {
      console.error(`Error ${item.url}:`, err.message);
      resolve();
    });
  });
}

(async () => {
  for (const f of files) {
    await download(f);
  }
  console.log('All downloads done!');
})();
