"use client";

import Link from "next/link";
import { useApp } from "./Providers";
import { QUIZ, termKey } from "@/lib/course";
import type { Module } from "@/lib/types";

export function LessonSubNav({
  m,
  active,
  quiz,
}: {
  m: Module;
  active: number | null;
  quiz?: boolean;
}) {
  const { lang, done, t } = useApp();
  return (
    <nav className="subnav" aria-label={m.title[lang]}>
      {m.terms.map((tm, j) => (
        <Link
          key={j}
          href={`/lesson/${m.id}/${j}`}
          className={`${!quiz && active === j ? "on" : ""}${done.has(termKey(m, j)) ? " done" : ""}`}
        >
          <span className="sn">{j + 1}</span>
          {tm.t[lang]}
        </Link>
      ))}
      {QUIZ[m.id] ? (
        <Link href={`/lesson/${m.id}/quiz`} className={quiz ? "on" : ""}>{t("test")}</Link>
      ) : null}
    </nav>
  );
}
