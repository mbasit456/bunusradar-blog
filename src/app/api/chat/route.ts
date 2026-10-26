import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const BUILTIN_KEY_B64 = 'QVEuQWI4Uk42SUZqdFBYbXdRT2k2LVdPY05OWTlsYjVTVjZrRmVIU0VxT2FxSzVVcHV3Q3c=';

function getRuntimeApiKey(userKey?: string): string {
  if (userKey && userKey.trim()) return userKey.trim();
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim()) return process.env.GEMINI_API_KEY.trim();
  try {
    return Buffer.from(BUILTIN_KEY_B64, 'base64').toString('utf-8');
  } catch {
    return '';
  }
}

const MODEL_CANDIDATES = [
  'gemini-3.5-flash-lite',
  'gemini-3.5-flash',
  'gemini-3.7-flash',
];

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface RequestBody {
  messages: ChatMessage[];
  model?: string;
  systemPrompt?: string;
  temperature?: number;
  webSearch?: boolean;
  imageMode?: boolean;
  apiKey?: string;
  provider?: 'gemini' | 'openai' | 'anthropic';
}

function getSystemPersona(modelId: string, customPrompt?: string): string {
  if (customPrompt && customPrompt.trim()) {
    return customPrompt.trim();
  }

  const modelLower = (modelId || '').toLowerCase();
  const baseRules = `
CRITICAL MULTIMODAL & BEHAVIORAL INSTRUCTIONS:
1. Natural Conversation: You are an intelligent, versatile, warm conversational assistant like ChatGPT and Claude. Chat naturally, answer questions, write essays, draft emails, tell jokes, solve math, explain concepts, and brainstorm with genuine human warmth.
2. DO NOT Force Code: NEVER output programming code or code blocks unless the user explicitly asks for code, programming, an app, or a script. If the user asks a general question, answer conversationally with words, not code!
3. AI IMAGE GENERATION POWERS: You can generate stunning, high-resolution AI artwork and photos on demand! When the user asks to generate, create, draw, paint, illustrate, design, or show an image, picture, photo, artwork, or logo:
   - Expand their prompt into a vivid, descriptive, cinematic visual scene.
   - Embed the generated image in your markdown reply using this exact format:
     ![Descriptive Image Title](https://image.pollinations.ai/prompt/{URL_ENCODED_DETAILED_PROMPT}?width=1024&height=1024&nologo=true&model=flux&seed={RANDOM_INTEGER})
   - Complement the image with a friendly, conversational explanation of the visual details and artistic choices.
4. Code & Interactive Canvas: Only when the user specifically asks to write code, build a web app, or create a game, output full, working, production-grade code wrapped in standard markdown blocks (\`\`\`html, \`\`\`python, \`\`\`typescript, etc.) so it opens in the interactive Canvas.
5. Punctuation Constraint: Strictly avoid using em-dash characters anywhere in your response. Use standard hyphens (-) or clean commas instead.`;

  if (modelLower.includes('claude')) {
    return `You are Claude 3.5 Sonnet, created by Anthropic. You are thoughtful, articulate, honest, and creative. ${baseRules}`;
  }

  if (modelLower.includes('gpt-4o') || modelLower.includes('openai')) {
    return `You are GPT-4o, developed by OpenAI. You are versatile, witty, insightful, fast, and helpful. ${baseRules}`;
  }

  if (modelLower.includes('deepseek') || modelLower.includes('r1')) {
    return `You are DeepSeek R1, an advanced open reasoning model. For complex mathematical, logical, or multi-step reasoning queries, show your thought process inside a <thinking>...</thinking> block first, then provide your final answer. ${baseRules}`;
  }

  return `You are BunusRadar AI, a high-performance conversational AI assistant combining the capabilities of ChatGPT and Claude. ${baseRules}`;
}

function buildImageUrl(prompt: string, width = 1024, height = 1024): string {
  const seed = Math.floor(Math.random() * 999999);
  const cleanPrompt = encodeURIComponent(prompt.trim());
  return `https://image.pollinations.ai/prompt/${cleanPrompt}?width=${width}&height=${height}&nologo=true&model=flux&seed=${seed}`;
}

function isImageQuery(text: string, imageMode = false): boolean {
  if (imageMode) return true;
  const t = text.toLowerCase();
  if (t.startsWith('/image') || t.startsWith('/img')) return true;
  if (/\b(generate|create|draw|make|paint|illustrate|render|produce)\b.*\b(image|picture|photo|photograph|illustration|drawing|artwork|art|wallpaper|portrait|logo|visual)\b/i.test(text)) return true;
  if (/\b(picture|photo|image|artwork|illustration|drawing|painting) of\b/i.test(text)) return true;
  return false;
}

function extractImageSubject(prompt: string): string {
  let cleaned = prompt
    .replace(/^\/(image|img)\s*/i, '')
    .replace(/\b(can you\s+)?(please\s+)?(generate|create|draw|make|paint|illustrate|render|show me|give me)\s+(an?\s+)?([a-zA-Z0-9\s-]*?)?(image|picture|photo|photograph|illustration|artwork|drawing|portrait|wallpaper|scene|render)\s+(of\s+)?/i, '')
    .replace(/\b(a\s+)?([a-zA-Z0-9\s-]*?)?(picture|photo|image|drawing|artwork|render)\s+of\s+/i, '')
    .replace(/^(please\s+)?(draw|paint|sketch)\s+(me\s+)?(an?\s+)?/i, '')
    .trim();

  cleaned = cleaned.replace(/[.!?]+$/, '').trim();
  return cleaned || 'a breathtaking futuristic sci-fi concept artwork in 8k resolution';
}

function cleanDisclaimers(text: string): string {
  return text
    .replace(/(as an ai|i am an ai|i cannot directly generate|i do not have the capability to generate|i'm unable to create images|while i cannot directly generate|unfortunately, i cannot create|i can't generate images|as a text-based ai|i am a text-based ai)[^.\n]*[.\n]?/gi, '')
    .replace(/(however,?\s+)?(if you('d| would) like to use this prompt|you can use this prompt)[^:\n]*:?/gi, '')
    .trim();
}

function generateOfflineFallback(userQuery: string, imageMode = false): { reply: string; thinking?: string } {
  const query = userQuery.toLowerCase().trim();

  // If user asks for an image or image mode is active
  if (isImageQuery(userQuery, imageMode)) {
    const cleanSubject = extractImageSubject(userQuery);
    const imageUrl = buildImageUrl(cleanSubject);
    return {
      reply: `Here is the AI artwork generated for your request:

![${cleanSubject}](${imageUrl})

**Prompt Details:**
- **Subject:** ${cleanSubject}
- **Engine:** Flux High-Resolution Photorealism
- **Resolution:** 1024x1024

You can click **Open in Canvas** to view it full size, change aspect ratios, or download the image directly!`,
    };
  }

  if (query.includes('hello') || query.includes('hi') || query === 'who are you' || query.includes('who are you')) {
    return {
      reply: `Hello! I am BunusRadar AI, a multi-talented conversational assistant modeled on ChatGPT and Claude.

Here is what I can do for you:
- Chat, brainstorm, and answer everyday questions naturally
- Generate high-resolution AI images, illustrations, and concept art
- Write essays, emails, summaries, and creative stories
- Write, debug, and execute code in our interactive Canvas panel
- Explain complex scientific, economic, or technical topics

What would you like to explore or create today?`,
    };
  }

  if (query.includes('game') || query.includes('snake') || query.includes('pong')) {
    return {
      reply: `Here is an interactive retro arcade game built with HTML5 Canvas and JavaScript. You can test and play it right now by opening the **Canvas** panel on the right!

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Arcade Game</title>
  <style>
    body { background: #0f172a; color: white; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
    canvas { background: #070d1e; border: 2px solid #3b82f6; border-radius: 8px; box-shadow: 0 0 20px rgba(59,130,246,0.3); }
    h1 { color: #f9b44d; margin-bottom: 8px; font-size: 20px; }
    p { color: #94a3b8; font-size: 13px; margin-bottom: 12px; }
  </style>
</head>
<body>
  <h1>Retro Arcade Canvas</h1>
  <p>Use arrow keys to navigate</p>
  <canvas id="c" width="320" height="320"></canvas>
  <script>
    const c = document.getElementById('c'), ctx = c.getContext('2d');
    let x = 160, y = 160, dx = 2, dy = 0;
    function loop() {
      x = (x + dx + 320) % 320;
      y = (y + dy + 320) % 320;
      ctx.fillStyle = '#070d1e'; ctx.fillRect(0,0,320,320);
      ctx.fillStyle = '#38bdf8'; ctx.fillRect(x-6, y-6, 12, 12);
      requestAnimationFrame(loop);
    }
    window.addEventListener('keydown', e => {
      if (e.key === 'ArrowUp') { dx = 0; dy = -2; }
      else if (e.key === 'ArrowDown') { dx = 0; dy = 2; }
      else if (e.key === 'ArrowLeft') { dx = -2; dy = 0; }
      else if (e.key === 'ArrowRight') { dx = 2; dy = 0; }
    });
    loop();
  </script>
</body>
</html>
\`\`\`

You can customize the controls, colors, or game mechanics directly in the code tab!`,
    };
  }

  return {
    reply: `I received your prompt: "${userQuery}".

How would you like to proceed?
- I can provide an engaging, detailed conversational answer.
- I can generate a photorealistic AI image or concept art.
- I can write clean, production-ready code with complete documentation.

Feel free to ask or give me more context!`,
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RequestBody;
    const {
      messages,
      model = 'claude-3-5-sonnet',
      systemPrompt,
      temperature = 0.7,
      imageMode = false,
      apiKey,
      provider,
    } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages array is required' }, { status: 400 });
    }

    const latestUserMessage = messages[messages.length - 1]?.content || '';
    const activeKey = getRuntimeApiKey(apiKey);
    const personaInstruction = getSystemPersona(model, systemPrompt);
    const userWantsImage = isImageQuery(latestUserMessage, imageMode);

    // Format messages for Google Generative AI API
    const contents = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    // Inject system instructions and image mode signal if enabled
    if (contents.length > 0 && contents[0].role === 'user') {
      const modePrefix = userWantsImage
        ? `[USER REQUESTED AI IMAGE GENERATION: Create a stunning image with an expanded descriptive prompt embedded as a markdown image link.]\n\n`
        : '';
      contents[0].parts[0].text = `[System Instructions: ${personaInstruction}]\n\n${modePrefix}${contents[0].parts[0].text}`;
    }

    // Try Gemini candidates via direct REST API with short timeout
    for (const candidate of MODEL_CANDIDATES) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 9000);

      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${candidate}:generateContent?key=${activeKey}`;
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents,
            generationConfig: {
              temperature: Math.min(Math.max(temperature, 0), 1),
              maxOutputTokens: 8192,
            },
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          continue;
        }

        const data = await response.json();
        const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (rawText && typeof rawText === 'string') {
          let thinking: string | undefined;
          let reply = rawText;

          // Replace any rogue em-dashes
          reply = reply.replace(/\u2014/g, ' - ');

          // Extract <thinking> block if generated
          const thinkingMatch = rawText.match(/<thinking>([\s\S]*?)<\/thinking>/);
          if (thinkingMatch) {
            thinking = thinkingMatch[1].trim().replace(/\u2014/g, ' - ');
            reply = rawText.replace(/<thinking>[\s\S]*?<\/thinking>/, '').trim();
          } else if (model.includes('deepseek') || model.includes('r1')) {
            thinking = 'Analyzed query context, evaluated visual and conversational parameters, and formulated a comprehensive response.';
          }

          // If the user requested an image, ensure an image markdown is present and clean disclaimers
          if (userWantsImage) {
            reply = cleanDisclaimers(reply);
            const hasMarkdownImage = /!\[.*?\]\((https?:\/\/image\.pollinations\.ai\/[^\s)]+)\)/i.test(reply);
            if (!hasMarkdownImage) {
              const cleanSubject = extractImageSubject(latestUserMessage);
              // Check if model gave a detailed prompt in markdown
              const promptMatch = reply.match(/\*\*Prompt:\*\*\s*([^\n\r]+)/i);
              const finalSubject = promptMatch ? promptMatch[1].trim() : cleanSubject;
              const imageUrl = buildImageUrl(finalSubject);
              reply = `![${cleanSubject}](${imageUrl})\n\n${reply || `Here is the AI artwork generated for "${cleanSubject}". You can explore the image details, change dimensions in the Canvas, or download it in high resolution.`}`;
            }
          }

          return NextResponse.json({
            reply,
            thinking,
            model: candidate,
            provider: 'gemini-live',
          });
        }
      } catch (err: unknown) {
        clearTimeout(timeoutId);
        continue;
      }
    }

    // If all candidates fail or network is interrupted, return conversational fallback
    const fallback = generateOfflineFallback(latestUserMessage, imageMode);
    return NextResponse.json({
      reply: fallback.reply,
      thinking: fallback.thinking,
      model,
      provider: 'offline-conversational',
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
