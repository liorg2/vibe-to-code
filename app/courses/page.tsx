import { AppShell } from "@/components/AppShell";
import { Courses } from "@/components/Courses";
import { PaddleCheckout } from "@/components/PaddleCheckout";
import { claimTransaction } from "@/lib/paddle";
import { sessionClaims } from "@/lib/verify-session";

export const metadata = { title: "Courses" };

/** Also Paddle's payment link (`?_ptxn=…` opens the overlay) and, once paid, `?paid=1&txn=…`. */
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
    <AppShell showNav={false}>
      <Courses paid={Boolean(paid)} />
      {_ptxn && !paid ? <PaddleCheckout /> : null}
    </AppShell>
  );
}
