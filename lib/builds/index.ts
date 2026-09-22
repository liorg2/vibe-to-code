import type { Lang } from "@/lib/types";
import { PATHS } from "@/lib/course";
import type { BuildStep } from "./types";
import { BUILDS_BASIC } from "./basic";
import { BUILDS_ADV_A } from "./advanced-a";
import { BUILDS_ADV_B } from "./advanced-b";

/**
 * One step per lesson, keyed by module id; the step number is the lesson number.
 * Import from server components only — the prompts are paid content.
 */
export const BUILDS: Record<string, BuildStep> = { ...BUILDS_BASIC, ...BUILDS_ADV_A, ...BUILDS_ADV_B };

/** The steps of one course, in syllabus order. */
export function buildsFor(courseId: string): { id: string; step: BuildStep }[] {
  const mods = PATHS.find((p) => p.id === courseId)?.mods ?? [];
  return mods.filter((id) => BUILDS[id]).map((id) => ({ id, step: BUILDS[id] }));
}

/** Prompts stay English — that is what the tools and docs speak — but the answer can come back in Hebrew. */
export function promptFor(text: string, lang: Lang): string {
  return lang === "he" ? `${text}\n\nAnswer me in Hebrew. Keep code, commands, file names and error messages in English.` : text;
}
