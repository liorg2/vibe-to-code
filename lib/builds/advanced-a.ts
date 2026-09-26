import type { BuildStep } from "./types";

/** Build track, steps 10–17 (Advanced course, first half). */
export const BUILDS_ADV_A: Record<string, BuildStep> = {
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
      en: "After nine steps of AI edits, the tests are the only thing that notices when an old rule breaks.",
      he: "אחרי תשעה צעדים של עריכות AI, הטסטים הם הדבר היחיד ששם לב כשכלל ישן נשבר.",
    },
    uses: ["regression", "flaky-test", "unit-integration-e2e", "test", "test-first-tdd"],
    build: `Read AGENTS.md and STEPS.md first. This is step 10: tests we can trust. Start a new branch for it.

After nine steps, I want tests that really protect the app.

Must-haves:
- A coverage report: which parts of the app no test ever runs. Keep today's numbers as "before".
- From it, pick the two most important untested business rules (rules, not lines of code), say in one line why each matters, and test them.
- A regression test (it stops an old bug coming back): moving a contact to a stage that doesn't exist is refused, and the contact stays as it was.
- Find browser tests that sometimes pass and sometimes fail (flaky) and fix at least one. Tests wait for the page, not for a fixed number of seconds.
- One command that runs every test and fails if any fails.

Don't change how the app behaves, unless a new test finds a real bug; then tell me. Write your choices down in AGENTS.md and explain them to me in 2–3 plain sentences. At the end, tell me in plain words what to open or click to see it working, and the coverage before and after.`,
    check: `Check step 10: tests we can trust. Don't add features.

- Pick one more untested rule from the coverage report and add a test for it.
- Show me the coverage now next to the "before" numbers.
- Run every test three times in a row (npm run check and npm run e2e each time) and show the totals. A failure in any run means a flaky test: stop and show it.
- Plant a bug on purpose: let a contact take any stage. Show me the regression test failing, then undo the bug and show it passing, with nothing else left changed.
- Tell me in one sentence what made the flaky test flaky.

Report back in plain words: a short list of what you checked, each pass or fail, with the real output below it. If something fails, stop and explain it simply; don't fix it quietly. If all pass, add this line to STEPS.md and save the work (commit): "10 testing: coverage, a regression guard, no flaky tests, one command runs them all".`,
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
    uses: ["authentication-vs-authorization", "session-and-cookie", "https-tls", "environment-variables-secrets"],
    build: `Read AGENTS.md and STEPS.md first. This is step 11: sign-in. Start a new branch for it.

People sign up, sign in and sign out with email and password. Each person only ever sees and changes their own data.

Use a maintained auth library, never your own password cryptography. Before coding, explain in a few lines which of email verification, password recovery, MFA and session revocation are included, and which a production app needs.

Must-haves:
- Passwords are only stored as a hash (a scrambled fingerprint that can't be turned back into the password), and never logged.
- You stay signed in with a cookie that scripts on the page can't read.
- Signed out, nobody can read contacts, not even through the API: the API answers 401 and pages send you to sign in.
- Someone else's contact looks as if it doesn't exist, and the owner check lives in one shared place, not copied into every route.
- Existing contacts go to a first user.

This step is risky: first tell me your plan in a few plain bullets and wait for my OK. Pick the tools yourself, write the choices down in AGENTS.md and explain them to me in 2–3 plain sentences. At the end, tell me in plain words what to open or click to see it working, with two users.`,
    check: `Check step 11: sign-in and owners. Don't add features.

Add tests that prove:
- in the browser, with two people: A adds a contact; B can't open, change or delete it, in the pages or through the API, and A's contact is unchanged;
- signed out, the contacts page sends you to sign in and the API answers 401;
- everything that reads data, used as A, never returns anything of B's, and no page can reach the database without the owner check.
- the README or AGENTS.md states which account recovery protections are and are not implemented; do not describe the exercise as production-ready if they are missing.

Run all the tests with npm run check and npm run e2e. Then show me what is stored for one user's password (it must be a hash, not the password), and show me that the sign-in cookie can't be read by page scripts and is only sent over https in production.

Report back in plain words: a short list of what you checked, each pass or fail, with the real output below it. If something fails, stop and explain it simply; don't fix it quietly. If all pass, add this line to STEPS.md and save the work (commit): "11 auth: email sign-in, every contact has an owner, nobody sees anyone else's".`,
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
    uses: ["threat-model", "security-headers-and-csp", "audit-log", "environment-variables-secrets", "supply-chain-dependencies", "injection-and-validation"],
    build: `Read AGENTS.md and STEPS.md first. This is step 12: security beyond sign-in. Start a new branch for it.

First, a five-line threat model: what here is worth stealing, who wants it, how they would try. Then your plan in a few plain bullets; wait for my OK.

Must-haves:
- Every page tells the browser to block common attacks, like running strangers' scripts or showing our pages inside another site. Try the rules in report-only mode, then switch them on.
- After 5 sign-in tries in a minute for the same email, the app answers 429 (slow down).
- An audit log (a record that is only added to, never edited) of every sign-in try and delete: who, what, when.
- Every form and API route refuses bad input; show me a table of what each refuses.
- Check our packages for known security holes; fix the serious ones. Scan the whole project history for leaked keys; a real leak means I replace that key.

Nothing paid. Write your choices down in AGENTS.md and explain them to me in 2–3 plain sentences. At the end, tell me in plain words what to open or click to see it working.`,
    check: `Check step 12: security beyond sign-in. Don't add features. Use my machine and the test database, never real data.

Add tests that prove:
- the 6th sign-in try in a minute for one email gets a 429; another email still gets in;
- a delete and a sign-in each add one line to the audit log;
- pages and API answers carry the security rules.

Run all the tests with npm run check and npm run e2e, rules switched on; tell me anything they broke. Then play the attacker: type things like ' OR 1=1 -- and <script>alert(1)</script> into every text field. For each: refused or saved as plain text, and did anything run? A crash or a running script is a failure. Show me the leak scan result and the last 5 audit log lines.

Report back in plain words: a short list of what you checked, each pass or fail, with the real output below it. If something fails, stop and explain it simply; don't fix it quietly. If all pass, add this line to STEPS.md and save the work (commit): "12 security: browser safety rules, sign-in limit, audit log, packages and history scanned".`,
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

  apis: {
    title: {
      en: "A test email, through someone else's API",
      he: "מייל בדיקה, דרך ה-API של מישהו אחר",
    },
    goal: {
      en: "A button on a contact sends a real test email through Resend: the sandbox key never leaks, a slow or failing call is retried with backoff and then gives up cleanly, and Resend's delivery webhook, checked for a real signature, updates whether it arrived.",
      he: "כפתור בעמוד של איש קשר שולח מייל בדיקה אמיתי דרך Resend: מפתח ה-sandbox אף פעם לא דולף, קריאה איטית או כושלת מקבלת ניסיון חוזר עם backoff ואז נכשלת בעדינות, וה-webhook של מסירת Resend, אחרי בדיקת חתימה אמיתית, מעדכן אם המייל הגיע.",
    },
    why: {
      en: "Every app eventually calls someone else's API, and it will be slow, it will fail sometimes, and it will call you back. This step builds the one safe way to do that, so the next step can reuse it for something that runs on its own.",
      he: "כל אפליקציה בסוף קוראת ל-API של מישהו אחר, והוא יהיה איטי, ייכשל לפעמים, ויתקשר אליכם בחזרה. השלב הזה בונה את הדרך הבטוחה היחידה לעשות את זה, כדי שהשלב הבא יוכל להשתמש בה שוב למשהו שרץ בעצמו.",
    },
    uses: ["timeouts-and-retries", "api-key-vs-oauth-app", "retry-and-backoff", "webhook", "polling-vs-push", "environment-variables-secrets"],
    build: `Read AGENTS.md and STEPS.md first. This is step 13. Start a new branch for it.

Add a "Send test email" button on a contact's page: it emails that contact's details to my own address, through Resend. I will create a free Resend account; while we test, emails only go to my own address, from Resend's test sender.

Must-haves:
- Call Resend with either its SDK or a raw HTTP request; tell me which you picked and why.
- The API key is a secret: it lives in environment settings, on my machine and later on Vercel, never in the code.
- If Resend is slow or down, give up after a few seconds, try again a couple of times with a short backoff, then show me a calm "couldn't send" message. No retry when Resend says our request itself was wrong.
- Resend calls us back (a webhook) to say the email was delivered or bounced. Only trust calls really signed by Resend; save the result next to that send.
- It works on Vercel's free plan.

Note your choices in AGENTS.md and explain them in 2–3 plain sentences. Then tell me in plain words what to open or click to see it working.`,
    check: `Check step 13. Don't add features; never use a live key.

Add tests, with Resend faked so nothing is really sent, that prove:
- clicking send calls Resend once and records the attempt;
- when Resend never answers, the app tries 3 times with backoff, then shows the calm failure message;
- when Resend says our request was wrong, there is no retry;
- a webhook call with a missing or fake signature is refused and changes nothing; a real one updates the send's status.

Run all the tests with npm run check. Then click the button yourself, show me the real email arriving in my inbox and its status afterwards, and confirm the key is nowhere in the code or its history. In two sentences: what would you change if this had to send a thousand emails, not one?

Report back in plain words: a short list of what you checked, each pass or fail, with the real output below it. If something fails, stop and explain it simply; don't fix it quietly. If all pass, add this line to STEPS.md and save the work (commit): "13 apis: a real email through Resend, safe retries, signed webhook".`,
    done: [
      {
        en: "A real test email arrived in my inbox from Resend's test sender",
        he: "מייל בדיקה אמיתי הגיע לתיבה שלכם מהשולח לבדיקות של Resend",
      },
      {
        en: "A wrong or missing webhook signature was refused; a real one updated the status",
        he: "חתימת webhook שגויה או חסרה נדחתה; חתימה אמיתית עדכנה את הסטטוס",
      },
      {
        en: "The AI explained why it picked the SDK or a raw HTTP call",
        he: "ה-AI הסביר למה הוא בחר ב-SDK או בקריאת HTTP גולמית",
      },
      {
        en: "The key is only in my environment settings, never in the code",
        he: "המפתח נמצא רק בהגדרות הסביבה שלכם, אף פעם לא בקוד",
      },
    ],
  },

  async: {
    title: {
      en: "Follow-up reminders that run on a schedule",
      he: "תזכורות מעקב שרצות לפי לוח זמנים",
    },
    goal: {
      en: "Every day the app finds who is due for a follow-up, creates exactly one reminder for each of them, and emails it using the Resend setup from the previous step, even if the daily check runs twice.",
      he: "כל יום האפליקציה מוצאת למי הגיע זמן מעקב, יוצרת לכל אחד תזכורת אחת בדיוק, ושולחת אותה במייל בעזרת ה-Resend מהשלב הקודם, גם אם הבדיקה היומית רצה פעמיים.",
    },
    why: {
      en: "Reminders are work nobody waits for: they run on a timetable, in the background, and must be safe to run twice. Reusing last step's email integration, instead of building a second one, keeps that safety in one place.",
      he: "תזכורות הן עבודה שאף אחד לא מחכה לה מול המסך: הן רצות לפי לוח זמנים, ברקע, וחייבות להיות בטוחות גם אם הן רצות פעמיים. שימוש חוזר באינטגרציית המייל מהשלב הקודם, במקום לבנות אחת נוספת, שומר על הבטיחות הזאת במקום אחד.",
    },
    uses: ["scheduled-job-cron", "background-job", "sync-vs-async-work", "retry-and-backoff", "idempotency", "environment-variables-secrets"],
    build: `Read AGENTS.md and STEPS.md first. This is step 14: follow-up reminders. Start a new branch for it.

Each contact gets an optional "follow up on" date. Once a day the app checks on its own who is due and creates a reminder for each of them, then emails it using the Resend integration from step 13 instead of building a new one. This is a cron job: work that runs in the background on a timetable, with nobody waiting for it.

Must-haves:
- Each due contact gets exactly one reminder and one email per day, even if the job runs twice or two runs overlap. The database itself guarantees it.
- Only our scheduler can start the job. It needs a secret; anyone else gets a 401 and nothing happens. The secret lives in the environment settings, never in the code.
- It works on Vercel's free plan.
- No new tools, and no second way of sending email — reuse step 13's.

This changes the database, so first tell me your plan in a few plain bullets and wait for my OK. Write your choices down in AGENTS.md and explain them to me in 2–3 plain sentences. At the end, tell me in plain words what to open or click to see it working.`,
    check: `Check step 14: follow-up reminders. Don't add features.

Add tests, against the test database and never the real one, with Resend faked so nothing is really sent, that prove:
- a contact due today gets exactly one reminder and one email, even when the job runs twice, or twice at the same moment;
- a contact due tomorrow, or with no follow-up date, gets none;
- a missing or wrong secret gets a 401 and creates nothing.

Run all the tests with npm run check. Then run the job twice yourself and once with a wrong secret, and show me how many reminders and emails each contact has.

Report back in plain words: a short list of what you checked, each pass or fail, with the real output below it. If something fails, stop and explain it simply; don't fix it quietly. If all pass, add this line to STEPS.md and save the work (commit): "14 async: daily follow-up reminders, one email per contact per day, reusing step 13's Resend setup".`,
    done: [
      {
        en: "The job ran twice and each due contact still had one reminder and one email, not two",
        he: "המשימה רצה פעמיים ולכל איש קשר שהגיע זמנו עדיין הייתה תזכורת אחת ומייל אחד, לא שניים",
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
    uses: ["hosted-checkout", "trust-the-webhook", "entitlement", "refunds-and-chargebacks", "test-cards-and-declines", "idempotency", "api-key-vs-oauth-app"],
    build: `Read AGENTS.md and STEPS.md first. This is step 15: a paid Pro plan. Start a new branch for it.

Free accounts keep up to 50 contacts; a one-time Pro purchase removes the limit. I will open a sandbox (test) account with a payment provider that supports my country, such as Stripe test mode or Paddle sandbox. Ask me which one before you start.

Must-haves:
- The provider's hosted checkout takes the card. No card field ever appears in our app.
- The checkout carries the signed-in user's id, so the purchase belongs to that account whatever email is typed.
- Only the provider's webhook grants Pro, after checking its signature on the raw body. The return page proves nothing: it says "confirming your payment" and checks again for a few seconds.
- One purchase row per provider transaction id (unique), so a repeated webhook or a double click changes nothing.
- A refund webhook takes Pro away.
- Sandbox keys and the webhook secret are secrets, set per environment.

Write your choices down in AGENTS.md and explain them to me in 2–3 plain sentences. At the end, tell me in plain words how to buy Pro with a test card.`,
    check: `Check step 15: the Pro plan. Don't add features; never use live keys or a real card.

Add tests, with the provider faked where needed, that prove:
- a webhook with a missing or wrong signature is refused and grants nothing;
- the same paid webhook sent twice creates one purchase;
- opening the return page without paying grants nothing;
- a refund webhook removes Pro, and the 51st contact is refused again;
- nobody can see or change another user's purchase.

Run all the tests with npm run check and npm run e2e. Then buy Pro once in the sandbox with the success test card and once with a declined test card, and show me both results and the purchase row. In two sentences: what happens if the webhook arrives a minute late?

Report back in plain words: a short list of what you checked, each pass or fail, with the real output below it. If something fails, stop and explain it simply; don't fix it quietly. If all pass, add this line to STEPS.md and save the work (commit): "15 pay: Pro plan in sandbox, signed webhook, one purchase per payment, refund removes Pro".`,
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
    uses: ["ram-vs-disk", "data-structures", "latency-vs-throughput", "pagination", "transaction"],
    build: `Read AGENTS.md and STEPS.md first. This is step 16: importing lots of contacts. Start a new branch for it.

On the contacts page I can upload a CSV file (a spreadsheet saved as plain text) and all its contacts get added, owned by me, the signed-in user, exactly like a contact I add by hand.

Must-haves:
- A file of 5,000 or even 50,000 rows works without the app running out of memory. Read it a bit at a time, never the whole file at once.
- A bad row or a duplicate email is skipped, not fatal. At the end I see how many were imported and the skipped rows, each with its line number and the reason.
- The contacts list shows 50 at a time with a "Load more" button, and every page is as fast as the first, however many contacts there are.
- Give me a way to make a test file of fake contacts, with a few bad rows in it.

Pick the tools yourself, write the choices down in AGENTS.md and explain them to me in 2–3 plain sentences. At the end, tell me in plain words what to open or click to see it working.`,
    check: `Check step 16: importing lots of contacts. Don't add features.

Add tests, against the test database and never the real one, that prove:
- a 20-row file with 3 bad rows imports 17 and lists those 3 with their line numbers;
- paging works with no contacts, exactly 50 and 51, and no contact appears twice or goes missing across pages;
- a later page needs as many database requests as the first one, not more;
- importing while signed out is refused with a 401, and imported contacts belong to the signed-in user, not anyone else.

Run all the tests with npm run check and npm run e2e. Then import a 5,000-row test file and tell me how long it took and the most memory the app used. Would that memory grow with a 50,000-row file? One sentence.

Report back in plain words: a short list of what you checked, each pass or fail, with the real output below it. If something fails, stop and explain it simply; don't fix it quietly. If all pass, add this line to STEPS.md and save the work (commit): "16 memory: big CSV import in small batches, list loads 50 at a time, owned by the importer".`,
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

  scale: {
    title: { en: "Ready for more than one of everything", he: "מוכנים ליותר מאחד מכל דבר" },
    goal: {
      en: "The home page shows a stage-by-stage dashboard from a cache that refreshes the moment anything changes, the app holds up when many people use it at once, a double-click creates one contact, and a load test proved one database index was worth adding.",
      he: "דף הבית מציג דשבורד לפי שלב מ-cache שמתרענן ברגע שמשהו משתנה, האפליקציה מחזיקה מעמד כשהרבה אנשים משתמשים בה בבת אחת, לחיצה כפולה יוצרת איש קשר אחד, ובדיקת עומס הוכיחה שאינדקס אחד במסד הנתונים שווה הוספה.",
    },
    why: {
      en: "A cache is only useful if you know when to throw it away, and Vercel runs many copies of your app at once. Anything one copy remembers on its own, counts twice, or does twice becomes a bug under real traffic.",
      he: "cache שווה משהו רק אם יודעים מתי לזרוק אותו, ו-Vercel מריצה הרבה עותקים של האפליקציה שלכם בבת אחת. כל דבר שעותק אחד זוכר לבד, סופר פעמיים, או עושה פעמיים, הופך לבאג כשיש תנועה אמיתית.",
    },
    uses: ["cache", "invalidation", "rate-limiting", "idempotency", "stateless", "scaling-up-vs-out", "latency-vs-throughput", "query"],
    build: `Read AGENTS.md and STEPS.md first. This is step 17. Start a new branch for it. This touches the database, so first tell me your plan in a few plain bullets and wait for my OK.

Turn the home page into a small dashboard, and get the app ready for many copies running at once.

- The home page shows how many contacts are in each stage (lead, qualified, won, lost) and the total. Counting on every visit is wasted work, so keep the numbers in a cache: a saved copy of an answer, counted at most once a minute. The moment a contact is added, changed, deleted or imported, the saved numbers are thrown away, so the dashboard is never wrong.
- Stateless: the app keeps nothing in its own memory between requests; anything it must remember goes in the database, since each request may land on a different copy.
- Rate limiting: one person (or address, if signed out) gets about 100 requests a minute; past that, 429 and when to retry. Never limit the health check.
- A double-click on Save creates one contact, not two.
- A load test: flood a preview copy, never the live site, for 30 seconds and record how slow the slowest requests got. Add one index where it helps most, and test again.

Show me both "slowest requests" numbers and how to tell a fresh dashboard count from a cached one, then tell me in plain words what to open or click to see it working.`,
    check: `Check step 17. Don't add features.

Add tests that prove: the counts are right for a known set of contacts and adding, changing, deleting or importing one throws them away; the same new contact sent twice with the same key creates one contact and the same answer, and two people can use the same key without clashing; the 101st request in a minute gets 429 and the next minute is allowed again; the health check is never limited.

Run all the tests with npm run check. Then show me the proof:
- on a production build, the first dashboard visit counts and the next ones use the cache, with the timing for each;
- switch off the throwing away for a moment, show the dashboard going stale, then put it back exactly as it was;
- search the code for anything kept in memory between requests, and explain each hit;
- on the preview, double-click Save on a new contact and show the database holds one;
- the load test numbers from both runs, before and after the index.

Report back in plain words: what you checked, pass or fail, with the real output below. If anything fails, stop and explain it simply; don't fix it silently. If all is green, add a line to STEPS.md ("17 scale: dashboard counts cached, nothing kept in memory, rate limit, double-click safe, load-tested index") and commit.`,
    done: [
      {
        en: "I added a contact and the dashboard count went up on the next load, after the cache refreshed",
        he: "הוספתם איש קשר והמספר בדשבורד עלה בטעינה הבאה, אחרי שה-cache התרענן",
      },
      {
        en: "A double-click on Save created exactly one contact",
        he: "לחיצה כפולה על Save יצרה בדיוק איש קשר אחד",
      },
      {
        en: "The 101st request in a minute got a 429 \"too many requests\"",
        he: "הבקשה ה-101 בתוך דקה קיבלה 429 \"יותר מדי בקשות\"",
      },
      {
        en: "The load test page shows the slowest-request time before and after the index",
        he: "דף בדיקת העומס מראה את זמן הבקשות האיטיות ביותר לפני האינדקס ואחריו",
      },
    ],
  },
};
