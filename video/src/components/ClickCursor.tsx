import { MousePointer2 } from "lucide-react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "./theme";

/** A cursor arriving at (x, y), pressing, and leaving a ripple ring. Drives the "click" beat. */
export function ClickCursor({ x, y }: { x: number; y: number }) {
  const frame = useCurrentFrame();
  const arrive = interpolate(frame, [0, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const startDx = 50;
  const startDy = -50;
  const px = x + startDx * (1 - arrive);
  const py = y + startDy * (1 - arrive);
  const press = interpolate(frame, [22, 28, 34], [1, 0.82, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const opacity = interpolate(frame, [0, 10, 55, 65], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rippleP = interpolate(frame, [24, 55], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const rippleOpacity = interpolate(frame, [24, 28, 55], [0, 0.55, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rippleSize = 40 + rippleP * 110;
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: rippleSize,
          height: rippleSize,
          marginLeft: -rippleSize / 2,
          marginTop: -rippleSize / 2,
          borderRadius: 99,
          border: `3px solid ${COLORS.acc2}`,
          opacity: rippleOpacity,
        }}
      />
      <div style={{ position: "absolute", left: px, top: py, transform: `translate(-15%,-8%) scale(${press})`, opacity }}>
        <MousePointer2 size={38} color={COLORS.tx} fill={COLORS.tx} strokeWidth={1.4} />
      </div>
    </>
  );
}
