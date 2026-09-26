import { after, NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/protected";
import { getAdminAuth } from "@/lib/firebase/admin";
import { claimWelcome } from "@/lib/db";
import { emailEnabled, sendWelcome } from "@/lib/email";
import { serverLang } from "@/lib/lang-server";
import { sessionClaims } from "@/lib/verify-session";

const MAX_AGE = 60 * 60 * 24 * 5; // 5 days

/** Who the session cookie says you are; the header asks when Firebase's own login is empty. */
export async function GET() {
  const claims = await sessionClaims();
  if (!claims) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json(claims);
}

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

  // After the response: a slow or broken mail service must never slow or break sign-in.
  const lang = await serverLang();
  after(async () => {
    if (!emailEnabled()) return; // don't claim a welcome we can't send
    try {
      const { uid } = await getAdminAuth().verifyIdToken(idToken);
      const user = await getAdminAuth().getUser(uid);
      // ponytail: only accounts made in the last day — keeps everyone who signed up before this
      // shipped from getting a surprise welcome on their next login
      if (!user.email || Date.now() - Date.parse(user.metadata.creationTime) > 86_400_000) return;
      // Claimed before sending: a failed send means no welcome, never a second one.
      if (await claimWelcome(uid)) await sendWelcome(uid, user.email, user.displayName ?? "", lang);
    } catch (err) {
      console.error("welcome email failed:", err instanceof Error ? err.message : err);
    }
  });
  return res;
}
