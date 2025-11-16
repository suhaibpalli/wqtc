import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyAuthTokenFromRequest } from '@/lib/auth';

// CREATE new ebook
export async function POST(req: NextRequest) {
  const user = verifyAuthTokenFromRequest(req);
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ code: 401, msg: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { title, filename, coverImage, description, pages } = await req.json();
    
    const ebook = await prisma.eBook.create({
      data: {
        title,
        filename,
        coverImage: coverImage || null,
        description: description || null,
        pages: pages ? parseInt(pages) : null,
        createdby: 'WQTCTeam',
      },
    });

    return NextResponse.json({ code: 200, msg: 'Success', result: ebook });
  } catch (error) {
    console.error('Create ebook error:', error);
    return NextResponse.json({ code: 500, msg: 'Internal Server Error' }, { status: 500 });
  }
}

// UPDATE ebook
export async function PUT(req: NextRequest) {
  const user = verifyAuthTokenFromRequest(req);
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ code: 401, msg: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, title, filename, coverImage, description, pages } = await req.json();
    
    const ebook = await prisma.eBook.update({
      where: { id: parseInt(id) },
      data: {
        title,
        filename,
        coverImage: coverImage || null,
        description: description || null,
        pages: pages ? parseInt(pages) : null,
      },
    });

    return NextResponse.json({ code: 200, msg: 'Success', result: ebook });
  } catch (error) {
    console.error('Update ebook error:', error);
    return NextResponse.json({ code: 500, msg: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE ebook
export async function DELETE(req: NextRequest) {
  const user = verifyAuthTokenFromRequest(req);
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ code: 401, msg: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ code: 400, msg: 'EBook ID required' }, { status: 400 });
    }

    await prisma.eBook.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ code: 200, msg: 'Success' });
  } catch (error) {
    console.error('Delete ebook error:', error);
    return NextResponse.json({ code: 500, msg: 'Internal Server Error' }, { status: 500 });
  }
}
