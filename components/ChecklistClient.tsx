"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useApp } from "./Providers";
import { CHECKLIST } from "@/lib/course";
import type { CheckItem } from "@/lib/types";

export function ChecklistClient() {
  const { lang, ticked, toggleTicked, t } = useApp();
  const C = CHECKLIST;

  const item = (x: CheckItem, k: string, no: boolean) => (
    <div key={k} className="ci">
      <label>
        {no ? (
          <span className="x">&times;</span>
        ) : (
          <Checkbox
            checked={ticked.has(k)}
            onCheckedChange={(checked) => toggleTicked(k, checked === true)}
          />
        )}
        <span>{x.t[lang]}</span>
      </label>
      <p>{x.d[lang]}</p>
    </div>
  );

  const keys = [...C.do.map((x) => `do:${x.k}`), ...C.live.items.map((x) => `live:${x.k}`)];
  const okDone = keys.filter((k) => ticked.has(k)).length;
  const liveDone = C.live.items.filter((x) => ticked.has(`live:${x.k}`)).length;

  return (
    <>
      <section className="mod">
        <div className="mhead">
          <div className="ic">{C.icon}</div>
          <div><h2>{C.title[lang]}</h2></div>
          <div className="n">{okDone}/{keys.length}</div>
        </div>
        <p className="mblurb">{C.blurb[lang]}</p>
      </section>
      <div className="cols">
        <div className="col ok">
          <h3>✓ {t("doThis")}</h3>
          <p className="sub">{t("doSub")}</p>
          {C.do.map((x) => item(x, `do:${x.k}`, false))}
        </div>
        <div className="col no">
          <h3>× {t("neverThis")}</h3>
          <p className="sub">{t("neverSub")}</p>
          {C.dont.map((x) => item(x, `no:${x.k}`, true))}
        </div>
      </div>
      <div className="col ok live">
        <h3>🚀 {C.live.title[lang]} <span className="n">{liveDone}/{C.live.items.length}</span></h3>
        <p className="sub">{C.live.sub[lang]}</p>
        {C.live.items.map((x) => item(x, `live:${x.k}`, false))}
      </div>
    </>
  );
}
