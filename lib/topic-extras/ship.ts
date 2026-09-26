import type { TopicExtra } from "./types";

export const extras: Record<string, TopicExtra> = {
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

};
