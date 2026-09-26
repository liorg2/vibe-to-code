import type { TopicExtra } from "./types";

export const extras: Record<string, TopicExtra> = {
  DOM: {
    look: [
      {
        cap: {
          en: "HTML tags become boxes the browser can show and click.",
          he: "תגיות HTML הופכות לקופסאות שהדפדפן מציג ואפשר ללחוץ עליהן.",
        },
        code: `<h1>Hello</h1>
<p>This is a paragraph.</p>
<button>Click me</button>`,
        preview: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>DOM</title>
<style>
body{font-family:system-ui,sans-serif;margin:1.5rem;background:#f8fafc;color:#0f172a}
h1{font-size:1.5rem;margin:0 0 .5rem}
p{margin:0 0 1rem;color:#334155}
button{padding:.5rem 1rem;border:1px solid #cbd5e1;border-radius:6px;background:#fff;cursor:pointer}
</style>
</head>
<body>
<h1>Hello</h1>
<p>This is a paragraph.</p>
<button>Click me</button>
</body>
</html>`,
      },
    ],
    prompts: [
      {
        en: "Show me a tiny HTML fragment with one heading, one paragraph, and one button. Keep it under ten lines and explain each tag in one short sentence.",
        he: "תראו לי קטע HTML קטן עם כותרת אחת, פסקה אחת וכפתור אחד. תשמרו על פחות מעשר שורות ותסבירו כל תגית במשפט קצר אחד.",
      },
      {
        en: "Given this HTML, write three lines that find the button in the DOM and change its text to Done. Use plain JavaScript only.",
        he: "בהינתן ה-HTML הזה, כתבו שלוש שורות שמוצאות את הכפתור ב-DOM ומשנות את הטקסט שלו ל-Done. רק JavaScript רגיל.",
      },
      {
        en: "Draw a one-line tree of the DOM for a page with html, body, h1, and p. Label parent and child in plain words.",
        he: "ציירו בעץ של שורה אחת את ה-DOM לדף עם html, body, h1 ו-p. סמנו parent ו-child במילים פשוטות.",
      },
    ],
  },

  "Accessibility (a11y)": {
    look: [
      {
        cap: {
          en: "A real button and a labeled input work with keyboard and screen readers.",
          he: "כפתור אמיתי ושדה עם label עובדים עם מקלדת וקורא מסך.",
        },
        code: `<button type="button">Save</button>

<label for="email">Email</label>
<input id="email" type="email" name="email" />`,
        preview: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>a11y</title>
<style>
body{font-family:system-ui,sans-serif;margin:1.5rem;background:#f8fafc;color:#0f172a}
label{display:block;margin:1rem 0 .35rem;font-size:.9rem}
input{padding:.5rem;border:1px solid #cbd5e1;border-radius:6px;width:12rem}
button{margin-top:.25rem;padding:.5rem 1rem;border:1px solid #94a3b8;border-radius:6px;background:#fff}
button{outline:3px solid #2563eb}
</style>
</head>
<body>
<button type="button">Save</button>
<label for="email">Email</label>
<input id="email" type="email" name="email" />
</body>
</html>`,
      },
    ],
    prompts: [
      {
        en: "Rewrite this clickable div as a real button element. Show the before and after snippet side by side in under twelve lines.",
        he: "שכתבו את ה-div הניתן ללחיצה כאלמנט button אמיתי. הראו before ו-after זה לצד זה בפחות משתים-עשרה שורות.",
      },
      {
        en: "Connect a label to an email input with for and id. Paste the two tags and one sentence on why placeholders are not enough.",
        he: "חברו label לשדה email עם for ו-id. הדביקו את שתי התגיות ומשפט אחד למה placeholder לא מספיק.",
      },
      {
        en: "List three Tab-key checks for this form: focus visible, order makes sense, and every control is reachable. Keep it to three bullets.",
        he: "רשמו שלוש בדיקות Tab לטופס הזה: focus נראה, הסדר הגיוני, וכל פקד נגיש. שלוש נקודות בלבד.",
      },
    ],
  },

  "The main thread": {
    look: [
      {
        cap: {
          en: "One queue handles clicks, timers, and your code — then paints.",
          he: "תור אחד מטפל בלחיצות, טיימרים ובקוד שלכם — ואז מצייר.",
        },
        code: `// main thread, one task at a time
1. click handler runs
2. heavy loop blocks ~2s
3. paint waits until loop ends
// fix: move heavy work off this queue`,
      },
    ],
    prompts: [
      {
        en: "Write a five-line comment that explains why a two-second loop freezes buttons until it finishes on the main thread.",
        he: "כתבו הערה בחמש שורות שמסבירה למה לולאה של שתי שניות מקפיאה כפתורים עד שהיא נגמרת על ה-main thread.",
      },
      {
        en: "Suggest one tiny change: split a long loop with await setTimeout so the browser can paint between chunks. Show the diff.",
        he: "הציעו שינוי קטן אחד: לפצל לולאה ארוכה עם await setTimeout כדי שהדפדפן יוכל לצייר בין חתיכות. הראו את ה-diff.",
      },
      {
        en: "In three sentences, when should we use a Web Worker instead of running math on the main thread?",
        he: "בשלושה משפטים, מתי כדאי להשתמש ב-Web Worker במקום להריץ חישובים על ה-main thread?",
      },
    ],
  },

  "Client state": {
    look: [
      {
        cap: {
          en: "State is data the UI remembers and redraws from.",
          he: "State הוא מידע שה-UI זוכר ומצייר ממנו מחדש.",
        },
        code: `const [cartCount, setCartCount] = useState(0);

function addToCart() {
  setCartCount(cartCount + 1); // UI re-renders
}`,
      },
    ],
    prompts: [
      {
        en: "Show a three-line useState example for a cart count that starts at zero and increments when Add is clicked.",
        he: "הראו דוגמת useState בת שלוש שורות למונה עגלה שמתחיל באפס ועולה בלחיצה על Add.",
      },
      {
        en: "Write a tiny diff that lifts local button state into shared cart state used by a badge and a total line.",
        he: "כתבו diff קטן שמעלה state מקומי של כפתור ל-state משותף של עגלה שמשמש תג ושורת סכום.",
      },
      {
        en: "In four sentences, explain why mutating a variable without setState leaves the screen lying about the cart.",
        he: "בארבעה משפטים, הסבירו למה שינוי משתנה בלי setState משאיר את המסך משקר לגבי העגלה.",
      },
    ],
  },

  "SPA vs SSR vs static": {
    look: [
      {
        cap: {
          en: "Where HTML is built: browser, server on each request, or ahead of time.",
          he: "איפה נבנה ה-HTML: בדפדפן, בשרת בכל בקשה, או מראש.",
        },
        code: `SPA:    server sends shell → browser builds UI
SSR:    server builds HTML per request → browser hydrates
static: HTML files built once at deploy time`,
      },
    ],
    prompts: [
      {
        en: "Make a three-row table comparing SPA, SSR, and static: who builds the first HTML, and one good use case each.",
        he: "עשו טבלה בת שלוש שורות שמשווה SPA, SSR ו-static: מי בונה את ה-HTML הראשון, ושימוש טוב אחד לכל אחד.",
      },
      {
        en: "For a marketing landing page, recommend static or SSR in two sentences and name one reason against SPA.",
        he: "לדף נחיתה שיווקי, המליצו על static או SSR בשני משפטים וציינו סיבה אחת נגד SPA.",
      },
      {
        en: "Write a six-line comment block that a beginner can paste above a Next.js route explaining SPA vs SSR in plain words.",
        he: "כתבו בלוק הערות בן שש שורות שמתחילים יכולים להדביק מעל route ב-Next.js שמסביר SPA מול SSR במילים פשוטות.",
      },
    ],
  },

  "Bundler & build step": {
    look: [
      {
        cap: {
          en: "Source files go in; one optimized bundle comes out.",
          he: "קבצי מקור נכנסים; יוצא bundle אחד מותאם.",
        },
        code: `# before (many files for the browser)
src/app.tsx
src/button.tsx
src/styles.css

# after build
dist/assets/app-a1b2.js
dist/assets/app-a1b2.css`,
      },
    ],
    prompts: [
      {
        en: "Explain in four sentences what a bundler does when npm run build turns many source files into assets in dist.",
        he: "הסבירו בארבעה משפטים מה bundler עושה כש-npm run build הופך הרבה קבצי מקור לנכסים ב-dist.",
      },
      {
        en: "List three things the build step often does: minify, tree-shake, and hash filenames. One line each.",
        he: "רשמו שלושה דברים ששלב ה-build לרוב עושה: minify, tree-shake, ו-hash לשמות קבצים. שורה לכל אחד.",
      },
      {
        en: "Write a beginner prompt I can paste to the AI: map our package.json scripts for dev versus production build.",
        he: "כתבו prompt למתחילים שאפשר להדביק ל-AI: למפות את הסקריפטים ב-package.json ל-dev מול production build.",
      },
    ],
  },

  "Forms & validation": {
    look: [
      {
        cap: {
          en: "required stops empty email; a message tells the user what to fix.",
          he: "required עוצר email ריק; הודעה אומרת למשתמש מה לתקן.",
        },
        code: `<form>
  <label for="email">Email</label>
  <input id="email" type="email" name="email" required />
  <button type="submit">Join</button>
  <p class="error">Enter an email</p>
</form>`,
        preview: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>Form</title>
<style>
body{font-family:system-ui,sans-serif;margin:1.5rem;background:#f8fafc;color:#0f172a}
label{display:block;margin-bottom:.35rem;font-size:.9rem}
input{padding:.5rem;border:1px solid #cbd5e1;border-radius:6px;width:14rem}
button{display:block;margin-top:.75rem;padding:.5rem 1rem;border:0;border-radius:6px;background:#2563eb;color:#fff}
.error{color:#dc2626;margin:.75rem 0 0;font-size:.9rem}
</style>
</head>
<body>
<form>
  <label for="email">Email</label>
  <input id="email" type="email" name="email" required />
  <button type="submit">Join</button>
  <p class="error">Enter an email</p>
</form>
</body>
</html>`,
      },
    ],
    prompts: [
      {
        en: "Write a small HTML form with an email input that has required, a submit button, and a red error line under it.",
        he: "כתבו טופס HTML קטן עם שדה email שיש לו required, כפתור שליחה, ושורת שגיאה אדומה מתחת.",
      },
      {
        en: "Show a three-line server check that rejects a missing email even if the browser skipped required. Plain TypeScript.",
        he: "הראו בדיקת שרת בת שלוש שורות שדוחה email חסר גם אם הדפדפן דילג על required. TypeScript פשוט.",
      },
      {
        en: "Ask the AI for a diff that adds type=email and required to this signup form, and a matching error message paragraph.",
        he: "בקשו מה-AI diff שמוסיף type=email ו-required לטופס ההרשמה הזה, ופסקת הודעת שגיאה תואמת.",
      },
    ],
  },

  "Status codes": {
    look: [
      {
        cap: {
          en: "The number tells you how the request went.",
          he: "המספר אומר איך הבקשה הסתיימה.",
        },
        code: `200  OK — the request worked as expected
301  Moved — please use this other address
404  Not Found — there is no matching resource
401  Unauthorized — please sign in before continuing
500  Server Error — something broke on our server`,
      },
    ],
    prompts: [
      {
        en: "List five status codes — 200, 301, 404, 401, 500 — each with a five-word meaning a beginner can memorize.",
        he: "רשמו חמישה קודי status — 200, 301, 404, 401, 500 — לכל אחד משמעות בחמש מילים שמתחיל יכול לזכור.",
      },
      {
        en: "Write a three-line handler snippet that returns 404 when a product id is missing from the database.",
        he: "כתבו קטע handler בן שלוש שורות שמחזיר 404 כש-id של מוצר חסר במסד הנתונים.",
      },
      {
        en: "Ask the AI to classify this API error log into client mistakes versus server bugs using status code ranges.",
        he: "בקשו מה-AI לסווג את לוג השגיאות הזה של ה-API לטעויות לקוח מול באגים בשרת לפי טווחי status code.",
      },
    ],
  },

  REST: {
    look: [
      {
        cap: {
          en: "REST uses URLs for things and HTTP methods for actions.",
          he: "REST משתמש בכתובות לדברים וב-HTTP methods לפעולות.",
        },
        code: `/api/users       collection
/api/users/15    one user
GET = read   POST = create
PUT/PATCH = update   DELETE = remove`,
      },
    ],
    prompts: [
      {
        en: "Sketch a tiny REST map for users: collection path, item path, and which method creates versus deletes. Six lines max.",
        he: "שרטטו מפת REST קטנה למשתמשים: נתיב אוסף, נתיב פריט, ואיזה method יוצר מול מוחק. לכל היותר שש שורות.",
      },
      {
        en: "Rewrite these two RPC-style paths into REST: /getUser?id=15 and /createUser. Show before and after only.",
        he: "שכתבו את שני נתיבי ה-RPC האלה ל-REST: /getUser?id=15 ו-/createUser. הראו רק before ו-after.",
      },
      {
        en: "Ask the AI whether our /api routes look RESTful and list three concrete renames if they do not.",
        he: "בקשו מה-AI אם ה-routes של /api נראים RESTful, ושימנו שלושה שינויי שם קונקרטיים אם לא.",
      },
    ],
  },

  Webhook: {
    look: [
      {
        cap: {
          en: "Their server POSTs you when something happened.",
          he: "השרת שלהם עושה לכם POST כשמשהו קרה.",
        },
        code: `POST /api/billing/webhook HTTP/1.1
Content-Type: application/json

{
  "id": "evt_9f3a2c",
  "type": "payment.completed",
  "amount": 49
}`,
      },
    ],
    prompts: [
      {
        en: "Write one fake payment webhook POST body with id, type payment.completed, and amount. Under twelve lines of JSON.",
        he: "כתבו גוף POST אחד מזויף של webhook תשלום עם id, type payment.completed ו-amount. פחות משתים-עשרה שורות JSON.",
      },
      {
        en: "In four sentences, explain why a webhook handler must answer fast and stay safe if the same event arrives twice.",
        he: "בארבעה משפטים, הסבירו למה handler של webhook חייב לענות מהר ולהישאר בטוח אם אותו אירוע מגיע פעמיים.",
      },
      {
        en: "Ask the AI for a three-line checklist to verify our webhook URL, secret header, and idempotent handling of evt ids.",
        he: "בקשו מה-AI רשימת בדיקה בת שלוש שורות לוודא את כתובת ה-webhook, header הסוד, וטיפול idempotent ב-evt ids.",
      },
    ],
  },
};
