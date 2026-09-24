import { expect, test } from "@playwright/test";
import { PREVIEW_MODULES } from "../lib/protected";
import { deleteUsers, go, passVercelGate, press, register, signIn, signOut, type } from "./helpers";

test.afterAll(deleteUsers);

test("each course's free preview lesson opens with no login", async ({ page }) => {
  await passVercelGate(page);
  for (const lesson of PREVIEW_MODULES) {
    await go(page, `/en/lesson/${lesson}/0`);
    await expect(page).toHaveURL((u) => u.pathname === `/en/lesson/${lesson}/0`);
    await expect(page.locator(".slidebar")).toBeVisible();
  }
});

test("login refuses an off-site redirect, a wrong password and a duplicate sign-up", async ({ page }) => {
  await passVercelGate(page);
  const { origin } = new URL(test.info().project.use.baseURL!);

  // ?next=//evil.example would bounce a fresh login off-site; it must land on our own first lesson
  const creds = await register(page, "en", "//evil.example/steal");
  expect(new URL(page.url()).origin).toBe(origin);
  await expect(page).toHaveURL((u) => u.pathname.startsWith("/en/lesson/"));

  await signOut(page);
  await signIn(page, creds, "https://evil.example");
  expect(new URL(page.url()).origin).toBe(origin);

  await signOut(page);
  await go(page, "/en/login");
  await type(page.getByPlaceholder("you@example.com"), creds.email);
  await type(page.getByPlaceholder("Password"), "wrong-password-123");
  await press(page.locator("form.login-form").getByRole("button", { name: "Sign in" }));
  await expect(page.locator(".login-error")).toHaveText("Wrong email or password.");

  await press(page.getByRole("button", { name: "Create an account" }));
  await type(page.getByPlaceholder("Password"), creds.password);
  await press(page.locator("form.login-form").getByRole("button", { name: "Create account" }));
  await expect(page.locator(".login-error")).toHaveText("That email already has an account — sign in instead.");
});

test("the billing API turns away a visitor with no session", async ({ page }) => {
  await passVercelGate(page);
  for (const path of ["/api/billing/checkout", "/api/billing/upgrade"]) {
    const res = await page.request.post(path, { data: { tier: "basic" } });
    expect(res.status(), path).toBe(401);
  }
});
