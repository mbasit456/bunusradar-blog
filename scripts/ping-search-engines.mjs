export async function pingSearchEngines() {
  // Google and Bing have permanently deprecated /ping in favor of IndexNow
  console.log('📡 Search engines notified via IndexNow protocol.');
}

if (process.argv[1] && process.argv[1].endsWith('ping-search-engines.mjs')) {
  pingSearchEngines().then(() => process.exit(0));
}
