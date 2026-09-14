'use client';

import { useState } from 'react';
import { Share2, Check, Twitter, Linkedin, Facebook, Link as LinkIcon } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url?: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      return url || window.location.href;
    }
    return url || '';
  };

  const copyToClipboard = () => {
    const currentUrl = getShareUrl();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareTwitter = () => {
    const shareUrl = encodeURIComponent(getShareUrl());
    const text = encodeURIComponent(`"${title}" via GravityPulse`);
    window.open(`https://twitter.com/intent/tweet?url=${shareUrl}&text=${text}`, '_blank');
  };

  const shareLinkedIn = () => {
    const shareUrl = encodeURIComponent(getShareUrl());
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, '_blank');
  };

  const shareFacebook = () => {
    const shareUrl = encodeURIComponent(getShareUrl());
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank');
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mr-2 flex items-center gap-1">
        <Share2 className="w-3.5 h-3.5" /> Share:
      </span>

      <button
        onClick={shareTwitter}
        className="p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-colors"
        title="Share on X / Twitter"
      >
        <Twitter className="w-4 h-4" />
      </button>

      <button
        onClick={shareLinkedIn}
        className="p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-colors"
        title="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </button>

      <button
        onClick={shareFacebook}
        className="p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-colors"
        title="Share on Facebook"
      >
        <Facebook className="w-4 h-4" />
      </button>

      <button
        onClick={copyToClipboard}
        className="p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-colors relative"
        title="Copy Link"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <LinkIcon className="w-4 h-4" />}
      </button>
    </div>
  );
}
