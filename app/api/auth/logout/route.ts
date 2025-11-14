import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ ok: true });
  // clear cookie
  res.headers.set('Set-Cookie', `token=deleted; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`);
  return res;
}
