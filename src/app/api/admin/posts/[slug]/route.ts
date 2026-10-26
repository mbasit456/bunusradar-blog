import { NextRequest, NextResponse } from 'next/server';
import { getPostBySlug, deletePostFile } from '@/lib/posts';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await getPostBySlug(params.slug);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      post: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        date: post.date,
        category: post.category,
        tags: post.tags,
        coverImage: post.coverImage,
        author: post.author,
        authorSlug: post.authorSlug,
        readingTime: post.readingTime,
        content: post.content,
      },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error fetching post';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const deleted = deletePostFile(params.slug);
    if (!deleted) {
      return NextResponse.json({ error: 'Post not found or could not be deleted' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Post "${params.slug}" deleted successfully`,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error deleting post';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
