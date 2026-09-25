import type { BuildStep } from "./types";

/** Build track, steps 08–12 (Advanced course, first half). */
export const BUILDS_ADV_A: Record<string, BuildStep> = {
  integrations: {
    title: {
      en: "Reminders that email themselves",
      he: "תזכורות ששולחות את עצמן במייל",
    },
    goal: {
      en: "Every day the app finds who is due, creates exactly one reminder each, and emails it through Resend. A slow email service breaks nothing, and delivery reports come back by signed webhook.",
      he: "כל יום האפליקציה מוצאת למי הגיע הזמן, יוצרת לכל אחד תזכורת אחת בדיוק, ושולחת אותה במייל דרך Resend. שירות מייל איטי לא שובר כלום, ודיווחי המסירה חוזרים ב-webhook חתום.",
    },
    why: {
      en: "Your first dependency on someone else's API plus work nobody waits for: it runs on a timetable, in the background, and must survive slowness, failure and callbacks.",
      he: "התלות הראשונה ב-API של מישהו אחר, יחד עם עבודה שאף אחד לא מחכה לה: היא רצה לפי לוח זמנים, ברקע, וחייבת לשרוד איטיות, כישלונות וקריאות חזרה.",
    },
    uses: [
      "scheduled-job-cron",
      "background-job",
      "sync-vs-async-work",
      "retry-and-backoff",
      "idempotency",
      "timeouts-and-retries",
      "sandbox-vs-live-keys",
      "webhook",
      "environment-variables-secrets",
    ],
    build: `Read AGENTS.md and STEPS.md first. This is step 8: reminders that email themselves. Start a new branch for it.

Each contact gets an optional "follow up on" date. Once a day the app finds who is due, creates exactly one reminder each, and emails it through Resend. I will create a free Resend account; while we test, emails only go to my own address.

Must-haves:
- Each due contact gets exactly one reminder per day, even if the job runs twice or two runs overlap. The database itself guarantees it, and a reminder is never emailed twice.
- Only our scheduler can start the job. It needs a secret; anyone else gets a 401 and nothing happens. The Resend key is a secret too: it lives in environment settings, never in the code.
- If Resend is slow or down, the app gives up after a few seconds, tries again a couple of times, then marks the reminder failed. No retry when Resend says our request was wrong.
- Resend calls us back (a webhook) to say an email was delivered or bounced. We only trust calls signed by Resend, and save the result.
- It works on Vercel's free plan.

This changes the database, so first tell me your plan in a few plain bullets and wait for my OK. Note your choices in AGENTS.md and explain them in 2–3 plain sentences. At the end, tell me in plain words what to open or click to see it working.`,
    check: `Check step 8: reminders and emails. Don't add features; never use a live key.

Add tests, against the test database and never the real one, with Resend faked so nothing is really sent, that prove:
- a contact due today gets exactly one reminder and one email, even when the job runs twice, or twice at the same moment;
- a contact due tomorrow, or with no follow-up date, gets none;
- a missing or wrong secret gets a 401 and creates nothing;
- when Resend never answers, the app tries 3 times, then marks the reminder failed; when Resend says our request was wrong, there is no retry;
- a webhook call with a missing or fake signature is refused and changes nothing; a real one updates the reminder.

Run all the tests with npm run check and npm run e2e. Then run the job twice yourself, send one real test reminder to my inbox, show me its status, and confirm the keys are nowhere in the code or its history. In two sentences: what if Resend is down all day?

Report back in plain words: a short list of what you checked, each pass or fail, with the real output below it. If something fails, stop and explain it simply; don't fix it quietly. If all pass, add this line to STEPS.md and save the work (commit): "08 integrations: daily reminders emailed via Resend, safe retries, signed webhook".`,
    done: [
      {
        en: "The job ran twice and each due contact still had one reminder and one email, not two",
        he: "המשימה רצה פעמיים ולכל איש קשר שהגיע זמנו עדיין הייתה תזכורת אחת ומייל אחד, לא שניים",
      },
      {
        en: "A real reminder email arrived in my inbox from Resend's test sender",
        he: "מייל תזכורת אמיתי הגיע לתיבה שלכם מהשולח לבדיקות של Resend",
      },
      {
        en: "A wrong secret got a 401 and created nothing",
        he: "סוד שגוי קיבל 401 ולא נוצר כלום",
      },
      {
        en: "A fake webhook call was refused; a real one updated the reminder",
        he: "קריאת webhook מזויפת נדחתה; קריאה אמיתית עדכנה את התזכורת",
      },
    ],
  },

  performance: {
    title: {
      en: "Fast with 5,000 contacts, and a dashboard that doesn't recount",
      he: "מהירים עם 5,000 אנשי קשר, ודשבורד שלא סופר מחדש",
    },
    goal: {
      en: "You can import thousands of contacts without running out of memory, the list pages 50 at a time and stays fast, and the home page shows stage counts from a cache that refreshes the moment anything changes.",
      he: "אפשר לייבא אלפי אנשי קשר בלי שהזיכרון ייגמר, הרשימה נטענת 50 בכל פעם ונשארת מהירה, ודף הבית מציג ספירות לפי שלב מ-cache שמתרענן ברגע שמשהו משתנה.",
    },
    why: {
      en: "Big files are where memory and speed stop being theory — and a cache is only useful if you also know when to throw it away. This step does all three.",
      he: "קבצים גדולים הם המקום שבו זיכרון ומהירות מפסיקים להיות תיאוריה, ו-cache שווה משהו רק אם יודעים מתי לזרוק אותו. הצעד הזה עושה את כל השלושה.",
    },
    uses: [
      "ram-vs-disk",
      "big-o",
      "latency-vs-throughput",
      "memory-leak",
      "pagination",
      "transaction",
      "cache",
      "hit-miss",
      "ttl",
      "invalidation",
      "browser-cache",
      "cdn",
    ],
    build: `Read AGENTS.md and STEPS.md first. This is step 9: fast with lots of contacts. Start a new branch for it.

On the contacts page I can upload a CSV file and all its contacts get added. The home page becomes a small dashboard: how many contacts are in each stage and the total.

Must-haves:
- A file of 5,000 or even 50,000 rows imports without running out of memory: read it a bit at a time, never whole. A bad row or duplicate email is skipped, not fatal; at the end I see the import count and each skipped row with its line number and reason. Give me a way to make a test file of fake contacts, with a few bad rows.
- The contacts list shows 50 at a time with "Load more", and every page is as fast as the first, however many there are.
- The dashboard numbers are counted at most once a minute; any contact change throws them away, so the dashboard is never wrong.
- Files that never change are kept by the browser for a long time; pages and API answers with contact data never are. Use what Next.js already offers; no new tools.

Pick the tools, note them in AGENTS.md, explain in 2–3 sentences. At the end, tell me in plain words what to open or click to see it working, and how to tell a fresh count from a cached one.`,
    check: `Check step 9: import and cache. Don't add features.

Add tests, against the test database and never the real one, that prove:
- a 20-row file with 3 bad rows imports 17 and lists those 3 with their line numbers;
- paging works with no contacts, exactly 50 and 51, and no contact appears twice or goes missing across pages;
- a later page needs as many database requests as the first one, not more;
- the counts are right for a known set of contacts, and adding, changing, deleting or importing a contact throws the saved numbers away;
- in the browser: add a contact, open the home page, and its stage count went up by one.

Run all the tests with npm run check and npm run e2e. Then import a 5,000-row test file and tell me how long it took and the most memory the app used. On a production build, show me that the first visit counts and the next ones use the cache, and how long each took. Last, switch off the throwing away for a moment, show me the dashboard going stale, then put it back exactly as it was.

Report back in plain words: a short list of what you checked, each pass or fail, with the real output below it. If something fails, stop and explain it simply; don't fix it quietly. If all pass, add this line to STEPS.md and save the work (commit): "09 performance: big CSV import in batches, list loads 50 at a time, counts cached".`,
    done: [
      {
        en: "I imported 5,000 contacts and saw how long it took and how much memory it used",
        he: "ייבאתם 5,000 אנשי קשר וראיתם כמה זמן זה לקח וכמה זיכרון זה צרך",
      },
      {
        en: "Load more was as quick on the third page as on the first",
        he: "Load more היה מהיר בעמוד השלישי בדיוק כמו בראשון",
      },
      {
        en: "I added a contact and the dashboard count went up on the next load",
        he: "הוספתם איש קשר והמספר בדשבורד עלה בטעינה הבאה",
      },
      {
        en: "I saw the dashboard go stale when the refresh was switched off, and I can say why",
        he: "ראיתם את הדשבורד מתיישן כשהרענון כובה, ואתם יכולים להסביר למה",
      },
    ],
  },

  teamwork: {
    title: {
      en: "Tests you can trust, in a repo a stranger can pick up",
      he: "טסטים שאפשר לסמוך עליהם, בריפו שאדם זר יכול להרים",
    },
    goal: {
      en: "One command runs every test with no random failures, a coverage report shows what is still untested — and a stranger can go from nothing to all tests passing using only the README.",
      he: "פקודה אחת מריצה את כל הטסטים בלי כישלונות אקראיים, דוח כיסוי מראה מה עדיין לא נבדק, ואדם זר יכול להגיע מאפס לכל הטסטים עוברים רק בעזרת ה-README.",
    },
    why: {
      en: "After nine steps of AI edits, the tests are the only thing that notices when an old rule breaks — and on a one-person project, written habits let the next person, or the next AI session, carry on without asking.",
      he: "אחרי תשעה צעדים של עריכות AI, הטסטים הם הדבר היחיד ששם לב כשכלל ישן נשבר, ובפרויקט של אדם אחד הרגלים כתובים מאפשרים לאדם הבא, או לשיחת ה-AI הבאה, להמשיך בלי לשאול.",
    },
    uses: [
      "coverage",
      "regression",
      "flaky-test",
      "unit-integration-e2e",
      "test-first-tdd",
      "readme-and-docs",
      "decision-record-adr",
      "changelog-and-release-notes",
      "definition-of-done",
      "ticket-issue",
      "bus-factor",
    ],
    build: `Read AGENTS.md and STEPS.md first. This is step 10: tests we can trust, in a repo a stranger can pick up. Start a new branch for it. Tests plus docs: don't change how the app behaves.

Must-haves:
- A coverage report: which parts of the app no test ever runs. Keep today's numbers as "before". From it, test the two most important untested business rules (rules, not lines), saying in one line why each matters.
- A regression test (it stops an old bug coming back): moving a contact to a stage that doesn't exist is refused, and the contact stays as it was.
- Fix at least one flaky browser test (sometimes passes, sometimes fails): tests wait for the page, not for fixed seconds. One command runs every test and fails if any fails.
- README: what Pocket CRM is in two lines; running it in five commands or fewer; where each secret comes from; how to run the tests; how changes reach the live site. Plus an example settings file with placeholders, never real values.
- A short decision record for our biggest choice, the database; a changelog, newest first, in plain words; a pull request template with our definition of done; the next feature as a ticket, "AI follow-up draft", as a GitHub issue.

Note your choices in AGENTS.md and explain in 2–3 sentences. At the end, tell me the README's commands, the ticket link, the coverage before and after, and what to open to see it working.`,
    check: `Check step 10: tests and docs. Don't add features.

- Pick one more untested rule from the coverage report and add a test for it. Show me the coverage now next to the "before" numbers.
- Run every test three times in a row (npm run check and npm run e2e each time) and show the totals. A failure in any run means a flaky test: stop and show it.
- Plant a bug on purpose: let a contact take any stage. Show me the regression test failing, then undo the bug and show it passing, with nothing else left changed.
- Add one test that keeps the docs honest: every setting the code reads is listed in the example settings file, and that file holds no real-looking secrets.
- The stranger test: copy the repo from GitHub into a fresh folder and follow ONLY its README, using nothing from this folder. When it needs a secret, ask me and I'll put it in myself. Every time the README left something out, that's a failure. Open this step's pull request and show the template's checkboxes on it, plus the ticket link.

Report back in plain words: a short list of what you checked, each pass or fail, with the real output below it. If something fails, stop and explain it simply; don't fix it quietly. If all pass, delete the fresh copy, add one line to STEPS.md ("10 teamwork: coverage, regression guard, no flaky tests, README, decision record, changelog, next ticket") and commit.`,
    done: [
      {
        en: "All the tests passed three times in a row, and I saw the coverage before and after",
        he: "כל הטסטים עברו שלוש פעמים ברצף, וראיתם את אחוזי הכיסוי לפני ואחרי",
      },
      {
        en: "The regression test failed on the planted bug and passed once it was removed",
        he: "טסט הרגרסיה נכשל על הבאג שנשתל ועבר אחרי שהוסר",
      },
      {
        en: "A fresh copy of the repo passed all its tests using only the README",
        he: "עותק חדש של הריפו עבר את כל הטסטים רק בעזרת ה-README",
      },
      {
        en: "The AI follow-up draft ticket exists, with a clear 'done when' list",
        he: "הטיקט של טיוטת המעקב עם AI קיים, עם רשימה ברורה של מתי הוא נחשב גמור",
      },
    ],
  },

  security: {
    title: {
      en: "Sign-in, and every row has an owner — then lock the rest",
      he: "התחברות עם בעלים לכל שורה, ואז לנעול את השאר",
    },
    goal: {
      en: "People sign in with email and password and see only their own contacts — and the app blocks common attacks, slows down password guessing, logs sign-ins and deletes in a record that can't be edited, and holds no known-vulnerable package or leaked secret.",
      he: "אנשים מתחברים עם מייל וסיסמה ורואים רק את אנשי הקשר שלהם, והאפליקציה חוסמת התקפות נפוצות, מאטה ניחוש סיסמאות, רושמת התחברויות ומחיקות ביומן שאי אפשר לערוך, ואין בה חבילה פגיעה או סוד שדלף.",
    },
    why: {
      en: "Authentication says who you are, authorization decides what you may touch — and login is only the front door. This step builds both, then locks everything behind them.",
      he: "ההזדהות אומרת מי אתם, ההרשאות קובעות במה מותר לגעת, וההתחברות היא רק דלת הכניסה. הצעד הזה בונה את שתיהן, ואז נועל את כל מה שמאחוריהן.",
    },
    uses: [
      "authentication-vs-authorization",
      "session-and-cookie",
      "hashing-vs-encryption",
      "environment-variables-secrets",
      "owasp-top-10",
      "threat-model",
      "security-headers-and-csp",
      "audit-log",
      "secrets-in-git-history",
      "cve-and-patching",
      "injection-and-validation",
    ],
    build: `Read AGENTS.md and STEPS.md first. This is step 11: sign-in, then lock the rest of the building. Start a new branch for it.

People sign up, sign in and sign out with email and password, and each person only ever sees their own data.

Use a maintained auth library, never your own password cryptography. Before coding, explain in a few lines which of email verification, password recovery, MFA and session revocation are included, and which a production app needs.

Must-haves:
- Passwords are stored only as a hash, never logged. You stay signed in with a cookie that page scripts can't read.
- Signed out, nobody can read contacts, not even through the API: 401 there, sign-in page elsewhere. Someone else's contact looks as if it doesn't exist. Existing contacts go to a first user; the reminder job and webhook keep working.
- A five-line threat model first: what is worth stealing, who wants it, how. Then every page tells the browser to block common attacks, and 5 sign-in tries in a minute for one email get a 429.
- An audit log (added to, never edited) of every sign-in try and delete. Every form and API route refuses bad input. Check packages for known holes; scan history for leaked keys.

This step is risky: tell me your plan in a few bullets and wait for my OK. Note choices in AGENTS.md, explain in 2–3 sentences, then tell me what to open to see it working, with two users.`,
    check: `Check step 11: sign-in and locks. Don't add features. Use my machine and the test database, never real data.

Add tests that prove:
- in the browser, with two people: A adds a contact; B can't open, change or delete it, in the pages or through the API, and A's contact is unchanged;
- signed out, the contacts page sends you to sign in and the API answers 401;
- the 6th sign-in try in a minute for one email gets a 429; another email still gets in;
- a delete and a sign-in each add one line to the audit log; pages and API answers carry the security rules.

Run all the tests with npm run check and npm run e2e. Then show me what is stored for one user's password (a hash, not the password), and that the sign-in cookie can't be read by page scripts. Then play the attacker: type things like ' OR 1=1 -- and <script>alert(1)</script> into every text field and the CSV import. For each: refused or saved as plain text, and did anything run? Show me the leak scan result and the last 5 audit log lines.

Report back in plain words: a short list of what you checked, each pass or fail, with the real output below it. If something fails, stop and explain it simply; don't fix it quietly. If all pass, add this line to STEPS.md and save the work (commit): "11 security: email sign-in with owners, browser safety rules, sign-in limit, audit log, history scanned".`,
    done: [
      {
        en: "Signed in as a second person, I couldn't open the first person's contact, in the page or in the API",
        he: "כשהתחברתם כאדם שני לא הצלחתם לפתוח את איש הקשר של האדם הראשון, לא בדף ולא ב-API",
      },
      {
        en: "The 6th sign-in try in a minute got a 429",
        he: "ניסיון ההתחברות השישי בתוך דקה קיבל 429",
      },
      {
        en: "When I played the attacker, every trick was saved as plain text and nothing ran",
        he: "כששיחקתם את התוקף, כל טריק נשמר כטקסט רגיל ושום דבר לא רץ",
      },
      {
        en: "The leak scan found nothing, or the leaked key was replaced",
        he: "הסריקה לדליפות לא מצאה כלום, או שהמפתח שדלף הוחלף",
      },
    ],
  },

  pay: {
    title: {
      en: "A Pro plan that takes (test) money",
      he: "מסלול Pro שמקבל כסף (של בדיקה)",
    },
    goal: {
      en: "Free accounts keep up to 50 contacts, and one test-mode payment unlocks Pro. Only a signed webhook grants it, a refund takes it away, and paying twice never buys it twice.",
      he: "חשבון חינמי שומר עד 50 אנשי קשר, ותשלום אחד במצב בדיקה פותח את Pro. רק webhook חתום נותן אותו, החזר כספי לוקח אותו, ותשלום כפול אף פעם לא קונה אותו פעמיים.",
    },
    why: {
      en: "Money is where a shortcut costs the most: a trusted redirect gives the product away, and a missing check charges or grants twice.",
      he: "כסף הוא המקום שבו קיצור דרך עולה הכי הרבה: דף חזרה שסומכים עליו מחלק את המוצר בחינם, ובדיקה חסרה מחייבת או נותנת פעמיים.",
    },
    uses: [
      "hosted-checkout",
      "trust-the-webhook",
      "webhook-signature",
      "entitlement",
      "refunds-and-chargebacks",
      "test-cards-and-declines",
      "idempotency",
      "sandbox-vs-live-keys",
    ],
    build: `Read AGENTS.md and STEPS.md first. This is step 12: a paid Pro plan. Start a new branch for it.

Free accounts keep up to 50 contacts; a one-time Pro purchase removes the limit. I will open a sandbox (test) account with a payment provider that supports my country, such as Stripe test mode or Paddle sandbox. Ask me which one before you start.

Must-haves:
- The provider's hosted checkout takes the card. No card field ever appears in our app.
- The checkout carries the signed-in user's id, so the purchase belongs to that account whatever email is typed.
- Only the provider's webhook grants Pro, after checking its signature on the raw body. The return page proves nothing: it says "confirming your payment" and checks again for a few seconds.
- One purchase row per provider transaction id (unique), so a repeated webhook or a double click changes nothing.
- A refund webhook takes Pro away.
- Sandbox keys and the webhook secret are secrets, set per environment.

Write your choices down in AGENTS.md and explain them to me in 2–3 plain sentences. At the end, tell me in plain words how to buy Pro with a test card.`,
    check: `Check step 12: the Pro plan. Don't add features; never use live keys or a real card.

Add tests, with the provider faked where needed, that prove:
- a webhook with a missing or wrong signature is refused and grants nothing;
- the same paid webhook sent twice creates one purchase;
- opening the return page without paying grants nothing;
- a refund webhook removes Pro, and the 51st contact is refused again;
- nobody can see or change another user's purchase.

Run all the tests with npm run check and npm run e2e. Then buy Pro once in the sandbox with the success test card and once with a declined test card, and show me both results and the purchase row. In two sentences: what happens if the webhook arrives a minute late?

Report back in plain words: a short list of what you checked, each pass or fail, with the real output below it. If something fails, stop and explain it simply; don't fix it quietly. If all pass, add this line to STEPS.md and save the work (commit): "12 pay: Pro plan in sandbox, signed webhook, one purchase per payment, refund removes Pro".`,
    done: [
      {
        en: "A success test card bought Pro, and the 50-contact limit disappeared",
        he: "כרטיס בדיקה מוצלח קנה Pro, ומגבלת 50 אנשי הקשר נעלמה",
      },
      {
        en: "A declined test card left the account on the free plan, with a clear message",
        he: "כרטיס בדיקה שנדחה השאיר את החשבון במסלול החינמי, עם הודעה ברורה",
      },
      {
        en: "A fake webhook, and opening the return page without paying, granted nothing",
        he: "webhook מזויף, ופתיחת דף החזרה בלי לשלם, לא נתנו כלום",
      },
      {
        en: "A refund in the provider's dashboard took Pro away",
        he: "החזר כספי בלוח הבקרה של הספק לקח את Pro בחזרה",
      },
    ],
  },
};
