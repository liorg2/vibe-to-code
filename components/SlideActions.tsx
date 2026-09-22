"use client";

import Link from "@/components/Link";
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
      {isDone ? <span className="learned">✓ {t("gotYes")}</span> : null}
      <span className="grow" />
      {prevHref ? (
        <Button variant="outline" nativeButton={false} render={<Link href={prevHref} />}>
          {prevLabel}
        </Button>
      ) : null}
      {/* moving on is the "got it": one button, not two that look alike */}
      <Button
        variant="brand"
        nativeButton={false}
        render={<Link href={nextHref} onClick={() => !isDone && toggleDone(k)} />}
      >
        {nextLabel}
      </Button>
    </div>
  );
}
