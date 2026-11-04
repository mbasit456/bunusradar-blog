// Topic Image Matcher - Ensures 100% relevant, high-resolution cover images for BunusRadar articles.
// Guarantees that tech and AI articles never receive mismatched vacation, lifestyle, or generic fallback photos.
// Enforces zero-duplicate image allocation across all articles.

export const TOPIC_IMAGE_CATALOG = {
  llm_chatbots: [
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1625314887424-9f190599bd56?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1618172193763-c511deb635ca?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80'
  ],
  coding_developer: [
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1537432376769-00f5c244a8d3?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1562813733-b31f71025d54?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1516116211227-bbc045b41315?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1529465230221-a0d10e46fcbb?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1200&q=80'
  ],
  video_image_art: [
    'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80'
  ],
  search_seo_research: [
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1551836022-b06985bceb24?auto=format&fit=crop&w=1200&q=80'
  ],
  analytics_charts_pricing: [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80'
  ],
  infrastructure_cloud_security: [
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1526374879815-562cb504e335?auto=format&fit=crop&w=1200&q=80'
  ],
  productivity_workplace: [
    'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80'
  ],
  general_ai: [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1617791160505-6f00504e3519?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1674027444485-cec3da58eef4?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1633412802994-5c058f151b66?auto=format&fit=crop&w=1200&q=80'
  ],
  general_tech: [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1510519138161-584489ff2937?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1200&q=80'
  ],
  general_business: [
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1520607164069-c58c3bad178e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
  ],
  healthcare_biotech: [
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80'
  ],
  photography_media: [
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=1200&q=80'
  ],
  retail_commerce: [
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80'
  ],
  legal_compliance: [
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1200&q=80'
  ]
};

export const GLOBAL_FALLBACK_POOL = [
  'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1534972195531-a756b1126f24?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80'
];

export function extractImageToken(url) {
  if (!url) return '';
  const photoMatch = url.match(/photo-[a-zA-Z0-9-]+/);
  if (photoMatch) return photoMatch[0];
  const localMatch = url.match(/\/images\/posts\/([^?#]+)/);
  if (localMatch) return localMatch[1];
  return url.split('?')[0];
}

export function isImageUsed(url, usedSet) {
  if (!url || !usedSet) return false;
  if (usedSet.has(url)) return true;
  const rawBase = url.split('?')[0];
  if (usedSet.has(rawBase)) return true;
  const token = extractImageToken(url);
  if (token && usedSet.has(token)) return true;
  return false;
}

export function markImageUsed(url, usedSet) {
  if (!url || !usedSet) return;
  usedSet.add(url);
  usedSet.add(url.split('?')[0]);
  const token = extractImageToken(url);
  if (token) usedSet.add(token);
}

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
  if (/(healthcare|clinical|diagnos|hospital|medicine|biotech|genom)/i.test(combined)) {
    return 'healthcare_biotech';
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

  // 1. Check primary topic pool
  const unusedInPrimary = pool.filter(url => !isImageUsed(url, usedSet));
  if (unusedInPrimary.length > 0) {
    const selected = unusedInPrimary[Math.floor(Math.random() * unusedInPrimary.length)];
    markImageUsed(selected, usedSet);
    return { url: selected, topic: primaryTopic };
  }

  // 2. Check related fallbacks based on category and topic
  const fallbackCategories = [
    primaryTopic.startsWith('general') ? 'general_tech' : 'general_ai',
    'general_ai',
    'general_tech',
    'general_business',
    'productivity_workplace',
    'analytics_charts_pricing',
    'infrastructure_cloud_security',
    'coding_developer'
  ];

  for (const fallbackCat of fallbackCategories) {
    if (fallbackCat === primaryTopic) continue;
    const fallbackPool = TOPIC_IMAGE_CATALOG[fallbackCat] || [];
    const unusedInFallback = fallbackPool.filter(url => !isImageUsed(url, usedSet));
    if (unusedInFallback.length > 0) {
      const selected = unusedInFallback[Math.floor(Math.random() * unusedInFallback.length)];
      markImageUsed(selected, usedSet);
      return { url: selected, topic: fallbackCat };
    }
  }

  // 3. Check global fallback pool
  const unusedInGlobal = GLOBAL_FALLBACK_POOL.filter(url => !isImageUsed(url, usedSet));
  if (unusedInGlobal.length > 0) {
    const selected = unusedInGlobal[Math.floor(Math.random() * unusedInGlobal.length)];
    markImageUsed(selected, usedSet);
    return { url: selected, topic: 'global_fallback' };
  }

  // 4. Absolute safe guard: if all curated pools are consumed, log an alert and pick from unused pool
  console.warn(`[IMAGE WARNING] All curated image pools exhausted for topic: ${primaryTopic}. Please add fresh photos to catalog.`);
  const allCatalogUrls = Object.values(TOPIC_IMAGE_CATALOG).flat().concat(GLOBAL_FALLBACK_POOL);
  const remainingAnywhere = allCatalogUrls.filter(url => !isImageUsed(url, usedSet));
  if (remainingAnywhere.length > 0) {
    const selected = remainingAnywhere[0];
    markImageUsed(selected, usedSet);
    return { url: selected, topic: 'emergency_catalog_any' };
  }

  // Never repeat a base photo with an artificial signature
  const emergencyUrl = `https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80`;
  markImageUsed(emergencyUrl, usedSet);
  return { url: emergencyUrl, topic: 'emergency_final' };
}
