import type { Course, Lang, Module, Term } from "./types";
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

export function moduleIndex(id: string): number {
  return course.MODULES.findIndex((m) => m.id === id);
}

export function termKey(mod: Module, i: number): string {
  return `${mod.id}:${i}`;
}

export function totalTerms(): number {
  return course.MODULES.reduce((n, m) => n + m.terms.length, 0);
}

export function mins(m: Module): number {
  return Math.max(3, Math.round(m.terms.length * 1.6));
}

export function findTerm(nameEn: string): { m: Module; i: number; tm: Term } | null {
  for (const m of course.MODULES) {
    const i = m.terms.findIndex((x) => x.t.en === nameEn);
    if (i >= 0) return { m, i, tm: m.terms[i] };
  }
  return null;
}

export const { UI, MODULES, DETAIL, EXAMPLES, QUIZ, PROJECT, CHECKLIST, ARCHITECTURES, PATHS, ASK_PROMPT } =
  course;
