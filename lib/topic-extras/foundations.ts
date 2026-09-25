import type { TopicExtra } from "./types";

export const extras: Record<string, TopicExtra> = {
  "Source code": {
    look: [
      {
        cap: {
          en: "Just a text file with instructions",
          he: "פשוט קובץ טקסט עם הוראות",
        },
        code: `// hello.js — ordinary text you can open in any editor
function greet(name) {
  return "Hello, " + name;
}

greet("Dana");
// -> "Hello, Dana"`,
      },
    ],
    prompts: [
      {
        en: "Open this project's folders and list every source file that looks like application code, not config. Give me a one-line summary of what each file does.",
        he: "פתחו את תיקיות הפרויקט ורשמו כל קובץ מקור שנראה כמו קוד אפליקציה, לא קונפיג. תנו סיכום של שורה אחת על מה כל קובץ עושה.",
      },
      {
        en: "Find the entry point of this app and paste the first twenty lines. Then tell me in plain words what that file starts when the program runs.",
        he: "מצאו את נקודת הכניסה של האפליקציה והדביקו את עשרים השורות הראשונות. אחר כך הסבירו במילים פשוטות מה הקובץ הזה מתחיל כשהתוכנית רצה.",
      },
      {
        en: "Ask yourself what happens if a user types empty text into this function. Show me the gap in the code and one concrete input that would break it.",
        he: "שאלו את עצמכם מה קורה אם משתמש מקליד טקסט ריק לפונקציה הזאת. הראו לי את החור בקוד וקללט קונקרטי אחד שישבור אותה.",
      },
    ],
  },

  "Compiler / Interpreter": {
    look: [
      {
        cap: {
          en: "One typo, two different discovery times",
          he: "שגיאת כתיב אחת, שני זמני גילוי",
        },
        code: `# Python (interpreted) — loads fine, dies later
send_invioce(order)
# NameError: name 'send_invioce' is not defined

// TypeScript (checked first) — refuses to build
sendInvioce(order);
// Cannot find name 'sendInvioce'.`,
      },
    ],
    prompts: [
      {
        en: "Explain whether this project fails at build time or only when a line runs. Point to one real error message from each side if both exist.",
        he: "הסבירו אם הפרויקט הזה נכשל בזמן build או רק כששורה רצה. הצביעו על הודעת שגיאה אמיתית אחת מכל צד אם שניהם קיימים.",
      },
      {
        en: "Introduce a tiny typo in a rarely used function name, then tell me which command would catch it before a user ever clicked.",
        he: "הכניסו שגיאת כתיב קטנה בשם פונקציה שכמעט לא משתמשים בה, ואז אמרו לי איזו פקודה הייתה תופסת אותה לפני שלחצו על כפתור.",
      },
      {
        en: "Summarize for a beginner: compiler stops you early, interpreter waits. Give one sentence example from this codebase.",
        he: "סכמו למתחילים: compiler עוצר מוקדם, interpreter מחכה. תנו דוגמה של משפט אחד מהקוד בבסיס הזה.",
      },
    ],
  },

  "Runtime": {
    look: [
      {
        cap: {
          en: "Same JS file, two different engines",
          he: "אותו קובץ JS, שני מנועים שונים",
        },
        code: `$ node -v
v20.11.0

$ node hello.js
Hello from Node

# In the browser console:
> typeof window
"object"`,
      },
    ],
    prompts: [
      {
        en: "Tell me which runtime this project expects, and where that version is written down. Quote the exact line or file name.",
        he: "אמרו לי איזה runtime הפרויקט מצפה לו, ואיפה הגרסה כתובה. ציטטו את השורה או שם הקובץ המדויק.",
      },
      {
        en: "List three things that could make this app work on my laptop but fail on a teammate's machine, all related to the runtime.",
        he: "רשמו שלושה דברים שיכולים לגרום לאפליקציה לעבוד אצלי ולהיכשל אצל חבר צוות, והכול קשור ל-runtime.",
      },
      {
        en: "Write a one-line check I can paste into the terminal to print the runtime version this project needs me to have.",
        he: "כתבו בדיקה של שורה אחת שאפשר להדביק בטרמינל כדי להדפיס את גרסת ה-runtime שהפרויקט מצפה שתהיה לי.",
      },
    ],
  },

  "Terminal / CLI": {
    look: [
      {
        cap: {
          en: "Type a command, get a reply",
          he: "מקלידים פקודה, מקבלים תשובה",
        },
        code: `$ pwd
/Users/dana/shop

$ ls
package.json  src  README.md`,
      },
    ],
    prompts: [
      {
        en: "Give me the exact terminal commands to open this project folder, list its files, and print the current directory path.",
        he: "תנו את פקודות הטרמינל המדויקות לפתיחת תיקיית הפרויקט, לרשימת הקבצים ולהדפסת נתיב התיקייה הנוכחית.",
      },
      {
        en: "Find the npm or yarn scripts in this repo and show me the one command I should type to start the app locally.",
        he: "מצאו את סקריפטי npm או yarn ב-repo והראו לי את הפקודה האחת שצריך להקליד כדי להריץ את האפליקציה מקומית.",
      },
      {
        en: "Explain what the dollar sign means in examples, then rewrite three common GUI clicks as CLI commands for this project.",
        he: "הסבירו מה אומר סימן הדולר בדוגמאות, ואז כתבו מחדש שלושה לחיצות GUI נפוצות כפקודות CLI לפרויקט הזה.",
      },
    ],
  },

  "Environment": {
    look: [
      {
        cap: {
          en: "Same app, three different places",
          he: "אותה אפליקציה, שלושה מקומות שונים",
        },
        code: `# .env.local  (never commit real secrets)
APP_ENV=local
DATABASE_URL=postgres://localhost:5432/shop_dev
API_URL=http://localhost:3000

# production uses different values for the same keys`,
      },
    ],
    prompts: [
      {
        en: "Map local, staging, and production for this project: where each runs, which database it should touch, and what must never be shared.",
        he: "מפו את local, staging ו-production לפרויקט הזה: איפה כל אחד רץ, לאיזה database הוא נוגע, ומה אסור לשתף לעולם.",
      },
      {
        en: "List every environment variable this app reads on startup. Mark which ones are safe to show in a screenshot and which are secrets.",
        he: "רשמו כל משתנה סביבה שהאפליקציה קוראת בעלייה. סמנו אילו בטוח להראות בצילום מסך ואילו הם סודות.",
      },
      {
        en: "Write a short checklist so I never point my local machine at the production database by accident.",
        he: "כתבו רשימת בדיקה קצרה כדי שלעולם לא אכוון את המחשב המקומי בטעות ל-database של production.",
      },
    ],
  },

  "Bug / Stack trace": {
    look: [
      {
        cap: {
          en: "Read the top of the stack first",
          he: "קוראים קודם את ראש ה-stack",
        },
        code: `TypeError: Cannot read properties of undefined (reading 'price')
    at cartTotal (src/cart.js:12:18)
    at checkout (src/checkout.js:40:9)
    at Object.<anonymous> (src/index.js:5:1)

# Line 12 in cart.js is usually where to look first.`,
      },
    ],
    prompts: [
      {
        en: "Here is a stack trace. Name the file and line most likely to contain the bug, and say in one sentence what went wrong.",
        he: "הנה stack trace. ציינו את הקובץ והשורה שבהם כנראה יושב הבאג, ובמשפט אחד אמרו מה השתבש.",
      },
      {
        en: "Turn this error message into a bug report: expected behaviour, actual behaviour, and the smallest steps to reproduce it.",
        he: "הפכו את הודעת השגיאה לדיווח באג: התנהגות צפויה, התנהגות בפועל, והצעדים הקטנים ביותר לשחזור.",
      },
      {
        en: "Show me how to paste only the useful top three stack frames into a prompt for an AI, and what to ask it next.",
        he: "הראו איך מדביקים רק את שלושת מסגרות ה-stack השימושיות למעלה ב-prompt ל-AI, ומה לבקש ממנו אחר כך.",
      },
    ],
  },

  "App lifecycle": {
    look: [
      {
        cap: {
          en: "Idea to running app, one loop",
          he: "מרעיון לאפליקציה רצה, לולאה אחת",
        },
        code: `idea -> design -> code -> review
  -> tests -> host + domain -> watch it run
  -> fix / improve -> (back to design)

# You are always standing in one of these boxes.`,
      },
    ],
    prompts: [
      {
        en: "Draw this project's lifecycle as six labeled boxes. Put a star on the box where we are stuck right now and say why.",
        he: "ציירו את מחזור החיים של הפרויקט כשישה תיבות עם תוויות. שימו כוכב על התיבה שבה אנחנו תקועים עכשיו והסבירו למה.",
      },
      {
        en: "For the bug I described, name which lifecycle stage is broken. Do not suggest a code change until you name the stage.",
        he: "עבור הבאג שתיארתי, ציינו באיזה שלב במחזור החיים השבירה. אל תציעו שינוי קוד לפני שציינתם את השלב.",
      },
      {
        en: "List the minimum steps from a local working feature to something a stranger can open on a real domain.",
        he: "רשמו את הצעדים המינימליים מפיצ'ר שעובד מקומית למשהו שזר יכול לפתוח על דומיין אמיתי.",
      },
    ],
  },

  Test: {
    look: [
      {
        cap: {
          en: "Code that checks other code",
          he: "קוד שבודק קוד אחר",
        },
        code: `// cart.test.js
test("empty cart totals zero", () => {
  expect(cartTotal([])).toBe(0);
});

$ npm test
PASS  cart.test.js`,
      },
    ],
    prompts: [
      {
        en: "Write one failing test for this function that states the expected result in a single clear assertion.",
        he: "כתבו בדיקה אחת שנכשלת לפונקציה הזאת, עם assertion ברורה אחת על התוצאה הצפויה.",
      },
      {
        en: "Find existing tests in this repo and tell me the exact command to run only the file that covers the cart or checkout logic.",
        he: "מצאו בדיקות קיימות ב-repo ואמרו את הפקודה המדויקת להריץ רק את הקובץ שמכסה את לוגיקת העגלה או הקופה.",
      },
      {
        en: "Propose three tiny behaviours worth testing before I let the AI refactor this module. Keep each behaviour to one sentence.",
        he: "הציעו שלוש התנהגויות קטנות ששווה לבדוק לפני שנותנים ל-AI לעשות refactor למודול הזה. כל התנהגות במשפט אחד.",
      },
    ],
  },

  Assertion: {
    look: [
      {
        cap: {
          en: "The line that states the expectation",
          he: "השורה שמצהירה על הציפייה",
        },
        code: `expect(totalShekels(100)).toBe(100);
// passes when the function returns 100

expect(totalShekels(100)).toBe(90);
// fails: Expected 90, received 100`,
      },
    ],
    prompts: [
      {
        en: "Rewrite this test so it has one strong assertion. Delete any assertion that always passes or checks nothing useful.",
        he: "כתבו מחדש את הבדיקה כך שתהיה לה assertion חזקה אחת. מחקו כל assertion שתמיד עוברת או לא בודקת כלום שימושי.",
      },
      {
        en: "Given this function, write three assertions: happy path, empty input, and one weird input a user might type.",
        he: "בהינתן הפונקציה הזאת, כתבו שלוש assertions: נתיב מאושר, קלט ריק, וקלט מוזר אחד שמשתמש עלול להקליד.",
      },
      {
        en: "Explain why a test with no assertion is dangerous, using this project's test runner output as your example.",
        he: "הסבירו למה בדיקה בלי assertion מסוכנת, והשתמשו בפלט של רץ הבדיקות בפרויקט הזה כדוגמה.",
      },
    ],
  },

  "Source control": {
    look: [
      {
        cap: {
          en: "Every change can be undone",
          he: "כל שינוי אפשר לבטל",
        },
        code: `$ git status
On branch main
Changes not staged for commit:
  modified:   src/price.js

$ git diff src/price.js
- return cents / 100;
+ return Math.round(cents / 100);`,
      },
    ],
    prompts: [
      {
        en: "Show me what changed since the last commit. Summarize the diff in three bullets a non-developer can understand.",
        he: "הראו מה השתנה מאז ה-commit האחרון. סכמו את ה-diff בשלושה bullets שאדם שלא מפתח יכול להבין.",
      },
      {
        en: "Before the AI edits thirty files, set up source control safety: branch name, status check, and how I undo everything in one move.",
        he: "לפני שה-AI עורך שלושים קבצים, הגדירו רשת ביטחון של source control: שם branch, בדיקת status, ואיך מבטלים הכול במהלך אחד.",
      },
      {
        en: "Write the exact commands to see who last changed this file and what message they left on that commit.",
        he: "כתבו את הפקודות המדויקות לראות מי שינה לאחרונה את הקובץ הזה ואיזו הודעה השאיר על ה-commit הזה.",
      },
    ],
  },

  "Repository (repo)": {
    look: [
      {
        cap: {
          en: "A folder with a hidden history",
          he: "תיקייה עם היסטוריה מוסתרת",
        },
        code: `$ ls -a
.  ..  .git  package.json  src

$ git rev-parse --show-toplevel
/Users/dana/shop
# .git is the history. The rest is your working copy.`,
      },
    ],
    prompts: [
      {
        en: "Confirm this folder is a Git repo and print the root path. If it is not, tell me the one command to start one safely.",
        he: "אשרו שתיקייה זו היא Git repo והדפיסו את נתיב השורש. אם לא, אמרו את הפקודה האחת להתחיל אחד בבטחה.",
      },
      {
        en: "Describe what lives in this repo versus what should stay out of it. Name three file types that usually belong in .gitignore.",
        he: "תארו מה חי ב-repo הזה ומה צריך להישאר מחוץ לו. ציינו שלושה סוגי קבצים שבדרך כלל שייכים ל-.gitignore.",
      },
      {
        en: "Give me a one-paragraph map of this repo: main folders, where tests live, and where I should start reading.",
        he: "תנו מפה של פסקה אחת ל-repo הזה: תיקיות עיקריות, איפה הבדיקות, ואיפה כדאי להתחיל לקרוא.",
      },
    ],
  },

  "Commit / Branch / Merge": {
    look: [
      {
        cap: {
          en: "Branch, save a snapshot, keep going",
          he: "branch, שומרים snapshot, ממשיכים",
        },
        code: `$ git switch -c fix/price
$ git commit -m "fix: show the price in shekels"
[fix/price a1b2c3d] fix: show the price in shekels
 1 file changed, 2 insertions(+)`,
      },
    ],
    prompts: [
      {
        en: "Create a branch name and a short commit message for fixing the price display. Show the exact git commands I should type.",
        he: "צרו שם branch והודעת commit קצרה לתיקון תצוגת המחיר. הראו את פקודות git המדויקות שצריך להקליד.",
      },
      {
        en: "Explain commit, branch, and merge using this repo's current status. Keep each definition to one sentence and one example command.",
        he: "הסבירו commit, branch ו-merge לפי ה-status הנוכחי של ה-repo. כל הגדרה במשפט אחד ופקודת דוגמה אחת.",
      },
      {
        en: "Before I ask the AI to refactor, open a branch and list the files that would be in the next commit if I saved now.",
        he: "לפני שמבקשים מה-AI refactor, פתחו branch ורשמו את הקבצים שהיו נכנסים ל-commit הבא אם הייתי שומר עכשיו.",
      },
    ],
  },

  "Clone / push / pull": {
    look: [
      {
        cap: {
          en: "Copy down, send up, bring others down",
          he: "מורידים, שולחים למעלה, מושכים אחרים",
        },
        code: `$ git clone https://github.com/team/shop.git
Cloning into 'shop'...
remote: Counting objects: 120, done.`,
      },
    ],
    prompts: [
      {
        en: "Give me the exact clone command for this remote URL, then the push and pull commands I will use on a normal workday.",
        he: "תנו את פקודת ה-clone המדויקת ל-URL המרוחק הזה, ואז את פקודות push ו-pull ליום עבודה רגיל.",
      },
      {
        en: "I changed files locally. Walk me through status, commit, and push without skipping a safety check.",
        he: "שיניתי קבצים מקומית. עברו איתי על status, commit ו-push בלי לדלג על בדיקת בטיחות.",
      },
      {
        en: "My teammate pushed overnight. Show the pull command and how I verify what landed before I keep editing.",
        he: "חבר צוות עשה push בלילה. הראו את פקודת pull ואיך מוודאים מה נחת לפני שממשיכים לערוך.",
      },
    ],
  },

  Diff: {
    look: [
      {
        cap: {
          en: "Minus is gone, plus is new",
          he: "מינוס נעלם, פלוס חדש",
        },
        code: `-  const maxItems = 10;
+  const maxItems = 100;

-  if (!user) return redirect("/login");
+  // TODO: re-add login check`,
      },
    ],
    prompts: [
      {
        en: "Show me the full diff of everything you just changed, file by file, with removed lines first. Do not summarize; I will read it.",
        he: "הראו לי את ה-diff המלא של כל מה ששיניתם עכשיו, קובץ אחרי קובץ, שורות שנמחקו קודם. בלי סיכום, אני אקרא.",
      },
      {
        en: "Read this diff and list every deleted line and every number or default that changed. Explain in one sentence why each one is safe.",
        he: "קראו את ה-diff הזה ורשמו כל שורה שנמחקה וכל מספר או ברירת מחדל שהשתנו. הסבירו במשפט אחד למה כל אחד מהם בטוח.",
      },
      {
        en: "This diff is too big to read. Split the change into commits under 150 lines each, with mechanical edits like renames in their own commit.",
        he: "ה-diff הזה גדול מדי לקריאה. פצלו את השינוי ל-commits של פחות מ-150 שורות כל אחד, כשעריכות מכניות כמו שינוי שם ב-commit משלהן.",
      },
    ],
  },

  "Merge conflict": {
    look: [
      {
        cap: {
          en: "Git asks you to choose",
          he: "Git מבקש שתבחרו",
        },
        code: `<<<<<<< HEAD
return price + " ₪";
=======
return "₪" + price;
>>>>>>> feature/format
# Delete the markers. Keep the lines you want.`,
      },
    ],
    prompts: [
      {
        en: "Here is a conflicted file. Resolve it by keeping the clearer price format, remove all conflict markers, and show the final three lines.",
        he: "הנה קובץ עם קונפליקט. פתרו אותו תוך שמירה על פורמט המחיר הברור יותר, הסירו את כל סימני הקונפליקט, והראו את שלוש השורות הסופיות.",
      },
      {
        en: "Explain what caused this merge conflict in plain words, then list the safe steps to finish the merge without losing either change by panic.",
        he: "הסבירו במילים פשוטות מה גרם ל-merge conflict, ואז רשמו את הצעדים הבטוחים לסיים את ה-merge בלי לאבד שינוי מתוך בהלה.",
      },
      {
        en: "Write a short prompt I can give an AI when conflict markers appear, including the rule that it must not delete unmarked code nearby.",
        he: "כתבו prompt קצר ל-AI כשמופיעים סימני קונפליקט, כולל הכלל שאסור למחוק קוד בלי סימון ליד.",
      },
    ],
  },

  "Pull request & code review": {
    look: [
      {
        cap: {
          en: "A proposed change waiting for eyes",
          he: "שינוי מוצע שמחכה לעיניים",
        },
        code: `# Pull request: fix/price -> main
Title: Show prices in shekels

Diff:
- total.textContent = cents;
+ total.textContent = (cents / 100) + " ₪";

# Reviewer checks the diff before merge.`,
      },
    ],
    prompts: [
      {
        en: "Draft a pull request title and three-bullet description for this change. Say how to test it and what must not break.",
        he: "כתבו כותרת ל-pull request ותיאור של שלושה bullets לשינוי הזה. אמרו איך לבדוק אותו ומה אסור שישבר.",
      },
      {
        en: "Review this AI-generated diff like a colleague wrote it. List deletions first, then risky lines, then one question to ask before merging.",
        he: "עשו review ל-diff שנוצר ב-AI כאילו קולגה כתב אותו. רשמו קודם מחיקות, אחר כך שורות מסוכנות, ואז שאלה אחת לפני merge.",
      },
      {
        en: "Split this big change into two smaller pull requests I could review in under ten minutes each. Name the files in each.",
        he: "פצלו את השינוי הגדול הזה לשני pull requests קטנים שאפשר לסקור בפחות מעשר דקות כל אחד. ציינו את הקבצים בכל אחד.",
      },
    ],
  },

  Client: {
    look: [
      {
        cap: {
          en: "The browser asks; it does not decide",
          he: "הדפדפן מבקש; הוא לא מחליט",
        },
        code: `// Running in the user's browser
fetch("/api/cart")
  .then((res) => res.json())
  .then((cart) => renderCart(cart));

# The user can open DevTools and change this.`,
      },
    ],
    prompts: [
      {
        en: "Point to every place in this feature that runs on the client. Mark anything that trusts a price or permission from the browser.",
        he: "הצביעו על כל מקום בפיצ'ר הזה שרץ ב-client. סמנו כל דבר שסומך על מחיר או הרשאה מהדפדפן.",
      },
      {
        en: "Explain to a beginner why a hidden field on the client is not a secret. Give one attack someone could try in DevTools.",
        he: "הסבירו למתחילים למה שדה מוסתר ב-client אינו סוד. תנו התקפה אחת שמישהו יכול לנסות ב-DevTools.",
      },
      {
        en: "Rewrite this client code so it only displays data and never decides final price or admin rights.",
        he: "כתבו מחדש את קוד ה-client כך שהוא רק מציג נתונים ולעולם לא מחליט על מחיר סופי או הרשאות admin.",
      },
    ],
  },

  Server: {
    look: [
      {
        cap: {
          en: "A machine waiting for requests",
          he: "מכונה שמחכה לבקשות",
        },
        code: `// server.js — runs on a computer you control
app.get("/api/cart", (req, res) => {
  res.json({ items: 2, totalCents: 4900 });
});

$ node server.js
listening on :3000`,
      },
    ],
    prompts: [
      {
        en: "Find the server entry file and tell me which port it listens on. Quote the line that starts the listener.",
        he: "מצאו את קובץ הכניסה של השרת ואמרו על איזה פורט הוא מאזין. ציטטו את השורה שמתחילה את ה-listener.",
      },
      {
        en: "List three checks that must run on the server for checkout, never only in the browser UI.",
        he: "רשמו שלוש בדיקות שחייבות לרוץ בשרת בקופה, אף פעם לא רק ב-UI של הדפדפן.",
      },
      {
        en: "Draw a tiny sequence: browser sends X, server does Y, server returns Z. Use this project's real route names.",
        he: "ציירו רצף קטן: הדפדפן שולח X, השרת עושה Y, השרת מחזיר Z. השתמשו בשמות הנתיבים האמיתיים של הפרויקט.",
      },
    ],
  },

  Frontend: {
    look: [
      {
        cap: {
          en: "What the user sees and clicks",
          he: "מה שהמשתמש רואה ולוחץ",
        },
        code: `<button type="button">Save</button>`,
        preview: `<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{font-family:sans-serif;padding:24px}</style></head><body><button type="button">Save</button></body></html>`,
      },
    ],
    prompts: [
      {
        en: "Build the smallest HTML page with one Save button centered on the page. No frameworks, no scripts, just clear markup.",
        he: "בנו את דף ה-HTML הקטן ביותר עם כפתור Save אחד ממורכז. בלי frameworks, בלי scripts, רק markup ברור.",
      },
      {
        en: "Describe the frontend of this screen in three bullets: layout, primary action, and what should happen when Save is clicked.",
        he: "תארו את ה-frontend של המסך הזה בשלושה bullets: layout, פעולה ראשית, ומה אמור לקרות בלחיצה על Save.",
      },
      {
        en: "List every user-visible state this form needs: empty, typing, saving, success, and error. Keep each state to one short line.",
        he: "רשמו כל מצב גלוי למשתמש שהטופס צריך: ריק, מקלידים, שומרים, הצלחה ושגיאה. כל מצב בשורה קצרה אחת.",
      },
    ],
  },

  Backend: {
    look: [
      {
        cap: {
          en: "Rules and data live here",
          he: "חוקים ונתונים חיים כאן",
        },
        code: `app.post("/api/orders", (req, res) => {
  const price = lookupPrice(req.body.sku); // server decides
  if (!userCanBuy(req.user)) {
    return res.status(403).json({ error: "forbidden" });
  }
  saveOrder({ sku: req.body.sku, price });
  res.json({ ok: true });
});`,
      },
    ],
    prompts: [
      {
        en: "Move every pricing and permission rule out of the UI into the backend. Show the new endpoint body and status codes.",
        he: "העבירו כל חוק תמחור והרשאות מה-UI ל-backend. הראו את גוף ה-endpoint החדש ואת קודי הסטטוס.",
      },
      {
        en: "Name the database tables or files this backend touches for one checkout. Say what it reads and what it writes.",
        he: "ציינו את טבלאות ה-database או הקבצים שה-backend נוגע בהם בקופה אחת. אמרו מה הוא קורא ומה הוא כותב.",
      },
      {
        en: "Write a failing backend check: if the client sends price_cents of 1, the server must reject it and keep the real catalog price.",
        he: "כתבו בדיקת backend שנכשלת: אם ה-client שולח price_cents של 1, השרת חייב לדחות ולשמור על מחיר הקטלוג האמיתי.",
      },
    ],
  },

  API: {
    look: [
      {
        cap: {
          en: "A contract between two programs",
          he: "חוזה בין שתי תוכנות",
        },
        code: `GET /api/products/42

-> 200 OK
{
  "id": 42,
  "name": "Mug",
  "priceCents": 4900
}`,
      },
    ],
    prompts: [
      {
        en: "Document this endpoint like a contract: method, path, request fields, success body, and two error responses.",
        he: "תעדו את ה-endpoint הזה כמו חוזה: method, path, שדות בקשה, גוף הצלחה, ושתי תשובות שגיאה.",
      },
      {
        en: "List every caller of this API in the project. Warn me if changing a field name would break frontend or mobile code.",
        he: "רשמו כל קורא ל-API הזה בפרויקט. התריעו אם שינוי שם שדה ישבור קוד frontend או מובייל.",
      },
      {
        en: "Invent one new read-only API route this app needs. Show example request and JSON response under fifteen lines total.",
        he: "המציאו נתיב API חדש לקריאה בלבד שהאפליקציה צריכה. הראו בקשת דוגמה ותשובת JSON בפחות מחמש עשרה שורות סה״כ.",
      },
    ],
  },

  "localhost & port": {
    look: [
      {
        cap: {
          en: "This computer, door number 3000",
          he: "המחשב הזה, דלת מספר 3000",
        },
        code: `$ npm run dev
ready on http://localhost:3000

# Open that URL in your browser.
# "Port 3000 already in use" means another process holds the door.
# Free it:
lsof -i :3000                   # mac/linux: shows the PID
kill <PID>
netstat -ano | findstr :3000    # windows: last column is the PID
taskkill /PID <PID> /F`,
      },
    ],
    prompts: [
      {
        en: "Tell me which localhost URL and port this project uses. Give the command to start it and how to free a busy port.",
        he: "אמרו איזה URL של localhost ופורט הפרויקט משתמש. תנו את פקודת ההפעלה ואיך לשחרר פורט תפוס.",
      },
      {
        en: "Explain localhost versus a public domain in two sentences, using this app's local and deployed URLs as examples.",
        he: "הסבירו localhost מול דומיין ציבורי בשני משפטים, עם כתובות ה-local והפריסה של האפליקציה כדוגמאות.",
      },
      {
        en: "I see two servers fighting over a port. Show the exact steps to find the old process and shut only that one down.",
        he: "אני רואה שני שרתים נלחמים על פורט. הראו את הצעדים המדויקים למצוא את התהליך הישן ולכבות רק אותו.",
      },
    ],
  },

  DNS: {
    look: [
      {
        cap: {
          en: "Name becomes an IP address",
          he: "שם הופך לכתובת IP",
        },
        code: `$ nslookup example.com
Name:    example.com
Address: 93.184.216.34`,
      },
    ],
    prompts: [
      {
        en: "Look up this domain and show its IP. Explain in one sentence why the site may still look old for a few hours after a change.",
        he: "בדקו את הדומיין הזה והראו את ה-IP שלו. הסבירו במשפט אחד למה האתר עלול עדיין להיראות ישן כמה שעות אחרי שינוי.",
      },
      {
        en: "Write a beginner checklist for pointing my domain at a new host without breaking email or the old site mid-move.",
        he: "כתבו רשימת בדיקה למתחילים לחיבור הדומיין שלי ל-host חדש בלי לשבור מייל או את האתר הישן באמצע המעבר.",
      },
      {
        en: "Give me the one terminal command to check DNS for this domain and tell me what a good answer looks like.",
        he: "תנו את פקודת הטרמינל האחת לבדיקת DNS לדומיין הזה, ואמרו איך נראית תשובה טובה.",
      },
    ],
  },

  "Full stack": {
    look: [
      {
        cap: {
          en: "Follow one value across layers",
          he: "עוקבים אחרי ערך אחד בין שכבות",
        },
        code: `1. UI      shows 49.00 ₪
2. API     GET /invoice/8 -> { totalCents: 4900 }
3. DB      payments sum = 4900
4. Writer  webhook saved the payment row

# A wrong total means walk 1 -> 4.`,
      },
    ],
    prompts: [
      {
        en: "Trace one invoice total from the screen to the database. Name each layer and the file or table that owns that step.",
        he: "עקבו אחרי סכום חשבונית אחד מהמסך עד ה-database. ציינו כל שכבה ואת הקובץ או הטבלה שאחראית על הצעד.",
      },
      {
        en: "I have a wrong total bug. Ask me five short questions that find which layer is lying before anyone rewrites UI code.",
        he: "יש באג של סכום שגוי. שאלו אותי חמש שאלות קצרות שמוצאות איזו שכבה משקרת לפני שמישהו כותב מחדש קוד UI.",
      },
      {
        en: "Draw this app's stack as a short list: language, framework, database, host. Say what each piece is for in one phrase.",
        he: "ציירו את ה-stack של האפליקציה כרשימה קצרה: שפה, framework, database, host. אמרו למה כל חלק משמש בביטוי אחד.",
      },
    ],
  },

  DevTools: {
    look: [
      {
        cap: {
          en: "F12 opens the browser's workshop",
          he: "F12 פותח את הסדנה של הדפדפן",
        },
        code: `# Chrome / Edge / Firefox
F12   or   Ctrl+Shift+I   (Mac: Cmd+Option+I)

Tabs you will use first:
Elements | Console | Network | Sources`,
      },
    ],
    prompts: [
      {
        en: "Tell me exactly which DevTools tab to open for a wrong label, a failed request, and a JavaScript crash. One tab each.",
        he: "אמרו בדיוק איזו לשונית DevTools לפתוח לתווית שגויה, לבקשה שנכשלה ולקריסת JavaScript. לשונית אחת לכל מקרה.",
      },
      {
        en: "Write a two-minute DevTools drill for this page: inspect the Save button, read its text, and note its CSS font size.",
        he: "כתבו תרגיל DevTools של שתי דקות לדף הזה: בדקו את כפתור Save, קראו את הטקסט שלו ורשמו את גודל הפונט ב-CSS.",
      },
      {
        en: "List three frontend mysteries I should solve with DevTools before I ask an AI. Keep each mystery to one sentence.",
        he: "רשמו שלוש תעלומות frontend שכדאי לפתור עם DevTools לפני שמבקשים מ-AI. כל תעלומה במשפט אחד.",
      },
    ],
  },

  "The Network tab": {
    look: [
      {
        cap: {
          en: "Every request the page made",
          he: "כל בקשה שהדף שלח",
        },
        code: `Name            Status  Type   Time
/api/cart       200     fetch  120 ms
/api/pay        500     fetch  890 ms

# Click a row -> Headers, Payload, Response`,
      },
    ],
    prompts: [
      {
        en: "Open the Network tab for this flow and tell me which request failed. Quote status code, URL, and the first line of the response body.",
        he: "פתחו את לשונית Network לזרימה הזאת ואמרו איזו בקשה נכשלה. ציטטו קוד סטטוס, URL, ואת השורה הראשונה בגוף התשובה.",
      },
      {
        en: "Compare the request the UI claims it sent with the payload actually on the wire. List any field that does not match.",
        he: "השוו את הבקשה שה-UI טוען ששלח ל-payload שבאמת על הקו. רשמו כל שדה שלא תואם.",
      },
      {
        en: "Teach me a ten-second Network habit: filter by Fetch/XHR, reproduce the bug, and copy the failing request as cURL.",
        he: "למדו אותי הרגל Network של עשר שניות: סינון Fetch/XHR, שחזור הבאג, והעתקת הבקשה שנכשלה כ-cURL.",
      },
    ],
  },

  "Console & breakpoints": {
    look: [
      {
        cap: {
          en: "Pause and read a real value",
          he: "עוצרים וקוראים ערך אמיתי",
        },
        code: `// Console
> cart.totalCents
4900

// Sources tab: click line number 12 in cart.js
// Debugger paused on breakpoint
// Hover 'item' -> { id: 7, priceCents: undefined }`,
      },
    ],
    prompts: [
      {
        en: "Set one breakpoint on the line that computes total. Tell me which variable is wrong when execution pauses.",
        he: "שימו breakpoint אחד על השורה שמחשבת את הסכום. אמרו איזה משתנה שגוי כשהריצה נעצרת.",
      },
      {
        en: "Replace twenty console.log guesses with one breakpoint plan. Name the file, line idea, and what I should inspect on pause.",
        he: "החליפו עשרים ניחושי console.log בתוכנית breakpoint אחת. ציינו קובץ, רעיון לשורה, ומה לבדוק בעצירה.",
      },
      {
        en: "Show the exact console command to call this function with sample data on the live page without editing source files.",
        he: "הראו את פקודת ה-console המדויקת לקרוא לפונקציה הזאת עם נתוני דוגמה בדף החי בלי לערוך קבצי מקור.",
      },
    ],
  },

  "Typed vs untyped": {
    look: [
      {
        cap: {
          en: "Catch the wrong kind of value early",
          he: "תופסים סוג ערך שגוי מוקדם",
        },
        code: `// JavaScript — finds out while running
function addTax(n) { return n * 1.17; }
addTax("49"); // "4949"... wait, what?

// TypeScript — complains before run
function addTax(n: number): number { return n * 1.17; }
addTax("49"); // Error: Argument of type 'string'...`,
      },
    ],
    prompts: [
      {
        en: "Find one place where a string might be used as a number. Show the TypeScript type that would have blocked it.",
        he: "מצאו מקום אחד שבו מחרוזת עלולה לשמש כמספר. הראו את טיפוס ה-TypeScript שהיה חוסם את זה.",
      },
      {
        en: "Explain typed versus untyped in two sentences for a beginner, then point to one file here that would benefit from types.",
        he: "הסבירו typed מול untyped בשני משפטים למתחילים, ואז הצביעו על קובץ אחד כאן שירוויח מטיפוסים.",
      },
      {
        en: "Add the smallest type annotations that would stop this AI mistake: passing null where an order object is required.",
        he: "הוסיפו את הערות הטיפוס הקטנות ביותר שעוצרות את טעות ה-AI הזאת: העברת null במקום אובייקט הזמנה.",
      },
    ],
  },

  "Compiled vs interpreted": {
    look: [
      {
        cap: {
          en: "Build first, or run the source now",
          he: "קודם בונים, או מריצים את המקור עכשיו",
        },
        code: `# Interpreted-style: run the file
$ python app.py
Server started

# Compiled-style: build, then run the binary
$ go build -o shop .
$ ./shop
Server started`,
      },
    ],
    prompts: [
      {
        en: "Say whether this project's main language is closer to compiled or interpreted, and name the command that proves it.",
        he: "אמרו אם שפת הפרויקט הראשית קרובה יותר ל-compiled או ל-interpreted, וציינו את הפקודה שמוכיחה זאת.",
      },
      {
        en: "Give one upside and one downside of compiled versus interpreted for a solo builder shipping with AI help.",
        he: "תנו יתרון אחד וחיסרון אחד ל-compiled מול interpreted לבונה לבד שמשיק בעזרת AI.",
      },
      {
        en: "If I switch this service from Python to Go, what changes about how I run it locally? Answer in four short steps.",
        he: "אם מעבירים את השירות מ-Python ל-Go, מה משתנה באיך מריצים אותו מקומית? ענו בארבעה צעדים קצרים.",
      },
    ],
  },

  "JavaScript / TypeScript": {
    look: [
      {
        cap: {
          en: "Browser language, with optional types",
          he: "שפת הדפדפן, עם טיפוסים אופציונליים",
        },
        code: `// JavaScript
const total = items.reduce((s, i) => s + i.price, 0);

// TypeScript — same idea, checked
const total: number = items.reduce(
  (s: number, i: { price: number }) => s + i.price,
  0,
);`,
      },
    ],
    prompts: [
      {
        en: "Convert this JavaScript function to TypeScript with clear parameter and return types. Keep the behaviour identical.",
        he: "המירו את פונקציית ה-JavaScript הזאת ל-TypeScript עם טיפוסי פרמטרים והחזרה ברורים. שמרו על אותה התנהגות.",
      },
      {
        en: "Show where this project runs JavaScript on the server versus in the browser. Name one file for each side.",
        he: "הראו איפה הפרויקט מריץ JavaScript בשרת מול הדפדפן. ציינו קובץ אחד לכל צד.",
      },
      {
        en: "List three TypeScript errors an AI often introduces here, and the one compiler command that would catch them.",
        he: "רשמו שלוש שגיאות TypeScript שה-AI נוטה לייצר כאן, ואת פקודת ה-compiler האחת שתופסת אותן.",
      },
    ],
  },

  Python: {
    look: [
      {
        cap: {
          en: "Readable lines that run as written",
          he: "שורות קריאות שרצות כמו שנכתבו",
        },
        code: `def greet(name: str) -> str:
    return f"Hello, {name}"

print(greet("Dana"))
# Hello, Dana`,
      },
    ],
    prompts: [
      {
        en: "Write a tiny Python script that reads a CSV of prices and prints the sum in shekels. Keep it under twenty lines.",
        he: "כתבו סקריפט Python קטן שקורא CSV של מחירים ומדפיס את הסכום בשקלים. שמרו על פחות מעשרים שורות.",
      },
      {
        en: "Tell me when Python is the shortest path for this task versus staying in TypeScript. Give one concrete example from this repo.",
        he: "אמרו מתי Python היא הדרך הקצרה למשימה הזאת לעומת להישאר ב-TypeScript. תנו דוגמה קונקרטית אחת מה-repo.",
      },
      {
        en: "Create a virtual environment plan: create, activate, install one package, and freeze versions for this script.",
        he: "צרו תוכנית לסביבה וירטואלית: יצירה, הפעלה, התקנת חבילה אחת, וקיבוע גרסאות לסקריפט הזה.",
      },
    ],
  },

  "Package manager": {
    look: [
      {
        cap: {
          en: "Download other people's code safely",
          he: "מורידים קוד של אחרים בבטחה",
        },
        code: `$ npm install lodash
added 1 package in 1s

# package-lock.json pins exact versions — commit it.`,
      },
    ],
    prompts: [
      {
        en: "Show the exact install command for this project and name the lock file I must commit after dependencies change.",
        he: "הראו את פקודת ההתקנה המדויקת לפרויקט וציינו את קובץ ה-lock שחייבים לעשות לו commit אחרי שינוי dependencies.",
      },
      {
        en: "I need one HTTP helper library. Propose a package, the install command, and why its lock entry matters tomorrow.",
        he: "אני צריך library אחת לעזרת HTTP. הציעו חבילה, פקודת התקנה, ולמה רשומת ה-lock חשובה מחר.",
      },
      {
        en: "List every package manager this monorepo might use and the one command each uses to install from the lock file.",
        he: "רשמו כל package manager שה-monorepo הזה עלול להשתמש בו, ואת הפקודה האחת של כל אחד להתקנה מקובץ ה-lock.",
      },
    ],
  },

  Dependency: {
    look: [
      {
        cap: {
          en: "Code you did not write, but own",
          he: "קוד שלא כתבתם, אבל באחריותכם",
        },
        code: `// package.json
{
  "dependencies": {
    "zod": "3.22.4"
  }
}

# You ship zod's bugs and updates with your app.`,
      },
    ],
    prompts: [
      {
        en: "Count direct dependencies in this project and flag any that look unused. Suggest one I could delete safely.",
        he: "ספרו dependencies ישירות בפרויקט וסמנו כאלה שנראות לא בשימוש. הציעו אחת שאפשר למחוק בבטחה.",
      },
      {
        en: "Before adding a new dependency, ask me what problem it solves and what we would write by hand instead in under thirty lines.",
        he: "לפני שמוסיפים dependency חדשה, שאלו אותי איזו בעיה היא פותרת ומה היינו כותבים ביד במקומה בפחות משלושים שורות.",
      },
      {
        en: "Explain in one paragraph why each dependency is also a future security update I am volunteering to track.",
        he: "הסבירו בפסקה אחת למה כל dependency היא גם עדכון אבטחה עתידי שאני מתנדב לעקוב אחריו.",
      },
    ],
  },

  "Semantic versioning": {
    look: [
      {
        cap: {
          en: "Major breaks, minor adds, patch fixes",
          he: "major שובר, minor מוסיף, patch מתקן",
        },
        code: `# 1.4.2
#  ^     major — breaking changes
#    ^   minor — new features, compatible
#      ^ patch — bug fixes only

"lodash": "^4.17.21"  # caret allows newer 4.x`,
      },
    ],
    prompts: [
      {
        en: "Read this package version range and tell me which updates npm may install automatically. Name one update that would be unsafe.",
        he: "קראו את טווח הגרסה של החבילה ואמרו אילו עדכונים npm עלול להתקין אוטומטית. ציינו עדכון אחד שיהיה לא בטוח.",
      },
      {
        en: "Explain major, minor, and patch with one example each from packages this project already uses.",
        he: "הסבירו major, minor ו-patch עם דוגמה אחת לכל אחד מחבילות שהפרויקט כבר משתמש בהן.",
      },
      {
        en: "Pin this dependency to an exact version and show the package.json line plus why the caret was risky here.",
        he: "קבעו את ה-dependency לגרסה מדויקת והראו את שורת package.json ולמה הגגון היה מסוכן כאן.",
      },
    ],
  },

  "Framework vs library": {
    look: [
      {
        cap: {
          en: "Who calls whom",
          he: "מי קורא למי",
        },
        code: `// Library — you call it
import { formatPrice } from "money-lib";
formatPrice(4900);

// Framework — it calls your code
export default function Page() {
  return <h1>Checkout</h1>; // Next/React calls this
}`,
      },
    ],
    prompts: [
      {
        en: "Label each of these as framework or library in this project, and say who calls whom in one sentence each.",
        he: "תייגו כל אחד מאלה כ-framework או library בפרויקט, ובמשפט אחד לכל אחד אמרו מי קורא למי.",
      },
      {
        en: "I want date formatting only. Prefer a small library over a framework. Propose one option and the import I would write.",
        he: "אני רוצה רק עיצוב תאריכים. העדיפו library קטנה על framework. הציעו אפשרות אחת ואת ה-import שהייתי כותב.",
      },
      {
        en: "Explain the day-one speed versus day-one-hundred constraint trade-off of our framework in two concrete sentences.",
        he: "הסבירו את מאזן המהירות ביום הראשון מול המגבלה ביום המאה של ה-framework שלנו בשני משפטים קונקרטיים.",
      },
    ],
  },

  "Go / Rust / Java / C#": {
    look: [
      {
        cap: {
          en: "Four languages, four team smells",
          he: "ארבע שפות, ארבעה ריחות של צוות",
        },
        code: `// Go — small services
fmt.Println("ok")

// Rust — speed + memory safety
println!("ok");

// Java / C# — large enterprise systems
System.out.println("ok"); // Java
Console.WriteLine("ok");  // C#`,
      },
    ],
    prompts: [
      {
        en: "From this job post or repo, say which of Go, Rust, Java, or C# dominates and what that usually means about the team.",
        he: "ממודעת הדרושים או מה-repo, אמרו איזו מבין Go, Rust, Java או C# שולטת ומה זה בדרך כלל אומר על הצוות.",
      },
      {
        en: "Give one sentence each: when Go fits, when Rust fits, when Java or C# fits, for a beginner choosing a backend stack.",
        he: "תנו משפט אחד לכל אחת: מתי Go מתאימה, מתי Rust, ומתי Java או C#, למתחילים שבוחרים backend stack.",
      },
      {
        en: "If an AI suggests rewriting this TypeScript service in Rust, ask three questions I should answer before agreeing.",
        he: "אם AI מציע לכתוב מחדש את שירות ה-TypeScript הזה ב-Rust, שאלו שלוש שאלות שצריך לענות עליהן לפני שמסכימים.",
      },
    ],
  },
};
