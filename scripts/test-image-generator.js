const assert = require('assert');
const {
  generateAiImage,
  getDimensionsForAspectRatio,
  buildEnhancedPrompt,
  detectImageStyle,
  detectAspectRatio,
  buildAdaptiveNegativePrompt,
} = require('../src/lib/imageGenerator.ts');

async function runImageTests() {
  console.log('=== Starting AI Image Generation Test Suite ===\n');

  // Test 1: Dimension mapping
  console.log('Test 1: Dimension mapping for aspect ratios...');
  assert.deepStrictEqual(getDimensionsForAspectRatio('1:1'), { width: 512, height: 512 });
  assert.deepStrictEqual(getDimensionsForAspectRatio('16:9'), { width: 768, height: 448 });
  assert.deepStrictEqual(getDimensionsForAspectRatio('9:16'), { width: 448, height: 768 });
  assert.deepStrictEqual(getDimensionsForAspectRatio('4:3'), { width: 704, height: 512 });
  console.log('✓ Aspect ratio dimension mappings are valid.');

  // Test 2: Style and aspect ratio detection from prompt text
  console.log('\nTest 2: Style and Aspect Ratio Detection...');
  assert.strictEqual(detectImageStyle('Create an anime illustration of a cyberpunk samurai'), 'anime');
  assert.strictEqual(detectImageStyle('3D render of a cute astronaut robot in Pixar style'), '3d');
  assert.strictEqual(detectImageStyle('Editorial vector graphic logo for a tea cafe'), 'illustration');
  assert.strictEqual(detectImageStyle('Cinematic 35mm movie still of a detective in rain'), 'cinematic');
  assert.strictEqual(detectImageStyle('A realistic portrait of a smiling doctor in clinic'), 'photorealistic');

  assert.strictEqual(detectAspectRatio('futuristic city at sunset in 16:9 format'), '16:9');
  assert.strictEqual(detectAspectRatio('vertical phone wallpaper of mountains in 9:16'), '9:16');
  assert.strictEqual(detectAspectRatio('standard 4:3 documentary scene'), '4:3');
  assert.strictEqual(detectAspectRatio('square avatar image'), '1:1');
  console.log('✓ Style and aspect ratio detection tests passed.');

  // Test 3: Adaptive negative prompt construction
  console.log('\nTest 3: Adaptive negative prompt construction and user constraints...');
  const animeNeg = buildAdaptiveNegativePrompt('anime', undefined, 'a brave warrior without sunglasses');
  assert(!animeNeg.includes('anime, cartoon'), 'Anime style should not exclude anime or cartoon');
  assert(animeNeg.includes('sunglasses'), 'Should capture explicit user exclusion: without sunglasses');

  const photoNeg = buildAdaptiveNegativePrompt('photorealistic', undefined, 'portrait of a man with no beard');
  assert(photoNeg.includes('cartoon'), 'Photorealistic style should exclude cartoons');
  assert(photoNeg.includes('beard'), 'Should capture explicit user exclusion: no beard');
  console.log('✓ Adaptive negative prompt tests passed.');

  // Test 4: Prompt enhancement per style
  console.log('\nTest 4: Prompt enhancement per style...');
  const cinematic = buildEnhancedPrompt('a futuristic city at sunset', 'cinematic');
  assert(cinematic.includes('cinematic film still'), 'Should include cinematic keywords');
  assert(cinematic.includes('futuristic city at sunset'), 'Should retain original prompt');

  const anime = buildEnhancedPrompt('a brave cyber warrior', 'anime');
  assert(anime.includes('anime aesthetic'), 'Should include anime keywords');
  console.log('✓ Prompt enhancement tests passed.');

  // Test 5: Actual Keyless Image Generation (Real Model Execution)
  console.log('\nTest 5: Executing live keyless image generation (Prompt: "a realistic portrait of a woman in cinematic lighting")...');
  const result1 = await generateAiImage({
    prompt: 'a realistic portrait of a woman in cinematic lighting',
    style: 'photorealistic',
    aspectRatio: '1:1',
  });

  assert(result1.imageUrl, 'Should have an imageUrl');
  assert(result1.localProxyUrl, 'Should have a localProxyUrl');
  assert(result1.id, 'Should have a unique image id');
  assert.strictEqual(result1.width, 512);
  assert.strictEqual(result1.height, 512);
  console.log('✓ Image generation completed successfully!');
  console.log('  Image ID:', result1.id);
  console.log('  Provider Used:', result1.provider);
  console.log('  Generated URL:', result1.imageUrl.slice(0, 100) + '...');

  // Test 6: 16:9 Aspect Ratio Generation (YouTube Thumbnail style)
  console.log('\nTest 6: Executing 16:9 YouTube Thumbnail generation...');
  const result2 = await generateAiImage({
    prompt: 'professional YouTube thumbnail about AI technology',
    style: 'cinematic',
    aspectRatio: '16:9',
  });

  assert(result2.imageUrl, 'Should have an imageUrl');
  assert.strictEqual(result2.width, 768);
  assert.strictEqual(result2.height, 448);
  console.log('✓ 16:9 Image generation completed successfully!');
  console.log('  Provider Used:', result2.provider);

  console.log('\n=== ALL IMAGE GENERATION TESTS COMPLETED SUCCESSFULLY! ===');
}

runImageTests().catch(err => {
  console.error('Image test failed with error:', err);
  process.exit(1);
});
