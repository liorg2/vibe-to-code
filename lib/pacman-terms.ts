import { MODULES, PATHS } from "./course";
import type { Lang } from "./types";

const MAX_EN = 14;
const PELLET_COUNT = 24;

/** Short Advanced-course titles for Pac-Man pellets (homepage). */
export function pacmanTerms(lang: Lang): string[] {
  const adv = PATHS.find((p) => p.id === "advanced");
  if (!adv) return [];
  return MODULES.filter((m) => adv.mods.includes(m.id))
    .flatMap((m) => m.terms)
    .filter((tm) => tm.t.en.length > 0 && tm.t.en.length <= MAX_EN)
    .slice(0, PELLET_COUNT)
    .map((tm) => tm.t[lang]);
}
