// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // protect all /admin routes
  if (pathname.startsWith('/admin')) {
    // simple presence check of token cookie (Edge runtime safe)
    const token = req.cookies.get('token')?.value;
    if (!token) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
    // NOTE: middleware doesn't deeply verify JWT (Edge runtime restriction).
    // API routes will do full verification on the server side.
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
