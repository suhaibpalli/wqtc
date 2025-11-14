import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyAuthTokenFromRequest } from '@/lib/auth';

// CREATE new video
export async function POST(req: NextRequest) {
  const user = verifyAuthTokenFromRequest(req);
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ code: 401, msg: 'Unauthorized' }, { status: 401 });
  }

  try {
    const {
      title,
      surah_no,
      surah_name,
      starting_ayah,
      ending_ayah,
      time_start_ayah,
      youTube_link,
      keywords
    } = await req.json();

    const video = await prisma.video.create({
      data: {
        title,
        surah_no: parseInt(surah_no),
        surah_name,
        starting_ayah: parseInt(starting_ayah),
        ending_ayah: ending_ayah ? parseInt(ending_ayah) : null,
        time_start_ayah,
        youTube_link,
        keywords,
        created_by: 'WQTC_Team'
      }
    });

    return NextResponse.json({ code: 200, msg: 'Success', result: video });
  } catch (error) {
    console.error('Create video error:', error);
    return NextResponse.json(
      { code: 500, msg: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// UPDATE video
export async function PUT(req: NextRequest) {
  const user = verifyAuthTokenFromRequest(req);
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ code: 401, msg: 'Unauthorized' }, { status: 401 });
  }

  try {
    const {
      id,
      title,
      surah_no,
      surah_name,
      starting_ayah,
      ending_ayah,
      time_start_ayah,
      youTube_link
    } = await req.json();

    const video = await prisma.video.update({
      where: { id: parseInt(id) },
      data: {
        title,
        surah_no: parseInt(surah_no),
        surah_name,
        starting_ayah: parseInt(starting_ayah),
        ending_ayah: ending_ayah ? parseInt(ending_ayah) : null,
        time_start_ayah,
        youTube_link
      }
    });

    return NextResponse.json({ code: 200, msg: 'Success', result: video });
  } catch (error) {
    console.error('Update video error:', error);
    return NextResponse.json(
      { code: 500, msg: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// DELETE video
export async function DELETE(req: NextRequest) {
  const user = verifyAuthTokenFromRequest(req);
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ code: 401, msg: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { code: 400, msg: 'Video ID required' },
        { status: 400 }
      );
    }

    await prisma.video.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ code: 200, msg: 'Success' });
  } catch (error) {
    console.error('Delete video error:', error);
    return NextResponse.json(
      { code: 500, msg: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
