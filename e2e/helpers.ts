import { expect, test, type Browser, type Locator, type Page } from "@playwright/test";
import { MODULES, PATHS, UI } from "../lib/course";
import { getAdminAuth } from "../lib/firebase/admin";

export type Lang = "en" | "he";
export type Creds = { email: string; password: string };

export const BASIC_MODS = PATHS.find((p) => p.id === "basic")!.mods;
export const topicsOf = (id: string) => MODULES.find((m) => m.id === id)!.terms.length;
export const BASIC_TOPICS = BASIC_MODS.reduce((n, id) => n + topicsOf(id), 0);
export const ui = (k: string, lang: Lang = "en") => UI[k][lang];

// Paddle sandbox test cards — only work while stg's PADDLE_ENV/PADDLE_API_KEY are sandbox
export const CARD = { number: "4242 4242 4242 4242", expiry: "12/30", cvc: "100", name: "E2E Tester" };
export const DECLINED_CARD = { ...CARD, number: "4000 0000 0000 0002" };

// Pauses so a person can follow along (0 = full speed): before each click or page load, and
// before each form field. Set in .env.e2e or by scripts/run-e2e.ps1 -StepMs / -FillMs.
const STEP_MS = Number(process.env.E2E_STEP_MS ?? 3000);
const FILL_MS = Number(process.env.E2E_FILL_MS ?? 2000);
export const pause = (ms: number) => new Promise((r) => setTimeout(r, ms));
export const go = async (page: Page, url: string) => (await pause(STEP_MS), page.goto(url));
export const press = async (target: Locator) => (await pause(STEP_MS), target.click());
export const type = async (field: Locator, value: string) => (await pause(FILL_MS), field.fill(value));

const made: string[] = [];

/** Deletes every account this file made. Call from each spec's afterAll. */
export async function deleteUsers() {
  // ponytail: Firebase users only — the DB rows live on the disposable preview/stg Neon branch
  if (!process.env.FIREBASE_SERVICE_ACCOUNT_JSON) return;
  const auth = getAdminAuth();
  for (const email of made.splice(0)) {
    const user = await auth.getUserByEmail(email).catch(() => null);
    if (user) await auth.deleteUser(user.uid);
  }
}

/** Vercel's login gate: sets a bypass cookie for the rest of the browser context. */
export async function passVercelGate(page: Page) {
  const secret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
  expect(secret, "set VERCEL_AUTOMATION_BYPASS_SECRET in .env.e2e").toBeTruthy();
  await go(page, `/en?x-vercel-protection-bypass=${secret}&x-vercel-set-bypass-cookie=true`);
}

/** A second, independent browser — another device, or another person. Already past the gate. */
export async function newBrowser(browser: Browser): Promise<Page> {
  const { baseURL } = test.info().project.use;
  const page = await (await browser.newContext({ baseURL, viewport: null })).newPage();
  await passVercelGate(page);
  return page;
}

const loginForm = (page: Page) => page.locator("form.login-form");

/** A fresh account, landing on `next`. Resend's test inbox takes the welcome email. */
export async function register(page: Page, lang: Lang = "en", next = "/courses"): Promise<Creds> {
  const creds = { email: `delivered+e2e-${Date.now()}@resend.dev`, password: `E2e-${crypto.randomUUID()}` };
  made.push(creds.email);
  await go(page, `/${lang}/login?next=${next}`);
  await press(page.getByRole("button", { name: "Create an account" }));
  await type(page.getByPlaceholder("you@example.com"), creds.email);
  await type(page.getByPlaceholder("Password"), creds.password);
  await press(loginForm(page).getByRole("button", { name: "Create account" }));
  await page.waitForURL((u) => !u.pathname.endsWith("/login"));
  return creds;
}

export async function signIn(page: Page, { email, password }: Creds, next = "/courses") {
  await go(page, `/en/login?next=${next}`);
  await type(page.getByPlaceholder("you@example.com"), email);
  await type(page.getByPlaceholder("Password"), password);
  await press(loginForm(page).getByRole("button", { name: "Sign in" }));
  await page.waitForURL((u) => !u.pathname.endsWith("/login"));
}

export async function signOut(page: Page) {
  await press(page.getByRole("button", { name: "Sign out" }));
  await expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();
}

/** Language-proof: the Advanced card carries `.adv`. */
export const card = (page: Page, course: "basic" | "advanced") =>
  page.locator(course === "advanced" ? ".course.adv" : ".course:not(.adv)");
export const buyButton = (page: Page, course: "basic" | "advanced", lang: Lang = "en") =>
  card(page, course).getByRole("button", { name: new RegExp(`^${ui("buy", lang)} · `) });

/** Clicks a buy button and waits for Paddle's overlay; returns the overlay frame. */
export async function openCheckout(page: Page, button: Locator) {
  await expect(button, "no buy button: is BILLING_ENABLED=1 on Preview?").toBeEnabled();
  await press(button);
  // Paddle redirects to our default payment link (?_ptxn=…) and Paddle.js opens its overlay there
  await page.waitForURL((u) => u.searchParams.has("_ptxn"));
  return page.frameLocator("iframe[name=paddle_frame]");
}

/** Fills Paddle's two steps and presses Pay. */
export async function fillCard(paddle: ReturnType<Page["frameLocator"]>, email: string, card = CARD) {
  // a returning buyer may skip the details step — Paddle remembers the email
  const emailBox = paddle.getByTestId("authenticationEmailInput");
  const cardBox = paddle.getByTestId("cardNumberInput");
  await expect(emailBox.or(cardBox)).toBeVisible();
  if (await emailBox.isVisible()) {
    await type(emailBox, email);
    await pause(FILL_MS);
    await paddle.getByTestId("countriesSelect").selectOption("IL");
    await press(paddle.getByTestId("combinedAuthenticationLocationFormSubmitButton"));
  }
  await type(cardBox, card.number);
  await type(paddle.getByTestId("cardholderNameInput"), card.name);
  await type(paddle.getByTestId("expiryDateField"), card.expiry);
  await type(paddle.getByTestId("cardVerificationValueInput"), card.cvc);
  await press(paddle.getByTestId("cardPaymentFormSubmitButton"));
}

/** A full sandbox purchase; returns the Paddle transaction id from the return URL. */
export async function payWith(page: Page, button: Locator, email: string, lang: Lang = "en"): Promise<string> {
  const paddle = await openCheckout(page, button);
  await expect(paddle.getByText("Test Mode"), "live checkout: stg must be on the Paddle sandbox").toBeVisible();
  await fillCard(paddle, email);
  // back on our return URL; the page asks Paddle about the txn itself, so no webhook is needed
  await page.waitForURL((u) => u.pathname.endsWith("/courses") && u.searchParams.has("paid"), { timeout: 90_000 });
  await expect(page.getByText(ui("paidOk", lang))).toBeVisible();
  return new URL(page.url()).searchParams.get("txn")!;
}

/**
 * Opens a lesson's first topic and reports whether it rendered. A locked topic keeps its URL and
 * shows the "Locked" upsell instead, so the URL alone proves nothing.
 */
export async function opens(page: Page, lesson: string): Promise<boolean> {
  await go(page, `/en/lesson/${lesson}/0`);
  const slide = page.locator(".slidebar");
  await expect(slide.or(page.getByText("Locked", { exact: true }))).toBeVisible();
  return slide.isVisible();
}

/**
 * Walks every topic of each lesson with the slide's "next" button — the button a learner presses,
 * and the one that marks a topic learned. Waits for the server to hold each lesson before moving
 * on: the save is debounced 800ms, and a full navigation would drop it.
 */
export async function learnAll(page: Page, lessons: string[]) {
  for (const id of lessons) {
    await go(page, `/en/lesson/${id}/0`);
    // a click before hydration is a plain <a> navigation and skips the "learned" mark
    await page.waitForLoadState("networkidle");
    while (!new URL(page.url()).pathname.endsWith("/summary")) {
      const from = page.url();
      await press(page.locator(".slidebar a").last());
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

/** The Basic card at 100%: every topic counted, and the button says so. */
export async function expectBasicComplete(page: Page) {
  await go(page, "/en/courses");
  await expect(card(page, "basic").getByText(`${BASIC_TOPICS}/${BASIC_TOPICS} topics`)).toBeVisible();
  await expect(card(page, "basic").getByRole("link", { name: `${ui("continue")} · 100%` })).toBeVisible();
}
