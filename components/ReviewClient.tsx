"use client";

import Link from "next/link";
import { useState } from "react";
import { useApp } from "./Providers";
import { MODULES, termKey } from "@/lib/course";
import type { Module, Term } from "@/lib/types";

type Card = { m: Module; i: number; tm: Term };

export function ReviewClient() {
  const { lang, done, levels, toggleDone, t } = useApp();
  const [card, setCard] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // the level filter picks the deck; unlearnt cards first, the whole deck once they are gone
  const deck: Card[] = [];
  MODULES.forEach((m) => m.terms.forEach((tm, i) => {
    if (levels.has(tm.lvl)) deck.push({ m, i, tm });
  }));
  const pool = deck.filter(({ m, i }) => !done.has(termKey(m, i)));
  const all = pool.length ? pool : deck;

  const idx = card >= all.length ? 0 : card;
  const { m, i, tm } = all[idx];
  const k = termKey(m, i);

  return (
    <>
      <div
        className={`flash ${flipped ? "on" : ""}`}
        role="button"
        tabIndex={0}
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={(e) => e.key === " " && (e.preventDefault(), setFlipped((f) => !f))}
      >
        <div className="fk">{m.title[lang]}</div>
        <h2>{tm.t[lang]}</h2>
        {flipped ? (
          <div className="fb">
            <p>{tm.d[lang]}</p>
            <p className="w">{tm.w[lang]}</p>
          </div>
        ) : (
          <div className="fhint">{t("tapToFlip")}</div>
        )}
      </div>
      <div className="fbar">
        <button className="btn" type="button" onClick={() => { setCard((c) => c + 1); setFlipped(false); }}>
          {t("skip")} &rarr;
        </button>
        <span className="grow" />
        <Link className="btn" href={`/lesson/${m.id}/${i}`}>{t("openSlide")}</Link>
        <button
          className="btn prim"
          type="button"
          onClick={() => { toggleDone(k); setFlipped(false); setCard((c) => c + 1); }}
        >
          ✓ {t("got")}
        </button>
      </div>
    </>
  );
}
