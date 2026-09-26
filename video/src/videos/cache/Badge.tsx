import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT } from "../../components/theme";

export type Tone = "hit" | "miss" | "warn" | "bad";

const TONE_COLOR: Record<Tone, string> = {
  hit: COLORS.good,
  miss: COLORS.warn,
  warn: COLORS.warn,
  bad: COLORS.bad,
};

/** A small pill that pops in over a box (HIT / MISS / EXPIRED) and fades before the beat ends. */
export function Badge({ text, tone, x, y, duration }: { text: string; tone: Tone; x: number; y: number; duration: number }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ frame, fps, config: { damping: 11, stiffness: 160, mass: 0.5 } });
  const opacity = interpolate(frame, [0, 8, duration - 14, duration], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const color = TONE_COLOR[tone];
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%,-100%) scale(${scale})`, opacity }}>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 20,
          letterSpacing: "0.02em",
          color: "#0a0b0f",
          background: color,
          padding: "8px 20px",
          borderRadius: 999,
          boxShadow: `0 10px 24px ${color}40`,
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </div>
    </div>
  );
}
