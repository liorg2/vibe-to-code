import { NextResponse } from "next/server";
import { sessionUid } from "@/lib/verify-session";
import { getCourses } from "@/lib/db";
import { createCheckout, priceId } from "@/lib/paddle";

/** The bundle price: own one course, buy the other for the difference. Either direction. */
export async function POST(req: Request) {
  const uid = await sessionUid();
  if (!uid) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const owned = await getCourses(uid);
  if (owned.length !== 1) {
    // none owned — nothing to discount off; both owned — nothing left to sell
    return NextResponse.json({ error: "not a single-course owner" }, { status: 409 });
  }
  const target = owned[0] === "basic" ? "advanced" : "basic";

  const price = priceId("upgrade");
  if (!price) return NextResponse.json({ error: "billing not configured" }, { status: 503 });

  // the transaction is tagged with the target course: paying it is what grants that course
  const url = await createCheckout(price, uid, target, new URL(req.url).origin);
  if (!url) return NextResponse.json({ error: "checkout unavailable" }, { status: 502 });
  return NextResponse.json({ url });
}
