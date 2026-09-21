"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useApp } from "./Providers";
import { LevelTag } from "./LevelTag";
import { termKey } from "@/lib/course";
import type { Module, Term } from "@/lib/types";

export function TermCard({ m, i, tm }: { m: Module; i: number; tm: Term }) {
  const { lang, done, toggleDone, t } = useApp();
  const k = termKey(m, i);
  return (
    <Link className={cn("term", done.has(k) && "done")} href={`/lesson/${m.id}/${i}`} data-k={k}>
      <Button
        type="button"
        variant="ghost"
        className={cn(
          "chk",
          "!size-[22px] !min-w-[22px] !h-[22px] !w-[22px] !p-0 !rounded-[var(--r-sm)] hover:!bg-transparent !shadow-none !ring-0",
        )}
        title={t("got")}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleDone(k);
        }}
      >
        &#10003;
      </Button>
      <h4>{tm.t[lang]}<LevelTag lvl={tm.lvl} /></h4>
      <p>{tm.d[lang]}</p>
      <div className="more">{t("open")} &rarr;</div>
    </Link>
  );
}
