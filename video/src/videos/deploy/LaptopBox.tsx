import { GitBranch, UploadCloud } from "lucide-react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { focusGlow } from "../../components/glow";
import { BOX_H, BOX_W, BROWSER_LEFT, COLORS, FONT, MONO, STAGE_Y } from "../../components/theme";

// Copied layout math from BrowserBox.tsx (never edited directly — this file owns its own copy).
const DOTS_H = 40;
const GAP1 = 8;
const BAR_H = 32;
const GAP2 = 14;
const BTN_H = 46;
const BUTTON_TOP_OFFSET = DOTS_H + GAP1 + BAR_H + GAP2; // 94
const BUTTON_CENTER_OFFSET = BUTTON_TOP_OFFSET + BTN_H / 2; // 117

export const LAPTOP_BUTTON_X = BROWSER_LEFT + BOX_W / 2;
export const LAPTOP_BUTTON_Y = STAGE_Y - BOX_H / 2 + BUTTON_CENTER_OFFSET;

/** The developer's laptop: a tiny code editor chrome with a "git push" button. */
export function LaptopBox({ active, buttonScale = 1 }: { active: boolean; buttonScale?: number }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame, fps, config: { damping: 200, mass: 0.6 } });
  const glow = focusGlow(active, COLORS.acc);
  return (
    <div
      style={{
        position: "absolute",
        left: BROWSER_LEFT,
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
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 18px", height: DOTS_H, boxSizing: "border-box" }}>
        <span style={{ width: 11, height: 11, borderRadius: 99, background: COLORS.bad }} />
        <span style={{ width: 11, height: 11, borderRadius: 99, background: COLORS.warn }} />
        <span style={{ width: 11, height: 11, borderRadius: 99, background: COLORS.good }} />
        <GitBranch size={16} color={COLORS.tx3} style={{ marginInlineStart: "auto" }} />
      </div>
      <div
        style={{
          margin: `${GAP1}px 18px 0`,
          height: BAR_H,
          borderRadius: 8,
          background: COLORS.card2,
          border: `1px solid ${COLORS.line}`,
          display: "flex",
          alignItems: "center",
          padding: "0 10px",
          fontFamily: MONO,
          fontSize: 13,
          color: COLORS.tx3,
        }}
      >
        fix: contact search bug
      </div>
      <div
        style={{
          margin: `${GAP2}px 18px 0`,
          height: BTN_H,
          borderRadius: 10,
          background: `linear-gradient(135deg, ${COLORS.acc}, ${COLORS.acc2})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          transform: `scale(${buttonScale})`,
          boxShadow: "0 8px 18px rgba(108,92,231,.35)",
        }}
      >
        <UploadCloud size={18} color="#fff" strokeWidth={2.2} />
        <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 17, color: "#fff" }}>git push</span>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: 26,
          color: COLORS.tx,
        }}
      >
        Your laptop
      </div>
    </div>
  );
}
