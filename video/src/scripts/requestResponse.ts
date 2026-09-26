import type { Beat } from "../components/timeline";

/**
 * The whole video as data: an intro title, a closing title, and a list of beats in between.
 * A future lesson video is mostly a new file like this one, reusing the same building blocks
 * in video/src/components/ and the same beat -> visuals wiring in RequestResponse.tsx.
 */
export const SCRIPT: { introText: string; closingText: string; beats: Beat[] } = {
  introText: "Every click sends a request",
  closingText: "Open DevTools → Network to watch this happen",
  beats: [
    { frames: 110, caption: "Meet the browser and the server", actors: [] },
    { frames: 90, caption: "You click, the request begins", actors: ["user", "browser"], click: true },
    {
      frames: 140,
      caption: "Browser asks for your contacts",
      actors: ["browser", "server"],
      packet: { dir: "toServer", kind: "req", method: "GET", path: "/api/contacts" },
    },
    {
      frames: 140,
      caption: "Server replies 200 OK",
      actors: ["server", "browser"],
      packet: { dir: "toBrowser", kind: "ok", status: 200, statusText: "OK" },
      celebrate: true,
    },
    { frames: 160, caption: "The body carries the data", actors: ["browser"], contacts: true },
    { frames: 120, caption: "One click, one round trip", actors: ["user", "browser", "server"], pulses: 3 },
    {
      frames: 90,
      actors: ["browser", "server"],
      packet: { dir: "toServer", kind: "req", method: "GET", path: "/api/ghost" },
    },
    {
      frames: 100,
      caption: "Wrong address? 404 Not Found",
      actors: ["server", "browser"],
      packet: { dir: "toBrowser", kind: "err", status: 404, statusText: "Not Found" },
    },
    {
      frames: 90,
      actors: ["browser", "server"],
      packet: { dir: "toServer", kind: "req", method: "POST", path: "/api/orders" },
    },
    {
      frames: 100,
      caption: "Something broke: 500 Internal Server Error",
      actors: ["server", "browser"],
      packet: { dir: "toBrowser", kind: "err", status: 500, statusText: "Internal Server Error" },
    },
    { frames: 100, actors: [] },
  ],
};
