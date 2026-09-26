import type { Actor, PacketSpec } from "../components/timeline";

/**
 * Background job & queue: a slow "import 5,000 contacts" click that answers instantly
 * because the real work happens on a queue + worker, contrasted with doing it inline
 * (which blocks the request until it times out).
 */
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
  /** Pop a success burst (checkmark + confetti-light) once the job is done. */
  celebrate?: boolean;
  /** Which stage the queue/worker pipeline is showing this beat. */
  phase?: "drop" | "pickup" | "progress" | "done";
  /** The "goes wrong" beats: no queue, the server just works inline while the browser waits. */
  inline?: boolean;
};

export const SCRIPT: { introText: string; closingText: string; beats: Beat[] } = {
  introText: "Big jobs need a queue, not a wait",
  closingText: "Slow task? Reply fast, queue the rest",
  beats: [
    { frames: 110, caption: "Meet the browser and the server", actors: [] },
    { frames: 90, caption: "You click: import 5,000 contacts", actors: ["user", "browser"], click: true },
    {
      frames: 130,
      caption: "Browser asks the server to import",
      actors: ["browser", "server"],
      packet: { dir: "toServer", kind: "req", method: "POST", path: "/api/import" },
    },
    {
      frames: 130,
      caption: "Server replies instantly: import started",
      actors: ["server", "browser"],
      packet: { dir: "toBrowser", kind: "ok", status: 202, statusText: "Started" },
    },
    { frames: 150, caption: "The job drops into a queue", actors: ["server"], phase: "drop" },
    { frames: 150, caption: "A worker picks up the job", actors: ["server"], phase: "pickup" },
    { frames: 170, caption: "It works through all 5,000 contacts", actors: ["server"], phase: "progress" },
    { frames: 120, caption: "Done, and the page stayed responsive", actors: ["server"], phase: "done", celebrate: true },
    { frames: 110, caption: "Skip the queue? It runs inline", actors: ["browser", "server"], inline: true },
    { frames: 110, caption: "The page just waits, and waits", actors: ["browser", "server"], inline: true },
    {
      frames: 110,
      caption: "Eventually: 504 Gateway Timeout",
      actors: ["server", "browser"],
      packet: { dir: "toBrowser", kind: "err", status: 504, statusText: "Gateway Timeout" },
    },
    { frames: 100, actors: [] },
  ],
};
