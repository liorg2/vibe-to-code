"use client";

import { signInWithPopup, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useApp } from "./Providers";
import { firebaseReady, getClientAuth, googleProvider } from "@/lib/firebase/client";

export function AuthButton() {
  const { user, t } = useApp();
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
    router.refresh();
  };

  const signOutAll = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    await signOut(getClientAuth());
    router.push("/");
    router.refresh();
  };

  return (
    <>
      <span id="who">{user ? user.displayName || user.email || "" : ""}</span>
      <button className="btn" type="button" onClick={() => (user ? signOutAll() : signIn())}>
        {user ? "Sign out" : t("signIn") || "Sign in"}
      </button>
    </>
  );
}
