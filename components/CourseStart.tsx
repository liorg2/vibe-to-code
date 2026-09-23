"use client";

import Link from "@/components/Link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { buildFinished } from "@/lib/builds/counts";
import { MODULES, termKey } from "@/lib/course";
import { INTRO } from "@/lib/intro";
import { PREVIEW } from "@/lib/protected";
import { useApp } from "./Providers";

/**
 * Topics watched and build steps finished, and one button to wherever the learner left off.
 */
export function CourseStart({
  course,
  ids,
  locked,
}: {
  course: string;
  ids: string[];
  locked: boolean;
}) {
  const { lang, done, ticked, t } = useApp();
  const mods = ids.map((id) => MODULES.find((m) => m.id === id)!).filter(Boolean);
  const total = mods.reduce((n, m) => n + m.terms.length, 0);
  const seen = mods.reduce((n, m) => n + m.terms.filter((_, i) => done.has(termKey(m, i))).length, 0);
  const stepDone = (id: string) => buildFinished(ticked, id);
  const built = ids.filter(stepDone).length;
  const q = `?course=${course}`;

  // the first topic not yet done, or the build step of a lesson whose topics are all done
  let href = "";
  let label = "";
  for (const m of mods) {
    const i = m.terms.findIndex((_, j) => !done.has(termKey(m, j)));
    if (i >= 0) {
      href = i === 0 ? `/lesson/${m.id}/overview${q}` : `/lesson/${m.id}/${i}${q}`;
      label = m.title[lang];
      break;
    }
    if (!stepDone(m.id)) {
      href = `/lesson/${m.id}/build${q}`;
      label = `${t("build")} · ${m.title[lang]}`;
      break;
    }
  }
  const fresh = seen === 0 && built === 0;
  if (locked) {
    href = `/lesson/${PREVIEW[course as keyof typeof PREVIEW] ?? ids[0]}/overview${q}`;
    label = "";
  }

  return (
    <div className="intro-prog">
      <div className="stats">
        <div>
          <b>{seen}/{total}</b> {INTRO.h.topics[lang]}
          <Progress value={total ? (seen / total) * 100 : 0} className="mini" />
        </div>
        <div>
          <b>{built}/{ids.length}</b> {INTRO.h.builds[lang]}
          <Progress value={(built / ids.length) * 100} className="mini" />
        </div>
      </div>
      {href ? (
        <Button variant="brand" nativeButton={false} render={<Link href={href} />}>
          {locked ? INTRO.h.preview[lang] : fresh ? t("start") : t("continue")}
          {label && !fresh ? <span className="where">· {label}</span> : null}
        </Button>
      ) : (
        <p className="fin">🎉 {INTRO.h.finished[lang]}</p>
      )}
    </div>
  );
}
