import type { L10n } from "@/lib/types";

/**
 * One lesson's step on the build track: the same app, from an empty folder in lesson 1 to production
 * in lesson 21. The learner writes no code — they paste `build`, then `check`, and tick `done`.
 */
export type BuildStep = {
  title: L10n;
  /** what the app can do after this step, in one sentence */
  goal: L10n;
  /** why this step belongs to this lesson — one line */
  why: L10n;
  /** term slugs (`Term.k`) this step puts to work; they render as links back to the topics */
  uses: string[];
  /** prompt 1: make the change. English — the UI appends "answer in Hebrew" for Hebrew learners */
  build: string;
  /** prompt 2: prove it — add/extend tests, run the whole suite, gather real evidence, report a table */
  check: string;
  /** 2–4 things the learner confirms with their own eyes */
  done: L10n[];
};
