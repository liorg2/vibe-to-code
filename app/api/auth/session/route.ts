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

  let session: string;
  try {
    session = await getAdminAuth().createSessionCookie(idToken, { expiresIn: MAX_AGE * 1000 });
  } catch (err) {
    // ponytail: a rejected token and an unusable service account both threw into a blank 500 —
    // the code is the only thing that tells prod which one it was
    const code = (err as { code?: string })?.code ?? "unknown";
    console.error("createSessionCookie failed:", code, err instanceof Error ? err.message : err);
    const bad = code.includes("argument-error") || code.includes("id-token");
    return NextResponse.json({ error: bad ? "invalid token" : "auth not configured", code }, { status: bad ? 401 : 500 });
  }
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
