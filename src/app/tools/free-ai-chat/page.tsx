import { Metadata } from 'next';
import ChatPlaygroundClient from './ChatPlaygroundClient';

export const metadata: Metadata = {
  title: 'Free AI Chat, Image Generator & Canvas - ChatGPT & Claude Alternative',
  description: 'Free interactive AI Chat, Flux Image Generator, and Code Canvas Workspace. Multi-model support for Claude 3.5 Sonnet, GPT-4o, and DeepSeek R1. Generate high-res AI images and run live web apps.',
  keywords: [
    'free ai chat',
    'free ai image generator',
    'chatgpt alternative',
    'claude online free',
    'flux image generator online',
    'ai art generator free',
    'claude artifacts free',
    'ai code canvas',
    'deepseek r1 chat online',
    'ai reasoning playground'
  ],
  openGraph: {
    title: 'Free AI Chat & Code Canvas Workspace - ChatGPT & Claude Alternative',
    description: 'Interactive multi-model AI workspace featuring live code canvas execution, chain-of-thought reasoning, and artifact exports.',
    url: 'https://bunusradar.site/tools/free-ai-chat',
    siteName: 'BunusRadar',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Chat & Code Canvas Workspace - ChatGPT & Claude Alternative',
    description: 'Experience Claude-style artifacts, GPT-4o creative reasoning, and DeepSeek R1 thinking chains in a unified free developer workspace.',
  },
  alternates: {
    canonical: 'https://bunusradar.site/tools/free-ai-chat',
  },
};

export default function FreeAiChatPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'BunusRadar AI Workspace & Code Canvas',
    'url': 'https://bunusradar.site/tools/free-ai-chat',
    'description': 'Free multi-model AI reasoning playground and Claude-style interactive code canvas. Execute HTML5/JS apps, inspect chain-of-thought thinking, and export artifacts.',
    'applicationCategory': 'DeveloperApplication',
    'operatingSystem': 'Any',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
    },
    'featureList': [
      'Multi-model persona architecture: Claude 3.5 Sonnet, GPT-4o, and DeepSeek R1',
      'Native high-resolution AI Image Generator with direct downloads and aspect ratio controls',
      'Interactive Claude-style Artifacts Canvas with live sandboxed HTML/JS execution',
      'Chain-of-thought reasoning process visibility and step-by-step logic breakdown',
      'Local conversation persistence with zero tracking and privacy preservation',
      'One-click artifact export in HTML, Python, TypeScript, Markdown, and JSON',
      'Optional Bring-Your-Own-Key (BYOK) for OpenAI, Anthropic, and Gemini',
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'Is the BunusRadar AI Workspace free to use?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes. BunusRadar provides free interactive access to AI reasoning models and interactive code canvases with zero subscription requirements or mandatory login.',
        },
      },
      {
        '@type': 'Question',
        'name': 'How does the Claude-style Code Canvas work?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'When an AI model generates source code (such as HTML5, CSS, SVG, or JavaScript), the Canvas automatically detects the artifact and renders it inside a sandboxed live preview iframe. Users can interact with games, test components, inspect raw code, and download source files directly.',
        },
      },
      {
        '@type': 'Question',
        'name': 'Are my conversations private and secure?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'All conversation histories and optional personal API keys are stored exclusively in your local browser localStorage. No chat logs are harvested, sold, or retained on external databases.',
        },
      },
      {
        '@type': 'Question',
        'name': 'Can I connect my own OpenAI, Anthropic, or Gemini API keys?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes. Click the Settings icon in the top right control bar to enter your personal API key (BYOK). This allows direct, high-volume streaming completions through your preferred AI provider.',
        },
      },
    ],
  };

  return (
    <div className="h-[calc(100dvh-53px)] max-h-[100dvh] w-full bg-[#070d1e] text-slate-100 flex flex-col overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Main Interactive Tool Full-Width Screen */}
      <main className="flex-1 w-full h-full overflow-hidden">
        <ChatPlaygroundClient />
      </main>
    </div>
  );
}
