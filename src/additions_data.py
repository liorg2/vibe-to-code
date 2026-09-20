# -*- coding: utf-8 -*-
"""Gaps found by the research pass: a Testing module + terms bolted onto existing modules."""

# ---- new module, inserted after Languages (research ranked this the #1 gap) ----
TESTING_MODULE = {
 "id": "testing", "icon": "✓",
 "title": {"en": "Testing & Confidence", "he": "בדיקות וביטחון"},
 "blurb": {"en": "The only thing standing between you and an agent quietly breaking working code.",
           "he": "הדבר היחיד שעומד בינך לבין סוכן ששובר בשקט קוד שעבד."},
 "terms": [
  {"t": {"en": "Test", "he": "בדיקה"},
   "d": {"en": "Code that runs your code and fails loudly if the result is not what you said it should be.",
         "he": "קוד שמריץ את הקוד שלך ונכשל ברעש אם התוצאה אינה מה שאמרת שהיא צריכה להיות."},
   "w": {"en": "It is the only form of checking that still works at 3am, on someone else's machine, six months from now.",
         "he": "זו צורת הבדיקה היחידה שעדיין עובדת בשלוש לפנות בוקר, על מכונה של מישהו אחר, בעוד חצי שנה."}},
  {"t": {"en": "Assertion", "he": "טענה (Assertion)"},
   "d": {"en": "The single line that states the expectation: this value must equal that one, or the test fails.",
         "he": "השורה הבודדת שמצהירה על הציפייה: הערך הזה חייב להיות שווה לזה, אחרת הבדיקה נכשלת."},
   "w": {"en": "A test with no assertion passes forever and proves nothing. It happens more often than you would think.",
         "he": "בדיקה בלי טענה עוברת לנצח ולא מוכיחה כלום. זה קורה יותר ממה שנדמה."}},
  {"t": {"en": "Unit / Integration / E2E", "he": "יחידה / אינטגרציה / קצה לקצה"},
   "d": {"en": "Unit: one function alone. Integration: several parts together, with a real database. E2E: the whole app through a browser, like a user.",
         "he": "יחידה: פונקציה אחת לבדה. אינטגרציה: כמה חלקים יחד, עם בסיס נתונים אמיתי. קצה לקצה: כל האפליקציה דרך דפדפן, כמו משתמש."},
   "w": {"en": "Each one is slower and more realistic than the last. You want many of the fast ones and a few of the slow ones.",
         "he": "כל אחת איטית ומציאותית יותר מקודמתה. אתה רוצה הרבה מהמהירות וכמה מהאיטיות."}},
  {"t": {"en": "Mock / Fixture", "he": "מוק / פיקסצ׳ר"},
   "d": {"en": "A mock is a fake stand-in for something real. A fixture is the known starting data a test runs against.",
         "he": "מוק הוא תחליף מזויף למשהו אמיתי. פיקסצ׳ר הוא נתוני הפתיחה הידועים שהבדיקה רצה מולם."},
   "w": {"en": "Mock the payment provider, not your own database. Mocking the thing you are testing is how a suite passes while the product is broken.",
         "he": "תזייף את ספק התשלומים, לא את בסיס הנתונים שלך. זיוף הדבר שאתה בודק הוא איך שחבילת בדיקות עוברת בזמן שהמוצר שבור."}},
  {"t": {"en": "Regression", "he": "רגרסיה"},
   "d": {"en": "Something that used to work and stopped. A regression test is one you add the moment you fix a bug, so it can never come back unnoticed.",
         "he": "משהו שעבד והפסיק. בדיקת רגרסיה היא כזו שמוסיפים ברגע שמתקנים באג, כדי שהוא לא יוכל לחזור בלי שישימו לב."},
   "w": {"en": "This is the highest-value test you will ever write, because it is provably about a mistake that has already been made once.",
         "he": "זו הבדיקה בעלת הערך הגבוה ביותר שתכתוב, כי היא מוכחת מול טעות שכבר נעשתה פעם אחת."}},
  {"t": {"en": "Coverage", "he": "כיסוי"},
   "d": {"en": "The percentage of your lines that some test executed. It measures what was run, not what was checked.",
         "he": "אחוז השורות שאיזושהי בדיקה הריצה. היא מודדת מה רץ, לא מה נבדק."},
   "w": {"en": "100% coverage with weak assertions proves nothing. Chase the risky paths — auth, money, deletion — not the number.",
         "he": "כיסוי של 100% עם טענות חלשות לא מוכיח כלום. תרדוף אחרי הנתיבים המסוכנים — הרשאות, כסף, מחיקה — לא אחרי המספר."}},
  {"t": {"en": "Flaky test", "he": "בדיקה הפכפכה"},
   "d": {"en": "A test that passes and fails on the same code, usually because of timing, ordering or shared state.",
         "he": "בדיקה שעוברת ונכשלת על אותו קוד, בדרך כלל בגלל תזמון, סדר או מצב משותף."},
   "w": {"en": "One flaky test teaches the team to ignore red. That is more damaging than having no test at all — fix it or delete it.",
         "he": "בדיקה הפכפכה אחת מלמדת את הצוות להתעלם מאדום. זה מזיק יותר מלא לבדוק בכלל — תתקן אותה או תמחק."}},
  {"t": {"en": "Test-first (TDD)", "he": "בדיקה קודם (TDD)"},
   "d": {"en": "Write the failing test that describes what you want, then make it pass.",
         "he": "כותבים את הבדיקה שנכשלת ומתארת את מה שרוצים, ואז גורמים לה לעבור."},
   "w": {"en": "With AI this stops being a philosophy and becomes a control: the test is the specification you hand the model, and the proof you check it against.",
         "he": "עם AI זו מפסיקה להיות פילוסופיה והופכת לשליטה: הבדיקה היא המפרט שאתה נותן למודל, וההוכחה שאתה בודק מולה."}},
 ]
}

TESTING_DETAIL = {
"Test": {
 "en": "A test is an executable claim about behaviour. Its value is not that it proves your code is correct — it cannot — but that it detects the moment the behaviour changes without your intent.\n\nThat makes tests a change-safety tool more than a correctness tool. The question to ask of a test is not does this check something, it is would this have caught the mistake I am most afraid of.",
 "he": "בדיקה היא טענה ברת-הרצה על התנהגות. הערך שלה הוא לא שהיא מוכיחה שהקוד נכון — היא לא יכולה — אלא שהיא מזהה את הרגע שבו ההתנהגות משתנה בלי כוונה שלך.\n\nזה הופך בדיקות לכלי בטיחות לשינויים יותר מאשר לכלי נכונות. השאלה שצריך לשאול על בדיקה היא לא האם היא בודקת משהו, אלא האם היא הייתה תופסת את הטעות שאני הכי חושש ממנה."},
"Assertion": {
 "en": "The assertion is where all the meaning lives. Everything around it — setup, fixtures, helpers — exists only to make that one line possible.\n\nThe common weakness is asserting something trivially true: that a response arrived, that a list is an array, that no exception was thrown. Those pass whether or not the logic is right. Assert the thing you would actually be upset about.",
 "he": "הטענה היא המקום שבו כל המשמעות נמצאת. כל מה שסביבה — הכנה, נתוני פתיחה, פונקציות עזר — קיים רק כדי לאפשר את השורה האחת הזו.\n\nהחולשה הנפוצה היא לטעון משהו נכון טריוויאלית: שתגובה הגיעה, שרשימה היא מערך, שלא נזרקה שגיאה. אלה עוברות בין אם הלוגיקה נכונה ובין אם לא. תטען את הדבר שבאמת היית מתעצבן עליו."},
"Unit / Integration / E2E": {
 "en": "There is a trade-off along the whole range: the more realistic a test is, the slower it runs and the vaguer its failure message. A unit test tells you exactly which function is wrong; an end-to-end test tells you the checkout is broken somewhere.\n\nSo the shape most teams converge on is many fast tests, some integration tests around the risky boundaries, and a small number of end-to-end tests covering only the paths that generate revenue or lose data.",
 "he": "יש התלבטות לאורך כל הטווח: ככל שבדיקה מציאותית יותר, כך היא רצה לאט יותר והודעת הכשל שלה מעורפלת יותר. בדיקת יחידה אומרת לך בדיוק איזו פונקציה שגויה; בדיקת קצה לקצה אומרת לך שהתשלום שבור איפשהו.\n\nאז הצורה שרוב הצוותים מתכנסים אליה היא הרבה בדיקות מהירות, כמה בדיקות אינטגרציה סביב הגבולות המסוכנים, ומספר קטן של בדיקות קצה לקצה שמכסות רק את המסלולים שמייצרים הכנסה או מאבדים נתונים."},
"Mock / Fixture": {
 "en": "A mock replaces reality with your assumption about reality. When the assumption is right it saves enormous time; when it drifts from the real service, the suite goes green while production fails.\n\nThe rule of thumb: mock things you do not control and cannot run — payment providers, email, third-party APIs. Run the real thing for anything you own, especially the database, because most interesting bugs live exactly at that boundary.",
 "he": "מוק מחליף את המציאות בהנחה שלך לגבי המציאות. כשההנחה נכונה הוא חוסך זמן עצום; כשהיא נסחפת מהשירות האמיתי, חבילת הבדיקות ירוקה בזמן שהפרודקשן נכשל.\n\nכלל אצבע: תזייף דברים שאתה לא שולט בהם ולא יכול להריץ — ספקי תשלום, מייל, ממשקים חיצוניים. תריץ את האמיתי לכל מה שבבעלותך, במיוחד בסיס הנתונים, כי רוב הבאגים המעניינים חיים בדיוק בגבול הזה."},
"Regression": {
 "en": "Bugs cluster. The code that broke once is unusually likely to break again, because it is the code where the requirements were misunderstood in the first place.\n\nThat is why the fix-plus-test pattern compounds. Over time your suite becomes a precise record of everything your particular system has actually got wrong, which is far more valuable than a generic set of tests someone wrote from the specification.",
 "he": "באגים מתקבצים. קוד שנשבר פעם אחת נוטה במיוחד להישבר שוב, כי זה הקוד שבו הדרישות לא הובנו מלכתחילה.\n\nבגלל זה דפוס תיקון-ועוד-בדיקה מצטבר. עם הזמן חבילת הבדיקות שלך הופכת לתיעוד מדויק של כל מה שהמערכת הספציפית שלך באמת טעתה בו, וזה הרבה יותר בעל ערך מאוסף בדיקות גנרי שמישהו כתב מהמפרט."},
"Coverage": {
 "en": "Coverage is a map of what your tests visited, and it is genuinely useful read that way: a critical file at zero percent is a real finding.\n\nIt becomes harmful the moment it becomes a target. A team required to hit a number will write tests that execute lines without checking anything, and end up with a slower suite that provides exactly as much safety as before.",
 "he": "כיסוי הוא מפה של מה שהבדיקות שלך ביקרו בו, ובקריאה הזו הוא באמת מועיל: קובץ קריטי באפס אחוז הוא ממצא אמיתי.\n\nהוא הופך למזיק ברגע שהוא הופך ליעד. צוות שמחויב להגיע למספר יכתוב בדיקות שמריצות שורות בלי לבדוק כלום, ויסיים עם חבילה איטית יותר שנותנת בדיוק את אותה בטיחות כמו קודם."},
"Flaky test": {
 "en": "Flakiness is almost never randomness. It is an unstated dependency on time, on execution order, or on state left behind by another test — which means it is usually a real bug in disguise, one that will eventually appear in production as a race condition.\n\nThe damage is cultural as much as technical. Once people learn that red sometimes means nothing, red always means nothing, and the suite has stopped working even though it still runs.",
 "he": "הפכפכות היא כמעט אף פעם לא אקראיות. זו תלות לא מוצהרת בזמן, בסדר ההרצה, או במצב שבדיקה אחרת השאירה — כלומר בדרך כלל זה באג אמיתי בתחפושת, כזה שיופיע בסוף בפרודקשן כמצב מירוץ.\n\nהנזק תרבותי לא פחות מטכני. ברגע שאנשים לומדים שאדום לפעמים לא אומר כלום, אדום תמיד לא אומר כלום, והחבילה הפסיקה לעבוד למרות שהיא עדיין רצה."},
"Test-first (TDD)": {
 "en": "Writing the test first forces you to state the problem before solving it, in terms of observable behaviour rather than implementation. That alone catches a surprising number of misunderstandings while they are still free to fix.\n\nWith a model in the loop it becomes something stronger. The failing test is an unambiguous specification you can hand over, and an objective check on what comes back — you are no longer judging generated code by whether it looks reasonable.",
 "he": "כתיבת הבדיקה קודם מכריחה אותך לנסח את הבעיה לפני שאתה פותר אותה, במונחי התנהגות נצפית ולא מימוש. זה לבדו תופס מספר מפתיע של אי-הבנות בזמן שעדיין חינם לתקן אותן.\n\nעם מודל בתמונה זה הופך למשהו חזק יותר. הבדיקה שנכשלת היא מפרט חד-משמעי שאפשר למסור, ובדיקה אובייקטיבית על מה שחוזר — אתה כבר לא שופט קוד שנוצר לפי האם הוא נראה סביר."},
}

TESTING_QUIZ = [
 {"q": {"en": "Your test suite is green but the feature is broken in production. Most likely cause?",
        "he": "חבילת הבדיקות ירוקה אבל התכונה שבורה בפרודקשן. הסיבה הסבירה ביותר?"},
  "a": [{"en": "Coverage is below 100%", "he": "הכיסוי מתחת ל-100%"},
        {"en": "You mocked the thing that is actually broken", "he": "זייפת את הדבר שבאמת שבור"},
        {"en": "The tests run too fast", "he": "הבדיקות רצות מהר מדי"},
        {"en": "You have too many unit tests", "he": "יש לך יותר מדי בדיקות יחידה"}],
  "c": 1,
  "why": {"en": "A mock replaces reality with your assumption about it. If the assumption is what drifted, the suite is testing your belief, not your system.",
          "he": "מוק מחליף את המציאות בהנחה שלך לגביה. אם ההנחה היא מה שנסחף, החבילה בודקת את האמונה שלך, לא את המערכת."}},
 {"q": {"en": "A test fails about one run in ten, on unchanged code. What should you do?",
        "he": "בדיקה נכשלת בערך פעם בעשר הרצות, על קוד שלא השתנה. מה לעשות?"},
  "a": [{"en": "Add an automatic retry and move on", "he": "להוסיף ניסיון חוזר אוטומטי ולהמשיך"},
        {"en": "Fix it or delete it — it is training everyone to ignore red", "he": "לתקן או למחוק — היא מאמנת את כולם להתעלם מאדום"},
        {"en": "Ignore it, flaky tests are normal", "he": "להתעלם, בדיקות הפכפכות זה נורמלי"},
        {"en": "Increase the timeout until it passes", "he": "להגדיל את פסק הזמן עד שהיא עוברת"}],
  "c": 1,
  "why": {"en": "Flakiness is usually a hidden dependency on timing or shared state — a real race condition waiting to reach production. And a suite nobody trusts has stopped working.",
          "he": "הפכפכות היא בדרך כלל תלות נסתרת בתזמון או במצב משותף — מצב מירוץ אמיתי שמחכה להגיע לפרודקשן. וחבילה שאף אחד לא סומך עליה הפסיקה לעבוד."}},
 {"q": {"en": "Why is test-first especially useful when an AI writes the implementation?",
        "he": "למה בדיקה-קודם שימושית במיוחד כש-AI כותב את המימוש?"},
  "a": [{"en": "It makes the model generate faster", "he": "זה גורם למודל לייצר מהר יותר"},
        {"en": "The test is an unambiguous spec to hand over and an objective check on what comes back", "he": "הבדיקה היא מפרט חד-משמעי למסירה ובדיקה אובייקטיבית על מה שחוזר"},
        {"en": "It increases coverage automatically", "he": "זה מעלה כיסוי אוטומטית"},
        {"en": "It prevents hallucination entirely", "he": "זה מונע הזיות לחלוטין"}],
  "c": 1,
  "why": {"en": "Otherwise you are judging generated code by whether it looks reasonable — which is exactly the thing generated code is best at.",
          "he": "אחרת אתה שופט קוד שנוצר לפי האם הוא נראה סביר — וזה בדיוק הדבר שקוד שנוצר הכי טוב בו."}},
]

# ---- terms appended to existing modules: (module_id, term_dict, detail_dict) ----
EXTRA_TERMS = [
 ("ground", {
   "t": {"en": "Pull request & code review", "he": "Pull request וסקירת קוד"},
   "d": {"en": "A proposed change, shown as a diff, that someone reads and comments on before it joins the main line.",
         "he": "שינוי מוצע, מוצג כ-diff, שמישהו קורא ומעיר עליו לפני שהוא מצטרף לקו הראשי."},
   "w": {"en": "This is the single skill juniors are now measured on: reviewing AI output the way you would review another person's work.",
         "he": "זו המיומנות הבודדת שמודדים בה ג׳וניורים היום: לסקור פלט של AI כמו שסוקרים עבודה של אדם אחר."}},
  {"en": "A review is not quality control at the end, it is the moment a change stops being one person's private understanding. The comments are usually less valuable than the fact that a second person had to be able to follow it.\n\nWhat you look for is narrow and learnable: something deleted that nobody asked to delete, a new dependency, a changed default, a rule enforced in the wrong layer. Those four account for most of what slips through.",
   "he": "סקירה היא לא בקרת איכות בסוף, היא הרגע שבו שינוי מפסיק להיות ההבנה הפרטית של אדם אחד. ההערות בדרך כלל פחות בעלות ערך מהעובדה שאדם שני היה צריך להיות מסוגל לעקוב.\n\nמה שמחפשים הוא צר וניתן ללמידה: משהו שנמחק שאף אחד לא ביקש למחוק, תלות חדשה, ברירת מחדל שהשתנתה, וחוק שנאכף בשכבה הלא נכונה. ארבעת אלה אחראים לרוב מה שמחליק פנימה."}),

 ("http", {
   "t": {"en": "Webhook", "he": "Webhook"},
   "d": {"en": "The reverse of an API call: another service sends an HTTP POST to your URL when something happens on their side.",
         "he": "ההפך מקריאת API: שירות אחר שולח POST לכתובת שלך כשקורה משהו אצלו."},
   "w": {"en": "This is how every real integration works — payments, repos, messaging. You will build one sooner than you expect.",
         "he": "כך עובדת כל אינטגרציה אמיתית — תשלומים, ריפוזיטוריז, הודעות. תבנה אחד מוקדם ממה שאתה מצפה."}},
  {"en": "A webhook inverts the usual direction, and inherits three problems as a result. The sender cannot be sure you received it, so it will retry — meaning you will get duplicates. Anyone can POST to a public URL, so you must verify a signature. And the sender will time out if you are slow, so you acknowledge immediately and do the work afterwards.\n\nAccept, verify, deduplicate by event id, return 200, then process. That order is the whole pattern, and it ties directly to idempotency in module 10.",
   "he": "Webhook הופך את הכיוון הרגיל, ויורש שלוש בעיות כתוצאה מכך. השולח לא יכול להיות בטוח שקיבלת, אז הוא ינסה שוב — כלומר תקבל כפילויות. כל אחד יכול לשלוח POST לכתובת ציבורית, אז אתה חייב לאמת חתימה. והשולח יעבור פסק זמן אם תהיה איטי, אז מאשרים מיד ועושים את העבודה אחר כך.\n\nלקבל, לאמת, לנכות כפילויות לפי מזהה אירוע, להחזיר 200, ואז לעבד. הסדר הזה הוא כל הדפוס, והוא מתחבר ישירות לאידמפוטנטיות במודול 10."}),

 ("data", {
   "t": {"en": "Time, text & money", "he": "זמן, טקסט וכסף"},
   "d": {"en": "Three data types that quietly break everything: local timestamps, non-UTF-8 text, and floating-point currency.",
         "he": "שלושה טיפוסי נתונים ששוברים הכל בשקט: חותמות זמן מקומיות, טקסט שאינו UTF-8, ומטבע במספר עשרוני צף."},
   "w": {"en": "Store time in UTC, text in UTF-8, money in integer minor units. Three rules, an enormous number of avoided bugs.",
         "he": "לשמור זמן ב-UTC, טקסט ב-UTF-8, כסף ביחידות שלמות קטנות. שלושה כללים, מספר עצום של באגים שנמנעו."}},
  {"en": "Each of these is a case where the obvious representation is wrong. A local timestamp is ambiguous twice a year and meaningless to a reader in another zone. Text stored in the wrong encoding turns into damaged characters that cannot be recovered later. And 0.1 + 0.2 is not 0.3 in binary floating point, which is fine for a temperature and unacceptable for an invoice.\n\nThe fixes are all boring and all decided once: UTC in storage with the zone applied at display time, UTF-8 everywhere end to end, and money as an integer count of the smallest unit. This matters doubly in Hebrew and other non-Latin contexts, where an encoding mistake is immediately visible.",
   "he": "כל אחד מאלה הוא מקרה שבו הייצוג המתבקש שגוי. חותמת זמן מקומית דו-משמעית פעמיים בשנה וחסרת משמעות לקורא באזור אחר. טקסט שנשמר בקידוד שגוי הופך לתווים פגומים שאי אפשר לשחזר. ו-0.1 ועוד 0.2 אינו 0.3 בנקודה צפה בינארית, וזה בסדר לטמפרטורה ובלתי מתקבל על הדעת לחשבונית.\n\nהתיקונים כולם משעממים וכולם מוחלטים פעם אחת: UTC באחסון עם האזור מוחל בתצוגה, UTF-8 בכל מקום מקצה לקצה, וכסף כמספר שלם של היחידה הקטנה ביותר. זה חשוב כפליים בעברית ובהקשרים לא-לטיניים אחרים, שם טעות קידוד נראית מיד."}),

 ("langs", {
   "t": {"en": "Semantic versioning", "he": "ניהול גרסאות סמנטי"},
   "d": {"en": "The 1.4.2 convention: major means it breaks, minor means it adds, patch means it fixes.",
         "he": "המוסכמה של 1.4.2: major אומר שזה שובר, minor אומר שזה מוסיף, patch אומר שזה מתקן."},
   "w": {"en": "The caret in ^1.4.2 permits automatic upgrades. It is why a build that worked yesterday can fail today with no change from you.",
         "he": "הגגון ב-^1.4.2 מתיר שדרוגים אוטומטיים. בגלל זה בילד שעבד אתמול יכול להיכשל היום בלי שום שינוי מצדך."}},
  {"en": "Semantic versioning is a promise, not a mechanism. Nothing forces a maintainer to keep it, and a breaking change released as a patch is a regular occurrence — which is exactly why the lock file matters more than the range you declared.\n\nThe practical consequence for AI-assisted work is specific and measured: models tend to suggest the versions common in their training data, which are older and sometimes carry known vulnerabilities. Check what you were given against the current release and an audit tool before trusting it.",
   "he": "ניהול גרסאות סמנטי הוא הבטחה, לא מנגנון. שום דבר לא מכריח מתחזק לשמור עליה, ושינוי שובר שמשוחרר כ-patch הוא תופעה שגרתית — ובדיוק בגלל זה קובץ ה-lock חשוב יותר מהטווח שהצהרת.\n\nההשלכה המעשית לעבודה עם AI ספציפית ונמדדת: מודלים נוטים להציע את הגרסאות הנפוצות בנתוני האימון שלהם, שהן ישנות יותר ולעיתים נושאות פגיעויות ידועות. תבדוק את מה שקיבלת מול הגרסה הנוכחית ומול כלי ביקורת לפני שאתה סומך עליו."}),

 ("memory", {
   "t": {"en": "Data structures", "he": "מבני נתונים"},
   "d": {"en": "Array, map, set, queue, tree — different shapes with different costs for the same data.",
         "he": "מערך, מפה, סט, תור, עץ — צורות שונות עם מחירים שונים לאותם נתונים."},
   "w": {"en": "Searching a list inside a loop is O(n²). The same code with a Set is O(n). That is the whole lesson.",
         "he": "חיפוש ברשימה בתוך לולאה הוא O(n²). אותו קוד עם Set הוא O(n). זה כל השיעור."}},
  {"en": "Big-O describes growth; data structures are what you actually change to alter it. Choosing the right shape is almost always cheaper than optimising the wrong one.\n\nFour cover nearly everything you will meet: an array when order matters and you mostly iterate; a map when you look things up by a key; a set when you only care whether something is present; a queue when order of processing matters. The single most common real-world fix is replacing a repeated search through a list with one lookup in a map.",
   "he": "Big-O מתאר גדילה; מבני נתונים הם מה שבאמת משנים כדי לשנות אותה. בחירת הצורה הנכונה כמעט תמיד זולה יותר מאופטימיזציה של הלא נכונה.\n\nארבעה מכסים כמעט כל מה שתפגוש: מערך כשהסדר חשוב ובעיקר עוברים על הכל; מפה כשמחפשים לפי מפתח; סט כשרק חשוב אם משהו קיים; תור כשסדר העיבוד חשוב. התיקון הנפוץ ביותר בעולם האמיתי הוא החלפת חיפוש חוזר ברשימה בחיפוש אחד במפה."}),

 ("auth", {
   "t": {"en": "XSS & CSRF", "he": "XSS ו-CSRF"},
   "d": {"en": "XSS: someone else's script runs on your page. CSRF: another site makes your logged-in browser act on your behalf.",
         "he": "XSS: סקריפט של מישהו אחר רץ בדף שלך. CSRF: אתר אחר גורם לדפדפן המחובר שלך לפעול בשמך."},
   "w": {"en": "These are the two flaws AI-generated code fails most often in published research. Escape output; use SameSite cookies and CSRF tokens.",
         "he": "אלה שני הליקויים שקוד שנוצר על ידי AI נכשל בהם הכי הרבה במחקרים שפורסמו. תברח פלט; תשתמש בעוגיות SameSite ובטוקני CSRF."}},
  {"en": "Both are the injection idea again, aimed at the browser. XSS is data being treated as code: user content rendered into a page without escaping, so a script tag inside a username executes for every visitor. CSRF is a request being treated as intentional: because the browser attaches your cookies automatically, a form on another site can act as you.\n\nThe defences are unglamorous and largely automatic if you let the framework do them: render through templating that escapes by default rather than inserting raw HTML, set cookies SameSite, require a token on state-changing requests, and add the standard security headers including a content security policy. Research in 2026 measured AI-generated code failing XSS defences in the large majority of cases and shipping with no CSRF protection at all — so this is exactly the category to check by hand.",
   "he": "שניהם הם שוב רעיון ההזרקה, מכוון לדפדפן. XSS הוא נתונים שמטופלים כקוד: תוכן משתמש שמוצג בדף בלי בריחה, כך שתגית סקריפט בתוך שם משתמש מתבצעת לכל מבקר. CSRF הוא בקשה שמטופלת ככוונה: מכיוון שהדפדפן מצרף את העוגיות שלך אוטומטית, טופס באתר אחר יכול לפעול בשמך.\n\nההגנות לא זוהרות והן ברובן אוטומטיות אם נותנים לפריימוורק לעשות אותן: להציג דרך תבניות שבורחות כברירת מחדל ולא להכניס HTML גולמי, להגדיר עוגיות כ-SameSite, לדרוש טוקן בבקשות שמשנות מצב, ולהוסיף את כותרות האבטחה הסטנדרטיות כולל מדיניות אבטחת תוכן. מחקר ב-2026 מדד שקוד שנוצר על ידי AI נכשל בהגנות XSS ברוב המקרים ומשוחרר בלי שום הגנת CSRF — אז זו בדיוק הקטגוריה לבדוק ידנית."}),

 ("ai", {
   "t": {"en": "Vibe coding vs vibe engineering", "he": "Vibe coding מול Vibe engineering"},
   "d": {"en": "Vibe coding is accepting code you have not reviewed. If you reviewed, tested and understood it, it is simply engineering with a fast assistant.",
         "he": "Vibe coding הוא קבלת קוד שלא סקרת. אם סקרת, בדקת והבנת אותו, זו פשוט הנדסה עם עוזר מהיר."},
   "w": {"en": "This distinction is the point of this entire course. Nothing here is about typing less — it is about being able to review what you accept.",
         "he": "ההבחנה הזו היא כל הנקודה של הקורס הזה. שום דבר כאן הוא לא על להקליד פחות — הוא על היכולת לסקור את מה שאתה מקבל."}},
  {"en": "The distinction is about review, not about who typed the characters. A codebase where a model wrote every line but a person read, tested and understood all of it is an ordinary engineered system. A codebase with ten hand-written lines nobody checked is not.\n\nWhat follows from that is unglamorous, and it is what practitioners writing about this in 2025 and 2026 consistently report: the things that make an assistant effective are a real test suite, planning before generating, documentation a model can read, small disciplined commits, automated checks in CI, and a review habit. Prompting technique is a small part of it. Most of the work is making your project a place where an agent can be checked.",
   "he": "ההבחנה עוסקת בסקירה, לא במי הקליד את התווים. בסיס קוד שבו מודל כתב כל שורה אבל אדם קרא, בדק והבין את כולה הוא מערכת מהונדסת רגילה. בסיס קוד עם עשר שורות שנכתבו ביד ואף אחד לא בדק אינו.\n\nמה שנובע מזה לא זוהר, וזה מה שמי שכותב על הנושא ב-2025 וב-2026 מדווח בעקביות: הדברים שהופכים עוזר ליעיל הם חבילת בדיקות אמיתית, תכנון לפני ייצור, תיעוד שמודל יכול לקרוא, קומיטים קטנים ומשמעתיים, בדיקות אוטומטיות ב-CI, והרגל סקירה. טכניקת פרומפטים היא חלק קטן מזה. רוב העבודה היא להפוך את הפרויקט למקום שבו אפשר לבדוק סוכן."}),

 ("ai", {
   "t": {"en": "AGENTS.md", "he": "AGENTS.md"},
   "d": {"en": "A file in your repo that tells any AI assistant how this project works: stack, setup commands, code style, how to run the tests, what not to touch.",
         "he": "קובץ בריפו שמסביר לכל עוזר AI איך הפרויקט עובד: הסטאק, פקודות ההתקנה, סגנון הקוד, איך מריצים בדיקות, ובמה לא לגעת."},
   "w": {"en": "It is the highest-leverage prompt you will ever write, because you write it once and every session starts with it.",
         "he": "זה הפרומפט בעל המנוף הגבוה ביותר שתכתוב, כי כותבים אותו פעם אחת וכל שיחה מתחילה איתו."}},
  {"en": "Everything you find yourself repeating in a chat belongs in a file instead. A convention emerged in 2025 and 2026 around a plain Markdown file at the repo root, read automatically by most coding assistants, holding the context that never changes between sessions.\n\nThe sections that earn their place: what this project is in two sentences, the stack and versions, the exact commands to install, run and test, the code conventions you actually enforce, and an explicit list of things not to change. Keep it short enough that it is worth including in every request — it competes for the same context window as your actual question.",
   "he": "כל מה שאתה מוצא את עצמך חוזר עליו בצ׳אט שייך לקובץ במקום. מוסכמה התגבשה ב-2025 וב-2026 סביב קובץ Markdown פשוט בשורש הריפו, שנקרא אוטומטית על ידי רוב עוזרי הקוד, ומחזיק את ההקשר שלא משתנה בין שיחות.\n\nהסעיפים שמצדיקים את מקומם: מה הפרויקט הזה בשני משפטים, הסטאק והגרסאות, הפקודות המדויקות להתקנה, הרצה ובדיקה, מוסכמות הקוד שאתה באמת אוכף, ורשימה מפורשת של דברים שלא לשנות. שמור אותו קצר מספיק כדי שיהיה שווה לכלול בכל בקשה — הוא מתחרה על אותו חלון הקשר כמו השאלה עצמה."}),
]
