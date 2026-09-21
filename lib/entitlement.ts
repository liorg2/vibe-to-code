import { redirect } from "next/navigation";
import { getEntitlement, type Tier } from "./db";
import type { Level } from "./types";
import { sessionClaims } from "./verify-session";

const ALL: Level[] = ["A", "B"];

/**
 * ponytail: dark until the owner flips it in Vercel — unset means today's behaviour exactly,
 * every signed-in Google account sees everything and no DB row is ever read.
 */
export function billingOn(): boolean {
  return process.env.BILLING_ENABLED === "1";
}

/** Level maps one-to-one onto tier: basic buys A, advanced buys A and B. */
export function tierLevels(tier: Tier | null): Set<Level> {
  return new Set<Level>(tier === "advanced" ? ALL : tier === "basic" ? ["A"] : []);
}

/** What this visitor may actually read. No entitlement = nothing. Server components only. */
export async function allowedLevels(): Promise<Set<Level>> {
  if (!billingOn()) return new Set(ALL);
  const claims = await sessionClaims();
  if (!claims) return new Set<Level>();
  return tierLevels(await getEntitlement(claims.uid));
}

/** The tier a signed-in visitor owns, or null. */
export async function currentTier(): Promise<Tier | null> {
  const claims = await sessionClaims();
  return claims ? getEntitlement(claims.uid) : null;
}

/** For pages that have nothing at all to show a non-buyer — send them to the offer. */
export async function requireEntitlement(): Promise<Tier> {
  if (!billingOn()) return "advanced";
  const tier = await currentTier();
  if (!tier) redirect("/pricing");
  return tier;
}
