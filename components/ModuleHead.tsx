import type { Module } from "@/lib/types";
import { mins, lessonNo } from "@/lib/course";

export function ModuleHead({
  m,
  lang,
  doneCount,
  extra,
}: {
  m: Module;
  lang: "en" | "he";
  doneCount?: number;
  extra?: string;
}) {
  const n = extra ?? `${doneCount ?? 0}/${m.terms.length}`;
  return (
    <>
      <div className="mhead">
        <div className="ic">{m.icon}</div>
        <div>
          <h2>{lessonNo(m.id)}. {m.title[lang]}</h2>
        </div>
        <div className="n">{n}</div>
      </div>
      <p className="mblurb">{m.blurb[lang]}</p>
    </>
  );
}

export function lessonMins(m: Module) {
  return mins(m);
}
