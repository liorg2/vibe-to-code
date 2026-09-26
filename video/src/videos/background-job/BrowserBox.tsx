import { Globe, Loader2, Send } from "lucide-react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { focusGlow } from "../../components/glow";
import { BOX_H, BOX_W, BROWSER_LEFT, COLORS, FONT, MONO, STAGE_Y } from "../../components/theme";

// Copy of ../../components/BrowserBox.tsx, customized for the "import 5,000 contacts" story
// (own button label/URL, plus a `busy` spinner state for the "goes wrong" inline beats) —
// per the brief, shared components aren't edited, so this topic gets its own copy.
const DOTS_H = 40;
const GAP1 = 8;
const BAR_H = 32;
const GAP2 = 14;
const BTN_H = 46;
const BUTTON_TOP_OFFSET = DOTS_H + GAP1 + BAR_H + GAP2; // 94
const BUTTON_CENTER_OFFSET = BUTTON_TOP_OFFSET + BTN_H / 2; // 117

export const BUTTON_X = BROWSER_LEFT + BOX_W / 2;
export const BUTTON_Y = STAGE_Y - BOX_H / 2 + BUTTON_CENTER_OFFSET;

export function BrowserBox({ active, buttonScale = 1, busy = false }: { active: boolean; buttonScale?: number; busy?: boolean }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame, fps, config: { damping: 200, mass: 0.6 } });
  const glow = focusGlow(active, COLORS.acc);
  const spin = (frame * 10) % 360;
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
        <Globe size={16} color={COLORS.tx3} style={{ marginInlineStart: "auto" }} />
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
        vibetodev.com/contacts/import
      </div>
      <div
        style={{
          margin: `${GAP2}px 18px 0`,
          height: BTN_H,
          borderRadius: 10,
          background: busy ? `linear-gradient(135deg, ${COLORS.warn}, ${COLORS.bad})` : `linear-gradient(135deg, ${COLORS.acc}, ${COLORS.acc2})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          transform: `scale(${buttonScale})`,
          boxShadow: busy ? "0 8px 18px rgba(255,92,114,.3)" : "0 8px 18px rgba(108,92,231,.35)",
        }}
      >
        {busy ? (
          <div style={{ transform: `rotate(${spin}deg)`, display: "flex" }}>
            <Loader2 size={18} color="#fff" strokeWidth={2.4} />
          </div>
        ) : (
          <Send size={18} color="#fff" strokeWidth={2.2} />
        )}
        <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 16, color: "#fff" }}>
          {busy ? "Importing..." : "Import 5,000 contacts"}
        </span>
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
        Browser
      </div>
    </div>
  );
}
