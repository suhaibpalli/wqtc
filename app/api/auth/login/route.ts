// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { signToken } from '@/lib/auth';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ ok: false, msg: 'Missing credentials' }, { status: 400 });
    }

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // create token with role admin
      const token = signToken({ email, role: 'admin' });

      const res = NextResponse.json({ ok: true });
      // Set HttpOnly cookie
      const maxAge = 7 * 24 * 60 * 60; // 7 days
      const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
      // NextResponse#setCookie is available if using next/server helper in some versions,
      // but to be portable we set header manually:
      res.headers.set(
        'Set-Cookie',
        `token=${token}; HttpOnly; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`
      );
      return res;
    } else {
      return NextResponse.json({ ok: false, msg: 'Invalid credentials' }, { status: 401 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, msg: 'Server error' }, { status: 500 });
  }
}
