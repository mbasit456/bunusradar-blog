const fs = require('fs');
const zlib = require('zlib');

function createPNG(width, height, colorGenerator) {
  // RGB raw scanlines: each line has 1 filter byte (0) followed by width * 3 bytes (R, G, B)
  const lineLength = 1 + width * 3;
  const rawData = Buffer.alloc(lineLength * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * lineLength;
    rawData[rowOffset] = 0; // Filter: None
    for (let x = 0; x < width; x++) {
      const [r, g, b] = colorGenerator(x, y, width, height);
      const pixelOffset = rowOffset + 1 + x * 3;
      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
    }
  }

  const compressedData = zlib.deflateSync(rawData);

  // PNG Header
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR Chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // 8-bit depth
  ihdr[9] = 2; // RGB (truecolor)
  ihdr[10] = 0; // Deflate
  ihdr[11] = 0; // Filter
  ihdr[12] = 0; // Interlace: None

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

  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', compressedData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Generate an elegant 1200x900 preview image
const png = createPNG(1200, 900, (x, y, w, h) => {
  // Top nav bar: 0 - 80px
  if (y < 80) {
    return [17, 24, 39]; // dark slate #111827
  }
  // Accent brand line: 80 - 84px
  if (y >= 80 && y < 84) {
    return [37, 99, 235]; // Royal blue #2563eb
  }
  // Hero section: 84 - 400px
  if (y < 400) {
    // Gradient between #0f172a and #1e293b
    const factor = (y - 84) / 316;
    const r = Math.round(15 + factor * 15);
    const g = Math.round(23 + factor * 18);
    const b = Math.round(42 + factor * 17);
    return [r, g, b];
  }
  // Content background: light slate #f8fafc
  // Draw two preview card boxes:
  // Card 1: x from 100 to 560, y from 440 to 800
  if (x >= 100 && x <= 560 && y >= 440 && y <= 800) {
    // Card border
    if (x === 100 || x === 560 || y === 440 || y === 800) return [226, 232, 240];
    // Card header image: y 441 to 600
    if (y <= 600) return [37, 99, 235]; // vibrant blue
    return [255, 255, 255]; // white surface
  }
  // Card 2: x from 640 to 1100, y from 440 to 800
  if (x >= 640 && x <= 1100 && y >= 440 && y <= 800) {
    if (x === 640 || x === 1100 || y === 440 || y === 800) return [226, 232, 240];
    if (y <= 600) return [139, 92, 246]; // purple accent
    return [255, 255, 255];
  }

  return [248, 250, 252]; // #f8fafc
});

fs.writeFileSync('wordpress-theme/gravity-modern/screenshot.png', png);
console.log('screenshot.png created successfully!');
