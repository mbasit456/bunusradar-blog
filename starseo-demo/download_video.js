const https = require('https');
const fs = require('fs');

const file = fs.createWriteStream('assets/images/h4-video.mp4');
https.get('https://themexriver.com/wp/avista/h4-video.mp4', {
  headers: { 'User-Agent': 'Mozilla/5.0' }
}, res => {
  res.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Saved h4-video.mp4:', fs.statSync('assets/images/h4-video.mp4').size);
  });
}).on('error', err => console.error(err));
