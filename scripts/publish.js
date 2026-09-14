#!/usr/bin/env node

/**
 * Auto-publish workflow script:
 * Stages new/modified blog posts, commits, and pushes to GitHub.
 * Once pushed, Vercel automatically deploys the update to your live domain.
 */

const { execSync } = require('child_process');

function run(command) {
  try {
    return execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error executing: ${command}`);
    process.exit(1);
  }
}

console.log('\n======================================');
console.log('   GravityPulse Auto-Publish System   ');
console.log('======================================\n');

try {
  console.log('[1/3] Staging blog posts and assets...');
  run('git add content/posts/ public/ src/');

  const status = execSync('git status --porcelain').toString().trim();
  if (!status) {
    console.log('\n[INFO] No changes detected. All posts are already committed and deployed!');
    process.exit(0);
  }

  const commitMsg = process.argv[2] || `Publish new blog update: ${new Date().toISOString().split('T')[0]}`;
  console.log(`\n[2/3] Committing changes: "${commitMsg}"...`);
  run(`git commit -m "${commitMsg}"`);

  console.log('\n[3/3] Pushing to remote GitHub repository...');
  run('git push');

  console.log('\n[SUCCESS] Successfully pushed to GitHub!');
  console.log('⚡ Vercel is now building and deploying your live site.');
  console.log('Your new content will be live on your custom domain in ~30 seconds.\n');
} catch (err) {
  console.error('[ERROR] Publishing failed:', err.message);
  process.exit(1);
}
