# Vibe → Code

A bilingual (English / עברית) course that teaches the vocabulary and mental models of
professional software development to people who build with AI assistants.

**12 modules · 109 terms · 66 worked examples · a 13-step capstone · a pre-ship checklist.**

## Run it

It is one self-contained static file. Open `index.html` in a browser, or serve it:

```bash
python -m http.server 8777
```

Then go to http://127.0.0.1:8777

Serving over HTTP (rather than opening the file directly) is worth it — some browsers
block `localStorage` on `file://`, which is where your progress is stored.

## What is in it

| | |
|---|---|
| Modules 1–11 | Ground floor, client/server, HTTP, databases, languages, testing, memory, cache, auth, cloud, scale |
| Module 12 | Talking to AI — context windows, blast radius, hallucination, prompt injection, `AGENTS.md` |
| Final project | Empty folder → Docker → two instances on AWS Fargate behind a load balancer, with managed Postgres and Redis. Every step has a prompt to paste, and step 13 is the teardown. |
| Checklist | 13 things to always do, 12 to never do, before anything meets a real user |

Every term has its own slide: a one-line definition, an abstract deep-dive, a concrete
example, and why it matters. Every module ends with a three-question test.

## Editing the content

`index.html` is generated. The sources live in `src/`:

```
src/detail_data.py           deep-dive text for each term
src/example_checklist_data.py   examples + the final checklist
src/ai_project_data.py       the AI module + the capstone steps
src/quiz_data.py             end-of-module tests
src/additions_data.py        the testing module + extra terms
src/devtools_data.py         the DevTools intro
src/style.css  src/app.js    presentation and behaviour
```

Edit those, then rebuild:

```bash
python src/build.py
```

No dependencies, no build toolchain — the script only uses the Python standard library.

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
