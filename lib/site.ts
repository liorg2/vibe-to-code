import type { Lang } from "./types";

export const SITE_URL = "https://vibetodev.com";

/** Absolute, locale-prefixed URL. `abs("he", "/courses")` → `https://vibetodev.com/he/courses` */
export function abs(lang: Lang, path: string): string {
  return `${SITE_URL}/${lang}${path === "/" ? "" : path}`;
}
