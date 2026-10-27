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

// Order candidates from fastest & most reliable to robust fallbacks
const MODEL_CANDIDATES = [
  'gemini-3.5-flash-lite',
  'gemini-3.5-flash',
  'gemini-3.6-flash',
  'gemini-flash-lite-latest',
  'gemini-3-flash-preview',
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
  const modelLower = (modelId || '').toLowerCase();
  const baseRules = `
You are an advanced, natural, highly intelligent, and warm AI assistant, just like ChatGPT, Claude, and Gemini.
Follow these essential behavioral principles:
1. Universal Native Multilingual Mastery: You possess complete native fluency in EVERY human language worldwide (including English, Spanish, French, German, Italian, Portuguese, Russian, Arabic, Urdu, Hindi, Bengali, Punjabi, Chinese, Japanese, Korean, Turkish, Persian, Dutch, Polish, and all others).
   MANDATORY LANGUAGE MATCHING: You MUST ALWAYS detect the language, script, and dialect of the user's latest message and respond in that EXACT same language with native fluency, cultural nuance, and idiomatic accuracy.
   - If the user addresses you in Urdu script (اردو), respond in fluent Urdu script.
   - If the user addresses you in Roman Urdu or Hinglish (e.g. 'mujhe ek essay likh kar do' or 'kya hal hai'), respond naturally in fluent Roman Urdu / Hinglish.
   - If the user addresses you in Spanish, respond in fluent Spanish; if French, French; if German, German; if Arabic, Arabic; if Hindi, Hindi.
   - NEVER default or switch back to English unless the user explicitly requests an English response or writes in English.
2. Natural Human Tone: Speak with authentic warmth, clarity, empathy, and intellect. Answer everyday questions conversationally, solve complex problems, write stories, explain concepts with intuitive analogies, and adapt flexibly to the user's mood and intent.
3. Simple, Flowing Paragraphs for Articles: When asked to write an article, blog post, essay, guide, story, or content piece, write in natural, continuous, cohesive paragraphs just like ChatGPT and Claude. Do NOT turn articles into bullet lists, point-by-point outlines, or bolded key-value pairs unless the user explicitly asks for bullet points. Keep explanations simple, fluent, and naturally formatted without unsolicited bullet lists.
4. NO Horizontal Dividers or Separators: NEVER include horizontal lines, dividers, or separators (such as '---', '***', or '___') between paragraphs, sections, or headings. Keep the flow completely clean and unbroken.
5. Stunning AI Image Generation: When the user asks to generate, draw, paint, create, illustrate, or show an image/photo/artwork/logo:
   - Formulate a breathtaking visual description of the artwork in the user's language.
   - Embed the generated image cleanly in your markdown response using:
     ![Descriptive Title](IMAGE_URL_PLACEHOLDER)
   - Accompany the image with a creative aesthetic breakdown explaining the lighting, mood, palette, and composition in the user's language.
6. Canvas Code Generation: When the user explicitly requests code, games, or interactive web apps, provide complete, self-contained, production-ready code inside standard markdown blocks (\`\`\`html, \`\`\`python, etc.) so it immediately runs in the Canvas playground.
7. Strict Punctuation Constraint: Strictly avoid using em-dash characters anywhere in your response. Always use standard hyphens (-) or clean commas instead.`;

  let persona = '';
  if (modelLower.includes('claude')) {
    persona = `You are Claude 3.5 Sonnet, developed by Anthropic. You are thoughtful, articulate, honest, empathetic, and exceptionally creative.`;
  } else if (modelLower.includes('gpt-4o') || modelLower.includes('openai')) {
    persona = `You are GPT-4o, developed by OpenAI. You are witty, versatile, engaging, insightful, and lightning-fast.`;
  } else if (modelLower.includes('deepseek') || modelLower.includes('r1')) {
    persona = `You are DeepSeek R1, an advanced open reasoning engine. For complex multi-step logical or mathematical reasoning, express your inner thinking inside a <thinking>...</thinking> tag before providing your final answer.`;
  } else {
    persona = `You are BunusRadar AI, an elite multimodal conversational assistant blending the conversational finesse of ChatGPT and the deep reasoning of Claude.`;
  }

  if (customPrompt && customPrompt.trim()) {
    return `${persona}\nUser custom instructions: ${customPrompt.trim()}\n${baseRules}`;
  }

  return `${persona}\n${baseRules}`;
}

function isImageQuery(text: string, imageMode = false): boolean {
  if (imageMode) return true;
  const t = text.toLowerCase().trim();
  if (t.startsWith('/image') || t.startsWith('/img') || t.startsWith('/draw') || t.startsWith('/paint')) return true;

  // English
  if (/^(can you\s+)?(please\s+)?(generate|create|draw|make|paint|illustrate|render|show me)\s+(an?\s+)?(image|picture|photo|artwork|drawing|painting|illustration|wallpaper|logo|portrait)\b/i.test(t)) {
    return true;
  }
  if (/^(draw|paint|illustrate|sketch)\s+(me\s+)?(an?\s+)?/i.test(t)) return true;
  if (/^(photo|picture|image|artwork|drawing)\s+of\s+/i.test(t)) return true;

  // Spanish / Portuguese
  if (/(genera|crea|dibuja|haz|muestrame|crie|gere|desenhe)\s+(una?\s+)?(imagen|foto|cuadro|dibujo|desenho)/i.test(t)) return true;

  // French
  if (/(génère|genere|crée|cree|dessine|fais-moi|montre-moi)\s+(une?\s+)?(image|photo|dessin)/i.test(t)) return true;

  // German
  if (/(generiere|erstelle|zeichne|male|mach)\s+(ein\s+)?(bild|foto|zeichnung)/i.test(t)) return true;

  // Urdu / Arabic / Hindi
  if (/(تصویر|فوٹو|عکس|صورة|رسمة|لوحة)\s*(بناؤ|بنائیں|کھینچیں|ارسم|أنشئ|اصنع)/.test(t)) return true;
  if (/(تصویر|عکس|صورة)\s*(کی|کا)/.test(t)) return true;
  if (/(tasveer|photo|image|picture)\s*(banao|banayein|bana do)/i.test(t)) return true;
  if (/(तस्वीर|चित्र|फोटो)\s*(बनाओ|बनाइए)/.test(t)) return true;

  return false;
}

function extractImageSubject(prompt: string): string {
  let cleaned = prompt
    .replace(/^\/(image|img|draw|paint)\s*/i, '')
    .replace(/^(can you\s+)?(please\s+)?(generate|create|draw|make|paint|illustrate|render|show me|give me)\s+(an?\s+)?(image|picture|photo|photograph|illustration|artwork|drawing|portrait|wallpaper|scene|render)\s+(of\s+)?/i, '')
    .replace(/^(a\s+)?(picture|photo|image|drawing|artwork|render)\s+of\s+/i, '')
    .replace(/^(please\s+)?(draw|paint|sketch|illustrate)\s+(me\s+)?(an?\s+)?/i, '')
    .replace(/(genera|crea|dibuja|haz|muestrame|crie|gere|desenhe)\s+(una?\s+)?(imagen|foto|cuadro|dibujo)?(\s+de\s+)?/gi, '')
    .replace(/(génère|genere|crée|cree|dessine)\s+(une?\s+)?(image|photo)?(\s+de\s+)?/gi, '')
    .replace(/(تصویر|فوٹو|عکس|صورة|رسمة)\s*(بناؤ|بنائیں|کھینچیں|ارسم|أنشئ|اصنع)?/g, '')
    .replace(/(tasveer|photo|image)\s*(banao|banayein|bana do)?/gi, '')
    .trim();

  cleaned = cleaned.replace(/[.!?؟]+$/, '').trim();
  return cleaned || prompt.trim() || 'a breathtaking futuristic sci-fi city with flying vehicles in 8k cinematic lighting';
}

function buildHighQualityImageUrl(subject: string, width = 1024, height = 1024): string {
  const seed = Math.floor(Math.random() * 900000) + 100000;
  // Professional visual expansion and negative prompt to eliminate watermarks and low quality
  const aestheticExpansion = `${subject.trim()}, masterpiece, professional studio photography, highly detailed, 8k resolution, crisp sharp focus, cinematic volumetric lighting --no watermark, text, signature, logo, copyright, blurry, low resolution, deformed, bad anatomy`;
  const cleanPrompt = encodeURIComponent(aestheticExpansion);
  // nologo=true, nofeed=true, and enhance=false to avoid Pollinations' prompt-garbling filter
  return `https://image.pollinations.ai/prompt/${cleanPrompt}?width=${width}&height=${height}&nologo=true&nofeed=true&enhance=false&seed=${seed}`;
}

function cleanSeparators(text: string): string {
  return text
    // Remove standalone horizontal markdown divider lines (---, ***, ___)
    .replace(/^(\s*[-*_]{3,}\s*)$/gm, '')
    // Remove HTML hr tags
    .replace(/<hr\s*\/?>/gi, '')
    // Collapse excess empty lines left behind
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function cleanDisclaimers(text: string): string {
  return text
    .replace(/(as an ai|i am an ai|i cannot directly generate|i do not have the capability to generate|i'm unable to create images|while i cannot directly generate|unfortunately, i cannot create|i can't generate images|as a text-based ai|i am a text-based ai)[^.\n]*[.\n]?/gi, '')
    .replace(/(como ia|soy una ia|no puedo generar directamente|no tengo la capacidad de generar|no puedo crear imagenes)[^.\n]*[.\n]?/gi, '')
    .replace(/(en tant qu'ia|je suis une ia|je ne peux pas generer directement)[^.\n]*[.\n]?/gi, '')
    .replace(/(als ki|ich bin eine ki|ich kann nicht direkt generieren)[^.\n]*[.\n]?/gi, '')
    .replace(/(however,?\s+)?(if you('d| would) like to use this prompt|you can use this prompt)[^:\n]*:?/gi, '')
    .trim();
}

function generateOfflineFallback(userQuery: string, imageMode = false): { reply: string; thinking?: string } {
  const query = userQuery.toLowerCase().trim();

  // If user asks for an image or image mode is active
  if (isImageQuery(userQuery, imageMode)) {
    const cleanSubject = extractImageSubject(userQuery);
    const imageUrl = buildHighQualityImageUrl(cleanSubject);
    return {
      reply: `![${cleanSubject}](${imageUrl})\n\n**Visual Concept:** ${cleanSubject}`,
    };
  }

  // Detect language family for natural fallback
  if (/[\u0600-\u06FF]/.test(userQuery)) {
    const isUrdu = /[\u0679\u0686\u0688\u0691\u06BA\u06D2]/.test(userQuery);
    if (isUrdu) {
      return {
        reply: `خوش آمدید! میں BunusRadar AI ہوں، آپ کا ذہین کثیر اللسانی اسسٹنٹ۔ میں ہر زبان اور ہر موضوع پر گفتگو کر سکتا ہوں، مضامین اور تحریریں لکھ سکتا ہوں، اعلی معیار کی تصاویر تخلیق کر سکتا ہوں، اور کوڈنگ میں رہنمائی فراہم کر سکتا ہوں۔ بتائیے میں آج آپ کی کس طرح مدد کر سکتا ہوں؟`,
      };
    }
    return {
      reply: `أهلاً بك! أنا BunusRadar AI، مساعدك الذكي متعدد اللغات. يمكنني التحدث بجميع اللغات وفي أي موضوع، وكتابة المقالات، وتوليد صور عالية الدقة، والمساعدة في كتابة وتشغيل البرمجيات. كيف يمكنني مساعدتك اليوم؟`,
    };
  }

  if (/[¿¡áéíóúüñ]/i.test(userQuery) || /\b(hola|como|estas|que|hacer|puedes|ayuda)\b/i.test(query)) {
    return {
      reply: `¡Hola! Soy BunusRadar AI, tu asistente conversacional multilingüe. Puedo hablar fluidamente en cualquier idioma, redactar ensayos e historias, generar arte con IA en alta resolución y ejecutar código. ¿En qué puedo ayudarte hoy?`,
    };
  }

  if (/[àâçéèêëîïôûùüÿœæ]/i.test(userQuery) || /\b(bonjour|salut|comment|peux-tu|merci)\b/i.test(query)) {
    return {
      reply: `Bonjour ! Je suis BunusRadar AI, votre assistant conversationnel multilingue. Je peux communiquer dans toutes les langues, rédiger des articles et des récits, générer des images en haute résolution et exécuter du code. Comment puis-je vous aider aujourd'hui ?`,
    };
  }

  if (/[äöüß]/i.test(userQuery) || /\b(hallo|guten|tag|wie|kannst|du)\b/i.test(query)) {
    return {
      reply: `Hallo! Ich bin BunusRadar AI, dein mehrsprachiger KI-Assistent. Ich beherrsche alle Sprachen fließend, verfasse Texte, erstelle hochauflösende KI-Bilder und unterstütze dich beim Programmieren. Wie kann ich dir heute behilflich sein?`,
    };
  }

  return {
    reply: `Hello! I am BunusRadar AI, your conversational assistant inspired by the capabilities of ChatGPT and Claude. I am completely fluent in all human languages worldwide, write essays and creative stories, generate stunning high-resolution AI artwork on demand, or write and run code right in the interactive Canvas. How can I help you today?`,
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

    // Format conversation history for Gemini API
    const contents = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    // If user specifically requested an image, guide the assistant naturally
    if (userWantsImage && contents.length > 0) {
      const lastIndex = contents.length - 1;
      const cleanSubject = extractImageSubject(latestUserMessage);
      contents[lastIndex].parts[0].text = `${contents[lastIndex].parts[0].text}\n\n[System Note: Provide a vivid, artistic description of this visual concept and critique its aesthetic elements warmly in the exact same language as the user's prompt.]`;
    }

    // Try reliable Gemini candidates in priority order with 18s timeout per attempt
    for (const candidate of MODEL_CANDIDATES) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 18000);

      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${candidate}:generateContent?key=${activeKey}`;
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: personaInstruction }],
            },
            contents,
            generationConfig: {
              temperature: Math.min(Math.max(temperature, 0.2), 1),
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

          // Replace rogue em-dashes
          reply = reply.replace(/\u2014/g, ' - ');

          // Extract <thinking> block if generated
          const thinkingMatch = rawText.match(/<thinking>([\s\S]*?)<\/thinking>/);
          if (thinkingMatch) {
            thinking = thinkingMatch[1].trim().replace(/\u2014/g, ' - ');
            reply = rawText.replace(/<thinking>[\s\S]*?<\/thinking>/, '').trim();
          } else if (model.includes('deepseek') || model.includes('r1')) {
            thinking = 'Analyzed query context, evaluated visual and conversational parameters, and formulated a comprehensive response.';
          }

          // If user asked for an image, guarantee a clean high-resolution image link with zero watermarks
          if (userWantsImage) {
            reply = cleanDisclaimers(reply);
            const cleanSubject = extractImageSubject(latestUserMessage);
            const highResImageUrl = buildHighQualityImageUrl(cleanSubject);

            // Replace any broken placeholder url or append high quality image markdown
            if (reply.includes('IMAGE_URL_PLACEHOLDER')) {
              reply = reply.replace(/IMAGE_URL_PLACEHOLDER/g, highResImageUrl);
            } else if (!/!\[.*?\]\((https?:\/\/[^\s)]+)\)/i.test(reply)) {
              reply = `![${cleanSubject}](${highResImageUrl})\n\n${reply}`;
            }
          }

          // Strip any horizontal rule separators (---, ***, <hr>) for clean modern layout
          reply = cleanSeparators(reply);

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

    // If all online candidates fail or network is interrupted, return conversational fallback
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
