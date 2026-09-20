import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { ReviewClient } from "@/components/ReviewClient";

export default function ReviewPage() {
  return (
    <AppShell>
      <Link className="crumb" href="/">← All lessons</Link>
      <ReviewClient />
    </AppShell>
  );
}
