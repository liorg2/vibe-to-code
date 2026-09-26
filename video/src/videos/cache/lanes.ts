import type { Point } from "../../components/Arrow";
import { BOX_W, BROWSER_LEFT, SERVER_LEFT, STAGE_Y } from "../../components/theme";
import { CACHE_LEFT, CACHE_W } from "./CacheBox";

/**
 * Three boxes instead of two means two short lanes (browser<->cache, cache<->database)
 * instead of Arrow.tsx's one long one. Same bezier-arc shape as that file, just scaled to
 * whichever pair of boxes is talking this beat.
 */
const ARC = 60;
const MARGIN = 22;

function laneAcross(leftEdge: number, rightEdge: number): { fwd: [Point, Point, Point]; bwd: [Point, Point, Point] } {
  const l = leftEdge + MARGIN;
  const r = rightEdge - MARGIN;
  const mid = (l + r) / 2;
  return {
    fwd: [
      { x: l, y: STAGE_Y },
      { x: mid, y: STAGE_Y - ARC },
      { x: r, y: STAGE_Y },
    ],
    bwd: [
      { x: r, y: STAGE_Y },
      { x: mid, y: STAGE_Y + ARC },
      { x: l, y: STAGE_Y },
    ],
  };
}

const BROWSER_RIGHT = BROWSER_LEFT + BOX_W;
const CACHE_RIGHT = CACHE_LEFT + CACHE_W;

/** Browser <-> Cache. */
export const BC = laneAcross(BROWSER_RIGHT, CACHE_LEFT);
/** Cache <-> Database. */
export const CD = laneAcross(CACHE_RIGHT, SERVER_LEFT);
