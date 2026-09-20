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
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { onAuthStateChanged, type User } from "firebase/auth";
import type { Lang } from "@/lib/types";
import { firebaseReady, getClientApp, getClientAuth } from "@/lib/firebase/client";
import { totalTerms } from "@/lib/course";

const KEY = "vibe2code.v2";

type Progress = { done: string[]; ticked: string[] };

type Ctx = {
  lang: Lang;
  theme: "dark" | "light";
  done: Set<string>;
  ticked: Set<string>;
  user: User | null;
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
  const [lang, setLangState] = useState<Lang>("en");
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

      const uid = uidRef.current;
      if (!uid || !firebaseReady) return;
      const db = getFirestore(getClientApp());
      const ref = doc(db, "progress", uid);
      const payload = { done: [...nextDone], ticked: [...nextTicked], updated: Date.now() };
      if (cloudTimer.current) clearTimeout(cloudTimer.current);
      cloudTimer.current = setTimeout(() => setDoc(ref, payload).catch(() => {}), 800);
    },
    [lang, theme],
  );

  useEffect(() => {
    const saved = (lsGet(KEY + ".lang") as Lang) || "en";
    setLangState(saved);
    document.cookie = `vibe.lang=${saved};path=/;max-age=31536000;SameSite=Lax`;
    setTheme((lsGet(KEY + ".theme") as "dark" | "light") || "dark");
    setDone(new Set(JSON.parse(lsGet(KEY + ".done") || "[]")));
    setTicked(new Set(JSON.parse(lsGet(KEY + ".check") || "[]")));
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = lang;
    document.body.dir = lang === "he" ? "rtl" : "ltr";
  }, [lang, theme]);

  useEffect(() => {
    if (!firebaseReady) return;
    const auth = getClientAuth();
    return onAuthStateChanged(auth, async (u) => {
      setUser(u);
      uidRef.current = u?.uid ?? null;
      if (!u) return;

      const db = getFirestore(getClientApp());
      const ref = doc(db, "progress", u.uid);
      const snap = await getDoc(ref);
      const cloud = snap.exists() ? (snap.data() as Progress) : { done: [], ticked: [] };
      const mergedDone = new Set([...(cloud.done || []), ...done]);
      const mergedTicked = new Set([...(cloud.ticked || []), ...ticked]);
      setDone(mergedDone);
      setTicked(mergedTicked);
      persist(mergedDone, mergedTicked);
      await setDoc(ref, { done: [...mergedDone], ticked: [...mergedTicked], updated: Date.now() });
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const setLang = (l: Lang) => {
    setLangState(l);
    document.cookie = `vibe.lang=${l};path=/;max-age=31536000;SameSite=Lax`;
    persist(done, ticked, l, theme);
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
      setLang,
      toggleTheme,
      toggleDone,
      toggleTicked,
      resetProgress,
      t,
      UI,
      progressPct,
    }),
    [lang, theme, done, ticked, user, UI, progressPct],
  );

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp outside Providers");
  return ctx;
}
