import { Rocket } from "lucide-react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BOX_H, COLORS, FONT, STAGE_Y } from "../../components/theme";

const AVATAR_COLORS = [COLORS.acc, COLORS.acc2, COLORS.warn, COLORS.good];

/** The "it's live" beat: a rocket, a friendly line, and a handful of users who now have it. */
export function UsersLive() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame, fps, config: { damping: 200, mass: 0.6 } });
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: STAGE_Y + BOX_H / 2 + 30,
        transform: `translate(-50%, ${(1 - p) * 18}px)`,
        opacity: p,
        display: "flex",
        alignItems: "center",
        gap: 18,
        background: COLORS.card,
        border: `1px solid ${COLORS.line}`,
        borderRadius: 999,
        padding: "16px 30px",
        boxShadow: "0 16px 34px rgba(0,0,0,.35)",
      }}
    >
      <Rocket size={26} color={COLORS.good} strokeWidth={2.2} />
      <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: 22, color: COLORS.tx }}>Live for every user</span>
      <div style={{ display: "flex" }}>
        {AVATAR_COLORS.map((c, i) => {
          const rp = interpolate(frame, [12 + i * 6, 20 + i * 6], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={i}
              style={{
                width: 34,
                height: 34,
                borderRadius: 99,
                background: c,
                marginLeft: i === 0 ? 0 : -10,
                border: `2px solid ${COLORS.card}`,
                opacity: rp,
                transform: `scale(${rp})`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
