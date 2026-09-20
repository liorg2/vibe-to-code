# Vibe → Code

A bilingual (English / עברית) course that teaches the vocabulary and mental models of
professional software development to people who build with AI assistants.

**20 modules · ~190 terms · a worked example on every slide · five reference
architectures · a 13-step capstone · a pre-ship checklist.**

Live at https://vibe-to-code-4206d.web.app (unindexed on purpose).

## Run it locally

It is one self-contained static file plus `auth.js`. Serve it:

```bash
python -m http.server 8777
```

Then go to http://localhost:8777 — use `localhost`, not `127.0.0.1`: Firebase
only authorises the former for sign-in.

## What is in it

| | |
|---|---|
| Modules | Ground floor, client/server, HTTP, APIs, databases, the browser side, languages, testing, memory, cache, background work, auth, security, networks, cloud, shipping, production visibility, scale, teamwork, talking to AI |
| Architectures | Static site, classic monolith, serverless, processing pipeline, microservices — each with a diagram, the life of one request, costs, limits and a scaffolding prompt |
| Final project | Empty folder → Docker → two instances on AWS Fargate behind a load balancer, with managed Postgres and Redis. Every step has a prompt to paste, and the last step is the teardown. |
| Checklist | 13 things to always do, 12 to never do, before anything meets a real user |
| Glossary | Every term A–Z, linked to its slide |
| Review | Flashcards for the terms you have not marked as learned |

Every term has its own slide: a one-line definition, a three-paragraph deep-dive
built around a concrete scenario, a worked example, why it matters, and a
paste-ready prompt for asking your own AI about it. Every module ends with a
three-question test.

## Editing the content

`index.html` is generated. The sources live in `src/`:

```
src/base_data.json            the original ten modules (editable)
src/detail_data.py            their deep-dive text
src/deep_1..4.py              rewritten deep-dives, added examples, Hebrew fixes
src/wide_a..d.py              the ten newer modules, with their own content
src/arch_data.py              the five reference architectures
src/ai_project_data.py        the AI module + the capstone steps
src/example_checklist_data.py examples + the final checklist
src/examples_last.py          the remaining examples
src/quiz_data.py              end-of-module tests
src/additions_data.py         the testing module + extra terms
src/devtools_data.py          the DevTools intro
src/wide_ui.py                module order, learning paths, UI strings
src/style.css  src/app.js     presentation and behaviour
```

Edit those, then rebuild:

```bash
python src/build.py
```

No dependencies, no build toolchain — the script only uses the Python standard
library. It also enforces Hebrew house style (one spelling of מסד נתונים, דיפלוי
rather than פריסה) across every source, so a new file cannot reintroduce a
variant.

## Hosting on Firebase, with sign-in

Progress works with no account at all — it lives in `localStorage`. Sign-in only
adds carrying it between devices.

1. Create a project at https://console.firebase.google.com
2. Authentication → Sign-in method → enable **Google**
3. Firestore Database → create, production mode
4. Project settings → Your apps → Web app → copy the config into the top of `auth.js`
5. Put the project id in `.firebaserc`

```bash
npm i -g firebase-tools
firebase login
firebase deploy
```

That deploys the site and the Firestore rules in `firestore.rules`, which let each
signed-in user read and write only their own `progress/{uid}` document.

`robots.txt` disallows everything and Hosting sends `X-Robots-Tag: noindex`, so the
site stays out of search results.
