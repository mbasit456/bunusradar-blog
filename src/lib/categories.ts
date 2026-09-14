export interface CategoryMeta {
  name: string;
  slug: string;
  description: string;
  color: string;
}

export const CATEGORIES: Record<string, CategoryMeta> = {
  technology: {
    name: "Technology",
    slug: "technology",
    description: "Deep dives into cutting-edge tech, frameworks, software engineering, and developer tools.",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  },
  ai: {
    name: "Artificial Intelligence",
    slug: "ai",
    description: "Exploring LLMs, autonomous agents, neural architectures, and intelligent workflows.",
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 border-purple-200 dark:border-purple-800",
  },
  business: {
    name: "Business & Growth",
    slug: "business",
    description: "Actionable strategies for online businesses, monetization, startups, and product building.",
    color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
  },
  productivity: {
    name: "Productivity",
    slug: "productivity",
    description: "Systems, mindsets, automation hacks, and tools to supercharge personal and team output.",
    color: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200 dark:border-amber-800",
  },
  lifestyle: {
    name: "Lifestyle & Future",
    slug: "lifestyle",
    description: "Reflections on modern living, remote work culture, and future societal trends.",
    color: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300 border-rose-200 dark:border-rose-800",
  },
};

export function getCategoryBySlug(slug: string): CategoryMeta {
  const normalized = slug.toLowerCase();
  return (
    CATEGORIES[normalized] || {
      name: slug.charAt(0).toUpperCase() + slug.slice(1),
      slug: normalized,
      description: `Articles and guides related to ${slug}.`,
      color: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700",
    }
  );
}
