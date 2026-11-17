import { NextResponse } from "next/server";
import { Resend } from "resend";
import { enquirySchema } from "@/lib/enquiry";
import { site } from "@/lib/site";

export const runtime = "nodejs";

// Simple in-memory, per-instance rate limiter.
// For multi-instance production, back this with Upstash/Redis.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 4;
const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 }
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Validation failed." },
      { status: 422 }
    );
  }

  // Honeypot caught a bot — pretend success, send nothing.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, occasion, session, date, message } = parsed.data;
  const studioEmail = process.env.STUDIO_EMAIL || site.email;
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // No key configured (e.g. local dev) — log and succeed so the UI flows.
    console.warn("[enquiry] RESEND_API_KEY not set; skipping email send.", {
      name,
      email,
      occasion,
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  const resend = new Resend(apiKey);
  const from = `Impressions by AJ <onboarding@resend.dev>`;

  const studioHtml = `
    <h2 style="font-family:Georgia,serif;color:#2d2528">New enquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Occasion:</strong> ${escapeHtml(occasion)}</p>
    <p><strong>Session:</strong> ${escapeHtml(session)}</p>
    <p><strong>Preferred date:</strong> ${escapeHtml(date)}</p>
    <p><strong>Message:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
  `;

  const replyHtml = `
    <div style="font-family:Georgia,serif;color:#2d2528">
      <p>Hi ${escapeHtml(name)},</p>
      <p>Thank you for reaching out to Impressions by AJ. We've received your
      enquiry about <strong>${escapeHtml(occasion)}</strong> and will reply
      within about 24 hours.</p>
      <p>— Impressions by AJ · ${escapeHtml(site.serviceArea)}</p>
    </div>
  `;

  try {
    const studioSend = await resend.emails.send({
      from,
      to: studioEmail,
      replyTo: email,
      subject: `New enquiry — ${occasion} (${name})`,
      html: studioHtml,
    });

    if (studioSend.error) {
      console.error("[enquiry] studio send failed", studioSend.error);
      return NextResponse.json(
        { error: "We couldn't send your enquiry. Please email us directly." },
        { status: 502 }
      );
    }

    // Auto-reply is best-effort; don't fail the request if it bounces.
    await resend.emails
      .send({
        from,
        to: email,
        subject: "We received your enquiry — Impressions by AJ",
        html: replyHtml,
      })
      .catch((err) => console.warn("[enquiry] auto-reply failed", err));

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[enquiry] unexpected error", err);
    return NextResponse.json(
      { error: "Unexpected error. Please email us directly." },
      { status: 500 }
    );
  }
}
