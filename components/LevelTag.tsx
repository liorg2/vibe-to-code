"use client";

import { useApp } from "./Providers";
import type { Level } from "@/lib/types";

/** The letter is the whole badge; the colour repeats it so a scan of the list reads at a glance. */
export function LevelTag({ lvl, full = false }: { lvl: Level; full?: boolean }) {
  const { t } = useApp();
  return (
    <span className={`lvl lvl-${lvl}`} title={`${t("level")} ${lvl} · ${t(`lvl${lvl}`)}`}>
      {lvl}
      {full ? <b>{t(`lvl${lvl}`)}</b> : null}
    </span>
  );
}
