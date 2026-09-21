"use client";

import Link from "next/link";
import { useApp } from "./Providers";
import { LevelFilter } from "./LevelTag";
import { ARCHITECTURES, CHECKLIST, MODULES, PROJECT, termKey, mins } from "@/lib/course";

export function HomeContent() {
  const { lang, done, levels, t } = useApp();

  const extra = [
    { m: PROJECT, sub: t("capstone") },
    { m: ARCHITECTURES, sub: t("more") },
    { m: CHECKLIST, sub: t("beforeShip") },
  ].filter((x) => x.m?.id);

  return (
    <>
      <LevelFilter full />
      <div className="cards">
        {MODULES.map((m, i) => {
          const shown = m.terms.map((tm, j) => ({ tm, j })).filter(({ tm }) => levels.has(tm.lvl));
          if (!shown.length) return null;
          const d = shown.filter(({ j }) => done.has(termKey(m, j))).length;
          return (
            <Link key={m.id} className="mcard" href={`/lesson/${m.id}/0`}>
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
              <div className="mini"><i style={{ width: `${(d / shown.length) * 100}%` }} /></div>
              <span className="cnt">{d}/{shown.length} {t("terms")}</span>
            </Link>
          );
        })}
        {extra.map(({ m, sub }) => (
          <Link key={m.id} className="mcard special" href={`/${m.id}`}>
            <div className="row">
              <div className="ic">{m.icon}</div>
              <div><div className="num">{sub}</div><h3>{m.title[lang]}</h3></div>
            </div>
            <p>{m.blurb[lang]}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
