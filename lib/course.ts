import type { Architecture, Course, Lang, Module, Path, Term } from "./types";
import raw from "@/data/course.json";
import { BUILD_DONE_N } from "./builds/counts";

const course = raw as Course;
// Term names stay English in the Hebrew UI too — devs say "flaky test", not "בדיקה הפכפכה". Explanations stay translated.
for (const m of course.MODULES) for (const tm of m.terms) tm.t.he = tm.t.en;

export function getCourse(): Course {
  return course;
}

export function getUI(lang: Lang, key: string): string {
  return course.UI[key]?.[lang] ?? key;
}

export function getModule(id: string): Module | undefined {
  return course.MODULES.find((m) => m.id === id);
}

/** The lessons of a course, in syllabus order. `courseId` picks which syllabus when a lesson sits in both. */
function courseModules(id: string, courseId?: string): Module[] {
  const p = pathForModule(id, courseId);
  if (!p) return course.MODULES;
  return p.mods
    .map((mid) => course.MODULES.find((m) => m.id === mid))
    .filter((m): m is Module => !!m);
}

/** Previous/next lesson within one course — Advanced continues into its own lessons after the shared ones. */
export function neighbors(id: string, courseId?: string): { prev?: Module; next?: Module } {
  const mods = courseModules(id, courseId);
  const i = mods.findIndex((m) => m.id === id);
  return { prev: mods[i - 1], next: mods[i + 1] };
}

/** Display number of a lesson, 1-based within its own course ("01", "02", ...). */
export function lessonNo(id: string): string {
  return String(courseModules(id).findIndex((m) => m.id === id) + 1).padStart(2, "0");
}

/** Position in the whole syllabus — used for prev/next navigation, not for display. */
export function moduleIndex(id: string): number {
  return course.MODULES.findIndex((m) => m.id === id);
}

/** `lesson:topic`, both stable slugs — never positions, so terms can be added or retitled. */
export function termKey(mod: Module, i: number): string {
  return `${mod.id}:${mod.terms[i].k}`;
}

export function totalTerms(): number {
  return course.MODULES.reduce((n, m) => n + m.terms.length, 0);
}

export function mins(m: Module): number {
  return Math.max(3, Math.round(m.terms.length * 1.6));
}

/** ponytail: a flat guess for one build step — paste, let the agent work, run the check, look with
 *  your own eyes. Replace with per-step numbers if learners report very different times. */
export const BUILD_MINS = 45;

/** Whole-course estimate in hours: reading every lesson plus doing every build step. */
export function courseHours(mods: Module[]): number {
  return Math.round(mods.reduce((n, m) => n + mins(m) + (BUILD_DONE_N[m.id] ? BUILD_MINS : 0), 0) / 60);
}

/** The course a lesson is being read in. Shared lessons live in both; without `courseId` the earlier course wins. */
export function pathForModule(id: string, courseId?: string): Path | undefined {
  if (courseId) {
    const picked = course.PATHS.find((p) => p.id === courseId && p.mods.includes(id));
    if (picked) return picked;
  }
  return course.PATHS.find((p) => p.mods.includes(id));
}

/** Architectures that belong to one course, in syllabus order. */
export function archesFor(courseId: string): Architecture[] {
  const ids = course.PATHS.find((p) => p.id === courseId)?.arch ?? [];
  return ids
    .map((id) => course.ARCHITECTURES.items.find((a) => a.id === id))
    .filter((a): a is Architecture => !!a);
}

export function findTerm(nameEn: string): { m: Module; i: number; tm: Term } | null {
  for (const m of course.MODULES) {
    const i = m.terms.findIndex((x) => x.t.en === nameEn);
    if (i >= 0) return { m, i, tm: m.terms[i] };
  }
  return null;
}

export const { UI, MODULES, SIMPLE, DETAIL, TLDR, EXAMPLES, QUIZ, CHECKLIST, ARCHITECTURES, PATHS } =
  course;

/** Locate a term by its stable slug, in whichever lesson it lives. */
export function findTermK(k: string): { m: Module; i: number; tm: Term } | null {
  for (const m of course.MODULES) {
    const i = m.terms.findIndex((x) => x.k === k);
    if (i >= 0) return { m, i, tm: m.terms[i] };
  }
  return null;
}
