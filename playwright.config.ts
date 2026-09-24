import { existsSync } from "node:fs";
import { defineConfig } from "@playwright/test";

// VERCEL_AUTOMATION_BYPASS_SECRET, and FIREBASE_SERVICE_ACCOUNT_JSON for cleanup — git-ignored via .env*
if (existsSync(".env.e2e")) process.loadEnvFile(".env.e2e");

// e2e/buy-course.spec.ts pauses between steps (E2E_STEP_MS / E2E_FILL_MS); 0 for both = full speed
const paused = Number(process.env.E2E_STEP_MS ?? 3000) > 0 || Number(process.env.E2E_FILL_MS ?? 2000) > 0;

// ponytail: one project, the installed Chrome — no browser download, and stg is the only target
export default defineConfig({
  testDir: "e2e",
  // prod.spec.ts touches the live site and live Paddle — only when asked for by name
  testIgnore: process.env.E2E_PROD ? [] : ["prod.spec.ts"],
  // Paddle's checkout iframe is slow to boot; paused runs get no limit, a step count is not fixed
  timeout: paused ? 0 : 180_000,
  expect: { timeout: 30_000 },
  retries: 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: process.env.E2E_BASE_URL ?? "https://vibe-to-code-git-stg-lior-goldembergs-projects.vercel.app",
    channel: "chrome",
    // the office network resolves googleapis to a private IP, so Chrome's Local Network Access
    // check blocks Firebase sign-up from a fresh profile
    launchOptions: {
      args: ["--disable-features=LocalNetworkAccessChecks,BlockInsecurePrivateNetworkRequests", "--start-maximized"],
    },
    viewport: null, // the page takes the maximized window's size instead of a fixed 1280x720
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
});
