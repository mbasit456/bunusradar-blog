/**
 * Utility to generate optimized image URLs and responsive srcsets.
 * Reduces image payloads by up to 90% using modern WebP/AVIF sizing parameters.
 */
export const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80';

export const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  ai: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  technology: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
  business: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  productivity: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=80',
  lifestyle: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80',
};

const KNOWN_BROKEN_PATTERNS = [
  '1680795456508-316262a78129',
  '1692607431198-a6e5b4b10fae',
];

export function getCategoryFallback(category?: string): string {
  if (!category) return DEFAULT_FALLBACK_IMAGE;
  const key = category.toLowerCase().trim();
  if (key.includes('ai') || key.includes('artificial')) return CATEGORY_FALLBACK_IMAGES.ai;
  if (key.includes('tech')) return CATEGORY_FALLBACK_IMAGES.technology;
  if (key.includes('business') || key.includes('wealth')) return CATEGORY_FALLBACK_IMAGES.business;
  if (key.includes('productiv') || key.includes('focus')) return CATEGORY_FALLBACK_IMAGES.productivity;
  if (key.includes('life')) return CATEGORY_FALLBACK_IMAGES.lifestyle;
  return DEFAULT_FALLBACK_IMAGE;
}

export function isBrokenImageUrl(url?: string): boolean {
  if (!url || !url.trim()) return true;
  return KNOWN_BROKEN_PATTERNS.some((pattern) => url.includes(pattern));
}

export function getOptimizedImageUrl(src?: string, width = 800, quality = 75, category?: string): string {
  let targetSrc = (src && src.trim()) ? src.trim() : getCategoryFallback(category);

  if (isBrokenImageUrl(targetSrc)) {
    targetSrc = getCategoryFallback(category);
  }

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

export function getResponsiveSrcSet(src?: string, widths: number[] = [360, 480, 720, 960, 1200], category?: string): string {
  let targetSrc = (src && src.trim()) ? src.trim() : getCategoryFallback(category);
  if (isBrokenImageUrl(targetSrc)) {
    targetSrc = getCategoryFallback(category);
  }
  if (!targetSrc.includes('images.unsplash.com')) return '';
  return widths.map((w) => `${getOptimizedImageUrl(targetSrc, w, 75, category)} ${w}w`).join(', ');
}
