/**
 * Utility to generate optimized image URLs and responsive srcsets.
 * Reduces image payloads by up to 90% using modern WebP/AVIF sizing parameters.
 */
export function getOptimizedImageUrl(src?: string, width = 800, quality = 75): string {
  if (!src) return '';

  if (src.includes('images.unsplash.com')) {
    try {
      const url = new URL(src);
      url.searchParams.set('w', width.toString());
      url.searchParams.set('q', quality.toString());
      url.searchParams.set('auto', 'format');
      url.searchParams.set('fit', 'crop');
      return url.toString();
    } catch {
      return src;
    }
  }

  return src;
}

export function getResponsiveSrcSet(src?: string, widths: number[] = [360, 480, 720, 960, 1200]): string {
  if (!src || !src.includes('images.unsplash.com')) return '';
  return widths.map((w) => `${getOptimizedImageUrl(src, w)} ${w}w`).join(', ');
}
