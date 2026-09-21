"use client";

import Link from "next/link";
import { useApp } from "./Providers";
import { LevelTag } from "./LevelTag";
import { termKey } from "@/lib/course";
import type { Module, Term } from "@/lib/types";

export function TermCard({ m, i, tm }: { m: Module; i: number; tm: Term }) {
  const { lang, done, toggleDone, t } = useApp();
  const k = termKey(m, i);
  return (
    <Link className={`term ${done.has(k) ? "done" : ""}`} href={`/lesson/${m.id}/${i}`} data-k={k}>
      <button
        className="chk"
        type="button"
        title={t("got")}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleDone(k);
        }}
      >
        &#10003;
      </button>
      <h4>{tm.t[lang]}<LevelTag lvl={tm.lvl} /></h4>
      <p>{tm.d[lang]}</p>
      <div className="more">{t("open")} &rarr;</div>
    </Link>
  );
}
