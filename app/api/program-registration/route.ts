import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, country, interest } = body;

    // TODO: Add your database logic here
    // Example: await db.registrations.create({ name, email, phone, country, interest })

    // TODO: Send confirmation email
    // Example: await sendEmail(email, 'Registration Confirmation', ...)

    console.log('New registration:', { name, email, phone, country, interest });

    return NextResponse.json(
      { msg: 'Registration successful!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { msg: 'Registration failed. Please try again.' },
      { status: 500 }
    );
  }
}
