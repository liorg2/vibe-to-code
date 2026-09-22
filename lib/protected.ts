export const SESSION_COOKIE = "__session";

/** Top-level segments that require a verified Firebase session (server-checked). */
export const PROTECTED = [
  "lesson",
  "glossary",
  "review",
  "project",
  "checklist",
  "architectures",
] as const;

const PROTECTED_RE = new RegExp(`^/(${PROTECTED.join("|")})(/|$)`);

export function isProtectedPath(pathname: string): boolean {
  return PROTECTED_RE.test(pathname) && !isPreviewPath(pathname);
}

/** ponytail: hardcoded, not derived — data/course.json is 1.9 MB and this file is bundled into the
 *  edge middleware. lib/protected.check.ts fails if it drifts from PATHS[*].mods[0]. */
export const PREVIEW_MODULES = ["ground", "ground"] as const;

const PREVIEW_RE = new RegExp(`^/lesson/(${PREVIEW_MODULES.join("|")})(/|$)`);

export function isPreviewModule(id: string): boolean {
  return (PREVIEW_MODULES as readonly string[]).includes(id);
}

/** The first lesson of each course is a free preview: readable with no session. */
export function isPreviewPath(pathname: string): boolean {
  return PREVIEW_RE.test(pathname);
}
