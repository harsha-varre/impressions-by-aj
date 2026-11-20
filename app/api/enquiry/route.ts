import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { enquirySchema } from "@/lib/enquiry";
import { site } from "@/lib/site";

export const runtime = "nodejs";

// Simple in-memory, per-instance rate limiter.
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

  const studioHtml = `
    <h2 style="font-family:Georgia,serif;color:#3a2f3a">New enquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Occasion:</strong> ${escapeHtml(occasion)}</p>
    <p><strong>Session:</strong> ${escapeHtml(session)}</p>
    ${date ? `<p><strong>Preferred date:</strong> ${escapeHtml(date)}</p>` : ""}
    <p><strong>Message:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
  `;

  const replyHtml = `
    <div style="font-family:Georgia,serif;color:#3a2f3a">
      <p>Hi ${escapeHtml(name)},</p>
      <p>Thank you for reaching out to Impressions by AJ. We've received your
      enquiry about <strong>${escapeHtml(occasion)}</strong> and will reply
      within about 24 hours.</p>
      <p>— Impressions by AJ · ${escapeHtml(site.serviceArea)}</p>
    </div>
  `;

  const subject = `New enquiry — ${occasion} (${name})`;

  // ── Preferred: send through Gmail (SMTP) ────────────────────────────────
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  if (gmailUser && gmailPass) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: gmailUser, pass: gmailPass },
      });

      await transporter.sendMail({
        from: `"Impressions by AJ" <${gmailUser}>`,
        to: studioEmail,
        replyTo: `"${name}" <${email}>`,
        subject,
        html: studioHtml,
      });

      // Auto-reply to the enquirer (best effort).
      await transporter
        .sendMail({
          from: `"Impressions by AJ" <${gmailUser}>`,
          to: email,
          subject: "We received your enquiry — Impressions by AJ",
          html: replyHtml,
        })
        .catch((err) => console.warn("[enquiry] gmail auto-reply failed", err));

      return NextResponse.json({ ok: true, delivered: true });
    } catch (err) {
      console.error("[enquiry] gmail send failed", err);
      return NextResponse.json(
        { error: "We couldn't send your enquiry. Please email us directly." },
        { status: 502 }
      );
    }
  }

  // ── Fallback: Resend, if configured ─────────────────────────────────────
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);
      const from = "Impressions by AJ <onboarding@resend.dev>";

      const studioSend = await resend.emails.send({
        from,
        to: studioEmail,
        replyTo: email,
        subject,
        html: studioHtml,
      });
      if (studioSend.error) {
        console.error("[enquiry] resend send failed", studioSend.error);
        return NextResponse.json(
          { error: "We couldn't send your enquiry. Please email us directly." },
          { status: 502 }
        );
      }

      await resend.emails
        .send({
          from,
          to: email,
          subject: "We received your enquiry — Impressions by AJ",
          html: replyHtml,
        })
        .catch((err) => console.warn("[enquiry] resend auto-reply failed", err));

      return NextResponse.json({ ok: true, delivered: true });
    } catch (err) {
      console.error("[enquiry] resend error", err);
      return NextResponse.json(
        { error: "Unexpected error. Please email us directly." },
        { status: 500 }
      );
    }
  }

  // ── Neither configured — log so the UI still flows in dev ───────────────
  console.warn("[enquiry] no mailer configured; logging only.", {
    name,
    email,
    occasion,
  });
  return NextResponse.json({ ok: true, delivered: false });
}
