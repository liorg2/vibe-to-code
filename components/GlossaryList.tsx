"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useApp } from "./Providers";
import { termKey } from "@/lib/course";
import type { Module, Term } from "@/lib/types";

/** Split a label on the query so the matching run can be wrapped in <mark>. */
function mark(text: string, q: string) {
  if (!q) return text;
  const at = text.toLowerCase().indexOf(q);
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <mark>{text.slice(at, at + q.length)}</mark>
      {text.slice(at + q.length)}
    </>
  );
}

export function GlossaryList({ items }: { items: { m: Module; i: number; tm: Term }[] }) {
  const { lang, done } = useApp();
  const [raw, setRaw] = useState("");
  const q = raw.trim().toLowerCase();

  // the definition is searched too, so "makes pages load faster" finds Cache
  const hits = useMemo(
    () =>
      q
        ? items.filter(({ tm }) =>
            (tm.t.en + tm.t.he + tm.d[lang] + tm.w[lang]).toLowerCase().includes(q),
          )
        : items,
    [items, q, lang],
  );

  const groups: Record<string, typeof items> = {};
  hits.forEach((x) => {
    const k = x.tm.t[lang][0]?.toUpperCase() ?? "#";
    (groups[k] ||= []).push(x);
  });

  return (
    <>
      <div className="gsearch">
        <input
          type="search"
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          placeholder="Filter terms…"
          aria-label="Filter terms"
          autoComplete="off"
        />
        <span>{hits.length}/{items.length}</span>
      </div>
      {hits.length ? (
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
                  <span>{mark(tm.t[lang], q)}</span>
                  <i>{m.title[lang]}</i>
                </Link>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="empty">Nothing matched “{raw}”.</div>
      )}
    </>
  );
}
