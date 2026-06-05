// Transactional email adapter, gated behind env vars, like the other
// integrations. Uses Resend's HTTP API so no SMTP/npm dependency is required.
//
//   RESEND_API_KEY , Resend API key
//   EMAIL_FROM     , verified sender, e.g. "GOIR <reports@yourdomain.com>"
//
// When unconfigured, sendEmail() is a graceful no-op so callers never break.

export function emailConfigured() {
  return !!(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
}

export async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}): Promise<{ ok: boolean; skipped?: boolean; error?: string }> {
  if (!emailConfigured()) return { ok: false, skipped: true };
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM,
        to: [opts.to],
        subject: opts.subject,
        html: opts.html,
        ...(opts.text ? { text: opts.text } : {}),
        ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
      }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return { ok: false, error: `Resend ${res.status}: ${detail.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: String(e?.message ?? e) };
  }
}
