"use client";

import { useApp } from "./Providers";
import { MODULES, termKey } from "@/lib/course";

/** Done-count and bar for a set of lessons — the only part of a course card that needs the browser. */
export function CourseProgress({ ids }: { ids: string[] }) {
  const { done, t } = useApp();
  const mods = MODULES.filter((m) => ids.includes(m.id));
  const total = mods.reduce((n, m) => n + m.terms.length, 0);
  const d = mods.reduce((n, m) => n + m.terms.filter((_, i) => done.has(termKey(m, i))).length, 0);
  return (
    <div>
      <div className="mini"><i style={{ width: total ? `${(d / total) * 100}%` : 0 }} /></div>
      <span className="cnt">{d}/{total} {t("terms")}</span>
    </div>
  );
}
