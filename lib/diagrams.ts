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

/** A process, in order. Each beat names the step and where it happens. */
export type FlowStep = { t: L10n; d: L10n };

export const FLOWS: Record<string, Flow> = {
  "Request / Response": {
    cap: { en: "One exchange — request first, response second, always paired", he: "חילופים אחד — ריקווסט קודם, רספונס אחר כך, תמיד בזוגות" },
    left: { en: "Client", he: "קליינט" },
    right: { en: "Server", he: "שרת" },
    out: { en: "Request", he: "ריקווסט" },
    back: { en: "Response", he: "רספונס" },
  },
  "Commit / Branch / Merge": {
    cap: { en: "A branch is a copy. The commit stays local until a merge folds it back", he: "ברנץ' הוא עותק. הקומיט נשאר מקומי עד שמרג' מחזיר אותו" },
    left: { en: "Branch", he: "ברנץ'" },
    right: { en: "Main", he: "ראשי" },
    out: { en: "commit", he: "commit" },
    back: { en: "merge", he: "merge" },
  },
  "Merge conflict": {
    cap: { en: "Git stops when two edits touch the same lines. You choose, then commit", he: "Git עוצר כששני עריכות נוגעות באותן שורות. אתם בוחרים, ואז קומיט" },
    left: { en: "Yours", he: "שלכם" },
    right: { en: "Theirs", he: "שלהם" },
    out: { en: "same lines", he: "אותן שורות" },
    back: { en: "you pick", he: "אתם בוחרים" },
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

/** Detailed sequences. When a term is here, the slide plays these beats instead of a single out-and-back. */
export const STEPS: Record<string, FlowStep[]> = {
  "Clone / push / pull": [
    { t: { en: "Pull", he: "Pull" }, d: { en: "Bring their latest down from the remote", he: "מורידים את הגרסה האחרונה שלהם מהרימוט" } },
    { t: { en: "Change", he: "שינוי" }, d: { en: "Edit the files on your machine", he: "עורכים את הקבצים על המחשב שלכם" } },
    { t: { en: "Commit", he: "Commit" }, d: { en: "Save a snapshot. This stays local", he: "שומרים תמונת מצב. זה נשאר אצלכם" } },
    { t: { en: "Push", he: "Push" }, d: { en: "Send that snapshot up to the remote", he: "שולחים את התמונה הזאת לרימוט" } },
  ],
  "Commit / Branch / Merge": [
    { t: { en: "Branch", he: "ברנץ'" }, d: { en: "Make a copy so the experiment cannot wreck main", he: "עושים עותק כדי שהניסוי לא ישבור את הראשי" } },
    { t: { en: "Change", he: "שינוי" }, d: { en: "Edit only on that copy", he: "עורכים רק על העותק הזה" } },
    { t: { en: "Commit", he: "Commit" }, d: { en: "Snapshot the copy, still local", he: "תמונת מצב של העותק, עדיין מקומי" } },
    { t: { en: "Merge", he: "Merge" }, d: { en: "Fold the good copy back into main", he: "מחזירים את העותק הטוב אל הראשי" } },
  ],
  "Merge conflict": [
    { t: { en: "Same lines", he: "אותן שורות" }, d: { en: "Two changes touch the same lines", he: "שני שינויים נוגעים באותן שורות" } },
    { t: { en: "Git stops", he: "Git עוצר" }, d: { en: "It refuses to guess which lines win", he: "הוא מסרב לנחש אילו שורות מנצחות" } },
    { t: { en: "You pick", he: "אתם בוחרים" }, d: { en: "Read both versions and keep the right lines", he: "קוראים את שתי הגרסאות ושומרים את השורות הנכונות" } },
    { t: { en: "Commit", he: "Commit" }, d: { en: "Save the choice. That is the resolution", he: "שומרים את הבחירה. זו ההכרעה" } },
  ],
  "Pull request & code review": [
    { t: { en: "Push", he: "Push" }, d: { en: "The branch is on the remote, not in main yet", he: "הברנץ' ברימוט, עוד לא בראשי" } },
    { t: { en: "Open", he: "פתיחה" }, d: { en: "A pull request shows the added and removed lines", he: "ה-pull request מראה שורות שנוספו ונמחקו" } },
    { t: { en: "Review", he: "סקירה" }, d: { en: "Someone reads it and leaves comments", he: "מישהו קורא ומשאיר הערות" } },
    { t: { en: "Merge", he: "Merge" }, d: { en: "It joins main only after the comments are settled", he: "זה נכנס לראשי רק אחרי שההערות סגורות" } },
  ],
  "Request / Response": [
    { t: { en: "Ask", he: "שאלה" }, d: { en: "The client writes what it wants", he: "הקליינט כותב מה הוא רוצה" } },
    { t: { en: "Send", he: "שליחה" }, d: { en: "That request travels to the server", he: "הבקשה נוסעת אל השרת" } },
    { t: { en: "Work", he: "עבודה" }, d: { en: "The server does the job, or refuses", he: "השרת עושה את העבודה, או מסרב" } },
    { t: { en: "Answer", he: "תשובה" }, d: { en: "A response comes back, paired with that request", he: "תשובה חוזרת, בזוג עם הבקשה הזאת" } },
  ],
  DNS: [
    { t: { en: "Name", he: "שם" }, d: { en: "You type example.com, not a number", he: "מקלידים example.com, לא מספר" } },
    { t: { en: "Resolver", he: "פותר" }, d: { en: "A resolver takes the question", he: "פותר לוקח את השאלה" } },
    { t: { en: "DNS", he: "DNS" }, d: { en: "The DNS answers with an address", he: "ה-DNS עונה בכתובת" } },
    { t: { en: "Connect", he: "חיבור" }, d: { en: "Only then does the browser open the site", he: "רק אז הדפדפן פותח את האתר" } },
  ],
  "Hit / Miss": [
    { t: { en: "Ask cache", he: "שואלים קאש" }, d: { en: "The app checks the fast copy first", he: "האפליקציה בודקת קודם את העותק המהיר" } },
    { t: { en: "Hit", he: "Hit" }, d: { en: "The copy is there. The database is never asked", he: "העותק שם. המסד לא נשאל בכלל" } },
    { t: { en: "Miss", he: "Miss" }, d: { en: "No copy. The question continues to the database", he: "אין עותק. השאלה ממשיכה למסד" } },
    { t: { en: "Store", he: "שמירה" }, d: { en: "The answer is saved so the next ask is a hit", he: "התשובה נשמרת כדי שהשאלה הבאה תהיה hit" } },
  ],
  "Token / JWT": [
    { t: { en: "Log in", he: "התחברות" }, d: { en: "You prove who you are once", he: "מוכיחים מי אתם פעם אחת" } },
    { t: { en: "Token", he: "טוקן" }, d: { en: "The server hands back a signed token", he: "השרת מחזיר טוקן חתום" } },
    { t: { en: "Every call", he: "כל קריאה" }, d: { en: "The token rides along on the next requests", he: "הטוקן נוסע עם הבקשות הבאות" } },
    { t: { en: "Check", he: "בדיקה" }, d: { en: "No token, or a bad one, and the answer is a refusal", he: "בלי טוקן, או עם טוקן רע, התשובה היא סירוב" } },
  ],
  Webhook: [
    { t: { en: "Event", he: "אירוע" }, d: { en: "Something happens on their side, a payment for example", he: "משהו קורה אצלם, למשל תשלום" } },
    { t: { en: "They call", he: "הם קוראים" }, d: { en: "Their server posts to your address", he: "השרת שלהם שולח לכתובת שלכם" } },
    { t: { en: "You answer", he: "אתם עונים" }, d: { en: "You reply 200 quickly, before they retry", he: "עונים 200 מהר, לפני שהם מנסים שוב" } },
    { t: { en: "Then work", he: "ואז עבודה" }, d: { en: "The slow part happens after the answer, not before", he: "החלק האיטי קורה אחרי התשובה, לא לפני" } },
  ],
  "Health check & uptime monitor": [
    { t: { en: "Timer", he: "טיימר" }, d: { en: "A monitor wakes up every minute", he: "מוניטור מתעורר כל דקה" } },
    { t: { en: "Ping", he: "פינג" }, d: { en: "It asks /healthz and nothing else", he: "הוא שואל /healthz ושום דבר אחר" } },
    { t: { en: "Ok", he: "תקין" }, d: { en: "200 means the app is up", he: "200 אומר שהאפליקציה באוויר" } },
    { t: { en: "Fail", he: "כשל" }, d: { en: "Silence or an error becomes an alert", he: "שקט או שגיאה הופכים להתראה" } },
  ],
  "Compiler / Interpreter": [
    { t: { en: "File", he: "קובץ" }, d: { en: "Your source text goes in", he: "טקסט המקור שלכם נכנס" } },
    { t: { en: "Read", he: "קריאה" }, d: { en: "The translator reads the whole file, or line by line", he: "המתרגם קורא את כל הקובץ, או שורה-שורה" } },
    { t: { en: "Refuse", he: "סירוב" }, d: { en: "A broken line stops it and names the line", he: "שורה שבורה עוצרת אותו ומציינת את השורה" } },
    { t: { en: "Run", he: "הרצה" }, d: { en: "Only a clean translation becomes a running program", he: "רק תרגום נקי הופך לתוכנית שרצה" } },
  ],
  "Package manager": [
    { t: { en: "Name", he: "שם" }, d: { en: "You ask for a package and a version", he: "מבקשים חבילה וגרסה" } },
    { t: { en: "Registry", he: "מאגר" }, d: { en: "The registry looks up that exact version", he: "המאגר מחפש את הגרסה המדויקת" } },
    { t: { en: "Download", he: "הורדה" }, d: { en: "The files land in your project", he: "הקבצים נוחתים בפרויקט" } },
    { t: { en: "Lock", he: "נעילה" }, d: { en: "A lockfile remembers the version so tomorrow matches today", he: "קובץ נעילה זוכר את הגרסה כדי שמחר יהיה כמו היום" } },
  ],
  "Forms & validation": [
    { t: { en: "Fill", he: "מילוי" }, d: { en: "The person types into the boxes", he: "האדם מקליד בתיבות" } },
    { t: { en: "Send", he: "שליחה" }, d: { en: "The browser posts the form to the server", he: "הדפדפן שולח את הטופס לשרת" } },
    { t: { en: "Check", he: "בדיקה" }, d: { en: "The server rejects an empty name. The browser check is not enough", he: "השרת דוחה שם ריק. הבדיקה בדפדפן לא מספיקה" } },
    { t: { en: "Save or say", he: "שומרים או אומרים" }, d: { en: "It saves the row, or it sends back what was wrong", he: "הוא שומר את השורה, או מחזיר מה לא היה בסדר" } },
  ],
  GET: [
    { t: { en: "Ask", he: "בקשה" }, d: { en: "GET /orders asks for the list", he: "GET /orders מבקש את הרשימה" } },
    { t: { en: "No change", he: "בלי שינוי" }, d: { en: "A GET must not create, edit, or delete", he: "GET לא אמור ליצור, לערוך, או למחוק" } },
    { t: { en: "Read", he: "קריאה" }, d: { en: "The server only looks the data up", he: "השרת רק מחפש את הנתונים" } },
    { t: { en: "200", he: "200" }, d: { en: "The list comes back with the page", he: "הרשימה חוזרת עם העמוד" } },
  ],
  "POST / PUT / PATCH / DELETE": [
    { t: { en: "Change", he: "שינוי" }, d: { en: "The body says what should be different", he: "הגוף אומר מה צריך להיות שונה" } },
    { t: { en: "Send", he: "שליחה" }, d: { en: "POST creates, PUT replaces, PATCH edits, DELETE removes", he: "POST יוצר, PUT מחליף, PATCH עורך, DELETE מוחק" } },
    { t: { en: "Server", he: "שרת" }, d: { en: "The server applies it, or rejects it", he: "השרת מיישם, או דוחה" } },
    { t: { en: "Status", he: "סטטוס" }, d: { en: "201 means created. 400 means you sent something it will not take", he: "201 אומר נוצר. 400 אומר שלחתם משהו שהוא לא יקבל" } },
  ],
  Query: [
    { t: { en: "Question", he: "שאלה" }, d: { en: "The app writes a question, not a whole dump", he: "האפליקציה כותבת שאלה, לא שפיכה של הכל" } },
    { t: { en: "Send", he: "שליחה" }, d: { en: "The question goes to the database", he: "השאלה הולכת למסד" } },
    { t: { en: "Find", he: "מציאה" }, d: { en: "An index makes the lookup fast. Without one it reads the whole table", he: "אינדקס עושה את החיפוש מהיר. בלי אחד הוא קורא את כל הטבלה" } },
    { t: { en: "Rows", he: "שורות" }, d: { en: "Only the matching rows come back", he: "רק השורות שתואמות חוזרות" } },
  ],
  "Polling vs push": [
    { t: { en: "Ask", he: "שאלה" }, d: { en: "The page asks: done yet?", he: "העמוד שואל: נגמר?" } },
    { t: { en: "Not yet", he: "עוד לא" }, d: { en: "The server says no. The page waits", he: "השרת אומר לא. העמוד מחכה" } },
    { t: { en: "Ask again", he: "שואלים שוב" }, d: { en: "It asks on a timer until the answer changes", he: "הוא שואל בטיימר עד שהתשובה משתנה" } },
    { t: { en: "Done", he: "נגמר" }, d: { en: "Push skips the asking: the server speaks when it is ready", he: "Push מדלג על השאלות: השרת מדבר כשהוא מוכן" } },
  ],
  Pagination: [
    { t: { en: "Ask", he: "בקשה" }, d: { en: "The client asks for page 2, not everything", he: "הקליינט מבקש עמוד 2, לא את הכל" } },
    { t: { en: "Slice", he: "פרוסה" }, d: { en: "The API cuts twenty rows", he: "ה-API חותך עשרים שורות" } },
    { t: { en: "Return", he: "החזרה" }, d: { en: "Those twenty come back, plus a hint that more exist", he: "עשרים האלה חוזרות, ועוד רמז שיש עוד" } },
    { t: { en: "Next", he: "הבא" }, d: { en: "The next click asks for page 3", he: "הלחיצה הבאה מבקשת עמוד 3" } },
  ],
  "Timeouts & retries": [
    { t: { en: "Call", he: "קריאה" }, d: { en: "Your app asks their API", he: "האפליקציה שואלת את ה-API שלהם" } },
    { t: { en: "Wait", he: "המתנה" }, d: { en: "A clock starts. The answer has a deadline", he: "שעון מתחיל. לתשובה יש דדליין" } },
    { t: { en: "Too late", he: "מאוחר" }, d: { en: "Past the deadline, the answer does not count", he: "אחרי הדדליין, התשובה לא נחשבת" } },
    { t: { en: "Retry", he: "ניסיון נוסף" }, d: { en: "You try again, or you show an error and stop", he: "מנסים שוב, או מראים שגיאה ועוצרים" } },
  ],
  "Retry & backoff": [
    { t: { en: "Try 1", he: "ניסיון 1" }, d: { en: "The first call gets a 503", he: "הקריאה הראשונה מקבלת 503" } },
    { t: { en: "Wait", he: "המתנה" }, d: { en: "You pause, longer than a frantic instant retry", he: "עוצרים, יותר מרגע של ניסיון מיידי" } },
    { t: { en: "Try 2", he: "ניסיון 2" }, d: { en: "A quieter second call goes out", he: "קריאה שנייה שקטה יותר יוצאת" } },
    { t: { en: "Stop", he: "עצירה" }, d: { en: "After a few failures you stop, so you do not hammer them", he: "אחרי כמה כשלונות עוצרים, כדי לא להפציץ אותם" } },
  ],
  "API key vs OAuth app": [
    { t: { en: "Key", he: "מפתח" }, d: { en: "A secret key is attached to the call", he: "מפתח סודי מצורף לקריאה" } },
    { t: { en: "Send", he: "שליחה" }, d: { en: "Their API sees the key before the data", he: "ה-API שלהם רואה את המפתח לפני הנתונים" } },
    { t: { en: "Recognise", he: "זיהוי" }, d: { en: "A known key is allowed. An unknown one is refused", he: "מפתח מוכר מורשה. מפתח לא מוכר נדחה" } },
    { t: { en: "Data", he: "נתונים" }, d: { en: "Only then does the payload come back", he: "רק אז המטען חוזר" } },
  ],
  "Background job": [
    { t: { en: "Click", he: "לחיצה" }, d: { en: "The page asks for something slow, like an email", he: "העמוד מבקש משהו איטי, כמו מייל" } },
    { t: { en: "Queue", he: "תור" }, d: { en: "The job is written down and the page is free", he: "העבודה נרשמת והעמוד פנוי" } },
    { t: { en: "Worker", he: "עובד" }, d: { en: "A worker picks the job up when it can", he: "עובד מרים את העבודה כשהוא יכול" } },
    { t: { en: "Done", he: "נגמר" }, d: { en: "Sent comes back later, not while the person is staring", he: "נשלח חוזר אחר כך, לא בזמן שהאדם בוהה" } },
  ],
  "Queue / worker": [
    { t: { en: "Drop", he: "הנחה" }, d: { en: "The app puts job 18 on the queue", he: "האפליקציה שמה את עבודה 18 על התור" } },
    { t: { en: "Wait", he: "המתנה" }, d: { en: "The job sits until a worker is free", he: "העבודה יושבת עד שעובד פנוי" } },
    { t: { en: "Take", he: "לקיחה" }, d: { en: "One worker takes it. Two workers must not take the same one", he: "עובד אחד לוקח. שני עובדים לא אמורים לקחת את אותה אחת" } },
    { t: { en: "Done", he: "נגמר" }, d: { en: "Finished travels back. A crash returns the job to the queue", he: "נגמר חוזר. קריסה מחזירה את העבודה לתור" } },
  ],
  "Event & pub/sub": [
    { t: { en: "Fact", he: "עובדה" }, d: { en: "Orders decides an order was placed", he: "הזמנות מחליטות שהזמנה בוצעה" } },
    { t: { en: "Publish", he: "פרסום" }, d: { en: "It puts OrderPlaced on the bus and does not call billing", he: "היא שמה OrderPlaced על האפיק ולא קוראת לחיוב" } },
    { t: { en: "Deliver", he: "מסירה" }, d: { en: "The bus hands that fact to whoever is listening", he: "האפיק מוסר את העובדה למי שמאזין" } },
    { t: { en: "Receive", he: "קבלה" }, d: { en: "Billing receives it and charges. Orders already moved on", he: "חיוב מקבל וגובה. הזמנות כבר המשיכו" } },
  ],
  "Real-time (WebSocket / SSE)": [
    { t: { en: "Connect", he: "חיבור" }, d: { en: "The browser opens one line and keeps it", he: "הדפדפן פותח קו אחד ושומר אותו" } },
    { t: { en: "Stay open", he: "נשאר פתוח" }, d: { en: "Nobody hangs up between messages", he: "אף אחד לא מנתק בין הודעות" } },
    { t: { en: "Push", he: "דחיפה" }, d: { en: "The server sends the next event down that line", he: "השרת שולח את האירוע הבא על הקו הזה" } },
    { t: { en: "Show", he: "הצגה" }, d: { en: "The page updates without a refresh", he: "העמוד מתעדכן בלי רענון" } },
  ],
  "Session & cookie": [
    { t: { en: "Log in", he: "התחברות" }, d: { en: "Email and password go to the server once", he: "מייל וסיסמה הולכים לשרת פעם אחת" } },
    { t: { en: "Cookie", he: "עוגייה" }, d: { en: "The server sends Set-Cookie back", he: "השרת שולח Set-Cookie בחזרה" } },
    { t: { en: "Store", he: "שמירה" }, d: { en: "The browser keeps that cookie", he: "הדפדפן שומר את העוגייה" } },
    { t: { en: "Next visit", he: "ביקור הבא" }, d: { en: "Every later request carries it, so you stay signed in", he: "כל בקשה אחר כך סוחבת אותה, אז נשארים מחוברים" } },
  ],
  OAuth: [
    { t: { en: "Click", he: "לחיצה" }, d: { en: "The person asks your app to log in", he: "האדם מבקש מהאפליקציה להתחבר" } },
    { t: { en: "Redirect", he: "הפניה" }, d: { en: "The browser is sent to Google, not given your password store", he: "הדפדפן נשלח ל-Google, לא למחסן הסיסמאות שלכם" } },
    { t: { en: "Allow", he: "אישור" }, d: { en: "They approve it on Google's page", he: "הם מאשרים בעמוד של Google" } },
    { t: { en: "Code", he: "קוד" }, d: { en: "Google sends a code back. The password never comes with it", he: "Google שולח קוד בחזרה. הסיסמה לא מגיעה איתו" } },
  ],
  CORS: [
    { t: { en: "Other site", he: "אתר אחר" }, d: { en: "A page on one site wants data from another", he: "עמוד באתר אחד רוצה נתונים מאתר אחר" } },
    { t: { en: "Ask", he: "שאלה" }, d: { en: "The browser asks the API: may I?", he: "הדפדפן שואל את ה-API: מותר לי?" } },
    { t: { en: "Allow", he: "אישור" }, d: { en: "The API answers with an allow, or it does not", he: "ה-API עונה באישור, או שלא" } },
    { t: { en: "Then data", he: "ואז נתונים" }, d: { en: "Only an allow lets the browser show the answer to the page", he: "רק אישור נותן לדפדפן להראות את התשובה לעמוד" } },
  ],
  "HTTPS / TLS": [
    { t: { en: "Hello", he: "שלום" }, d: { en: "The browser introduces itself", he: "הדפדפן מציג את עצמו" } },
    { t: { en: "Certificate", he: "תעודה" }, d: { en: "The server shows a certificate that names the site", he: "השרת מראה תעודה שמציינת את האתר" } },
    { t: { en: "Lock", he: "מנעול" }, d: { en: "They agree on a lock before any real message", he: "הם מסכימים על מנעול לפני כל הודעה אמיתית" } },
    { t: { en: "Talk", he: "דיבור" }, d: { en: "The request and the response travel inside that lock", he: "הבקשה והתשובה נוסעות בתוך המנעול" } },
  ],
  "Load balancer": [
    { t: { en: "Arrive", he: "הגעה" }, d: { en: "The client's request hits the balancer first", he: "הבקשה של הקליינט פוגעת קודם במאזן" } },
    { t: { en: "Pick", he: "בחירה" }, d: { en: "It chooses a server that has room", he: "הוא בוחר שרת שיש לו מקום" } },
    { t: { en: "Forward", he: "העברה" }, d: { en: "That server does the work", he: "השרת הזה עושה את העבודה" } },
    { t: { en: "Return", he: "חזרה" }, d: { en: "The page comes back through the balancer to the client", he: "העמוד חוזר דרך המאזן אל הקליינט" } },
  ],
  Idempotency: [
    { t: { en: "Key", he: "מפתח" }, d: { en: "The call carries a key, pay · 9", he: "הקריאה סוחבת מפתח, שלם · 9" } },
    { t: { en: "First time", he: "פעם ראשונה" }, d: { en: "The API charges once and stores the receipt", he: "ה-API גובה פעם אחת ושומר את הקבלה" } },
    { t: { en: "Again", he: "שוב" }, d: { en: "The same key arrives a second time", he: "אותו מפתח מגיע פעם שנייה" } },
    { t: { en: "Same receipt", he: "אותה קבלה" }, d: { en: "It does not charge again. It returns the first receipt", he: "הוא לא גובה שוב. הוא מחזיר את הקבלה הראשונה" } },
  ],
  "Rate limiting": [
    { t: { en: "Calls", he: "קריאות" }, d: { en: "The client sends call after call", he: "הקליינט שולח קריאה אחרי קריאה" } },
    { t: { en: "Count", he: "ספירה" }, d: { en: "The API counts them inside a window", he: "ה-API סופר אותן בתוך חלון" } },
    { t: { en: "Limit", he: "גבול" }, d: { en: "Call 101 crosses the line", he: "קריאה 101 חוצה את הקו" } },
    { t: { en: "429", he: "429" }, d: { en: "The answer is slow down, not the data", he: "התשובה היא לאט, לא הנתונים" } },
  ],
  "Browser cache": [
    { t: { en: "First visit", he: "ביקור ראשון" }, d: { en: "The browser downloads app.js", he: "הדפדפן מוריד את app.js" } },
    { t: { en: "Store", he: "שמירה" }, d: { en: "It keeps a copy, with a freshness time", he: "הוא שומר עותק, עם זמן טריות" } },
    { t: { en: "Second visit", he: "ביקור שני" }, d: { en: "It asks: do I already have this?", he: "הוא שואל: זה כבר אצלי?" } },
    { t: { en: "Use copy", he: "שימוש בעותק" }, d: { en: "Yes. It does not download the file again", he: "כן. הוא לא מוריד את הקובץ שוב" } },
  ],
  CDN: [
    { t: { en: "Client", he: "קליינט" }, d: { en: "The browser asks for app.js", he: "הדפדפן מבקש את app.js" } },
    { t: { en: "CDN", he: "CDN" }, d: { en: "A copy near you receives the ask", he: "עותק קרוב אליכם מקבל את הבקשה" } },
    { t: { en: "Origin", he: "מקור" }, d: { en: "Only a miss continues to the origin, where the real file lives", he: "רק פספוס ממשיך למקור, שם הקובץ האמיתי חי" } },
    { t: { en: "File", he: "קובץ" }, d: { en: "The file comes back through the CDN, which keeps a copy", he: "הקובץ חוזר דרך ה-CDN, ששומר עותק" } },
  ],
  "Reverse proxy": [
    { t: { en: "Browser", he: "דפדפן" }, d: { en: "The visitor asks for the page", he: "המבקר מבקש את העמוד" } },
    { t: { en: "Proxy", he: "פרוקסי" }, d: { en: "They talk only to the proxy, never to the app directly", he: "הם מדברים רק עם הפרוקסי, אף פעם לא ישירות עם האפליקציה" } },
    { t: { en: "App", he: "אפליקציה" }, d: { en: "The proxy fetches the page from the app", he: "הפרוקסי מביא את העמוד מהאפליקציה" } },
    { t: { en: "Page", he: "עמוד" }, d: { en: "The page returns through the proxy to the browser", he: "העמוד חוזר דרך הפרוקסי אל הדפדפן" } },
  ],
  "CI/CD": [
    { t: { en: "Push", he: "Push" }, d: { en: "You send the commit to the repo", he: "שולחים את הקומיט לריפו" } },
    { t: { en: "Pipeline", he: "צינור" }, d: { en: "The pipeline wakes up on that push", he: "הצינור מתעורר על הדחיפה הזאת" } },
    { t: { en: "Checks", he: "בדיקות" }, d: { en: "It builds and runs the tests", he: "הוא בונה ומריץ את הבדיקות" } },
    { t: { en: "Result", he: "תוצאה" }, d: { en: "Passed or failed comes back. Failed does not ship", he: "עבר או נכשל חוזר. נכשל לא נשלח" } },
  ],
  Deploy: [
    { t: { en: "Push", he: "Push" }, d: { en: "The code leaves your machine", he: "הקוד עוזב את המחשב" } },
    { t: { en: "Build", he: "בנייה" }, d: { en: "The pipeline turns it into something runnable", he: "הצינור הופך אותו למשהו שאפשר להריץ" } },
    { t: { en: "Host", he: "מארח" }, d: { en: "The host swaps in that build", he: "המארח מחליף לבנייה הזאת" } },
    { t: { en: "Live", he: "באוויר" }, d: { en: "A real address comes back and serves the new version", he: "כתובת אמיתית חוזרת ומגישה את הגרסה החדשה" } },
  ],
  "Preview deployment": [
    { t: { en: "Branch", he: "ברנץ'" }, d: { en: "The work is on a branch, not on main", he: "העבודה על ברנץ', לא על הראשי" } },
    { t: { en: "Push", he: "Push" }, d: { en: "That branch is pushed", he: "הברנץ' הזה נדחף" } },
    { t: { en: "Build", he: "בנייה" }, d: { en: "The pipeline builds just that branch", he: "הצינור בונה רק את הברנץ' הזה" } },
    { t: { en: "Preview", he: "תצוגה" }, d: { en: "A separate address comes back. The real site is untouched", he: "כתובת נפרדת חוזרת. האתר האמיתי לא נגע" } },
  ],
  Rollback: [
    { t: { en: "Bad release", he: "שחרור רע" }, d: { en: "The version that is live is wrong", he: "הגרסה שבאוויר שגויה" } },
    { t: { en: "Ask", he: "בקשה" }, d: { en: "You tell the host to go back", he: "אומרים למארח לחזור אחורה" } },
    { t: { en: "Previous", he: "קודמת" }, d: { en: "It puts the last good version in place", he: "הוא שם את הגרסה הטובה האחרונה" } },
    { t: { en: "Live", he: "באוויר" }, d: { en: "Visitors now get that older version", he: "מבקרים מקבלים עכשיו את הגרסה הישנה יותר" } },
  ],
  Alert: [
    { t: { en: "Watch", he: "צפייה" }, d: { en: "A monitor watches the error rate", he: "מוניטור צופה בשיעור השגיאות" } },
    { t: { en: "Cross", he: "חצייה" }, d: { en: "Errors go over 5%", he: "השגיאות עוברות 5%" } },
    { t: { en: "Fire", he: "ירי" }, d: { en: "The rule fires an alert", he: "הכלל יורה התראה" } },
    { t: { en: "Reach you", he: "מגיע אליכם" }, d: { en: "The page arrives. The number alone does not", he: "ההתראה מגיעה. המספר לבד לא" } },
  ],
  "Tracing & correlation id": [
    { t: { en: "Browser", he: "דפדפן" }, d: { en: "The request is born with an id, a1b2", he: "הבקשה נולדת עם מזהה, a1b2" } },
    { t: { en: "API", he: "API" }, d: { en: "The API keeps that same id as it works", he: "ה-API שומר את אותו מזהה בזמן שהוא עובד" } },
    { t: { en: "Database", he: "מסד" }, d: { en: "The database call is stamped with it too", he: "גם הקריאה למסד חתומה בו" } },
    { t: { en: "Trail", he: "שביל" }, d: { en: "Later you follow a1b2 across every hop", he: "אחר כך עוקבים אחרי a1b2 בכל תחנה" } },
  ],
  "Make it verify itself": [
    { t: { en: "Ask", he: "בקשה" }, d: { en: "You tell the AI to check its own work", he: "אומרים ל-AI לבדוק את העבודה שלו" } },
    { t: { en: "Run", he: "הרצה" }, d: { en: "It runs the check, it does not just say looks good", he: "הוא מריץ את הבדיקה, לא רק אומר נראה טוב" } },
    { t: { en: "Failures", he: "כשלונות" }, d: { en: "It lists what failed, with the line", he: "הוא רושם מה נכשל, עם השורה" } },
    { t: { en: "You read", he: "אתם קוראים" }, d: { en: "You read that list before you trust the change", he: "קוראים את הרשימה לפני שסומכים על השינוי" } },
  ],
  "Read the diff": [
    { t: { en: "Ask", he: "שאלה" }, d: { en: "You ask what changed, not fix it", he: "שואלים מה השתנה, לא לתקן" } },
    { t: { en: "Diff", he: "Diff" }, d: { en: "Added lines and removed lines come back", he: "שורות שנוספו ושורות שנמחקו חוזרות" } },
    { t: { en: "Removed", he: "נמחק" }, d: { en: "You read what was deleted before what was added", he: "קוראים מה נמחק לפני מה שנוסף" } },
    { t: { en: "Decide", he: "החלטה" }, d: { en: "If you cannot say what it does, you have not reviewed it", he: "אם אי אפשר להגיד מה זה עושה, לא סקרתם" } },
  ],
};
