import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts, savePostFile } from '@/lib/posts';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const posts = getAllPosts(true);
    const summary = posts.map((p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      date: p.date,
      rawDate: p.rawDate || p.date,
      category: p.category,
      tags: p.tags,
      author: p.author,
      authorSlug: p.authorSlug,
      coverImage: p.coverImage,
      readingTime: p.readingTime,
      wordCount: p.readingTime ? (parseInt(p.readingTime, 10) || 1) * 200 : 800,
      featured: p.featured,
    }));

    return NextResponse.json({
      success: true,
      total: summary.length,
      posts: summary,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error fetching posts';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { slug, title, excerpt, date, category, tags, coverImage, author, content } = body;

    if (!title || !title.trim()) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const effectiveSlug = (slug && slug.trim())
      ? slug.trim().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
      : title.trim().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');

    if (!effectiveSlug) {
      return NextResponse.json({ error: 'Valid slug or title is required' }, { status: 400 });
    }

    const result = savePostFile({
      slug: effectiveSlug,
      title: title.trim(),
      excerpt: excerpt?.trim() || '',
      date: date || new Date().toISOString().split('T')[0],
      category: category || 'technology',
      tags: Array.isArray(tags) ? tags : typeof tags === 'string' ? tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
      coverImage: coverImage?.trim() || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
      author: author || { name: 'BunusRadar Editorial' },
      content: content || 'Write your article markdown here...',
    });

    return NextResponse.json({
      success: true,
      message: 'Post saved successfully',
      post: {
        slug: result.slug,
        title,
        url: `/blog/${result.slug}`,
      },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error saving post';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
