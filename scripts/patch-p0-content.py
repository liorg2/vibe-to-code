# one-shot: patch data/course.json with P0 critique quizzes, project gates,
# failure-mode AI terms, and UI strings. idempotent where practical.
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PATH = ROOT / "data" / "course.json"

L = lambda en, he: {"en": en, "he": he}


def q(en_q, he_q, answers, c, en_why, he_why):
    return {
        "q": L(en_q, he_q),
        "a": [L(a[0], a[1]) for a in answers],
        "c": c,
        "why": L(en_why, he_why),
    }


# module_id -> critique question (appended if marker not already present)
CRITIQUE = {
    "ground": q(
        "The AI says your crash on the server is 'probably a hardware issue' and rewrites half the app. What should you do first?",
        "ה-AI אומר שהקריסה בשרת היא 'כנראה בעיית חומרה' ומתחיל לשכתב חצי אפליקציה. מה לעשות קודם?",
        [
            ("Accept the rewrite — hardware issues need big changes", "לקבל את השכתוב — בעיות חומרה דורשות שינוי גדול"),
            ("Compare runtime, env vars, and config between laptop and server before changing code", "להשוות runtime, משתני סביבה וקונפיג בין המחשב לשרת לפני שינוי קוד"),
            ("Delete the server and redeploy from scratch", "למחוק את השרת ולהעלות מחדש מאפס"),
            ("Ask the AI to optimize GPU usage", "לבקש מה-AI לייעל שימוש ב-GPU"),
        ],
        1,
        "Same code, different environment is almost never 'hardware'. Force the AI to inspect env/runtime first — blast radius stays small.",
        "אותו קוד, סביבה שונה כמעט אף פעם לא 'חומרה'. מכריחים את ה-AI לבדוק env/runtime קודם — רדיוס הנזק נשאר קטן.",
    ),
    "vcs": q(
        "The AI commits a 'quick fix' with message 'updates' that also rewrites .env.example and deletes a migration. What's wrong?",
        "ה-AI עושה commit עם ההודעה 'updates' שגם משכתב .env.example ומוחק migration. מה הבעיה?",
        [
            ("Nothing — short commit messages are fine", "כלום — הודעות קצרות בסדר"),
            ("The diff mixes unrelated, high-risk changes; reject and split/revert", "ה-diff מערבב שינויים לא קשורים ומסוכנים; לדחות, לפצל או לבטל"),
            ("You should force-push to clean history", "צריך force-push כדי לנקות היסטוריה"),
            ("Migrations should always be deleted after apply", "תמיד מוחקים migrations אחרי הרצה"),
        ],
        1,
        "Read the whole diff. Unrelated high-risk files in one 'quick fix' is how secrets and schema history die.",
        "קוראים את כל ה-diff. קבצים מסוכנים לא קשורים ב-'תיקון מהיר' אחד הם איך סודות והיסטוריית סכמה מתים.",
    ),
    "sides": q(
        "AI hid the Delete button for non-admins in React and says 'auth is done'. Is it?",
        "ה-AI הסתיר את כפתור המחיקה למי שאינו אדמין ב-React ואומר ש'האימות הושלם'. האם זה נכון?",
        [
            ("Yes — if they can't click it, they're safe", "כן — אם אי אפשר ללחוץ, זה בטוח"),
            ("No — the API must reject unauthorized deletes on the server", "לא — ה-API חייב לדחות מחיקות לא מורשות בשרת"),
            ("Yes, if the button is also grayed out", "כן, אם הכפתור גם אפור"),
            ("Only HTTPS matters for auth", "רק HTTPS קובע לאימות"),
        ],
        1,
        "UI is not a security boundary. Anyone can call the endpoint directly.",
        "הממשק אינו גבול אבטחה. כל אחד יכול לקרוא ל-endpoint ישירות.",
    ),
    "langs": q(
        "AI 'fixes' a TypeScript error by adding `as any` on a payment amount. What do you check?",
        "ה-AI 'מתקן' שגיאת TypeScript עם `as any` על סכום תשלום. מה בודקים?",
        [
            ("Ship it — types were blocking progress", "לשלוח — הטיפוסים חסמו התקדמות"),
            ("Whether the cast hides a real mismatch that could corrupt money math", "האם ה-cast מסתיר אי-התאמה אמיתית שעלולה לשבש חישובי כסף"),
            ("Replace TypeScript with Python", "להחליף TypeScript ב-Python"),
            ("Disable the typechecker in CI", "לכבות את בודק הטיפוסים ב-CI"),
        ],
        1,
        "`as any` silences the compiler; it does not fix the bug. On money paths, that silence is the bug.",
        "`as any` משתיק את הקומפיילר; הוא לא מתקן את הבאג. בנתיבי כסף, ההשתקה היא הבאג.",
    ),
    "frontend": q(
        "AI stores the user's session token in localStorage and logs it to the console 'for debugging'. Critique?",
        "ה-AI שומר את ה-token ב-localStorage ומדפיס אותו לקונסול 'לדיבאג'. מה הביקורת?",
        [
            ("Fine for MVP", "בסדר ל-MVP"),
            ("Tokens in localStorage + console are easy XSS/leak targets; keep secrets out of the client log", "טוקנים ב-localStorage ובקונסול חשופים ל-XSS/דליפה; סודות לא נכנסים ללוג בצד לקוח"),
            ("Console logs are encrypted", "לוגי קונסול מוצפנים"),
            ("localStorage is safer than httpOnly cookies", "localStorage בטוח יותר מ-cookies עם httpOnly"),
        ],
        1,
        "Client storage and console are hostile. Prefer httpOnly cookies; never log secrets.",
        "אחסון לקוח וקונסול הם שטח עוין. מעדיפים cookies עם httpOnly; לא מדפיסים סודות.",
    ),
    "http": q(
        "AI changes a GET /orders/:id endpoint to also cancel the order 'to save a round trip'. What's the flaw?",
        "ה-AI משנה GET /orders/:id כך שיבטל גם את ההזמנה 'כדי לחסוך round trip'. מה הפגם?",
        [
            ("Great optimization", "אופטימיזציה מעולה"),
            ("GET must not change state — prefetch, crawlers, and retries will cancel orders", "GET לא משנה מצב — prefetch, crawlers וניסיונות חוזרים יבטלו הזמנות"),
            ("Only POST can read data", "רק POST יכול לקרוא נתונים"),
            ("IDs in URLs are illegal", "מזהים ב-URL אסורים"),
        ],
        1,
        "Safe methods stay safe. Side effects belong on POST/PATCH/DELETE.",
        "מתודות בטוחות נשארות בטוחות. תופעות לוואי שייכות ל-POST/PATCH/DELETE.",
    ),
    "apis": q(
        "AI adds `import { charge } from 'stripe-helper-v4'` which isn't in package.json and isn't a real package. Next step?",
        "ה-AI מוסיף `import { charge } from 'stripe-helper-v4'` שלא ב-package.json ואינו חבילה אמיתית. הצעד הבא?",
        [
            ("npm install stripe-helper-v4 immediately", "npm install stripe-helper-v4 מיד"),
            ("Reject — verify the library name/version yourself; this is package hallucination", "לדחות — לאמת שם/גרסת ספרייה בעצמך; זו הזיית חבילה"),
            ("Trust AI; it knows the ecosystem", "לסמוך על ה-AI; הוא מכיר את האקוסיסטם"),
            ("Copy the import into five more files", "להעתיק את ה-import לעוד חמישה קבצים"),
        ],
        1,
        "Never install a name you did not verify. Hallucinated packages are a supply-chain footgun.",
        "לא מתקינים שם שלא אומת. חבילות מומצאות הן מלכודת שרשרת אספקה.",
    ),
    "data": q(
        "AI builds SQL with `WHERE name = '${userInput}'` and says it's fine because the UI validates input. Critique?",
        "ה-AI בונה SQL עם `WHERE name = '${userInput}'` ואומר שזה בסדר כי ה-UI מבצע ולידציה. ביקורת?",
        [
            ("UI validation is enough", "ולידציית UI מספיקה"),
            ("String-built SQL is injection risk — use parameterized queries; UI is not a boundary", "SQL מבניות מחרוזת = הזרקה — פרמטרים בלבד; UI אינו גבול"),
            ("Switch to Mongo and ignore SQL", "לעבור ל-Mongo ולהתעלם מ-SQL"),
            ("Escape by uppercasing the string", "לברוח ע\"י אותיות גדולות"),
        ],
        1,
        "Never concatenate user input into SQL. Parameters + server checks.",
        "לא מחברים קלט משתמש ל-SQL. פרמטרים + בדיקות בשרת.",
    ),
    "memory": q(
        "AI 'speeds up' a list by loading the entire customers table into an array on every request. What's wrong?",
        "ה-AI 'מאיץ' רשימה ע\"י טעינת כל טבלת הלקוחות למערך בכל בקשה. מה לא בסדר?",
        [
            ("Arrays are always faster than SQL", "מערכים תמיד מהירים יותר מ-SQL"),
            ("You're trading memory and latency for a fake speedup — page/filter in the database", "מחליפים זיכרון ולטנסי בזירוז מדומה — דפדוף/סינון במסד"),
            ("Do it in the browser instead", "לעשות את זה בדפדפן"),
            ("Disable garbage collection", "לכבות garbage collection"),
        ],
        1,
        "Pulling everything into process memory does not scale. Push filtering to the DB.",
        "למשוך הכול לזיכרון התהליך לא סקייל. דוחפים סינון למסד.",
    ),
    "cache": q(
        "AI caches user permissions forever in Redis after login 'for performance'. Risk?",
        "ה-AI שומר הרשאות משתמש ב-Redis לנצח אחרי login 'לביצועים'. סיכון?",
        [
            ("None — cache is always correct", "אין — cache תמיד נכון"),
            ("Stale grants: revoked access may keep working until TTL/invalidation exists", "הרשאות מיושנות: גישה שבוטלה עלולה להמשיך עד TTL/ביטול מטמון"),
            ("Redis cannot store booleans", "Redis לא יכול לשמור boolean"),
            ("You must cache passwords too", "חובה לשמור גם סיסמאות במטמון"),
        ],
        1,
        "Cached auth without invalidation is a security bug wearing a performance costume.",
        "מטמון הרשאות בלי ביטול הוא באג אבטחה בתחפושת ביצועים.",
    ),
    "testing": q(
        "AI marks a failing test as `.skip` and says 'green CI'. What do you do?",
        "ה-AI מסמן בדיקה כושלת כ-`.skip` ואומר 'CI ירוק'. מה עושים?",
        [
            ("Merge — green is green", "למזג — ירוק זה ירוק"),
            ("Reject — a skipped red test hides a real bug; fix or quarantine with a tracked issue", "לדחות — בדיקה אדומה שדולגה מסתירה באג; לתקן או להסגר עם טיקט"),
            ("Delete the test file", "למחוק את קובץ הבדיקות"),
            ("Lower the coverage threshold to 0", "להוריד סף כיסוי ל-0"),
        ],
        1,
        "Never let a red test stay quietly red. Skip without a ticket is lying to yourself.",
        "לא משאירים בדיקה אדומה בשקט. skip בלי טיקט הוא שקר לעצמך.",
    ),
    "async": q(
        "AI processes payment webhooks with `fire-and-forget` and no idempotency key. Critique?",
        "ה-AI מעבד webhooks של תשלום ב-fire-and-forget בלי מפתח idempotency. ביקורת?",
        [
            ("Faster is better for payments", "מהיר יותר זה טוב יותר לתשלומים"),
            ("Retries will double-charge — need idempotent handling and durable queue/status", "ניסיונות חוזרים יחייבו פעמיים — צריך טיפול idempotent ותור/סטטוס עמיד"),
            ("Webhooks never retry", "Webhooks אף פעם לא מנסים שוב"),
            ("Put the webhook secret in the URL", "לשים את סוד ה-webhook ב-URL"),
        ],
        1,
        "At-least-once delivery is the default. Idempotency is mandatory for money events.",
        "משלוח לפחות פעם אחת הוא ברירת המחדל. Idempotency חובה לאירועי כסף.",
    ),
    "auth": q(
        "AI adds `if (user.role === 'admin')` only in the React page and leaves the API open. What's missing?",
        "ה-AI מוסיף `if (user.role === 'admin')` רק בעמוד React ומשאיר את ה-API פתוח. מה חסר?",
        [
            ("A nicer CSS badge", "תג CSS יפה יותר"),
            ("Server-side authorization on every sensitive action", "הרשאה בצד שרת על כל פעולה רגישה"),
            ("More client-side ifs", "עוד if בצד לקוח"),
            ("Storing the admin password in localStorage", "שמירת סיסמת אדמין ב-localStorage"),
        ],
        1,
        "Authorization lives on the server. Client checks are UX only.",
        "הרשאות חיות בשרת. בדיקות לקוח הן רק UX.",
    ),
    "security": q(
        "AI puts `STRIPE_SECRET_KEY` in a Next.js file marked `'use client'` so 'the browser can charge cards'. Stop — why?",
        "ה-AI שם `STRIPE_SECRET_KEY` בקובץ Next עם `'use client'` כדי ש'הדפדפן יחייב כרטיסים'. עצור — למה?",
        [
            ("Client bundles are fine for secrets", "באנדל לקוח בסדר לסודות"),
            ("Secrets in client code are public — charge only from the server", "סודות בקוד לקוח הם ציבוריים — חיוב רק מהשרת"),
            ("Rename the variable to hide it", "לשנות שם משתנה כדי להסתיר"),
            ("Use HTTP instead of HTTPS", "להשתמש ב-HTTP במקום HTTPS"),
        ],
        1,
        "Anything shipped to the browser is public. Secrets stay server-side.",
        "כל מה שנשלח לדפדפן הוא ציבורי. סודות נשארים בשרת.",
    ),
    "net": q(
        "AI 'fixes' HTTPS by setting `rejectUnauthorized: false` because the cert failed. Critique?",
        "ה-AI 'מתקן' HTTPS עם `rejectUnauthorized: false` כי התעודה נכשלה. ביקורת?",
        [
            ("Correct — certificates are optional", "נכון — תעודות אופציונליות"),
            ("You disabled TLS verification — fix the cert/DNS instead of accepting MitM", "כיביתם אימות TLS — לתקן תעודה/DNS במקום לקבל MitM"),
            ("Always disable TLS in production", "תמיד מכבים TLS בפרודקשן"),
            ("HTTP/2 requires this flag", "HTTP/2 דורש את הדגל הזה"),
        ],
        1,
        "Turning off cert checks is not a fix; it is an attack surface.",
        "כיבוי בדיקת תעודות אינו תיקון; זה משטח תקיפה.",
    ),
    "cloud": q(
        "AI leaves a debug VM + open SSH on 0.0.0.0 after 'quick deploy' and says you're done. What's wrong?",
        "ה-AI משאיר VM לדיבאג עם SSH פתוח על 0.0.0.0 אחרי 'דיפלוי מהיר' ואומר שסיימת. מה לא בסדר?",
        [
            ("Open SSH is best practice", "SSH פתוח הוא best practice"),
            ("Forgotten cloud resources and open admin ports burn money and invite attackers", "משאבי ענן שנשכחו ופורטי ניהול פתוחים שורפים כסף ומזמינים תוקפים"),
            ("VMs cannot be deleted", "אי אפשר למחוק VMs"),
            ("Bill only starts after a year", "החיוב מתחיל רק אחרי שנה"),
        ],
        1,
        "Tear down what you don't need. Open admin ports are an incident waiting.",
        "מפרקים מה שלא צריך. פורטי ניהול פתוחים הם תקלה שמחכה.",
    ),
    "devops": q(
        "AI edits an already-applied migration file to 'fix a column' instead of adding a new migration. Risk?",
        "ה-AI עורך קובץ migration שכבר רץ כדי 'לתקן עמודה' במקום migration חדש. סיכון?",
        [
            ("Fine if you force it", "בסדר אם כופים"),
            ("Environments diverge — history lies; add a new migration forward", "סביבות מתפצלות — ההיסטוריה משקרת; מוסיפים migration חדש קדימה"),
            ("Delete the database nightly", "מוחקים את המסד כל לילה"),
            ("Migrations are only for local use", "Migrations רק לשימוש מקומי"),
        ],
        1,
        "Never edit a migration that already ran. Forward-only fixes keep envs honest.",
        "לא עורכים migration שכבר רץ. תיקונים רק קדימה שומרים על כנות הסביבות.",
    ),
    "observe": q(
        "AI logs full request bodies including passwords and card numbers 'for debugging prod'. Critique?",
        "ה-AI כותב ללוג גופי בקשה מלאים כולל סיסמאות ומספרי כרטיס 'לדיבאג בפרוד'. ביקורת?",
        [
            ("More logs are always better", "יותר לוגים תמיד טוב יותר"),
            ("PII/secrets in logs are a breach waiting — redact and sample", "PII/סודות בלוגים הם דליפה שמחכה — redact ודגימה"),
            ("Logs are private by physics", "לוגים פרטיים לפי חוקי הפיזיקה"),
            ("Only log in the browser", "רק לוג בדפדפן"),
        ],
        1,
        "Observability without redaction leaks the customer. Scrub secrets and PII.",
        "Observability בלי redaction דולף את הלקוח. מנקים סודות ו-PII.",
    ),
    "scale": q(
        "AI copies the user session into the local disk of one container so 'sticky sessions aren't needed'. Flaw?",
        "ה-AI מעתיק את ה-session לדיסק מקומי של קונטיינר אחד כדי ש'לא צריך sticky sessions'. פגם?",
        [
            ("Disk is the best session store", "דיסק הוא מאגר ה-session הטוב ביותר"),
            ("Next request may hit another instance — state on local disk vanishes; use shared store", "הבקשה הבאה עלולה לפגוע ב-instance אחר — מצב בדיסק המקומי נעלם; מאגר משותף"),
            ("Containers never restart", "קונטיינרים אף פעם לא עולים מחדש"),
            ("Scale means one giant machine", "סקייל אומר מכונה אחת ענקית"),
        ],
        1,
        "Local disk/process state does not survive scale-out. Shared session/store required.",
        "מצב בדיסק/תהליך מקומי לא שורד scale-out. צריך מאגר משותף.",
    ),
    "team": q(
        "AI opens a 2,000-line PR titled 'stuff' with no description and asks you to merge before lunch. Critique?",
        "ה-AI פותח PR של 2,000 שורות בשם 'stuff' בלי תיאור ומבקש למזג לפני הצהריים. ביקורת?",
        [
            ("Large PRs are impressive", "PR גדולים מרשימים"),
            ("Unreviewable blast radius — split, describe intent, and keep diffs readable", "רדיוס נזק שאי אפשר לסקור — לפצל, לתאר כוונה, לשמור diffs קריאים"),
            ("Skip review for AI PRs", "מדלגים על סקירה ל-PR של AI"),
            ("Merge to main from the laptop only", "ממזגים ל-main רק מהלפטופ"),
        ],
        1,
        "If you cannot read it, you cannot own it. Small PRs with intent beat 'stuff'.",
        "אם אי אפשר לקרוא, אי אפשר לקחת בעלות. PR קטנים עם כוונה מנצחים את 'stuff'.",
    ),
    "ai": q(
        "The AI has 'fixed' the same auth bug five times; each patch adds more code and the bug remains. Best move?",
        "ה-AI 'תיקן' את אותו באג auth חמש פעמים; כל תיקון מוסיף קוד והבאג נשאר. הצעד הכי טוב?",
        [
            ("Ask for a sixth, bigger patch", "לבקש תיקון שישי גדול יותר"),
            ("Stop — revert to last good commit, kill the thread, restate the failure with evidence", "לעצור — לחזור ל-commit טוב אחרון, להרוג את ה-thread, לנסח מחדש את הכשל עם ראיות"),
            ("Disable auth entirely", "לכבות auth לגמרי"),
            ("Accept all five patches at once", "לקבל את כל חמשת התיקונים יחד"),
        ],
        1,
        "Endless fix loops mean the model is lost. Fresh thread + clearer evidence beats more patches.",
        "לולאות תיקון אינסופיות אומרות שהמודל אבוד. thread חדש + ראיות ברורות מנצחים עוד פאטצ'ים.",
    ),
}

MARKER = "CRITIQUE_AI_V1"  # stored in why.en prefix once — for idempotency we check q text patterns


def ensure_critique(course: dict) -> int:
    added = 0
    for mid, question in CRITIQUE.items():
        qs = course["QUIZ"].setdefault(mid, [])
        # idempotent: skip if same English question already present
        if any(x.get("q", {}).get("en") == question["q"]["en"] for x in qs):
            continue
        qs.append(question)
        added += 1
    # any QUIZ keys not in CRITIQUE — still add a generic one
    for mid in list(course["QUIZ"].keys()):
        if mid in CRITIQUE:
            continue
        qs = course["QUIZ"][mid]
        generic = q(
            f"[{mid}] The AI produced a large change that 'looks fine' but you did not read the diff. What do you do?",
            f"[{mid}] ה-AI ייצר שינוי גדול שנראה בסדר אבל לא קראתם את ה-diff. מה עושים?",
            [
                ("Accept — the summary is enough", "לקבל — הסיכום מספיק"),
                ("Reject until you read the diff and can explain the change", "לדחות עד שתקראו את ה-diff ותוכלו להסביר את השינוי"),
                ("Ask for more files to change", "לבקש לשנות עוד קבצים"),
                ("Disable reviews", "לכבות סקירות"),
            ],
            1,
            "Never accept a change you have not read. The summary is written by the same agent that made the change.",
            "אף פעם לא מקבלים שינוי שלא נקרא. הסיכום נכתב ע\"י אותו סוכן שביצע את השינוי.",
        )
        if not any(x.get("q", {}).get("en") == generic["q"]["en"] for x in qs):
            qs.append(generic)
            added += 1
    return added


PROJECT_GATES = {
    1: (
        L(
            "Write your done-when: what exactly is in scope for this CRM, and what is explicitly out?",
            "כתבו done-when: מה בדיוק בתוך הסקופ של ה-CRM, ומה במפורש בחוץ?",
        ),
        [
            L("I wrote a one-page scope that a stranger could follow", "כתבתי עמוד סקופ שאדם זר יכול לעקוב אחריו"),
            L("Out-of-scope items are listed, not vague", "פריטים מחוץ לסקופ רשומים, לא מעורפלים"),
            L("I resisted adding 'just one more feature'", "התנגדתי להוסיף 'עוד פיצ'ר אחד'"),
        ],
    ),
    2: (
        L(
            "Done when: repo exists, Next.js app runs locally, and a live URL is reachable.",
            "Done when: יש ריפו, Next.js רץ מקומית, ויש URL חי שנגיש.",
        ),
        [
            L("I opened the live URL myself", "פתחתי את ה-URL החי בעצמי"),
            L("I checked the git remote and first commit", "בדקתי remote ו-commit ראשון"),
            L("I know which env the deploy uses", "אני יודע באיזו סביבה הדיפלוי רץ"),
        ],
    ),
    3: (
        L(
            "Done when: Postgres is connected and the contact schema matches what you intended.",
            "Done when: Postgres מחובר וסכמת אנשי הקשר תואמת למה שתכננתם.",
        ),
        [
            L("I inspected the tables/columns (not only the AI summary)", "בדקתי טבלאות/עמודות (לא רק סיכום AI)"),
            L("Migrations are forward-only; I did not edit applied history", "Migrations רק קדימה; לא ערכתי היסטוריה שכבר רצה"),
            L("Connection string is not in the client bundle", "מחרוזת החיבור לא בבאנדל הלקוח"),
        ],
    ),
    4: (
        L(
            "Done when: the contacts list page loads real rows from the database.",
            "Done when: עמוד רשימת אנשי הקשר טוען שורות אמיתיות מהמסד.",
        ),
        [
            L("I loaded the list in the browser with real data", "טענתי את הרשימה בדפדפן עם נתונים אמיתיים"),
            L("I skimmed the query/API diff for surprises", "עברתי על diff של query/API להפתעות"),
            L("Empty state does not look like an error crash", "מצב ריק לא נראה כמו קריסת שגיאה"),
        ],
    ),
    5: (
        L(
            "Done when: search returns expected matches and you know which index supports it.",
            "Done when: חיפוש מחזיר התאמות צפויות ואתם יודעים איזה אינדקס תומך בזה.",
        ),
        [
            L("I tried a search that should hit and one that should miss", "ניסיתי חיפוש שצריך לפגוע ואחד שצריך להחטיא"),
            L("I confirmed an index exists for the filter path", "אישרתי שקיים אינדקס לנתיב הסינון"),
            L("I did not load the whole table into memory to 'search'", "לא טענתי את כל הטבלה לזיכרון כדי 'לחפש'"),
        ],
    ),
    6: (
        L(
            "Done when: create and edit persist correctly and validation errors are visible.",
            "Done when: יצירה ועריכה נשמרות נכון ושגיאות ולידציה גלויות.",
        ),
        [
            L("I created and edited a contact end-to-end", "יצרתי וערכתי איש קשר מקצה לקצה"),
            L("Server rejects bad input (not only the UI)", "השרת דוחה קלט רע (לא רק ה-UI)"),
            L("I read the mutation/API diff", "קראתי את ה-diff של ה-mutation/API"),
        ],
    ),
    7: (
        L(
            "Done when: notes appear on a contact timeline in order and survive refresh.",
            "Done when: הערות מופיעות בטיימליין של איש קשר בסדר ושורדות רענון.",
        ),
        [
            L("I added two notes and refreshed", "הוספתי שתי הערות ורעננתי"),
            L("Ordering matches what I expect", "הסדר תואם למה שציפיתי"),
            L("Notes are scoped to the contact (no bleed)", "הערות שייכות לאיש הקשר (בלי דליפה)"),
        ],
    ),
    8: (
        L(
            "Done when: login works and a user cannot read/write another user's contacts.",
            "Done when: login עובד ומשתמש לא יכול לקרוא/לכתוב אנשי קשר של אחר.",
        ),
        [
            L("I tested with two users (or two sessions)", "בדקתי עם שני משתמשים (או שני sessions)"),
            L("API enforces ownership — not only hidden buttons", "ה-API אוכף בעלות — לא רק כפתורים מוסתרים"),
            L("No secrets landed in the client bundle", "שום סוד לא נחת בבאנדל הלקוח"),
        ],
    ),
    9: (
        L(
            "Done when: preview deploy works and preview DB is not production.",
            "Done when: preview deploy עובד ומסד ה-preview אינו פרודקשן.",
        ),
        [
            L("I opened a preview URL from a branch/PR", "פתחתי URL של preview מענף/PR"),
            L("Preview env vars / DB are separate from prod", "משתני/מסד preview מופרדים מפרוד"),
            L("I know how to tear the preview down", "אני יודע איך לפרק את ה-preview"),
        ],
    ),
    10: (
        L(
            "Done when: meaningful tests run in CI and a red test blocks merge.",
            "Done when: בדיקות משמעותיות רצות ב-CI ובדיקה אדומה חוסמת מיזוג.",
        ),
        [
            L("I saw CI run on a push/PR", "ראיתי CI רץ על push/PR"),
            L("At least one test would catch a real break", "לפחות בדיקה אחת תתפוס שבירה אמיתית"),
            L("I did not skip failing tests to go green", "לא דילגתי על בדיקות כושלות כדי להיות ירוק"),
        ],
    ),
    11: (
        L(
            "Done when: custom domain resolves and HTTPS padlock works.",
            "Done when: דומיין מותאם נפתר והמנעול של HTTPS עובד.",
        ),
        [
            L("I opened the site on the custom domain", "פתחתי את האתר על הדומיין המותאם"),
            L("Certificate is valid (no click-through warnings)", "התעודה תקפה (בלי אזהרות)"),
            L("I did not disable TLS verification to 'make it work'", "לא כיביתי אימות TLS כדי 'שיעבוד'"),
        ],
    ),
    12: (
        L(
            "Done when: errors are visible, one alert fires on a real failure, and you know the bill drivers.",
            "Done when: שגיאות גלויות, התראה אחת עובדת על כשל אמיתי, ואתם יודעים מה מניע את החשבון.",
        ),
        [
            L("I triggered a safe error and saw it in logs/alerts", "יצרתי שגיאה בטוחה וראיתי אותה בלוגים/התראות"),
            L("PII/secrets are not dumped raw into logs", "PII/סודות לא נשפכים גולמיים ללוגים"),
            L("I checked cost/usage so nothing forgotten is burning money", "בדקתי עלות/שימוש כדי ששום דבר שנשכח לא שורף כסף"),
        ],
    ),
}


def ensure_project_gates(course: dict) -> None:
    for step in course["PROJECT"]["steps"]:
        n = step["n"]
        acc, verify = PROJECT_GATES[n]
        step["acceptance"] = acc
        step["verify"] = verify


NEW_TERMS = [
    {
        "t": L("Endless fix loop", "לולאת תיקון אינסופית"),
        "d": L(
            "The AI keeps patching the same bug; each fix adds code and the failure remains.",
            "ה-AI ממשיך לתקן את אותו באג; כל תיקון מוסיף קוד והכשל נשאר.",
        ),
        "w": L(
            "More patches are not progress. Stop, revert, and restate the problem with evidence.",
            "עוד פאטצ'ים אינם התקדמות. עוצרים, חוזרים אחורה, ומנסחים מחדש עם ראיות.",
        ),
    },
    {
        "t": L("Kill the thread", "להרוג את ה-thread"),
        "d": L(
            "When the chat is confused, start a fresh conversation with a clean summary of state.",
            "כשהשיחה מבולבלת, פותחים שיחה חדשה עם סיכום נקי של המצב.",
        ),
        "w": L(
            "Context rot makes the model defend bad paths. Fresh thread beats arguing with a lost session.",
            "רקבון הקשר גורם למודל להגן על נתיבים גרועים. thread חדש מנצח ויכוח עם session אבוד.",
        ),
    },
    {
        "t": L("Package hallucination", "הזיית חבילה"),
        "d": L(
            "The AI invents a library name or version that does not exist (or is not what you think).",
            "ה-AI ממציא שם או גרסת ספרייה שלא קיימים (או שאינם מה שחשבתם).",
        ),
        "w": L(
            "Never install a name you did not verify — same rule as the ship checklist.",
            "לא מתקינים שם שלא אומת — אותו כלל כמו בצ'קליסט לפני שיגור.",
        ),
    },
    {
        "t": L("Demo vs production", "דמו מול פרודקשן"),
        "d": L(
            "It works in the happy-path demo but fails under real users, data, auth, or load.",
            "זה עובד בדמו של הנתיב השמח אבל נכשל תחת משתמשים, נתונים, auth או עומס אמיתיים.",
        ),
        "w": L(
            "Demo success is not production readiness. Verify ownership, secrets, and failure paths.",
            "הצלחת דמו אינה מוכנות לפרודקשן. בודקים בעלות, סודות ונתיבי כשל.",
        ),
    },
]

SIMPLE_NEW = {
    "Endless fix loop": {
        "q": L(
            "Why is 'one more AI patch' sometimes the wrong move?",
            "למה 'עוד פאטץ' אחד מה-AI' לפעמים הצעד הלא נכון?",
        ),
        "s": L(
            "You are lost in a mall. Asking the same confused stranger for five more turns rarely helps. Step outside, look at a map, then ask again with clearer landmarks.",
            "אתם אבודים בקניון. לבקש מאותו זר מבולבל עוד חמישה כיוונים לעיתים רחוקות עוזר. יוצאים החוצה, מסתכלים על מפה, ואז שואלים שוב עם ציוני דרך ברורים.",
        ),
    },
    "Kill the thread": {
        "q": L(
            "The chat remembers the wrong diagnosis. Why start over?",
            "השיחה זוכרת אבחנה שגויה. למה להתחיל מחדש?",
        ),
        "s": L(
            "A meeting went off the rails. Restarting with a one-page agenda beats arguing inside the old digression.",
            "ישיבה יצאה מהמסלול. להתחיל מחדש עם אג'נדה בעמוד אחד מנצח ויכוח בתוך הסטייה הישנה.",
        ),
    },
    "Package hallucination": {
        "q": L(
            "The AI named a package confidently. Why not install it immediately?",
            "ה-AI נקב בשם חבילה בביטחון. למה לא להתקין מיד?",
        ),
        "s": L(
            "A stranger recommends a pharmacy that isn't on the map. You check the address before walking in — same for npm install.",
            "זר ממליץ על בית מרקחת שלא על המפה. בודקים כתובת לפני שנכנסים — אותו דבר ל-npm install.",
        ),
    },
    "Demo vs production": {
        "q": L(
            "The demo clapped. Why aren't you done?",
            "הדמו קיבל מחיאות כפיים. למה עדיין לא סיימתם?",
        ),
        "s": L(
            "A dress rehearsal with friendly actors is not opening night with a paying crowd. Production is opening night.",
            "חזרה גנרלית עם שחקנים ידידותיים אינה ערב בכורה עם קהל משלם. פרודקשן הוא ערב הבכורה.",
        ),
    },
}

DETAIL_NEW = {
    "Endless fix loop": L(
        "An endless fix loop is when each AI patch fails to address the real failure mode and adds complexity. Symptoms: growing diffs, shifting explanations, same error after 'fixes'. Recovery: revert to last known good, write the observed failure in your own words (expected vs actual + logs), start a fresh thread, and ask for one small change.",
        "לולאת תיקון אינסופית היא כשכל פאטץ' של AI לא מטפל בכשל האמיתי ומוסיף מורכבות. תסמינים: diffs גדלים, הסברים מתחלפים, אותה שגיאה אחרי 'תיקונים'. התאוששות: חזרה ל-commit טוב אחרון, ניסוח הכשל במילים שלכם, thread חדש, ושינוי קטן אחד.",
    ),
    "Kill the thread": L(
        "Long threads accumulate wrong assumptions. The model will defend earlier mistakes because they are now 'context'. Killing the thread means: summarize current files/errors, drop the chat, paste a clean brief. Pair with reading the diff — do not carry forward invisible wrong state.",
        "שיחות ארוכות צוברות הנחות שגויות. המודל יגן על טעויות קודמות כי הן כבר 'הקשר'. להרוג thread: לסכם קבצים/שגיאות, לסגור שיחה, להדביק בריף נקי. משלבים עם קריאת diff — לא סוחבים מצב שגוי סמוי.",
    ),
    "Package hallucination": L(
        "Models invent plausible package names. Installing them can fail, or worse, hit a typosquat. Rule from the ship checklist: never trust a library name or version you did not verify on the registry and in your lockfile. Prefer well-known libs you already use.",
        "מודלים ממציאים שמות חבילה סבירים. התקנה עלולה להיכשל, או גרוע יותר — typosquat. כלל מהצ'קליסט: לא סומכים על שם/גרסה שלא אומתו ב-registry וב-lockfile. מעדיפים ספריות מוכרות שכבר בשימוש.",
    ),
    "Demo vs production": L(
        "Demos hide auth holes, empty-data paths, concurrency, and cost. Production readiness means: ownership checks on the server, secrets off the client, migrations forward-only, alerts on real failures, and no forgotten cloud resources. Treat applause as a milestone, not a ship gate.",
        "דמו מסתיר חורי auth, נתיבי דאטה ריק, מקביליות ועלות. מוכנות לפרוד: בדיקות בעלות בשרת, סודות מחוץ ללקוח, migrations קדימה, התראות על כשלים אמיתיים, בלי משאבי ענן שנשכחו. מחיאות כפיים הן אבן דרך, לא שער שיגור.",
    ),
}

EXAMPLES_NEW = {
    "Endless fix loop": {
        "cap": L("Stop the loop", "לעצור את הלולאה"),
        "code": "# bad: \"fix again\" ×5\n# better:\n# 1) git checkout -- .\n# 2) New chat:\n# \"Auth still 401 on POST /notes after login.\n# Expected 201. Actual body: {...}.\n# Diff so far reverted. Propose ONE change.\"\n",
    },
    "Kill the thread": {
        "cap": L("Fresh brief", "בריף חדש"),
        "code": "New thread paste:\n- App: Next.js CRM, Neon Postgres\n- Broken: preview deploy 500 on /contacts\n- Log snippet: (paste)\n- Do NOT refactor unrelated files\n",
    },
    "Package hallucination": {
        "cap": L("Verify before install", "לאמת לפני התקנה"),
        "code": "# AI suggested: npm i stripe-helper-v4\n# You: open npmjs.com → search exact name\n# If missing / unknown publisher → reject\n# Use official 'stripe' instead\n",
    },
    "Demo vs production": {
        "cap": L("Demo checklist ≠ ship", "צ'קליסט דמו ≠ שיגור"),
        "code": "# Demo passed: happy path create contact\n# Still open:\n# [ ] other user cannot read my contacts (API)\n# [ ] no secrets in client bundle\n# [ ] alert on 5xx\n",
    },
}


def ensure_failure_terms(course: dict) -> int:
    ai = next(m for m in course["MODULES"] if m["id"] == "ai")
    existing = {t["t"]["en"] for t in ai["terms"]}
    added = 0
    for term in NEW_TERMS:
        name = term["t"]["en"]
        if name in existing:
            continue
        ai["terms"].append(term)
        existing.add(name)
        added += 1
    course["SIMPLE"].update(SIMPLE_NEW)
    course["DETAIL"].update(DETAIL_NEW)
    course["EXAMPLES"].update(EXAMPLES_NEW)
    return added


UI_NEW = {
    "practice": L("Practice the loop", "לתרגל את הלולאה"),
    "practiceSub": L(
        "Plan → ask AI → check the result. Skip this and the word stays trivia.",
        "תוכנית → לשאול AI → לבדוק תוצאה. מדלגים — והמילה נשארת טריוויה.",
    ),
    "practicePlan": L("1. Your one-line plan", "1. תוכנית במשפט אחד"),
    "practicePlanPh": L(
        "In one sentence, what should the AI do that needs this concept?",
        "במשפט אחד: מה ה-AI צריך לעשות שדורש את המושג הזה?",
    ),
    "practiceGo": L(
        "2. Ask AI (open Ask AI below and paste the prompt)",
        "2. לשאול AI (לפתוח Ask AI למטה ולהדביק את הפרומפט)",
    ),
    "practiceVerifyTitle": L("3. After the AI replies, check", "3. אחרי תשובת ה-AI, לסמן"),
    "practiceV1": L(
        "I can explain the change in one plain sentence",
        "אני יכול להסביר את השינוי במשפט פשוט אחד",
    ),
    "practiceV2": L(
        "I know what 'wrong' would look like (error, bad data, or missing check)",
        "אני יודע איך נראה 'לא נכון' (שגיאה, דאטה רע, או בדיקה חסרה)",
    ),
    "practiceV3": L(
        "I looked at the diff (or the exact output), not only the AI's summary",
        "הסתכלתי על ה-diff (או על הפלט המדויק), לא רק על סיכום ה-AI",
    ),
    "planGate": L("Done when…", "Done when…"),
    "planGateSub": L(
        "Write your acceptance line before the paste prompt unlocks.",
        "כותבים שורת קבלה לפני שפרומפט ההדבקה נפתח.",
    ),
    "planGatePh": L("This step is done when…", "השלב הזה הסתיים כאשר…"),
    "planGateUnlock": L("Unlock prompt", "לפתוח פרומפט"),
    "planGateLocked": L(
        "Write at least one clear sentence above to unlock the prompt.",
        "כותבים לפחות משפט ברור אחד למעלה כדי לפתוח את הפרומפט.",
    ),
    "verifyGate": L("Verify before next step", "לוודא לפני השלב הבא"),
    "verifyGateSub": L("Tick what you actually checked.", "מסמנים מה שבאמת בדקתם."),
}


def ensure_ui(course: dict) -> None:
    course["UI"].update(UI_NEW)


def assert_ok(course: dict) -> None:
    for mid, qs in course["QUIZ"].items():
        assert len(qs) >= 6, f"{mid} quiz too short: {len(qs)}"
    for step in course["PROJECT"]["steps"]:
        assert "acceptance" in step and step["acceptance"].get("en"), step["n"]
        assert len(step.get("verify") or []) == 3, step["n"]
    ai = next(m for m in course["MODULES"] if m["id"] == "ai")
    names = {t["t"]["en"] for t in ai["terms"]}
    for n in ("Endless fix loop", "Kill the thread", "Package hallucination", "Demo vs production"):
        assert n in names, n
        assert n in course["SIMPLE"] and n in course["DETAIL"] and n in course["EXAMPLES"], n
    for k in UI_NEW:
        assert k in course["UI"], k
    print("OK", {
        "quiz_modules": len(course["QUIZ"]),
        "ai_terms": len(ai["terms"]),
        "project_steps": len(course["PROJECT"]["steps"]),
        "ui_keys_added": len(UI_NEW),
    })


def main() -> None:
    course = json.loads(PATH.read_text(encoding="utf-8"))
    n_q = ensure_critique(course)
    ensure_project_gates(course)
    n_t = ensure_failure_terms(course)
    ensure_ui(course)
    assert_ok(course)
    PATH.write_text(json.dumps(course, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"wrote {PATH} critique+={n_q} terms+={n_t}")


if __name__ == "__main__":
    main()
