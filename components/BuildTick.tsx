"use client";

import { buildFinished } from "@/lib/builds/counts";
import { useApp } from "./Providers";

/** ✓ once every "done when" item of the step is ticked. */
export function BuildTick({ id }: { id: string }) {
  const { ticked } = useApp();
  return buildFinished(ticked, id) ? <span className="tick" aria-label="✓">✓</span> : null;
}
