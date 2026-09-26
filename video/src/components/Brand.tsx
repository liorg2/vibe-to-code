import { interpolate, staticFile, useCurrentFrame } from "remotion";
import { COLORS, FONT } from "./theme";

/** Site brand mark pinned to the top-left of every video: icon + wordmark, fading in over the first 10 frames. */
export function Brand() {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        position: "absolute",
        top: 44,
        left: 56,
        display: "flex",
        alignItems: "center",
        gap: 14,
        opacity,
      }}
    >
      <img src={staticFile("icon.svg")} width={56} height={56} alt="" />
      <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: 34, letterSpacing: "-0.02em", color: COLORS.tx }}>
        Vibe → Code
      </span>
    </div>
  );
}
