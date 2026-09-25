import type { Lang } from "./types";

/** ponytail: Hebrew hidden for now; add "he" back to re-enable (middleware redirects /he → /en while it's off). */
export const LANGS: readonly Lang[] = ["en"];

export function isLang(v: string | undefined): v is Lang {
  return v === "en" || v === "he";
}

export function parseLang(v: string | undefined | null): Lang {
  return v === "he" ? "he" : "en";
}

/** `/he/lesson/foo` → `/lesson/foo`; `/en` → `/` */
export function stripLang(pathname: string): string {
  const stripped = pathname.replace(/^\/(en|he)(?=\/|$)/, "");
  return stripped || "/";
}

export function parseLangFromPath(pathname: string): Lang {
  return parseLang(pathname.split("/")[1]);
}

/** Prefix (or swap) the locale segment. Leaves `/api` alone. */
export function withLang(lang: Lang, href: string): string {
  if (!href.startsWith("/") || href === "/api" || href.startsWith("/api/")) return href;
  const hash = href.indexOf("#");
  const noHash = hash < 0 ? href : href.slice(0, hash);
  const frag = hash < 0 ? "" : href.slice(hash);
  const q = noHash.indexOf("?");
  const path = q < 0 ? noHash : noHash.slice(0, q);
  const search = q < 0 ? "" : noHash.slice(q);
  const rest = stripLang(path);
  return `/${lang}${rest === "/" ? "" : rest}${search}${frag}`;
}
