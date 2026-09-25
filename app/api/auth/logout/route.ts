import { NextResponse } from "next/server";
import { REVIEWER_COOKIE, SESSION_COOKIE } from "@/lib/protected";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(SESSION_COOKIE);
  res.cookies.delete(REVIEWER_COOKIE);
  return res;
}
