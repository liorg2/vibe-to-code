"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useApp } from "./Providers";
import type { Level, Module } from "@/lib/types";

const LEVELS: Level[] = ["A", "B"];

/** The letter is the whole badge; the colour repeats it so a scan of a list reads at a glance. */
export function LevelTag({ lvl, full = false }: { lvl: Level; full?: boolean }) {
  const { t } = useApp();
  return (
    <Badge
      variant="outline"
      className={cn("lvl", `lvl-${lvl}`)}
      title={`${t("level")} ${lvl} · ${t(`lvl${lvl}`)}`}
    >
      {lvl}
      {full ? <b>{t(`lvl${lvl}`)}</b> : null}
    </Badge>
  );
}

/** The same three badges, as switches. `full` adds the sentence; the nav version is letters only. */
export function LevelFilter({ full = false }: { full?: boolean }) {
  const { levels, toggleLevel, t } = useApp();
  return (
    <div className={cn("lvl-key", full && "full")} role="group" aria-label={t("filterLvl")}>
      {LEVELS.map((l) => (
        <Button
          key={l}
          type="button"
          variant="outline"
          size="sm"
          className={cn(levels.has(l) && "on")}
          aria-pressed={levels.has(l)}
          onClick={() => toggleLevel(l)}
        >
          {full ? (
            <LevelTag lvl={l} full />
          ) : (
            <span className={`lvl lvl-${l}`}>
              {`${t("level")} ${l}`}
              <b>{t(`lvl${l}`)}</b>
            </span>
          )}
          {full ? <span>{t(`lvl${l}d`)}</span> : null}
        </Button>
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
