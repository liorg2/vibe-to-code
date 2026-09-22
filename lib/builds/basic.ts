import type { BuildStep } from "./types";

/** Build track, Basic course: lessons 1–7, from an empty folder to a live CRM on Postgres. */
export const BUILDS_BASIC: Record<string, BuildStep> = {
  ground: {
    title: { en: "From an empty folder to a running app", he: "מתיקייה ריקה לאפליקציה שרצה" },
    goal: {
      en: "Pocket CRM runs on your own machine at localhost:3000, with one passing test and the house rules written down.",
      he: "Pocket CRM רץ אצלכם על המחשב ב-localhost:3000, עם טסט אחד שעובר וחוקי הבית כתובים בקובץ.",
    },
    why: {
      en: "Code is text, a runtime runs it, and the terminal is where you watch it happen — this step makes all three real.",
      he: "קוד הוא טקסט, סביבת ריצה מריצה אותו, והטרמינל הוא המקום שבו רואים את זה קורה. הצעד הזה הופך את שלושתם למשהו מוחשי.",
    },
    uses: ["source-code", "runtime", "terminal-cli", "environment", "bug-stack-trace"],
    build: `This folder is empty. I have only Node.js and you, so run every command yourself.

1. Scaffold Next.js here: App Router, TypeScript strict, ESLint, npm, no Tailwind, no src directory, package name pocket-crm. The home page shows one heading: Pocket CRM.
2. Add Vitest and lib/displayName.ts: displayName(first, last) trims both and joins the non-empty parts with one space. One test.
3. Add npm scripts: typecheck (tsc --noEmit), test (vitest run), and check: typecheck, lint, test, stopping at the first failure.
4. Create AGENTS.md containing exactly these house rules:
- Stack: Next.js App Router, TypeScript strict, npm. Tests: Vitest; Playwright from step 05. From step 07: Postgres on Neon, Drizzle ORM, drizzle-kit migrations. Hosting: Vercel.
- npm run check (typecheck + lint + unit tests) must be green before a step is done. Paste real output, never "should pass".
- Start every task by reading AGENTS.md and STEPS.md. Each finished step appends one line to STEPS.md.
- From step 02: one branch per step (step-NN-slug), small commits, merge to main after the check passes.
- Small diffs; do not touch unrelated files. Ask before adding an unnamed dependency. Never commit secrets; .env.local stays gitignored.
5. Create STEPS.md containing only "# Steps".

No git yet. Run npm run check, then start npm run dev and tell me which URL to open and what I will see.`,
    check: `Verify step 01 — ground. Do not add features.

1. Extend the displayName test: first and last name joined; extra spaces trimmed; an empty last name gives just the first name.
2. Run npm run check and paste the last lines of the typecheck, lint and test parts.
3. Break displayName on purpose (make it return only the first name), run npm test, and paste the failure with its full stack trace. Walk me through it top-down: which line is our code, which lines belong to Vitest or Node internals, and which file and line you would open first. Then revert the change and run npm test again to show it is green.
4. Run node -v and npm -v. Add a "Runtime" section to AGENTS.md with both versions and the line "Environment: local, http://localhost:3000".
5. Start npm run dev, fetch http://localhost:3000 with curl, and show the line of HTML that contains Pocket CRM.

Report a table with the columns check | command | result, pasting real output lines, not summaries. If any check fails, STOP: show me the failure and do not fix it silently.

Last, append this line to STEPS.md: 01 ground — Next.js app runs locally, npm run check green.`,
    done: [
      {
        en: "I opened localhost:3000 in my browser and saw Pocket CRM",
        he: "פתחתם את localhost:3000 בדפדפן וראיתם Pocket CRM",
      },
      {
        en: "npm run check finished green: typecheck, lint and tests",
        he: "npm run check הסתיים בירוק: typecheck, lint וטסטים",
      },
      {
        en: "I saw the broken test's stack trace and know which line was our code",
        he: "ראיתם את ה-stack trace של הטסט השבור ואתם יודעים איזו שורה היא הקוד שלנו",
      },
      {
        en: "AGENTS.md and STEPS.md exist and I read them",
        he: "AGENTS.md ו-STEPS.md קיימים וקראתם אותם",
      },
    ],
  },

  vcs: {
    title: { en: "Git, GitHub and a live URL", he: "Git, GitHub וכתובת חיה באוויר" },
    goal: {
      en: "The project has its full history on GitHub, and Vercel serves it at a public https URL, with a separate preview URL for every branch.",
      he: "לפרויקט יש היסטוריה מלאה ב-GitHub, ו-Vercel מגיש אותו בכתובת https ציבורית, עם כתובת preview נפרדת לכל ברנץ'.",
    },
    why: {
      en: "Once every change is a commit you can read and undo, letting an AI edit thirty files stops being scary.",
      he: "ברגע שכל שינוי הוא commit שאפשר לקרוא ולבטל, לתת ל-AI לערוך שלושים קבצים כבר לא מפחיד.",
    },
    uses: ["source-control", "repository-repo", "commit-branch-merge", "clone-push-pull", "deploy"],
    build: `Read AGENTS.md and STEPS.md first. This is step 02 — vcs. Work on branch step-02-vcs.

Git does not exist here yet, so start on main and create the branch in step 3.

1. Run git init with main as the default branch. Write a .gitignore covering node_modules, .next, .vercel, coverage, test-results, playwright-report, *.tsbuildinfo and every .env* file except .env.example. Show me the file.
2. First commit on main: "chore: scaffold Pocket CRM".
3. Create the branch step-02-vcs.
4. Create a GitHub repo named pocket-crm and push main. Use the gh CLI if it is installed and logged in; otherwise give me the exact clicks and wait for the repo URL.
5. Walk me through importing the repo into Vercel (Add New → Project → pocket-crm, defaults, production branch main) and wait for me to paste the production URL.
6. On step-02-vcs: add a small footer "v0.1" to the home page, add the production URL to AGENTS.md with the line "Vercel deploys main to production and every other branch to a preview URL", commit, and push the branch.

Do not merge yet or change anything else. Finish by telling me where in Vercel I find the preview URL for step-02-vcs, and what I should see there versus on production.`,
    check: `Verify step 02 — vcs. Do not add features.

1. Add lib/repo.test.ts: it reads .gitignore and asserts it ignores node_modules, .next and .env.local. Run npm run check.
2. git status must say the working tree is clean. Paste git log --oneline --all -n 10.
3. Create .env.local with the line DEMO=not-a-secret. Run git check-ignore -v .env.local and show which .gitignore line matched, then git status to prove it is not listed.
4. git remote -v, and compare git rev-parse main with git ls-remote origin main: same SHA.
5. curl -I the production URL: status 200. curl -s it: contains Pocket CRM and does NOT contain v0.1 yet.
6. Ask me to open the step-02-vcs preview URL (Vercel may ask me to log in, previews are protected by default) and tell you whether I see v0.1. Confirm the preview URL differs from the production URL.

Report a table: check | command | result, with real output lines. If anything fails, STOP and show me the failure; do not fix it silently.

If every row passed: append "02 vcs — on GitHub, live on Vercel, branch previews work" to STEPS.md, commit, merge step-02-vcs into main, push, and curl -s production again to show v0.1 is now live.`,
    done: [
      {
        en: "I opened the production URL and saw Pocket CRM",
        he: "פתחתם את כתובת הפרודקשן וראיתם Pocket CRM",
      },
      {
        en: "The preview URL showed v0.1 before production did",
        he: "כתובת ה-preview הראתה v0.1 לפני שהפרודקשן הראה",
      },
      {
        en: "git check-ignore proved .env.local will never be committed",
        he: "git check-ignore הוכיח ש-.env.local לא ייכנס אף פעם ל-commit",
      },
      {
        en: "I saw my commits on the repo page on GitHub",
        he: "ראיתם את ה-commits שלכם בדף הריפו ב-GitHub",
      },
    ],
  },

  sides: {
    title: { en: "Both sides talking", he: "שני הצדדים מדברים" },
    goal: {
      en: "The home page asks your own server GET /api/health and shows the answer, and you watch that request in DevTools.",
      he: "דף הבית שולח לשרת שלכם GET /api/health ומציג את התשובה, ואתם רואים את הבקשה הזאת ב-DevTools.",
    },
    why: {
      en: "One log lands in the terminal and the other in the browser console — the fastest way to learn which side a line of code runs on.",
      he: "לוג אחד מופיע בטרמינל והשני ב-console של הדפדפן. זו הדרך המהירה ביותר ללמוד באיזה צד רצה שורת קוד.",
    },
    uses: ["client", "server", "localhost-and-port", "devtools", "the-network-tab", "console-and-breakpoints"],
    build: `Read AGENTS.md and STEPS.md first. This is step 03 — sides. Work on branch step-03-sides.

1. Create lib/health.ts exporting getHealth(now: Date), which returns { ok: true, time: now.toISOString() }. Keeping it a plain function lets us test it without a running server.
2. Create app/api/health/route.ts: GET logs "[server] health checked" with console.log and returns getHealth(new Date()) as JSON.
3. Create components/HealthStatus.tsx, a client component ("use client"), and render it on the home page under the Pocket CRM heading. On mount it fetches /api/health, logs "[browser] health response" with the body, and shows "Checking server…" while waiting, then "Server OK at <time>", or "Server unreachable" if the request fails.
4. Mark the route so it is never cached or prerendered; the time must be fresh on every request.

Do not add other routes, a data-fetching library or styling changes. Explain in two lines which of these files runs on the server, which runs in the browser, and how you can tell from the code.

Finish with: run npm run dev, open http://localhost:3000, and tell me what I should see on the page, in the terminal, and in the browser console.`,
    check: `Verify step 03 — sides. Do not add features.

1. Add unit tests: getHealth with a fixed Date returns ok: true and exactly that ISO time; calling the exported GET from app/api/health/route.ts directly returns status 200, a JSON content-type, and ok: true.
2. Run npm run check.
3. With npm run dev running, run curl -i http://localhost:3000/api/health. Paste the status line, the content-type header and the body, plus the matching "[server]" line from the dev server's terminal.
4. Ask me to open the page, press F12, go to the Network tab, reload, click the health request, and tell you its status and time; then the Console tab and the "[browser]" line. Add what I report to the table.
5. Explain in two plain sentences why the [server] line appears only in the terminal and the [browser] line only in the browser console.

Report a table: check | command | result, with real output lines. If anything fails, STOP and show me the failure; do not fix it silently.

If every row passed: append "03 sides — /api/health on the server, called from the browser" to STEPS.md, commit, merge step-03-sides into main and push. Then curl -i the production URL + /api/health and add that row.`,
    done: [
      {
        en: "The home page showed Server OK with a fresh time",
        he: "דף הבית הציג Server OK עם שעה עדכנית",
      },
      {
        en: "I found the health request in the Network tab and read its status and time",
        he: "מצאתם את בקשת ה-health בלשונית Network וקראתם את הסטטוס והזמן שלה",
      },
      {
        en: "I saw the [server] log in the terminal and the [browser] log in the console",
        he: "ראיתם את לוג ה-[server] בטרמינל ואת לוג ה-[browser] ב-console",
      },
      {
        en: "/api/health answered on the live URL",
        he: "/api/health ענה בכתובת החיה",
      },
    ],
  },

  langs: {
    title: { en: "Types that say no", he: "טיפוסים שיודעים להגיד לא" },
    goal: {
      en: "A Contact type and one zod schema define what a valid contact is, and both the typechecker and the tests reject anything else.",
      he: "טיפוס Contact וסכמת zod אחת מגדירים מה זה איש קשר תקין, וגם ה-typechecker וגם הטסטים דוחים כל דבר אחר.",
    },
    why: {
      en: "TypeScript catches a bad stage before the code runs, the schema catches it when data arrives at runtime — you need both, and it costs exactly one dependency.",
      he: "TypeScript תופס stage שגוי לפני שהקוד רץ, והסכמה תופסת אותו כשהנתונים מגיעים בזמן ריצה. צריך את שניהם, וזה עולה dependency אחת בלבד.",
    },
    uses: ["typed-vs-untyped", "javascript-typescript", "package-manager", "dependency", "semantic-versioning"],
    build: `Read AGENTS.md and STEPS.md first. This is step 04 — langs. Work on branch step-04-langs.

1. Install zod with npm. It is the only new dependency in this step; add nothing else.
2. Create lib/contact.ts with:
- STAGES = ["lead", "qualified", "won", "lost"] as const;
- a zod schema ContactInput: name (trimmed, required, at most 100 characters), email (a valid email), company (optional string), stage (one of STAGES, default "lead");
- type ContactInput inferred from the schema, and type Contact = ContactInput plus id: string and createdAt: string.
3. In tsconfig.json keep "strict": true and add "noUncheckedIndexedAccess": true. Fix any new type errors properly, with no any, no @ts-ignore and no non-null assertions added to silence them.
4. In the ESLint config, make no-explicit-any and no-unused-vars errors, not warnings. Fix whatever they find.
5. Make sure package-lock.json is tracked by git. Show me the zod line in package.json and explain in one sentence what its ^ allows under semantic versioning.

Do not use the schema in the UI or any route yet; that is the next steps. Finish with: run npm run check, and tell me what I should see.`,
    check: `Verify step 04 — langs. Do not add features.

1. Add lib/contact.test.ts: one valid contact parses and its stage defaults to "lead"; four invalid inputs fail, each with the error on the right field: empty name, a name of only spaces, email "not-an-email", stage "maybe".
2. In the same file add a type-level test: a Contact object with stage: "maybe" on the line after // @ts-expect-error. Remove that comment temporarily, run npm run typecheck, paste the type error it prints, then put the comment back.
3. Run npm run check.
4. Run npm ls zod: exactly one version. Run git ls-files package-lock.json to prove the lockfile is tracked.
5. Run git grep -nE ": any\\b|as any" -- "*.ts" "*.tsx": no results.

Report a table: check | command | result, with real output lines. If anything fails, STOP and show me the failure; do not fix it silently.

If every row passed: append "04 langs — Contact type and zod schema, strict TypeScript" to STEPS.md, commit, merge step-04-langs into main and push.`,
    done: [
      {
        en: "I saw the type error TypeScript printed for stage \"maybe\"",
        he: "ראיתם את שגיאת הטיפוס ש-TypeScript הדפיס על stage בשם maybe",
      },
      {
        en: "All five schema tests passed: one valid, four invalid",
        he: "כל חמשת הטסטים של הסכמה עברו: אחד תקין, ארבעה לא תקינים",
      },
      {
        en: "npm ls zod showed exactly one version",
        he: "npm ls zod הראה גרסה אחת בלבד",
      },
    ],
  },

  frontend: {
    title: { en: "The contacts page", he: "דף אנשי הקשר" },
    goal: {
      en: "A /contacts page where you add a contact and see it in the list, with clear errors, on a phone and by keyboard alone, and a browser test that proves it.",
      he: "דף /contacts שבו מוסיפים איש קשר ורואים אותו ברשימה, עם הודעות שגיאה ברורות, בטלפון ובמקלדת בלבד, וטסט בדפדפן שמוכיח את זה.",
    },
    why: {
      en: "The list is client state and disappears on refresh — on purpose, so you see what the browser holds on its own before the server takes over.",
      he: "הרשימה היא state בצד הקליינט ונעלמת ברענון. זה בכוונה, כדי שתראו מה הדפדפן מחזיק לבד לפני שהשרת לוקח פיקוד.",
    },
    uses: ["component", "client-state", "forms-and-validation", "accessibility-a11y", "css-and-responsive-layout", "dom"],
    build: `Read AGENTS.md and STEPS.md first. This is step 05 — frontend. Work on branch step-05-frontend.

1. Add app/contacts/page.tsx rendering a client component, components/ContactsPanel.tsx: a form (name, email, company, stage select) above a list of the contacts added during this visit. Keep them in React state only; losing them on refresh is expected in this step.
2. On submit, validate with ContactInput from lib/contact.ts. Show each field's error next to that field, linked with aria-describedby, and add no row when invalid. After a successful add, clear the form and move focus back to the name field.
3. Accessibility: every input has a visible label, submit is a real button, focus is always visible, and the whole flow works with Tab and Enter only.
4. Layout: works at 375px wide with no horizontal scroll. Plain CSS modules, no UI library.
5. Link to /contacts from the home page.
6. Add Playwright (@playwright/test, Chromium only, installed with npx playwright install chromium). Its config starts the dev server by itself; tests live in tests/e2e; add an npm script e2e. Keep tests/e2e out of Vitest.

Do not add an API, storage or any other dependency. Finish with: run npm run dev, open http://localhost:3000/contacts, and tell me what to try.`,
    check: `Verify step 05 — frontend. Do not add features.

1. Write tests/e2e/contacts.spec.ts with getByLabel and getByRole only: no CSS selectors, no fixed waits, and no test depending on another or on an empty list.
a. valid contact submitted: it appears in the list;
b. empty name: an error shows next to name and the row count is unchanged;
c. at 375×812, add a contact, assert the page's scrollWidth is at most 375, save a screenshot to test-results/contacts-375.png;
d. keyboard only: type a name, Tab through the fields, press Enter: the row appears.
2. If you extracted a helper (for example, mapping zod issues to field errors), add a Vitest test for it.
3. Run npm run check, then npm run e2e. Paste the summary lines of both.
4. Open the screenshot and describe it in one line.
5. Ask me to add a contact and refresh, then explain in one sentence why the list emptied.

Report a table: check | command | result, with real output lines. If anything fails, STOP and show me the failure; do not change a test to make it pass.

If every row passed: append "05 frontend — /contacts page with validation, a11y and e2e tests" to STEPS.md, commit, merge step-05-frontend into main and push.`,
    done: [
      {
        en: "I added a contact by keyboard alone, without touching the mouse",
        he: "הוספתם איש קשר רק עם המקלדת, בלי לגעת בעכבר",
      },
      {
        en: "An empty name showed an error next to the field and added no row",
        he: "שם ריק הציג שגיאה ליד השדה ולא הוסיף שורה",
      },
      {
        en: "npm run e2e opened a real browser and all four tests passed",
        he: "npm run e2e הריץ דפדפן אמיתי וכל ארבעת הטסטים עברו",
      },
      {
        en: "I saw the 375px screenshot and the page fits a phone",
        he: "ראיתם את צילום המסך ברוחב 375px והדף נכנס בטלפון",
      },
    ],
  },

  http: {
    title: { en: "A real REST API", he: "REST API אמיתי" },
    goal: {
      en: "Contacts live behind a REST API on the server, with honest status codes, and the page talks to it.",
      he: "אנשי הקשר יושבים מאחורי REST API בשרת, עם קודי סטטוס נכונים, והדף מדבר איתו.",
    },
    why: {
      en: "Every later feature is a request and a response; get the verbs and status codes right now and every future bug report gets short.",
      he: "כל פיצ'ר מכאן והלאה הוא בקשה ותשובה. אם הפעלים וקודי הסטטוס נכונים עכשיו, כל דיווח באג בעתיד יהיה קצר.",
    },
    uses: ["request-response", "rest", "endpoint", "post-put-patch-delete", "status-codes", "json"],
    build: `Read AGENTS.md and STEPS.md first. This is step 06 — http. Work on branch step-06-http.

Before any code, list the endpoints as a table: verb | path | success | errors.

1. lib/contactStore.ts: an in-memory store on the server (list, get, create, update, remove) keyed by crypto.randomUUID(). Add a comment that it resets on every restart and is replaced by Postgres in step 07.
2. app/api/contacts/route.ts: GET returns 200 with the array. POST validates the body with ContactInput and returns 201 with the created contact and a Location: /api/contacts/<id> header, or 400 with { errors: { field: message } }.
3. app/api/contacts/[id]/route.ts: GET returns 200 or 404. PATCH validates a partial ContactInput and returns 200, 400 or 404. DELETE returns 204 with no body, or 404.
4. Malformed JSON returns 400. A method a route does not support, such as PUT, returns 405 with an Allow header. Every body, errors included, is JSON with a JSON Content-Type.
5. Change ContactsPanel to load the list with GET and add with POST, showing the server's field errors under the fields. Keep the labels, focus handling and keyboard flow.

Do not add a database, auth or any dependency. Finish with the curl command that creates one contact, and what it should print.`,
    check: `Verify step 06 — http. Do not add features.

1. Add tests/api/contacts.test.ts that calls the route handlers directly with Request objects and resets the store before each test. Assert: GET list 200; POST valid 201 with a Location that points at the new id; POST invalid 400 with errors.name and errors.email; malformed JSON 400; GET unknown id 404; PATCH 200 and 400; DELETE 204 then GET 404; PUT 405 with an Allow header.
2. Run npm run check, then npm run e2e. The step 05 tests must still pass, now through the API.
3. With npm run dev running, record a curl -i transcript: create a contact, GET it by the id from Location, PATCH its stage to qualified, DELETE it, GET it again (404). Paste each status line and body.
4. Restart the dev server and GET /api/contacts. Show that the list is empty and say in one line why that is expected until step 07.

Report a table: check | command | result, with real output lines. If anything fails, STOP and show me the failure; do not fix it silently.

If every row passed: append "06 http — REST API for contacts with correct status codes" to STEPS.md, commit, merge step-06-http into main and push.`,
    done: [
      {
        en: "I read the curl transcript: 201, 200, 200, 204, then 404",
        he: "קראתם את תמליל ה-curl: 201, 200, 200, 204 ואז 404",
      },
      {
        en: "Adding a bad contact on the page showed the server's error under the field",
        he: "הוספה של איש קשר לא תקין בדף הציגה את השגיאה מהשרת מתחת לשדה",
      },
      {
        en: "After a server restart the list was empty, and I know why",
        he: "אחרי הפעלה מחדש של השרת הרשימה הייתה ריקה, ואתם יודעים למה",
      },
    ],
  },

  data: {
    title: { en: "A real database — and it's live", he: "מסד נתונים אמיתי — והכול באוויר" },
    goal: {
      en: "Contacts, companies and notes live in Postgres on Neon, survive restarts and redeploys, and the live CRM on Vercel reads and writes them.",
      he: "אנשי קשר, חברות והערות יושבים ב-Postgres על Neon, שורדים הפעלה מחדש ודיפלוי, וה-CRM החי ב-Vercel קורא וכותב אותם.",
    },
    why: {
      en: "State has to live somewhere that survives a restart; a schema, indexes and a migration give you that without losing data or guessing.",
      he: "ה-state צריך לחיות במקום ששורד הפעלה מחדש. סכמה, אינדקסים ומיגרציה נותנים את זה בלי לאבד נתונים ובלי לנחש.",
    },
    uses: ["database", "schema", "migration", "index", "orm", "time-text-and-money"],
    build: `Read AGENTS.md and STEPS.md first. This is step 07 — data. Work on branch step-07-data.

This touches the database, so first give me your plan in 3–6 bullets and wait for my OK.

1. Walk me through creating a free Neon project with a second branch named test. I will paste both connection strings: DATABASE_URL into .env.local, TEST_DATABASE_URL into .env.test.local. Add .env.example with names only.
2. Add drizzle-orm, @neondatabase/serverless and drizzle-kit (dev). Nothing else.
3. db/schema.ts: companies (uuid id, name, website); contacts (uuid id, name, unique email, company_id ON DELETE SET NULL, stage limited to lead/qualified/won/lost and indexed, created_at); notes (uuid id, contact_id ON DELETE CASCADE, body, created_at). Every timestamp is timestamptz, default now(), UTC.
4. Generate the first migration into drizzle/ and commit it. Add scripts db:generate, db:migrate, db:seed, test:int.
5. Replace the in-memory store with a Drizzle repository, same functions. Duplicate email returns 409 with errors.email.
6. Move the step 06 API tests to tests/integration, run by test:int against TEST_DATABASE_URL; npm test stays database-free. Point Playwright's dev server at TEST_DATABASE_URL.
7. scripts/seed.ts: 5 companies, 20 contacts, some notes; safe to run twice.
8. Tell me to add DATABASE_URL in Vercel (Production and Preview), and wait.

Finish with: npm run db:migrate, npm run db:seed, npm run dev, and what /contacts should show.`,
    check: `Verify step 07 — data. Do not add features.

1. On the test branch only (never DATABASE_URL): drop and recreate the public and drizzle schemas, run the migrations from scratch against TEST_DATABASE_URL, and paste the tables and indexes that exist afterwards.
2. Extend tests/integration: they refuse to run if TEST_DATABASE_URL equals DATABASE_URL; create then read back; duplicate email 409; stage "maybe" 400; created_at comes back in UTC; deleting a contact deletes its notes. Run npm run check, npm run test:int and npm run e2e.
3. Restart proof: POST a contact with curl, restart the dev server, GET it back.
4. Run git grep -nE "postgres(ql)?://": no results. Run git check-ignore .env.local .env.test.local.

Report a table: check | command | result, with real output lines. If anything fails, STOP and show me the failure; do not fix it silently.

If every row passed: append "07 data — contacts live in Postgres" to STEPS.md, commit, merge step-07-data into main and push. Then, on production: curl the production URL + /api/contacts to show the seeded rows, POST one contact, ask me to click Redeploy in Vercel, and GET it again to prove it survived.

Close with a short "what I shipped" note: the live URL, the stack, how many unit, API, integration and e2e tests pass, and the seven lines of STEPS.md.`,
    done: [
      {
        en: "I added a contact on the live URL and it was still there after a redeploy",
        he: "הוספתם איש קשר בכתובת החיה והוא עדיין היה שם אחרי דיפלוי מחדש",
      },
      {
        en: "I saw the tables and the email index in the Neon console, not only in the AI's summary",
        he: "ראיתם את הטבלאות ואת האינדקס על email בקונסול של Neon, לא רק בסיכום של ה-AI",
      },
      {
        en: "A duplicate email was refused with 409",
        he: "אימייל כפול נדחה עם 409",
      },
      {
        en: "I read the \"what I shipped\" note: a live CRM on a real database, with unit, API and e2e tests",
        he: "קראתם את הסיכום: CRM חי על מסד נתונים אמיתי, עם טסטים של יחידה, API ו-e2e",
      },
    ],
  },
};
