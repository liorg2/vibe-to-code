import { NextResponse } from "next/server";
import { REVIEWER_COOKIE, SESSION_COOKIE } from "@/lib/protected";
import { isReviewKey } from "@/lib/verify-session";

const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

/** GET /api/review?key=<REVIEW_KEY> — opens every course with no account and no payment. */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const key = url.searchParams.get("key") ?? "";
  if (!isReviewKey(key)) return NextResponse.json({ error: "invalid link" }, { status: 403 });
  const res = NextResponse.redirect(new URL("/en", url));
  res.cookies.set({
    name: SESSION_COOKIE,
    value: key,
    maxAge: MAX_AGE,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
  // readable by the browser: the side nav gates lessons on a Firebase user, which a reviewer has none of
  res.cookies.set({ name: REVIEWER_COOKIE, value: "1", maxAge: MAX_AGE, sameSite: "lax", path: "/" });
  return res;
}
