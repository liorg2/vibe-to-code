import type { L10n } from "@/lib/types";

/** The course intro page: the app you build, what to have ready, and how one lesson runs. */
type Item = { icon: string; t: L10n; d: L10n };

export const INTRO = {
  h: {
    progress: { en: "Your progress", he: "ההתקדמות שלכם" },
    app: { en: "What you'll build together with AI", he: "מה נבנה יחד עם ה-AI" },
    need: { en: "Before you start", he: "לפני שמתחילים" },
    flow: { en: "How each lesson works", he: "איך בנוי כל שיעור" },
    syllabus: { en: "The lessons", he: "השיעורים" },
    topics: { en: "topics", he: "נושאים" },
    builds: { en: "build steps", he: "שלבי בנייה" },
    preview: { en: "Try the free lesson", he: "לנסות את השיעור החינמי" },
    finished: { en: "All done. Your app is shipped.", he: "סיימתם. האפליקציה שלכם באוויר." },
    reading: { en: "of reading and building, about 45 minutes per build step. Faster or slower with your agent's pace", he: "של קריאה ובנייה, בערך 45 דקות לכל שלב בנייה. מהר יותר או לאט יותר לפי הקצב של הסוכן שלכם" },
  },
  app: {
    en: "Pocket CRM: a small contact manager for a freelancer, with contacts, notes and follow-up reminders. It is small enough to understand end to end, while introducing some of the challenges real apps face. You start from an empty folder. Each lesson adds a feature to the same app, so by the end you have built it, tested it and shipped it yourself.",
    he: "Pocket CRM: מנהל אנשי קשר קטן לפרילנסרים, עם אנשי קשר, הערות ותזכורות למעקב. הוא קטן מספיק כדי להבין אותו מקצה לקצה, ובמהלך הבנייה תפגשו כמה מהאתגרים שאפליקציות אמיתיות מציבות. מתחילים מתיקייה ריקה. כל שיעור מוסיף feature לאותה אפליקציה, כך שבסוף בניתם אותה, בדקתם אותה והעליתם אותה לאוויר בעצמכם.",
  },
  end: {
    basic: {
      en: "Where you land: a live CRM at a public URL, with a REST API, a Postgres database and tests that run on every change.",
      he: "איפה נוחתים: CRM חי בכתובת ציבורית, עם REST API, בסיס נתונים Postgres וטסטים שרצים בכל שינוי.",
    },
    advanced: {
      en: "Where you land: a production app with sign-in, a paid plan, scheduled emails, AI-drafted follow-ups, a cache, CI that blocks bad merges, error alerts, and a repo a stranger can pick up.",
      he: "איפה נוחתים: אפליקציה ב-production עם התחברות, מסלול בתשלום, מיילים מתוזמנים, טיוטות מעקב שנכתבות עם AI, cache, CI שחוסם מיזוגים שבורים, התראות על שגיאות, וריפו שמישהו זר יכול להרים.",
    },
  },
  need: [
    {
      icon: "🧠",
      t: { en: "No coding background", he: "בלי רקע בתכנות" },
      d: {
        en: "No coding experience is needed. You will install a few tools, copy prompts and commands, read the AI's changes and error messages, and check that the app works.",
        he: "אין צורך בניסיון קודם בתכנות. תתקינו כמה כלים, תעתיקו פרומפטים ופקודות, תקראו את השינויים שה-AI יצר ואת הודעות השגיאה, ותבדקו שהאפליקציה עובדת.",
      },
    },
    {
      icon: "💻",
      t: { en: "A computer and Node.js", he: "מחשב ו-Node.js" },
      d: {
        en: "Mac, Windows or Linux, with Node.js LTS from nodejs.org. That is the only thing you install by hand. The AI installs the rest.",
        he: "Mac, Windows או Linux, עם Node.js בגרסת LTS מ-nodejs.org. זה הדבר היחיד שמתקינים ידנית. את כל השאר ה-AI מתקין.",
      },
    },
    {
      icon: "🤖",
      t: { en: "An AI coding agent", he: "סוכן AI לקוד" },
      d: {
        en: "One that works inside your project folder and runs commands: Claude Code, Cursor, Codex, Copilot in agent mode. A chat in a browser tab is not enough, because it cannot run your tests.",
        he: "כזה שעובד בתוך תיקיית הפרויקט ומריץ פקודות: Claude Code, Cursor, Codex, Copilot במצב agent. צ'אט בלשונית דפדפן לא מספיק, כי הוא לא יכול להריץ את הטסטים שלכם.",
      },
    },
    {
      icon: "🧭",
      t: { en: "A safe way to work with AI", he: "דרך בטוחה לעבוד עם AI" },
      d: {
        en: "For each change, state the goal and how you will know it is done. On an existing project, ask for a short map before edits. Keep the change small, run the relevant tests, read the diff, and check the result yourself. Ask before a production deploy, merge, destructive action, or new paid service.",
        he: "בכל שינוי, הגדירו את המטרה ואיך תדעו שהוא הושלם. בפרויקט קיים, בקשו מה-AI למפות אותו בקצרה לפני עריכה. עבדו בשינויים קטנים, הריצו את הבדיקות המתאימות, קראו את ה-diff ובדקו בעצמכם את התוצאה. בקשו אישור לפני פריסה ל-production, מיזוג, פעולה הרסנית או שימוש בשירות בתשלום.",
      },
    },
    {
      icon: "📝",
      t: { en: "A code editor", he: "עורך קוד" },
      d: {
        en: "To read what changed. VS Code is fine, and Cursor already is one.",
        he: "כדי לקרוא מה השתנה. VS Code מספיק, ו-Cursor כבר כולל אחד.",
      },
    },
  ] as Item[],
  accounts: {
    t: { en: "Accounts you'll need, when a step asks", he: "חשבונות שתצטרכו, לפי שלבי הקורס" },
    basic: {
      en: "GitHub and Vercel in step 2, Neon in step 8. Plans can change, so check each service's current pricing when you create an account.",
      he: "GitHub ו-Vercel בשלב 2, Neon בשלב 8. התוכניות והמחירים עשויים להשתנות, לכן בדקו את המחיר העדכני של כל שירות בעת פתיחת החשבון.",
    },
    advanced: {
      en: "GitHub and Vercel in step 2, Neon in step 8, Resend in step 12, a payment provider's sandbox (Stripe test mode or Paddle) in step 16, and Sentry in step 20. Check current pricing and limits when you sign up; plans can change. Step 23 uses an AI provider key (Anthropic or OpenAI) and is billed by usage. Set a spending limit first, then check the provider's current rates. You create each account when you reach that step.",
      he: "GitHub ו-Vercel בשלב 2, Neon בשלב 8, Resend בשלב 12, סביבת הבדיקות של ספק תשלומים (Stripe במצב בדיקה או Paddle) בשלב 16, ו-Sentry בשלב 20. בדקו את המחירים והמגבלות העדכניים בעת ההרשמה, כי התוכניות עשויות להשתנות. שלב 23 משתמש במפתח של ספק AI (Anthropic או OpenAI) ומחויב לפי שימוש. הגדירו מגבלת הוצאה ובדקו את התעריפים העדכניים של הספק. פותחים כל חשבון כשמגיעים לשלב שלו.",
    },
  },
  flow: [
    {
      icon: "🎬",
      t: { en: "Topics", he: "נושאים" },
      d: {
        en: "Each topic is a short story you watch: requests moving between the browser, the server and the database, with the real status codes and headers.",
        he: "כל נושא הוא סיפור קצר שצופים בו: בקשות שעוברות בין הדפדפן, השרת ובסיס הנתונים, עם קודי הסטטוס וה-headers האמיתיים.",
      },
    },
    {
      icon: "📋",
      t: { en: "Summary", he: "סיכום" },
      d: {
        en: "The whole lesson on one page, to come back to when the AI uses a word you forgot.",
        he: "כל השיעור בעמוד אחד, לחזור אליו כשה-AI משתמש במילה ששכחתם.",
      },
    },
    {
      icon: "🛠",
      t: { en: "Build", he: "בנייה" },
      d: {
        en: "Paste one prompt so the AI adds the lesson's feature to your app. Then paste a second prompt that writes tests, runs the whole suite and reports back. You tick off what works.",
        he: "מדביקים פרומפט אחד וה-AI מוסיף לאפליקציה את ה-feature של השיעור. אחר כך מדביקים פרומפט שני שכותב טסטים, מריץ את כל החבילה ומדווח. אתם מסמנים מה עובד.",
      },
    },
    {
      icon: "✅",
      t: { en: "Quiz", he: "מבחן" },
      d: {
        en: "A few questions to check it stuck before you move on.",
        he: "כמה שאלות כדי לוודא שזה נקלט לפני שממשיכים.",
      },
    },
  ] as Item[],
};
