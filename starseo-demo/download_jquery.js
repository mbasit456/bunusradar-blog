const https = require('https');
const fs = require('fs');

const file = fs.createWriteStream('assets/js/jquery.min.js');
https.get('https://code.jquery.com/jquery-3.7.1.min.js', res => {
  res.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Saved jQuery 3.7.1:', fs.statSync('assets/js/jquery.min.js').size);
  });
});
