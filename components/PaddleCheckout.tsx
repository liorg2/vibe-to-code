"use client";

import Script from "next/script";

type PaddleEvent = { name?: string; data?: { transaction_id?: string } };
type PaddleJs = {
  Environment: { set: (env: "sandbox") => void };
  Initialize: (opts: { token: string; eventCallback: (e: PaddleEvent) => void }) => void;
};

/**
 * Paddle sends the buyer to our default payment link with `?_ptxn=txn_…`; Paddle.js, once
 * initialized, sees that and opens its overlay by itself. On completion we reload with `paid=1`
 * so the server-side claim grants the course — no webhook needed.
 * ponytail: rendered only when `_ptxn` is present, so no other page loads Paddle.js.
 */
export function PaddleCheckout() {
  const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
  if (!token) return null;

  return (
    <Script
      src="https://cdn.paddle.com/paddle/v2/paddle.js"
      onLoad={() => {
        const paddle = (window as unknown as { Paddle: PaddleJs }).Paddle;
        if (token.startsWith("test_")) paddle.Environment.set("sandbox"); // sandbox tokens say so
        paddle.Initialize({
          token,
          eventCallback: (e) => {
            if (e.name !== "checkout.completed" || !e.data?.transaction_id) return;
            const url = new URL(location.href);
            url.searchParams.delete("_ptxn");
            url.searchParams.set("paid", "1");
            url.searchParams.set("txn", e.data.transaction_id);
            location.href = url.toString();
          },
        });
      }}
    />
  );
}
