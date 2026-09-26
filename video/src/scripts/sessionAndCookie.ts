import type { Actor, PacketSpec } from "../components/timeline";
import type { CookiePacketSpec } from "../videos/session-and-cookie/CookiePacket";

/**
 * This video's own beat shape: reuses Actor/PacketSpec from components/timeline.ts (and its
 * generic layoutBeats/totalFrames helpers) but adds the cookie-specific fields request-response's
 * Beat never needed, instead of stretching that shared type to cover both stories.
 */
export type Beat = {
  frames: number;
  caption?: string;
  actors?: Actor[];
  click?: boolean;
  packet?: PacketSpec;
  cookiePacket?: CookiePacketSpec;
  contacts?: boolean;
  celebrate?: boolean;
  /** Show the cookie the browser is holding, and whether it has HttpOnly + Secure. */
  cookie?: { secure: boolean };
  /** Show a page script reaching for that cookie. */
  xss?: boolean;
};

export const SCRIPT: { introText: string; closingText: string; beats: Beat[] } = {
  introText: "How the web remembers you're signed in",
  closingText: "Open DevTools → Application → Cookies, check the flags",
  beats: [
    { frames: 100, caption: "Meet the browser and the server", actors: [] },
    { frames: 90, caption: "You sign in with a password", actors: ["user", "browser"], click: true },
    {
      frames: 130,
      caption: "Browser sends your login",
      actors: ["browser", "server"],
      packet: { dir: "toServer", kind: "req", method: "POST", path: "/login" },
    },
    {
      frames: 150,
      caption: "Server creates a session, sends a cookie",
      actors: ["server", "browser"],
      cookiePacket: { dir: "toBrowser", label: "Set-Cookie", value: "session=8f3a2c91" },
      celebrate: true,
    },
    { frames: 120, caption: "Browser stores the cookie", actors: ["browser"], cookie: { secure: false } },
    {
      frames: 130,
      caption: "Every next request carries the cookie",
      actors: ["browser", "server"],
      cookiePacket: { dir: "toServer", label: "Cookie", value: "session=8f3a2c91" },
    },
    {
      frames: 140,
      caption: "Server recognizes you",
      actors: ["server", "browser"],
      packet: { dir: "toBrowser", kind: "ok", status: 200, statusText: "OK" },
      celebrate: true,
    },
    { frames: 150, caption: "And sends your saved contacts", actors: ["browser"], contacts: true },
    {
      frames: 150,
      caption: "No HttpOnly? A script can steal it",
      actors: ["browser"],
      cookie: { secure: false },
      xss: true,
    },
    { frames: 130, caption: "Add HttpOnly, Secure and SameSite", actors: ["browser"], cookie: { secure: true } },
    { frames: 100, actors: [] },
  ],
};
