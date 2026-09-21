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
export type Flow = { cap: L10n; left: L10n; right: L10n; out: L10n; back: L10n };

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
    cap: { en: "A name is not an address — something has to look it up first", he: "שם הוא לא כתובת — מישהו צריך לתרגם אותו קודם" },
    left: { en: "Browser", he: "דפדפן" },
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
};
