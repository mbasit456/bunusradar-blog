const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const POSTS_DIR = path.join(ROOT, 'content', 'posts');

// 1. Gather all existing valid slugs and categories
const postFiles = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
const validSlugs = new Set(postFiles.map(f => f.replace(/\.md$/, '')));
const validCategories = new Set(['technology', 'ai', 'business', 'productivity', 'lifestyle']);
const validStaticPages = new Set(['about', 'editorial-standards', 'latest-publications', 'privacy-terms']);

console.log(`Auditing ${postFiles.length} articles against Strict SEO Internal Linking Rules...`);

// Curated cluster topic definitions with natural anchor phrases
const TOPICAL_CLUSTERS = [
  // AI & Models Cluster
  {
    slug: 'best-ai-coding-assistants-2026-cursor-vs-claude-vs-github-copilot',
    triggers: [
      { re: /\b(AI coding assistants?|coding assistants?|AI-powered code generation|Cursor vs Copilot)\b/i, anchor: 'AI coding assistants' },
      { re: /\b(developer productivity tools?|AI developer workflows?)\b/i, anchor: 'modern AI developer tools' }
    ]
  },
  {
    slug: 'autonomous-ai-agents-software-development',
    triggers: [
      { re: /\b(autonomous AI agents?|agentic workflows?|autonomous agent systems?|software engineering agents?)\b/i, anchor: 'autonomous AI agents' },
      { re: /\b(agentic AI architectures?|autonomous multi-agent)\b/i, anchor: 'agentic AI architectures' }
    ]
  },
  {
    slug: 'best-free-chatgpt-alternatives-2026',
    triggers: [
      { re: /\b(ChatGPT alternatives?|free ChatGPT alternatives?|alternative conversational models?)\b/i, anchor: 'free ChatGPT alternatives' },
      { re: /\b(AI chat assistants?|conversational AI platforms?)\b/i, anchor: 'conversational AI assistants' }
    ]
  },
  {
    slug: 'deepseek-ai-vs-chatgpt-vs-claude-ultimate-showdown',
    triggers: [
      { re: /\b(DeepSeek AI|frontier AI models?|frontier reasoning models?|DeepSeek)\b/i, anchor: 'DeepSeek AI benchmark analysis' },
      { re: /\b(Claude vs ChatGPT|LLM performance benchmarks?)\b/i, anchor: 'frontier LLM benchmarks' }
    ]
  },
  {
    slug: 'top-character-ai-alternatives-free-conversational-ai',
    triggers: [
      { re: /\b(Character AI alternatives?|AI companion platforms?|interactive AI characters?|conversational companions?)\b/i, anchor: 'conversational AI companions' },
      { re: /\b(roleplay AI tools?|personality-driven AI)\b/i, anchor: 'interactive conversational AI tools' }
    ]
  },
  {
    slug: 'best-free-midjourney-alternatives-ai-art-generators',
    triggers: [
      { re: /\b(Midjourney alternatives?|free AI art generators?|text-to-image AI tools?|AI image generation platforms?)\b/i, anchor: 'free AI art generators' },
      { re: /\b(generative AI images?|AI visual generation)\b/i, anchor: 'generative AI visual tools' }
    ]
  },
  {
    slug: 'best-free-ai-video-generators-text-to-video-2026',
    triggers: [
      { re: /\b(AI video generators?|text-to-video AI tools?|AI video production tools?|generative video platforms?)\b/i, anchor: 'text-to-video AI generators' },
      { re: /\b(AI video synthesis|generative media)\b/i, anchor: 'AI video synthesis platforms' }
    ]
  },
  {
    slug: 'top-free-ai-video-generators-2026',
    triggers: [
      { re: /\b(free AI video tools?|video generation software|automated video production)\b/i, anchor: 'free AI video generation tools' }
    ]
  },

  // Tech & Architecture Cluster
  {
    slug: 'mastering-nextjs-performance-2026',
    triggers: [
      { re: /\b(Next\.js performance|server-side rendering performance|Next\.js optimization|web performance optimization)\b/i, anchor: 'Next.js performance optimization' },
      { re: /\b(Core Web Vitals|frontend latency optimization)\b/i, anchor: 'Core Web Vitals optimization' }
    ]
  },
  {
    slug: 'building-high-impact-developer-portfolios',
    triggers: [
      { re: /\b(developer portfolios?|software engineering portfolios?|technical portfolio architecture)\b/i, anchor: 'high-impact developer portfolios' },
      { re: /\b(portfolio projects?|engineering resume projects?)\b/i, anchor: 'engineering portfolio projects' }
    ]
  },
  {
    slug: 'inside-epic-systems-tech-giant-shaping-future-of-medicine',
    triggers: [
      { re: /\b(Epic Systems|electronic health records?|healthcare technology platforms?|medical software systems?)\b/i, anchor: 'Epic Systems healthcare technology' }
    ]
  },
  {
    slug: 'bbc-tech-coverage-and-digital-media-trends',
    triggers: [
      { re: /\b(digital media trends?|technology journalism|media coverage trends?)\b/i, anchor: 'digital media technology trends' }
    ]
  },
  {
    slug: 'tg-daily-tech-news-review-and-best-articles',
    triggers: [
      { re: /\b(tech news analysis|technology news coverage|tech publication standards?)\b/i, anchor: 'technology news analysis' }
    ]
  },

  // Business & Micro-SaaS Cluster
  {
    slug: 'most-profitable-digital-business-models-microsaas-2026',
    triggers: [
      { re: /\b(digital business models?|micro-SaaS business models?|profitable software ventures?|micro-SaaS ideas?)\b/i, anchor: 'profitable digital business models' },
      { re: /\b(software recurring revenue|subscription digital products?)\b/i, anchor: 'micro-SaaS subscription models' }
    ]
  },
  {
    slug: 'how-to-scale-digital-micro-saas',
    triggers: [
      { re: /\b(scale a micro-SaaS|scaling digital micro-SaaS|scale software ventures?|bootstrapped SaaS growth)\b/i, anchor: 'scaling digital micro-SaaS ventures' },
      { re: /\b(customer acquisition for SaaS|SaaS churn reduction)\b/i, anchor: 'SaaS customer acquisition strategies' }
    ]
  },
  {
    slug: 'passive-income-ideas-8-proven-wealth-systems-2026',
    triggers: [
      { re: /\b(passive income ideas?|passive income systems?|automated revenue streams?|recurring revenue streams?)\b/i, anchor: 'proven passive income systems' },
      { re: /\b(automated wealth generation|income-generating assets?)\b/i, anchor: 'automated income-generating assets' }
    ]
  },
  {
    slug: 'how-to-make-money-online-2026-legitimate-methods-beginners',
    triggers: [
      { re: /\b(make money online|earning money online legitimately|online income methods?|digital monetization strategies?)\b/i, anchor: 'legitimate ways to make money online' },
      { re: /\b(monetizing digital skills|online revenue streams?)\b/i, anchor: 'digital skill monetization' }
    ]
  },
  {
    slug: 'best-side-hustles-to-make-1000-a-month-2026',
    triggers: [
      { re: /\b(side hustles?|profitable side hustles?|freelance side hustles?|extra monthly income)\b/i, anchor: 'profitable side hustles' },
      { re: /\b(high-yield side income|freelancing on the side)\b/i, anchor: 'high-income freelance side ventures' }
    ]
  },
  {
    slug: 'forbes-top-business-and-wealth-tips-2026',
    triggers: [
      { re: /\b(wealth-building strategies?|business growth principles?|strategic capital allocation|wealth tips?)\b/i, anchor: 'strategic wealth-building tips' }
    ]
  },
  {
    slug: 'legitimate-work-from-home-jobs-high-paying-remote-careers-2026',
    triggers: [
      { re: /\b(work from home jobs?|remote careers?|high-paying remote jobs?|remote employment)\b/i, anchor: 'high-paying remote careers' },
      { re: /\b(remote compensation|remote hiring opportunities?)\b/i, anchor: 'legitimate work-from-home jobs' }
    ]
  },

  // Productivity & Focus Cluster
  {
    slug: 'ultimate-personal-productivity-stack-10x-focus',
    triggers: [
      { re: /\b(personal productivity stack|deep focus engines?|10x focus systems?|daily productivity stacks?)\b/i, anchor: 'personal productivity stack' },
      { re: /\b(deep focus routines?|focus management frameworks?)\b/i, anchor: 'deep focus frameworks' }
    ]
  },
  {
    slug: 'hyper-focused-productivity-systems',
    triggers: [
      { re: /\b(hyper-focused productivity systems?|hyper-focused productivity|deep work frameworks?|distraction-free focus)\b/i, anchor: 'hyper-focused productivity systems' },
      { re: /\b(cognitive stamina|focus architectures?)\b/i, anchor: 'distraction-free focus systems' }
    ]
  },
  {
    slug: 'best-free-notion-templates-productivity-life-organization',
    triggers: [
      { re: /\b(free Notion templates?|Notion productivity setups?|digital life organization|Notion workspace frameworks?)\b/i, anchor: 'free Notion productivity templates' },
      { re: /\b(digital organization templates?|Notion dashboards?)\b/i, anchor: 'digital organization templates' }
    ]
  },
  {
    slug: 'future-of-remote-work-digital-nomad-careers-2026',
    triggers: [
      { re: /\b(future of remote work|digital nomad careers?|location-independent work|distributed workforce trends?)\b/i, anchor: 'future of remote work' }
    ]
  },
  {
    slug: 'future-of-remote-work-and-ambient-intelligence',
    triggers: [
      { re: /\b(ambient intelligence|smart workplaces?|intelligent office environments?)\b/i, anchor: 'ambient intelligence in modern workplaces' }
    ]
  },

  // Lifestyle & Health Cluster
  {
    slug: 'best-myfitnesspal-alternative-options',
    triggers: [
      { re: /\b(MyFitnessPal alternatives?|nutrition tracking apps?|calorie counting apps?|macro tracking platforms?)\b/i, anchor: 'MyFitnessPal alternative options' },
      { re: /\b(health tracking applications?|digital food logging)\b/i, anchor: 'health tracking applications' }
    ]
  },
  {
    slug: 'hypoallergenic-cats-ultimate-guide-allergy-friendly-breeds',
    triggers: [
      { re: /\b(hypoallergenic cats?|allergy-friendly cat breeds?|Fel d 1 protein|low-dander felines?)\b/i, anchor: 'hypoallergenic cat breeds' },
      { re: /\b(pet allergy management|allergy-friendly pets?)\b/i, anchor: 'allergy-friendly pet care' }
    ]
  }
];

// Category pillars
const CATEGORY_PILLARS = [
  { slug: 'ai', pattern: /\b(artificial intelligence|generative AI|AI industry|machine learning models?)\b/i, anchor: 'Artificial Intelligence' },
  { slug: 'technology', pattern: /\b(software architecture|modern technology|cloud infrastructure|engineering systems?)\b/i, anchor: 'Technology' },
  { slug: 'business', pattern: /\b(business growth|digital entrepreneurship|commercial ventures?|wealth building)\b/i, anchor: 'Business & Growth' },
  { slug: 'productivity', pattern: /\b(personal productivity|time management|workflow optimization|cognitive efficiency)\b/i, anchor: 'Productivity' },
  { slug: 'lifestyle', pattern: /\b(healthy living|modern lifestyle|personal wellness|daily wellness)\b/i, anchor: 'Lifestyle' }
];

let totalInterlinks = 0;
let zeroPlaceholderVerified = true;

// Process each article
for (const file of postFiles) {
  const currentSlug = file.replace(/\.md$/, '');
  const filePath = path.join(POSTS_DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // STEP 1: Absolute scrub of ANY hash or placeholder links (Rule 1 & 12)
  content = content.replace(/\[([^\]]+)\]\(#[^)]*\)/g, '$1');
  content = content.replace(/\[([^\]]+)\]\(\s*\)/g, '$1');
  content = content.replace(/\[([^\]]+)\]\(javascript:[^)]*\)/gi, '$1');
  content = content.replace(/<a\s+[^>]*href=["']#[^"']*["'][^>]*>(.*?)<\/a>/gi, '$1');
  content = content.replace(/<a\s+[^>]*href=["']javascript:[^"']*["'][^>]*>(.*?)<\/a>/gi, '$1');

  const match = content.match(/^---[\r\n]+([\s\S]*?)[\r\n]+---([\s\S]*)$/);
  if (!match) continue;

  const frontmatter = match[1];
  let body = match[2];

  // STEP 2: Collect existing links to verify validity (Rule 2, 3, 10, 11)
  const existingUrls = new Set();
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lm;
  while ((lm = linkRegex.exec(body)) !== null) {
    const url = lm[2].trim();
    existingUrls.add(url);
  }

  // Count existing valid internal links
  let currentInternalCount = 0;
  for (const url of existingUrls) {
    if (url.startsWith('/blog/')) {
      const targetSlug = url.replace('/blog/', '');
      if (validSlugs.has(targetSlug) && targetSlug !== currentSlug) {
        currentInternalCount++;
      }
    } else if (url.startsWith('/category/')) {
      currentInternalCount++;
    }
  }

  // STEP 3: If currentInternalCount < 4, inject natural contextual links from TOPICAL_CLUSTERS (Rule 4, 5, 8, 9)
  const targetDesiredLinks = 4;
  if (currentInternalCount < targetDesiredLinks) {
    const candidates = TOPICAL_CLUSTERS.filter(t => t.slug !== currentSlug && validSlugs.has(t.slug));

    for (const cand of candidates) {
      if (currentInternalCount >= targetDesiredLinks) break;
      const candUrl = `/blog/${cand.slug}`;
      if (existingUrls.has(candUrl)) continue;

      let placed = false;
      const lines = body.split('\n');

      for (const trigger of cand.triggers) {
        if (placed) break;

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          // Skip headings, code blocks, or lines that already contain a link
          if (line.startsWith('#') || line.startsWith('```') || line.includes('](') || line.includes('http') || line.includes('<a')) {
            continue;
          }

          const matchTrig = line.match(trigger.re);
          if (matchTrig) {
            const matchedPhrase = matchTrig[0];
            lines[i] = line.replace(trigger.re, `[${matchedPhrase}](${candUrl})`);
            placed = true;
            existingUrls.add(candUrl);
            currentInternalCount++;
            break;
          }
        }
      }

      if (placed) {
        body = lines.join('\n');
      }
    }
  }

  // STEP 4: If still < 3, inject a category pillar link (Rule 7)
  if (currentInternalCount < 3) {
    const catMatch = frontmatter.match(/^category:\s*"([^"]+)"/m);
    const catName = catMatch ? catMatch[1].toLowerCase() : '';
    const pillar = CATEGORY_PILLARS.find(p => catName.includes(p.slug) || p.slug === catName);

    if (pillar) {
      const pillarUrl = `/category/${pillar.slug}`;
      if (!existingUrls.has(pillarUrl)) {
        const lines = body.split('\n');
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          if (line.startsWith('#') || line.startsWith('```') || line.includes('](') || line.includes('http')) continue;

          const m = line.match(pillar.pattern);
          if (m) {
            lines[i] = line.replace(pillar.pattern, `[${m[0]}](${pillarUrl})`);
            existingUrls.add(pillarUrl);
            currentInternalCount++;
            body = lines.join('\n');
            break;
          }
        }
      }
    }
  }

  // STEP 5: Final Quality Audit on this file (Rule 18)
  // Check for any hash links
  const finalHashCheck = body.match(/\[([^\]]+)\]\(#[^)]*\)/g);
  if (finalHashCheck) {
    console.error(`CRITICAL VIOLATION: Hash link found in ${file}! Removing...`);
    body = body.replace(/\[([^\]]+)\]\(#[^)]*\)/g, '$1');
    zeroPlaceholderVerified = false;
  }

  // Count final links
  const finalLinks = [];
  const finalLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let flm;
  while ((flm = finalLinkRegex.exec(body)) !== null) {
    finalLinks.push({ anchor: flm[1], url: flm[2] });
  }

  // Verify all internal links point to real existing slugs (Rule 2 & 16)
  for (const link of finalLinks) {
    if (link.url.startsWith('/blog/')) {
      const targetSlug = link.url.replace('/blog/', '');
      if (!validSlugs.has(targetSlug)) {
        console.error(`BROKEN LINK IN ${file}: ${link.url} does not exist!`);
      }
      if (targetSlug === currentSlug) {
        console.error(`SELF-LINK VIOLATION IN ${file}: ${link.url}`);
      }
    }
  }

  totalInterlinks += finalLinks.length;
  const updatedContent = `---\n${frontmatter}\n---${body}`;
  fs.writeFileSync(filePath, updatedContent, 'utf8');

  console.log(`  ✓ ${file}: ${finalLinks.length} internal links (Real canonical URLs)`);
}

console.log(`\n======================================================`);
console.log(`AUDIT RESULTS:`);
console.log(`Total Articles Verified: ${postFiles.length}`);
console.log(`Total Internal Links Active: ${totalInterlinks}`);
console.log(`Placeholder "#" Links Remaining: 0 (Zero Tolerance: ${zeroPlaceholderVerified ? 'PASSED' : 'CLEANED'})`);
console.log(`======================================================`);
