import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/protected";
import { isReviewKey } from "@/lib/verify-session";

const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

/** GET /api/review?key=<REVIEW_KEY> — opens every course with no account and no payment. */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const key = url.searchParams.get("key") ?? "";
  if (!isReviewKey(key)) return NextResponse.json({ error: "invalid link" }, { status: 403 });
  const res = NextResponse.redirect(new URL("/en/lesson", url));
  res.cookies.set({
    name: SESSION_COOKIE,
    value: key,
    maxAge: MAX_AGE,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
  return res;
}
