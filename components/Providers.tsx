"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged, type User } from "firebase/auth";
import { parseLangFromPath, stripLang, withLang } from "@/lib/lang";
import type { Lang } from "@/lib/types";
import { firebaseReady, getClientAuth } from "@/lib/firebase/client";
import { totalTerms } from "@/lib/course";

const KEY = "vibe2code.v2";

type Progress = { done: string[]; ticked: string[] };

type Ctx = {
  lang: Lang;
  theme: "dark" | "light";
  done: Set<string>;
  ticked: Set<string>;
  user: User | null;
  syncCloud: () => Promise<void>;
  setLang: (l: Lang) => void;
  toggleTheme: () => void;
  toggleDone: (k: string) => void;
  toggleTicked: (k: string, on: boolean) => void;
  resetProgress: () => void;
  t: (k: string) => string;
  UI: Record<string, Record<Lang, string>>;
  progressPct: number;
};

const AppCtx = createContext<Ctx | null>(null);

function lsGet(k: string): string | null {
  try {
    return localStorage.getItem(k);
  } catch {
    return null;
  }
}

function lsSet(k: string, v: string) {
  try {
    localStorage.setItem(k, v);
  } catch {
    /* ponytail: private mode may block storage */
  }
}

export function Providers({ UI, children }: { UI: Record<string, Record<Lang, string>>; children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const lang = parseLangFromPath(pathname);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [done, setDone] = useState<Set<string>>(new Set());
  const [ticked, setTicked] = useState<Set<string>>(new Set());
  const [user, setUser] = useState<User | null>(null);
  const cloudTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const uidRef = useRef<string | null>(null);

  const persist = useCallback(
    (nextDone: Set<string>, nextTicked: Set<string>, nextLang = lang, nextTheme = theme) => {
      lsSet(KEY + ".done", JSON.stringify([...nextDone]));
      lsSet(KEY + ".check", JSON.stringify([...nextTicked]));
      lsSet(KEY + ".lang", nextLang);
      lsSet(KEY + ".theme", nextTheme);

      if (!uidRef.current) return;
      const payload = JSON.stringify({ done: [...nextDone], ticked: [...nextTicked] });
      if (cloudTimer.current) clearTimeout(cloudTimer.current);
      cloudTimer.current = setTimeout(() => {
        fetch("/api/progress", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: payload,
        }).catch(() => {});
      }, 800);
    },
    [lang, theme],
  );

  useEffect(() => {
    setTheme((lsGet(KEY + ".theme") as "dark" | "light") || "dark");
    setDone(new Set(JSON.parse(lsGet(KEY + ".done") || "[]")));
    setTicked(new Set(JSON.parse(lsGet(KEY + ".check") || "[]")));
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = lang;
    document.body.dir = lang === "he" ? "rtl" : "ltr";
  }, [lang, theme]);

  /**
   * Pull server progress, union it with local, push the result back.
   * ponytail: merges against localStorage, not the `done`/`ticked` closure — this runs from a
   * mount-time callback, so the closure still holds the empty sets from the first render and
   * would silently drop progress made while signed out.
   */
  const syncCloud = useCallback(async () => {
    const res = await fetch("/api/progress").catch(() => null);
    if (!res?.ok) return; // ponytail: 401 when signed out — nothing to merge
    const cloud = (await res.json()) as Progress;
    const local = (suffix: string): string[] => {
      try {
        return JSON.parse(lsGet(KEY + suffix) || "[]");
      } catch {
        return [];
      }
    };
    const mergedDone = new Set([...(cloud.done || []), ...local(".done")]);
    const mergedTicked = new Set([...(cloud.ticked || []), ...local(".check")]);
    setDone(mergedDone);
    setTicked(mergedTicked);
    lsSet(KEY + ".done", JSON.stringify([...mergedDone]));
    lsSet(KEY + ".check", JSON.stringify([...mergedTicked]));
    // the PUT replies with what it stored; anything it dropped was a key this course no longer
    // has, and keeping it locally would show progress against terms that do not exist
    const saved = await fetch("/api/progress", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: [...mergedDone], ticked: [...mergedTicked] }),
    })
      .then((r) => (r.ok ? (r.json() as Promise<Progress>) : null))
      .catch(() => null);
    if (!saved) return;
    const keptDone = new Set(saved.done ?? []);
    const keptTicked = new Set(saved.ticked ?? []);
    setDone(keptDone);
    setTicked(keptTicked);
    lsSet(KEY + ".done", JSON.stringify([...keptDone]));
    lsSet(KEY + ".check", JSON.stringify([...keptTicked]));
  }, []);

  useEffect(() => {
    if (!firebaseReady) return;
    const auth = getClientAuth();
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      uidRef.current = u?.uid ?? null;
      if (u) void syncCloud();
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const setLang = (l: Lang) => {
    document.cookie = `vibe.lang=${l};path=/;max-age=31536000;SameSite=Lax`;
    persist(done, ticked, l, theme);
    router.push(withLang(l, stripLang(pathname)) + (typeof window !== "undefined" ? window.location.search : ""));
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    persist(done, ticked, lang, next);
  };

  const toggleDone = (k: string) => {
    const next = new Set(done);
    next.has(k) ? next.delete(k) : next.add(k);
    setDone(next);
    persist(next, ticked);
  };

  const toggleTicked = (k: string, on: boolean) => {
    const next = new Set(ticked);
    on ? next.add(k) : next.delete(k);
    setTicked(next);
    persist(done, next);
  };

  const resetProgress = () => {
    const empty = new Set<string>();
    setDone(empty);
    setTicked(empty);
    persist(empty, empty);
  };

  const t = (k: string) => UI[k]?.[lang] ?? k;
  const progressPct = (done.size / totalTerms()) * 100;

  const value = useMemo(
    () => ({
      lang,
      theme,
      done,
      ticked,
      user,
      syncCloud,
      setLang,
      toggleTheme,
      toggleDone,
      toggleTicked,
      resetProgress,
      t,
      UI,
      progressPct,
    }),
    [lang, theme, done, ticked, user, syncCloud, UI, progressPct],
  );

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp outside Providers");
  return ctx;
}
