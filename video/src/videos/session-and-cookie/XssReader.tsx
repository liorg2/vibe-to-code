import { Bug } from "lucide-react";
import { interpolate, useCurrentFrame } from "remotion";
import { BOX_H, BROWSER_LEFT, BOX_W, COLORS, FONT, MONO, STAGE_Y } from "../../components/theme";

const COOKIE_X = BROWSER_LEFT + BOX_W / 2;
const COOKIE_Y = STAGE_Y + BOX_H / 2 + 34;
const SCRIPT_X = COOKIE_X + 230;
const SCRIPT_Y = COOKIE_Y + 6;

/** A page script reaching for the cookie, shown only when it lacks HttpOnly. */
export function XssReader() {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [10, 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const shake = Math.sin(frame / 3) * (frame > 26 ? 2 : 0);
  const dotT = interpolate(frame % 50, [0, 50], [0, 1]);
  const dotX = COOKIE_X + 60 + (SCRIPT_X - COOKIE_X - 60) * dotT;

  return (
    <>
      <svg style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none" }} width={1920} height={1080}>
        <line
          x1={COOKIE_X + 60}
          y1={COOKIE_Y}
          x2={SCRIPT_X - 34}
          y2={SCRIPT_Y}
          stroke={COLORS.bad}
          strokeWidth={3}
          strokeDasharray="6 8"
          opacity={opacity * 0.7}
        />
        <circle cx={dotX} cy={COOKIE_Y} r={5} fill={COLORS.bad} opacity={opacity} />
      </svg>
      <div
        style={{
          position: "absolute",
          left: SCRIPT_X + shake,
          top: SCRIPT_Y,
          transform: "translate(-50%,-50%)",
          opacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: 99,
            background: COLORS.card,
            border: `2px solid ${COLORS.bad}`,
            display: "grid",
            placeItems: "center",
            boxShadow: `0 0 0 6px ${COLORS.bad}22`,
          }}
        >
          <Bug size={28} color={COLORS.bad} strokeWidth={2.2} />
        </div>
        <span style={{ fontFamily: MONO, fontSize: 14, color: COLORS.bad }}>document.cookie</span>
      </div>
    </>
  );
}
