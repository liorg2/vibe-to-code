import { NextResponse } from "next/server";
import { upsertEntitlement } from "@/lib/db";
import { asTier, verifySignature } from "@/lib/paddle";

// node:crypto, and the raw body must survive untouched — neither works on Edge
export const runtime = "nodejs";

export async function POST(req: Request) {
  const secret = process.env.PADDLE_WEBHOOK_SECRET;
  const sig = req.headers.get("Paddle-Signature");
  const raw = await req.text(); // raw first — JSON.parse before verifying is the whole bug class
  if (!secret || !sig || !verifySignature(sig, raw, secret)) {
    return NextResponse.json({ error: "bad signature" }, { status: 401 });
  }

  const event = JSON.parse(raw) as {
    event_type?: string;
    data?: { id?: string; custom_data?: { uid?: string; tier?: string } };
  };
  // ponytail: one event type. Refunds are rare enough to revoke by hand, and a one-time
  // purchase has no renewal, cancellation or dunning to listen for.
  if (event.event_type !== "transaction.completed") return NextResponse.json({ ok: true });

  const uid = event.data?.custom_data?.uid;
  const tier = asTier(event.data?.custom_data?.tier);
  const txn = event.data?.id;
  if (!uid || !tier || !txn) {
    console.warn("paddle webhook without custom_data:", txn);
    return NextResponse.json({ ok: true });
  }

  await upsertEntitlement(uid, tier, txn);
  return NextResponse.json({ ok: true });
}
