import { interpolate, useCurrentFrame, Easing } from "remotion";
import { COLORS, FONT } from "./theme";

const ease = Easing.inOut(Easing.cubic);

/** Fades in over the first 15f, holds, fades out over the last 15f of its own local timeline. */
export function Caption({ text, duration }: { text: string; duration: number }) {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 15, duration - 15, duration], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(frame, [0, 15], [16, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 96,
        display: "flex",
        justifyContent: "center",
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: 46,
          color: COLORS.tx,
          background: "color-mix(in srgb, #0a0b0f 72%, transparent)",
          padding: "16px 36px",
          borderRadius: 999,
          border: `1px solid ${COLORS.line}`,
          textAlign: "center",
          maxWidth: 1500,
        }}
      >
        {text}
      </div>
    </div>
  );
}

/** Big centered title card for the opening/closing beats. */
export function TitleCard({ text, duration, sub }: { text: string; duration: number; sub?: React.ReactNode }) {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20, duration - 20, duration], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [0, 20], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
        opacity,
      }}
    >
      {sub}
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 68,
          letterSpacing: "-0.02em",
          color: COLORS.tx,
          textAlign: "center",
          maxWidth: 1400,
          transform: `scale(${scale})`,
        }}
      >
        {text}
      </div>
    </div>
  );
}
