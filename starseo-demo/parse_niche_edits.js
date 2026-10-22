const https = require('https');

https.get('https://www.starseo78.com/niche-edit-backlinks/', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    let idx = 0;
    while ((idx = data.indexOf('gw-go-col-inner', idx)) !== -1) {
      const chunk = data.substring(idx, idx + 600);
      const text = chunk.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').replace(/&#36;/g, '$').trim();
      console.log('--- NICHE EDIT COL ---');
      console.log(text);
      idx += 600;
    }
  });
});
