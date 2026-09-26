import type { TopicExtra } from "./types";

export const extras: Record<string, TopicExtra> = {
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

};
