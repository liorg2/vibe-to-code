import type { BuildStep } from "./types";

/** Build track, steps 08–14 (Advanced course, first half). */
export const BUILDS_ADV_A: Record<string, BuildStep> = {
  async: {
    title: {
      en: "Follow-up reminders that run on a schedule",
      he: "תזכורות מעקב שרצות לפי לוח זמנים",
    },
    goal: {
      en: "Every day a cron job finds the contacts due for a follow-up and records exactly one reminder for each, no matter how many times it runs.",
      he: "כל יום עבודת cron מוצאת את אנשי הקשר שהגיע זמן המעקב שלהם ורושמת לכל אחד תזכורת אחת בדיוק, לא משנה כמה פעמים היא רצה.",
    },
    why: {
      en: "Reminders are work nobody waits for: they run on a timetable, in the background, and must be safe to run twice.",
      he: "תזכורות הן עבודה שאף אחד לא מחכה לה: הן רצות לפי לוח זמנים, ברקע, וחייבות להיות בטוחות להרצה כפולה.",
    },
    uses: [
      "scheduled-job-cron",
      "background-job",
      "sync-vs-async-work",
      "retry-and-backoff",
      "idempotency",
      "environment-variables-secrets",
    ],
    build: `Read AGENTS.md and STEPS.md first. This is step 08 — async: follow-up reminders. Work on branch step-08-async.

Add scheduled follow-up reminders:
1. A migration that adds a nullable follow_up_at (timestamptz, UTC) to contacts, and a new reminders table: id, contact_id (foreign key), due_on (date, UTC), status, created_at. Put a unique constraint on (contact_id, due_on) — that constraint is what makes the job idempotent, not an if-check in code.
2. GET /api/cron/reminders: without the header "Authorization: Bearer <CRON_SECRET>" it returns 401 and does nothing. Otherwise it finds contacts whose follow_up_at is due (<= now), inserts one reminder per contact per day with ON CONFLICT DO NOTHING, logs one line per new reminder, and returns JSON { found, created }.
3. A cron entry in vercel.json that calls the route once a day (the Hobby plan allows daily crons). CRON_SECRET is a long random value in .env.local and in the Vercel env vars.
4. An optional follow-up date field on the contact form.

Do not send email (that is step 11), do not add a queue service or any new dependency. Before the code, give me the plan in 3–5 bullets, since this changes the database. At the end, tell me the curl command that runs the job locally and the JSON I should see.`,
    check: `Verify step 08 — async: follow-up reminders. Do not add features.

1. Add tests for the reminders job against the test DB, never production: a contact due now gets exactly one reminder even when the job runs twice; two runs at the same time (Promise.all) still leave one row; a contact due tomorrow gets none; a contact with no follow_up_at gets none; a missing or wrong secret returns 401 and inserts nothing.
2. Run npm run check and npm run e2e.
3. Evidence: start the dev server, curl the route twice with the right secret and once with a wrong one, and paste the three responses. Then run a SQL query that counts today's reminders per contact and paste the rows.
4. Show the cron entry in vercel.json, and confirm CRON_SECRET exists in the Vercel env vars for production (print the name only, never the value).

Report a table: check | command | result, pasting the real output lines. If anything fails, STOP and show me the failure — do not fix it silently. If everything is green, append this line to STEPS.md and commit: "08 async — daily follow-up reminders, idempotent per contact and day".`,
    done: [
      {
        en: "I ran the job twice and saw one reminder per due contact, not two",
        he: "הרצתם את ה-job פעמיים וראיתם תזכורת אחת לכל איש קשר שהגיע זמנו, לא שתיים",
      },
      {
        en: "A wrong secret got a 401 and created nothing",
        he: "סוד שגוי קיבל 401 ולא יצר כלום",
      },
      {
        en: "A contact due tomorrow has no reminder yet",
        he: "לאיש קשר שמועד המעקב שלו מחר אין עדיין תזכורת",
      },
      {
        en: "The cron entry is in vercel.json and CRON_SECRET is set in Vercel",
        he: "ה-cron מוגדר ב-vercel.json ו-CRON_SECRET מוגדר ב-Vercel",
      },
    ],
  },

  memory: {
    title: {
      en: "Import 5,000 contacts without running out of memory",
      he: "ייבוא 5,000 אנשי קשר בלי שהזיכרון ייגמר",
    },
    goal: {
      en: "A CSV of thousands of contacts imports in batches, bad rows are reported instead of crashing the import, and the list loads 50 at a time with a constant number of queries.",
      he: "קובץ CSV עם אלפי אנשי קשר מיובא במנות, שורות פגומות מדווחות במקום להפיל את הייבוא, והרשימה נטענת 50 בכל פעם עם מספר קבוע של שאילתות.",
    },
    why: {
      en: "Big input is where memory and Big-O stop being theory: streaming keeps RAM flat, and one join instead of N queries keeps the page fast.",
      he: "קלט גדול הוא המקום שבו זיכרון ו-Big-O מפסיקים להיות תיאוריה: קריאה בזרם שומרת את ה-RAM יציב, ו-join אחד במקום N שאילתות שומר על הדף מהיר.",
    },
    uses: ["ram-vs-disk", "big-o", "latency-vs-throughput", "memory-leak", "pagination", "transaction"],
    build: `Read AGENTS.md and STEPS.md first. This is step 09 — memory: bulk import and pagination. Work on branch step-09-memory.

1. CSV import: POST /api/contacts/import (plus an upload form on /contacts) parses a CSV (name, email, stage, company) as a stream — never the whole file in memory, never one big array. Validate each row with the existing zod schema. Insert valid rows in batches of 500, one transaction per batch. A bad row or duplicate email is skipped and reported with its line number and reason; it never fails the import. Companies are matched by name once per batch, not one query per row. Return { imported, skipped, errors }. You may add csv-parse, nothing else.
2. Cursor pagination: GET /api/contacts returns 50 per page, ordered by created_at then id, with a nextCursor. No OFFSET. The page gets a "Load more" button.
3. No N+1: each page loads contacts and their company names in one joined query. In development, log the number of DB queries per request.
4. scripts/make-csv.ts writes a CSV of N fake contacts, optionally with some bad rows.

No schema changes except an index the cursor needs. Before the code, give me the plan in 3–5 bullets. At the end, tell me the commands that generate and import a 5,000-row file, and what I should see.`,
    check: `Verify step 09 — memory: bulk import and pagination. Do not add features.

1. Add tests against the test DB, never production: a 20-row file with 3 bad rows imports 17 and reports those 3 with their line numbers; pagination with 0 contacts, exactly 50 and 51 (first page full, then one row, then no nextCursor); across all pages no contact appears twice or goes missing; the query count for page 1 and page 3 is the same.
2. Run npm run check and npm run e2e.
3. Evidence, against the test DB: generate a 5,000-row CSV, import it, and paste the response, the elapsed time and the peak memory (log process.memoryUsage().rss during the import). Then request pages 1 and 3 and paste the query-count log lines.
4. Say in one sentence whether peak memory would grow with a 50,000-row file, and why.

Report a table: check | command | result, pasting the real output lines. If anything fails, STOP and show me the failure — do not fix it silently. If everything is green, append this line to STEPS.md and commit: "09 memory — streamed CSV import in batches, cursor pagination, no N+1".`,
    done: [
      {
        en: "The 5,000-row import finished and I saw its time and peak memory",
        he: "ייבוא 5,000 השורות הסתיים וראיתם את הזמן ואת שיא הזיכרון שלו",
      },
      {
        en: "The 20-row file imported 17 rows and listed the 3 bad ones with a reason",
        he: "הקובץ עם 20 השורות ייבא 17 והציג את 3 השורות הפגומות עם סיבה",
      },
      {
        en: "Paging through the list showed the same query count on every page",
        he: "דפדוף ברשימה הראה אותו מספר שאילתות בכל עמוד",
      },
    ],
  },

  cache: {
    title: {
      en: "A dashboard that does not recount on every visit",
      he: "דשבורד שלא סופר מחדש בכל כניסה",
    },
    goal: {
      en: "The home page shows how many contacts sit in each stage; the numbers come from a cache and refresh the moment a contact changes.",
      he: "דף הבית מציג כמה אנשי קשר יש בכל שלב; המספרים מגיעים מהקאש ומתעדכנים ברגע שאיש קשר משתנה.",
    },
    why: {
      en: "A cache is only useful if you also know when to throw it away. This step does both, and shows what goes stale without the second half.",
      he: "קאש שווה משהו רק אם יודעים גם מתי לזרוק אותו. הצעד הזה עושה את שניהם, ומראה מה מתיישן כשהחצי השני חסר.",
    },
    uses: ["cache", "hit-miss", "ttl", "invalidation", "browser-cache", "cdn"],
    build: `Read AGENTS.md and STEPS.md first. This is step 10 — cache: a cached dashboard. Work on branch step-10-cache.

1. The home page / becomes a dashboard: the number of contacts in each stage (lead, qualified, won, lost) and the total, from one GROUP BY query.
2. Cache that query with Next.js's own data cache: tag "contact-counts", 60-second lifetime. Check package.json for the Next.js version and use the API that version documents (unstable_cache, or "use cache" with cacheTag and cacheLife) — do not guess. Log "counts: miss (Xms)" only when the query actually runs.
3. Invalidate the tag on every contact write: create, update, delete and CSV import. Put the call next to the writes in one place, not scattered across routes.
4. Static assets: confirm /_next/static already gets "public, max-age=31536000, immutable", and add a one-day Cache-Control for files in /public in next.config.
5. Pages and API responses with contact data must not be cached by the browser or a CDN — tell me which header they send today.

No Redis, no new dependency, no client-side caching library. At the end, tell me how to see a miss and then a hit on a production build (npm run build && npm start — dev mode caches differently) and what I should see.`,
    check: `Verify step 10 — cache: a cached dashboard. Do not add features.

1. Add tests: the counts query returns the right numbers for a known fixture in the test DB; every contact write function (create, update, delete, import) calls revalidateTag("contact-counts") — mock next/cache. Add one e2e: add a contact on /contacts, open /, the count for its stage went up by one.
2. Run npm run check and npm run e2e.
3. Evidence on a production build: load / three times and paste the server log (one miss, then no log line), with the time of an uncached and a cached request from curl -w "%{time_total}". Run curl -I on a file under /_next/static, a file from /public and /api/contacts, and paste the three Cache-Control lines.
4. Temporarily remove the invalidation, rebuild, add a contact and show the old count. Restore it with git and show git status is clean. Explain in two sentences what a user would have seen.

Report a table: check | command | result, pasting the real output lines. If anything fails, STOP and show me the failure — do not fix it silently. If everything is green, append this line to STEPS.md and commit: "10 cache — stage counts cached with a tag, invalidated on every write".`,
    done: [
      {
        en: "I added a contact and the dashboard count went up on the next load",
        he: "הוספתם איש קשר והמספר בדשבורד עלה בטעינה הבאה",
      },
      {
        en: "The server log showed one miss, and the next loads were faster",
        he: "בלוג של השרת ראיתם miss אחד, והטעינות הבאות היו מהירות יותר",
      },
      {
        en: "curl -I showed a long-lived Cache-Control on a static file and none on the API",
        he: "curl -I הראה Cache-Control ארוך טווח על קובץ סטטי, ובלי קאש על ה-API",
      },
      {
        en: "I can say what went stale when the invalidation was removed",
        he: "אתם יכולים להסביר מה התיישן כשביטול התוקף הוסר",
      },
    ],
  },

  apis: {
    title: {
      en: "Reminders become real emails",
      he: "התזכורות הופכות למיילים אמיתיים",
    },
    goal: {
      en: "Each due reminder sends an email through a provider in test mode, survives a slow or failing provider, and records whether it was delivered.",
      he: "כל תזכורת שהגיע זמנה שולחת מייל דרך ספק במצב בדיקה, שורדת ספק איטי או כושל, ורושמת אם המייל נמסר.",
    },
    why: {
      en: "Your first dependency on someone else's API: it will be slow, it will fail, and it will call you back. The code has to expect all three.",
      he: "התלות הראשונה שלכם ב-API של מישהו אחר: הוא יהיה איטי, הוא ייכשל, והוא יפנה אליכם בחזרה. הקוד צריך לצפות לשלושתם.",
    },
    uses: [
      "timeouts-and-retries",
      "sandbox-vs-live-keys",
      "sdk-vs-raw-http",
      "polling-vs-push",
      "webhook",
      "retry-and-backoff",
    ],
    build: `Read AGENTS.md and STEPS.md first. This is step 11 — apis: reminder emails. Work on branch step-11-apis.

Send the reminders from step 08 as email through Resend on the free plan (add the resend package — the one new dependency).
1. Sandbox only: send from onboarding@resend.dev to my own sign-up address (REMINDER_TO). RESEND_API_KEY, RESEND_WEBHOOK_SECRET and REMINDER_TO live in .env.local and Vercel env vars, never in code.
2. Wrap the send in lib/email.ts: a 5-second timeout per attempt, up to 3 attempts with exponential backoff plus jitter (about 0.5s, then 1s). Retry only on timeouts, network errors and 5xx — never on 4xx.
3. An idempotency key per reminder ("reminder-<id>"), so a retry or a second cron run never sends twice.
4. On the reminders row: status (pending, sent, failed, delivered, bounced), provider message id, attempts, last error.
5. POST /api/webhooks/resend verifies the signature (Resend signs with Svix headers — follow Resend's docs, ask me before adding a package). Missing or bad signature: 400. Valid: 200, and the row's status is updated by message id.

The cron job now sends pending reminders after creating them. No queue service, no templates. At the end, tell me how to trigger one real send locally and what I should see in my inbox and in the reminders table.`,
    check: `Verify step 11 — apis: reminder emails. Do not add features, and never use a live key.

1. Add tests with the provider mocked, no network: timeout on every attempt → 3 attempts, then failed with the error stored; 503 then 200 → sent after 2 attempts; 400 → exactly 1 attempt, failed; the same reminder sent twice uses the same idempotency key; webhook with a missing or wrong signature → 400, nothing changed; with a valid signature (signed in the test with a test secret) → 200 and the status stored.
2. Run npm run check and npm run e2e.
3. Evidence: with one contact due today, trigger the cron route locally once. Paste the log lines and the reminders row (status sent, message id), and the subject line of the email that arrived. Run git grep -nE "re_[A-Za-z0-9]{20,}" and show no key is in the repo.
4. Explain in two sentences what the app does if Resend is down for a whole day.

Report a table: check | command | result, pasting the real output lines. If anything fails, STOP and show me the failure — do not fix it silently. If everything is green, append this line to STEPS.md and commit: "11 apis — reminder emails via Resend sandbox, retries, idempotency key, signed webhook".`,
    done: [
      {
        en: "A real reminder email arrived in my inbox from the sandbox sender",
        he: "מייל תזכורת אמיתי הגיע לתיבה שלכם מהשולח של הסנדבוקס",
      },
      {
        en: "Tests showed a timeout retried 3 times and marked failed, and a 400 not retried",
        he: "הטסטים הראו ש-timeout נוסה 3 פעמים וסומן כנכשל, ושתשובת 400 לא נוסתה שוב",
      },
      {
        en: "A webhook with a bad signature got 400; a valid one got 200 and updated the status",
        he: "webhook עם חתימה שגויה קיבל 400; webhook עם חתימה תקינה קיבל 200 ועדכן את הסטטוס",
      },
      {
        en: "The API key is only in .env.local and Vercel, never in git",
        he: "מפתח ה-API נמצא רק ב-.env.local וב-Vercel, אף פעם לא ב-git",
      },
    ],
  },

  testing: {
    title: {
      en: "Tests you can trust",
      he: "טסטים שאפשר לסמוך עליהם",
    },
    goal: {
      en: "One command runs every test, coverage shows what is still untested, and the whole suite passes three times in a row with no flaky failure.",
      he: "פקודה אחת מריצה את כל הטסטים, הכיסוי מראה מה עדיין לא נבדק, וכל הטסטים עוברים שלוש פעמים ברצף בלי כישלון הפכפך.",
    },
    why: {
      en: "After eleven steps of AI edits, the tests are the only thing that notices when an old rule breaks.",
      he: "אחרי אחד-עשר צעדים של עריכות AI, הטסטים הם הדבר היחיד ששם לב כשכלל ישן נשבר.",
    },
    uses: ["coverage", "regression", "flaky-test", "unit-integration-e2e", "assertion", "test-first-tdd"],
    build: `Read AGENTS.md and STEPS.md first. This is step 12 — testing: a suite you can trust. Work on branch step-12-testing.

1. Add npm run test:coverage (Vitest with @vitest/coverage-v8 — the one new dependency). Run it and keep the summary as the "before" numbers.
2. From the report, name the two most important business rules that no test checks — rules, not lines: stage values, reminder idempotency, import validation, cache invalidation. Say in one line why each matters, then test them.
3. Add a regression test for this rule: PATCH /api/contacts/:id with a stage outside lead/qualified/won/lost returns 400 and leaves the row unchanged. If it already passes, it stays as the guard.
4. Hunt flaky e2e tests: run npm run e2e -- --repeat-each=5. Remove every fixed sleep (waitForTimeout), wait on the UI instead (expect(locator).toBeVisible and friends), and give each test its own data so order does not matter. Fix at least one.
5. Add npm run test:all that runs check and then e2e, and fails if either fails.

Do not change app behaviour, except to fix a real bug a new test finds — and tell me if that happens. At the end, tell me the command to run and the coverage numbers before and after.`,
    check: `Verify step 12 — testing: a suite you can trust. Do not add features.

1. Pick one more untested rule from the coverage report and add its test.
2. Run npm run test:coverage and paste the summary lines next to the "before" numbers from the build.
3. Run npm run test:all three times in a row and paste the totals of each run. A failure in any run is a flaky test: STOP and show it.
4. Plant the bug on purpose: change the PATCH validation so it accepts any stage. Run only the regression test and paste the failure (the assertion and its line). Undo the change with git, run the test again and paste the pass, then show git status is clean.
5. Show the diff of the flaky e2e fix and say in one sentence what made it flaky.

Report a table: check | command | result, pasting the real output lines. If anything fails, STOP and show me the failure — do not fix it silently. If everything is green, append this line to STEPS.md and commit: "12 testing — coverage, regression guard, no flaky e2e, npm run test:all".`,
    done: [
      {
        en: "I saw the coverage numbers before and after",
        he: "ראיתם את אחוזי הכיסוי לפני ואחרי",
      },
      {
        en: "The regression test failed on the planted bug and passed once it was removed",
        he: "טסט הרגרסיה נכשל על הבאג שנשתל ועבר אחרי שהוסר",
      },
      {
        en: "npm run test:all was green three times in a row",
        he: "npm run test:all עבר שלוש פעמים ברצף",
      },
    ],
  },

  auth: {
    title: {
      en: "Sign-in, and every row has an owner",
      he: "התחברות, ולכל שורה יש בעלים",
    },
    goal: {
      en: "People sign up and sign in with email and password, and each of them sees only their own contacts, through the pages and through the API.",
      he: "אנשים נרשמים ומתחברים עם מייל וסיסמה, וכל אחד רואה רק את אנשי הקשר שלו, גם בדפים וגם ב-API.",
    },
    why: {
      en: "Authentication says who you are; authorization — the owner filter on every query — decides what you may touch. This step builds both.",
      he: "אותנטיקציה אומרת מי אתם; הרשאות — סינון לפי בעלים בכל שאילתה — קובעות במה מותר לכם לגעת. הצעד הזה בונה את שתיהן.",
    },
    uses: [
      "authentication-vs-authorization",
      "session-and-cookie",
      "hashing-vs-encryption",
      "environment-variables-secrets",
      "owasp-top-10",
    ],
    build: `Read AGENTS.md and STEPS.md first. This is step 13 — auth: sign-in and owners. Work on branch step-13-auth.

This step is risky. First reply with a plan in 3–6 bullets: the library, the schema change, how existing rows get an owner, how scoping is enforced, which routes stay public. Then STOP and wait for my OK before writing code.

1. Sign up, sign in and sign out with email and password. Compare Better Auth (built-in email/password, Drizzle adapter) with Auth.js credentials plus argon2 in two lines, then pick one. Passwords hashed by the library, never logged. Session cookie HttpOnly, SameSite=Lax, Secure in production. AUTH_SECRET only in env vars.
2. owner_id on companies, contacts, notes and reminders. Existing rows go to one seed user, then owner_id becomes NOT NULL. Email uniqueness becomes per owner.
3. Scoping that is hard to forget: all DB access goes through repository functions whose first argument is ownerId, and routes never import the DB client. Someone else's row returns 404, not 403. The dashboard cache becomes per owner.
4. Signed out, API routes return 401 and pages redirect to /login. Public: /api/health, the auth routes, /api/cron/* (secret) and /api/webhooks/* (signature).

No OAuth, roles or password reset. At the end, tell me how to create two users locally and what each should see.`,
    check: `Verify step 13 — auth: sign-in and owners. Do not add features.

1. Add a Playwright e2e with two users: A creates a contact; B opening A's contact page gets a 404, and B calling GET, PATCH and DELETE /api/contacts/<A's id> gets 404 each time, with A's row unchanged. Signed out, /contacts redirects to /login and GET /api/contacts returns 401.
2. Add a repository-level test that seeds two owners, calls every exported repository function as A, and fails if any row of B comes back. Add a test that fails if any file under app/ imports the DB client directly.
3. Run npm run check and npm run e2e.
4. Evidence: select one user's stored password field (wherever the library keeps it) and paste it — it must be a hash. After signing in, paste the session cookie's flags from the Set-Cookie header or DevTools → Application, and the config line that makes it Secure in production. Curl /api/contacts without a cookie and paste the 401.

Report a table: check | command | result, pasting the real output lines. If anything fails, STOP and show me the failure — do not fix it silently. If everything is green, append this line to STEPS.md and commit: "13 auth — email sign-in, owner_id on every table, every query scoped".`,
    done: [
      {
        en: "User B opening user A's contact got a 404, in the page and in the API",
        he: "משתמש B שפתח איש קשר של משתמש A קיבל 404, גם בדף וגם ב-API",
      },
      {
        en: "Signed out, the API answered 401 and the pages sent me to /login",
        he: "בלי התחברות ה-API ענה 401 והדפים העבירו אתכם ל-/login",
      },
      {
        en: "The database holds a password hash, not the password",
        he: "במסד הנתונים שמור hash של הסיסמה, לא הסיסמה עצמה",
      },
      {
        en: "The session cookie is HttpOnly",
        he: "ה-cookie של הסשן מסומן HttpOnly",
      },
    ],
  },

  security: {
    title: {
      en: "Lock the rest of the building",
      he: "לנעול את שאר הבניין",
    },
    goal: {
      en: "The app sends security headers and a CSP, slows down password guessing, keeps an audit log of sign-ins and deletes, and carries no known-vulnerable package or leaked secret.",
      he: "האפליקציה שולחת כותרות אבטחה ו-CSP, מאטה ניחוש סיסמאות, שומרת יומן ביקורת של התחברויות ומחיקות, ואין בה חבילה עם חולשה ידועה או סוד שדלף.",
    },
    why: {
      en: "Login was the front door. This is the lesson's checklist for everything behind it, run against your own app.",
      he: "ההתחברות הייתה דלת הכניסה. זו רשימת הבדיקה של השיעור לכל מה שמאחוריה, מול האפליקציה שלכם.",
    },
    uses: [
      "threat-model",
      "security-headers-and-csp",
      "audit-log",
      "secrets-in-git-history",
      "cve-and-patching",
      "injection-and-validation",
    ],
    build: `Read AGENTS.md and STEPS.md first. This is step 14 — security: beyond login. Work on branch step-14-security.

First reply with a 5-line threat model (what is worth stealing, who wants it, how they would get it) and a plan in 3–6 bullets. Then STOP and wait for my OK before writing code.

1. Security headers on every response: Content-Security-Policy, X-Content-Type-Options, Referrer-Policy, frame-ancestors 'none', Permissions-Policy. Build the CSP as the Next.js docs describe (nonce in middleware), Report-Only first, then enforced; list any 'unsafe-*' you kept and why.
2. Rate-limit sign-in: 5 attempts per minute per IP + email, then 429 with Retry-After. Store attempts in Postgres — serverless instances do not share memory.
3. An append-only audit_log table (actor, action, target type and id, ip, created_at), written on every sign-in attempt and every delete. No code path updates or deletes it.
4. Review input validation on every route: a table route | schema | what it rejects; fix gaps.
5. Triage every high and critical from npm audit: upgrade, or explain why it does not apply. Never --force.
6. Scan the whole git history with gitleaks (official release or Docker image). A real key means rotate it at the provider; rewriting history is not enough.

No paid service. At the end, tell me what curl -I should show.`,
    check: `Verify step 14 — security: beyond login. Do not add features. Work against localhost and the test DB, never production data.

1. Add tests: the 6th sign-in attempt in a minute for the same IP + email returns 429, while another email still gets through; a delete and a sign-in each write one audit_log row; pages and API responses carry the CSP and other headers.
2. Run npm run check and npm run e2e, with the CSP enforced; report any CSP violation in the console.
3. Attacker pass: signed in, put "' OR 1=1 --", "<script>alert(1)</script>" and "<img src=x onerror=alert(1)>" into every text field — contact name, email, company, note, CSV import. For each, report: accepted or rejected, how it was stored, how it rendered. A 500 or a running script is a failure.
4. Evidence: curl -I / and paste the header lines; six sign-in attempts in a loop with their status codes; the gitleaks summary line; the latest 5 audit_log rows.

Report a table: check | command | result, pasting the real output lines. If anything fails, STOP and show me the failure — do not fix it silently. If everything is green, append this line to STEPS.md and commit: "14 security — headers and CSP, sign-in rate limit, audit log, deps and history scanned".`,
    done: [
      {
        en: "The 6th sign-in attempt in a minute got a 429",
        he: "ניסיון ההתחברות השישי בתוך דקה קיבל 429",
      },
      {
        en: "curl -I showed the CSP and the other security headers",
        he: "curl -I הראה את ה-CSP ואת שאר כותרות האבטחה",
      },
      {
        en: "In the attacker pass every payload was stored as plain text and nothing ran",
        he: "ב-attacker pass כל payload נשמר כטקסט רגיל ושום דבר לא רץ",
      },
      {
        en: "gitleaks found nothing, or the leaked key was rotated",
        he: "gitleaks לא מצא כלום, או שהמפתח שדלף הוחלף",
      },
    ],
  },
};
