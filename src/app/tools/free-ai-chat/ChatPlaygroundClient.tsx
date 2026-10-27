'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { marked } from 'marked';
import {
  Sparkles,
  ArrowUp,
  Code2,
  Copy,
  Check,
  Download,
  Trash2,
  Plus,
  Settings,
  ChevronDown,
  ChevronRight,
  Maximize2,
  Minimize2,
  X,
  Volume2,
  VolumeX,
  RefreshCw,
  Search,
  Cpu,
  Sliders,
  ExternalLink,
  Bot,
  User,
  PanelLeftClose,
  PanelLeftOpen,
  Eye,
  Image as ImageIcon,
  ZoomIn,
  ThumbsUp,
  ThumbsDown,
  Edit2,
  Share2,
  Globe,
  MessageSquare,
  Wand2,
  Square,
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  thinking?: string;
  timestamp: string;
  model?: string;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
}

interface Artifact {
  id: string;
  title: string;
  type: 'code' | 'image';
  language?: string;
  code?: string;
  imageUrl?: string;
  prompt?: string;
  aspectRatio?: '1:1' | '16:9' | '9:16';
}

const DEFAULT_MODELS = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    tagline: 'Smartest & fastest for general conversation',
    desc: 'Creative reasoning, technical writing, executive briefs',
    icon: '🚀',
    badge: 'Popular',
  },
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    tagline: 'Best for coding & deep analysis',
    desc: 'Artifacts, live code canvas, systems architecture',
    icon: '⚡',
    badge: 'Coding',
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1',
    tagline: 'Open chain-of-thought reasoning engine',
    desc: 'Mathematical verification, formal logic, multi-turn reasoning',
    icon: '🧠',
    badge: 'Reasoning',
  },
  {
    id: 'gemini-3-flash',
    name: 'Gemini 3.8 Flash',
    tagline: 'Ultra-low latency general intelligence',
    desc: 'Rapid answers, real-time brainstorms, search summarization',
    icon: '✨',
    badge: 'Fast',
  },
];

const QUICK_STARTERS = [
  {
    title: 'Generate an 8K Image',
    desc: 'A futuristic cybernetic cat in neon Tokyo rain, photorealistic',
    prompt: 'Generate an image of a futuristic cybernetic cat sitting on a rainy rooftop in neon Tokyo at night, cinematic lighting, 8k.',
    icon: '🎨',
  },
  {
    title: 'Build a Retro Game',
    desc: 'Interactive arcade game in HTML5 Canvas and JavaScript',
    prompt: 'Create an interactive retro arcade game in self-contained HTML, CSS, and Canvas JavaScript. Make it playable with arrow keys.',
    icon: '🎮',
  },
  {
    title: 'Explain Quantum Computing',
    desc: 'Simple analogies explaining quantum superposition',
    prompt: 'Explain how quantum computing works compared to classical computing in simple, engaging terms with real-world analogies.',
    icon: '💡',
  },
  {
    title: 'Draft an Executive Brief',
    desc: 'Strategic overview of AI edge computing architecture',
    prompt: 'Write a sharp, high-level executive briefing on AI edge computing trends, detailing enterprise adoption and latency benefits.',
    icon: '✍️',
  },
];

interface MessagePart {
  type: 'text' | 'code' | 'image';
  content?: string;
  language?: string;
  code?: string;
  alt?: string;
  url?: string;
}

marked.setOptions({
  breaks: true,
  gfm: true,
});

function renderMarkdownToHtml(content: string): string {
  if (!content) return '';
  try {
    return marked.parse(content) as string;
  } catch {
    return content;
  }
}

function parseMessageParts(text: string): MessagePart[] {
  const parts: MessagePart[] = [];
  const regex = /(!\[(.*?)\]\((https?:\/\/[^\s)]+)\))|(```([a-zA-Z0-9_-]*)\n([\s\S]*?)```)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: text.slice(lastIndex, match.index) });
    }

    if (match[1]) {
      // Image markdown
      parts.push({
        type: 'image',
        alt: match[2] || 'AI Generated Artwork',
        url: match[3],
      });
    } else if (match[4]) {
      // Code block
      parts.push({
        type: 'code',
        language: match[5] || 'text',
        code: match[6],
      });
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push({ type: 'text', content: text.slice(lastIndex) });
  }

  return parts;
}

export default function ChatPlaygroundClient() {
  // Chat threads
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  // Search & rename threads
  const [searchQuery, setSearchQuery] = useState('');
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  // Input & state
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-4o');
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const [webSearchEnabled, setWebSearchEnabled] = useState(false);
  const [imageMode, setImageMode] = useState(false);

  // Canvas & Artifacts
  const [canvasOpen, setCanvasOpen] = useState(false);
  const [activeArtifact, setActiveArtifact] = useState<Artifact | null>(null);
  const [canvasTab, setCanvasTab] = useState<'preview' | 'code'>('preview');
  const [canvasFullscreen, setCanvasFullscreen] = useState(false);
  const [selectedRatio, setSelectedRatio] = useState<'1:1' | '16:9' | '9:16'>('1:1');

  // Lightbox Modal for Images
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  // Settings Modal
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState(
    'You are an intelligent, versatile, warm conversational assistant like ChatGPT and Claude. Chat naturally, write code only when asked, and generate images with rich detail.'
  );
  const [temperature, setTemperature] = useState(0.7);
  const [customApiKey, setCustomApiKey] = useState('');

  // UI helpers
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedThinking, setExpandedThinking] = useState<Record<string, boolean>>({});
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [feedbackState, setFeedbackState] = useState<Record<string, 'like' | 'dislike'>>({});
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const modelDropdownRef = useRef<HTMLDivElement>(null);
  const stopStreamingRef = useRef<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('bunusradar_ai_chats');
      if (saved) {
        const parsed = JSON.parse(saved) as ChatSession[];
        if (parsed.length > 0) {
          setSessions(parsed);
          setActiveSessionId(parsed[0].id);
          setMessages(parsed[0].messages);
          return;
        }
      }
    } catch (e) {
      // LocalStorage access fallback
    }

    const initialSession: ChatSession = {
      id: 'session-' + Date.now(),
      title: 'New Conversation',
      messages: [],
      createdAt: Date.now(),
    };
    setSessions([initialSession]);
    setActiveSessionId(initialSession.id);
    setMessages([]);
  }, []);

  // Save to localStorage when sessions change
  useEffect(() => {
    if (sessions.length > 0) {
      try {
        localStorage.setItem('bunusradar_ai_chats', JSON.stringify(sessions));
      } catch (e) {
        // storage quota fallback
      }
    }
  }, [sessions]);

  // Close model dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (modelDropdownRef.current && !modelDropdownRef.current.contains(e.target as Node)) {
        setModelDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll to bottom smoothly or instantly during active streaming
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: streamingMessageId ? 'auto' : 'smooth',
      });
    }
  }, [messages, loading, streamingMessageId]);

  // Clean up streaming on unmount
  useEffect(() => {
    return () => {
      stopStreamingRef.current = true;
    };
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(scrollHeight, 180)}px`;
    }
  }, [input]);

  // Sync active session messages
  const updateCurrentSessionMessages = (newMessages: Message[], newTitle?: string) => {
    setMessages(newMessages);
    setSessions(prev =>
      prev.map(s => {
        if (s.id === activeSessionId) {
          return {
            ...s,
            title: newTitle || s.title,
            messages: newMessages,
          };
        }
        return s;
      })
    );
  };

  const handleCreateNewChat = () => {
    stopStreamingRef.current = true;
    setStreamingMessageId(null);
    const newSession: ChatSession = {
      id: 'session-' + Date.now(),
      title: 'New Conversation',
      messages: [],
      createdAt: Date.now(),
    };
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
    setMessages([]);
    setInput('');
    setActiveArtifact(null);
    setCanvasOpen(false);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleSwitchSession = (id: string) => {
    stopStreamingRef.current = true;
    setStreamingMessageId(null);
    const target = sessions.find(s => s.id === id);
    if (target) {
      setActiveSessionId(id);
      setMessages(target.messages);
      setActiveArtifact(null);
      setCanvasOpen(false);
    }
  };

  const handleDeleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const remaining = sessions.filter(s => s.id !== id);
    if (remaining.length === 0) {
      const fresh: ChatSession = {
        id: 'session-' + Date.now(),
        title: 'New Conversation',
        messages: [],
        createdAt: Date.now(),
      };
      setSessions([fresh]);
      setActiveSessionId(fresh.id);
      setMessages([]);
    } else {
      setSessions(remaining);
      if (activeSessionId === id) {
        setActiveSessionId(remaining[0].id);
        setMessages(remaining[0].messages);
      }
    }
  };

  const handleStartRename = (s: ChatSession, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingSessionId(s.id);
    setEditingTitle(s.title);
  };

  const handleSaveRename = (id: string) => {
    if (editingTitle.trim()) {
      setSessions(prev =>
        prev.map(s => (s.id === id ? { ...s, title: editingTitle.trim() } : s))
      );
    }
    setEditingSessionId(null);
  };

  const handleClearAllChats = () => {
    if (confirm('Are you sure you want to clear all conversations?')) {
      const fresh: ChatSession = {
        id: 'session-' + Date.now(),
        title: 'New Conversation',
        messages: [],
        createdAt: Date.now(),
      };
      setSessions([fresh]);
      setActiveSessionId(fresh.id);
      setMessages([]);
      localStorage.removeItem('bunusradar_ai_chats');
    }
  };

  // Group sessions by date for ChatGPT-style history grouping
  const groupedSessions = useMemo(() => {
    const filtered = sessions.filter(s =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    const sevenDays = 7 * oneDay;

    const today: ChatSession[] = [];
    const previous7Days: ChatSession[] = [];
    const older: ChatSession[] = [];

    filtered.forEach(s => {
      const diff = now - s.createdAt;
      if (diff < oneDay) {
        today.push(s);
      } else if (diff < sevenDays) {
        previous7Days.push(s);
      } else {
        older.push(s);
      }
    });

    return { today, previous7Days, older };
  }, [sessions, searchQuery]);

  // Extract artifacts from assistant reply (Images or Code)
  const extractArtifact = (text: string): Artifact | null => {
    const imgMatch = text.match(/!\[(.*?)\]\((https?:\/\/[^\s)]+)\)/);
    if (imgMatch) {
      return {
        id: 'art-img-' + Date.now(),
        title: (imgMatch[1] || 'AI Generated Artwork').slice(0, 36),
        type: 'image',
        imageUrl: imgMatch[2],
        prompt: imgMatch[1] || 'AI Artwork',
        aspectRatio: '1:1',
      };
    }

    const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/;
    const match = text.match(codeBlockRegex);
    if (match) {
      const lang = match[1].toLowerCase() || 'text';
      const code = match[2];
      return {
        id: 'art-code-' + Date.now(),
        title: lang.toUpperCase() + ' Code Canvas',
        type: 'code',
        language: lang,
        code: code,
      };
    }
    return null;
  };

  // Progressive Word-by-Word Streamer (ChatGPT Real-Time Typing Effect)
  const streamAssistantResponse = (
    fullReply: string,
    thinkingText: string | undefined,
    historyBase: Message[]
  ) => {
    const assistantMsgId = 'msg-' + (Date.now() + 1);
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // If an image markdown is at the very beginning, render it immediately
    let initialContent = '';
    let textToStream = fullReply;

    const imageMatch = fullReply.match(/^(!\[.*?\]\(https?:\/\/[^\s)]+\)\n*)/);
    if (imageMatch) {
      initialContent = imageMatch[1];
      textToStream = fullReply.slice(imageMatch[1].length);
    }

    const newAssistantMsg: Message = {
      id: assistantMsgId,
      role: 'assistant',
      content: initialContent,
      thinking: thinkingText,
      timestamp,
      model: selectedModel,
    };

    setMessages([...historyBase, newAssistantMsg]);
    setStreamingMessageId(assistantMsgId);
    stopStreamingRef.current = false;

    // Tokenize text into words, whitespace, and punctuation
    const tokens = textToStream.match(/(\s+|\S+)/g) || [textToStream];

    let chunkSize = 1;
    if (tokens.length > 800) chunkSize = 6;
    else if (tokens.length > 400) chunkSize = 4;
    else if (tokens.length > 150) chunkSize = 2;

    let currentIndex = 0;
    let accumulated = initialContent;
    const delayMs = 18;

    const timer = setInterval(() => {
      if (stopStreamingRef.current || currentIndex >= tokens.length) {
        clearInterval(timer);
        setStreamingMessageId(null);

        const finalContent = stopStreamingRef.current ? accumulated : fullReply;
        const finalizedMsg: Message = {
          ...newAssistantMsg,
          content: finalContent,
        };
        const finalHistory = [...historyBase, finalizedMsg];
        updateCurrentSessionMessages(finalHistory);

        // Auto-open canvas if artifact (Image or Code) is generated
        const artifact = extractArtifact(finalContent);
        if (artifact) {
          setActiveArtifact(artifact);
          setCanvasOpen(true);
          if (artifact.type === 'image') {
            setCanvasTab('preview');
          } else {
            setCanvasTab(artifact.language === 'html' || artifact.language === 'svg' ? 'preview' : 'code');
          }
        }
        return;
      }

      const nextChunk = tokens.slice(currentIndex, currentIndex + chunkSize).join('');
      accumulated += nextChunk;
      currentIndex += chunkSize;

      setMessages(prev =>
        prev.map(m => (m.id === assistantMsgId ? { ...m, content: accumulated } : m))
      );
    }, delayMs);
  };

  // Send Message
  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || loading || streamingMessageId) return;

    const userMsg: Message = {
      id: 'msg-' + Date.now(),
      role: 'user',
      content: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    let newTitle: string | undefined;

    if (messages.length === 0) {
      newTitle = messageContent.slice(0, 32) + (messageContent.length > 32 ? '...' : '');
    }

    updateCurrentSessionMessages(newHistory, newTitle);
    setInput('');
    const currentImageMode = imageMode;
    if (imageMode) setImageMode(false);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map(m => ({ role: m.role, content: m.content })),
          model: selectedModel,
          systemPrompt,
          temperature,
          webSearch: webSearchEnabled,
          imageMode: currentImageMode,
          apiKey: customApiKey || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error(`Chat API error: ${response.statusText}`);
      }

      const data = await response.json();
      const assistantReply = data.reply || 'No response returned from the model.';
      const thinkingText = data.thinking;

      setLoading(false);
      streamAssistantResponse(assistantReply, thinkingText, newHistory);
    } catch (err: unknown) {
      setLoading(false);
      const errorMessage = err instanceof Error ? err.message : 'Failed to reach AI service';
      const fallbackMsg: Message = {
        id: 'msg-' + (Date.now() + 1),
        role: 'assistant',
        content: `I encountered an unexpected issue connecting to the completion API: ${errorMessage}.\n\nPlease try again or verify your settings in the top right.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: selectedModel,
      };
      updateCurrentSessionMessages([...newHistory, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  // Regenerate Response
  const handleRegenerate = async () => {
    if (loading || streamingMessageId || messages.length === 0) return;
    // Find the last user message
    const lastUserIdx = messages.map(m => m.role).lastIndexOf('user');
    if (lastUserIdx === -1) return;

    const trimmedHistory = messages.slice(0, lastUserIdx + 1);
    updateCurrentSessionMessages(trimmedHistory);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: trimmedHistory.map(m => ({ role: m.role, content: m.content })),
          model: selectedModel,
          systemPrompt,
          temperature,
          webSearch: webSearchEnabled,
          imageMode,
          apiKey: customApiKey || undefined,
        }),
      });

      if (!response.ok) throw new Error('API error');
      const data = await response.json();

      const assistantReply = data.reply || 'No response returned.';
      const thinkingText = data.thinking;

      setLoading(false);
      streamAssistantResponse(assistantReply, thinkingText, trimmedHistory);
    } catch (e) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFeedback = (msgId: string, type: 'like' | 'dislike') => {
    setFeedbackState(prev => ({
      ...prev,
      [msgId]: prev[msgId] === type ? (undefined as unknown as 'like') : type,
    }));
  };

  const handleTextToSpeech = (text: string, id: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text
      .replace(/!\[.*?\]\(.*?\)/g, 'Image generated.')
      .replace(/```[\s\S]*?```/g, 'Code block omitted.')
      .replace(/[#*_`]/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const handleDownloadImage = async (url: string, filename = 'bunusradar-ai-art.jpg') => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch (e) {
      window.open(url, '_blank');
    }
  };

  const handleDownloadArtifact = () => {
    if (!activeArtifact) return;

    if (activeArtifact.type === 'image' && activeArtifact.imageUrl) {
      handleDownloadImage(activeArtifact.imageUrl);
      return;
    }

    if (activeArtifact.code) {
      const blob = new Blob([activeArtifact.code], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const ext =
        activeArtifact.language === 'html'
          ? 'html'
          : activeArtifact.language === 'python'
          ? 'py'
          : activeArtifact.language === 'typescript'
          ? 'ts'
          : 'txt';
      a.download = `bunusradar-artifact.${ext}`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleUpdateImageRatio = (ratio: '1:1' | '16:9' | '9:16') => {
    setSelectedRatio(ratio);
    if (!activeArtifact || activeArtifact.type !== 'image' || !activeArtifact.imageUrl) return;

    let w = 1024;
    let h = 1024;
    if (ratio === '16:9') {
      w = 1280;
      h = 720;
    } else if (ratio === '9:16') {
      w = 720;
      h = 1280;
    }

    const updatedUrl = activeArtifact.imageUrl
      .replace(/width=\d+/, `width=${w}`)
      .replace(/height=\d+/, `height=${h}`);

    setActiveArtifact({
      ...activeArtifact,
      imageUrl: updatedUrl,
      aspectRatio: ratio,
    });
  };

  const handleRegenerateImageVariant = () => {
    if (!activeArtifact || activeArtifact.type !== 'image' || !activeArtifact.imageUrl) return;
    const newSeed = Math.floor(Math.random() * 999999);
    const updatedUrl = activeArtifact.imageUrl.replace(/seed=\d+/, `seed=${newSeed}`);
    setActiveArtifact({
      ...activeArtifact,
      imageUrl: updatedUrl,
    });
  };

  const handleExportChat = (format: 'markdown' | 'json') => {
    if (messages.length === 0) return;
    let content = '';
    let mime = 'text/plain';
    let filename = `chat-export-${Date.now()}`;

    if (format === 'markdown') {
      content = messages
        .map(m => `### ${m.role === 'user' ? 'User' : 'Assistant'} (${m.timestamp})\n\n${m.content}\n\n---\n`)
        .join('\n');
      mime = 'text/markdown';
      filename += '.md';
    } else {
      content = JSON.stringify(messages, null, 2);
      mime = 'application/json';
      filename += '.json';
    }

    const blob = new Blob([content], { type: `${mime};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const currentModelMeta = DEFAULT_MODELS.find(m => m.id === selectedModel) || DEFAULT_MODELS[0];

  return (
    <div className="flex h-full w-full bg-[#070d1e] text-slate-100 overflow-hidden font-sans">

      {/* ─── LEFT SIDEBAR (CHATGPT STYLE CONVERSATION HISTORY) ─────────── */}
      <aside
        className={`${
          sidebarOpen ? 'w-64 sm:w-72' : 'w-0'
        } transition-all duration-300 ease-in-out bg-[#0a1226] border-r border-slate-800/80 flex flex-col shrink-0 overflow-hidden z-20 select-none`}
      >
        {/* Sidebar Header: New Chat & Toggle */}
        <div className="p-3 border-b border-slate-800/80 flex items-center justify-between gap-2">
          <button
            onClick={handleCreateNewChat}
            className="flex-1 flex items-center gap-2 py-2 px-3 bg-[#121f45] hover:bg-[#1b2e67] text-white text-xs font-semibold rounded-xl border border-slate-700/80 hover:border-[#f9b44d]/50 shadow-sm transition group"
            title="Start a new chat"
          >
            <Plus className="w-4 h-4 text-[#f9b44d] group-hover:rotate-90 transition-transform duration-200" />
            <span className="truncate">New chat</span>
          </button>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/70 transition"
            title="Close sidebar"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>

        {/* Search Conversations Input */}
        <div className="px-3 pt-2.5 pb-1">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search chats..."
              className="w-full bg-[#070d1e] border border-slate-800 text-xs text-slate-200 pl-8 pr-3 py-1.5 rounded-lg focus:outline-none focus:border-[#f9b44d]/60 placeholder-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Grouped Conversation History */}
        <div className="flex-1 overflow-y-auto px-2 py-2 space-y-4 text-xs">
          {/* Today */}
          {groupedSessions.today.length > 0 && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                Today
              </div>
              <div className="space-y-0.5">
                {groupedSessions.today.map(s => renderSessionRow(s))}
              </div>
            </div>
          )}

          {/* Previous 7 Days */}
          {groupedSessions.previous7Days.length > 0 && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                Previous 7 Days
              </div>
              <div className="space-y-0.5">
                {groupedSessions.previous7Days.map(s => renderSessionRow(s))}
              </div>
            </div>
          )}

          {/* Older */}
          {groupedSessions.older.length > 0 && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                Older
              </div>
              <div className="space-y-0.5">
                {groupedSessions.older.map(s => renderSessionRow(s))}
              </div>
            </div>
          )}

          {sessions.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-xs">
              No previous conversations
            </div>
          )}
        </div>

        {/* Sidebar Footer (Clear chats, settings, user tier) */}
        <div className="p-3 border-t border-slate-800/80 bg-[#070d1e]/80 space-y-1">
          <button
            onClick={() => setSettingsOpen(true)}
            className="w-full flex items-center justify-between px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-xl transition"
          >
            <span className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-[#f9b44d]" />
              <span>Settings & Keys</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">BYOK</span>
          </button>

          <button
            onClick={handleClearAllChats}
            className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-slate-400 hover:text-rose-400 hover:bg-rose-950/20 rounded-xl transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear conversations</span>
          </button>

          <div className="pt-2 border-t border-slate-800/60 px-3 py-1 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>BunusRadar AI</span>
            </span>
            <span className="font-semibold text-[#f9b44d]">Free Plan</span>
          </div>
        </div>
      </aside>

      {/* ─── CENTER CHAT CONTAINER (CHATGPT STREAM VIEW) ────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#070d1e] relative overflow-hidden">

        {/* Top Control Header (ChatGPT Pill Model Switcher) */}
        <header className="h-14 border-b border-slate-800/70 bg-[#0a1226]/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-3 shrink-0 z-10">
          <div className="flex items-center gap-2">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-xl transition"
                title="Open sidebar"
              >
                <PanelLeftOpen className="w-4 h-4" />
              </button>
            )}

            {/* ChatGPT-Style Model Switcher Pill */}
            <div className="relative" ref={modelDropdownRef}>
              <button
                onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#121f45] hover:bg-[#1b2e67] border border-slate-700/80 hover:border-[#f9b44d]/50 text-xs font-bold text-white transition shadow-sm"
              >
                <span>{currentModelMeta.icon}</span>
                <span>{currentModelMeta.name}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                    modelDropdownOpen ? 'rotate-180 text-[#f9b44d]' : ''
                  }`}
                />
              </button>

              {/* Model Dropdown Menu */}
              {modelDropdownOpen && (
                <div className="absolute left-0 top-full mt-1.5 w-72 bg-[#0e1938] border border-slate-700 rounded-2xl p-1.5 shadow-2xl z-50 space-y-1 animate-fadeIn">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5">
                    Model Intelligence
                  </div>
                  {DEFAULT_MODELS.map(m => {
                    const isSelected = m.id === selectedModel;
                    return (
                      <button
                        key={m.id}
                        onClick={() => {
                          setSelectedModel(m.id);
                          setModelDropdownOpen(false);
                        }}
                        className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl text-left transition ${
                          isSelected
                            ? 'bg-[#1b2e67] text-white border border-blue-500/30'
                            : 'hover:bg-slate-800/60 text-slate-200'
                        }`}
                      >
                        <span className="text-base mt-0.5">{m.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-bold text-white">{m.name}</span>
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-slate-800 text-[#f9b44d] font-semibold border border-slate-700">
                              {m.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 truncate mt-0.5">{m.tagline}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Online Indicator */}
            <span className="hidden md:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              High Speed
            </span>
          </div>

          {/* Top Right Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Canvas Toggle */}
            <button
              onClick={() => setCanvasOpen(!canvasOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl border transition ${
                canvasOpen
                  ? 'bg-[#f9b44d] text-[#1b2e67] border-[#f9b44d] shadow-md'
                  : 'bg-[#121f45] text-slate-200 border-slate-700 hover:text-white hover:bg-[#1b2e67]'
              }`}
              title="Toggle Canvas & Studio workspace"
            >
              {activeArtifact?.type === 'image' ? (
                <ImageIcon className="w-3.5 h-3.5" />
              ) : (
                <Code2 className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline">
                {activeArtifact?.type === 'image' ? 'Image Studio' : 'Canvas'}
              </span>
            </button>

            {/* Export conversation */}
            <button
              onClick={() => handleExportChat('markdown')}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-xl transition"
              title="Export as Markdown"
            >
              <Download className="w-4 h-4" />
            </button>

            {/* Mobile New Chat shortcut */}
            {!sidebarOpen && (
              <button
                onClick={handleCreateNewChat}
                className="p-2 text-slate-400 hover:text-[#f9b44d] hover:bg-slate-800/60 rounded-xl transition"
                title="New chat"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>
        </header>

        {/* ─── MESSAGES STREAM ─────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 space-y-6">
          {messages.length === 0 ? (
            /* ChatGPT Iconic Welcome Screen */
            <div className="max-w-2xl mx-auto my-auto min-h-[50vh] flex flex-col items-center justify-center text-center space-y-8 animate-fadeIn pt-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#1b2e67] via-[#203a82] to-[#f9b44d] p-0.5 shadow-xl flex items-center justify-center">
                <div className="w-full h-full bg-[#070d1e] rounded-[14px] flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-[#f9b44d]" />
                </div>
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  What can I help with today?
                </h1>
                <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                  Chat conversationally, draft stories, generate 8K AI artwork, or build web applications in your interactive canvas.
                </p>
              </div>

              {/* ChatGPT 2x2 Starter Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full text-left pt-2">
                {QUICK_STARTERS.map((starter, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(starter.prompt)}
                    className="p-4 rounded-2xl bg-[#0e1938]/70 hover:bg-[#14234f]/90 border border-slate-800 hover:border-[#f9b44d]/50 transition-all duration-200 group text-left shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-base">{starter.icon}</span>
                      <span className="text-xs font-bold text-slate-200 group-hover:text-[#f9b44d] transition-colors">
                        {starter.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                      {starter.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* ChatGPT Conversation Thread */
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((msg, idx) => {
                const isUser = msg.role === 'user';
                const isThinkingOpen = expandedThinking[msg.id] ?? false;
                const parts = isUser
                  ? [{ type: 'text' as const, content: msg.content }]
                  : parseMessageParts(msg.content);

                return (
                  <div
                    key={msg.id}
                    className={`flex gap-3.5 ${isUser ? 'justify-end' : 'justify-start'} group`}
                  >
                    {/* Assistant Avatar */}
                    {!isUser && (
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#1b2e67] to-[#f9b44d] flex items-center justify-center text-[#1b2e67] font-black text-[11px] shrink-0 mt-1 shadow-sm">
                        <Sparkles className="w-3.5 h-3.5 text-[#1b2e67]" />
                      </div>
                    )}

                    <div className={`space-y-2 ${isUser ? 'max-w-[85%] sm:max-w-[75%]' : 'max-w-full flex-1'}`}>
                      {/* DeepSeek / Reasoning Box */}
                      {!isUser && msg.thinking && (
                        <div className="rounded-xl border border-sky-500/20 bg-sky-950/20 overflow-hidden text-xs max-w-2xl">
                          <button
                            onClick={() =>
                              setExpandedThinking(prev => ({
                                ...prev,
                                [msg.id]: !isThinkingOpen,
                              }))
                            }
                            className="w-full flex items-center justify-between px-3.5 py-2 text-sky-300 hover:bg-sky-900/30 font-semibold"
                          >
                            <span className="flex items-center gap-1.5">
                              <Cpu className="w-3.5 h-3.5 text-sky-400" />
                              Thought for a few seconds
                            </span>
                            {isThinkingOpen ? (
                              <ChevronDown className="w-3.5 h-3.5" />
                            ) : (
                              <ChevronRight className="w-3.5 h-3.5" />
                            )}
                          </button>
                          {isThinkingOpen && (
                            <div className="p-3.5 text-slate-300 border-t border-sky-500/10 font-mono text-[11px] whitespace-pre-wrap leading-relaxed bg-[#071126]">
                              {msg.thinking}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Message Content Container */}
                      {isUser ? (
                        /* ChatGPT User Bubble */
                        <div className="px-4 py-2.5 rounded-3xl bg-[#1b2e67] text-white text-sm leading-relaxed border border-blue-500/20 shadow-sm whitespace-pre-wrap">
                          {msg.content}
                        </div>
                      ) : (
                        /* ChatGPT Assistant Flow */
                        <div className="text-slate-100 text-[14.5px] leading-relaxed space-y-4 font-sans">
                          {msg.id === streamingMessageId && (!msg.content || msg.content.trim().length === 0) && (
                            <div className="flex items-center gap-2 py-1">
                              <span className="inline-block w-2 h-4 bg-[#f9b44d] rounded-sm animate-pulse shadow-[0_0_8px_rgba(249,180,77,0.8)]" />
                              <span className="text-xs text-slate-400 italic">Formulating response...</span>
                            </div>
                          )}
                          {parts.map((part, pIdx) => {
                            if (part.type === 'text') {
                              const isCurrentlyStreaming = msg.id === streamingMessageId;
                              return (
                                <div key={pIdx} className="relative">
                                  <div
                                    className="chat-rendered-markdown font-sans leading-relaxed"
                                    dangerouslySetInnerHTML={{
                                      __html: renderMarkdownToHtml(part.content || ''),
                                    }}
                                  />
                                  {isCurrentlyStreaming && pIdx === parts.length - 1 && (
                                    <span
                                      className="inline-block w-2 h-4 ml-1.5 bg-[#f9b44d] rounded-sm animate-pulse align-middle shadow-[0_0_8px_rgba(249,180,77,0.8)]"
                                      title="Writing..."
                                    />
                                  )}
                                </div>
                              );
                            }

                            if (part.type === 'image' && part.url) {
                              return (
                                <div
                                  key={pIdx}
                                  className="rounded-2xl overflow-hidden border border-slate-700/80 bg-[#0e1938] shadow-xl group/img relative my-3 max-w-xl"
                                >
                                  <div className="relative aspect-square max-w-xl overflow-hidden bg-slate-900 flex items-center justify-center">
                                    <img
                                      src={part.url}
                                      alt={part.alt || 'AI Artwork'}
                                      loading="lazy"
                                      className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-[1.02]"
                                    />
                                  </div>

                                  {/* Image Action Bar */}
                                  <div className="p-3 bg-[#0a1226] border-t border-slate-800 flex items-center justify-between gap-2">
                                    <div className="truncate text-xs text-slate-300 font-medium">
                                      {part.alt || 'AI Generated Artwork'}
                                    </div>
                                    <div className="flex items-center gap-1.5 shrink-0">
                                      <button
                                        onClick={() => setLightboxUrl(part.url || null)}
                                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
                                        title="View Fullscreen"
                                      >
                                        <ZoomIn className="w-3.5 h-3.5" />
                                      </button>
                                      <button
                                        onClick={() => handleDownloadImage(part.url!)}
                                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
                                        title="Download (.jpg)"
                                      >
                                        <Download className="w-3.5 h-3.5" />
                                      </button>
                                      <button
                                        onClick={() => {
                                          setActiveArtifact({
                                            id: 'art-img-' + Date.now(),
                                            title: (part.alt || 'AI Artwork').slice(0, 36),
                                            type: 'image',
                                            imageUrl: part.url,
                                            prompt: part.alt,
                                            aspectRatio: '1:1',
                                          });
                                          setCanvasOpen(true);
                                        }}
                                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold bg-[#f9b44d] hover:bg-[#e09e38] text-[#1b2e67] rounded-lg transition shadow"
                                      >
                                        <ExternalLink className="w-3 h-3" />
                                        <span>Studio</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              );
                            }

                            if (part.type === 'code' && part.code) {
                              return (
                                <div
                                  key={pIdx}
                                  className="rounded-2xl overflow-hidden border border-slate-700/80 bg-[#060a17] my-3 max-w-2xl shadow-lg"
                                >
                                  {/* Code Header Bar */}
                                  <div className="px-4 py-2 bg-[#0e1938] border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                                    <span className="font-bold text-[#f9b44d] uppercase tracking-wider text-[11px]">
                                      {part.language || 'Code'}
                                    </span>
                                    <div className="flex items-center gap-2">
                                      <button
                                        onClick={() => handleCopy(part.code!, `code-${pIdx}`)}
                                        className="hover:text-white flex items-center gap-1 text-[11px] transition"
                                      >
                                        {copiedId === `code-${pIdx}` ? (
                                          <Check className="w-3 h-3 text-emerald-400" />
                                        ) : (
                                          <Copy className="w-3 h-3" />
                                        )}
                                        <span>{copiedId === `code-${pIdx}` ? 'Copied' : 'Copy code'}</span>
                                      </button>
                                      <button
                                        onClick={() => {
                                          setActiveArtifact({
                                            id: 'art-code-' + Date.now(),
                                            title: (part.language || 'CODE').toUpperCase() + ' Canvas',
                                            type: 'code',
                                            language: part.language,
                                            code: part.code,
                                          });
                                          setCanvasOpen(true);
                                          setCanvasTab(
                                            part.language === 'html' || part.language === 'svg'
                                              ? 'preview'
                                              : 'code'
                                          );
                                        }}
                                        className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-bold bg-[#f9b44d] hover:bg-[#e09e38] text-[#1b2e67] rounded-md transition"
                                      >
                                        <ExternalLink className="w-3 h-3" />
                                        <span>Open in Canvas</span>
                                      </button>
                                    </div>
                                  </div>
                                  <pre className="p-4 overflow-x-auto text-xs font-mono text-emerald-300 leading-relaxed bg-[#060a17]">
                                    <code>{part.code}</code>
                                  </pre>
                                </div>
                              );
                            }

                            return null;
                          })}
                        </div>
                      )}

                      {/* ChatGPT Action Toolbar below assistant responses */}
                      {!isUser && msg.id !== streamingMessageId && msg.content && (
                        <div className="flex items-center gap-1.5 text-slate-400 pt-1 text-xs">
                          <button
                            onClick={() => handleCopy(msg.content, msg.id)}
                            className="p-1.5 hover:text-white hover:bg-slate-800/60 rounded-lg transition"
                            title="Copy response"
                          >
                            {copiedId === msg.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>

                          <button
                            onClick={() => handleFeedback(msg.id, 'like')}
                            className={`p-1.5 rounded-lg transition ${
                              feedbackState[msg.id] === 'like'
                                ? 'text-emerald-400 bg-emerald-950/40'
                                : 'hover:text-white hover:bg-slate-800/60'
                            }`}
                            title="Good response"
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleFeedback(msg.id, 'dislike')}
                            className={`p-1.5 rounded-lg transition ${
                              feedbackState[msg.id] === 'dislike'
                                ? 'text-rose-400 bg-rose-950/40'
                                : 'hover:text-white hover:bg-slate-800/60'
                            }`}
                            title="Poor response"
                          >
                            <ThumbsDown className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={handleRegenerate}
                            className="p-1.5 hover:text-[#f9b44d] hover:bg-slate-800/60 rounded-lg transition"
                            title="Regenerate response"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleTextToSpeech(msg.content, msg.id)}
                            className="p-1.5 hover:text-sky-400 hover:bg-slate-800/60 rounded-lg transition"
                            title="Read aloud"
                          >
                            {speakingId === msg.id ? (
                              <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                            ) : (
                              <Volume2 className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Loading State (ChatGPT Pulse) */}
              {loading && (
                <div className="flex gap-3.5 justify-start max-w-3xl mx-auto">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#1b2e67] to-[#f9b44d] flex items-center justify-center text-[#1b2e67] font-bold text-xs shrink-0 mt-1 animate-pulse">
                    <Sparkles className="w-3.5 h-3.5 text-[#1b2e67]" />
                  </div>
                  <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#0e1938] border border-slate-800 text-xs text-slate-300 font-medium">
                    <RefreshCw className="w-3.5 h-3.5 text-[#f9b44d] animate-spin" />
                    <span>
                      {imageMode
                        ? 'Creating 8K AI artwork...'
                        : 'BunusRadar AI is thinking...'}
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* ─── CHATGPT SIGNATURE FLOATING INPUT PILL ───────────────────── */}
        <footer className="p-3 sm:p-4 bg-gradient-to-t from-[#070d1e] via-[#070d1e]/95 to-transparent shrink-0">
          <div className="max-w-3xl mx-auto space-y-2">
            {/* Active Image Mode Banner */}
            {imageMode && (
              <div className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-blue-500/10 border border-[#f9b44d]/30 flex items-center justify-between text-xs text-amber-200">
                <span className="flex items-center gap-2">
                  <Wand2 className="w-3.5 h-3.5 text-[#f9b44d] animate-pulse" />
                  <span><strong>AI Image Generator Active:</strong> Describe what you want to visualize in high definition.</span>
                </span>
                <button
                  type="button"
                  onClick={() => setImageMode(false)}
                  className="text-slate-400 hover:text-white text-xs underline"
                >
                  Cancel
                </button>
              </div>
            )}

            {/* Floating Input Pill Box */}
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="relative rounded-3xl border border-slate-700/80 bg-[#0e1938] focus-within:border-[#f9b44d] focus-within:ring-1 focus-within:ring-[#f9b44d]/40 shadow-2xl transition-all duration-200 p-2.5"
            >
              <textarea
                ref={textareaRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (!loading && !streamingMessageId) {
                      handleSendMessage();
                    }
                  }
                }}
                placeholder={
                  imageMode
                    ? 'Describe the image you want to generate (e.g. A cyberpunk cat in neon Tokyo rain, photorealistic, 8k)...'
                    : 'Message BunusRadar AI...'
                }
                rows={1}
                className="w-full bg-transparent px-3 py-1.5 text-sm text-white placeholder-slate-400 focus:outline-none resize-none leading-relaxed min-h-[44px] max-h-[180px]"
              />

              {/* Bottom Row Tools inside the Pill */}
              <div className="flex items-center justify-between pt-1 px-1 text-xs">
                {/* Left Action Buttons */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {/* Create Image Toggle */}
                  <button
                    type="button"
                    onClick={() => setImageMode(!imageMode)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition ${
                      imageMode
                        ? 'bg-[#f9b44d] text-[#1b2e67] border-[#f9b44d] shadow-sm'
                        : 'bg-[#121f45] text-slate-300 border-slate-700 hover:text-white hover:border-[#f9b44d]/40'
                    }`}
                    title="Toggle AI Image Generation Mode"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Create Image</span>
                  </button>

                  {/* Web Search Toggle */}
                  <button
                    type="button"
                    onClick={() => setWebSearchEnabled(!webSearchEnabled)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition ${
                      webSearchEnabled
                        ? 'bg-sky-500/20 text-sky-300 border-sky-400/50'
                        : 'bg-[#121f45] text-slate-300 border-slate-700 hover:text-white hover:border-slate-600'
                    }`}
                    title="Toggle Web Search grounding"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Search</span>
                  </button>
                </div>

                {/* Right Circular Send / Stop Button (Signature ChatGPT Style) */}
                <div className="flex items-center gap-2">
                  {streamingMessageId ? (
                    <button
                      type="button"
                      onClick={() => {
                        stopStreamingRef.current = true;
                      }}
                      className="w-8 h-8 rounded-full bg-white hover:bg-slate-200 text-slate-900 flex items-center justify-center transition-all duration-200 shadow-md cursor-pointer transform hover:scale-105 active:scale-95"
                      title="Stop generating"
                    >
                      <Square className="w-3.5 h-3.5 fill-slate-900 text-slate-900" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!input.trim() || loading}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                        input.trim() && !loading
                          ? 'bg-[#f9b44d] hover:bg-[#e09e38] text-[#1b2e67] shadow-md transform hover:scale-105 active:scale-95 cursor-pointer'
                          : 'bg-slate-700/60 text-slate-400 cursor-not-allowed'
                      }`}
                      title="Send message"
                    >
                      <ArrowUp className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  )}
                </div>
              </div>
            </form>

            {/* ChatGPT Disclaimer */}
            <p className="text-center text-[11px] text-slate-400">
              BunusRadar AI can make mistakes. Verify important info.
            </p>
          </div>
        </footer>
      </div>

      {/* ─── RIGHT CANVAS / IMAGE STUDIO ──────────────────────────────── */}
      {canvasOpen && (
        <aside
          className={`${
            canvasFullscreen
              ? 'absolute inset-0 z-50'
              : 'w-full md:w-[460px] lg:w-[560px] xl:w-[640px]'
          } bg-[#080e1e] border-l border-slate-800 flex flex-col shrink-0 shadow-2xl transition-all duration-200 z-30`}
        >
          {/* Canvas Top Header */}
          <div className="h-14 border-b border-slate-800 px-4 bg-[#0e1938] flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              {activeArtifact?.type === 'image' ? (
                <ImageIcon className="w-4 h-4 text-pink-400 shrink-0" />
              ) : (
                <Code2 className="w-4 h-4 text-[#f9b44d] shrink-0" />
              )}
              <div className="truncate text-xs font-bold text-white">
                {activeArtifact?.title || 'Interactive Canvas'}
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {activeArtifact?.type === 'code' && (
                <div className="flex bg-slate-900 p-0.5 rounded-lg border border-slate-700">
                  <button
                    onClick={() => setCanvasTab('preview')}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md flex items-center gap-1 transition ${
                      canvasTab === 'preview'
                        ? 'bg-[#1b2e67] text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Eye className="w-3 h-3" />
                    <span>Preview</span>
                  </button>
                  <button
                    onClick={() => setCanvasTab('code')}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md flex items-center gap-1 transition ${
                      canvasTab === 'code'
                        ? 'bg-[#1b2e67] text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Code2 className="w-3 h-3" />
                    <span>Code</span>
                  </button>
                </div>
              )}

              <button
                onClick={handleDownloadArtifact}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
                title="Download artifact"
              >
                <Download className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCanvasFullscreen(!canvasFullscreen)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
                title="Toggle fullscreen"
              >
                {canvasFullscreen ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>

              <button
                onClick={() => {
                  setCanvasOpen(false);
                  setCanvasFullscreen(false);
                }}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
                title="Close canvas"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Canvas Main Body */}
          <div className="flex-1 overflow-hidden relative bg-[#070d1e]">
            {activeArtifact ? (
              activeArtifact.type === 'image' ? (
                /* Image Studio Panel */
                <div className="h-full flex flex-col p-4 overflow-y-auto space-y-4">
                  <div className="relative aspect-square max-h-[55vh] mx-auto rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 shadow-xl flex items-center justify-center">
                    <img
                      src={activeArtifact.imageUrl}
                      alt={activeArtifact.prompt || 'Generated Artwork'}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-300">Prompt:</div>
                    <div className="text-xs text-slate-400 bg-slate-900/80 p-3 rounded-xl border border-slate-800 leading-relaxed font-mono">
                      {activeArtifact.prompt}
                    </div>
                  </div>

                  {/* Aspect Ratio Selector */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-300">Aspect Ratio:</div>
                    <div className="flex gap-2">
                      {(['1:1', '16:9', '9:16'] as const).map(ratio => (
                        <button
                          key={ratio}
                          onClick={() => handleUpdateImageRatio(ratio)}
                          className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold border transition ${
                            selectedRatio === ratio
                              ? 'bg-[#f9b44d] text-[#1b2e67] border-[#f9b44d]'
                              : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-slate-600'
                          }`}
                        >
                          {ratio === '1:1' ? 'Square (1:1)' : ratio === '16:9' ? 'Landscape (16:9)' : 'Portrait (9:16)'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleRegenerateImageVariant}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#121f45] hover:bg-[#1b2e67] text-white text-xs font-bold rounded-xl border border-slate-700 hover:border-[#f9b44d]/50 transition"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-[#f9b44d]" />
                    <span>Generate New Variant</span>
                  </button>

                  <button
                    onClick={() => handleDownloadImage(activeArtifact.imageUrl!)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#f9b44d] hover:bg-[#e09e38] text-[#1b2e67] text-xs font-bold rounded-xl shadow transition"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Full Resolution (.jpg)</span>
                  </button>
                </div>
              ) : canvasTab === 'preview' ? (
                <iframe
                  title="Canvas Live Preview"
                  sandbox="allow-scripts allow-modals"
                  srcDoc={
                    activeArtifact.language === 'html'
                      ? activeArtifact.code
                      : `<!DOCTYPE html><html><head><style>body{background:#0f172a;color:#e2e8f0;font-family:sans-serif;padding:24px;line-height:1.6;}</style></head><body><h2>Code Artifact (${activeArtifact.language?.toUpperCase()})</h2><p>Switch to the <strong>Code</strong> tab to inspect, copy, or export the source code.</p></body></html>`
                  }
                  className="w-full h-full border-none bg-white"
                />
              ) : (
                <div className="h-full flex flex-col">
                  <div className="px-4 py-2 border-b border-slate-800 bg-[#091126] flex items-center justify-between text-xs text-slate-400">
                    <span>
                      Language:{' '}
                      <span className="text-[#f9b44d] font-bold uppercase">{activeArtifact.language}</span>
                    </span>
                    <button
                      onClick={() => handleCopy(activeArtifact.code || '', 'canvas-code')}
                      className="inline-flex items-center gap-1 text-slate-300 hover:text-white"
                    >
                      {copiedId === 'canvas-code' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>{copiedId === 'canvas-code' ? 'Copied' : 'Copy Code'}</span>
                    </button>
                  </div>
                  <pre className="flex-1 p-4 overflow-auto font-mono text-xs leading-relaxed text-emerald-300 bg-[#060a17]">
                    <code>{activeArtifact.code}</code>
                  </pre>
                </div>
              )
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-3 text-slate-400">
                <ImageIcon className="w-10 h-10 text-slate-600" />
                <div className="text-sm font-semibold text-slate-300">No Active Artifact</div>
                <p className="text-xs max-w-xs text-slate-400">
                  Ask the assistant to generate an AI image, write a web app, or build a game to view and interact with it here.
                </p>
                <button
                  onClick={() => handleSendMessage('Generate an image of a futuristic neon city at sunset.')}
                  className="px-4 py-2 bg-[#121f45] hover:bg-[#1b2e67] text-[#f9b44d] text-xs font-bold rounded-xl border border-slate-700 transition"
                >
                  Generate Sample Image
                </button>
              </div>
            )}
          </div>
        </aside>
      )}

      {/* ─── LIGHTBOX MODAL ───────────────────────────────────────────── */}
      {lightboxUrl && (
        <div
          onClick={() => setLightboxUrl(null)}
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl" onClick={e => e.stopPropagation()}>
            <img src={lightboxUrl} alt="Zoomed AI Artwork" className="w-full h-auto max-h-[85vh] object-contain rounded-2xl" />
            <button
              onClick={() => setLightboxUrl(null)}
              className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black text-white rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* ─── SETTINGS MODAL (BYOK & CUSTOM SYSTEM PROMPT) ─────────────── */}
      {settingsOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0e1938] border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
              <div className="flex items-center gap-2 font-bold text-white text-base">
                <Sliders className="w-5 h-5 text-[#f9b44d]" />
                <span>AI Workspace Settings</span>
              </div>
              <button
                onClick={() => setSettingsOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                System Prompt Persona
              </label>
              <textarea
                value={systemPrompt}
                onChange={e => setSystemPrompt(e.target.value)}
                rows={3}
                className="w-full bg-[#070d1e] border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-[#f9b44d] leading-relaxed"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-slate-300">Temperature</span>
                <span className="font-mono text-[#f9b44d]">{temperature}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={temperature}
                onChange={e => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-[#f9b44d] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Deterministic (0.0)</span>
                <span>Creative (1.0)</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                <span>Personal API Key (BYOK)</span>
                <span className="text-[10px] text-slate-400 font-normal">Optional</span>
              </label>
              <input
                type="password"
                value={customApiKey}
                onChange={e => setCustomApiKey(e.target.value)}
                placeholder="sk-... (OpenAI, Gemini, Anthropic)"
                className="w-full bg-[#070d1e] border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-[#f9b44d]"
              />
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Your key is stored solely in client-side memory. When empty, BunusRadar server intelligence handles completions for free.
              </p>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setSettingsOpen(false)}
                className="px-5 py-2 bg-[#f9b44d] hover:bg-[#e09e38] text-[#1b2e67] font-bold text-xs uppercase tracking-wider rounded-xl shadow transition"
              >
                Apply & Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );

  // Helper function to render each session row in the sidebar
  function renderSessionRow(s: ChatSession) {
    const isActive = s.id === activeSessionId;
    const isEditing = editingSessionId === s.id;

    return (
      <div
        key={s.id}
        onClick={() => handleSwitchSession(s.id)}
        className={`group flex items-center justify-between px-3 py-2 rounded-xl text-xs cursor-pointer transition ${
          isActive
            ? 'bg-[#121f45] text-white font-semibold border border-slate-700 shadow-sm'
            : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
        }`}
      >
        <div className="flex items-center gap-2 truncate flex-1 pr-1">
          <MessageSquare className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#f9b44d]' : 'text-slate-400'}`} />
          {isEditing ? (
            <input
              type="text"
              autoFocus
              value={editingTitle}
              onChange={e => setEditingTitle(e.target.value)}
              onBlur={() => handleSaveRename(s.id)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleSaveRename(s.id);
                if (e.key === 'Escape') setEditingSessionId(null);
              }}
              onClick={e => e.stopPropagation()}
              className="w-full bg-[#070d1e] border border-[#f9b44d] text-white text-xs px-1.5 py-0.5 rounded focus:outline-none"
            />
          ) : (
            <span className="truncate">{s.title || 'New Conversation'}</span>
          )}
        </div>

        {!isEditing && (
          <div className="opacity-0 group-hover:opacity-100 flex items-center gap-0.5 transition">
            <button
              onClick={e => handleStartRename(s, e)}
              className="p-1 text-slate-400 hover:text-white rounded"
              title="Rename conversation"
            >
              <Edit2 className="w-3 h-3" />
            </button>
            <button
              onClick={e => handleDeleteSession(s.id, e)}
              className="p-1 text-slate-400 hover:text-rose-400 rounded"
              title="Delete conversation"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    );
  }
}
