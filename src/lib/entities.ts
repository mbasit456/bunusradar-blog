export interface SemanticEntity {
  name: string;
  type?: 'Thing' | 'Organization' | 'SoftwareApplication' | 'ComputerLanguage' | 'Product';
  wikidataUrl?: string;
  wikipediaUrl?: string;
  sameAs?: string[];
}

export const KNOWN_ENTITIES: Record<string, SemanticEntity> = {
  'artificial intelligence': {
    name: 'Artificial Intelligence',
    type: 'Thing',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q11660',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Artificial_intelligence',
  },
  'ai': {
    name: 'Artificial Intelligence',
    type: 'Thing',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q11660',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Artificial_intelligence',
  },
  'machine learning': {
    name: 'Machine Learning',
    type: 'Thing',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q2539',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Machine_learning',
  },
  'large language model': {
    name: 'Large Language Model',
    type: 'Thing',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q115305900',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Large_language_model',
  },
  'llm': {
    name: 'Large Language Model',
    type: 'Thing',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q115305900',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Large_language_model',
  },
  'generative ai': {
    name: 'Generative Artificial Intelligence',
    type: 'Thing',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q115858428',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Generative_artificial_intelligence',
  },
  'openai': {
    name: 'OpenAI',
    type: 'Organization',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q22676045',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/OpenAI',
  },
  'chatgpt': {
    name: 'ChatGPT',
    type: 'SoftwareApplication',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q115564437',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/ChatGPT',
  },
  'anthropic': {
    name: 'Anthropic',
    type: 'Organization',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q111491763',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Anthropic',
  },
  'claude': {
    name: 'Claude',
    type: 'SoftwareApplication',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q115682855',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Claude_(language_model)',
  },
  'cursor': {
    name: 'Cursor',
    type: 'SoftwareApplication',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q125586616',
  },
  'github copilot': {
    name: 'GitHub Copilot',
    type: 'SoftwareApplication',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q107388708',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/GitHub_Copilot',
  },
  'deepseek': {
    name: 'DeepSeek',
    type: 'Organization',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q124338781',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/DeepSeek',
  },
  'software engineering': {
    name: 'Software Engineering',
    type: 'Thing',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q8078',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Software_engineering',
  },
  'nextjs': {
    name: 'Next.js',
    type: 'SoftwareApplication',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q115569429',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Next.js',
  },
  'next.js': {
    name: 'Next.js',
    type: 'SoftwareApplication',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q115569429',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Next.js',
  },
  'react': {
    name: 'React',
    type: 'SoftwareApplication',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q19399674',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/React_(software)',
  },
  'software as a service': {
    name: 'Software as a Service',
    type: 'Thing',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q217602',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Software_as_a_service',
  },
  'saas': {
    name: 'Software as a Service',
    type: 'Thing',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q217602',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Software_as_a_service',
  },
  'micro-saas': {
    name: 'Software as a Service',
    type: 'Thing',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q217602',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Software_as_a_service',
  },
  'productivity': {
    name: 'Productivity',
    type: 'Thing',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q193638',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Productivity',
  },
  'remote work': {
    name: 'Remote Work',
    type: 'Thing',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q741163',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Telecommuting',
  },
  'cybersecurity': {
    name: 'Cybersecurity',
    type: 'Thing',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q3510521',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Computer_security',
  },
  'notion': {
    name: 'Notion',
    type: 'SoftwareApplication',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q65071598',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Notion_(productivity_software)',
  },
  'midjourney': {
    name: 'Midjourney',
    type: 'SoftwareApplication',
    wikidataUrl: 'https://www.wikidata.org/wiki/Q113364966',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Midjourney',
  },
};

export function resolveArticleEntities(
  title: string,
  category: string,
  tags: string[]
): {
  aboutEntities: SemanticEntity[];
  mentionEntities: SemanticEntity[];
} {
  const matched = new Map<string, SemanticEntity>();

  const textToScan = `${title} ${category} ${tags.join(' ')}`.toLowerCase();

  for (const [keyword, entity] of Object.entries(KNOWN_ENTITIES)) {
    if (textToScan.includes(keyword)) {
      if (!matched.has(entity.name)) {
        matched.set(entity.name, entity);
      }
    }
  }

  const allMatched = Array.from(matched.values());

  const aboutEntities = allMatched.slice(0, 3);
  const mentionEntities = allMatched.slice(3, 8);

  return {
    aboutEntities,
    mentionEntities,
  };
}

export function formatEntityForSchema(entity: SemanticEntity) {
  const sameAs: string[] = [];
  if (entity.wikidataUrl) sameAs.push(entity.wikidataUrl);
  if (entity.wikipediaUrl) sameAs.push(entity.wikipediaUrl);
  if (entity.sameAs) sameAs.push(...entity.sameAs);

  return {
    '@type': entity.type || 'Thing',
    name: entity.name,
    ...(sameAs.length > 0 ? { sameAs: sameAs.length === 1 ? sameAs[0] : sameAs } : {}),
  };
}
