import { AppShell } from "@/components/AppShell";
import { Courses } from "@/components/Courses";
import { claimTransaction } from "@/lib/paddle";
import { sessionClaims } from "@/lib/verify-session";

export const metadata = { title: "Courses" };

/** Also Paddle's return URL: `?paid=1&txn=…` lands here. */
export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ paid?: string; txn?: string; _ptxn?: string }>;
}) {
  const { paid, txn, _ptxn } = await searchParams;
  const claims = await sessionClaims();
  // ponytail: self-healing instead of a cron — a missed webhook is fixed by the buyer landing here
  if (paid && claims) await claimTransaction(txn || _ptxn || "", claims.uid).catch(() => null);

  return (
    <AppShell>
      <Courses paid={Boolean(paid)} />
    </AppShell>
  );
}
