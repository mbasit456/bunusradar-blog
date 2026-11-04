import { NextRequest, NextResponse } from 'next/server';
import {
  generateAiImage,
  getCachedImage,
  detectImageStyle,
  detectAspectRatio,
  ImageStyle,
  AspectRatio,
} from '@/lib/imageGenerator';

export const dynamic = 'force-dynamic';
export const maxDuration = 15;

function isAuthorizedRequest(req: NextRequest): boolean {
  const origin = req.headers.get('origin') || '';
  const referer = req.headers.get('referer') || '';
  const host = req.headers.get('host') || '';
  const userAgent = req.headers.get('user-agent') || '';

  if (/(bot|crawler|spider|crawling|python-requests|aiohttp|curl|wget|scrapy|go-http-client)/i.test(userAgent)) {
    return false;
  }

  if (process.env.NODE_ENV === 'production') {
    const isLocalhost = host.includes('localhost') || host.includes('127.0.0.1');
    if (!isLocalhost) {
      const allowedDomain = 'bunusradar.site';
      const matchesOrigin = origin && origin.includes(allowedDomain);
      const matchesReferer = referer && referer.includes(allowedDomain);
      if (!matchesOrigin && !matchesReferer) {
        return false;
      }
    }
  }

  return true;
}

export async function POST(req: NextRequest) {
  if (!isAuthorizedRequest(req)) {
    return NextResponse.json({ error: 'Access forbidden.' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const {
      prompt,
      style = 'photorealistic',
      aspectRatio = '1:1',
      seed,
      negativePrompt,
      referenceImage,
      apiKey,
    } = body;

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return NextResponse.json({ error: 'Prompt is required for image generation.' }, { status: 400 });
    }

    const validStyles: ImageStyle[] = ['photorealistic', 'cinematic', 'anime', 'illustration', '3d', 'digital-art'];
    const chosenStyle: ImageStyle = validStyles.includes(style) && style !== 'photorealistic'
      ? style
      : detectImageStyle(prompt);

    const validRatios: AspectRatio[] = ['1:1', '16:9', '9:16', '4:3'];
    const chosenRatio: AspectRatio = validRatios.includes(aspectRatio) && aspectRatio !== '1:1'
      ? aspectRatio
      : detectAspectRatio(prompt);

    const headerApiKey = req.headers.get('x-api-key') || undefined;
    const effectiveKey = typeof apiKey === 'string' && apiKey.trim() ? apiKey.trim() : headerApiKey;

    const result = await generateAiImage({
      prompt: prompt.trim(),
      style: chosenStyle,
      aspectRatio: chosenRatio,
      seed: typeof seed === 'number' ? seed : undefined,
      negativePrompt: typeof negativePrompt === 'string' ? negativePrompt.trim() : undefined,
      referenceImage,
      apiKey: effectiveKey,
    });

    return NextResponse.json({
      success: true,
      image: result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Server error while generating image.' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const isDownload = searchParams.get('download') === 'true';

    if (!id) {
      return NextResponse.json({ error: 'Missing image id parameter.' }, { status: 400 });
    }

    const safeId = id.replace(/[^a-zA-Z0-9_-]/g, '');
    const cached = getCachedImage(safeId);

    if (cached) {
      const ext = cached.mimeType.includes('svg')
        ? 'svg'
        : cached.mimeType.includes('png')
        ? 'png'
        : cached.mimeType.includes('jpeg')
        ? 'jpg'
        : 'webp';

      const disposition = isDownload ? `attachment; filename="generated_${safeId}.${ext}"` : 'inline';

      return new NextResponse(new Uint8Array(cached.buffer), {
        status: 200,
        headers: {
          'Content-Type': cached.mimeType || 'image/webp',
          'Content-Disposition': disposition,
          'Content-Length': cached.buffer.length.toString(),
          'Cache-Control': 'public, max-age=86400',
        },
      });
    }

    return NextResponse.json({ error: 'Image not found in server cache.' }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to serve image.' }, { status: 500 });
  }
}
