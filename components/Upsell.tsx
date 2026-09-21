import Link from "next/link";
import type { Level } from "@/lib/types";

/** Shown in place of a locked term. ponytail: an upsell converts, notFound() does not. */
export function Upsell({ title, lvl }: { title: string; lvl: Level }) {
  return (
    <section className="slide">
      <div className="kicker">Locked · Level {lvl}</div>
      <h2>{title}</h2>
      <p className="lede">
        This term is part of {lvl === "A" ? "Basic" : "Advanced"}. Buy once and it stays yours —
        no subscription, no renewal.
      </p>
      <div className="cta" style={{ marginTop: 24 }}>
        <Link className="btn prim big" href="/courses">See the two courses</Link>
        <Link className="btn big" href="/">Back to lessons</Link>
      </div>
    </section>
  );
}
