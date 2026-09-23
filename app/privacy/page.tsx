import { LegalPage, type LegalText } from "@/components/LegalPage";
import type { Lang } from "@/lib/types";

export const metadata = { title: "Privacy" };

const UPDATED = "2026-09-23";
// TODO(owner): confirm support@vibetodev.com receives mail. Keep this page in step with lib/db.ts,
// middleware.ts cookies and any analytics you add — it lists exactly what is collected today.

const TEXT: Record<Lang, LegalText> = {
  en: {
    title: "Privacy policy",
    lede: "Short version: we keep the minimum needed to sign you in, remember your progress and know which courses you bought. No ads, no tracking, no selling data.",
    s: [
      {
        h: "1. Who we are",
        p: [
          "Vibe → Code (vibetodev.com) is responsible for the personal data described here. Contact: support@vibetodev.com.",
        ],
      },
      {
        h: "2. What we collect",
        p: [
          "Account: when you sign in with Google we receive your name, email address and a user ID from Google, through Firebase Authentication. We use the email to check your access.",
          "Learning progress: which lessons and topics you have opened or finished, and when. It is stored against your user ID.",
          "Purchases: which course you bought, when, and the Paddle transaction ID. Your card details, billing address and invoices are handled by Paddle, not by us; we never see or store your card.",
          "Technical data: our host keeps standard server logs (such as IP address, browser and pages requested) for security and debugging.",
          "We don't collect your API keys, passwords, or the apps and code you build with the course. Don't send them to us.",
        ],
      },
      {
        h: "3. Why we use it",
        p: [
          "To provide the course: sign-in, access to what you bought, and saving your progress across devices (performing our contract with you).",
          "To handle payments, refunds and tax records (contract and legal obligations).",
          "To keep the site secure and working (our legitimate interest).",
          "To send one welcome email when you sign up, and to answer you when you write to us. We don't send marketing email without asking you first.",
        ],
      },
      {
        h: "4. Who we share it with",
        p: [
          "Only the service providers that run the site, each for its own part: Google Firebase (sign-in), Neon (database for progress and purchases), Vercel (hosting and logs), Resend (sending our emails) and Paddle (payments, as merchant of record under its own privacy policy).",
          "Some of them store data outside your country, including in the United States, under their standard data-protection terms. We don't sell or rent personal data, and we don't share it for advertising.",
          "We may disclose data if the law requires it.",
        ],
      },
      {
        h: "5. Cookies and local storage",
        p: [
          "__session: keeps you signed in, for up to 5 days. Strictly necessary.",
          "vibe.lang: remembers English or Hebrew, for up to 1 year. Strictly necessary.",
          "Your browser's local storage keeps interface choices (like a folded menu or hidden finished lessons) and build-step ticks. That stays on your device.",
          "There are no analytics, advertising or third-party tracking cookies, so there is no cookie banner. Paddle sets its own cookies on its checkout page.",
        ],
      },
      {
        h: "6. How long we keep it",
        p: [
          "Account, progress and purchase records: while your account exists. Ask us to delete it and we will, within 30 days. We keep a purchase record for as long as tax and accounting law requires.",
          "Server logs are kept for a short period by our host and then deleted.",
        ],
      },
      {
        h: "7. Your rights",
        p: [
          "You can ask to see the data we hold about you, correct it, get a copy, or delete it, and you can object to or restrict how we use it. Email support@vibetodev.com from the address you sign in with; we reply within 30 days.",
          "You can also complain to your data-protection authority; in Israel that is the Privacy Protection Authority, in the EU or UK your local supervisory authority.",
        ],
      },
      {
        h: "8. Security and children",
        p: [
          "Data travels over HTTPS, access to our systems is limited, and sign-in is handled by Google, so we never hold your password. No system is perfectly secure; if a breach affects you we will tell you as the law requires.",
          "The course is not meant for children under 16, and we don't knowingly collect their data.",
        ],
      },
      {
        h: "9. Changes",
        p: [
          "If we change what we collect or how we use it, we update this page and the date above. For a significant change we will also tell signed-in users.",
        ],
      },
    ],
  },
  he: {
    title: "מדיניות פרטיות",
    lede: "בקצרה: אנחנו שומרים רק את המינימום הנדרש כדי לחבר אתכם, לזכור את ההתקדמות שלכם ולדעת אילו קורסים רכשתם. בלי פרסומות, בלי מעקב, בלי מכירת מידע.",
    s: [
      {
        h: "1. מי אנחנו",
        p: [
          "Vibe → Code (vibetodev.com) אחראי על המידע האישי המתואר כאן. יצירת קשר: support@vibetodev.com.",
        ],
      },
      {
        h: "2. איזה מידע אנחנו אוספים",
        p: [
          "חשבון: כשאתם מתחברים עם Google אנחנו מקבלים ממנה את שמכם, כתובת האימייל ומזהה משתמש, דרך Firebase Authentication. אנחנו משתמשים באימייל כדי לבדוק את הגישה שלכם.",
          "התקדמות בלימוד: אילו שיעורים ונושאים פתחתם או סיימתם, ומתי. המידע נשמר לפי מזהה המשתמש שלכם.",
          "רכישות: איזה קורס רכשתם, מתי, ומזהה העסקה ב-Paddle. פרטי כרטיס האשראי, כתובת החיוב והחשבוניות מטופלים על ידי Paddle ולא על ידינו; אנחנו אף פעם לא רואים או שומרים את הכרטיס.",
          "מידע טכני: ספק האחסון שלנו שומר לוגים רגילים של השרת (כמו כתובת IP, דפדפן ודפים שנטענו) לצורכי אבטחה ואיתור תקלות.",
          "אנחנו לא אוספים מפתחות API, סיסמאות, או את האפליקציות והקוד שאתם בונים בקורס. אל תשלחו אותם אלינו.",
        ],
      },
      {
        h: "3. למה אנחנו משתמשים בו",
        p: [
          "כדי לספק את הקורס: התחברות, גישה למה שרכשתם ושמירת ההתקדמות בין מכשירים (ביצוע החוזה איתכם).",
          "כדי לטפל בתשלומים, החזרים ורישומי מס (חוזה וחובה חוקית).",
          "כדי לשמור על האתר מאובטח ופועל (אינטרס לגיטימי).",
          "כדי לשלוח מייל ברוכים הבאים אחד כשאתם נרשמים, ולענות לכם כשאתם פונים אלינו. לא נשלח אימייל שיווקי בלי לבקש מכם קודם.",
        ],
      },
      {
        h: "4. עם מי אנחנו משתפים",
        p: [
          "רק עם ספקי השירות שמפעילים את האתר, כל אחד לחלק שלו: Google Firebase (התחברות), Neon (מסד נתונים להתקדמות ולרכישות), Vercel (אחסון ולוגים), Resend (שליחת המיילים שלנו) ו-Paddle (תשלומים, כמוכרת הרשמית ולפי מדיניות הפרטיות שלה).",
          "חלקם שומרים מידע מחוץ למדינתכם, כולל בארצות הברית, לפי תנאי הגנת המידע הסטנדרטיים שלהם. אנחנו לא מוכרים או משכירים מידע אישי, ולא משתפים אותו לצורכי פרסום.",
          "ייתכן שנמסור מידע אם החוק מחייב זאת.",
        ],
      },
      {
        h: "5. עוגיות ואחסון מקומי",
        p: [
          "__session: משאירה אתכם מחוברים, עד 5 ימים. הכרחית.",
          "vibe.lang: זוכרת עברית או אנגלית, עד שנה. הכרחית.",
          "האחסון המקומי של הדפדפן שומר העדפות ממשק (כמו תפריט מקופל או הסתרת שיעורים שהסתיימו) וסימוני שלבי בנייה. הוא נשאר במכשיר שלכם.",
          "אין עוגיות אנליטיקה, פרסום או מעקב של צד שלישי, ולכן אין באנר עוגיות. Paddle מציבה עוגיות משלה בעמוד התשלום שלה.",
        ],
      },
      {
        h: "6. כמה זמן אנחנו שומרים",
        p: [
          "רישומי חשבון, התקדמות ורכישות: כל עוד החשבון קיים. בקשו מאיתנו למחוק אותו ונמחק תוך 30 יום. רישום רכישה נשמר כל עוד דיני המס והחשבונאות מחייבים.",
          "לוגים של השרת נשמרים אצל ספק האחסון לתקופה קצרה ואז נמחקים.",
        ],
      },
      {
        h: "7. הזכויות שלכם",
        p: [
          "אתם יכולים לבקש לעיין במידע שאנחנו מחזיקים עליכם, לתקן אותו, לקבל עותק או למחוק אותו, וכן להתנגד לשימוש בו או להגביל אותו. כתבו ל-support@vibetodev.com מהכתובת שאיתה אתם מתחברים; נענה תוך 30 יום.",
          "אפשר גם להגיש תלונה לרשות להגנת הפרטיות בישראל, או לרשות הפיקוח המקומית שלכם באיחוד האירופי או בבריטניה.",
        ],
      },
      {
        h: "8. אבטחה וילדים",
        p: [
          "המידע עובר ב-HTTPS, הגישה למערכות שלנו מוגבלת, וההתחברות מתבצעת דרך Google, כך שאנחנו אף פעם לא מחזיקים את הסיסמה שלכם. אין מערכת מאובטחת לחלוטין; אם דליפה תשפיע עליכם, נודיע לכם כפי שהחוק מחייב.",
          "הקורס אינו מיועד לילדים מתחת לגיל 16, ואיננו אוספים ביודעין מידע עליהם.",
        ],
      },
      {
        h: "9. שינויים",
        p: [
          "אם נשנה מה אנחנו אוספים או איך אנחנו משתמשים בו, נעדכן את הדף הזה ואת התאריך למעלה. על שינוי מהותי נודיע גם למשתמשים המחוברים.",
        ],
      },
    ],
  },
};

export default function PrivacyPage() {
  return <LegalPage text={TEXT} updated={UPDATED} />;
}
