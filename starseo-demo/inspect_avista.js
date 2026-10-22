const https = require('https');
const fs = require('fs');

https.get('https://themexriver.com/wp/avista/home-03/', {
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
}, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('avista_dump.html', data);
    console.log('Saved avista_dump.html, length:', data.length);
    
    // Find stylesheets
    const cssLinks = [...data.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["']/gi)].map(m => m[1]);
    console.log('CSS Links (first 10):', cssLinks.slice(0, 10));

    // Find main JS
    const jsLinks = [...data.matchAll(/<script[^>]+src=["']([^"']+)["']/gi)].map(m => m[1]);
    console.log('JS Links (first 10):', jsLinks.slice(0, 10));

    // Look for hero sections or main elements
    const sectionTags = [...data.matchAll(/<section[^>]*class=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]);
    console.log('Section classes:', sectionTags);

    // Look for images
    const images = [...data.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map(m => m[1]);
    console.log('Images (sample):', images.slice(0, 15));
  });
}).on('error', err => console.error(err));
