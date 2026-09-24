import { expect, test } from "@playwright/test";
import { buyButton, go, openCheckout, press, signIn } from "./helpers";

/**
 * Production smoke, after a release: the live checkout opens, and it is not the sandbox.
 * Opt-in (E2E_PROD=1, see playwright.config.ts). NEVER pays — it closes the overlay, leaving one
 * unpaid draft transaction in live Paddle. Signs in with one permanent account that owns nothing,
 * so no run creates a real user: E2E_PROD_EMAIL / E2E_PROD_PASSWORD in .env.e2e.
 */
test.use({ baseURL: "https://vibetodev.com" });

test("the live checkout opens, without Test Mode", async ({ page }) => {
  const email = process.env.E2E_PROD_EMAIL;
  const password = process.env.E2E_PROD_PASSWORD;
  expect(email && password, "set E2E_PROD_EMAIL and E2E_PROD_PASSWORD in .env.e2e").toBeTruthy();

  await go(page, "/en");
  await expect(page.getByRole("heading", { name: /vibe/i }).first()).toBeVisible();

  await signIn(page, { email: email!, password: password! });
  await go(page, "/en/courses");
  const paddle = await openCheckout(page, buyButton(page, "basic"));
  await expect(paddle.getByTestId("authenticationEmailInput").or(paddle.getByTestId("cardNumberInput"))).toBeVisible();
  await expect(paddle.getByText("Test Mode"), "prod is on the Paddle sandbox").toHaveCount(0);

  await press(paddle.getByTestId("wideOverlayCloseIcon")); // never pay on prod
});
