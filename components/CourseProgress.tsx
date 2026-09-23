"use client";

import Link from "@/components/Link";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { buildFinished } from "@/lib/builds/counts";
import { MODULES, termKey } from "@/lib/course";
import { useApp } from "./Providers";

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

/** Course-card link. Owners who have not opened a topic yet get "Start learning", then "Continue". */
export function CourseOpen({ ids, href, owned, className }: { ids: string[]; href: string; owned: boolean; className: string }) {
  const { done, ticked, t } = useApp();
  const mods = MODULES.filter((m) => ids.includes(m.id));
  const seen = mods.some((m) => m.terms.some((_, i) => done.has(termKey(m, i))));
  const built = ids.some((id) => buildFinished(ticked, id));
  const label = owned ? (seen || built ? t("continue") : t("start")) : t("viewLessons");
  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}
