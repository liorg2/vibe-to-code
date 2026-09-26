import { expect, test, type Page } from "@playwright/test";
import { MODULES, PATHS } from "../lib/course";
import { PREVIEW_MODULES } from "../lib/protected";
import { deleteUsers, go, passVercelGate, register } from "./helpers";

// The side menu must follow the course data: every lesson of the course, in order, with its own topics.
// ponytail: one account for the whole file, so the tests share it and run in order
test.describe.configure({ mode: "serial" });
test.afterAll(deleteUsers);

const mods = (course: string) =>
  PATHS.find((p) => p.id === course)!.mods.map((id) => MODULES.find((m) => m.id === id)!);
const titles = (page: Page) => page.locator("nav.side .nav-lesson-h span:nth-child(2)");
const counts = (page: Page) => page.locator("nav.side .nav-lesson-h .cnt");

test("signed out: only the free preview lessons, then the unlock button", async ({ page }) => {
  await passVercelGate(page);
  for (const course of ["basic", "advanced"]) {
    await go(page, `/en/lesson/ground/overview?course=${course}`);
    const preview = mods(course).filter((m) => (PREVIEW_MODULES as readonly string[]).includes(m.id));
    await expect(titles(page)).toHaveText(preview.map((m) => m.title.en));
    await expect(page.locator("nav.side").getByRole("button", { name: "Unlock" })).toBeVisible();
  }
});

let page: Page;
test.beforeAll(async ({ browser }) => {
  page = await (await browser.newContext({ baseURL: test.info().project.use.baseURL, viewport: null })).newPage();
  await passVercelGate(page);
  await register(page);
});

test("signed in: every lesson of each course, in order, with its topic count", async () => {
  for (const course of ["basic", "advanced"]) {
    await go(page, `/en/lesson/ground/overview?course=${course}`);
    await expect(titles(page)).toHaveText(mods(course).map((m) => m.title.en));
    await expect(counts(page)).toHaveText(mods(course).map((m) => `0/${m.terms.length}`));
  }
});

test("each lesson opens to exactly its own topics", async () => {
  // unbought lessons still render the menu (locked overview + upsell), so every lesson can be checked
  for (const m of mods("advanced")) {
    await go(page, `/en/lesson/${m.id}/overview?course=advanced`);
    const topics = page.locator("nav.side .nav-lesson.open .nav-subs a");
    // overview, the topics, summary, build, and the quiz when the lesson has one
    await expect(topics.nth(0)).toHaveText("Overview");
    for (const [i, tm] of m.terms.entries()) await expect(topics.nth(i + 1)).toContainText(tm.t.en);
    await expect(topics.nth(m.terms.length + 1)).toHaveText("Summary");
  }
});

test("no remembered course and none in the URL: the menu still lists every lesson", async () => {
  await page.evaluate(() => (localStorage.clear(), sessionStorage.clear()));
  await go(page, "/en/project");
  await expect(titles(page)).toHaveText(mods("advanced").map((m) => m.title.en));
});
