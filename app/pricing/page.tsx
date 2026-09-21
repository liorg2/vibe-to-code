import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { BuyButton } from "@/components/BuyButton";
import { MODULES } from "@/lib/course";
import { billingOn, currentTier } from "@/lib/entitlement";
import { claimTransaction, priceId } from "@/lib/paddle";
import { sessionClaims } from "@/lib/verify-session";

export const metadata = { title: "Pricing" };

/** VAT-inclusive, in ILS. Paddle is merchant of record — this is what the buyer pays, full stop. */
const PRICE = { basic: 99, advanced: 149, upgrade: 50 };

export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<{ paid?: string; txn?: string; _ptxn?: string }>;
}) {
  const { paid, txn, _ptxn } = await searchParams;
  const claims = await sessionClaims();

  // ponytail: self-healing instead of a cron — a missed webhook is fixed by the buyer landing here
  if (paid && claims) await claimTransaction(txn || _ptxn || "", claims.uid).catch(() => null);

  const tier = await currentTier();
  const a = MODULES.flatMap((m) => m.terms).filter((t) => t.lvl === "A").length;
  const b = MODULES.flatMap((m) => m.terms).filter((t) => t.lvl === "B").length;

  const card = (
    which: "basic" | "advanced",
    title: string,
    blurb: string,
    terms: string,
  ) => {
    const owned = tier === which || (which === "basic" && tier === "advanced");
    return (
      <div className="path" key={which}>
        <div className="row">
          <span className="ic">{which === "basic" ? "🌱" : "⚡"}</span>
          <h4>{title}</h4>
        </div>
        <p>{blurb}</p>
        <div className="chips">
          <span>{terms}</span>
          <span>Pay once — lifetime access</span>
        </div>
        <p style={{ fontSize: 26, fontWeight: 800, margin: "12px 0 2px" }}>₪{PRICE[which]}</p>
        <p style={{ fontSize: 13, opacity: 0.7 }}>One-time payment, VAT included.</p>
        <div className="cta" style={{ marginTop: 16 }}>
          {owned ? (
            <span className="btn big">✓ You own this</span>
          ) : !claims ? (
            <Link className="btn prim big" href="/login?next=/pricing">Sign in to buy</Link>
          ) : (
            <BuyButton
              endpoint="/api/billing/checkout"
              tier={which}
              label={`Buy for ₪${PRICE[which]}`}
              disabled={!priceId(which)}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <AppShell>
      <section className="paths">
        <div className="phead">
          <h3>Two plans, paid once</h3>
          <p>No subscription, no renewal. Buy the level you want and it stays on your account.</p>
        </div>
        {paid ? (
          <p className="note">
            {tier
              ? `Payment received — your ${tier} access is active. Enjoy.`
              : "Payment is still being confirmed. Refresh this page in a moment."}
          </p>
        ) : null}
        <div className="pgrid">
          {card("basic", "Basic", "The foundations: how software actually works.", `${a} level A terms`)}
          {card(
            "advanced",
            "Advanced",
            "Everything: the foundations plus shipping, security, scale and the rest.",
            `${a + b} terms (levels A and B)`,
          )}
        </div>
        {tier === "basic" ? (
          <div className="note" style={{ marginTop: 18 }}>
            <p style={{ marginBottom: 12 }}>
              Already on Basic? Pay the ₪{PRICE.upgrade} difference once and level B opens up.
            </p>
            <BuyButton
              endpoint="/api/billing/upgrade"
              label={`Upgrade to Advanced — ₪${PRICE.upgrade}`}
              disabled={!priceId("upgrade")}
            />
          </div>
        ) : null}
        {!billingOn() ? (
          <p className="empty">Everything is currently open to every signed-in account.</p>
        ) : null}
      </section>
    </AppShell>
  );
}
