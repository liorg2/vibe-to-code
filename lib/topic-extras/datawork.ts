import type { TopicExtra } from "./types";

export const extras: Record<string, TopicExtra> = {
  Database: {
    look: [
      {
        cap: {
          en: "A table named users — three rows, three columns",
          he: "טבלה בשם users — שלוש שורות, שלוש עמודות",
        },
        code: `users
 id | email              | plan
----+--------------------+-------
  1 | dana@example.com   | free
  2 | avi@example.com    | pro
  3 | noa@example.com    | free`,
      },
    ],
    prompts: [
      {
        en: "List every table in this project and one sentence on what each stores. Reply with a short bullet list only.",
        he: "בקשו מה-AI לרשום כל טבלה בפרויקט הזה, ומשפט אחד על מה כל אחת שומרת. רק רשימת נקודות קצרה.",
      },
      {
        en: "Open the users table definition and explain each column in plain words. Keep the answer under ten lines.",
        he: "בקשו מה-AI לפתוח את הגדרת טבלת users ולהסביר כל עמודה במילים פשוטות. תשובה מתחת לעשר שורות.",
      },
      {
        en: "Show me how this app connects to the database: file name, connection string place, and one sample query.",
        he: "בקשו מה-AI להראות איך האפליקציה מתחברת ל-database: שם הקובץ, איפה מחרוזת החיבור, ודוגמת query אחת.",
      },
    ],
  },

  "SQL vs NoSQL": {
    look: [
      {
        cap: {
          en: "Same person: one SQL row, one NoSQL document",
          he: "אותו אדם: שורת SQL אחת, ומסמך NoSQL אחד",
        },
        code: `-- SQL (table row)
users: id=1, email='dana@example.com'

-- NoSQL (JSON document)
{
  "_id": "1",
  "email": "dana@example.com",
  "tags": ["pro", "israel"]
}`,
      },
    ],
    prompts: [
      {
        en: "For this project, say whether the main store looks SQL or NoSQL, and name the file or package that proves it.",
        he: "בקשו מה-AI לומר אם האחסון הראשי בפרויקט נראה SQL או NoSQL, ולציין את הקובץ או החבילה שמוכיחים זאת.",
      },
      {
        en: "Rewrite this SQL user row as a short NoSQL JSON document. Keep only id, email, and one nested field.",
        he: "בקשו מה-AI להמיר שורת user ב-SQL למסמך NoSQL קצר ב-JSON. רק id, email, ושדה מקונן אחד.",
      },
      {
        en: "Give one concrete reason this app should stay on SQL, and one case where a NoSQL document would fit better.",
        he: "בקשו מה-AI סיבה אחת קונקרטית למה האפליקציה צריכה להישאר ב-SQL, ומקרה אחד שבו מסמך NoSQL יתאים יותר.",
      },
    ],
  },

  Schema: {
    look: [
      {
        cap: {
          en: "The shape of users before any data exists",
          he: "הצורה של users לפני שיש נתונים",
        },
        code: `CREATE TABLE users (
  id         SERIAL PRIMARY KEY,
  email      TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);`,
      },
    ],
    prompts: [
      {
        en: "Write a CREATE TABLE for products with id, name, and price_cents. Show only the SQL, nothing else.",
        he: "בקשו מה-AI לכתוב CREATE TABLE ל-products עם id, name ו-price_cents. רק את ה-SQL, בלי שום דבר אחר.",
      },
      {
        en: "Find the schema file for users in this repo and quote the column list. One short code block is enough.",
        he: "בקשו מה-AI למצוא את קובץ ה-schema של users ברפו ולצטט את רשימת העמודות. מספיק בלוק קוד קצר אחד.",
      },
      {
        en: "Add a nullable phone column to the users schema and show the new CREATE TABLE. Keep types explicit.",
        he: "בקשו מה-AI להוסיף עמודת phone ריקה ל-schema של users ולהראות את ה-CREATE TABLE החדש. עם טיפוסים מפורשים.",
      },
    ],
  },

  Query: {
    look: [
      {
        cap: {
          en: "Ask for free plans — three matching rows come back",
          he: "שואלים על תוכניות free — חוזרות שלוש שורות מתאימות",
        },
        code: `SELECT id, email, plan
FROM users
WHERE plan = 'free';

-- result
 id | email            | plan
----+------------------+------
  1 | dana@example.com | free
  3 | noa@example.com  | free
  7 | eli@example.com  | free`,
      },
    ],
    prompts: [
      {
        en: "Write a SELECT that returns email and created_at for users created today. Show the SQL only.",
        he: "בקשו מה-AI לכתוב SELECT שמחזיר email ו-created_at למשתמשים שנוצרו היום. רק את ה-SQL.",
      },
      {
        en: "Take this SELECT and add an ORDER BY so newest users come first. Paste the full query.",
        he: "בקשו מה-AI לקחת את ה-SELECT הזה ולהוסיף ORDER BY כך שהמשתמשים החדשים ראשונים. הדביקו את כל ה-query.",
      },
      {
        en: "Explain each line of this query in one short phrase. End with what the three result rows mean.",
        he: "בקשו מה-AI להסביר כל שורה ב-query הזה במשפט קצר. לסיים במה שלוש שורות התוצאה אומרות.",
      },
    ],
  },

  Index: {
    look: [
      {
        cap: {
          en: "An index on email so lookups skip the full table scan",
          he: "אינדקס על email כדי שחיפוש לא יסרוק את כל הטבלה",
        },
        code: `-- without index: scan every row
SELECT * FROM users WHERE email = 'dana@example.com';

-- with index: jump straight to the row
CREATE INDEX users_email_idx ON users (email);`,
      },
    ],
    prompts: [
      {
        en: "Suggest one index for a users table queried often by email. Show the CREATE INDEX line only.",
        he: "בקשו מה-AI להציע אינדקס אחד לטבלת users שמחפשים בה הרבה לפי email. רק שורת CREATE INDEX.",
      },
      {
        en: "List which columns in this project already have indexes, and name the migration or schema file for each.",
        he: "בקשו מה-AI לרשום אילו עמודות בפרויקט כבר יש עליהן indexes, ולציין את קובץ ה-migration או ה-schema של כל אחת.",
      },
      {
        en: "Explain in three sentences when an index helps a WHERE clause and when it just slows writes.",
        he: "בקשו מה-AI להסביר בשלושה משפטים מתי אינדקס עוזר ל-WHERE ומתי הוא רק מאט כתיבות.",
      },
    ],
  },

  Migration: {
    look: [
      {
        cap: {
          en: "One file that adds a plan column — run once, in order",
          he: "קובץ אחד שמוסיף עמודת plan — רץ פעם אחת, לפי הסדר",
        },
        code: `-- file: 004_add_plan.sql
ALTER TABLE users
  ADD COLUMN plan TEXT NOT NULL DEFAULT 'free';`,
      },
    ],
    prompts: [
      {
        en: "Write a migration file named 005_add_phone.sql that adds a nullable phone column to users. SQL only.",
        he: "בקשו מה-AI לכתוב קובץ migration בשם 005_add_phone.sql שמוסיף עמודת phone ריקה ל-users. רק SQL.",
      },
      {
        en: "Find the latest migration in this repo and say what it changes in one sentence. Include the file name.",
        he: "בקשו מה-AI למצוא את ה-migration האחרון ברפו ולומר במשפט אחד מה הוא משנה. כולל שם הקובץ.",
      },
      {
        en: "Draft a safe down migration that removes the plan column. Warn if existing data would be lost.",
        he: "בקשו מה-AI לכתוב down migration בטוח שמסיר את עמודת plan. להזהיר אם נתונים קיימים יימחקו.",
      },
    ],
  },

  Transaction: {
    look: [
      {
        cap: {
          en: "Both updates succeed together — or neither does",
          he: "שני ה-UPDATE מצליחים יחד — או שאף אחד לא",
        },
        code: `BEGIN;
UPDATE accounts SET balance = balance - 50 WHERE id = 1;
UPDATE accounts SET balance = balance + 50 WHERE id = 2;
COMMIT;`,
      },
    ],
    prompts: [
      {
        en: "Wrap these two UPDATEs in a transaction with BEGIN and COMMIT. Show the full SQL block.",
        he: "בקשו מה-AI לעטוף את שני ה-UPDATE האלה ב-transaction עם BEGIN ו-COMMIT. להראות את כל בלוק ה-SQL.",
      },
      {
        en: "Explain what ROLLBACK does if the second UPDATE fails. Use the money-transfer example in five lines.",
        he: "בקשו מה-AI להסביר מה ROLLBACK עושה אם ה-UPDATE השני נכשל. עם דוגמת העברת הכסף, בחמש שורות.",
      },
      {
        en: "Find one place in this codebase that starts a database transaction and quote the start and commit calls.",
        he: "בקשו מה-AI למצוא מקום אחד בקוד שמתחיל database transaction ולצטט את קריאות ה-start וה-commit.",
      },
    ],
  },

  ORM: {
    look: [
      {
        cap: {
          en: "Same ask — ORM call on top, SQL underneath",
          he: "אותה בקשה — קריאת ORM למעלה, SQL מתחת",
        },
        code: `// ORM
const user = await User.findBy({ email: "dana@example.com" });

// SQL it often becomes
SELECT * FROM users WHERE email = 'dana@example.com' LIMIT 1;`,
      },
    ],
    prompts: [
      {
        en: "Show the ORM call in this project that loads a user by email, and the SQL it likely runs underneath.",
        he: "בקשו מה-AI להראות את קריאת ה-ORM בפרויקט שטוענת user לפי email, ואת ה-SQL שהיא כנראה מריצה מתחת.",
      },
      {
        en: "Rewrite this raw SELECT as one ORM line using the models already in the repo. Keep names exact.",
        he: "בקשו מה-AI להמיר את ה-SELECT הגולמי לשורת ORM אחת עם המודלים שכבר קיימים ברפו. לשמור על השמות המדויקים.",
      },
      {
        en: "List three ORM methods this app uses for users, each with a one-line plain-English meaning.",
        he: "בקשו מה-AI לרשום שלוש מתודות ORM שהאפליקציה משתמשת בהן ל-users, כל אחת עם משמעות באנגלית פשוטה בשורה.",
      },
    ],
  },

  "Time, text & money": {
    look: [
      {
        cap: {
          en: "Three common mistakes, and the fix beside each",
          he: "שלוש טעויות נפוצות, והתיקון ליד כל אחת",
        },
        code: `-- bad                         -- fix
created  TIMESTAMP              created  TIMESTAMPTZ
name     VARCHAR  -- latin1     name     TEXT  -- UTF-8
price    DECIMAL(10,2)          price_cents  INTEGER  -- 1999 = $19.99`,
      },
    ],
    prompts: [
      {
        en: "Audit this schema for time, text, and money columns. List each bad type and the safer replacement.",
        he: "בקשו מה-AI לבדוק את ה-schema הזה לעמודות זמן, טקסט וכסף. לרשום כל טיפוס גרוע ואת ההחלפה הבטוחה יותר.",
      },
      {
        en: "Convert a price of 19.99 dollars into integer cents for storage. Show the number and one INSERT line.",
        he: "בקשו מה-AI להמיר מחיר של 19.99 דולר ל-integer cents לשמירה. להראות את המספר ושורת INSERT אחת.",
      },
      {
        en: "Change created_at from TIMESTAMP to TIMESTAMPTZ in a short migration. Explain why in one sentence.",
        he: "בקשו מה-AI לשנות את created_at מ-TIMESTAMP ל-TIMESTAMPTZ ב-migration קצר. להסביר למה במשפט אחד.",
      },
    ],
  },

  "Sync vs async work": {
    look: [
      {
        cap: {
          en: "Sync waits in line; async starts and continues later",
          he: "Sync מחכה בתור; async מתחיל וממשיך אחר כך",
        },
        code: `// sync — wait here until email is sent
sendEmail(user);          // blocks ~2s
return "ok";

// async — queue it, answer now
enqueue("sendEmail", user); // returns at once
return "ok";`,
      },
    ],
    prompts: [
      {
        en: "Mark each of these three steps as sync or async for a signup flow: save user, send email, return JSON.",
        he: "בקשו מה-AI לסמן כל אחד משלושת הצעדים האלה כ-sync או async בזרימת הרשמה: שמירת user, שליחת email, החזרת JSON.",
      },
      {
        en: "Find one sync call in this codebase that should be async, and suggest the smallest change to queue it.",
        he: "בקשו מה-AI למצוא קריאת sync אחת בקוד שצריכה להיות async, ולהציע את השינוי הקטן ביותר כדי לשים אותה בתור.",
      },
      {
        en: "Explain in four short lines when the HTTP response must wait for work, and when it should not.",
        he: "בקשו מה-AI להסביר בארבע שורות קצרות מתי תשובת ה-HTTP חייבת לחכות לעבודה, ומתי לא.",
      },
    ],
  },

  "Background job": {
    look: [
      {
        cap: {
          en: "The web request only writes a job; a worker does the work",
          he: "בקשת ה-web רק כותבת job; worker עושה את העבודה",
        },
        code: `// web process — fast reply
queue.add("resizeImage", { userId: 812, path: "/uploads/a.jpg" });
res.send("ok");

// worker process — later
// job: resizeImage { userId: 812, path: "/uploads/a.jpg" }`,
      },
    ],
    prompts: [
      {
        en: "Write a tiny job payload to send a welcome email to user 812. Show JSON only: type and userId.",
        he: "בקשו מה-AI לכתוב payload קטן של job לשליחת welcome email למשתמש 812. רק JSON: type ו-userId.",
      },
      {
        en: "Find the queue or worker folder in this project and list the job names it already handles.",
        he: "בקשו מה-AI למצוא את תיקיית ה-queue או ה-worker בפרויקט ולרשום את שמות ה-jobs שהיא כבר מטפלת בהם.",
      },
      {
        en: "Move this slow PDF generate out of the HTTP handler into a background job. Show enqueue plus worker stub.",
        he: "בקשו מה-AI להוציא את יצירת ה-PDF האיטית מ-HTTP handler ל-background job. להראות enqueue ו-stub של worker.",
      },
    ],
  },

  "Scheduled job (cron)": {
    look: [
      {
        cap: {
          en: "One crontab line: every day at 03:00",
          he: "שורת crontab אחת: כל יום בשעה 03:00",
        },
        code: `# minute hour day month weekday
0 3 * * *  /app/bin/purge-expired-sessions
# means: at 03:00 every day, run purge-expired-sessions`,
      },
    ],
    prompts: [
      {
        en: "Write a crontab line that runs /app/bin/daily-report every day at 03:00. Add a one-line comment.",
        he: "בקשו מה-AI לכתוב שורת crontab שמריצה /app/bin/daily-report כל יום ב-03:00. להוסיף הערה בשורה אחת.",
      },
      {
        en: "Explain this cron expression in plain words: 0 3 * * *. Say when it fires and how often.",
        he: "בקשו מה-AI להסביר את ביטוי ה-cron הזה במילים פשוטות: 0 3 * * *. מתי הוא רץ ובאיזו תדירות.",
      },
      {
        en: "Find any scheduled job or cron config in this repo and quote the schedule plus the command it runs.",
        he: "בקשו מה-AI למצוא scheduled job או הגדרת cron ברפו ולצטט את הלוח הזמנים ואת הפקודה שהיא מריצה.",
      },
    ],
  },

  "Retry & backoff": {
    look: [
      {
        cap: {
          en: "Fail once, wait longer each time: 1s, then 2s, then 4s",
          he: "נכשלים פעם, מחכים יותר בכל פעם: 1s, אחר כך 2s, אחר כך 4s",
        },
        code: `attempt 1 → fail → wait 1s
attempt 2 → fail → wait 2s
attempt 3 → fail → wait 4s
attempt 4 → give up (or send to DLQ)`,
      },
    ],
    prompts: [
      {
        en: "Write a retry plan with three attempts and delays of 1s, 2s, and 4s. Show a numbered list only.",
        he: "בקשו מה-AI לכתוב תוכנית retry עם שלושה ניסיונות והשהיות של 1s, 2s ו-4s. רק רשימה ממוספרת.",
      },
      {
        en: "Find one API call in this project that should retry on failure. Suggest max attempts and backoff delays.",
        he: "בקשו מה-AI למצוא קריאת API אחת בפרויקט שצריכה retry בכשל. להציע מספר ניסיונות מקסימלי והשהיות backoff.",
      },
      {
        en: "Explain why waiting 1s then 2s then 4s is kinder to a busy server than retrying immediately three times.",
        he: "בקשו מה-AI להסביר למה המתנה של 1s ואז 2s ואז 4s עדינה יותר לשרת עמוס מאשר retry מיידי שלוש פעמים.",
      },
    ],
  },

  "Real-time (WebSocket / SSE)": {
    look: [
      {
        cap: {
          en: "Server pushes a chat line — no new HTTP request from the client",
          he: "השרת דוחף שורת צ'אט — בלי בקשת HTTP חדשה מהלקוח",
        },
        code: `// WebSocket — server pushes
{ "type": "chat", "text": "hi Dana" }

// SSE — one open stream of events
event: progress
data: {"pct": 40}`,
      },
    ],
    prompts: [
      {
        en: "Say whether this feature needs WebSocket or SSE, and give one sentence why. Feature: live order status bar.",
        he: "בקשו מה-AI לומר אם הפיצ'ר הזה צריך WebSocket או SSE, ומשפט אחד למה. הפיצ'ר: סרגל סטטוס הזמנה חי.",
      },
      {
        en: "Sketch one JSON message the server should push when a chat line arrives. Keep under five fields.",
        he: "בקשו מה-AI לשרטט הודעת JSON אחת שהשרת צריך לדחוף כשמגיעה שורת צ'אט. פחות מחמישה שדות.",
      },
      {
        en: "Find any WebSocket or SSE usage in this repo and name the file plus the event or path it uses.",
        he: "בקשו מה-AI למצוא שימוש ב-WebSocket או SSE ברפו ולציין את הקובץ ואת ה-event או ה-path שהוא משתמש בו.",
      },
    ],
  },

  "Long-running task & progress": {
    look: [
      {
        cap: {
          en: "The job reports how far it got — client only reads percent",
          he: "ה-job מדווח עד כמה התקדם — הלקוח רק קורא אחוזים",
        },
        code: `job import-contacts id=91
  status: running
  progress: 10%   // 500 / 5000 rows
  progress: 50%
  progress: 100%  // done`,
      },
    ],
    prompts: [
      {
        en: "Design a tiny progress JSON for a 5,000-row import: id, status, pct, and done count. One object only.",
        he: "בקשו מה-AI לעצב JSON קטן של progress לייבוא של 5,000 שורות: id, status, pct, ומספר שורות שסיימו. אובייקט אחד בלבד.",
      },
      {
        en: "Show how this app could expose import progress: one route or event name and the response shape.",
        he: "בקשו מה-AI להראות איך האפליקציה יכולה לחשוף progress של ייבוא: route או שם event אחד, וצורת התשובה.",
      },
      {
        en: "List three statuses for a long task: queued, running, done. Add one sentence on when each is set.",
        he: "בקשו מה-AI לרשום שלושה סטטוסים למשימה ארוכה: queued, running, done. משפט אחד מתי כל אחד נקבע.",
      },
    ],
  },

  "Event & pub/sub": {
    look: [
      {
        cap: {
          en: "One publish; two subscribers each react on their own",
          he: "publish אחד; שני subscribers מגיבים כל אחד בנפרד",
        },
        code: `publish("user.created", { id: 812 })

// subscriber A — send welcome email
// subscriber B — create default workspace
// publisher does not call them directly`,
      },
    ],
    prompts: [
      {
        en: "Write one event name and payload for 'user signed up'. Keep the JSON under four fields.",
        he: "בקשו מה-AI לכתוב שם event אחד ו-payload ל-'user signed up'. ה-JSON מתחת לארבעה שדות.",
      },
      {
        en: "List two subscribers that should listen to user.created in this app, each with one action they take.",
        he: "בקשו מה-AI לרשום שני subscribers שצריכים להאזין ל-user.created באפליקציה, כל אחד עם פעולה אחת שהוא עושה.",
      },
      {
        en: "Find any pub/sub or event bus usage in this repo and quote the publish or subscribe call.",
        he: "בקשו מה-AI למצוא שימוש ב-pub/sub או event bus ברפו ולצטט את קריאת ה-publish או ה-subscribe.",
      },
    ],
  },

  "Dead-letter queue": {
    look: [
      {
        cap: {
          en: "After retries fail, the job lands in a dead-letter queue",
          he: "אחרי ש-retries נכשלים, ה-job נוחת ב-dead-letter queue",
        },
        code: `queue: email
  job #441 sendWelcome userId=812
  attempt 1 fail → 2 fail → 3 fail
  → move to dead-letter-queue
  // humans inspect later; main queue stays clean`,
      },
    ],
    prompts: [
      {
        en: "Describe in five lines what happens to a failed email job after three retries, including the dead-letter queue.",
        he: "בקשו מה-AI לתאר בחמש שורות מה קורה ל-job של email שנכשל אחרי שלושה retries, כולל ה-dead-letter queue.",
      },
      {
        en: "Write a short checklist for inspecting one dead-letter job: id, error, payload, and next human action.",
        he: "בקשו מה-AI לכתוב checklist קצר לבדיקת job אחד ב-dead-letter: id, error, payload, והפעולה הבאה לאדם.",
      },
      {
        en: "Find whether this project has a dead-letter or failed-jobs place. Name the file or queue if it exists.",
        he: "בקשו מה-AI לבדוק אם לפרויקט יש מקום ל-dead-letter או failed-jobs. לציין את הקובץ או ה-queue אם קיים.",
      },
    ],
  },

  "Eventual consistency": {
    look: [
      {
        cap: {
          en: "Write hits the primary now; the replica catches up a second later",
          he: "הכתיבה מגיעה ל-primary עכשיו; ה-replica מדביק שנייה אחר כך",
        },
        code: `t=0.0s  WRITE users.plan='pro' on primary
t=0.0s  READ replica  → still plan='free'   // stale
t=1.2s  replica catches up → plan='pro'     // consistent`,
      },
    ],
    prompts: [
      {
        en: "Explain eventual consistency with the primary and replica example in four short lines a beginner can follow.",
        he: "בקשו מה-AI להסביר eventual consistency עם דוגמת primary ו-replica בארבע שורות קצרות שמתחילים יכולים לעקוב אחריהן.",
      },
      {
        en: "Name one screen in this app that must read from the primary, and one that can tolerate a stale replica.",
        he: "בקשו מה-AI לציין מסך אחד באפליקציה שחייב לקרוא מה-primary, ומסך אחד שיכול לסבול replica ישן.",
      },
      {
        en: "Give one user-visible bug caused by reading a replica too soon after a write. One paragraph max.",
        he: "בקשו מה-AI לתת באג אחד שנראה למשתמש בגלל קריאה מ-replica מוקדם מדי אחרי כתיבה. פסקה אחת לכל היותר.",
      },
    ],
  },

  "RAM vs disk": {
    look: [
      {
        cap: {
          en: "Same data — RAM is fast and temporary; disk is slower and lasting",
          he: "אותם נתונים — RAM מהיר וזמני; דיסק איטי יותר ונשאר",
        },
        code: `// RAM  (~100 ns)   lost on restart
cache.set("user:1", user)

// disk (~10 ms)    survives restart
db.save("users", user)`,
      },
    ],
    prompts: [
      {
        en: "For session tokens, say whether RAM or disk is the better default store, and why in two sentences.",
        he: "בקשו מה-AI לומר לגבי session tokens אם RAM או דיסק הוא אחסון ברירת המחדל הטוב יותר, ולמה בשני משפטים.",
      },
      {
        en: "List three things this app keeps on disk and one thing it keeps only in RAM. One line each.",
        he: "בקשו מה-AI לרשום שלושה דברים שהאפליקציה שומרת על דיסק ודבר אחד שהיא שומרת רק ב-RAM. שורה לכל אחד.",
      },
      {
        en: "Explain why loading a whole users table into RAM can feel fast until the server restarts. Three sentences.",
        he: "בקשו מה-AI להסביר למה טעינת כל טבלת users ל-RAM מרגישה מהירה עד שהשרת עולה מחדש. שלושה משפטים.",
      },
    ],
  },

  "Memory leak": {
    look: [
      {
        cap: {
          en: "An array that only grows — nothing ever leaves",
          he: "מערך שרק גדל — שום דבר לא יוצא ממנו",
        },
        code: `const log = [];
function onRequest(req) {
  log.push(req);   // never cleared
}
// hours later: RAM full, process dies`,
      },
    ],
    prompts: [
      {
        en: "Find a place in this code that pushes into a global array or map and never removes entries. Quote the lines.",
        he: "בקשו מה-AI למצוא מקום בקוד שדוחף למערך או map גלובלי ולא מסיר ערכים. לצטט את השורות.",
      },
      {
        en: "Write a three-step checklist to confirm a memory leak: grow, hold, never free. Keep it under six lines.",
        he: "בקשו מה-AI לכתוב checklist של שלושה צעדים לאישור memory leak: גדילה, החזקה, אף פעם לא שחרור. מתחת לשש שורות.",
      },
      {
        en: "Suggest the smallest fix for a request log array that grows forever: cap size or clear on a timer.",
        he: "בקשו מה-AI להציע את התיקון הקטן ביותר למערך לוג בקשות שגדל לנצח: הגבלת גודל או ניקוי בטיימר.",
      },
    ],
  },

  "Latency vs throughput": {
    look: [
      {
        cap: {
          en: "Latency is one wait; throughput is how many finish per second",
          he: "Latency הוא המתנה אחת; throughput הוא כמה מסיימים בשנייה",
        },
        code: `one request:  latency = 200 ms
1000 requests / second:  throughput = 1000 rps
// fast latency ≠ high throughput (and the reverse)`,
      },
    ],
    prompts: [
      {
        en: "Define latency and throughput in one sentence each, using a checkout click as the example.",
        he: "בקשו מה-AI להגדיר latency ו-throughput במשפט אחד לכל אחד, עם לחיצת checkout כדוגמה.",
      },
      {
        en: "For this API route, say what to measure first if users say 'slow': latency, throughput, or both — and why.",
        he: "בקשו מה-AI לומר מה למדוד קודם אם משתמשים אומרים 'איטי' ב-API route הזה: latency, throughput, או שניהם — ולמה.",
      },
      {
        en: "Give one change that lowers latency but can hurt throughput, and one that raises throughput but not latency.",
        he: "בקשו מה-AI שינוי אחד שמוריד latency אבל יכול לפגוע ב-throughput, ואחד שמעלה throughput אבל לא latency.",
      },
    ],
  },

  "Blocking vs async": {
    look: [
      {
        cap: {
          en: "Blocking holds the thread; async frees it while waiting",
          he: "Blocking תופס את ה-thread; async משחרר אותו בזמן ההמתנה",
        },
        code: `// blocking — thread sleeps here
sleep(2000);
doNext();

// async — thread free during the wait
await delay(2000);
doNext();`,
      },
    ],
    prompts: [
      {
        en: "Rewrite this blocking sleep as async await delay. Show before and after, four lines total.",
        he: "בקשו מה-AI להמיר את ה-sleep החוסם ל-async await delay. להראות לפני ואחרי, ארבע שורות בסך הכל.",
      },
      {
        en: "Find one blocking call in this project that sits on the request path. Name the file and function.",
        he: "בקשו מה-AI למצוא קריאה חוסמת אחת בפרויקט שנמצאת על נתיב הבקשה. לציין את הקובץ ואת הפונקציה.",
      },
      {
        en: "Explain in three sentences why a blocking database call freezes other requests on the same thread.",
        he: "בקשו מה-AI להסביר בשלושה משפטים למה קריאת database חוסמת מקפיאה בקשות אחרות על אותו thread.",
      },
    ],
  },

  "Race condition": {
    look: [
      {
        cap: {
          en: "Two workers both read 1 and both write 2 — one increment is lost",
          he: "שני workers קוראים 1 וכותבים 2 — increment אחד נעלם",
        },
        code: `// count starts at 1
worker A: read count → 1    worker B: read count → 1
worker A: write count → 2   worker B: write count → 2
// expected 3, got 2`,
      },
    ],
    prompts: [
      {
        en: "Act out a race on a shared counter starting at 1. Show two workers each reading 1 and writing 2.",
        he: "בקשו מה-AI להדגים race על מונה משותף שמתחיל ב-1. להראות שני workers שכל אחד קורא 1 וכותב 2.",
      },
      {
        en: "Find a place in this code where two requests might update the same row. Suggest one lock or atomic fix.",
        he: "בקשו מה-AI למצוא מקום בקוד שבו שתי בקשות עלולות לעדכן את אותה שורה. להציע lock אחד או תיקון atomic.",
      },
      {
        en: "Explain in four lines why 'read, add one, write' is unsafe when two processes run it at once.",
        he: "בקשו מה-AI להסביר בארבע שורות למה 'קרא, הוסף אחד, כתוב' לא בטוח כששני תהליכים רצים על זה יחד.",
      },
    ],
  },

  "Stack & heap": {
    look: [
      {
        cap: {
          en: "Stack holds the call; heap holds the object that lives longer",
          he: "Stack מחזיק את הקריאה; heap מחזיק את האובייקט שחי יותר",
        },
        code: `function greet(name) {          // name on the stack
  const user = { name };        // object on the heap
  return user;
}`,
      },
    ],
    prompts: [
      {
        en: "Label each value in this function as stack or heap: the parameter, the local number, and the returned object.",
        he: "בקשו מה-AI לסמן כל ערך בפונקציה הזאת כ-stack או heap: הפרמטר, המספר המקומי, והאובייקט שחוזר.",
      },
      {
        en: "Explain in three beginner sentences what lives on the stack versus the heap when a function returns an object.",
        he: "בקשו מה-AI להסביר בשלושה משפטים למתחילים מה חי על ה-stack ומה על ה-heap כשפונקציה מחזירה אובייקט.",
      },
      {
        en: "Draw a four-line text diagram of stack frames for main calling greet. No fancy tools — plain text only.",
        he: "בקשו מה-AI לצייר דיאגרמת טקסט בת ארבע שורות של stack frames ל-main שקורא ל-greet. בלי כלים מיוחדים — רק טקסט.",
      },
    ],
  },

  "Garbage collection": {
    look: [
      {
        cap: {
          en: "Nothing points at the object — the collector can free it",
          he: "שום דבר לא מצביע על האובייקט — ה-collector יכול לשחרר אותו",
        },
        code: `let user = { email: "dana@example.com" };
user = null;   // no references left
// GC later reclaims that heap object`,
      },
    ],
    prompts: [
      {
        en: "Explain garbage collection like clearing plates nobody is using. Three short sentences, no jargon pile-up.",
        he: "בקשו מה-AI להסביר garbage collection כמו פינוי צלחות שאף אחד לא משתמש בהן. שלושה משפטים קצרים, בלי ערמת מונחים.",
      },
      {
        en: "Show a three-line snippet where an object becomes unreachable, then say when GC may free it.",
        he: "בקשו מה-AI להראות קטע של שלוש שורות שבו אובייקט הופך ללא נגיש, ואז לומר מתי GC עשוי לשחרר אותו.",
      },
      {
        en: "If RAM keeps rising, ask what is still referenced each request — not how to give the process more memory.",
        he: "בקשו מה-AI: אם ה-RAM ממשיך לעלות, מה עדיין referenced בכל בקשה — לא איך לתת לתהליך יותר זיכרון.",
      },
    ],
  },

  "Data structures": {
    look: [
      {
        cap: {
          en: "Array for order; map for lookup by key",
          he: "מערך לסדר; map לחיפוש לפי מפתח",
        },
        code: `// array — keep order
["dana", "avi", "noa"]

// map — find by id
{ "1": "dana", "2": "avi", "3": "noa" }`,
      },
    ],
    prompts: [
      {
        en: "Pick array or map for a list of recent chat messages shown in order. Say why in one sentence.",
        he: "בקשו מה-AI לבחור array או map לרשימת הודעות צ'אט אחרונות שמוצגות לפי סדר. למה במשפט אחד.",
      },
      {
        en: "Pick array or map for looking up a user by id a thousand times. Say why in one sentence.",
        he: "בקשו מה-AI לבחור array או map לחיפוש user לפי id אלף פעמים. למה במשפט אחד.",
      },
      {
        en: "Find one array and one map (or object used as a map) in this codebase. Quote one line for each.",
        he: "בקשו מה-AI למצוא מערך אחד ו-map אחד (או אובייקט שמשמש כ-map) בקוד. לצטט שורה אחת לכל אחד.",
      },
    ],
  },

  "Big-O": {
    look: [
      {
        cap: {
          en: "How cost grows when the list gets longer",
          he: "איך העלות גדלה כשהרשימה מתארכת",
        },
        code: `O(1)   grab item by index
O(n)   scan every item once
O(n²)  compare every item to every other
// n = size of the input`,
      },
    ],
    prompts: [
      {
        en: "Label these three snippets O(1), O(n), or O(n²): index read, full loop, nested loop. One word each.",
        he: "בקשו מה-AI לסמן את שלושת הקטעים האלה כ-O(1), O(n) או O(n²): קריאה באינדקס, לולאה מלאה, לולאה מקוננת. מילה אחת לכל אחד.",
      },
      {
        en: "Find one nested loop over users in this project and say whether it looks O(n) or O(n²). Quote the lines.",
        he: "בקשו מה-AI למצוא לולאה מקוננת אחת על users בפרויקט ולומר אם היא נראית O(n) או O(n²). לצטט את השורות.",
      },
      {
        en: "Explain Big-O to a beginner in four lines using a guest list that doubles in size each time.",
        he: "בקשו מה-AI להסביר Big-O למתחיל בארבע שורות עם רשימת אורחים שמוכפלת בגודל בכל פעם.",
      },
    ],
  },

  Cache: {
    look: [
      {
        cap: {
          en: "One key in the cache, with a short life",
          he: "מפתח אחד ב-cache, עם חיים קצרים",
        },
        code: `Cache-Control: max-age=60
// or: SET user:1 '{"plan":"pro"}' EX 60`,
      },
    ],
    prompts: [
      {
        en: "Propose one cache key for a user profile by id, and a TTL in seconds. Show key and TTL only.",
        he: "בקשו מה-AI להציע מפתח cache אחד לפרופיל משתמש לפי id, ו-TTL בשניות. רק מפתח ו-TTL.",
      },
      {
        en: "Find any cache usage in this project and quote the key pattern or Cache-Control header.",
        he: "בקשו מה-AI למצוא שימוש ב-cache בפרויקט ולצטט את תבנית המפתח או את ה-header של Cache-Control.",
      },
      {
        en: "Say what should be cached for 60 seconds on the courses page, and what must never be cached.",
        he: "בקשו מה-AI לומר מה כדאי לשים ב-cache ל-60 שניות בעמוד courses, ומה אסור לשים ב-cache לעולם.",
      },
    ],
  },

  "Hit / Miss": {
    look: [
      {
        cap: {
          en: "Hit returns from cache; miss loads from the database",
          he: "Hit חוזר מה-cache; miss טוען מה-database",
        },
        code: `GET user:1
  HIT  → return cached JSON
  MISS → SELECT from db → store key EX 60 → return`,
      },
    ],
    prompts: [
      {
        en: "Log one cache HIT and one MISS for key user:1. Show two short log lines a beginner can read.",
        he: "בקשו מה-AI לרשום HIT אחד ו-MISS אחד ל-cache על המפתח user:1. שתי שורות לוג קצרות שמתחיל יכול לקרוא.",
      },
      {
        en: "If almost every request is a MISS, list three likely causes. One short phrase each.",
        he: "בקשו מה-AI: אם כמעט כל בקשה היא MISS, לרשום שלוש סיבות סבירות. ביטוי קצר לכל אחת.",
      },
      {
        en: "Add a counter for cache hits and misses around this lookup. Show the smallest code change.",
        he: "בקשו מה-AI להוסיף מונה ל-cache hits ו-misses סביב ה-lookup הזה. להראות את השינוי הקטן ביותר בקוד.",
      },
    ],
  },

  TTL: {
    look: [
      {
        cap: {
          en: "The key dies after sixty seconds — no manual delete needed",
          he: "המפתח מת אחרי שישים שניות — בלי מחיקה ידנית",
        },
        code: `SET session:abc123 "dana" EX 60
// TTL = 60 seconds, then the key is gone`,
      },
    ],
    prompts: [
      {
        en: "Pick a TTL in seconds for a login session cache key and justify it in one sentence.",
        he: "בקשו מה-AI לבחור TTL בשניות למפתח cache של session התחברות ולהצדיק אותו במשפט אחד.",
      },
      {
        en: "Show the Redis command that sets user:1 with a 60-second TTL. One line only.",
        he: "בקשו מה-AI להראות את פקודת Redis ששומרת user:1 עם TTL של 60 שניות. שורה אחת בלבד.",
      },
      {
        en: "Explain what happens to readers when a TTL expires mid-day. Two sentences, no fluff.",
        he: "בקשו מה-AI להסביר מה קורה לקוראים כש-TTL פג באמצע היום. שני משפטים, בלי מילוי.",
      },
    ],
  },

  Invalidation: {
    look: [
      {
        cap: {
          en: "After a write, delete the stale cache key",
          he: "אחרי כתיבה, מוחקים את מפתח ה-cache הישן",
        },
        code: `UPDATE users SET plan = 'pro' WHERE id = 1;
DEL user:1
// next read is a MISS, then fresh data is cached`,
      },
    ],
    prompts: [
      {
        en: "After updating a user's plan, show the one cache key to delete. Name the key only.",
        he: "בקשו מה-AI: אחרי עדכון plan של משתמש, להראות איזה מפתח cache אחד למחוק. רק שם המפתח.",
      },
      {
        en: "Find where this app updates user data and say whether it also invalidates a cache key. Quote proof.",
        he: "בקשו מה-AI למצוא איפה האפליקציה מעדכנת נתוני user ולומר אם היא גם עושה invalidation למפתח cache. לצטט הוכחה.",
      },
      {
        en: "Write three steps: update row, invalidate key, next read misses. Keep each step under eight words.",
        he: "בקשו מה-AI לכתוב שלושה צעדים: עדכון שורה, invalidation של מפתח, הקריאה הבאה היא miss. כל צעד מתחת לשמונה מילים.",
      },
    ],
  },

  "Browser cache": {
    look: [
      {
        cap: {
          en: "The browser keeps the file for one hour",
          he: "הדפדפן שומר את הקובץ לשעה",
        },
        code: `HTTP/1.1 200 OK
Cache-Control: max-age=3600
Content-Type: text/css
// browser reuses style.css for 1 hour`,
      },
    ],
    prompts: [
      {
        en: "Write a Cache-Control header so the browser keeps this CSS file for one hour. Header line only.",
        he: "בקשו מה-AI לכתוב header של Cache-Control כדי שהדפדפן ישמור את קובץ ה-CSS לשעה. רק שורת ה-header.",
      },
      {
        en: "Say which responses in this app should use browser cache, and which must send Cache-Control: no-store.",
        he: "בקשו מה-AI לומר אילו תשובות באפליקציה צריכות browser cache, ואילו חייבות לשלוח Cache-Control: no-store.",
      },
      {
        en: "Explain how to force a fresh CSS file after deploy using a content hash in the filename. Three lines.",
        he: "בקשו מה-AI להסביר איך לכפות קובץ CSS טרי אחרי deploy עם hash בתוכן שם הקובץ. שלוש שורות.",
      },
    ],
  },

  CDN: {
    look: [
      {
        cap: {
          en: "The edge near the user serves the file — origin is skipped",
          he: "ה-edge הקרוב למשתמש מגיש את הקובץ — מדלגים על ה-origin",
        },
        code: `user (Tel Aviv)
  → CDN edge HIT  /static/app.js
  // origin server in US never sees this request`,
      },
    ],
    prompts: [
      {
        en: "Explain in three sentences what a CDN edge HIT means for a user in Tel Aviv fetching app.js.",
        he: "בקשו מה-AI להסביר בשלושה משפטים מה CDN edge HIT אומר למשתמש בתל אביב שמוריד app.js.",
      },
      {
        en: "List two file types this site should put on a CDN, and one response type that must stay on the origin.",
        he: "בקשו מה-AI לרשום שני סוגי קבצים שהאתר הזה צריך לשים על CDN, וסוג תשובה אחד שחייב להישאר ב-origin.",
      },
      {
        en: "Find any CDN or asset host config in this project and quote the hostname or header if present.",
        he: "בקשו מה-AI למצוא הגדרת CDN או host של נכסים בפרויקט ולצטט את שם ה-host או ה-header אם יש.",
      },
    ],
  },

  "Redis / in-memory store": {
    look: [
      {
        cap: {
          en: "One key in Redis with a sixty-second TTL",
          he: "מפתח אחד ב-Redis עם TTL של שישים שניות",
        },
        code: `SET user:1 '{"email":"dana@example.com"}' EX 60
GET user:1
// answer: {"email":"dana@example.com"}`,
      },
    ],
    prompts: [
      {
        en: "Show Redis SET and GET for user:1 with a 60-second TTL. Two commands only.",
        he: "בקשו מה-AI להראות Redis SET ו-GET ל-user:1 עם TTL של 60 שניות. שתי פקודות בלבד.",
      },
      {
        en: "Find whether this project talks to Redis or another in-memory store. Name the client file if it exists.",
        he: "בקשו מה-AI לבדוק אם הפרויקט מדבר עם Redis או in-memory store אחר. לציין את קובץ ה-client אם קיים.",
      },
      {
        en: "Propose one Redis key for rate-limiting login attempts by IP. Include a short TTL reason.",
        he: "בקשו מה-AI להציע מפתח Redis אחד ל-rate-limiting של ניסיונות login לפי IP. לכלול סיבת TTL קצרה.",
      },
    ],
  },
};
