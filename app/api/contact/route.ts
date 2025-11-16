import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, country, message, joinClasses } = await req.json();

    // Validation
    if (!name || !email || !country) {
      return NextResponse.json(
        { code: 400, msg: 'Name, email, and country are required' },
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

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Add to mailing list if joinClasses is true

    console.log('Contact form submission:', {
      name,
      email,
      phone,
      country,
      message,
      joinClasses,
      timestamp: new Date().toISOString(),
    });

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({
      code: 200,
      msg: 'Message sent successfully! We\'ll get back to you soon.',
      result: {
        success: true,
      },
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { code: 500, msg: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
