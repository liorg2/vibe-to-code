"use client";

import { signInWithPopup, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useApp } from "./Providers";
import { withLang } from "@/lib/lang";
import { Button } from "@/components/ui/button";
import { firebaseReady, getClientAuth, googleProvider } from "@/lib/firebase/client";

export function AuthButton() {
  const { user, lang, t, syncCloud } = useApp();
  const router = useRouter();

  if (!firebaseReady) return null;

  const signIn = async () => {
    const auth = getClientAuth();
    const cred = await signInWithPopup(auth, googleProvider);
    const idToken = await cred.user.getIdToken();
    await fetch("/api/auth/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });
    await syncCloud(); // ponytail: onAuthStateChanged fired before the cookie existed
    router.refresh();
  };

  const signOutAll = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    await signOut(getClientAuth());
    router.push(withLang(lang, "/"));
    router.refresh();
  };

  return (
    <>
      <span id="who">{user ? user.displayName || user.email || "" : ""}</span>
      <Button variant="outline" type="button" onClick={() => (user ? signOutAll() : signIn())}>
        {user ? "Sign out" : "Sign in"}
      </Button>
    </>
  );
}
