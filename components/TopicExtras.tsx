"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/components/Providers";
import type { TopicExtra } from "@/lib/topic-extras/types";

/** How it looks / useful prompts, under the lesson. The lesson text stays put. */
export function TopicExtras({ extra }: { extra?: TopicExtra }) {
  const { lang, t } = useApp();
  const looks = extra?.look ?? [];
  const prompts = extra?.prompts ?? [];
  const tabs = [
    ...(looks.length ? (["look"] as const) : []),
    ...(prompts.length ? (["prompts"] as const) : []),
  ];
  const [tab, setTab] = useState(tabs[0]);
  const [mark, setMark] = useState<{ i: number; ok: boolean } | null>(null);
  if (!extra || tabs.length === 0) return null;
  const on = tabs.includes(tab) ? tab : tabs[0];

  const copy = async (i: number, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setMark({ i, ok: true });
    } catch {
      setMark({ i, ok: false });
    }
    window.setTimeout(() => setMark((m) => (m?.i === i ? null : m)), 1500);
  };

  return (
    <div className="topic-extra">
      <div className="mode-tabs" role="tablist" aria-label={t("topicExtra")}>
        {tabs.map((id) => (
          <button key={id} type="button" role="tab" aria-selected={on === id} onClick={() => setTab(id)}>
            {id === "look" ? t("howItLooks") : t("aiPrompts")}
          </button>
        ))}
      </div>
      {on === "look" ? (
        <div className="looks" role="tabpanel">
          {looks.map((look, i) => (
            <figure key={i} className="look">
              <figcaption className="cap">{look.cap[lang]}</figcaption>
              <div className={look.preview ? "look-split has-preview" : "look-split"}>
                <div>
                  <div className="look-label">{t("lookCode")}</div>
                  <pre className="code">{look.code}</pre>
                </div>
                {look.preview ? (
                  <div>
                    <div className="look-label">{t("lookResult")}</div>
                    <iframe
                      className="look-frame"
                      sandbox=""
                      title={look.cap[lang]}
                      srcDoc={look.preview}
                    />
                  </div>
                ) : null}
              </div>
            </figure>
          ))}
        </div>
      ) : (
        <ul className="prompt-list" role="tabpanel">
          {prompts.map((p, i) => (
            <li key={i} className="prompt-card">
              <p>{p[lang]}</p>
              <Button type="button" variant="outline" size="sm" onClick={() => copy(i, p[lang])}>
                {mark?.i === i ? t(mark.ok ? "copied" : "copyFail") : t("copy")}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
