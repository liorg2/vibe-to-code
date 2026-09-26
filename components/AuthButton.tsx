"use client";

import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useApp } from "./Providers";
import { withLang } from "@/lib/lang";
import { Button } from "@/components/ui/button";
import { firebaseReady, getClientAuth } from "@/lib/firebase/client";

/** Shared sign-out/sign-in action, reused by AuthButton and the header account menu. */
export function useSignOut() {
  const { user, lang, endSession } = useApp();
  const router = useRouter();

  const signOutAll = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    await signOut(getClientAuth());
    endSession();
    router.push(withLang(lang, "/"));
    router.refresh();
  };

  return { user, onClick: () => (user ? signOutAll() : router.push(withLang(lang, "/login"))) };
}

export function AuthButton() {
  const { user, onClick } = useSignOut();

  if (!firebaseReady) return null;

  return (
    <>
      <span id="who">{user ? user.displayName || user.email || "" : ""}</span>
      <Button variant="outline" type="button" onClick={onClick}>
        {user ? "Sign out" : "Sign in"}
      </Button>
    </>
  );
}
