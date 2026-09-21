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
  return PROTECTED_RE.test(pathname);
}
