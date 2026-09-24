import { createHmac, timingSafeEqual } from "node:crypto";
import { grantCourse, type Course } from "./db";

/**
 * Paddle Billing, merchant of record: it charges, collects the VAT and issues the invoice,
 * so nothing here touches tax. One-time prices only — no subscriptions, nothing to renew.
 * ponytail: plain fetch against three endpoints beats pulling in the SDK.
 */
function api(): { base: string; key: string } | null {
  const key = process.env.PADDLE_API_KEY;
  if (!key) return null; // ponytail: unset env = billing simply off, never a build-time crash
  const sandbox = process.env.PADDLE_ENV !== "production";
  return { base: sandbox ? "https://sandbox-api.paddle.com" : "https://api.paddle.com", key };
}

export function priceId(course: Course | "upgrade"): string | undefined {
  return course === "advanced"
    ? process.env.PADDLE_PRICE_ADVANCED
    : course === "upgrade"
      ? process.env.PADDLE_PRICE_UPGRADE
      : process.env.PADDLE_PRICE_BASIC;
}

/**
 * A pending one-time transaction plus its hosted checkout link.
 * `custom_data` is what the webhook and the return-URL re-check read back — the browser never
 * tells us who paid for what.
 */
export async function createCheckout(
  price: string,
  uid: string,
  course: Course,
): Promise<string | null> {
  const p = api();
  if (!p) return null;
  const res = await fetch(`${p.base}/transactions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${p.key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      items: [{ price_id: price, quantity: 1 }],
      // The wire field keeps the name `tier` — in-flight Paddle transactions already carry it —
      // but what it holds is a course id.
      custom_data: { uid, tier: course },
      // ponytail: no checkout.url — Paddle rejects any domain it hasn't approved, so each account's
      // default payment link (sandbox → stg, live → vibetodev.com, both /en/courses) is used.
      // Paddle appends `?_ptxn=txn_…`; PaddleCheckout opens the overlay and adds `paid=1` once paid.
    }),
  });
  if (!res.ok) {
    console.warn("paddle transaction failed:", res.status, await res.text());
    return null;
  }
  const body = (await res.json()) as { data?: { checkout?: { url?: string } } };
  return body.data?.checkout?.url ?? null;
}

type Txn = { status?: string; custom_data?: { uid?: string; tier?: string } };

export function asTier(v: unknown): Course | null {
  return v === "basic" || v === "advanced" ? v : null;
}

/**
 * The self-healing half: the buyer lands on /courses?paid=1&txn=… and we ask Paddle what that
 * transaction actually is, rather than believing the query string.
 * ponytail: makes a missed webhook cost one page view instead of a cron job.
 */
export async function claimTransaction(txn: string, uid: string): Promise<Course | null> {
  const p = api();
  if (!p || !txn.startsWith("txn_")) return null;
  const res = await fetch(`${p.base}/transactions/${encodeURIComponent(txn)}`, {
    headers: { Authorization: `Bearer ${p.key}` },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const { data } = (await res.json()) as { data?: Txn };
  const course = asTier(data?.custom_data?.tier);
  // paid by someone else, or not paid yet — either way this account bought nothing
  if (!course || data?.status !== "completed" || data?.custom_data?.uid !== uid) return null;
  await grantCourse(uid, course, txn);
  return course;
}

/**
 * `Paddle-Signature: ts=1700000000;h1=<hex>` over `${ts}:${rawBody}`.
 * Constant-time, and it must run before the body is parsed.
 * ponytail: no replay window on `ts` — the signature already pins the body, and a replayed
 * transaction.completed upserts the same row. Add a max-age check if that stops being true.
 */
export function verifySignature(header: string, raw: string, secret: string): boolean {
  const parts = Object.fromEntries(header.split(";").map((p) => p.split("=", 2) as [string, string]));
  if (!parts.ts || !parts.h1) return false;
  const want = Buffer.from(createHmac("sha256", secret).update(`${parts.ts}:${raw}`).digest("hex"));
  const got = Buffer.from(parts.h1);
  return want.length === got.length && timingSafeEqual(want, got);
}
