'use client';

import { useEffect, useState } from 'react';
import { List } from 'lucide-react';

interface TOCItem {
  level: number;
  text: string;
  id: string;
}

interface TableOfContentsProps {
  toc: TOCItem[];
}

export default function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0% 0% -60% 0%' }
    );

    toc.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [toc]);

  if (!toc || toc.length === 0) return null;

  return (
    <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center gap-2 font-semibold text-sm text-zinc-900 dark:text-zinc-100 mb-3 pb-2 border-b border-zinc-200/80 dark:border-zinc-800">
        <List className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        Table of Contents
      </div>
      <nav>
        <ul className="space-y-1.5 text-xs">
          {toc.map((item) => (
            <li
              key={item.id}
              style={{ paddingLeft: `${(item.level - 2) * 0.75}rem` }}
            >
              <a
                href={`#${item.id}`}
                className={`block py-1 transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                  activeId === item.id
                    ? 'text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-zinc-600 dark:text-zinc-400'
                }`}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
