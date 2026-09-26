import { interpolate, useCurrentFrame } from "remotion";
import { bezierPoint, travelProgress, type Point } from "./Arrow";
import { COLORS, FONT, MONO } from "./theme";
import { StatusChip } from "./StatusChip";
import type { PacketSpec } from "./timeline";

/**
 * A compact pill that rides along `lane` (see Arrow.tsx) for the beat's duration, sized to its
 * own content — no fixed box, so a short "GET /x" and a longer status line both hug their text.
 */
export function Packet({ lane, spec, duration }: { lane: [Point, Point, Point]; spec: PacketSpec; duration: number }) {
  const frame = useCurrentFrame();
  const travelEnd = duration - 10;
  const raw = travelProgress(frame, duration);
  const pt = bezierPoint(lane[0], lane[1], lane[2], raw);
  const fadeIn = interpolate(frame, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [travelEnd, duration], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const arrive = interpolate(frame, [travelEnd - 10, travelEnd, travelEnd + 8], [1, 1.16, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = Math.min(fadeIn, fadeOut);
  const color = spec.kind === "req" ? COLORS.acc : spec.kind === "ok" ? COLORS.good : COLORS.bad;

  return (
    <div
      style={{
        position: "absolute",
        left: pt.x,
        top: pt.y,
        transform: `translate(-50%,-50%) scale(${arrive})`,
        opacity,
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        width: "max-content",
        maxWidth: 440,
        background: COLORS.card,
        border: `2px solid ${color}`,
        borderRadius: 999,
        boxShadow: `0 10px 26px ${color}30`,
        padding: "10px 18px",
        whiteSpace: "nowrap",
      }}
    >
      {spec.kind === "req" ? (
        <>
          <span
            style={{
              fontFamily: FONT,
              fontWeight: 800,
              fontSize: 17,
              color,
              padding: "2px 9px",
              borderRadius: 999,
              background: `${color}22`,
            }}
          >
            {spec.method}
          </span>
          <span style={{ fontFamily: MONO, fontSize: 21, color: COLORS.tx, direction: "ltr" }}>{spec.path}</span>
        </>
      ) : (
        <>
          <StatusChip status={spec.status ?? 200} />
          <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 19, color: COLORS.tx }}>{spec.statusText}</span>
        </>
      )}
    </div>
  );
}
