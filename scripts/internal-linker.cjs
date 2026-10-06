const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const POSTS_DIR = path.join(ROOT, 'content', 'posts');

const postFiles = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
const validSlugs = new Set(postFiles.map(f => f.replace(/\.md$/, '')));

console.log(`Starting comprehensive cluster internal linking for ${validSlugs.size} articles...`);

// Define topical clusters
const CLUSTERS = {
  ai: [
    { slug: 'best-ai-coding-assistants-2026-cursor-vs-claude-vs-github-copilot', title: 'best AI coding assistants', terms: ['ai coding', 'coding assistants', 'cursor', 'copilot', 'developer assistant'] },
    { slug: 'autonomous-ai-agents-software-development', title: 'autonomous AI agents', terms: ['autonomous ai', 'ai agents', 'software agents', 'agentic architecture'] },
    { slug: 'best-free-chatgpt-alternatives-2026', title: 'free ChatGPT alternatives', terms: ['chatgpt alternatives', 'conversational ai', 'claude alternative', 'chatgpt competitor'] },
    { slug: 'deepseek-ai-vs-chatgpt-vs-claude-ultimate-showdown', title: 'DeepSeek AI vs Claude and ChatGPT', terms: ['deepseek', 'frontier models', 'llm benchmarks', 'reasoning models'] },
    { slug: 'top-character-ai-alternatives-free-conversational-ai', title: 'Character AI alternatives', terms: ['character ai', 'ai companions', 'interactive ai', 'virtual companion'] },
    { slug: 'best-free-midjourney-alternatives-ai-art-generators', title: 'free AI art generators', terms: ['midjourney', 'ai art generators', 'text-to-image', 'image synthesis'] },
    { slug: 'best-free-ai-video-generators-text-to-video-2026', title: 'text-to-video AI tools', terms: ['ai video', 'video generators', 'text-to-video', 'runway', 'sora'] },
    { slug: 'top-free-ai-video-generators-2026', title: 'free AI video platforms', terms: ['ai video tools', 'video creation tools', 'video synthesis platforms'] }
  ],
  tech: [
    { slug: 'mastering-nextjs-performance-2026', title: 'Next.js performance optimization', terms: ['next.js', 'server-side rendering', 'web performance', 'core web vitals'] },
    { slug: 'building-high-impact-developer-portfolios', title: 'high-impact developer portfolio', terms: ['developer portfolio', 'technical portfolio', 'portfolio project'] },
    { slug: 'inside-epic-systems-tech-giant-shaping-future-of-medicine', title: 'Epic Systems healthcare platform', terms: ['epic systems', 'health tech', 'electronic health records', 'medical tech'] },
    { slug: 'bbc-tech-coverage-and-digital-media-trends', title: 'digital media tech trends', terms: ['bbc tech', 'media trends', 'broadcast tech'] },
    { slug: 'tg-daily-tech-news-review-and-best-articles', title: 'technology journalism analysis', terms: ['tg daily', 'tech news analysis', 'tech journalism'] }
  ],
  business: [
    { slug: 'most-profitable-digital-business-models-microsaas-2026', title: 'profitable digital business models', terms: ['digital business models', 'micro-saas', 'software business models', 'profitable saas'] },
    { slug: 'how-to-scale-digital-micro-saas', title: 'scaling a digital micro-SaaS', terms: ['scale a micro-saas', 'scaling micro-saas', 'saas growth', 'bootstrapped saas'] },
    { slug: 'passive-income-ideas-8-proven-wealth-systems-2026', title: 'passive income systems', terms: ['passive income', 'wealth systems', 'automated revenue', 'recurring income'] },
    { slug: 'how-to-make-money-online-2026-legitimate-methods-beginners', title: 'making money online legitimately', terms: ['make money online', 'earning online', 'online income', 'monetization'] },
    { slug: 'best-side-hustles-to-make-1000-a-month-2026', title: 'profitable side hustles', terms: ['side hustles', 'freelance side hustle', 'extra income', 'side business'] },
    { slug: 'forbes-top-business-and-wealth-tips-2026', title: 'strategic wealth-building tips', terms: ['wealth tips', 'business strategies', 'forbes tips', 'capital allocation'] },
    { slug: 'legitimate-work-from-home-jobs-high-paying-remote-careers-2026', title: 'high-paying remote careers', terms: ['work from home', 'remote careers', 'remote jobs', 'telecommuting'] }
  ],
  productivity: [
    { slug: 'ultimate-personal-productivity-stack-10x-focus', title: 'personal productivity stack', terms: ['productivity stack', 'focus engine', '10x focus', 'deep focus'] },
    { slug: 'hyper-focused-productivity-systems', title: 'hyper-focused productivity systems', terms: ['hyper-focused', 'deep work', 'focus systems', 'distraction-free'] },
    { slug: 'best-free-notion-templates-productivity-life-organization', title: 'free Notion productivity templates', terms: ['notion templates', 'notion workspace', 'life organization', 'notion setup'] },
    { slug: 'future-of-remote-work-digital-nomad-careers-2026', title: 'future of remote work', terms: ['remote work trends', 'digital nomad', 'distributed teams'] },
    { slug: 'future-of-remote-work-and-ambient-intelligence', title: 'ambient intelligence in remote work', terms: ['ambient intelligence', 'smart workplace', 'future of workplaces'] }
  ],
  lifestyle: [
    { slug: 'best-myfitnesspal-alternative-options', title: 'MyFitnessPal alternative options', terms: ['myfitnesspal', 'calorie tracking', 'nutrition tracking', 'diet apps'] },
    { slug: 'hypoallergenic-cats-ultimate-guide-allergy-friendly-breeds', title: 'hypoallergenic cat breeds', terms: ['hypoallergenic cats', 'cat breeds', 'fel d 1', 'pet allergies'] }
  ]
};

// Flatten all cluster targets
const ALL_TARGETS = [];
for (const [clusterKey, list] of Object.entries(CLUSTERS)) {
  for (const item of list) {
    ALL_TARGETS.push({ ...item, cluster: clusterKey });
  }
}

let modifiedArticlesCount = 0;
let totalLinksCount = 0;

for (const file of postFiles) {
  const currentSlug = file.replace(/\.md$/, '');
  const filePath = path.join(POSTS_DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Strip any accidental hash or placeholder links (Rule 1, 12)
  content = content.replace(/\[([^\]]+)\]\(#[^)]*\)/g, '$1');
  content = content.replace(/<a\s+[^>]*href=["']#[^"']*["'][^>]*>(.*?)<\/a>/gi, '$1');

  const match = content.match(/^---[\r\n]+([\s\S]*?)[\r\n]+---([\s\S]*)$/);
  if (!match) continue;

  const frontmatter = match[1];
  let body = match[2];

  // Identify existing links in post
  const existingLinks = new Set();
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lm;
  while ((lm = linkRegex.exec(body)) !== null) {
    existingLinks.add(lm[2]);
  }

  // Count existing internal links
  let internalLinksCount = 0;
  existingLinks.forEach(url => {
    if (url.startsWith('/blog/') || url.startsWith('/category/')) {
      internalLinksCount++;
    }
  });

  const catMatch = frontmatter.match(/^category:\s*"([^"]+)"/m);
  const rawCat = catMatch ? catMatch[1].toLowerCase() : '';
  let postCluster = 'tech';
  if (rawCat.includes('ai') || rawCat.includes('artificial')) postCluster = 'ai';
  else if (rawCat.includes('business')) postCluster = 'business';
  else if (rawCat.includes('productiv')) postCluster = 'productivity';
  else if (rawCat.includes('life')) postCluster = 'lifestyle';

  // Target: 3 to 5 internal links per article (Rule 9)
  const targetLinkCount = 4;

  if (internalLinksCount < targetLinkCount) {
    // Candidates in same cluster first, then others
    const clusterCandidates = (CLUSTERS[postCluster] || []).filter(t => t.slug !== currentSlug && validSlugs.has(t.slug));
    const otherCandidates = ALL_TARGETS.filter(t => t.cluster !== postCluster && t.slug !== currentSlug && validSlugs.has(t.slug));
    const sortedCandidates = [...clusterCandidates, ...otherCandidates];

    for (const target of sortedCandidates) {
      if (internalLinksCount >= targetLinkCount) break;
      const targetUrl = `/blog/${target.slug}`;
      if (existingLinks.has(targetUrl)) continue;

      // Try matching any of target's terms
      let linked = false;
      const lines = body.split('\n');

      for (const term of target.terms) {
        if (linked) break;
        const safeTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const termRegex = new RegExp(`\\b(${safeTerm})\\b`, 'i');

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          // Skip headings, lines with existing markdown links, frontmatter, code blocks
          if (line.startsWith('#') || line.startsWith('```') || line.includes('](') || line.includes('http')) {
            continue;
          }

          const match = line.match(termRegex);
          if (match) {
            const matchedWord = match[0];
            lines[i] = line.replace(termRegex, `[${matchedWord}](${targetUrl})`);
            linked = true;
            existingLinks.add(targetUrl);
            internalLinksCount++;
            totalLinksCount++;
            break;
          }
        }
      }

      if (linked) {
        body = lines.join('\n');
      }
    }
  }

  // Check if we also should add a category pillar link (Rule 7)
  const categoryPillarUrl = `/category/${postCluster === 'ai' ? 'ai' : postCluster === 'tech' ? 'technology' : postCluster}`;
  if (!existingLinks.has(categoryPillarUrl) && internalLinksCount < targetLinkCount) {
    const lines = body.split('\n');
    const catWords = {
      ai: /\b(artificial intelligence|AI trends|AI systems)\b/i,
      tech: /\b(technology architecture|software engineering|digital technology)\b/i,
      business: /\b(business growth|commercial strategy|digital entrepreneurship)\b/i,
      productivity: /\b(productivity systems|deep focus|time management)\b/i,
      lifestyle: /\b(modern lifestyle|wellness strategy|daily health)\b/i
    };

    const pat = catWords[postCluster];
    if (pat) {
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.startsWith('#') || line.includes('](')) continue;
        const match = line.match(pat);
        if (match) {
          lines[i] = line.replace(pat, `[${match[0]}](${categoryPillarUrl})`);
          existingLinks.add(categoryPillarUrl);
          internalLinksCount++;
          totalLinksCount++;
          body = lines.join('\n');
          break;
        }
      }
    }
  }

  // Final validation: Ensure zero "#" links exist (Rule 1, 18)
  body = body.replace(/\[([^\]]+)\]\(#[^)]*\)/g, '$1');

  const updatedContent = `---\n${frontmatter}\n---${body}`;
  fs.writeFileSync(filePath, updatedContent, 'utf8');
  console.log(`  🔗 ${file}: ${internalLinksCount} verified internal link(s)`);
  modifiedArticlesCount++;
}

console.log(`\n✅ Finished! ${modifiedArticlesCount} articles verified and interlinked. Total new internal links: ${totalLinksCount}`);
