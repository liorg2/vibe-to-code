import type { Scene } from "./types";

const browser = { id: "b", icon: "🧑‍💻", label: { en: "Browser", he: "דפדפן" } };
const server = { id: "s", icon: "🖥️", label: { en: "Server", he: "שרת" } };
const db = { id: "d", icon: "🗄️", label: { en: "Database", he: "מסד נתונים" } };

export const HTTP_SCENES: Record<string, Scene> = {
  "request-response": {
    cap: { en: "Dana signs in twice, and every message she sends gets exactly one reply", he: "דנה מתחברת פעמיים, וכל הודעה שהיא שולחת מקבלת תשובה אחת בדיוק" },
    actors: [browser, server, db],
    beats: [
      {
        from: "b", to: "s", label: "POST /login",
        body: ["email: dana@acme.io", "password: ••••••"],
        say: { en: "Dana fills in the sign-in form and hits send. Her email and password go to the server.", he: "דנה ממלאת את טופס ההתחברות ושולחת. המייל והסיסמה שלה נשלחים לשרת." },
      },
      {
        from: "s", to: "d", label: "find Dana by email",
        say: { en: "The server asks the database: do we know this email?", he: "השרת שואל את מסד הנתונים: אנחנו מכירים את המייל הזה?" },
      },
      {
        from: "d", to: "s", label: "Dana's scrambled password",
        say: { en: "Yes. It sends back a scrambled copy of her password. The real one is never saved.", he: "כן. חוזר עותק מעורבל של הסיסמה שלה. הסיסמה האמיתית אף פעם לא נשמרת." },
      },
      {
        from: "s", to: "s", label: "check the password → wrong", tone: "err",
        say: { en: "The server scrambles what she typed the same way and compares. They don't match.", he: "השרת מערבל באותה דרך את מה שהיא הקלידה ומשווה. אין התאמה." },
      },
      {
        from: "s", to: "b", label: "401 Unauthorized", status: 401,
        body: ["Wrong email or password"],
        say: { en: "One message, one reply: 401, meaning \"I can't let you in\". It doesn't say which part was wrong.", he: "הודעה אחת, תשובה אחת: 401, כלומר \"אני לא יכול להכניס אתכם\". היא לא אומרת מה בדיוק היה שגוי." },
      },
      {
        from: "b", to: "s", label: "POST /login",
        body: ["email: dana@acme.io", "password: ••••••"],
        say: { en: "She tries again. To the server this is a brand-new message. It remembers nothing of the first.", he: "היא מנסה שוב. בשביל השרת זו הודעה חדשה לגמרי. הוא לא זוכר כלום מהקודמת." },
      },
      {
        from: "s", to: "b", label: "200 OK", status: 200,
        body: ["here's your cookie: session 7f3a…"],
        say: { en: "It matches: 200 means OK. She also gets a cookie, like a festival wristband that proves she already got in.", he: "יש התאמה: 200 אומר שהכול בסדר. היא גם מקבלת cookie, כמו צמיד בפסטיבל שמוכיח שהיא כבר עברה בכניסה." },
      },
      {
        from: "b", to: "s", label: "GET /contacts", body: ["cookie: session 7f3a…"],
        say: { en: "From now on the browser shows the wristband with every message, so she doesn't sign in again.", he: "מעכשיו הדפדפן מציג את הצמיד בכל הודעה, כך שהיא לא צריכה להתחבר שוב." },
      },
      {
        from: "s", to: "b", label: "200 OK · 3 contacts", status: 200,
        say: { en: "One message, one reply again. That back-and-forth is how the whole web works.", he: "שוב הודעה אחת, תשובה אחת. ככה עובד כל האינטרנט: הלוך ושוב." },
      },
    ],
  },

  get: {
    cap: { en: "A GET only reads, so asking twice changes nothing", he: "GET רק קורא, אז לשאול פעמיים לא משנה כלום" },
    actors: [browser, server, db],
    beats: [
      {
        from: "b", to: "s", label: "GET /contacts?stage=lead",
        say: { en: "Show me only my leads. The filter is written right in the web address.", he: "תראו לי רק את הלידים. הסינון כתוב ישר בכתובת." },
      },
      {
        from: "s", to: "d", label: "look up the leads",
        say: { en: "The server only reads from the database. It adds, changes and deletes nothing.", he: "השרת רק קורא ממסד הנתונים. הוא לא מוסיף, לא משנה ולא מוחק כלום." },
      },
      {
        from: "d", to: "s", label: "12 leads",
        say: { en: "Twelve leads come back.", he: "חוזרים 12 לידים." },
      },
      {
        from: "s", to: "b", label: "200 OK", status: 200, body: ["12 contacts", "ok to keep for 30 seconds"],
        say: { en: "Here is the list. Since reading changes nothing, the browser may keep a copy for a bit (a cache).", he: "הנה הרשימה. כיוון שקריאה לא משנה כלום, הדפדפן רשאי לשמור עותק לזמן קצר (cache)." },
      },
      {
        from: "b", to: "s", label: "GET /contacts?stage=lead",
        say: { en: "Hitting refresh asks the same thing again. That's safe, because a GET changes nothing.", he: "לחיצה על רענון שואלת שוב את אותו דבר. זה בטוח, כי GET לא משנה כלום." },
      },
      {
        from: "s", to: "b", label: "200 OK · same 12", status: 200,
        say: { en: "Same answer. If a GET deleted something, every refresh would delete it again.", he: "אותה תשובה. אם GET היה מוחק משהו, כל רענון היה מוחק שוב." },
      },
    ],
  },

  "status-codes": {
    cap: { en: "One page, five replies, and the first digit tells you whose fault it is", he: "אותו עמוד, חמש תשובות, והספרה הראשונה אומרת של מי האשמה" },
    actors: [browser, server],
    beats: [
      {
        from: "b", to: "s", label: "GET /contacts/42",
        say: { en: "Ask for contact 42 without being signed in.", he: "מבקשים את איש קשר 42 בלי להיות מחוברים." },
      },
      {
        from: "s", to: "b", label: "401 Unauthorized", status: 401,
        say: { en: "401: I don't know who you are. Sign in first.", he: "401: אני לא יודע מי אתם. תתחברו קודם." },
      },
      {
        from: "b", to: "s", label: "GET /contacts/42", body: ["signed in as Omer"],
        say: { en: "Now signed in, but as Omer, and contact 42 belongs to Dana.", he: "עכשיו מחוברים, אבל בתור עומר, ואיש קשר 42 שייך לדנה." },
      },
      {
        from: "s", to: "b", label: "403 Forbidden", status: 403,
        say: { en: "403: I know who you are, and you're not allowed to see this.", he: "403: אני יודע מי אתם, ואסור לכם לראות את זה." },
      },
      {
        from: "b", to: "s", label: "GET /contacts/42", body: ["signed in as Dana"],
        say: { en: "Dana asks, but the database is down right now.", he: "דנה מבקשת, אבל מסד הנתונים נפל כרגע." },
      },
      {
        from: "s", to: "b", label: "500 Internal Server Error", status: 500,
        say: { en: "5xx: the server broke. Not Dana's fault, and trying again later may work.", he: "5xx: השרת נשבר. זו לא אשמתה של דנה, ואולי ניסיון מאוחר יותר יעבוד." },
      },
      {
        from: "b", to: "s", label: "GET /contacts/42",
        say: { en: "A minute later.", he: "דקה אחר כך." },
      },
      {
        from: "s", to: "b", label: "200 OK", status: 200,
        say: { en: "2xx it worked, 4xx you sent something wrong, 5xx we broke something.", he: "2xx זה עבד, 4xx שלחתם משהו שגוי, 5xx אנחנו שברנו משהו." },
      },
    ],
  },

  headers: {
    cap: { en: "The body is the letter, and headers are the writing on the envelope", he: "הגוף הוא המכתב, וה-headers הם מה שכתוב על המעטפה" },
    actors: [browser, server],
    beats: [
      {
        from: "b", to: "s", label: "POST /contacts",
        body: ["envelope: plain text", "", "letter: name=Noa"],
        say: { en: "The letter is fine, but the envelope says it's plain text, not the format the server expects.", he: "המכתב תקין, אבל על המעטפה כתוב שזה טקסט רגיל, לא הפורמט שהשרת מצפה לו." },
      },
      {
        from: "s", to: "b", label: "415 Unsupported Media Type", status: 415,
        say: { en: "The server reads the envelope first and refuses without opening it.", he: "השרת קורא קודם את המעטפה ומסרב בלי לפתוח אותה." },
      },
      {
        from: "b", to: "s", label: "POST /contacts",
        body: ["envelope: JSON", "envelope: sent by Dana (token)", "", "letter: name=Noa"],
        say: { en: "Right format this time, plus who is sending it. None of that is in the letter itself.", he: "הפעם הפורמט נכון, ועוד מי שולח. שום דבר מזה לא נמצא במכתב עצמו." },
      },
      {
        from: "s", to: "b", label: "201 Created", status: 201,
        body: ["envelope: JSON", "envelope: tracking no. a1b2c3", "envelope: don't keep a copy"],
        say: { en: "The reply has its own envelope: what's inside, a tracking number for the logs, and whether to keep a copy.", he: "לתשובה יש מעטפה משלה: מה יש בפנים, מספר מעקב ללוגים, והאם לשמור עותק." },
      },
    ],
  },

  webhook: {
    cap: { en: "The other way around: the payment company calls you, and you must answer fast", he: "הפוך: חברת התשלומים פונה אליכם, ואתם צריכים לענות מהר" },
    actors: [
      { id: "p", icon: "💳", label: { en: "Stripe", he: "Stripe" } },
      server,
      db,
    ],
    beats: [
      {
        from: "p", to: "s", label: "POST /webhooks/stripe",
        body: ["signature: fake", "event: invoice paid"],
        say: { en: "Someone sends 'invoice paid' to your public address. Anyone on the internet can do that.", he: "מישהו שולח 'החשבונית שולמה' לכתובת הציבורית שלכם. כל אחד באינטרנט יכול לעשות את זה." },
      },
      {
        from: "s", to: "s", label: "check the signature → fake", tone: "err",
        say: { en: "The signature doesn't match the secret only you and Stripe know. It's a fake.", he: "החתימה לא תואמת לסוד שרק אתם ו-Stripe מכירים. זה זיוף." },
      },
      {
        from: "s", to: "p", label: "400 Bad Request", status: 400,
        say: { en: "Rejected. Nothing was marked as paid.", he: "נדחה. שום דבר לא סומן כשולם." },
      },
      {
        from: "p", to: "s", label: "POST /webhooks/stripe",
        body: ["signature: real", "event #31: invoice paid"],
        say: { en: "The real message arrives, properly signed.", he: "ההודעה האמיתית מגיעה, חתומה כמו שצריך." },
      },
      {
        from: "s", to: "d", label: "note event #31 as handled",
        say: { en: "First write down the event number, so if it arrives twice the second one is ignored.", he: "קודם רושמים את מספר האירוע, כדי שאם הוא יגיע פעמיים, הפעם השנייה תידלג." },
      },
      {
        from: "s", to: "p", label: "200 OK", status: 200,
        say: { en: "Answer 200 fast. Slow work, like sending emails, happens afterwards.", he: "עונים 200 מהר. עבודה איטית, כמו שליחת מיילים, קורית אחר כך." },
      },
      {
        from: "p", to: "s", label: "POST /webhooks/stripe", body: ["event #31 again (retry)"],
        say: { en: "Stripe sends it again anyway. Sooner or later, it always does.", he: "Stripe שולח שוב בכל זאת. במוקדם או במאוחר, זה תמיד קורה." },
      },
      {
        from: "s", to: "p", label: "200 OK · already handled", status: 200,
        say: { en: "Same event number, so nothing happens twice. The customer is charged once.", he: "אותו מספר אירוע, אז שום דבר לא קורה פעמיים. הלקוח מחויב פעם אחת." },
      },
    ],
  },
};
