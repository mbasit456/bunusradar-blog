export interface CategoryMeta {
  name: string;
  slug: string;
  description: string;
  color: string;
  wikidataUrl?: string;
  wikipediaUrl?: string;
}

export const CATEGORIES: Record<string, CategoryMeta> = {
  technology: {
    name: "Technology",
    slug: "technology",
    description: "Deep dives into cutting-edge tech, frameworks, software engineering, and developer tools.",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    wikidataUrl: "https://www.wikidata.org/wiki/Q11016",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Technology",
  },
  ai: {
    name: "Artificial Intelligence",
    slug: "ai",
    description: "Exploring LLMs, autonomous agents, neural architectures, and intelligent workflows.",
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 border-purple-200 dark:border-purple-800",
    wikidataUrl: "https://www.wikidata.org/wiki/Q11660",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Artificial_intelligence",
  },
  business: {
    name: "Business & Growth",
    slug: "business",
    description: "Actionable strategies for online businesses, monetization, startups, and product building.",
    color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    wikidataUrl: "https://www.wikidata.org/wiki/Q4830453",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Business",
  },
  productivity: {
    name: "Productivity",
    slug: "productivity",
    description: "Systems, mindsets, automation hacks, and tools to supercharge personal and team output.",
    color: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    wikidataUrl: "https://www.wikidata.org/wiki/Q193638",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Productivity",
  },

};

export function normalizeCategorySlug(rawSlug: string): string {
  if (!rawSlug) return 'technology';
  let cleaned = String(rawSlug).trim();
  try {
    cleaned = decodeURIComponent(cleaned);
  } catch (e) {}

  const normalized = cleaned
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  if (normalized === 'ai' || normalized === 'artificial-intelligence' || normalized === 'artificialintelligence') {
    return 'ai';
  }
  if (normalized === 'tech' || normalized === 'technology') {
    return 'technology';
  }
  if (
    normalized === 'business' ||
    normalized === 'business-growth' ||
    normalized === 'businessgrowth' ||
    normalized.startsWith('business')
  ) {
    return 'business';
  }
  if (normalized === 'productivity') {
    return 'productivity';
  }
  if (normalized === 'lifestyle' || normalized.startsWith('lifestyle')) {
    return 'technology';
  }

  return normalized || 'technology';
}

export function getCategoryBySlug(slug: string): CategoryMeta {
  const normalized = normalizeCategorySlug(slug);
  if (CATEGORIES[normalized]) {
    return CATEGORIES[normalized];
  }

  let decoded = String(slug);
  try {
    decoded = decodeURIComponent(decoded);
  } catch (e) {}

  const cleanName = decoded
    .replace(/%20/gi, ' ')
    .replace(/%26/gi, '&')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const displayName = cleanName ? cleanName.charAt(0).toUpperCase() + cleanName.slice(1) : 'General';

  return {
    name: displayName,
    slug: normalized,
    description: `Articles and guides exploring ${displayName} on BunusRadar.`,
    color: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700",
  };
}
