import Link from "@/components/Link";
import { AppShell } from "@/components/AppShell";
import { ReviewClient } from "@/components/ReviewClient";
import { requireEntitlement, type Course } from "@/lib/entitlement";
import { PATHS } from "@/lib/course";
import { PREVIEW_MODULES } from "@/lib/protected";

export default async function ReviewPage() {
  const mine = await requireEntitlement(); // a deck with nothing in it is not a page — show the offer instead
  const allowed = [...PATHS.filter((p) => mine.has(p.id as Course)).flatMap((p) => p.mods), ...PREVIEW_MODULES];

  return (
    <AppShell>
      <Link className="crumb" href="/">← All lessons</Link>
      <ReviewClient allowed={allowed} />
    </AppShell>
  );
}
