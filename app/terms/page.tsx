import { LegalPage, type LegalText } from "@/components/LegalPage";
import type { Lang } from "@/lib/types";

export const metadata = { title: "Terms" };

const UPDATED = "2026-09-23";
// TODO(owner): confirm support@vibetodev.com receives mail, the 14-day refund window and Tel Aviv jurisdiction.

const TEXT: Record<Lang, LegalText> = {
  en: {
    title: "Terms of use",
    lede: "Short version: this is an educational course. The tools, clouds and AI services you use while following it are yours, and so are their bills.",
    s: [
      {
        h: "1. What this is",
        p: [
          "Vibe → Code (vibetodev.com) is an online course that explains how software is built and walks you through building an app with AI coding tools. Using the site or buying a course means you accept these terms. How we handle your data is in the privacy policy (/privacy).",
          "The content is educational only. It is not professional, legal, security, financial or tax advice, and following it does not make an app production-ready, secure or compliant.",
        ],
      },
      {
        h: "2. Third-party services and their costs",
        p: [
          "Lessons and the build track use services we do not own or run, for example AI coding assistants and LLM APIs (such as Anthropic, OpenAI or Google), hosting (such as Vercel), databases (such as Neon, Supabase or Firebase), GitHub, domains and payment providers. You open those accounts yourself, under their terms and prices.",
          "You alone are responsible for every charge they make: AI tokens and subscription usage, compute, storage, bandwidth, databases, domains, and anything else billed to your accounts, including charges from resources you forgot to shut down, projects left running, runaway loops, prompts that used more tokens than expected, free tiers that ended, or price changes.",
          "Our prompts, estimates and \"free tier\" notes are guidance, not a promise of cost. Before you start: set spending limits and billing alerts where the provider offers them, check your usage, and delete or pause what you no longer need. If you are unsure what something will cost, stop and check the provider's pricing first.",
        ],
      },
      {
        h: "3. Your accounts, keys and data",
        p: [
          "Keep your API keys, passwords and tokens secret. Don't paste them into prompts, public repos or screenshots. We will never ask for them. If a key leaks, revoke it at the provider straight away. We are not responsible for misuse of your credentials or for charges that follow.",
          "AI tools can write wrong, insecure or destructive code, and can delete files or data. Review what they do, keep backups and use version control. What you build, deploy and store, and whether it follows the law and the providers' rules, is your responsibility.",
        ],
      },
      {
        h: "4. No warranty",
        p: [
          "The course and the site are provided \"as is\" and \"as available\", without warranties of any kind. Tools and services change fast; screenshots, prompts and steps may be out of date. We don't guarantee any result, job or income.",
        ],
      },
      {
        h: "5. Limitation of liability",
        p: [
          "To the fullest extent the law allows, we are not liable for any indirect, incidental or consequential loss, lost data, lost profit, or any cost charged by a third-party service, whether or not you followed the course. Our total liability for anything related to the course is limited to the amount you paid us for it.",
          "Nothing here limits rights you have that the law says cannot be limited.",
        ],
      },
      {
        h: "6. Purchases and refunds",
        p: [
          "Payments are processed by Paddle.com, which acts as the merchant of record and handles billing, tax and invoices. Paddle's buyer terms also apply to your purchase.",
          "A course is a one-time payment for personal access; it's not a subscription. If it isn't right for you, ask for a refund within 14 days of purchase and we'll refund it. We may refuse refunds that look abusive, such as repeated buy-and-refund.",
        ],
      },
      {
        h: "7. Using the content",
        p: [
          "Your access is personal. Don't share your account or republish, resell or bulk-copy the lessons and prompts. The code you build with them is yours.",
          "We may update the course, suspend accounts that break these terms, or change these terms; the date above shows the latest version.",
        ],
      },
      {
        h: "8. Law and contact",
        p: [
          "These terms are governed by the laws of the State of Israel, and the courts of Tel Aviv have jurisdiction.",
          "Questions or refund requests: support@vibetodev.com.",
        ],
      },
    ],
  },
  he: {
    title: "תנאי שימוש",
    lede: "בקצרה: זה קורס לימודי. הכלים, שירותי הענן וה-AI שבהם תשתמשו במהלכו שייכים לכם, וכך גם החשבונות שלהם.",
    s: [
      {
        h: "1. מה זה",
        p: [
          "Vibe → Code (vibetodev.com) הוא קורס מקוון שמסביר איך בונים תוכנה ומלווה אתכם בבניית אפליקציה בעזרת כלי AI לכתיבת קוד. שימוש באתר או רכישת קורס מהווים הסכמה לתנאים אלה. הטיפול במידע שלכם מתואר במדיניות הפרטיות (/privacy).",
          "התוכן נועד ללימוד בלבד. אין בו ייעוץ מקצועי, משפטי, אבטחתי, פיננסי או מיסויי, ומעבר עליו אינו הופך אפליקציה למוכנה לייצור, מאובטחת או עומדת בדרישות.",
        ],
      },
      {
        h: "2. שירותי צד שלישי והעלויות שלהם",
        p: [
          "השיעורים ומסלול הבנייה משתמשים בשירותים שאינם בבעלותנו, למשל עוזרי קוד ו-API של מודלי שפה (כמו Anthropic, OpenAI או Google), אחסון (כמו Vercel), מסדי נתונים (כמו Neon, Supabase או Firebase), GitHub, דומיינים וספקי תשלום. אתם פותחים את החשבונות האלה בעצמכם, לפי התנאים והמחירים שלהם.",
          "האחריות לכל חיוב שלהם היא שלכם בלבד: טוקנים ושימוש במנויי AI, מחשוב, אחסון, תעבורה, מסדי נתונים, דומיינים וכל דבר אחר שמחויב בחשבונותיכם, כולל חיובים ממשאבים ששכחתם לכבות, פרויקטים שנשארו פעילים, לולאות שרצו ללא שליטה, פרומפטים שצרכו יותר טוקנים מהצפוי, מסלולים חינמיים שהסתיימו או שינויי מחיר.",
          "הפרומפטים, ההערכות וההערות על \"מסלול חינמי\" הם הכוונה בלבד ולא התחייבות לעלות. לפני שמתחילים: הגדירו תקרת הוצאה והתראות חיוב היכן שהספק מאפשר, בדקו את השימוש, ומחקו או השהו את מה שכבר לא צריך. אם אינכם בטוחים כמה משהו יעלה, עצרו ובדקו קודם את המחירון של הספק.",
        ],
      },
      {
        h: "3. החשבונות, המפתחות והמידע שלכם",
        p: [
          "שמרו את מפתחות ה-API, הסיסמאות והטוקנים בסוד. אל תדביקו אותם בפרומפטים, במאגרים ציבוריים או בצילומי מסך. לעולם לא נבקש אותם מכם. אם מפתח דלף, בטלו אותו מיד אצל הספק. איננו אחראים לשימוש לרעה בפרטי הגישה שלכם או לחיובים שנובעים ממנו.",
          "כלי AI עלולים לכתוב קוד שגוי, לא מאובטח או הרסני, ולמחוק קבצים או מידע. בדקו מה הם עושים, שמרו גיבויים והשתמשו בניהול גרסאות. מה שאתם בונים, מעלים ושומרים, והאם הוא עומד בחוק ובכללי הספקים, באחריותכם.",
        ],
      },
      {
        h: "4. ללא אחריות",
        p: [
          "הקורס והאתר מסופקים \"כמות שהם\" (AS IS) וכפי שהם זמינים, ללא אחריות מכל סוג. כלים ושירותים משתנים מהר; צילומי מסך, פרומפטים ושלבים עשויים להתיישן. איננו מבטיחים תוצאה, עבודה או הכנסה כלשהי.",
        ],
      },
      {
        h: "5. הגבלת אחריות",
        p: [
          "במידה המרבית שהחוק מתיר, איננו אחראים לנזק עקיף, נלווה או תוצאתי, לאובדן מידע או רווח, או לכל עלות שחויבה על ידי שירות צד שלישי, בין אם פעלתם לפי הקורס ובין אם לא. האחריות הכוללת שלנו בכל הקשור לקורס מוגבלת לסכום ששילמתם לנו עבורו.",
          "אין באמור כדי לגרוע מזכויות שהחוק קובע שלא ניתן להגבילן.",
        ],
      },
      {
        h: "6. רכישות והחזרים",
        p: [
          "התשלומים מעובדים על ידי Paddle.com, המשמשת כמוכרת הרשמית (Merchant of Record) ומטפלת בחיוב, במס ובחשבוניות. גם תנאי הקונה של Paddle חלים על הרכישה.",
          "קורס הוא תשלום חד-פעמי לגישה אישית, לא מנוי. אם הוא לא מתאים לכם, בקשו החזר תוך 14 ימים מהרכישה ונחזיר את הכסף. אנו רשאים לסרב להחזרים שנראים כניצול לרעה, כמו קנייה והחזר חוזרים.",
        ],
      },
      {
        h: "7. שימוש בתוכן",
        p: [
          "הגישה שלכם אישית. אין לשתף את החשבון או לפרסם מחדש, למכור או להעתיק בהיקף את השיעורים והפרומפטים. הקוד שאתם בונים בעזרתם שייך לכם.",
          "אנו רשאים לעדכן את הקורס, להשעות חשבונות שמפרים תנאים אלה או לשנות את התנאים; התאריך למעלה מציין את הגרסה העדכנית.",
        ],
      },
      {
        h: "8. דין ויצירת קשר",
        p: [
          "על תנאים אלה חלים דיני מדינת ישראל, וסמכות השיפוט נתונה לבתי המשפט בתל אביב.",
          "שאלות או בקשות החזר: support@vibetodev.com.",
        ],
      },
    ],
  },
};

export default function TermsPage() {
  return <LegalPage text={TEXT} updated={UPDATED} />;
}
