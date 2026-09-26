import { Edit3 } from "lucide-react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT } from "../../components/theme";

/** The "goes wrong" trigger: someone edits the record the cache already served. */
export function EditReveal({ x, y, duration }: { x: number; y: number; duration: number }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame, fps, config: { damping: 200, mass: 0.6 } });
  const opacity = interpolate(frame, [0, 10, duration - 15, duration], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%,-100%) translateY(${(1 - p) * 10}px)`,
        opacity,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: COLORS.card,
          border: `1px solid ${COLORS.warn}`,
          borderRadius: 12,
          padding: "10px 16px",
          boxShadow: "0 14px 30px rgba(0,0,0,.4)",
          whiteSpace: "nowrap",
        }}
      >
        <Edit3 size={16} color={COLORS.warn} strokeWidth={2.2} />
        <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 15, color: COLORS.tx }}>
          Grace Hopper → Dr. Grace Hopper
        </span>
      </div>
    </div>
  );
}
