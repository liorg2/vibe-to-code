"use client";

import { signInWithPopup } from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { MODULES } from "@/lib/course";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { firebaseReady, getClientAuth, googleProvider } from "@/lib/firebase/client";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || `/lesson/${MODULES[0].id}/overview`;

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
      <Card className={cn("slide", "login-card")}>
        <CardContent>
          <div className="kicker">Vibe → Code</div>
          <h2>Sign in to open lessons</h2>
          <p className="lede">
            Lessons are server-rendered and only available after Google sign-in. The home page stays public.
          </p>
          <div className="cta" style={{ marginTop: 24 }}>
            <Button variant="brand" size="lg" type="button" onClick={signIn}>
              Sign in with Google
            </Button>
            <Button variant="outline" size="lg" nativeButton={false} render={<Link href="/" />}>
              Back home
            </Button>
          </div>
        </CardContent>
      </Card>
    </AppShell>
  );
}
