import { Easing, interpolate, useCurrentFrame } from "remotion";
import { bezierPoint, type Point } from "./Arrow";
import { COLORS } from "./theme";

const ease = Easing.inOut(Easing.cubic);

/** A quick unlabeled dot riding a lane — used to show several round trips happening back to back. */
export function MiniPulse({ lane, duration }: { lane: [Point, Point, Point]; duration: number }) {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [0, duration], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const pt = bezierPoint(lane[0], lane[1], lane[2], t);
  const opacity = interpolate(frame, [0, duration * 0.15, duration * 0.85, duration], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        left: pt.x,
        top: pt.y,
        transform: "translate(-50%,-50%)",
        width: 16,
        height: 16,
        borderRadius: 99,
        background: COLORS.acc2,
        opacity,
        boxShadow: `0 0 16px ${COLORS.acc2}`,
      }}
    />
  );
}
