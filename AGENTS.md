# AGENTS.md

## Branches

- **`main` is production.** Vercel deploys it to vibetodev.com / www.vibetodev.com / vibe-to-code-beta.vercel.app. A push to `main` is a public release — ask first.
- **`stg`** is the staging branch and where work lands first. Once it is verified there, `stg` is promoted to `main` (`git push origin stg:main`, which is a release — ask first). Its branch link is https://vibe-to-code-git-stg-lior-goldembergs-projects.vercel.app (a Preview, so it sits behind the Vercel login gate). It has its own Neon database branch (`preview/stg`) and runs Paddle in sandbox.
- **Feature branches** (`feat/*`, `fix/*`) get a Vercel preview URL per push, and merge into `stg`, not `main`.
- **E2E:** `npm run e2e` runs `e2e/` against `stg` only (needs `VERCEL_AUTOMATION_BYPASS_SECRET` in `.env.e2e`). `npm run e2e:headed` shows the browser. Never point it at production: live Paddle rejects the test card, and each run creates a real account.
- `vibe-to-code-staging.vercel.app` is a stale preview alias on no project — it never updates. Don't verify against it; use the preview URL of the deployment itself.

Verify a deploy on the domain the branch actually feeds, not on a remembered URL.
