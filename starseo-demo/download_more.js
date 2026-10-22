const https = require('https');
const fs = require('fs');

const files = [
  { url: 'https://themexriver.com/wp/avista/wp-content/themes/avista/assets/js/avista-custom.js', dest: 'assets/js/avista-custom.js' },
  { url: 'https://themexriver.com/wp/avista/wp-content/themes/avista/assets/js/avista-core.js', dest: 'assets/js/avista-core.js' },
  { url: 'https://themexriver.com/wp/avista/wp-content/themes/avista/assets/js/SplitText.min.js', dest: 'assets/js/SplitText.min.js' },
  { url: 'https://themexriver.com/wp/avista/wp-content/themes/avista/assets/js/customEase.min.js', dest: 'assets/js/customEase.min.js' },
  { url: 'https://themexriver.com/wp/avista/wp-content/themes/avista/assets/js/jquery.marquee.min.js', dest: 'assets/js/jquery.marquee.min.js' },
  { url: 'https://themexriver.com/wp/avista/wp-content/themes/avista/assets/js/swiper.min.js', dest: 'assets/js/swiper.min.js' },
  { url: 'https://themexriver.com/wp/avista/wp-content/themes/avista/assets/css/swiper.min.css', dest: 'assets/css/swiper.min.css' }
];

function download(item) {
  return new Promise(resolve => {
    const file = fs.createWriteStream(item.dest);
    https.get(item.url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Saved: ${item.dest} (${fs.statSync(item.dest).size} bytes)`);
        resolve();
      });
    }).on('error', err => resolve());
  });
}

(async () => {
  for (const f of files) await download(f);
  console.log('Done!');
})();
