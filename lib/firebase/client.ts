import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  TwitterAuthProvider,
  type AuthProvider,
  type User,
} from "firebase/auth";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const firebaseReady = Boolean(config.apiKey && config.projectId);

export function getClientApp() {
  return getApps().length ? getApp() : initializeApp(config);
}

export function getClientAuth() {
  return getAuth(getClientApp());
}

/**
 * Every provider Firebase can do with a popup. Which ones actually appear is
 * NEXT_PUBLIC_AUTH_PROVIDERS — each one still has to be switched on in the Firebase console,
 * so the list is deployment config, not a constant.
 * ponytail: no phone/SMS — it needs a reCAPTCHA verifier, add when someone asks.
 */
const PROVIDER_FACTORIES: Record<string, () => AuthProvider> = {
  google: () => new GoogleAuthProvider(),
  github: () => new GithubAuthProvider(),
  microsoft: () => new OAuthProvider("microsoft.com"),
  apple: () => new OAuthProvider("apple.com"),
  facebook: () => new FacebookAuthProvider(),
  twitter: () => new TwitterAuthProvider(),
  yahoo: () => new OAuthProvider("yahoo.com"),
};

const LABELS: Record<string, string> = {
  google: "Google",
  github: "GitHub",
  microsoft: "Microsoft",
  apple: "Apple",
  facebook: "Facebook",
  twitter: "X",
  yahoo: "Yahoo",
};

export const enabledProviders: { id: string; label: string }[] = (
  process.env.NEXT_PUBLIC_AUTH_PROVIDERS ?? "google"
)
  .split(",")
  .map((p) => p.trim().toLowerCase())
  .filter((p) => p in PROVIDER_FACTORIES)
  .map((id) => ({ id, label: LABELS[id]! }));

export function providerFor(id: string): AuthProvider {
  const make = PROVIDER_FACTORIES[id];
  if (!make) throw new Error(`unknown auth provider: ${id}`);
  return make();
}

/** ponytail: kept so nothing that imported it breaks */
export const googleProvider = PROVIDER_FACTORIES.google();

/** Trades the Firebase id token for the httpOnly session cookie the server trusts. */
export async function startSession(user: User) {
  const idToken = await user.getIdToken();
  const res = await fetch("/api/auth/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });
  if (!res.ok) {
    const { error, code } = (await res.json().catch(() => ({}))) as { error?: string; code?: string };
    throw new Error(`Could not create a session (${res.status}): ${error ?? "unknown"}${code ? ` [${code}]` : ""}`);
  }
}
