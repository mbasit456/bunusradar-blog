const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');

const content = fs.readFileSync('.env.local', 'utf8');
const match = content.match(/^GEMINI_API_KEY=(.+)$/m);
const apiKey = match[1].trim();
const genAI = new GoogleGenerativeAI(apiKey);

async function test(name) {
  try {
    const model = genAI.getGenerativeModel({ model: name });
    const res = await model.generateContent('Hi');
    console.log(`Model ${name}: SUCCESS`);
    return true;
  } catch (e) {
    console.log(`Model ${name}: ${e.message.split('\n')[0]}`);
    return false;
  }
}

(async () => {
  await test('gemini-3.8-flash');
  await test('gemini-2.0-flash-exp');
  await test('gemini-exp-1206');
})();
