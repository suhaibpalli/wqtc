import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthTokenFromRequest } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(req: NextRequest) {
  const user = verifyAuthTokenFromRequest(req);
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ code: 401, msg: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    
    if (!file) {
      return NextResponse.json({ code: 400, msg: 'No file provided' }, { status: 400 });
    }

    // Validate file type (images only)
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ code: 400, msg: 'Only image files are allowed' }, { status: 400 });
    }

    // Validate file size (max 5MB for images)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ code: 400, msg: 'Image size exceeds 5MB limit' }, { status: 400 });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${timestamp}_${originalName}`;

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure public/coverpages directory exists
    const coverDir = join(process.cwd(), 'public', 'coverpages');
    if (!existsSync(coverDir)) {
      await mkdir(coverDir, { recursive: true });
    }

    // Write file
    const filePath = join(coverDir, filename);
    await writeFile(filePath, buffer);

    console.log(`Cover image uploaded successfully: ${filename}`);

    return NextResponse.json({
      code: 200,
      msg: 'Cover image uploaded successfully',
      result: { filename: `/coverpages/${filename}` },
    });
  } catch (error) {
    console.error('Cover upload error:', error);
    return NextResponse.json({ code: 500, msg: 'Cover image upload failed' }, { status: 500 });
  }
}
