const fs = require('fs');
const zlib = require('zlib');

function createPNG(width, height, colorGenerator) {
  const lineLength = 1 + width * 3;
  const rawData = Buffer.alloc(lineLength * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * lineLength;
    rawData[rowOffset] = 0;
    for (let x = 0; x < width; x++) {
      const [r, g, b] = colorGenerator(x, y, width, height);
      const pixelOffset = rowOffset + 1 + x * 3;
      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
    }
  }

  const compressedData = zlib.deflateSync(rawData);
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 2; // RGB
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  function makeChunk(type, data) {
    const typeBuf = Buffer.from(type, 'ascii');
    const lengthBuf = Buffer.alloc(4);
    lengthBuf.writeUInt32BE(data.length, 0);
    const crcBuf = Buffer.alloc(4);
    const crc = crc32(Buffer.concat([typeBuf, data]));
    crcBuf.writeUInt32BE(crc, 0);
    return Buffer.concat([lengthBuf, typeBuf, data, crcBuf]);
  }

  function crc32(buf) {
    let crc = 0 ^ (-1);
    for (let i = 0; i < buf.length; i++) {
      crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xFF];
    }
    return (crc ^ (-1)) >>> 0;
  }

  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
    }
    table[i] = c;
  }

  return Buffer.concat([
    signature,
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', compressedData),
    makeChunk('IEND', Buffer.alloc(0))
  ]);
}

// Generate high-tech dark neon aesthetic
const png = createPNG(1200, 900, (x, y, w, h) => {
  // Top nav bar: 0 - 80px
  if (y < 80) {
    return [7, 9, 14]; // #07090e
  }
  // Neon Accent Bar
  if (y >= 80 && y < 84) {
    // Gradient from cyan [0, 242, 254] to violet [99, 102, 241]
    const factor = x / w;
    return [
      Math.round(0 + factor * 99),
      Math.round(242 - factor * 140),
      Math.round(254 - factor * 13)
    ];
  }
  
  // Radial glow center around (600, 320)
  const dx = x - 600;
  const dy = y - 320;
  const dist = Math.sqrt(dx * dx + dy * dy);

  // Bento card 1 (left): x 120..540, y 480..820
  if (x >= 120 && x <= 540 && y >= 480 && y <= 820) {
    if (x === 120 || x === 540 || y === 480 || y === 820) return [0, 242, 254]; // neon cyan border
    return [16, 23, 38];
  }

  // Bento card 2 (center-right): x 580..1080, y 480..820
  if (x >= 580 && x <= 1080 && y >= 480 && y <= 820) {
    if (x === 580 || x === 1080 || y === 480 || y === 820) return [99, 102, 241]; // violet border
    return [16, 23, 38];
  }

  // Scanner Bar in hero: x 350..850, y 360..410
  if (x >= 350 && x <= 850 && y >= 360 && y <= 410) {
    if (x === 350 || x === 850 || y === 360 || y === 410) return [0, 242, 254];
    return [13, 17, 26];
  }

  // Background with subtle mesh glow
  if (dist < 400) {
    const intensity = (1 - dist / 400);
    return [
      Math.round(7 + intensity * 35),
      Math.round(9 + intensity * 35),
      Math.round(14 + intensity * 80)
    ];
  }

  return [5, 7, 13]; // deep space dark
});

fs.writeFileSync('wordpress-theme/gravity-seo-agency/screenshot.png', png);
console.log('Gravity SEO Agency screenshot.png created!');
