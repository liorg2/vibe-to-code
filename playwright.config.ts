import { existsSync } from "node:fs";
import { defineConfig } from "@playwright/test";

// VERCEL_AUTOMATION_BYPASS_SECRET, and FIREBASE_SERVICE_ACCOUNT_JSON for cleanup — git-ignored via .env*
if (existsSync(".env.e2e")) process.loadEnvFile(".env.e2e");

// ponytail: one project, the installed Chrome — no browser download, and stg is the only target
export default defineConfig({
  testDir: "e2e",
  timeout: 180_000, // Paddle's checkout iframe is slow to boot
  expect: { timeout: 30_000 },
  retries: 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: process.env.E2E_BASE_URL ?? "https://vibe-to-code-git-stg-lior-goldembergs-projects.vercel.app",
    channel: "chrome",
    headless: !process.env.HEADED,
    // the office network resolves googleapis to a private IP, so Chrome's Local Network Access
    // check blocks Firebase sign-up from a fresh profile
    launchOptions: { args: ["--disable-features=LocalNetworkAccessChecks,BlockInsecurePrivateNetworkRequests"] },
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
});
