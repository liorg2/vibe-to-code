import { headers } from "next/headers";
import { PATHS } from "./course";
import { priceId } from "./paddle";

export type Prices = { basic: string; advanced: string; upgrade: string };

/** ILS, VAT included — what the site shows when Paddle is unset or unreachable. */
const ILS: Prices = {
  basic: `₪${PATHS.find((p) => p.id === "basic")!.price}`,
  advanced: `₪${PATHS.find((p) => p.id === "advanced")!.price}`,
  upgrade: "₪170",
};

// ponytail: per-instance cache, a country's prices change only when edited in Paddle.
// Stale for up to an hour after an edit; move to unstable_cache if that matters.
const cache = new Map<string, { at: number; p: Prices }>();

/**
 * The visitor's prices, formatted in their currency. Paddle is the one source of truth:
 * each price has a base (USD) plus per-country overrides (IL → ILS) set in the dashboard,
 * and checkout charges exactly what this preview shows.
 */
export async function localPrices(): Promise<Prices> {
  const key = process.env.PADDLE_API_KEY;
  const ids = { basic: priceId("basic"), advanced: priceId("advanced"), upgrade: priceId("upgrade") };
  if (!key || !ids.basic || !ids.advanced || !ids.upgrade) return ILS;

  // Vercel sets this from the request IP; absent locally, where IL is the sensible default
  const country = (await headers()).get("x-vercel-ip-country") ?? "IL";
  const hit = cache.get(country);
  if (hit && Date.now() - hit.at < 3_600_000) return hit.p;

  const base = process.env.PADDLE_ENV === "production" ? "https://api.paddle.com" : "https://sandbox-api.paddle.com";
  try {
    const res = await fetch(`${base}/pricing-preview`, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        items: Object.values(ids).map((price_id) => ({ price_id, quantity: 1 })),
        address: { country_code: country },
      }),
      cache: "no-store",
    });
    if (!res.ok) return ILS;
    const { data } = (await res.json()) as {
      data?: { details?: { line_items?: { price: { id: string }; formatted_totals: { total: string } }[] } };
    };
    // "₪99.00" → "₪99", "99,00 €" → "99 €"; real cents ("$9.99") stay
    const by = new Map(data?.details?.line_items?.map((l) => [l.price.id, l.formatted_totals.total.replace(/[.,]00(?!\d)/, "")]));
    const p: Prices = {
      basic: by.get(ids.basic) ?? ILS.basic,
      advanced: by.get(ids.advanced) ?? ILS.advanced,
      upgrade: by.get(ids.upgrade) ?? ILS.upgrade,
    };
    cache.set(country, { at: Date.now(), p });
    return p;
  } catch {
    return ILS; // a Paddle outage must never take the course page down
  }
}
