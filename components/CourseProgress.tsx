"use client";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useApp } from "./Providers";
import { MODULES, termKey } from "@/lib/course";

const miniBar =
  "mini gap-0 [&_[data-slot=progress-track]]:h-[5px] [&_[data-slot=progress-track]]:rounded-full [&_[data-slot=progress-track]]:bg-[var(--line)] [&_[data-slot=progress-indicator]]:rounded-full [&_[data-slot=progress-indicator]]:bg-[var(--grad)]";

/** Done-count and bar for a set of lessons — the only part of a course card that needs the browser. */
export function CourseProgress({ ids }: { ids: string[] }) {
  const { done, t } = useApp();
  const mods = MODULES.filter((m) => ids.includes(m.id));
  const total = mods.reduce((n, m) => n + m.terms.length, 0);
  const d = mods.reduce((n, m) => n + m.terms.filter((_, i) => done.has(termKey(m, i))).length, 0);
  return (
    <div>
      <Progress value={total ? (d / total) * 100 : 0} className={cn(miniBar)} />
      <span className="cnt">{d}/{total} {t("terms")}</span>
    </div>
  );
}
