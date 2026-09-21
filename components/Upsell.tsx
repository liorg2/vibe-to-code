import Link from "@/components/Link";
import { Button } from "@/components/ui/button";
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
        <Button variant="brand" size="lg" nativeButton={false} render={<Link href="/courses" />}>
          See the two courses
        </Button>
        <Button variant="outline" size="lg" nativeButton={false} render={<Link href="/" />}>
          Back to lessons
        </Button>
      </div>
    </section>
  );
}
