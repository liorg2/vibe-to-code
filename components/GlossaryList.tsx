"use client";

import Link from "@/components/Link";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { useApp } from "./Providers";
import { skippable, termKey } from "@/lib/course";
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

// Basic/Advanced are the A/B levels minus anything skippable, so the chips never overlap
const FILTERS = {
  all: () => true,
  basic: (tm: Term) => tm.lvl === "A" && !tm.opt,
  advanced: (tm: Term) => tm.lvl === "B" && !tm.opt,
  optional: (tm: Term) => !!tm.opt,
  expert: (tm: Term) => tm.lvl === "E",
};
type Filter = keyof typeof FILTERS;
const FILTER_LABEL: Record<Filter, string> = {
  all: "lvlAll",
  basic: "lvlBasic",
  advanced: "lvlAdvanced",
  optional: "optional",
  expert: "expert",
};

export function GlossaryList({ items }: { items: { m: Module; i: number; tm: Term }[] }) {
  const { lang, done, t } = useApp();
  const [raw, setRaw] = useState("");
  const [lvl, setLvl] = useState<Filter>("all");
  const q = raw.trim().toLowerCase();

  // the definition is searched too, so "makes pages load faster" finds Cache
  const hits = useMemo(
    () =>
      items.filter(
        ({ tm }) =>
          FILTERS[lvl](tm) &&
          (!q || (tm.t.en + tm.t.he + tm.d[lang] + tm.w[lang]).toLowerCase().includes(q)),
      ),
    [items, q, lang, lvl],
  );

  const groups: Record<string, typeof items> = {};
  hits.forEach((x) => {
    const k = x.tm.t[lang][0]?.toUpperCase() ?? "#";
    (groups[k] ||= []).push(x);
  });

  return (
    <>
      <div className="gsearch">
        <Input
          type="search"
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          placeholder={t("filterTopics")}
          aria-label={t("filterTopics")}
          autoComplete="off"
        />
        <span>{hits.length}/{items.length}</span>
      </div>
      <div className="lvl-chips" role="group" aria-label={t("filterLvl")}>
        {(Object.keys(FILTERS) as Filter[]).map((v) => (
          <button key={v} type="button" aria-pressed={lvl === v} onClick={() => setLvl(v)}>
            {t(FILTER_LABEL[v])}
          </button>
        ))}
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
                  <span>
                    {mark(tm.t[lang], q)}
                    {skippable(tm) ? <span className="xbadge ms-1.5">{t(tm.lvl === "E" ? "expert" : "optional")}</span> : null}
                  </span>
                  <i>{m.title[lang]}</i>
                </Link>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="empty">{raw ? `Nothing matched “${raw}”.` : t("noLvl")}</div>
      )}
    </>
  );
}
