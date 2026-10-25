const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function crc32(buf) {
  let table = crc32.table;
  if (!table) {
    table = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let k = 0; k < 8; k++) {
        c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      }
      table[i] = c >>> 0;
    }
    crc32.table = table;
  }

  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xFF];
  }
  return (crc ^ (-1)) >>> 0;
}

function makeChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lengthBuf = Buffer.alloc(4);
  lengthBuf.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.alloc(4);
  const crc = crc32(Buffer.concat([typeBuf, data]));
  crcBuf.writeUInt32BE(crc, 0);
  return Buffer.concat([lengthBuf, typeBuf, data, crcBuf]);
}

function createRGBA_PNG(width, height, pixelFn) {
  const lineLength = 1 + width * 4;
  const rawData = Buffer.alloc(lineLength * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * lineLength;
    rawData[rowOffset] = 0; // Filter: None
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = pixelFn(x, y, width, height);
      const pixelOffset = rowOffset + 1 + x * 4;
      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
      rawData[pixelOffset + 3] = a !== undefined ? a : 255;
    }
  }

  const compressedData = zlib.deflateSync(rawData, { level: 9 });
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // 8-bit depth
  ihdr[9] = 6; // Color type: 6 (RGBA)
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    signature,
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', compressedData),
    makeChunk('IEND', Buffer.alloc(0))
  ]);
}

const outDir = path.join(process.cwd(), 'public', 'logos');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 1. Generate Square Logo (1000x1000)
console.log('Generating square logo (1000x1000)...');
const squareBuf = createRGBA_PNG(1000, 1000, (x, y, w, h) => {
  // Dark navy gradient background
  const t = (x + y) / (w + h);
  const bgR = Math.round(20 + t * 7);  // #14234f to #1b2e67
  const bgG = Math.round(35 + t * 11);
  const bgB = Math.round(79 + t * 24);

  // Center emblem badge (800x800 rounded square centered)
  const cx = 500, cy = 500;
  const dx = Math.abs(x - cx);
  const dy = Math.abs(y - cy);

  // Radar arcs around top right of emblem
  const dist = Math.sqrt((x - 680) ** 2 + (y - 320) ** 2);
  const angle = Math.atan2(y - 320, x - 680);
  const inRadarSector = angle > -Math.PI * 0.9 && angle < -Math.PI * 0.1;

  // Gold color: 249, 180, 77 (#f9b44d)
  if (inRadarSector) {
    if (Math.abs(dist - 260) < 14) return [249, 180, 77, 240];
    if (Math.abs(dist - 190) < 12) return [249, 180, 77, 200];
    if (Math.abs(dist - 120) < 10) return [249, 180, 77, 180];
    if (dist < 22) return [249, 180, 77, 255]; // Radar center dot
  }

  // Draw Letter 'B' (left) and 'R' (right)
  // 'B' bounding box: x in [220, 440], y in [340, 680]
  // 'R' bounding box: x in [480, 760], y in [340, 680]
  
  // Letter B:
  // Stem: x in [220, 275], y in [340, 680]
  if (x >= 220 && x <= 275 && y >= 340 && y <= 680) return [255, 255, 255, 255];
  // Top bar:
  if (x >= 260 && x <= 390 && y >= 340 && y <= 395) return [255, 255, 255, 255];
  // Mid bar:
  if (x >= 260 && x <= 390 && y >= 485 && y <= 540) return [255, 255, 255, 255];
  // Bottom bar:
  if (x >= 260 && x <= 390 && y >= 625 && y <= 680) return [255, 255, 255, 255];
  // Top loop curve:
  const topLoopDist = Math.sqrt((x - 390) ** 2 + (y - 440) ** 2);
  if (topLoopDist <= 100 && topLoopDist >= 45 && x >= 370) return [255, 255, 255, 255];
  // Bottom loop curve:
  const botLoopDist = Math.sqrt((x - 390) ** 2 + (y - 582) ** 2);
  if (botLoopDist <= 100 && botLoopDist >= 45 && x >= 370) return [255, 255, 255, 255];

  // Letter R:
  // Stem: x in [480, 535], y in [340, 680]
  if (x >= 480 && x <= 535 && y >= 340 && y <= 680) return [255, 255, 255, 255];
  // Top bar:
  if (x >= 520 && x <= 650 && y >= 340 && y <= 395) return [255, 255, 255, 255];
  // Mid bar:
  if (x >= 520 && x <= 650 && y >= 485 && y <= 540) return [255, 255, 255, 255];
  // Top loop curve:
  const rLoopDist = Math.sqrt((x - 650) ** 2 + (y - 440) ** 2);
  if (rLoopDist <= 100 && rLoopDist >= 45 && x >= 630) return [255, 255, 255, 255];
  // Leg: diagonal from (580, 520) to (740, 680)
  if (x >= 560 && x <= 750 && y >= 510 && y <= 680) {
    const legLineDist = Math.abs((y - 510) - (x - 560) * (170 / 170));
    if (legLineDist < 30) return [255, 255, 255, 255];
  }

  // Bottom gold underline accent under BR
  if (x >= 220 && x <= 760 && y >= 710 && y <= 726) return [249, 180, 77, 255];

  // Small subtitle dots:
  if (x >= 220 && x <= 236 && y >= 750 && y <= 766) return [249, 180, 77, 255];

  return [bgR, bgG, bgB, 255];
});
fs.writeFileSync(path.join(outDir, 'square-logo.png'), squareBuf);
console.log('Saved square logo to public/logos/square-logo.png');

// 2. Generate Rectangular Logo (800x200) with Transparent Background
console.log('Generating rectangular logo (800x200)...');
const rectBuf = createRGBA_PNG(800, 200, (x, y, w, h) => {
  // Left Badge: x in [30, 170], y in [30, 170]
  if (x >= 30 && x <= 170 && y >= 30 && y <= 170) {
    // Rounded corners
    const cornerR = 24;
    const nearLeft = x < 30 + cornerR;
    const nearRight = x > 170 - cornerR;
    const nearTop = y < 30 + cornerR;
    const nearBot = y > 170 - cornerR;

    if (nearLeft && nearTop) {
      if (Math.hypot(x - (30 + cornerR), y - (30 + cornerR)) > cornerR) return [0, 0, 0, 0];
    }
    if (nearRight && nearTop) {
      if (Math.hypot(x - (170 - cornerR), y - (30 + cornerR)) > cornerR) return [0, 0, 0, 0];
    }
    if (nearLeft && nearBot) {
      if (Math.hypot(x - (30 + cornerR), y - (170 - cornerR)) > cornerR) return [0, 0, 0, 0];
    }
    if (nearRight && nearBot) {
      if (Math.hypot(x - (170 - cornerR), y - (170 - cornerR)) > cornerR) return [0, 0, 0, 0];
    }

    // Badge interior: Navy Blue #1b2e67
    // Inside badge 'BR':
    // B in [50, 95], y in [60, 140]
    // R in [105, 150], y in [60, 140]
    if (x >= 52 && x <= 62 && y >= 60 && y <= 140) return [255, 255, 255, 255];
    if (x >= 60 && x <= 85 && ((y >= 60 && y <= 70) || (y >= 95 && y <= 105) || (y >= 130 && y <= 140))) return [255, 255, 255, 255];
    if (x >= 75 && Math.hypot(x - 82, y - 82) <= 22 && Math.hypot(x - 82, y - 82) >= 11) return [255, 255, 255, 255];
    if (x >= 75 && Math.hypot(x - 82, y - 118) <= 22 && Math.hypot(x - 82, y - 118) >= 11) return [255, 255, 255, 255];

    if (x >= 105 && x <= 115 && y >= 60 && y <= 140) return [255, 255, 255, 255];
    if (x >= 110 && x <= 135 && ((y >= 60 && y <= 70) || (y >= 95 && y <= 105))) return [255, 255, 255, 255];
    if (x >= 125 && Math.hypot(x - 132, y - 82) <= 22 && Math.hypot(x - 132, y - 82) >= 11) return [255, 255, 255, 255];
    if (x >= 118 && x <= 148 && y >= 100 && y <= 140 && Math.abs((y - 100) - (x - 118) * 1.3) < 8) return [255, 255, 255, 255];

    // Radar dot inside badge:
    if (Math.hypot(x - 148, y - 52) < 5) return [249, 180, 77, 255];

    return [27, 46, 103, 255];
  }

  // Word 'BUNUS' in #1b2e67 (x: 200 to 470, y: 60 to 130)
  // Word 'RADAR' in #f9b44d (x: 480 to 760, y: 60 to 130)
  // Subtitle 'MORE THAN THE NEWS' in #64748b (x: 205 to 550, y: 145 to 160)

  // Subtitle underline bar:
  if (x >= 200 && x <= 760 && y >= 165 && y <= 170) return [249, 180, 77, 255];

  // Letters rendering:
  // We can render crisp blocks or solid brand styling:
  // Navy: [27, 46, 103, 255]
  // Gold: [249, 180, 77, 255]

  // B (200-245)
  if (x >= 200 && x <= 245 && y >= 60 && y <= 130) {
    if (x <= 212 || (x <= 235 && (y <= 72 || (y >= 90 && y <= 100) || y >= 118))) return [27, 46, 103, 255];
    if (x > 225 && Math.hypot(x - 232, y - 81) <= 20 && Math.hypot(x - 232, y - 81) >= 8) return [27, 46, 103, 255];
    if (x > 225 && Math.hypot(x - 232, y - 109) <= 20 && Math.hypot(x - 232, y - 109) >= 8) return [27, 46, 103, 255];
  }

  // U (255-300)
  if (x >= 255 && x <= 300 && y >= 60 && y <= 130) {
    if ((x <= 267 || x >= 288) && y <= 120) return [27, 46, 103, 255];
    if (y >= 118 && x >= 265 && x <= 290) return [27, 46, 103, 255];
  }

  // N (310-355)
  if (x >= 310 && x <= 355 && y >= 60 && y <= 130) {
    if (x <= 322 || x >= 343) return [27, 46, 103, 255];
    if (Math.abs((y - 60) - (x - 322) * (70 / 23)) < 8) return [27, 46, 103, 255];
  }

  // U (365-410)
  if (x >= 365 && x <= 410 && y >= 60 && y <= 130) {
    if ((x <= 377 || x >= 398) && y <= 120) return [27, 46, 103, 255];
    if (y >= 118 && x >= 375 && x <= 400) return [27, 46, 103, 255];
  }

  // S (420-465)
  if (x >= 420 && x <= 465 && y >= 60 && y <= 130) {
    if (y <= 72 || (y >= 90 && y <= 100) || y >= 118) return [27, 46, 103, 255];
    if (x <= 432 && y <= 95) return [27, 46, 103, 255];
    if (x >= 453 && y >= 95) return [27, 46, 103, 255];
  }

  // RADAR in Gold #f9b44d:
  // R (485-530)
  if (x >= 485 && x <= 530 && y >= 60 && y <= 130) {
    if (x <= 497 || (x <= 520 && (y <= 72 || (y >= 90 && y <= 100)))) return [249, 180, 77, 255];
    if (x > 510 && Math.hypot(x - 518, y - 81) <= 20 && Math.hypot(x - 518, y - 81) >= 8) return [249, 180, 77, 255];
    if (x >= 505 && Math.abs((y - 95) - (x - 505) * 1.5) < 8) return [249, 180, 77, 255];
  }

  // A (540-585)
  if (x >= 540 && x <= 585 && y >= 60 && y <= 130) {
    const midX = 562.5;
    const dLeft = Math.abs((x - 540) - (y - 130) * (-22.5 / 70));
    const dRight = Math.abs((x - 585) - (y - 130) * (22.5 / 70));
    if (dLeft < 7 || dRight < 7) return [249, 180, 77, 255];
    if (y >= 98 && y <= 108 && x >= 550 && x <= 575) return [249, 180, 77, 255];
  }

  // D (595-640)
  if (x >= 595 && x <= 640 && y >= 60 && y <= 130) {
    if (x <= 607 || (x <= 625 && (y <= 72 || y >= 118))) return [249, 180, 77, 255];
    if (x > 615 && Math.hypot(x - 620, y - 95) <= 35 && Math.hypot(x - 620, y - 95) >= 23) return [249, 180, 77, 255];
  }

  // A (650-695)
  if (x >= 650 && x <= 695 && y >= 60 && y <= 130) {
    const dLeft = Math.abs((x - 650) - (y - 130) * (-22.5 / 70));
    const dRight = Math.abs((x - 695) - (y - 130) * (22.5 / 70));
    if (dLeft < 7 || dRight < 7) return [249, 180, 77, 255];
    if (y >= 98 && y <= 108 && x >= 660 && x <= 685) return [249, 180, 77, 255];
  }

  // R (705-750)
  if (x >= 705 && x <= 750 && y >= 60 && y <= 130) {
    if (x <= 717 || (x <= 740 && (y <= 72 || (y >= 90 && y <= 100)))) return [249, 180, 77, 255];
    if (x > 730 && Math.hypot(x - 738, y - 81) <= 20 && Math.hypot(x - 738, y - 81) >= 8) return [249, 180, 77, 255];
    if (x >= 725 && Math.abs((y - 95) - (x - 725) * 1.5) < 8) return [249, 180, 77, 255];
  }

  // Transparent background
  return [0, 0, 0, 0];
});
fs.writeFileSync(path.join(outDir, 'rectangular-logo.png'), rectBuf);
console.log('Saved rectangular logo to public/logos/rectangular-logo.png');

// 3. Generate Rectangular Logo with White Background (for light-theme requirement if needed)
const rectWhiteBuf = createRGBA_PNG(800, 200, (x, y, w, h) => {
  const [r, g, b, a] = (function() {
    // Left Badge
    if (x >= 30 && x <= 170 && y >= 30 && y <= 170) {
      const cornerR = 24;
      const nearLeft = x < 30 + cornerR;
      const nearRight = x > 170 - cornerR;
      const nearTop = y < 30 + cornerR;
      const nearBot = y > 170 - cornerR;

      if (nearLeft && nearTop && Math.hypot(x - (30 + cornerR), y - (30 + cornerR)) > cornerR) return [255, 255, 255, 255];
      if (nearRight && nearTop && Math.hypot(x - (170 - cornerR), y - (30 + cornerR)) > cornerR) return [255, 255, 255, 255];
      if (nearLeft && nearBot && Math.hypot(x - (30 + cornerR), y - (170 - cornerR)) > cornerR) return [255, 255, 255, 255];
      if (nearRight && nearBot && Math.hypot(x - (170 - cornerR), y - (170 - cornerR)) > cornerR) return [255, 255, 255, 255];

      if (x >= 52 && x <= 62 && y >= 60 && y <= 140) return [255, 255, 255, 255];
      if (x >= 60 && x <= 85 && ((y >= 60 && y <= 70) || (y >= 95 && y <= 105) || (y >= 130 && y <= 140))) return [255, 255, 255, 255];
      if (x >= 75 && Math.hypot(x - 82, y - 82) <= 22 && Math.hypot(x - 82, y - 82) >= 11) return [255, 255, 255, 255];
      if (x >= 75 && Math.hypot(x - 82, y - 118) <= 22 && Math.hypot(x - 82, y - 118) >= 11) return [255, 255, 255, 255];

      if (x >= 105 && x <= 115 && y >= 60 && y <= 140) return [255, 255, 255, 255];
      if (x >= 110 && x <= 135 && ((y >= 60 && y <= 70) || (y >= 95 && y <= 105))) return [255, 255, 255, 255];
      if (x >= 125 && Math.hypot(x - 132, y - 82) <= 22 && Math.hypot(x - 132, y - 82) >= 11) return [255, 255, 255, 255];
      if (x >= 118 && x <= 148 && y >= 100 && y <= 140 && Math.abs((y - 100) - (x - 118) * 1.3) < 8) return [255, 255, 255, 255];

      if (Math.hypot(x - 148, y - 52) < 5) return [249, 180, 77, 255];

      return [27, 46, 103, 255];
    }

    if (x >= 200 && x <= 760 && y >= 165 && y <= 170) return [249, 180, 77, 255];

    // B
    if (x >= 200 && x <= 245 && y >= 60 && y <= 130) {
      if (x <= 212 || (x <= 235 && (y <= 72 || (y >= 90 && y <= 100) || y >= 118))) return [27, 46, 103, 255];
      if (x > 225 && Math.hypot(x - 232, y - 81) <= 20 && Math.hypot(x - 232, y - 81) >= 8) return [27, 46, 103, 255];
      if (x > 225 && Math.hypot(x - 232, y - 109) <= 20 && Math.hypot(x - 232, y - 109) >= 8) return [27, 46, 103, 255];
    }
    // U
    if (x >= 255 && x <= 300 && y >= 60 && y <= 130) {
      if ((x <= 267 || x >= 288) && y <= 120) return [27, 46, 103, 255];
      if (y >= 118 && x >= 265 && x <= 290) return [27, 46, 103, 255];
    }
    // N
    if (x >= 310 && x <= 355 && y >= 60 && y <= 130) {
      if (x <= 322 || x >= 343) return [27, 46, 103, 255];
      if (Math.abs((y - 60) - (x - 322) * (70 / 23)) < 8) return [27, 46, 103, 255];
    }
    // U
    if (x >= 365 && x <= 410 && y >= 60 && y <= 130) {
      if ((x <= 377 || x >= 398) && y <= 120) return [27, 46, 103, 255];
      if (y >= 118 && x >= 375 && x <= 400) return [27, 46, 103, 255];
    }
    // S
    if (x >= 420 && x <= 465 && y >= 60 && y <= 130) {
      if (y <= 72 || (y >= 90 && y <= 100) || y >= 118) return [27, 46, 103, 255];
      if (x <= 432 && y <= 95) return [27, 46, 103, 255];
      if (x >= 453 && y >= 95) return [27, 46, 103, 255];
    }

    // R
    if (x >= 485 && x <= 530 && y >= 60 && y <= 130) {
      if (x <= 497 || (x <= 520 && (y <= 72 || (y >= 90 && y <= 100)))) return [249, 180, 77, 255];
      if (x > 510 && Math.hypot(x - 518, y - 81) <= 20 && Math.hypot(x - 518, y - 81) >= 8) return [249, 180, 77, 255];
      if (x >= 505 && Math.abs((y - 95) - (x - 505) * 1.5) < 8) return [249, 180, 77, 255];
    }
    // A
    if (x >= 540 && x <= 585 && y >= 60 && y <= 130) {
      const dLeft = Math.abs((x - 540) - (y - 130) * (-22.5 / 70));
      const dRight = Math.abs((x - 585) - (y - 130) * (22.5 / 70));
      if (dLeft < 7 || dRight < 7) return [249, 180, 77, 255];
      if (y >= 98 && y <= 108 && x >= 550 && x <= 575) return [249, 180, 77, 255];
    }
    // D
    if (x >= 595 && x <= 640 && y >= 60 && y <= 130) {
      if (x <= 607 || (x <= 625 && (y <= 72 || y >= 118))) return [249, 180, 77, 255];
      if (x > 615 && Math.hypot(x - 620, y - 95) <= 35 && Math.hypot(x - 620, y - 95) >= 23) return [249, 180, 77, 255];
    }
    // A
    if (x >= 650 && x <= 695 && y >= 60 && y <= 130) {
      const dLeft = Math.abs((x - 650) - (y - 130) * (-22.5 / 70));
      const dRight = Math.abs((x - 695) - (y - 130) * (22.5 / 70));
      if (dLeft < 7 || dRight < 7) return [249, 180, 77, 255];
      if (y >= 98 && y <= 108 && x >= 660 && x <= 685) return [249, 180, 77, 255];
    }
    // R
    if (x >= 705 && x <= 750 && y >= 60 && y <= 130) {
      if (x <= 717 || (x <= 740 && (y <= 72 || (y >= 90 && y <= 100)))) return [249, 180, 77, 255];
      if (x > 730 && Math.hypot(x - 738, y - 81) <= 20 && Math.hypot(x - 738, y - 81) >= 8) return [249, 180, 77, 255];
      if (x >= 725 && Math.abs((y - 95) - (x - 725) * 1.5) < 8) return [249, 180, 77, 255];
    }

    return [255, 255, 255, 255]; // White background
  })();
  return [r, g, b, 255];
});
fs.writeFileSync(path.join(outDir, 'rectangular-logo-white.png'), rectWhiteBuf);
console.log('Saved rectangular logo (white bg) to public/logos/rectangular-logo-white.png');
