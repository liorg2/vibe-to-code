import { CheckCircle2 } from "lucide-react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "./theme";

const PARTICLE_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];
const PARTICLE_COLORS = [COLORS.acc, COLORS.acc2, COLORS.warn, COLORS.good];

/** A confetti-light pop for a happy 200 OK: a checkmark plus a handful of colored dots. */
export function SuccessBurst({ x, y }: { x: number; y: number }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ frame, fps, config: { damping: 11, stiffness: 140, mass: 0.5 } });
  const opacity = interpolate(frame, [0, 8, 34, 48], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const dist = interpolate(frame, [6, 40], [0, 76], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const dotOpacity = interpolate(frame, [6, 14, 32, 40], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: "translate(-50%,-50%)", opacity }}>
      <div style={{ transform: `scale(${scale})` }}>
        <CheckCircle2 size={56} color={COLORS.good} strokeWidth={2.4} />
      </div>
      {PARTICLE_ANGLES.map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const dx = Math.cos(rad) * dist;
        const dy = Math.sin(rad) * dist;
        return (
          <div
            key={deg}
            style={{
              position: "absolute",
              left: 28 + dx,
              top: 28 + dy,
              width: 10,
              height: 10,
              borderRadius: 99,
              background: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
              opacity: dotOpacity,
            }}
          />
        );
      })}
    </div>
  );
}
