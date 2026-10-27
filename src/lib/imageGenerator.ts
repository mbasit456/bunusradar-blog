import fs from 'fs';
import path from 'path';
import os from 'os';

export type ImageStyle = 'photorealistic' | 'cinematic' | 'anime' | 'illustration' | '3d' | 'digital-art';
export type AspectRatio = '1:1' | '16:9' | '9:16' | '4:3';

export interface ImageGenerationOptions {
  prompt: string;
  style?: ImageStyle;
  aspectRatio?: AspectRatio;
  seed?: number;
  negativePrompt?: string;
  referenceImage?: string;
}

export interface GeneratedImageResult {
  id: string;
  imageUrl: string;
  localProxyUrl: string;
  width: number;
  height: number;
  seed: number;
  style: ImageStyle;
  aspectRatio: AspectRatio;
  enhancedPrompt: string;
  provider: 'ai-horde' | 'pollinations';
}

const TEMP_IMG_DIR = path.join(os.tmpdir(), 'gravity_generated_images');

function ensureTempDir(): string {
  if (!fs.existsSync(TEMP_IMG_DIR)) {
    fs.mkdirSync(TEMP_IMG_DIR, { recursive: true });
  }
  return TEMP_IMG_DIR;
}

// In-memory cache of generated image buffers
const imageBufferCache = new Map<string, { buffer: Buffer; mimeType: string; createdAt: number }>();

export function getCachedImage(id: string): { buffer: Buffer; mimeType: string } | null {
  const cached = imageBufferCache.get(id);
  if (cached) return cached;

  try {
    const safeId = id.replace(/[^a-zA-Z0-9_-]/g, '');
    const filePath = path.join(TEMP_IMG_DIR, `${safeId}.bin`);
    if (fs.existsSync(filePath)) {
      const buffer = fs.readFileSync(filePath);
      return { buffer, mimeType: 'image/webp' };
    }
  } catch {
    return null;
  }
  return null;
}

export function saveCachedImage(id: string, buffer: Buffer, mimeType = 'image/webp'): void {
  // Prune cache if oversized
  if (imageBufferCache.size > 50) {
    const oldestKey = imageBufferCache.keys().next().value;
    if (oldestKey) imageBufferCache.delete(oldestKey);
  }

  imageBufferCache.set(id, { buffer, mimeType, createdAt: Date.now() });

  try {
    const dir = ensureTempDir();
    const safeId = id.replace(/[^a-zA-Z0-9_-]/g, '');
    fs.writeFileSync(path.join(dir, `${safeId}.bin`), buffer);
  } catch {
    // Disk write fallback
  }
}

// Map aspect ratio to dimensions (multiples of 64 for Stable Diffusion compatibility)
export function getDimensionsForAspectRatio(ratio: AspectRatio = '1:1'): { width: number; height: number } {
  switch (ratio) {
    case '16:9':
      return { width: 768, height: 448 }; // 768 / 448 ~ 1.71
    case '9:16':
      return { width: 448, height: 768 }; // 448 / 768 ~ 0.58
    case '4:3':
      return { width: 704, height: 512 }; // 704 / 512 ~ 1.375
    case '1:1':
    default:
      return { width: 512, height: 512 };
  }
}

// Enhance user prompt with aesthetic directives based on chosen style
export function buildEnhancedPrompt(prompt: string, style: ImageStyle = 'photorealistic'): string {
  const cleanPrompt = prompt
    .replace(/^(\/(image|img|draw|paint)\s*)+/i, '')
    .replace(/^(can you\s+)?(please\s+)?(generate|create|draw|make|paint|render)\s+(an?\s+)?(image|picture|photo|artwork)\s+(of\s+)?/i, '')
    .trim();

  let styleTag = '';
  switch (style) {
    case 'cinematic':
      styleTag = 'cinematic film still, 35mm photograph, dramatic volumetric lighting, anamorphic lens, moody atmosphere, blockbuster color grading, sharp focus, 8k';
      break;
    case 'anime':
      styleTag = 'masterpiece anime aesthetic, Makoto Shinkai style, vibrant luminous colors, clean crisp linework, detailed illustration, expressive lighting';
      break;
    case 'illustration':
      styleTag = 'editorial vector illustration, exquisite graphic art, clean bold shapes, artistic elegance, harmonic palette, highly detailed';
      break;
    case '3d':
      styleTag = '3D render, Pixar Disney character design, Unreal Engine 5 render, raytraced subsurface scattering, global illumination, octane render';
      break;
    case 'digital-art':
      styleTag = 'breathtaking digital art painting, trending on ArtStation, dynamic brushwork, rich lighting, fantasy concept art, high definition';
      break;
    case 'photorealistic':
    default:
      styleTag = 'masterpiece, professional 8k photography, Hasselblad camera, studio lighting, hyper-realistic, intricate fine textures, crisp sharp focus';
      break;
  }

  return `${cleanPrompt}, ${styleTag}`;
}

// Provider 1: AI Horde (Decentralized Open Stable Diffusion cluster with public anonymous key 0000000000)
async function generateViaAiHorde(
  prompt: string,
  width: number,
  height: number,
  seed: number,
  negativePrompt?: string
): Promise<string> {
  const submitRes = await fetch('https://aihorde.net/api/v2/generate/async', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: '0000000000',
      'Client-Agent': 'BunusRadarAI:1.0:github.com',
    },
    body: JSON.stringify({
      prompt: negativePrompt ? `${prompt} ### ${negativePrompt}` : prompt,
      params: {
        width,
        height,
        steps: 25,
        cfg_scale: 7.5,
        seed: seed.toString(),
        sampler_name: 'k_euler_a',
      },
    }),
  });

  if (!submitRes.ok) {
    throw new Error(`AI Horde submit error: ${submitRes.status}`);
  }

  const { id } = await submitRes.json();
  if (!id) throw new Error('No job ID returned from AI Horde');

  // Poll for completion (up to 30 seconds)
  for (let attempt = 0; attempt < 15; attempt++) {
    await new Promise(r => setTimeout(r, 2000));

    const checkRes = await fetch(`https://aihorde.net/api/v2/generate/check/${id}`);
    if (!checkRes.ok) continue;

    const checkData = await checkRes.json();
    if (checkData.done) {
      const statusRes = await fetch(`https://aihorde.net/api/v2/generate/status/${id}`);
      if (!statusRes.ok) throw new Error('Failed to retrieve generation payload');

      const statusData = await statusRes.json();
      const imgUrl = statusData?.generations?.[0]?.img;
      if (imgUrl) return imgUrl;
    }
  }

  throw new Error('AI Horde generation timed out after 30 seconds.');
}

// Provider 2: Pollinations AI (Fast direct keyless synthesis)
async function generateViaPollinations(
  enhancedPrompt: string,
  width: number,
  height: number,
  seed: number
): Promise<string> {
  const encodedPrompt = encodeURIComponent(`${enhancedPrompt} --no watermark, text, signature, low quality`);
  // Scale dimensions for high definition
  const targetWidth = width <= 512 ? width * 2 : width;
  const targetHeight = height <= 512 ? height * 2 : height;
  return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${targetWidth}&height=${targetHeight}&nologo=true&nofeed=true&enhance=false&seed=${seed}`;
}

export async function generateAiImage(options: ImageGenerationOptions): Promise<GeneratedImageResult> {
  const {
    prompt,
    style = 'photorealistic',
    aspectRatio = '1:1',
    negativePrompt = 'watermark, text, signature, blurry, low resolution, bad anatomy, deformed',
  } = options;

  const seed = options.seed || Math.floor(Math.random() * 900000000) + 100000000;
  const { width, height } = getDimensionsForAspectRatio(aspectRatio);
  const enhancedPrompt = buildEnhancedPrompt(prompt, style);
  const id = `img_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

  let finalRemoteUrl = '';
  let providerUsed: 'ai-horde' | 'pollinations' = 'pollinations';

  // Strategy: Try AI Horde first for full decentralized Stable Diffusion generation
  try {
    const hordeUrl = await generateViaAiHorde(enhancedPrompt, width, height, seed, negativePrompt);
    finalRemoteUrl = hordeUrl;
    providerUsed = 'ai-horde';

    // Fetch and cache the buffer locally for instant proxying and downloading
    const imgFetch = await fetch(hordeUrl);
    if (imgFetch.ok) {
      const buf = Buffer.from(await imgFetch.arrayBuffer());
      const mime = imgFetch.headers.get('content-type') || 'image/webp';
      saveCachedImage(id, buf, mime);
    }
  } catch (hordeErr) {
    // Fallback to Pollinations instant direct keyless service
    providerUsed = 'pollinations';
    finalRemoteUrl = await generateViaPollinations(enhancedPrompt, width, height, seed);

    try {
      const pFetch = await fetch(finalRemoteUrl);
      if (pFetch.ok && pFetch.headers.get('content-type')?.includes('image')) {
        const buf = Buffer.from(await pFetch.arrayBuffer());
        const mime = pFetch.headers.get('content-type') || 'image/jpeg';
        saveCachedImage(id, buf, mime);
      }
    } catch {
      // Remote URL still serves directly
    }
  }

  const localProxyUrl = `/api/chat/image?id=${id}`;

  return {
    id,
    imageUrl: finalRemoteUrl,
    localProxyUrl,
    width,
    height,
    seed,
    style,
    aspectRatio,
    enhancedPrompt,
    provider: providerUsed,
  };
}
