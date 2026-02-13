import { NextResponse } from 'next/server';
import { z } from 'zod';

const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Server-side validation
    const result = newsletterSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid email' },
        { status: 400 }
      );
    }

    const { email } = result.data;

    // TODO: Integrate with newsletter service (e.g., Mailchimp, ConvertKit, Database)
    // Example: await db.newsletter.create({ data: { email } });

    if (process.env.NODE_ENV === 'development') {
      console.log('Newsletter subscription:', email);
    }

    return NextResponse.json(
      { message: 'Subscribed successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
