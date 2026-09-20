"use client";

import Link from "next/link";
import { useApp } from "./Providers";
import { ARCHITECTURES, CHECKLIST, MODULES, PATHS, PROJECT, termKey, mins } from "@/lib/course";

export function HomeContent() {
  const { lang, done, t } = useApp();

  const extra = [
    { m: PROJECT, sub: t("capstone") },
    { m: ARCHITECTURES, sub: t("more") },
    { m: CHECKLIST, sub: t("beforeShip") },
  ].filter((x) => x.m?.id);

  const paths = (
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

  return (
    <>
      {paths}
      <div className="cards">
        {MODULES.map((m, i) => {
          const d = m.terms.filter((_, j) => done.has(termKey(m, j))).length;
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
              <div className="mini"><i style={{ width: `${(d / m.terms.length) * 100}%` }} /></div>
              <span className="cnt">{d}/{m.terms.length} {t("terms")}</span>
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
