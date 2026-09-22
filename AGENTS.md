# AGENTS.md

## Branches

- **`main` is production.** Vercel deploys it to vibetodev.com / www.vibetodev.com / vibe-to-code-beta.vercel.app. A push to `main` is a public release — ask first.
- **`stg`** is the staging branch. It trails `main` and carries nothing of its own, so ship to it with a fast-forward: `git push origin main:stg`. Never merge `stg` into `main`.
- **Feature branches** (`feat/*`, `fix/*`) get a Vercel preview URL per push. Default here for anything not yet released.
- `vibe-to-code-staging.vercel.app` is a stale preview alias on no project — it never updates. Don't verify against it; use the preview URL of the deployment itself.

Verify a deploy on the domain the branch actually feeds, not on a remembered URL.
