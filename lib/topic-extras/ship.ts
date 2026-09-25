import type { TopicExtra } from "./types";

export const extras: Record<string, TopicExtra> = {
  "Hosted checkout": {
    look: [
      {
        cap: {
          en: "Card stays on the provider page.",
          he: "הכרטיס נשאר בדף של הספק.",
        },
        code: `// your app
openCheckout({ priceId: "pri_abc123" })

// browser goes to provider.example/checkout/...
// card fields live on THEIR page, not yours`,
      },
    ],
    prompts: [
      {
        en: "Explain hosted checkout in plain words. Why should my app never see card numbers, and what do I ask the AI to build instead of a card form?",
        he: "הסבירו בפשטות מה זה hosted checkout. למה האפליקציה שלנו לא צריכה לראות מספרי כרטיס, ומה לבקש מה-AI במקום טופס כרטיס?",
      },
      {
        en: "Review this checkout code and list every place a card number, CVC, or expiry might touch our server or logs. Suggest the hosted-checkout path.",
        he: "עברו על קוד הצ׳קאאוט ורשמו כל מקום שמספר כרטיס, CVC או תוקף עלולים לגעת בשרת או בלוגים. הציעו את נתיב ה-hosted checkout.",
      },
      {
        en: "Set up a sandbox hosted checkout for product price pri_abc123. Show only the redirect or overlay call, no card inputs on our page.",
        he: "הגדירו hosted checkout ב-sandbox למחיר pri_abc123. הראו רק את קריאת ה-redirect או ה-overlay, בלי שדות כרטיס בדף שלנו.",
      },
    ],
  },

  "Merchant of record": {
    look: [
      {
        cap: {
          en: "They sell; you get paid.",
          he: "הם מוכרים; אתם מקבלים תשלום.",
        },
        code: `Buyer receipt
  Sold by: Acme Payments Inc. (merchant of record)
  Item: Starter pack — $29

Your dashboard
  payout_id: pay_9f2a
  net: $24.80 after fees`,
      },
    ],
    prompts: [
      {
        en: "Explain merchant of record like I am new. Who bills the buyer, who handles tax invoices, and what still stays my responsibility?",
        he: "הסבירו merchant of record כאילו אני חדש. מי מחייב את הקונה, מי מטפל בחשבוניות מס, ומה עדיין באחריות שלנו?",
      },
      {
        en: "Compare selling myself versus using a merchant of record. Give three concrete trade-offs for a small digital product.",
        he: "השוו בין מכירה עצמית לשימוש ב-merchant of record. תנו שלושה יתרונות וחסרונות ממשיים למוצר דיגיטלי קטן.",
      },
      {
        en: "List the questions I should ask my payment provider about merchant-of-record coverage before I go live in two countries.",
        he: "רשמו שאלות שכדאי לשאול את ספק התשלומים על כיסוי merchant of record לפני עלייה לאוויר בשתי מדינות.",
      },
    ],
  },

  "Trust the webhook, not the redirect": {
    look: [
      {
        cap: {
          en: "Believe the webhook.",
          he: "תאמינו ל-webhook.",
        },
        code: `browser redirect → /success?status=paid
webhook body    → { "event": "payment.failed", "id": "txn_7c1e" }`,
      },
    ],
    prompts: [
      {
        en: "Explain why a success redirect is not proof of payment. What should unlock access instead, and where does that signal come from?",
        he: "הסבירו למה redirect של הצלחה אינו הוכחת תשלום. מה צריך לפתוח גישה במקום, ומאיפה מגיע האות הזה?",
      },
      {
        en: "Review our post-checkout flow. Find any place we grant access from the browser return URL, and rewrite it to wait for the webhook.",
        he: "עברו על הזרימה אחרי צ׳קאאוט. מצאו מקום שפותחים גישה מכתובת החזרה בדפדפן, ושכתבו כך שמחכים ל-webhook.",
      },
      {
        en: "Sketch a safe handler: on redirect show thank-you only; on webhook payment.completed mark order ord_42 paid. Keep it beginner-simple.",
        he: "שרטטו handler בטוח: ב-redirect רק תודה; ב-webhook של payment.completed סמנו את הזמנה ord_42 כשולמה. שמרו על פשטות למתחילים.",
      },
    ],
  },

  "Webhook signature": {
    look: [
      {
        cap: {
          en: "Check the signature first.",
          he: "בדקו קודם את החתימה.",
        },
        code: `Paddle-Signature: ts=1710000000;h1=abc
# check this before you unlock anything`,
      },
    ],
    prompts: [
      {
        en: "Explain webhook signatures in plain language. Why do we verify the header before we change any user entitlement?",
        he: "הסבירו חתימות webhook בשפה פשוטה. למה מאמתים את ה-header לפני שמשנים entitlement של משתמש?",
      },
      {
        en: "Review our webhook route. Confirm we reject requests with a missing or invalid signature, and point to the exact check.",
        he: "עברו על נתיב ה-webhook. ודאו שדוחים בקשות בלי חתימה או עם חתימה לא תקינה, וציינו את הבדיקה המדויקת.",
      },
      {
        en: "Add a clear comment and a failing test name for signature verification on POST /api/billing/webhook. Do not invent a bypass.",
        he: "הוסיפו הערה ברורה ושם בדיקה שנכשלת לאימות חתימה ב-POST /api/billing/webhook. אל תמציאו דרך לעקוף.",
      },
    ],
  },

  "Entitlement": {
    look: [
      {
        cap: {
          en: "Paid means unlocked.",
          he: "שולם אומר פתוח.",
        },
        code: `user_id: usr_18
plan: pro
entitlement: course_access = true
source: txn_7c1e (webhook)`,
      },
    ],
    prompts: [
      {
        en: "Explain entitlement versus a payment receipt. Where should the app look when deciding if user usr_18 can open the course?",
        he: "הסבירו את ההבדל בין entitlement לבין קבלה על תשלום. איפה האפליקציה צריכה לבדוק אם usr_18 יכול לפתוח את הקורס?",
      },
      {
        en: "Map our billing webhook to one entitlement field. Show the before and after row for a successful payment.completed event.",
        he: "מפו את ה-webhook של הבילינג לשדה entitlement אחד. הראו שורה לפני ואחרי אירוע payment.completed מוצלח.",
      },
      {
        en: "List three places the UI should read entitlement instead of guessing from a URL param or localStorage flag.",
        he: "רשמו שלושה מקומות שבהם ה-UI צריך לקרוא entitlement במקום לנחש מפרמטר בכתובת או מ-flag ב-localStorage.",
      },
    ],
  },

  "One-time vs subscription": {
    look: [
      {
        cap: {
          en: "Pay once, or pay again later.",
          he: "משלמים פעם אחת, או שוב אחר כך.",
        },
        code: `one_time:   price pri_once  → charge now, done
subscribe:  price pri_month → charge now, again next month
status:     active | canceled | past_due`,
      },
    ],
    prompts: [
      {
        en: "Explain one-time purchase versus subscription for a digital course. When would each model fit, in two short paragraphs?",
        he: "הסבירו רכישה חד-פעמית מול מנוי לקורס דיגיטלי. מתי כל מודל מתאים, בשני פסקאות קצרות?",
      },
      {
        en: "Review our price setup. Flag if we mix one-time and subscription logic in the same unlock path, and suggest a clean split.",
        he: "עברו על הגדרת המחירים. סמנו אם מערבבים לוגיקת חד-פעמי ומנוי באותו נתיב פתיחה, והציעו הפרדה נקייה.",
      },
      {
        en: "Draft the webhook events we must handle for a monthly plan: first payment, renewal, cancel, and past_due. Keep names simple.",
        he: "שרטטו אירועי webhook לחודשי: תשלום ראשון, חידוש, ביטול ו-past_due. שמרו על שמות פשוטים.",
      },
    ],
  },

  "Refunds & chargebacks": {
    look: [
      {
        cap: {
          en: "Money back; access goes away.",
          he: "כסף חוזר; הגישה נעלמת.",
        },
        code: `event: refund.created
txn: txn_7c1e
action: set course_access = false for usr_18`,
      },
    ],
    prompts: [
      {
        en: "Explain refund versus chargeback in beginner words. What should happen to entitlement when either succeeds?",
        he: "הסבירו refund מול chargeback במילים למתחילים. מה צריך לקרות ל-entitlement כשאחד מהם מצליח?",
      },
      {
        en: "Review our webhook handlers for refunds. Confirm we revoke access and leave an audit note with the transaction id.",
        he: "עברו על ה-handlers של refunds. ודאו שמבטלים גישה ומשאירים הערת audit עם מזהה העסקה.",
      },
      {
        en: "Write a short support checklist: customer asks for a refund, we issue it in the dashboard, then verify access is locked.",
        he: "כתבו צ׳קליסט קצר לתמיכה: לקוח מבקש החזר, מנפיקים בדשבורד, ואז מוודאים שהגישה נעולה.",
      },
    ],
  },

  "Test cards & declined payments": {
    look: [
      {
        cap: {
          en: "Sandbox only — pretend cards.",
          he: "Sandbox בלבד — כרטיסים מדומים.",
        },
        code: `# sandbox only
4242 4242 4242 4242  → succeeds
4000 0000 0000 0002  → declined`,
      },
    ],
    prompts: [
      {
        en: "Explain sandbox test cards. Which number should succeed, which should decline, and why never use them outside sandbox?",
        he: "הסבירו כרטיסי בדיקה ב-sandbox. איזה מספר אמור להצליח, איזה להידחות, ולמה לא להשתמש בהם מחוץ ל-sandbox?",
      },
      {
        en: "Help me rehearse a declined payment in sandbox. What should the UI show, and what should entitlement stay as?",
        he: "עזרו לי לתרגל תשלום שנדחה ב-sandbox. מה ה-UI צריך להציג, ובאיזה מצב ה-entitlement צריך להישאר?",
      },
      {
        en: "List safe steps to confirm our app handles success and decline with the two sandbox cards above. No live keys.",
        he: "רשמו צעדים בטוחים לוודא שהאפליקציה מטפלת בהצלחה ובדחייה עם שני כרטיסי ה-sandbox למעלה. בלי מפתחות חיים.",
      },
    ],
  },

  "Domain & registrar": {
    look: [
      {
        cap: {
          en: "Buy the name; point it later.",
          he: "קונים את השם; מפנים אחר כך.",
        },
        code: `domain:    vibetodev.com
registrar: Example Registrar
status:    active until 2027-03-01
DNS:       managed at registrar (for now)`,
      },
    ],
    prompts: [
      {
        en: "Explain domain versus registrar like I am brand new. Who owns the name, and where do DNS settings usually live at first?",
        he: "הסבירו domain מול registrar כאילו אני חדש לגמרי. מי מחזיק את השם, ואיפה בדרך כלל יושבות הגדרות DNS בהתחלה?",
      },
      {
        en: "Checklist before buying a domain for our course site: name ideas, renewal date reminders, and who on the team can log in.",
        he: "צ׳קליסט לפני קניית domain לאתר הקורס: רעיונות לשם, תזכורות חידוש, ומי בצוות יכול להתחבר.",
      },
      {
        en: "Describe how to transfer or keep DNS at the registrar without breaking email. Keep it high level and safe.",
        he: "תארו איך מעבירים או משאירים DNS אצל ה-registrar בלי לשבור מייל. שמרו על רמה גבוהה ובטוחה.",
      },
    ],
  },

  "DNS records (A, CNAME, TXT)": {
    look: [
      {
        cap: {
          en: "Three common DNS lines.",
          he: "שלוש שורות DNS נפוצות.",
        },
        code: `A     @       → 203.0.113.10
CNAME www     → vibetodev.com
TXT   @       → verify=abc123`,
      },
    ],
    prompts: [
      {
        en: "Explain A, CNAME, and TXT records with one example each for a small website. Keep names and fake IPs only.",
        he: "הסבירו רשומות A, CNAME ו-TXT עם דוגמה אחת לכל אחת לאתר קטן. רק שמות וכתובות IP מדומות.",
      },
      {
        en: "I need www to follow the apex domain and a TXT verify token for email. Draft the three DNS lines I should add.",
        he: "צריך ש-www יעקוב אחרי הדומיין הראשי ו-TXT לאימות מייל. נסחו את שלוש שורות ה-DNS שאוסיף.",
      },
      {
        en: "Review these DNS notes and warn me if anything looks like a public secret or a live production IP I should not paste.",
        he: "עברו על הערות DNS האלה והזהירו אם משהו נראה כמו סוד ציבורי או IP של production שאסור להדביק.",
      },
    ],
  },

  "TLS certificate": {
    look: [
      {
        cap: {
          en: "HTTPS padlock in one glance.",
          he: "מנעול HTTPS במבט אחד.",
        },
        code: `https://vibetodev.com
certificate: Let's Encrypt
issued to:   vibetodev.com
expires:     2026-12-01
browser:     connection is secure`,
      },
    ],
    prompts: [
      {
        en: "Explain what a TLS certificate does for visitors. Why does HTTP without it matter for login and checkout pages?",
        he: "הסבירו מה תעודת TLS עושה למבקרים. למה HTTP בלי זה חשוב לדפי התחברות וצ׳קאאוט?",
      },
      {
        en: "Walk me through checking certificate expiry on our staging hostname. What should I look for in the browser?",
        he: "עברו איתי על בדיקת תוקף תעודה ב-hostname של staging. מה לחפש בדפדפן?",
      },
      {
        en: "Ask the AI to confirm our host auto-renews TLS and fails loudly if renewal breaks. No vendor lock-in pitch, just the check.",
        he: "בקשו מה-AI לוודא שה-host מחדש TLS אוטומטית ונכשל בקול רם אם החידוש נשבר. בלי מכרז ספקים, רק הבדיקה.",
      },
    ],
  },

  "Is it me or them?": {
    look: [
      {
        cap: {
          en: "Split the blame with one test.",
          he: "מפצלים אשמה בבדיקה אחת.",
        },
        code: `curl https://api.provider.example/health
→ 200 ok

our app → 502 Bad Gateway
guess: problem is on our reverse proxy, not them`,
      },
    ],
    prompts: [
      {
        en: "Give a beginner checklist to decide if an outage is our app or the payment provider. Include one external status page check.",
        he: "תנו צ׳קליסט למתחילים להחליט אם התקלה אצלנו או אצל ספק התשלומים. כללו בדיקת דף סטטוס חיצוני.",
      },
      {
        en: "Our checkout fails only in production. Help me separate DNS, TLS, our API, and the provider with four quick tests.",
        he: "הצ׳קאאוט נכשל רק ב-production. עזרו להפריד DNS, TLS, ה-API שלנו והספק עם ארבע בדיקות מהירות.",
      },
      {
        en: "Draft a short message to support that shows we already checked their health endpoint and our webhook logs.",
        he: "נסחו הודעה קצרה לתמיכה שמראה שכבר בדקנו את ה-health שלהם ואת לוגי ה-webhook שלנו.",
      },
    ],
  },

  "Public vs private IP": {
    look: [
      {
        cap: {
          en: "Internet face vs inside face.",
          he: "פנים לאינטרנט מול פנים בפנים.",
        },
        code: `public:  203.0.113.10   ← the world can route here
private: 10.0.1.25      ← only inside our VPC`,
      },
    ],
    prompts: [
      {
        en: "Explain public versus private IP with a tiny home-lab story. When must a database stay on a private address?",
        he: "הסבירו IP ציבורי מול פרטי עם סיפור מעבדה קטן. מתי מסד נתונים חייב להישאר בכתובת פרטית?",
      },
      {
        en: "Review our deploy notes. Flag any database URL that uses a public IP and suggest a private alternative pattern.",
        he: "עברו על הערות ה-deploy. סמנו כל כתובת מסד עם IP ציבורי והציעו תבנית חלופית פרטית.",
      },
      {
        en: "Quiz me with three yes-or-no questions about which services should be public-facing on our course site.",
        he: "בחנו אותי בשלוש שאלות כן/לא על אילו שירותים צריכים להיות פונים לציבור באתר הקורס.",
      },
    ],
  },

  "Reverse proxy": {
    look: [
      {
        cap: {
          en: "One front door, many apps.",
          he: "דלת כניסה אחת, הרבה אפליקציות.",
        },
        code: `internet → proxy:443
             ├─ /        → app:3000
             └─ /api     → api:8080`,
      },
    ],
    prompts: [
      {
        en: "Explain a reverse proxy for beginners. Why put TLS and routing there instead of on every small app process?",
        he: "הסבירו reverse proxy למתחילים. למה לשים שם TLS וניתוב במקום על כל תהליך אפליקציה קטן?",
      },
      {
        en: "Sketch the simplest reverse-proxy map for a Next.js site on port 3000 and an API on 8080 under /api.",
        he: "שרטטו מפת reverse proxy הכי פשוטה לאתר Next.js על פורט 3000 ו-API על 8080 תחת /api.",
      },
      {
        en: "Review this nginx-style config for typos that would send /api to the wrong upstream. Keep the fix minimal.",
        he: "עברו על קונפיג בסגנון nginx לטעויות שישלחו את /api ל-upstream הלא נכון. שמרו על תיקון מינימלי.",
      },
    ],
  },

  "Firewall / security group": {
    look: [
      {
        cap: {
          en: "Allow only what you need.",
          he: "מאפשרים רק מה שצריך.",
        },
        code: `sg-web:
  inbound  443 from 0.0.0.0/0
  inbound  22  from 203.0.113.50   # bastion only
  outbound all`,
      },
    ],
    prompts: [
      {
        en: "Explain a security group like a bouncer list. Which ports should stay closed on a database server by default?",
        he: "הסבירו security group כמו רשימת סדרנים. אילו פורטים צריכים להישאר סגורים על שרת מסד כברירת מחדל?",
      },
      {
        en: "Propose inbound rules for a web box: HTTPS public, SSH only from our office IP 203.0.113.50. Nothing else open.",
        he: "הציעו כללי inbound לשרת ווב: HTTPS לציבור, SSH רק מ-IP המשרד 203.0.113.50. שום דבר אחר פתוח.",
      },
      {
        en: "Review our cloud firewall notes and highlight any rule that exposes a database port to the whole internet.",
        he: "עברו על הערות ה-firewall בענן וסמנו כלל שחושף פורט מסד לכל האינטרנט.",
      },
    ],
  },

  "VPC / private network": {
    look: [
      {
        cap: {
          en: "Our own private neighborhood.",
          he: "שכונה פרטית משלנו.",
        },
        code: `VPC 10.0.0.0/16
  public subnet  10.0.0.0/24  → web
  private subnet 10.0.1.0/24  → db
db has no public IP`,
      },
    ],
    prompts: [
      {
        en: "Explain a VPC to a beginner. Why put the database in a private subnet even when the website is public?",
        he: "הסבירו VPC למתחילים. למה לשים את המסד ב-subnet פרטי גם כשהאתר ציבורי?",
      },
      {
        en: "Draw a two-subnet layout for our course app: public web, private database. Use fake CIDR ranges only.",
        he: "ציירו פריסת שני subnets לאפליקציית הקורס: ווב ציבורי, מסד פרטי. רק טווחי CIDR מדומים.",
      },
      {
        en: "List three misconfigurations that accidentally publish a private database. Keep the advice defensive and simple.",
        he: "רשמו שלוש טעויות הגדרה שמפרסמות מסד פרטי בטעות. שמרו על עצות הגנתיות ופשוטות.",
      },
    ],
  },

  "The cloud": {
    look: [
      {
        cap: {
          en: "Someone else's computer, on demand.",
          he: "המחשב של מישהו אחר, לפי דרישה.",
        },
        code: `your laptop  → code
cloud        → runs the site 24/7
bill         → pay for what you use`,
      },
    ],
    prompts: [
      {
        en: "Explain the cloud without jargon. What do we rent, what do we still own as files in git, and what can go wrong overnight?",
        he: "הסבירו את הענן בלי מונחים מסובכים. מה שוכרים, מה עדיין שלנו כקבצים ב-git, ומה יכול להשתבש בלילה?",
      },
      {
        en: "Compare hosting on my laptop versus the cloud for a course site that must stay up while I sleep. Three bullets each.",
        he: "השוו אירוח על הלפטופ מול הענן לאתר קורס שחייב לעבוד כשאני ישן. שלושה נקודות לכל צד.",
      },
      {
        en: "Help me write a one-sentence definition of the cloud for absolute beginners in our course notes.",
        he: "עזרו לכתוב הגדרת משפט אחד של הענן למתחילים מוחלטים בהערות הקורס.",
      },
    ],
  },

  "AWS / Azure / GCP": {
    look: [
      {
        cap: {
          en: "Same idea, different brands.",
          he: "אותו רעיון, מותגים שונים.",
        },
        code: `need: virtual machine + object storage
AWS:   EC2 + S3
Azure: VM  + Blob
GCP:   GCE + Cloud Storage`,
      },
    ],
    prompts: [
      {
        en: "Compare AWS, Azure, and GCP at a beginner level. Same jobs, different product names — give three pairs of equivalents.",
        he: "השוו AWS, Azure ו-GCP ברמת מתחילים. אותן משרות, שמות מוצר שונים — תנו שלושה זוגות מקבילים.",
      },
      {
        en: "I already know AWS names. Translate EC2, S3, and Lambda into the Azure and GCP names I will see in docs.",
        he: "אני כבר מכיר שמות AWS. תרגמו EC2, S3 ו-Lambda לשמות Azure ו-GCP שאראה בתיעוד.",
      },
      {
        en: "Advise how to pick one cloud for a tiny course site without multi-cloud complexity. One clear recommendation and why.",
        he: "יעצו איך לבחור ענן אחד לאתר קורס קטן בלי מורכבות multi-cloud. המלצה אחת ברורה ולמה.",
      },
    ],
  },

  "S3 / object storage": {
    look: [
      {
        cap: {
          en: "Files in a bucket, not a disk.",
          he: "קבצים בדלי, לא בדיסק.",
        },
        code: `bucket: course-assets-dev
key:    lessons/intro.mp4
url:    https://cdn.example/lessons/intro.mp4
acl:    private (app signs links)`,
      },
    ],
    prompts: [
      {
        en: "Explain object storage versus a server disk. When should lesson videos live in a bucket instead of inside the app repo?",
        he: "הסבירו object storage מול דיסק של שרת. מתי סרטוני שיעור צריכים לחיות ב-bucket במקום בתוך ה-repo של האפליקציה?",
      },
      {
        en: "Design a private bucket layout for course videos with signed URLs. Keep folder names simple and fake.",
        he: "תכננו פריסת bucket פרטי לסרטוני קורס עם כתובות חתומות. שמרו על שמות תיקיות פשוטים ומדומים.",
      },
      {
        en: "Review our upload path and warn if anything makes the bucket world-readable by default. Suggest the safer setting.",
        he: "עברו על נתיב ההעלאה והזהירו אם משהו הופך את ה-bucket לקריא לכולם כברירת מחדל. הציעו הגדרה בטוחה יותר.",
      },
    ],
  },

  "Container / Docker": {
    look: [
      {
        cap: {
          en: "Same box on every machine.",
          he: "אותה קופסה על כל מכונה.",
        },
        code: `FROM node:20-alpine
WORKDIR /app
COPY package.json .
COPY . .
CMD ["node", "server.js"]`,
      },
    ],
    prompts: [
      {
        en: "Explain Docker to a beginner using the five-line Dockerfile idea. What problem does the same image on every machine solve?",
        he: "הסבירו Docker למתחילים עם רעיון Dockerfile של חמש שורות. איזו בעיה פותרת אותה image על כל מכונה?",
      },
      {
        en: "Write the smallest Dockerfile for a Node app that copies files and runs server.js. No fancy multi-stage builds.",
        he: "כתבו את ה-Dockerfile הקטן ביותר לאפליקציית Node שמעתיק קבצים ומריץ server.js. בלי multi-stage מתוחכם.",
      },
      {
        en: "Review this Dockerfile for beginner mistakes: missing WORKDIR, copying secrets, or running as root without comment.",
        he: "עברו על Dockerfile הזה לטעויות מתחילים: בלי WORKDIR, העתקת סודות, או הרצה כ-root בלי הערה.",
      },
    ],
  },

  Deploy: {
    look: [
      {
        cap: {
          en: "Code leaves your laptop.",
          he: "הקוד יוצא מהלפטופ.",
        },
        code: `git push origin main
→ host builds
→ host runs image app:4f3a
→ https://vibetodev.com is live`,
      },
    ],
    prompts: [
      {
        en: "Explain deploy in one short story: commit, push, host builds, users see the new version. Name each step plainly.",
        he: "הסבירו deploy בסיפור קצר: commit, push, ה-host בונה, המשתמשים רואים גרסה חדשה. תנו שם ברור לכל שלב.",
      },
      {
        en: "List the minimum checks before a production deploy of our course site: tests, migrations, and a smoke URL.",
        he: "רשמו בדיקות מינימום לפני deploy ל-production של אתר הקורס: בדיקות, migrations, וכתובת smoke.",
      },
      {
        en: "Help me write a paste-ready prompt that asks the AI to prepare a deploy checklist for staging first, then production.",
        he: "עזרו לכתוב פרומפט מוכן להדבקה שמבקש מה-AI צ׳קליסט deploy קודם ל-staging ואז ל-production.",
      },
    ],
  },

  "CI/CD": {
    look: [
      {
        cap: {
          en: "Push, then tests run alone.",
          he: "דוחפים, ואז הבדיקות רצות לבד.",
        },
        code: `name: test
on: [push]
jobs:
  t:
    runs-on: ubuntu-latest
    steps: [{ run: npm test }]`,
      },
    ],
    prompts: [
      {
        en: "Explain CI/CD for beginners. What should run on every push, and what should wait until staging looks good?",
        he: "הסבירו CI/CD למתחילים. מה צריך לרוץ בכל push, ומה לחכות עד ש-staging נראה טוב?",
      },
      {
        en: "Draft a six-line GitHub Actions workflow that runs npm test on push. Keep it copy-paste simple.",
        he: "נסחו workflow של GitHub Actions בשישה שורות שמריץ npm test ב-push. שמרו על פשטות להעתקה.",
      },
      {
        en: "Review our pipeline idea and separate continuous integration checks from the actual production deploy step.",
        he: "עברו על רעיון ה-pipeline והפרידו בדיקות continuous integration משלב ה-deploy האמיתי ל-production.",
      },
    ],
  },

  "Logs & monitoring": {
    look: [
      {
        cap: {
          en: "Watch the live system speak.",
          he: "לראות את המערכת החיה מדברת.",
        },
        code: `2026-09-25T08:01Z INFO  checkout started user=usr_18
2026-09-25T08:01Z ERROR webhook verify failed id=evt_91
alert: error rate > 5% for 5 minutes`,
      },
    ],
    prompts: [
      {
        en: "Explain logs versus monitoring alerts. When do I read a log line, and when should a pager fire instead?",
        he: "הסבירו לוגים מול התראות monitoring. מתי קוראים שורת לוג, ומתי צריך שפאג׳ר יצלצל במקום?",
      },
      {
        en: "Suggest five structured log fields for our billing webhook handler. Fake ids only, no card data ever.",
        he: "הציעו חמישה שדות לוג מובנים ל-handler של webhook הבילינג. רק מזהים מדומים, בלי נתוני כרטיס לעולם.",
      },
      {
        en: "Help define one beginner alert: webhook failures above five percent for five minutes on production.",
        he: "עזרו להגדיר התראה אחת למתחילים: כשלי webhook מעל חמישה אחוז למשך חמש דקות ב-production.",
      },
    ],
  },

  "EC2 / VM vs Lambda / serverless": {
    look: [
      {
        cap: {
          en: "Always-on box vs pay-per-call.",
          he: "מכונה תמיד דולקת מול תשלום לקריאה.",
        },
        code: `VM / EC2:     server runs all day → good for steady sites
Lambda:       runs only on request → good for rare jobs
bill shape:   hours vs invocations`,
      },
    ],
    prompts: [
      {
        en: "Compare a VM to serverless Lambda for a course website and for a nightly cleanup job. Which fits which, and why?",
        he: "השוו VM ל-serverless Lambda לאתר קורס ולמשימת ניקוי לילית. מה מתאים למה, ולמה?",
      },
      {
        en: "Explain cold starts in one paragraph a beginner can use when choosing Lambda for a checkout webhook.",
        he: "הסבירו cold starts בפסקה אחת שמתחיל יוכל להשתמש בה כשבוחרים Lambda ל-webhook של צ׳קאאוט.",
      },
      {
        en: "List questions to ask before moving our API from a small VM to serverless. Focus on timeouts and long requests.",
        he: "רשמו שאלות לפני מעבר ה-API מ-VM קטן ל-serverless. התמקדו ב-timeouts ובקשות ארוכות.",
      },
    ],
  },

  "Environments (dev / staging / prod)": {
    look: [
      {
        cap: {
          en: "Three rooms, one codebase.",
          he: "שלושה חדרים, codebase אחד.",
        },
        code: `dev      → laptop, fake data
staging  → like prod, safe to break
prod     → real users, real money`,
      },
    ],
    prompts: [
      {
        en: "Explain dev, staging, and production for beginners. What is allowed to break in each, and where do real payments live?",
        he: "הסבירו dev, staging ו-production למתחילים. מה מותר לשבור בכל אחד, ואיפה חיים תשלומים אמיתיים?",
      },
      {
        en: "Write a one-page rule: never test refunds in production; use staging with sandbox keys. Make it paste-ready for the team.",
        he: "כתבו כלל בעמוד אחד: לא לבדוק refunds ב-production; להשתמש ב-staging עם מפתחות sandbox. מוכן להדבקה לצוות.",
      },
      {
        en: "Help label our three deploy URLs clearly so nobody confuses staging with production during a demo.",
        he: "עזרו לתייג שלוש כתובות deploy בבירור כדי שאף אחד לא יבלבל staging עם production בהדגמה.",
      },
    ],
  },

  "Config per environment": {
    look: [
      {
        cap: {
          en: "Same code, different settings.",
          he: "אותו קוד, הגדרות שונות.",
        },
        code: `# .env  (this machine only, never committed)
APP_ENV=staging
DATABASE_URL=postgres://db-staging/app
PADDLE_ENV=sandbox

# .env.example  (committed: same keys, no real values)
APP_ENV=
DATABASE_URL=
PADDLE_ENV=sandbox`,
      },
    ],
    prompts: [
      {
        en: "Explain why config should change per environment while code stays the same. Give three example variables for our site.",
        he: "הסבירו למה קונפיג משתנה לפי סביבה והקוד נשאר אותו דבר. תנו שלושה משתנים לדוגמה לאתר שלנו.",
      },
      {
        en: "Review our env files mentally: which values must differ between staging and production, especially payment keys?",
        he: "עברו בראש על קבצי env: אילו ערכים חייבים להשתנות בין staging ל-production, במיוחד מפתחות תשלום?",
      },
      {
        en: "Draft a safe checklist so staging never accidentally points at the production database URL.",
        he: "נסחו צ׳קליסט בטוח כדי ש-staging לא יצביע בטעות על כתובת מסד של production.",
      },
    ],
  },

  "Secrets manager": {
    look: [
      {
        cap: {
          en: "Keys live outside the repo.",
          he: "המפתחות חיים מחוץ ל-repo.",
        },
        code: `# NOT in git
PADDLE_API_KEY=****
# fetched at runtime from secrets manager
secret_name: prod/paddle/api_key`,
      },
    ],
    prompts: [
      {
        en: "Explain a secrets manager for beginners. Why must API keys stay out of git, screenshots, and chat logs?",
        he: "הסבירו secrets manager למתחילים. למה מפתחות API חייבים להישאר מחוץ ל-git, לצילומי מסך וללוגי צ׳אט?",
      },
      {
        en: "Help move a hardcoded Paddle key into an environment secret named prod/paddle/api_key. Describe steps without pasting real keys.",
        he: "עזרו להעביר מפתח Paddle מקוד קשיח ל-secret בשם prod/paddle/api_key. תארו צעדים בלי להדביק מפתחות אמיתיים.",
      },
      {
        en: "Scan our docs for places that teach people to commit .env files. Rewrite those lines to use a secrets manager instead.",
        he: "סרקו את התיעוד למקומות שמלמדים לעשות commit ל-.env. שכתבו את השורות לשימוש ב-secrets manager במקום.",
      },
    ],
  },

  "Preview deployment": {
    look: [
      {
        cap: {
          en: "Every branch gets a URL.",
          he: "כל branch מקבל כתובת.",
        },
        code: `branch: feat/checkout-copy
preview: https://feat-checkout-copy.example.app
note:    not production; sandbox payments only`,
      },
    ],
    prompts: [
      {
        en: "Explain preview deployments. Why review a feature URL before merging to staging, and what data should it never use?",
        he: "הסבירו preview deployments. למה לבדוק כתובת פיצ׳ר לפני מיזוג ל-staging, ואילו נתונים אסור לה להשתמש בהם?",
      },
      {
        en: "Write a team rule: preview apps use sandbox billing and fake users only. Make it one short paragraph.",
        he: "כתבו כלל צוות: אפליקציות preview משתמשות רק בבילינג sandbox ובמשתמשים מדומים. פסקה קצרה אחת.",
      },
      {
        en: "Help me ask the AI to compare my preview URL to staging and list visual differences on the checkout page.",
        he: "עזרו לבקש מה-AI להשוות את כתובת ה-preview ל-staging ולרשום הבדלים ויזואליים בדף הצ׳קאאוט.",
      },
    ],
  },

  Rollback: {
    look: [
      {
        cap: {
          en: "Put the old image back.",
          he: "מחזירים את ה-image הישן.",
        },
        code: `deploy image sha 4f3a again`,
      },
    ],
    prompts: [
      {
        en: "Explain rollback for beginners. When do we redeploy an old image tag instead of shipping a rushed hotfix?",
        he: "הסבירו rollback למתחילים. מתי מפריסים שוב image tag ישן במקום לשלוח hotfix חפוז?",
      },
      {
        en: "Our production broke after image sha 9bc1. Write the exact command style to deploy image sha 4f3a again.",
        he: "ה-production נשבר אחרי image sha 9bc1. כתבו בסגנון פקודה מדויק לפרוס שוב את image sha 4f3a.",
      },
      {
        en: "Draft a five-minute rollback drill for staging: break a page on purpose, roll back, confirm the old version returns.",
        he: "נסחו תרגיל rollback של חמש דקות ב-staging: שוברים דף בכוונה, עושים rollback, מוודאים שהגרסה הישנה חוזרת.",
      },
    ],
  },

  "Feature flag": {
    look: [
      {
        cap: {
          en: "Flip a switch, not a deploy.",
          he: "מדליקים מתג, לא עושים deploy.",
        },
        code: `if (flags.checkoutV2) renderNewCheckout(); else renderClassicCheckout();`,
      },
    ],
    prompts: [
      {
        en: "Explain feature flags with the checkoutV2 example. How does a flag protect users if the new checkout misbehaves?",
        he: "הסבירו feature flags עם הדוגמה של checkoutV2. איך flag מגן על משתמשים אם הצ׳קאאוט החדש מתנהג רע?",
      },
      {
        en: "Add a single if (flags.checkoutV2) branch around our new checkout component. Keep the old path as the else.",
        he: "הוסיפו ענף יחיד של if (flags.checkoutV2) סביב רכיב הצ׳קאאוט החדש. שמרו על הנתיב הישן ב-else.",
      },
      {
        en: "List three flags we might want for billing experiments, and who on the team should be allowed to flip them.",
        he: "רשמו שלושה flags שיכולים להתאים לניסויי בילינג, ומי בצוות מורשה להדליק או לכבות אותם.",
      },
    ],
  },

  "Build artifact & image tag": {
    look: [
      {
        cap: {
          en: "Name what you ship.",
          he: "תנו שם למה ששולחים.",
        },
        code: `build → artifact app.zip
docker tag app:4f3a
deploy app:4f3a
never deploy :latest in prod`,
      },
    ],
    prompts: [
      {
        en: "Explain build artifacts and image tags. Why is deploying :latest risky in production compared to sha 4f3a?",
        he: "הסבירו build artifacts ו-image tags. למה deploy של :latest מסוכן ב-production לעומת sha 4f3a?",
      },
      {
        en: "Propose a tagging scheme for our course app using short git shas. Show one good tag and one bad habit to avoid.",
        he: "הציעו סכמת תיוג לאפליקציית הקורס עם sha קצרים מ-git. הראו tag טוב והרגל רע אחד להימנע ממנו.",
      },
      {
        en: "Help verify staging runs the same image tag we just built in CI before we promote to production.",
        he: "עזרו לוודא ש-staging רץ על אותו image tag שבנינו ב-CI לפני קידום ל-production.",
      },
    ],
  },

  "Zero-downtime deploy": {
    look: [
      {
        cap: {
          en: "New version, no blank page.",
          he: "גרסה חדשה, בלי דף ריק.",
        },
        code: `1 start app:9bc1 beside app:4f3a
2 wait until health ok
3 send traffic to 9bc1
4 stop 4f3a`,
      },
    ],
    prompts: [
      {
        en: "Explain zero-downtime deploy in four steps a beginner can follow. What is a health check doing in the middle?",
        he: "הסבירו zero-downtime deploy בארבעה צעדים שמתחיל יכול לעקוב אחריהם. מה בדיקת health עושה באמצע?",
      },
      {
        en: "Compare a stop-then-start deploy to a rolling deploy for our course site. Which causes a blank page for users?",
        he: "השוו deploy של עצירה-ואז-הפעלה מול rolling deploy לאתר הקורס. איזה גורם לדף ריק למשתמשים?",
      },
      {
        en: "Draft a health endpoint checklist so the proxy only switches traffic when /health returns 200.",
        he: "נסחו צ׳קליסט ל-health endpoint כדי שה-proxy יעביר תעבורה רק כש-/health מחזיר 200.",
      },
    ],
  },

  "Infrastructure as Code": {
    look: [
      {
        cap: {
          en: "The server setup is a file.",
          he: "הגדרת השרת היא קובץ.",
        },
        code: `resource "server" "web" {
  size = "small"
  image = "app:4f3a"
}
# apply → cloud matches the file`,
      },
    ],
    prompts: [
      {
        en: "Explain Infrastructure as Code without vendor names. Why is a reviewable file better than clicking in a cloud console?",
        he: "הסבירו Infrastructure as Code בלי שמות ספקים. למה קובץ שניתן ל-review עדיף על קליקים בקונסולת ענן?",
      },
      {
        en: "Show a tiny fake IaC snippet for one small web server running image app:4f3a. Keep it conceptual.",
        he: "הראו קטע IaC מדומה קטן לשרת ווב אחד שרץ על image app:4f3a. שמרו על זה רעיוני.",
      },
      {
        en: "List what should live in IaC versus what should stay in a secrets manager for our staging environment.",
        he: "רשמו מה צריך לחיות ב-IaC ומה להישאר ב-secrets manager לסביבת staging שלנו.",
      },
    ],
  },

  "Expand / contract migration": {
    look: [
      {
        cap: {
          en: "Three steps, no big bang.",
          he: "שלושה שלבים, בלי מכה אחת.",
        },
        code: `1 add column plan_code (nullable)
2 backfill plan_code from plan_id
3 drop old column plan_id`,
      },
    ],
    prompts: [
      {
        en: "Explain expand/contract migration in three numbered steps: add column, backfill, drop old. Why avoid a single risky change?",
        he: "הסבירו migrate מסוג expand/contract בשלושה שלבים ממוספרים: הוספת עמודה, backfill, מחיקת הישן. למה להימנע משינוי מסוכן אחד?",
      },
      {
        en: "We rename plan_id to plan_code. Draft the expand, backfill, and contract deploys as a checklist for staging first.",
        he: "משנים שם מ-plan_id ל-plan_code. נסחו את שלבי ה-expand, backfill וה-contract כצ׳קליסט קודם ל-staging.",
      },
      {
        en: "Review a migration plan that drops a column in the same release that starts writing a new one. Suggest the safer split.",
        he: "עברו על תוכנית migration שמוחקת עמודה באותו שחרור שמתחיל לכתוב עמודה חדשה. הציעו פיצול בטוח יותר.",
      },
    ],
  },
};
