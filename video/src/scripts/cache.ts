import type { Tone } from "../videos/cache/Badge";

export type Actor = "user" | "browser" | "cache" | "database";

/**
 * The whole video as data, same shape as scripts/requestResponse.ts: an intro title, a closing
 * title, and a list of beats in between. This story needs a few fields requestResponse.ts's
 * Beat type doesn't (a lane choice between two pairs of boxes, the cache's own hit/miss/TTL
 * state, a badge, an edit event) so it defines its own beat shape instead of reusing that one.
 */
export type CacheBeat = {
  frames: number;
  caption?: string;
  actors?: Actor[];
  /** The user clicks the browser's button this beat. */
  click?: boolean;
  /** A request/response travelling browser<->cache or cache<->database. */
  packet?: {
    lane: "bc" | "cd";
    dir: "forward" | "backward";
    kind: "req" | "ok" | "err";
    method?: string;
    path?: string;
    status?: number;
    statusText?: string;
  };
  /** The cache's state at the END of this beat; ttl animates smoothly from the previous beat's value. */
  cache?: { entry: boolean; ttl: number; stale?: boolean };
  /** A small HIT/MISS/EXPIRED pill over the cache box. */
  badge?: { text: string; tone: Tone };
  /** The database is visibly slow to answer this beat. */
  dbBusy?: boolean;
  /** Show the contacts card at the browser. */
  contacts?: boolean;
  /** Someone edits a record directly in the database. */
  edit?: boolean;
  /** Pop a success burst over this box. */
  celebrate?: "browser" | "cache";
};

export const SCRIPT: { introText: string; closingText: string; beats: CacheBeat[] } = {
  introText: "A cache saves you a repeat trip",
  closingText: "Clear the cache when you edit data",
  beats: [
    { frames: 90, caption: "Browser, cache, and a slow database", actors: [] },
    { frames: 70, caption: "First request: nothing saved yet", actors: ["user", "browser"], click: true, cache: { entry: false, ttl: 0 } },
    {
      frames: 90,
      caption: "Cache miss: it asks the database",
      actors: ["browser", "cache"],
      packet: { lane: "bc", dir: "forward", kind: "req", method: "GET", path: "/contacts" },
      badge: { text: "MISS", tone: "miss" },
      cache: { entry: false, ttl: 0 },
    },
    {
      frames: 110,
      caption: "The database is slow to answer",
      actors: ["cache", "database"],
      packet: { lane: "cd", dir: "forward", kind: "req", method: "GET", path: "/contacts" },
      dbBusy: true,
      cache: { entry: false, ttl: 0 },
    },
    {
      frames: 90,
      caption: "Data arrives; the cache saves it",
      actors: ["database", "cache"],
      packet: { lane: "cd", dir: "backward", kind: "ok", status: 200, statusText: "OK" },
      cache: { entry: true, ttl: 1 },
    },
    {
      frames: 80,
      caption: "Cache replies; first request done",
      actors: ["cache", "browser"],
      packet: { lane: "bc", dir: "backward", kind: "ok", status: 200, statusText: "OK" },
      cache: { entry: true, ttl: 1 },
      celebrate: "browser",
    },
    { frames: 80, caption: "Slow the first time, that's all", actors: ["browser"], contacts: true, cache: { entry: true, ttl: 0.95 } },

    { frames: 70, caption: "Ask again for the same contacts", actors: ["user", "browser"], click: true, cache: { entry: true, ttl: 0.85 } },
    {
      frames: 70,
      caption: "Cache hit: the answer is ready",
      actors: ["browser", "cache"],
      packet: { lane: "bc", dir: "forward", kind: "req", method: "GET", path: "/contacts" },
      badge: { text: "HIT", tone: "hit" },
      cache: { entry: true, ttl: 0.8 },
      celebrate: "cache",
    },
    {
      frames: 60,
      caption: "Fast reply, no database needed",
      actors: ["cache", "browser"],
      packet: { lane: "bc", dir: "backward", kind: "ok", status: 200, statusText: "OK" },
      cache: { entry: true, ttl: 0.75 },
    },

    { frames: 90, caption: "The cache trusts its copy for a while", actors: ["cache"], cache: { entry: true, ttl: 0.3 } },

    { frames: 90, caption: "Someone edits Grace Hopper's name", actors: ["database"], edit: true, cache: { entry: true, ttl: 0.25, stale: true } },

    {
      frames: 90,
      caption: "Cache hit again, still the old name",
      actors: ["user", "browser", "cache"],
      click: true,
      packet: { lane: "bc", dir: "forward", kind: "req", method: "GET", path: "/contacts" },
      badge: { text: "HIT", tone: "warn" },
      cache: { entry: true, ttl: 0.2, stale: true },
    },
    {
      frames: 70,
      caption: "Stale reply, wrong until TTL expires",
      actors: ["cache", "browser"],
      packet: { lane: "bc", dir: "backward", kind: "ok", status: 200, statusText: "OK" },
      cache: { entry: true, ttl: 0.15, stale: true },
    },

    {
      frames: 70,
      caption: "TTL runs out: the entry expires",
      actors: ["cache"],
      badge: { text: "EXPIRED", tone: "bad" },
      cache: { entry: false, ttl: 0 },
    },

    {
      frames: 80,
      caption: "Next request misses; asks the database",
      actors: ["cache", "database"],
      packet: { lane: "cd", dir: "forward", kind: "req", method: "GET", path: "/contacts" },
      dbBusy: true,
      cache: { entry: false, ttl: 0 },
    },
    {
      frames: 90,
      caption: "This time: the updated name",
      actors: ["database", "cache"],
      packet: { lane: "cd", dir: "backward", kind: "ok", status: 200, statusText: "OK" },
      cache: { entry: true, ttl: 1 },
      celebrate: "cache",
    },
    {
      frames: 70,
      caption: "Fresh data, fresh TTL",
      actors: ["cache", "browser"],
      packet: { lane: "bc", dir: "backward", kind: "ok", status: 200, statusText: "OK" },
      cache: { entry: true, ttl: 1 },
    },

    { frames: 50, actors: [] },
  ],
};
