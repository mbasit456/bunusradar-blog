'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import PostEditor from '@/components/admin/PostEditor';
import { RefreshCw } from 'lucide-react';

export default function EditPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [postData, setPostData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/admin/posts/${slug}`);
        const data = await res.json();
        if (data.success && data.post) {
          setPostData(data.post);
        } else {
          setError(data.error || 'Post not found');
        }
      } catch (err) {
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="py-20 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
        <RefreshCw className="w-4 h-4 animate-spin text-blue-400" />
        Loading article details...
      </div>
    );
  }

  if (error || !postData) {
    return (
      <div className="p-8 text-center bg-[#111827] border border-slate-800 rounded-2xl space-y-3">
        <h2 className="text-base font-bold text-red-400">Error Loading Article</h2>
        <p className="text-xs text-slate-400">{error || 'Unable to retrieve article from repository.'}</p>
      </div>
    );
  }

  return <PostEditor initialData={postData} isEditMode={true} />;
}
