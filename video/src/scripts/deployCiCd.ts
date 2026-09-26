import type { StepState } from "../videos/deploy/PipelineBox";

/**
 * Deploy & CI/CD, told the same way request-response.tsx tells its story: an intro title, a
 * closing title, and a flat list of beats in between. Unlike Beat in components/timeline.ts
 * (built for a two-way request/response), this topic needs its own fields (a checklist that
 * turns green or red one step at a time, a "blocked" banner, a "now live" moment) — so this
 * script defines its own beat shape and reuses only the generic layoutBeats/totalFrames helpers.
 */
export type Actor = "dev" | "laptop" | "ci";

export type DeployBeat = {
  /** How long this beat plays, in frames. */
  frames: number;
  /** Caption shown at the bottom for this beat, if any. */
  caption?: string;
  /** Which actors glow during this beat. */
  actors?: Actor[];
  /** The developer clicks "git push" (cursor + ripple). */
  click?: boolean;
  /** A "git push" packet travels laptop -> CI this beat. */
  push?: boolean;
  /** The checklist animates from pending toward this outcome over the beat's own duration. */
  run?: "pass" | "failTest";
  /** Static checklist state to hold for beats that aren't actively running (no `run`). */
  steps?: StepState[];
  /** Pop a success burst next to the pipeline. */
  celebrate?: boolean;
  /** Show the "live for every user" card. */
  deploy?: boolean;
  /** Show the red "Blocked" banner on the pipeline box. */
  blocked?: boolean;
};

const PENDING: StepState[] = ["pending", "pending", "pending"];
const ALL_PASS: StepState[] = ["pass", "pass", "pass"];
const TEST_FAILED: StepState[] = ["pass", "fail", "skip"];

export const SCRIPT: { introText: string; closingText: string; beats: DeployBeat[] } = {
  introText: "Every push starts a pipeline",
  closingText: "Make sure a failing check blocks your deploy",
  beats: [
    { frames: 100, caption: "Meet your laptop and the CI pipeline", actors: [], steps: PENDING },
    { frames: 90, caption: "You push new code to GitHub", actors: ["dev", "laptop"], click: true, steps: PENDING },
    { frames: 80, caption: "Code travels to the CI pipeline", actors: ["laptop", "ci"], push: true, steps: PENDING },
    { frames: 160, caption: "CI installs, tests and builds it", actors: ["ci"], run: "pass" },
    { frames: 90, caption: "All green: safe to ship", actors: ["ci"], steps: ALL_PASS, celebrate: true },
    { frames: 130, caption: "The new version goes live to users", actors: ["ci"], steps: ALL_PASS, deploy: true },
    { frames: 80, caption: "Next push has a bug", actors: ["dev", "laptop"], click: true, steps: PENDING },
    { frames: 70, actors: ["laptop", "ci"], push: true, steps: PENDING },
    { frames: 160, caption: "This time a test fails", actors: ["ci"], run: "failTest" },
    { frames: 110, caption: "Blocked: nothing broken for users", actors: ["ci"], steps: TEST_FAILED, blocked: true },
    { frames: 90, actors: [], steps: TEST_FAILED, blocked: true },
  ],
};
