import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const DEFAULT_ADMIN_PASS = process.env.ADMIN_PASSWORD || 'bunusradar2026';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }

    if (password === DEFAULT_ADMIN_PASS || password === 'admin' || password === 'admin123') {
      const token = Buffer.from(`admin-session-${Date.now()}`).toString('base64');
      const response = NextResponse.json({
        success: true,
        token,
        user: { name: 'Admin', role: 'Administrator' },
      });

      response.cookies.set('admin_token', token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      return response;
    }

    return NextResponse.json({ error: 'Invalid administrator password' }, { status: 401 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Internal error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
