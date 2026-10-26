import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const VALID_USERNAME = process.env.ADMIN_USERNAME || 'eiland';
const VALID_PASSWORD = process.env.ADMIN_PASSWORD || '$&SW%&#j%{)5';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    if (username.trim() === VALID_USERNAME && password === VALID_PASSWORD) {
      const token = Buffer.from(`auth-session-${Date.now()}-${Math.random()}`).toString('base64');
      const response = NextResponse.json({
        success: true,
        token,
        user: { name: 'eiland', role: 'Administrator' },
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

    return NextResponse.json({ error: 'Invalid administrator credentials' }, { status: 401 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Internal error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
