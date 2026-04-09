import { Resend } from 'resend';

type Env = {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
};

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

const jsonResponse = (body: Record<string, unknown>, status = 200): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
    },
  });

const escapeHtml = (value: string): string =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

export const onRequestPost = async (context: { request: Request; env: Env }): Promise<Response> => {
  const contentType = context.request.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return jsonResponse({ ok: false, message: 'Invalid content type' }, 400);
  }

  const payload = (await context.request.json()) as ContactPayload;
  const name = String(payload.name || '').trim();
  const email = String(payload.email || '').trim();
  const message = String(payload.message || '').trim();

  if (!name || !email || !message) {
    return jsonResponse({ ok: false, message: 'Missing required fields' }, 400);
  }

  if (!context.env.RESEND_API_KEY || !context.env.CONTACT_TO_EMAIL || !context.env.CONTACT_FROM_EMAIL) {
    return jsonResponse({ ok: false, message: 'Server env is not configured' }, 500);
  }

  const resend = new Resend(context.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: context.env.CONTACT_FROM_EMAIL,
    to: [context.env.CONTACT_TO_EMAIL],
    replyTo: email,
    subject: `New website inquiry from ${name}`,
    html: [
      '<h2>New contact form submission</h2>',
      `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
      `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
      `<p><strong>Message:</strong><br/>${escapeHtml(message).replaceAll('\n', '<br/>')}</p>`,
    ].join(''),
    headers: {
      'Idempotency-Key': `contact-form/${Date.now()}-${email.toLowerCase()}`,
    },
  });

  if (error) {
    return jsonResponse({ ok: false, message: error.message }, 500);
  }

  return jsonResponse({ ok: true, id: data?.id }, 200);
};
