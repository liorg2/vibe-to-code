"use client";

import { useApp } from "./Providers";
import type { Level, Module } from "@/lib/types";

const LEVELS: Level[] = ["A", "B", "C"];

/** The letter is the whole badge; the colour repeats it so a scan of a list reads at a glance. */
export function LevelTag({ lvl, full = false }: { lvl: Level; full?: boolean }) {
  const { t } = useApp();
  return (
    <span className={`lvl lvl-${lvl}`} title={`${t("level")} ${lvl} · ${t(`lvl${lvl}`)}`}>
      {lvl}
      {full ? <b>{t(`lvl${lvl}`)}</b> : null}
    </span>
  );
}

/** The same three badges, as switches. `full` adds the sentence; the nav version is letters only. */
export function LevelFilter({ full = false }: { full?: boolean }) {
  const { levels, toggleLevel, t } = useApp();
  return (
    <div className={`lvl-key${full ? " full" : ""}`} role="group" aria-label={t("filterLvl")}>
      {LEVELS.map((l) => (
        <button
          key={l}
          type="button"
          className={levels.has(l) ? "on" : ""}
          aria-pressed={levels.has(l)}
          onClick={() => toggleLevel(l)}
        >
          <LevelTag lvl={l} full={full} />
          {full ? <span>{t(`lvl${l}d`)}</span> : null}
        </button>
      ))}
    </div>
  );
}

/** How many of a module's terms survive the current filter, and how many are done. */
export function useVisibleTerms(m: Module) {
  const { levels } = useApp();
  return m.terms
    .map((tm, i) => ({ tm, i }))
    .filter(({ tm }) => levels.has(tm.lvl));
}
