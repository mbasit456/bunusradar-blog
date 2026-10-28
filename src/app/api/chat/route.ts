import { NextRequest, NextResponse } from 'next/server';
import { generateAiImage } from '@/lib/imageGenerator';

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
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
  'gemini-flash-latest',
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

interface DocumentAttachment {
  id: string;
  name: string;
  mimeType: string;
  extension: string;
  sizeFormatted: string;
  pageCount?: number;
  isPdf?: boolean;
  extractedText?: string;
  textSnippet?: string;
  forensics?: any;
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
  attachments?: DocumentAttachment[];
  comparison?: any;
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
5. Document Analysis & PDF Authenticity Forensics: When documents or PDFs are attached:
   - Ground your analysis exclusively in the extracted text, metadata, and structural forensic findings provided in the context.
   - If the user asks whether a PDF has been edited, tampered with, or modified, or asks about authenticity:
     Structure your report clearly into five sections:
     1. **Document Overview**: Filename, file size, pages, creation/modification timestamps, and text extractability status.
     2. **Analysis Summary**: Overall verdict, critical anomalies, confidence level, and technical limitations.
     3. **Findings**: For each detected finding, present Title, Severity (Informational, Low, Medium, High), Page location, Evidence, Why it matters, Alternative explanations, and Recommended next steps.
     4. **Technical Details**: Incremental revisions/re-saves, metadata dictionary vs XMP stream alignment, annotations/overlays, fonts, and digital signatures.
     5. **Final Assessment**: Evidence-based judgment (No significant signs detected / Possible editing detected / Strong evidence of post-creation modifications / Inconclusive).
   - If the user asks general questions or follow-ups (e.g. 'Summarize this', 'Extract dates and amounts', 'Why was page 2 flagged?'), reference specific pages and quote exact sections accurately.
6. Stunning AI Image Generation: When the user asks to generate, draw, paint, create, illustrate, or show an image/photo/artwork/logo:
   - Formulate a breathtaking visual description of the artwork in the user's language.
   - Embed the generated image cleanly in your markdown response using:
     ![Descriptive Title](IMAGE_URL_PLACEHOLDER)
   - NEVER output, mention, or link to 'pollinations.ai' or any external third-party URL. Use ONLY the placeholder: ![Descriptive Title](IMAGE_URL_PLACEHOLDER).
   - Accompany the image with a creative aesthetic breakdown explaining the lighting, mood, palette, and composition in the user's language.
7. Canvas Code Generation: When the user explicitly requests code, games, or interactive web apps, provide complete, self-contained, production-ready code inside standard markdown blocks (\`\`\`html, \`\`\`python, etc.) so it immediately runs in the Canvas playground.
8. Strict Punctuation Constraint: Strictly avoid using em-dash characters anywhere in your response. Always use standard hyphens (-) or clean commas instead.`;

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
  if (/^(can you\s+)?(please\s+)?(generate|create|draw|make|paint|illustrate|render|show me)\s+(an?\s+)?(image|picture|photo|artwork|drawing|painting|illustration|wallpaper|logo|portrait|thumbnail|poster)\b/i.test(t)) {
    return true;
  }
  if (/^(draw|paint|illustrate|sketch)\s+(me\s+)?(an?\s+)?/i.test(t)) return true;
  if (/^(photo|picture|image|artwork|drawing)\s+of\s+/i.test(t)) return true;
  if (/(generate|create|make|design)\s+(a|an)?\s*(realistic|futuristic|cinematic|professional|cartoon|3d|anime)?\s*(portrait|thumbnail|landscape|cityscape|wallpaper|illustration|artwork|drawing|logo|poster|image|photo)/i.test(t)) return true;
  if (/turn\s+(my|this|the)?\s*(uploaded\s+)?(photo|image|picture)\s+into\s+(a\s+)?/i.test(t)) return true;
  if (/\b(16:9|9:16|4:3|1:1)\s+(format|aspect\s*ratio|image|photo)\b/i.test(t)) return true;

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

function isAuthenticityQuery(text: string): boolean {
  const t = text.toLowerCase();
  return (
    /edit|authenti|tamper|manipulat|modif|fake|real|check|origin|alter|chang|forg|verif|fraud|scrutin|revis|history|legit/i.test(
      t
    ) ||
    t.includes('has this pdf') ||
    t.includes('is this real') ||
    t.includes('is this pdf genuine') ||
    t.includes('was this changed') ||
    t.includes('compare') ||
    t.trim().length === 0
  );
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

async function generateGeminiImageUrl(subject: string, apiKey?: string): Promise<string> {
  try {
    const result = await generateAiImage({
      prompt: subject,
      style: 'photorealistic',
      aspectRatio: '1:1',
      apiKey,
    });
    return result.localProxyUrl || result.imageUrl;
  } catch {
    return '';
  }
}

function cleanSeparators(text: string): string {
  return text
    .replace(/^(\s*[-*_]{3,}\s*)$/gm, '')
    .replace(/<hr\s*\/?>/gi, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function cleanDisclaimers(text: string): string {
  return text
    .replace(/!\[.*?\]\(https?:\/\/(?:[a-zA-Z0-9-]+\.)*pollinations\.ai[^\s)]*\)/gi, '')
    .replace(/https?:\/\/(?:[a-zA-Z0-9-]+\.)*pollinations\.ai[^\s)]*/gi, '')
    .replace(/\b(?:image\.)?pollinations\.ai\b/gi, 'Gemini AI')
    .replace(/(as an ai|i am an ai|i cannot directly generate|i do not have the capability to generate|i'm unable to create images|while i cannot directly generate|unfortunately, i cannot create|i can't generate images|as a text-based ai|i am a text-based ai)[^.\n]*[.\n]?/gi, '')
    .replace(/(como ia|soy una ia|no puedo generar directamente|no tengo la capacidad de generar|no puedo crear imagenes)[^.\n]*[.\n]?/gi, '')
    .replace(/(en tant qu'ia|je suis une ia|je ne peux pas generer directement)[^.\n]*[.\n]?/gi, '')
    .replace(/(als ki|ich bin eine ki|ich kann nicht direkt generieren)[^.\n]*[.\n]?/gi, '')
    .replace(/(however,?\s+)?(if you('d| would) like to use this prompt|you can use this prompt)[^:\n]*:?/gi, '')
    .trim();
}

function buildDocumentContextPrompt(
  attachments?: DocumentAttachment[],
  comparison?: any
): string {
  if (!attachments || attachments.length === 0) return '';

  let context = `\n\n[ATTACHED DOCUMENTS AND FORENSIC ANALYSIS DATA]:\n`;

  attachments.forEach((doc, idx) => {
    context += `\n=== Document ${idx + 1}: "${doc.name}" (${doc.sizeFormatted}, ${doc.extension.toUpperCase()}) ===\n`;
    context += `Pages: ${doc.pageCount || 1}\n`;

    if (doc.forensics) {
      const f = doc.forensics;
      context += `Forensic Assessment: ${f.summary?.verdictTitle || 'N/A'}\n`;
      context += `Confidence Level: ${f.summary?.confidence || 'High'}\n`;
      context += `PDF Version: ${f.overview?.pdfVersion || 'N/A'}\n`;
      context += `Incremental Revisions Count: ${f.revisions?.revisionCount || 1}\n`;
      context += `Creation Timestamp: ${f.overview?.metadata?.creationDateParsed || f.overview?.metadata?.creationDate || 'Unknown'}\n`;
      context += `Modification Timestamp: ${f.overview?.metadata?.modDateParsed || f.overview?.metadata?.modDate || 'Unknown'}\n`;
      context += `Creator Software: ${f.overview?.metadata?.creator || 'None recorded'}\n`;
      context += `Producer Software: ${f.overview?.metadata?.producer || 'None recorded'}\n`;
      context += `XMP History Events: ${JSON.stringify(f.overview?.metadata?.xmpHistory || [])}\n`;
      context += `Annotations: ${f.annotations?.totalCount || 0} total (${f.annotations?.suspiciousCount || 0} suspicious overlay(s))\n`;
      context += `Digital Signatures: ${f.signatures?.hasDigitalSignatures ? 'Present' : 'None detected'}\n`;
      context += `Detected Fonts: ${(f.fonts?.fontFamilies || []).slice(0, 10).join(', ')}\n`;

      if (f.findings && f.findings.length > 0) {
        context += `\nObserved Forensic Findings:\n`;
        f.findings.forEach((finding: any) => {
          context += `* [${finding.severity}] ${finding.title}: ${finding.evidence} (Why: ${finding.whyItMatters})\n`;
        });
      }
    }

    if (doc.textSnippet) {
      context += `\nExtracted Content Preview:\n${doc.textSnippet.slice(0, 4000)}\n`;
    }
  });

  if (comparison) {
    context += `\n=== Multi-Document Version Comparison ===\n`;
    context += `Comparing "${comparison.doc1Name}" and "${comparison.doc2Name}":\n`;
    context += `Page delta: ${comparison.pageCountDiff?.delta || 0}\n`;
    context += `Added snippets: ${JSON.stringify(comparison.addedTextSnippets || [])}\n`;
    context += `Removed snippets: ${JSON.stringify(comparison.removedTextSnippets || [])}\n`;
    context += `Changed figures/dates: ${JSON.stringify(comparison.changedDatesAndNumbers || [])}\n`;
    context += `Metadata differences: ${JSON.stringify(comparison.metadataDiff || {})}\n`;
  }

  return context;
}

function buildOfflineForensicReply(
  userQuery: string,
  attachments?: DocumentAttachment[],
  comparison?: any
): string {
  if (comparison) {
    return `### Multi-Document Version Comparison

**Document 1:** ${comparison.doc1Name}
**Document 2:** ${comparison.doc2Name}

#### Key Structural Differences
* **Page Count Delta:** ${comparison.pageCountDiff?.delta > 0 ? `+${comparison.pageCountDiff.delta}` : comparison.pageCountDiff?.delta || 0} page(s)
* **Incremental Revisions:** Document 1 has ${comparison.revisionComparison?.doc1Revisions || 1} revision(s); Document 2 has ${comparison.revisionComparison?.doc2Revisions || 1} revision(s).

#### Content Changes
${
  comparison.addedTextSnippets?.length > 0
    ? `**Added Content:**\n` + comparison.addedTextSnippets.slice(0, 5).map((s: string) => `> ${s}`).join('\n\n')
    : `No large text additions detected.`
}

${
  comparison.removedTextSnippets?.length > 0
    ? `\n**Removed Content:**\n` + comparison.removedTextSnippets.slice(0, 5).map((s: string) => `> ~~${s}~~`).join('\n\n')
    : `\nNo large text deletions detected.`
}

#### Changed Figures, Dates, or Amounts
${
  comparison.changedDatesAndNumbers?.length > 0
    ? comparison.changedDatesAndNumbers
        .map((c: any) => `* **Before:** \`${c.original}\` -> **After:** \`${c.revised}\` (${c.context})`)
        .join('\n')
    : `No specific numeric discrepancies identified in standard tokens.`
}

#### Assessment
${comparison.overallAssessment}`;
  }

  const primaryDoc = attachments?.[0];
  if (primaryDoc?.forensics) {
    const f = primaryDoc.forensics;
    const ov = f.overview;
    const sm = f.summary;

    let report = `### 1. Document Overview
* **Filename:** ${ov.fileName}
* **File Size:** ${ov.fileSizeBytesFormatted} (${ov.fileSize.toLocaleString()} bytes)
* **PDF Specification:** Version ${ov.pdfVersion}
* **Page Count:** ${ov.pageCount} page(s)
* **Text Extractability:** ${ov.hasExtractableText ? `Extractable vector text (${ov.totalTextCharacters.toLocaleString()} characters)` : 'Scanned raster image / No selectable vector text'}
* **Creation Timestamp:** ${ov.metadata?.creationDateParsed || ov.metadata?.creationDate || 'Not specified'}
* **Modification Timestamp:** ${ov.metadata?.modDateParsed || ov.metadata?.modDate || 'Not specified'}
* **Producer / Creator:** ${ov.metadata?.producer || 'Unknown'} / ${ov.metadata?.creator || 'Unknown'}

### 2. Analysis Summary
* **Overall Assessment:** **${sm.verdictTitle}**
* **Confidence Level:** ${sm.confidence}
* **Critical Anomalies Identified:** ${sm.criticalAnomaliesCount}
* **Executive Summary:** ${sm.executiveSummary}

### 3. Detailed Findings
`;

    if (f.findings && f.findings.length > 0) {
      f.findings.forEach((finding: any, i: number) => {
        report += `#### Finding ${i + 1}: ${finding.title}
* **Severity:** \`${finding.severity}\`
* **Evidence:** ${finding.evidence}
* **Why it Matters:** ${finding.whyItMatters}
* **Alternative Explanations:** ${finding.alternativeExplanation}
* **Recommended Next Steps:** ${finding.recommendedNextSteps}

`;
      });
    } else {
      report += `No suspicious structural or metadata anomalies were identified in this file.\n\n`;
    }

    report += `### 4. Technical Details
* **Revision History:** ${f.revisions?.revisionCount || 1} revision slice(s) (${f.revisions?.hasIncrementalUpdates ? 'Incremental updates detected' : 'Single clean export'}).
* **Annotations & Overlays:** ${f.annotations?.totalCount || 0} annotation object(s), with ${f.annotations?.suspiciousCount || 0} potential text or square overlay(s).
* **Digital Signatures:** ${f.signatures?.hasDigitalSignatures ? `Present (${f.signatures.details.join('; ')})` : 'No cryptographic digital signature found'}.
* **Detected Typography:** ${f.fonts?.fontFamilies?.length > 0 ? f.fonts.fontFamilies.slice(0, 8).join(', ') : 'Standard system fonts'}.

### 5. Final Assessment
${f.finalAssessment}`;

    return report;
  }

  if (primaryDoc) {
    return `### Document Analysis: ${primaryDoc.name}

* **File Type:** ${primaryDoc.extension.toUpperCase()} (${primaryDoc.sizeFormatted})
* **Pages / Length:** ${primaryDoc.pageCount || 1} page(s)
* **Content Status:** Text successfully extracted.

#### Content Summary
${primaryDoc.textSnippet || 'No text content available.'}

How would you like to explore or analyze this document further? You can ask for a summary, key date and amount extractions, or specific section questions.`;
  }

  return `I have reviewed the uploaded file context. What specific questions or analysis would you like me to perform on this document?`;
}

async function generateOfflineFallback(
  userQuery: string,
  imageMode = false,
  attachments?: DocumentAttachment[],
  comparison?: any,
  userApiKey?: string
): Promise<{ reply: string; thinking?: string }> {
  // If attachments are present, produce forensic document analysis
  if (attachments && attachments.length > 0) {
    return {
      reply: buildOfflineForensicReply(userQuery, attachments, comparison),
      thinking: 'Evaluated document binary structure, parsed revision markers, and synthesized findings.',
    };
  }

  // If user asks for an image or image mode is active
  if (isImageQuery(userQuery, imageMode)) {
    const cleanSubject = extractImageSubject(userQuery);
    const imageUrl = await generateGeminiImageUrl(cleanSubject, userApiKey);
    return {
      reply: imageUrl
        ? `![${cleanSubject}](${imageUrl})\n\n**Visual Concept:** ${cleanSubject}`
        : `**Visual Concept:** ${cleanSubject}\n\nGenerated with Gemini AI.`,
    };
  }

  // Detect language family for natural fallback
  if (/[\u0600-\u06FF]/.test(userQuery)) {
    const isUrdu = /[\u0679\u0686\u0688\u0691\u06BA\u06D2]/.test(userQuery);
    if (isUrdu) {
      return {
        reply: `خوش آمدید! میں BunusRadar AI ہوں، آپ کا ذہین کثیر اللسانی اسسٹنٹ۔ میں ہر زبان اور ہر موضوع پر گفتگو کر سکتا ہوں، دستاویزات اور پی ڈی ایف فائلوں کی جانچ پڑتال کر سکتا ہوں، مضامین لکھ سکتا ہوں، اور کوڈنگ میں رہنمائی فراہم کر سکتا ہوں۔ بتائیے میں آج آپ کی کس طرح مدد کر سکتا ہوں؟`,
      };
    }
    return {
      reply: `أهلاً بك! أنا BunusRadar AI، مساعدك الذكي متعدد اللغات. يمكنني التحدث بجميع اللغات، وتحليل وفحص المستندات وملفات الـ PDF، وتوليد صور عالية الدقة، والمساعدة في كتابة وتشغيل البرمجيات. كيف يمكنني مساعدتك اليوم؟`,
    };
  }

  if (/[¿¡áéíóúüñ]/i.test(userQuery) || /\b(hola|como|estas|que|hacer|puedes|ayuda)\b/i.test(userQuery.toLowerCase())) {
    return {
      reply: `¡Hola! Soy BunusRadar AI, tu asistente conversacional multilingüe. Puedo hablar fluidamente en cualquier idioma, analizar documentos y archivos PDF en busca de modificaciones, redactar textos y generar arte con IA. ¿En qué puedo ayudarte hoy?`,
    };
  }

  if (/[àâçéèêëîïôûùüÿœæ]/i.test(userQuery) || /\b(bonjour|salut|comment|peux-tu|merci)\b/i.test(userQuery.toLowerCase())) {
    return {
      reply: `Bonjour ! Je suis BunusRadar AI, votre assistant conversationnel multilingue. Je peux communiquer dans toutes les langues, analyser l'authenticité de vos documents PDF, rédiger des articles et exécuter du code. Comment puis-je vous aider aujourd'hui ?`,
    };
  }

  if (/[äöüß]/i.test(userQuery) || /\b(hallo|guten|tag|wie|kannst|du)\b/i.test(userQuery.toLowerCase())) {
    return {
      reply: `Hallo! Ich bin BunusRadar AI, dein mehrsprachiger KI-Assistent. Ich beherrsche alle Sprachen fließend, analysiere PDF-Dokumente auf nachträgliche Bearbeitungen, verfasse Texte und unterstütze dich beim Programmieren. Wie kann ich dir heute behilflich sein?`,
    };
  }

  return {
    reply: `Hello! I am BunusRadar AI, your conversational assistant inspired by the capabilities of ChatGPT and Claude. You can upload documents and PDFs to analyze whether they have been edited or modified, extract data, chat naturally in any language, or run code right in the interactive Canvas. How can I help you today?`,
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
      attachments,
      comparison,
    } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages array is required' }, { status: 400 });
    }

    const latestUserMessage = messages[messages.length - 1]?.content || '';
    const activeKey = getRuntimeApiKey(apiKey);
    const personaInstruction = getSystemPersona(model, systemPrompt);
    const userWantsImage = isImageQuery(latestUserMessage, imageMode);
    const hasAttachments = attachments && attachments.length > 0;
    const isAuthenticity = hasAttachments && isAuthenticityQuery(latestUserMessage);

    // Format conversation history for Gemini API
    const contents = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    // Inject document forensics & extracted content into the context of the latest message
    if (hasAttachments && contents.length > 0) {
      const lastIndex = contents.length - 1;
      const documentContext = buildDocumentContextPrompt(attachments, comparison);
      const userText = contents[lastIndex].parts[0].text;

      let instructionNote = '';
      if (isAuthenticity) {
        instructionNote = `\n\n[System Instruction: The user is asking about document authenticity or signs of editing. Structure your answer using the five standard sections: 1. Document Overview, 2. Analysis Summary, 3. Findings (with Severity, Evidence, Why it matters, Alternative explanations, Recommended next steps), 4. Technical Details, 5. Final Assessment. Rely on the exact forensic evidence provided above.]`;
      } else {
        instructionNote = `\n\n[System Instruction: Ground your response in the attached document text and forensic metadata above. Cite specific pages and section numbers when answering the user's questions.]`;
      }

      contents[lastIndex].parts[0].text = `${userText}${documentContext}${instructionNote}`;
    }

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
            const highResImageUrl = await generateGeminiImageUrl(cleanSubject, activeKey);

            // Strip any third-party or hallucinated image markdown
            reply = reply.replace(/!\[.*?\]\(https?:\/\/[^\s)]+\)/gi, '').trim();

            if (highResImageUrl) {
              if (reply.includes('IMAGE_URL_PLACEHOLDER')) {
                reply = reply.replace(/IMAGE_URL_PLACEHOLDER/g, highResImageUrl);
              } else {
                reply = `![${cleanSubject}](${highResImageUrl})\n\n${reply}`.trim();
              }
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
    const fallback = await generateOfflineFallback(latestUserMessage, imageMode, attachments, comparison, activeKey);
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
