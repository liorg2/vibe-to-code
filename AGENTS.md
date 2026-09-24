# AGENTS.md

## Branches

- **`main` is production.** Vercel deploys it to vibetodev.com / www.vibetodev.com / vibe-to-code-beta.vercel.app. A push to `main` is a public release — ask first.
- **`stg`** is the staging branch and where work lands first. Once it is verified there, `stg` is promoted to `main` (`git push origin stg:main`, which is a release — ask first). Its branch link is https://vibe-to-code-git-stg-lior-goldembergs-projects.vercel.app (a Preview, so it sits behind the Vercel login gate). It has its own Neon database branch (`preview/stg`) and runs Paddle in sandbox.
- **Feature branches** (`feat/*`, `fix/*`) get a Vercel preview URL per push, and merge into `stg`, not `main`.
- **E2E:** `npm run e2e` runs `e2e/` against `stg` only (needs `VERCEL_AUTOMATION_BYPASS_SECRET` in `.env.e2e`). `npm run e2e:headed` shows the browser. Never point it at production: live Paddle rejects the test card, and each run creates a real account.
  - Paddle's default payment link (sandbox and live) must be `<site>/courses` with no locale, or a Hebrew buyer comes back in English.
  - `E2E_WEBHOOK=1` runs the webhook-only test; it needs `PADDLE_WEBHOOK_SECRET` on Preview and a sandbox notification destination at `<stg>/api/billing/webhook?x-vercel-protection-bypass=<secret>`.
  - `E2E_PROD=1 npx playwright test prod.spec.ts` is the only thing allowed to touch production: it signs in with one permanent account (`E2E_PROD_EMAIL`/`E2E_PROD_PASSWORD`), opens the live checkout and closes it without paying.
- `vibe-to-code-staging.vercel.app` is a stale preview alias on no project — it never updates. Don't verify against it; use the preview URL of the deployment itself.

Verify a deploy on the domain the branch actually feeds, not on a remembered URL.
