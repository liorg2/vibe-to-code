import { Cookie, ShieldAlert, ShieldCheck } from "lucide-react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BOX_H, BROWSER_LEFT, BOX_W, COLORS, FONT, MONO, STAGE_Y } from "../../components/theme";

const CENTER_X = BROWSER_LEFT + BOX_W / 2;
const TOP_Y = STAGE_Y + BOX_H / 2 + 34;

/** The cookie the browser is holding onto, parked just under its own box (never over the road). */
export function CookieResident({ secure }: { secure: boolean }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame, fps, config: { damping: 200, mass: 0.6 } });
  const color = secure ? COLORS.good : COLORS.bad;
  const Icon = secure ? ShieldCheck : ShieldAlert;

  return (
    <div
      style={{
        position: "absolute",
        left: CENTER_X,
        top: TOP_Y,
        transform: `translate(-50%, ${(1 - p) * 14}px)`,
        opacity: p,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        background: COLORS.card,
        border: `1px solid ${COLORS.line}`,
        borderRadius: 14,
        padding: "14px 20px",
        boxShadow: "0 16px 34px rgba(0,0,0,.35)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Cookie size={20} color={COLORS.warn} strokeWidth={2.2} />
        <span style={{ fontFamily: MONO, fontSize: 19, color: COLORS.tx }}>session=8f3a2c91</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: 16,
          color,
        }}
      >
        <Icon size={18} color={color} strokeWidth={2.4} />
        <span>{secure ? "HttpOnly + Secure" : "No HttpOnly, no Secure"}</span>
      </div>
    </div>
  );
}
