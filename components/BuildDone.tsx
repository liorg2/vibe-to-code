"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useApp } from "./Providers";

/** The step's "done when" list. Ticks sync with the rest of progress. */
export function BuildDone({ id, items }: { id: string; items: string[] }) {
  const { ticked, toggleTicked } = useApp();
  return (
    <div className="build-done">
      {items.map((label, i) => {
        const k = `build:${id}:${i}`;
        return (
          <label key={k} className="practice-check">
            <Checkbox checked={ticked.has(k)} onCheckedChange={(on) => toggleTicked(k, on === true)} />
            <span>{label}</span>
          </label>
        );
      })}
    </div>
  );
}
