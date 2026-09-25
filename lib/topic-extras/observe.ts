import type { TopicExtra } from "./types";

export const extras: Record<string, TopicExtra> = {
  "Structured logs": {
    look: [
      {
        cap: {
          en: "One log line, fields you can filter",
          he: "שורה אחת של לוג, עם שדות שאפשר לסנן",
        },
        code: `{"level":"info","msg":"order created","request_id":"req_8f3a"}`,
      },
    ],
    prompts: [
      {
        en: "Scan this project for console.log and printf-style logs. Show me three places to turn into one JSON line with level, msg, and request_id.",
        he: "סרקו את הפרויקט אחרי console.log ולוגים בסגנון printf. הראו שלושה מקומות להפוך לשורת JSON אחת עם level, msg ו-request_id.",
      },
      {
        en: "Write a tiny helper that logs one JSON object per line. Fields: level, msg, request_id. No pretty-print, no nested objects.",
        he: "כתבו helper קטן שכותב אובייקט JSON אחד בכל שורה. שדות: level, msg, request_id. בלי pretty-print ובלי אובייקטים מקוננים.",
      },
      {
        en: "Given this free-text error log, rewrite it as structured JSON and list three filters I could run in a log viewer.",
        he: "בהינתן לוג שגיאה בטקסט חופשי, כתבו אותו מחדש כ-JSON מובנה ורשמו שלושה פילטרים שאפשר להריץ בצופה לוגים.",
      },
    ],
  },

  Metrics: {
    look: [
      {
        cap: {
          en: "Counter, gauge, histogram — each with a number",
          he: "Counter, gauge ו-histogram — לכל אחד מספר",
        },
        code: `orders_total 1842
cpu_percent 67
request_duration_ms 45`,
      },
    ],
    prompts: [
      {
        en: "List five metrics for a checkout API. Mark each as counter, gauge, or histogram, and say what a rising number would mean.",
        he: "רשמו חמישה metrics ל-API של checkout. סמנו כל אחד כ-counter, gauge או histogram, והסבירו מה עלייה במספר אומרת.",
      },
      {
        en: "Add the smallest metric export to this service: one counter for requests and one gauge for open connections. Keep it under twenty lines.",
        he: "הוסיפו את ה-metric export הקטן ביותר לשירות הזה: counter אחד לבקשות ו-gauge אחד לחיבורים פתוחים. עד עשרים שורות.",
      },
      {
        en: "I only have logs today. Which three log fields could become metrics, and which type should each be?",
        he: "יש לי היום רק לוגים. אילו שלושה שדות לוג יכולים להפוך ל-metrics, ואיזה סוג מתאים לכל אחד?",
      },
    ],
  },

  Alert: {
    look: [
      {
        cap: {
          en: "A rule that pages a human",
          he: "כלל שמעיר אדם",
        },
        code: `error_rate > 2% for 5m -> page`,
      },
    ],
    prompts: [
      {
        en: "Draft one alert for this service: a clear condition, a five-minute window, and who gets paged. No dashboard noise — only something that wakes a person.",
        he: "נסחו alert אחד לשירות הזה: תנאי ברור, חלון של חמש דקות, ומי מקבל page. בלי רעש ב-dashboard — רק משהו שמעיר אדם.",
      },
      {
        en: "Review these five alerts and mark which are pages versus tickets. Rewrite the flaky ones so they fire only when a human must act.",
        he: "עברו על חמשת ה-alerts האלה וסמנו מה page ומה ticket. שכתבו את הרופפים כך שיירו רק כשאדם חייב לפעול.",
      },
      {
        en: "Propose an alert for error_rate above two percent for five minutes. Include the metric name and a one-line runbook first step.",
        he: "הציעו alert ל-error_rate מעל שני אחוז במשך חמש דקות. כללו את שם ה-metric וצעד ראשון של שורה אחת ב-runbook.",
      },
    ],
  },

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

  Dashboard: {
    look: [
      {
        cap: {
          en: "Four numbers that answer is it okay",
          he: "ארבעה מספרים שעונים האם הכל בסדר",
        },
        code: `requests/min     420
error rate        0.4%
p95 latency     180ms
active users     1,204`,
      },
    ],
    prompts: [
      {
        en: "Design a one-screen dashboard for this API with at most four panels. Name each metric and the question it answers in one sentence.",
        he: "עצבו dashboard של מסך אחד ל-API הזה עם ארבעה פאנלים לכל היותר. תנו שם לכל metric ולשאלה שהוא עונה עליה במשפט אחד.",
      },
      {
        en: "I pasted a week of metrics. Suggest a dashboard layout a non-engineer can read in thirty seconds during an incident.",
        he: "הדבקתי שבוע של metrics. הציעו פריסת dashboard שאדם שאינו מהנדס יכול לקרוא בשלושים שניות בזמן תקלה.",
      },
      {
        en: "Trim this dashboard from twelve panels to four. Explain which panels to delete and what signal we keep.",
        he: "קצצו את ה-dashboard הזה משנים-עשר פאנלים לארבעה. הסבירו אילו למחוק ואיזה אות שומרים.",
      },
    ],
  },

  "Health check & uptime monitor": {
    look: [
      {
        cap: {
          en: "A probe that only asks are you up",
          he: "בדיקה ששואלת רק האם אתם חיים",
        },
        code: `GET /health -> 200 {"ok":true}`,
      },
    ],
    prompts: [
      {
        en: "Add a GET /health endpoint that returns 200 and {\"ok\":true} when the process is up. Do not check the database yet — keep it dumb.",
        he: "הוסיפו endpoint של GET /health שמחזיר 200 ו-{\"ok\":true} כשהתהליך חי. אל תבדקו עדיין את ה-database — השאירו את זה פשוט.",
      },
      {
        en: "Set up an external uptime check that hits /health every minute and emails us if three checks fail. List the settings only.",
        he: "הגדירו בדיקת uptime חיצונית שפוגעת ב-/health כל דקה ושולחת מייל אחרי שלושה כישלונות. רשמו רק את ההגדרות.",
      },
      {
        en: "Explain the difference between /health for a load balancer and a deep check that touches the database. When should each fail?",
        he: "הסבירו את ההבדל בין /health ל-load balancer לבין בדיקה עמוקה שנוגעת ב-database. מתי כל אחת צריכה להיכשל?",
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

  "Pageview vs event": {
    look: [
      {
        cap: {
          en: "A page load is not a click",
          he: "טעינת עמוד זה לא לחיצה",
        },
        code: `pageview  path=/pricing
event     name=plan_selected  plan=pro`,
      },
    ],
    prompts: [
      {
        en: "For this signup flow, list which steps are pageviews and which are events. Name each event in snake_case and say what property it needs.",
        he: "עבור תהליך ה-signup הזה, רשמו אילו שלבים הם pageviews ואילו events. תנו לכל event שם ב-snake_case ואמרו איזה property הוא צריך.",
      },
      {
        en: "I only track pageviews today. Propose three events that would tell me why people leave pricing, without adding PII fields.",
        he: "היום אני עוקב רק אחרי pageviews. הציעו שלושה events שיגידו למה עוזבים את pricing, בלי שדות PII.",
      },
      {
        en: "Explain pageview versus event using this site map. Give one example of each and when a dashboard should use which.",
        he: "הסבירו pageview מול event לפי מפת האתר הזו. תנו דוגמה אחת לכל סוג ומתי dashboard צריך להשתמש בכל אחד.",
      },
    ],
  },

  "Funnel & drop-off": {
    look: [
      {
        cap: {
          en: "Four steps, shrinking counts",
          he: "ארבעה שלבים, מספרים קטנים",
        },
        code: `visit      1000
signup      400
activate     80
paid         30`,
      },
    ],
    prompts: [
      {
        en: "Build a four-step funnel for this product with counts like visit, signup, activate, paid. Show drop-off percent between each step.",
        he: "בנו funnel של ארבעה שלבים למוצר עם ספירות כמו visit, signup, activate, paid. הראו אחוז drop-off בין כל שלב.",
      },
      {
        en: "Our funnel drops hardest between signup and activate. Suggest three product questions and which event would answer each.",
        he: "ה-funnel שלנו נופל הכי חזק בין signup ל-activate. הציעו שלוש שאלות מוצר ואיזה event יענה על כל אחת.",
      },
      {
        en: "Given these step counts, point at the worst drop-off and write one paste-ready prompt to ask an AI why it might happen.",
        he: "בהינתן ספירות השלבים האלה, סמנו את ה-drop-off הגרוע ביותר וכתבו פרומפט אחד מוכן להדבקה שישאל AI למה זה קורה.",
      },
    ],
  },

  "Tracking without PII": {
    look: [
      {
        cap: {
          en: "Useful event, no email, no name",
          he: "event שימושי, בלי email ובלי שם",
        },
        code: `{"event":"plan_selected","user_id":"u_91c2","plan":"pro","source":"pricing"}`,
      },
    ],
    prompts: [
      {
        en: "Audit this tracking plan for PII. Flag email, name, phone, and IP. Rewrite each bad property as a safe id or category.",
        he: "בדקו את תוכנית ה-tracking הזו ל-PII. סמנו email, name, phone ו-IP. שכתבו כל property רע כ-id בטוח או קטגוריה.",
      },
      {
        en: "Design one signup_completed event with no email and no name. Use an opaque user_id and two non-personal properties only.",
        he: "עצבו event אחד בשם signup_completed בלי email ובלי שם. השתמשו ב-user_id אטום ובשני properties לא אישיים בלבד.",
      },
      {
        en: "Show a before and after of this analytics payload: strip PII, keep the product signal, and explain what we lost and what we kept.",
        he: "הראו before ו-after ל-payload האנליטיקה הזה: הסירו PII, שמרו את אות המוצר, והסבירו מה איבדנו ומה שמרנו.",
      },
    ],
  },

  "Tracing & correlation id": {
    look: [
      {
        cap: {
          en: "One id follows the request",
          he: "מזהה אחד עוקב אחרי הבקשה",
        },
        code: `request_id: req_8f3a
api     started checkout
worker  charged card
email   sent receipt
(all lines share req_8f3a)`,
      },
    ],
    prompts: [
      {
        en: "Add a request_id to every log line in this handler. Generate it once at the edge and pass it into the worker call.",
        he: "הוסיפו request_id לכל שורת לוג ב-handler הזה. יצרו אותו פעם אחת בקצה והעבירו אותו לקריאת ה-worker.",
      },
      {
        en: "I have three services and scattered logs. Propose the smallest correlation-id scheme: header name, format, and where to read it.",
        he: "יש לי שלושה שירותים ולוגים מפוזרים. הציעו את סכמת ה-correlation-id הקטנה ביותר: שם header, פורמט, ואיפה לקרוא אותו.",
      },
      {
        en: "Given this broken order, tell me which logs to pull by request_id and what order to read them to find the failing hop.",
        he: "בהינתן ההזמנה השבורה הזו, אמרו אילו לוגים לשלוף לפי request_id ובאיזה סדר לקרוא אותם כדי למצוא את הקפיצה שנכשלה.",
      },
    ],
  },

  "SLO & error budget": {
    look: [
      {
        cap: {
          en: "99.9% leaves a small monthly budget",
          he: "99.9% משאיר תקציב חודשי קטן",
        },
        code: `SLO: 99.9% uptime
error budget: about 43 minutes a month`,
      },
    ],
    prompts: [
      {
        en: "Pick an SLO for this API between 99% and 99.9%. Convert it to minutes of downtime per month and say when we pause feature work.",
        he: "בחרו SLO ל-API הזה בין 99% ל-99.9%. המירו לדקות downtime בחודש ואמרו מתי עוצרים עבודת פיצ'רים.",
      },
      {
        en: "We burned half our monthly error budget in two days. Draft a short note to the team: what freezes, what still ships, and why.",
        he: "שרפנו חצי מ-error budget החודשי ביומיים. נסחו הודעה קצרה לצוות: מה קופא, מה עדיין יוצא, ולמה.",
      },
      {
        en: "Explain 99.9% and about 43 minutes a month using our traffic. Is that SLO too strict for a side project?",
        he: "הסבירו 99.9% וכ-43 דקות בחודש לפי התעבורה שלנו. האם ה-SLO הזה מחמיר מדי לפרויקט צד?",
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

  "Scaling up vs out": {
    look: [
      {
        cap: {
          en: "Bigger box versus more boxes",
          he: "קופסה גדולה מול עוד קופסאות",
        },
        code: `scale up:  4 CPU -> 16 CPU  (one machine)
scale out: 1 server -> 3 servers (same code)`,
      },
    ],
    prompts: [
      {
        en: "Our database CPU is at 90%. Compare scaling up versus out for this stack. Recommend one next step under four hundred dollars a month.",
        he: "ה-CPU של ה-database ב-90%. השוו scaling up מול out עבור ה-stack הזה. המליצו על צעד הבא אחד מתחת לארבע מאות דולר לחודש.",
      },
      {
        en: "Before we add servers, list what in this code assumes there is only one machine. Flag in-memory sessions and local file uploads.",
        he: "לפני שמוסיפים שרתים, רשמו מה בקוד מניח שיש מכונה אחת בלבד. סמנו sessions בזיכרון והעלאות קבצים מקומיות.",
      },
      {
        en: "Explain scaling up versus out like a bakery: bigger oven or second shop. Then map each option to our current deploy.",
        he: "הסבירו scaling up מול out כמו מאפייה: תנור גדול יותר או סניף שני. אחר כך מיפו כל אפשרות ל-deploy הנוכחי שלנו.",
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

  "Queue / worker": {
    look: [
      {
        cap: {
          en: "API enqueues, worker does the slow work",
          he: "ה-API מכניס ל-queue, ה-worker עושה את העבודה האיטית",
        },
        code: `API:    enqueue send_email job
queue:  [job_41, job_42]
worker: pop job_41 -> send email`,
      },
    ],
    prompts: [
      {
        en: "Move this slow email send off the request path into a queue and worker. Show the API response and the worker function only.",
        he: "העבירו את שליחת המייל האיטית מחוץ לנתיב הבקשה ל-queue ו-worker. הראו רק את תשובת ה-API ואת פונקציית ה-worker.",
      },
      {
        en: "Design the smallest queue for PDF exports: job payload fields, retry count, and what the API returns while the worker runs.",
        he: "עצבו את ה-queue הקטן ביותר לייצוא PDF: שדות ה-payload של ה-job, מספר retry, ומה ה-API מחזיר בזמן שה-worker רץ.",
      },
      {
        en: "List three tasks in this codebase that should use a queue. For each, say why doing it inside the HTTP request is a bad idea.",
        he: "רשמו שלוש משימות בקוד שצריכות queue. לכל אחת, אמרו למה לעשות אותה בתוך בקשת HTTP זה רעיון רע.",
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

  "Technical debt": {
    prompts: [
      {
        en: "Walk this folder and list the top five technical-debt items a new teammate would trip on. Rank by time tax on every future change.",
        he: "עברו על התיקייה ורשמו את חמשת פריטי ה-technical debt שחבר צוות חדש ייכשל בהם. דרגו לפי מס הזמן על כל שינוי עתידי.",
      },
      {
        en: "Before we add features, ask what we can delete. Propose three deletions that cut debt without changing user-visible behavior.",
        he: "לפני שמוסיפים פיצ'רים, שאלו מה אפשר למחוק. הציעו שלוש מחיקות שמקטינות debt בלי לשנות התנהגות גלויה למשתמש.",
      },
      {
        en: "Turn this rush shortcut into a tracked debt item: what we skipped, the interest we pay weekly, and a date to repay or accept it.",
        he: "הפכו את קיצור הדרך מהלחץ לפריט debt במעקב: מה דילגנו, הריבית שמשלמים כל שבוע, ותאריך להחזיר או לקבל את זה.",
      },
    ],
  },

  "Load balancer": {
    look: [
      {
        cap: {
          en: "One door, many identical servers",
          he: "דלת אחת, הרבה שרתים זהים",
        },
        code: `client -> load balancer
              |-- server A
              |-- server B
              |-- server C`,
      },
    ],
    prompts: [
      {
        en: "Explain how to put two copies of this web app behind a load balancer. List health-check URL, sticky sessions risk, and DNS change.",
        he: "הסבירו איך לשים שתי עותקים של אפליקציית ה-web מאחורי load balancer. רשמו URL של health-check, סיכון sticky sessions, ושינוי DNS.",
      },
      {
        en: "Draft the smallest load-balancer config for this service: round-robin, /health probe, and what happens when one server fails.",
        he: "נסחו את קונפיג ה-load balancer הקטן ביותר לשירות: round-robin, בדיקת /health, ומה קורה כששרת אחד נופל.",
      },
      {
        en: "We added a second server but users still stick to one. Diagnose sticky sessions and session memory as causes, with fixes.",
        he: "הוספנו שרת שני אבל משתמשים עדיין נצמדים לאחד. אבחנו sticky sessions וזיכרון session כסיבות, עם תיקונים.",
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
