import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validators/contact';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Server-side validation
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.issues },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = result.data;

    // TODO: Integrate with an email service (e.g., Resend, Nodemailer, SendGrid)
    // Example with Resend:
    // await resend.emails.send({
    //   from: 'Contact Form <onboarding@resend.dev>',
    //   to: 'ecell@gla.ac.in',
    //   subject: `New Contact: ${subject}`,
    //   text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    // });

    if (process.env.NODE_ENV === 'development') {
      console.log('Contact form submitted:', { name, email, subject, message });
    }

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
