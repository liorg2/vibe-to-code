import { BUILDS } from "./builds";
import { CHECKLIST, MODULES, rehome } from "./course";
import type { Row } from "./db";

/** The checklist is stored like a lesson, so one table covers everything a user ticks. */
export const CHECKLIST_LESSON = "checklist";
/** Build-step ticks (`build:<lesson>:<i>`) get a row bucket of their own, so they do not skew the checklist. */
export const BUILD_LESSON = "build";

/** Every key the course can legitimately produce — anything else is dropped on save. */
const valid = new Map<string, Set<string>>([
  ...MODULES.map((m) => [m.id, new Set(m.terms.map((t) => t.k))] as const),
  [CHECKLIST_LESSON, new Set(CHECKLIST.do.map((x) => `do:${x.k}`))] as const,
  [BUILD_LESSON, new Set(Object.entries(BUILDS).flatMap(([id, b]) => b.done.map((_, i) => `${id}:${i}`)))] as const,
]);

const split = (key: string) => {
  const at = key.indexOf(":");
  return at < 0 ? null : ([key.slice(0, at), key.slice(at + 1)] as const);
};

const known = (lesson: string, topic: string) => valid.get(lesson)?.has(topic) ?? false;

/** Client keys (`lesson:topic`) in, table rows out — topic rows plus a per-lesson percentage. */
export function toRows(done: string[], ticked: string[]): Row[] {
  const byLesson = new Map<string, Set<string>>();
  const tick = (k: string) => (k.startsWith(`${BUILD_LESSON}:`) ? k : `${CHECKLIST_LESSON}:${k}`);
  for (const key of [...done.map(rehome), ...ticked.map(tick)]) {
    const parts = split(key);
    if (!parts || !known(parts[0], parts[1])) continue;
    (byLesson.get(parts[0]) ?? byLesson.set(parts[0], new Set()).get(parts[0])!).add(parts[1]);
  }

  const rows: Row[] = [];
  for (const [lesson, topics] of byLesson) {
    for (const topic of topics) rows.push({ lesson, topic, pct: 100 });
    const total = valid.get(lesson)!.size;
    rows.push({ lesson, topic: "", pct: Math.round((topics.size / total) * 100) });
  }
  return rows;
}

/** Rows back out as the two key lists the client works with. */
export function fromRows(rows: Row[]): { done: string[]; ticked: string[] } {
  const done: string[] = [];
  const ticked: string[] = [];
  for (const row of rows) {
    // rows saved before a topic moved lessons still carry the old lesson
    const own = row.lesson === CHECKLIST_LESSON || row.lesson === BUILD_LESSON;
    const r = own ? row : { ...row, lesson: split(rehome(`${row.lesson}:${row.topic}`))![0] };
    if (!r.topic || r.pct < 100 || !known(r.lesson, r.topic)) continue;
    if (r.lesson === CHECKLIST_LESSON) ticked.push(r.topic);
    else if (r.lesson === BUILD_LESSON) ticked.push(`${BUILD_LESSON}:${r.topic}`);
    else done.push(`${r.lesson}:${r.topic}`);
  }
  return { done, ticked };
}
