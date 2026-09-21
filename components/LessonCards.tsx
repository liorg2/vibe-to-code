"use client";

import Link from "@/components/Link";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useApp } from "./Providers";
import { LevelFilter } from "./LevelTag";
import { MODULES, termKey, mins } from "@/lib/course";

const miniBar =
  "mini mt-3.5 gap-0 [&_[data-slot=progress-track]]:h-[5px] [&_[data-slot=progress-track]]:rounded-full [&_[data-slot=progress-track]]:bg-[var(--line)] [&_[data-slot=progress-indicator]]:rounded-full [&_[data-slot=progress-indicator]]:bg-[var(--grad)]";

/** One card per lesson of a course, numbered by its place in the whole syllabus. */
export function LessonCards({ ids }: { ids: string[] }) {
  const { lang, done, levels, t } = useApp();
  return (
    <>
      <LevelFilter full />
      <div className="cards">
        {MODULES.map((m, i) => {
          if (!ids.includes(m.id)) return null;
          const shown = m.terms.map((tm, j) => ({ tm, j })).filter(({ tm }) => levels.has(tm.lvl));
          if (!shown.length) return null;
          const d = shown.filter(({ j }) => done.has(termKey(m, j))).length;
          return (
            <Link key={m.id} className="mcard" href={`/lesson/${m.id}/overview`}>
              <div className="row">
                <div className="ic">{m.icon}</div>
                <div>
                  <div className="num">
                    {t("lesson")} {String(i + 1).padStart(2, "0")} · ~{mins(m)} {t("min")}
                  </div>
                  <h3>{m.title[lang]}</h3>
                </div>
              </div>
              <p>{m.blurb[lang]}</p>
              <Progress value={(d / shown.length) * 100} className={cn(miniBar)} />
              <span className="cnt">{d}/{shown.length} {t("terms")}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
