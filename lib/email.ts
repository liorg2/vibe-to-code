import { withLang } from "./lang";
import type { Lang } from "./types";

const COURSES = (lang: Lang) => `https://www.vibetodev.com${withLang(lang, "/courses")}`;

/**
 * Resend, plain fetch — one endpoint doesn't earn the SDK.
 * ponytail: unset RESEND_API_KEY = email simply off, same as Paddle.
 */
export const emailEnabled = () => Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);

async function send(to: string, subject: string, text: string, idempotencyKey: string): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM; // e.g. "Vibe → Code <hello@vibetodev.com>", domain verified in Resend
  if (!key || !from) return;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey, // Resend drops a repeat within 24h
    },
    body: JSON.stringify({ from, to, subject, text, reply_to: "support@vibetodev.com" }),
    signal: AbortSignal.timeout(5000),
  });
  if (!res.ok) throw new Error(`resend ${res.status}: ${await res.text()}`);
}

const WELCOME: Record<Lang, (name: string) => { subject: string; text: string }> = {
  en: (name) => ({
    subject: "Welcome to Vibe → Code",
    text: `Hi${name ? ` ${name}` : ""},

Thanks for signing up. Your progress now saves across devices, so you can pick up where you left off.

Start here: ${COURSES("en")}

Questions? Just reply to this email.

Vibe → Code`,
  }),
  he: (name) => ({
    subject: "ברוכים הבאים ל-Vibe → Code",
    text: `היי${name ? ` ${name}` : ""},

תודה שנרשמתם. ההתקדמות שלכם נשמרת עכשיו בין מכשירים, כך שתוכלו להמשיך מאיפה שעצרתם.

מתחילים כאן: ${COURSES("he")}

שאלות? פשוט השיבו למייל הזה.

Vibe → Code`,
  }),
};

export function sendWelcome(uid: string, to: string, name: string, lang: Lang): Promise<void> {
  const { subject, text } = WELCOME[lang](name.split(" ")[0] ?? "");
  return send(to, subject, text, `welcome-${uid}`);
}
