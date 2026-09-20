"use client";

import Link from "next/link";
import { useApp } from "./Providers";
import { MODULES, PATHS, termKey } from "@/lib/course";

export function CoursesContent() {
  const { lang, done, t } = useApp();

  return (
    <section className="paths">
      <div className="phead">
        <h3>{t("paths")}</h3>
        <p>{t("pathsSub")}</p>
      </div>
      <div className="pgrid">
        {PATHS.map((p) => {
          const mods = p.mods.map((id) => MODULES.find((m) => m.id === id)).filter(Boolean) as typeof MODULES;
          const terms = mods.reduce((n, m) => n + (m.terms?.length ?? 0), 0);
          const d = mods.reduce(
            (n, m) => n + (m.terms ? m.terms.filter((_, i) => done.has(termKey(m, i))).length : 0),
            0,
          );
          return (
            <Link key={p.id} className="path" href={`/lesson/${p.mods[0]}/0`}>
              <div className="row"><span className="ic">{p.icon}</span><h4>{p.title[lang]}</h4></div>
              <p>{p.blurb[lang]}</p>
              <div className="chips">
                {mods.map((m) => <span key={m.id}>{m.title?.[lang] ?? m.id}</span>)}
              </div>
              <div className="mini"><i style={{ width: terms ? `${(d / terms) * 100}%` : "0%" }} /></div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
