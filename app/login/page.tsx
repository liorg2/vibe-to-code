"use client";

import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  type UserCredential,
} from "firebase/auth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "@/components/Link";
import { parseLangFromPath, withLang } from "@/lib/lang";
import { MODULES } from "@/lib/course";
import { AppShell } from "@/components/AppShell";
import { useApp } from "@/components/Providers";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { enabledProviders, firebaseReady, getClientAuth, providerFor, startSession } from "@/lib/firebase/client";
import { cn } from "@/lib/utils";

/** ponytail: only the codes a user can actually hit; anything else falls through to Firebase's text */
const MESSAGES: Record<string, string> = {
  "auth/invalid-credential": "Wrong email or password.",
  "auth/invalid-email": "That does not look like an email address.",
  "auth/weak-password": "Password must be at least 6 characters.",
  "auth/email-already-in-use": "That email already has an account — sign in instead.",
  "auth/popup-closed-by-user": "Sign-in window closed.",
  "auth/operation-not-allowed": "That sign-in method is not enabled for this project.",
  "auth/too-many-requests": "Too many attempts. Try again in a few minutes.",
};

function messageFor(err: unknown): string {
  const code = (err as { code?: string })?.code ?? "";
  return MESSAGES[code] ?? (err instanceof Error ? err.message : "Sign-in failed.");
}

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const { syncCloud } = useApp();
  const lang = parseLangFromPath(usePathname());
  const asked = params.get("next");
  // same-site paths only — "//x.com" or "https://x.com" would bounce a fresh login off-site
  const safe = asked && asked.startsWith("/") && !asked.startsWith("//") && !asked.startsWith("/\\") ? asked : null;
  const next = withLang(lang, safe || `/lesson/${MODULES[0].id}/overview`);

  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  /** every path here ends the same way: cookie, then land on `next` */
  const run = async (signIn: () => Promise<UserCredential>) => {
    if (!firebaseReady) {
      setError("Firebase is not configured. Copy .env.local.example to .env.local.");
      return;
    }
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const cred = await signIn();
      await startSession(cred.user);
      await syncCloud(); // ponytail: onAuthStateChanged fired before the cookie existed
      router.push(next);
      router.refresh();
    } catch (err) {
      setError(messageFor(err));
    } finally {
      setBusy(false);
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const auth = getClientAuth();
    void run(() =>
      mode === "in"
        ? signInWithEmailAndPassword(auth, email, password)
        : createUserWithEmailAndPassword(auth, email, password),
    );
  };

  const reset = async () => {
    if (!email) {
      setError("Enter your email first, then hit reset.");
      return;
    }
    setError("");
    try {
      await sendPasswordResetEmail(getClientAuth(), email);
      setNotice("Password reset email sent.");
    } catch (err) {
      setError(messageFor(err));
    }
  };

  return (
    <AppShell showNav={false}>
      <Card className={cn("slide", "login-card")}>
        <CardContent>
          <div className="kicker">Vibe → Code</div>
          <h2>Sign in to open lessons</h2>
          <p className="lede">
            Lessons are server-rendered and only available after sign-in. The home page stays public.
          </p>

          <form className="login-form" onSubmit={submit}>
            <Input
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              required
              minLength={6}
              autoComplete={mode === "in" ? "current-password" : "new-password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="brand" size="lg" type="submit" disabled={busy}>
              {mode === "in" ? "Sign in" : "Create account"}
            </Button>
            <div className="login-alt">
              <button type="button" onClick={() => setMode(mode === "in" ? "up" : "in")}>
                {mode === "in" ? "Create an account" : "I already have an account"}
              </button>
              {mode === "in" && (
                <button type="button" onClick={reset}>
                  Forgot password?
                </button>
              )}
            </div>
          </form>

          {error && <p className="login-error" role="alert">{error}</p>}
          {notice && <p className="login-notice">{notice}</p>}

          {enabledProviders.length > 0 && (
            <div className="login-providers">
              <div className="login-or">or continue with</div>
              {enabledProviders.map((p) => (
                <Button
                  key={p.id}
                  variant="outline"
                  size="lg"
                  type="button"
                  disabled={busy}
                  onClick={() => void run(() => signInWithPopup(getClientAuth(), providerFor(p.id)))}
                >
                  {p.label}
                </Button>
              ))}
            </div>
          )}

          <Link className="login-back" href="/">
            ← Back home
          </Link>
        </CardContent>
      </Card>
    </AppShell>
  );
}
