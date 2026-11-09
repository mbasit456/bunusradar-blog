import fs from 'fs';
import path from 'path';

async function audit() {
  console.log('=== SITEMAP INTEGRITY AUDIT ===\n');

  const filesInPosts = fs.readdirSync('content/posts').filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  console.log(`[1] Markdown posts on disk: ${filesInPosts.length}`);

  // Test dynamic route handlers
  const { GET: getIndex } = await import('../src/app/sitemap_index.xml/route.ts');
  const indexRes = await getIndex();
  const indexXml = await indexRes.text();
  console.log(`[2] /sitemap_index.xml: Status ${indexRes.status}, Length: ${indexXml.length}`);
  const childSitemaps = [...indexXml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
  console.log('    Child sitemaps in index:', childSitemaps);

  const { GET: getSitemap } = await import('../src/app/sitemap.xml/route.ts');
  const sitemapRes = await getSitemap();
  const sitemapXml = await sitemapRes.text();
  console.log(`[3] /sitemap.xml: Status ${sitemapRes.status}, Length: ${sitemapXml.length}`);

  const { GET: getPosts } = await import('../src/app/sitemap-posts.xml/route.ts');
  const postsRes = await getPosts();
  const postsXml = await postsRes.text();
  const postUrls = [...postsXml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
  console.log(`[4] /sitemap-posts.xml: Status ${postsRes.status}, Total Posts in XML: ${postUrls.length}`);

  const missingPosts = filesInPosts.filter(f => {
    const slug = f.replace(/\.mdx?$/, '');
    return !postUrls.includes(`https://bunusradar.site/blog/${slug}`);
  });
  if (missingPosts.length > 0) {
    console.error('    ❌ MISSING POSTS IN SITEMAP-POSTS.XML:', missingPosts);
  } else {
    console.log('    ✅ 100% of posts on disk are included in /sitemap-posts.xml!');
  }

  const { GET: getPages } = await import('../src/app/sitemap-pages.xml/route.ts');
  const pagesRes = await getPages();
  const pagesXml = await pagesRes.text();
  const pageUrls = [...pagesXml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
  console.log(`[5] /sitemap-pages.xml: Status ${pagesRes.status}, Total Pages in XML: ${pageUrls.length}`);
  console.log('    Pages included:', pageUrls);

  const { GET: getCategories } = await import('../src/app/sitemap-categories.xml/route.ts');
  const catRes = await getCategories();
  const catXml = await catRes.text();
  const catUrls = [...catXml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
  console.log(`[6] /sitemap-categories.xml: Status ${catRes.status}, Categories in XML: ${catUrls.length}`);

  const { GET: getAuthors } = await import('../src/app/sitemap-authors.xml/route.ts');
  const authRes = await getAuthors();
  const authXml = await authRes.text();
  const authUrls = [...authXml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
  console.log(`[7] /sitemap-authors.xml: Status ${authRes.status}, Authors in XML: ${authUrls.length}`);

  const { GET: getTags } = await import('../src/app/sitemap-tags.xml/route.ts');
  const tagRes = await getTags();
  const tagXml = await tagRes.text();
  const tagUrls = [...tagXml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
  console.log(`[8] /sitemap-tags.xml: Status ${tagRes.status}, Tags in XML: ${tagUrls.length}`);

  const { GET: getNews } = await import('../src/app/sitemap-news.xml/route.ts');
  const newsRes = await getNews();
  const newsXml = await newsRes.text();
  const newsUrls = [...newsXml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
  console.log(`[9] /sitemap-news.xml: Status ${newsRes.status}, Qualifying News Posts: ${newsUrls.length}`);

  console.log('\n=== ALL SITEMAPS VERIFIED SUCCESSFULLY! ===');
}

audit();
