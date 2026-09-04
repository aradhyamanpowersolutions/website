import { NextResponse } from 'next/server';

import { getTransporter, headerSafe, inboxAddress, isEmail } from '@/lib/mailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_RESUME_BYTES = 5 * 1024 * 1024;

export async function POST(request) {
  let form;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid form submission' }, { status: 400 });
  }

  const name = form.get('name');
  const email = form.get('email');
  const phone = form.get('phone');
  const interest = form.get('interest');
  const message = form.get('message');
  const resume = form.get('resume');

  if (form.get('website')) return NextResponse.json({ message: 'Application sent successfully' });

  if (!name?.trim() || !phone?.trim() || !interest?.trim() || !isEmail(email)) {
    return NextResponse.json(
      { error: 'Name, a valid email address, phone number and area of interest are required.' },
      { status: 400 }
    );
  }

  if (!resume || typeof resume === 'string') {
    return NextResponse.json({ error: 'A résumé file is required.' }, { status: 400 });
  }

  if (resume.type !== 'application/pdf' && !resume.name.toLowerCase().endsWith('.pdf')) {
    return NextResponse.json({ error: 'The résumé must be a PDF file.' }, { status: 400 });
  }

  if (resume.size > MAX_RESUME_BYTES) {
    return NextResponse.json({ error: 'The résumé must be under 5 MB.' }, { status: 413 });
  }

  try {
    const buffer = Buffer.from(await resume.arrayBuffer());

    await getTransporter().sendMail({
      from: `"${headerSafe(name)} via website" <${process.env.EMAIL_USER}>`,
      to: inboxAddress(),
      replyTo: headerSafe(email),
      subject: `New job application — ${headerSafe(interest)} — ${headerSafe(name)}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Area of interest: ${interest}`,
        '',
        'Message:',
        message || '—',
      ].join('\n'),
      attachments: [
        {
          filename: headerSafe(resume.name) || 'resume.pdf',
          content: buffer,
          contentType: 'application/pdf',
        },
      ],
    });

    return NextResponse.json({ message: 'Application sent successfully' });
  } catch (error) {
    console.error('Application mail failed:', error);
    return NextResponse.json({ error: 'Failed to send application' }, { status: 500 });
  }
}
