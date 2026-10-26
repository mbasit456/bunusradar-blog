'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  FolderTree,
  Users,
  Sparkles,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Search,
  Globe,
  Settings,
  ChevronRight,
  ShieldCheck,
  CheckCircle,
  Layers,
  Wand2
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  // Exclude login page from admin sidebar wrapper
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setIsAuth(true);
      return;
    }

    // Check token in localStorage or cookie
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
    const hasCookie = typeof document !== 'undefined' && document.cookie.includes('admin_token=');

    if (!token && !hasCookie) {
      setIsAuth(false);
      router.push('/admin/login');
    } else {
      setIsAuth(true);
    }
  }, [pathname, isLoginPage, router]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
      document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
    router.push('/admin/login');
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (isAuth === null) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white text-sm">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span>Authenticating BunusRadar Admin...</span>
        </div>
      </div>
    );
  }

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'All Posts', href: '/admin/posts', icon: FileText },
    { label: 'Add New Post', href: '/admin/posts/new', icon: PlusCircle },
    { label: 'AI Content Studio', href: '/admin/ai-generator', icon: Wand2, highlight: true },
    { label: 'Categories', href: '/admin/categories', icon: FolderTree },
    { label: 'Authors', href: '/admin/authors', icon: Users },
    { label: 'SEO & Sitemaps', href: '/admin/seo', icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col antialiased">
      {/* WordPress-style Top Admin Bar */}
      <header className="h-12 bg-[#1e293b] border-b border-slate-700/80 sticky top-0 z-50 px-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/60"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/admin" className="flex items-center gap-2 font-bold text-sm tracking-tight text-white hover:text-blue-400 transition-colors">
            <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-white text-xs font-black shadow-sm">
              W
            </div>
            <span>BunusRadar Admin</span>
          </Link>

          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700 hover:bg-slate-700 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
            Visit Site
          </Link>

          <Link
            href="/admin/posts/new"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-white px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 transition-colors shadow-sm"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            New Post
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-[11px] font-semibold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            CMS Online
          </div>

          <div className="flex items-center gap-2 pl-3 border-l border-slate-700 text-xs">
            <span className="text-slate-400">Howdy,</span>
            <span className="font-bold text-white">Admin</span>
            <button
              onClick={handleLogout}
              title="Log Out"
              className="p-1 rounded text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors ml-1"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Body with Sidebar + Content */}
      <div className="flex-1 flex">
        {/* WordPress Classic Dark Sidebar */}
        <aside
          className={`
            fixed md:sticky top-12 z-40 h-[calc(100vh-3rem)] w-64 bg-[#111827] border-r border-slate-800
            flex flex-col justify-between transition-transform duration-200 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}
        >
          <div className="py-4 px-3 space-y-1 overflow-y-auto">
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Content Management
            </div>

            {navItems.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all
                    ${
                      active
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                        : item.highlight
                        ? 'bg-indigo-950/50 text-indigo-300 hover:bg-indigo-900/60 border border-indigo-800/40'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }
                  `}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${active ? 'text-white' : item.highlight ? 'text-indigo-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.highlight && (
                    <span className="px-1.5 py-0.5 text-[9px] font-bold rounded uppercase tracking-wider bg-indigo-500 text-white">
                      AI
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="pt-6 px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Quick Shortcuts
            </div>

            <Link
              href="/tools/free-ai-chat"
              target="_blank"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>AI Chat & Flux Studio</span>
            </Link>

            <Link
              href="/sitemap.xml"
              target="_blank"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
            >
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>Inspect Sitemaps</span>
            </Link>
          </div>

          {/* Sidebar Footer */}
          <div className="p-3 border-t border-slate-800/80 bg-slate-900/60">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="text-[11px]">BunusRadar CMS</span>
              <button
                onClick={handleLogout}
                className="text-[11px] text-red-400 hover:text-red-300 font-semibold flex items-center gap-1"
              >
                <LogOut className="w-3 h-3" />
                Sign Out
              </button>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
