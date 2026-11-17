import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

import { whatsappUrl } from '@/lib/utils';

const payload = z.object({
  name: z.string().trim().min(2).max(120),
  service: z.string().trim().min(1).max(160),
  message: z.string().trim().min(10).max(5000),
  locale: z.enum(['fr', 'ar', 'en']).optional(),
});

function fallback(message: string) {
  return NextResponse.json({ ok: true, mode: 'whatsapp', url: whatsappUrl(message) });
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const parsed = payload.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'invalid_payload' }, { status: 400 });
  }

  const { name, service, message } = parsed.data;
  const body = `WATIN — ${name}\nService : ${service}\n\n${message}`;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) return fallback(body);

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? 'WATIN <onboarding@resend.dev>',
      to: [to],
      subject: `WATIN — ${service}`,
      text: body,
    });
    return NextResponse.json({ ok: true, mode: 'email' });
  } catch {
    return fallback(body);
  }
}
