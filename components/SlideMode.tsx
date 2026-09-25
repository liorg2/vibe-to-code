"use client";

import { useState, type ReactNode } from "react";
import { useApp } from "@/components/Providers";
import type { TopicExtra } from "@/lib/topic-extras/types";

type Mode = "full" | "tldr" | "look" | "prompts";

/**
 * One tab row: full lesson, TL;DR, and — when the topic has them — how it looks and AI prompts.
 * Full / TL;DR ride a cookie. The other two are for this slide only.
 */
export function SlideMode({
  initial,
  extra,
  children,
}: {
  initial: boolean;
  extra?: TopicExtra;
  children: ReactNode;
}) {
  const { t } = useApp();
  const [mode, setMode] = useState<Mode>(initial ? "tldr" : "full");
  const hasLook = (extra?.look?.length ?? 0) > 0;
  const hasPrompts = (extra?.prompts?.length ?? 0) > 0;
  const on: Mode = mode === "look" && !hasLook ? "full" : mode === "prompts" && !hasPrompts ? "full" : mode;
  const pick = (next: Mode) => {
    if (next === "full" || next === "tldr") {
      document.cookie = `vibe.tldr=${next === "tldr" ? 1 : 0};path=/;max-age=31536000;SameSite=Lax`;
    }
    setMode(next);
  };
  return (
    <div className={on === "full" ? "slide-mode" : `slide-mode ${on}`}>
      <div className="mode-tabs" role="tablist" aria-label={t("viewMode")}>
        <button type="button" role="tab" aria-selected={on === "full"} onClick={() => pick("full")}>
          📚 {t("fullCourse")}
        </button>
        <button type="button" role="tab" aria-selected={on === "tldr"} onClick={() => pick("tldr")}>
          ⚡ {t("tldr")}
        </button>
        {hasLook ? (
          <button type="button" role="tab" aria-selected={on === "look"} onClick={() => pick("look")}>
            {t("howItLooks")}
          </button>
        ) : null}
        {hasPrompts ? (
          <button type="button" role="tab" aria-selected={on === "prompts"} onClick={() => pick("prompts")}>
            {t("aiPrompts")}
          </button>
        ) : null}
      </div>
      {children}
    </div>
  );
}
