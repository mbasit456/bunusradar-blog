const https = require('https');

function test(url) {
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
    let buf = '';
    res.on('data', c => buf += c);
    res.on('end', () => console.log(url, res.statusCode, buf.length));
  });
}

test('https://themexriver.com/wp/avista/wp-content/themes/avista/assets/css/avista-core.css');
test('https://themexriver.com/wp/avista/wp-content/themes/avista/style.css');
test('https://themexriver.com/wp/avista/h4-video.mp4');
