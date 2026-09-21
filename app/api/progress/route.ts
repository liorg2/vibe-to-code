import { NextResponse } from "next/server";
import { sessionUid } from "@/lib/verify-session";
import { getRows, saveRows } from "@/lib/db";
import { fromRows, toRows } from "@/lib/progress";

export async function GET() {
  const uid = await sessionUid();
  if (!uid) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  // ponytail: no migration from the old position-keyed `progress` table — those positions
  // no longer point at the terms they were saved against, so importing them is worse than zero
  return NextResponse.json(fromRows(await getRows(uid)));
}

export async function PUT(req: Request) {
  const uid = await sessionUid();
  if (!uid) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = (await req.json()) as { done?: unknown; ticked?: unknown };
  // ponytail: the course has a few hundred keys — cap it so one account can't fill the 0.5GB tier
  const MAX = 5000;
  const strings = (v: unknown) =>
    Array.isArray(v)
      ? v.filter((x): x is string => typeof x === "string" && x.length <= 200).slice(0, MAX)
      : [];
  // toRows drops anything that is not a key this course actually has
  await saveRows(uid, toRows(strings(body.done), strings(body.ticked)));
  return NextResponse.json({ ok: true });
}
