"use client";

import Link from "@/components/Link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useApp } from "./Providers";
import { FILTERS, FILTER_LABEL, type Filter } from "./GlossaryList";
import { QUIZ, skippable, termKey } from "@/lib/course";
import type { Module, Term } from "@/lib/types";

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
  // ticked levels are OR'ed; none ticked shows every topic.
  // kept per tab so the filter survives moving between topics (each page remounts this nav)
  const [lvls, setLvls] = useState<Filter[]>([]);
  useEffect(() => {
    try {
      const v = JSON.parse(sessionStorage.getItem("vibe.subnavLvls") || "[]") as string[];
      setLvls(v.filter((x): x is Filter => x in FILTERS && x !== "all"));
    } catch {}
  }, []);
  const toggle = (v: Filter) => {
    const next = lvls.includes(v) ? lvls.filter((x) => x !== v) : [...lvls, v];
    setLvls(next);
    try { sessionStorage.setItem("vibe.subnavLvls", JSON.stringify(next)); } catch {}
  };
  const shown = (tm: Term) => !lvls.length || lvls.some((v) => FILTERS[v](tm));
  return (
    <nav className="subnav" aria-label={m.title[lang]}>
      <div className="lvl-chips" role="group" aria-label={t("filterLvl")}>
        {(Object.keys(FILTERS) as Filter[]).filter((v) => v !== "all").map((v) => (
          <label key={v}>
            <input type="checkbox" checked={lvls.includes(v)} onChange={() => toggle(v)} />
            {t(FILTER_LABEL[v])}
          </label>
        ))}
      </div>
      <Link
        href={href(`/lesson/${m.id}/overview`)}
        className={cn(active === "overview" && "on")}
      >
        {t("overview")}
      </Link>
      {m.terms.map((tm, j) =>
        // the topic you are on always stays visible, whatever the filter
        active !== j && ((hideExpert && skippable(tm)) || !shown(tm)) ? null : (
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
            {skippable(tm) ? <span className="xbadge">{t(tm.lvl === "E" ? "expert" : "optional")}</span> : null}
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
