/**
 * Scene timing helper: turns a flat list of beats (each just "how many frames") into
 * absolute `from`/`duration` pairs a <Sequence> can use, so a script only ever states
 * durations and never has to hand-add up offsets.
 */
export type Actor = "user" | "browser" | "server";

export type PacketSpec = {
  dir: "toServer" | "toBrowser";
  kind: "req" | "ok" | "err";
  method?: string;
  path?: string;
  status?: number;
  statusText?: string;
};

export type Beat = {
  /** How long this beat plays, in frames. */
  frames: number;
  /** Caption shown at the bottom for this beat, if any. */
  caption?: string;
  /** Which actors are "lit up" (glowing) during this beat. */
  actors?: Actor[];
  /** The user clicks the button inside the browser this beat (cursor + ripple). */
  click?: boolean;
  /** A request or response travelling along an arrow this beat. */
  packet?: PacketSpec;
  /** Show the "here's the data" contacts + JSON card. */
  contacts?: boolean;
  /** A handful of quick decorative round-trip pulses along both lanes. */
  pulses?: number;
  /** Pop a success burst (checkmark + confetti-light) over the browser. */
  celebrate?: boolean;
};

export type Positioned<T> = { beat: T; from: number; duration: number };

export function layoutBeats<T extends { frames: number }>(beats: T[], startFrame = 0): Positioned<T>[] {
  let cursor = startFrame;
  return beats.map((beat) => {
    const from = cursor;
    cursor += beat.frames;
    return { beat, from, duration: beat.frames };
  });
}

export function totalFrames(beats: { frames: number }[]): number {
  return beats.reduce((n, b) => n + b.frames, 0);
}
