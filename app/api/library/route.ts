import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/**
 * POST handler for /api/library
 * 
 * Filters videos by surah, ayah(range) and keyword.
 * 
 * Fix:
 * Instead of requiring starting_ayah == ayahNum, 
 * match videos whose ayah range includes ayahNum:
 *   starting_ayah <= ayahNum <= ending_ayah
 */
export async function POST(req: NextRequest) {
  try {
    const { surah, versus, search, sort = 'DESC', limit } = await req.json();

    // Log incoming request
    console.log('Incoming request:', { surah, versus, search, sort, limit });

    // Build where clause
    const where: any = {};

    if (surah) where.surah_no = parseInt(surah);

    if (versus) {
      // Support filtering by a range of verses
      if (typeof versus === 'string' && versus.includes('-')) {
        const [start, end] = versus.split('-').map(Number);
        if (!isNaN(start) && !isNaN(end)) {
          where.starting_ayah = { gte: start };
          where.ending_ayah = { lte: end };
        }
      } else {
        const ayahNum = parseInt(versus as string);
        if (!isNaN(ayahNum)) {
          where.AND = [
            { starting_ayah: { lte: ayahNum } },
            { ending_ayah: { gte: ayahNum } }
          ];
        }
      }
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { surah_name: { contains: search } },
        { keywords: { contains: search } },
      ];
    }

    // Log generated where clause
    console.log('Generated where clause:', where);

    // Fetch videos with filters
    const videos = await prisma.video.findMany({
      where,
      orderBy: {
        created_date: sort.toLowerCase() as 'asc' | 'desc'
      },
      take: limit ? parseInt(limit) : undefined,
      include: {
        surah: {
          select: {
            name: true
          }
        }
      }
    });

    // Log the result
    console.log('Fetched videos:', videos);

    return NextResponse.json({
      code: 200,
      result: videos
    });
  } catch (error) {
    console.error('Library API error:', error);
    return NextResponse.json(
      { code: 500, msg: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
