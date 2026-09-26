import type { Scene } from "./types";

const you = { id: "y", icon: "🧑‍💻", label: { en: "You", he: "אתם" } };
const laptop = { id: "l", icon: "💻", label: { en: "Your laptop", he: "המחשב שלכם" } };
const github = { id: "g", icon: "☁️", label: { en: "GitHub", he: "GitHub" } };
const omer = { id: "o", icon: "🧑‍🎨", label: { en: "Omer", he: "עומר" } };
const agent = { id: "a", icon: "🤖", label: { en: "AI agent", he: "סוכן AI" } };
const browser = { id: "b", icon: "🌐", label: { en: "Browser", he: "דפדפן" } };
const server = { id: "s", icon: "🖥️", label: { en: "Server", he: "שרת" } };
const db = { id: "d", icon: "🗄️", label: { en: "Database", he: "מסד נתונים" } };
const code = { id: "c", icon: "⚙️", label: { en: "Your code", he: "הקוד שלכם" } };
const tests = { id: "t", icon: "🧪", label: { en: "Tests", he: "טסטים" } };

export const EARLY_SCENES: Record<string, Scene> = {
  "compiler-interpreter": {
    cap: { en: "The same typo: one checker catches it in seconds, the other lets a customer find it weeks later", he: "אותה טעות הקלדה: בודק אחד תופס אותה תוך שניות, השני נותן ללקוחה למצוא אותה אחרי שבועות" },
    actors: [
      code,
      { id: "k", icon: "🛠️", label: { en: "Compiler", he: "קומפיילר" } },
      { id: "i", icon: "▶️", label: { en: "Interpreter", he: "אינטרפרטר" } },
      { id: "u", icon: "👩", label: { en: "Dana", he: "דנה" } },
    ],
    beats: [
      {
        from: "c", to: "k", label: "check the whole project",
        body: ["reminders.ts, line 14", "sendRemindr(contact)"],
        say: { en: "The compiler reads all the code before anything runs, even the part that only runs once a month.", he: "הקומפיילר קורא את כל הקוד לפני שמשהו רץ, גם את החלק שרץ רק פעם בחודש." },
      },
      {
        from: "k", to: "k", label: "Can't find 'sendRemindr'", tone: "err",
        say: { en: "It finds a name that doesn't exist and stops. Nothing gets built, so nothing broken goes live.", he: "הוא מוצא שם שלא קיים ועוצר. שום דבר לא נבנה, אז שום דבר שבור לא עולה לאוויר." },
      },
      {
        from: "k", to: "c", label: "✗ reminders.ts, line 14", tone: "err",
        say: { en: "The error reaches you seconds after saving. You find it, not a customer.", he: "השגיאה מגיעה אליכם שניות אחרי השמירה. אתם מוצאים אותה, לא לקוח." },
      },
      {
        from: "c", to: "i", label: "run it right away",
        body: ["same typo, plain JavaScript", "sendRemindr(contact)"],
        say: { en: "Now the same typo in plain JavaScript. The interpreter doesn't read ahead: it just starts running, line by line.", he: "עכשיו אותה טעות ב-JavaScript רגיל. האינטרפרטר לא קורא מראש: הוא פשוט מתחיל להריץ, שורה אחרי שורה." },
      },
      {
        from: "i", to: "u", label: "contacts page · works", tone: "ok",
        say: { en: "Every page Dana opens works. No one has reached the broken line yet, so nothing complains.", he: "כל עמוד שדנה פותחת עובד. אף אחד עוד לא הגיע לשורה השבורה, אז שום דבר לא מתלונן." },
      },
      {
        from: "u", to: "i", label: "1st of the month: reminders",
        say: { en: "Three weeks later, on the 1st, the monthly reminders run for the first time.", he: "שלושה שבועות אחר כך, ב-1 לחודש, התזכורות החודשיות רצות בפעם הראשונה." },
      },
      {
        from: "i", to: "i", label: "Crash · reminders.js line 14", tone: "err",
        body: ["sendRemindr is not defined"],
        say: { en: "Same one-letter fix, but a customer hit it weeks late. That's why a passing build tells you more in TypeScript.", he: "אותו תיקון של אות אחת, אבל לקוחה נתקלה בזה אחרי שבועות. לכן ב-TypeScript, 'זה נבנה' אומר לכם הרבה יותר." },
      },
    ],
  },

  "clone-push-pull": {
    cap: { en: "Your laptop and GitHub each hold a copy. They only sync when you say so", he: "גם במחשב שלכם וגם ב-GitHub יש עותק. הם מסתנכרנים רק כשאתם אומרים" },
    actors: [laptop, github, omer],
    beats: [
      {
        from: "g", to: "l", label: "git clone",
        body: ["copying the whole project…"],
        say: { en: "Clone copies the whole project to your laptop, with its full history. From now on you work on your own copy.", he: "clone מעתיק את כל הפרויקט למחשב שלכם, עם כל ההיסטוריה. מעכשיו אתם עובדים על עותק משלכם." },
      },
      {
        from: "l", to: "l", label: "commit: add stage filter",
        say: { en: "A commit is a save point, like in a game, but only on your laptop. Nobody else sees it yet.", he: "commit הוא נקודת שמירה, כמו במשחק, אבל רק במחשב שלכם. אף אחד אחר עוד לא רואה אותה." },
      },
      {
        from: "o", to: "g", label: "git push",
        body: ["Omer: move files into src/"],
        say: { en: "Meanwhile Omer sends his own commit up to the shared copy on GitHub.", he: "בינתיים עומר שולח commit משלו לעותק המשותף ב-GitHub." },
      },
      {
        from: "l", to: "g", label: "git push · rejected", tone: "err",
        body: ["GitHub has changes you don't"],
        say: { en: "Your push is refused. Git won't erase Omer's work to make room for yours.", he: "ה-push שלכם נדחה. Git לא ימחק את העבודה של עומר כדי לפנות מקום לשלכם." },
      },
      {
        from: "g", to: "l", label: "git pull",
        body: ["Omer's commit + yours, combined"],
        say: { en: "Pull brings Omer's work down and combines it with yours. Nothing is lost.", he: "pull מוריד את העבודה של עומר ומשלב אותה עם שלכם. שום דבר לא הולך לאיבוד." },
      },
      {
        from: "l", to: "g", label: "git push", tone: "ok",
        body: ["both commits uploaded"],
        say: { en: "Now the push goes through. Both changes are in the shared copy.", he: "עכשיו ה-push עובר. שני השינויים נמצאים בעותק המשותף." },
      },
      {
        from: "g", to: "o", label: "git pull", tone: "ok",
        say: { en: "Omer pulls to get yours. Pull before you start, push when you stop, and Git stays calm.", he: "עומר עושה pull כדי לקבל את שלכם. pull לפני שמתחילים, push כשמסיימים, ו-Git נשאר רגוע." },
      },
    ],
  },

  "commit-branch-merge": {
    cap: { en: "Let the AI try things on a branch. If it goes wrong, you just throw the branch away", he: "תנו ל-AI לנסות דברים על branch. אם משהו משתבש, פשוט זורקים את ה-branch" },
    actors: [
      { id: "m", icon: "🏠", label: { en: "main", he: "main" } },
      { id: "r", icon: "🌿", label: { en: "Branch", he: "Branch" } },
      agent,
    ],
    beats: [
      {
        from: "m", to: "r", label: "new branch: step-09-import",
        say: { en: "Before the AI touches anything, make a branch: a safe side copy of main, the app that works.", he: "לפני שה-AI נוגע במשהו, פותחים branch: עותק צדדי ובטוח של main, האפליקציה שעובדת." },
      },
      {
        from: "a", to: "r", label: "commit: import from CSV",
        body: ["import contacts from a file", "22 files changed"],
        say: { en: "The AI works and saves commits on the branch. main hasn't changed at all.", he: "ה-AI עובד ושומר commits על ה-branch. ב-main שום דבר לא השתנה." },
      },
      {
        from: "r", to: "r", label: "npm run check · 1 failed", tone: "err",
        body: ["export test:", "expected 20 rows, got 0"],
        say: { en: "Export broke: the AI changed a piece other features share. On main, that's an evening of untangling.", he: "הייצוא נשבר: ה-AI שינה חלק שגם features אחרים משתמשים בו. על main זה היה ערב שלם של פירוק." },
      },
      {
        from: "r", to: "m", label: "back to main, delete branch", tone: "warn",
        say: { en: "Here it's two commands: go back to main, delete the branch. The app is exactly as it was at 14:00.", he: "כאן זה שתי פקודות: חוזרים ל-main, מוחקים את ה-branch. האפליקציה בדיוק כמו שהייתה ב-14:00." },
      },
      {
        from: "m", to: "r", label: "new branch: step-09-import",
        say: { en: "Start again from a state you know works, with a prompt that warns about the export.", he: "מתחילים שוב ממצב שידוע שעובד, עם פרומפט שמזהיר לגבי הייצוא." },
      },
      {
        from: "a", to: "r", label: "commit: import, keep export",
        body: ["import from CSV,", "export left untouched"],
        say: { en: "Small commits, with messages you could still understand at 2am.", he: "commits קטנים, עם הודעות שאפשר להבין גם בשתיים בלילה." },
      },
      {
        from: "r", to: "r", label: "npm run check · 48 passed", tone: "ok",
        say: { en: "All tests green on the branch. Now it has earned its place in main.", he: "כל הטסטים ירוקים על ה-branch. עכשיו הוא הרוויח את המקום שלו ב-main." },
      },
      {
        from: "r", to: "m", label: "git merge", tone: "ok",
        body: ["9 files changed"],
        say: { en: "Merge brings the branch's work into main. Only the version that works ever lands there.", he: "merge מכניס את העבודה מה-branch אל main. רק הגרסה שעובדת מגיעה לשם." },
      },
    ],
  },

  "merge-conflict": {
    cap: { en: "Two people changed the same line. Git won't guess, so it asks you", he: "שני אנשים שינו את אותה שורה. Git לא מנחש, אז הוא שואל אתכם" },
    actors: [
      you,
      { id: "m", icon: "🔀", label: { en: "main", he: "main" } },
      omer,
    ],
    beats: [
      {
        from: "o", to: "m", label: "git merge (Omer's branch)",
        body: ["stages: lead, qualified,", "  proposal, won, lost"],
        say: { en: "Omer merges first. He added a 'proposal' stage to the list of deal stages.", he: "עומר עושה merge ראשון. הוא הוסיף שלב 'proposal' לרשימת שלבי העסקה." },
      },
      {
        from: "m", to: "y", label: "git merge main",
        body: ["stages: lead, qualified,", "  won, lost, on_hold"],
        say: { en: "On your branch you changed that same line, adding 'on_hold'. Now you bring main's changes in.", he: "ב-branch שלכם שיניתם את אותה שורה והוספתם 'on_hold'. עכשיו אתם מכניסים את השינויים מ-main." },
      },
      {
        from: "y", to: "y", label: "6 files combined on their own", tone: "ok",
        say: { en: "Everything else combines by itself. Different parts of the files, so both sides are kept.", he: "כל השאר מתחבר לבד. חלקים שונים בקבצים, אז שני הצדדים נשמרים." },
      },
      {
        from: "y", to: "y", label: "CONFLICT: stages.ts", tone: "err",
        body: ["<<<<<<< yours: won, lost, on_hold", "=======", ">>>>>>> Omer: proposal, won, lost"],
        say: { en: "Same line, so Git writes both versions one above the other and stops. Nothing is broken: it's asking you.", he: "אותה שורה, אז Git כותב את שתי הגרסאות אחת מעל השנייה ועוצר. שום דבר לא הרוס: הוא שואל אתכם." },
      },
      {
        from: "y", to: "y", label: "keep only my side?", tone: "warn",
        say: { en: "The shortcut: keep your whole side. It works, and Omer's stage quietly disappears.", he: "קיצור הדרך: לשמור רק את הצד שלכם. זה עובד, והשלב של עומר נעלם בשקט." },
      },
      {
        from: "y", to: "y", label: "combined by hand", tone: "ok",
        body: ["stages: lead, qualified, proposal,", "  won, lost, on_hold"],
        say: { en: "Read both instead. Each side had a reason, so the answer keeps both stages. Remove Git's markers.", he: "במקום זה, קוראים את שתיהן. לכל צד הייתה סיבה, אז התשובה שומרת את שני השלבים. מוחקים את הסימנים של Git." },
      },
      {
        from: "y", to: "m", label: "commit the fix", tone: "ok",
        say: { en: "Committing the fixed file settles it. Merge branches within a day and conflicts stay this small.", he: "ה-commit של הקובץ המתוקן סוגר את זה. כשממזגים ברנצ'ים תוך יום, הקונפליקטים נשארים קטנים כאלה." },
      },
    ],
  },

  "pull-request-and-code-review": {
    cap: { en: "A big AI change gets split into small pieces, read carefully, and merged only after review", he: "שינוי גדול של AI מתפצל לחלקים קטנים, נקרא בעיון, ונכנס רק אחרי סקירה" },
    actors: [
      you,
      github,
      { id: "n", icon: "🧑‍🔬", label: { en: "Noa (reviewer)", he: "נועה (סוקרת)" } },
    ],
    beats: [
      {
        from: "y", to: "g", label: "git push step-13-auth",
        say: { en: "The branch goes up to GitHub. It's online now, but not part of main yet.", he: "ה-branch עולה ל-GitHub. הוא באוויר עכשיו, אבל עוד לא חלק מ-main." },
      },
      {
        from: "g", to: "g", label: "PR #14 · 41 files · +912 −37", tone: "warn",
        say: { en: "One session with the AI, 41 files changed. Past a few hundred lines, reviewers stop reading and start skimming.", he: "ישיבה אחת עם ה-AI, 41 קבצים השתנו. אחרי כמה מאות שורות, סוקרים מפסיקים לקרוא ומתחילים לרפרף." },
      },
      {
        from: "y", to: "g", label: "split into #15, #16, #17",
        body: ["#15 database changes", "#16 API routes", "#17 sign-in page"],
        say: { en: "So you split it. Each piece is small enough to test alone and actually read.", he: "אז מפצלים. כל חלק קטן מספיק כדי לבדוק אותו לבד ולקרוא אותו באמת." },
      },
      {
        from: "g", to: "n", label: "PR #16 · 3 files · +96 −4",
        say: { en: "Noa reads the red lines first. What got deleted can matter more than what got added.", he: "נועה קוראת קודם את השורות האדומות. מה שנמחק יכול להיות חשוב יותר ממה שנוסף." },
      },
      {
        from: "n", to: "g", label: "Changes requested", tone: "err",
        body: ["- only the owner's contacts", "+ any contact, by its number"],
        say: { en: "One quietly deleted line: the owner check. Without it, anyone can open anyone's contact.", he: "שורה אחת שנמחקה בשקט: הבדיקה של הבעלים. בלעדיה, כל אחד יכול לפתוח כל איש קשר." },
      },
      {
        from: "y", to: "g", label: "commit: bring owner check back",
        body: ["+ test: Omer can't open Dana's contact"],
        say: { en: "The fix comes with a test, so the check can't quietly vanish again.", he: "התיקון מגיע עם טסט, כדי שהבדיקה לא תוכל להיעלם בשקט שוב." },
      },
      {
        from: "n", to: "g", label: "✓ Approved", tone: "ok",
        say: { en: "Approved, and the automatic checks are green.", he: "אושר, והבדיקות האוטומטיות ירוקות." },
      },
      {
        from: "g", to: "g", label: "Merged into main", tone: "ok",
        say: { en: "Only now does it join main. If you can't say what it changes and how to undo it, it wasn't really reviewed.", he: "רק עכשיו זה נכנס ל-main. אם אתם לא יכולים להגיד מה זה משנה ואיך מבטלים את זה, זה לא באמת נסקר." },
      },
    ],
  },

  "package-manager": {
    cap: { en: "package.json is the shopping list. The lock file is the receipt of exactly what you got", he: "package.json הוא רשימת הקניות. קובץ הנעילה הוא הקבלה על מה שקיבלתם בדיוק" },
    actors: [
      laptop,
      { id: "p", icon: "📦", label: { en: "Package store (npm)", he: "חנות החבילות (npm)" } },
      { id: "i", icon: "🤖", label: { en: "Build server (CI)", he: "שרת הבנייה (CI)" } },
    ],
    beats: [
      {
        from: "l", to: "p", label: "npm install csv-kit",
        say: { en: "You add a ready-made package. The shopping list says 'version 2.1 or any newer 2.x'.", he: "מוסיפים חבילה מוכנה. רשימת הקניות אומרת 'גרסה 2.1 או כל 2.x חדשה יותר'." },
      },
      {
        from: "p", to: "l", label: "csv-kit 2.1.0 + 3 more", tone: "ok",
        body: ["list:    csv-kit 2.1 or newer", "receipt: csv-kit 2.1.0 + 3, exact"],
        say: { en: "The lock file writes down exactly what arrived, including the packages it needed.", he: "קובץ הנעילה רושם בדיוק מה הגיע, כולל החבילות שהיא צריכה." },
      },
      {
        from: "l", to: "i", label: "git push · no lock file", tone: "warn",
        say: { en: "But the lock file was never saved to the repo. The build server only gets the shopping list.", he: "אבל קובץ הנעילה אף פעם לא נשמר בריפו. שרת הבנייה מקבל רק את רשימת הקניות." },
      },
      {
        from: "i", to: "p", label: "npm install",
        say: { en: "A month later, the build server installs from scratch. The list allows any 2.x.", he: "חודש אחר כך, שרת הבנייה מתקין מאפס. הרשימה מרשה כל 2.x." },
      },
      {
        from: "p", to: "i", label: "csv-kit 2.4.0", tone: "warn",
        body: ["2.4.0 reads commas differently"],
        say: { en: "It gets 2.4.0, which behaves a bit differently. Nobody touched your code.", he: "הוא מקבל 2.4.0, שמתנהגת קצת אחרת. אף אחד לא נגע בקוד שלכם." },
      },
      {
        from: "i", to: "i", label: "import test: 20 rows → 0", tone: "err",
        say: { en: "The import test fails there and passes on your laptop. Same code, different package.", he: "טסט הייבוא נכשל שם ועובר אצלכם. אותו קוד, חבילה אחרת." },
      },
      {
        from: "l", to: "i", label: "git push · with lock file",
        say: { en: "Save the lock file in the repo. When the AI adds a package, glance at it: it shows everything that really arrived.", he: "שומרים את קובץ הנעילה בריפו. כשה-AI מוסיף חבילה, מציצים בו: הוא מראה כל מה שבאמת הגיע." },
      },
      {
        from: "i", to: "p", label: "npm ci", tone: "ok",
        body: ["csv-kit 2.1.0, as on the receipt"],
        say: { en: "npm ci installs exactly what the receipt says, and stops loudly if the list and receipt disagree.", he: "npm ci מתקין בדיוק מה שכתוב בקבלה, ועוצר בקול אם הרשימה והקבלה לא מתאימות." },
      },
    ],
  },

  "forms-and-validation": {
    cap: { en: "The check in the browser is for speed. The check on the server is the one that counts", he: "הבדיקה בדפדפן היא בשביל מהירות. הבדיקה בשרת היא זו שקובעת" },
    actors: [browser, server, db],
    beats: [
      {
        from: "b", to: "b", label: "check the form · bad email", tone: "err",
        body: ["email: noa@"],
        say: { en: "Noa types a broken email. The browser checks the form and shows a message before anything is sent.", he: "נועה מקלידה מייל שבור. הדפדפן בודק את הטופס ומראה הודעה לפני שמשהו נשלח." },
      },
      {
        from: "b", to: "s", label: "POST /api/contacts",
        body: ["name: (empty)", "(check switched off in the browser)"],
        say: { en: "But the browser belongs to the user. Anyone can switch that check off, or skip the page entirely.", he: "אבל הדפדפן שייך למשתמש. כל אחד יכול לכבות את הבדיקה, או לדלג על העמוד לגמרי." },
      },
      {
        from: "s", to: "s", label: "check the data again · ✗", tone: "err",
        say: { en: "The server runs the same check again. This is the one that decides.", he: "השרת מריץ שוב את אותה בדיקה. היא זו שמחליטה." },
      },
      {
        from: "s", to: "b", label: "400 Bad Request", status: 400,
        body: ["name: required"],
        say: { en: "It answers 400, 'your request is wrong', before the database is touched. The page shows it by the field.", he: "הוא עונה 400, 'הבקשה שלכם שגויה', לפני שנוגעים במסד. העמוד מציג את זה ליד השדה." },
      },
      {
        from: "b", to: "s", label: "POST /api/contacts",
        body: ["name: Noa Levi", "email: noa@levi.io"],
        say: { en: "Fixed and sent again.", he: "תוקן ונשלח שוב." },
      },
      {
        from: "s", to: "d", label: "save the new contact",
        say: { en: "Only data that passed the server's check reaches the database.", he: "רק נתונים שעברו את הבדיקה בשרת מגיעים למסד הנתונים." },
      },
      {
        from: "s", to: "b", label: "201 Created", status: 201,
        body: ["new contact #42"],
        say: { en: "One set of rules, checked twice: in the browser for speed, on the server for safety.", he: "אותם כללים, בשני מקומות: בדפדפן בשביל מהירות, בשרת בשביל ביטחון." },
      },
    ],
  },

  "bug-stack-trace": {
    cap: { en: "The stack trace shows the exact path a request took before it broke", he: "ה-stack trace מראה בדיוק באיזו דרך הבקשה עברה לפני שהיא נשברה" },
    actors: [
      browser,
      { id: "f", icon: "🧱", label: { en: "Next.js", he: "Next.js" } },
      { id: "r", icon: "📄", label: { en: "route.ts", he: "route.ts" } },
      { id: "v", icon: "📄", label: { en: "contacts.ts", he: "contacts.ts" } },
    ],
    beats: [
      {
        from: "b", to: "f", label: "GET /api/contacts/42",
        say: { en: "Dana opens a contact. The request comes in through the framework, the base your app is built on.", he: "דנה פותחת איש קשר. הבקשה נכנסת דרך הפריימוורק, הבסיס שעליו האפליקציה בנויה." },
      },
      {
        from: "f", to: "r", label: "hand over to route.ts",
        say: { en: "The framework passes the request to your code.", he: "הפריימוורק מעביר את הבקשה לקוד שלכם." },
      },
      {
        from: "r", to: "v", label: "get the owner's name",
        say: { en: "Your code asks another part of your code for the contact owner's name.", he: "הקוד שלכם מבקש מחלק אחר בקוד את שם הבעלים של איש הקשר." },
      },
      {
        from: "v", to: "v", label: "Crash: owner is missing", tone: "err",
        body: ["Cannot read 'name' of undefined"],
        say: { en: "Line 42 expects the contact to have an owner, and it has none. This is where it actually broke.", he: "שורה 42 מצפה שלאיש הקשר יהיו בעלים, ואין לו. כאן זה באמת נשבר." },
      },
      {
        from: "f", to: "b", label: "500 Internal Server Error", status: 500,
        say: { en: "Dana just sees an error page. The real story is printed in the terminal.", he: "דנה רואה רק עמוד שגיאה. הסיפור האמיתי מודפס בטרמינל." },
      },
      {
        from: "f", to: "f", label: "stack trace · newest first", tone: "info",
        body: ["at contacts.ts line 42", "at route.ts line 17", "at … 12 lines inside Next.js"],
        say: { en: "Read top down: the top line broke, the one below called it. The framework lines only show the request came in.", he: "קוראים מלמעלה: השורה העליונה נשברה, זו שמתחתיה קראה לה. שורות הפריימוורק רק מראות שהבקשה נכנסה." },
      },
      {
        from: "v", to: "v", label: "no owner? show nothing", tone: "warn",
        say: { en: "Ask the AI to 'fix this error' and you often get this. The error vanishes, and the real bug gets hidden.", he: "תבקשו מה-AI 'לתקן את השגיאה' ולרוב תקבלו את זה. השגיאה נעלמת, והבאג האמיתי מוסתר." },
      },
      {
        from: "v", to: "v", label: "why is the owner missing?", tone: "ok",
        body: ["CSV import saved 17 contacts", "with no owner"],
        say: { en: "Paste the whole trace and ask why instead. The import saved contacts with no owner. Fix that, not line 42.", he: "במקום זה, הדביקו את כל ה-trace ושאלו למה. הייבוא שמר אנשי קשר בלי בעלים. את זה מתקנים, לא את שורה 42." },
      },
    ],
  },

  "localhost-and-port": {
    cap: { en: "localhost means this computer. The port is which door on it", he: "localhost זה המחשב הזה. הפורט הוא איזו דלת בו" },
    actors: [
      { id: "t", icon: "⌨️", label: { en: "Terminal", he: "טרמינל" } },
      { id: "p", icon: "🚪", label: { en: "localhost:3000", he: "localhost:3000" } },
      browser,
      { id: "v", icon: "☁️", label: { en: "Live server (Vercel)", he: "השרת באוויר (Vercel)" } },
    ],
    beats: [
      {
        from: "t", to: "p", label: "npm run dev", tone: "err",
        body: ["door 3000 is already in use"],
        say: { en: "Door 3000 is taken. Nothing is broken: yesterday's server never shut down and is still standing there.", he: "דלת 3000 תפוסה. שום דבר לא שבור: השרת של אתמול לא נסגר ועדיין עומד שם." },
      },
      {
        from: "t", to: "t", label: "who is using door 3000?",
        body: ["an old copy of your app"],
        say: { en: "Ask the AI who holds the door: an old copy of your app, still running.", he: "שואלים את ה-AI מי מחזיק את הדלת: עותק ישן של האפליקציה, שעדיין רץ." },
      },
      {
        from: "t", to: "t", label: "stop the old server", tone: "ok",
        say: { en: "Stop it and the door is free. Moving to door 3001 instead is how a confusing hour begins.", he: "עוצרים אותו והדלת פנויה. לעבור לדלת 3001 במקום זה, ככה מתחילה שעה מבלבלת." },
      },
      {
        from: "t", to: "p", label: "npm run dev · ready", tone: "ok",
        body: ["open http://localhost:3000"],
        say: { en: "Now your app waits at door 3000 of this computer.", he: "עכשיו האפליקציה שלכם מחכה בדלת 3000 של המחשב הזה." },
      },
      {
        from: "b", to: "p", label: "GET localhost:3000/api/health",
        say: { en: "The browser knocks on the same computer, same door. No internet involved.", he: "הדפדפן דופק על אותו מחשב, אותה דלת. בלי אינטרנט בכלל." },
      },
      {
        from: "p", to: "b", label: "200 OK", status: 200,
        body: ["ok: true"],
        say: { en: "It answers. So far, everything lives on your laptop.", he: "היא עונה. בינתיים, הכול חי על המחשב שלכם." },
      },
      {
        from: "v", to: "v", label: "can't reach the database", tone: "err",
        body: ["database address: localhost"],
        say: { en: "After deploying, the same setting breaks. On the server, localhost means the server itself, and there's no database there.", he: "אחרי deploy, אותה הגדרה נשברת. בשרת, localhost זה השרת עצמו, ואין שם מסד נתונים." },
      },
      {
        from: "v", to: "v", label: "database address from settings", tone: "ok",
        body: ["…neon.tech (the real database)"],
        say: { en: "Keep the address in one setting, so moving to another machine is one change, not a hunt.", he: "שומרים את הכתובת בהגדרה אחת, כך שמעבר למחשב אחר הוא שינוי אחד ולא חיפוש." },
      },
    ],
  },

  "devtools": {
    cap: { en: "\"Something went wrong\" turns into a clear answer in one minute", he: "\"משהו השתבש\" הופך לתשובה ברורה תוך דקה" },
    actors: [
      browser,
      { id: "n", icon: "🔍", label: { en: "Network tab", he: "לשונית Network" } },
      server,
    ],
    beats: [
      {
        from: "b", to: "s", label: "POST /api/contacts",
        say: { en: "Noa clicks Save on a new contact.", he: "נועה לוחצת Save על איש קשר חדש." },
      },
      {
        from: "s", to: "b", label: "400 Bad Request", status: 400,
        say: { en: "The page hides the answer and shows 'Something went wrong'. Omer is sure the server is broken.", he: "העמוד מסתיר את התשובה ומציג 'משהו השתבש'. עומר בטוח שהשרת שבור." },
      },
      {
        from: "b", to: "n", label: "F12 → Network",
        say: { en: "Stop guessing. Press F12, open the Network tab, and click the red row.", he: "מפסיקים לנחש. לוחצים F12, פותחים את לשונית Network, ולוחצים על השורה האדומה." },
      },
      {
        from: "n", to: "n", label: "Response", status: 400,
        body: ["stage: required"],
        say: { en: "Response shows the server's real message, which the page hid: the stage is missing.", he: "ב-Response רואים את ההודעה האמיתית של השרת, שהעמוד הסתיר: חסר stage." },
      },
      {
        from: "n", to: "n", label: "Payload", tone: "err",
        body: ["name: Noa Levi", "email: noa@levi.io", "(no stage)"],
        say: { en: "Payload shows what was actually sent: no stage. The form cleared it by mistake.", he: "ב-Payload רואים מה באמת נשלח: אין stage. הטופס מחק אותו בטעות." },
      },
      {
        from: "n", to: "n", label: "Headers · Timing", tone: "info",
        body: ["cookie: sent", "server answered in 38 ms"],
        say: { en: "A 4xx code means the request was wrong, not the server. The login cookie was sent, and the server was fast.", he: "קוד 4xx אומר שהבקשה הייתה שגויה, לא השרת. ה-cookie של ההתחברות נשלח, והשרת היה מהיר." },
      },
      {
        from: "b", to: "s", label: "POST /api/contacts",
        body: ["name: Noa Levi", "email: noa@levi.io", "stage: lead"],
        say: { en: "Now the form keeps the stage. Same request, with the missing field.", he: "עכשיו הטופס שומר את ה-stage. אותה בקשה, עם השדה שחסר." },
      },
      {
        from: "s", to: "b", label: "201 Created", status: 201,
        say: { en: "Before asking an AI why 'it doesn't work', hand it the real request and the real response.", he: "לפני ששואלים AI למה 'זה לא עובד', נותנים לו את הבקשה האמיתית ואת התשובה האמיתית." },
      },
    ],
  },

  "blocking-vs-async": {
    cap: { en: "Two saves, a split second apart, both sure there's room for one more", he: "שתי שמירות, בהפרש של שבריר שנייה, ושתיהן בטוחות שיש מקום לעוד אחד" },
    actors: [
      { id: "a", icon: "👩", label: { en: "Dana's tab", he: "הלשונית של דנה" } },
      db,
      { id: "o", icon: "🧑‍🎨", label: { en: "Omer's tab", he: "הלשונית של עומר" } },
    ],
    beats: [
      {
        from: "a", to: "d", label: "how many contacts?",
        say: { en: "The free plan allows 100 contacts and the team has 99. Dana adds one, and her request checks the count first.", he: "התוכנית החינמית מרשה 100 אנשי קשר, ולצוות יש 99. דנה מוסיפה אחד, והבקשה שלה בודקת קודם את הספירה." },
      },
      {
        from: "o", to: "d", label: "how many contacts?",
        say: { en: "A split second later, Omer adds one too. His request checks the same count.", he: "שבריר שנייה אחר כך, גם עומר מוסיף אחד. הבקשה שלו בודקת את אותה ספירה." },
      },
      {
        from: "d", to: "a", label: "99 contacts",
        say: { en: "Dana's request sees 99, which is under 100, so it goes ahead.", he: "הבקשה של דנה רואה 99, פחות מ-100, אז היא ממשיכה." },
      },
      {
        from: "d", to: "o", label: "99 contacts",
        say: { en: "Omer's sees 99 too. Nothing has been saved yet.", he: "גם הבקשה של עומר רואה 99. עוד לא נשמר כלום." },
      },
      {
        from: "a", to: "d", label: "save contact · count = 100",
        say: { en: "Dana's request saves.", he: "הבקשה של דנה שומרת." },
      },
      {
        from: "o", to: "d", label: "save contact · count = 100", tone: "err",
        say: { en: "So does Omer's. 101 contacts, but the count says 100. Each step was right; the gap between check and save wasn't.", he: "גם של עומר. 101 אנשי קשר, והספירה אומרת 100. כל צעד היה נכון, הפער בין הבדיקה לשמירה לא." },
      },
      {
        from: "a", to: "d", label: "add one, only if under 100", tone: "ok",
        body: ["→ added"],
        say: { en: "Replay with the fix: check and add in one single step. The database lets one request do it at a time.", he: "אותו רגע, עם התיקון: בודקים ומוסיפים בצעד אחד. המסד נותן רק לבקשה אחת לעשות את זה בכל פעם." },
      },
      {
        from: "o", to: "d", label: "add one, only if under 100", tone: "warn",
        body: ["→ nothing added: plan is full"],
        say: { en: "Omer's waits its turn, sees 100, adds nothing. He's told the plan is full. Adding a delay would fix nothing.", he: "של עומר מחכה לתורה, רואה 100, ולא מוסיפה כלום. הוא מקבל הודעה שהתוכנית מלאה. השהיה לא הייתה מתקנת כלום." },
      },
    ],
  },

  "ram-vs-disk": {
    cap: { en: "A cache that only ever grows, until the app runs out of memory and crashes", he: "cache שרק גדל, עד שלאפליקציה נגמר הזיכרון והיא קורסת" },
    actors: [
      { id: "q", icon: "🌐", label: { en: "Requests", he: "בקשות" } },
      code,
      { id: "m", icon: "🧠", label: { en: "Memory", he: "זיכרון" } },
      { id: "g", icon: "🧹", label: { en: "Memory cleaner", he: "מנקה הזיכרון" } },
    ],
    beats: [
      {
        from: "q", to: "c", label: "GET /api/contacts?q=dan",
        say: { en: "Each search runs, and the code keeps the result 'to be faster next time'. That's a cache.", he: "כל חיפוש רץ, והקוד שומר את התוצאה 'כדי שבפעם הבאה יהיה מהיר יותר'. זה cache." },
      },
      {
        from: "c", to: "m", label: "remember results for 'dan'",
        body: ["kept for as long as the app runs"],
        say: { en: "The saved results aren't tied to one request, so they stay after every request ends.", he: "התוצאות השמורות לא קשורות לבקשה אחת, אז הן נשארות גם אחרי שכל בקשה נגמרת." },
      },
      {
        from: "g", to: "m", label: "cleanup round",
        body: ["finished requests: cleared", "saved results: still kept"],
        say: { en: "The memory cleaner throws out what nothing uses. The cache still holds every result, so they all stay.", he: "מנקה הזיכרון זורק את מה ששום דבר לא משתמש בו. ה-cache עדיין מחזיק כל תוצאה, אז כולן נשארות." },
      },
      {
        from: "q", to: "c", label: "day 3 · 180,000 searches",
        say: { en: "Nothing ever removes an old result. Every new search adds one.", he: "שום דבר לא מוחק תוצאה ישנה אף פעם. כל חיפוש חדש מוסיף אחת." },
      },
      {
        from: "m", to: "m", label: "280 MB → 1.1 GB → 3.9 GB", tone: "warn",
        say: { en: "The memory graph is a staircase, not a sawtooth. It only ever goes up.", he: "גרף הזיכרון הוא מדרגות, לא שיני מסור. הוא רק עולה." },
      },
      {
        from: "m", to: "c", label: "Out of memory", tone: "err",
        say: { en: "The app is killed and restarted, like clockwork. Anything kept only in memory is gone.", he: "האפליקציה נהרגת ומופעלת מחדש, כמו שעון. כל מה שנשמר רק בזיכרון נעלם." },
      },
      {
        from: "c", to: "c", label: "keep only the last 500", tone: "ok",
        body: ["each one expires after 1 minute"],
        say: { en: "The fix answers one question: what removes old entries? Now a size limit and an expiry time do.", he: "התיקון עונה על שאלה אחת: מה מוחק רשומות ישנות? עכשיו מגבלת גודל וזמן תפוגה עושים את זה." },
      },
      {
        from: "m", to: "m", label: "steady around 300 MB", tone: "ok",
        say: { en: "The graph becomes a sawtooth: up, cleaned, down. Ask that question about anything the AI keeps in memory.", he: "הגרף הופך לשיני מסור: עולה, מתנקה, יורד. שאלו את השאלה הזאת על כל דבר שה-AI שומר בזיכרון." },
      },
    ],
  },

  "unit-integration-e2e": {
    cap: { en: "The AI renames one field. Three kinds of tests give three different answers", he: "ה-AI משנה שם של שדה אחד. שלושה סוגי טסטים נותנים שלוש תשובות שונות" },
    actors: [
      agent,
      { id: "u", icon: "🧪", label: { en: "Unit tests", he: "טסטי יחידה" } },
      { id: "i", icon: "🔗", label: { en: "Integration tests", he: "טסטי אינטגרציה" } },
      { id: "e", icon: "🎭", label: { en: "E2E tests", he: "טסטי E2E" } },
    ],
    beats: [
      {
        from: "a", to: "u", label: "rename stage → deal_stage",
        say: { en: "The AI renames a field across 18 files, but forgets to update the database itself.", he: "ה-AI משנה שם של שדה ב-18 קבצים, אבל שוכח לעדכן את מסד הנתונים עצמו." },
      },
      {
        from: "u", to: "u", label: "210 passed · 0.4s", tone: "ok",
        say: { en: "Unit tests check one small piece at a time, with fake data. All green, in under a second.", he: "טסטי יחידה בודקים חלק קטן אחד בכל פעם, עם נתונים מזויפים. הכול ירוק, בפחות משנייה." },
      },
      {
        from: "u", to: "i", label: "run the integration tests",
        say: { en: "Integration tests run the pieces together, against a real test database.", he: "טסטי אינטגרציה מריצים את החלקים יחד, מול מסד נתונים אמיתי לבדיקות." },
      },
      {
        from: "i", to: "i", label: "no field called deal_stage", tone: "err",
        body: ["test: list contacts by stage"],
        say: { en: "The real database still says 'stage'. Every piece was fine; the join between them broke.", he: "במסד האמיתי זה עדיין 'stage'. כל חלק היה תקין, החיבור ביניהם נשבר." },
      },
      {
        from: "a", to: "i", label: "rename it in the database too",
        say: { en: "The AI adds the missing database change.", he: "ה-AI מוסיף את השינוי שחסר במסד הנתונים." },
      },
      {
        from: "i", to: "e", label: "26 passed · 5s", tone: "ok",
        say: { en: "Integration is green. On to the slowest, most realistic level.", he: "האינטגרציה ירוקה. ממשיכים לרמה האיטית והמציאותית ביותר." },
      },
      {
        from: "e", to: "e", label: "add contact → shows in list", tone: "ok",
        body: ["real browser · 4 passed · 24s"],
        say: { en: "E2E tests click through the real app in a browser, like Noa would. Only they prove the button really works.", he: "טסטי E2E לוחצים על האפליקציה האמיתית בדפדפן, כמו שנועה הייתה עושה. רק הם מוכיחים שהכפתור באמת עובד." },
      },
      {
        from: "e", to: "a", label: "240 passed", tone: "ok",
        say: { en: "Lots of unit tests, solid integration around data, sign-in and money, a few E2E. Tell the AI which kind you want.", he: "הרבה טסטי יחידה, אינטגרציה רצינית סביב נתונים, התחברות וכסף, ומעט E2E. תגידו ל-AI איזה סוג אתם רוצים." },
      },
    ],
  },

  regression: {
    cap: { en: "A bug fixed without a test comes back. A bug fixed with one can't", he: "באג שתוקן בלי טסט חוזר. באג שתוקן עם טסט לא יכול לחזור" },
    actors: [you, code, tests, agent],
    beats: [
      {
        from: "y", to: "c", label: "fix: ignore capitals in emails",
        body: ["DANA@acme.io = dana@acme.io"],
        say: { en: "March: Noa sees Dana twice, once as DANA@acme.io. A one-line fix, so obvious nobody writes a test.", he: "מרץ: נועה רואה את דנה פעמיים, פעם אחת כ-DANA@acme.io. תיקון של שורה אחת, כל כך ברור שאף אחד לא כותב טסט." },
      },
      {
        from: "a", to: "c", label: "tidy up: merge email helpers", tone: "warn",
        body: ["- the capitals fix is gone"],
        say: { en: "September: the AI tidies up the code. The line goes, because its reason lived in a chat, not in the repo.", he: "ספטמבר: ה-AI מסדר את הקוד. השורה נעלמת, כי הסיבה שלה חיה בצ'אט, לא בריפו." },
      },
      {
        from: "t", to: "t", label: "npm run check · 248 passed", tone: "ok",
        say: { en: "Every test is green. None of them knew about that bug.", he: "כל הטסטים ירוקים. אף אחד מהם לא ידע על הבאג הזה." },
      },
      {
        from: "c", to: "c", label: "63 duplicate contacts", tone: "err",
        say: { en: "The same bug is back. That's a regression: it worked, it stopped, and nobody decided it should.", he: "אותו באג חזר. זו רגרסיה: זה עבד, זה הפסיק, ואף אחד לא החליט שכך יהיה." },
      },
      {
        from: "y", to: "t", label: "add the failing test first",
        body: ["test: same email in capitals", "      is one contact"],
        say: { en: "This time, first a test named in the customer's words, not the code's.", he: "הפעם, קודם טסט שנקרא במילים של הלקוחה, לא של הקוד." },
      },
      {
        from: "t", to: "y", label: "✗ expected 1 contact, got 2", tone: "err",
        say: { en: "Watch it fail. That proves it really reproduces the bug.", he: "מריצים ורואים שהוא נכשל. זה מוכיח שהוא באמת משחזר את הבאג." },
      },
      {
        from: "y", to: "c", label: "fix + test, one commit", tone: "ok",
        body: ["+ ignore capitals and extra spaces"],
        say: { en: "One commit per bug: the test that fails because of it, and the fix that makes it pass.", he: "commit אחד לכל באג: הטסט שנכשל בגללו, והתיקון שגורם לו לעבור." },
      },
      {
        from: "t", to: "t", label: "249 passed", tone: "ok",
        say: { en: "Green, and now the tests remember why that line exists.", he: "ירוק, ועכשיו הטסטים זוכרים למה השורה הזאת קיימת." },
      },
      {
        from: "t", to: "a", label: "✗ same email in capitals", tone: "err",
        say: { en: "Next time the AI drops that line, this test fails in the automatic checks, before any customer sees it.", he: "בפעם הבאה שה-AI יוריד את השורה, הטסט הזה ייכשל בבדיקות האוטומטיות, לפני שלקוח כלשהו יראה." },
      },
    ],
  },

  "flaky-test": {
    cap: { en: "Same code, green then red. The real cost: red stops meaning anything", he: "אותו קוד, ירוק ואז אדום. המחיר האמיתי: אדום מפסיק להגיד משהו" },
    actors: [
      { id: "i", icon: "🤖", label: { en: "Automatic checks (CI)", he: "בדיקות אוטומטיות (CI)" } },
      { id: "e", icon: "🎭", label: { en: "E2E test", he: "טסט E2E" } },
      { id: "p", icon: "🌐", label: { en: "App", he: "אפליקציה" } },
    ],
    beats: [
      {
        from: "e", to: "p", label: "click Save · wait 0.5 s",
        body: ["then check the list"],
        say: { en: "The test adds a contact, then always waits half a second before checking the list.", he: "הטסט מוסיף איש קשר, ואז תמיד מחכה חצי שנייה לפני שהוא בודק את הרשימה." },
      },
      {
        from: "p", to: "e", label: "row shows after 0.18 s", tone: "ok",
        say: { en: "Usually saving takes less than a fifth of a second. Green.", he: "בדרך כלל השמירה לוקחת פחות מחמישית שנייה. ירוק." },
      },
      {
        from: "p", to: "e", label: "row shows after 0.62 s", tone: "err",
        body: ["row not there yet ✗"],
        say: { en: "On a busy test machine it took 0.62 s. Red, on the same code. A flaky test passes or fails by luck.", he: "במכונת בדיקות עמוסה זה לקח 0.62 שניות. אדום, על אותו קוד. טסט הפכפך עובר או נכשל לפי מזל." },
      },
      {
        from: "i", to: "i", label: "run again → ✓", tone: "warn",
        say: { en: "Retry, green. After a few weeks of this, the team presses retry without reading.", he: "מריצים שוב, ירוק. אחרי כמה שבועות כאלה, הצוות לוחץ retry בלי לקרוא." },
      },
      {
        from: "i", to: "i", label: "✗ Omer can open Dana's contact", tone: "err",
        body: ["run again → ✓ by luck → shipped"],
        say: { en: "Then a real bug fails a test. The retry passes by luck and it goes live. The flaky test cost you the meaning of red.", he: "ואז באג אמיתי מפיל טסט. ההרצה החוזרת עוברת במזל, וזה עולה לאוויר. הטסט ההפכפך עלה לכם במשמעות של אדום." },
      },
      {
        from: "e", to: "e", label: "wait for the row, not the clock", tone: "ok",
        body: ["- wait half a second", "+ wait until the row appears"],
        say: { en: "Fix it within a day: wait for the thing itself. The test keeps looking until the row shows up.", he: "מתקנים תוך יום: מחכים לדבר עצמו. הטסט ממשיך לחפש עד שהשורה מופיעה." },
      },
      {
        from: "e", to: "p", label: "click Save",
        say: { en: "Same slow machine, same test.", he: "אותה מכונה איטית, אותו טסט." },
      },
      {
        from: "p", to: "e", label: "row shows after 0.62 s ✓", tone: "ok",
        say: { en: "Green. Just waiting longer would only hide the question: what is this test actually waiting for?", he: "ירוק. סתם לחכות יותר רק היה מסתיר את השאלה: למה הטסט הזה בעצם מחכה?" },
      },
    ],
  },
};
