import { UserRound } from "lucide-react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "./theme";

/** The friendly person using the browser. Bobs gently; glows a little brighter while "active". */
export function UserIcon({ x, y, active }: { x: number; y: number; active?: boolean }) {
  const frame = useCurrentFrame();
  const bob = Math.sin(frame / 18) * 4;
  const pulse = active ? 1 + Math.sin(frame / 4) * 0.04 : 1;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + bob,
        transform: `translate(-50%,-50%) scale(${pulse})`,
        width: 84,
        height: 84,
        borderRadius: 99,
        background: `linear-gradient(135deg, ${COLORS.acc}, ${COLORS.acc2})`,
        display: "grid",
        placeItems: "center",
        boxShadow: active
          ? `0 0 0 7px ${COLORS.acc2}33, 0 14px 30px rgba(0,0,0,.35)`
          : "0 14px 30px rgba(0,0,0,.35)",
      }}
    >
      <UserRound size={44} color="#fff" strokeWidth={2.2} />
    </div>
  );
}

/** Small opacity-fade helper shared by a couple of one-off badges. */
export function fadeIn(frame: number, from: number, len = 12): number {
  return interpolate(frame, [from, from + len], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
}
