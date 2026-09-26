import type { ReactNode } from "react";
import { AbsoluteFill } from "remotion";
import { Brand } from "./Brand";
import { COLORS } from "./theme";

/** Shared per-video wrapper: the site's gradient background + the brand mark, so every video looks the same. */
export function Frame({ children }: { children: ReactNode }) {
  return (
    <AbsoluteFill style={{ background: `radial-gradient(120% 100% at 30% 0%, ${COLORS.card2} 0%, ${COLORS.bg} 60%)` }}>
      {children}
      <Brand />
    </AbsoluteFill>
  );
}
