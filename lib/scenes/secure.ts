import type { Scene } from "./types";

const browser = { id: "b", icon: "🧑‍💻", label: { en: "Browser", he: "דפדפן" } };
const server = { id: "s", icon: "🖥️", label: { en: "Server", he: "שרת" } };
const db = { id: "d", icon: "🗄️", label: { en: "Database", he: "מסד נתונים" } };
const eve = { id: "e", icon: "🦹", label: { en: "Eve", he: "איב" } };
const you = { id: "y", icon: "👩‍💻", label: { en: "You", he: "אתם" } };
const github = { id: "g", icon: "🐙", label: { en: "GitHub", he: "GitHub" } };
const vercel = { id: "h", icon: "☁️", label: { en: "Vercel", he: "Vercel" } };

export const SECURE_SCENES: Record<string, Scene> = {
  "session-and-cookie": {
    cap: { en: "A stolen cookie works, until logout deletes the session on the server", he: "cookie גנוב עובד, עד שההתנתקות מוחקת את הסשן בשרת" },
    actors: [eve, browser, server, db],
    beats: [
      {
        from: "s", to: "d", label: "INSERT INTO sessions",
        body: ["id: 9c1e…", "user_id: 88 (Dana)", "expires_at: now() + 7 days"],
        say: { en: "Dana signed in. The server writes a row: session 9c1e… belongs to user 88, for 7 days.", he: "דנה התחברה. השרת כותב שורה: סשן 9c1e… שייך למשתמשת 88, לשבעה ימים." },
      },
      {
        from: "s", to: "b", label: "200 OK", status: 200,
        body: ["Set-Cookie: sid=9c1e…; HttpOnly;", "  Secure; SameSite=Lax;", "  Max-Age=604800"],
        say: { en: "The browser gets only the id, plus flags. Secure: HTTPS only. SameSite: not sent on other sites' posts.", he: "הדפדפן מקבל רק את המזהה, ועוד דגלים. Secure: רק ב-HTTPS. SameSite: לא נשלח בטפסים מאתרים אחרים." },
      },
      {
        from: "b", to: "b", label: 'document.cookie → ""', tone: "info",
        say: { en: "HttpOnly: scripts on the page, even an injected one, can't read the cookie. They get an empty string.", he: "HttpOnly: סקריפטים בעמוד, גם סקריפט שהוזרק, לא יכולים לקרוא את ה-cookie. הם מקבלים מחרוזת ריקה." },
      },
      {
        from: "e", to: "s", label: "GET /contacts",
        body: ["Cookie: sid=9c1e…", "(copied from Dana's unlocked laptop)"],
        say: { en: "Eve copies the cookie from Dana's unlocked laptop and sends it from her own machine.", he: "איב מעתיקה את ה-cookie מהמחשב הפתוח של דנה ושולחת אותו מהמחשב שלה." },
      },
      {
        from: "s", to: "e", label: "200 OK · Dana's contacts", status: 200, tone: "err",
        say: { en: "The server can't tell the difference. Whoever holds the cookie is Dana.", he: "השרת לא יכול להבחין. מי שמחזיק את ה-cookie הוא דנה." },
      },
      {
        from: "b", to: "s", label: "POST /logout", body: ["Cookie: sid=9c1e…"],
        say: { en: "Dana notices and logs out.", he: "דנה שמה לב ומתנתקת." },
      },
      {
        from: "s", to: "d", label: "DELETE FROM sessions WHERE id=$1",
        say: { en: "Logout deletes the row on the server, not just the cookie in Dana's browser.", he: "ההתנתקות מוחקת את השורה בשרת, לא רק את ה-cookie בדפדפן של דנה." },
      },
      {
        from: "e", to: "s", label: "GET /contacts", body: ["Cookie: sid=9c1e…"],
        say: { en: "Eve tries again with her copy.", he: "איב מנסה שוב עם העותק שלה." },
      },
      {
        from: "s", to: "e", label: "401 Unauthorized", status: 401,
        say: { en: "The id points to nothing now, so the stolen copy is dead. And Max-Age means no cookie lives forever.", he: "המזהה כבר לא מצביע על כלום, אז העותק הגנוב מת. ו-Max-Age אומר שאף cookie לא חי לנצח." },
      },
    ],
  },

  "token-jwt": {
    cap: { en: "Omer's JWT: anyone can read it, nobody can forge it, and it is hard to take back", he: "ה-JWT של עומר: כל אחד יכול לקרוא אותו, אף אחד לא יכול לזייף אותו, וקשה לבטל אותו" },
    actors: [eve, browser, server, db],
    beats: [
      {
        from: "s", to: "b", label: "200 OK", status: 200,
        body: ['{ "sub": 88, "role": "user",', '  "exp": 1790000900 }  ← 15 min', "+ signature (HS256, server secret)"],
        say: { en: "Omer signs in and gets a JWT. The payload is only base64: anyone can read it, so nothing secret goes in.", he: "עומר מתחבר ומקבל JWT. ה-payload הוא רק base64: כל אחד יכול לקרוא אותו, אז לא שמים בו שום סוד." },
      },
      {
        from: "e", to: "s", label: "GET /admin/users",
        body: ["Authorization: Bearer eyJ…", 'payload edited: "role": "admin"', "signature: unchanged"],
        say: { en: "Eve takes her own token, edits role to admin, re-encodes it and keeps the old signature.", he: "איב לוקחת את הטוקן שלה, משנה את role ל-admin, מקודדת מחדש ומשאירה את החתימה הישנה." },
      },
      {
        from: "s", to: "s", label: "jwt.verify → invalid signature", tone: "err",
        say: { en: "The server recomputes the signature with its secret. No match. Had it only called decode, Eve would be admin.", he: "השרת מחשב מחדש את החתימה עם הסוד שלו. אין התאמה. אם הוא היה קורא רק ל-decode, איב הייתה admin." },
      },
      {
        from: "s", to: "e", label: "401 Unauthorized", status: 401,
        say: { en: "Signed, not encrypted: anyone can read it, nobody can change it.", he: "חתום, לא מוצפן: כל אחד יכול לקרוא, אף אחד לא יכול לשנות." },
      },
      {
        from: "b", to: "s", label: "GET /contacts", body: ["Authorization: Bearer eyJ…"],
        say: { en: "Omer's real token rides on his next call.", he: "הטוקן האמיתי של עומר נוסע עם הקריאה הבאה שלו." },
      },
      {
        from: "s", to: "b", label: "200 OK", status: 200,
        say: { en: "The signature checks out. No database lookup at all: that is the appeal, and the catch.", he: "החתימה תקינה. בלי שום שאילתה למסד: זה היתרון, וגם המלכודת." },
      },
      {
        from: "b", to: "s", label: "POST /auth/refresh", body: ["refresh_token: rt_5d2…"],
        say: { en: "10:01, Omer is removed from the team. His token expires within 15 minutes, and then the app must refresh.", he: "10:01, עומר מוסר מהצוות. הטוקן שלו פג תוך 15 דקות, ואז האפליקציה חייבת לרענן אותו." },
      },
      {
        from: "s", to: "d", label: "SELECT revoked_at FROM refresh_tokens",
        say: { en: "Refresh tokens are checked in the database, and his was revoked at 10:01.", he: "את ה-refresh token בודקים במסד, ושלו בוטל ב-10:01." },
      },
      {
        from: "s", to: "b", label: "401 Unauthorized", status: 401,
        say: { en: "Access ends within minutes. A 7-day token would have kept working all week, because nobody asks the database.", he: "הגישה נגמרת תוך דקות. טוקן לשבעה ימים היה ממשיך לעבוד כל השבוע, כי אף אחד לא שואל את המסד." },
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
        body: ["Location: accounts.google.com/…", "  ?scope=openid email", "  &state=k3f9…", "  &redirect_uri=http://…/callback"],
        say: { en: "The app sends her to Google, asking only for her email. state is a random value it will check on the way back.", he: "האפליקציה שולחת אותה ל-Google ומבקשת רק את המייל. state הוא ערך אקראי שהיא תבדוק בחזרה." },
      },
      {
        from: "b", to: "g", label: "GET /o/oauth2/v2/auth",
        body: ["redirect_uri=http://pocketcrm.app/callback"],
        say: { en: "The browser follows the redirect to Google.", he: "הדפדפן עוקב אחרי ההפניה ל-Google." },
      },
      {
        from: "g", to: "b", label: "400 redirect_uri_mismatch", status: 400,
        body: ["registered: https://pocketcrm.app/callback"],
        say: { en: "Registered: https. Sent: http. One letter, and Google refuses before any of your code runs.", he: "רשום: https. נשלח: http. אות אחת, ו-Google מסרב עוד לפני שקוד כלשהו שלכם רץ." },
      },
      {
        from: "b", to: "g", label: "GET /o/oauth2/v2/auth",
        body: ["redirect_uri=https://pocketcrm.app/callback"],
        say: { en: "Fixed. Noa types her password on Google's page, never on yours, and approves one thing: her email.", he: "תוקן. נועה מקלידה את הסיסמה בעמוד של Google, לא אצלכם, ומאשרת דבר אחד: את המייל שלה." },
      },
      {
        from: "g", to: "b", label: "302 Found", status: 302,
        body: ["Location: pocketcrm.app/callback", "  ?code=4/0AX…&state=k3f9…"],
        say: { en: "Google sends her back with a short-lived code. Not her password, and not a token yet.", he: "Google מחזיר אותה עם קוד קצר מועד. לא הסיסמה שלה, ועדיין לא טוקן." },
      },
      {
        from: "b", to: "s", label: "GET /callback?code=4/0AX…",
        body: ["state=k3f9… ✓ matches"],
        say: { en: "The app checks state matches what it sent, so nobody slipped their own code into Noa's login.", he: "האפליקציה בודקת ש-state תואם למה שהיא שלחה, כדי שאף אחד לא ישתיל קוד משלו בהתחברות של נועה." },
      },
      {
        from: "s", to: "g", label: "POST /token",
        body: ["code=4/0AX…", "client_secret=•••• (server only)"],
        say: { en: "Server to server, the app trades the code plus its client secret for a token. The browser never sees the secret.", he: "משרת לשרת, האפליקציה מחליפה את הקוד ועוד ה-client secret שלה בטוקן. הדפדפן אף פעם לא רואה את הסוד." },
      },
      {
        from: "g", to: "s", label: "200 OK", status: 200,
        body: ['{ "access_token": "ya29…",', '  "scope": "openid email" }'],
        say: { en: "The token grants only what Noa approved. The app never held her password, so it can never leak it.", he: "הטוקן נותן רק את מה שנועה אישרה. לאפליקציה אף פעם לא הייתה הסיסמה שלה, אז היא גם לא יכולה להדליף אותה." },
      },
    ],
  },

  cors: {
    cap: { en: "The server answers. The browser decides whether the page may read it", he: "השרת עונה. הדפדפן מחליט אם העמוד רשאי לקרוא את התשובה" },
    actors: [
      { id: "p", icon: "📄", label: { en: "Page script", he: "הקוד בעמוד" } },
      browser,
      { id: "a", icon: "🖥️", label: { en: "API", he: "API" } },
    ],
    beats: [
      {
        from: "p", to: "b", label: 'fetch("api.pocketcrm.app/contacts")',
        say: { en: "A page on app.pocketcrm.app calls the API on api.pocketcrm.app. That is a different origin.", he: "עמוד ב-app.pocketcrm.app קורא ל-API ב-api.pocketcrm.app. זה origin אחר." },
      },
      {
        from: "b", to: "a", label: "GET /contacts", body: ["Origin: https://app.pocketcrm.app"],
        say: { en: "The browser adds an Origin header and sends it. The request really does reach the server.", he: "הדפדפן מוסיף header של Origin ושולח. הבקשה באמת מגיעה לשרת." },
      },
      {
        from: "a", to: "b", label: "200 OK", status: 200, body: ["(no Access-Control-Allow-Origin)"],
        say: { en: "The API answers 200, and its log looks clean. But it never said this origin may read the answer.", he: "ה-API עונה 200, והלוג שלו נראה נקי. אבל הוא לא אמר שה-origin הזה רשאי לקרוא את התשובה." },
      },
      {
        from: "b", to: "p", label: "TypeError: blocked by CORS policy", tone: "err",
        say: { en: "So the browser keeps the answer from the page. The server blocked nothing. curl works because curl has no guard.", he: "אז הדפדפן לא מוסר את התשובה לעמוד. השרת לא חסם כלום. ב-curl זה עובד כי ל-curl אין שומר." },
      },
      {
        from: "b", to: "a", label: "OPTIONS /contacts",
        body: ["Origin: https://app.pocketcrm.app", "Access-Control-Request-Method: POST", "Access-Control-Request-Headers:", "  content-type"],
        say: { en: "Now a JSON POST, after the API was fixed. First the browser sends a preflight: may this origin POST here?", he: "עכשיו POST עם JSON, אחרי שתיקנו את ה-API. קודם הדפדפן שולח preflight: מותר ל-origin הזה לשלוח POST לכאן?" },
      },
      {
        from: "a", to: "b", label: "204 No Content", status: 204,
        body: ["Access-Control-Allow-Origin:", "  https://app.pocketcrm.app", "Access-Control-Allow-Methods: POST", "Access-Control-Allow-Headers: content-type"],
        say: { en: "The API names the one allowed origin, not *. If OPTIONS weren't handled, the real POST would never be sent.", he: "ה-API מציין את ה-origin היחיד שמותר, לא *. אם OPTIONS לא היה מטופל, ה-POST האמיתי לא היה נשלח בכלל." },
      },
      {
        from: "b", to: "a", label: "POST /contacts",
        body: ["Origin: https://app.pocketcrm.app", '{ "name": "Noa Levi" }'],
        say: { en: "Preflight passed, so the real request goes out.", he: "ה-preflight עבר, אז הבקשה האמיתית יוצאת." },
      },
      {
        from: "a", to: "b", label: "201 Created", status: 201,
        body: ["Access-Control-Allow-Origin:", "  https://app.pocketcrm.app"],
        say: { en: "The answer carries the allow header too.", he: "גם התשובה נושאת את ה-header שמאשר." },
      },
      {
        from: "b", to: "p", label: "response readable", tone: "ok",
        say: { en: "Allowed, so the page gets its data. Fix CORS in one place: the API's response headers.", he: "מותר, אז העמוד מקבל את הנתונים. מתקנים CORS במקום אחד: ה-headers בתשובה של ה-API." },
      },
    ],
  },

  "https-tls": {
    cap: { en: "On café wifi, Eve reads plain HTTP. HTTPS gives her noise, and her fake certificate fails", he: "ב-wifi של בית קפה, איב קוראת HTTP רגיל. ב-HTTPS היא רואה רעש, והתעודה המזויפת שלה נכשלת" },
    actors: [browser, { id: "e", icon: "🕵️", label: { en: "Eve on the wifi", he: "איב ב-wifi" } }, server],
    beats: [
      {
        from: "b", to: "s", label: "GET http://pocketcrm.app/login",
        say: { en: "Dana, on café wifi, types the address without https.", he: "דנה, ב-wifi של בית קפה, מקלידה את הכתובת בלי https." },
      },
      {
        from: "e", to: "e", label: "reading: GET /login, cookies…", tone: "err",
        say: { en: "Plain HTTP is a postcard. Eve, on the same network, can read it and could change the page that comes back.", he: "HTTP רגיל הוא גלויה. איב, באותה רשת, יכולה לקרוא אותו ואפילו לשנות את העמוד שחוזר." },
      },
      {
        from: "s", to: "b", label: "308 Permanent Redirect", status: 308,
        body: ["Location: https://pocketcrm.app/login", "Strict-Transport-Security:", "  max-age=31536000"],
        say: { en: "The server only redirects to https, and sends HSTS: from now on this browser goes straight to https.", he: "השרת רק מפנה ל-https, ושולח HSTS: מעכשיו הדפדפן הזה ילך ישר ל-https." },
      },
      {
        from: "b", to: "s", label: "TLS ClientHello",
        say: { en: "Before any real request, the browser starts a TLS handshake.", he: "לפני כל בקשה אמיתית, הדפדפן פותח לחיצת יד של TLS." },
      },
      {
        from: "s", to: "b", label: "Certificate: pocketcrm.app",
        body: ["issuer: Let's Encrypt", "valid until: 2026-12-20"],
        say: { en: "The server proves who it is: a certificate for this exact name, signed by an authority the browser trusts.", he: "השרת מוכיח מי הוא: תעודה לשם המדויק הזה, חתומה על ידי רשות שהדפדפן סומך עליה." },
      },
      {
        from: "b", to: "s", label: "POST /login (encrypted)",
        body: ["17 03 03 00 8a 9f c4 e1 07 5b …"],
        say: { en: "Now the login travels inside the encrypted connection.", he: "עכשיו ההתחברות נוסעת בתוך החיבור המוצפן." },
      },
      {
        from: "e", to: "e", label: "sees: 17 03 03 00 8a 9f c4 …", tone: "ok",
        say: { en: "Eve still sees the packets go by, but only as noise. She can't read them or change them.", he: "איב עדיין רואה את המנות עוברות, אבל רק כרעש. היא לא יכולה לקרוא או לשנות אותן." },
      },
      {
        from: "e", to: "b", label: "Certificate: pocketcrm.app", tone: "err",
        body: ["issuer: Eve's own CA"],
        say: { en: "Next day Eve runs a fake hotspot and answers as pocketcrm.app, with a certificate she signed herself.", he: "למחרת איב מפעילה hotspot מזויף ועונה בתור pocketcrm.app, עם תעודה שהיא חתמה בעצמה." },
      },
      {
        from: "b", to: "b", label: "NET::ERR_CERT_AUTHORITY_INVALID", tone: "err",
        say: { en: "No trusted signature, so the browser stops. That is the check rejectUnauthorized: false would switch off.", he: "אין חתימה מהימנה, אז הדפדפן עוצר. זו הבדיקה ש-rejectUnauthorized: false היה מכבה." },
      },
    ],
  },

  "reverse-proxy": {
    cap: { en: "Every request meets the proxy first. It can fail an upload before your code runs", he: "כל בקשה פוגשת קודם את הפרוקסי. הוא יכול להכשיל העלאה עוד לפני שהקוד שלכם רץ" },
    actors: [
      browser,
      { id: "p", icon: "🚦", label: { en: "Proxy (nginx)", he: "פרוקסי (nginx)" } },
      { id: "a", icon: "📦", label: { en: "App", he: "אפליקציה" } },
    ],
    beats: [
      {
        from: "b", to: "p", label: "POST /api/import",
        body: ["Content-Type: text/csv", "Content-Length: 2400000  (2.4 MB)"],
        say: { en: "Dana imports a 2.4 MB contacts CSV. On your laptop, straight to port 3000, it always worked.", he: "דנה מייבאת קובץ CSV של אנשי קשר במשקל 2.4 MB. על הלפטופ שלכם, ישירות לפורט 3000, זה תמיד עבד." },
      },
      {
        from: "p", to: "b", label: "413 Request Entity Too Large", status: 413,
        say: { en: "In production nginx sits in front, with a 1 MB default limit. Rejected before your app runs: its log is empty.", he: "בפרודקשן nginx יושב מקדימה, עם מגבלת ברירת מחדל של 1 MB. נדחה לפני שהאפליקציה רצה: הלוג שלה ריק." },
      },
      {
        from: "p", to: "p", label: "client_max_body_size 10m;", tone: "info",
        say: { en: "One line in the proxy config. The bug was never in your code.", he: "שורה אחת בקונפיגורציה של הפרוקסי. הבאג אף פעם לא היה בקוד שלכם." },
      },
      {
        from: "b", to: "p", label: "POST /api/import (HTTPS)", body: ["Content-Length: 2400000"],
        say: { en: "Dana tries again. The proxy accepts it, and TLS ends here.", he: "דנה מנסה שוב. הפרוקסי מקבל את הבקשה, וה-TLS נגמר כאן." },
      },
      {
        from: "p", to: "a", label: "POST :3000/api/import (plain HTTP)",
        body: ["X-Forwarded-For: 203.0.113.7", "X-Forwarded-Proto: https"],
        say: { en: "Inside, it forwards plain HTTP to the app's private port, adding who really asked and over what.", he: "בפנים הוא מעביר HTTP רגיל לפורט הפרטי של האפליקציה, ומוסיף מי באמת שאל ובאיזה פרוטוקול." },
      },
      {
        from: "a", to: "a", label: "client ip = 203.0.113.7", tone: "ok", body: ["trust proxy: on"],
        say: { en: "The app trusts the proxy's header. Without it every user looks like 127.0.0.1, and one rate limit hits them all.", he: "האפליקציה סומכת על ה-header של הפרוקסי. בלעדיו כל המשתמשים נראים כמו 127.0.0.1, ו-rate limit אחד חוסם את כולם." },
      },
      {
        from: "a", to: "p", label: "200 OK", status: 200, body: ['{ "imported": 4983, "bad": 17 }'],
        say: { en: "Imported. The answer goes back to the proxy, not straight to Dana.", he: "יובא. התשובה חוזרת לפרוקסי, לא ישר לדנה." },
      },
      {
        from: "p", to: "b", label: "200 OK", status: 200,
        body: ["Content-Encoding: gzip", "Strict-Transport-Security: …"],
        say: { en: "The proxy compresses it, re-encrypts it and hands it over. Ask your agent: where does TLS end?", he: "הפרוקסי דוחס, מצפין מחדש ומוסר. תשאלו את הסוכן שלכם: איפה ה-TLS נגמר?" },
      },
    ],
  },

  "ci-cd": {
    cap: { en: "The agent's PR looks fine. The pipeline runs it, and red blocks the merge", he: "ה-PR של הסוכן נראה תקין. הצינור מריץ אותו, ואדום חוסם את ה-merge" },
    actors: [you, github, { id: "c", icon: "⚙️", label: { en: "CI", he: "CI" } }, vercel],
    beats: [
      {
        from: "y", to: "g", label: "git push · PR #23",
        body: ["feat: deal value field", "3 files changed, +112 −4"],
        say: { en: "Your agent opens PR #23: a deal value field. Plausible, confident, and nobody has run it.", he: "הסוכן שלכם פותח את PR #23: שדה של שווי עסקה. נראה סביר ובטוח בעצמו, ואף אחד לא הריץ אותו." },
      },
      {
        from: "g", to: "c", label: "run ci.yml · pull_request",
        say: { en: "The push wakes the pipeline. It runs on every pull request, not only on main.", he: "ה-push מעיר את הצינור. הוא רץ על כל pull request, לא רק על main." },
      },
      {
        from: "c", to: "c", label: "npm ci && npm run check", tone: "err",
        body: ["✓ typecheck  ✓ lint", "✗ stage 'won' requires a value", "  expected 400, received 201"],
        say: { en: "Same steps, every time, for everyone. One test fails: 'won' is accepted with no deal value.", he: "אותם צעדים, בכל פעם, לכל אחד. טסט אחד נכשל: 'won' מתקבל בלי שווי עסקה." },
      },
      {
        from: "c", to: "g", label: "check: failed", tone: "err",
        say: { en: "The result is posted on the PR.", he: "התוצאה מתפרסמת על ה-PR." },
      },
      {
        from: "g", to: "y", label: "Merge blocked", tone: "err", body: ["Required check: ci / check ✗"],
        say: { en: "Branch protection makes the check required. Red means no merge, at midnight too.", he: "הגנה על הברנץ' הופכת את הבדיקה לחובה. אדום אומר שאין merge, גם בחצות." },
      },
      {
        from: "y", to: "g", label: "git push · fix", body: ["fix: require value when stage=won"],
        say: { en: "The agent fixes the rule and pushes again.", he: "הסוכן מתקן את הכלל ועושה push שוב." },
      },
      {
        from: "c", to: "c", label: "check · build · e2e on preview", tone: "ok",
        body: ["✓ 148 tests  ✓ build 41s", "✓ e2e 12 passed"],
        say: { en: "The pipeline runs again on the new commit, including e2e against the preview. All green.", he: "הצינור רץ שוב על ה-commit החדש, כולל e2e מול ה-preview. הכל ירוק." },
      },
      {
        from: "y", to: "g", label: "Merge PR #23 → main",
        say: { en: "Now the merge button works.", he: "עכשיו כפתור ה-merge עובד." },
      },
      {
        from: "g", to: "h", label: "deploy main · 4be2c1a", tone: "ok",
        say: { en: "Main deploys to production. Nobody had to remember to run the tests.", he: "main עולה לפרודקשן. אף אחד לא היה צריך לזכור להריץ את הטסטים." },
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
        from: "h", to: "h", label: "traffic v41 → v42", tone: "ok",
        say: { en: "Traffic switches over. Requests already in flight finish on v41, so nobody is cut off.", he: "התעבורה עוברת. בקשות שכבר באמצע מסתיימות על v41, אז אף אחד לא מנותק." },
      },
      {
        from: "u", to: "h", label: "GET /contacts",
        say: { en: "Dana opens her contacts on the new version.", he: "דנה פותחת את אנשי הקשר שלה בגרסה החדשה." },
      },
      {
        from: "h", to: "u", label: "500 Internal Server Error", status: 500,
        body: ["TypeError: cannot read 'amount' of null"],
        say: { en: "Contacts with no deal value crash the page. The error rate shows it within minutes.", he: "אנשי קשר בלי שווי עסקה מפילים את העמוד. שיעור השגיאות מראה את זה תוך דקות." },
      },
      {
        from: "y", to: "h", label: "vercel rollback", body: ["→ v41 (already built)"],
        say: { en: "Undo is one command that points traffic back at v41. No rebuild, so it takes seconds.", he: "הביטול הוא פקודה אחת שמחזירה את התעבורה ל-v41. בלי build מחדש, אז זה לוקח שניות." },
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
        say: { en: "Someone asks for contact 1041 with no session at all.", he: "מישהו מבקש את איש קשר 1041 בלי סשן בכלל." },
      },
      {
        from: "s", to: "b", label: "401 Unauthorized", status: 401,
        say: { en: "Authentication asks who you are. No session, no answer.", he: "אותנטיקציה שואלת מי אתם. אין סשן, אין תשובה." },
      },
      {
        from: "b", to: "s", label: "GET /contacts/1041", body: ["Cookie: session=… (Omer, user 88)"],
        say: { en: "Omer signs in. His contact is 1042, so he edits the URL to 1041, which is Dana's.", he: "עומר מתחבר. איש הקשר שלו הוא 1042, אז הוא משנה בכתובת ל-1041, ששייך לדנה." },
      },
      {
        from: "s", to: "d", label: "SELECT * FROM contacts WHERE id=$1",
        say: { en: "The handler checked that a session exists. It never asked whose contact this is.", he: "ה-handler בדק שיש סשן. הוא אף פעם לא שאל של מי איש הקשר הזה." },
      },
      {
        from: "s", to: "b", label: "200 OK · Dana's contact", status: 200, tone: "err",
        body: ['{ "name": "Noa Levi",', '  "owner_id": 7 }'],
        say: { en: "Authenticated, but not authorized. A loop from 1000 to 2000 would pull every contact, with a valid cookie.", he: "מאומת, אבל לא מורשה. לולאה מ-1000 עד 2000 הייתה שולפת את כל אנשי הקשר, עם cookie תקין." },
      },
      {
        from: "s", to: "d", label: "SELECT … WHERE id=$1 AND owner_id=$2", body: ["$1 = 1041, $2 = 88"],
        say: { en: "The fix lives in the handler, on the server: fetch the row only if it belongs to the session user.", he: "התיקון יושב ב-handler, בשרת: שולפים את השורה רק אם היא שייכת למשתמש של הסשן." },
      },
      {
        from: "d", to: "s", label: "0 rows",
        say: { en: "It doesn't.", he: "היא לא." },
      },
      {
        from: "s", to: "b", label: "403 Forbidden", status: 403,
        say: { en: "Authorization: we know who you are, and this isn't yours. (404 also works, and hides that 1041 exists.)", he: "הרשאות: אנחנו יודעים מי אתם, וזה לא שלכם. (גם 404 עובד, ומסתיר ש-1041 קיים.)" },
      },
    ],
  },

  "injection-and-validation": {
    cap: { en: "Eve's search text becomes part of the query, until query and data travel apart", he: "טקסט החיפוש של איב הופך לחלק מהשאילתה, עד שהשאילתה והנתונים נוסעים בנפרד" },
    actors: [eve, server, db],
    beats: [
      {
        from: "e", to: "s", label: "GET /contacts?email=' OR '1'='1' --",
        say: { en: "Eve types ' OR '1'='1' -- into the email search box.", he: "איב מקלידה ' OR '1'='1' -- בתיבת החיפוש לפי מייל." },
      },
      {
        from: "s", to: "d", label: "SELECT … (string glued)",
        body: ["`… WHERE email='${q}'`", "→ WHERE email='' OR '1'='1' --'"],
        say: { en: "The code glued her text into the SQL. Now WHERE is always true, and -- turns the rest into a comment.", he: "הקוד הדביק את הטקסט שלה לתוך ה-SQL. עכשיו ה-WHERE תמיד נכון, והסימן -- הופך את השאר להערה." },
      },
      {
        from: "d", to: "s", label: "5,000 rows", tone: "err",
        say: { en: "The database can't tell your characters from hers. It returns every contact.", he: "המסד לא יכול להבדיל בין התווים שלכם לשלה. הוא מחזיר את כל אנשי הקשר." },
      },
      {
        from: "s", to: "e", label: "200 OK · all 5,000 contacts", status: 200, tone: "err",
        say: { en: "No tools, no exploit kit. Just characters in a text box.", he: "בלי כלים, בלי ערכת פריצה. רק תווים בתיבת טקסט." },
      },
      {
        from: "e", to: "s", label: "GET /contacts?email=' OR '1'='1' --",
        say: { en: "The same input, after the fix.", he: "אותו קלט, אחרי התיקון." },
      },
      {
        from: "s", to: "d", label: "SELECT … WHERE email = $1", body: ["$1 = \"' OR '1'='1' --\""],
        say: { en: "Parameterized: the query and the value travel separately. Her text can only ever be data, never syntax.", he: "שאילתה עם פרמטרים: השאילתה והערך נוסעים בנפרד. הטקסט שלה יכול להיות רק נתונים, אף פעם לא תחביר." },
      },
      {
        from: "d", to: "s", label: "0 rows", tone: "ok",
        say: { en: "Nobody has that odd email address. 0 rows.", he: "לאף אחד אין כתובת מייל מוזרה כזאת. 0 שורות." },
      },
      {
        from: "e", to: "s", label: "POST /contacts", body: ['{ "name": "Noa",', '  "stage": "boss" }'],
        say: { en: "Eve skips the form and posts straight to the API, so the browser's checks never run.", he: "איב מדלגת על הטופס ושולחת ישר ל-API, אז הבדיקות בדפדפן לא רצות בכלל." },
      },
      {
        from: "s", to: "e", label: "400 Bad Request", status: 400,
        body: ['{ "stage": "expected lead | qualified', '  | won | lost" }'],
        say: { en: "The server validates with a schema at the edge and rejects it before any logic runs.", he: "השרת מאמת עם סכמה בכניסה ודוחה את הבקשה לפני שלוגיקה כלשהי רצה." },
      },
    ],
  },

  "xss-and-csrf": {
    cap: { en: "XSS runs Eve's script on your page. CSRF makes Dana's browser act from Eve's page", he: "ב-XSS הסקריפט של איב רץ בעמוד שלכם. ב-CSRF העמוד של איב מפעיל את הדפדפן של דנה" },
    actors: [eve, browser, server],
    beats: [
      {
        from: "e", to: "s", label: "POST /api/leads", body: ['{ "name": "<script>steal()</script>" }'],
        say: { en: "XSS. Eve fills in Pocket CRM's public demo form. Her 'name' is a script.", he: "XSS. איב ממלאת את טופס הדמו הציבורי של Pocket CRM. ה'שם' שלה הוא סקריפט." },
      },
      {
        from: "s", to: "b", label: "200 OK · name as raw HTML", status: 200, tone: "err",
        body: ["<td><script>steal()</script></td>"],
        say: { en: "Dana opens her leads. The name was inserted as markup, so Eve's script runs in Dana's page, as Dana.", he: "דנה פותחת את הלידים שלה. השם הוכנס כ-markup, אז הסקריפט של איב רץ בעמוד של דנה, בתור דנה." },
      },
      {
        from: "s", to: "b", label: "200 OK · name as text", status: 200,
        body: ["<td>&lt;script&gt;steal()…</td>", "Content-Security-Policy:", "  script-src 'self'"],
        say: { en: "Fixed: rendered as text it's just odd characters, and a CSP blocks inline scripts as a backstop.", he: "תוקן: כטקסט אלה סתם תווים מוזרים, ו-CSP חוסם סקריפטים inline כרשת ביטחון." },
      },
      {
        from: "e", to: "b", label: "hidden form, submits on load",
        body: ['<form method="POST" action=', '  "pocketcrm.app/contacts/42/delete">'],
        say: { en: "CSRF. In another tab Dana opens Eve's meme page. It hides a form aimed at Pocket CRM and submits it on load.", he: "CSRF. בטאב אחר דנה פותחת את עמוד הממים של איב. מוסתר בו טופס שמכוון ל-Pocket CRM ונשלח מיד בטעינה." },
      },
      {
        from: "b", to: "s", label: "POST /contacts/42/delete",
        body: ["Origin: https://eve.example", "Cookie: session=… (SameSite=None)"],
        say: { en: "Dana's browser sends it and attaches her cookie on its own. None of Eve's code runs on your site.", he: "הדפדפן של דנה שולח את הבקשה ומצרף את ה-cookie שלה מעצמו. שום קוד של איב לא רץ באתר שלכם." },
      },
      {
        from: "s", to: "b", label: "200 OK · contact deleted", status: 200, tone: "err",
        say: { en: "The server saw a valid cookie and obeyed. It can't tell Dana's click from Eve's page.", he: "השרת ראה cookie תקין וציית. הוא לא יכול להבדיל בין לחיצה של דנה לבין העמוד של איב." },
      },
      {
        from: "b", to: "s", label: "POST /contacts/42/delete",
        body: ["Origin: https://eve.example", "(no cookie: SameSite=Lax)", "(no csrf_token)"],
        say: { en: "Fixed: a SameSite=Lax cookie stays home on another site's POST, and Eve can't read the CSRF token.", he: "תוקן: cookie עם SameSite=Lax לא נשלח ב-POST מאתר אחר, ואיב לא יכולה לקרוא את ה-CSRF token." },
      },
      {
        from: "s", to: "b", label: "403 Forbidden · bad CSRF token", status: 403,
        say: { en: "No proof it came from your own page, so nothing happens. Two attacks, two separate defences.", he: "אין הוכחה שהבקשה הגיעה מהעמוד שלכם, אז שום דבר לא קורה. שתי התקפות, שתי הגנות נפרדות." },
      },
    ],
  },

  "least-privilege": {
    cap: { en: "A leaked key can only do what it was allowed to. Keep that small", he: "מפתח שדלף יכול לעשות רק מה שהותר לו. תשמרו על זה קטן" },
    actors: [{ id: "a", icon: "🤖", label: { en: "AI agent", he: "סוכן AI" } }, db, eve],
    beats: [
      {
        from: "a", to: "d", label: "SELECT … FROM contacts JOIN notes", body: ["user: agent_ro (read-only)"],
        say: { en: "Your AI agent debugs a report using its own database user, agent_ro, which can only read.", he: "סוכן ה-AI שלכם מדבג דוח עם משתמש מסד משלו, agent_ro, שיכול רק לקרוא." },
      },
      {
        from: "d", to: "a", label: "ERROR: permission denied for table notes", tone: "err",
        say: { en: "It was never given the notes table.", he: "אף פעם לא נתנו לו גישה לטבלת notes." },
      },
      {
        from: "a", to: "a", label: "suggests: GRANT ALL … TO agent_ro", tone: "warn",
        say: { en: "The agent offers the fix that always works on the first try: grant everything. Say no.", he: "הסוכן מציע את התיקון שתמיד עובד בניסיון הראשון: לתת הכל. תגידו לא." },
      },
      {
        from: "d", to: "d", label: "GRANT SELECT ON notes TO agent_ro", tone: "ok",
        say: { en: "You grant the one permission named in the error: reading notes. Nothing more.", he: "אתם נותנים את ההרשאה האחת שמופיעה בשגיאה: קריאה של notes. לא יותר." },
      },
      {
        from: "e", to: "d", label: "connect as agent_ro", body: ["password found in a pasted debug log"],
        say: { en: "Weeks later that password turns up in a debug log pasted into a ticket. Eve connects with it.", he: "כמה שבועות אחר כך הסיסמה הזאת צצה בלוג דיבאג שהודבק בטיקט. איב מתחברת איתה." },
      },
      {
        from: "e", to: "d", label: "DROP TABLE contacts",
        say: { en: "She tries the worst thing she can.", he: "היא מנסה את הדבר הכי גרוע שהיא יכולה." },
      },
      {
        from: "d", to: "e", label: "ERROR: must be owner of table contacts", tone: "ok",
        say: { en: "Denied. The leak can read three tables, not wipe the database. Rotate the password, and it ends there.", he: "נדחה. הדליפה יכולה לקרוא שלוש טבלאות, לא למחוק את המסד. מחליפים את הסיסמה, וזה נגמר שם." },
      },
    ],
  },

  "secrets-in-git-history": {
    cap: { en: "Deleting the key made the file clean. The history still has it", he: "מחיקת המפתח ניקתה את הקובץ. ההיסטוריה עדיין מחזיקה אותו" },
    actors: [
      you,
      github,
      { id: "x", icon: "🤖", label: { en: "Scanner bot", he: "בוט סורק" } },
      { id: "m", icon: "📧", label: { en: "Email API", he: "API של מיילים" } },
    ],
    beats: [
      {
        from: "y", to: "g", label: "git push · a1f3c9e",
        body: ["tests/fixtures/email.ts", '+ const key = "re_8Kf2…"'],
        say: { en: "22:14. A commit pushes a live email API key, inside a test fixture, to a public repo.", he: "22:14. commit עולה לריפו ציבורי עם מפתח API חי של מיילים, בתוך קובץ fixture של טסט." },
      },
      {
        from: "g", to: "x", label: "PushEvent · a1f3c9e", body: ["match: re_[A-Za-z0-9]{24,}"],
        say: { en: "Bots watch every public push and grep for key shapes. This one matches in under a minute.", he: "בוטים עוקבים אחרי כל push ציבורי ומחפשים תבניות של מפתחות. זה נתפס תוך פחות מדקה." },
      },
      {
        from: "x", to: "m", label: "POST /emails",
        body: ["Authorization: Bearer re_8Kf2…", "to: 40,000 addresses"],
        say: { en: "22:19. The bot starts sending spam through your account, under your domain.", he: "22:19. הבוט מתחיל לשלוח ספאם דרך החשבון שלכם, בשם הדומיין שלכם." },
      },
      {
        from: "m", to: "x", label: "200 OK", status: 200, tone: "err",
        say: { en: "The provider sees a valid key. As far as it knows, this is you.", he: "הספק רואה מפתח תקין. מבחינתו, אלה אתם." },
      },
      {
        from: "y", to: "g", label: "git push · 5b7d201",
        body: ['- const key = "re_8Kf2…"', "+ const key = process.env.EMAIL_KEY"],
        say: { en: "22:20. You notice and delete the line in a new commit. The file looks clean.", he: "22:20. אתם שמים לב ומוחקים את השורה ב-commit חדש. הקובץ נראה נקי." },
      },
      {
        from: "y", to: "y", label: "git log -p | grep re_8Kf2", tone: "err",
        body: ['a1f3c9e  + const key = "re_8Kf2…"'],
        say: { en: "But git log -p still shows it in a1f3c9e, and so does every clone. Deleting changed the file, not the history.", he: "אבל git log -p עדיין מראה אותו ב-a1f3c9e, וכך גם כל clone. המחיקה שינתה את הקובץ, לא את ההיסטוריה." },
      },
      {
        from: "y", to: "m", label: "Roll key re_8Kf2…",
        body: ["old key: revoked", "new key → Vercel env var only"],
        say: { en: "The only real fix: rotate the key at the provider. The new one goes into an env var, never a file.", he: "התיקון האמיתי היחיד: להחליף את המפתח אצל הספק. החדש נכנס ל-env var, אף פעם לא לקובץ." },
      },
      {
        from: "x", to: "m", label: "POST /emails", body: ["Authorization: Bearer re_8Kf2…"],
        say: { en: "The bot keeps going with the old key.", he: "הבוט ממשיך עם המפתח הישן." },
      },
      {
        from: "m", to: "x", label: "401 Unauthorized", status: 401,
        say: { en: "Dead. Now add a secret scanner to the pre-commit hook, so the next key never leaves your machine.", he: "מת. עכשיו מוסיפים סורק סודות ל-pre-commit hook, כדי שהמפתח הבא לא יעזוב את המחשב שלכם." },
      },
    ],
  },

  "dns-records-a-cname-txt": {
    cap: { en: "The record changed at 09:15. A customer's resolver keeps the old answer for a day", he: "הרשומה השתנתה ב-09:15. ה-resolver של לקוח ממשיך עם התשובה הישנה יום שלם" },
    actors: [
      browser,
      { id: "r", icon: "🔁", label: { en: "Office resolver", he: "Resolver במשרד" } },
      { id: "n", icon: "📖", label: { en: "Your DNS", he: "ה-DNS שלכם" } },
      you,
    ],
    beats: [
      {
        from: "r", to: "n", label: "A? pocketcrm.app",
        say: { en: "Monday 08:50. A customer's office resolver asks: where does pocketcrm.app live?", he: "יום שני, 08:50. ה-resolver במשרד של לקוח שואל: איפה pocketcrm.app נמצא?" },
      },
      {
        from: "n", to: "r", label: "A 203.0.113.10 · TTL 86400",
        say: { en: "The old server. TTL 86400 lets the resolver keep this answer for a whole day.", he: "השרת הישן. TTL של 86400 מאפשר ל-resolver לשמור את התשובה הזאת יום שלם." },
      },
      {
        from: "y", to: "n", label: "A @ → 76.76.21.21",
        body: ["CNAME www → cname.vercel-dns.com", "TXT _vercel → vc-domain-verify=…"],
        say: { en: "09:15. You move to Vercel: an A record at the root, a CNAME alias for www, a TXT proving you own the domain.", he: "09:15. אתם עוברים ל-Vercel: רשומת A בשורש, CNAME ל-www ככינוי, ו-TXT שמוכיח שהדומיין שלכם." },
      },
      {
        from: "y", to: "y", label: "dig +short pocketcrm.app → 76.76.21.21", tone: "info",
        say: { en: "Your laptop's resolver had nothing cached, so it sees the new address at once. Looks done.", he: "ל-resolver של הלפטופ שלכם לא היה כלום בקאש, אז הוא רואה מיד את הכתובת החדשה. נראה שסיימתם." },
      },
      {
        from: "b", to: "r", label: "A? pocketcrm.app",
        say: { en: "The customer's browser asks the office resolver.", he: "הדפדפן של הלקוח שואל את ה-resolver במשרד." },
      },
      {
        from: "r", to: "b", label: "A 203.0.113.10 (cached 08:50)", tone: "warn",
        say: { en: "Cached at 08:50 and trusted until tomorrow. No error, just the old server for almost another day.", he: "נשמר בקאש ב-08:50 ונחשב תקף עד מחר. בלי שגיאה, פשוט השרת הישן לעוד כמעט יום." },
      },
      {
        from: "y", to: "n", label: "TTL 86400 → 300 (a day ahead)", tone: "info",
        say: { en: "Next move, lower the TTL to 300 the day before. Caches then let go of the old answer within 5 minutes.", he: "במעבר הבא, מורידים את ה-TTL ל-300 יום לפני. אז הקאש משחרר את התשובה הישנה תוך 5 דקות." },
      },
      {
        from: "r", to: "b", label: "A 76.76.21.21 · TTL 300", tone: "ok",
        say: { en: "The move reaches everyone within minutes. Check it from 1.1.1.1, not only from your own laptop.", he: "המעבר מגיע לכולם תוך דקות. תבדקו מול 1.1.1.1, לא רק מהלפטופ שלכם." },
      },
    ],
  },

  "firewall-security-group": {
    cap: { en: "Every port is closed unless a rule opens it. One rule opened the database to everyone", he: "כל פורט סגור אלא אם כלל פותח אותו. כלל אחד פתח את המסד לכולם" },
    actors: [
      { id: "x", icon: "🌐", label: { en: "Internet", he: "האינטרנט" } },
      { id: "f", icon: "🧱", label: { en: "Security group", he: "Security group" } },
      { id: "s", icon: "🖥️", label: { en: "App server", he: "שרת האפליקציה" } },
      db,
    ],
    beats: [
      {
        from: "x", to: "f", label: "TCP :443 from 198.51.100.23",
        say: { en: "A visitor reaches port 443. The rule '443 from anywhere' lets them in: that's the front door.", he: "מבקר מגיע לפורט 443. הכלל '443 מכל מקום' מכניס אותו: זו הדלת הראשית." },
      },
      {
        from: "f", to: "s", label: "allow :443 → app", tone: "ok",
        say: { en: "Through to the web server. Port 80 is open too, only to redirect to 443.", he: "עובר לשרת האתר. גם פורט 80 פתוח, רק כדי להפנות ל-443." },
      },
      {
        from: "x", to: "f", label: "TCP :5432 from 203.0.113.50",
        say: { en: "A scanner, which knocks on every port all day, tries the Postgres port.", he: "סורק, שדופק על כל הפורטים כל היום, מנסה את הפורט של Postgres." },
      },
      {
        from: "f", to: "f", label: "no rule for :5432 → drop", tone: "ok",
        say: { en: "No rule opens 5432 to the internet, so the packet is simply dropped. Closed unless opened.", he: "שום כלל לא פותח את 5432 לאינטרנט, אז המנה פשוט נזרקת. סגור אלא אם נפתח." },
      },
      {
        from: "f", to: "f", label: "+ allow :5432 from 0.0.0.0/0", tone: "err",
        say: { en: "23:10. You can't reach the DB from home, and the agent adds this rule. It works in eleven seconds.", he: "23:10. אתם לא מצליחים להגיע למסד מהבית, והסוכן מוסיף את הכלל הזה. זה עובד תוך 11 שניות." },
      },
      {
        from: "x", to: "d", label: "login postgres / postgres ✗ ×1900", tone: "err",
        say: { en: "37 minutes later scanners find it and start guessing passwords. Only the password is left between them and the data.", he: "37 דקות אחר כך סורקים מוצאים אותו ומתחילים לנחש סיסמאות. רק הסיסמה נשארה בינם לבין הנתונים." },
      },
      {
        from: "f", to: "f", label: "5432 from sg-app only", tone: "ok",
        body: ["- 5432 from 0.0.0.0/0", "+ 5432 from sg-0a1b… (app servers)"],
        say: { en: "The fix: delete that rule. 5432 opens only to the app servers' security group, by id, never to a range.", he: "התיקון: מוחקים את הכלל. 5432 נפתח רק ל-security group של שרתי האפליקציה, לפי id, אף פעם לא לטווח כתובות." },
      },
      {
        from: "s", to: "d", label: "TCP :5432 from sg-app ✓", tone: "ok",
        say: { en: "The app still reaches its database. Everyone else hits a closed door again.", he: "האפליקציה עדיין מגיעה למסד שלה. כל השאר שוב נתקלים בדלת סגורה." },
      },
    ],
  },
};
