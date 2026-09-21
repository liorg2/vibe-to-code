import { NextResponse } from "next/server";
import { sessionUid } from "@/lib/verify-session";
import { getEntitlement } from "@/lib/db";
import { createCheckout, priceId } from "@/lib/paddle";

/** Basic → Advanced is a second one-time charge of the difference. No proration, nothing to cancel. */
export async function POST(req: Request) {
  const uid = await sessionUid();
  if (!uid) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  if ((await getEntitlement(uid)) !== "basic") {
    return NextResponse.json({ error: "not a basic owner" }, { status: 409 });
  }

  const price = priceId("upgrade");
  if (!price) return NextResponse.json({ error: "billing not configured" }, { status: 503 });

  // the transaction is tagged advanced: paying it is what grants level B
  const url = await createCheckout(price, uid, "advanced", new URL(req.url).origin);
  if (!url) return NextResponse.json({ error: "checkout unavailable" }, { status: 502 });
  return NextResponse.json({ url });
}
