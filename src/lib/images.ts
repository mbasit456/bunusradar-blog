/**
 * Utility to generate optimized image URLs and responsive srcsets.
 * Reduces image payloads by up to 90% using modern WebP/AVIF sizing parameters.
 */
export const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80';

export function getOptimizedImageUrl(src?: string, width = 800, quality = 75): string {
  const targetSrc = (src && src.trim()) ? src.trim() : DEFAULT_FALLBACK_IMAGE;

  if (targetSrc.includes('images.unsplash.com')) {
    try {
      const url = new URL(targetSrc);
      url.searchParams.set('w', width.toString());
      url.searchParams.set('q', quality.toString());
      url.searchParams.set('auto', 'format');
      url.searchParams.set('fit', 'crop');
      return url.toString();
    } catch {
      return targetSrc;
    }
  }

  return targetSrc;
}

export function getResponsiveSrcSet(src?: string, widths: number[] = [360, 480, 720, 960, 1200]): string {
  const targetSrc = (src && src.trim()) ? src.trim() : DEFAULT_FALLBACK_IMAGE;
  if (!targetSrc.includes('images.unsplash.com')) return '';
  return widths.map((w) => `${getOptimizedImageUrl(targetSrc, w)} ${w}w`).join(', ');
}
