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
const tests = { id: "t", icon: "🧪", label: { en: "Test runner", he: "הרצת טסטים" } };

export const EARLY_SCENES: Record<string, Scene> = {
  "compiler-interpreter": {
    cap: { en: "One typo, two translators. One stops you in seconds, the other waits for a user", he: "טעות הקלדה אחת, שני מתרגמים. אחד עוצר אתכם תוך שניות, השני מחכה למשתמש" },
    actors: [
      code,
      { id: "k", icon: "🛠️", label: { en: "Compiler (tsc)", he: "קומפיילר (tsc)" } },
      { id: "i", icon: "▶️", label: { en: "Interpreter (node)", he: "אינטרפרטר (node)" } },
      { id: "u", icon: "👩", label: { en: "Dana", he: "דנה" } },
    ],
    beats: [
      {
        from: "c", to: "k", label: "tsc --noEmit",
        body: ["// reminders.ts, line 14", "if (isFirstOfMonth) sendRemindr(c)"],
        say: { en: "The compiler reads the whole project first, even the branch that only runs once a month.", he: "הקומפיילר קורא קודם את כל הפרויקט, גם את הענף שרץ רק פעם בחודש." },
      },
      {
        from: "k", to: "k", label: "TS2304: Cannot find 'sendRemindr'", tone: "err",
        say: { en: "It refuses and names the line. Nothing is built, so nothing broken can ship.", he: "הוא מסרב ומציין את השורה. שום דבר לא נבנה, אז שום דבר שבור לא יוצא." },
      },
      {
        from: "k", to: "c", label: "✗ reminders.ts:14:23", tone: "err",
        say: { en: "The error reaches you two seconds after you saved. Not a user, you.", he: "השגיאה מגיעה אליכם שתי שניות אחרי השמירה. לא למשתמש, אליכם." },
      },
      {
        from: "c", to: "i", label: "node reminders.js",
        body: ["// same typo, plain JavaScript", "if (isFirstOfMonth) sendRemindr(c)"],
        say: { en: "Now the same typo in plain JavaScript. The interpreter starts at once and runs line by line.", he: "עכשיו אותה טעות ב-JavaScript רגיל. האינטרפרטר מתחיל מיד ומריץ שורה אחרי שורה." },
      },
      {
        from: "i", to: "u", label: "contacts page · works", tone: "ok",
        say: { en: "Every page Dana opens works. The broken line has not been reached, so nothing complains.", he: "כל עמוד שדנה פותחת עובד. אף אחד עוד לא הגיע לשורה השבורה, אז שום דבר לא מתלונן." },
      },
      {
        from: "u", to: "i", label: "1st of the month · send reminders",
        say: { en: "Three weeks later, on the 1st, the monthly branch runs for the first time.", he: "שלושה שבועות אחר כך, ב-1 לחודש, הענף החודשי רץ בפעם הראשונה." },
      },
      {
        from: "i", to: "i", label: "ReferenceError · reminders.js:14", tone: "err",
        body: ["sendRemindr is not defined"],
        say: { en: "Same typo, same one-letter fix. But a user found it, weeks late. That is why 'it builds' proves more in TypeScript.", he: "אותה טעות, אותו תיקון של אות אחת. אבל משתמשת מצאה אותה, באיחור של שבועות. לכן 'זה נבנה' מוכיח יותר ב-TypeScript." },
      },
    ],
  },

  "clone-push-pull": {
    cap: { en: "Two copies of one history. Git syncs them only when you tell it to", he: "שני עותקים של אותה היסטוריה. Git מסנכרן אותם רק כשאתם אומרים לו" },
    actors: [laptop, github, omer],
    beats: [
      {
        from: "g", to: "l", label: "git clone github.com/dana/pocket-crm",
        body: ["Receiving objects: 100% (312/312)"],
        say: { en: "Clone copies the whole repo down, history included. From now on you work on your own copy.", he: "clone מעתיק את כל הריפו למחשב, כולל ההיסטוריה. מעכשיו אתם עובדים על עותק משלכם." },
      },
      {
        from: "l", to: "l", label: "git commit -m \"add stage filter\"",
        say: { en: "A commit saves a point in your copy only. GitHub and Omer see nothing yet.", he: "commit שומר נקודה רק בעותק שלכם. GitHub ועומר עוד לא רואים כלום." },
      },
      {
        from: "o", to: "g", label: "git push origin main",
        body: ["a41f2c  move lib/ to src/lib/"],
        say: { en: "Meanwhile Omer pushes his own commit to the shared copy.", he: "בינתיים עומר עושה push לקומיט שלו לעותק המשותף." },
      },
      {
        from: "l", to: "g", label: "git push origin main", tone: "err",
        body: ["! [rejected]  main -> main (fetch first)"],
        say: { en: "Your push is refused. Git will not erase Omer's commit to make room for yours.", he: "ה-push שלכם נדחה. Git לא ימחק את הקומיט של עומר כדי לפנות מקום לשלכם." },
      },
      {
        from: "g", to: "l", label: "git pull",
        body: ["a41f2c  move lib/ to src/lib/", "Merge made by the 'ort' strategy."],
        say: { en: "Pull brings his commit down and merges it with yours. Nothing was overwritten.", he: "pull מוריד את הקומיט שלו וממזג אותו עם שלכם. שום דבר לא נדרס." },
      },
      {
        from: "l", to: "g", label: "git push origin main", tone: "ok",
        body: ["a41f2c..9b07e1  main -> main"],
        say: { en: "Now the push goes through. Both commits live in the shared copy.", he: "עכשיו ה-push עובר. שני הקומיטים נמצאים בעותק המשותף." },
      },
      {
        from: "g", to: "o", label: "git pull", tone: "ok",
        say: { en: "Omer pulls to get yours. Pull before you start, push before you stop, and Git stays boring.", he: "עומר עושה pull כדי לקבל את שלכם. pull לפני שמתחילים, push לפני שמפסיקים, ו-Git נשאר משעמם." },
      },
    ],
  },

  "commit-branch-merge": {
    cap: { en: "Let the agent loose on a branch. A bad attempt costs two commands", he: "משחררים את הסוכן על ברנץ'. ניסיון גרוע עולה שתי פקודות" },
    actors: [
      { id: "m", icon: "🏠", label: { en: "main", he: "main" } },
      { id: "r", icon: "🌿", label: { en: "Branch", he: "ברנץ'" } },
      agent,
    ],
    beats: [
      {
        from: "m", to: "r", label: "git switch -c step-09-import",
        say: { en: "Before the agent touches anything, make a branch. It starts as an exact copy of main.", he: "לפני שהסוכן נוגע במשהו, פותחים ברנץ'. הוא מתחיל כעותק מדויק של main." },
      },
      {
        from: "a", to: "r", label: "commit 3e1a9c",
        body: ["import contacts from CSV", "22 files changed"],
        say: { en: "The agent works and commits on the branch. main has not changed at all.", he: "הסוכן עובד ועושה commit על הברנץ'. ב-main שום דבר לא השתנה." },
      },
      {
        from: "r", to: "r", label: "npm run check · 1 failed", tone: "err",
        body: ["export.test.ts", "expected 20 rows, got 0"],
        say: { en: "The export broke: a shared helper changed shape. On main this would be an evening of untangling.", he: "הייצוא נשבר: פונקציית עזר משותפת שינתה צורה. על main זה היה ערב שלם של פירוק." },
      },
      {
        from: "r", to: "m", label: "git switch main", tone: "warn",
        body: ["git branch -D step-09-import"],
        say: { en: "Here it is two commands: switch back, delete the branch. The app is exactly as it was at 14:00.", he: "כאן זה שתי פקודות: חוזרים, מוחקים את הברנץ'. האפליקציה בדיוק כמו שהייתה ב-14:00." },
      },
      {
        from: "m", to: "r", label: "git switch -c step-09-import",
        say: { en: "Start again from a known-good state, with a prompt that names the export helper.", he: "מתחילים שוב ממצב שידוע שעובד, עם פרומפט שמציין את פונקציית הייצוא." },
      },
      {
        from: "a", to: "r", label: "commit 7c42d0",
        body: ["import CSV, keep toRow() shape"],
        say: { en: "Small commits with messages you could still read at 2am.", he: "commits קטנים, עם הודעות שאפשר לקרוא גם בשתיים בלילה." },
      },
      {
        from: "r", to: "r", label: "npm run check · 48 passed", tone: "ok",
        say: { en: "Green on the branch. Now it has earned its way into main.", he: "ירוק על הברנץ'. עכשיו הוא הרוויח את הכניסה ל-main." },
      },
      {
        from: "r", to: "m", label: "git merge step-09-import", tone: "ok",
        body: ["Fast-forward", " 9 files changed"],
        say: { en: "Merge folds the branch back into main. Only the version that works ever lands there.", he: "merge מחזיר את הברנץ' אל main. רק הגרסה שעובדת מגיעה לשם." },
      },
    ],
  },

  "merge-conflict": {
    cap: { en: "Two people changed the same line. Git refuses to guess and asks you", he: "שני אנשים שינו את אותה שורה. Git מסרב לנחש ושואל אתכם" },
    actors: [
      you,
      { id: "m", icon: "🔀", label: { en: "main", he: "main" } },
      omer,
    ],
    beats: [
      {
        from: "o", to: "m", label: "git merge step-11-proposal",
        body: ["STAGES = [lead, qualified,", "  proposal, won, lost]"],
        say: { en: "Omer merges first. He added a 'proposal' stage to the stages line.", he: "עומר עושה merge ראשון. הוא הוסיף שלב 'proposal' לשורת השלבים." },
      },
      {
        from: "m", to: "y", label: "git merge main",
        body: ["STAGES = [lead, qualified,", "  won, lost, on_hold]"],
        say: { en: "On your branch you changed the same line: an 'on_hold' stage. Now you bring main in.", he: "בברנץ' שלכם שיניתם את אותה שורה: שלב 'on_hold'. עכשיו אתם מושכים פנימה את main." },
      },
      {
        from: "y", to: "y", label: "Auto-merging 6 files", tone: "ok",
        say: { en: "Everything else merges on its own. Different regions, so both sides are kept.", he: "כל השאר מתמזג לבד. אזורים שונים, אז שני הצדדים נשמרים." },
      },
      {
        from: "y", to: "y", label: "CONFLICT (content): stages.ts", tone: "err",
        body: ["<<<<<<< HEAD", "  won, lost, on_hold]", "=======", "  proposal, won, lost]"],
        say: { en: "Same line, so Git writes both versions between markers and stops. Not corruption: a question.", he: "אותה שורה, אז Git כותב את שתי הגרסאות בין סימנים ועוצר. זה לא קובץ הרוס, זו שאלה." },
      },
      {
        from: "y", to: "y", label: "git checkout --ours stages.ts?", tone: "warn",
        say: { en: "The shortcut: keep your whole side. It compiles, and Omer's stage vanishes without a trace.", he: "קיצור הדרך: לשמור את כל הצד שלכם. זה מתקמפל, והשלב של עומר נעלם בלי להשאיר עקבות." },
      },
      {
        from: "y", to: "y", label: "resolved by hand", tone: "ok",
        body: ["STAGES = [lead, qualified,", "  proposal, won, lost, on_hold]"],
        say: { en: "Read both instead. Each side had a reason, so here the answer keeps both stages. Delete the markers.", he: "במקום זה, קוראים את שתיהן. לכל צד הייתה סיבה, אז כאן התשובה שומרת את שני השלבים. מוחקים את הסימנים." },
      },
      {
        from: "y", to: "m", label: "git add stages.ts && git commit", tone: "ok",
        say: { en: "Committing the edited file is the resolution. Branches merged within a day keep conflicts this small.", he: "ה-commit של הקובץ המתוקן הוא ההכרעה. ברנצ'ים שמתמזגים תוך יום שומרים על קונפליקטים קטנים כאלה." },
      },
    ],
  },

  "pull-request-and-code-review": {
    cap: { en: "An agent-made change gets split, read backwards, and merged only after review", he: "שינוי שסוכן כתב מתפצל, נקרא מהסוף להתחלה, ומתמזג רק אחרי סקירה" },
    actors: [
      you,
      github,
      { id: "n", icon: "🧑‍🔬", label: { en: "Noa (reviewer)", he: "נועה (סוקרת)" } },
    ],
    beats: [
      {
        from: "y", to: "g", label: "git push origin step-13-auth",
        say: { en: "The branch goes up. It is on GitHub now, but not in main.", he: "הברנץ' עולה. הוא עכשיו ב-GitHub, אבל לא ב-main." },
      },
      {
        from: "g", to: "g", label: "PR #14 · 41 files · +912 −37", tone: "warn",
        say: { en: "One sitting with the agent, 41 files. Past a few hundred lines, reviewers stop reading and start skimming.", he: "ישיבה אחת עם הסוכן, 41 קבצים. אחרי כמה מאות שורות, סוקרים מפסיקים לקרוא ומתחילים לרפרף." },
      },
      {
        from: "y", to: "g", label: "split into #15, #16, #17",
        body: ["#15 migration", "#16 API routes", "#17 sign-in page"],
        say: { en: "So you split it. Each piece is small enough to run on its own and actually read.", he: "אז מפצלים. כל חלק קטן מספיק כדי להריץ אותו לבד ולקרוא אותו באמת." },
      },
      {
        from: "g", to: "n", label: "PR #16 · 3 files · +96 −4",
        say: { en: "Noa reads the red lines first. What was removed matters more than what was added.", he: "נועה קוראת קודם את השורות האדומות. מה שנמחק חשוב יותר ממה שנוסף." },
      },
      {
        from: "n", to: "g", label: "Changes requested · contacts.ts:31", tone: "err",
        body: ["- .where(eq(contacts.ownerId, user.id))", "+ .where(eq(contacts.id, id))"],
        say: { en: "One quiet deleted line: the owner filter. Without it, anyone can open anyone's contact by its id.", he: "שורה אחת שנמחקה בשקט: הסינון לפי בעלים. בלעדיו, כל אחד יכול לפתוח כל איש קשר לפי ה-id." },
      },
      {
        from: "y", to: "g", label: "commit a19f0e · restore owner filter",
        body: ["+ test: Omer gets 404 on Dana's contact"],
        say: { en: "The fix comes with a test, so the check can't disappear quietly again.", he: "התיקון מגיע עם טסט, כדי שהבדיקה לא תוכל להיעלם בשקט שוב." },
      },
      {
        from: "n", to: "g", label: "✓ Approved", tone: "ok",
        say: { en: "Approved, and the checks are green.", he: "אושר, והבדיקות ירוקות." },
      },
      {
        from: "g", to: "g", label: "Merged into main", tone: "ok",
        say: { en: "Only now does it join main. If you can't say what it changes and how to undo it, it wasn't reviewed.", he: "רק עכשיו זה נכנס ל-main. אם אתם לא יכולים להגיד מה זה משנה ואיך מבטלים, זה לא נסקר." },
      },
    ],
  },

  dns: {
    cap: { en: "The name becomes a number, and the number gets cached for as long as you said", he: "השם הופך למספר, והמספר נשמר בקאש כמה זמן שאמרתם" },
    actors: [
      browser,
      { id: "r", icon: "🔎", label: { en: "Resolver", he: "Resolver" } },
      { id: "n", icon: "📒", label: { en: "Nameserver", he: "שרת השמות" } },
    ],
    beats: [
      {
        from: "b", to: "r", label: "A? pocketcrm.app",
        say: { en: "Dana types pocketcrm.app. Machines connect to numbers, so the browser asks a resolver.", he: "דנה מקלידה pocketcrm.app. מחשבים מתחברים למספרים, אז הדפדפן שואל resolver." },
      },
      {
        from: "r", to: "n", label: "A? pocketcrm.app",
        say: { en: "The resolver asks its way down to the domain's nameserver, the one that holds the record.", he: "ה-resolver שואל שלב אחרי שלב, עד שרת השמות של הדומיין, זה שמחזיק את הרשומה." },
      },
      {
        from: "n", to: "r", label: "A 203.0.113.10 · TTL 86400",
        say: { en: "The answer comes with a TTL: you may keep this for 86,400 seconds. A full day.", he: "התשובה מגיעה עם TTL: מותר לשמור אותה 86,400 שניות. יום שלם." },
      },
      {
        from: "r", to: "b", label: "203.0.113.10",
        say: { en: "The browser connects. The resolver keeps the answer in its cache.", he: "הדפדפן מתחבר. ה-resolver שומר את התשובה בקאש שלו." },
      },
      {
        from: "n", to: "n", label: "A → 198.51.100.7 (new host)", tone: "warn",
        say: { en: "That evening you move to a new host and update the record. The nameserver changes instantly.", he: "באותו ערב אתם עוברים לאחסון חדש ומעדכנים את הרשומה. שרת השמות משתנה מיד." },
      },
      {
        from: "b", to: "r", label: "A? pocketcrm.app",
        body: ["(Omer, same resolver, 2 hours later)"],
        say: { en: "Two hours later, Omer asks through the same resolver.", he: "שעתיים אחר כך, עומר שואל דרך אותו resolver." },
      },
      {
        from: "r", to: "b", label: "203.0.113.10 (cached, 22h left)", tone: "err",
        say: { en: "He gets the old address from cache. The old server is still up, serving stale pages. The nameserver was never asked.", he: "הוא מקבל את הכתובת הישנה מהקאש. השרת הישן עדיין למעלה ומגיש דפים ישנים. אף אחד לא שאל את שרת השמות." },
      },
      {
        from: "n", to: "n", label: "TTL 86400 → 300 (a day before)", tone: "info",
        say: { en: "The only fix works in advance: lower the TTL to 300 a day before the move, so caches forget in minutes.", he: "התיקון היחיד עובד רק מראש: מורידים את ה-TTL ל-300 יום לפני המעבר, כך שהקאשים שוכחים תוך דקות." },
      },
    ],
  },

  "package-manager": {
    cap: { en: "package.json is the recipe. The lock file is the receipt", he: "package.json הוא המתכון. קובץ הנעילה הוא הקבלה" },
    actors: [
      laptop,
      { id: "p", icon: "📦", label: { en: "npm registry", he: "מאגר npm" } },
      { id: "i", icon: "🤖", label: { en: "CI", he: "CI" } },
    ],
    beats: [
      {
        from: "l", to: "p", label: "npm install csv-kit",
        say: { en: "You ask for a package. package.json saves a range: ^2.1.0 means 2.1.0 or any newer 2.x.", he: "מבקשים חבילה. package.json שומר טווח: ^2.1.0 אומר 2.1.0 או כל 2.x חדשה יותר." },
      },
      {
        from: "p", to: "l", label: "csv-kit@2.1.0 + 3 deps", tone: "ok",
        body: ["package.json  \"csv-kit\": \"^2.1.0\"", "lock file     csv-kit 2.1.0 + 3, exact"],
        say: { en: "The lock file writes down exactly what arrived, helpers' helpers included.", he: "קובץ הנעילה רושם בדיוק מה הגיע, כולל התלויות של התלויות." },
      },
      {
        from: "l", to: "i", label: "git push · no lock file", tone: "warn",
        say: { en: "But the lock file was never committed. CI gets only the recipe.", he: "אבל קובץ הנעילה אף פעם לא נכנס ל-commit. ה-CI מקבל רק את המתכון." },
      },
      {
        from: "i", to: "p", label: "npm install",
        say: { en: "A month later, a fresh install on CI. The range allows any 2.x.", he: "חודש אחר כך, התקנה נקייה ב-CI. הטווח מרשה כל 2.x." },
      },
      {
        from: "p", to: "i", label: "csv-kit@2.4.0", tone: "warn",
        body: ["2.4.0: new default delimiter handling"],
        say: { en: "It gets 2.4.0, with a changed default. Nobody touched a line of your code.", he: "הוא מקבל 2.4.0, עם ברירת מחדל ששונתה. אף אחד לא נגע בשורה בקוד שלכם." },
      },
      {
        from: "i", to: "i", label: "import.test.ts · 20 rows → 0", tone: "err",
        say: { en: "The import test fails on CI and passes on your laptop. Same code, different library.", he: "טסט הייבוא נכשל ב-CI ועובר אצלכם. אותו קוד, ספרייה אחרת." },
      },
      {
        from: "l", to: "i", label: "git push · package-lock.json",
        say: { en: "Commit the lock file. When the AI adds a package, read the lock diff: it shows everything that really arrived.", he: "מכניסים את קובץ הנעילה ל-commit. כשה-AI מוסיף חבילה, קוראים את ה-diff שלו: הוא מראה כל מה שבאמת הגיע." },
      },
      {
        from: "i", to: "p", label: "npm ci", tone: "ok",
        body: ["csv-kit 2.1.0 (from the lock file)"],
        say: { en: "npm ci installs exactly the locked tree, and fails loudly if it disagrees with package.json.", he: "npm ci מתקין בדיוק את מה שנעול, ונכשל בקול אם זה לא מתאים ל-package.json." },
      },
    ],
  },

  "forms-and-validation": {
    cap: { en: "The browser check is for speed. The server check is the one that decides", he: "הבדיקה בדפדפן היא בשביל מהירות. הבדיקה בשרת היא זו שמחליטה" },
    actors: [browser, server, db],
    beats: [
      {
        from: "b", to: "b", label: "contactSchema · email invalid", tone: "err",
        body: ['email: "noa@"'],
        say: { en: "Noa types a broken email. The browser runs the schema and shows the message before any request.", he: "נועה מקלידה מייל שבור. הדפדפן מריץ את הסכמה ומראה הודעה עוד לפני שיש בקשה." },
      },
      {
        from: "b", to: "s", label: "POST /api/contacts",
        body: ['{ "name": "" }', "(required removed in DevTools)"],
        say: { en: "But the browser isn't yours. Anyone can delete the check in DevTools, or skip the page with curl.", he: "אבל הדפדפן לא שלכם. כל אחד יכול למחוק את הבדיקה ב-DevTools, או לדלג על העמוד עם curl." },
      },
      {
        from: "s", to: "s", label: "contactSchema.safeParse → ✗", tone: "err",
        say: { en: "The server runs the same schema again. This one is the truth.", he: "השרת מריץ שוב את אותה סכמה. הבדיקה הזאת היא האמת." },
      },
      {
        from: "s", to: "b", label: "400 Bad Request", status: 400,
        body: ['{ "errors": { "name": "Required" } }'],
        say: { en: "400 with field errors, before the database is touched. The page shows it by the field, not as a crash.", he: "400 עם שגיאות לפי שדה, לפני שנגעו במסד. העמוד מציג אותה ליד השדה, לא כקריסה." },
      },
      {
        from: "b", to: "s", label: "POST /api/contacts",
        body: ['{ "name": "Noa Levi",', '  "email": "noa@levi.io" }'],
        say: { en: "Fixed and sent again.", he: "תוקן ונשלח שוב." },
      },
      {
        from: "s", to: "d", label: "INSERT INTO contacts …",
        say: { en: "Only data that passed the server's check reaches the database.", he: "רק נתונים שעברו את הבדיקה בשרת מגיעים למסד." },
      },
      {
        from: "s", to: "b", label: "201 Created", status: 201,
        body: ["Location: /api/contacts/42"],
        say: { en: "One schema, used twice: in the browser for speed, on the server for truth.", he: "סכמה אחת, בשני מקומות: בדפדפן בשביל מהירות, בשרת בשביל אמת." },
      },
    ],
  },

  "bug-stack-trace": {
    cap: { en: "The call goes down through the frames. The trace brings back the path it took", he: "הקריאה יורדת דרך השכבות. ה-stack trace מחזיר את הדרך שהיא עשתה" },
    actors: [
      browser,
      { id: "f", icon: "🧱", label: { en: "Next.js", he: "Next.js" } },
      { id: "r", icon: "📄", label: { en: "route.ts", he: "route.ts" } },
      { id: "v", icon: "📄", label: { en: "contacts.ts", he: "contacts.ts" } },
    ],
    beats: [
      {
        from: "b", to: "f", label: "GET /api/contacts/42",
        say: { en: "Dana opens a contact. The request enters through the framework.", he: "דנה פותחת איש קשר. הבקשה נכנסת דרך הפריימוורק." },
      },
      {
        from: "f", to: "r", label: "GET(req, { params })",
        say: { en: "The framework calls your route handler.", he: "הפריימוורק קורא לפונקציית ה-route שלכם." },
      },
      {
        from: "r", to: "v", label: "ownerName(contact)",
        say: { en: "Your route calls your own function with the contact it loaded.", he: "ה-route שלכם קורא לפונקציה שלכם עם איש הקשר שהוא טען." },
      },
      {
        from: "v", to: "v", label: "TypeError", tone: "err",
        body: ["Cannot read properties of undefined", "(reading 'name')"],
        say: { en: "Line 42 expects contact.owner, and it is undefined. This is where it actually broke.", he: "שורה 42 מצפה ל-contact.owner, והוא undefined. כאן זה באמת נשבר." },
      },
      {
        from: "f", to: "b", label: "500 Internal Server Error", status: 500,
        say: { en: "Dana sees a 500. The real story is printed in the terminal.", he: "דנה רואה 500. הסיפור האמיתי מודפס בטרמינל." },
      },
      {
        from: "f", to: "f", label: "stack trace · newest first", tone: "info",
        body: ["at ownerName (lib/contacts.ts:42)", "at GET (app/api/contacts/[id]/route.ts:17)", "at … 12 frames in node_modules/next"],
        say: { en: "Read top down: the top frame broke, the next one called it. The framework lines only prove the request came in.", he: "קוראים מלמעלה: השורה העליונה נשברה, זו שמתחתיה קראה לה. שורות הפריימוורק רק מוכיחות שהבקשה נכנסה." },
      },
      {
        from: "v", to: "v", label: "if (!contact.owner) return \"\"", tone: "warn",
        say: { en: "Ask the AI to 'fix this error' and you often get this. The 500 disappears, and the real bug becomes invisible.", he: "תבקשו מה-AI 'לתקן את השגיאה' ולרוב תקבלו את זה. ה-500 נעלם, והבאג האמיתי הופך לבלתי נראה." },
      },
      {
        from: "v", to: "v", label: "why is contact.owner undefined?", tone: "ok",
        body: ["CSV import saved 17 rows", "without owner_id"],
        say: { en: "Paste the full trace and ask why instead. The import saved contacts with no owner. Fix that, not line 42.", he: "הדביקו את כל ה-trace ושאלו למה. הייבוא שמר אנשי קשר בלי בעלים. את זה מתקנים, לא את שורה 42." },
      },
    ],
  },

  "localhost-and-port": {
    cap: { en: "localhost is this computer. The port is which door on it", he: "localhost הוא המחשב הזה. הפורט הוא איזו דלת בו" },
    actors: [
      { id: "t", icon: "⌨️", label: { en: "Terminal", he: "טרמינל" } },
      { id: "p", icon: "🚪", label: { en: "localhost:3000", he: "localhost:3000" } },
      browser,
      { id: "v", icon: "☁️", label: { en: "Vercel server", he: "שרת ב-Vercel" } },
    ],
    beats: [
      {
        from: "t", to: "p", label: "npm run dev", tone: "err",
        body: ["Error: listen EADDRINUSE:", "address already in use :::3000"],
        say: { en: "Door 3000 is taken. Nothing is broken: yesterday's server never shut down and is still standing there.", he: "דלת 3000 תפוסה. שום דבר לא שבור: השרת של אתמול לא נסגר ועדיין עומד שם." },
      },
      {
        from: "t", to: "t", label: "lsof -i :3000",
        body: ["node  8812  TCP *:3000 (LISTEN)"],
        say: { en: "One command shows who holds the door: an old node process, PID 8812.", he: "פקודה אחת מראה מי מחזיק את הדלת: תהליך node ישן, PID 8812." },
      },
      {
        from: "t", to: "t", label: "kill 8812", tone: "ok",
        say: { en: "Stop it and the door is free. Moving to 3001 instead is how a confusing hour begins.", he: "עוצרים אותו והדלת פנויה. לעבור ל-3001 במקום זה, ככה מתחילה שעה מבלבלת." },
      },
      {
        from: "t", to: "p", label: "npm run dev · ready", tone: "ok",
        body: ["- Local: http://localhost:3000"],
        say: { en: "Now your app listens on door 3000 of this computer.", he: "עכשיו האפליקציה שלכם מאזינה בדלת 3000 של המחשב הזה." },
      },
      {
        from: "b", to: "p", label: "GET localhost:3000/api/health",
        say: { en: "The browser knocks on the same machine, same door. No network involved.", he: "הדפדפן דופק על אותו מחשב, אותה דלת. בלי רשת בכלל." },
      },
      {
        from: "p", to: "b", label: "200 OK", status: 200,
        body: ['{ "ok": true }'],
        say: { en: "It answers. So far, everything lives on your laptop.", he: "היא עונה. בינתיים, הכול חי על המחשב שלכם." },
      },
      {
        from: "v", to: "v", label: "connect ECONNREFUSED 127.0.0.1:5432", tone: "err",
        body: ["DATABASE_URL=postgres://localhost/crm"],
        say: { en: "Deployed, the same config breaks. On the server, localhost means the server, and no database is there.", he: "אחרי דיפלוי, אותה הגדרה נשברת. בשרת, localhost זה השרת עצמו, ואין שם מסד נתונים." },
      },
      {
        from: "v", to: "v", label: "DATABASE_URL from env vars", tone: "ok",
        body: ["postgres://…@ep-x.neon.tech/crm"],
        say: { en: "Keep the address in one config value, so moving machines is one change, not a search.", he: "שומרים את הכתובת בערך הגדרה אחד, כך שמעבר מחשב הוא שינוי אחד ולא חיפוש." },
      },
    ],
  },

  "the-network-tab": {
    cap: { en: "\"Something went wrong\" becomes a diagnosis in one minute", he: "\"משהו השתבש\" הופך לאבחנה תוך דקה" },
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
        say: { en: "The page swallows the answer and shows 'Something went wrong'. Omer is sure the server is broken.", he: "העמוד בולע את התשובה ומציג 'משהו השתבש'. עומר בטוח שהשרת שבור." },
      },
      {
        from: "b", to: "n", label: "F12 → Network → Fetch/XHR",
        say: { en: "Stop guessing. Open DevTools, go to Network, filter to Fetch/XHR, click the red row.", he: "מפסיקים לנחש. פותחים DevTools, עוברים ל-Network, מסננים ל-Fetch/XHR, לוחצים על השורה האדומה." },
      },
      {
        from: "n", to: "n", label: "Response", status: 400,
        body: ['{ "errors": { "stage": "Required" } }'],
        say: { en: "Response shows the real message the page hid: stage is required.", he: "ב-Response רואים את ההודעה האמיתית שהעמוד הסתיר: חסר stage." },
      },
      {
        from: "n", to: "n", label: "Payload", tone: "err",
        body: ['{ "name": "Noa Levi",', '  "email": "noa@levi.io" }'],
        say: { en: "Payload shows what actually left: no stage. The form cleared it when the company field was reset.", he: "ב-Payload רואים מה באמת יצא: אין stage. הטופס ניקה אותו כששדה החברה אופס." },
      },
      {
        from: "n", to: "n", label: "Headers · Timing", tone: "info",
        body: ["Cookie: session=7f3a…  (attached)", "Waiting 38 ms · Download 2 ms"],
        say: { en: "4xx means the request was wrong, not the server. The cookie was sent and the server was fast.", he: "4xx אומר שהבקשה הייתה שגויה, לא השרת. ה-cookie נשלח והשרת היה מהיר." },
      },
      {
        from: "b", to: "s", label: "POST /api/contacts",
        body: ['{ "name": "Noa Levi",', '  "email": "noa@levi.io",', '  "stage": "lead" }'],
        say: { en: "The form keeps the stage now. Same request, with the missing field.", he: "עכשיו הטופס שומר את ה-stage. אותה בקשה, עם השדה שחסר." },
      },
      {
        from: "s", to: "b", label: "201 Created", status: 201,
        say: { en: "Before asking an AI why 'it doesn't work', hand it the real request and the real response.", he: "לפני ששואלים AI למה 'זה לא עובד', נותנים לו את הבקשה האמיתית ואת התשובה האמיתית." },
      },
    ],
  },

  "race-condition": {
    cap: { en: "Two saves, seven milliseconds apart, both sure there is room for one more", he: "שתי שמירות, בהפרש של שבע אלפיות שנייה, ושתיהן בטוחות שיש מקום לעוד אחד" },
    actors: [
      { id: "a", icon: "👩", label: { en: "Dana's tab", he: "הלשונית של דנה" } },
      db,
      { id: "o", icon: "🧑‍🎨", label: { en: "Omer's tab", he: "הלשונית של עומר" } },
    ],
    beats: [
      {
        from: "a", to: "d", label: "SELECT used FROM teams WHERE id=7",
        say: { en: "The free plan allows 100 contacts; the team is at 99. Dana adds one, and her request reads the counter first.", he: "התוכנית החינמית מרשה 100 אנשי קשר, והצוות ב-99. דנה מוסיפה אחד, והבקשה שלה קוראת קודם את המונה." },
      },
      {
        from: "o", to: "d", label: "SELECT used FROM teams WHERE id=7",
        say: { en: "Seven milliseconds later, Omer adds one too. His request reads the same counter.", he: "שבע אלפיות שנייה אחר כך, גם עומר מוסיף אחד. הבקשה שלו קוראת את אותו מונה." },
      },
      {
        from: "d", to: "a", label: "used = 99",
        say: { en: "Dana's code sees 99, checks 99 < 100, and goes ahead.", he: "הקוד של דנה רואה 99, בודק ש-99 קטן מ-100, וממשיך." },
      },
      {
        from: "d", to: "o", label: "used = 99",
        say: { en: "Omer's code sees 99 too. Nothing has been written yet.", he: "גם הקוד של עומר רואה 99. עוד לא נכתב כלום." },
      },
      {
        from: "a", to: "d", label: "INSERT contact · SET used = 100",
        say: { en: "Dana's request writes.", he: "הבקשה של דנה כותבת." },
      },
      {
        from: "o", to: "d", label: "INSERT contact · SET used = 100", tone: "err",
        say: { en: "So does Omer's. 101 contacts, counter says 100. Every line was right; the gap between read and write was not.", he: "גם של עומר. 101 אנשי קשר, והמונה אומר 100. כל שורה הייתה נכונה, הפער בין הקריאה לכתיבה לא." },
      },
      {
        from: "a", to: "d", label: "UPDATE teams SET used = used + 1", tone: "ok",
        body: ["WHERE id = 7 AND used < 100", "→ UPDATE 1"],
        say: { en: "Replay with the fix: check and change in one statement. The database locks the row while it runs.", he: "אותו רגע, עם התיקון: בודקים ומשנים בפקודה אחת. המסד נועל את השורה בזמן שהיא רצה." },
      },
      {
        from: "o", to: "d", label: "UPDATE teams SET used = used + 1", tone: "warn",
        body: ["WHERE id = 7 AND used < 100", "→ UPDATE 0"],
        say: { en: "Omer's waits for the lock, re-checks, sees 100, changes nothing. He's told the plan is full. A sleep fixes nothing.", he: "של עומר מחכה לנעילה, בודקת שוב, רואה 100, ולא משנה כלום. הוא מקבל הודעה שהתוכנית מלאה. sleep לא מתקן כלום." },
      },
    ],
  },

  "memory-leak": {
    cap: { en: "A cache that only ever grows, until the process is killed", he: "קאש שרק גדל, עד שהתהליך נהרג" },
    actors: [
      { id: "q", icon: "🌐", label: { en: "Requests", he: "בקשות" } },
      code,
      { id: "m", icon: "🧠", label: { en: "Memory", he: "זיכרון" } },
      { id: "g", icon: "🧹", label: { en: "Garbage collector", he: "Garbage collector" } },
    ],
    beats: [
      {
        from: "q", to: "c", label: "GET /api/contacts?q=dan",
        say: { en: "Each search runs, and the code keeps the result in a Map 'to be faster next time'.", he: "כל חיפוש רץ, והקוד שומר את התוצאה ב-Map 'כדי שבפעם הבאה יהיה מהיר יותר'." },
      },
      {
        from: "c", to: "m", label: "cache.set(\"dan\", rows)",
        body: ["const cache = new Map()  // module level"],
        say: { en: "The Map lives at module level, so it outlives every request.", he: "ה-Map חי ברמת המודול, אז הוא חי יותר מכל בקשה." },
      },
      {
        from: "g", to: "m", label: "GC sweep",
        body: ["request objects: freed", "cache entries: still referenced"],
        say: { en: "The garbage collector frees what nothing points to. The Map points to every result, so they all stay.", he: "ה-garbage collector משחרר את מה ששום דבר לא מצביע עליו. ה-Map מצביע על כל תוצאה, אז כולן נשארות." },
      },
      {
        from: "q", to: "c", label: "day 3 · 180,000 different searches",
        say: { en: "Nothing ever removes an entry. Every new search adds one.", he: "שום דבר לא מוחק רשומה אף פעם. כל חיפוש חדש מוסיף אחת." },
      },
      {
        from: "m", to: "m", label: "280 MB → 1.1 GB → 3.9 GB", tone: "warn",
        say: { en: "The memory graph is a staircase, not a sawtooth. It only ever goes up.", he: "גרף הזיכרון הוא מדרגות, לא שיני מסור. הוא רק עולה." },
      },
      {
        from: "m", to: "c", label: "JavaScript heap out of memory", tone: "err",
        say: { en: "The process is killed and restarted, at a predictable hour. Anything held only in memory is gone.", he: "התהליך נהרג ומופעל מחדש, בשעה שאפשר לצפות מראש. כל מה שהיה רק בזיכרון נעלם." },
      },
      {
        from: "c", to: "c", label: "new LRUCache({ max: 500 })", tone: "ok",
        body: ["ttl: 60_000  // 1 minute"],
        say: { en: "The fix answers one question: what removes entries from this? Now a size limit and an expiry do.", he: "התיקון עונה על שאלה אחת: מה מוחק רשומות מכאן? עכשיו מגבלת גודל ותוקף עושים את זה." },
      },
      {
        from: "m", to: "m", label: "steady around 300 MB", tone: "ok",
        say: { en: "The graph becomes a sawtooth: up, collected, down. Ask that question of every Map, list and listener the AI writes.", he: "הגרף הופך לשיני מסור: עולה, נאסף, יורד. שאלו את השאלה הזאת על כל Map, רשימה ו-listener שה-AI כותב." },
      },
    ],
  },

  "unit-integration-e2e": {
    cap: { en: "An agent renames a column. Three levels of tests, three different verdicts", he: "סוכן משנה שם של עמודה. שלוש רמות של טסטים, שלוש תשובות שונות" },
    actors: [
      agent,
      { id: "u", icon: "🧪", label: { en: "Unit", he: "יחידה" } },
      { id: "i", icon: "🔗", label: { en: "Integration", he: "אינטגרציה" } },
      { id: "e", icon: "🎭", label: { en: "E2E", he: "E2E" } },
    ],
    beats: [
      {
        from: "a", to: "u", label: "rename stage → deal_stage · 18 files",
        say: { en: "The agent renames a column across 18 files, and forgets the migration.", he: "הסוכן משנה שם של עמודה ב-18 קבצים, ושוכח את המיגרציה." },
      },
      {
        from: "u", to: "u", label: "210 passed · 0.4s", tone: "ok",
        say: { en: "Unit tests call one function with a fake row built inside the test. All green, in under a second.", he: "טסטי יחידה קוראים לפונקציה אחת עם שורה מזויפת שנבנתה בתוך הטסט. הכול ירוק, בפחות משנייה." },
      },
      {
        from: "u", to: "i", label: "npm run test:integration",
        say: { en: "Integration tests run your parts together against a real test database.", he: "טסטי אינטגרציה מריצים את החלקים שלכם יחד מול מסד נתונים אמיתי לבדיקות." },
      },
      {
        from: "i", to: "i", label: "column \"deal_stage\" does not exist", tone: "err",
        body: ["contacts.repo.test.ts › list by stage"],
        say: { en: "The real database still says 'stage'. Every part was fine; the seam between them broke.", he: "במסד האמיתי זה עדיין 'stage'. כל חלק היה תקין, התפר ביניהם נשבר." },
      },
      {
        from: "a", to: "i", label: "migration 0008: RENAME COLUMN",
        say: { en: "The agent adds the missing migration.", he: "הסוכן מוסיף את המיגרציה שחסרה." },
      },
      {
        from: "i", to: "e", label: "26 passed · 5s", tone: "ok",
        say: { en: "Integration is green. On to the slowest, truest level.", he: "האינטגרציה ירוקה. ממשיכים לרמה האיטית והאמיתית ביותר." },
      },
      {
        from: "e", to: "e", label: "add contact → appears in list", tone: "ok",
        body: ["chromium · 4 passed · 24s"],
        say: { en: "E2E drives the real app in a browser, like Noa would. Only it proves the button is wired to something.", he: "E2E מפעיל את האפליקציה האמיתית בדפדפן, כמו שנועה הייתה עושה. רק הוא מוכיח שהכפתור מחובר למשהו." },
      },
      {
        from: "e", to: "a", label: "240 passed", tone: "ok",
        say: { en: "Many unit tests, solid integration around data, auth and money, a few E2E. Tell the AI which level you want.", he: "הרבה טסטי יחידה, אינטגרציה רצינית סביב נתונים, הרשאות וכסף, ומעט E2E. תגידו ל-AI איזו רמה אתם רוצים." },
      },
    ],
  },

  regression: {
    cap: { en: "A bug fixed without a test comes back. A bug fixed with one cannot", he: "באג שתוקן בלי טסט חוזר. באג שתוקן עם טסט לא יכול" },
    actors: [you, code, tests, agent],
    beats: [
      {
        from: "y", to: "c", label: "fix: lowercase emails on save",
        body: ["+ email = email.toLowerCase()"],
        say: { en: "March: Noa sees Dana twice, once as DANA@acme.io. A one-line fix, so obvious nobody writes a test.", he: "מרץ: נועה רואה את דנה פעמיים, פעם אחת כ-DANA@acme.io. תיקון של שורה אחת, כל כך ברור שאף אחד לא כותב טסט." },
      },
      {
        from: "a", to: "c", label: "refactor: merge 3 email helpers", tone: "warn",
        body: ["- email = email.toLowerCase()"],
        say: { en: "September: an agent tidies the helpers. The line goes, because its reason lived in a chat, not in the repo.", he: "ספטמבר: סוכן מסדר את פונקציות העזר. השורה נעלמת, כי הסיבה שלה חיה בצ'אט, לא בריפו." },
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
        body: ["it(\"same email in capitals is", "    one contact\")"],
        say: { en: "This time, first a test named in the customer's words, not the function's.", he: "הפעם, קודם טסט שנקרא במילים של הלקוחה, לא של הפונקציה." },
      },
      {
        from: "t", to: "y", label: "✗ expected 1 contact, got 2", tone: "err",
        say: { en: "Watch it fail. That proves it really reproduces the bug.", he: "מריצים ורואים שהוא נכשל. זה מוכיח שהוא באמת משחזר את הבאג." },
      },
      {
        from: "y", to: "c", label: "fix + test, one commit", tone: "ok",
        body: ["+ email = email.trim().toLowerCase()"],
        say: { en: "One commit per bug: the test that fails because of it, and the fix that makes it pass.", he: "commit אחד לכל באג: הטסט שנכשל בגללו, והתיקון שגורם לו לעבור." },
      },
      {
        from: "t", to: "t", label: "249 passed", tone: "ok",
        say: { en: "Green, and now the suite remembers why that line exists.", he: "ירוק, ועכשיו חבילת הטסטים זוכרת למה השורה הזאת קיימת." },
      },
      {
        from: "t", to: "a", label: "✗ same email in capitals is one contact", tone: "err",
        say: { en: "The next time an agent drops that line, this test fails in CI, before any customer sees it.", he: "בפעם הבאה שסוכן יוריד את השורה, הטסט הזה ייכשל ב-CI, לפני שלקוח כלשהו יראה." },
      },
    ],
  },

  "flaky-test": {
    cap: { en: "Same code, green then red. The cost is that red stops meaning anything", he: "אותו קוד, ירוק ואז אדום. המחיר: אדום מפסיק להגיד משהו" },
    actors: [
      { id: "i", icon: "🤖", label: { en: "CI", he: "CI" } },
      { id: "e", icon: "🎭", label: { en: "E2E test", he: "טסט E2E" } },
      { id: "p", icon: "🌐", label: { en: "App", he: "אפליקציה" } },
    ],
    beats: [
      {
        from: "e", to: "p", label: "click Save · wait 500 ms",
        body: ["await page.waitForTimeout(500)"],
        say: { en: "The test adds a contact, then waits a fixed half second before checking the list.", he: "הטסט מוסיף איש קשר, ואז מחכה חצי שנייה קבועה לפני שהוא בודק את הרשימה." },
      },
      {
        from: "p", to: "e", label: "row visible after 180 ms", tone: "ok",
        say: { en: "Usually the save takes 180 ms. Green.", he: "בדרך כלל השמירה לוקחת 180 מילישניות. ירוק." },
      },
      {
        from: "p", to: "e", label: "row visible after 620 ms", tone: "err",
        body: ["expect(row).toBeVisible() ✗"],
        say: { en: "On a busy CI machine it took 620 ms. Red, on the same code. That is a flaky test.", he: "במכונת CI עמוסה זה לקח 620 מילישניות. אדום, על אותו קוד. זה טסט הפכפך." },
      },
      {
        from: "i", to: "i", label: "Re-run failed jobs → ✓", tone: "warn",
        say: { en: "Retry, green. A few weeks of this and the team presses retry without reading.", he: "מריצים שוב, ירוק. כמה שבועות כאלה, והצוות לוחץ retry בלי לקרוא." },
      },
      {
        from: "i", to: "i", label: "✗ Omer gets 404 on Dana's contact", tone: "err",
        body: ["re-run → ✓ (lucky order) → merged"],
        say: { en: "Then a real bug fails a test. The retry passes by luck and it ships. The flake cost you the meaning of red.", he: "ואז באג אמיתי מפיל טסט. ההרצה החוזרת עוברת במזל, וזה עולה לאוויר. הטסט ההפכפך עלה לכם במשמעות של אדום." },
      },
      {
        from: "e", to: "e", label: "wait for the row, not the clock", tone: "ok",
        body: ["- await page.waitForTimeout(500)", "+ await expect(row).toBeVisible()"],
        say: { en: "Fix it within a day: wait for the condition. Playwright's expect keeps retrying until the row shows up.", he: "מתקנים תוך יום: מחכים לתנאי. ה-expect של Playwright ממשיך לנסות עד שהשורה מופיעה." },
      },
      {
        from: "e", to: "p", label: "click Save",
        say: { en: "Same slow machine, same test.", he: "אותה מכונה איטית, אותו טסט." },
      },
      {
        from: "p", to: "e", label: "row visible after 620 ms ✓", tone: "ok",
        say: { en: "Green. Raising the timeout would only hide the question: what is this test actually waiting for?", he: "ירוק. הגדלת ה-timeout רק הייתה מסתירה את השאלה: למה הטסט הזה בעצם מחכה?" },
      },
    ],
  },
};
