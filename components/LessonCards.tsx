"use client";

import Link from "@/components/Link";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useApp } from "./Providers";
import { MODULES, termKey, mins, lessonNo } from "@/lib/course";
import { isPreviewModule } from "@/lib/protected";

const miniBar =
  "mini mt-3.5 gap-0 [&_[data-slot=progress-track]]:h-[5px] [&_[data-slot=progress-track]]:rounded-full [&_[data-slot=progress-track]]:bg-[var(--line)] [&_[data-slot=progress-indicator]]:rounded-full [&_[data-slot=progress-indicator]]:bg-[var(--grad)]";

/** One card per lesson of a course, numbered by its place in the whole syllabus.
 *  `locked`: the visitor owns nothing — non-preview cards point at the offer, not the lesson. */
export function LessonCards({ ids, locked }: { ids: string[]; locked: boolean }) {
  const { lang, done, t } = useApp();
  return (
    <>
      <div className="cards">
        {ids.map((id) => {
          const m = MODULES.find((x) => x.id === id);
          if (!m) return null;
          const d = m.terms.filter((_, j) => done.has(termKey(m, j))).length;
          const preview = isPreviewModule(m.id);
          const gated = locked && !preview;
          return (
            <Link key={m.id} className="mcard" href={gated ? "/courses" : `/lesson/${m.id}/overview`}>
              <div className="row">
                <div className="ic">{gated ? "🔒" : m.icon}</div>
                <div>
                  <div className="num">
                    {t("lesson")} {lessonNo(m.id)} · ~{mins(m)} {t("min")}
                    {preview && <Badge variant="secondary" className="ms-2">{t("freePreview")}</Badge>}
                  </div>
                  <h3>{m.title[lang]}</h3>
                </div>
              </div>
              <p>{m.blurb[lang]}</p>
              {!gated && (
                <>
                  <Progress value={(d / m.terms.length) * 100} className={cn(miniBar)} />
                  <span className="cnt">{d}/{m.terms.length} {t("terms")}</span>
                </>
              )}
            </Link>
          );
        })}
      </div>
    </>
  );
}
