const https = require('https');

https.get('https://themexriver.com/wp/avista/wp-content/themes/avista/assets/css/avista-custom.css', {
  headers: { 'User-Agent': 'Mozilla/5.0' }
}, res => {
  console.log('Status:', res.statusCode);
  let len = 0;
  res.on('data', chunk => len += chunk.length);
  res.on('end', () => console.log('Total bytes:', len));
});
