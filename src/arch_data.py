# -*- coding: utf-8 -*-
"""Five real architectures: the shapes real products take, simplest first."""

ARCHITECTURES = {
 "id": "architectures", "icon": "⬡",
 "title": {"en": "Five Real Architectures", "he": "חמש ארכיטקטורות אמיתיות"},
 "blurb": {"en": "Almost every product you have ever used is one of these five shapes. Learn them, then pick the smallest one that fits — and know what forces you up to the next.",
           "he": "כמעט כל מוצר שאי פעם השתמשת בו הוא אחת מחמש הצורות האלה. תלמד אותן, ואז תבחר את הקטנה ביותר שמתאימה — ותדע מה דוחף אותך לבאה."},
 "items": [

  # ---------------------------------------------------------------- 1
  {"id": "static-site",
   "title": {"en": "Static site + CDN", "he": "אתר סטטי + CDN"},
   "tag": {"en": "A landing page, a blog, docs, a portfolio — this course itself",
           "he": "דף נחיתה, בלוג, תיעוד, פורטפוליו — הקורס הזה עצמו"},
   "diagram": (
    " you: git push ──► CI builds ──► uploads files ──► [Origin store]\n"
    "                                                    (S3 / provider)\n"
    "                                                          ▲\n"
    " [Browser] ──HTTPS GET /──► ┌──────────────────────┐ miss │\n"
    "     ▲                      │ CDN edge (nearest)   │──────┘\n"
    "     │ HTML, JS, CSS, img   │ Netlify / CF Pages / │\n"
    "     └──────────────────────│ CloudFront; caches   │\n"
    "                            │ by TTL, serves HTTPS │\n"
    "                            └──────────────────────┘\n"
    " [Browser] ──form POST──► [3rd-party endpoint: Formspree etc.]\n"
    "                           (their server, not yours)\n"
    "\n"
    " No server of yours runs. Nothing here is private: every file\n"
    " the CDN serves can be read by anyone. Secrets cannot live here."
   ),
   "flow": {"en": "Someone types your domain. DNS points at the CDN, and the browser opens an HTTPS connection to the edge node nearest to them — Frankfurt, not Virginia. The edge already holds index.html from a previous visitor, so it answers in a few milliseconds without touching anything else. The HTML references app.js and style.css; those are cached too, with a long TTL, because the build step gave them fingerprinted names that change whenever the content does. The page renders. If the visitor fills in the contact form, the browser POSTs straight to a third-party form endpoint that emails you. When you push a change, CI rebuilds the files, uploads them to the origin store and tells the CDN to drop its old copies. Nothing of yours is ever running between visits.",
            "he": "מישהו מקליד את הדומיין שלך. ה-DNS מצביע על ה-CDN, והדפדפן פותח חיבור HTTPS לצומת הקצה הקרוב אליו ביותר — פרנקפורט, לא וירג׳יניה. הקצה כבר מחזיק את index.html ממבקר קודם, אז הוא עונה בכמה מילישניות בלי לגעת בשום דבר אחר. ה-HTML מפנה ל-app.js ול-style.css; גם הם במטמון, עם TTL ארוך, כי שלב הבנייה נתן להם שמות עם טביעת אצבע שמשתנים בכל פעם שהתוכן משתנה. הדף מתרנדר. אם המבקר ממלא את טופס יצירת הקשר, הדפדפן שולח POST ישירות לנקודת קצה של שירות טפסים חיצוני ששולח לך מייל. כשאתה דוחף שינוי, ה-CI בונה מחדש את הקבצים, מעלה אותם למחסן המקור ואומר ל-CDN לזרוק את העותקים הישנים. שום דבר שלך לא רץ בין ביקור לביקור."},
   "parts": [
    {"n": {"en": "Build step (CI)", "he": "שלב בנייה (CI)"},
     "d": {"en": "Runs once per push: turns your source (Markdown, templates, TypeScript) into plain HTML, JS and CSS files with fingerprinted names.",
           "he": "רץ פעם אחת בכל push: הופך את המקור שלך (Markdown, תבניות, TypeScript) לקבצי HTML, JS ו-CSS פשוטים עם שמות בעלי טביעת אצבע."}},
    {"n": {"en": "Origin store", "he": "מחסן המקור"},
     "d": {"en": "Where the built files live: an S3 bucket or the hosting provider's own storage. The CDN reads from here only on a cache miss.",
           "he": "איפה שהקבצים הבנויים חיים: דלי S3 או האחסון של ספק ההוסטינג. ה-CDN קורא מכאן רק כשיש החטאה במטמון."}},
    {"n": {"en": "CDN edge", "he": "קצה ה-CDN"},
     "d": {"en": "Hundreds of servers worldwide holding copies of your files. Terminates HTTPS, serves from the nearest city, absorbs traffic spikes for you.",
           "he": "מאות שרתים ברחבי העולם שמחזיקים עותקים של הקבצים שלך. מסיים את ה-HTTPS, מגיש מהעיר הקרובה ביותר, סופג בשבילך זינוקי תעבורה."}},
    {"n": {"en": "DNS + certificate", "he": "DNS + תעודה"},
     "d": {"en": "Your domain points at the CDN; the provider issues and renews the TLS certificate automatically. You never touch either after setup.",
           "he": "הדומיין שלך מצביע על ה-CDN; הספק מוציא ומחדש את תעודת ה-TLS אוטומטית. אחרי ההקמה אתה לא נוגע באף אחד מהם."}},
    {"n": {"en": "Third-party form endpoint", "he": "נקודת קצה חיצונית לטפסים"},
     "d": {"en": "The one thing a static page cannot do is receive data. Formspree, Netlify Forms or a Google Form accept the POST and email you.",
           "he": "הדבר האחד שדף סטטי לא יכול לעשות הוא לקבל נתונים. Formspree, Netlify Forms או Google Form מקבלים את ה-POST ושולחים לך מייל."}},
   ],
   "good": {"en": "Content that is the same for every visitor: marketing pages, documentation, a blog, a course. It is the fastest, cheapest and most secure shape there is, because there is nothing to break into and nothing to keep running. Start here by default and leave only when you must.",
            "he": "תוכן שזהה לכל מבקר: דפי שיווק, תיעוד, בלוג, קורס. זו הצורה המהירה, הזולה והבטוחה ביותר שיש, כי אין למה לפרוץ ואין מה להחזיק רץ. תתחיל כאן כברירת מחדל ותעזוב רק כשאתה חייב."},
   "bad": {"en": "The moment a page must differ per user — a login, a dashboard, a cart — it stops being static. You also cannot hold a secret: any API key shipped in app.js is public within the hour. Client-side JavaScript calling third-party APIs directly gets you surprisingly far, but at some point you need a server, even a tiny one.",
           "he": "ברגע שדף צריך להיות שונה לכל משתמש — התחברות, דשבורד, עגלה — הוא מפסיק להיות סטטי. גם אי אפשר להחזיק סוד: כל מפתח API שנשלח בתוך app.js הוא ציבורי בתוך שעה. JavaScript בצד הלקוח שקורא ישירות ל-APIs חיצוניים מביא אותך רחוק באופן מפתיע, אבל בשלב מסוים אתה צריך שרת, אפילו זעיר."},
   "cost": {"en": "$0–5/month. Netlify, Vercel, Cloudflare Pages and GitHub Pages all have free tiers that cover a typical site; S3 + CloudFront runs about $1–3/month for a few GB of storage and ~50 GB of transfer. What drives it up: bandwidth past ~100 GB/month (video, huge images), form submissions beyond the free quota (~100/month), and paid seats for a team.",
            "he": "0–5 דולר לחודש. ל-Netlify, Vercel, Cloudflare Pages ו-GitHub Pages יש שכבות חינמיות שמכסות אתר טיפוסי; S3 + CloudFront עולה בערך 1–3 דולר לחודש על כמה ג׳יגה אחסון ו-50 ג׳יגה תעבורה. מה שמעלה את המחיר: תעבורה מעל ~100 ג׳יגה לחודש (וידאו, תמונות ענק), שליחות טפסים מעבר למכסה החינמית (~100 לחודש), ומושבים בתשלום לצוות."},
   "scale": {"en": "Effectively unlimited for reads: a CDN that serves your blog to 50 people serves it to 5 million during a viral day without you doing anything. The first bottleneck is not traffic but features — the day you need a user account or per-user data, you add a backend (serverless or a small monolith) and keep the static frontend exactly as it is.",
             "he": "בפועל בלתי מוגבל לקריאה: CDN שמגיש את הבלוג שלך ל-50 אנשים מגיש אותו ל-5 מיליון ביום ויראלי בלי שתעשה כלום. צוואר הבקבוק הראשון הוא לא תעבורה אלא פיצ׳רים — ביום שאתה צריך חשבון משתמש או נתונים לכל משתמש, אתה מוסיף backend (serverless או מונולית קטן) ומשאיר את הפרונט הסטטי בדיוק כמו שהוא."},
   "uses": ["CDN", "Browser cache", "TTL", "DNS", "HTTPS / TLS", "CI/CD", "S3 / object storage", "Frontend"],
   "prompt": "Scaffold a static marketing site for a small product called \"Inkwell\" (a note-taking app) with exactly these pieces and nothing more:\n\n1. Plain HTML + CSS + a small amount of vanilla JS. No framework, no bundler unless you can justify it in one sentence.\n2. A build script (Node or Python, your choice) that copies /src to /dist and appends a content hash to .js and .css filenames, rewriting the references in HTML.\n3. A contact form that POSTs to a third-party endpoint (use a FORM_ENDPOINT placeholder), with client-side validation only.\n4. A netlify.toml OR a small Terraform file for S3 + CloudFront (pick one, say why), including cache headers: long TTL for hashed assets, short TTL for HTML.\n5. A GitHub Actions workflow that builds and deploys on push to main.\n\nDo NOT add: a server, a database, auth, analytics, a CMS, or any npm package beyond what the build script needs.\nEnd with a short section: what this shape cannot do, and the first feature that would force a backend."},

  # ---------------------------------------------------------------- 2
  {"id": "classic-monolith",
   "title": {"en": "The classic web app (monolith)", "he": "אפליקציית הווב הקלאסית (מונולית)"},
   "tag": {"en": "A SaaS, a marketplace, an internal tool — anything with users and data. What the capstone builds",
           "he": "SaaS, מרקטפלייס, כלי פנימי — כל דבר עם משתמשים ונתונים. מה שהפרויקט המסכם בונה"},
   "diagram": (
    " [Browser] ──HTTPS──► ┌────────────────────────┐\n"
    "                      │ Load balancer (ALB)    │   public\n"
    "                      └───────┬────────┬───────┘\n"
    " ═══ internet boundary ═══════╪════════╪════ private network (VPC) ═══\n"
    "               ┌──────────────┐  ┌──────────────┐  ┌──────────────┐\n"
    "               │ app #1       │  │ app #2       │  │ worker/cron  │\n"
    "               │ Docker task  │  │ same image   │  │ small task   │\n"
    "               └──────┬───────┘  └──────┬───────┘  └──────┬───────┘\n"
    "                      └────────┬────────┴─────────────────┘\n"
    "              ┌────────────────┼─────────────────┐\n"
    "              ▼                ▼                 ▼\n"
    "       ┌────────────┐   ┌────────────┐   ┌────────────────┐\n"
    "       │ Postgres   │   │ Redis      │   │ S3 uploads     │\n"
    "       │ RDS,private│   │ sess/cache/│   │ private bucket,│\n"
    "       └────────────┘   │ queue      │   │ signed URLs    │\n"
    "                        └────────────┘   └────────────────┘"
   ),
   "flow": {"en": "A user clicks \"Save\" on an order. The browser sends POST /orders over HTTPS to the load balancer, which terminates TLS and forwards the request to whichever of the two app containers is healthier at that instant. The container reads the session cookie, looks the session up in Redis, and knows who the user is. It validates the payload, opens a Postgres transaction, inserts the order, commits, and pushes a job onto a Redis queue: \"send confirmation email for order 8812\". It returns 201 in about 40 ms. Separately, the worker container pops that job, renders the email and calls the email provider; if the provider is down it retries with backoff. Ten minutes later the user uploads a receipt: the app hands the browser a signed S3 URL, the file goes straight to the bucket, and only the key is stored in Postgres.",
            "he": "משתמש לוחץ ״שמור״ על הזמנה. הדפדפן שולח POST /orders ב-HTTPS למאזן העומסים, שמסיים את ה-TLS ומעביר את הבקשה לאיזה משני קונטיינרי האפליקציה שבריא יותר באותו רגע. הקונטיינר קורא את עוגיית הסשן, מחפש את הסשן ב-Redis, ויודע מי המשתמש. הוא מאמת את הגוף, פותח טרנזקציה ב-Postgres, מכניס את ההזמנה, מבצע commit, ודוחף עבודה לתור ב-Redis: ״שלח מייל אישור להזמנה 8812״. הוא מחזיר 201 תוך כ-40 מילישניות. בנפרד, קונטיינר ה-worker מוציא את העבודה מהתור, מרנדר את המייל וקורא לספק המיילים; אם הספק למטה הוא מנסה שוב עם backoff. עשר דקות אחר כך המשתמש מעלה קבלה: האפליקציה נותנת לדפדפן כתובת S3 חתומה, הקובץ הולך ישר לדלי, ורק המפתח נשמר ב-Postgres."},
   "parts": [
    {"n": {"en": "Load balancer", "he": "מאזן עומסים"},
     "d": {"en": "The only public entry point. Holds the TLS certificate, health-checks each container every few seconds, and stops sending traffic to one that fails.",
           "he": "נקודת הכניסה הציבורית היחידה. מחזיק את תעודת ה-TLS, בודק את בריאות כל קונטיינר כל כמה שניות, ומפסיק לשלוח תעבורה לאחד שנכשל."}},
    {"n": {"en": "Two identical app containers", "he": "שני קונטיינרי אפליקציה זהים"},
     "d": {"en": "The same Docker image running twice (ECS Fargate, Cloud Run, Fly). Stateless on purpose: any request can land on either one, so one can die or be replaced mid-deploy.",
           "he": "אותה דמות Docker רצה פעמיים (ECS Fargate, Cloud Run, Fly). חסרי מצב בכוונה: כל בקשה יכולה לנחות על כל אחד מהם, אז אחד יכול למות או להתחלף באמצע פריסה."}},
    {"n": {"en": "Managed Postgres", "he": "Postgres מנוהל"},
     "d": {"en": "The single source of truth. RDS or equivalent handles backups, patching and failover; you handle the schema, indexes and migrations.",
           "he": "מקור האמת היחיד. RDS או שווה ערך מטפל בגיבויים, עדכונים ו-failover; אתה מטפל בסכמה, באינדקסים ובמיגרציות."}},
    {"n": {"en": "Managed Redis", "he": "Redis מנוהל"},
     "d": {"en": "Three jobs in one box: session store so both containers see the same logins, cache for hot reads, and the queue the worker consumes. Losing it is annoying, not fatal.",
           "he": "שלוש עבודות בקופסה אחת: מחסן סשנים כדי ששני הקונטיינרים יראו את אותן התחברויות, מטמון לקריאות חמות, והתור שה-worker צורך. לאבד אותו זה מעצבן, לא קטלני."}},
    {"n": {"en": "Worker / cron container", "he": "קונטיינר worker / cron"},
     "d": {"en": "The same codebase started with a different command. Sends emails, resizes images, runs the nightly report — anything too slow for a request to wait on.",
           "he": "אותו קוד, מופעל עם פקודה אחרת. שולח מיילים, מקטין תמונות, מריץ את הדוח הלילי — כל דבר שאיטי מדי בשביל שבקשה תחכה לו."}},
    {"n": {"en": "Object storage for uploads", "he": "אחסון אובייקטים להעלאות"},
     "d": {"en": "A private S3 bucket. Files never touch the app's disk; the browser uploads and downloads via short-lived signed URLs the app issues.",
           "he": "דלי S3 פרטי. קבצים לא נוגעים בדיסק של האפליקציה; הדפדפן מעלה ומוריד דרך כתובות חתומות קצרות-חיים שהאפליקציה מוציאה."}},
   ],
   "good": {"en": "Almost every product with users, for its first several years. One codebase, one deploy, one database you can reason about with a single transaction. This is exactly what the capstone project builds, and it is the shape most funded startups still run at Series B. Two containers give you zero-downtime deploys and survive a single crash.",
            "he": "כמעט כל מוצר עם משתמשים, בשנים הראשונות שלו. קוד אחד, פריסה אחת, בסיס נתונים אחד שאפשר לחשוב עליו עם טרנזקציה אחת. זה בדיוק מה שהפרויקט המסכם בונה, וזו הצורה שרוב הסטארטאפים הממומנים עדיין מריצים בסבב B. שני קונטיינרים נותנים לך פריסות בלי השבתה ושורדים קריסה בודדת."},
   "bad": {"en": "Everything scales together: if image processing needs 8 GB of RAM, every container gets 8 GB. A slow query in one feature slows every request on that container. Deploys are all-or-nothing, so a bug in the admin page ships with the checkout. And it never scales to zero — you pay for two containers at 3am with no users.",
           "he": "הכל גדל ביחד: אם עיבוד תמונות צריך 8 ג׳יגה RAM, כל קונטיינר מקבל 8 ג׳יגה. שאילתה איטית בפיצ׳ר אחד מאיטה כל בקשה על אותו קונטיינר. פריסות הן הכל-או-כלום, אז באג בדף האדמין משוחרר יחד עם הצ׳ק-אאוט. והוא לעולם לא מתכווץ לאפס — אתה משלם על שני קונטיינרים בשלוש בלילה בלי משתמשים."},
   "cost": {"en": "~$60–90/month on AWS: two small Fargate tasks (~$9 each), an ALB (~$18), the smallest RDS Postgres (~$13), the smallest ElastiCache Redis (~$12), a tiny worker task and a few GB of S3. Add ~$32/month per NAT gateway if your containers need to reach the internet from private subnets — the classic surprise on the first bill. Fly.io or Render get the same shape for $25–50. What drives it up: RDS instance size once queries slow down, and bandwidth out.",
            "he": "בערך 60–90 דולר לחודש ב-AWS: שני Fargate tasks קטנים (~9 דולר כל אחד), ALB (~18), ה-RDS Postgres הקטן ביותר (~13), ה-ElastiCache Redis הקטן ביותר (~12), worker זעיר וכמה ג׳יגה S3. תוסיף ~32 דולר לחודש לכל NAT gateway אם הקונטיינרים צריכים להגיע לאינטרנט מתת-רשתות פרטיות — ההפתעה הקלאסית בחשבון הראשון. Fly.io או Render נותנים את אותה צורה ב-25–50 דולר. מה שמעלה את המחיר: גודל ה-RDS כשהשאילתות מאיטות, ותעבורה יוצאת."},
   "scale": {"en": "Comfortably to thousands of concurrent users and a few hundred requests per second — add containers behind the balancer as needed. The first bottleneck is always Postgres: connection limits and slow queries, fixed in order by indexes, a bigger instance, a read replica, and moving heavy work to the worker. You outgrow this shape when one part of the app needs radically different resources or its own deploy cadence — and most products never do.",
             "he": "בנוחות לאלפי משתמשים בו-זמנית וכמה מאות בקשות לשנייה — מוסיפים קונטיינרים מאחורי המאזן לפי הצורך. צוואר הבקבוק הראשון הוא תמיד Postgres: מגבלת חיבורים ושאילתות איטיות, שמתקנים לפי הסדר באינדקסים, מופע גדול יותר, רפליקת קריאה, והעברת עבודה כבדה ל-worker. אתה גדל מהצורה הזאת כשחלק אחד באפליקציה צריך משאבים שונים בתכלית או קצב פריסה משלו — ורוב המוצרים לעולם לא מגיעים לשם."},
   "uses": ["Load balancer", "Stateless", "Container / Docker", "Database", "Redis / in-memory store", "Queue / worker", "S3 / object storage", "Session & cookie"],
   "prompt": "Scaffold a classic monolith for a small app called \"Ledger\" (users create invoices, upload PDF receipts) with exactly these pieces:\n\n1. One backend service (Node/Express or Python/FastAPI — pick one, say why) with a Dockerfile (multi-stage, non-root user, health endpoint at /healthz).\n2. The SAME image started with a second command for a worker that consumes a Redis queue (use BullMQ or Celery/RQ, matching the language). One job: \"email invoice\" — stub the email call.\n3. Postgres via a migration tool (Prisma, Alembic or similar) with users, invoices, receipts tables; receipts stores an S3 key, never file bytes.\n4. Redis for sessions AND the queue, so two app instances share logins.\n5. Signed-URL upload flow: app issues a PUT URL, browser uploads to S3 directly.\n6. docker-compose.yml for local dev (app, worker, postgres, redis, minio as S3).\n7. Terraform for AWS: ALB with HTTPS, ECS Fargate service with 2 tasks + 1 worker task, RDS Postgres and ElastiCache in private subnets, private S3 bucket, secrets in Secrets Manager.\n\nDo NOT add: microservices, Kubernetes, GraphQL, a message broker beyond Redis, or a frontend framework.\nBefore writing code, list the trade-offs of this shape in 5 bullets and the estimated monthly AWS cost."},

  # ---------------------------------------------------------------- 3
  {"id": "serverless",
   "title": {"en": "Serverless", "he": "Serverless"},
   "tag": {"en": "Spiky or tiny traffic, a side project that must cost $0 at rest, an API behind a static frontend",
           "he": "תעבורה זניחה או קופצנית, פרויקט צד שחייב לעלות 0 במנוחה, API מאחורי פרונט סטטי"},
   "diagram": (
    " [Browser] ──HTTPS──► CDN (built frontend files)              public\n"
    "     │ HTTPS /api/*                        internet boundary\n"
    "     ▼ ─────────────────────────────────────────────────────────────\n"
    "┌──────────────────┐   ┌──────────────────┐   ┌──────────────────┐\n"
    "│ API Gateway      │──►│ Lambda: api      │──►│ DynamoDB or      │\n"
    "│ auth, throttle   │   │ runs per request │   │ serverless PG    │\n"
    "└──────────────────┘   └───┬──────────┬───┘   └──────────────────┘\n"
    "                           │ enqueue  │ put file\n"
    "                           ▼          ▼            private: IAM only,\n"
    "                 ┌────────────┐   [S3 files]       no network address\n"
    "                 │ SQS + DLQ  │──triggers─┐\n"
    "                 └────────────┘           ▼\n"
    "┌──────────────────┐   ┌──────────────────┐\n"
    "│ EventBridge cron │──►│ Lambda: worker   │──► DB / S3\n"
    "│ nightly schedule │   │ slow jobs, 15min │\n"
    "└──────────────────┘   └──────────────────┘"
   ),
   "flow": {"en": "The frontend arrives from the CDN like any static site. The user clicks \"Export\", and the page calls POST /api/exports. API Gateway checks the JWT, applies the per-user throttle, and invokes the api Lambda. If no warm copy exists, AWS starts one — a cold start of 200 ms to 2 s depending on runtime and bundle size — then runs your handler. The handler writes an export row to DynamoDB, drops a message on SQS, and returns 202 with an export id, all in under a second. SQS triggers the worker Lambda, which builds the CSV, uploads it to S3, and updates the row to \"ready\". The page polls GET /api/exports/{id} every few seconds and, when ready, gets a signed S3 URL. If the worker throws three times, the message lands in the dead-letter queue and an alarm fires. Every night at 02:00, EventBridge invokes a cleanup Lambda that deletes exports older than 7 days.",
            "he": "הפרונט מגיע מה-CDN כמו כל אתר סטטי. המשתמש לוחץ ״ייצוא״, והדף קורא ל-POST /api/exports. ה-API Gateway בודק את ה-JWT, מפעיל את מגבלת הקצב לכל משתמש, ומזמן את פונקציית ה-Lambda של ה-api. אם אין עותק חם, AWS מפעיל אחד — התנעה קרה של 200 מילישניות עד 2 שניות, לפי סביבת הריצה וגודל החבילה — ואז מריץ את המטפל שלך. המטפל כותב שורת ייצוא ל-DynamoDB, מפיל הודעה על SQS, ומחזיר 202 עם מזהה ייצוא, הכל בפחות משנייה. SQS מפעיל את ה-Lambda של ה-worker, שבונה את ה-CSV, מעלה אותו ל-S3 ומעדכן את השורה ל-״מוכן״. הדף עושה פולינג ל-GET /api/exports/{id} כל כמה שניות, וכשמוכן מקבל כתובת S3 חתומה. אם ה-worker זורק שגיאה שלוש פעמים, ההודעה נוחתת בתור המתים (DLQ) ומופעלת התראה. כל לילה ב-02:00, EventBridge מזמן Lambda של ניקוי שמוחק ייצואים בני יותר מ-7 ימים."},
   "parts": [
    {"n": {"en": "CDN-served frontend", "he": "פרונט מוגש מ-CDN"},
     "d": {"en": "Identical to the static-site shape. The only difference is that the JavaScript now calls your own API instead of a third party's.",
           "he": "זהה לצורת האתר הסטטי. ההבדל היחיד הוא שה-JavaScript עכשיו קורא ל-API שלך במקום לזה של צד שלישי."}},
    {"n": {"en": "API Gateway", "he": "API Gateway"},
     "d": {"en": "The public front door for /api. Validates tokens, enforces rate limits, maps routes to functions, and imposes a hard 29-second timeout on every request.",
           "he": "דלת הכניסה הציבורית ל-/api. מאמת טוקנים, מפעיל מגבלות קצב, ממפה נתיבים לפונקציות, וכופה טיים-אאוט קשיח של 29 שניות על כל בקשה."}},
    {"n": {"en": "Lambda functions", "he": "פונקציות Lambda"},
     "d": {"en": "Your code, started on demand per request and frozen when idle. No server to patch, but no local disk, no long-lived connections, and a 15-minute maximum run.",
           "he": "הקוד שלך, מופעל לפי דרישה לכל בקשה ומוקפא כשאין עבודה. אין שרת לעדכן, אבל אין דיסק מקומי, אין חיבורים ארוכי-חיים, ויש מקסימום ריצה של 15 דקות."}},
    {"n": {"en": "DynamoDB or serverless Postgres", "he": "DynamoDB או Postgres סרוורלס"},
     "d": {"en": "A database that bills per request and does not choke on 500 functions connecting at once. DynamoDB is native to this shape; Neon or Aurora Serverless if you need SQL.",
           "he": "בסיס נתונים שמחייב לפי בקשה ולא נחנק מ-500 פונקציות שמתחברות בבת אחת. DynamoDB הוא הטבעי לצורה הזאת; Neon או Aurora Serverless אם צריך SQL."}},
    {"n": {"en": "S3", "he": "S3"},
     "d": {"en": "The only durable file system you have. Uploads, exports, generated PDFs — everything a function cannot keep in memory lands here.",
           "he": "מערכת הקבצים העמידה היחידה שיש לך. העלאות, ייצואים, PDF שנוצרו — כל מה שפונקציה לא יכולה להחזיק בזיכרון נוחת כאן."}},
    {"n": {"en": "SQS + dead-letter queue", "he": "SQS + תור מתים"},
     "d": {"en": "Decouples slow work from the request. A message that fails three times moves to the DLQ instead of retrying forever, so you can inspect and replay it.",
           "he": "מנתק עבודה איטית מהבקשה. הודעה שנכשלת שלוש פעמים עוברת ל-DLQ במקום להתנסות שוב לנצח, כדי שתוכל לבדוק ולהריץ אותה מחדש."}},
    {"n": {"en": "EventBridge schedules", "he": "לוחות זמנים של EventBridge"},
     "d": {"en": "Cron without a server: a rule that invokes a function on a schedule. Also the bus for AWS-internal events like \"a file landed in this bucket\".",
           "he": "cron בלי שרת: חוק שמזמן פונקציה לפי לוח זמנים. גם האפיק לאירועים פנימיים של AWS כמו ״קובץ נחת בדלי הזה״."}},
   ],
   "good": {"en": "Traffic that is bursty or near zero: an internal tool used twice a day, a webhook receiver, a side project you refuse to pay $70/month for, a launch that might get 10 users or 100,000. Zero ops between deploys, and the pieces scale independently without you configuring anything. Also excellent as a thin backend glued to a static frontend.",
            "he": "תעבורה קופצנית או קרובה לאפס: כלי פנימי שמשתמשים בו פעמיים ביום, מקלט webhooks, פרויקט צד שאתה מסרב לשלם עליו 70 דולר לחודש, השקה שאולי תקבל 10 משתמשים ואולי 100,000. אפס תפעול בין פריסות, והחלקים גדלים באופן עצמאי בלי שתגדיר כלום. גם מצוין כ-backend דק שמודבק לפרונט סטטי."},
   "bad": {"en": "Cold starts make the first request after a lull noticeably slow, which users feel. Hard limits are everywhere: 29 s per API request, 15 min per function, 6 MB payloads, and a classic Postgres that falls over when 300 functions each open a connection. Local development is awkward, debugging spans five AWS consoles, and at steady high load the per-request pricing costs more than two containers would.",
           "he": "התנעות קרות הופכות את הבקשה הראשונה אחרי הפסקה לאיטית באופן מורגש, ומשתמשים מרגישים את זה. מגבלות קשיחות בכל מקום: 29 שניות לבקשת API, 15 דקות לפונקציה, גוף של 6 מגה, ו-Postgres קלאסי שקורס כש-300 פונקציות פותחות כל אחת חיבור. פיתוח מקומי מסורבל, דיבוג מתפרס על חמש קונסולות של AWS, ובעומס גבוה וקבוע התמחור לפי בקשה עולה יותר משני קונטיינרים."},
   "cost": {"en": "$0–10/month at hobby scale, and genuinely $0 when nobody uses it: the free tier covers 1M Lambda requests, 1M API Gateway calls (first year) and 25 GB of DynamoDB. At ~10M requests/month expect $50–150. What drives it up: Lambda memory × duration (a 1 GB function running 2 s costs 300× a 128 MB one running 50 ms), provisioned concurrency to kill cold starts (~$10+/month per function), a NAT gateway (~$32) if functions must sit in a VPC, and DynamoDB writes at volume.",
            "he": "0–10 דולר לחודש בסקייל של תחביב, ובאמת 0 כשאף אחד לא משתמש: השכבה החינמית מכסה מיליון בקשות Lambda, מיליון קריאות API Gateway (בשנה הראשונה) ו-25 ג׳יגה DynamoDB. ב-~10 מיליון בקשות לחודש תצפה ל-50–150 דולר. מה שמעלה את המחיר: זיכרון Lambda כפול משך ריצה (פונקציה של ג׳יגה שרצה 2 שניות עולה פי 300 מפונקציה של 128 מגה שרצה 50 מילישניות), provisioned concurrency כדי לחסל התנעות קרות (~10+ דולר לחודש לפונקציה), NAT gateway (~32) אם הפונקציות חייבות לשבת ב-VPC, וכתיבות DynamoDB בנפח."},
   "scale": {"en": "Scales from zero to thousands of concurrent requests with no action from you — that is the whole point. The first bottleneck is the database: anything with a connection limit needs a proxy (RDS Proxy) or a serverless database. The second is the timeouts: any job longer than 15 minutes has to become a pipeline. And watch the bill: sustained load above a few hundred requests per second is usually cheaper as containers.",
             "he": "גדל מאפס לאלפי בקשות בו-זמנית בלי שום פעולה ממך — זו כל הפואנטה. צוואר הבקבוק הראשון הוא בסיס הנתונים: כל דבר עם מגבלת חיבורים צריך פרוקסי (RDS Proxy) או בסיס נתונים סרוורלס. השני הוא הטיים-אאוטים: כל עבודה שארוכה מ-15 דקות חייבת להפוך לפייפליין. ותשים עין על החשבון: עומס קבוע מעל כמה מאות בקשות לשנייה בדרך כלל זול יותר כקונטיינרים."},
   "uses": ["EC2 / VM vs Lambda / serverless", "CDN", "API", "Queue / worker", "S3 / object storage", "SQL vs NoSQL", "Token / JWT", "Latency vs throughput"],
   "prompt": "Scaffold a serverless backend for a small app called \"Snapshot\" (users request a CSV export of their data and download it when ready) with exactly these pieces:\n\n1. Frontend: a static folder served from a CDN (S3 + CloudFront), plain HTML + JS that calls /api.\n2. API Gateway (HTTP API) with a JWT authorizer, routes POST /exports and GET /exports/{id}.\n3. Two Lambda functions in TypeScript or Python (pick one, say why): api (writes an export row, enqueues to SQS, returns 202) and worker (builds the CSV, uploads to S3, marks the row ready). Keep each bundle small; state the expected cold-start time.\n4. DynamoDB single table for exports, with a TTL attribute.\n5. SQS queue with a dead-letter queue after 3 receives.\n6. EventBridge schedule invoking the worker nightly to delete S3 objects older than 7 days.\n7. IaC in AWS CDK, SAM or Terraform (pick one). Least-privilege IAM per function.\n\nDo NOT add: a VPC, a relational database, containers, WebSockets, or provisioned concurrency.\nEnd with: the 4 hard limits this design hits first, and the monthly cost at 1k, 100k and 10M requests."},

  # ---------------------------------------------------------------- 4
  {"id": "pipeline",
   "title": {"en": "Event-driven processing pipeline", "he": "פייפליין עיבוד מונחה אירועים"},
   "tag": {"en": "Video transcoding, AI generation, bulk imports/exports — any job that takes seconds to hours",
           "he": "קידוד וידאו, יצירה ב-AI, ייבוא/ייצוא בכמויות — כל עבודה שלוקחת שניות עד שעות"},
   "diagram": (
    " [Client] ─1 POST /jobs (file)─► ┌───────────────┐ ─2─► [S3 input]\n"
    "    ▲                            │ API (small)   │\n"
    "    │ 6 webhook / SSE: done      │ 202 + job id  │\n"
    "    │                            └───────┬───────┘\n"
    " ── internet boundary ────────────────── │ 3 enqueue {job id} ──────\n"
    "    │                                    ▼\n"
    "    │                            ┌───────────────┐  after 3 failures\n"
    "    │                            │ Queue (SQS)   │──► DLQ (dead letter)\n"
    "    │                            └───────┬───────┘\n"
    "    │                                    ▼ 4 pull a job, ack on done\n"
    "    │   ┌─────────────┐           ┌───────────────────────────────┐\n"
    "    │   │ Jobs DB     │◄─5 status─│ Worker pool (CPU or GPU),     │\n"
    "    │   │ id, %, url  │  + %      │ scales by queue depth,        │\n"
    "    │   └──────┬──────┘           │ idempotent per job id         │\n"
    "    │          │ on \"done\"        └───────────────┬───────────────┘\n"
    "    └── Notifier ◄┘                               └──► [S3 output]"
   ),
   "flow": {"en": "A user drops a 2 GB video. The API does not process it: it issues a signed S3 URL, the browser uploads straight to the bucket, and POST /jobs records a row with status \"queued\" and progress 0. It puts one small message on the queue — just the job id — and returns 202 within 50 ms. A worker pulls the message and first checks the row: if it is already \"done\" (a retry after a crash), it acks and exits. Otherwise it streams the file from S3, transcodes, and updates progress every few seconds. Output goes to S3; the row becomes \"done\" with the result URL. That change triggers the notifier, which fires the customer's webhook and pushes an SSE event to any open tab. If the worker dies at 60%, the queue re-exposes the message and another worker restarts the job. After three failures it moves to the dead-letter queue and a human looks.",
            "he": "משתמש זורק וידאו של 2 ג׳יגה. ה-API לא מעבד אותו: הוא מוציא כתובת S3 חתומה, הדפדפן מעלה ישר לדלי, ו-POST /jobs רושם שורה עם סטטוס ״בתור״ והתקדמות 0. הוא שם הודעה קטנה אחת על התור — רק מזהה העבודה — ומחזיר 202 תוך 50 מילישניות. worker מושך את ההודעה וקודם כל בודק את השורה: אם היא כבר ״הושלם״ (ניסיון חוזר אחרי קריסה), הוא מאשר ויוצא. אחרת הוא מזרים את הקובץ מ-S3, מקודד, ומעדכן התקדמות כל כמה שניות. הפלט הולך ל-S3; השורה הופכת ל-״הושלם״ עם כתובת התוצאה. השינוי הזה מפעיל את המודיע, שמפעיל את ה-webhook של הלקוח ודוחף אירוע SSE לכל לשונית פתוחה. אם ה-worker מת ב-60%, התור חושף את ההודעה מחדש ו-worker אחר מתחיל את העבודה מההתחלה. אחרי שלושה כשלונות היא עוברת לתור המתים ובן אדם מסתכל."},
   "parts": [
    {"n": {"en": "Small API", "he": "API קטן"},
     "d": {"en": "Accepts the job, validates it, writes one row, enqueues one id, answers 202. It never does the work, so it stays fast and cheap no matter how heavy the jobs are.",
           "he": "מקבל את העבודה, מאמת אותה, כותב שורה אחת, מכניס מזהה אחד לתור, עונה 202. הוא לעולם לא עושה את העבודה עצמה, אז הוא נשאר מהיר וזול לא משנה כמה העבודות כבדות."}},
    {"n": {"en": "Object storage (in and out)", "he": "אחסון אובייקטים (כניסה ויציאה)"},
     "d": {"en": "Large inputs and outputs live in S3, never in the queue or the database. Messages carry ids; workers stream bytes directly from the bucket.",
           "he": "קלטים ופלטים גדולים חיים ב-S3, לעולם לא בתור או בבסיס הנתונים. הודעות נושאות מזהים; ה-workers מזרימים בייטים ישירות מהדלי."}},
    {"n": {"en": "Queue + dead-letter queue", "he": "תור + תור מתים"},
     "d": {"en": "The buffer between accepting work and doing it. Absorbs a burst of 10,000 uploads without dropping any; parks messages that keep failing in the DLQ for inspection.",
           "he": "החוצץ בין קבלת עבודה לביצועה. סופג התפרצות של 10,000 העלאות בלי לאבד אף אחת; מחנה הודעות שממשיכות להיכשל ב-DLQ לבדיקה."}},
    {"n": {"en": "Worker pool", "he": "בריכת workers"},
     "d": {"en": "Containers (or GPU instances) that pull one job at a time. Autoscaled on queue depth: zero at night, forty during the Monday import rush. Each must be idempotent, since any job may run twice.",
           "he": "קונטיינרים (או מופעי GPU) שמושכים עבודה אחת בכל פעם. גדלים אוטומטית לפי עומק התור: אפס בלילה, ארבעים בעומס הייבוא של יום שני. כל אחד חייב להיות אידמפוטנטי, כי כל עבודה עלולה לרוץ פעמיים."}},
    {"n": {"en": "Jobs table", "he": "טבלת עבודות"},
     "d": {"en": "One row per job: status, progress percent, attempt count, result URL, error. It is what the client polls and what lets a retried worker skip finished work.",
           "he": "שורה אחת לכל עבודה: סטטוס, אחוז התקדמות, מספר ניסיונות, כתובת תוצאה, שגיאה. זה מה שהלקוח עושה לו פולינג ומה שמאפשר ל-worker בניסיון חוזר לדלג על עבודה שהושלמה."}},
    {"n": {"en": "Notifier (webhook / SSE)", "he": "מודיע (webhook / SSE)"},
     "d": {"en": "Turns \"row became done\" into a push: a signed webhook to the customer's server, and a server-sent event to the browser tab still waiting.",
           "he": "הופך ״השורה הפכה להושלם״ לדחיפה: webhook חתום לשרת של הלקוח, ואירוע server-sent ללשונית הדפדפן שעדיין מחכה."}},
   ],
   "good": {"en": "Any product whose core action takes longer than a user will stare at a spinner: transcoding, AI image or video generation, PDF rendering, bulk CSV imports, report generation, scraping. It keeps the user-facing API fast, lets expensive hardware scale to zero, and survives crashes by design. This is also the pattern you bolt onto a monolith when one feature gets heavy.",
            "he": "כל מוצר שהפעולה המרכזית שלו לוקחת יותר זמן ממה שמשתמש יבהה בספינר: קידוד וידאו, יצירת תמונות או וידאו ב-AI, רינדור PDF, ייבוא CSV בכמויות, יצירת דוחות, סקרייפינג. הוא שומר על ה-API שפונה למשתמש מהיר, מאפשר לחומרה יקרה להתכווץ לאפס, ושורד קריסות מעצם התכנון. זו גם התבנית שמבריגים על מונולית כשפיצ׳ר אחד נהיה כבד."},
   "bad": {"en": "Everything becomes eventually-consistent: the user asks, and the answer arrives later, so every screen needs a \"pending\" state and every client needs to poll or listen. Debugging one job means correlating logs across API, queue, worker and notifier by job id. Ordering is not guaranteed, duplicates are guaranteed eventually, and a poison message can stall a queue if your DLQ policy is wrong.",
           "he": "הכל הופך לעקבי-בסופו-של-דבר: המשתמש מבקש, והתשובה מגיעה אחר כך, אז כל מסך צריך מצב ״ממתין״ וכל לקוח צריך לעשות פולינג או להאזין. דיבוג של עבודה אחת אומר לחבר לוגים בין API, תור, worker ומודיע לפי מזהה עבודה. הסדר לא מובטח, כפילויות מובטחות בסופו של דבר, והודעת רעל יכולה לתקוע תור אם מדיניות ה-DLQ שלך שגויה."},
   "cost": {"en": "Dominated by the workers. CPU-only (imports, PDFs): ~$30–80/month with a small API task, SQS (fractions of a cent per million messages) and workers that scale to zero. GPU (AI generation, video): a single g4dn.xlarge is ~$0.53/hour, so ~$380/month if it never sleeps, or ~$100–150 on spot instances that scale down at night. S3 is cheap to store ($0.023/GB) but egress adds up fast when users download 2 GB outputs — that, and GPU hours, are what balloon the bill.",
            "he": "נשלט על ידי ה-workers. CPU בלבד (ייבואים, PDF): בערך 30–80 דולר לחודש עם API task קטן, SQS (שברירי סנט למיליון הודעות) ו-workers שמתכווצים לאפס. GPU (יצירה ב-AI, וידאו): g4dn.xlarge בודד עולה ~0.53 דולר לשעה, כלומר ~380 דולר לחודש אם הוא לא ישן לעולם, או ~100–150 על spot instances שיורדים בלילה. S3 זול לאחסון (0.023 דולר לג׳יגה) אבל תעבורה יוצאת מצטברת מהר כשמשתמשים מורידים פלטים של 2 ג׳יגה — זה, ושעות GPU, הם מה שמנפח את החשבון."},
   "scale": {"en": "Throughput is just worker count: ten workers do ten jobs at once, a hundred do a hundred, and the queue absorbs whatever they cannot keep up with. The first bottleneck is usually the jobs table taking a progress write from every worker every second — batch or throttle those. The second is cloud quotas on GPU instances, which you must request in advance. You need the next shape when different job types need different priorities and SLAs; then you split into per-type queues.",
             "he": "התפוקה היא פשוט מספר ה-workers: עשרה עושים עשר עבודות בבת אחת, מאה עושים מאה, והתור סופג את כל מה שהם לא מספיקים. צוואר הבקבוק הראשון הוא בדרך כלל טבלת העבודות שמקבלת כתיבת התקדמות מכל worker כל שנייה — תאגד או תרסן אותן. השני הוא מכסות הענן על מופעי GPU, שצריך לבקש מראש. אתה צריך את הצורה הבאה כשסוגי עבודות שונים צריכים עדיפויות ו-SLA שונים; אז מפצלים לתור לכל סוג."},
   "uses": ["Queue / worker", "Idempotency", "Blocking vs async", "S3 / object storage", "Webhook", "Scaling up vs out", "Status codes", "Logs & monitoring"],
   "prompt": "Scaffold an event-driven processing pipeline for a small service called \"Reframe\" (users upload a video, get back a 720p version) with exactly these pieces:\n\n1. A small API (Node or Python, pick one) with POST /jobs (issues a signed S3 upload URL and creates a job row, returns 202 + id), GET /jobs/{id} (status, progress, result URL) and GET /jobs/{id}/events (SSE stream of status changes).\n2. Postgres jobs table: id, status, progress, attempts, input_key, output_key, error, timestamps.\n3. SQS queue carrying only the job id, with a dead-letter queue after 3 receives and a visibility timeout longer than the longest expected job.\n4. A worker container (Dockerfile with ffmpeg) that pulls one message, checks the row first and exits if already done (idempotency), streams input from S3, updates progress every 5 seconds, writes output to S3, marks done, then acks.\n5. A notifier that fires a signed webhook (HMAC header) to a customer URL when a job finishes.\n6. docker-compose for local dev (api, worker, postgres, localstack or minio, elasticmq).\n7. Terraform: ECS Fargate for API and workers, worker autoscaling on ApproximateNumberOfMessagesVisible, private S3 buckets, RDS.\n\nDo NOT add: Kafka, Kubernetes, a GPU, user auth beyond an API key, or a frontend.\nFirst, list what happens in this design when a worker crashes at 60%, when the same message is delivered twice, and when ffmpeg fails on a corrupt file."},

  # ---------------------------------------------------------------- 5
  {"id": "microservices",
   "title": {"en": "Microservices", "he": "מיקרו-שירותים"},
   "tag": {"en": "Many teams, one product, each team shipping on its own schedule. Not for a two-person startup",
           "he": "הרבה צוותים, מוצר אחד, כל צוות משחרר בקצב שלו. לא לסטארטאפ של שני אנשים"},
   "diagram": (
    " [Browser / mobile] ──HTTPS──► ┌─────────────────────────┐   public\n"
    "                               │ API gateway             │\n"
    "                               │ auth, routing, limits   │\n"
    "                               └──┬────────┬────────┬────┘\n"
    " ══ internet boundary ═══════════╪════════╪════════╪═══ private ══\n"
    "                                 ▼        ▼        ▼\n"
    "         ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐\n"
    "         │ users    │ │ orders   │ │ billing  │ │ notify   │\n"
    "         │ svc + DB │ │ svc + DB │ │ svc + DB │ │ svc      │\n"
    "         └────┬─────┘ └────┬─────┘ └────┬─────┘ └────▲─────┘\n"
    "              │ publish    │            │            │ subscribe\n"
    "              ▼            ▼            ▼            │\n"
    "         ┌───────────────────────────────────────────────────┐\n"
    "         │ Message bus (Kafka / SNS+SQS): OrderPlaced, ...   │\n"
    "         └───────────────────────────────────────────────────┘\n"
    " one trace id spans every hop; each DB is private to its own service"
   ),
   "flow": {"en": "A user places an order. The gateway validates the JWT, attaches a fresh trace id, and routes POST /orders to the orders service — found by name through service discovery, not by IP. Orders writes the order to its own database and publishes an OrderPlaced event to the bus, then returns 201. It does not call billing; it does not know billing exists. Billing consumes OrderPlaced, charges the card, and publishes PaymentSucceeded. Notify consumes that and sends the receipt email. Users, meanwhile, consumed nothing. If billing is down for ten minutes, orders keep being accepted; the events wait on the bus and get processed when billing returns, which is the whole point. When the customer asks why they never got a receipt, someone opens the tracing tool, pastes the trace id, and sees the four hops laid out on one timeline — including the one that took 9 seconds.",
            "he": "משתמש מבצע הזמנה. השער מאמת את ה-JWT, מצרף מזהה trace חדש, ומנתב את POST /orders לשירות ההזמנות — שנמצא לפי שם דרך service discovery, לא לפי IP. ההזמנות כותב את ההזמנה לבסיס הנתונים שלו ומפרסם אירוע OrderPlaced לאפיק, ואז מחזיר 201. הוא לא קורא לחיוב; הוא לא יודע שחיוב קיים. החיוב צורך את OrderPlaced, מחייב את הכרטיס, ומפרסם PaymentSucceeded. ההתראות צורך את זה ושולח את מייל הקבלה. המשתמשים, בינתיים, לא צרך כלום. אם החיוב למטה עשר דקות, הזמנות ממשיכות להתקבל; האירועים מחכים על האפיק ומעובדים כשהחיוב חוזר, וזו כל הפואנטה. כשהלקוח שואל למה מעולם לא קיבל קבלה, מישהו פותח את כלי ה-tracing, מדביק את מזהה ה-trace, ורואה את ארבע הקפיצות מסודרות על ציר זמן אחד — כולל זו שלקחה 9 שניות."},
   "parts": [
    {"n": {"en": "API gateway", "he": "שער API"},
     "d": {"en": "The single public door. Authenticates once so services do not each have to, routes by path to the right service, rate-limits, and stamps every request with a trace id.",
           "he": "הדלת הציבורית היחידה. מאמת פעם אחת כדי שהשירותים לא יצטרכו כל אחד בנפרד, מנתב לפי נתיב לשירות הנכון, מגביל קצב, ומחתים כל בקשה במזהה trace."}},
    {"n": {"en": "3–4 services, each with its own database", "he": "3–4 שירותים, לכל אחד בסיס נתונים משלו"},
     "d": {"en": "Independent deployables owned by different teams. No service reads another's tables — ever. That rule is what buys independent deploys and is also what makes joins across services impossible.",
           "he": "יחידות פריסה עצמאיות בבעלות צוותים שונים. שום שירות לא קורא טבלאות של אחר — לעולם. החוק הזה הוא מה שקונה פריסות עצמאיות, והוא גם מה שהופך joins בין שירותים לבלתי אפשריים."}},
    {"n": {"en": "Message bus", "he": "אפיק הודעות"},
     "d": {"en": "Kafka or SNS+SQS. Services announce facts (OrderPlaced) rather than calling each other, so a slow or dead consumer does not slow the producer. Durable, replayable, ordered per key.",
           "he": "Kafka או SNS+SQS. שירותים מכריזים על עובדות (OrderPlaced) במקום לקרוא זה לזה, אז צרכן איטי או מת לא מאיט את המפרסם. עמיד, ניתן להרצה חוזרת, מסודר לפי מפתח."}},
    {"n": {"en": "Service discovery", "he": "Service discovery"},
     "d": {"en": "A registry (Cloud Map, Consul, Kubernetes DNS) that maps \"billing\" to whatever instances are alive right now, so nothing hard-codes an address.",
           "he": "רשם (Cloud Map, Consul, DNS של Kubernetes) שממפה ״billing״ לאיזה מופעים שחיים עכשיו, כדי ששום דבר לא יקבע כתובת בקוד."}},
    {"n": {"en": "Centralised tracing and logs", "he": "tracing ולוגים מרכזיים"},
     "d": {"en": "OpenTelemetry into Jaeger, Honeycomb or Datadog. Without one trace id flowing through every hop, a single user complaint becomes a day of grepping four log streams.",
           "he": "OpenTelemetry לתוך Jaeger, Honeycomb או Datadog. בלי מזהה trace אחד שזורם דרך כל קפיצה, תלונה בודדת של משתמש הופכת ליום של grep על ארבעה זרמי לוגים."}},
    {"n": {"en": "Per-service CI/CD", "he": "CI/CD לכל שירות"},
     "d": {"en": "Each service has its own pipeline, its own version and its own rollback. That is the benefit you are paying all this for; if you still deploy everything together, you have a distributed monolith.",
           "he": "לכל שירות פייפליין משלו, גרסה משלו ו-rollback משלו. זה היתרון שבשבילו אתה משלם את כל זה; אם אתה עדיין פורס הכל ביחד, יש לך מונולית מבוזר."}},
   ],
   "good": {"en": "An organisation of roughly 15+ engineers in several teams who keep blocking each other's deploys, or a product where one component genuinely needs different scale, language or compliance boundary than the rest — payments in a PCI-scoped service is the classic case. The win is organisational: teams ship without a meeting. The architecture follows the org chart, not the other way round.",
            "he": "ארגון של בערך 15+ מהנדסים בכמה צוותים שכל הזמן חוסמים את הפריסות של זה לזה, או מוצר שבו רכיב אחד באמת צריך סקייל, שפה או גבול רגולטורי שונים מהשאר — תשלומים בשירות בתחום PCI הוא המקרה הקלאסי. הניצחון הוא ארגוני: צוותים משחררים בלי פגישה. הארכיטקטורה עוקבת אחרי מבנה הארגון, לא ההפך."},
   "bad": {"en": "For a two-person team it is pure cost: every feature now crosses a network, every \"simple\" report needs data from three databases that cannot be joined, and every bug hides in the seams between services. You lose transactions — an order that saved but a payment that did not is now a normal Tuesday, handled with compensating events. You also need a platform team's worth of tooling (tracing, discovery, schema registry, per-service pipelines) before the first feature ships. Netflix built this with hundreds of engineers; you are not Netflix yet.",
           "he": "לצוות של שני אנשים זה עלות טהורה: כל פיצ׳ר עכשיו חוצה רשת, כל דוח ״פשוט״ צריך נתונים משלושה בסיסי נתונים שאי אפשר לעשות להם join, וכל באג מתחבא בתפרים בין השירותים. אתה מאבד טרנזקציות — הזמנה שנשמרה ותשלום שלא הוא עכשיו יום שלישי רגיל, שמטופל באירועי פיצוי. אתה גם צריך כלים בהיקף של צוות פלטפורמה שלם (tracing, discovery, רשם סכמות, פייפליינים לכל שירות) לפני שהפיצ׳ר הראשון משוחרר. Netflix בנו את זה עם מאות מהנדסים; אתה עדיין לא Netflix."},
   "cost": {"en": "Realistically $400–1,000+/month before any real traffic: four services × two containers (~$70), three or four managed databases (~$50–150 — nothing is shared, so nothing is amortised), a managed Kafka (MSK) at ~$150–300 or SNS+SQS for pennies, an API gateway, a tracing backend ($0 self-hosted to $100s SaaS), a NAT gateway and a load balancer or two. The bigger cost is not on the AWS bill: it is the weeks of engineer time spent on plumbing instead of product, and the on-call rota that now has to understand five systems.",
            "he": "ריאלית 400–1,000+ דולר לחודש עוד לפני תעבורה אמיתית: ארבעה שירותים כפול שני קונטיינרים (~70), שלושה-ארבעה בסיסי נתונים מנוהלים (~50–150 — שום דבר לא משותף, אז שום דבר לא מתחלק), Kafka מנוהל (MSK) ב-~150–300 או SNS+SQS בפרוטות, שער API, backend ל-tracing (0 בהוסטינג עצמי עד מאות דולרים ב-SaaS), NAT gateway ומאזן עומסים או שניים. העלות הגדולה יותר לא בחשבון של AWS: היא שבועות של זמן מהנדסים על צנרת במקום על מוצר, ותורנות on-call שעכשיו צריכה להבין חמש מערכות."},
   "scale": {"en": "Technically almost without limit — each service scales on its own curve, and the bus buffers between them. But the ceiling here is organisational, not technical: the shape pays off exactly when the team is too big to coordinate a shared deploy, and costs you every day before that. Signals you have grown into it: teams waiting on each other's releases, one component needing 10× the resources of the rest, a compliance boundary you must isolate, or a monolith whose test suite takes an hour. If none of those apply, stay a monolith and pull out one service at a time when it hurts.",
             "he": "טכנית כמעט בלי גבול — כל שירות גדל על העקומה שלו, והאפיק חוצץ ביניהם. אבל התקרה כאן היא ארגונית, לא טכנית: הצורה משתלמת בדיוק כשהצוות גדול מדי לתאם פריסה משותפת, ועולה לך כל יום לפני זה. סימנים שגדלת לתוכה: צוותים שמחכים לשחרורים אחד של השני, רכיב אחד שצריך פי 10 משאבים מהשאר, גבול רגולטורי שאתה חייב לבודד, או מונולית שסט הבדיקות שלו לוקח שעה. אם אף אחד מאלה לא חל, תישאר מונולית ותוציא שירות אחד בכל פעם כשזה כואב."},
   "uses": ["Monolith vs microservices", "API", "Queue / worker", "Database", "Transaction", "Logs & monitoring", "Single point of failure", "Technical debt"],
   "prompt": "Scaffold a minimal microservices system for a small shop called \"Crate\" with exactly these pieces, as a teaching example (I know this is oversized for a small team — say so in your output):\n\n1. Four services, each in its own folder with its own Dockerfile: users, orders, billing (each with its own Postgres database) and notify (stateless). Same language for all (pick one).\n2. An API gateway (Kong, Envoy, or a thin Node/Go service) that validates a JWT once, injects an X-Request-Id / trace id, and routes /users, /orders, /billing.\n3. A message bus: local Kafka via Redpanda in docker-compose; note how it maps to SNS+SQS on AWS. Events: UserCreated, OrderPlaced, PaymentSucceeded, PaymentFailed, each with a versioned JSON schema in a /contracts folder.\n4. Orders publishes OrderPlaced and never calls billing directly. Billing consumes it and publishes the payment result. Notify consumes payment events and logs a fake email.\n5. OpenTelemetry in every service, exporting to a local Jaeger; the trace id must survive across the bus.\n6. Service discovery via docker-compose DNS locally; describe the AWS Cloud Map equivalent in a comment, do not implement it.\n7. One docker-compose.yml that runs everything, and a README with the exact commands to place an order and see the 4-hop trace.\n\nDo NOT add: Kubernetes, a service mesh, a saga framework, or a frontend.\nBefore code, write 6 bullets on what this design costs a 2-person team versus a monolith, and the 3 signals that would justify it."},
 ]
}
