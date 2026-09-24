import { expect, test } from "@playwright/test";
import {
  BASIC_MODS,
  DECLINED_CARD,
  buyButton,
  card,
  deleteUsers,
  expectBasicComplete,
  fillCard,
  go,
  learnAll,
  newBrowser,
  openCheckout,
  opens,
  passVercelGate,
  payWith,
  register,
  signIn,
  signOut,
  ui,
} from "./helpers";

// lessons that are not free previews (lib/protected.ts PREVIEW): one in Basic, one only in Advanced
const BASIC_LESSON = "vcs";
const ADVANCED_LESSON = "async";

test.afterAll(deleteUsers);

test("a new user buys Basic, finishes every lesson, and the progress follows the account", async ({ page, browser }) => {
  test.slow(); // 62 topics, one page each
  await passVercelGate(page);

  // before login, a paid lesson bounces to /login (`ground` is the free preview, so use the next one)
  const locked = `/en/lesson/${BASIC_LESSON}/overview`;
  await go(page, locked);
  await expect(page).toHaveURL((u) => u.pathname === "/en/login" && u.searchParams.get("next") === locked);

  const creds = await register(page);
  const txn = await payWith(page, buyButton(page, "basic"), creds.email);
  await expect(card(page, "basic").getByText(ui("owned"))).toBeVisible();
  expect(await opens(page, BASIC_LESSON)).toBe(true);

  // already owned: the API refuses to sell it again
  expect((await page.request.post("/api/billing/checkout", { data: { tier: "basic" } })).status()).toBe(409);

  await learnAll(page, BASIC_MODS);
  await expectBasicComplete(page);

  // sign out and back in: still 100%
  await signOut(page);
  await signIn(page, creds);
  await expectBasicComplete(page);

  // another device, same account: the 100% comes from the server, not this browser's storage
  const other = await newBrowser(browser);
  await signIn(other, creds);
  await expectBasicComplete(other);

  // someone else can't claim this payment, and a made-up transaction is worth nothing
  const stranger = await newBrowser(browser);
  await register(stranger);
  for (const fake of [txn, "txn_01fakefakefakefakefakefake"]) {
    await go(stranger, `/en/courses?paid=1&txn=${fake}`);
    await expect(stranger.getByText(ui("paidWait"))).toBeVisible();
    await expect(buyButton(stranger, "basic")).toBeVisible();
  }
  expect(await opens(stranger, BASIC_LESSON)).toBe(false);
});

test("a Basic owner upgrades to Advanced for the difference", async ({ page }) => {
  await passVercelGate(page);
  const { email } = await register(page);

  // owns nothing: no upgrade to sell, and a made-up tier is refused
  expect((await page.request.post("/api/billing/upgrade")).status()).toBe(409);
  expect((await page.request.post("/api/billing/checkout", { data: { tier: "gold" } })).status()).toBe(400);

  await payWith(page, buyButton(page, "basic"), email);
  await expect(card(page, "basic").getByText(ui("owned"))).toBeVisible();
  await expect(buyButton(page, "advanced")).toBeVisible();
  // Basic alone does not open an Advanced-only lesson
  expect(await opens(page, ADVANCED_LESSON)).toBe(false);
  // …and search doesn't read it out either: a Basic topic is found, an Advanced-only one is not
  await go(page, `/en/lesson?q=${encodeURIComponent("Source control")}`);
  await expect(page.locator(".term h4", { hasText: "Source control" })).toBeVisible();
  await go(page, `/en/lesson?q=${encodeURIComponent("Background job")}`);
  await expect(page.locator(".term h4", { hasText: "Background job" })).toHaveCount(0);

  await go(page, "/en/courses");
  await payWith(page, page.getByRole("button", { name: new RegExp(`^${ui("addCourse")} · `) }), email);
  await expect(card(page, "basic").getByText(ui("owned"))).toBeVisible();
  await expect(card(page, "advanced").getByText(ui("owned"))).toBeVisible();
  // both owned: nothing left to upgrade to, in the page or the API
  await expect(page.getByRole("button", { name: new RegExp(`^${ui("addCourse")}`) })).toHaveCount(0);
  expect((await page.request.post("/api/billing/upgrade")).status()).toBe(409);
  expect((await page.request.post("/api/billing/checkout", { data: { tier: "advanced" } })).status()).toBe(409);

  expect(await opens(page, ADVANCED_LESSON)).toBe(true);
});

test("a declined card grants nothing", async ({ page }) => {
  await passVercelGate(page);
  const { email } = await register(page);

  const paddle = await openCheckout(page, buyButton(page, "basic"));
  await fillCard(paddle, email, DECLINED_CARD);
  await expect(paddle.getByText(/declined|failed|unsuccessful|try again/i).first()).toBeVisible();
  expect(new URL(page.url()).searchParams.has("paid")).toBe(false);

  await go(page, "/en/courses");
  await expect(buyButton(page, "basic")).toBeVisible();
  expect(await opens(page, BASIC_LESSON)).toBe(false);
});

test("the webhook alone grants the course when the buyer never comes back", async ({ page }) => {
  // needs PADDLE_WEBHOOK_SECRET on Preview and a Paddle sandbox notification to stg — see AGENTS.md
  test.skip(!process.env.E2E_WEBHOOK, "set E2E_WEBHOOK=1 once the sandbox webhook points at stg");
  await passVercelGate(page);
  const { email } = await register(page);

  // the buyer closes the tab: the return page (the other way to grant) never loads
  await page.route((u) => u.searchParams.has("paid"), (r) => r.abort());
  const paddle = await openCheckout(page, buyButton(page, "basic"));
  await fillCard(paddle, email);

  await expect
    .poll(async () => {
      await go(page, "/en/courses");
      return card(page, "basic").getByText(ui("owned")).isVisible();
    }, { message: "the webhook never granted the course", timeout: 90_000, intervals: [5_000] })
    .toBe(true);
});

test("the whole purchase works in Hebrew", async ({ page }) => {
  await passVercelGate(page);
  const { email } = await register(page, "he");
  await go(page, "/he/courses");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");

  await payWith(page, buyButton(page, "basic", "he"), email, "he");
  await expect(card(page, "basic").getByText(ui("owned", "he"))).toBeVisible();
});

test.describe("on a phone", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("a purchase works on a phone-sized screen", async ({ page }) => {
    await passVercelGate(page);
    const { email } = await register(page);
    await payWith(page, buyButton(page, "basic"), email);
    await expect(card(page, "basic").getByText(ui("owned"))).toBeVisible();
  });
});
