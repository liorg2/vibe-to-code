"use client";

import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useApp } from "./Providers";
import { withLang } from "@/lib/lang";
import { Button } from "@/components/ui/button";
import { firebaseReady, getClientAuth } from "@/lib/firebase/client";

export function AuthButton() {
  const { user, lang, t } = useApp();
  const router = useRouter();

  if (!firebaseReady) return null;

  const signOutAll = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    await signOut(getClientAuth());
    router.push(withLang(lang, "/"));
    router.refresh();
  };

  return (
    <>
      <span id="who">{user ? user.displayName || user.email || "" : ""}</span>
      <Button variant="outline" type="button" onClick={() => (user ? signOutAll() : router.push(withLang(lang, "/login")))}>
        {user ? "Sign out" : "Sign in"}
      </Button>
    </>
  );
}
