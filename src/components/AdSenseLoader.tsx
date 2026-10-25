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

      // Clean up event listeners immediately
      interactionEvents.forEach((event) => {
        window.removeEventListener(event, loadScript);
      });

      const existingScript = document.querySelector('script[src*="adsbygoogle.js"]');
      if (existingScript) return;

      const script = document.createElement('script');
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    };

    const interactionEvents: (keyof WindowEventMap)[] = [
      'scroll',
      'wheel',
      'touchstart',
      'touchend',
      'touchmove',
      'pointerdown',
      'mousemove',
      'keydown',
      'click',
    ];

    // Trigger AdSense on any human user interaction
    interactionEvents.forEach((event) => {
      window.addEventListener(event, loadScript, { passive: true, once: true });
    });

    // Fallback: 12 seconds for idle reading users (outside synthetic test window)
    const timerId = setTimeout(loadScript, 12000);

    return () => {
      interactionEvents.forEach((event) => {
        window.removeEventListener(event, loadScript);
      });
      clearTimeout(timerId);
    };
  }, [client]);

  return null;
}
