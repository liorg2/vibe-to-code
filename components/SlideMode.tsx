"use client";

import { useState, type ReactNode } from "react";
import { useApp } from "@/components/Providers";

/**
 * Full lesson / TL;DR switch above a slide. TL;DR keeps the definition and why it matters,
 * and hides everything marked `.full-only` in place. The choice rides a cookie so the server
 * renders the right mode on the next slide, with no flash.
 */
export function SlideMode({ initial, children }: { initial: boolean; children: ReactNode }) {
  const { t } = useApp();
  const [tldr, setTldr] = useState(initial);
  const pick = (on: boolean) => {
    document.cookie = `vibe.tldr=${on ? 1 : 0};path=/;max-age=31536000;SameSite=Lax`;
    setTldr(on);
  };
  return (
    <div className={tldr ? "slide-mode tldr" : "slide-mode"}>
      <div className="mode-tabs" role="tablist" aria-label={t("viewMode")}>
        <button type="button" role="tab" aria-selected={!tldr} onClick={() => pick(false)}>
          📚 {t("fullCourse")}
        </button>
        <button type="button" role="tab" aria-selected={tldr} onClick={() => pick(true)}>
          ⚡ {t("tldr")}
        </button>
      </div>
      {children}
    </div>
  );
}
