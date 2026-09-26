"use client";

import { SkipForward } from "lucide-react";
import Link from "@/components/Link";
import { useApp } from "./Providers";
import { termKey } from "@/lib/course";
import type { Module } from "@/lib/types";

// top-of-slide shortcut: mark this topic learned and move on without reading it
export function SkipButton({ m, i, href }: { m: Module; i: number; href: string }) {
  const { done, toggleDone, t } = useApp();
  const k = termKey(m, i);
  return (
    <Link className="listen skip" href={href} onClick={() => !done.has(k) && toggleDone(k)}>
      <SkipForward size={14} aria-hidden /> {t("skipTopic")}
    </Link>
  );
}
