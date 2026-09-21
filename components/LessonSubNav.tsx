"use client";

import Link from "next/link";
import { useApp } from "./Providers";
import { LevelTag } from "./LevelTag";
import { QUIZ, termKey } from "@/lib/course";
import type { Module } from "@/lib/types";

export function LessonSubNav({
  m,
  active,
  quiz,
}: {
  m: Module;
  active: number | "overview" | "summary" | null;
  quiz?: boolean;
}) {
  const { lang, done, levels, t } = useApp();
  return (
    <nav className="subnav" aria-label={m.title[lang]}>
      <Link href={`/lesson/${m.id}/overview`} className={active === "overview" ? "on" : ""}>{t("overview")}</Link>
      {m.terms.map((tm, j) =>
        // the term you are reading stays listed even when its level is filtered out
        levels.has(tm.lvl) || active === j ? (
          <Link
            key={j}
            href={`/lesson/${m.id}/${j}`}
            className={`${!quiz && active === j ? "on" : ""}${done.has(termKey(m, j)) ? " done" : ""}`}
          >
            <span className="sn">{j + 1}</span>
            {tm.t[lang]}
            <LevelTag lvl={tm.lvl} />
          </Link>
        ) : null,
      )}
      <Link href={`/lesson/${m.id}/summary`} className={active === "summary" ? "on" : ""}>{t("summary")}</Link>
      {QUIZ[m.id] ? (
        <Link href={`/lesson/${m.id}/quiz`} className={quiz ? "on" : ""}>{t("test")}</Link>
      ) : null}
    </nav>
  );
}
