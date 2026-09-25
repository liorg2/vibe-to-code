import type { BuildStep } from "./types";

/** Build track, Basic course: lessons 1–7, from an empty folder to a live CRM on Postgres. */
export const BUILDS_BASIC: Record<string, BuildStep> = {
  ground: {
    title: { en: "From an empty folder to a running app", he: "מתיקייה ריקה לאפליקציה שרצה" },
    goal: {
      en: "Pocket CRM opens in your browser on your own computer, with one passing test and the house rules written down.",
      he: "Pocket CRM נפתח בדפדפן על המחשב שלכם, עם טסט אחד שעובר וחוקי הבית כתובים בקובץ.",
    },
    why: {
      en: "Code is just text, something has to run it, and the terminal is where you watch that happen. This step makes all three real.",
      he: "קוד הוא בסך הכול טקסט, משהו צריך להריץ אותו, והטרמינל הוא המקום שבו רואים את זה קורה. הצעד הזה הופך את שלושתם למשהו מוחשי.",
    },
    uses: ["source-code", "runtime", "terminal-cli", "environment", "bug-stack-trace", "test", "assertion"],
    build: `I'm not a developer: you run every command. This is step 1 of Pocket CRM, a small app for tracking the people I work with.

- Start a new Next.js app in this empty folder, called pocket-crm. The home page shows only the title "Pocket CRM".
- Add a tiny helper that joins a first and last name into a full name, with one test.
- Add one command, npm run check, that runs every check.
- Create AGENTS.md with house rules for every step: read AGENTS.md and STEPS.md first; run all tests before calling a step done and show the real output; one branch per step once we have Git; small changes, no unrelated files; ask before adding a tool; no passwords or keys in code; never merge to main or deploy to production until I have reviewed the preview and approved; never test against production data or live credentials. Add a short "Stack" section listing your tools.
- Create STEPS.md with the heading "Steps". Each finished step adds one line.

Explain your tool choices in 2–3 plain sentences. Then start the app with npm run dev and tell me what to open to see it working.`,
    check: `Check step 1. Don't add features.

- Add tests proving the full-name helper works: names joined with one space, extra spaces removed, a missing last name gives just the first name.
- Run all the tests with npm run check.
- Break the helper on purpose so a test fails. Show me the error with its full list of lines (the stack trace) and say which line is our code and which belong to the tools. Then undo the break and show the tests pass again.
- Show me the test's assertion and explain what result it expects and what would make it fail.
- Add a short "Runtime" section to AGENTS.md: which version of Node this runs on, and that we work locally at http://localhost:3000.
- With the app running, confirm the home page shows "Pocket CRM".

Report back in plain words: what you checked, each marked pass or fail, with the real output below it. If something fails, stop and explain it; don't fix it silently. If all is green, add one line to STEPS.md: "1 ground: the app runs on my computer". (No Git yet, so nothing to commit; that's step 2.)`,
    done: [
      {
        en: "I opened localhost:3000 in my browser and saw Pocket CRM",
        he: "פתחתם את localhost:3000 בדפדפן וראיתם Pocket CRM",
      },
      {
        en: "npm run check finished green",
        he: "npm run check הסתיים בירוק",
      },
      {
        en: "I saw the broken test's error and know which line was our own code",
        he: "ראיתם את השגיאה של הטסט השבור ואתם יודעים איזו שורה היא הקוד שלנו",
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
      en: "The project's full history is saved on GitHub, and Vercel shows it at a public web address, with a separate preview address for every branch.",
      he: "כל ההיסטוריה של הפרויקט שמורה ב-GitHub, ו-Vercel מציג אותו בכתובת אינטרנט ציבורית, עם כתובת preview נפרדת לכל branch.",
    },
    why: {
      en: "Once every change is a commit you can read and undo, letting an AI edit thirty files stops being scary.",
      he: "ברגע שכל שינוי הוא commit שאפשר לקרוא ולבטל, לתת ל-AI לערוך שלושים קבצים כבר לא מפחיד.",
    },
    uses: ["source-control", "repository-repo", "commit-branch-merge", "clone-push-pull", "deploy"],
    build: `Read AGENTS.md and STEPS.md first. This is step 2: saving our history and putting the app online.

This step publishes the app, so first tell me your plan in a few plain bullets and wait for my OK.

- Set up Git so every change is saved as a commit (a named snapshot I can go back to). Secret files, like the one for passwords later, must never be saved into it.
- Save everything so far as the first commit on main.
- Put it on GitHub as a repo called pocket-crm (free account); if you can't do it yourself, give me the exact clicks.
- Walk me through connecting it to Vercel (free account), so main goes live on a public address. Wait for me to paste it, then note it in AGENTS.md.
- Start a branch (a side copy of the work) for this step, add a small "v0.1" at the bottom of the home page, and send it to GitHub. Don't merge yet.

Then tell me in plain words what to open or click to see it working: where to find this branch's preview address, and how it differs from the live site.`,
    check: `Check step 2. Don't add features.

- Add a test proving secret files, like .env.local, are on Git's ignore list. Then create a fake secret file and show that Git really ignores it.
- Show that nothing is left unsaved, and that GitHub has exactly the same latest commit as my computer.
- Show that the live site answers and shows "Pocket CRM", but no "v0.1" yet.
- Ask me to open the branch's preview address (Vercel may ask me to log in) and tell you whether I see v0.1. Confirm it is a different address from the live one.
- Run all the tests with npm run check.

Report back in plain words: a short list of what you checked, each marked pass or fail, with the real output below it. If something fails, stop and explain it simply; don't fix it silently.

If all is green: add the line "2 vcs: on GitHub, live on Vercel, branch previews work" to STEPS.md and save it as a commit on this branch. Show me the preview URL and wait for me to inspect it. Ask for my explicit approval before merging into main or deploying to production; do not merge or deploy until I approve. After approval, merge and show me that v0.1 is on the live site.`,
    done: [
      {
        en: "I opened the live address and saw Pocket CRM",
        he: "פתחתם את הכתובת החיה וראיתם Pocket CRM",
      },
      {
        en: "The preview address showed v0.1 before the live site did",
        he: "כתובת ה-preview הראתה v0.1 לפני שהאתר החי הראה",
      },
      {
        en: "The AI proved the fake secret file will never be saved to Git",
        he: "ה-AI הוכיח שקובץ הסוד המדומה לא יישמר אף פעם ב-Git",
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
      en: "The home page asks your own server whether it is up and shows the answer, and you watch that request happen in the browser's DevTools.",
      he: "דף הבית שואל את השרת שלכם אם הוא עובד ומציג את התשובה, ואתם רואים את הבקשה הזאת קורית ב-DevTools של הדפדפן.",
    },
    why: {
      en: "One note lands in the terminal and the other in the browser console. It's the fastest way to learn which side a piece of code runs on.",
      he: "הודעה אחת מופיעה בטרמינל והשנייה ב-console של הדפדפן. זו הדרך המהירה ביותר ללמוד באיזה צד רץ כל חלק בקוד.",
    },
    uses: ["client", "server", "api", "localhost-and-port", "devtools", "the-network-tab", "console-and-breakpoints"],
    build: `Read AGENTS.md and STEPS.md first. This is step 3. Start a new branch for it.

I want to see the browser and the server talk to each other.

- Give the server a small health check at the address /api/health that answers "I'm OK" with the current time. The time must be fresh on every request, never a saved copy.
- Each time it answers, the server writes "[server] health checked" in the terminal.
- Under the Pocket CRM title, the home page asks the server and shows "Checking server…" while it waits, then "Server OK at <time>", or "Server unreachable" if there is no answer. When the answer arrives, the browser writes "[browser] health response" in its console.
- Nothing else: no new tools, no design changes.

Explain to me in 2–3 plain sentences which part runs on the server, which runs in the browser, and how you can tell.

Then start the app with npm run dev and tell me in plain words what to open or click to see it working: on the page, in the terminal, and in the browser console.`,
    check: `Check step 3. Don't add features.

- Add tests proving the health check says OK with exactly the time it was given, and that /api/health answers with status 200 and JSON.
- Run all the tests with npm run check.
- With the app running, ask /api/health yourself and show me the real answer, plus the matching "[server]" line from the terminal.
- Guide me step by step: press F12, open the Network tab, reload, click the health request, and tell you its status and how long it took. Then open the Console tab and find the "[browser]" line.
- Explain in two plain sentences why each line shows up only where it does.

Report back in plain words: a short list of what you checked, each marked pass or fail, with the real output below it. If something fails, stop and explain it simply; don't fix it silently.

If all is green: add the line "3 sides: the browser talks to our server" to STEPS.md and save it as a commit on this branch. Show me the preview URL and wait for me to inspect it. Ask for my explicit approval before merging into main or deploying to production; do not merge or deploy until I approve. After approval, merge and check /api/health on the live site too.`,
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
        en: "I saw the [server] note in the terminal and the [browser] note in the console",
        he: "ראיתם את הודעת ה-[server] בטרמינל ואת הודעת ה-[browser] ב-console",
      },
      {
        en: "/api/health answered on the live site too",
        he: "/api/health ענה גם באתר החי",
      },
    ],
  },

  langs: {
    title: { en: "Types that say no", he: "טיפוסים שיודעים להגיד לא" },
    goal: {
      en: "One clear definition says what a valid contact is, and both TypeScript and the tests refuse anything else.",
      he: "הגדרה אחת ברורה קובעת מה זה איש קשר תקין, וגם TypeScript וגם הטסטים דוחים כל דבר אחר.",
    },
    why: {
      en: "TypeScript catches a bad value while the code is written; a runtime check catches it when real data arrives. You need both, and it costs one small tool.",
      he: "TypeScript תופס ערך שגוי כבר כשכותבים את הקוד, ובדיקה בזמן ריצה תופסת אותו כשמגיעים נתונים אמיתיים. צריך את שניהם, וזה עולה כלי קטן אחד.",
    },
    uses: ["typed-vs-untyped", "javascript-typescript", "package-manager", "dependency", "semantic-versioning"],
    build: `Read AGENTS.md and STEPS.md first. This is step 4. Start a new branch for it.

Define, in one place, what a valid contact is:
- a name: required, not just spaces, at most 100 characters;
- an email that really looks like an email;
- a company, optional;
- a stage: one of lead, qualified, won or lost, and lead when not given.

- It must work twice: TypeScript (a checker that reads the code before it runs) rejects a bad contact in the code, and a runtime check rejects bad data as it arrives.
- You may add one small tool for the runtime check. Tell me which one and why, and write it in AGENTS.md. Nothing else new.
- Make TypeScript strict and fix what it finds properly, with no shortcuts that hide errors.
- Make sure the exact versions of our tools are locked and saved in Git. Explain in one sentence what the ^ before a version number allows.

Don't use it on any page yet. Run npm run check and tell me in plain words what I should see. STEPS.md gets its line after the check.`,
    check: `Check step 4. Don't add features.

- Add tests proving the rules work: one valid contact is accepted and its stage becomes lead; four bad ones are refused, each with the error on the right field: an empty name, a name of only spaces, the email "not-an-email", and the stage "maybe".
- Add a test proving TypeScript itself refuses a contact with stage "maybe", and show me the exact error message it prints.
- Show that only one version of the new tool is installed and that the file locking the versions is saved in Git.
- Confirm there are no shortcuts anywhere that switch TypeScript's checks off.
- Run all the tests with npm run check.

Report back in plain words: a short list of what you checked, each marked pass or fail, with the real output below it. If something fails, stop and explain it simply; don't fix it silently.

If all is green: add the line "4 langs: one clear definition of a valid contact" to STEPS.md and save it as a commit on this branch. Show me the preview URL and wait for me to inspect it. Ask for my explicit approval before merging into main or deploying to production; do not merge or deploy until I approve. After approval, merge it into main and send it to GitHub.`,
    done: [
      {
        en: "I saw the error TypeScript printed for stage \"maybe\"",
        he: "ראיתם את השגיאה ש-TypeScript הדפיס על stage בשם maybe",
      },
      {
        en: "All five contact tests passed: one valid, four refused",
        he: "כל חמשת הטסטים של איש הקשר עברו: אחד תקין, ארבעה נדחו",
      },
      {
        en: "The AI named the one new tool, its version, and what the ^ allows",
        he: "ה-AI אמר מה הכלי החדש היחיד, מה הגרסה שלו ומה ה-^ מאפשר",
      },
    ],
  },

  frontend: {
    title: { en: "The contacts page", he: "דף אנשי הקשר" },
    goal: {
      en: "A contacts page where you add a person and see them in the list, with clear errors, on a phone and by keyboard alone, and a browser test that proves it.",
      he: "דף אנשי קשר שבו מוסיפים אדם ורואים אותו ברשימה, עם הודעות שגיאה ברורות, בטלפון ובמקלדת בלבד, וטסט בדפדפן שמוכיח את זה.",
    },
    why: {
      en: "For now the list lives only in the browser and disappears on refresh. That's on purpose, so you see what the browser holds on its own before the server takes over.",
      he: "בינתיים הרשימה חיה רק בדפדפן ונעלמת ברענון. זה בכוונה, כדי שתראו מה הדפדפן מחזיק לבד לפני שהשרת לוקח פיקוד.",
    },
    uses: ["component", "client-state", "forms-and-validation", "accessibility-a11y", "css-and-responsive-layout", "dom"],
    build: `Read AGENTS.md and STEPS.md first. This is step 5. Start a new branch for it.

Build a Contacts page at /contacts, linked from the home page:
- A form (name, email, company, stage) with the list of contacts added so far below it. Keep them only in the browser for now; a refresh empties the list, as expected.
- Use the contact rules from step 4: show each problem next to its field and add nothing if anything is wrong. After a good add, clear the form and put the cursor back in the name field.
- It works with the keyboard alone (Tab and Enter), every field has a visible label, and you always see where you are.
- It fits a phone screen 375 pixels wide, with no sideways scrolling.
- Set up browser tests (a robot that clicks through the real page), run with npm run e2e. That's the only new tool; note it in AGENTS.md.

Then start the app with npm run dev and tell me in plain words what to open or click to see it working, and what to try. STEPS.md gets its line after the check.`,
    check: `Check step 5. Don't add features.

- Add browser tests that use the page the way a person does, by field labels and button names:
  a good contact appears in the list;
  an empty name shows an error next to the name and adds nothing;
  on a phone-sized screen the page fits with no sideways scroll, and you save a screenshot;
  keyboard only: type a name, Tab through, press Enter, and the contact appears.
- Run all the tests with npm run check, then npm run e2e.
- Open the screenshot and describe it to me in one line.
- Ask me to add a contact and refresh, then explain in one plain sentence why the list emptied.

Report back in plain words: a short list of what you checked, each marked pass or fail, with the real output below it. If something fails, stop and explain it simply; don't change a test just to make it pass.

If all is green: add the line "5 frontend: a contacts page that works by keyboard and on a phone" to STEPS.md and save it as a commit on this branch. Show me the preview URL and wait for me to inspect it. Ask for my explicit approval before merging into main or deploying to production; do not merge or deploy until I approve. After approval, merge it into main and send it to GitHub.`,
    done: [
      {
        en: "I added a contact by keyboard alone, without touching the mouse",
        he: "הוספתם איש קשר רק עם המקלדת, בלי לגעת בעכבר",
      },
      {
        en: "An empty name showed an error next to the field and added nothing",
        he: "שם ריק הציג שגיאה ליד השדה ולא הוסיף כלום",
      },
      {
        en: "npm run e2e opened a real browser and all four tests passed",
        he: "npm run e2e פתח דפדפן אמיתי וכל ארבעת הטסטים עברו",
      },
      {
        en: "I saw the phone-sized screenshot and the page fits",
        he: "ראיתם את צילום המסך בגודל טלפון והדף נכנס",
      },
    ],
  },

  http: {
    title: { en: "A real REST API", he: "REST API אמיתי" },
    goal: {
      en: "Contacts now live on the server behind an API that answers with honest status codes, and the page talks to it.",
      he: "אנשי הקשר יושבים עכשיו בשרת מאחורי API שעונה עם קודי סטטוס כנים, והדף מדבר איתו.",
    },
    why: {
      en: "From here on, every feature is a request and a response. Get the actions and status codes right now, and every future bug report gets short.",
      he: "מכאן והלאה, כל feature הוא בקשה ותשובה. אם הפעולות וקודי הסטטוס נכונים עכשיו, כל דיווח באג בעתיד יהיה קצר.",
    },
    uses: ["request-response", "rest", "endpoint", "post-put-patch-delete", "status-codes", "json"],
    build: `Read AGENTS.md and STEPS.md first. This is step 6. Start a new branch for it.

Move the contacts from the browser to the server, behind an API (the door the page knocks on to read or change data).

Before any code, show me the API as a simple table: action | address | answer when it works | answer when it fails.

- The API can list contacts, add one, show one, change one and delete one.
- Every answer is honest: 201 when something was created, 400 for bad input (saying which field is wrong), 404 when the contact doesn't exist, 204 after a delete, 405 for an action the address doesn't support. Every answer, errors too, is JSON.
- For now keep contacts in the server's memory; they vanish on restart until the database arrives in step 7.
- The Contacts page now uses the API, and shows the server's errors under the right fields. Keyboard use and labels keep working.
- No new tools.

Then start the app with npm run dev and tell me in plain words what to open or click to see it working. STEPS.md gets its line after the check.`,
    check: `Check step 6. Don't add features.

- Add tests proving each answer: list 200; a good contact 201 plus its new address; a bad one 400 naming the name and email problems; broken input 400; an unknown contact 404; a change 200, or 400 if invalid; delete 204, then 404 when asked again; an unsupported action 405.
- Run all the tests with npm run check, then npm run e2e. The step 5 browser tests must still pass, now through the API.
- With the app running, do one real round trip: add a contact, read it, change its stage to qualified, delete it, read it again. Show me the status code of each.
- Restart the server, show the list is now empty, and explain in one line why.

Report back in plain words: a short list of what you checked, each marked pass or fail, with the real output below it. If something fails, stop and explain it simply; don't fix it silently.

If all is green: add the line "6 http: contacts behind a real API" to STEPS.md and save it as a commit on this branch. Show me the preview URL and wait for me to inspect it. Ask for my explicit approval before merging into main or deploying to production; do not merge or deploy until I approve. After approval, merge it into main and send it to GitHub.`,
    done: [
      {
        en: "I read the round trip: 201, 200, 200, 204, then 404",
        he: "קראתם את הסבב המלא: 201, 200, 200, 204 ואז 404",
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
    title: { en: "A real database — and it's live", he: "מסד נתונים אמיתי, והכול באוויר" },
    goal: {
      en: "Contacts, companies and notes are saved in a real database, survive restarts and redeploys, and the live CRM reads and writes them.",
      he: "אנשי קשר, חברות והערות נשמרים במסד נתונים אמיתי, שורדים הפעלה מחדש ו-deploy, וה-CRM החי קורא וכותב אותם.",
    },
    why: {
      en: "Data has to live somewhere that survives a restart. A clear structure and saved migrations give you that without losing data or guessing.",
      he: "הנתונים צריכים לחיות במקום ששורד הפעלה מחדש. מבנה ברור ומיגרציות שמורות נותנים את זה בלי לאבד נתונים ובלי לנחש.",
    },
    uses: ["database", "schema", "migration", "index", "orm", "time-text-and-money"],
    build: `Read AGENTS.md and STEPS.md first. This is step 7. Start a new branch for it.

This touches the database, so first tell me your plan in a few plain bullets and wait for my OK.

Contacts must survive restarts and deploys.
- Walk me through a free Neon account with two databases: the real one, and a separate one only for tests. I'll paste the connection details into the secret file, never the code.
- Store contacts, companies and notes. A contact may have a company; a note belongs to a contact. Deleting a contact deletes its notes; deleting a company keeps its contacts. A duplicate email gets 409. Times are saved in UTC. Filtering by stage is fast (add an index).
- Every change to the database's structure is a migration: a saved step in the repo, so any database can be rebuilt identically.
- Add some sample data that is safe to load twice.
- Pick the tools, note them in AGENTS.md, and explain them in 2–3 plain sentences. Tell me how to give Vercel the connection details, and wait.

Then tell me in plain words what to open or click to see it working.`,
    check: `Check step 7. Don't add features.

- On the test database only, wipe it, rebuild it from the migrations alone, and show what it contains.
- Add tests proving: they refuse to run against the real database; a saved contact reads back the same; a duplicate email gets 409; the stage "maybe" gets 400; times come back in UTC; deleting a contact deletes its notes.
- Run all the tests with npm run check and npm run e2e, including the database tests.
- Add a contact, restart the server, and show it is still there.
- Confirm no passwords or connection details are in the code.

Report in plain words: what you checked, pass or fail, with the real output below. If something fails, stop and explain it simply; don't fix it silently.

If all is green: add "7 data: contacts live in a real database" to STEPS.md and commit on this branch. Show me the preview URL and wait for me to inspect it. Ask for my explicit approval before merging into main or deploying to production; do not merge or deploy until I approve. After approval, show the sample contacts on the live site, ask me before adding a demo contact or redeploying, and show that the contact survived.

Close with a short "what I shipped" note: live address, tools, how many tests pass, and STEPS.md.`,
    done: [
      {
        en: "I added a contact on the live site and it was still there after a redeploy",
        he: "הוספתם איש קשר באתר החי והוא עדיין היה שם אחרי deploy מחדש",
      },
      {
        en: "I saw the contacts, companies and notes in the Neon dashboard, not only in the AI's summary",
        he: "ראיתם את אנשי הקשר, החברות וההערות בלוח הבקרה של Neon, לא רק בסיכום של ה-AI",
      },
      {
        en: "Adding a second contact with the same email was refused with 409",
        he: "הוספה של איש קשר שני עם אותו אימייל נדחתה עם 409",
      },
      {
        en: "I read the \"what I shipped\" note: a live CRM on a real database, with tests",
        he: "קראתם את הסיכום: CRM חי על מסד נתונים אמיתי, עם טסטים",
      },
    ],
  },
};
