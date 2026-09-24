import { expect, test } from "@playwright/test";
import { getAdminAuth } from "../lib/firebase/admin";

// Resend's test inbox: accepts the welcome email without bouncing or touching sender reputation
const email = `delivered+e2e-${Date.now()}@resend.dev`;
const password = `E2e-${crypto.randomUUID()}`;

// Paddle sandbox test card — only works while stg's PADDLE_ENV/PADDLE_API_KEY are sandbox
const CARD = { number: "4242 4242 4242 4242", expiry: "12/30", cvc: "100", name: "E2E Tester" };

test.afterAll(async () => {
  // ponytail: Firebase user only — the DB rows live on the disposable preview/stg Neon branch
  if (!process.env.FIREBASE_SERVICE_ACCOUNT_JSON) return;
  const auth = getAdminAuth();
  const user = await auth.getUserByEmail(email).catch(() => null);
  if (user) await auth.deleteUser(user.uid);
});

test("a new user registers and buys the Basic course with the sandbox card", async ({ page }) => {
  // Vercel's login gate: this sets a bypass cookie for the rest of the run
  const secret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
  expect(secret, "set VERCEL_AUTOMATION_BYPASS_SECRET in .env.e2e").toBeTruthy();
  await page.goto(`/en?x-vercel-protection-bypass=${secret}&x-vercel-set-bypass-cookie=true`);

  // register
  await page.goto("/en/login?next=/courses");
  await page.getByRole("button", { name: "Create an account" }).click();
  await page.getByPlaceholder("you@example.com").fill(email);
  await page.getByPlaceholder("Password").fill(password);
  await page.getByRole("button", { name: "Create account" }).click();
  await page.waitForURL((u) => u.pathname.endsWith("/courses")); // not /login?next=/courses

  // a brand-new account owns nothing — if it does, billing is off on stg
  const basic = page.locator(".course").filter({ hasText: "Basic" }).first();
  const buy = basic.getByRole("button", { name: /^Buy · / });
  await expect(buy, "no Buy button: is BILLING_ENABLED=1 on Preview?").toBeEnabled();
  await buy.click();

  // Paddle checkout: overlay iframe on our page, or a redirect to Paddle's hosted page
  await page.waitForLoadState("domcontentloaded");
  const paddle = page.frameLocator("iframe[name*=paddle], iframe.paddle-frame, iframe[src*=paddle]").first();
  const scope = page.url().includes("paddle.com") ? page.locator("body") : paddle.locator("body");

  const emailBox = scope.getByLabel(/email/i).first();
  if (await emailBox.isVisible({ timeout: 30_000 }).catch(() => false)) {
    await emailBox.fill(email);
    const postcode = scope.getByLabel(/zip|postcode|postal/i).first();
    if (await postcode.isVisible().catch(() => false)) await postcode.fill("10001");
    await scope.getByRole("button", { name: /continue/i }).first().click();
  }

  await scope.getByLabel(/card number/i).first().fill(CARD.number);
  await scope.getByLabel(/name on card|cardholder/i).first().fill(CARD.name);
  await scope.getByLabel(/expir/i).first().fill(CARD.expiry);
  await scope.getByLabel(/security code|cvv|cvc/i).first().fill(CARD.cvc);
  await scope.getByRole("button", { name: /pay|subscribe|buy/i }).first().click();

  // back on our return URL; the page asks Paddle about the txn itself, so no webhook is needed
  await page.waitForURL((u) => u.pathname.endsWith("/courses") && u.searchParams.has("paid"), { timeout: 90_000 });
  await expect(page.getByText("Payment received")).toBeVisible();
  await expect(basic.getByText("You own this")).toBeVisible();
});
