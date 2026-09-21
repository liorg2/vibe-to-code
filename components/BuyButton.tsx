"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

/** Posts to the billing route and follows the hosted Paddle checkout it hands back. */
export function BuyButton({
  endpoint,
  tier,
  label,
  disabled,
}: {
  endpoint: "/api/billing/checkout" | "/api/billing/upgrade";
  tier?: "basic" | "advanced";
  label: string;
  disabled?: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  return (
    <>
      <Button
        variant="brand"
        size="lg"
        type="button"
        disabled={busy || disabled}
        onClick={async () => {
          setBusy(true);
          setErr("");
          const res = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tier }),
          }).catch(() => null);
          const body = res && ((await res.json().catch(() => null)) as { url?: string } | null);
          if (body?.url) {
            location.href = body.url;
            return;
          }
          setBusy(false);
          setErr("Checkout is not available right now.");
        }}
      >
        {busy ? "Opening checkout…" : label}
      </Button>
      {err ? <p className="hint">{err}</p> : null}
    </>
  );
}
