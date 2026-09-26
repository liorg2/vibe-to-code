import type { TopicExtra } from "./types";

export const extras: Record<string, TopicExtra> = {
  Pagination: {
    look: [
      {
        cap: {
          en: "One page of results plus a cursor for the next",
          he: "עמוד אחד של תוצאות ועוד cursor לעמוד הבא",
        },
        code: `GET /orders?limit=2

{
  "items": [
    { "id": 41, "total": 19.5 },
    { "id": 42, "total": 8.0 }
  ],
  "next_cursor": "ord_42"
}

# next call:
GET /orders?limit=2&cursor=ord_42`,
      },
    ],
    prompts: [
      {
        en: "Explain cursor pagination in plain words. Why is next_cursor safer than page=999 for a growing orders list?",
        he: "הסבירו pagination עם cursor במילים פשוטות. למה next_cursor בטוח יותר מ-page=999 לרשימת הזמנות שגדלה?",
      },
      {
        en: "Review this list endpoint. Does it cap page size? Does it return a next cursor? Suggest the smallest change.",
        he: "עברו על ה-endpoint של הרשימה. האם יש תקרת גודל לעמוד? האם מוחזר next cursor? הציעו את השינוי הכי קטן.",
      },
      {
        en: "Ask the AI to add cursor pagination to GET /users with limit default 20 and max 100. Show request and JSON response.",
        he: "בקשו מה-AI להוסיף cursor pagination ל-GET /users עם limit ברירת מחדל 20 ומקסימום 100. הראו בקשה ותשובת JSON.",
      },
    ],
  },

  "Polling vs push": {
    look: [
      {
        cap: {
          en: "Ask again and again, or wait until they call you",
          he: "שואלים שוב ושוב, או מחכים עד שהם קוראים לכם",
        },
        code: `# polling — you ask
setInterval(async () => {
  const job = await fetch("/jobs/42").then((r) => r.json());
  if (job.status === "done") clearInterval(timer);
}, 3000);

# push (webhook) — they tell you
POST /webhooks/job-done
{ "id": 42, "status": "done" }`,
      },
    ],
    prompts: [
      {
        en: "Explain polling vs push for a long export job. When is a webhook better, and what must we verify on each push?",
        he: "הסבירו polling מול push לייצוא ארוך. מתי webhook עדיף, ומה חייבים לאמת בכל push?",
      },
      {
        en: "Review this status check loop. Is the interval too tight? Suggest backoff or a webhook instead, with reasons.",
        he: "עברו על לולאת בדיקת הסטטוס. האם המרווח קצר מדי? הציעו backoff או webhook במקום, עם סיבות.",
      },
      {
        en: "Design the smallest webhook handler for job-done: verify signature, update row 42, return 200 fast.",
        he: "תכננו את ה-webhook handler הכי קטן ל-job-done: אימות חתימה, עדכון שורה 42, החזרת 200 מהר.",
      },
    ],
  },

  "Test-first (TDD)": {
    look: [
      {
        cap: {
          en: "Write a failing expect, then the one-line fix",
          he: "כותבים expect שנכשל, ואז את התיקון בשורה אחת",
        },
        code: `test("free shipping at 200", () => {
  expect(shippingCost(200)).toBe(0);  // FAIL: got 15
});

// fix:
// function shippingCost(total) {
//   return total >= 200 ? 0 : 15;
// }`,
      },
    ],
    prompts: [
      {
        en: "Before coding free shipping above 200, write one failing test that states the rule. Do not implement the function yet.",
        he: "לפני שכותבים משלוח חינם מעל 200, כתבו טסט אחד שנכשל ומנסח את הכלל. עדיין בלי לממש את הפונקציה.",
      },
      {
        en: "Review this change: was a failing test written first? If not, ask for the test that should have come before the fix.",
        he: "עברו על השינוי: האם נכתב קודם טסט שנכשל? אם לא, בקשו את הטסט שהיה צריך לבוא לפני התיקון.",
      },
      {
        en: "Turn this bug report into a failing expect(), then the smallest code change that makes it pass.",
        he: "הפכו את דוח הבאג הזה ל-expect() שנכשל, ואז לשינוי הקוד הכי קטן שגורם לו לעבור.",
      },
    ],
  },

  "Flaky test": {
    look: [
      {
        cap: {
          en: "Same test, sometimes green, sometimes red",
          he: "אותו טסט, לפעמים ירוק ולפעמים אדום",
        },
        code: `// flaky — depends on wall-clock time
test("token expires", async () => {
  const t = makeToken({ expInMs: 50 });
  await sleep(50);           // sometimes still valid
  expect(isExpired(t)).toBe(true);
});

// stable — freeze time
test("token expires", () => {
  const t = makeToken({ expAt: 1000 });
  expect(isExpired(t, /* now */ 1001)).toBe(true);
});`,
      },
    ],
    prompts: [
      {
        en: "Explain what a flaky test is. List three common causes and the usual fix for each.",
        he: "הסבירו מהו flaky test. רשמו שלוש סיבות נפוצות והתיקון הרגיל לכל אחת.",
      },
      {
        en: "This CI test fails one in ten runs. Find the race or timer and propose the smallest stable rewrite.",
        he: "הטסט הזה ב-CI נכשל באחת מעשר ריצות. מצאו את ה-race או הטיימר והציעו שכתוב יציב וקטן.",
      },
      {
        en: "Review our E2E suite for sleeps and random order. Replace one sleep with a wait-for-element assertion.",
        he: "עברו על סיוטת ה-E2E שלנו בחיפוש sleep וסדר אקראי. החליפו sleep אחד ב-wait-for-element.",
      },
    ],
  },

  "Authentication vs Authorization": {
    look: [
      {
        cap: {
          en: "Who you are vs what you are allowed to do",
          he: "מי אתם מול מה מותר לכם לעשות",
        },
        code: `# Authentication — prove identity
POST /login { email, password }
-> Set-Cookie: sid=abc  (you are user 42)

# Authorization — check permission
GET /orders/99
if (order.ownerId !== session.userId) return 403;

# logged in is not enough: user 42 still cannot see user 7's order`,
      },
    ],
    prompts: [
      {
        en: "Explain authentication vs authorization with a shop example. Can a logged-in user always open any order?",
        he: "הסבירו authentication מול authorization עם דוגמת חנות. האם משתמש מחובר תמיד יכול לפתוח כל הזמנה?",
      },
      {
        en: "Review GET /orders/:id. Does it check the caller owns the row? Show the exact ownership check to add.",
        he: "עברו על GET /orders/:id. האם בודקים שהקורא הוא הבעלים של השורה? הראו את בדיקת הבעלות המדויקת להוספה.",
      },
      {
        en: "List every admin-only route and confirm each returns 403 for a normal user session. Fix any gap.",
        he: "רשמו כל נתיב ל-admin בלבד וודאו שכל אחד מחזיר 403 למשתמש רגיל. תקנו כל פער.",
      },
    ],
  },

  OAuth: {
    look: [
      {
        cap: {
          en: "User says yes at the provider, then we get a code",
          he: "המשתמש מאשר אצל הספק, ואז מקבלים code",
        },
        code: `1) Browser -> provider
   /authorize?client_id=app_42&redirect_uri=https://app.example/cb

2) User clicks Allow

3) Provider -> our app
   /cb?code=abc

4) Our server (secret stays here)
   POST /token { code: "abc", client_secret: "..." }
   -> { access_token: "tok_user_42" }`,
      },
    ],
    prompts: [
      {
        en: "Explain the OAuth authorization-code flow in four steps for Sign in with Google. Where does the client secret stay?",
        he: "הסבירו את זרימת OAuth עם authorization code בארבעה צעדים ל-Sign in with Google. איפה נשאר ה-client secret?",
      },
      {
        en: "Review our OAuth callback. Do we check state? Do we exchange the code on the server only? Fix gaps.",
        he: "עברו על ה-OAuth callback שלנו. האם בודקים state? האם מחליפים את ה-code רק בשרת? תקנו פערים.",
      },
      {
        en: "List the scopes we request and whether each is required. Drop any scope we do not use on the first screen.",
        he: "רשמו את ה-scopes שאנחנו מבקשים והאם כל אחד הכרחי. הסירו כל scope שלא בשימוש במסך הראשון.",
      },
    ],
  },

  "Injection & validation": {
    look: [
      {
        cap: {
          en: "Pass values as parameters — never glue them into SQL",
          he: "מעבירים ערכים כפרמטרים — אף פעם לא מדביקים לתוך SQL",
        },
        code: `// safe — parameterized
db.query("SELECT id FROM users WHERE email = $1", [email]);

// validate shape before use
if (!email.includes("@")) throw new Error("bad email");`,
      },
    ],
    prompts: [
      {
        en: "Explain SQL injection in plain words and show why WHERE email = $1 is safer than concatenating the string.",
        he: "הסבירו SQL injection במילים פשוטות, והראו למה WHERE email = $1 בטוח יותר מהדבקת המחרוזת.",
      },
      {
        en: "Review every database query in this file. Flag any string concatenation into SQL and rewrite each as $1 parameters.",
        he: "עברו על כל שאילתת מסד בקובץ. סמנו כל הדבקת מחרוזת לתוך SQL וכתבו מחדש עם פרמטרים $1.",
      },
      {
        en: "Add validation for email and user id on this endpoint before the query runs. Reject bad input with 400.",
        he: "הוסיפו ולידציה ל-email ו-user id ב-endpoint לפני השאילתה. דחו קלט רע עם 400.",
      },
    ],
  },

  "Least privilege": {
    look: [
      {
        cap: {
          en: "Give each key only the doors it needs to open",
          he: "נותנים לכל מפתח רק את הדלתות שהוא צריך לפתוח",
        },
        code: `# bad — one admin key for everything
API_KEY=sk_live_admin_all_buckets

# better — narrow keys
UPLOAD_KEY=sk_test_write_images_only
READ_KEY=sk_test_read_orders_only

# app role in the database
GRANT SELECT ON orders TO app_readonly;
-- app_readonly cannot DROP TABLE`,
      },
    ],
    prompts: [
      {
        en: "Explain least privilege for API keys and database roles. What should happen when a narrow key leaks?",
        he: "הסבירו least privilege למפתחות API ולתפקידי מסד. מה אמור לקרות כשמפתח צר דולף?",
      },
      {
        en: "Review our service account permissions. List grants that look wider than the job needs and propose cuts.",
        he: "עברו על הרשאות חשבון השירות. רשמו grants שנראים רחבים מהתפקיד והציעו צמצומים.",
      },
      {
        en: "Split this admin key into a read-only key for the dashboard and a write key for the importer only.",
        he: "פצלו את מפתח ה-admin למפתח read-only לדשבורד ומפתח write רק ל-importer.",
      },
    ],
  },

  "Audit log": {
    look: [
      {
        cap: {
          en: "One JSON line: who did what, to which id, and when",
          he: "שורת JSON אחת: מי עשה מה, לאיזה id, ומתי",
        },
        code: `{"at":"2026-09-25T08:15:00Z","who":"user_42","action":"order.cancel","id":"ord_99"}`,
      },
    ],
    prompts: [
      {
        en: "Explain what an audit log is for. Which four fields should every security-sensitive action record?",
        he: "הסבירו למה משמש audit log. אילו ארבעה שדות כל פעולה רגישה לאבטחה צריכה לרשום?",
      },
      {
        en: "Review admin actions in this app. Which ones lack an audit line? Add one JSON log per missing action.",
        he: "עברו על פעולות admin באפליקציה. אילו חסרות שורת audit? הוסיפו לוג JSON אחד לכל פעולה חסרה.",
      },
      {
        en: "Harden logging: never write passwords or full card numbers into the audit log. Show a safe sample line.",
        he: "חזקו את הלוגינג: לעולם לא לכתוב סיסמאות או מספרי כרטיס מלאים ל-audit log. הראו שורת דוגמה בטוחה.",
      },
    ],
  },
};
