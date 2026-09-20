"use client";

import { signInWithPopup } from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { MODULES } from "@/lib/course";
import { AppShell } from "@/components/AppShell";
import { firebaseReady, getClientAuth, googleProvider } from "@/lib/firebase/client";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || `/lesson/${MODULES[0].id}/0`;

  const signIn = async () => {
    if (!firebaseReady) {
      alert("Firebase is not configured. Copy .env.local.example to .env.local.");
      return;
    }
    const auth = getClientAuth();
    const cred = await signInWithPopup(auth, googleProvider);
    const idToken = await cred.user.getIdToken();
    const res = await fetch("/api/auth/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });
    if (!res.ok) {
      alert("Could not create session. Is FIREBASE_SERVICE_ACCOUNT_JSON set on the server?");
      return;
    }
    router.push(next);
    router.refresh();
  };

  return (
    <AppShell showNav={false}>
      <section className="slide login-card">
          <div className="kicker">Vibe → Code</div>
          <h2>Sign in to open lessons</h2>
          <p className="lede">
            Lessons are server-rendered and only available after Google sign-in. The home page stays public.
          </p>
          <div className="cta" style={{ marginTop: 24 }}>
            <button className="btn prim big" type="button" onClick={signIn}>Sign in with Google</button>
            <Link className="btn big" href="/">Back home</Link>
          </div>
      </section>
    </AppShell>
  );
}
