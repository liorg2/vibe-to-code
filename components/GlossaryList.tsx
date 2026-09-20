"use client";

import Link from "next/link";
import { useApp } from "./Providers";
import { termKey } from "@/lib/course";
import type { Module, Term } from "@/lib/types";

export function GlossaryList({ items }: { items: { m: Module; i: number; tm: Term }[] }) {
  const { lang, done } = useApp();
  const groups: Record<string, typeof items> = {};
  items.forEach((x) => {
    const k = x.tm.t[lang][0]?.toUpperCase() ?? "#";
    (groups[k] ||= []).push(x);
  });

  return (
    <div className="gloss">
      {Object.keys(groups).map((k) => (
        <div key={k} className="gl">
          <h4>{k}</h4>
          {groups[k].map(({ m, i, tm }) => (
            <Link
              key={`${m.id}-${i}`}
              href={`/lesson/${m.id}/${i}`}
              className={done.has(termKey(m, i)) ? "done" : ""}
            >
              <span>{tm.t[lang]}</span>
              <i>{m.title[lang]}</i>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
