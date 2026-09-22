import type { Scene } from "./types";

const browser = { id: "b", icon: "🧑‍💻", label: { en: "Browser", he: "דפדפן" } };
const server = { id: "s", icon: "🖥️", label: { en: "Server", he: "שרת" } };
const db = { id: "d", icon: "🗄️", label: { en: "Database", he: "מסד נתונים" } };
const cache = { id: "c", icon: "⚡", label: { en: "Cache", he: "קאש" } };
const queue = { id: "q", icon: "📥", label: { en: "Queue", he: "תור" } };
const worker = { id: "w", icon: "⚙️", label: { en: "Worker", he: "וורקר" } };
const emailApi = { id: "p", icon: "✉️", label: { en: "Email API", he: "ה-API של המיילים" } };
const laptop = { id: "l", icon: "💻", label: { en: "Laptop", he: "לפטופ" } };
const prod = { id: "o", icon: "☁️", label: { en: "Production", he: "פרודקשן" } };
const inbox = { id: "i", icon: "📬", label: { en: "Inboxes", he: "תיבות דואר" } };

export const MIDDLE_SCENES: Record<string, Scene> = {
  query: {
    cap: { en: "Same query, same code. Instant at 50 rows, crawling at 50,000", he: "אותה שאילתה, אותו קוד. מיידי ב-50 שורות, זוחל ב-50,000" },
    actors: [browser, server, db],
    beats: [
      {
        from: "b", to: "s", label: "GET /contacts?email=Dana@Acme.io",
        say: { en: "Omer looks Dana up by email. The search ignores capitals, so Dana@Acme.io still finds her.", he: "עומר מחפש את דנה לפי מייל. החיפוש מתעלם מאותיות גדולות, אז גם Dana@Acme.io ימצא אותה." },
      },
      {
        from: "s", to: "d", label: "SELECT … WHERE lower(email) = $1",
        body: ["SELECT id, name FROM contacts", "WHERE lower(email) = 'dana@acme.io'"],
        say: { en: "The query says what it wants, not how to find it. The database picks the strategy.", he: "השאילתה אומרת מה היא רוצה, לא איך למצוא את זה. המסד בוחר את הדרך." },
      },
      {
        from: "d", to: "s", label: "1 row · 9,200 ms", tone: "err",
        say: { en: "The right answer, nine seconds late. Nobody changed the code. The table just grew.", he: "התשובה הנכונה, באיחור של תשע שניות. אף אחד לא שינה את הקוד. הטבלה פשוט גדלה." },
      },
      {
        from: "s", to: "b", label: "504 Gateway Timeout", status: 504,
        say: { en: "The page gives up first. With 100 seed rows this never showed up in testing.", he: "העמוד מוותר קודם. עם 100 שורות seed זה אף פעם לא הופיע בבדיקות." },
      },
      {
        from: "s", to: "d", label: "EXPLAIN ANALYZE SELECT …",
        say: { en: "Instead of guessing, ask the database for its plan.", he: "במקום לנחש, מבקשים מהמסד להראות את התוכנית שלו." },
      },
      {
        from: "d", to: "s", label: "Seq Scan on contacts", tone: "err",
        body: ["Seq Scan on contacts", "  Filter: lower(email) = 'dana@acme.io'", "  Rows Removed by Filter: 49999"],
        say: { en: "Seq Scan: it read all 50,000 rows. An index on email cannot answer a question about lower(email).", he: "Seq Scan: הוא קרא את כל 50,000 השורות. אינדקס על email לא יכול לענות על שאלה על lower(email)." },
      },
      {
        from: "s", to: "d", label: "CREATE INDEX ON contacts (lower(email))",
        say: { en: "Add an index on exactly what the query filters by.", he: "מוסיפים אינדקס בדיוק על מה שהשאילתה מסננת לפיו." },
      },
      {
        from: "d", to: "s", label: "Index Scan · 1 row · 4 ms", tone: "ok",
        say: { en: "Same query, same answer, 4 ms. The query never changed. The database switched strategy by itself.", he: "אותה שאילתה, אותה תשובה, 4ms. השאילתה לא השתנתה. המסד החליף דרך בעצמו." },
      },
      {
        from: "s", to: "b", label: "200 OK", status: 200,
        say: { en: "The habit: for every page users wait on, read the plan once, with a realistic amount of data.", he: "ההרגל: לכל עמוד שמשתמשים מחכים לו, קוראים את התוכנית פעם אחת, עם כמות נתונים אמיתית." },
      },
    ],
  },

  index: {
    cap: { en: "Noa's leads, newest first. One index turns a full read and a sort into a jump", he: "הלידים של נועה, מהחדש לישן. אינדקס אחד הופך קריאה מלאה ומיון לקפיצה" },
    actors: [browser, server, db],
    beats: [
      {
        from: "b", to: "s", label: "GET /contacts?stage=lead",
        say: { en: "Noa opens her leads, newest first. The table holds 100,000 contacts.", he: "נועה פותחת את הלידים שלה, מהחדש לישן. בטבלה יש 100,000 אנשי קשר." },
      },
      {
        from: "s", to: "d", label: "SELECT … WHERE stage = 'lead'",
        body: ["WHERE stage = 'lead'", "ORDER BY created_at DESC", "LIMIT 50"],
        say: { en: "The query filters by one column and sorts by another.", he: "השאילתה מסננת לפי עמודה אחת וממיינת לפי עמודה אחרת." },
      },
      {
        from: "d", to: "d", label: "Seq Scan + Sort · 100,000 rows", tone: "err",
        say: { en: "No index, so the database reads every row, keeps the leads, then sorts them. A book with no index at the back.", he: "אין אינדקס, אז המסד קורא כל שורה, משאיר את הלידים ואז ממיין אותם. כמו ספר בלי אינדקס בסוף." },
      },
      {
        from: "d", to: "s", label: "50 rows · 340 ms", tone: "warn",
        say: { en: "340 ms on every visit, and it grows with the table.", he: "340ms בכל כניסה, וזה גדל יחד עם הטבלה." },
      },
      {
        from: "s", to: "d", label: "CREATE INDEX (stage, created_at DESC)",
        body: ["ON contacts (stage, created_at DESC)"],
        say: { en: "A composite index: filter column first, sort column second. A pre-sorted list of exactly what the query asks.", he: "אינדקס משולב: קודם עמודת הסינון, אחר כך עמודת המיון. רשימה ממוינת מראש של בדיוק מה שהשאילתה מבקשת." },
      },
      {
        from: "d", to: "s", label: "Index Scan · 50 rows · 2 ms", tone: "ok",
        say: { en: "The database jumps to 'lead' and reads the first 50 in order. Nothing is left to sort.", he: "המסד קופץ ל-'lead' וקורא את 50 הראשונים לפי הסדר. לא נשאר מה למיין." },
      },
      {
        from: "s", to: "d", label: "INSERT INTO contacts … × 5,000",
        say: { en: "The price comes on writes. Noa imports 5,000 contacts from a CSV.", he: "המחיר מגיע בכתיבה. נועה מייבאת 5,000 אנשי קשר מקובץ CSV." },
      },
      {
        from: "d", to: "d", label: "each row: 1 table + 3 index writes", tone: "warn",
        say: { en: "Every index is updated on every insert. Index what real queries filter and sort by, not every column.", he: "כל אינדקס מתעדכן בכל הכנסה. שמים אינדקס על מה ששאילתות אמיתיות מסננות וממיינות לפיו, לא על כל עמודה." },
      },
    ],
  },

  transaction: {
    cap: { en: "Merging two copies of Dana takes two writes. A crash must never leave half", he: "מיזוג שני עותקים של דנה דורש שתי כתיבות. קריסה אסור שתשאיר חצי" },
    actors: [browser, server, db],
    beats: [
      {
        from: "s", to: "d", label: "UPDATE notes SET contact_id = 12",
        body: ["WHERE contact_id = 7", "-- 3 notes moved"],
        say: { en: "Omer merges two copies of Dana. Step one: move the notes from copy 7 to copy 12.", he: "עומר ממזג שני עותקים של דנה. שלב ראשון: מעבירים את ההערות מעותק 7 לעותק 12." },
      },
      {
        from: "s", to: "s", label: "💥 deploy restarts the server", tone: "err",
        say: { en: "A deploy restarts the server before step two: delete copy 7. This happens for real, on a schedule you do not control.", he: "דיפלוי מפעיל מחדש את השרת לפני שלב שני, מחיקת עותק 7. זה קורה באמת, בזמנים שאתם לא שולטים בהם." },
      },
      {
        from: "b", to: "s", label: "GET /contacts?q=dana",
        say: { en: "Omer reloads the list.", he: "עומר מרענן את הרשימה." },
      },
      {
        from: "s", to: "b", label: "200 OK · 2 × Dana", status: 200, tone: "warn",
        body: ['{ "id": 7,  "notes": 0 }', '{ "id": 12, "notes": 3 }'],
        say: { en: "Half a merge: Dana appears twice, and one copy is empty. Nothing will ever finish step two.", he: "חצי מיזוג: דנה מופיעה פעמיים, ואחד העותקים ריק. שום דבר לא ישלים את שלב שני." },
      },
      {
        from: "s", to: "d", label: "BEGIN",
        body: ["BEGIN;", "UPDATE notes SET contact_id = 12 …;", "DELETE FROM contacts WHERE id = 7;"],
        say: { en: "Version two wraps both writes in a transaction.", he: "בגרסה השנייה עוטפים את שתי הכתיבות בטרנזקציה." },
      },
      {
        from: "s", to: "s", label: "💥 crash before COMMIT", tone: "err",
        say: { en: "Same crash, same moment.", he: "אותה קריסה, באותו רגע." },
      },
      {
        from: "d", to: "d", label: "ROLLBACK · nothing changed", tone: "info",
        say: { en: "The connection dropped, so the database undoes everything since BEGIN. No one ever saw the notes move.", he: "החיבור נפל, אז המסד מבטל את כל מה שקרה מאז BEGIN. אף אחד לא ראה את ההערות זזות." },
      },
      {
        from: "s", to: "d", label: "BEGIN … COMMIT", tone: "ok",
        body: ["3 notes moved + contact 7 deleted", "visible at the same instant"],
        say: { en: "Retried: both writes appear together or not at all. Keep it short: database work only, no calls to outside services.", he: "בניסיון החוזר שתי הכתיבות מופיעות יחד, או שאף אחת. שומרים את זה קצר: רק עבודה מול המסד, בלי קריאות לשירותים חיצוניים." },
      },
      {
        from: "s", to: "b", label: "200 OK · 1 Dana, 3 notes", status: 200,
        say: { en: "One Dana, three notes. Ask of every function: which writes here must never happen separately?", he: "דנה אחת, שלוש הערות. שאלו על כל פונקציה: אילו כתיבות כאן אסור שיקרו בנפרד?" },
      },
    ],
  },

  migration: {
    cap: { en: "A column added by hand exists on one laptop. A migration file puts it everywhere", he: "עמודה שנוספה ידנית קיימת בלפטופ אחד. קובץ מיגרציה שם אותה בכל מקום" },
    actors: [
      laptop,
      { id: "r", icon: "📁", label: { en: "Repo", he: "ריפו" } },
      prod,
      { id: "d", icon: "🗄️", label: { en: "Prod database", he: "מסד הפרודקשן" } },
    ],
    beats: [
      {
        from: "l", to: "l", label: "ALTER TABLE contacts ADD follow_up_at", tone: "warn",
        say: { en: "Omer adds a follow_up_at column by hand in his local database. Reminders work on his laptop.", he: "עומר מוסיף ידנית עמודת follow_up_at במסד המקומי שלו. התזכורות עובדות בלפטופ שלו." },
      },
      {
        from: "l", to: "r", label: "git push · code only",
        say: { en: "He pushes the code that reads the new column. The schema change stays behind on his machine.", he: "הוא עושה push לקוד שקורא את העמודה החדשה. השינוי בסכמה נשאר מאחור, אצלו במחשב." },
      },
      {
        from: "r", to: "o", label: "deploy main",
        say: { en: "Vercel deploys main to production.", he: "Vercel עושה דיפלוי של main לפרודקשן." },
      },
      {
        from: "o", to: "d", label: "SELECT … follow_up_at FROM contacts",
        say: { en: "Production asks for the new column.", he: "הפרודקשן מבקש את העמודה החדשה." },
      },
      {
        from: "d", to: "o", label: 'column "follow_up_at" does not exist', tone: "err",
        say: { en: "Production never got the change. Every contacts page is now a 500.", he: "הפרודקשן אף פעם לא קיבל את השינוי. כל עמוד של אנשי קשר מחזיר עכשיו 500." },
      },
      {
        from: "l", to: "r", label: "drizzle/0008_follow_up_at.sql",
        body: ["ALTER TABLE contacts", "  ADD COLUMN follow_up_at timestamptz;"],
        say: { en: "The fix: the change becomes a new numbered file in the repo, reviewed like code.", he: "התיקון: השינוי הופך לקובץ חדש וממוספר בריפו, שעובר review כמו קוד." },
      },
      {
        from: "r", to: "d", label: "drizzle-kit migrate",
        body: ["0001–0007  already applied · skip", "0008       apply ✓"],
        say: { en: "On deploy, migrations run in order. The database records which ones ran, so each runs exactly once.", he: "בדיפלוי, המיגרציות רצות לפי הסדר. המסד רושם אילו כבר רצו, כך שכל אחת רצה פעם אחת בדיוק." },
      },
      {
        from: "d", to: "o", label: "20 rows · follow_up_at", tone: "ok",
        say: { en: "Laptop, staging and production now share one schema. The next change is 0009, never an edit to 0008.", he: "הלפטופ, הסטייג'ינג והפרודקשן חולקים עכשיו אותה סכמה. השינוי הבא הוא 0009, אף פעם לא עריכה של 0008." },
      },
    ],
  },

  "background-job": {
    cap: { en: "Noa imports 5,000 contacts. A deploy mid-import should delay the work, not lose it", he: "נועה מייבאת 5,000 אנשי קשר. דיפלוי באמצע צריך לעכב את העבודה, לא לאבד אותה" },
    actors: [browser, server, queue, worker],
    beats: [
      {
        from: "b", to: "s", label: "POST /imports", body: ["contacts.csv · 5,000 rows"],
        say: { en: "Noa uploads a CSV of 5,000 contacts. Importing it takes about a minute.", he: "נועה מעלה CSV עם 5,000 אנשי קשר. הייבוא לוקח בערך דקה." },
      },
      {
        from: "s", to: "s", label: "importCsv(file)  // not awaited", tone: "warn",
        say: { en: "Version one starts the import in the same process, without awaiting it, and answers at once. Fine on a laptop.", he: "גרסה ראשונה מתחילה את הייבוא באותו תהליך, בלי await, ועונה מיד. בלפטופ זה עובד." },
      },
      {
        from: "s", to: "s", label: "💥 deploy restarts server · row 1,840", tone: "err",
        say: { en: "A deploy restarts the server mid-import. The work lived only in memory, so it is gone. No error, no log.", he: "דיפלוי מפעיל מחדש את השרת באמצע הייבוא. העבודה חיה רק בזיכרון, אז היא נעלמה. בלי שגיאה, בלי לוג." },
      },
      {
        from: "s", to: "q", label: "enqueue import_csv #31", body: ['{ "fileId": "f_91", "ownerId": 7 }'],
        say: { en: "Version two writes the job down first: what to do, plus ids. Not the data itself, so the worker reads it fresh.", he: "גרסה שנייה רושמת קודם את העבודה: מה לעשות, ועוד מזהים. לא את הנתונים עצמם, כדי שהוורקר יקרא אותם עדכניים." },
      },
      {
        from: "s", to: "b", label: "202 Accepted", status: 202, body: ['{ "importId": "imp_31" }'],
        say: { en: "202: accepted, not done yet. Noa can keep working.", he: "202: התקבל, עוד לא בוצע. נועה יכולה להמשיך לעבוד." },
      },
      {
        from: "q", to: "w", label: "job #31 → worker (locked)",
        say: { en: "A separate worker process takes the job. The queue locks it instead of deleting it, until the worker says done.", he: "תהליך וורקר נפרד לוקח את העבודה. התור נועל אותה במקום למחוק, עד שהוורקר מדווח שסיים." },
      },
      {
        from: "w", to: "w", label: "💥 worker restarts · row 1,840", tone: "err",
        say: { en: "Another deploy kills the worker mid-job. This time the job still exists as a record.", he: "דיפלוי נוסף הורג את הוורקר באמצע העבודה. הפעם העבודה עדיין קיימת כרשומה." },
      },
      {
        from: "q", to: "w", label: "lock expired → job #31 again", tone: "warn",
        say: { en: "The lock runs out and the job is handed out again. So the handler must be safe to run twice: upsert by email.", he: "הנעילה פגה והעבודה נמסרת שוב. לכן ה-handler חייב להיות בטוח להרצה כפולה: upsert לפי מייל." },
      },
      {
        from: "w", to: "q", label: "job #31 done · 5,000 rows", tone: "ok",
        say: { en: "Done, and recorded. The restart delayed the import by a minute. It did not lose it.", he: "סיים, ונרשם. הריסטארט עיכב את הייבוא בדקה. הוא לא איבד אותו." },
      },
    ],
  },

  "event-and-pub-sub": {
    cap: { en: "Dana's deal is won. The API announces it once, and whoever cares reacts", he: "העסקה של דנה נסגרה. ה-API מכריז על זה פעם אחת, ומי שאכפת לו מגיב" },
    actors: [
      { id: "s", icon: "🖥️", label: { en: "Contacts API", he: "API אנשי קשר" } },
      { id: "u", icon: "📣", label: { en: "Event bus", he: "אפיק אירועים" } },
      { id: "r", icon: "⏰", label: { en: "Reminders", he: "תזכורות" } },
      { id: "a", icon: "📊", label: { en: "Analytics", he: "אנליטיקס" } },
    ],
    beats: [
      {
        from: "s", to: "s", label: "UPDATE contacts SET stage = 'won'",
        say: { en: "Omer marks Dana's deal as won. Other parts of the app should react, and the API should not have to know them all.", he: "עומר מסמן את העסקה של דנה כ-won. חלקים אחרים באפליקציה צריכים להגיב, וה-API לא אמור להכיר את כולם." },
      },
      {
        from: "s", to: "u", label: "publish DealWon",
        body: ['{ "eventId": "evt_88",', '  "contactId": 42 }'],
        say: { en: "Instead of calling each one, it announces one past-tense fact, with ids only, and is done.", he: "במקום לקרוא לכל אחד, הוא מכריז על עובדה אחת בזמן עבר, רק עם מזהים, וסיים." },
      },
      {
        from: "u", to: "r", label: "DealWon evt_88",
        say: { en: "The bus hands it to every subscriber. Reminders cancels Dana's pending follow-ups. The API never heard of it.", he: "האפיק מוסר אותה לכל מי שנרשם. התזכורות מבטלות את ה-follow-ups שנשארו לדנה. ה-API בכלל לא מכיר אותן." },
      },
      {
        from: "u", to: "a", label: "DealWon evt_88",
        say: { en: "Analytics gets its own copy and counts a win. Each subscriber lives, and fails, on its own.", he: "האנליטיקס מקבל עותק משלו וסופר זכייה. כל מנוי חי, ונכשל, בנפרד." },
      },
      {
        from: "a", to: "a", label: "💥 crash before ack", tone: "err",
        say: { en: "Analytics counts the win, then crashes before telling the bus 'got it'.", he: "האנליטיקס סופר את הזכייה, ואז קורס לפני שהוא אומר לאפיק 'קיבלתי'." },
      },
      {
        from: "u", to: "a", label: "DealWon evt_88 · redelivery", tone: "warn",
        say: { en: "So the bus delivers it again. Brokers promise at-least-once delivery, never exactly-once.", he: "אז האפיק מוסר אותה שוב. ברוקרים מבטיחים מסירה לפחות פעם אחת, אף פעם לא בדיוק פעם אחת." },
      },
      {
        from: "a", to: "a", label: "evt_88 already processed → skip", tone: "ok",
        say: { en: "A unique key on eventId turns the second copy into a no-op. One win counted, not two.", he: "מפתח ייחודי על eventId הופך את העותק השני לפעולה ריקה. זכייה אחת נספרת, לא שתיים." },
      },
      {
        from: "u", to: "u", label: "subscribers: reminders, analytics", tone: "info",
        say: { en: "Ask for this list. A new reaction, like a Slack alert, is one more subscriber. The contacts API never changes.", he: "בקשו את הרשימה הזאת. תגובה חדשה, כמו התראה ב-Slack, היא עוד מנוי. ה-API של אנשי הקשר לא משתנה." },
      },
    ],
  },

  "retry-and-backoff": {
    cap: { en: "The email provider wobbles for 40 seconds. How you retry decides if anyone notices", he: "ספק המיילים מתנדנד ל-40 שניות. הדרך שבה מנסים שוב קובעת אם מישהו ישים לב" },
    actors: [worker, emailApi],
    beats: [
      {
        from: "w", to: "p", label: "POST /emails · reminder #512",
        say: { en: "The worker sends Dana's follow-up reminder. The provider is in the middle of a 40-second wobble.", he: "הוורקר שולח לדנה את התזכורת. הספק נמצא באמצע תקלה של 40 שניות." },
      },
      {
        from: "p", to: "w", label: "503 Service Unavailable", status: 503,
        say: { en: "503 is a temporary failure. Worth retrying, but how you retry matters.", he: "503 זו תקלה זמנית. שווה לנסות שוב, אבל חשוב איך." },
      },
      {
        from: "w", to: "p", label: "retry ×3 now · 2,000 jobs", tone: "err",
        say: { en: "Version one retries instantly. 2,000 jobs failing together become 8,000 requests at a provider already struggling.", he: "גרסה ראשונה מנסה שוב מיד. 2,000 עבודות שנכשלו יחד הופכות ל-8,000 בקשות לספק שכבר מתקשה." },
      },
      {
        from: "p", to: "w", label: "429 Too Many Requests", status: 429, body: ["Retry-After: 900"],
        say: { en: "The provider protects itself and blocks you for 15 minutes. The 40-second blip is now your own outage.", he: "הספק מגן על עצמו וחוסם אתכם ל-15 דקות. תקלה של 40 שניות הפכה להשבתה שיצרתם בעצמכם." },
      },
      {
        from: "w", to: "w", label: "wait 1s → 2s → 4s, + jitter", tone: "info",
        say: { en: "Version two waits before each retry, doubles the wait, and adds randomness so 2,000 jobs don't retry in sync.", he: "גרסה שנייה מחכה לפני כל ניסיון, מכפילה את ההמתנה ומוסיפה אקראיות, כדי ש-2,000 עבודות לא ינסו שוב יחד." },
      },
      {
        from: "w", to: "p", label: "POST /emails · try 3", body: ["Idempotency-Key: reminder-512"],
        say: { en: "Every try carries the same idempotency key, so a retry can never send Dana two emails.", he: "כל ניסיון נושא את אותו idempotency key, כך שניסיון חוזר לעולם לא ישלח לדנה שני מיילים." },
      },
      {
        from: "p", to: "w", label: "200 OK", status: 200,
        say: { en: "The blip is over and the third try goes through. Nobody noticed a thing.", he: "התקלה עברה והניסיון השלישי עובר. אף אחד לא שם לב לכלום." },
      },
      {
        from: "w", to: "p", label: "POST /emails · reminder #513", body: ['{ "to": "dana@@acme" }'],
        say: { en: "Next job: an address mangled by the CSV import.", he: "העבודה הבאה: כתובת שנהרסה בייבוא ה-CSV." },
      },
      {
        from: "p", to: "w", label: "422 Unprocessable Entity", status: 422,
        say: { en: "A 422 fails the same way forever. Retry only 5xx, 429 and timeouts, cap the attempts, and obey Retry-After.", he: "422 ייכשל באותה דרך לנצח. מנסים שוב רק על 5xx, 429 וטיים-אאוט, מגבילים ניסיונות ומכבדים Retry-After." },
      },
    ],
  },

  "dead-letter-queue": {
    cap: { en: "One job fails every retry. It is set aside, not lost and not looping", he: "עבודה אחת נכשלת בכל הניסיונות. היא מועברת הצידה, לא הולכת לאיבוד ולא נתקעת בלופ" },
    actors: [
      queue,
      worker,
      { id: "x", icon: "🗃️", label: { en: "Dead-letter queue", he: "DLQ" } },
      { id: "y", icon: "👩‍💻", label: { en: "You", he: "אתם" } },
    ],
    beats: [
      {
        from: "q", to: "w", label: "job #77 send_reminder", body: ['{ "contactId": 318 }'],
        say: { en: "A reminder job for contact 318, imported from a CSV last week.", he: "עבודת תזכורת לאיש קשר 318, שיובא מקובץ CSV בשבוע שעבר." },
      },
      {
        from: "w", to: "w", label: "TypeError · try 1/5", tone: "err",
        body: ["TypeError: Cannot read properties", "of null (reading 'split')"],
        say: { en: "The template takes the first name out of the full name. This contact has no name, so it throws.", he: "התבנית לוקחת את השם הפרטי מתוך השם המלא. לאיש הקשר הזה אין שם, אז נזרקת שגיאה." },
      },
      {
        from: "w", to: "q", label: "retry in 2s, 4s, 8s, 16s", tone: "warn",
        say: { en: "Retries with backoff. They cannot help: the same input fails the same way every time.", he: "ניסיונות חוזרים עם backoff. הם לא יכולים לעזור: אותו קלט נכשל באותה דרך בכל פעם." },
      },
      {
        from: "w", to: "x", label: "job #77 → DLQ after 5 tries",
        body: ['{ "contactId": 318,', `  "error": "TypeError: …'split'",`, '  "attempts": 5,', '  "at": "2026-09-21T09:14Z" }'],
        say: { en: "Out of retries. The job is not dropped and does not loop. It is set aside with its input, error, attempts and time.", he: "הניסיונות נגמרו. העבודה לא נזרקת ולא מסתובבת בלופ. היא מועברת הצידה עם הקלט, השגיאה, מספר הניסיונות והזמן." },
      },
      {
        from: "x", to: "y", label: "🔔 DLQ not empty · 14 jobs", tone: "warn",
        say: { en: "An alert fires because the DLQ is not empty. 14 jobs, one error, one missing field: a list you can count.", he: "התראה קופצת כי ה-DLQ לא ריק. 14 עבודות, אותה שגיאה, אותו שדה חסר: רשימה שאפשר לספור." },
      },
      {
        from: "y", to: "y", label: "fix: no name → 'Hi there'", tone: "ok",
        say: { en: "Read why they failed, then a one-line fix: a contact with no name gets 'Hi there'.", he: "קוראים למה הן נכשלו, ואז תיקון בשורה אחת: איש קשר בלי שם מקבל 'Hi there'." },
      },
      {
        from: "x", to: "q", label: "replay 14 jobs",
        say: { en: "Replay them. Safe here, since none of these reminders was sent. Jobs that charge cards would need a check first.", he: "מריצים אותן מחדש. כאן זה בטוח, כי אף תזכורת לא נשלחה. עבודות שמחייבות כרטיס היו דורשות בדיקה קודם." },
      },
      {
        from: "q", to: "w", label: "job #77 → sent ✓", tone: "ok",
        say: { en: "Contact 318 gets its reminder. Nothing was lost in silence, and nothing was sent twice.", he: "איש קשר 318 מקבל את התזכורת. שום דבר לא אבד בשקט, ושום דבר לא נשלח פעמיים." },
      },
    ],
  },

  "real-time-websocket-sse": {
    cap: { en: "Noa watches her import live. With two servers, 'done' must find the one holding her line", he: "נועה עוקבת אחרי הייבוא בזמן אמת. עם שני שרתים, 'done' צריך למצוא את זה שמחזיק את הקו שלה" },
    actors: [
      browser,
      { id: "a", icon: "🖥️", label: { en: "Server A", he: "שרת A" } },
      { id: "x", icon: "🖥️", label: { en: "Server B", he: "שרת B" } },
      { id: "r", icon: "📡", label: { en: "Redis", he: "Redis" } },
    ],
    beats: [
      {
        from: "b", to: "a", label: "GET /imports/31/events", body: ["Accept: text/event-stream"],
        say: { en: "Noa's page opens one SSE connection to follow her import. It stays open. Nobody hangs up.", he: "העמוד של נועה פותח חיבור SSE אחד כדי לעקוב אחרי הייבוא. החיבור נשאר פתוח. אף אחד לא מנתק." },
      },
      {
        from: "a", to: "b", label: "event: progress · 40%", tone: "ok",
        body: ["event: progress", 'data: { "pct": 40 }'],
        say: { en: "Server A pushes progress down the open line whenever it has news. No refresh, no asking again.", he: "שרת A דוחף התקדמות על הקו הפתוח בכל פעם שיש חדש. בלי רענון, בלי לשאול שוב." },
      },
      {
        from: "x", to: "x", label: "import #31 done", tone: "ok",
        say: { en: "The import finishes on Server B. There are two instances behind the load balancer.", he: "הייבוא מסתיים בשרת B. מאחורי ה-load balancer יש שני מופעים." },
      },
      {
        from: "x", to: "x", label: "open lines here for Noa: 0", tone: "err",
        say: { en: "B wants to tell Noa, but A holds her line. The message goes nowhere, and her page shows 40% forever.", he: "B רוצה לעדכן את נועה, אבל הקו שלה אצל A. ההודעה לא מגיעה לשום מקום, והעמוד שלה תקוע על 40%." },
      },
      {
        from: "x", to: "r", label: "PUBLISH imports:31 done",
        say: { en: "The fix: B publishes to Redis, a shared broker that every instance listens to.", he: "התיקון: B מפרסם ל-Redis, ברוקר משותף שכל המופעים מאזינים לו." },
      },
      {
        from: "r", to: "a", label: "message imports:31 done",
        say: { en: "A is subscribed, so it gets the message. Whichever instance holds the line can deliver it.", he: "A רשום לערוץ, אז הוא מקבל את ההודעה. מי שמחזיק את הקו יכול למסור אותה." },
      },
      {
        from: "a", to: "b", label: "event: done · 5,000 imported", tone: "ok",
        say: { en: "Noa sees it the moment it happens.", he: "נועה רואה את זה ברגע שזה קורה." },
      },
      {
        from: "a", to: "b", label: ": ping  (every 25s)", tone: "info",
        say: { en: "A heartbeat keeps proxies from closing a quiet line. SSE is one-way; chat, where both sides talk, needs a WebSocket.", he: "heartbeat מונע מפרוקסי לסגור קו שקט. SSE הוא חד-כיווני; צ'אט, ששני הצדדים מדברים בו, צריך WebSocket." },
      },
    ],
  },

  "hit-miss": {
    cap: { en: "Omer's dashboard asks the cache first. A bad key means it never hits", he: "הדשבורד של עומר שואל קודם את הקאש. מפתח גרוע אומר שאף פעם אין hit" },
    actors: [server, cache, db],
    beats: [
      {
        from: "s", to: "c", label: "GET counts:owner7:1727001234",
        say: { en: "The dashboard asks the cache for Omer's counts per stage. Someone put the current time in the key 'for freshness'.", he: "הדשבורד מבקש מהקאש את הספירות של עומר לפי שלב. מישהו הכניס את השעה הנוכחית למפתח 'בשביל טריות'." },
      },
      {
        from: "c", to: "s", label: "MISS", tone: "warn",
        say: { en: "Nothing is stored under that exact key. A miss.", he: "תחת המפתח המדויק הזה לא שמור כלום. Miss." },
      },
      {
        from: "s", to: "d", label: "SELECT stage, count(*) … GROUP BY stage",
        say: { en: "So it pays full price: the database counts every contact.", he: "אז משלמים מחיר מלא: המסד סופר כל איש קשר." },
      },
      {
        from: "d", to: "s", label: "4 rows · 180 ms", body: ["lead 12 · qualified 5 · won 3 · lost 2"],
        say: { en: "180 ms later, the answer.", he: "אחרי 180ms, התשובה." },
      },
      {
        from: "s", to: "c", label: "SET counts:owner7:1727001234", tone: "warn",
        say: { en: "Stored under a key no one will ask for again, because the next request has a new timestamp. Hit rate: 4%.", he: "נשמר תחת מפתח שאף אחד לא יבקש שוב, כי לבקשה הבאה יש חותמת זמן חדשה. שיעור ה-hit: 4%." },
      },
      {
        from: "s", to: "c", label: "GET counts:owner7",
        say: { en: "The fix: the key holds only what changes the answer, whose counts. Freshness comes from a 60-second TTL.", he: "התיקון: במפתח יש רק מה שמשנה את התשובה, של מי הספירות. הטריות מגיעה מ-TTL של 60 שניות." },
      },
      {
        from: "c", to: "s", label: "HIT · 0.3 ms", tone: "ok", body: ["lead 12 · qualified 5 · won 3 · lost 2"],
        say: { en: "A hit: the copy was there and the database was never asked. 0.3 ms instead of 180.", he: "Hit: העותק היה שם והמסד לא נשאל בכלל. 0.3ms במקום 180." },
      },
      {
        from: "s", to: "s", label: "hit rate 4% → 91%", tone: "ok",
        say: { en: "Measure it: broken and working caches look the same in code. And keep the owner in the key, or Omer sees Noa's numbers.", he: "מודדים: קאש שבור וקאש שעובד נראים אותו דבר בקוד. והבעלים נשאר במפתח, אחרת עומר יראה את המספרים של נועה." },
      },
    ],
  },

  invalidation: {
    cap: { en: "Noa renames Dana. Every cached copy built from that row has to go", he: "נועה משנה את השם של דנה. כל עותק בקאש שנבנה מהשורה הזאת צריך להיזרק" },
    actors: [browser, server, cache, db],
    beats: [
      {
        from: "b", to: "s", label: "PATCH /contacts/42", body: ['{ "name": "Dana Levi" }'],
        say: { en: "Noa fixes Dana's last name.", he: "נועה מתקנת את שם המשפחה של דנה." },
      },
      {
        from: "s", to: "d", label: "UPDATE contacts SET name = …",
        say: { en: "The database now has the new name.", he: "במסד כבר יש את השם החדש." },
      },
      {
        from: "s", to: "c", label: "revalidateTag('contact:42')",
        say: { en: "The server throws away the cached copy of contact 42, so the next read rebuilds it. That is invalidation.", he: "השרת זורק מהקאש את העותק של איש קשר 42, כדי שהקריאה הבאה תבנה אותו מחדש. זה ביטול תוקף." },
      },
      {
        from: "s", to: "c", label: "get leads list · owner 7",
        say: { en: "Then Noa opens her leads list.", he: "אחר כך נועה פותחת את רשימת הלידים." },
      },
      {
        from: "c", to: "s", label: "HIT · Dana Cohen (stale)", tone: "warn",
        say: { en: "The list was cached too, from the same row. Nobody threw it away, so it shows the old name until its TTL runs out.", he: "גם הרשימה נשמרה בקאש, מאותה שורה. אף אחד לא זרק אותה, אז היא מציגה את השם הישן עד שה-TTL שלה ייגמר." },
      },
      {
        from: "s", to: "s", label: "what else was built from contact 42?", tone: "info",
        say: { en: "The real question at every write: which cached things came from this data? Here: the contact, the list, the counts.", he: "השאלה האמיתית בכל כתיבה: מה בקאש נבנה מהנתונים האלה? כאן: איש הקשר, רשימת הלידים והספירות בדשבורד." },
      },
      {
        from: "s", to: "c", label: "revalidateTag('contacts:owner7')",
        body: ["drops: contact:42, leads list,", "       stage counts"],
        say: { en: "The fix: tag everything built from Noa's contacts with one tag, and drop that tag on every contact write.", he: "התיקון: מסמנים בתג אחד כל מה שנבנה מאנשי הקשר של נועה, וזורקים את התג הזה בכל כתיבה לאנשי קשר." },
      },
      {
        from: "s", to: "b", label: "200 OK · Dana Levi", status: 200,
        say: { en: "The next read misses, rebuilds from the database and shows the new name everywhere. A short TTL catches anything missed.", he: "הקריאה הבאה מקבלת miss, נבנית מחדש מהמסד ומציגה את השם החדש בכל מקום. TTL קצר תופס את מה שפוספס." },
      },
    ],
  },

  "browser-cache": {
    cap: { en: "You deployed the fix. Dana's browser is still running yesterday's script", he: "עשיתם דיפלוי לתיקון. הדפדפן של דנה עדיין מריץ את הסקריפט של אתמול" },
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
        body: ["Cache-Control: max-age=3600", '<script src="/app.js">'],
        say: { en: "The page may be kept for an hour, and it points at /app.js. The browser stores both on disk.", he: "מותר לשמור את העמוד שעה, והוא מפנה ל-/app.js. הדפדפן שומר את שניהם בדיסק." },
      },
      {
        from: "s", to: "s", label: "deploy · fix in /app.js", tone: "ok",
        say: { en: "You fix a bug in app.js and deploy. After a hard refresh, it looks fine on your machine.", he: "אתם מתקנים באג ב-app.js ועושים דיפלוי. אצלכם, אחרי hard refresh, הכול נראה תקין." },
      },
      {
        from: "b", to: "k", label: "GET /contacts · from disk cache", tone: "warn",
        say: { en: "Dana comes back 20 minutes later. By its header the page is still fresh, so the browser never asks the server.", he: "דנה חוזרת אחרי 20 דקות. לפי ה-header העמוד עדיין טרי, אז הדפדפן בכלל לא שואל את השרת." },
      },
      {
        from: "k", to: "b", label: "old page → old /app.js → old bug", tone: "err",
        say: { en: "The old page loads the old script, with the old bug. There is no purge button for Dana's laptop.", he: "העמוד הישן טוען את הסקריפט הישן, עם הבאג הישן. אין כפתור ניקוי ללפטופ של דנה." },
      },
      {
        from: "b", to: "s", label: "GET /contacts", body: ['If-None-Match: "v41"'],
        say: { en: "The fix: send the page as no-cache. The browser may keep it, but must ask first. A cheap question.", he: "התיקון: שולחים את העמוד עם no-cache. הדפדפן רשאי לשמור אותו, אבל חייב לשאול קודם. שאלה זולה." },
      },
      {
        from: "s", to: "b", label: "200 OK · new page", status: 200,
        body: ["Cache-Control: no-cache", '<script src="/app.9f3c2a1.js">'],
        say: { en: "The page changed, so it comes back new, pointing at a new filename. New content always means a new URL.", he: "העמוד השתנה, אז הוא חוזר חדש ומפנה לשם קובץ חדש. תוכן חדש תמיד אומר כתובת חדשה." },
      },
      {
        from: "b", to: "s", label: "GET /app.9f3c2a1.js",
        say: { en: "The browser has never seen that name, so it downloads the fixed script.", he: "הדפדפן אף פעם לא ראה את השם הזה, אז הוא מוריד את הסקריפט המתוקן." },
      },
      {
        from: "s", to: "b", label: "200 OK", status: 200,
        body: ["Cache-Control: max-age=31536000,", "  immutable"],
        say: { en: "Kept for a year, because that name will never mean anything else. Next visit: 304 for the page, the script from disk.", he: "נשמר לשנה, כי השם הזה לעולם לא יתייחס לקובץ אחר. בביקור הבא: 304 לעמוד, והסקריפט מהדיסק." },
      },
    ],
  },

  cdn: {
    cap: { en: "Visitors in Tel Aviv, a server in Virginia. The CDN answers from around the corner", he: "גולשים בתל אביב, שרת בווירג'יניה. ה-CDN עונה מהפינה" },
    actors: [
      { id: "b", icon: "🧑‍💻", label: { en: "Visitors", he: "גולשים" } },
      { id: "e", icon: "🌍", label: { en: "CDN · Tel Aviv", he: "CDN בתל אביב" } },
      { id: "o", icon: "🏛️", label: { en: "Origin · US", he: "שרת מקור בארה\"ב" } },
    ],
    beats: [
      {
        from: "b", to: "e", label: "GET /_next/static/app.9f3c.js",
        say: { en: "Dana in Tel Aviv asks for the app's script. She reaches a CDN server nearby, not your server in Virginia.", he: "דנה בתל אביב מבקשת את הסקריפט של האפליקציה. היא מגיעה לשרת CDN קרוב, לא לשרת שלכם בווירג'יניה." },
      },
      {
        from: "e", to: "o", label: "MISS → fetch from origin", tone: "warn",
        say: { en: "This edge has no copy yet. A miss, so it asks the origin, about 180 ms away.", he: "לשרת הזה עוד אין עותק. Miss, אז הוא שואל את שרת המקור, שנמצא במרחק של כ-180ms." },
      },
      {
        from: "o", to: "e", label: "200 OK", status: 200,
        body: ["Cache-Control: public,", "  max-age=31536000, immutable"],
        say: { en: "The file is the same for everyone, and its header says so. The edge keeps a copy.", he: "הקובץ זהה לכולם, וה-header שלו אומר את זה. שרת ה-CDN שומר עותק." },
      },
      {
        from: "e", to: "b", label: "200 OK · 190 ms", status: 200,
        say: { en: "Dana waits for the full trip, once.", he: "דנה מחכה לכל הדרך, פעם אחת." },
      },
      {
        from: "b", to: "e", label: "GET /_next/static/app.9f3c.js",
        say: { en: "Noa, also in Tel Aviv, asks for the same file.", he: "נועה, גם היא בתל אביב, מבקשת את אותו קובץ." },
      },
      {
        from: "e", to: "b", label: "200 OK · 15 ms", status: 200, body: ["x-vercel-cache: HIT"],
        say: { en: "A hit, served from nearby in 15 ms. The origin never hears of it, so a launch-day crowd never reaches it either.", he: "Hit, מוגש מקרוב ב-15ms. שרת המקור לא שומע על זה, וגם עומס של יום השקה לא מגיע אליו." },
      },
      {
        from: "o", to: "e", label: "200 OK · /account", status: 200, tone: "err",
        body: ["Set-Cookie: session=…", "Cache-Control: public, max-age=600", "Hello Dana · 3 deals won"],
        say: { en: "The trap: a blanket rule marks /account as public too. The edge stores Dana's personal page.", he: "המלכודת: כלל גורף מסמן גם את /account כ-public. שרת ה-CDN שומר את העמוד האישי של דנה." },
      },
      {
        from: "e", to: "b", label: "HIT /account · Hello Dana", tone: "err",
        say: { en: "The next visitor gets Dana's name and deals. Anything per user, or with a cookie, must never be stored at the edge.", he: "הגולש הבא מקבל את השם והעסקאות של דנה. כל מה שאישי, או מגיע עם cookie, אסור שיישמר ב-CDN." },
      },
      {
        from: "o", to: "e", label: "200 OK · /account", status: 200, body: ["Cache-Control: private, no-store"],
        say: { en: "Fixed: the edge passes it through and keeps nothing. Ask of every rule: could two users get this same stored response?", he: "תוקן: שרת ה-CDN מעביר את זה הלאה ולא שומר כלום. שאלו על כל כלל: האם שני משתמשים יקבלו אותה תשובה שמורה?" },
      },
    ],
  },

  pagination: {
    cap: { en: "Noa has 5,000 contacts. The list comes 50 at a time, with a bookmark", he: "לנועה יש 5,000 אנשי קשר. הרשימה מגיעה 50 בכל פעם, עם סימנייה" },
    actors: [browser, server, db],
    beats: [
      {
        from: "b", to: "s", label: "GET /api/contacts",
        say: { en: "Version one returns every contact. Fine with 40. Noa just imported 5,000.", he: "גרסה ראשונה מחזירה את כל אנשי הקשר. עם 40 זה בסדר. נועה ייבאה עכשיו 5,000." },
      },
      {
        from: "s", to: "b", label: "200 OK · 5,000 rows · 4.1 MB", status: 200, tone: "warn",
        say: { en: "4 MB of JSON and a frozen page, just to show the first 50. At 400,000 rows this takes the server down.", he: "4MB של JSON ועמוד קפוא, רק כדי להציג את 50 הראשונים. ב-400,000 שורות זה מפיל את השרת." },
      },
      {
        from: "b", to: "s", label: "GET /api/contacts?limit=50",
        say: { en: "Version two asks for one slice.", he: "גרסה שנייה מבקשת פרוסה אחת." },
      },
      {
        from: "s", to: "d", label: "SELECT … ORDER BY id LIMIT 51",
        say: { en: "The server fetches one row more than asked, to know whether a next page exists.", he: "השרת מביא שורה אחת יותר ממה שביקשו, כדי לדעת אם יש עמוד הבא." },
      },
      {
        from: "s", to: "b", label: "200 OK", status: 200,
        body: ['{ "items": [ …50 ],', '  "nextCursor": "eyJpZCI6MTA1MH0" }'],
        say: { en: "50 contacts plus a bookmark: 'continue after the last one you saw'.", he: "50 אנשי קשר ועוד סימנייה: 'תמשיכו אחרי האחרון שראיתם'." },
      },
      {
        from: "b", to: "s", label: "GET /api/contacts?cursor=eyJpZ…",
        say: { en: "Noa scrolls. The page sends the bookmark back.", he: "נועה גוללת. העמוד שולח את הסימנייה בחזרה." },
      },
      {
        from: "s", to: "d", label: "SELECT … WHERE id > 1050 LIMIT 51",
        say: { en: "The cursor becomes a WHERE, so page 90 is as fast as page 1, and new contacts cannot shift or repeat rows.", he: "הסימנייה הופכת ל-WHERE, אז עמוד 90 מהיר כמו עמוד 1, ואנשי קשר חדשים לא יכולים להזיז או לשכפל שורות." },
      },
      {
        from: "b", to: "s", label: "GET /api/contacts?limit=1000000",
        say: { en: "Someone asks for a million at once.", he: "מישהו מבקש מיליון בבת אחת." },
      },
      {
        from: "s", to: "b", label: "200 OK · 100 items (max)", status: 200,
        say: { en: "The server decides the maximum page size, never the caller.", he: "השרת מחליט מה הגודל המקסימלי של עמוד, אף פעם לא מי שקורא לו." },
      },
    ],
  },

  "timeouts-and-retries": {
    cap: { en: "The email provider hangs. A deadline frees you, and a key makes the retry safe", he: "ספק המיילים נתקע. דדליין משחרר אתכם, ומפתח הופך את הניסיון החוזר לבטוח" },
    actors: [worker, emailApi, inbox],
    beats: [
      {
        from: "w", to: "p", label: "POST /emails · no timeout",
        say: { en: "The reminder job asks the provider to send Dana's follow-up. No timeout is set.", he: "עבודת התזכורות מבקשת מהספק לשלוח לדנה follow-up. לא הוגדר טיים-אאוט." },
      },
      {
        from: "p", to: "p", label: "… no answer", tone: "warn",
        say: { en: "The provider is stuck and never answers. Without a deadline, the job waits forever, holding a connection.", he: "הספק תקוע ולא עונה. בלי דדליין, העבודה מחכה לנצח ומחזיקה חיבור פתוח." },
      },
      {
        from: "w", to: "w", label: "10/10 connections waiting", tone: "err",
        say: { en: "Every reminder does the same. Nothing errors, nothing logs. The service looks healthy and does nothing.", he: "כל תזכורת עושה אותו דבר. אין שגיאה, אין לוג. השירות נראה בריא ולא עושה כלום." },
      },
      {
        from: "w", to: "p", label: "POST /emails · timeout 5s", body: ["Idempotency-Key: reminder-512"],
        say: { en: "Version two: every outbound call gets a deadline, plus a key that makes repeating it safe.", he: "גרסה שנייה: לכל קריאה החוצה יש דדליין, ועוד מפתח שהופך את החזרה עליה לבטוחה." },
      },
      {
        from: "p", to: "i", label: "deliver to dana@acme.io", tone: "ok",
        say: { en: "This time the provider does send the email. Its answer back is just slow.", he: "הפעם הספק דווקא שולח את המייל. רק התשובה שלו חוזרת לאט." },
      },
      {
        from: "w", to: "w", label: "5s passed → AbortError", tone: "err",
        say: { en: "After 5 seconds the job stops waiting. A timeout means 'I don't know', not 'it didn't happen'.", he: "אחרי 5 שניות העבודה מפסיקה לחכות. טיים-אאוט אומר 'אני לא יודע', לא 'זה לא קרה'." },
      },
      {
        from: "w", to: "p", label: "POST /emails · retry after 1s", body: ["Idempotency-Key: reminder-512"],
        say: { en: "One retry, after a pause, with the same key. A POST is not safe to repeat on its own. The key makes it safe.", he: "ניסיון חוזר אחד, אחרי הפסקה, עם אותו מפתח. POST לא בטוח לחזרה בפני עצמו. המפתח הופך אותו לבטוח." },
      },
      {
        from: "p", to: "w", label: "200 OK · already sent", status: 200,
        body: ['{ "id": "em_7c1" }  ← same as before'],
        say: { en: "The provider recognises the key and returns the first result. Dana gets one email, not two.", he: "הספק מזהה את המפתח ומחזיר את התוצאה הראשונה. דנה מקבלת מייל אחד, לא שניים." },
      },
    ],
  },

  "api-key-vs-oauth-app": {
    cap: { en: "Two secrets: a key that says 'this is Pocket CRM', a token that says 'Noa allowed this'", he: "שני סודות: מפתח שאומר 'זה Pocket CRM', וטוקן שאומר 'נועה הרשתה את זה'" },
    actors: [
      browser,
      { id: "g", icon: "🔐", label: { en: "Google", he: "Google" } },
      server,
      emailApi,
    ],
    beats: [
      {
        from: "s", to: "p", label: "POST /emails", body: ["Authorization: Bearer key_8Kx…"],
        say: { en: "To send a reminder, your server sends its API key. It says 'this is Pocket CRM', and nothing about any user.", he: "כדי לשלוח תזכורת, השרת שולח את מפתח ה-API שלו. הוא אומר 'זה Pocket CRM', ולא כלום על אף משתמש." },
      },
      {
        from: "p", to: "s", label: "200 OK", status: 200,
        say: { en: "The provider bills and rate-limits the app. One key for the whole app, kept in the server's env vars.", he: "הספק מחייב ומגביל את האפליקציה. מפתח אחד לכל האפליקציה, שמור במשתני הסביבה של השרת." },
      },
      {
        from: "b", to: "g", label: "GET /o/oauth2/v2/auth",
        body: ["client_id=pocket-crm…", "scope=calendar.events", "redirect_uri=…/oauth/callback"],
        say: { en: "Noa clicks 'Connect Google Calendar' and is sent to Google. Your app never sees her Google password.", he: "נועה לוחצת 'Connect Google Calendar' ונשלחת ל-Google. האפליקציה שלכם לא רואה את הסיסמה שלה ב-Google." },
      },
      {
        from: "g", to: "g", label: "Noa approves: calendar.events", tone: "ok",
        say: { en: "Google shows her exactly what your app is asking for. She approves.", he: "Google מראה לה בדיוק מה האפליקציה מבקשת. היא מאשרת." },
      },
      {
        from: "g", to: "b", label: "302 Found", status: 302, body: ["Location: /oauth/callback?code=4/0Ab…"],
        say: { en: "Google sends her back to your app with a one-time code.", he: "Google מחזיר אותה לאפליקציה שלכם עם קוד חד-פעמי." },
      },
      {
        from: "b", to: "s", label: "GET /oauth/callback?code=4/0Ab…",
        say: { en: "The browser hands the code to your server. Without your app's secret, the code is useless.", he: "הדפדפן מוסר את הקוד לשרת שלכם. בלי הסוד של האפליקציה, הקוד חסר ערך." },
      },
      {
        from: "s", to: "g", label: "POST oauth2.googleapis.com/token",
        body: ["code=4/0Ab…", "client_secret=GOCSPX-…"],
        say: { en: "Your server trades the code, plus the OAuth app's client secret, for tokens.", he: "השרת שלכם מחליף את הקוד, יחד עם ה-client secret של אפליקציית ה-OAuth, בטוקנים." },
      },
      {
        from: "g", to: "s", label: "200 OK", status: 200,
        body: ['{ "access_token": "ya29.a0…",', '  "refresh_token": "1//0g…",', '  "expires_in": 3599 }'],
        say: { en: "A token for Noa only, for her calendar only. It expires in an hour; the refresh token gets a new one.", he: "טוקן רק של נועה, ורק ליומן שלה. הוא פג אחרי שעה, וה-refresh token מביא חדש." },
      },
      {
        from: "s", to: "g", label: "POST /calendar/v3/…/primary/events", body: ["Authorization: Bearer ya29.a0…"],
        say: { en: "One token per user, on the server, and Noa can revoke it. Sending email is a key; 'connect your calendar' is OAuth.", he: "טוקן אחד לכל משתמש, בשרת, ונועה יכולה לבטל אותו. שליחת מייל היא מפתח; 'חיבור היומן' הוא OAuth." },
      },
    ],
  },

  "sandbox-vs-live-keys": {
    cap: { en: "Test and live keys look the same in code. One sends nothing, one reaches real people", he: "מפתח בדיקות ומפתח חי נראים אותו דבר בקוד. אחד לא שולח כלום, השני מגיע לאנשים אמיתיים" },
    actors: [laptop, prod, emailApi, inbox],
    beats: [
      {
        from: "l", to: "p", label: "POST /emails",
        body: ["Authorization: Bearer test_4f…", '{ "to": "dana@acme.io" }'],
        say: { en: "On Omer's laptop, the reminder job runs with the sandbox key. Same code, same URL as production.", he: "בלפטופ של עומר, עבודת התזכורות רצה עם מפתח הסנדבוקס. אותו קוד, אותה כתובת כמו בפרודקשן." },
      },
      {
        from: "p", to: "l", label: "200 OK · test mode", status: 200, body: ["accepted · not delivered"],
        say: { en: "The provider accepts it and delivers nothing. Run it 200 times and nobody gets a thing.", he: "הספק מקבל את זה ולא מוסר כלום. אפשר להריץ 200 פעם ואף אחד לא יקבל כלום." },
      },
      {
        from: "l", to: "l", label: ".env.local  EMAIL_KEY=live_9a…", tone: "err",
        say: { en: "Someone pastes the live key into .env.local 'to check one real email'. The code does not change at all.", he: "מישהו מדביק את המפתח החי ל-.env.local 'כדי לבדוק מייל אמיתי אחד'. הקוד לא משתנה בכלל." },
      },
      {
        from: "l", to: "p", label: "POST /emails × 200 · e2e run", tone: "err",
        body: ["Authorization: Bearer live_9a…"],
        say: { en: "Later the e2e suite runs, as it does many times a day. Same code, one different string.", he: "אחר כך רצים טסטי ה-e2e, כמו כמה פעמים ביום. אותו קוד, מחרוזת אחת שונה." },
      },
      {
        from: "p", to: "i", label: "deliver × 200", tone: "err",
        say: { en: "200 reminders go out for real, to whatever addresses the test data holds. Some belong to real people.", he: "200 תזכורות יוצאות באמת, לכל הכתובות שיש בנתוני הבדיקה. חלק מהן שייכות לאנשים אמיתיים." },
      },
      {
        from: "o", to: "p", label: "POST /emails",
        body: ["Authorization: Bearer live_9a…", "(from Vercel env vars)"],
        say: { en: "The fix is structural: the live key exists only in production's secrets. Laptops and the repo hold only the test key.", he: "התיקון מבני: המפתח החי קיים רק בסודות של הפרודקשן. בלפטופים ובריפו יש רק את מפתח הבדיקות." },
      },
      {
        from: "p", to: "i", label: "deliver · 1 reminder to Dana", tone: "ok",
        say: { en: "In production, Dana gets her one real reminder.", he: "בפרודקשן, דנה מקבלת את התזכורת האמיתית האחת שלה." },
      },
      {
        from: "l", to: "l", label: "git grep live_ → no matches", tone: "ok",
        say: { en: "Check it: no live key in the repo or any local .env. Then put every limit the provider offers on the live key.", he: "בודקים: אין מפתח חי בריפו או באף קובץ .env מקומי. ואז מוסיפים למפתח החי כל הגבלה שהספק מציע." },
      },
    ],
  },

  "polling-vs-push": {
    cap: { en: "Did Dana's reminder arrive? Keep asking, or get told", he: "התזכורת של דנה הגיעה? ממשיכים לשאול, או שמקבלים הודעה" },
    actors: [server, emailApi],
    beats: [
      {
        from: "s", to: "p", label: "GET /emails/em_7c1",
        say: { en: "Polling: every 60 seconds the server asks the provider whether Dana's reminder was delivered.", he: "Polling: כל 60 שניות השרת שואל את הספק אם התזכורת של דנה נמסרה." },
      },
      {
        from: "p", to: "s", label: "200 OK · sent", status: 200, body: ['{ "last_event": "sent" }'],
        say: { en: "Not yet. The answer is 'nothing new', and it still cost a request.", he: "עוד לא. התשובה היא 'אין חדש', וזה עדיין עלה בקשה." },
      },
      {
        from: "s", to: "p", label: "GET /emails/em_7c1 · +60s",
        say: { en: "A minute later, the same question.", he: "דקה אחר כך, אותה שאלה." },
      },
      {
        from: "p", to: "s", label: "200 OK · delivered", status: 200, body: ['{ "last_event": "delivered" }'],
        say: { en: "Delivered, but it happened 40 seconds ago. On average, polling is late by half its interval.", he: "נמסר, אבל זה קרה לפני 40 שניות. בממוצע, polling מאחר בחצי מהמרווח שלו." },
      },
      {
        from: "s", to: "s", label: "300 reminders × 1 poll/min", tone: "warn",
        say: { en: "With 300 reminders in flight, that is 300 requests a minute, mostly to hear 'nothing new'.", he: "עם 300 תזכורות בדרך, אלה 300 בקשות בדקה, רובן רק כדי לשמוע 'אין חדש'." },
      },
      {
        from: "p", to: "s", label: "POST /webhooks/email",
        body: ["Webhook-Signature: v1,9f2c…", '{ "type": "email.delivered",', '  "email_id": "em_7c1" }'],
        say: { en: "Push: the provider calls your public URL the moment it happens. No asking, no delay.", he: "Push: הספק קורא לכתובת הציבורית שלכם ברגע שזה קורה. בלי לשאול, בלי עיכוב." },
      },
      {
        from: "s", to: "s", label: "verify signature ✓ · save delivered", tone: "ok",
        say: { en: "The URL is public, so the server checks the signature before it believes anything.", he: "הכתובת ציבורית, אז השרת בודק את החתימה לפני שהוא מאמין למשהו." },
      },
      {
        from: "s", to: "p", label: "200 OK", status: 200,
        say: { en: "For a small app, polling with a sane interval is a fine default. Switch to push when the request count or delay hurts.", he: "לאפליקציה קטנה, polling עם מרווח סביר הוא ברירת מחדל טובה. עוברים ל-push כשכמות הבקשות או העיכוב כואבים." },
      },
    ],
  },
};
