import { Cookie } from "lucide-react";
import { interpolate, useCurrentFrame } from "remotion";
import { bezierPoint, travelProgress, type Point } from "../../components/Arrow";
import { COLORS, FONT, MONO } from "../../components/theme";

export type CookiePacketSpec = {
  dir: "toServer" | "toBrowser";
  /** e.g. "Set-Cookie" or "Cookie" */
  label: string;
  /** e.g. "session=8f3a2c91" */
  value: string;
};

/**
 * Like components/Packet.tsx, but for a beat where the interesting payload is the cookie
 * itself rather than a method/path or a status code. Rides the same lane math (bezierPoint,
 * travelProgress) so it lands on the boxes exactly like every other packet in this style.
 */
export function CookiePacket({ lane, spec, duration }: { lane: [Point, Point, Point]; spec: CookiePacketSpec; duration: number }) {
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
  const color = COLORS.warn;

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
        maxWidth: 460,
        background: COLORS.card,
        border: `2px solid ${color}`,
        borderRadius: 999,
        boxShadow: `0 10px 26px ${color}30`,
        padding: "10px 18px",
        whiteSpace: "nowrap",
      }}
    >
      <Cookie size={20} color={color} strokeWidth={2.2} />
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
        {spec.label}
      </span>
      <span style={{ fontFamily: MONO, fontSize: 21, color: COLORS.tx, direction: "ltr" }}>{spec.value}</span>
    </div>
  );
}
