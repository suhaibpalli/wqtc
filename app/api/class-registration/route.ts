import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyAuthTokenFromRequest } from '@/lib/auth';
import { sendRegistrationNotification } from '@/lib/email';

// CREATE - Submit class registration
export async function POST(req: NextRequest) {
  try {
    const {
      name,
      email,
      phone,
      whatsapp,
      country,
      language,
      classType,
      timing,
      days,
      contactNumber,
      additionalNotes,
    } = await req.json();

    // Validation
    if (!name || !email || !phone || !language || !classType || !timing) {
      return NextResponse.json(
        { code: 400, msg: 'Required fields missing' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { code: 400, msg: 'Invalid email address' },
        { status: 400 }
      );
    }

    const registration = await prisma.classRegistration.create({
      data: {
        name,
        email,
        phone,
        whatsapp: whatsapp || phone,
        country: country || 'India',
        language,
        classType,
        timing,
        days,
        contactNumber,
        additionalNotes: additionalNotes || '',
        status: 'pending',
      },
    });

    // Call email notification function after creation
    await sendRegistrationNotification(registration);

    return NextResponse.json({
      code: 200,
      msg: 'Registration successful! We will contact you on WhatsApp soon.',
      result: registration,
    });
  } catch (error) {
    console.error('Class registration error:', error);
    return NextResponse.json(
      { code: 500, msg: 'Registration failed. Please try again.' },
      { status: 500 }
    );
  }
}

// GET - Fetch all registrations (admin only)
export async function GET(req: NextRequest) {
  const user = verifyAuthTokenFromRequest(req);
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ code: 401, msg: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const language = searchParams.get('language');
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('perPage') || '20');

    const where: any = {};
    if (status) where.status = status;
    if (language) where.language = language;

    const [registrations, total] = await Promise.all([
      prisma.classRegistration.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: perPage,
        skip: (page - 1) * perPage,
      }),
      prisma.classRegistration.count({ where }),
    ]);

    return NextResponse.json({
      code: 200,
      result: registrations,
      pagination: {
        total,
        page,
        perPage,
        totalPages: Math.ceil(total / perPage),
      },
    });
  } catch (error) {
    console.error('Fetch registrations error:', error);
    return NextResponse.json(
      { code: 500, msg: 'Failed to fetch registrations' },
      { status: 500 }
    );
  }
}

// PUT - Update registration status (admin only)
export async function PUT(req: NextRequest) {
  const user = verifyAuthTokenFromRequest(req);
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ code: 401, msg: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, status } = await req.json();

    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return NextResponse.json(
        { code: 400, msg: 'Invalid status' },
        { status: 400 }
      );
    }

    const registration = await prisma.classRegistration.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    return NextResponse.json({
      code: 200,
      msg: 'Status updated successfully',
      result: registration,
    });
  } catch (error) {
    console.error('Update registration error:', error);
    return NextResponse.json(
      { code: 500, msg: 'Failed to update registration' },
      { status: 500 }
    );
  }
}
