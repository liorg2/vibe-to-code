import { LevelTag } from "./LevelTag";
import type { Module } from "@/lib/types";
import { mins } from "@/lib/course";

export function ModuleHead({
  m,
  mi,
  lang,
  doneCount,
  extra,
}: {
  m: Module;
  mi: number;
  lang: "en" | "he";
  doneCount?: number;
  extra?: string;
}) {
  const n = extra ?? `${doneCount ?? 0}/${m.terms.length}`;
  return (
    <>
      <div className="mhead">
        <div className="ic">{m.icon}</div>
        <div><h2>{String(mi + 1).padStart(2, "0")}. {m.title[lang]}</h2></div>
        <LevelTag lvl={m.lvl} full />
        <div className="n">{n}</div>
      </div>
      <p className="mblurb">{m.blurb[lang]}</p>
    </>
  );
}

export function lessonMins(m: Module) {
  return mins(m);
}
