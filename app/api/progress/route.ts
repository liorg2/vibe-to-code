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
  const strings = (v: unknown) => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []);
  await saveProgress(uid, { done: strings(body.done), ticked: strings(body.ticked) });
  return NextResponse.json({ ok: true });
}
