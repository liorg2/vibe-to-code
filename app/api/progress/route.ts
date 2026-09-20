import { NextResponse } from "next/server";
import { sessionUid } from "@/lib/verify-session";
import { getProgress, saveProgress } from "@/lib/db";

export async function GET() {
  const uid = await sessionUid();
  if (!uid) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json(await getProgress(uid));
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
  await saveProgress(uid, { done: strings(body.done), ticked: strings(body.ticked) });
  return NextResponse.json({ ok: true });
}
