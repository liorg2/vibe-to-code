import Link from "@/components/Link";
import { AppShell } from "@/components/AppShell";
import { ReviewClient } from "@/components/ReviewClient";
import { requireEntitlement, type Course } from "@/lib/entitlement";
import { PATHS } from "@/lib/course";
export default async function ReviewPage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string }>;
}) {
  const { course } = await searchParams;
  const mine = await requireEntitlement(); // a deck with nothing in it is not a page — show the offer instead
  const asked = PATHS.find((p) => p.id === course);
  const paths = asked && mine.has(asked.id as Course) ? [asked] : PATHS.filter((p) => mine.has(p.id as Course));
  const allowed = paths.flatMap((p) => p.mods);

  return (
    <AppShell>
      <Link className="crumb" href="/">← All lessons</Link>
      <ReviewClient allowed={allowed} />
    </AppShell>
  );
}
