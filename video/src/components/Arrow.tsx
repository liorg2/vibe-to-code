import { Easing, interpolate } from "remotion";
import { ROAD_LEFT, ROAD_RIGHT, STAGE_Y } from "./theme";

const ease = Easing.inOut(Easing.cubic);

/** Shared by Arrow's reveal and Packet's position, so a packet always rides its own arrow tip. */
export function travelProgress(frame: number, duration: number): number {
  const travelEnd = duration - 10;
  return interpolate(frame, [0, travelEnd], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
}

export type Point = { x: number; y: number };

export function bezierPoint(p0: Point, p1: Point, p2: Point, t: number): Point {
  const mt = 1 - t;
  return {
    x: mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x,
    y: mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y,
  };
}

export function bezierTangentAngle(p0: Point, p1: Point, p2: Point, t: number): number {
  const dx = 2 * (1 - t) * (p1.x - p0.x) + 2 * t * (p2.x - p1.x);
  const dy = 2 * (1 - t) * (p1.y - p0.y) + 2 * t * (p2.y - p1.y);
  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

function path(p0: Point, p1: Point, p2: Point): string {
  return `M ${p0.x} ${p0.y} Q ${p1.x} ${p1.y} ${p2.x} ${p2.y}`;
}

const ARC = 100;
// Keeps packets and arrowheads from ending up on top of a box's own buttons/text.
const LANE_MARGIN = 46;
const LANE_LEFT = ROAD_LEFT + LANE_MARGIN;
const LANE_RIGHT = ROAD_RIGHT - LANE_MARGIN;

/** Requests travel the upper arc, browser -> server. */
export const UP_LANE: [Point, Point, Point] = [
  { x: LANE_LEFT, y: STAGE_Y },
  { x: (LANE_LEFT + LANE_RIGHT) / 2, y: STAGE_Y - ARC },
  { x: LANE_RIGHT, y: STAGE_Y },
];
/** Responses (ok or error) travel the lower arc, server -> browser. */
export const DOWN_LANE: [Point, Point, Point] = [
  { x: LANE_RIGHT, y: STAGE_Y },
  { x: (LANE_LEFT + LANE_RIGHT) / 2, y: STAGE_Y + ARC },
  { x: LANE_LEFT, y: STAGE_Y },
];

export function laneFor(dir: "toServer" | "toBrowser"): [Point, Point, Point] {
  return dir === "toServer" ? UP_LANE : DOWN_LANE;
}

/** The faint permanent road for a lane — always visible so the layout reads before anything travels. */
export function LaneBackdrop({ lane, color }: { lane: [Point, Point, Point]; color: string }) {
  const [p0, p1, p2] = lane;
  return (
    <svg style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none" }} width={1920} height={1080}>
      <path d={path(p0, p1, p2)} fill="none" stroke={color} strokeOpacity={0.22} strokeWidth={3} strokeDasharray="2 12" strokeLinecap="round" />
    </svg>
  );
}

/**
 * The bright, animated stroke for a packet in flight, `progress` (0..1) of the way along its lane.
 * Uses the SVG `pathLength` trick so the reveal fraction matches `progress` exactly regardless of
 * the curve's real length — no arc-length math needed.
 */
export function Arrow({ lane, color, progress }: { lane: [Point, Point, Point]; color: string; progress: number }) {
  if (progress <= 0) return null;
  const [p0, p1, p2] = lane;
  const t = Math.min(progress, 1);
  const angle = bezierTangentAngle(p0, p1, p2, Math.max(0, t - 0.04));
  const tip = bezierPoint(p0, p1, p2, Math.max(0, t - 0.04));
  return (
    <>
      <svg style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none" }} width={1920} height={1080}>
        <path
          d={path(p0, p1, p2)}
          fill="none"
          stroke={color}
          strokeWidth={4}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - t}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          left: tip.x,
          top: tip.y,
          transform: `translate(-50%,-50%) rotate(${angle}deg)`,
        }}
      >
        <svg width={20} height={20} viewBox="0 0 20 20" style={{ overflow: "visible" }}>
          <polygon points="0,0 20,10 0,20" fill={color} />
        </svg>
      </div>
    </>
  );
}
