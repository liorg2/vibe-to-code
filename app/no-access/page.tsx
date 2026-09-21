import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { AuthButton } from "@/components/AuthButton";
import { Button } from "@/components/ui/button";

export const metadata = { title: "No access" };

export default function NoAccessPage() {
  return (
    <AppShell showNav={false}>
      <section className="slide login-card">
        <div className="kicker">Vibe → Code</div>
        <h2>Not on the list</h2>
        <p className="lede">
          You&apos;re signed in, but lessons are limited to a few accounts. Sign out and try another
          Google account, or ask for yours to be added.
        </p>
        <div className="cta" style={{ marginTop: 24 }}>
          <AuthButton />
          <Button variant="outline" size="lg" nativeButton={false} render={<Link href="/" />}>
            Back home
          </Button>
        </div>
      </section>
    </AppShell>
  );
}
