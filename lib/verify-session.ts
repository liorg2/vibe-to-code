import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { withLang } from "./lang";
import { serverLang } from "./lang-server";
import { SESSION_COOKIE } from "./protected";

const DEV_UID = "dev-user";
/** Shared by everyone holding the reviewer link — see app/api/review/route.ts. */
export const REVIEWER_UID = "reviewer";

/** ponytail: one shared secret, rotate REVIEW_KEY in Vercel to revoke every link at once */
export function isReviewKey(key?: string): boolean {
  const want = process.env.REVIEW_KEY;
  return Boolean(want && want.length >= 16 && key === want);
}

type Session = { uid: string; email?: string };

/** ponytail: unset ALLOWED_EMAILS means open to any Google account — the current behaviour. */
export function isAllowed(email?: string): boolean {
  const list = (process.env.ALLOWED_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  if (!list.length) return true;
  return Boolean(email && list.includes(email.toLowerCase()));
}

/** Verifies the session cookie. The single place it is trusted; says nothing about access. */
export async function sessionClaims(): Promise<Session | null> {
  const session = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!session) return null;
  if (isReviewKey(session)) return { uid: REVIEWER_UID };

  if (process.env.NODE_ENV === "development" && process.env.DEV_AUTH_BYPASS === "1" && session === "dev-session") {
    return { uid: DEV_UID, email: process.env.ALLOWED_EMAILS?.split(",")[0]?.trim() };
  }

  try {
    const { getAdminAuth } = await import("@/lib/firebase/admin");
    const { uid, email } = await getAdminAuth().verifySessionCookie(session, true);
    return { uid, email };
  } catch (err) {
    // ponytail: an expired cookie is routine, a misconfigured service account is not — log both,
    // it is the only signal that reaches Vercel's runtime logs
    console.warn("session cookie rejected:", err instanceof Error ? err.message : err);
    return null;
  }
}

/** The uid of a signed-in *and* allowed user, or null. Use from API routes. */
export async function sessionUid(): Promise<string | null> {
  const claims = await sessionClaims();
  return claims && (claims.uid === REVIEWER_UID || isAllowed(claims.email)) ? claims.uid : null;
}

/** Call from server components under protected routes (Node runtime). */
export async function requireSession() {
  const claims = await sessionClaims();
  const lang = await serverLang();
  if (!claims) redirect(withLang(lang, "/login"));
  // ponytail: a distinct page, not /login — bouncing an allowed-cookie user back to sign-in loops
  if (claims.uid !== REVIEWER_UID && !isAllowed(claims.email)) redirect(withLang(lang, "/no-access"));
}
