import type { L10n } from "@/lib/types";

/** One box on the stage: a browser, a server, a database, a queue… */
export type Actor = { id: string; icon: string; label: L10n };

/**
 * One beat of the story. `from === to` is work done in place (hashing, a lookup, a crash);
 * otherwise a packet travels between the two actors and lands in the request log.
 */
export type Beat = {
  from: string;
  to: string;
  /** what the packet says, as it would in a real console: "POST /login", "SELECT …", "job #18" */
  label: string;
  /** HTTP-ish status; colours the packet and the log row (2xx ok, 3xx info, 4xx/5xx err, 429 warn) */
  status?: number;
  /** overrides the colour a status would pick */
  tone?: "ok" | "err" | "warn" | "info";
  /** a few lines shown inside the packet: a body, a header, a row. Always rendered left-to-right. */
  body?: string[];
  /** caption for this beat — the sentence the learner reads while the packet moves */
  say: L10n;
};

export type Scene = {
  /** one line above the stage: what this story shows */
  cap: L10n;
  /** two to four actors, left to right (mirrored in Hebrew) */
  actors: Actor[];
  beats: Beat[];
};
