import type { Scene } from "./types";

const browser = { id: "b", icon: "🧑‍💻", label: { en: "Browser", he: "דפדפן" } };
const server = { id: "s", icon: "🖥️", label: { en: "Server", he: "שרת" } };
const db = { id: "d", icon: "🗄️", label: { en: "Database", he: "מסד נתונים" } };

export const HTTP_SCENES: Record<string, Scene> = {
  "request-response": {
    cap: { en: "Dana logs in twice. Every request gets exactly one response", he: "דנה מתחברת פעמיים. כל בקשה מקבלת תשובה אחת בדיוק" },
    actors: [browser, server, db],
    beats: [
      {
        from: "b", to: "s", label: "POST /login",
        body: ['{ "email": "dana@acme.io",', '  "password": "hunter1" }'],
        say: { en: "Dana submits the form. Email and password travel in the request body.", he: "דנה שולחת את הטופס. המייל והסיסמה נוסעים בגוף הבקשה." },
      },
      {
        from: "s", to: "d", label: "SELECT hash FROM users WHERE email=$1",
        say: { en: "The server looks her up by email.", he: "השרת מחפש אותה לפי המייל." },
      },
      {
        from: "d", to: "s", label: "1 row", body: ["hash: $2b$12$Qx9…"],
        say: { en: "It gets back a hash. The real password is never stored.", he: "חוזר hash. הסיסמה האמיתית אף פעם לא נשמרת." },
      },
      {
        from: "s", to: "s", label: "bcrypt.compare → false", tone: "err",
        say: { en: "The server hashes what she typed and compares. No match.", he: "השרת עושה hash למה שהיא הקלידה ומשווה. אין התאמה." },
      },
      {
        from: "s", to: "b", label: "401 Unauthorized", status: 401,
        body: ['{ "error": "Wrong email or password" }'],
        say: { en: "One request, one response: 401. It does not say which of the two was wrong.", he: "בקשה אחת, תשובה אחת: 401. היא לא אומרת מה מהשניים היה שגוי." },
      },
      {
        from: "b", to: "s", label: "POST /login",
        body: ['{ "email": "dana@acme.io",', '  "password": "hunter2" }'],
        say: { en: "She tries again. This is a brand-new request. The server remembers nothing about the first.", he: "היא מנסה שוב. זו בקשה חדשה לגמרי. השרת לא זוכר כלום מהקודמת." },
      },
      {
        from: "s", to: "b", label: "200 OK", status: 200,
        body: ["Set-Cookie: session=7f3a…; HttpOnly; Secure"],
        say: { en: "Match. 200, plus a cookie. That cookie is how the next request proves who she is.", he: "התאמה. 200, ועוד cookie. ה-cookie הזה הוא הדרך של הבקשה הבאה להוכיח מי היא." },
      },
      {
        from: "b", to: "s", label: "GET /contacts", body: ["Cookie: session=7f3a…"],
        say: { en: "Every later request carries the cookie on its own. Nothing is remembered between them.", he: "כל בקשה אחר כך נושאת את ה-cookie בעצמה. שום דבר לא נזכר ביניהן." },
      },
      {
        from: "s", to: "b", label: "200 OK · 3 contacts", status: 200,
        say: { en: "Paired again: one request, one response. That is the whole rhythm of the web.", he: "שוב בזוג: בקשה אחת, תשובה אחת. זה כל הקצב של הווב." },
      },
    ],
  },

  get: {
    cap: { en: "A GET reads. Ask twice, and nothing on the server changes", he: "GET קורא. שואלים פעמיים, ובשרת שום דבר לא משתנה" },
    actors: [browser, server, db],
    beats: [
      {
        from: "b", to: "s", label: "GET /contacts?stage=lead",
        say: { en: "The filter rides in the URL. There is no body on a GET.", he: "הסינון נוסע בכתובת. ל-GET אין גוף." },
      },
      {
        from: "s", to: "d", label: "SELECT … WHERE stage='lead'",
        say: { en: "The server only reads. No INSERT, no UPDATE.", he: "השרת רק קורא. בלי INSERT, בלי UPDATE." },
      },
      {
        from: "d", to: "s", label: "12 rows",
        say: { en: "Rows come back.", he: "שורות חוזרות." },
      },
      {
        from: "s", to: "b", label: "200 OK", status: 200, body: ["Cache-Control: max-age=30", "[ {…}, {…}, … 12 ]"],
        say: { en: "200 with the list. Because nothing changed, the browser is allowed to cache it.", he: "200 עם הרשימה. כיוון ששום דבר לא השתנה, הדפדפן רשאי לשמור אותה בקאש." },
      },
      {
        from: "b", to: "s", label: "GET /contacts?stage=lead",
        say: { en: "Refresh sends the same GET again. Safe, because a GET changes nothing.", he: "רענון שולח שוב את אותו GET. זה בטוח, כי GET לא משנה כלום." },
      },
      {
        from: "s", to: "b", label: "200 OK · same 12", status: 200,
        say: { en: "Same answer. A GET that deleted something would delete it on every refresh.", he: "אותה תשובה. GET שמוחק משהו היה מוחק אותו בכל רענון." },
      },
    ],
  },

  "post-put-patch-delete": {
    cap: { en: "Four verbs that change things. The status says whether it stuck", he: "ארבעה פעלים שמשנים דברים. הסטטוס אומר אם זה נקלט" },
    actors: [browser, server, db],
    beats: [
      {
        from: "b", to: "s", label: "POST /contacts", body: ['{ "name": "" }'],
        say: { en: "Create a contact, but the name is empty.", he: "יוצרים איש קשר, אבל השם ריק." },
      },
      {
        from: "s", to: "b", label: "400 Bad Request", status: 400, body: ['{ "name": "required" }'],
        say: { en: "The server refuses before touching the database. 400 means: your request is wrong.", he: "השרת מסרב עוד לפני שהוא נוגע במסד. 400 אומר: הבקשה שלכם שגויה." },
      },
      {
        from: "b", to: "s", label: "POST /contacts", body: ['{ "name": "Noa Levi" }'],
        say: { en: "Fixed and sent again.", he: "תוקן ונשלח שוב." },
      },
      {
        from: "s", to: "d", label: "INSERT INTO contacts …",
        say: { en: "Now a row is written.", he: "עכשיו נכתבת שורה." },
      },
      {
        from: "s", to: "b", label: "201 Created", status: 201, body: ["Location: /contacts/42"],
        say: { en: "201, and where the new thing lives.", he: "201, ואיפה הדבר החדש נמצא." },
      },
      {
        from: "b", to: "s", label: "PATCH /contacts/42", body: ['{ "stage": "won" }'],
        say: { en: "PATCH changes one field. PUT would replace the whole contact.", he: "PATCH משנה שדה אחד. PUT היה מחליף את כל איש הקשר." },
      },
      {
        from: "s", to: "b", label: "200 OK", status: 200,
        say: { en: "Changed.", he: "השתנה." },
      },
      {
        from: "b", to: "s", label: "DELETE /contacts/99",
        say: { en: "Delete a contact that does not exist.", he: "מוחקים איש קשר שלא קיים." },
      },
      {
        from: "s", to: "b", label: "404 Not Found", status: 404,
        say: { en: "404: nothing there. A good API says so instead of pretending it worked.", he: "404: אין שם כלום. API טוב אומר את זה במקום להעמיד פנים שזה עבד." },
      },
    ],
  },

  "status-codes": {
    cap: { en: "Same endpoint, five answers. The first digit tells you whose fault it is", he: "אותו endpoint, חמש תשובות. הספרה הראשונה אומרת של מי האשמה" },
    actors: [browser, server],
    beats: [
      {
        from: "b", to: "s", label: "GET /contacts/42",
        say: { en: "Ask for contact 42, not logged in.", he: "מבקשים את איש קשר 42, בלי להיות מחוברים." },
      },
      {
        from: "s", to: "b", label: "401 Unauthorized", status: 401,
        say: { en: "401: I don't know who you are. Log in first.", he: "401: אני לא יודע מי אתם. תתחברו קודם." },
      },
      {
        from: "b", to: "s", label: "GET /contacts/42", body: ["Cookie: session=… (user: Omer)"],
        say: { en: "Now logged in, but as Omer, and 42 belongs to Dana.", he: "עכשיו מחוברים, אבל בתור עומר, ו-42 שייך לדנה." },
      },
      {
        from: "s", to: "b", label: "403 Forbidden", status: 403,
        say: { en: "403: I know who you are, and you may not see this.", he: "403: אני יודע מי אתם, ואסור לכם לראות את זה." },
      },
      {
        from: "b", to: "s", label: "GET /contacts/42", body: ["Cookie: session=… (user: Dana)"],
        say: { en: "Dana asks during a database outage.", he: "דנה שואלת בזמן שהמסד נפל." },
      },
      {
        from: "s", to: "b", label: "500 Internal Server Error", status: 500,
        say: { en: "5xx: the server broke. Not the user's fault, and retrying later may work.", he: "5xx: השרת נשבר. זו לא אשמת המשתמשת, וניסיון מאוחר יותר אולי יעבוד." },
      },
      {
        from: "b", to: "s", label: "GET /contacts/42",
        say: { en: "A minute later.", he: "דקה אחר כך." },
      },
      {
        from: "s", to: "b", label: "200 OK", status: 200,
        say: { en: "2xx it worked, 4xx you sent something wrong, 5xx we broke.", he: "2xx זה עבד, 4xx שלחתם משהו שגוי, 5xx אנחנו שברנו." },
      },
    ],
  },

  headers: {
    cap: { en: "The body is the letter. Headers are what is written on the envelope", he: "הגוף הוא המכתב. ה-headers הם מה שכתוב על המעטפה" },
    actors: [browser, server],
    beats: [
      {
        from: "b", to: "s", label: "POST /contacts",
        body: ["Content-Type: text/plain", "", "name=Noa"],
        say: { en: "The body is fine, but the envelope says it is plain text.", he: "הגוף תקין, אבל על המעטפה כתוב שזה טקסט רגיל." },
      },
      {
        from: "s", to: "b", label: "415 Unsupported Media Type", status: 415,
        say: { en: "The server reads the envelope first and refuses.", he: "השרת קורא קודם את המעטפה ומסרב." },
      },
      {
        from: "b", to: "s", label: "POST /contacts",
        body: ["Content-Type: application/json", "Authorization: Bearer eyJhbGc…", "", '{ "name": "Noa" }'],
        say: { en: "Right type, plus who is asking. None of this is in the body.", he: "הסוג הנכון, ועוד מי שואל. שום דבר מזה לא נמצא בגוף." },
      },
      {
        from: "s", to: "b", label: "201 Created", status: 201,
        body: ["Content-Type: application/json", "X-Request-Id: a1b2c3", "Cache-Control: no-store"],
        say: { en: "The response has its own envelope: what it is, an id for the logs, and whether to cache it.", he: "לתשובה יש מעטפה משלה: מה זה, מזהה ללוגים, והאם לשמור בקאש." },
      },
    ],
  },

  webhook: {
    cap: { en: "Backwards: the payment company calls you, and you have to answer fast", he: "הפוך: חברת התשלומים קוראת לכם, ואתם צריכים לענות מהר" },
    actors: [
      { id: "p", icon: "💳", label: { en: "Stripe", he: "Stripe" } },
      server,
      db,
    ],
    beats: [
      {
        from: "p", to: "s", label: "POST /webhooks/stripe",
        body: ["Stripe-Signature: t=…,v1=forged", '{ "type": "invoice.paid" }'],
        say: { en: "Someone posts a 'paid' event to your public URL. Anyone on the internet can do that.", he: "מישהו שולח אירוע 'שולם' לכתובת הציבורית שלכם. כל אחד באינטרנט יכול לעשות את זה." },
      },
      {
        from: "s", to: "s", label: "verify signature → ✗", tone: "err",
        say: { en: "The signature does not match your webhook secret.", he: "החתימה לא תואמת לסוד ה-webhook שלכם." },
      },
      {
        from: "s", to: "p", label: "400 Bad Request", status: 400,
        say: { en: "Rejected. Nothing was marked as paid.", he: "נדחה. שום דבר לא סומן כשולם." },
      },
      {
        from: "p", to: "s", label: "POST /webhooks/stripe",
        body: ["Stripe-Signature: t=…,v1=9f2c…", '{ "id": "evt_31", "type": "invoice.paid" }'],
        say: { en: "The real event arrives, correctly signed.", he: "האירוע האמיתי מגיע, חתום כמו שצריך." },
      },
      {
        from: "s", to: "d", label: "INSERT event evt_31 (once)",
        say: { en: "Store the event id first, so a duplicate delivery is ignored.", he: "שומרים קודם את מזהה האירוע, כדי שמשלוח כפול ייזרק." },
      },
      {
        from: "s", to: "p", label: "200 OK", status: 200,
        say: { en: "Answer 200 fast. The slow work, like emails, happens after.", he: "עונים 200 מהר. העבודה האיטית, כמו מיילים, קורית אחר כך." },
      },
      {
        from: "p", to: "s", label: "POST /webhooks/stripe", body: ['{ "id": "evt_31" }  ← retry'],
        say: { en: "Stripe retries anyway. It will, sooner or later.", he: "Stripe שולח שוב בכל זאת. זה יקרה, במוקדם או במאוחר." },
      },
      {
        from: "s", to: "p", label: "200 OK · already handled", status: 200,
        say: { en: "Same event id, so nothing happens twice. The customer is charged once.", he: "אותו מזהה אירוע, אז שום דבר לא קורה פעמיים. הלקוח מחויב פעם אחת." },
      },
    ],
  },
};
