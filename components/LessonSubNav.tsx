"use client";

import Link from "@/components/Link";
import { cn } from "@/lib/utils";
import { useApp } from "./Providers";
import { QUIZ, termKey } from "@/lib/course";
import type { Module } from "@/lib/types";

export function LessonSubNav({
  m,
  active,
  quiz,
  course,
}: {
  m: Module;
  active: number | "overview" | "summary" | "build" | null;
  quiz?: boolean;
  course?: string;
}) {
  const { lang, done, t, hideExpert } = useApp();
  const href = (path: string) => (course ? `${path}?course=${course}` : path);
  return (
    <nav className="subnav" aria-label={m.title[lang]}>
      <Link
        href={href(`/lesson/${m.id}/overview`)}
        className={cn(active === "overview" && "on")}
      >
        {t("overview")}
      </Link>
      {m.terms.map((tm, j) =>
        hideExpert && tm.lvl === "E" && active !== j ? null : (
          <Link
            key={j}
            href={href(`/lesson/${m.id}/${j}`)}
            className={cn(
              !quiz && active === j && "on",
              done.has(termKey(m, j)) && "done",
            )}
          >
            <span className="sn">{j + 1}</span>
            {tm.t[lang]}
            {tm.lvl === "E" ? <span className="xbadge">{t("expert")}</span> : null}
          </Link>
        ),
      )}
      <Link
        href={href(`/lesson/${m.id}/summary`)}
        className={cn(active === "summary" && "on")}
      >
        {t("summary")}
      </Link>
      <Link href={href(`/lesson/${m.id}/build`)} className={cn(active === "build" && "on")}>
        {t("build")}
      </Link>
      {QUIZ[m.id] ? (
        <Link href={href(`/lesson/${m.id}/quiz`)} className={cn(quiz && "on")}>
          {t("test")}
        </Link>
      ) : null}
    </nav>
  );
}
