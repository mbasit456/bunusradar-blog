'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Send,
  Code2,
  Play,
  Square,
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
  Layers,
  Terminal,
  FileText,
  Sliders,
  ExternalLink,
  Bot,
  User,
  PanelLeftClose,
  PanelLeftOpen,
  Eye
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
  language: string;
  code: string;
}

const DEFAULT_MODELS = [
  { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', desc: 'Artifacts, Code Canvas, Systems Architecture', icon: '⚡', color: 'border-amber-500/40 text-amber-300' },
  { id: 'gpt-4o', name: 'GPT-4o', desc: 'Creative Reasoning, Technical Writing, Analysis', icon: '🚀', color: 'border-emerald-500/40 text-emerald-300' },
  { id: 'deepseek-r1', name: 'DeepSeek R1', desc: 'Chain-of-Thought Deep Reasoning Engine', icon: '🧠', color: 'border-sky-500/40 text-sky-300' },
  { id: 'gemini-3-flash', name: 'Gemini 3.8 Flash', desc: 'Ultra-Fast Low-Latency General Intelligence', icon: '⚡', color: 'border-purple-500/40 text-purple-300' },
];

const QUICK_STARTERS = [
  { title: 'Interactive Retro Game', prompt: 'Create an interactive retro arcade game in self-contained HTML, CSS, and Canvas JavaScript. Make it playable with arrow keys and colorful scoreboards.' },
  { title: 'FastAPI Microservice', prompt: 'Write a complete production-ready FastAPI microservice with Pydantic v2 schemas, JWT auth middleware, and async database session management.' },
  { title: 'React Data Table Component', prompt: 'Build a modular React data table component with client-side sorting, regex search filtering, pagination, and Tailwind CSS styling.' },
  { title: 'Enterprise AI Strategy RFC', prompt: 'Draft a comprehensive Request for Comments (RFC) analyzing the security, unit economics, and architecture of deploying local LLMs vs cloud APIs.' },
];

export default function ChatPlaygroundClient() {
  // Chat threads
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  
  // Input & state
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('claude-3-5-sonnet');
  const [webSearchEnabled, setWebSearchEnabled] = useState(false);
  
  // Canvas & Artifacts
  const [canvasOpen, setCanvasOpen] = useState(false);
  const [activeArtifact, setActiveArtifact] = useState<Artifact | null>(null);
  const [canvasTab, setCanvasTab] = useState<'preview' | 'code'>('preview');
  const [canvasFullscreen, setCanvasFullscreen] = useState(false);

  // Settings Modal
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState('You are an expert AI software engineer, architect, and technical advisor. Provide modular, production-ready code with complete explanations.');
  const [temperature, setTemperature] = useState(0.7);
  const [customApiKey, setCustomApiKey] = useState('');

  // UI helpers
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedThinking, setExpandedThinking] = useState<Record<string, boolean>>({});
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

    // Default first session
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
        // quota exceeded or blocked
      }
    }
  }, [sessions]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

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
  };

  const handleSwitchSession = (id: string) => {
    const target = sessions.find(s => s.id === id);
    if (target) {
      setActiveSessionId(id);
      setMessages(target.messages);
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

  // Extract code artifacts from assistant reply
  const extractArtifact = (text: string): Artifact | null => {
    const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/;
    const match = text.match(codeBlockRegex);
    if (match) {
      const lang = match[1].toLowerCase() || 'text';
      const code = match[2];
      return {
        id: 'art-' + Date.now(),
        title: lang.toUpperCase() + ' Code Canvas',
        language: lang,
        code: code,
      };
    }
    return null;
  };

  // Send Message
  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || loading) return;

    const userMsg: Message = {
      id: 'msg-' + Date.now(),
      role: 'user',
      content: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    let newTitle: string | undefined;

    // Set thread title on first message
    if (messages.length === 0) {
      newTitle = messageContent.slice(0, 32) + (messageContent.length > 32 ? '...' : '');
    }

    updateCurrentSessionMessages(newHistory, newTitle);
    setInput('');
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
          apiKey: customApiKey || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error(`Chat API error: ${response.statusText}`);
      }

      const data = await response.json();
      const assistantReply = data.reply || 'No response returned from the model.';
      const thinkingText = data.thinking;

      const assistantMsg: Message = {
        id: 'msg-' + (Date.now() + 1),
        role: 'assistant',
        content: assistantReply,
        thinking: thinkingText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: selectedModel,
      };

      const finalHistory = [...newHistory, assistantMsg];
      updateCurrentSessionMessages(finalHistory);

      // Auto-open canvas if code block is generated
      const artifact = extractArtifact(assistantReply);
      if (artifact) {
        setActiveArtifact(artifact);
        setCanvasOpen(true);
        setCanvasTab(artifact.language === 'html' || artifact.language === 'svg' ? 'preview' : 'code');
      }
    } catch (err: unknown) {
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

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleTextToSpeech = (text: string, id: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/```[\s\S]*?```/g, 'Code block omitted.').replace(/[#*_`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const handleDownloadArtifact = () => {
    if (!activeArtifact) return;
    const blob = new Blob([activeArtifact.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const ext = activeArtifact.language === 'html' ? 'html' : activeArtifact.language === 'python' ? 'py' : activeArtifact.language === 'typescript' ? 'ts' : 'txt';
    a.download = `bunusradar-artifact.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
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

  return (
    <div className="flex h-[calc(100vh-68px)] min-h-[640px] w-full bg-[#0b1329] text-slate-100 overflow-hidden font-sans border-b border-slate-800">
      
      {/* ─── LEFT SIDEBAR (CONVERSATION THREADS) ────────────────────────── */}
      <aside
        className={`${
          sidebarOpen ? 'w-64 sm:w-72' : 'w-0'
        } transition-all duration-300 ease-in-out bg-[#0e1938] border-r border-slate-800 flex flex-col shrink-0 overflow-hidden z-20`}
      >
        {/* Sidebar Header */}
        <div className="p-3 border-b border-slate-800 flex items-center justify-between gap-2">
          <button
            onClick={handleCreateNewChat}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-[#1b2e67] hover:bg-[#253f8a] text-white text-xs font-bold uppercase tracking-wider rounded-lg border border-blue-500/20 shadow-sm transition"
          >
            <Plus className="w-4 h-4 text-[#f9b44d]" />
            <span>New Chat</span>
          </button>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60"
            title="Collapse sidebar"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
            Recent Threads
          </div>
          {sessions.map(s => {
            const isActive = s.id === activeSessionId;
            return (
              <div
                key={s.id}
                onClick={() => handleSwitchSession(s.id)}
                className={`group flex items-center justify-between px-3 py-2.5 rounded-lg text-xs cursor-pointer transition ${
                  isActive
                    ? 'bg-[#1b2e67] text-white font-semibold shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <div className="truncate flex-1 pr-2">
                  {s.title || 'Untitled Thread'}
                </div>
                <button
                  onClick={e => handleDeleteSession(s.id, e)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-400 transition"
                  title="Delete thread"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Quick Starters Section */}
        <div className="p-3 border-t border-slate-800/80 bg-[#091126]/60">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#f9b44d] mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#f9b44d]" />
            <span>Quick Workspaces</span>
          </div>
          <div className="space-y-1.5">
            {QUICK_STARTERS.slice(0, 2).map((starter, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(starter.prompt)}
                className="w-full text-left text-[11px] p-2 rounded bg-slate-800/40 hover:bg-slate-800 text-slate-300 hover:text-white truncate border border-slate-700/50 block transition"
              >
                {starter.title}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* ─── CENTER CHAT CONTAINER ──────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0b1329] relative overflow-hidden">
        
        {/* Top Control Bar */}
        <header className="h-14 border-b border-slate-800/90 bg-[#0e1938]/90 backdrop-blur-md px-4 flex items-center justify-between gap-3 shrink-0 z-10">
          <div className="flex items-center gap-2">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition"
                title="Expand sidebar"
              >
                <PanelLeftOpen className="w-4 h-4" />
              </button>
            )}

            {/* Model Selector Dropdown */}
            <div className="relative">
              <select
                value={selectedModel}
                onChange={e => setSelectedModel(e.target.value)}
                className="bg-[#14234f] text-slate-100 text-xs font-semibold py-1.5 pl-3 pr-8 rounded-lg border border-slate-700 focus:outline-none focus:ring-1 focus:ring-[#f9b44d] cursor-pointer appearance-none"
              >
                {DEFAULT_MODELS.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.icon} {m.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Active Model Indicator Tag */}
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Active
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Canvas Toggle Button */}
            <button
              onClick={() => setCanvasOpen(!canvasOpen)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold rounded-lg border transition ${
                canvasOpen
                  ? 'bg-[#f9b44d] text-[#1b2e67] border-[#f9b44d]'
                  : 'bg-slate-800/60 text-slate-200 border-slate-700 hover:text-white hover:bg-slate-800'
              }`}
              title="Toggle Claude-style Canvas Panel"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Canvas</span>
            </button>

            {/* Export Dropdown */}
            <button
              onClick={() => handleExportChat('markdown')}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-lg transition"
              title="Export conversation as Markdown"
            >
              <Download className="w-4 h-4" />
            </button>

            {/* Settings Modal Trigger */}
            <button
              onClick={() => setSettingsOpen(true)}
              className="p-2 text-slate-400 hover:text-[#f9b44d] hover:bg-slate-800/60 rounded-lg transition"
              title="System prompt & API key settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8 space-y-6">
          {messages.length === 0 ? (
            /* Welcome Empty State */
            <div className="max-w-2xl mx-auto my-auto text-center py-10 space-y-6 animate-fadeIn">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#1b2e67] to-[#f9b44d] text-white shadow-lg">
                <Bot className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  BunusRadar AI Workspace
                </h1>
                <p className="text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
                  High-performance reasoning, interactive code canvases, and multi-model architectural intelligence powered by Claude, GPT-4o, and DeepSeek.
                </p>
              </div>

              {/* Starter Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 text-left">
                {QUICK_STARTERS.map((starter, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(starter.prompt)}
                    className="p-3.5 rounded-xl bg-[#14234f]/50 hover:bg-[#1b2e67]/70 border border-slate-700/60 hover:border-[#f9b44d]/50 transition group"
                  >
                    <div className="text-xs font-bold text-[#f9b44d] group-hover:underline mb-1">
                      {starter.title}
                    </div>
                    <div className="text-[11px] text-slate-300 line-clamp-2">
                      {starter.prompt}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Message Feed */
            messages.map(msg => {
              const isUser = msg.role === 'user';
              const isThinkingOpen = expandedThinking[msg.id] ?? false;
              const hasCode = !isUser && msg.content.includes('```');

              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-4xl mx-auto ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-8 h-8 rounded-lg bg-[#1b2e67] border border-blue-500/30 flex items-center justify-center text-[#f9b44d] shrink-0 font-bold text-xs">
                      AI
                    </div>
                  )}

                  <div className={`space-y-2 max-w-[88%] sm:max-w-[80%]`}>
                    {/* Collapsible Thinking Box (DeepSeek / Claude style) */}
                    {!isUser && msg.thinking && (
                      <div className="rounded-lg border border-sky-500/20 bg-sky-950/20 overflow-hidden text-xs">
                        <button
                          onClick={() =>
                            setExpandedThinking(prev => ({ ...prev, [msg.id]: !isThinkingOpen }))
                          }
                          className="w-full flex items-center justify-between px-3 py-2 text-sky-300 hover:bg-sky-900/30 font-semibold"
                        >
                          <span className="flex items-center gap-1.5">
                            <Cpu className="w-3.5 h-3.5 text-sky-400" />
                            Thought Process
                          </span>
                          {isThinkingOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                        </button>
                        {isThinkingOpen && (
                          <div className="p-3 text-slate-300 border-t border-sky-500/10 font-mono text-[11px] whitespace-pre-wrap leading-relaxed bg-[#071126]">
                            {msg.thinking}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Main Message Bubble */}
                    <div
                      className={`p-4 rounded-2xl text-sm leading-relaxed ${
                        isUser
                          ? 'bg-[#1b2e67] text-white rounded-br-xs border border-blue-500/20 shadow'
                          : 'bg-[#14234f]/80 text-slate-200 rounded-bl-xs border border-slate-700/60 shadow'
                      }`}
                    >
                      <div className="whitespace-pre-wrap font-sans">
                        {msg.content}
                      </div>

                      {/* Code Canvas Quick Trigger */}
                      {hasCode && (
                        <div className="mt-3 pt-3 border-t border-slate-700/60 flex items-center justify-between gap-2">
                          <span className="text-[11px] text-slate-400 flex items-center gap-1">
                            <Terminal className="w-3.5 h-3.5 text-[#f9b44d]" />
                            Code Artifact Detected
                          </span>
                          <button
                            onClick={() => {
                              const art = extractArtifact(msg.content);
                              if (art) {
                                setActiveArtifact(art);
                                setCanvasOpen(true);
                                setCanvasTab(art.language === 'html' || art.language === 'svg' ? 'preview' : 'code');
                              }
                            }}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold bg-[#f9b44d] hover:bg-[#e09e38] text-[#1b2e67] rounded-md transition"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Open in Canvas</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Actions Row */}
                    {!isUser && (
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 px-1">
                        <span>{msg.timestamp}</span>
                        <span>•</span>
                        <button
                          onClick={() => handleCopy(msg.content, msg.id)}
                          className="hover:text-white flex items-center gap-1 transition"
                        >
                          {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                        </button>
                        <span>•</span>
                        <button
                          onClick={() => handleTextToSpeech(msg.content, msg.id)}
                          className="hover:text-white flex items-center gap-1 transition"
                        >
                          {speakingId === msg.id ? (
                            <>
                              <VolumeX className="w-3 h-3 text-rose-400" />
                              <span>Stop</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3 h-3 text-sky-400" />
                              <span>Speak</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {isUser && (
                    <div className="w-8 h-8 rounded-lg bg-slate-700 border border-slate-600 flex items-center justify-center text-white shrink-0 font-bold text-xs">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })
          )}

          {/* Loading Indicator */}
          {loading && (
            <div className="flex gap-3 max-w-4xl mx-auto justify-start">
              <div className="w-8 h-8 rounded-lg bg-[#1b2e67] border border-blue-500/30 flex items-center justify-center text-[#f9b44d] shrink-0 font-bold text-xs animate-pulse">
                AI
              </div>
              <div className="bg-[#14234f]/80 p-4 rounded-2xl rounded-bl-xs border border-slate-700/60 flex items-center gap-3">
                <RefreshCw className="w-4 h-4 text-[#f9b44d] animate-spin" />
                <span className="text-xs text-slate-300 font-medium">
                  Synthesizing multi-step reasoning response...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <footer className="p-3 sm:p-4 bg-[#0e1938]/95 border-t border-slate-800 shrink-0">
          <div className="max-w-4xl mx-auto">
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="relative rounded-xl border border-slate-700/80 bg-[#091126] focus-within:border-[#f9b44d] focus-within:ring-1 focus-within:ring-[#f9b44d] transition shadow-lg"
            >
              <textarea
                ref={textareaRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ask anything, code a web app, analyze architecture, or generate Claude-style artifacts..."
                rows={2}
                className="w-full bg-transparent p-3 pr-24 text-sm text-white placeholder-slate-400 focus:outline-none resize-none leading-relaxed"
              />

              {/* Bottom Input Controls */}
              <div className="px-3 pb-2 flex items-center justify-between border-t border-slate-800/60 pt-2 text-xs">
                <div className="flex items-center gap-3 text-slate-400">
                  <button
                    type="button"
                    onClick={() => setWebSearchEnabled(!webSearchEnabled)}
                    className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-semibold border transition ${
                      webSearchEnabled
                        ? 'bg-blue-600/20 text-blue-300 border-blue-500/40'
                        : 'hover:text-white border-transparent'
                    }`}
                  >
                    <Search className="w-3 h-3" />
                    <span>Search Web</span>
                  </button>
                  <span className="text-[11px] hidden sm:inline">
                    Shift+Enter for newline
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400 hidden sm:inline">
                    {input.length} chars
                  </span>
                  <button
                    type="submit"
                    disabled={!input.trim() || loading}
                    className="flex items-center justify-center px-4 py-1.5 bg-[#f9b44d] hover:bg-[#e09e38] disabled:bg-slate-700 disabled:text-slate-500 text-[#1b2e67] font-bold text-xs rounded-lg transition shadow-md cursor-pointer disabled:cursor-not-allowed"
                  >
                    <span>Send</span>
                    <Send className="w-3 h-3 ml-1.5" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </footer>
      </div>

      {/* ─── RIGHT CLAUDE-STYLE ARTIFACT CANVAS ───────────────────────── */}
      {canvasOpen && (
        <aside
          className={`${
            canvasFullscreen ? 'absolute inset-0 z-50' : 'w-full md:w-[460px] lg:w-[560px] xl:w-[640px]'
          } bg-[#080e1e] border-l border-slate-800 flex flex-col shrink-0 shadow-2xl transition-all duration-200 z-30`}
        >
          {/* Canvas Top Header */}
          <div className="h-14 border-b border-slate-800 px-4 bg-[#0e1938] flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <Code2 className="w-4 h-4 text-[#f9b44d] shrink-0" />
              <div className="truncate text-xs font-bold text-white">
                {activeArtifact?.title || 'Interactive Canvas'}
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Tabs: Preview vs Code */}
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

              {/* Download */}
              <button
                onClick={handleDownloadArtifact}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
                title="Download artifact"
              >
                <Download className="w-4 h-4" />
              </button>

              {/* Fullscreen toggle */}
              <button
                onClick={() => setCanvasFullscreen(!canvasFullscreen)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
                title="Toggle fullscreen canvas"
              >
                {canvasFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              {/* Close Canvas */}
              <button
                onClick={() => setCanvasOpen(false)}
                className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition"
                title="Close canvas"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Canvas Main Body */}
          <div className="flex-1 overflow-hidden relative bg-[#060a17]">
            {activeArtifact ? (
              canvasTab === 'preview' ? (
                /* Interactive Live Sandboxed Iframe Preview */
                <iframe
                  title="Canvas Live Preview"
                  sandbox="allow-scripts allow-modals"
                  srcDoc={
                    activeArtifact.language === 'html'
                      ? activeArtifact.code
                      : `<!DOCTYPE html><html><head><style>body{background:#0f172a;color:#e2e8f0;font-family:sans-serif;padding:24px;line-height:1.6;}</style></head><body><h2>Code Artifact (${activeArtifact.language.toUpperCase()})</h2><p>Switch to the <strong>Code</strong> tab to inspect, copy, or export the source code.</p></body></html>`
                  }
                  className="w-full h-full border-none bg-white"
                />
              ) : (
                /* Syntax Highlighting / Code Editor View */
                <div className="h-full flex flex-col">
                  <div className="px-4 py-2 border-b border-slate-800 bg-[#091126] flex items-center justify-between text-xs text-slate-400">
                    <span>Language: <span className="text-[#f9b44d] font-bold uppercase">{activeArtifact.language}</span></span>
                    <button
                      onClick={() => handleCopy(activeArtifact.code, 'canvas-code')}
                      className="inline-flex items-center gap-1 text-slate-300 hover:text-white"
                    >
                      {copiedId === 'canvas-code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === 'canvas-code' ? 'Copied' : 'Copy Code'}</span>
                    </button>
                  </div>
                  <pre className="flex-1 p-4 overflow-auto font-mono text-xs leading-relaxed text-emerald-300 bg-[#060a17]">
                    <code>{activeArtifact.code}</code>
                  </pre>
                </div>
              )
            ) : (
              /* No Active Artifact */
              <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-3 text-slate-400">
                <Code2 className="w-10 h-10 text-slate-600" />
                <div className="text-sm font-semibold text-slate-300">
                  No Active Canvas Artifact
                </div>
                <p className="text-xs max-w-xs text-slate-500">
                  Ask the assistant to write an interactive web app, HTML canvas game, or Python service to view it live here.
                </p>
                <button
                  onClick={() => handleSendMessage('Create an interactive retro arcade game in HTML and Canvas.')}
                  className="px-3 py-1.5 bg-[#1b2e67] hover:bg-[#253f8a] text-[#f9b44d] text-xs font-bold rounded-lg transition"
                >
                  Generate Sample Game
                </button>
              </div>
            )}
          </div>
        </aside>
      )}

      {/* ─── SETTINGS MODAL (BYOK & SYSTEM PROMPT) ────────────────────── */}
      {settingsOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0e1938] border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <div className="flex items-center gap-2 font-bold text-white text-base">
                <Sliders className="w-5 h-5 text-[#f9b44d]" />
                <span>Playground Architecture Settings</span>
              </div>
              <button
                onClick={() => setSettingsOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* System Prompt Customizer */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                System Prompt Persona
              </label>
              <textarea
                value={systemPrompt}
                onChange={e => setSystemPrompt(e.target.value)}
                rows={3}
                className="w-full bg-[#080e1e] border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-[#f9b44d]"
              />
            </div>

            {/* Temperature Slider */}
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

            {/* BYOK Custom API Key */}
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
                className="w-full bg-[#080e1e] border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-[#f9b44d]"
              />
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Your key is stored solely in client-side memory and never logged. When empty, BunusRadar automated server intelligence provides completions.
              </p>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setSettingsOpen(false)}
                className="px-5 py-2 bg-[#f9b44d] hover:bg-[#e09e38] text-[#1b2e67] font-bold text-xs uppercase tracking-wider rounded-lg transition"
              >
                Apply Settings
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
