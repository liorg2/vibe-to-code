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

};
