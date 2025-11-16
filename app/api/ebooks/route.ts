import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { search, sort = 'DESC', limit, page = 1, perPage = 12 } = await req.json();

    const where: any = {};

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
      ];
    }

    // Calculate skip for pagination
    const skip = (page - 1) * perPage;

    // Get total count for pagination
    const total = await prisma.eBook.count({ where });

    // Fetch ebooks with pagination
    const ebooks = await prisma.eBook.findMany({
      where,
      orderBy: { createddate: sort.toLowerCase() as 'asc' | 'desc' },
      take: limit ? parseInt(limit) : perPage,
      skip: limit ? undefined : skip,
    });

    return NextResponse.json({
      code: 200,
      result: ebooks,
      pagination: {
        total,
        page,
        perPage,
        totalPages: Math.ceil(total / perPage),
      },
    });
  } catch (error) {
    console.error('EBooks API error:', error);
    return NextResponse.json({ code: 500, msg: 'Internal Server Error' }, { status: 500 });
  }
}
