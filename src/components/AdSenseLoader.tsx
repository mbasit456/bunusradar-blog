'use client';

import { useEffect } from 'react';

interface AdSenseLoaderProps {
  client?: string;
}

export default function AdSenseLoader({ client = 'ca-pub-6911732447309638' }: AdSenseLoaderProps) {
  useEffect(() => {
    let loaded = false;

    const loadScript = () => {
      if (loaded) return;
      loaded = true;

      window.removeEventListener('scroll', loadScript);
      window.removeEventListener('pointerdown', loadScript);
      window.removeEventListener('touchstart', loadScript);
      window.removeEventListener('keydown', loadScript);

      const existingScript = document.querySelector('script[src*="adsbygoogle.js"]');
      if (existingScript) return;

      const script = document.createElement('script');
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    };

    window.addEventListener('scroll', loadScript, { passive: true, once: true });
    window.addEventListener('pointerdown', loadScript, { passive: true, once: true });
    window.addEventListener('touchstart', loadScript, { passive: true, once: true });
    window.addEventListener('keydown', loadScript, { passive: true, once: true });

    // Fallback: load after 4 seconds of idle time
    let timerId: NodeJS.Timeout | null = null;
    if ('requestIdleCallback' in window) {
      const idleCallback = (window as unknown as { requestIdleCallback: (cb: () => void, opts: { timeout: number }) => number }).requestIdleCallback;
      idleCallback(loadScript, { timeout: 4000 });
    } else {
      timerId = setTimeout(loadScript, 4000);
    }

    return () => {
      window.removeEventListener('scroll', loadScript);
      window.removeEventListener('pointerdown', loadScript);
      window.removeEventListener('touchstart', loadScript);
      window.removeEventListener('keydown', loadScript);
      if (timerId) clearTimeout(timerId);
    };
  }, [client]);

  return null;
}
