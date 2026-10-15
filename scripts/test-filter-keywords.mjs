import fs from 'fs';

const raw = JSON.parse(fs.readFileSync('scripts/keywords.json', 'utf8'));

// Strict off-topic blacklists: pets, medical conditions/veterinary drugs, alcohol/beverages, clothing/fashion items, home furniture/decor, infant care
const offTopicTerms = [
  'dog', 'dogs', 'cat', 'cats', 'puppy', 'veterinar', 'rabies', 'pyometra', 'benadryl',
  'gabapentin', 'solensia', 'cytopoint', 'doxycycline', 'ringworm', 'diarrhea',
  'tequila', 'whiskey', 'scotch', 'bourbon', 'wine', 'cocktail', 'gin', 'champagne',
  'sneakers', 'necklace', 'hair', 'blouse', 'pants', 'blanket', 'sofa', 'mattress',
  'crib', 'sleep sack', 'baby', 'newborn', 'tooth fairy', 'aquarium fish', 'invisalign',
  'barbecue', 'grill', 'accent chair', 'swivel chair', 'upholstered bed', 'pokemon',
  'vikings', 'ugly love', 'maya angelou', 'sancerre', 'lapostolle', 'pinot noir', 'chardonnay'
];

function isOffTopic(kw) {
  const lower = kw.toLowerCase();
  return offTopicTerms.some(term => lower.includes(term));
}

const categoryAligned = raw.filter(k => !isOffTopic(k));
const excluded = raw.filter(k => isOffTopic(k));

console.log('Total original keywords:', raw.length);
console.log('Category-aligned keywords:', categoryAligned.length);
console.log('Excluded off-topic keywords:', excluded.length);
console.log('\nSample category-aligned keywords (first 25):');
categoryAligned.slice(0, 25).forEach((k, i) => console.log(`  ${i+1}. ${k}`));
