import type { TopicExtra } from "./types";

export const extras: Record<string, TopicExtra> = {
  "API key vs OAuth app": {
    look: [
      {
        cap: {
          en: "A secret key in a header vs an app that asks the user",
          he: "מפתח סודי בכותרת מול אפליקציה שמבקשת מהמשתמש",
        },
        code: `# API key — your server talks as itself
Authorization: Bearer sk_test_123

# OAuth app — the user grants access, you get a short-lived token
GET /authorize?client_id=app_42&scope=read:orders
-> redirect with ?code=abc
POST /token  { code: "abc" }
-> { access_token: "tok_user_42" }`,
      },
    ],
    prompts: [
      {
        en: "Explain when an API key is enough and when we need an OAuth app. Give one example of each for a small shop dashboard.",
        he: "הסבירו מתי מספיק API key ומתי צריך OAuth app. תנו דוגמה אחת לכל סוג עבור דשבורד חנות קטן.",
      },
      {
        en: "Review this auth setup and say whether each call should use an API key or an OAuth user token. Point to the exact lines.",
        he: "עברו על הגדרת ה-auth הזו ואמרו לכל קריאה אם צריך API key או OAuth user token. הצביעו על השורות המדויקות.",
      },
      {
        en: "Harden this: list three mistakes beginners make mixing API keys and OAuth, and the smallest fix for each.",
        he: "חזקו את זה: רשמו שלוש טעויות שמתחילים עושים כשמערבבים API keys ו-OAuth, והתיקון הכי קטן לכל אחת.",
      },
    ],
  },

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

  "Timeouts & retries": {
    look: [
      {
        cap: {
          en: "Wait a bit, then try again with more space between tries",
          he: "מחכים קצת, ואז מנסים שוב עם יותר רווח בין ניסיונות",
        },
        code: `async function getOrder(id) {
  for (let i = 0; i < 3; i++) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 5000); // 5s timeout
    try {
      const res = await fetch("/orders/" + id, { signal: ctrl.signal });
      if (res.ok) return res.json();
      if (res.status < 500) throw new Error("no retry"); // 4xx: stop
    } finally {
      clearTimeout(t);
    }
    await sleep(200 * (i + 1)); // 200ms, 400ms, 600ms
  }
}`,
      },
    ],
    prompts: [
      {
        en: "Explain timeout and retry for a payment API call. When is it safe to retry, and when must we stop?",
        he: "הסבירו timeout ו-retry לקריאת API לתשלום. מתי בטוח לנסות שוב, ומתי חייבים לעצור?",
      },
      {
        en: "Review every outbound fetch in this file. Where is the timeout? Which status codes retry? Fix anything missing.",
        he: "עברו על כל fetch יוצא בקובץ הזה. איפה ה-timeout? אילו קודי סטטוס מנסים שוב? תקנו כל מה שחסר.",
      },
      {
        en: "Harden this retry loop: add a max of 3 tries, backoff, and never retry POST that creates an order twice.",
        he: "חזקו את לולאת ה-retry: מקסימום 3 ניסיונות, backoff, ולעולם לא לנסות שוב POST שיוצר הזמנה פעמיים.",
      },
    ],
  },

  "SDK vs raw HTTP": {
    look: [
      {
        cap: {
          en: "Library call vs writing the HTTP yourself",
          he: "קריאה דרך ספרייה מול כתיבת ה-HTTP בעצמכם",
        },
        code: `// SDK — the vendor's helper
const user = await client.users.get(42);

// same idea with raw HTTP
const res = await fetch("https://api.example.com/v1/users/42", {
  headers: { Authorization: "Bearer sk_test_123" },
});
const user2 = await res.json();`,
      },
    ],
    prompts: [
      {
        en: "Explain when to prefer the official SDK and when raw HTTP is clearer for debugging. One example each.",
        he: "הסבירו מתי עדיף ה-SDK הרשמי ומתי HTTP גולמי ברור יותר לדיבאג. דוגמה אחת לכל מקרה.",
      },
      {
        en: "This project calls a vendor with raw fetch. Does an official SDK exist? If yes, show the smallest swap for one call.",
        he: "הפרויקט קורא לספק עם fetch גולמי. האם יש SDK רשמי? אם כן, הראו את ההחלפה הכי קטנה לקריאה אחת.",
      },
      {
        en: "Review this SDK usage: pin the version, turn on request logging, and list what the SDK retries for us.",
        he: "עברו על השימוש ב-SDK: קבעו גרסה, הפעילו לוגינג של בקשות, ורשמו מה ה-SDK מנסה שוב בשבילנו.",
      },
    ],
  },

  "Sandbox vs live keys": {
    look: [
      {
        cap: {
          en: "Test keys look like live keys — only the prefix differs",
          he: "מפתחות בדיקה נראים כמו חיים — רק הקידומת משתנה",
        },
        code: `# .env.local  (never commit real values)
STRIPE_KEY=sk_test_123     # sandbox: fake cards, no real money
# STRIPE_KEY=sk_live_456   # live: real charges — only in production

# rule of thumb:
# sk_test_...  -> safe to play
# sk_live_...  -> real money, real emails`,
      },
    ],
    prompts: [
      {
        en: "Explain sandbox vs live keys for a payments provider. How do we keep live keys out of local .env files?",
        he: "הסבירו sandbox מול live keys לספק תשלומים. איך מוודאים שמפתחות live לא נכנסים לקבצי .env מקומיים?",
      },
      {
        en: "Review this repo for sk_live_ or live API keys in source or sample env files. List every hit and how to remove it.",
        he: "חפשו בריפו sk_live_ או מפתחות live בקבצי קוד או env לדוגמה. רשמו כל ממצא ואיך להסיר אותו.",
      },
      {
        en: "Harden our config: refuse to start in production if the key prefix is sk_test_, and refuse locally if it is sk_live_.",
        he: "חזקו את הקונפיג: סרבו להתחיל בפרודקשן אם הקידומת sk_test_, וסרבו מקומית אם היא sk_live_.",
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

  "REST vs GraphQL": {
    look: [
      {
        cap: {
          en: "Many fixed URLs vs one query that asks for fields",
          he: "הרבה כתובות קבועות מול שאילתה אחת שמבקשת שדות",
        },
        code: `# REST — one URL, fixed shape
GET /users/42
{ "id": 42, "name": "Ada", "email": "a@x.com" }

# GraphQL — one endpoint, you pick fields
POST /graphql
{ "query": "{ user(id: 42) { name } }" }
{ "data": { "user": { "name": "Ada" } } }`,
      },
    ],
    prompts: [
      {
        en: "Explain REST vs GraphQL for a beginner. When is a simple REST list endpoint enough for our app?",
        he: "הסבירו REST מול GraphQL למתחילים. מתי מספיק endpoint פשוט של REST לרשימה באפליקציה שלנו?",
      },
      {
        en: "Review these client calls. Are we over-fetching with REST or under-fetching with GraphQL? Suggest one change.",
        he: "עברו על קריאות הקליינט. האם אנחנו over-fetching ב-REST או under-fetching ב-GraphQL? הציעו שינוי אחד.",
      },
      {
        en: "Map our three screens to REST resources. Keep GraphQL out unless a screen needs five nested objects at once.",
        he: "מפו את שלושת המסכים שלנו למשאבי REST. השאירו GraphQL בחוץ אלא אם מסך צריך חמישה אובייקטים מקוננים בבת אחת.",
      },
    ],
  },

  "API spec (OpenAPI)": {
    look: [
      {
        cap: {
          en: "A contract that names paths, fields, and status codes",
          he: "חוזה שנותן שמות לנתיבים, שדות וקודי סטטוס",
        },
        code: `# openapi.yaml (tiny slice)
paths:
  /users/{id}:
    get:
      parameters:
        - name: id
          in: path
          schema: { type: integer }
      responses:
        "200":
          description: one user
          content:
            application/json:
              schema:
                type: object
                properties:
                  id: { type: integer }
                  name: { type: string }`,
      },
    ],
    prompts: [
      {
        en: "Explain what an OpenAPI spec is for. How does it help an AI write a correct client for GET /users/42?",
        he: "הסבירו למה משמש OpenAPI spec. איך זה עוזר ל-AI לכתוב קליינט נכון ל-GET /users/42?",
      },
      {
        en: "Compare this handler to our openapi.yaml. List every mismatch in path, body, or status code.",
        he: "השוו את ה-handler הזה ל-openapi.yaml שלנו. רשמו כל אי-התאמה בנתיב, body או קוד סטטוס.",
      },
      {
        en: "Generate a minimal OpenAPI 3 snippet for POST /orders with body {user_id, total} and 201 response.",
        he: "צרו קטע OpenAPI 3 מינימלי ל-POST /orders עם body {user_id, total} ותשובת 201.",
      },
    ],
  },

  "API versioning": {
    look: [
      {
        cap: {
          en: "Old clients keep /v1 while new ones use /v2",
          he: "קליינטים ישנים נשארים ב-/v1 וחדשים עוברים ל-/v2",
        },
        code: `# v1 — email was a string
GET /v1/users/42
{ "id": 42, "email": "a@x.com" }

# v2 — email became an object (breaking change)
GET /v2/users/42
{ "id": 42, "email": { "address": "a@x.com", "verified": true } }

# rule: never break /v1; add /v2 instead`,
      },
    ],
    prompts: [
      {
        en: "Explain API versioning with /v1 and /v2. When is a field rename a breaking change that needs a new version?",
        he: "הסבירו API versioning עם /v1 ו-/v2. מתי שינוי שם שדה הוא breaking change שדורש גרסה חדשה?",
      },
      {
        en: "Review this PR that changes the JSON shape of GET /users. Is it safe for current clients, or do we need /v2?",
        he: "עברו על ה-PR שמשנה את צורת ה-JSON של GET /users. האם זה בטוח לקליינטים הנוכחיים, או שצריך /v2?",
      },
      {
        en: "Propose a deprecation plan: keep /v1 for six months, log usage, then remove. Write the response header we should add.",
        he: "הציעו תוכנית deprecation: להשאיר /v1 שישה חודשים, לרשום שימוש, ואז להסיר. כתבו את כותרת התשובה שכדאי להוסיף.",
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

  "Unit / Integration / E2E": {
    look: [
      {
        cap: {
          en: "One function, a few pieces together, or the whole app in a browser",
          he: "פונקציה אחת, כמה חלקים ביחד, או כל האפליקציה בדפדפן",
        },
        code: `# unit — pure function, no network
expect(add(2, 3)).toBe(5);

# integration — API + database
const res = await request(app).get("/users/42");
expect(res.status).toBe(200);

# E2E — real browser clicks
await page.click("text=Sign in");
await expect(page).toHaveURL("/dashboard");`,
      },
    ],
    prompts: [
      {
        en: "Explain unit, integration, and E2E with one example each for a login feature. Which layer should catch a wrong password hash?",
        he: "הסבירו unit, integration ו-E2E עם דוגמה אחת לכל שכבה לפיצ'ר login. איזו שכבה אמורה לתפוס hash סיסמה שגוי?",
      },
      {
        en: "Sort these five tests into unit, integration, or E2E. Say which ones are too slow or too brittle for every commit.",
        he: "מיינו את חמשת הטסטים האלה ל-unit, integration או E2E. אמרו אילו איטיים או שבריריים מדי לכל commit.",
      },
      {
        en: "For this bug, name the smallest test type that would have caught it, and sketch that one test.",
        he: "עבור הבאג הזה, ציינו את סוג הטסט הכי קטן שהיה תופס אותו, ושרטטו את הטסט האחד הזה.",
      },
    ],
  },

  "Mock / Fixture": {
    look: [
      {
        cap: {
          en: "Fake the outside world; fixture is the sample data",
          he: "מזייפים את העולם החיצוני; fixture הוא נתון הדוגמה",
        },
        code: `// fixture — known sample row
const user = { id: 42, email: "ada@example.com" };

// mock — fake the HTTP call
fetch.mockResolvedValue({
  ok: true,
  json: async () => user,
});

const got = await loadUser(42);
expect(got.email).toBe("ada@example.com");`,
      },
    ],
    prompts: [
      {
        en: "Explain mock vs fixture for beginners. When should a test use real sample JSON instead of mocking fetch?",
        he: "הסבירו mock מול fixture למתחילים. מתי טסט צריך JSON לדוגמה אמיתי במקום ל-mock את fetch?",
      },
      {
        en: "Review this test file. Which mocks hide real bugs? Replace one mock with a small fixture file.",
        he: "עברו על קובץ הטסט. אילו mocks מסתירים באגים אמיתיים? החליפו mock אחד בקובץ fixture קטן.",
      },
      {
        en: "Add a fixture users.json with two rows and a test that loads it without calling the network.",
        he: "הוסיפו fixture בשם users.json עם שתי שורות וטסט שטוען אותו בלי לקרוא לרשת.",
      },
    ],
  },

  Regression: {
    look: [
      {
        cap: {
          en: "A bug came back — lock it with a test that stays",
          he: "באג חזר — נועלים אותו עם טסט שנשאר",
        },
        code: `// bug: shippingCost(200) returned 15 again after a refactor
test("regression: free shipping at exactly 200", () => {
  expect(shippingCost(200)).toBe(0);
});

# once green, keep this test forever
# so the same mistake cannot sneak back in`,
      },
    ],
    prompts: [
      {
        en: "Explain what a regression test is. Why do we keep it after the bug is fixed?",
        he: "הסבירו מהו regression test. למה משאירים אותו אחרי שהבאג תוקן?",
      },
      {
        en: "This bug was fixed twice. Write one regression test that would have blocked the second return.",
        he: "הבאג הזה תוקן פעמיים. כתבו regression test אחד שהיה חוסם את החזרה השנייה.",
      },
      {
        en: "Review recent fixes and list any that have no regression test yet. Draft one expect() per fix.",
        he: "עברו על תיקונים אחרונים ורשמו אילו עדיין בלי regression test. נסחו expect() אחד לכל תיקון.",
      },
    ],
  },

  Coverage: {
    look: [
      {
        cap: {
          en: "How much of the code the tests actually ran",
          he: "כמה מהקוד הטסטים באמת הריצו",
        },
        code: `$ npm test -- --coverage

File          | % Stmts
--------------|--------
shipping.js   |   100
orders.js     |    72
auth.js       |    40   <-- almost untested

# coverage is a flashlight, not a grade
# 100% still misses the wrong rule`,
      },
    ],
    prompts: [
      {
        en: "Explain code coverage in plain words. Why can 100% coverage still ship a wrong business rule?",
        he: "הסבירו coverage במילים פשוטות. למה גם 100% coverage עדיין יכול לשלוח כלל עסקי שגוי?",
      },
      {
        en: "Run coverage on this package and list the three files with the lowest numbers. Suggest one test for the worst file.",
        he: "הריצו coverage על החבילה ורשמו את שלושת הקבצים עם המספרים הנמוכים ביותר. הציעו טסט אחד לקובץ הגרוע.",
      },
      {
        en: "Review our coverage gate. Is a hard 90% useful, or should we require tests only on money and auth paths?",
        he: "עברו על שער ה-coverage שלנו. האם 90% קשיח מועיל, או שעדיף לדרוש טסטים רק על נתיבי כסף ו-auth?",
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

  "Session & cookie": {
    look: [
      {
        cap: {
          en: "One cookie line that the browser stores for you",
          he: "שורת cookie אחת שהדפדפן שומר בשבילכם",
        },
        code: `Set-Cookie: sid=abc123; HttpOnly; Secure; SameSite=Lax`,
      },
    ],
    prompts: [
      {
        en: "Explain HttpOnly, Secure, and SameSite=Lax on a session cookie. What does each flag stop?",
        he: "הסבירו HttpOnly, Secure ו-SameSite=Lax על session cookie. מה כל flag עוצר?",
      },
      {
        en: "Review how we set the session cookie. Are HttpOnly, Secure, and SameSite present? Fix any missing flag.",
        he: "עברו על איך אנחנו מגדירים את ה-session cookie. האם יש HttpOnly, Secure ו-SameSite? תקנו כל flag חסר.",
      },
      {
        en: "Harden logout: clear the sid cookie and delete the server session row for user 42.",
        he: "חזקו את ה-logout: נקו את ה-cookie של sid ומחקו את שורת ה-session בשרת עבור user 42.",
      },
    ],
  },

  "Token / JWT": {
    look: [
      {
        cap: {
          en: "Three parts: header.payload.signature — payload is readable",
          he: "שלושה חלקים: header.payload.signature — ה-payload קריא",
        },
        code: `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0MiIsInJvbGUiOiJ1c2VyIn0.sig_demo
#      header      .         payload              . signature

# decode payload (base64) -> {"sub":"42","role":"user"}
# anyone holding the JWT can READ the payload
# do not put secrets inside; verify the signature on the server`,
      },
    ],
    prompts: [
      {
        en: "Explain what a JWT is and why the payload is readable. What must the server still verify on every request?",
        he: "הסבירו מהו JWT ולמה ה-payload קריא. מה השרת עדיין חייב לאמת בכל בקשה?",
      },
      {
        en: "Review tokens we issue. Is anything secret inside the payload? Is exp short? Suggest the smallest harden.",
        he: "עברו על הטוקנים שאנחנו מנפיקים. האם יש סוד בתוך ה-payload? האם ה-exp קצר? הציעו חיזוק מינימלי.",
      },
      {
        en: "Show how to reject a JWT with a bad signature or past exp, in the fewest lines for our middleware.",
        he: "הציגו איך לדחות JWT עם חתימה שגויה או exp שעבר, במספר השורות הקטן ביותר ל-middleware שלנו.",
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

  "Hashing vs encryption": {
    look: [
      {
        cap: {
          en: "Hash is one-way; encryption can be unlocked with a key",
          he: "Hash הוא חד-כיווני; הצפנה אפשר לפתוח עם מפתח",
        },
        code: `# hashing — store passwords this way (one-way)
password "secret" -> hash "$2b$10$..."
# you can check a guess; you cannot get the password back

# encryption — hide data you must read later
"card last4 4242" + key -> "a8f3..."
# with the same key you can decrypt back to text`,
      },
    ],
    prompts: [
      {
        en: "Explain hashing vs encryption. Which one do we use for passwords, and which for a file we must open later?",
        he: "הסבירו hashing מול הצפנה. במה משתמשים לסיסמאות, ובמה לקובץ שחייבים לפתוח אחר כך?",
      },
      {
        en: "Review how we store passwords. Confirm we hash with a slow algorithm and never encrypt passwords for storage.",
        he: "עברו על איך שומרים סיסמאות. ודאו שעושים hash עם אלגוריתם איטי ולעולם לא מצפינים סיסמאות לשמירה.",
      },
      {
        en: "For this PII field we must display later, outline encrypt-at-rest with a key from env — not a homemade cipher.",
        he: "עבור שדה PII שחייבים להציג אחר כך, תארו encrypt-at-rest עם מפתח מ-env — לא צופן ביתי.",
      },
    ],
  },

  "HTTPS / TLS": {
    look: [
      {
        cap: {
          en: "The lock in the address bar: traffic is encrypted on the wire",
          he: "המנעול בשורת הכתובת: התעבורה מוצפנת על הקו",
        },
        code: `http://api.example.com   # plain text on the wire — bad for passwords
https://api.example.com  # TLS wraps the connection

# browser checks the certificate, then encrypts
GET /login
Authorization: Bearer tok_user_42
# outsiders see only scrambled bytes`,
      },
    ],
    prompts: [
      {
        en: "Explain HTTPS and TLS in plain words. What still happens if someone steals a valid session cookie over HTTPS?",
        he: "הסבירו HTTPS ו-TLS במילים פשוטות. מה עדיין קורה אם גונבים session cookie תקף מעל HTTPS?",
      },
      {
        en: "Review our public URLs. Is every login and API call on https? Flag any hard-coded http:// links.",
        he: "עברו על הכתובות הציבוריות. האם כל login וקריאת API ב-https? סמנו כל קישור http:// קשיח.",
      },
      {
        en: "Harden production: redirect http to https and enable HSTS. Show the two header or config lines.",
        he: "חזקו פרודקשן: הפנו http ל-https והפעילו HSTS. הראו את שתי שורות ה-header או הקונפיג.",
      },
    ],
  },

  "Environment variables / secrets": {
    look: [
      {
        cap: {
          en: "Secrets live in env, never in source code",
          he: "סודות חיים ב-env, אף פעם לא בקוד המקור",
        },
        code: `# .env.local  (gitignored)
DATABASE_URL=postgres://user:pass@localhost:5432/app
API_KEY=sk_test_123

# in code — read, do not hard-code
const key = process.env.API_KEY;

# .env.example  (safe to commit)
API_KEY=sk_test_xxx
DATABASE_URL=postgres://USER:PASS@HOST:5432/DB`,
      },
    ],
    prompts: [
      {
        en: "Explain why secrets belong in environment variables. Show how to read API_KEY without putting it in the repo.",
        he: "הסבירו למה סודות שייכים למשתני סביבה. הראו איך לקרוא API_KEY בלי לשים אותו בריפו.",
      },
      {
        en: "Scan the repo for hard-coded secrets or .env files that are not ignored. List each path and the fix.",
        he: "סרקו את הריפו לסודות בקוד או קבצי .env שלא ב-.gitignore. רשמו כל נתיב ואת התיקון.",
      },
      {
        en: "Add a startup check that exits if DATABASE_URL or API_KEY is missing, with a clear error message.",
        he: "הוסיפו בדיקת עלייה שיוצאת אם DATABASE_URL או API_KEY חסרים, עם הודעת שגיאה ברורה.",
      },
    ],
  },

  CORS: {
    look: [
      {
        cap: {
          en: "The browser asks if another origin may call your API",
          he: "הדפדפן שואל אם מקור אחר רשאי לקרוא ל-API שלכם",
        },
        code: `# browser on https://shop.example calls https://api.example
Origin: https://shop.example

# API answers (allowlist — not *)
Access-Control-Allow-Origin: https://shop.example
Access-Control-Allow-Credentials: true

# wrong for cookie sessions:
# Access-Control-Allow-Origin: *`,
      },
    ],
    prompts: [
      {
        en: "Explain CORS for a beginner. Why does Access-Control-Allow-Origin: * break cookie-based sessions?",
        he: "הסבירו CORS למתחילים. למה Access-Control-Allow-Origin: * שובר session מבוסס cookie?",
      },
      {
        en: "Review our CORS config. List allowed origins and whether credentials are on. Tighten any wildcard.",
        he: "עברו על הגדרת ה-CORS. רשמו origins מורשים והאם credentials דלוקים. חזקו כל wildcard.",
      },
      {
        en: "Our frontend is https://app.example. Show the minimal CORS headers the API needs for credentialed fetch.",
        he: "הפרונט שלנו ב-https://app.example. הראו את כותרות ה-CORS המינימליות שה-API צריך ל-fetch עם credentials.",
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

  "XSS & CSRF": {
    look: [
      {
        cap: {
          en: "The safe way: put user text into the page as text, not HTML",
          he: "הדרך הבטוחה: לשים טקסט משתמש בעמוד כטקסט, לא כ-HTML",
        },
        code: `// SAFE — text stays text (no HTML runs)
const el = document.getElementById("bio");
el.textContent = user.bio;

// also set a strict cookie for session forms
// Set-Cookie: sid=abc; HttpOnly; Secure; SameSite=Lax`,
      },
    ],
    prompts: [
      {
        en: "Explain XSS and CSRF in plain words. For each, describe one fix we should apply in our app — no attack steps.",
        he: "הסבירו XSS ו-CSRF במילים פשוטות. לכל אחד תארו תיקון אחד ליישום אצלנו — בלי שלבי תקיפה.",
      },
      {
        en: "Review every place we render user bio or comments. Replace innerHTML with textContent or a safe escape helper.",
        he: "עברו על כל מקום שמציגים bio או תגובות משתמש. החליפו innerHTML ב-textContent או helper בטוח ל-escape.",
      },
      {
        en: "Harden state-changing forms: confirm SameSite on the session cookie and add a CSRF token check on POST.",
        he: "חזקו טפסים שמשנים מצב: ודאו SameSite על ה-session cookie והוסיפו בדיקת CSRF token ב-POST.",
      },
    ],
  },

  "Threat model": {
    look: [
      {
        cap: {
          en: "Who might hurt us, what they want, what we protect first",
          he: "מי עלול לפגוע בנו, מה הם רוצים, ומה מגנים קודם",
        },
        code: `# tiny threat model for a shop
Assets:   orders, passwords, API keys
Actors:   random internet, jealous rival shop, curious staff
Entry:    /login, /api/orders, admin panel
Worry #1: user 7 reads user 42's order (broken access)
Worry #2: API key sk_live_... leaked in git
Mitigate: ownership checks + rotate keys + audit log`,
      },
    ],
    prompts: [
      {
        en: "Write a one-page threat model for this app: assets, actors, entry points, and the top three worries.",
        he: "כתבו threat model של עמוד אחד לאפליקציה: נכסים, שחקנים, נקודות כניסה, ושלוש הדאגות העליונות.",
      },
      {
        en: "Review this feature through a threat-model lens. What new asset or entry point did we add, and how do we protect it?",
        he: "עברו על הפיצ'ר דרך משקפי threat model. איזה נכס או נקודת כניסה חדשים נוספו, ואיך מגנים עליהם?",
      },
      {
        en: "Turn our top threat into three concrete harden tasks a junior can finish this week.",
        he: "הפכו את האיום העליון לשלוש משימות חיזוק קונקרטיות שג'וניור יכול לסיים השבוע.",
      },
    ],
  },

  "OWASP Top 10": {
    look: [
      {
        cap: {
          en: "A short checklist of the mistakes that cause most breaches",
          he: "צ'ק-ליסט קצר של הטעויות שגורמות לרוב הפריצות",
        },
        code: `# walk the list against YOUR code (examples)
A01 Broken access   — GET /orders/42 with no owner check
A03 Injection       — use WHERE email = $1, not string glue
A05 Misconfig       — DEBUG=false in prod; no CORS *
A07 Auth failures   — rate-limit /login
A09 Logging gaps    — log failed logins, never passwords

# ask the AI: go item by item, point to a line`,
      },
    ],
    prompts: [
      {
        en: "Walk the OWASP Top 10 against these handlers one item at a time. For each, say if it applies and cite a line.",
        he: "עברו על OWASP Top 10 מול ה-handlers האלה פריט אחר פריט. לכל אחד אמרו אם רלוונטי וציינו שורה.",
      },
      {
        en: "Focus on broken access control: list every :id route and confirm each checks ownership or role.",
        he: "התמקדו ב-broken access control: רשמו כל נתיב עם :id וודאו שכל אחד בודק בעלות או תפקיד.",
      },
      {
        en: "Pick our three highest OWASP risks and write one failing test or checklist item that would catch each.",
        he: "בחרו את שלושת סיכוני ה-OWASP הגבוהים אצלנו וכתבו טסט שנכשל או פריט צ'ק-ליסט שתופס כל אחד.",
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

  "Secrets in git history": {
    look: [
      {
        cap: {
          en: "Find a leaked secret in old commits, then rotate it",
          he: "מוצאים סוד שדלף ב-commits ישנים, ואז מחליפים אותו",
        },
        code: `git log -S "API_KEY" --oneline
# if it shows up in history, the secret is burned
# 1) rotate / revoke the key at the provider
# 2) put the new value only in env / secret store
# 3) never commit .env again`,
      },
    ],
    prompts: [
      {
        en: "Explain why deleting a secret from the latest commit is not enough. What must we do after git log finds it?",
        he: "הסבירו למה מחיקת סוד מה-commit האחרון לא מספיקה. מה חייבים לעשות אחרי ש-git log מוצא אותו?",
      },
      {
        en: "Search git history for API_KEY, sk_live_, and password=. List hits and the rotation steps for each secret.",
        he: "חפשו בהיסטוריית Git אחרי API_KEY, sk_live_ ו-password=. רשמו ממצאים ואת שלבי הרוטציה לכל סוד.",
      },
      {
        en: "Add a pre-commit check that blocks files named .env and strings that look like sk_live_ keys.",
        he: "הוסיפו בדיקת pre-commit שחוסמת קבצים בשם .env ומחרוזות שנראות כמו מפתחות sk_live_.",
      },
    ],
  },

  "Supply chain (dependencies)": {
    look: [
      {
        cap: {
          en: "Your app includes other people's packages — review them",
          he: "האפליקציה כוללת חבילות של אחרים — בודקים אותן",
        },
        code: `$ npm install left-pad@1.0.0
# package-lock.json pins exact versions

$ npm audit
# 2 high severity in transitive deps

# habits:
# - prefer known maintainers
# - pin versions in the lockfile
# - read the changelog before a major bump`,
      },
    ],
    prompts: [
      {
        en: "Explain software supply chain risk for npm packages. Why does the lockfile matter for security?",
        he: "הסבירו סיכון supply chain לחבילות npm. למה ה-lockfile חשוב לאבטחה?",
      },
      {
        en: "Run npm audit on this project. Summarize the top issues and whether we can upgrade or replace the package.",
        he: "הריצו npm audit על הפרויקט. סכמו את הבעיות העליונות והאם אפשר לשדרג או להחליף את החבילה.",
      },
      {
        en: "Before adding this new dependency, check weekly downloads, last publish date, and open critical issues.",
        he: "לפני שמוסיפים את התלות החדשה, בדקו הורדות שבועיות, תאריך פרסום אחרון, ו-issues קריטיים פתוחים.",
      },
    ],
  },

  "CVE & patching": {
    look: [
      {
        cap: {
          en: "A named hole in a package, and the version that closes it",
          he: "חור עם שם בחבילה, והגרסה שסוגרת אותו",
        },
        code: `# advisory (made-up id for learning)
CVE-2024-12345  in  lodash  < 4.17.21
fixed in        lodash  4.17.21

$ npm update lodash
# package-lock.json now shows 4.17.21

# patch soon; reboot/redeploy so production actually runs it`,
      },
    ],
    prompts: [
      {
        en: "Explain what a CVE is and how a patch version fixes it. What is the difference between knowing and deploying?",
        he: "הסבירו מהו CVE ואיך גרסת patch מתקנת אותו. מה ההבדל בין לדעת לבין לפרוס?",
      },
      {
        en: "List outdated packages with known CVEs in this repo and propose the minimal safe upgrades.",
        he: "רשמו חבילות מיושנות עם CVE ידועים בריפו והציעו את השדרוגים הבטוחים המינימליים.",
      },
      {
        en: "Draft a weekly patch habit: audit, upgrade lockfile, run tests, deploy staging, then production.",
        he: "נסחו הרגל patch שבועי: audit, שדרוג lockfile, הרצת טסטים, פריסת staging, ואז פרודקשן.",
      },
    ],
  },

  "Security headers & CSP": {
    look: [
      {
        cap: {
          en: "One header that limits where scripts and pages may load from",
          he: "כותרת אחת שמגבילה מאיפה מותר לטעון סקריפטים ועמודים",
        },
        code: `Content-Security-Policy: default-src 'self'`,
      },
    ],
    prompts: [
      {
        en: "Explain Content-Security-Policy with default-src 'self'. What does it stop the browser from loading?",
        he: "הסבירו Content-Security-Policy עם default-src 'self'. ממה זה מונע מהדפדפן לטעון?",
      },
      {
        en: "Review our response headers. Are CSP, X-Frame-Options, and HSTS set? Suggest the smallest missing lines.",
        he: "עברו על כותרות התשובה. האם CSP, X-Frame-Options ו-HSTS מוגדרים? הציעו את השורות החסרות הקטנות ביותר.",
      },
      {
        en: "Add a strict CSP for our static site: default-src 'self' only. Call out any inline script that would break.",
        he: "הוסיפו CSP מחמיר לאתר הסטטי: רק default-src 'self'. ציינו כל סקריפט inline שישבר.",
      },
    ],
  },

  "Encryption at rest / in transit": {
    look: [
      {
        cap: {
          en: "Locked on disk, and locked while moving on the network",
          he: "נעול על הדיסק, ונעול בזמן תנועה ברשת",
        },
        code: `# in transit — HTTPS / TLS
https://api.example.com/users/42

# at rest — disk or database encryption
# cloud Postgres: "encryption at rest" toggle ON
# backups: stored encrypted in the bucket

# both matter:
# TLS protects the road; at-rest protects the parked car`,
      },
    ],
    prompts: [
      {
        en: "Explain encryption in transit vs at rest with a database example. Which one does HTTPS cover?",
        he: "הסבירו הצפנה in transit מול at rest עם דוגמת מסד נתונים. איזו מהן HTTPS מכסה?",
      },
      {
        en: "Review our hosting checklist: is TLS on every public endpoint, and is the database disk encrypted?",
        he: "עברו על צ'ק-ליסט האחסון: האם TLS על כל endpoint ציבורי, והאם דיסק המסד מוצפן?",
      },
      {
        en: "Confirm backups are encrypted at rest and that restore still works. Document the one test restore we ran.",
        he: "ודאו שגיבויים מוצפנים at rest וששחזור עדיין עובד. תעדו את שחזור הבדיקה האחד שביצענו.",
      },
    ],
  },

  "Backups & recovery": {
    look: [
      {
        cap: {
          en: "A copy you can actually restore — tested, not only scheduled",
          he: "עותק שאפשר באמת לשחזר — נבדק, לא רק מתוזמן",
        },
        code: `# nightly backup (concept)
0 3 * * *  pg_dump app > /backups/app-$(date +%F).sql

# the part people skip:
# restore to a scratch database once a month
pg_restore /backups/app-2026-09-01.sql
# then: can we read user 42 again?`,
      },
    ],
    prompts: [
      {
        en: "Explain backups vs recovery. Why is an untested backup not a real backup?",
        he: "הסבירו גיבויים מול recovery. למה גיבוי שלא נבדק אינו גיבוי אמיתי?",
      },
      {
        en: "Review our backup job: schedule, retention, off-site copy. What is missing for a one-day restore drill?",
        he: "עברו על משימת הגיבוי: לוח זמנים, שמירה, עותק מחוץ לאתר. מה חסר לתרגיל שחזור של יום אחד?",
      },
      {
        en: "Write steps to restore yesterday's database backup into a scratch env and verify user 42 still loads.",
        he: "כתבו צעדים לשחזור גיבוי המסד של אתמול לסביבת scratch ואימות ש-user 42 עדיין נטען.",
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
