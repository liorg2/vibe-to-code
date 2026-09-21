import { NextResponse } from "next/server";
import { sessionUid } from "@/lib/verify-session";
import { getEntitlement } from "@/lib/db";
import { createCheckout, priceId } from "@/lib/paddle";

export async function POST(req: Request) {
  const uid = await sessionUid();
  if (!uid) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { tier } = (await req.json()) as { tier?: unknown };
  if (tier !== "basic" && tier !== "advanced") {
    return NextResponse.json({ error: "bad tier" }, { status: 400 });
  }

  // already paid for this much — /api/billing/upgrade is the only other thing to sell them
  const owned = await getEntitlement(uid);
  if (owned === tier || owned === "advanced") {
    return NextResponse.json({ error: "already owned" }, { status: 409 });
  }

  const price = priceId(tier);
  if (!price) return NextResponse.json({ error: "billing not configured" }, { status: 503 });

  const url = await createCheckout(price, uid, tier, new URL(req.url).origin);
  if (!url) return NextResponse.json({ error: "checkout unavailable" }, { status: 502 });
  return NextResponse.json({ url });
}
