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

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json({ code: 400, msg: 'Only PDF files are allowed' }, { status: 400 });
    }

    // Validate file size (max 100MB)
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      return NextResponse.json({ code: 400, msg: 'File size exceeds 100MB limit' }, { status: 400 });
    }


    // Generate unique filename to avoid conflicts
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_'); // Sanitize filename
    const filename = `${timestamp}_${originalName}`;

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure public/pdfs directory exists
    const pdfsDir = join(process.cwd(), 'public', 'pdfs');
    if (!existsSync(pdfsDir)) {
      await mkdir(pdfsDir, { recursive: true });
    }

    // Write file to public/pdfs
    const filePath = join(pdfsDir, filename);
    await writeFile(filePath, buffer);

    console.log(`PDF uploaded successfully: ${filename}`);

    return NextResponse.json({
      code: 200,
      msg: 'File uploaded successfully',
      result: { filename },
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ code: 500, msg: 'File upload failed' }, { status: 500 });
  }
}
