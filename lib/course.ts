import type { Course, Lang, Module, Path, Term } from "./types";
import raw from "@/data/course.json";

const course = raw as Course;

export function getCourse(): Course {
  return course;
}

export function getUI(lang: Lang, key: string): string {
  return course.UI[key]?.[lang] ?? key;
}

export function getModule(id: string): Module | undefined {
  return course.MODULES.find((m) => m.id === id);
}

/** The lessons of a course, in syllabus order — each course is its own index. */
function courseModules(id: string): Module[] {
  const p = pathForModule(id);
  return p ? course.MODULES.filter((m) => p.mods.includes(m.id)) : course.MODULES;
}

/** Previous/next lesson within the same course — navigation never crosses into the other one. */
export function neighbors(id: string): { prev?: Module; next?: Module } {
  const mods = courseModules(id);
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

/** The course (PATHS entry) a module belongs to, for breadcrumbs. */
export function pathForModule(id: string): Path | undefined {
  return course.PATHS.find((p) => p.mods.includes(id));
}

export function findTerm(nameEn: string): { m: Module; i: number; tm: Term } | null {
  for (const m of course.MODULES) {
    const i = m.terms.findIndex((x) => x.t.en === nameEn);
    if (i >= 0) return { m, i, tm: m.terms[i] };
  }
  return null;
}

export const { UI, MODULES, SIMPLE, DETAIL, EXAMPLES, QUIZ, PROJECT, CHECKLIST, ARCHITECTURES, PATHS, ASK_PROMPT } =
  course;
