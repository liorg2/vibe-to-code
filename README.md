# Vibe → Code

A bilingual (English / עברית) course that teaches the vocabulary and mental models of
professional software development to people who build with AI assistants.

**21 lessons · 198 topics · a plain-words explanation (no code) plus an optional deep dive with a worked example on every slide · animated
request stories · a build track (one app, one step per lesson) · five reference architectures · a pre-ship checklist.**

Live at https://vibe-to-code-4206d.web.app (unindexed on purpose).

## Stack

- **Next.js 15** (React + TypeScript) — lessons are **server-rendered**
- **Firebase Auth** — Google sign-in; lessons are blocked until you have a verified session cookie
- **Firestore** — optional progress sync between devices
- Course content in `data/course.json` (assembled from the legacy `src/*.py` sources). Per term: `SIMPLE` holds the
  non-coder layer (a question + everyday-analogy answer, EN/HE); `DETAIL` and `EXAMPLES` are the optional deep dive.

## Run locally

```bash
npm install
cp .env.local.example .env.local   # fill Firebase keys; DEV_AUTH_BYPASS=1 skips Admin SDK locally
npm run dev
```

Open http://localhost:3000 — use `localhost`, not `127.0.0.1` (Firebase only authorises the former for sign-in).

**Lessons require sign-in.** Middleware checks an httpOnly session cookie on every lesson route. The home page stays public.

For production, set `FIREBASE_SERVICE_ACCOUNT_JSON` (service account JSON as one line) and remove `DEV_AUTH_BYPASS`.

## Deploy

```bash
npm i -g firebase-tools
firebase login
firebase deploy
```

Firebase Hosting runs the Next.js server via `frameworksBackend` (SSR + middleware).

## Editing content

`data/course.json` is the runtime source — edit it directly.

The Python modules under `src/` are the historical content sources. They no longer regenerate
`data/course.json`: `src/build.py` only ever emitted the old static `index.html` (now deleted), and
`data/course.json` has since diverged from `src/course.json`. Kept for reference, not for building.

Long term, content authoring should move to TypeScript modules — for now `course.json` is the single bundle.

## What is in it

| | |
|---|---|
| Modules | Ground floor, client/server, HTTP, APIs, databases, the browser side, languages, testing, memory, cache, background work, auth, security, networks, cloud, shipping, production visibility, scale, teamwork, talking to AI |
| Architectures | Static site, classic monolith, serverless, processing pipeline, microservices |
| Build track | One app from an empty folder to production, one step per lesson (`lib/builds/`): a build prompt, then a check prompt that adds tests and runs the whole suite |
| Scenes | Topic animations told as request stories — login → 401 → 200 (`lib/scenes/`, keyed by `Term.k`) |
| Checklist | 13 always / 12 never before shipping |
| Glossary & Review | A–Z index and flashcards |

`robots.txt` disallows everything; Hosting sends `X-Robots-Tag: noindex`.
