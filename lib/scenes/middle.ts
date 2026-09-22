import type { Scene } from "./types";

const browser = { id: "b", icon: "🧑‍💻", label: { en: "Browser", he: "דפדפן" } };
const server = { id: "s", icon: "🖥️", label: { en: "Server", he: "שרת" } };
const db = { id: "d", icon: "🗄️", label: { en: "Database", he: "מסד נתונים" } };
const cache = { id: "c", icon: "⚡", label: { en: "Cache", he: "קאש" } };
const queue = { id: "q", icon: "📥", label: { en: "Queue", he: "תור" } };
const worker = { id: "w", icon: "⚙️", label: { en: "Worker", he: "וורקר" } };
const emailApi = { id: "p", icon: "✉️", label: { en: "Email service", he: "שירות המיילים" } };
const laptop = { id: "l", icon: "💻", label: { en: "Laptop", he: "לפטופ" } };
const prod = { id: "o", icon: "☁️", label: { en: "Production", he: "פרודקשן" } };
const inbox = { id: "i", icon: "📬", label: { en: "Inboxes", he: "תיבות דואר" } };

export const MIDDLE_SCENES: Record<string, Scene> = {
  query: {
    cap: { en: "The same search is instant with 50 contacts and painfully slow with 50,000", he: "אותו חיפוש מיידי עם 50 אנשי קשר, ואיטי מאוד עם 50,000" },
    actors: [browser, server, db],
    beats: [
      {
        from: "b", to: "s", label: "GET /contacts?email=Dana@Acme.io",
        say: { en: "Omer searches for Dana by email. Capital letters don't matter, so Dana@Acme.io still finds her.", he: "עומר מחפש את דנה לפי מייל. אותיות גדולות לא משנות, אז גם Dana@Acme.io ימצא אותה." },
      },
      {
        from: "s", to: "d", label: "find contact by email",
        body: ["email: dana@acme.io", "capital letters ignored"],
        say: { en: "The server says what it wants, not how to find it. The database decides how to search.", he: "השרת אומר מה הוא רוצה, לא איך למצוא את זה. מסד הנתונים מחליט איך לחפש." },
      },
      {
        from: "d", to: "s", label: "1 contact · 9.2 seconds", tone: "err",
        say: { en: "The right answer, nine seconds late. Nobody changed the code. There is just a lot more data now.", he: "התשובה הנכונה, באיחור של תשע שניות. אף אחד לא שינה את הקוד. פשוט יש הרבה יותר נתונים." },
      },
      {
        from: "s", to: "b", label: "504 Gateway Timeout", status: 504,
        say: { en: "The page gives up waiting. With 100 test contacts, this never showed up.", he: "העמוד מפסיק לחכות. עם 100 אנשי קשר לבדיקה, זה אף פעם לא הופיע." },
      },
      {
        from: "s", to: "d", label: "how will you search?",
        say: { en: "Instead of guessing, ask the database to show its plan: how it intends to find the answer.", he: "במקום לנחש, מבקשים ממסד הנתונים להראות את התוכנית שלו: איך הוא מתכוון למצוא את התשובה." },
      },
      {
        from: "d", to: "s", label: "plan: read every contact", tone: "err",
        body: ["read all 50,000 contacts", "kept 1, threw away 49,999"],
        say: { en: "It read all 50,000. The existing index lists exact emails, so a search that ignores capitals can't use it.", he: "הוא קרא את כל ה-50,000. האינדקס הקיים מסודר לפי המייל המדויק, אז חיפוש שמתעלם מאותיות גדולות לא יכול להשתמש בו." },
      },
      {
        from: "s", to: "d", label: "add index: email, any case",
        say: { en: "Add an index, like the A–Z list at the back of a book, built for exactly this search.", he: "מוסיפים אינדקס, כמו רשימת א'–ת' בסוף ספר, שבנוי בדיוק לחיפוש הזה." },
      },
      {
        from: "d", to: "s", label: "jumped straight to Dana · 4 ms", tone: "ok",
        say: { en: "Same search, same answer, 4 ms. The code never changed. The database chose the faster way by itself.", he: "אותו חיפוש, אותה תשובה, 4ms. הקוד לא השתנה. מסד הנתונים בחר בעצמו בדרך המהירה." },
      },
      {
        from: "s", to: "b", label: "200 OK", status: 200,
        say: { en: "The habit: for pages people wait on, ask for the plan once, with a realistic amount of data.", he: "ההרגל: בעמודים שאנשים מחכים להם, מבקשים את התוכנית פעם אחת, עם כמות נתונים אמיתית." },
      },
    ],
  },

  index: {
    cap: { en: "Noa's newest leads load instantly once the database keeps a ready-sorted list", he: "הלידים החדשים של נועה נטענים מיד, ברגע שמסד הנתונים מחזיק רשימה ממוינת מראש" },
    actors: [browser, server, db],
    beats: [
      {
        from: "b", to: "s", label: "GET /contacts?stage=lead",
        say: { en: "Noa opens her leads, newest first. There are 100,000 contacts in total.", he: "נועה פותחת את הלידים שלה, מהחדש לישן. יש בסך הכול 100,000 אנשי קשר." },
      },
      {
        from: "s", to: "d", label: "leads, newest first, top 50",
        body: ["stage: lead", "newest first", "first 50 only"],
        say: { en: "The server asks for one kind of contact, sorted by date.", he: "השרת מבקש סוג אחד של אנשי קשר, ממוינים לפי תאריך." },
      },
      {
        from: "d", to: "d", label: "read all 100,000, then sort", tone: "err",
        say: { en: "No index, so the database reads every contact, keeps the leads, then sorts them. Like a book with no index at the back.", he: "אין אינדקס, אז מסד הנתונים קורא כל איש קשר, משאיר את הלידים ואז ממיין. כמו ספר בלי אינדקס בסוף." },
      },
      {
        from: "d", to: "s", label: "50 leads · 340 ms", tone: "warn",
        say: { en: "A third of a second on every visit, and it gets slower as the contact list grows.", he: "שליש שנייה בכל כניסה, וזה נהיה איטי יותר ככל שרשימת אנשי הקשר גדלה." },
      },
      {
        from: "s", to: "d", label: "add index: stage, then date",
        body: ["grouped by stage,", "newest first in each group"],
        say: { en: "The index keeps a ready-made list: grouped by stage, newest first in each group. Exactly what this page asks for.", he: "האינדקס מחזיק רשימה מוכנה: לפי שלב, ובתוך כל שלב מהחדש לישן. בדיוק מה שהעמוד הזה מבקש." },
      },
      {
        from: "d", to: "s", label: "50 leads · 2 ms", tone: "ok",
        say: { en: "The database jumps to the leads and reads the first 50 in order. Nothing is left to sort.", he: "מסד הנתונים קופץ ללידים וקורא את 50 הראשונים לפי הסדר. לא נשאר מה למיין." },
      },
      {
        from: "s", to: "d", label: "save 5,000 new contacts",
        say: { en: "The cost shows up when saving. Noa imports 5,000 contacts from a spreadsheet file.", he: "המחיר מגיע בשמירה. נועה מייבאת 5,000 אנשי קשר מקובץ גיליון." },
      },
      {
        from: "d", to: "d", label: "each save updates 3 indexes", tone: "warn",
        say: { en: "Every index is updated on every save. Add indexes for the pages people really use, not for everything.", he: "כל אינדקס מתעדכן בכל שמירה. מוסיפים אינדקסים לעמודים שאנשים באמת משתמשים בהם, לא לכל דבר." },
      },
    ],
  },

  transaction: {
    cap: { en: "Merging two copies of Dana takes two steps. A crash must never leave it half done", he: "מיזוג שני עותקים של דנה לוקח שני צעדים. קריסה אסור שתשאיר אותו חצי גמור" },
    actors: [browser, server, db],
    beats: [
      {
        from: "s", to: "d", label: "move 3 notes to copy 12",
        body: ["from: Dana, copy 7", "to: Dana, copy 12"],
        say: { en: "Omer merges two copies of Dana. Step one: move the notes from copy 7 to copy 12.", he: "עומר ממזג שני עותקים של דנה. צעד ראשון: מעבירים את ההערות מעותק 7 לעותק 12." },
      },
      {
        from: "s", to: "s", label: "💥 deploy restarts the server", tone: "err",
        say: { en: "A deploy restarts the server before step two, deleting copy 7. This really happens, at times you don't choose.", he: "דיפלוי מפעיל מחדש את השרת לפני הצעד השני, מחיקת עותק 7. זה באמת קורה, בזמנים שאתם לא בוחרים." },
      },
      {
        from: "b", to: "s", label: "GET /contacts?q=dana",
        say: { en: "Omer reloads the list.", he: "עומר מרענן את הרשימה." },
      },
      {
        from: "s", to: "b", label: "200 OK · 2 × Dana", status: 200, tone: "warn",
        body: ["Dana (copy 7): 0 notes", "Dana (copy 12): 3 notes"],
        say: { en: "Half a merge: Dana shows up twice, and one copy is empty. Nothing will ever finish step two.", he: "חצי מיזוג: דנה מופיעה פעמיים, ואחד העותקים ריק. שום דבר לא ישלים את הצעד השני." },
      },
      {
        from: "s", to: "d", label: "start a transaction",
        body: ["1. move 3 notes to copy 12", "2. delete copy 7", "(both or neither)"],
        say: { en: "Version two wraps both steps in a transaction: a promise that they count together or not at all.", he: "בגרסה השנייה עוטפים את שני הצעדים בטרנזקציה: הבטחה שהם נחשבים יחד, או בכלל לא." },
      },
      {
        from: "s", to: "s", label: "💥 crash before it's confirmed", tone: "err",
        say: { en: "Same crash, same moment.", he: "אותה קריסה, באותו רגע." },
      },
      {
        from: "d", to: "d", label: "undo · nothing changed", tone: "info",
        say: { en: "The server vanished mid-way, so the database undoes the unfinished steps. No one ever saw the notes move.", he: "השרת נעלם באמצע, אז מסד הנתונים מבטל את הצעדים שלא הסתיימו. אף אחד לא ראה את ההערות זזות." },
      },
      {
        from: "s", to: "d", label: "both steps saved together", tone: "ok",
        body: ["3 notes moved + copy 7 deleted", "visible at the same moment"],
        say: { en: "On retry, both steps land together. Keep it short: only database work inside, no emails or outside calls.", he: "בניסיון החוזר, שני הצעדים נשמרים יחד. שומרים את זה קצר: רק עבודה מול מסד הנתונים, בלי מיילים ובלי שירותים חיצוניים." },
      },
      {
        from: "s", to: "b", label: "200 OK · 1 Dana, 3 notes", status: 200,
        say: { en: "One Dana, three notes. Ask your AI: which saves in this feature must never stop half-way?", he: "דנה אחת, שלוש הערות. שאלו את ה-AI: אילו שמירות בפיצ'ר הזה אסור שייעצרו באמצע?" },
      },
    ],
  },

  migration: {
    cap: { en: "A database change made by hand lives on one laptop. A migration file takes it everywhere", he: "שינוי במסד הנתונים שנעשה ידנית חי בלפטופ אחד. קובץ מיגרציה לוקח אותו לכל מקום" },
    actors: [
      laptop,
      { id: "r", icon: "📁", label: { en: "Repo", he: "ריפו" } },
      prod,
      { id: "d", icon: "🗄️", label: { en: "Production database", he: "מסד הנתונים בפרודקשן" } },
    ],
    beats: [
      {
        from: "l", to: "l", label: "add 'follow-up date' by hand", tone: "warn",
        say: { en: "Omer adds a follow-up date field to his own database by hand. Reminders work on his laptop.", he: "עומר מוסיף ידנית שדה של תאריך follow-up למסד הנתונים שלו. התזכורות עובדות בלפטופ שלו." },
      },
      {
        from: "l", to: "r", label: "git push · code only",
        say: { en: "He pushes the code that uses the new field. The database change stays behind on his laptop.", he: "הוא עושה push לקוד שמשתמש בשדה החדש. השינוי במסד הנתונים נשאר מאחור, בלפטופ שלו." },
      },
      {
        from: "r", to: "o", label: "deploy main",
        say: { en: "Vercel deploys main to production.", he: "Vercel עושה דיפלוי של main לפרודקשן." },
      },
      {
        from: "o", to: "d", label: "read follow-up dates",
        say: { en: "Production asks its database for the new field.", he: "הפרודקשן מבקש ממסד הנתונים שלו את השדה החדש." },
      },
      {
        from: "d", to: "o", label: "error: no such field", tone: "err",
        say: { en: "Production's database never got the change. Every contacts page now shows an error (500).", he: "מסד הנתונים בפרודקשן אף פעם לא קיבל את השינוי. כל עמוד של אנשי קשר מציג עכשיו שגיאה (500)." },
      },
      {
        from: "l", to: "r", label: "migration file #8",
        body: ["add field: follow-up date", "to: contacts"],
        say: { en: "The fix: the change becomes a numbered file in the repo, a written recipe that gets reviewed like code.", he: "התיקון: השינוי הופך לקובץ ממוספר בריפו, מתכון כתוב שעובר review כמו קוד." },
      },
      {
        from: "r", to: "d", label: "run new migrations",
        body: ["#1–#7  already done · skip", "#8     apply ✓"],
        say: { en: "On every deploy, the recipes run in order. The database remembers which ran, so each runs exactly once.", he: "בכל דיפלוי המתכונים רצים לפי הסדר. מסד הנתונים זוכר אילו כבר רצו, אז כל אחד רץ פעם אחת בדיוק." },
      },
      {
        from: "d", to: "o", label: "20 contacts · with follow-up", tone: "ok",
        say: { en: "Laptop, staging and production now match. The next change is a new file #9, never an edit to #8.", he: "הלפטופ, הסטייג'ינג והפרודקשן עכשיו זהים. השינוי הבא הוא קובץ חדש, #9, אף פעם לא עריכה של #8." },
      },
    ],
  },

  "background-job": {
    cap: { en: "Noa imports 5,000 contacts. A deploy mid-import should delay the work, not lose it", he: "נועה מייבאת 5,000 אנשי קשר. דיפלוי באמצע צריך לעכב את העבודה, לא לאבד אותה" },
    actors: [browser, server, queue, worker],
    beats: [
      {
        from: "b", to: "s", label: "POST /imports", body: ["contacts.csv · 5,000 rows"],
        say: { en: "Noa uploads a file of 5,000 contacts. Importing it takes about a minute.", he: "נועה מעלה קובץ עם 5,000 אנשי קשר. הייבוא לוקח בערך דקה." },
      },
      {
        from: "s", to: "s", label: "start import, answer at once", tone: "warn",
        say: { en: "Version one starts the import inside the server and answers right away. Works fine on a laptop.", he: "גרסה ראשונה מתחילה את הייבוא בתוך השרת ועונה מיד. בלפטופ זה עובד מצוין." },
      },
      {
        from: "s", to: "s", label: "💥 deploy restarts · row 1,840", tone: "err",
        say: { en: "A deploy restarts the server mid-import. The work lived only in memory, so it's gone. No error, no trace.", he: "דיפלוי מפעיל מחדש את השרת באמצע הייבוא. העבודה הייתה רק בזיכרון, אז היא נעלמה. בלי שגיאה, בלי עקבות." },
      },
      {
        from: "s", to: "q", label: "add to queue: import #31", body: ["task: import file f_91", "for: Noa"],
        say: { en: "Version two first writes the job into a queue, a shared to-do list: what to do and which file.", he: "גרסה שנייה קודם רושמת את העבודה בתור, רשימת מטלות משותפת: מה לעשות ואיזה קובץ." },
      },
      {
        from: "s", to: "b", label: "202 Accepted", status: 202, body: ["import #31"],
        say: { en: "202 means 'got it, not done yet'. Noa can keep working.", he: "202 אומר 'קיבלנו, עוד לא סיימנו'. נועה יכולה להמשיך לעבוד." },
      },
      {
        from: "q", to: "w", label: "worker takes job #31",
        say: { en: "A separate worker picks up the job. The queue marks it 'taken' instead of deleting it, until the worker says done.", he: "וורקר נפרד לוקח את העבודה. התור מסמן אותה 'נלקחה' במקום למחוק, עד שהוורקר מדווח שסיים." },
      },
      {
        from: "w", to: "w", label: "💥 worker restarts · row 1,840", tone: "err",
        say: { en: "Another deploy stops the worker mid-job. This time the job is still written down in the queue.", he: "דיפלוי נוסף עוצר את הוורקר באמצע. הפעם העבודה עדיין רשומה בתור." },
      },
      {
        from: "q", to: "w", label: "no 'done' → job #31 again", tone: "warn",
        say: { en: "The worker never said done, so the job is handed out again. Running it twice must be safe: same email, same contact.", he: "הוורקר לא דיווח שסיים, אז העבודה נמסרת שוב. הרצה כפולה חייבת להיות בטוחה: אותו מייל, אותו איש קשר." },
      },
      {
        from: "w", to: "q", label: "job #31 done · 5,000 rows", tone: "ok",
        say: { en: "Done, and recorded. The restart delayed the import by a minute. It didn't lose it.", he: "סיים, ונרשם. הריסטארט עיכב את הייבוא בדקה. הוא לא איבד אותו." },
      },
    ],
  },

  "event-and-pub-sub": {
    cap: { en: "Dana's deal is won. The app announces it once, and each part that cares reacts", he: "העסקה של דנה נסגרה. האפליקציה מכריזה על זה פעם אחת, וכל חלק שזה מעניין אותו מגיב" },
    actors: [
      { id: "s", icon: "🖥️", label: { en: "Contacts", he: "אנשי קשר" } },
      { id: "u", icon: "📣", label: { en: "Event bus", he: "לוח אירועים" } },
      { id: "r", icon: "⏰", label: { en: "Reminders", he: "תזכורות" } },
      { id: "a", icon: "📊", label: { en: "Analytics", he: "אנליטיקס" } },
    ],
    beats: [
      {
        from: "s", to: "s", label: "mark Dana's deal as won",
        say: { en: "Omer marks Dana's deal as won. Other parts of the app need to react, without the contacts code knowing them all.", he: "עומר מסמן שהעסקה של דנה נסגרה. חלקים אחרים באפליקציה צריכים להגיב, בלי שהקוד של אנשי הקשר יכיר את כולם." },
      },
      {
        from: "s", to: "u", label: "announce: DealWon",
        body: ["event: evt_88", "contact: Dana"],
        say: { en: "Instead of calling each one, it posts one announcement, 'a deal was won', and moves on. Like a notice on a board.", he: "במקום לפנות לכל אחד, הוא מפרסם הודעה אחת, 'עסקה נסגרה', וממשיך הלאה. כמו מודעה על לוח." },
      },
      {
        from: "u", to: "r", label: "DealWon evt_88",
        say: { en: "Everyone who signed up for it gets a copy. Reminders cancels Dana's pending follow-ups.", he: "כל מי שנרשם לזה מקבל עותק. התזכורות מבטלות את ה-follow-ups שנשארו לדנה." },
      },
      {
        from: "u", to: "a", label: "DealWon evt_88",
        say: { en: "Analytics gets its own copy and counts a win. Each listener works, and fails, on its own.", he: "האנליטיקס מקבל עותק משלו וסופר זכייה. כל מאזין עובד, ונכשל, בנפרד." },
      },
      {
        from: "a", to: "a", label: "💥 crash before 'got it'", tone: "err",
        say: { en: "Analytics counts the win, then crashes before telling the board 'got it'.", he: "האנליטיקס סופר את הזכייה, ואז קורס לפני שהוא אומר ללוח 'קיבלתי'." },
      },
      {
        from: "u", to: "a", label: "DealWon evt_88 · sent again", tone: "warn",
        say: { en: "So it is delivered again. These systems promise 'at least once', never 'exactly once'.", he: "אז ההודעה נמסרת שוב. מערכות כאלה מבטיחות 'לפחות פעם אחת', אף פעם לא 'בדיוק פעם אחת'." },
      },
      {
        from: "a", to: "a", label: "seen evt_88 already → skip", tone: "ok",
        say: { en: "Analytics remembers which announcements it already handled, so the second copy is ignored. One win, not two.", he: "האנליטיקס זוכר באילו הודעות כבר טיפל, אז הוא מתעלם מהעותק השני. זכייה אחת, לא שתיים." },
      },
      {
        from: "u", to: "u", label: "listeners: reminders, analytics", tone: "info",
        say: { en: "Ask your AI for this list. A new reaction, like a Slack alert, is one more listener. The contacts code never changes.", he: "בקשו מה-AI את הרשימה הזאת. תגובה חדשה, כמו התראה ב-Slack, היא עוד מאזין. הקוד של אנשי הקשר לא משתנה." },
      },
    ],
  },

  "retry-and-backoff": {
    cap: { en: "The email service fails for 40 seconds. How you retry decides whether anyone notices", he: "שירות המיילים נופל ל-40 שניות. הדרך שבה מנסים שוב קובעת אם מישהו ישים לב" },
    actors: [worker, emailApi],
    beats: [
      {
        from: "w", to: "p", label: "POST /emails · reminder #512",
        say: { en: "The worker sends Dana's reminder. The email service is in the middle of a 40-second hiccup.", he: "הוורקר שולח לדנה את התזכורת. שירות המיילים נמצא באמצע תקלה של 40 שניות." },
      },
      {
        from: "p", to: "w", label: "503 Service Unavailable", status: 503,
        say: { en: "503 means 'down for a moment'. Worth trying again, but how you retry matters.", he: "503 אומר 'לא זמין כרגע'. שווה לנסות שוב, אבל חשוב איך." },
      },
      {
        from: "w", to: "p", label: "retry ×3 at once · 2,000 jobs", tone: "err",
        say: { en: "Version one retries instantly. 2,000 failed emails become 8,000 requests at a service that's already struggling.", he: "גרסה ראשונה מנסה שוב מיד. 2,000 מיילים שנכשלו הופכים ל-8,000 בקשות לשירות שכבר מתקשה." },
      },
      {
        from: "p", to: "w", label: "429 Too Many Requests", status: 429, body: ["try again in 15 minutes"],
        say: { en: "The service protects itself and blocks you for 15 minutes. A 40-second hiccup became your own outage.", he: "השירות מגן על עצמו וחוסם אתכם ל-15 דקות. תקלה של 40 שניות הפכה להשבתה שיצרתם בעצמכם." },
      },
      {
        from: "w", to: "w", label: "wait 1s → 2s → 4s, a bit random", tone: "info",
        say: { en: "Version two waits before each retry, doubles the wait, and adds a little randomness so 2,000 emails don't retry at once.", he: "גרסה שנייה מחכה לפני כל ניסיון, מכפילה את ההמתנה ומוסיפה קצת אקראיות, כדי ש-2,000 מיילים לא ינסו שוב בבת אחת." },
      },
      {
        from: "w", to: "p", label: "POST /emails · try 3", body: ["same ID: reminder-512"],
        say: { en: "Every try carries the same ID, so the service knows it's one email. Dana can never get two.", he: "כל ניסיון נושא את אותו מזהה, כך שהשירות יודע שזה מייל אחד. דנה לעולם לא תקבל שניים." },
      },
      {
        from: "p", to: "w", label: "200 OK", status: 200,
        say: { en: "The hiccup is over and the third try goes through. Nobody noticed a thing.", he: "התקלה עברה והניסיון השלישי מצליח. אף אחד לא שם לב לכלום." },
      },
      {
        from: "w", to: "p", label: "POST /emails · reminder #513", body: ["to: dana@@acme"],
        say: { en: "Next email: an address that got broken during the spreadsheet import.", he: "המייל הבא: כתובת שנהרסה בייבוא הגיליון." },
      },
      {
        from: "p", to: "w", label: "422 Unprocessable Entity", status: 422,
        say: { en: "422 means 'this request itself is wrong', so retrying never helps. Retry only temporary failures, and only a few times.", he: "422 אומר 'הבקשה עצמה שגויה', אז ניסיון חוזר לא יעזור אף פעם. מנסים שוב רק בתקלות זמניות, ורק כמה פעמים." },
      },
    ],
  },

  "dead-letter-queue": {
    cap: { en: "One job fails every retry. It's set aside for a person to look at, not lost and not stuck in a loop", he: "עבודה אחת נכשלת בכל הניסיונות. היא מועברת הצידה כדי שמישהו יבדוק, לא הולכת לאיבוד ולא נתקעת בלופ" },
    actors: [
      queue,
      worker,
      { id: "x", icon: "🗃️", label: { en: "Dead-letter queue", he: "תור העבודות שנכשלו" } },
      { id: "y", icon: "👩‍💻", label: { en: "You", he: "אתם" } },
    ],
    beats: [
      {
        from: "q", to: "w", label: "job #77 · send reminder", body: ["contact #318"],
        say: { en: "A reminder job for contact 318, who was imported from a spreadsheet last week.", he: "עבודת תזכורת לאיש קשר 318, שיובא מגיליון בשבוע שעבר." },
      },
      {
        from: "w", to: "w", label: "crash · try 1 of 5", tone: "err",
        body: ["error: this contact has no name"],
        say: { en: "The email starts with the contact's first name. This contact has no name at all, so the code crashes.", he: "המייל מתחיל בשם הפרטי של איש הקשר. לאיש הקשר הזה אין שם בכלל, אז הקוד קורס." },
      },
      {
        from: "w", to: "q", label: "retry in 2s, 4s, 8s, 16s", tone: "warn",
        say: { en: "It retries, waiting longer each time. That can't help: the same input fails the same way every time.", he: "יש ניסיונות חוזרים, עם המתנה ארוכה יותר בכל פעם. זה לא יכול לעזור: אותו קלט נכשל באותה דרך בכל פעם." },
      },
      {
        from: "w", to: "x", label: "job #77 → set aside after 5",
        body: ["contact: #318", "error: no name", "tries: 5 · Sep 21, 09:14"],
        say: { en: "Out of tries. The job isn't thrown away or looped forever. It's set aside with its input, the error and the time.", he: "הניסיונות נגמרו. העבודה לא נזרקת ולא מסתובבת לנצח. היא מועברת הצידה עם הקלט, השגיאה והזמן." },
      },
      {
        from: "x", to: "y", label: "🔔 14 jobs set aside", tone: "warn",
        say: { en: "An alert fires because the pile isn't empty: 14 jobs, all with the same error. A short list you can actually read.", he: "התראה קופצת כי הערימה לא ריקה: 14 עבודות, כולן עם אותה שגיאה. רשימה קצרה שאפשר באמת לקרוא." },
      },
      {
        from: "y", to: "y", label: "fix: no name → 'Hi there'", tone: "ok",
        say: { en: "You read why they failed and make a tiny fix: a contact with no name gets 'Hi there'.", he: "אתם קוראים למה הן נכשלו ועושים תיקון קטן: איש קשר בלי שם מקבל 'Hi there'." },
      },
      {
        from: "x", to: "q", label: "run the 14 jobs again",
        say: { en: "Run them again. Safe here, since none of these emails went out. Jobs that charge money would need a check first.", he: "מריצים אותן שוב. כאן זה בטוח, כי אף אחד מהמיילים האלה לא יצא. עבודות שגובות כסף היו דורשות בדיקה קודם." },
      },
      {
        from: "q", to: "w", label: "job #77 → sent ✓", tone: "ok",
        say: { en: "Contact 318 gets the reminder. Nothing got lost quietly, and nothing was sent twice.", he: "איש קשר 318 מקבל את התזכורת. שום דבר לא אבד בשקט, ושום דבר לא נשלח פעמיים." },
      },
    ],
  },

  "real-time-websocket-sse": {
    cap: { en: "Noa watches her import live. With two servers, the 'done' message must reach the right one", he: "נועה עוקבת אחרי הייבוא בזמן אמת. עם שני שרתים, ההודעה 'הסתיים' צריכה להגיע לשרת הנכון" },
    actors: [
      browser,
      { id: "a", icon: "🖥️", label: { en: "Server A", he: "שרת A" } },
      { id: "x", icon: "🖥️", label: { en: "Server B", he: "שרת B" } },
      { id: "r", icon: "📡", label: { en: "Message hub", he: "מרכז הודעות" } },
    ],
    beats: [
      {
        from: "b", to: "a", label: "GET /imports/31/events", body: ["keep this line open"],
        say: { en: "Noa's page opens a line to the server and keeps it open, like a phone call nobody hangs up, to follow her import.", he: "העמוד של נועה פותח קו לשרת ומשאיר אותו פתוח, כמו שיחת טלפון שאף אחד לא מנתק, כדי לעקוב אחרי הייבוא." },
      },
      {
        from: "a", to: "b", label: "progress · 40%", tone: "ok",
        body: ["progress: 40%"],
        say: { en: "Server A sends updates down the open line whenever there's news. No refresh, no asking again.", he: "שרת A שולח עדכונים על הקו הפתוח בכל פעם שיש חדש. בלי רענון, בלי לשאול שוב." },
      },
      {
        from: "x", to: "x", label: "import #31 done", tone: "ok",
        say: { en: "The import finishes on Server B. The app runs on two servers that share the traffic.", he: "הייבוא מסתיים בשרת B. האפליקציה רצה על שני שרתים שמתחלקים בעבודה." },
      },
      {
        from: "x", to: "x", label: "no open line to Noa here", tone: "err",
        say: { en: "B wants to tell Noa, but her line is connected to A. The message goes nowhere, and her page is stuck at 40%.", he: "B רוצה לעדכן את נועה, אבל הקו שלה מחובר ל-A. ההודעה לא מגיעה לשום מקום, והעמוד שלה תקוע על 40%." },
      },
      {
        from: "x", to: "r", label: "announce: import #31 done",
        say: { en: "The fix: B posts the news to a shared message hub (Redis) that every server listens to.", he: "התיקון: B מפרסם את החדשות במרכז הודעות משותף (Redis) שכל השרתים מאזינים לו." },
      },
      {
        from: "r", to: "a", label: "import #31 done",
        say: { en: "A is listening, so it hears the news. Whichever server holds the line can pass it on.", he: "A מאזין, אז הוא שומע את החדשות. השרת שמחזיק את הקו יכול להעביר אותן הלאה." },
      },
      {
        from: "a", to: "b", label: "done · 5,000 imported", tone: "ok",
        say: { en: "Noa sees it the moment it happens.", he: "נועה רואה את זה ברגע שזה קורה." },
      },
      {
        from: "a", to: "b", label: "ping (every 25s)", tone: "info",
        say: { en: "A small ping stops the quiet line being cut. This one-way line is SSE; a chat, where both sides talk, needs a WebSocket.", he: "פינג קטן מונע מהקו השקט להיחתך. הקו החד-כיווני הזה נקרא SSE; צ'אט, ששני הצדדים מדברים בו, צריך WebSocket." },
      },
    ],
  },

  "hit-miss": {
    cap: { en: "Omer's dashboard checks the cache first. A badly named entry means it never finds anything", he: "הדשבורד של עומר בודק קודם בקאש. שם גרוע לרשומה אומר שהוא אף פעם לא מוצא כלום" },
    actors: [server, cache, db],
    beats: [
      {
        from: "s", to: "c", label: "find 'Omer counts 10:07:14'",
        say: { en: "The dashboard asks the cache, a quick-access memory, for Omer's counts. Someone put the current time in the name 'to keep it fresh'.", he: "הדשבורד מבקש מהקאש, זיכרון לגישה מהירה, את הספירות של עומר. מישהו הכניס את השעה הנוכחית לשם 'כדי שיהיה טרי'." },
      },
      {
        from: "c", to: "s", label: "MISS", tone: "warn",
        say: { en: "Nothing is saved under that exact name. That's a miss.", he: "תחת השם המדויק הזה לא שמור כלום. זה miss." },
      },
      {
        from: "s", to: "d", label: "count contacts per stage",
        say: { en: "So it pays full price: the database counts every contact.", he: "אז משלמים מחיר מלא: מסד הנתונים סופר כל איש קשר." },
      },
      {
        from: "d", to: "s", label: "4 numbers · 180 ms", body: ["lead 12 · qualified 5 · won 3 · lost 2"],
        say: { en: "180 ms later, the answer.", he: "אחרי 180ms, התשובה." },
      },
      {
        from: "s", to: "c", label: "save as 'Omer counts 10:07:14'", tone: "warn",
        say: { en: "Saved under a name nobody will ask for again, since the next visit has a new time. Only 4% of visits find anything.", he: "נשמר תחת שם שאף אחד לא יבקש שוב, כי בביקור הבא יש שעה אחרת. רק 4% מהביקורים מוצאים משהו." },
      },
      {
        from: "s", to: "c", label: "find 'Omer counts'",
        say: { en: "The fix: the name holds only what changes the answer, whose counts. Freshness comes from expiring it after 60 seconds.", he: "התיקון: בשם יש רק מה שמשנה את התשובה, של מי הספירות. הטריות מגיעה מזה שהעותק פג אחרי 60 שניות." },
      },
      {
        from: "c", to: "s", label: "HIT · 0.3 ms", tone: "ok", body: ["lead 12 · qualified 5 · won 3 · lost 2"],
        say: { en: "A hit: the copy was there, and the database wasn't asked at all. 0.3 ms instead of 180.", he: "Hit: העותק היה שם, ומסד הנתונים לא נשאל בכלל. 0.3ms במקום 180." },
      },
      {
        from: "s", to: "s", label: "found 4% → 91% of the time", tone: "ok",
        say: { en: "Measure it: a broken cache and a working one look the same in code. And keep Omer in the name, or he'd see Noa's numbers.", he: "מודדים: קאש שבור וקאש שעובד נראים אותו דבר בקוד. והשם של עומר נשאר בפנים, אחרת הוא יראה את המספרים של נועה." },
      },
    ],
  },

  invalidation: {
    cap: { en: "Noa renames Dana. Every saved copy that shows Dana has to be thrown away", he: "נועה משנה את השם של דנה. כל עותק שמור שמציג את דנה צריך להיזרק" },
    actors: [browser, server, cache, db],
    beats: [
      {
        from: "b", to: "s", label: "PATCH /contacts/42", body: ["name: Dana Levi"],
        say: { en: "Noa fixes Dana's last name.", he: "נועה מתקנת את שם המשפחה של דנה." },
      },
      {
        from: "s", to: "d", label: "save the new name",
        say: { en: "The database now has the new name.", he: "במסד הנתונים כבר יש את השם החדש." },
      },
      {
        from: "s", to: "c", label: "throw away: Dana's card",
        say: { en: "The server throws away the saved copy of Dana's contact card, so the next visit rebuilds it. That's invalidation.", he: "השרת זורק את העותק השמור של כרטיס איש הקשר של דנה, כדי שהביקור הבא יבנה אותו מחדש. לזה קוראים invalidation." },
      },
      {
        from: "s", to: "c", label: "get Noa's leads list",
        say: { en: "Then Noa opens her leads list.", he: "אחר כך נועה פותחת את רשימת הלידים." },
      },
      {
        from: "c", to: "s", label: "HIT · Dana Cohen (old)", tone: "warn",
        say: { en: "The list was saved too, and it shows Dana. Nobody threw it away, so it shows the old name until it expires.", he: "גם הרשימה נשמרה, והיא מציגה את דנה. אף אחד לא זרק אותה, אז היא מציגה את השם הישן עד שהתוקף שלה ייגמר." },
      },
      {
        from: "s", to: "s", label: "what else shows Dana?", tone: "info",
        say: { en: "The real question on every change: which saved copies used this data? Here: the card, the leads list, the dashboard counts.", he: "השאלה האמיתית בכל שינוי: אילו עותקים שמורים השתמשו בנתונים האלה? כאן: הכרטיס, רשימת הלידים והספירות בדשבורד." },
      },
      {
        from: "s", to: "c", label: "throw away all 'Noa contacts'",
        body: ["card, leads list,", "dashboard counts"],
        say: { en: "The fix: tag every copy built from Noa's contacts with one label, and throw that label away on every contact change.", he: "התיקון: מסמנים בתווית אחת כל עותק שנבנה מאנשי הקשר של נועה, וזורקים את כל מה שיש בתווית הזאת בכל שינוי באנשי קשר." },
      },
      {
        from: "s", to: "b", label: "200 OK · Dana Levi", status: 200,
        say: { en: "The next visit rebuilds from the database and shows the new name everywhere. A short expiry catches anything missed.", he: "הביקור הבא נבנה מחדש ממסד הנתונים ומציג את השם החדש בכל מקום. תוקף קצר תופס את מה שפוספס." },
      },
    ],
  },

  "browser-cache": {
    cap: { en: "You shipped the fix. Dana's browser is still running yesterday's copy", he: "עשיתם דיפלוי לתיקון. הדפדפן של דנה עדיין מריץ את העותק של אתמול" },
    actors: [
      { id: "k", icon: "💾", label: { en: "Browser cache", he: "קאש הדפדפן" } },
      browser,
      server,
    ],
    beats: [
      {
        from: "b", to: "s", label: "GET /contacts",
        say: { en: "Dana's first visit of the day.", he: "הביקור הראשון של דנה היום." },
      },
      {
        from: "s", to: "b", label: "200 OK", status: 200,
        body: ["keep this page for 1 hour", "uses: app.js"],
        say: { en: "The server says 'keep this page for an hour', and the page uses app.js. The browser saves both.", he: "השרת אומר 'שמרו את העמוד הזה לשעה', והעמוד משתמש ב-app.js. הדפדפן שומר את שניהם." },
      },
      {
        from: "s", to: "s", label: "deploy · fix in app.js", tone: "ok",
        say: { en: "You fix a bug in app.js and deploy. After a hard refresh, it looks fine on your computer.", he: "אתם מתקנים באג ב-app.js ועושים דיפלוי. אצלכם, אחרי hard refresh, הכול נראה תקין." },
      },
      {
        from: "b", to: "k", label: "GET /contacts · saved copy", tone: "warn",
        say: { en: "Dana comes back 20 minutes later. The hour isn't up, so her browser doesn't even ask the server.", he: "דנה חוזרת אחרי 20 דקות. השעה עוד לא עברה, אז הדפדפן שלה אפילו לא שואל את השרת." },
      },
      {
        from: "k", to: "b", label: "old page → old app.js → old bug", tone: "err",
        say: { en: "The old page loads the old script, with the old bug. You have no button that clears Dana's laptop.", he: "העמוד הישן טוען את הסקריפט הישן, עם הבאג הישן. אין לכם כפתור שמנקה את הלפטופ של דנה." },
      },
      {
        from: "b", to: "s", label: "GET /contacts", body: ["I have version 41. Changed?"],
        say: { en: "The fix: tell the browser it may keep the page, but must check first. A quick 'has it changed?'.", he: "התיקון: אומרים לדפדפן שמותר לו לשמור את העמוד, אבל הוא חייב לבדוק קודם. שאלה מהירה: 'השתנה?'." },
      },
      {
        from: "s", to: "b", label: "200 OK · new page", status: 200,
        body: ["always check before using", "uses: app.9f3c2a1.js"],
        say: { en: "It has changed, so the new page comes back, pointing at a new file name. New content always gets a new name.", he: "הוא השתנה, אז העמוד החדש חוזר ומפנה לשם קובץ חדש. תוכן חדש תמיד מקבל שם חדש." },
      },
      {
        from: "b", to: "s", label: "GET /app.9f3c2a1.js",
        say: { en: "The browser has never seen that name, so it downloads the fixed script.", he: "הדפדפן אף פעם לא ראה את השם הזה, אז הוא מוריד את הסקריפט המתוקן." },
      },
      {
        from: "s", to: "b", label: "200 OK", status: 200,
        body: ["keep this file for a year"],
        say: { en: "Kept for a year, because that name will never mean anything else. Next visit: a quick check for the page, the script from disk.", he: "נשמר לשנה, כי השם הזה לעולם לא יתייחס לקובץ אחר. בביקור הבא: בדיקה מהירה לעמוד, והסקריפט מהדיסק." },
      },
    ],
  },

  cdn: {
    cap: { en: "Visitors in Tel Aviv, a server in Virginia. A CDN keeps copies around the corner", he: "גולשים בתל אביב, שרת בווירג'יניה. CDN שומר עותקים ממש קרוב אליהם" },
    actors: [
      { id: "b", icon: "🧑‍💻", label: { en: "Visitors", he: "גולשים" } },
      { id: "e", icon: "🌍", label: { en: "CDN · Tel Aviv", he: "CDN בתל אביב" } },
      { id: "o", icon: "🏛️", label: { en: "Main server · US", he: "שרת ראשי בארה\"ב" } },
    ],
    beats: [
      {
        from: "b", to: "e", label: "GET /app.9f3c.js",
        say: { en: "Dana in Tel Aviv asks for the app's script. She reaches a nearby CDN server, not your server in Virginia.", he: "דנה בתל אביב מבקשת את הסקריפט של האפליקציה. היא מגיעה לשרת CDN קרוב, לא לשרת שלכם בווירג'יניה." },
      },
      {
        from: "e", to: "o", label: "no copy yet → ask main server", tone: "warn",
        say: { en: "This nearby server has no copy yet (a miss), so it asks your main server, far away.", he: "לשרת הקרוב עוד אין עותק (miss), אז הוא שואל את השרת הראשי שלכם, שרחוק מאוד." },
      },
      {
        from: "o", to: "e", label: "200 OK", status: 200,
        body: ["same for everyone:", "keep for a year"],
        say: { en: "The file is the same for everyone, and the server says so. The nearby server keeps a copy.", he: "הקובץ זהה לכולם, והשרת אומר את זה. השרת הקרוב שומר עותק." },
      },
      {
        from: "e", to: "b", label: "200 OK · 190 ms", status: 200,
        say: { en: "Dana waits for the full trip, once.", he: "דנה מחכה לכל הדרך, פעם אחת." },
      },
      {
        from: "b", to: "e", label: "GET /app.9f3c.js",
        say: { en: "Noa, also in Tel Aviv, asks for the same file.", he: "נועה, גם היא בתל אביב, מבקשת את אותו קובץ." },
      },
      {
        from: "e", to: "b", label: "200 OK · 15 ms", status: 200, body: ["served from the nearby copy"],
        say: { en: "Served from nearby in 15 ms. Your main server never hears of it, so even a launch-day crowd doesn't reach it.", he: "מוגש מקרוב ב-15ms. השרת הראשי לא שומע על זה, וגם עומס של יום השקה לא מגיע אליו." },
      },
      {
        from: "o", to: "e", label: "200 OK · /account", status: 200, tone: "err",
        body: ["Hello Dana · 3 deals won", "marked: same for everyone ✗"],
        say: { en: "The trap: one blanket rule also marks Dana's personal /account page as 'same for everyone'. The nearby server keeps it.", he: "המלכודת: כלל גורף אחד מסמן גם את עמוד /account האישי של דנה כ'זהה לכולם'. השרת הקרוב שומר אותו." },
      },
      {
        from: "e", to: "b", label: "saved /account · Hello Dana", tone: "err",
        say: { en: "The next visitor sees Dana's name and deals. Anything personal, or tied to a sign-in cookie, must never be kept there.", he: "הגולש הבא רואה את השם והעסקאות של דנה. כל מה שאישי, או קשור ל-cookie של התחברות, אסור שיישמר שם." },
      },
      {
        from: "o", to: "e", label: "200 OK · /account", status: 200, body: ["personal: never keep a copy"],
        say: { en: "Fixed: it passes through and nothing is kept. Ask of every rule: could two people ever get the same saved page?", he: "תוקן: העמוד עובר הלאה ושום דבר לא נשמר. שאלו על כל כלל: האם שני אנשים יכולים לקבל אותו עמוד שמור?" },
      },
    ],
  },

  pagination: {
    cap: { en: "Noa has 5,000 contacts. The list arrives 50 at a time, with a bookmark", he: "לנועה יש 5,000 אנשי קשר. הרשימה מגיעה 50 בכל פעם, עם סימנייה" },
    actors: [browser, server, db],
    beats: [
      {
        from: "b", to: "s", label: "GET /api/contacts",
        say: { en: "Version one sends back every contact. Fine with 40. Noa just imported 5,000.", he: "גרסה ראשונה מחזירה את כל אנשי הקשר. עם 40 זה בסדר. נועה ייבאה עכשיו 5,000." },
      },
      {
        from: "s", to: "b", label: "200 OK · 5,000 contacts · 4 MB", status: 200, tone: "warn",
        say: { en: "4 MB of data and a frozen page, just to show the first 50. At 400,000 contacts, this crashes the server.", he: "4MB של נתונים ועמוד קפוא, רק כדי להציג את 50 הראשונים. ב-400,000 אנשי קשר זה מפיל את השרת." },
      },
      {
        from: "b", to: "s", label: "GET /api/contacts?limit=50",
        say: { en: "Version two asks for one page of 50.", he: "גרסה שנייה מבקשת עמוד אחד של 50." },
      },
      {
        from: "s", to: "d", label: "get the first 51 contacts",
        say: { en: "The server fetches one extra, just to know whether there's a next page.", he: "השרת מביא אחד נוסף, רק כדי לדעת אם יש עמוד הבא." },
      },
      {
        from: "s", to: "b", label: "200 OK", status: 200,
        body: ["50 contacts", "bookmark: after #1050"],
        say: { en: "50 contacts plus a bookmark: 'continue after the last one you saw'.", he: "50 אנשי קשר ועוד סימנייה: 'תמשיכו אחרי האחרון שראיתם'." },
      },
      {
        from: "b", to: "s", label: "GET /api/contacts?cursor=…",
        say: { en: "Noa scrolls. The page sends the bookmark back.", he: "נועה גוללת. העמוד שולח את הסימנייה בחזרה." },
      },
      {
        from: "s", to: "d", label: "get the next 51 after #1050",
        say: { en: "The bookmark says where to continue, so page 90 is as fast as page 1, and new contacts can't shuffle the list.", he: "הסימנייה אומרת מאיפה להמשיך, אז עמוד 90 מהיר כמו עמוד 1, ואנשי קשר חדשים לא מבלבלים את הרשימה." },
      },
      {
        from: "b", to: "s", label: "GET /api/contacts?limit=1000000",
        say: { en: "Someone asks for a million at once.", he: "מישהו מבקש מיליון בבת אחת." },
      },
      {
        from: "s", to: "b", label: "200 OK · 100 contacts (max)", status: 200,
        say: { en: "The server sets the biggest page size, never whoever is asking.", he: "השרת קובע מה הגודל המקסימלי של עמוד, אף פעם לא מי שמבקש." },
      },
    ],
  },

  "timeouts-and-retries": {
    cap: { en: "The email service freezes. A time limit sets you free, and an ID makes trying again safe", he: "שירות המיילים נתקע. הגבלת זמן משחררת אתכם, ומזהה הופך ניסיון חוזר לבטוח" },
    actors: [worker, emailApi, inbox],
    beats: [
      {
        from: "w", to: "p", label: "POST /emails · no time limit",
        say: { en: "The reminder job asks the email service to send Dana's follow-up. There's no time limit.", he: "עבודת התזכורות מבקשת משירות המיילים לשלוח לדנה follow-up. אין הגבלת זמן." },
      },
      {
        from: "p", to: "p", label: "… no answer", tone: "warn",
        say: { en: "The service is stuck and never answers. With no limit, the job waits forever, like being on hold for good.", he: "השירות תקוע ולא עונה. בלי הגבלה, העבודה מחכה לנצח, כמו להישאר בהמתנה בטלפון בלי סוף." },
      },
      {
        from: "w", to: "w", label: "10 of 10 lines waiting", tone: "err",
        say: { en: "Every reminder does the same. No errors, no logs. The service looks healthy and does nothing.", he: "כל תזכורת עושה אותו דבר. אין שגיאות, אין לוגים. השירות נראה בריא ולא עושה כלום." },
      },
      {
        from: "w", to: "p", label: "POST /emails · 5s limit", body: ["ID: reminder-512"],
        say: { en: "Version two: every call out gets a time limit (a timeout), plus an ID that makes repeating it safe.", he: "גרסה שנייה: לכל פנייה החוצה יש הגבלת זמן (timeout), ועוד מזהה שהופך את החזרה עליה לבטוחה." },
      },
      {
        from: "p", to: "i", label: "deliver to dana@acme.io", tone: "ok",
        say: { en: "This time the service does send the email. Only its reply is slow.", he: "הפעם השירות דווקא שולח את המייל. רק התשובה שלו איטית." },
      },
      {
        from: "w", to: "w", label: "5s passed → stop waiting", tone: "err",
        say: { en: "After 5 seconds the job stops waiting. A timeout means 'I don't know', not 'it didn't happen'.", he: "אחרי 5 שניות העבודה מפסיקה לחכות. timeout אומר 'אני לא יודע', לא 'זה לא קרה'." },
      },
      {
        from: "w", to: "p", label: "POST /emails · retry after 1s", body: ["ID: reminder-512"],
        say: { en: "One retry, after a short pause, with the same ID. Sending twice isn't safe on its own. The ID makes it safe.", he: "ניסיון חוזר אחד, אחרי הפסקה קצרה, עם אותו מזהה. שליחה כפולה לא בטוחה בפני עצמה. המזהה הופך אותה לבטוחה." },
      },
      {
        from: "p", to: "w", label: "200 OK · already sent", status: 200,
        body: ["same email as before"],
        say: { en: "The service recognises the ID and returns the first result. Dana gets one email, not two.", he: "השירות מזהה את המזהה ומחזיר את התוצאה הראשונה. דנה מקבלת מייל אחד, לא שניים." },
      },
    ],
  },

  "api-key-vs-oauth-app": {
    cap: { en: "Two kinds of secret: a key that says 'this is Pocket CRM', a token that says 'Noa allowed this'", he: "שני סוגי סודות: מפתח שאומר 'זה Pocket CRM', וטוקן שאומר 'נועה הרשתה את זה'" },
    actors: [
      browser,
      { id: "g", icon: "🔐", label: { en: "Google", he: "Google" } },
      server,
      emailApi,
    ],
    beats: [
      {
        from: "s", to: "p", label: "POST /emails", body: ["app key: key_8Kx…"],
        say: { en: "To send a reminder, your server shows its API key. It says 'this is Pocket CRM', nothing about any person.", he: "כדי לשלוח תזכורת, השרת מציג את מפתח ה-API שלו. הוא אומר 'זה Pocket CRM', ולא כלום על אף אדם." },
      },
      {
        from: "p", to: "s", label: "200 OK", status: 200,
        say: { en: "The service bills and limits the app as a whole. One key for the whole app, kept secret on the server.", he: "השירות מחייב ומגביל את האפליקציה כולה. מפתח אחד לכל האפליקציה, שמור בסוד בשרת." },
      },
      {
        from: "b", to: "g", label: "open Google's permission page",
        body: ["app: Pocket CRM", "asks for: your calendar"],
        say: { en: "Noa clicks 'Connect Google Calendar' and is sent to Google. Your app never sees her Google password.", he: "נועה לוחצת 'Connect Google Calendar' ונשלחת ל-Google. האפליקציה שלכם לא רואה את הסיסמה שלה ב-Google." },
      },
      {
        from: "g", to: "g", label: "Noa approves: calendar", tone: "ok",
        say: { en: "Google shows her exactly what your app is asking for. She approves.", he: "Google מראה לה בדיוק מה האפליקציה מבקשת. היא מאשרת." },
      },
      {
        from: "g", to: "b", label: "302 Found", status: 302, body: ["back to Pocket CRM,", "with a one-time code"],
        say: { en: "Google sends her back to your app with a one-time code.", he: "Google מחזיר אותה לאפליקציה שלכם עם קוד חד-פעמי." },
      },
      {
        from: "b", to: "s", label: "GET /oauth/callback?code=…",
        say: { en: "The browser hands the code to your server. Without your app's own secret, the code is useless.", he: "הדפדפן מוסר את הקוד לשרת שלכם. בלי הסוד של האפליקציה, הקוד חסר ערך." },
      },
      {
        from: "s", to: "g", label: "trade the code for a token",
        body: ["one-time code", "+ Pocket CRM's secret"],
        say: { en: "Your server swaps the code, plus your app's own secret, for a token.", he: "השרת שלכם מחליף את הקוד, יחד עם הסוד של האפליקציה, בטוקן." },
      },
      {
        from: "g", to: "s", label: "200 OK", status: 200,
        body: ["token for Noa's calendar", "expires in 1 hour", "+ a renewal token"],
        say: { en: "A token for Noa only, for her calendar only. It expires in an hour; a second token gets a fresh one.", he: "טוקן רק של נועה, ורק ליומן שלה. הוא פג אחרי שעה, וטוקן שני מביא חדש." },
      },
      {
        from: "s", to: "g", label: "add event to Noa's calendar", body: ["token: Noa's"],
        say: { en: "One token per person, kept on the server, and Noa can cancel it anytime. Sending email: a key. 'Connect your calendar': OAuth.", he: "טוקן אחד לכל אדם, שמור בשרת, ונועה יכולה לבטל אותו מתי שתרצה. שליחת מייל: מפתח. 'חיבור היומן': OAuth." },
      },
    ],
  },

  "sandbox-vs-live-keys": {
    cap: { en: "Test and live keys look alike in code. One sends nothing, the other reaches real people", he: "מפתח בדיקות ומפתח חי נראים אותו דבר בקוד. אחד לא שולח כלום, השני מגיע לאנשים אמיתיים" },
    actors: [laptop, prod, emailApi, inbox],
    beats: [
      {
        from: "l", to: "p", label: "POST /emails",
        body: ["key: test_4f…", "to: dana@acme.io"],
        say: { en: "On Omer's laptop, reminders use the test key. Same code, same address as production.", he: "בלפטופ של עומר, התזכורות משתמשות במפתח הבדיקות. אותו קוד, אותה כתובת כמו בפרודקשן." },
      },
      {
        from: "p", to: "l", label: "200 OK · test mode", status: 200, body: ["accepted · not delivered"],
        say: { en: "The service accepts it and delivers nothing. Run it 200 times and nobody gets a thing.", he: "השירות מקבל את זה ולא שולח כלום. אפשר להריץ 200 פעם ואף אחד לא יקבל כלום." },
      },
      {
        from: "l", to: "l", label: "live key pasted on laptop", tone: "err",
        say: { en: "Someone pastes the live key into the laptop's settings file 'to try one real email'. The code doesn't change at all.", he: "מישהו מדביק את המפתח החי לקובץ ההגדרות בלפטופ 'כדי לנסות מייל אמיתי אחד'. הקוד לא משתנה בכלל." },
      },
      {
        from: "l", to: "p", label: "POST /emails × 200 · tests", tone: "err",
        body: ["key: live_9a…"],
        say: { en: "Later the automated tests run, as they do many times a day. Same code, one different key.", he: "אחר כך רצים הטסטים האוטומטיים, כמו כמה פעמים ביום. אותו קוד, מפתח אחד שונה." },
      },
      {
        from: "p", to: "i", label: "deliver × 200", tone: "err",
        say: { en: "200 reminders go out for real, to every address in the test data. Some belong to real people.", he: "200 תזכורות יוצאות באמת, לכל הכתובות שבנתוני הבדיקה. חלק מהן שייכות לאנשים אמיתיים." },
      },
      {
        from: "o", to: "p", label: "POST /emails",
        body: ["key: live_9a…", "(from production's secrets)"],
        say: { en: "The fix is where the key lives: the live key exists only in production's secret settings. Laptops and the repo only have the test key.", he: "התיקון הוא איפה המפתח נמצא: המפתח החי קיים רק בהגדרות הסודיות של הפרודקשן. בלפטופים ובריפו יש רק את מפתח הבדיקות." },
      },
      {
        from: "p", to: "i", label: "deliver · 1 reminder to Dana", tone: "ok",
        say: { en: "In production, Dana gets her one real reminder.", he: "בפרודקשן, דנה מקבלת את התזכורת האמיתית האחת שלה." },
      },
      {
        from: "l", to: "l", label: "search: no live key found", tone: "ok",
        say: { en: "Check it: no live key in the repo or on any laptop. Then turn on every limit the service offers for the live key.", he: "בודקים: אין מפתח חי בריפו או באף לפטופ. ואז מפעילים על המפתח החי כל הגבלה שהשירות מציע." },
      },
    ],
  },

  "polling-vs-push": {
    cap: { en: "Did Dana's reminder arrive? Keep asking, or get told", he: "התזכורת של דנה הגיעה? ממשיכים לשאול, או שמקבלים הודעה" },
    actors: [server, emailApi],
    beats: [
      {
        from: "s", to: "p", label: "GET /emails/em_7c1",
        say: { en: "Polling means asking again and again: every 60 seconds the server asks whether Dana's reminder arrived.", he: "Polling זה לשאול שוב ושוב: כל 60 שניות השרת שואל אם התזכורת של דנה הגיעה." },
      },
      {
        from: "p", to: "s", label: "200 OK · sent", status: 200, body: ["status: sent"],
        say: { en: "Not yet. The answer is 'nothing new', and it still cost a request.", he: "עוד לא. התשובה היא 'אין חדש', וזה עדיין עלה בקשה." },
      },
      {
        from: "s", to: "p", label: "GET /emails/em_7c1 · +60s",
        say: { en: "A minute later, the same question.", he: "דקה אחר כך, אותה שאלה." },
      },
      {
        from: "p", to: "s", label: "200 OK · delivered", status: 200, body: ["status: delivered"],
        say: { en: "Delivered, but 40 seconds ago. On average, polling hears the news half an interval late.", he: "נמסר, אבל לפני 40 שניות. בממוצע, polling שומע על זה באיחור של חצי מרווח." },
      },
      {
        from: "s", to: "s", label: "300 reminders × 1 ask/min", tone: "warn",
        say: { en: "With 300 reminders on the way, that's 300 requests a minute, mostly to hear 'nothing new'.", he: "עם 300 תזכורות בדרך, אלה 300 בקשות בדקה, רובן רק כדי לשמוע 'אין חדש'." },
      },
      {
        from: "p", to: "s", label: "POST /webhooks/email",
        body: ["signed by the email service", "email em_7c1: delivered"],
        say: { en: "Push (a webhook): the email service calls your app's public address the moment it happens. No asking, no delay.", he: "Push (webhook): שירות המיילים פונה לכתובת הציבורית של האפליקציה שלכם ברגע שזה קורה. בלי לשאול, בלי עיכוב." },
      },
      {
        from: "s", to: "s", label: "check signature ✓ · save", tone: "ok",
        say: { en: "Anyone can reach that address, so the server checks the signature before it believes anything.", he: "כל אחד יכול להגיע לכתובת הזאת, אז השרת בודק את החתימה לפני שהוא מאמין למשהו." },
      },
      {
        from: "s", to: "p", label: "200 OK", status: 200,
        say: { en: "For a small app, asking now and then is a fine default. Switch to push when the requests or the delay start to hurt.", he: "לאפליקציה קטנה, לשאול מדי פעם זו ברירת מחדל טובה. עוברים ל-push כשכמות הבקשות או העיכוב מתחילים להפריע." },
      },
    ],
  },
};
