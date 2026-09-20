export const SESSION_COOKIE = "__session";

/** Routes that require a verified Firebase session (server-checked). */
export function isProtectedPath(pathname: string): boolean {
  return /^\/(lesson|glossary|review|project|checklist|architectures)(\/|$)/.test(pathname);
}
