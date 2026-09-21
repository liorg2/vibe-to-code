export type Lang = "en" | "he";
export type L10n = Record<Lang, string>;

export type Level = "A" | "B";

export type Term = {
  /** stable slug — progress is stored against this, so the title stays editable */
  k: string;
  /** A foundations, B everything past them — this is also what each tier unlocks */
  lvl: Level;
  t: L10n;
  d: L10n;
  w: L10n;
};

export type Module = {
  id: string;
  icon: string;
  title: L10n;
  blurb: L10n;
  terms: Term[];
};

export type QuizQ = {
  q: L10n;
  a: L10n[];
  c: number;
  why: L10n;
};

export type Example = {
  cap: L10n;
  code: string;
};

export type ProjectStep = {
  n: number;
  title: L10n;
  goal: L10n;
  why: L10n;
  uses: string[];
  prompt: string;
  /** Learner writes this before the paste prompt unlocks. */
  acceptance: L10n;
  /** Post-step checks (run / diff / security-or-data). */
  verify: L10n[];
};

export type CheckItem = { k: string; t: L10n; d: L10n };

export type ArchPart = { n: L10n; d: L10n };

export type Architecture = {
  id: string;
  tag: L10n;
  title: L10n;
  diagram: string;
  flow: L10n;
  parts: ArchPart[];
  good: L10n;
  bad: L10n;
  cost: L10n;
  scale: L10n;
  uses: string[];
  prompt: string;
};

export type Path = {
  id: string;
  icon: string;
  title: L10n;
  blurb: L10n;
  mods: string[];
};

export type Simple = { q: L10n; s: L10n };

export type Course = {
  UI: Record<string, L10n>;
  MODULES: Module[];
  SIMPLE: Record<string, Simple>;
  DETAIL: Record<string, L10n>;
  EXAMPLES: Record<string, Example>;
  QUIZ: Record<string, QuizQ[]>;
  PROJECT: {
    id: string;
    icon: string;
    title: L10n;
    blurb: L10n;
    warn: L10n;
    steps: ProjectStep[];
  };
  CHECKLIST: {
    id: string;
    icon: string;
    title: L10n;
    blurb: L10n;
    do: CheckItem[];
    dont: CheckItem[];
  };
  ARCHITECTURES: {
    id: string;
    icon: string;
    title: L10n;
    blurb: L10n;
    items: Architecture[];
  };
  PATHS: Path[];
  ASK_PROMPT: string;
};
