import type { TopicExtra } from "./types";

export const extras: Record<string, TopicExtra> = {
  "Error tracking": {
    look: [
      {
        cap: {
          en: "One crash, grouped by fingerprint",
          he: "קריסה אחת, מקובצת לפי fingerprint",
        },
        code: `ERROR TypeError: Cannot read 'id' of undefined
  at checkout (/app/pay.js:42)
  users affected: 12
  first seen: 10:04
  last seen: 10:11`,
      },
    ],
    prompts: [
      {
        en: "Wire the smallest error tracker into this app: catch unhandled errors, send stack and release version, skip localhost. Show the install steps only.",
        he: "חברו את ה-error tracker הקטן ביותר לאפליקציה: תפסו שגיאות לא מטופלות, שלחו stack וגרסת release, דלגו על localhost. רק שלבי התקנה.",
      },
      {
        en: "Here is a raw stack trace. Group it the way an error tracker would, name the fingerprint in plain words, and list what to fix first.",
        he: "הנה stack trace גולמי. קבצו אותו כמו error tracker, תנו ל-fingerprint שם במילים פשוטות, ורשמו מה לתקן קודם.",
      },
      {
        en: "Compare logging an error versus opening an error-tracking issue. When do I need both, and what fields must each include?",
        he: "השוו בין לוג של שגיאה לבין פתיחת issue ב-error tracking. מתי צריך את שניהם, ואילו שדות חובה בכל אחד?",
      },
    ],
  },

  Postmortem: {
    look: [
      {
        cap: {
          en: "What broke, what we change",
          he: "מה נשבר, מה משנים",
        },
        code: `Incident: checkout 5xx — 2026-03-12
Impact: 18 min, ~200 failed pays
Cause: bad deploy, null price
Fix: revert + null check
Action: add alert on 5xx spike`,
      },
    ],
    prompts: [
      {
        en: "Turn these incident notes into a short postmortem: timeline, impact, root cause, and three action items with owners left blank.",
        he: "הפכו את הערות התקלה ל-postmortem קצר: ציר זמן, השפעה, סיבת שורש, ושלושה action items עם בעלים ריקים.",
      },
      {
        en: "Rewrite this blamey postmortem so it is blameless. Keep the facts, drop the names, and end with fixes we can ship this week.",
        he: "שכתבו את ה-postmortem המאשים הזה כך שיהיה בלי האשמות. השאירו עובדות, הסירו שמות, וסיימו בתיקונים שאפשר לשלוח השבוע.",
      },
      {
        en: "Given this outage chat log, extract a one-page postmortem a product manager can read. No jargon without a plain-word gloss.",
        he: "בהינתן לוג הצ'אט של ה-outage, חלצו postmortem של עמוד אחד שמנהל מוצר יכול לקרוא. בלי מונחים בלי הסבר במילים פשוטות.",
      },
    ],
  },

  "Retention & cohort": {
    look: [
      {
        cap: {
          en: "Same signup week, later return rate",
          he: "אותו שבוע הרשמה, שיעור חזרה אחר כך",
        },
        code: `cohort week-12 signup=200
  day 1 return  40%
  day 7 return  18%
  day 30 return  9%`,
      },
    ],
    prompts: [
      {
        en: "Define retention for this product in one sentence, then show a tiny cohort table for two signup weeks at day 1, 7, and 30.",
        he: "הגדירו retention למוצר במשפט אחד, ואז הראו טבלת cohort קטנה לשני שבועות הרשמה ביום 1, 7 ו-30.",
      },
      {
        en: "We changed onboarding last Monday. Which cohort comparison proves it helped, and which metrics would fool us?",
        he: "שינינו onboarding ביום שני שעבר. איזו השוואת cohort תוכיח שעזר, ואילו metrics יטעו אותנו?",
      },
      {
        en: "Write a SQL-shaped sketch or plain steps to build a signup-week cohort and day-7 retention. Keep it beginner-simple.",
        he: "כתבו סקיצה בסגנון SQL או צעדים פשוטים לבניית cohort לפי שבוע הרשמה ו-retention ליום 7. השאירו את זה פשוט למתחילים.",
      },
    ],
  },

  Stateless: {
    look: [
      {
        cap: {
          en: "Any server can take the next request",
          he: "כל שרת יכול לקחת את הבקשה הבאה",
        },
        code: `# bad:  session = memory[user]
# good: session = db.get(user)
# any instance can answer`,
      },
    ],
    prompts: [
      {
        en: "Scan this app for state kept in process memory between requests. List each spot and the smallest fix to store it outside the server.",
        he: "סרקו את האפליקציה אחרי state שנשמר בזיכרון התהליך בין בקשות. רשמו כל מקום ואת התיקון הקטן ביותר לאחסן מחוץ לשרת.",
      },
      {
        en: "We want two identical web servers behind a load balancer. What must become stateless first, and what can wait?",
        he: "אנחנו רוצים שני שרתי web זהים מאחורי load balancer. מה חייב להיות stateless קודם, ומה יכול לחכות?",
      },
      {
        en: "Rewrite this login flow so the session cookie is the only client secret and the server reads session data from a shared store.",
        he: "שכתבו את זרימת ה-login כך ש-cookie של ה-session הוא הסוד היחיד אצל הלקוח, והשרת קורא את נתוני ה-session מחנות משותפת.",
      },
    ],
  },

  Idempotency: {
    look: [
      {
        cap: {
          en: "Same key twice, one charge",
          he: "אותו מפתח פעמיים, חיוב אחד",
        },
        code: `POST /charge
Idempotency-Key: pay_77

# first call  -> charged once
# second call -> same result, no second charge`,
      },
    ],
    prompts: [
      {
        en: "Add Idempotency-Key support to this charge endpoint so a double click charges once. Show storage of key to response for twenty-four hours.",
        he: "הוסיפו תמיכה ב-Idempotency-Key ל-endpoint החיוב כדי שלחיצה כפולה תחייב פעם אחת. הראו שמירת key לתשובה לעשרים וארבע שעות.",
      },
      {
        en: "Write a test plan: same Idempotency-Key twice must return one charge. Include the headers and the expected database row count.",
        he: "כתבו תוכנית בדיקה: אותו Idempotency-Key פעמיים חייב להחזיר חיוב אחד. כללו את ה-headers ואת מספר השורות הצפוי ב-database.",
      },
      {
        en: "Explain idempotency for a beginner using a pay button. Then point at where this API is unsafe on retry.",
        he: "הסבירו idempotency למתחילים עם כפתור תשלום. אחר כך סמנו איפה ה-API הזה לא בטוח ב-retry.",
      },
    ],
  },

  "Rate limiting": {
    look: [
      {
        cap: {
          en: "Too many requests, try later",
          he: "יותר מדי בקשות, נסו אחר כך",
        },
        code: `HTTP/1.1 429 Too Many Requests
Retry-After: 30`,
      },
    ],
    prompts: [
      {
        en: "Add a simple rate limit: one hundred requests per IP per minute, respond with 429 and Retry-After: 30. Show the middleware only.",
        he: "הוסיפו rate limit פשוט: מאה בקשות ל-IP בדקה, החזירו 429 ו-Retry-After: 30. הראו רק את ה-middleware.",
      },
      {
        en: "Our public API is getting scraped. Propose rate limits for anonymous versus logged-in users, and what body to return on 429.",
        he: "ה-API הציבורי נסרק. הציעו rate limits לאנונימי מול משתמש מחובר, ומה להחזיר בגוף התשובה על 429.",
      },
      {
        en: "Explain how a client should treat HTTP 429 with Retry-After: 30. Give a tiny retry loop that respects that header.",
        he: "הסבירו איך לקוח צריך להתייחס ל-HTTP 429 עם Retry-After: 30. תנו לולאת retry קטנה שמכבדת את ה-header.",
      },
    ],
  },

  "Single point of failure": {
    look: [
      {
        cap: {
          en: "One box dies, everything stops",
          he: "קופסה אחת נופלת, הכול נעצר",
        },
        code: `users -> web -> DB (only one)
                 ^
           if DB dies, site down`,
      },
    ],
    prompts: [
      {
        en: "Draw the path of one request through this system and mark every single point of failure. Rank the top three by blast radius.",
        he: "ציירו את נתיב בקשה אחת במערכת וסמנו כל single point of failure. דרגו את שלושת הראשונים לפי רדיוס הפגיעה.",
      },
      {
        en: "We have one Redis and one primary database. Suggest the cheapest redundancy for each, and what still fails if the region dies.",
        he: "יש לנו Redis אחד ו-database ראשי אחד. הציעו את היתירות הזולה ביותר לכל אחד, ומה עדיין נופל אם ה-region נופל.",
      },
      {
        en: "List SPOFs introduced by our current deploy. For each, one sentence on the smallest mitigation we could ship this month.",
        he: "רשמו SPOFs שה-deploy הנוכחי מכניס. לכל אחד, משפט אחד על ההפחתה הקטנה ביותר שאפשר לשלוח החודש.",
      },
    ],
  },

  "Monolith vs microservices": {
    look: [
      {
        cap: {
          en: "One deploy versus many small ones",
          he: "deploy אחד מול הרבה קטנים",
        },
        code: `monolith:      one app, one deploy
microservices:  orders | pay | email
                (three deploys, three failure modes)`,
      },
    ],
    prompts: [
      {
        en: "We are three people. Argue for keeping a monolith for twelve more months. List what would have to be true before we split services.",
        he: "אנחנו שלושה אנשים. טענו בעד monolith לעוד שנים-עשר חודשים. רשמו מה חייב להיות נכון לפני שמפצלים לשירותים.",
      },
      {
        en: "Map this codebase into bounded contexts. Say which boundaries are real and which would only add network pain as microservices.",
        he: "מפו את הקוד ל-bounded contexts. אמרו אילו גבולות אמיתיים ואילו כ-microservices רק יוסיפו כאב רשת.",
      },
      {
        en: "Compare one monolith deploy versus three microservices for our checkout. Include failure modes and who on-calls each piece.",
        he: "השוו deploy אחד של monolith מול שלושה microservices ל-checkout שלנו. כללו מצבי כשל ומי ב-on-call על כל חלק.",
      },
    ],
  },
};
