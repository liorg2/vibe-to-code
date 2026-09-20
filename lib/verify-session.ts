import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE } from "./protected";

const DEV_UID = "dev-user";

/** The signed-in uid, or null. Single place the session cookie is trusted. */
export async function sessionUid(): Promise<string | null> {
  const session = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!session) return null;

  if (process.env.NODE_ENV === "development" && process.env.DEV_AUTH_BYPASS === "1" && session === "dev-session") {
    return DEV_UID;
  }

  try {
    const { getAdminAuth } = await import("@/lib/firebase/admin");
    return (await getAdminAuth().verifySessionCookie(session, true)).uid;
  } catch (err) {
    // ponytail: an expired cookie is routine, a misconfigured service account is not — log both,
    // it is the only signal that reaches Vercel's runtime logs
    console.warn("session cookie rejected:", err instanceof Error ? err.message : err);
    return null;
  }
}

/** Call from server components under protected routes (Node runtime). */
export async function requireSession() {
  if (!(await sessionUid())) redirect("/login");
}
