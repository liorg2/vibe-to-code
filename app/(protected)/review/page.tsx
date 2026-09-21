import Link from "@/components/Link";
import { AppShell } from "@/components/AppShell";
import { ReviewClient } from "@/components/ReviewClient";
import { allowedLevels, requireEntitlement } from "@/lib/entitlement";

export default async function ReviewPage() {
  await requireEntitlement(); // a deck with nothing in it is not a page — show the offer instead
  const allowed = [...(await allowedLevels())];

  return (
    <AppShell>
      <Link className="crumb" href="/">← All lessons</Link>
      <ReviewClient allowed={allowed} />
    </AppShell>
  );
}
