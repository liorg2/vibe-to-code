import { AlertTriangle, Zap } from "lucide-react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { focusGlow } from "../../components/glow";
import { BOX_H, COLORS, FONT, MONO, STAGE_Y } from "../../components/theme";

// Sits in the gap between the browser (right edge 510) and the database (left edge 1410).
export const CACHE_LEFT = 800;
export const CACHE_W = 320;
export const CACHE_CENTER_X = CACHE_LEFT + CACHE_W / 2;

/**
 * The middle box: an empty placeholder until the first fetch, then a "contacts" entry with a
 * draining TTL bar. `ttlProgress` is driven continuously by the caller so the bar animates
 * smoothly across beats instead of snapping. `stale` flips the bar red and the header to a
 * warning even while `ttlProgress` is still > 0 — the whole point of the "goes wrong" beat.
 */
export function CacheBox({
  active,
  hasEntry,
  stale = false,
  ttlProgress,
}: {
  active: boolean;
  hasEntry: boolean;
  stale?: boolean;
  ttlProgress: number;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame, fps, config: { damping: 200, mass: 0.6 } });
  const glow = focusGlow(active, COLORS.acc2);
  const clampedTtl = Math.max(0, Math.min(1, ttlProgress));
  const barColor = stale ? COLORS.bad : clampedTtl > 0.35 ? COLORS.good : COLORS.warn;
  const headerColor = stale ? COLORS.warn : COLORS.acc2;
  const HeaderIcon = stale ? AlertTriangle : Zap;
  const entryOpacity = interpolate(frame, [0, 10], [hasEntry ? 0 : 1, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        left: CACHE_LEFT,
        top: STAGE_Y - BOX_H / 2,
        width: CACHE_W,
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
      <div style={{ padding: "18px 22px 0", display: "flex", alignItems: "center", gap: 8 }}>
        <HeaderIcon size={20} color={headerColor} strokeWidth={2.2} />
        <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 15, color: headerColor }}>
          {stale ? "may be stale" : "in-memory"}
        </span>
      </div>

      <div style={{ padding: "18px 22px 0", opacity: entryOpacity }}>
        {hasEntry ? (
          <div
            style={{
              borderRadius: 10,
              background: COLORS.card2,
              border: `1px solid ${stale ? COLORS.warn : COLORS.line}`,
              padding: "12px 14px",
            }}
          >
            <div style={{ fontFamily: MONO, fontSize: 14, color: COLORS.tx2, marginBottom: 10 }}>contacts</div>
            <div style={{ height: 8, borderRadius: 99, background: COLORS.line, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${clampedTtl * 100}%`, background: barColor, borderRadius: 99 }} />
            </div>
            <div style={{ fontFamily: FONT, fontSize: 12, color: COLORS.tx3, marginTop: 8 }}>
              {stale ? "outdated" : "TTL"}
            </div>
          </div>
        ) : (
          <div
            style={{
              borderRadius: 10,
              border: `1px dashed ${COLORS.line}`,
              padding: "26px 12px",
              textAlign: "center",
              fontFamily: FONT,
              fontSize: 14,
              color: COLORS.tx3,
            }}
          >
            empty
          </div>
        )}
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
          fontSize: 24,
          color: COLORS.tx,
        }}
      >
        Cache
      </div>
    </div>
  );
}
