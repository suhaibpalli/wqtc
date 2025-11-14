import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const surahs = await prisma.surah.findMany({
      orderBy: {
        id: 'asc'
      }
    });

    return NextResponse.json({
      code: 200,
      result: surahs
    });
  } catch (error) {
    console.error('Surah API error:', error);
    return NextResponse.json(
      { code: 500, msg: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
