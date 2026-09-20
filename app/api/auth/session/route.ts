import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/protected";
import { getAdminAuth } from "@/lib/firebase/admin";

const MAX_AGE = 60 * 60 * 24 * 5; // 5 days

export async function POST(req: Request) {
  const { idToken } = (await req.json()) as { idToken?: string };
  if (!idToken) return NextResponse.json({ error: "missing token" }, { status: 400 });

  if (process.env.NODE_ENV === "development" && process.env.DEV_AUTH_BYPASS === "1") {
    const res = NextResponse.json({ ok: true, dev: true });
    res.cookies.set({
      name: SESSION_COOKIE,
      value: "dev-session",
      maxAge: MAX_AGE,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });
    return res;
  }

  const session = await getAdminAuth().createSessionCookie(idToken, { expiresIn: MAX_AGE * 1000 });
  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: SESSION_COOKIE,
    value: session,
    maxAge: MAX_AGE,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
  return res;
}
