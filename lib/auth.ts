// lib/auth.ts
import jwt from 'jsonwebtoken';
import type { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET ?? 'change-me';
const JWT_EXPIRES = process.env.JWT_EXPIRES ?? '7d';

export function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as any;
  } catch (err) {
    return null;
  }
}

/**
 * Read cookie token from NextRequest and verify.
 * Returns payload or null.
 */
export function verifyAuthTokenFromRequest(req: NextRequest) {
  // NextRequest has cookies helper
  const token = req.cookies?.get?.('token')?.value ?? null;
  if (!token) return null;
  return verifyToken(token);
}
