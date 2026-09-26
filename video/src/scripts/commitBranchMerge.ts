/**
 * The whole "Commit / Branch / Merge" video as data, mirroring src/scripts/requestResponse.ts:
 * an intro title, a closing title, and a list of beats. Each beat states the FULL cumulative
 * state of the graph (which commit dots exist, whether a branch is out, etc.) rather than a
 * delta, so the stage component can just render "the graph as of this beat" directly.
 */

export const MAIN_Y = 430;
export const BRANCH_Y = 660;
export const STAGE_LEFT = 260;
export const STAGE_RIGHT = 1660;

export type Dot = {
  x: number;
  kind: "commit" | "merge" | "break";
  /** Shown as a small floating chip above the dot, only for the beat it pops in on. */
  label?: string;
  /** Pops in (spring scale) during this beat, using the beat's own local frame. */
  isNew?: boolean;
  /** Stagger the pop, in frames, when two dots in the same beat pop one after another. */
  popDelay?: number;
  /** Recolors to "broken" with a shake, during this beat. */
  justBroke?: boolean;
};

export type Branch = {
  originX: number;
  /** Where the branch's horizontal rail ends. */
  railToX: number;
  dots: Dot[];
  /** Animate the split-off + rail being drawn, during this beat. */
  drawIn?: boolean;
  /** Animate the connector back into main being drawn, during this beat (mergeTargetX comes from the mainDots "merge" dot). */
  merging?: boolean;
};

export type GBeat = {
  frames: number;
  caption?: string;
  mainDots: Dot[];
  branch?: Branch;
  /** A click lands at this point (e.g. starting a branch, or committing straight to main). */
  click?: { x: number; y: number };
  /** Pop a success burst near the merge dot. */
  celebrate?: boolean;
  /** Right of this x, main renders as a dashed red "broken" line instead of the solid rail. */
  crackFromX?: number;
  /** The whole graph fades in from 0 at the start of this beat (a fresh mini-scene). */
  sceneFadeIn?: boolean;
};

export const SCRIPT: { introText: string; closingText: string; beats: GBeat[] } = {
  introText: "Save snapshots you can always return to",
  closingText: "Branch before you let AI touch anything big",
  beats: [
    {
      frames: 130,
      caption: "This is main: your app's real history",
      mainDots: [
        { x: 340, kind: "commit", label: "Init Pocket CRM" },
        { x: 560, kind: "commit", label: "Add contact list" },
      ],
    },
    {
      frames: 140,
      caption: "A commit saves a snapshot with a message",
      mainDots: [
        { x: 340, kind: "commit" },
        { x: 560, kind: "commit" },
        { x: 780, kind: "commit", label: "Fix contact form", isNew: true },
      ],
    },
    {
      frames: 150,
      caption: "Branch off before a risky AI change",
      click: { x: 780, y: MAIN_Y },
      mainDots: [
        { x: 340, kind: "commit" },
        { x: 560, kind: "commit" },
        { x: 780, kind: "commit" },
      ],
      branch: { originX: 780, railToX: 1160, dots: [], drawIn: true },
    },
    {
      frames: 170,
      caption: "The AI commits its work on the branch",
      mainDots: [
        { x: 340, kind: "commit" },
        { x: 560, kind: "commit" },
        { x: 780, kind: "commit" },
      ],
      branch: {
        originX: 780,
        railToX: 1160,
        dots: [
          { x: 980, kind: "commit", label: "Add search box", isNew: true },
          { x: 1120, kind: "commit", label: "Wire up API", isNew: true, popDelay: 55 },
        ],
      },
    },
    {
      frames: 150,
      caption: "It works. Merge the branch into main",
      celebrate: true,
      mainDots: [
        { x: 340, kind: "commit" },
        { x: 560, kind: "commit" },
        { x: 780, kind: "commit" },
        { x: 1200, kind: "merge", label: "Merge search feature", isNew: true, popDelay: 55 },
      ],
      branch: {
        originX: 780,
        railToX: 1160,
        dots: [
          { x: 980, kind: "commit" },
          { x: 1120, kind: "commit" },
        ],
        merging: true,
      },
    },
    {
      frames: 130,
      caption: "Now picture skipping the branch entirely",
      sceneFadeIn: true,
      mainDots: [
        { x: 400, kind: "commit" },
        { x: 700, kind: "commit" },
      ],
    },
    {
      frames: 140,
      caption: "A big change, committed straight onto main",
      click: { x: 700, y: MAIN_Y },
      mainDots: [
        { x: 400, kind: "commit" },
        { x: 700, kind: "commit" },
        { x: 1000, kind: "commit", label: "Big AI refactor", isNew: true },
      ],
    },
    {
      frames: 140,
      caption: "It breaks main. There is no safe copy",
      crackFromX: 1000,
      mainDots: [
        { x: 400, kind: "commit" },
        { x: 700, kind: "commit" },
        { x: 1000, kind: "break", label: "App is broken", justBroke: true },
      ],
    },
  ],
};
