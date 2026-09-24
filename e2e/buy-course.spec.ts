import { expect, test, type Page } from "@playwright/test";
import { MODULES, PATHS } from "../lib/course";
import { getAdminAuth } from "../lib/firebase/admin";

const BASIC_MODS = PATHS.find((p) => p.id === "basic")!.mods;
const topicsOf = (id: string) => MODULES.find((m) => m.id === id)!.terms.length;
const BASIC_TOPICS = BASIC_MODS.reduce((n, id) => n + topicsOf(id), 0);

// Paddle sandbox test card — only works while stg's PADDLE_ENV/PADDLE_API_KEY are sandbox
const CARD = { number: "4242 4242 4242 4242", expiry: "12/30", cvc: "100", name: "E2E Tester" };

// lessons that are not free previews (lib/protected.ts PREVIEW): one in Basic, one only in Advanced
const BASIC_LESSON = "vcs";
const ADVANCED_LESSON = "async";

const emails: string[] = [];

test.afterAll(async () => {
  // ponytail: Firebase users only — the DB rows live on the disposable preview/stg Neon branch
  if (!process.env.FIREBASE_SERVICE_ACCOUNT_JSON) return;
  const auth = getAdminAuth();
  for (const email of emails) {
    const user = await auth.getUserByEmail(email).catch(() => null);
    if (user) await auth.deleteUser(user.uid);
  }
});

/** Vercel's login gate: sets a bypass cookie for the rest of the test. */
async function passVercelGate(page: Page) {
  const secret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
  expect(secret, "set VERCEL_AUTOMATION_BYPASS_SECRET in .env.e2e").toBeTruthy();
  await page.goto(`/en?x-vercel-protection-bypass=${secret}&x-vercel-set-bypass-cookie=true`);
}

/** A fresh account each run, landing on /courses. Resend's test inbox takes the welcome email. */
async function register(page: Page): Promise<string> {
  const email = `delivered+e2e-${Date.now()}@resend.dev`;
  emails.push(email);
  await page.goto("/en/login?next=/courses");
  await page.getByRole("button", { name: "Create an account" }).click();
  await page.getByPlaceholder("you@example.com").fill(email);
  await page.getByPlaceholder("Password").fill(`E2e-${crypto.randomUUID()}`);
  await page.getByRole("button", { name: "Create account" }).click();
  await page.waitForURL((u) => u.pathname.endsWith("/courses")); // not /login?next=/courses
  return email;
}

/** Clicks a buy button, pays in Paddle's overlay, and waits for the confirmed return page. */
async function payWith(page: Page, button: ReturnType<Page["getByRole"]>, email: string) {
  await expect(button, "no buy button: is BILLING_ENABLED=1 on Preview?").toBeEnabled();
  await button.click();

  // Paddle redirects to our default payment link (?_ptxn=…) and Paddle.js opens its overlay there
  await page.waitForURL((u) => u.searchParams.has("_ptxn"));
  const paddle = page.frameLocator("iframe[name=paddle_frame]");
  await expect(paddle.getByText("Test Mode"), "live checkout: stg must be on the Paddle sandbox").toBeVisible();

  // a returning buyer may skip the details step — Paddle remembers the email
  const emailBox = paddle.getByTestId("authenticationEmailInput");
  const cardBox = paddle.getByTestId("cardNumberInput");
  await expect(emailBox.or(cardBox)).toBeVisible();
  if (await emailBox.isVisible()) {
    await emailBox.fill(email);
    await paddle.getByTestId("countriesSelect").selectOption("IL");
    await paddle.getByTestId("combinedAuthenticationLocationFormSubmitButton").click();
  }

  await cardBox.fill(CARD.number);
  await paddle.getByTestId("cardholderNameInput").fill(CARD.name);
  await paddle.getByTestId("expiryDateField").fill(CARD.expiry);
  await paddle.getByTestId("cardVerificationValueInput").fill(CARD.cvc);
  await paddle.getByTestId("cardPaymentFormSubmitButton").click();

  // back on our return URL; the page asks Paddle about the txn itself, so no webhook is needed
  await page.waitForURL((u) => u.pathname.endsWith("/courses") && u.searchParams.has("paid"), { timeout: 90_000 });
  await expect(page.getByText("Payment received")).toBeVisible();
}

/**
 * Walks every topic of each lesson with the slide's "next" button — the button a learner presses,
 * and the one that marks a topic learned. Waits for the server to hold each lesson before moving
 * on: the save is debounced 800ms, and a full navigation would drop it.
 */
async function learnAll(page: Page, lessons: string[]) {
  for (const id of lessons) {
    await page.goto(`/en/lesson/${id}/0`);
    // a click before hydration is a plain <a> navigation and skips the "learned" mark
    await page.waitForLoadState("networkidle");
    while (!new URL(page.url()).pathname.endsWith("/summary")) {
      const from = page.url();
      await page.locator(".slidebar a").last().click();
      await page.waitForURL((u) => u.href !== from);
    }
    await expect
      .poll(async () => {
        const { done } = (await (await page.request.get("/api/progress")).json()) as { done: string[] };
        return done.filter((k) => k.startsWith(`${id}:`)).length;
      }, { message: `progress for ${id} never reached the server`, timeout: 15_000 })
      .toBe(topicsOf(id));
  }
}

const card = (page: Page, name: "Basic" | "Advanced") => page.locator(".course").filter({ hasText: name }).first();

/**
 * Opens a lesson's first topic and reports whether it rendered. A locked topic keeps its URL and
 * shows the "Locked" upsell instead, so the URL alone proves nothing.
 */
async function opens(page: Page, lesson: string): Promise<boolean> {
  await page.goto(`/en/lesson/${lesson}/0`);
  const slide = page.locator(".slidebar");
  await expect(slide.or(page.getByText("Locked", { exact: true }))).toBeVisible();
  return slide.isVisible();
}

test("a new user registers, buys Basic, and finishes every lesson to 100%", async ({ page }) => {
  test.slow(); // 62 topics, one page each
  await passVercelGate(page);

  // before login, a paid lesson bounces to /login (`ground` is the free preview, so use the next one)
  const locked = `/en/lesson/${BASIC_LESSON}/overview`;
  await page.goto(locked);
  await expect(page).toHaveURL((u) => u.pathname === "/en/login" && u.searchParams.get("next") === locked);

  const email = await register(page);
  await payWith(page, card(page, "Basic").getByRole("button", { name: /^Buy · / }), email);
  await expect(card(page, "Basic").getByText("You own this")).toBeVisible();

  // and the lesson that bounced before login now opens
  expect(await opens(page, BASIC_LESSON)).toBe(true);

  // every topic of every Basic lesson, through the UI
  await learnAll(page, BASIC_MODS);

  await page.goto("/en/courses");
  await expect(card(page, "Basic").getByText(`${BASIC_TOPICS}/${BASIC_TOPICS} topics`)).toBeVisible();
  await expect(card(page, "Basic").getByRole("link", { name: "Continue learning · 100%" })).toBeVisible();
});

test("a Basic owner upgrades to Advanced for the difference", async ({ page }) => {
  await passVercelGate(page);
  const email = await register(page);

  await payWith(page, card(page, "Basic").getByRole("button", { name: /^Buy · / }), email);
  await expect(card(page, "Basic").getByText("You own this")).toBeVisible();
  await expect(card(page, "Advanced").getByRole("button", { name: /^Buy · / })).toBeVisible();
  // Basic alone does not open an Advanced-only lesson
  expect(await opens(page, ADVANCED_LESSON)).toBe(false);

  await page.goto("/en/courses");
  await payWith(page, page.getByRole("button", { name: /^Add the other course · / }), email);
  await expect(card(page, "Basic").getByText("You own this")).toBeVisible();
  await expect(card(page, "Advanced").getByText("You own this")).toBeVisible();
  // both owned: nothing left to upgrade to
  await expect(page.getByRole("button", { name: /^Add the other course/ })).toHaveCount(0);

  expect(await opens(page, ADVANCED_LESSON)).toBe(true);
});
