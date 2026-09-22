import type { L10n } from "@/lib/types";

/**
 * Mermaid definitions. English-only on purpose: these are the words that appear in
 * every real console and doc, and translating "Load balancer" helps nobody.
 */

/** How a website actually gets made, idea to monitoring — Ground Floor. */
export const LIFECYCLE = `flowchart TD
  A["1 · Idea<br/>what it does, who for, what it won't do"] --> B["2 · Design<br/>screens, flows, the data you'll store"]
  B --> C["3 · Code<br/>repo, branch, commit"]
  C --> D["4 · Review<br/>a pull request, a second pair of eyes"]
  D --> E["5 · CI<br/>tests, lint and build run on every push"]
  E -->|red: it does not ship| C
  E -->|green| F["6 · Hosting<br/>the build runs somewhere: Vercel, AWS, a VPS"]
  F --> G["7 · Domain<br/>DNS points your name at the host, HTTPS certificate"]
  G --> H["8 · Users<br/>real traffic, real data"]
  H --> I["9 · Monitoring<br/>logs, errors, latency, cost"]
  I -->|what actually broke, what nobody used| A
  classDef plan fill:#241f45,stroke:#6c5ce7,color:#e8eaf0
  classDef ship fill:#102b2a,stroke:#00d2b8,color:#e8eaf0
  class A,B plan
  class F,G,H,I ship`;

/** The five architectures, keyed by ARCHITECTURES item id. */
export const ARCH_CHARTS: Record<string, string> = {
  "static-site": `flowchart TD
  subgraph build["Build · runs once per push"]
    P["you: git push"] --> CI["CI builds the site"]
    CI --> O[("Origin store<br/>S3 / provider")]
  end
  B["Browser"] -->|HTTPS GET /| E["CDN edge, nearest city<br/>caches by TTL, serves HTTPS"]
  E -->|cache miss| O
  E -->|HTML, JS, CSS, images| B
  B -->|form POST| F["3rd-party endpoint<br/>Formspree etc · their server, not yours"]
  N["No server of yours runs.<br/>Every file the CDN serves is public — secrets cannot live here."]
  classDef note fill:none,stroke:none,color:#9aa1b4
  class N note`,

  "classic-monolith": `flowchart TD
  B["Browser"] -->|HTTPS| LB["Load balancer (ALB)<br/>public"]
  subgraph vpc["Private network (VPC) · no public address"]
    A1["app #1<br/>Docker task"]
    A2["app #2<br/>same image"]
    W["worker / cron<br/>small task"]
    PG[("Postgres<br/>managed, private")]
    RD[("Redis<br/>sessions, cache, queue")]
    S3[("Object storage<br/>private bucket, signed URLs")]
  end
  LB --> A1
  LB --> A2
  A1 --> PG
  A1 --> RD
  A1 --> S3
  A2 --> PG
  A2 --> RD
  A2 --> S3
  W --> PG
  W --> RD`,

  serverless: `flowchart TD
  B["Browser"] -->|HTTPS| CDN["CDN · built frontend files"]
  B -->|HTTPS /api/*| GW["API Gateway<br/>auth, throttling"]
  subgraph cloud["Private · reachable by IAM, not by network address"]
    FN["Lambda: api<br/>one instance per request"]
    DB[("DynamoDB or<br/>serverless Postgres")]
    Q["Queue (SQS) + DLQ<br/>3 failures and it parks"]
    S3[("Object storage")]
    WK["Lambda: worker<br/>slow jobs, 15 min ceiling"]
    CR["EventBridge cron<br/>nightly schedule"]
  end
  GW --> FN
  FN --> DB
  FN -->|enqueue| Q
  FN -->|put file| S3
  Q -->|triggers| WK
  CR --> WK
  WK --> DB
  WK --> S3`,

  pipeline: `flowchart TD
  C["Client"] -->|1 · POST /jobs with the file| API["API (small)<br/>answers 202 + job id"]
  API -->|2| IN[("Object storage · input")]
  API -->|3 · enqueue job id| Q["Queue (SQS)"]
  Q -->|after 3 failures| DLQ["Dead-letter queue"]
  Q -->|4 · pull a job, ack when done| WP["Worker pool, CPU or GPU<br/>scales by queue depth<br/>idempotent per job id"]
  WP -->|5 · status + percent| JDB[("Jobs table<br/>id, %, result url")]
  WP --> OUT[("Object storage · output")]
  JDB -->|on done| NT["Notifier"]
  NT -->|6 · webhook / SSE| C`,

  microservices: `flowchart TD
  B["Browser / mobile"] -->|HTTPS| GW["API gateway<br/>auth, routing, rate limits · public"]
  subgraph priv["Private · each database belongs to one service only"]
    US["users svc"] --- UD[("users db")]
    OS["orders svc"] --- OD[("orders db")]
    BS["billing svc"] --- BD[("billing db")]
    NS["notify svc"]
    BUS["Message bus (Kafka / SNS+SQS)<br/>OrderPlaced, PaymentFailed, ..."]
  end
  GW --> US
  GW --> OS
  GW --> BS
  US -->|publish| BUS
  OS -->|publish| BUS
  BS -->|publish| BUS
  BUS -->|subscribe| NS
  T["One trace id spans every hop — without it, nobody can answer 'where did the request go?'"]
  classDef note fill:none,stroke:none,color:#9aa1b4
  class T note`,
};

/**
 * Card-sized version of each architecture: the same shape with the detail stripped,
 * so five of them fit on one page without turning into noise.
 */
export const ARCH_MINI: Record<string, string> = {
  "static-site": `flowchart LR
  B["Browser"] --> E["CDN edge"]
  E --> O[("Built files")]
  B --> F["3rd-party form"]`,

  "classic-monolith": `flowchart LR
  B["Browser"] --> LB["Load balancer"]
  LB --> A["app × N"]
  A --> PG[("Postgres")]
  A --> RD[("Redis")]`,

  serverless: `flowchart LR
  B["Browser"] --> GW["API gateway"]
  GW --> FN["Lambda"]
  FN --> DB[("Managed DB")]
  FN --> Q["Queue"] --> WK["Worker"]`,

  pipeline: `flowchart LR
  C["Client"] --> API["API · 202"]
  API --> Q["Queue"]
  Q --> W["Worker pool"]
  W --> OUT[("Output store")]
  W --> C`,

  microservices: `flowchart LR
  B["Client"] --> GW["API gateway"]
  GW --> S1["users"]
  GW --> S2["orders"]
  S1 --> BUS["Event bus"]
  S2 --> BUS`,
};

/**
 * The two-packet animation from "Request / Response", generalised: anything that is
 * one thing going out and one thing coming back reads the same way. Keyed by term title (en).
 */
/** `mid` turns the slide into three nodes: left → mid → right, then the answer comes back the same path. */
export type Flow = { cap: L10n; left: L10n; right: L10n; out: L10n; back: L10n; mid?: L10n };

export const FLOWS: Record<string, Flow> = {
  "Request / Response": {
    cap: { en: "One exchange — request first, response second, always paired", he: "חילופים אחד — ריקווסט קודם, רספונס אחר כך, תמיד בזוגות" },
    left: { en: "Client", he: "קליינט" },
    right: { en: "Server", he: "שרת" },
    out: { en: "Request", he: "ריקווסט" },
    back: { en: "Response", he: "רספונס" },
  },
  "Clone / push / pull": {
    cap: { en: "Two copies of the same history — push sends yours up, pull brings theirs down", he: "שני עותקים של אותה היסטוריה — push שולח את שלך למעלה, pull מוריד את שלהם" },
    left: { en: "Your clone", he: "העותק שלך" },
    right: { en: "Remote", he: "רימוט" },
    out: { en: "git push", he: "git push" },
    back: { en: "git pull", he: "git pull" },
  },
  DNS: {
    cap: { en: "A name is not an address — the resolver asks, then the answer comes back", he: "שם הוא לא כתובת — הפותר שואל, ואז התשובה חוזרת" },
    left: { en: "Browser", he: "דפדפן" },
    mid: { en: "Resolver", he: "פותר" },
    right: { en: "DNS", he: "DNS" },
    out: { en: "example.com?", he: "example.com?" },
    back: { en: "93.184.x.x", he: "93.184.x.x" },
  },
  "Hit / Miss": {
    cap: { en: "Ask the cache first — a hit never reaches the database", he: "שואלים קודם את הקאש — hit לא מגיע בכלל לדאטהבייס" },
    left: { en: "App", he: "אפליקציה" },
    right: { en: "Cache", he: "קאש" },
    out: { en: "GET user:42", he: "GET user:42" },
    back: { en: "HIT · 0.2ms", he: "HIT · 0.2ms" },
  },
  "Token / JWT": {
    cap: { en: "The token rides on every call — no token, no answer", he: "הטוקן נוסע עם כל קריאה — בלי טוקן, אין תשובה" },
    left: { en: "Client", he: "קליינט" },
    right: { en: "API", he: "API" },
    out: { en: "Bearer eyJ…", he: "Bearer eyJ…" },
    back: { en: "200 OK", he: "200 OK" },
  },
  Webhook: {
    cap: { en: "Backwards: they call you, and your endpoint has to answer fast", he: "הפוך: הם קוראים לך, והאנדפוינט שלך חייב לענות מהר" },
    left: { en: "Their app", he: "האפליקציה שלהם" },
    right: { en: "Your app", he: "האפליקציה שלך" },
    out: { en: "POST /hooks", he: "POST /hooks" },
    back: { en: "200 OK", he: "200 OK" },
  },
  "Health check & uptime monitor": {
    cap: { en: "A tiny call on a timer — the answer is the whole signal", he: "קריאה זעירה בלולאה — התשובה היא כל הסיגנל" },
    left: { en: "Monitor", he: "מוניטור" },
    right: { en: "Your app", he: "האפליקציה" },
    out: { en: "GET /healthz", he: "GET /healthz" },
    back: { en: "200 · ok", he: "200 · ok" },
  },
  "Compiler / Interpreter": {
    cap: { en: "The file goes in. A program, or a refusal, comes back", he: "הקובץ נכנס. יוצאת תוכנית, או סירוב" },
    left: { en: "Your file", he: "הקובץ" },
    right: { en: "Translator", he: "המתרגם" },
    out: { en: "source", he: "קוד" },
    back: { en: "error · line 4", he: "שגיאה · שורה 4" },
  },
  "Package manager": {
    cap: { en: "You name a package. The registry sends the files", he: "נותנים שם של חבילה. המאגר שולח את הקבצים" },
    left: { en: "You", he: "אתם" },
    right: { en: "Registry", he: "המאגר" },
    out: { en: "install left-pad", he: "install left-pad" },
    back: { en: "files · v1.2", he: "קבצים · v1.2" },
  },
  "Pull request & code review": {
    cap: { en: "You offer a change. Comments come back before it joins", he: "מציעים שינוי. הערות חוזרות לפני שהוא נכנס" },
    left: { en: "You", he: "אתם" },
    right: { en: "Reviewer", he: "הסוקר" },
    out: { en: "pull request", he: "pull request" },
    back: { en: "two comments", he: "שתי הערות" },
  },
  "Forms & validation": {
    cap: { en: "The form goes to the server. The answer is saved, or why not", he: "הטופס הולך לשרת. התשובה היא נשמר, או למה לא" },
    left: { en: "Browser", he: "דפדפן" },
    right: { en: "Server", he: "שרת" },
    out: { en: "name: \"\"", he: "שם: \"\"" },
    back: { en: "name required", he: "חסר שם" },
  },
  GET: {
    cap: { en: "Ask for something. Nothing on the server should change", he: "מבקשים משהו. בשרת שום דבר לא אמור להשתנות" },
    left: { en: "Browser", he: "דפדפן" },
    right: { en: "Server", he: "שרת" },
    out: { en: "GET /orders", he: "GET /orders" },
    back: { en: "200 · the list", he: "200 · הרשימה" },
  },
  "POST / PUT / PATCH / DELETE": {
    cap: { en: "Send a change. The status code says whether it stuck", he: "שולחים שינוי. קוד הסטטוס אומר אם זה נתפס" },
    left: { en: "Client", he: "קליינט" },
    right: { en: "Server", he: "שרת" },
    out: { en: "POST /orders", he: "POST /orders" },
    back: { en: "201 Created", he: "201 Created" },
  },
  Query: {
    cap: { en: "A question goes to the database. Rows come back", he: "שאלה הולכת למסד. שורות חוזרות" },
    left: { en: "App", he: "אפליקציה" },
    right: { en: "Database", he: "מסד" },
    out: { en: "SELECT name", he: "SELECT name" },
    back: { en: "3 rows", he: "3 שורות" },
  },
  "Polling vs push": {
    cap: { en: "Polling keeps asking. The useful answer is the one that says done", he: "Polling ממשיך לשאול. התשובה ששווה היא זאת שאומרת סיימתי" },
    left: { en: "Your page", he: "העמוד" },
    right: { en: "Server", he: "שרת" },
    out: { en: "done yet?", he: "נגמר?" },
    back: { en: "not yet", he: "עוד לא" },
  },
  Pagination: {
    cap: { en: "Ask for one page. You get that slice, not the whole pile", he: "מבקשים עמוד אחד. מקבלים את הפרוסה, לא את כל הערימה" },
    left: { en: "Client", he: "קליינט" },
    right: { en: "API", he: "API" },
    out: { en: "page 2", he: "עמוד 2" },
    back: { en: "next 20", he: "20 הבאים" },
  },
  "Timeouts & retries": {
    cap: { en: "A late answer does not count. You stop waiting and try again", he: "תשובה מאוחרת לא נחשבת. מפסיקים לחכות ומנסים שוב" },
    left: { en: "Your app", he: "האפליקציה" },
    right: { en: "Their API", he: "ה-API שלהם" },
    out: { en: "call", he: "קריאה" },
    back: { en: "too late", he: "מאוחר מדי" },
  },
  "API key vs OAuth app": {
    cap: { en: "The key goes out with the call. Their API answers only if it recognises it", he: "המפתח יוצא עם הקריאה. ה-API שלהם עונה רק אם הוא מזהה אותו" },
    left: { en: "Your app", he: "האפליקציה" },
    right: { en: "Their API", he: "ה-API שלהם" },
    out: { en: "key sk_live…", he: "מפתח sk_live…" },
    back: { en: "200 · data", he: "200 · נתונים" },
  },
  "Background job": {
    cap: { en: "The page hands the job to a queue. A worker does it, and done comes back", he: "העמוד מוסר את העבודה לתור. עובד עושה אותה, ונגמר חוזר" },
    left: { en: "Page", he: "עמוד" },
    mid: { en: "Queue", he: "תור" },
    right: { en: "Worker", he: "עובד" },
    out: { en: "send email", he: "שלח מייל" },
    back: { en: "sent", he: "נשלח" },
  },
  "Retry & backoff": {
    cap: { en: "The first try fails. You wait, then send a quieter second one", he: "הניסיון הראשון נכשל. מחכים, ואז שולחים ניסיון שני שקט יותר" },
    left: { en: "Your app", he: "האפליקציה" },
    right: { en: "API", he: "API" },
    out: { en: "try 1", he: "ניסיון 1" },
    back: { en: "503 · wait", he: "503 · חכה" },
  },
  "Event & pub/sub": {
    cap: { en: "Orders publishes a fact onto the bus. Billing receives it from there", he: "הזמנות מפרסמות עובדה על האפיק. חיוב מקבל אותה משם" },
    left: { en: "Orders", he: "הזמנות" },
    mid: { en: "Bus", he: "אפיק" },
    right: { en: "Billing", he: "חיוב" },
    out: { en: "OrderPlaced", he: "OrderPlaced" },
    back: { en: "received", he: "התקבל" },
  },
  "Real-time (WebSocket / SSE)": {
    cap: { en: "The line stays open. The server pushes the next event down it", he: "הקו נשאר פתוח. השרת דוחף את האירוע הבא עליו" },
    left: { en: "Browser", he: "דפדפן" },
    right: { en: "Server", he: "שרת" },
    out: { en: "connect", he: "התחברות" },
    back: { en: "new message", he: "הודעה חדשה" },
  },
  "Session & cookie": {
    cap: { en: "You log in once. The cookie comes back and rides on the next visits", he: "מתחברים פעם אחת. העוגייה חוזרת ונוסעת בביקורים הבאים" },
    left: { en: "Browser", he: "דפדפן" },
    right: { en: "Server", he: "שרת" },
    out: { en: "email + password", he: "מייל + סיסמה" },
    back: { en: "Set-Cookie", he: "Set-Cookie" },
  },
  OAuth: {
    cap: { en: "The browser goes to your app, then to Google. The code comes back, not the password", he: "הדפדפן הולך לאפליקציה, ואז ל-Google. הקוד חוזר, לא הסיסמה" },
    left: { en: "Browser", he: "דפדפן" },
    mid: { en: "Your app", he: "האפליקציה" },
    right: { en: "Google", he: "Google" },
    out: { en: "let me in", he: "תנו לי להיכנס" },
    back: { en: "code abc", he: "קוד abc" },
  },
  CORS: {
    cap: { en: "The browser asks permission before it trusts the answer", he: "הדפדפן שואל רשות לפני שהוא סומך על התשובה" },
    left: { en: "Browser", he: "דפדפן" },
    right: { en: "API", he: "API" },
    out: { en: "may I?", he: "מותר לי?" },
    back: { en: "allow", he: "מותר" },
  },
  "HTTPS / TLS": {
    cap: { en: "Before any real message, they agree on a lock", he: "לפני כל הודעה אמיתית, הם מסכימים על מנעול" },
    left: { en: "Browser", he: "דפדפן" },
    right: { en: "Server", he: "שרת" },
    out: { en: "hello", he: "שלום" },
    back: { en: "locked", he: "נעול" },
  },
  "Queue / worker": {
    cap: { en: "The app drops the job on a queue. A worker takes it, and done comes back", he: "האפליקציה שמה את העבודה על תור. עובד לוקח אותה, ונגמר חוזר" },
    left: { en: "App", he: "אפליקציה" },
    mid: { en: "Queue", he: "תור" },
    right: { en: "Worker", he: "עובד" },
    out: { en: "job #18", he: "עבודה 18" },
    back: { en: "done", he: "נגמר" },
  },
  "Load balancer": {
    cap: { en: "The request hits the balancer, then a server that has room, then the answer returns", he: "הבקשה פוגעת במאזן, ואז בשרת שיש לו מקום, ואז התשובה חוזרת" },
    left: { en: "Client", he: "קליינט" },
    mid: { en: "Balancer", he: "מאזן" },
    right: { en: "Server", he: "שרת" },
    out: { en: "request", he: "בקשה" },
    back: { en: "the page", he: "העמוד" },
  },
  Idempotency: {
    cap: { en: "The same call, sent twice, must come back as the same result", he: "אותה קריאה, שנשלחת פעמיים, חייבת לחזור כאותה תוצאה" },
    left: { en: "Client", he: "קליינט" },
    right: { en: "API", he: "API" },
    out: { en: "pay · key 9", he: "שלם · מפתח 9" },
    back: { en: "same receipt", he: "אותה קבלה" },
  },
  "Rate limiting": {
    cap: { en: "Too many calls, and the answer is a refusal instead of the data", he: "יותר מדי קריאות, והתשובה היא סירוב במקום הנתונים" },
    left: { en: "Client", he: "קליינט" },
    right: { en: "API", he: "API" },
    out: { en: "call 101", he: "קריאה 101" },
    back: { en: "429 · slow down", he: "429 · לאט" },
  },
  "Browser cache": {
    cap: { en: "The second visit should not download the file again", he: "הביקור השני לא אמור להוריד את הקובץ שוב" },
    left: { en: "Browser", he: "דפדפן" },
    right: { en: "Cache", he: "מטמון" },
    out: { en: "app.js?", he: "app.js?" },
    back: { en: "already here", he: "כבר כאן" },
  },
  CDN: {
    cap: { en: "Browser to the CDN near you. The CDN asks the origin only when it does not have a copy", he: "הדפדפן אל ה-CDN הקרוב. ה-CDN שואל את המקור רק כשאין לו עותק" },
    left: { en: "Client", he: "קליינט" },
    mid: { en: "CDN", he: "CDN" },
    right: { en: "Origin", he: "מקור" },
    out: { en: "GET /app.js", he: "GET /app.js" },
    back: { en: "the file", he: "הקובץ" },
  },
  "Reverse proxy": {
    cap: { en: "The browser talks to the proxy. The proxy fetches the page from the app", he: "הדפדפן מדבר עם הפרוקסי. הפרוקסי מביא את העמוד מהאפליקציה" },
    left: { en: "Browser", he: "דפדפן" },
    mid: { en: "Proxy", he: "פרוקסי" },
    right: { en: "App", he: "אפליקציה" },
    out: { en: "GET /", he: "GET /" },
    back: { en: "the page", he: "העמוד" },
  },
  "CI/CD": {
    cap: { en: "You push to the repo. The pipeline runs, and passed or failed comes back", he: "דוחפים לריפו. הצינור רץ, ועבר או נכשל חוזר" },
    left: { en: "You", he: "אתם" },
    mid: { en: "Repo", he: "ריפו" },
    right: { en: "Pipeline", he: "צינור" },
    out: { en: "git push", he: "git push" },
    back: { en: "passed", he: "עבר" },
  },
  Deploy: {
    cap: { en: "You push, the pipeline builds, the host answers with a live address", he: "דוחפים, הצינור בונה, המארח עונה בכתובת חיה" },
    left: { en: "You", he: "אתם" },
    mid: { en: "Pipeline", he: "צינור" },
    right: { en: "Host", he: "מארח" },
    out: { en: "deploy", he: "פריסה" },
    back: { en: "https://…", he: "https://…" },
  },
  "Preview deployment": {
    cap: { en: "The branch goes through the pipeline. A preview address comes back, not the real site", he: "הברנץ' עובר בצינור. כתובת תצוגה חוזרת, לא האתר האמיתי" },
    left: { en: "Branch", he: "ברנץ'" },
    mid: { en: "Pipeline", he: "צינור" },
    right: { en: "Host", he: "מארח" },
    out: { en: "push", he: "דחיפה" },
    back: { en: "preview URL", he: "כתובת תצוגה" },
  },
  Rollback: {
    cap: { en: "You ask for the previous version. That is what comes back live", he: "מבקשים את הגרסה הקודמת. זה מה שחוזר לאוויר" },
    left: { en: "You", he: "אתם" },
    right: { en: "Host", he: "מארח" },
    out: { en: "roll back", he: "חזרה אחורה" },
    back: { en: "v3 is live", he: "v3 באוויר" },
  },
  Alert: {
    cap: { en: "A number crosses the line. The page comes to you", he: "מספר חוצה את הקו. ההתראה מגיעה אליכם" },
    left: { en: "Monitor", he: "מוניטור" },
    right: { en: "You", he: "אתם" },
    out: { en: "errors > 5%", he: "שגיאות > 5%" },
    back: { en: "page", he: "התראה" },
  },
  "Tracing & correlation id": {
    cap: { en: "The same id crosses the browser, the API, and the database. The trail comes back", he: "אותו מזהה חוצה את הדפדפן, ה-API, ואת מסד הנתונים. השביל חוזר" },
    left: { en: "Browser", he: "דפדפן" },
    mid: { en: "API", he: "API" },
    right: { en: "Database", he: "מסד" },
    out: { en: "id a1b2", he: "מזהה a1b2" },
    back: { en: "the trail", he: "השביל" },
  },
  "Make it verify itself": {
    cap: { en: "You ask the AI to check its own work. The answer is pass or the failures", he: "מבקשים מה-AI לבדוק את העבודה שלו. התשובה היא עבר, או הכשלונות" },
    left: { en: "You", he: "אתם" },
    right: { en: "AI", he: "AI" },
    out: { en: "check this", he: "תבדוק את זה" },
    back: { en: "3 failures", he: "3 כשלונות" },
  },
  "Read the diff": {
    cap: { en: "You ask what changed. The added and removed lines come back", he: "שואלים מה השתנה. השורות שנוספו ונמחקו חוזרות" },
    left: { en: "You", he: "אתם" },
    right: { en: "AI", he: "AI" },
    out: { en: "what changed?", he: "מה השתנה?" },
    back: { en: "the diff", he: "ה-diff" },
  },
};
