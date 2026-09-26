import type { Scene } from "./types";

const browser = { id: "b", icon: "🧑‍💻", label: { en: "Browser", he: "דפדפן" } };
const server = { id: "s", icon: "🖥️", label: { en: "Server", he: "שרת" } };
const db = { id: "d", icon: "🗄️", label: { en: "Database", he: "מסד נתונים" } };
const eve = { id: "e", icon: "🦹", label: { en: "Eve (attacker)", he: "איב (תוקפת)" } };
const you = { id: "y", icon: "👩‍💻", label: { en: "You", he: "אתם" } };
const github = { id: "g", icon: "🐙", label: { en: "GitHub", he: "GitHub" } };
const vercel = { id: "h", icon: "☁️", label: { en: "Vercel", he: "Vercel" } };

export const SECURE_SCENES: Record<string, Scene> = {
  "session-and-cookie": {
    cap: { en: "A copied cookie lets Eve in as Dana, until logging out ends the session on the server", he: "cookie מועתק מכניס את איב בתור דנה, עד שההתנתקות סוגרת את הסשן בשרת" },
    actors: [eve, browser, server, db],
    beats: [
      {
        from: "s", to: "d", label: "save the session",
        body: ["session: 9c1e…", "belongs to: Dana", "good for: 7 days"],
        say: { en: "Dana signs in. The server writes down: this session number belongs to Dana, for 7 days.", he: "דנה מתחברת. השרת רושם: מספר הסשן הזה שייך לדנה, לשבעה ימים." },
      },
      {
        from: "s", to: "b", label: "200 OK", status: 200,
        body: ["cookie: session 9c1e…", "sent only over HTTPS", "sent only from this site"],
        say: { en: "The browser gets only the session number, in a cookie. Like a festival wristband: no password, no personal data.", he: "הדפדפן מקבל רק את מספר הסשן, בתוך cookie. כמו צמיד בפסטיבל: בלי סיסמה ובלי מידע אישי." },
      },
      {
        from: "b", to: "b", label: "page scripts can't read it", tone: "info",
        say: { en: "The cookie is hidden from scripts on the page, so even a script an attacker slipped in can't grab it.", he: "ה-cookie מוסתר מסקריפטים בעמוד, אז גם סקריפט שתוקף השתיל לא יכול לקחת אותו." },
      },
      {
        from: "e", to: "s", label: "GET /contacts",
        body: ["cookie: session 9c1e…", "(copied from Dana's open laptop)"],
        say: { en: "Eve copies the cookie from Dana's unlocked laptop and uses it from her own computer.", he: "איב מעתיקה את ה-cookie מהמחשב הפתוח של דנה ומשתמשת בו מהמחשב שלה." },
      },
      {
        from: "s", to: "e", label: "200 OK · Dana's contacts", status: 200, tone: "err",
        say: { en: "The server can't tell them apart. Whoever wears the wristband is Dana, so Eve gets all of Dana's contacts.", he: "השרת לא יכול להבדיל. מי שעונד את הצמיד הוא דנה, אז איב מקבלת את כל אנשי הקשר של דנה." },
      },
      {
        from: "b", to: "s", label: "POST /logout", body: ["cookie: session 9c1e…"],
        say: { en: "Dana notices and logs out.", he: "דנה שמה לב ומתנתקת." },
      },
      {
        from: "s", to: "d", label: "delete the session",
        say: { en: "Logging out deletes the session on the server, not just the cookie in Dana's browser.", he: "ההתנתקות מוחקת את הסשן בשרת, לא רק את ה-cookie בדפדפן של דנה." },
      },
      {
        from: "e", to: "s", label: "GET /contacts", body: ["cookie: session 9c1e…"],
        say: { en: "Eve tries again with her copy.", he: "איב מנסה שוב עם העותק שלה." },
      },
      {
        from: "s", to: "e", label: "401 Unauthorized", status: 401,
        say: { en: "That session number now leads nowhere, so the copy is useless. Sessions also expire, so none lasts forever.", he: "מספר הסשן כבר לא מוביל לשום מקום, אז העותק חסר ערך. וסשנים גם פגים, אז אף אחד לא נשאר לתמיד." },
      },
    ],
  },

  oauth: {
    cap: { en: "Noa signs in with Google. Pocket CRM never sees her password", he: "נועה מתחברת עם Google. Pocket CRM אף פעם לא רואה את הסיסמה שלה" },
    actors: [
      browser,
      { id: "s", icon: "🖥️", label: { en: "Pocket CRM", he: "Pocket CRM" } },
      { id: "g", icon: "🔑", label: { en: "Google", he: "Google" } },
    ],
    beats: [
      {
        from: "b", to: "s", label: "GET /auth/google",
        say: { en: "Noa clicks Sign in with Google.", he: "נועה לוחצת על Sign in with Google." },
      },
      {
        from: "s", to: "b", label: "302 Found", status: 302,
        body: ["go to: Google sign-in", "asking for: her email only", "check code: k3f9…"],
        say: { en: "The app sends her to Google, asking only for her email, plus a random check code it will look for on the way back.", he: "האפליקציה שולחת אותה ל-Google, מבקשת רק את המייל שלה, ומצרפת קוד בדיקה אקראי שתחפש בדרך חזרה." },
      },
      {
        from: "b", to: "g", label: "GET accounts.google.com",
        body: ["come back to: http://pocketcrm.app"],
        say: { en: "The browser follows the link to Google.", he: "הדפדפן עובר ל-Google לפי ההפניה." },
      },
      {
        from: "g", to: "b", label: "400 redirect_uri_mismatch", status: 400,
        body: ["allowed: https://pocketcrm.app", "sent: http://pocketcrm.app"],
        say: { en: "Google only sends people back to the exact address you registered. http instead of https, and Google refuses.", he: "Google מחזיר אנשים רק לכתובת המדויקת שרשמתם. http במקום https, ו-Google מסרב." },
      },
      {
        from: "b", to: "g", label: "GET accounts.google.com",
        body: ["come back to: https://pocketcrm.app"],
        say: { en: "Fixed. Noa types her password on Google's page, never on yours, and approves one thing: her email.", he: "תוקן. נועה מקלידה את הסיסמה בעמוד של Google, לא אצלכם, ומאשרת דבר אחד: את המייל שלה." },
      },
      {
        from: "g", to: "b", label: "302 Found", status: 302,
        body: ["back to: pocketcrm.app", "one-time code: 4/0AX…", "check code: k3f9…"],
        say: { en: "Google sends her back with a one-time code. Not her password, and not access yet.", he: "Google מחזיר אותה עם קוד חד-פעמי. לא הסיסמה שלה, ועדיין לא גישה." },
      },
      {
        from: "b", to: "s", label: "GET /callback",
        body: ["check code k3f9… ✓ matches"],
        say: { en: "The app makes sure the check code is the one it sent, so nobody slipped their own login into Noa's.", he: "האפליקציה מוודאת שקוד הבדיקה הוא זה ששלחה, כדי שאף אחד לא ישתיל התחברות משלו אצל נועה." },
      },
      {
        from: "s", to: "g", label: "POST /token",
        body: ["one-time code: 4/0AX…", "app's secret: •••• (server only)"],
        say: { en: "Server to server, the app trades the code plus its own secret for a token. The browser never sees that secret.", he: "משרת לשרת, האפליקציה מחליפה את הקוד ועוד הסוד שלה בטוקן. הדפדפן אף פעם לא רואה את הסוד הזה." },
      },
      {
        from: "g", to: "s", label: "200 OK", status: 200,
        body: ["token: ya29…", "allowed: her email"],
        say: { en: "The token allows only what Noa approved. The app never held her password, so it can never leak it.", he: "הטוקן מאפשר רק את מה שנועה אישרה. לאפליקציה אף פעם לא הייתה הסיסמה שלה, אז היא גם לא יכולה להדליף אותה." },
      },
    ],
  },

  "https-tls": {
    cap: { en: "On café wifi, Eve can read plain HTTP. With HTTPS she sees only noise, and her fake ID fails", he: "ב-wifi של בית קפה, איב קוראת HTTP רגיל. ב-HTTPS היא רואה רק רעש, והתעודה המזויפת שלה נכשלת" },
    actors: [browser, { id: "e", icon: "🕵️", label: { en: "Eve on the wifi", he: "איב ב-wifi" } }, server],
    beats: [
      {
        from: "b", to: "s", label: "GET http://pocketcrm.app/login",
        say: { en: "Dana, on café wifi, types the address without https.", he: "דנה, ב-wifi של בית קפה, מקלידה את הכתובת בלי https." },
      },
      {
        from: "e", to: "e", label: "reading the login page…", tone: "err",
        say: { en: "Plain HTTP is a postcard. Eve, on the same wifi, can read it and even change the page that comes back.", he: "HTTP רגיל הוא גלויה. איב, באותה רשת, יכולה לקרוא אותו ואפילו לשנות את העמוד שחוזר." },
      },
      {
        from: "s", to: "b", label: "308 Permanent Redirect", status: 308,
        body: ["go to: https://pocketcrm.app", "and always use https here"],
        say: { en: "The server sends her to the https address and tells the browser: from now on, always use https for this site.", he: "השרת מפנה אותה לכתובת ה-https ואומר לדפדפן: מעכשיו, תמיד https באתר הזה." },
      },
      {
        from: "b", to: "s", label: "start a secure connection",
        say: { en: "Before sending anything real, the browser and the server set up a private, encrypted line.", he: "לפני שנשלח משהו אמיתי, הדפדפן והשרת מקימים קו פרטי ומוצפן." },
      },
      {
        from: "s", to: "b", label: "certificate: pocketcrm.app",
        body: ["signed by: Let's Encrypt", "valid until: 2026-12-20"],
        say: { en: "The server shows its ID card: a certificate for this exact name, signed by an authority the browser trusts.", he: "השרת מציג תעודה מזהה: תעודה לשם המדויק הזה, חתומה על ידי גוף שהדפדפן סומך עליו." },
      },
      {
        from: "b", to: "s", label: "POST /login (encrypted)",
        body: ["17 03 03 00 8a 9f c4 e1 07 5b …"],
        say: { en: "Now the login travels inside the encrypted line.", he: "עכשיו ההתחברות נוסעת בתוך הקו המוצפן." },
      },
      {
        from: "e", to: "e", label: "sees: 17 03 03 00 8a 9f c4 …", tone: "ok",
        say: { en: "Eve still sees the data go by, but only as noise. She can't read it or change it.", he: "איב עדיין רואה את המידע עובר, אבל רק כרעש. היא לא יכולה לקרוא או לשנות אותו." },
      },
      {
        from: "e", to: "b", label: "certificate: pocketcrm.app", tone: "err",
        body: ["signed by: Eve herself"],
        say: { en: "Next day Eve runs a fake hotspot and pretends to be pocketcrm.app, with an ID card she signed herself.", he: "למחרת איב מפעילה hotspot מזויף ומתחזה ל-pocketcrm.app, עם תעודה שהיא חתמה עליה בעצמה." },
      },
      {
        from: "b", to: "b", label: "NET::ERR_CERT_AUTHORITY_INVALID", tone: "err",
        say: { en: "No trusted signature, so the browser stops with a warning. Never let the AI switch this check off to hide an error.", he: "אין חתימה מהימנה, אז הדפדפן עוצר עם אזהרה. אל תתנו ל-AI לכבות את הבדיקה הזאת כדי להסתיר שגיאה." },
      },
    ],
  },

  "reverse-proxy": {
    cap: { en: "Every request meets a gatekeeper (the proxy) first. It can reject an upload before your app sees it", he: "כל בקשה פוגשת קודם שומר סף (הפרוקסי). הוא יכול לדחות העלאה עוד לפני שהאפליקציה רואה אותה" },
    actors: [
      browser,
      { id: "p", icon: "🚦", label: { en: "Proxy", he: "פרוקסי" } },
      { id: "a", icon: "📦", label: { en: "App", he: "אפליקציה" } },
    ],
    beats: [
      {
        from: "b", to: "p", label: "POST /api/import",
        body: ["file: contacts.csv", "size: 2.4 MB"],
        say: { en: "Dana imports a 2.4 MB contacts file. On your laptop, with no proxy in front, it always worked.", he: "דנה מייבאת קובץ אנשי קשר במשקל 2.4 MB. על הלפטופ שלכם, בלי פרוקסי מקדימה, זה תמיד עבד." },
      },
      {
        from: "p", to: "b", label: "413 Request Entity Too Large", status: 413,
        say: { en: "In production the proxy stands in front, with a 1 MB limit by default. Rejected before your app runs, so its log is empty.", he: "ב-production הפרוקסי עומד מקדימה, עם מגבלה של 1 MB כברירת מחדל. נדחה לפני שהאפליקציה רצה, אז הלוג שלה ריק." },
      },
      {
        from: "p", to: "p", label: "raise the size limit to 10 MB", tone: "info",
        say: { en: "One setting on the proxy fixes it. The bug was never in your code.", he: "הגדרה אחת בפרוקסי מתקנת את זה. הבאג אף פעם לא היה בקוד שלכם." },
      },
      {
        from: "b", to: "p", label: "POST /api/import (HTTPS)", body: ["size: 2.4 MB"],
        say: { en: "Dana tries again. The proxy accepts it, and the encryption is unwrapped here.", he: "דנה מנסה שוב. הפרוקסי מקבל את הבקשה, וההצפנה נפתחת כאן." },
      },
      {
        from: "p", to: "a", label: "POST /api/import (plain HTTP)",
        body: ["real visitor: 203.0.113.7", "came in over: https"],
        say: { en: "Inside, it passes the request on to your app, with a note on who really asked and how.", he: "בפנים הוא מעביר את הבקשה לאפליקציה שלכם, עם פתק על מי באמת שאל ואיך." },
      },
      {
        from: "a", to: "a", label: "visitor = 203.0.113.7", tone: "ok", body: ["trusts the proxy's note"],
        say: { en: "The app trusts the note. Without it every visitor looks like the proxy, and blocking one would block everyone.", he: "האפליקציה סומכת על הפתק. בלעדיו כל מבקר נראה כמו הפרוקסי, וחסימה של אחד הייתה חוסמת את כולם." },
      },
      {
        from: "a", to: "p", label: "200 OK", status: 200, body: ["imported: 4,983 · bad rows: 17"],
        say: { en: "Imported. The answer goes back to the proxy, not straight to Dana.", he: "יובא. התשובה חוזרת לפרוקסי, לא ישר לדנה." },
      },
      {
        from: "p", to: "b", label: "200 OK", status: 200,
        body: ["compressed", "encrypted again"],
        say: { en: "The proxy compresses it, encrypts it again and hands it over. Ask your agent: what sits in front of our app?", he: "הפרוקסי דוחס, מצפין מחדש ומוסר. תשאלו את הסוכן שלכם: מה עומד לפני האפליקציה שלנו?" },
      },
    ],
  },

  deploy: {
    cap: { en: "Ship one small change. When it breaks, undo it in one command", he: "שולחים שינוי קטן אחד. כשהוא נשבר, מבטלים אותו בפקודה אחת" },
    actors: [you, vercel, { id: "u", icon: "👥", label: { en: "Users", he: "משתמשים" } }],
    beats: [
      {
        from: "y", to: "h", label: "merge to main · 1 change", body: ["v42: show deal value on cards"],
        say: { en: "One small change merges to main. If something breaks, there is exactly one suspect.", he: "שינוי קטן אחד נכנס ל-main. אם משהו נשבר, יש חשוד אחד בדיוק." },
      },
      {
        from: "h", to: "h", label: "build v42 · 38s", tone: "info",
        say: { en: "The host builds v42. Meanwhile v41 keeps serving everyone, and stays ready.", he: "המארח בונה את v42. בינתיים v41 ממשיך לשרת את כולם, ונשאר מוכן." },
      },
      {
        from: "h", to: "h", label: "visitors v41 → v42", tone: "ok",
        say: { en: "Visitors switch over. Anyone in the middle of a request finishes on v41, so nobody gets cut off.", he: "המבקרים עוברים. מי שבאמצע בקשה מסיים על v41, אז אף אחד לא מנותק." },
      },
      {
        from: "u", to: "h", label: "GET /contacts",
        say: { en: "Dana opens her contacts on the new version.", he: "דנה פותחת את אנשי הקשר שלה בגרסה החדשה." },
      },
      {
        from: "h", to: "u", label: "500 Internal Server Error", status: 500,
        body: ["crash: a contact with no deal value"],
        say: { en: "Contacts with no deal value crash the page. The error count jumps within minutes.", he: "אנשי קשר בלי שווי עסקה מפילים את העמוד. מספר השגיאות קופץ תוך דקות." },
      },
      {
        from: "y", to: "h", label: "roll back to v41", body: ["v41 is already built"],
        say: { en: "Undo is one command that points visitors back at v41. Nothing to rebuild, so it takes seconds.", he: "הביטול הוא פקודה אחת שמחזירה את המבקרים ל-v41. אין מה לבנות מחדש, אז זה לוקח שניות." },
      },
      {
        from: "u", to: "h", label: "GET /contacts",
        say: { en: "Dana refreshes.", he: "דנה מרעננת." },
      },
      {
        from: "h", to: "u", label: "200 OK · v41", status: 200,
        say: { en: "Working again. Now fix v42 calmly: there is only one change to look at.", he: "עובד שוב. עכשיו מתקנים את v42 בשקט: יש רק שינוי אחד לבדוק." },
      },
    ],
  },

  "authentication-vs-authorization": {
    cap: { en: "Omer is signed in. That doesn't make Dana's contacts his", he: "עומר מחובר. זה לא הופך את אנשי הקשר של דנה לשלו" },
    actors: [browser, server, db],
    beats: [
      {
        from: "b", to: "s", label: "GET /contacts/1041",
        say: { en: "Someone asks for contact 1041 without signing in.", he: "מישהו מבקש את איש קשר 1041 בלי להתחבר." },
      },
      {
        from: "s", to: "b", label: "401 Unauthorized", status: 401,
        say: { en: "Authentication means checking who you are. Not signed in, no answer.", he: "אותנטיקציה היא לבדוק מי אתם. לא מחוברים, אין תשובה." },
      },
      {
        from: "b", to: "s", label: "GET /contacts/1041", body: ["cookie: Omer's session"],
        say: { en: "Omer signs in. His contact is 1042, so he changes the address to 1041, which is Dana's.", he: "עומר מתחבר. איש הקשר שלו הוא 1042, אז הוא משנה בכתובת ל-1041, ששייך לדנה." },
      },
      {
        from: "s", to: "d", label: "get contact 1041",
        say: { en: "The server checked that someone is signed in. It never asked whose contact this is.", he: "השרת בדק שמישהו מחובר. הוא אף פעם לא שאל של מי איש הקשר הזה." },
      },
      {
        from: "s", to: "b", label: "200 OK · Dana's contact", status: 200, tone: "err",
        body: ["name: Noa Levi", "belongs to: Dana"],
        say: { en: "Signed in, but not allowed. Just by changing the number, Omer could read every contact in the app.", he: "מחובר, אבל לא מורשה. רק בשינוי המספר, עומר יכול לקרוא כל איש קשר באפליקציה." },
      },
      {
        from: "s", to: "d", label: "get 1041 only if it's Omer's",
        say: { en: "The fix lives on the server: fetch the contact only if it belongs to the person who is signed in.", he: "התיקון יושב בשרת: שולפים את איש הקשר רק אם הוא שייך למי שמחובר." },
      },
      {
        from: "d", to: "s", label: "not found",
        say: { en: "It isn't his.", he: "הוא לא שלו." },
      },
      {
        from: "s", to: "b", label: "403 Forbidden", status: 403,
        say: { en: "Authorization means checking what you may do: we know who you are, and this isn't yours. (404 also works.)", he: "הרשאות זה לבדוק מה מותר לכם: אנחנו יודעים מי אתם, וזה לא שלכם. (גם 404 עובד.)" },
      },
    ],
  },

  "injection-and-validation": {
    cap: { en: "Eve's search text turns into a command, until the command and the text travel apart", he: "טקסט החיפוש של איב הופך לפקודה, עד שהפקודה והטקסט נוסעים בנפרד" },
    actors: [eve, server, db],
    beats: [
      {
        from: "e", to: "s", label: "GET /contacts?search=…",
        body: ["search box: ' OR '1'='1' --"],
        say: { en: "Eve types odd text into the email search box. It's written in the database's own language.", he: "איב מקלידה טקסט מוזר בתיבת החיפוש לפי מייל. הוא כתוב בשפה של מסד הנתונים." },
      },
      {
        from: "s", to: "d", label: "search, her text mixed in",
        body: ["find email '' OR '1'='1'", "→ '1 is 1' is always true"],
        say: { en: "The code pasted her text straight into its command to the database. Now it says: find everyone, since 1 is always 1.", he: "הקוד הדביק את הטקסט שלה ישר לתוך הפקודה למסד. עכשיו היא אומרת: תמצא את כולם, כי 1 תמיד שווה 1." },
      },
      {
        from: "d", to: "s", label: "5,000 contacts", tone: "err",
        say: { en: "The database can't tell your words from hers. It returns every contact.", he: "המסד לא יכול להבדיל בין המילים שלכם לשלה. הוא מחזיר את כל אנשי הקשר." },
      },
      {
        from: "s", to: "e", label: "200 OK · all 5,000 contacts", status: 200, tone: "err",
        say: { en: "No hacking tools needed. Just characters in a text box.", he: "בלי כלי פריצה. רק תווים בתיבת טקסט." },
      },
      {
        from: "e", to: "s", label: "GET /contacts?search=…",
        say: { en: "The same input, after the fix.", he: "אותו קלט, אחרי התיקון." },
      },
      {
        from: "s", to: "d", label: "search, her text kept apart",
        body: ["command: find this email", "email: ' OR '1'='1' --"],
        say: { en: "Now the command and her text travel separately. Her text can only be something to search for, never a command.", he: "עכשיו הפקודה והטקסט שלה נוסעים בנפרד. הטקסט שלה יכול להיות רק משהו לחפש, אף פעם לא פקודה." },
      },
      {
        from: "d", to: "s", label: "0 contacts", tone: "ok",
        say: { en: "Nobody has that odd email address. Nothing found.", he: "לאף אחד אין כתובת מייל מוזרה כזאת. לא נמצא כלום." },
      },
      {
        from: "e", to: "s", label: "POST /contacts", body: ["name: Noa", "stage: boss"],
        say: { en: "Eve skips the form and sends straight to the API, so the checks in the browser never run.", he: "איב מדלגת על הטופס ושולחת ישר ל-API, אז הבדיקות בדפדפן לא רצות בכלל." },
      },
      {
        from: "s", to: "e", label: "400 Bad Request", status: 400,
        body: ["stage must be: lead, qualified,", "won or lost"],
        say: { en: "The server checks every field against the allowed values the moment it arrives, and says no. Never trust the browser alone.", he: "השרת בודק כל שדה מול הערכים המותרים ברגע שהוא מגיע, ודוחה. אף פעם לא סומכים רק על הדפדפן." },
      },
    ],
  },

  "xss-and-csrf": {
    cap: { en: "XSS runs Eve's script on your page. CSRF makes Dana's browser act for Eve's page", he: "ב-XSS הסקריפט של איב רץ בעמוד שלכם. ב-CSRF העמוד של איב מפעיל את הדפדפן של דנה" },
    actors: [eve, browser, server],
    beats: [
      {
        from: "e", to: "s", label: "POST /api/leads", body: ["name: <script>steal()</script>"],
        say: { en: "XSS, attack one. Eve fills in Pocket CRM's public demo form, and her 'name' is a small hidden program.", he: "XSS, התקפה ראשונה. איב ממלאת את טופס הדמו הציבורי של Pocket CRM, וה'שם' שלה הוא תוכנה קטנה ומוסתרת." },
      },
      {
        from: "s", to: "b", label: "200 OK · name as live code", status: 200, tone: "err",
        body: ["the page runs: steal()"],
        say: { en: "Dana opens her leads. The name went in as page code, so Eve's script runs in Dana's page, as Dana.", he: "דנה פותחת את הלידים שלה. השם נכנס כקוד של העמוד, אז הסקריפט של איב רץ בעמוד של דנה, בתור דנה." },
      },
      {
        from: "s", to: "b", label: "200 OK · name as plain text", status: 200,
        body: ["shown as text: <script>steal()…", "+ only our own scripts may run"],
        say: { en: "Fixed: shown as text, it's just odd characters. A second rule, only the site's own scripts may run, backs it up.", he: "תוקן: כטקסט אלה סתם תווים מוזרים. כלל נוסף, רק הסקריפטים של האתר עצמו רצים, מגבה את זה." },
      },
      {
        from: "e", to: "b", label: "hidden form, sends itself",
        body: ["aimed at: pocketcrm.app", "action: delete contact 42"],
        say: { en: "CSRF, attack two. In another tab Dana opens Eve's meme page. It hides a form aimed at Pocket CRM that sends itself.", he: "CSRF, התקפה שנייה. בטאב אחר דנה פותחת את עמוד הממים של איב. מוסתר בו טופס שמכוון ל-Pocket CRM ונשלח מעצמו." },
      },
      {
        from: "b", to: "s", label: "POST /contacts/42/delete",
        body: ["from: eve.example", "cookie: Dana's (sent anyway)"],
        say: { en: "Dana's browser sends it and attaches her cookie on its own. None of Eve's code touches your site.", he: "הדפדפן של דנה שולח את הבקשה ומצרף את ה-cookie שלה מעצמו. שום קוד של איב לא נוגע באתר שלכם." },
      },
      {
        from: "s", to: "b", label: "200 OK · contact deleted", status: 200, tone: "err",
        say: { en: "The server saw a valid cookie and obeyed. It can't tell Dana's click from Eve's page.", he: "השרת ראה cookie תקין וציית. הוא לא יכול להבדיל בין לחיצה של דנה לבין העמוד של איב." },
      },
      {
        from: "b", to: "s", label: "POST /contacts/42/delete",
        body: ["from: eve.example", "cookie: not sent (other site)", "secret form code: missing"],
        say: { en: "Fixed: the cookie stays home when another site sends the request, and Eve can't know the secret code your forms carry.", he: "תוקן: ה-cookie נשאר בבית כשאתר אחר שולח את הבקשה, ואיב לא יכולה לדעת את הקוד הסודי שהטפסים שלכם נושאים." },
      },
      {
        from: "s", to: "b", label: "403 Forbidden · no form code", status: 403,
        say: { en: "No proof it came from your own page, so nothing happens. Two attacks, two separate defences.", he: "אין הוכחה שהבקשה הגיעה מהעמוד שלכם, אז שום דבר לא קורה. שתי התקפות, שתי הגנות נפרדות." },
      },
    ],
  },

  "least-privilege": {
    cap: { en: "A leaked key can only do what it was allowed to. Keep that small", he: "מפתח שדלף יכול לעשות רק מה שהותר לו. תשמרו על זה קטן" },
    actors: [{ id: "a", icon: "🤖", label: { en: "AI agent", he: "סוכן AI" } }, db, eve],
    beats: [
      {
        from: "a", to: "d", label: "read contacts and notes", body: ["signed in as: a read-only user"],
        say: { en: "Your AI agent debugs a report with its own database login, which can only read.", he: "סוכן ה-AI שלכם מדבג דוח עם משתמש מסד נתונים משלו, שיכול רק לקרוא." },
      },
      {
        from: "d", to: "a", label: "denied: can't read notes", tone: "err",
        say: { en: "It was never given access to the notes.", he: "אף פעם לא נתנו לו גישה להערות." },
      },
      {
        from: "a", to: "a", label: "suggests: allow everything", tone: "warn",
        say: { en: "The agent offers the fix that always works on the first try: allow everything. Say no.", he: "הסוכן מציע את התיקון שתמיד עובד בניסיון הראשון: לאפשר הכל. תגידו לא." },
      },
      {
        from: "d", to: "d", label: "allow: read notes", tone: "ok",
        say: { en: "You give the one permission the error asked for: reading notes. Nothing more.", he: "אתם נותנים את ההרשאה האחת שהשגיאה ביקשה: קריאה של ההערות. לא יותר." },
      },
      {
        from: "e", to: "d", label: "sign in as the agent", body: ["password found in a pasted log"],
        say: { en: "Weeks later that password turns up in a debug log pasted into a ticket. Eve signs in with it.", he: "כמה שבועות אחר כך הסיסמה הזאת צצה בלוג שהודבק בטיקט. איב מתחברת איתה." },
      },
      {
        from: "e", to: "d", label: "delete all contacts",
        say: { en: "She tries the worst thing she can.", he: "היא מנסה את הדבר הכי גרוע שהיא יכולה." },
      },
      {
        from: "d", to: "e", label: "denied: read-only", tone: "ok",
        say: { en: "Denied. The leak can read a few tables, not wipe the database. Change the password, and it ends there.", he: "נדחה. הדליפה יכולה לקרוא כמה טבלאות, לא למחוק את המסד. מחליפים את הסיסמה, וזה נגמר שם." },
      },
    ],
  },

  "environment-variables-secrets": {
    cap: { en: "Deleting the key made the file clean. The history still has it", he: "מחיקת המפתח ניקתה את הקובץ. ההיסטוריה עדיין מחזיקה אותו" },
    actors: [
      you,
      github,
      { id: "x", icon: "🤖", label: { en: "Scanner bot", he: "בוט סורק" } },
      { id: "m", icon: "📧", label: { en: "Email service", he: "שירות מיילים" } },
    ],
    beats: [
      {
        from: "y", to: "g", label: "push · commit a1f3c9e",
        body: ["file: a test for emails", "+ the live email API key"],
        say: { en: "22:14. A commit, a saved change, puts a live email API key inside a test file, in a public repo.", he: "22:14. commit, שינוי שמור, מכניס מפתח API חי של מיילים לתוך קובץ טסט, בריפו ציבורי." },
      },
      {
        from: "g", to: "x", label: "new public push", body: ["looks like a key: re_8Kf2…"],
        say: { en: "Bots watch every public push and look for anything shaped like a key. This one is spotted within a minute.", he: "בוטים עוקבים אחרי כל push ציבורי ומחפשים כל דבר שנראה כמו מפתח. זה נתפס תוך פחות מדקה." },
      },
      {
        from: "x", to: "m", label: "POST /emails",
        body: ["key: re_8Kf2…", "to: 40,000 addresses"],
        say: { en: "22:19. The bot starts sending spam through your account, under your domain.", he: "22:19. הבוט מתחיל לשלוח ספאם דרך החשבון שלכם, בשם הדומיין שלכם." },
      },
      {
        from: "m", to: "x", label: "200 OK", status: 200, tone: "err",
        say: { en: "The email service sees a valid key. As far as it knows, this is you.", he: "שירות המיילים רואה מפתח תקין. מבחינתו, אלה אתם." },
      },
      {
        from: "y", to: "g", label: "push · remove the key",
        body: ["- the key in the code", "+ read the key from a setting"],
        say: { en: "22:20. You notice and delete the line in a new commit. The file looks clean.", he: "22:20. אתם שמים לב ומוחקים את השורה ב-commit חדש. הקובץ נראה נקי." },
      },
      {
        from: "y", to: "y", label: "search old commits for the key", tone: "err",
        body: ["found in: a1f3c9e"],
        say: { en: "But the old commit still has it, and so does every copy of the repo. Deleting changed the file, not the history.", he: "אבל ה-commit הישן עדיין מחזיק אותו, וכך גם כל עותק של הריפו. המחיקה שינתה את הקובץ, לא את ההיסטוריה." },
      },
      {
        from: "y", to: "m", label: "cancel key re_8Kf2…",
        body: ["old key: cancelled", "new key: in Vercel settings only"],
        say: { en: "The only real fix: cancel the key at the email service. The new one lives in the host's secret settings, never in a file.", he: "התיקון האמיתי היחיד: לבטל את המפתח בשירות המיילים. החדש נשמר בהגדרות הסודיות של המארח, אף פעם לא בקובץ." },
      },
      {
        from: "x", to: "m", label: "POST /emails", body: ["key: re_8Kf2…"],
        say: { en: "The bot keeps going with the old key.", he: "הבוט ממשיך עם המפתח הישן." },
      },
      {
        from: "m", to: "x", label: "401 Unauthorized", status: 401,
        say: { en: "Dead. Now add a check that scans for keys before every commit, so the next one never leaves your laptop.", he: "מת. עכשיו מוסיפים בדיקה שסורקת מפתחות לפני כל commit, כדי שהמפתח הבא לא יעזוב את המחשב שלכם." },
      },
    ],
  },

  "domain-and-registrar": {
    cap: { en: "You changed the address at 09:15. A customer's office keeps the old one for a day", he: "שיניתם את הכתובת ב-09:15. המשרד של לקוח ממשיך עם הישנה יום שלם" },
    actors: [
      browser,
      { id: "r", icon: "🔁", label: { en: "Office DNS", he: "ה-DNS במשרד" } },
      { id: "n", icon: "📖", label: { en: "Your DNS", he: "ה-DNS שלכם" } },
      you,
    ],
    beats: [
      {
        from: "r", to: "n", label: "where is pocketcrm.app?",
        say: { en: "Monday 08:50. A customer's office asks DNS, the internet's address book: where does pocketcrm.app live?", he: "יום שני, 08:50. המשרד של לקוח שואל את ה-DNS, ספר הכתובות של האינטרנט: איפה pocketcrm.app נמצא?" },
      },
      {
        from: "n", to: "r", label: "203.0.113.10 · keep for 1 day",
        say: { en: "The old server. The answer comes with a 'keep this for a day' note, called TTL, so the office remembers it.", he: "השרת הישן. התשובה מגיעה עם פתק 'תשמרו את זה יום', שנקרא TTL, אז המשרד זוכר אותה." },
      },
      {
        from: "y", to: "n", label: "point pocketcrm.app to Vercel",
        body: ["A: main address → Vercel", "CNAME: www → same as main", "TXT: proof you own it"],
        say: { en: "09:15. You move to Vercel: an A record for the address, a CNAME alias for www, a TXT proving the domain is yours.", he: "09:15. אתם עוברים ל-Vercel: רשומת A לכתובת, CNAME ככינוי ל-www, ו-TXT שמוכיח שהדומיין שלכם." },
      },
      {
        from: "y", to: "y", label: "your laptop: new address", tone: "info",
        say: { en: "Your laptop had nothing saved, so it sees the new address at once. Looks done.", he: "ללפטופ שלכם לא היה כלום שמור, אז הוא רואה מיד את הכתובת החדשה. נראה שסיימתם." },
      },
      {
        from: "b", to: "r", label: "where is pocketcrm.app?",
        say: { en: "The customer's browser asks the office DNS.", he: "הדפדפן של הלקוח שואל את ה-DNS במשרד." },
      },
      {
        from: "r", to: "b", label: "old address (saved at 08:50)", tone: "warn",
        say: { en: "Saved at 08:50 and trusted until tomorrow. No error, just the old server for almost another day.", he: "נשמר ב-08:50 ונחשב תקף עד מחר. בלי שגיאה, פשוט השרת הישן לעוד כמעט יום." },
      },
      {
        from: "y", to: "n", label: "keep for 1 day → 5 min", tone: "info",
        say: { en: "Next time, shorten the TTL to 5 minutes a day ahead. Then everyone lets go of the old answer within 5 minutes.", he: "בפעם הבאה, מקצרים את ה-TTL ל-5 דקות יום לפני. ואז כולם משחררים את התשובה הישנה תוך 5 דקות." },
      },
      {
        from: "r", to: "b", label: "new address · keep for 5 min", tone: "ok",
        say: { en: "The move reaches everyone within minutes. Check from another network too, not only your own laptop.", he: "המעבר מגיע לכולם תוך דקות. תבדקו גם מרשת אחרת, לא רק מהלפטופ שלכם." },
      },
    ],
  },

  "public-vs-private-ip": {
    cap: { en: "Every door is closed unless a rule opens it. One rule opened the database to everyone", he: "כל דלת סגורה אלא אם כלל פותח אותה. כלל אחד פתח את מסד הנתונים לכולם" },
    actors: [
      { id: "x", icon: "🌐", label: { en: "Internet", he: "האינטרנט" } },
      { id: "f", icon: "🧱", label: { en: "Firewall", he: "פיירוול" } },
      { id: "s", icon: "🖥️", label: { en: "App server", he: "שרת האפליקציה" } },
      db,
    ],
    beats: [
      {
        from: "x", to: "f", label: "visitor → website door (443)",
        say: { en: "A visitor knocks on port 443, the website's door. A rule says anyone may use it, so they're let in.", he: "מבקר דופק על פורט 443, הדלת של האתר. כלל אומר שכל אחד רשאי להשתמש בה, אז הוא נכנס." },
      },
      {
        from: "f", to: "s", label: "allowed → app", tone: "ok",
        say: { en: "Through to the web server. Port 80 is open too, only to send people on to the secure door.", he: "עובר לשרת האתר. גם פורט 80 פתוח, רק כדי להפנות אנשים לדלת המאובטחת." },
      },
      {
        from: "x", to: "f", label: "scanner → database door",
        say: { en: "A scanner, a bot that knocks on every door all day, tries the database's door.", he: "סורק, בוט שדופק על כל הדלתות כל היום, מנסה את הדלת של מסד הנתונים." },
      },
      {
        from: "f", to: "f", label: "no rule → ignored", tone: "ok",
        say: { en: "No rule opens the database door to the internet, so the knock is simply ignored. Closed unless opened.", he: "שום כלל לא פותח את הדלת של המסד לאינטרנט, אז פשוט מתעלמים מהדפיקה. סגור אלא אם נפתח." },
      },
      {
        from: "f", to: "f", label: "+ open DB door to everyone", tone: "err",
        say: { en: "23:10. You can't reach the database from home, so the agent adds this rule. It works in 11 seconds.", he: "23:10. אתם לא מצליחים להגיע למסד מהבית, אז הסוכן מוסיף את הכלל הזה. זה עובד תוך 11 שניות." },
      },
      {
        from: "x", to: "d", label: "guessing passwords ✗ ×1900", tone: "err",
        say: { en: "37 minutes later bots find it and start guessing passwords. Only the password stands between them and your data.", he: "37 דקות אחר כך בוטים מוצאים אותו ומתחילים לנחש סיסמאות. רק הסיסמה עומדת בינם לבין הנתונים שלכם." },
      },
      {
        from: "f", to: "f", label: "DB door: app servers only", tone: "ok",
        body: ["- open to everyone", "+ open to our app servers only"],
        say: { en: "The fix: delete that rule. The database door opens only to your own app servers, named directly, never to 'anyone'.", he: "התיקון: מוחקים את הכלל. הדלת של המסד נפתחת רק לשרתי האפליקציה שלכם, בשמם, אף פעם לא ל'כל אחד'." },
      },
      {
        from: "s", to: "d", label: "app → database ✓", tone: "ok",
        say: { en: "The app still reaches its database. Everyone else hits a closed door again.", he: "האפליקציה עדיין מגיעה למסד שלה. כל השאר שוב נתקלים בדלת סגורה." },
      },
    ],
  },
};
