"use client";

import Link from "@/components/Link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useApp } from "./Providers";
import { MODULES, termKey } from "@/lib/course";
import type { Module, Term } from "@/lib/types";

type Card = { m: Module; i: number; tm: Term };

/** `allowed` is the server's word on which modules this account paid for. */
export function ReviewClient({ allowed }: { allowed: string[] }) {
  const { lang, done, toggleDone, t } = useApp();
  const [card, setCard] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // unlearnt cards first, the whole deck once they are gone
  const deck: Card[] = [];
  MODULES.forEach((m) => m.terms.forEach((tm, i) => {
    if (allowed.includes(m.id)) deck.push({ m, i, tm });
  }));
  const pool = deck.filter(({ m, i }) => !done.has(termKey(m, i)));
  const all = pool.length ? pool : deck;

  // requireEntitlement already sent a non-buyer to the offer — this is belt and braces
  if (!all.length) return <div className="empty">{t("noLvl")}</div>;

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
        <Button
          variant="outline"
          type="button"
          onClick={() => { setCard((c) => c + 1); setFlipped(false); }}
        >
          {t("skip")} &rarr;
        </Button>
        <span className="grow" />
        <Button variant="outline" nativeButton={false} render={<Link href={`/lesson/${m.id}/${i}`} />}>
          {t("openSlide")}
        </Button>
        <Button
          variant="brand"
          type="button"
          onClick={() => { toggleDone(k); setFlipped(false); setCard((c) => c + 1); }}
        >
          ✓ {t("got")}
        </Button>
      </div>
    </>
  );
}
