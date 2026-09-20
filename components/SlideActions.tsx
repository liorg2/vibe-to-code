"use client";

import Link from "next/link";
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
      <button
        className={`btn ${isDone ? "" : "prim"}`}
        type="button"
        onClick={() => toggleDone(k)}
      >
        {isDone ? `✓ ${t("gotYes")}` : t("got")}
      </button>
      <span className="grow" />
      <span className="kbd">← →</span>
      {prevHref ? <Link className="btn" href={prevHref}>{prevLabel}</Link> : null}
      <Link className="btn prim" href={nextHref}>{nextLabel}</Link>
    </div>
  );
}
