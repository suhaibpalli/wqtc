// app/api/auth/me/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAuthTokenFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const user = verifyAuthTokenFromRequest(req);
  if (!user) return NextResponse.json({ ok: false }, { status: 401 });
  return NextResponse.json({ ok: true, user });
}
