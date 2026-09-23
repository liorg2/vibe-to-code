import { MODULES } from "./course";

/** Short course-term titles Pac-Man can eat on the homepage lane. Always English: dev terms read as jargon, not translations. */
export function pacmanWords(): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const m of MODULES) {
    for (const tm of m.terms) {
      const raw = tm.t.en.split(/[/(&]/)[0].trim();
      if (raw.length < 2 || raw.length > 16 || seen.has(raw)) continue;
      seen.add(raw);
      out.push(raw);
    }
  }
  return out;
}
