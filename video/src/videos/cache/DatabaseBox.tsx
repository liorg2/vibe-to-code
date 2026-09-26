import { Database, Loader2 } from "lucide-react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { focusGlow } from "../../components/glow";
import { BOX_H, BOX_W, COLORS, FONT, SERVER_LEFT, STAGE_Y } from "../../components/theme";

/** Same shell as ServerBox, relabeled for this story, plus a "querying..." tell for the slow beats. */
export function DatabaseBox({ active, slow = false }: { active: boolean; slow?: boolean }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame, fps, config: { damping: 200, mass: 0.6 } });
  const glow = focusGlow(active, COLORS.acc2);
  return (
    <div
      style={{
        position: "absolute",
        left: SERVER_LEFT,
        top: STAGE_Y - BOX_H / 2,
        width: BOX_W,
        height: BOX_H,
        opacity: p,
        transform: `translateY(${(1 - p) * 24}px) scale(${0.94 + p * 0.06})`,
        background: COLORS.card,
        border: `2px solid ${COLORS.line}`,
        borderRadius: 20,
        transition: "border-color .25s, box-shadow .25s",
        ...glow,
      }}
    >
      <div style={{ padding: "18px 24px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Database size={22} color={COLORS.acc2} strokeWidth={2} />
        <div style={{ display: "flex", gap: 6 }}>
          {[0, 1, 2].map((i) => (
            <BlinkDot key={i} frame={frame} offset={i * 14} active={active} />
          ))}
        </div>
      </div>
      <div style={{ padding: "16px 24px 0", display: "flex", flexDirection: "column", gap: 8 }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              height: 22,
              borderRadius: 6,
              background: COLORS.card2,
              border: `1px solid ${COLORS.line}`,
              display: "flex",
              alignItems: "center",
              paddingInlineStart: 10,
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: 99, background: COLORS.acc2 }} />
          </div>
        ))}
      </div>
      {slow ? (
        <div
          style={{
            position: "absolute",
            top: 148,
            left: 24,
            right: 24,
            display: "flex",
            alignItems: "center",
            gap: 8,
            justifyContent: "center",
            fontFamily: FONT,
            fontWeight: 700,
            fontSize: 14,
            color: COLORS.warn,
          }}
        >
          <div style={{ transform: `rotate(${(frame * 8) % 360}deg)`, display: "flex" }}>
            <Loader2 size={16} color={COLORS.warn} strokeWidth={2.4} />
          </div>
          querying…
        </div>
      ) : null}
      <div
        style={{
          position: "absolute",
          bottom: 22,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: 28,
          color: COLORS.tx,
        }}
      >
        Database
      </div>
    </div>
  );
}

function BlinkDot({ frame, offset, active }: { frame: number; offset: number; active: boolean }) {
  const speed = active ? 8 : 20;
  const on = Math.sin((frame + offset) / speed) > 0;
  return (
    <span
      style={{
        width: 7,
        height: 7,
        borderRadius: 99,
        background: on ? COLORS.good : COLORS.line,
        boxShadow: on ? `0 0 6px ${COLORS.good}` : "none",
      }}
    />
  );
}
