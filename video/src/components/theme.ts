import { loadFont } from "@remotion/google-fonts/Inter";

// Copied from app/globals.css (--acc, --acc2, --card, --tx, ...) — Remotion renders standalone,
// it can't read the site's CSS variables at build time.
export const COLORS = {
  bg: "#0a0b0f",
  card: "#151822",
  card2: "#1b1f2c",
  code: "#0e1017",
  line: "#262b3a",
  tx: "#e8eaf0",
  tx2: "#9aa1b4",
  tx3: "#6b7286",
  acc: "#6c5ce7",
  acc2: "#00d2b8",
  warn: "#ffb020",
  bad: "#ff5c72",
  good: "#22c98a",
};

const { fontFamily } = loadFont("normal", { weights: ["400", "600", "800"] });
export const FONT = fontFamily;
export const MONO = "ui-monospace, Menlo, Consolas, monospace";

// Shared stage geometry — every actor and arrow is placed relative to these.
export const STAGE_Y = 520;
export const BOX_W = 340;
export const BOX_H = 210;
export const BROWSER_LEFT = 170;
export const SERVER_LEFT = 1410;
export const BROWSER_CENTER_X = BROWSER_LEFT + BOX_W / 2;
export const SERVER_CENTER_X = SERVER_LEFT + BOX_W / 2;
export const ROAD_LEFT = BROWSER_LEFT + BOX_W; // 510
export const ROAD_RIGHT = SERVER_LEFT; // 1410
