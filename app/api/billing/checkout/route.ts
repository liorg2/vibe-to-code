import { NextResponse } from "next/server";
import { sessionUid } from "@/lib/verify-session";
import { getCourses } from "@/lib/db";
import { createCheckout, priceId } from "@/lib/paddle";

export async function POST(req: Request) {
  const uid = await sessionUid();
  if (!uid) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { tier: course } = (await req.json()) as { tier?: unknown };
  if (course !== "basic" && course !== "advanced") {
    return NextResponse.json({ error: "bad tier" }, { status: 400 });
  }

  // already bought this course — the other one is a separate sale, not an upgrade to this
  if ((await getCourses(uid)).includes(course)) {
    return NextResponse.json({ error: "already owned" }, { status: 409 });
  }

  const price = priceId(course);
  if (!price) return NextResponse.json({ error: "billing not configured" }, { status: 503 });

  const url = await createCheckout(price, uid, course);
  if (!url) return NextResponse.json({ error: "checkout unavailable" }, { status: 502 });
  return NextResponse.json({ url });
}
