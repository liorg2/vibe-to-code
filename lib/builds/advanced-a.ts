import type { BuildStep } from "./types";

/** Build track, steps 08–14 (Advanced course, first half). */
export const BUILDS_ADV_A: Record<string, BuildStep> = {
  async: {
    title: {
      en: "Follow-up reminders that run on a schedule",
      he: "תזכורות מעקב שרצות לפי לוח זמנים",
    },
    goal: {
      en: "Every day the app checks who is due for a follow-up and creates exactly one reminder for each of them, even if the daily check runs twice.",
      he: "כל יום האפליקציה בודקת למי הגיע זמן מעקב ויוצרת לכל אחד תזכורת אחת בדיוק, גם אם הבדיקה היומית רצה פעמיים.",
    },
    why: {
      en: "Reminders are work nobody waits for: they run on a timetable, in the background, and must be safe to run twice.",
      he: "תזכורות הן עבודה שאף אחד לא מחכה לה מול המסך: הן רצות לפי לוח זמנים, ברקע, וחייבות להיות בטוחות גם אם הן רצות פעמיים.",
    },
    uses: [
      "scheduled-job-cron",
      "background-job",
      "sync-vs-async-work",
      "retry-and-backoff",
      "idempotency",
      "environment-variables-secrets",
    ],
    build: `Read AGENTS.md and STEPS.md first. This is step 8: follow-up reminders. Start a new branch for it.

Each contact gets an optional "follow up on" date. Once a day the app checks on its own who is due and creates a reminder for each of them. This is a cron job: work that runs in the background on a timetable, with nobody waiting for it.

Must-haves:
- Each due contact gets exactly one reminder per day, even if the job runs twice or two runs overlap. The database itself guarantees it.
- Only our scheduler can start the job. It needs a secret; anyone else gets a 401 and nothing happens. The secret lives in the environment settings, never in the code.
- It works on Vercel's free plan.
- No emails yet (that is step 11), and no new tools.

This changes the database, so first tell me your plan in a few plain bullets and wait for my OK. Write your choices down in AGENTS.md and explain them to me in 2–3 plain sentences. At the end, tell me in plain words what to open or click to see it working.`,
    check: `Check step 8: follow-up reminders. Don't add features.

Add tests, against the test database and never the real one, that prove:
- a contact due today gets exactly one reminder, even when the job runs twice, or twice at the same moment;
- a contact due tomorrow, or with no follow-up date, gets none;
- a missing or wrong secret gets a 401 and creates nothing.

Run all the tests with npm run check and npm run e2e. Then run the job twice yourself and once with a wrong secret, and show me how many reminders each contact has.

Report back in plain words: a short list of what you checked, each pass or fail, with the real output below it. If something fails, stop and explain it simply; don't fix it quietly. If all pass, add this line to STEPS.md and save the work (commit): "08 async: daily follow-up reminders, one per contact per day".`,
    done: [
      {
        en: "The job ran twice and each due contact still had one reminder, not two",
        he: "המשימה רצה פעמיים ולכל איש קשר שהגיע זמנו עדיין הייתה תזכורת אחת, לא שתיים",
      },
      {
        en: "A wrong secret got a 401 and created nothing",
        he: "סוד שגוי קיבל 401 ולא נוצר כלום",
      },
      {
        en: "A contact due tomorrow has no reminder yet",
        he: "לאיש קשר שמועד המעקב שלו מחר אין עדיין תזכורת",
      },
      {
        en: "The secret is set in Vercel, not written in the code",
        he: "הסוד מוגדר ב-Vercel ולא כתוב בקוד",
      },
    ],
  },

  memory: {
    title: {
      en: "Import 5,000 contacts without running out of memory",
      he: "ייבוא 5,000 אנשי קשר בלי שהזיכרון ייגמר",
    },
    goal: {
      en: "You can import a file of thousands of contacts: bad rows are listed instead of breaking the import, and the list loads 50 at a time and stays fast.",
      he: "אפשר לייבא קובץ עם אלפי אנשי קשר: שורות פגומות מוצגות ברשימה במקום להפיל את הייבוא, והרשימה נטענת 50 בכל פעם ונשארת מהירה.",
    },
    why: {
      en: "Big files are where memory and speed stop being theory: reading a little at a time keeps memory flat, and one request to the database instead of one per row keeps the page fast.",
      he: "קבצים גדולים הם המקום שבו זיכרון ומהירות מפסיקים להיות תיאוריה: קריאה של קצת בכל פעם שומרת על הזיכרון יציב, ובקשה אחת למסד הנתונים במקום בקשה לכל שורה שומרת על הדף מהיר.",
    },
    uses: ["ram-vs-disk", "big-o", "latency-vs-throughput", "memory-leak", "pagination", "transaction"],
    build: `Read AGENTS.md and STEPS.md first. This is step 9: importing lots of contacts. Start a new branch for it.

On the contacts page I can upload a CSV file (a spreadsheet saved as plain text) and all its contacts get added.

Must-haves:
- A file of 5,000 or even 50,000 rows works without the app running out of memory. Read it a bit at a time, never the whole file at once.
- A bad row or a duplicate email is skipped, not fatal. At the end I see how many were imported and the skipped rows, each with its line number and the reason.
- The contacts list shows 50 at a time with a "Load more" button, and every page is as fast as the first, however many contacts there are.
- Give me a way to make a test file of fake contacts, with a few bad rows in it.

Pick the tools yourself, write the choices down in AGENTS.md and explain them to me in 2–3 plain sentences. At the end, tell me in plain words what to open or click to see it working.`,
    check: `Check step 9: importing lots of contacts. Don't add features.

Add tests, against the test database and never the real one, that prove:
- a 20-row file with 3 bad rows imports 17 and lists those 3 with their line numbers;
- paging works with no contacts, exactly 50 and 51, and no contact appears twice or goes missing across pages;
- a later page needs as many database requests as the first one, not more.

Run all the tests with npm run check and npm run e2e. Then import a 5,000-row test file and tell me how long it took and the most memory the app used. Would that memory grow with a 50,000-row file? One sentence.

Report back in plain words: a short list of what you checked, each pass or fail, with the real output below it. If something fails, stop and explain it simply; don't fix it quietly. If all pass, add this line to STEPS.md and save the work (commit): "09 memory: big CSV import in small batches, list loads 50 at a time".`,
    done: [
      {
        en: "I imported 5,000 contacts and saw how long it took and how much memory it used",
        he: "ייבאתם 5,000 אנשי קשר וראיתם כמה זמן זה לקח וכמה זיכרון זה צרך",
      },
      {
        en: "The 20-row file imported 17 rows and listed the 3 bad ones with a reason",
        he: "הקובץ עם 20 השורות ייבא 17 והציג את 3 השורות הפגומות עם סיבה",
      },
      {
        en: "Load more was as quick on the third page as on the first",
        he: "Load more היה מהיר בעמוד השלישי בדיוק כמו בראשון",
      },
    ],
  },

  cache: {
    title: {
      en: "A dashboard that does not recount on every visit",
      he: "דשבורד שלא סופר מחדש בכל כניסה",
    },
    goal: {
      en: "The home page shows how many contacts are in each stage. The numbers are kept ready in a cache and refresh the moment a contact changes.",
      he: "דף הבית מציג כמה אנשי קשר יש בכל שלב. המספרים שמורים מוכנים בקאש ומתעדכנים ברגע שאיש קשר משתנה.",
    },
    why: {
      en: "A cache is only useful if you also know when to throw it away. This step does both, and shows what goes stale without the second half.",
      he: "קאש שווה משהו רק אם יודעים גם מתי לזרוק אותו. הצעד הזה עושה את שניהם, ומראה מה מתיישן כשהחצי השני חסר.",
    },
    uses: ["cache", "hit-miss", "ttl", "invalidation", "browser-cache", "cdn"],
    build: `Read AGENTS.md and STEPS.md first. This is step 10: a dashboard with a cache. Start a new branch for it.

The home page becomes a small dashboard: how many contacts are in each stage (lead, qualified, won, lost) and the total. Counting on every visit is wasted work, so keep the numbers in a cache: a saved copy of an answer, so we don't work it out again each time.

Must-haves:
- The numbers are counted at most once a minute, not on every visit.
- The moment a contact is added, changed, deleted or imported, the saved numbers are thrown away, so the dashboard is never wrong.
- Files that never change, like images and scripts, are kept by the browser for a long time. Pages and API answers with contact data are never kept by the browser or anyone in between.
- Use what Next.js already offers. No new tools.

Write your choices down in AGENTS.md and explain them to me in 2–3 plain sentences. At the end, tell me in plain words what to open or click to see it working, and how to tell a fresh count from a cached one.`,
    check: `Check step 10: a dashboard with a cache. Don't add features.

Add tests that prove:
- the counts are right for a known set of contacts in the test database;
- adding, changing, deleting or importing a contact throws the saved numbers away;
- in the browser: add a contact, open the home page, and its stage count went up by one.

Run all the tests with npm run check and npm run e2e. Then, on a production build, show me that the first visit counts and the next ones use the cache, and how long each took. Show what the browser is told to keep for a fixed file and for the contacts API. Last, switch off the throwing away for a moment, show me the dashboard going stale, then put it back exactly as it was.

Report back in plain words: a short list of what you checked, each pass or fail, with the real output below it. If something fails, stop and explain it simply; don't fix it quietly. If all pass, add this line to STEPS.md and save the work (commit): "10 cache: stage counts cached, refreshed on every change".`,
    done: [
      {
        en: "I added a contact and the dashboard count went up on the next load",
        he: "הוספתם איש קשר והמספר בדשבורד עלה בטעינה הבאה",
      },
      {
        en: "The first visit counted, and the next ones were faster",
        he: "הכניסה הראשונה ספרה, והכניסות הבאות היו מהירות יותר",
      },
      {
        en: "Fixed files are kept by the browser; contact data never is",
        he: "קבצים קבועים נשמרים בדפדפן; נתוני אנשי קשר אף פעם לא",
      },
      {
        en: "I saw the dashboard go stale when the refresh was switched off, and I can say why",
        he: "ראיתם את הדשבורד מתיישן כשהרענון כובה, ואתם יכולים להסביר למה",
      },
    ],
  },

  apis: {
    title: {
      en: "Reminders become real emails",
      he: "התזכורות הופכות למיילים אמיתיים",
    },
    goal: {
      en: "Each due reminder goes out as a real email through Resend in test mode. A slow or failing email service breaks nothing, and the app records whether each email arrived.",
      he: "כל תזכורת שהגיע זמנה יוצאת כמייל אמיתי דרך Resend במצב בדיקה. שירות מייל איטי או תקוע לא שובר כלום, והאפליקציה רושמת אם כל מייל הגיע.",
    },
    why: {
      en: "Your first dependency on someone else's API: it will be slow, it will fail, and it will call you back. The app has to expect all three.",
      he: "התלות הראשונה שלכם ב-API של מישהו אחר: הוא יהיה איטי, הוא ייכשל, והוא יפנה אליכם בחזרה. האפליקציה צריכה לצפות לשלושתם.",
    },
    uses: [
      "timeouts-and-retries",
      "sandbox-vs-live-keys",
      "sdk-vs-raw-http",
      "polling-vs-push",
      "webhook",
      "retry-and-backoff",
    ],
    build: `Read AGENTS.md and STEPS.md first. This is step 11: reminder emails. Start a new branch for it.

The reminders from step 8 now go out as real emails through Resend. I will create a free Resend account. While we test, emails only go to my own address, from Resend's test sender.

Must-haves:
- The Resend API key is a secret: it lives in the environment settings on my machine and on Vercel, never in the code.
- If Resend is slow or down, the app gives up after a few seconds, tries again a couple of times, then marks the reminder as failed. No retry when Resend says our request was wrong.
- A reminder is never emailed twice, even after a retry or a second daily run.
- Resend calls us back (a webhook) to say an email was delivered or bounced. We only trust calls really signed by Resend, and save the result on the reminder.

Write your choices down in AGENTS.md and explain them to me in 2–3 plain sentences. At the end, tell me in plain words what to open or click to see it working.`,
    check: `Check step 11: reminder emails. Don't add features; never use a live key.

Add tests, with Resend faked so nothing is really sent, that prove:
- when Resend never answers, the app tries 3 times, then marks the reminder failed with the reason;
- when Resend fails once, then works, the email is sent;
- when Resend says our request was wrong, there is no retry;
- a reminder is never sent twice;
- a webhook call with a missing or fake signature is refused and changes nothing; a real one updates the reminder.

Run all the tests with npm run check and npm run e2e. Then send one real test reminder to my inbox, show me its status, and confirm the API key is nowhere in the code or its history. In two sentences: what if Resend is down all day?

Report back in plain words: a short list of what you checked, each pass or fail, with the real output below it. If something fails, stop and explain it simply; don't fix it quietly. If all pass, add this line to STEPS.md and save the work (commit): "11 apis: reminder emails via Resend, safe retries, signed webhook".`,
    done: [
      {
        en: "A real reminder email arrived in my inbox from Resend's test sender",
        he: "מייל תזכורת אמיתי הגיע לתיבה שלכם מהשולח לבדיקות של Resend",
      },
      {
        en: "The tests showed a silent Resend tried 3 times and then marked failed, and a wrong request not retried",
        he: "הטסטים הראו שכש-Resend לא עונה יש 3 ניסיונות ואז סימון ככישלון, ושבקשה שגויה לא נשלחת שוב",
      },
      {
        en: "A fake webhook call was refused; a real one updated the reminder",
        he: "קריאת webhook מזויפת נדחתה; קריאה אמיתית עדכנה את התזכורת",
      },
      {
        en: "The API key is only in my environment settings and in Vercel, never in the code",
        he: "מפתח ה-API נמצא רק בהגדרות הסביבה שלכם וב-Vercel, אף פעם לא בקוד",
      },
    ],
  },

  testing: {
    title: {
      en: "Tests you can trust",
      he: "טסטים שאפשר לסמוך עליהם",
    },
    goal: {
      en: "One command runs every test, a coverage report shows what is still untested, and all the tests pass three times in a row with no random failures.",
      he: "פקודה אחת מריצה את כל הטסטים, דוח כיסוי מראה מה עדיין לא נבדק, וכל הטסטים עוברים שלוש פעמים ברצף בלי כישלונות אקראיים.",
    },
    why: {
      en: "After eleven steps of AI edits, the tests are the only thing that notices when an old rule breaks.",
      he: "אחרי אחד-עשר צעדים של עריכות AI, הטסטים הם הדבר היחיד ששם לב כשכלל ישן נשבר.",
    },
    uses: ["coverage", "regression", "flaky-test", "unit-integration-e2e", "assertion", "test-first-tdd"],
    build: `Read AGENTS.md and STEPS.md first. This is step 12: tests we can trust. Start a new branch for it.

After eleven steps, I want tests that really protect the app.

Must-haves:
- A coverage report: which parts of the app no test ever runs. Keep today's numbers as "before".
- From it, pick the two most important untested business rules (rules, not lines of code), say in one line why each matters, and test them.
- A regression test (it stops an old bug coming back): moving a contact to a stage that doesn't exist is refused, and the contact stays as it was.
- Find browser tests that sometimes pass and sometimes fail (flaky) and fix at least one. Tests wait for the page, not for a fixed number of seconds.
- One command that runs every test and fails if any fails.

Don't change how the app behaves, unless a new test finds a real bug; then tell me. Write your choices down in AGENTS.md and explain them to me in 2–3 plain sentences. At the end, tell me in plain words what to open or click to see it working, and the coverage before and after.`,
    check: `Check step 12: tests we can trust. Don't add features.

- Pick one more untested rule from the coverage report and add a test for it.
- Show me the coverage now next to the "before" numbers.
- Run every test three times in a row (npm run check and npm run e2e each time) and show the totals. A failure in any run means a flaky test: stop and show it.
- Plant a bug on purpose: let a contact take any stage. Show me the regression test failing, then undo the bug and show it passing, with nothing else left changed.
- Tell me in one sentence what made the flaky test flaky.

Report back in plain words: a short list of what you checked, each pass or fail, with the real output below it. If something fails, stop and explain it simply; don't fix it quietly. If all pass, add this line to STEPS.md and save the work (commit): "12 testing: coverage, a regression guard, no flaky tests, one command runs them all".`,
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
        en: "All the tests passed three times in a row",
        he: "כל הטסטים עברו שלוש פעמים ברצף",
      },
    ],
  },

  auth: {
    title: {
      en: "Sign-in, and every row has an owner",
      he: "התחברות, ולכל שורה יש בעלים",
    },
    goal: {
      en: "People sign up and sign in with email and password, and each of them sees only their own contacts, in the pages and through the API.",
      he: "אנשים נרשמים ומתחברים עם מייל וסיסמה, וכל אחד רואה רק את אנשי הקשר שלו, גם בדפים וגם ב-API.",
    },
    why: {
      en: "Authentication (signing in) says who you are; authorization decides what you may see and change. This step builds both.",
      he: "אותנטיקציה (התחברות) אומרת מי אתם; הרשאות קובעות מה מותר לכם לראות ולשנות. הצעד הזה בונה את שתיהן.",
    },
    uses: [
      "authentication-vs-authorization",
      "session-and-cookie",
      "hashing-vs-encryption",
      "environment-variables-secrets",
      "owasp-top-10",
    ],
    build: `Read AGENTS.md and STEPS.md first. This is step 13: sign-in. Start a new branch for it.

People sign up, sign in and sign out with email and password. Each person only ever sees and changes their own data.

Must-haves:
- Passwords are only stored as a hash (a scrambled fingerprint that can't be turned back into the password), and never logged.
- You stay signed in with a cookie that scripts on the page can't read.
- Signed out, nobody can read contacts, not even through the API: the API answers 401 and pages send you to sign in.
- Someone else's contact looks as if it doesn't exist, and the owner check is hard to forget in future pages.
- Existing contacts go to a first user. The daily reminder job and the Resend webhook still work.

This step is risky: first tell me your plan in a few plain bullets and wait for my OK. Pick the tools yourself, write the choices down in AGENTS.md and explain them to me in 2–3 plain sentences. At the end, tell me in plain words what to open or click to see it working, with two users.`,
    check: `Check step 13: sign-in and owners. Don't add features.

Add tests that prove:
- in the browser, with two people: A adds a contact; B can't open, change or delete it, in the pages or through the API, and A's contact is unchanged;
- signed out, the contacts page sends you to sign in and the API answers 401;
- everything that reads data, used as A, never returns anything of B's, and no page can reach the database without the owner check.

Run all the tests with npm run check and npm run e2e. Then show me what is stored for one user's password (it must be a hash, not the password), and show me that the sign-in cookie can't be read by page scripts and is only sent over https in production.

Report back in plain words: a short list of what you checked, each pass or fail, with the real output below it. If something fails, stop and explain it simply; don't fix it quietly. If all pass, add this line to STEPS.md and save the work (commit): "13 auth: email sign-in, every contact has an owner, nobody sees anyone else's".`,
    done: [
      {
        en: "Signed in as a second person, I couldn't open the first person's contact, in the page or in the API",
        he: "כשהתחברתם כאדם שני לא הצלחתם לפתוח את איש הקשר של האדם הראשון, לא בדף ולא ב-API",
      },
      {
        en: "Signed out, the API answered 401 and the pages sent me to sign in",
        he: "בלי התחברות ה-API ענה 401 והדפים העבירו אתכם להתחברות",
      },
      {
        en: "The database holds a password hash, not the password",
        he: "במסד הנתונים שמור hash של הסיסמה, לא הסיסמה עצמה",
      },
      {
        en: "I was shown that scripts on the page can't read the sign-in cookie",
        he: "הראו לכם שסקריפטים בדף לא יכולים לקרוא את ה-cookie של ההתחברות",
      },
    ],
  },

  security: {
    title: {
      en: "Lock the rest of the building",
      he: "לנעול את שאר הבניין",
    },
    goal: {
      en: "The app tells the browser to block common attacks, slows down password guessing, keeps a log of sign-ins and deletes that can't be edited, and has no known-vulnerable package or leaked secret.",
      he: "האפליקציה אומרת לדפדפן לחסום התקפות נפוצות, מאטה ניחוש סיסמאות, שומרת יומן של התחברויות ומחיקות שאי אפשר לערוך, ואין בה חבילה עם חולשה ידועה או סוד שדלף.",
    },
    why: {
      en: "Sign-in was the front door. This is the lesson's checklist for everything behind it, run against your own app.",
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
    build: `Read AGENTS.md and STEPS.md first. This is step 14: security beyond sign-in. Start a new branch for it.

First, a five-line threat model: what here is worth stealing, who wants it, how they would try. Then your plan in a few plain bullets; wait for my OK.

Must-haves:
- Every page tells the browser to block common attacks, like running strangers' scripts or showing our pages inside another site. Try the rules in report-only mode, then switch them on.
- After 5 sign-in tries in a minute for the same email, the app answers 429 (slow down).
- An audit log (a record that is only added to, never edited) of every sign-in try and delete: who, what, when.
- Every form and API route refuses bad input; show me a table of what each refuses.
- Check our packages for known security holes; fix the serious ones. Scan the whole project history for leaked keys; a real leak means I replace that key.

Nothing paid. Write your choices down in AGENTS.md and explain them to me in 2–3 plain sentences. At the end, tell me in plain words what to open or click to see it working.`,
    check: `Check step 14: security beyond sign-in. Don't add features. Use my machine and the test database, never real data.

Add tests that prove:
- the 6th sign-in try in a minute for one email gets a 429; another email still gets in;
- a delete and a sign-in each add one line to the audit log;
- pages and API answers carry the security rules.

Run all the tests with npm run check and npm run e2e, rules switched on; tell me anything they broke. Then play the attacker: type things like ' OR 1=1 -- and <script>alert(1)</script> into every text field and the CSV import. For each: refused or saved as plain text, and did anything run? A crash or a running script is a failure. Show me the leak scan result and the last 5 audit log lines.

Report back in plain words: a short list of what you checked, each pass or fail, with the real output below it. If something fails, stop and explain it simply; don't fix it quietly. If all pass, add this line to STEPS.md and save the work (commit): "14 security: browser safety rules, sign-in limit, audit log, packages and history scanned".`,
    done: [
      {
        en: "The 6th sign-in try in a minute got a 429",
        he: "ניסיון ההתחברות השישי בתוך דקה קיבל 429",
      },
      {
        en: "I was shown the security rules on every page",
        he: "הראו לכם את כללי האבטחה בכל דף",
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
};
