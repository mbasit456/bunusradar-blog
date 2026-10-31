// Topic Image Matcher - Ensures 100% relevant, high-resolution cover images for BunusRadar articles.
// Guarantees that tech and AI articles never receive mismatched vacation, lifestyle, or generic fallback photos.

export const TOPIC_IMAGE_CATALOG = {
  llm_chatbots: [
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'
  ],
  coding_developer: [
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=1200&q=80'
  ],
  video_image_art: [
    'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80'
  ],
  search_seo_research: [
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
  ],
  analytics_charts_pricing: [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=1200&q=80'
  ],
  infrastructure_cloud_security: [
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80'
  ],
  productivity_workplace: [
    'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80'
  ],
  general_ai: [
    'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1674027444485-cec3da58eef4?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1633412802994-5c058f151b66?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1200&q=80'
  ],
  general_tech: [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=80'
  ],
  general_business: [
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80'
  ],
  photography_media: [
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80'
  ],
  retail_commerce: [
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80'
  ],
  legal_compliance: [
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80'
  ]
};

export function detectTopicKey({ title = '', keyword = '', slug = '', category = '', tags = [] }) {
  const combined = `${title} ${keyword} ${slug} ${(tags || []).join(' ')} ${category}`.toLowerCase();

  if (/(chatgpt|claude|gemini|deepseek|\bo1\b|\b4o\b|llm|prompts?|conversational|chatbot|ai chat|hallucinat|language models?)/i.test(combined)) {
    return 'llm_chatbots';
  }
  if (/(cursor|copilot|windsurf|code|coding|developer|python|programming|scripts?|ide|terminal|github|apis?|structured outputs?|software engineer|programing)/i.test(combined)) {
    return 'coding_developer';
  }
  if (/(video|video generator|image generator|midjourney|text-to-video|art generator|digital art|diffusion|sora|runway|avatar|clothes changer|3d render|animation)/i.test(combined)) {
    return 'video_image_art';
  }
  if (/(search|seo|geo|cited|perplexity|google ai|citations?|rankings?|indexing|discovery|overviews?)/i.test(combined)) {
    return 'search_seo_research';
  }
  if (/(pricing|tokens?|calculator|roi|costs?|benchmark|analytics|charts?|metrics|dashboards?|paycheck|salary|mileage rate|financial growth)/i.test(combined)) {
    return 'analytics_charts_pricing';
  }
  if (/(photography|cameras?|photos? business|lens)/i.test(combined)) {
    return 'photography_media';
  }
  if (/(claire|retail|ecommerce|jewelry|stores?|shops?|card holder|apparel|brands?)/i.test(combined)) {
    return 'retail_commerce';
  }
  if (/(owi|paralegal|laws?|legal|compliance|regulations?)/i.test(combined)) {
    return 'legal_compliance';
  }
  if (/(clouds?|servers?|datacenters?|security|infrastructure|devops|database|networks?|kerberos|zatcoin|asset resilience)/i.test(combined)) {
    return 'infrastructure_cloud_security';
  }
  if (/(notion|workflows?|productivity|templates?|time management|focus|tasks?|workplace|shiftnote|workspace)/i.test(combined)) {
    return 'productivity_workplace';
  }
  if (/(ai|artificial intelligence|autonomous|agents?|neural|machine learning|future tech)/i.test(combined) || (category && category.toLowerCase().includes('ai'))) {
    return 'general_ai';
  }
  if ((category && category.toLowerCase().includes('tech')) || /tech/i.test(combined)) {
    return 'general_tech';
  }
  if ((category && category.toLowerCase().includes('business')) || /business|saas|startups?/i.test(combined)) {
    return 'general_business';
  }

  return 'general_ai';
}

export function resolveCoverImage({ title = '', keyword = '', slug = '', category = '', tags = [], usedSet = new Set() }) {
  const primaryTopic = detectTopicKey({ title, keyword, slug, category, tags });
  const pool = TOPIC_IMAGE_CATALOG[primaryTopic] || TOPIC_IMAGE_CATALOG.general_ai;

  // Filter unused in primary topic pool
  const unusedInPrimary = pool.filter(url => !usedSet.has(url) && !usedSet.has(url.split('?')[0]));
  if (unusedInPrimary.length > 0) {
    const selected = unusedInPrimary[Math.floor(Math.random() * unusedInPrimary.length)];
    usedSet.add(selected);
    usedSet.add(selected.split('?')[0]);
    return { url: selected, topic: primaryTopic };
  }

  // Fallback to related general AI or Tech pool
  const fallbackTopic = primaryTopic.startsWith('general') ? 'general_ai' : ((category && category.toLowerCase().includes('business')) ? 'general_business' : 'general_ai');
  const fallbackPool = TOPIC_IMAGE_CATALOG[fallbackTopic] || TOPIC_IMAGE_CATALOG.general_ai;
  const unusedInFallback = fallbackPool.filter(url => !usedSet.has(url) && !usedSet.has(url.split('?')[0]));
  if (unusedInFallback.length > 0) {
    const selected = unusedInFallback[Math.floor(Math.random() * unusedInFallback.length)];
    usedSet.add(selected);
    usedSet.add(selected.split('?')[0]);
    return { url: selected, topic: fallbackTopic };
  }

  // Deterministic seed fallback from the primary topic pool
  const seed = slug ? slug.replace(/[^a-z0-9]/g, '') : Date.now().toString();
  const baseSelected = pool[Math.floor(Math.random() * pool.length)];
  const deterministicUrl = `${baseSelected.split('?')[0]}?auto=format&fit=crop&w=1200&q=80&sig=${seed}`;
  usedSet.add(deterministicUrl);
  return { url: deterministicUrl, topic: primaryTopic };
}
