import { NextResponse } from 'next/server';

import { getTransporter, headerSafe, inboxAddress, isEmail } from '@/lib/mailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { name, email, phone, company, message, website } = body ?? {};

  // Honeypot filled in => bot. Answer 200 so it does not learn anything.
  if (website) return NextResponse.json({ message: 'Message sent successfully' });

  if (!name?.trim() || !message?.trim() || !isEmail(email)) {
    return NextResponse.json(
      { error: 'Name, a valid email address and a message are required.' },
      { status: 400 }
    );
  }

  try {
    await getTransporter().sendMail({
      from: `"${headerSafe(name)} via website" <${process.env.EMAIL_USER}>`,
      to: inboxAddress(),
      replyTo: headerSafe(email),
      subject: `New contact enquiry from ${headerSafe(name)}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || '—'}`,
        `Company: ${company || '—'}`,
        '',
        'Message:',
        message,
      ].join('\n'),
    });

    return NextResponse.json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact mail failed:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
