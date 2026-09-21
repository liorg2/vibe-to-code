import Link from "@/components/Link";
import { AppShell } from "@/components/AppShell";
import { ChecklistClient } from "@/components/ChecklistClient";

export default function ChecklistPage() {
  return (
    <AppShell>
      <Link className="crumb" href="/">← All lessons</Link>
      <ChecklistClient />
    </AppShell>
  );
}
