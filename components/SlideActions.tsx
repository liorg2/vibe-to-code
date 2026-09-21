"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useApp } from "./Providers";
import { termKey } from "@/lib/course";
import type { Module } from "@/lib/types";

export function SlideActions({
  m,
  i,
  prevHref,
  nextHref,
  prevLabel,
  nextLabel,
}: {
  m: Module;
  i: number;
  prevHref: string | null;
  nextHref: string;
  prevLabel: string;
  nextLabel: string;
}) {
  const { done, toggleDone, t } = useApp();
  const k = termKey(m, i);
  const isDone = done.has(k);

  return (
    <div className="slidebar">
      <Button
        variant={isDone ? "outline" : "brand"}
        type="button"
        onClick={() => toggleDone(k)}
      >
        {isDone ? `✓ ${t("gotYes")}` : t("got")}
      </Button>
      <span className="grow" />
      <span className="kbd">← →</span>
      {prevHref ? (
        <Button variant="outline" nativeButton={false} render={<Link href={prevHref} />}>
          {prevLabel}
        </Button>
      ) : null}
      <Button variant="brand" nativeButton={false} render={<Link href={nextHref} />}>
        {nextLabel}
      </Button>
    </div>
  );
}
