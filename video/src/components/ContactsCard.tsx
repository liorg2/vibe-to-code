import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BOX_H, COLORS, FONT, MONO, STAGE_Y } from "./theme";

const ROWS = [
  { initials: "AL", name: "Ada Lovelace", color: COLORS.acc },
  { initials: "AT", name: "Alan Turing", color: COLORS.acc2 },
  { initials: "GH", name: "Grace Hopper", color: COLORS.warn },
];

const JSON_LINES = ['[', '  { "name": "Ada Lovelace" },', '  { "name": "Alan Turing" },', '  { "name": "Grace Hopper" }', "]"];

/** The "here's the data" beat: friendly contact rows on the left, the raw JSON alongside on the right. */
export function ContactsCard() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame, fps, config: { damping: 200, mass: 0.6 } });
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: STAGE_Y + BOX_H / 2 + 26,
        transform: `translate(-50%, ${(1 - p) * 18}px)`,
        opacity: p,
        display: "flex",
        gap: 28,
      }}
    >
      <div
        style={{
          background: COLORS.card,
          border: `1px solid ${COLORS.line}`,
          borderRadius: 14,
          padding: "16px 20px",
          width: 360,
          boxShadow: "0 16px 34px rgba(0,0,0,.35)",
        }}
      >
        {ROWS.map((r, i) => {
          const rowP = interpolate(frame, [10 + i * 8, 20 + i * 8], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={r.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                opacity: rowP,
                marginBottom: i < ROWS.length - 1 ? 12 : 0,
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 99,
                  background: r.color,
                  display: "grid",
                  placeItems: "center",
                  fontWeight: 800,
                  fontSize: 14,
                  color: "#0a0b0f",
                  fontFamily: FONT,
                  flex: "none",
                }}
              >
                {r.initials}
              </div>
              <div style={{ fontFamily: FONT, fontWeight: 600, fontSize: 20, color: COLORS.tx }}>{r.name}</div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          background: COLORS.code,
          border: `1px solid ${COLORS.line}`,
          borderRadius: 14,
          padding: "16px 20px",
          width: 360,
          boxShadow: "0 16px 34px rgba(0,0,0,.35)",
        }}
      >
        {JSON_LINES.map((line, i) => {
          const lineP = interpolate(frame, [8 + i * 5, 16 + i * 5], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={i}
              style={{
                opacity: lineP,
                fontFamily: MONO,
                fontSize: 17,
                lineHeight: 1.5,
                color: i === 0 || i === JSON_LINES.length - 1 ? COLORS.tx2 : COLORS.tx,
                direction: "ltr",
                textAlign: "left",
              }}
            >
              {line}
            </div>
          );
        })}
      </div>
    </div>
  );
}
