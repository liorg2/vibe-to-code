import type { TopicExtra } from "./types";

export const extras: Record<string, TopicExtra> = {
  DOM: {
    look: [
      {
        cap: {
          en: "HTML tags become boxes the browser can show and click.",
          he: "תגיות HTML הופכות לקופסאות שהדפדפן מציג ואפשר ללחוץ עליהן.",
        },
        code: `<h1>Hello</h1>
<p>This is a paragraph.</p>
<button>Click me</button>`,
        preview: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>DOM</title>
<style>
body{font-family:system-ui,sans-serif;margin:1.5rem;background:#f8fafc;color:#0f172a}
h1{font-size:1.5rem;margin:0 0 .5rem}
p{margin:0 0 1rem;color:#334155}
button{padding:.5rem 1rem;border:1px solid #cbd5e1;border-radius:6px;background:#fff;cursor:pointer}
</style>
</head>
<body>
<h1>Hello</h1>
<p>This is a paragraph.</p>
<button>Click me</button>
</body>
</html>`,
      },
    ],
    prompts: [
      {
        en: "Show me a tiny HTML fragment with one heading, one paragraph, and one button. Keep it under ten lines and explain each tag in one short sentence.",
        he: "תראו לי קטע HTML קטן עם כותרת אחת, פסקה אחת וכפתור אחד. תשמרו על פחות מעשר שורות ותסבירו כל תגית במשפט קצר אחד.",
      },
      {
        en: "Given this HTML, write three lines that find the button in the DOM and change its text to Done. Use plain JavaScript only.",
        he: "בהינתן ה-HTML הזה, כתבו שלוש שורות שמוצאות את הכפתור ב-DOM ומשנות את הטקסט שלו ל-Done. רק JavaScript רגיל.",
      },
      {
        en: "Draw a one-line tree of the DOM for a page with html, body, h1, and p. Label parent and child in plain words.",
        he: "ציירו בעץ של שורה אחת את ה-DOM לדף עם html, body, h1 ו-p. סמנו parent ו-child במילים פשוטות.",
      },
    ],
  },

  "CSS & responsive layout": {
    look: [
      {
        cap: {
          en: "CSS paints a blue card and puts two boxes in a row.",
          he: "CSS צובע כרטיס כחול ומניח שתי קופסאות בשורה.",
        },
        code: `.card {
  background: #2563eb;
  color: #fff;
  padding: 16px;
  border-radius: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.card b { width: 100%; }
.box {
  background: #fff;
  color: #111;
  padding: 12px;
  border-radius: 8px;
  flex: 1;
}`,
        preview: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>CSS card</title>
<style>
body{font-family:system-ui,sans-serif;margin:1.5rem;background:#f1f5f9}
.card{background:#2563eb;color:#fff;padding:16px;border-radius:12px;display:flex;flex-wrap:wrap;gap:12px}
.card b{width:100%}
.box{background:#fff;color:#111;padding:12px;border-radius:8px;flex:1}
</style>
</head>
<body>
<div class="card">
  <b>card</b>
  <div class="box">box</div>
  <div class="box">box</div>
</div>
</body>
</html>`,
      },
    ],
    prompts: [
      {
        en: "Write eight lines of CSS for a card with blue background, padding, rounded corners, and a flex row of two children.",
        he: "כתבו שמונה שורות CSS לכרטיס עם רקע כחול, padding, פינות מעוגלות, ושורת flex עם שני ילדים.",
      },
      {
        en: "Add one media query that stacks the two boxes vertically under 600px. Show only the changed CSS lines.",
        he: "הוסיפו media query אחד שמעמיד את שתי הקופסאות אחת מעל השנייה מתחת ל-600px. הראו רק את שורות ה-CSS שהשתנו.",
      },
      {
        en: "Explain in three short sentences how flex and a media query make the same card work on phone and desktop.",
        he: "הסבירו בשלושה משפטים קצרים איך flex ו-media query גורמים לאותו כרטיס לעבוד בטלפון ובמסך רחב.",
      },
    ],
  },

  "Accessibility (a11y)": {
    look: [
      {
        cap: {
          en: "A real button and a labeled input work with keyboard and screen readers.",
          he: "כפתור אמיתי ושדה עם label עובדים עם מקלדת וקורא מסך.",
        },
        code: `<button type="button">Save</button>

<label for="email">Email</label>
<input id="email" type="email" name="email" />`,
        preview: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>a11y</title>
<style>
body{font-family:system-ui,sans-serif;margin:1.5rem;background:#f8fafc;color:#0f172a}
label{display:block;margin:1rem 0 .35rem;font-size:.9rem}
input{padding:.5rem;border:1px solid #cbd5e1;border-radius:6px;width:12rem}
button{margin-top:.25rem;padding:.5rem 1rem;border:1px solid #94a3b8;border-radius:6px;background:#fff}
button{outline:3px solid #2563eb}
</style>
</head>
<body>
<button type="button">Save</button>
<label for="email">Email</label>
<input id="email" type="email" name="email" />
</body>
</html>`,
      },
    ],
    prompts: [
      {
        en: "Rewrite this clickable div as a real button element. Show the before and after snippet side by side in under twelve lines.",
        he: "שכתבו את ה-div הניתן ללחיצה כאלמנט button אמיתי. הראו before ו-after זה לצד זה בפחות משתים-עשרה שורות.",
      },
      {
        en: "Connect a label to an email input with for and id. Paste the two tags and one sentence on why placeholders are not enough.",
        he: "חברו label לשדה email עם for ו-id. הדביקו את שתי התגיות ומשפט אחד למה placeholder לא מספיק.",
      },
      {
        en: "List three Tab-key checks for this form: focus visible, order makes sense, and every control is reachable. Keep it to three bullets.",
        he: "רשמו שלוש בדיקות Tab לטופס הזה: focus נראה, הסדר הגיוני, וכל פקד נגיש. שלוש נקודות בלבד.",
      },
    ],
  },

  "The main thread": {
    look: [
      {
        cap: {
          en: "One queue handles clicks, timers, and your code — then paints.",
          he: "תור אחד מטפל בלחיצות, טיימרים ובקוד שלכם — ואז מצייר.",
        },
        code: `// main thread, one task at a time
1. click handler runs
2. heavy loop blocks ~2s
3. paint waits until loop ends
// fix: move heavy work off this queue`,
      },
    ],
    prompts: [
      {
        en: "Write a five-line comment that explains why a two-second loop freezes buttons until it finishes on the main thread.",
        he: "כתבו הערה בחמש שורות שמסבירה למה לולאה של שתי שניות מקפיאה כפתורים עד שהיא נגמרת על ה-main thread.",
      },
      {
        en: "Suggest one tiny change: split a long loop with await setTimeout so the browser can paint between chunks. Show the diff.",
        he: "הציעו שינוי קטן אחד: לפצל לולאה ארוכה עם await setTimeout כדי שהדפדפן יוכל לצייר בין חתיכות. הראו את ה-diff.",
      },
      {
        en: "In three sentences, when should we use a Web Worker instead of running math on the main thread?",
        he: "בשלושה משפטים, מתי כדאי להשתמש ב-Web Worker במקום להריץ חישובים על ה-main thread?",
      },
    ],
  },

  Component: {
    look: [
      {
        cap: {
          en: "A small function returns the markup for a price card.",
          he: "פונקציה קטנה מחזירה את ה-markup של כרטיס מחיר.",
        },
        code: `function PriceCard() {
  return (
    <div className="card">
      <h2>Pro plan</h2>
      <p>$9 / month</p>
      <button>Buy</button>
    </div>
  );
}`,
        preview: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>Component</title>
<style>
body{font-family:system-ui,sans-serif;margin:1.5rem;background:#f1f5f9;color:#0f172a}
.card{background:#fff;padding:1.25rem;border-radius:10px;border:1px solid #e2e8f0;max-width:14rem}
h2{margin:0 0 .35rem;font-size:1.15rem}
p{margin:0 0 1rem;color:#334155;font-size:1.25rem;font-weight:600}
button{padding:.5rem 1rem;border:0;border-radius:6px;background:#2563eb;color:#fff;cursor:pointer}
</style>
</head>
<body>
<div class="card">
  <h2>Pro plan</h2>
  <p>$9 / month</p>
  <button>Buy</button>
</div>
</body>
</html>`,
      },
    ],
    prompts: [
      {
        en: "Write a tiny JSX function component named PriceCard with a title, a price, and a Buy button. Under fifteen lines.",
        he: "כתבו function component קטן ב-JSX בשם PriceCard עם כותרת, מחיר וכפתור Buy. פחות מחמש-עשרה שורות.",
      },
      {
        en: "Add a props object with title and price, then use those props inside PriceCard. Show only the updated component.",
        he: "הוסיפו אובייקט props עם title ו-price, ואז השתמשו בהם בתוך PriceCard. הראו רק את ה-component המעודכן.",
      },
      {
        en: "Explain in four sentences why reusing one PriceCard beats copying the same HTML three times on a pricing page.",
        he: "הסבירו בארבעה משפטים למה שימוש חוזר ב-PriceCard אחד עדיף על העתקת אותו HTML שלוש פעמים בדף מחירים.",
      },
    ],
  },

  "Framework (React, Vue, Svelte)": {
    look: [
      {
        cap: {
          en: "You describe the UI; the framework updates the DOM.",
          he: "אתם מתארים את ה-UI; ה-framework מעדכן את ה-DOM.",
        },
        code: `// you write:
function Badge({ count }) {
  return <span>{count}</span>;
}
// when count changes, framework re-renders Badge
// and patches the DOM — you do not find nodes by hand`,
      },
    ],
    prompts: [
      {
        en: "In five short bullets, contrast updating a badge by hand in the DOM versus letting React, Vue, or Svelte re-render it.",
        he: "בחמש נקודות קצרות, השוו עדכון badge ידני ב-DOM מול לתת ל-React, Vue או Svelte לרנדר אותו מחדש.",
      },
      {
        en: "Write a three-line Badge component in JSX that shows a count prop. No other files, just the function.",
        he: "כתבו Badge component בן שלוש שורות ב-JSX שמציג prop בשם count. בלי קבצים אחרים, רק הפונקציה.",
      },
      {
        en: "When is plain HTML enough and a framework overkill? Give three concrete page types in one short paragraph.",
        he: "מתי HTML רגיל מספיק ו-framework מיותר? תנו שלושה סוגי דפים קונקרטיים בפסקה קצרה אחת.",
      },
    ],
  },

  "Client state": {
    look: [
      {
        cap: {
          en: "State is data the UI remembers and redraws from.",
          he: "State הוא מידע שה-UI זוכר ומצייר ממנו מחדש.",
        },
        code: `const [cartCount, setCartCount] = useState(0);

function addToCart() {
  setCartCount(cartCount + 1); // UI re-renders
}`,
      },
    ],
    prompts: [
      {
        en: "Show a three-line useState example for a cart count that starts at zero and increments when Add is clicked.",
        he: "הראו דוגמת useState בת שלוש שורות למונה עגלה שמתחיל באפס ועולה בלחיצה על Add.",
      },
      {
        en: "Write a tiny diff that lifts local button state into shared cart state used by a badge and a total line.",
        he: "כתבו diff קטן שמעלה state מקומי של כפתור ל-state משותף של עגלה שמשמש תג ושורת סכום.",
      },
      {
        en: "In four sentences, explain why mutating a variable without setState leaves the screen lying about the cart.",
        he: "בארבעה משפטים, הסבירו למה שינוי משתנה בלי setState משאיר את המסך משקר לגבי העגלה.",
      },
    ],
  },

  "SPA vs SSR vs static": {
    look: [
      {
        cap: {
          en: "Where HTML is built: browser, server on each request, or ahead of time.",
          he: "איפה נבנה ה-HTML: בדפדפן, בשרת בכל בקשה, או מראש.",
        },
        code: `SPA:    server sends shell → browser builds UI
SSR:    server builds HTML per request → browser hydrates
static: HTML files built once at deploy time`,
      },
    ],
    prompts: [
      {
        en: "Make a three-row table comparing SPA, SSR, and static: who builds the first HTML, and one good use case each.",
        he: "עשו טבלה בת שלוש שורות שמשווה SPA, SSR ו-static: מי בונה את ה-HTML הראשון, ושימוש טוב אחד לכל אחד.",
      },
      {
        en: "For a marketing landing page, recommend static or SSR in two sentences and name one reason against SPA.",
        he: "לדף נחיתה שיווקי, המליצו על static או SSR בשני משפטים וציינו סיבה אחת נגד SPA.",
      },
      {
        en: "Write a six-line comment block that a beginner can paste above a Next.js route explaining SPA vs SSR in plain words.",
        he: "כתבו בלוק הערות בן שש שורות שמתחילים יכולים להדביק מעל route ב-Next.js שמסביר SPA מול SSR במילים פשוטות.",
      },
    ],
  },

  "Bundler & build step": {
    look: [
      {
        cap: {
          en: "Source files go in; one optimized bundle comes out.",
          he: "קבצי מקור נכנסים; יוצא bundle אחד מותאם.",
        },
        code: `# before (many files for the browser)
src/app.tsx
src/button.tsx
src/styles.css

# after build
dist/assets/app-a1b2.js
dist/assets/app-a1b2.css`,
      },
    ],
    prompts: [
      {
        en: "Explain in four sentences what a bundler does when npm run build turns many source files into assets in dist.",
        he: "הסבירו בארבעה משפטים מה bundler עושה כש-npm run build הופך הרבה קבצי מקור לנכסים ב-dist.",
      },
      {
        en: "List three things the build step often does: minify, tree-shake, and hash filenames. One line each.",
        he: "רשמו שלושה דברים ששלב ה-build לרוב עושה: minify, tree-shake, ו-hash לשמות קבצים. שורה לכל אחד.",
      },
      {
        en: "Write a beginner prompt I can paste to the AI: map our package.json scripts for dev versus production build.",
        he: "כתבו prompt למתחילים שאפשר להדביק ל-AI: למפות את הסקריפטים ב-package.json ל-dev מול production build.",
      },
    ],
  },

  "Forms & validation": {
    look: [
      {
        cap: {
          en: "required stops empty email; a message tells the user what to fix.",
          he: "required עוצר email ריק; הודעה אומרת למשתמש מה לתקן.",
        },
        code: `<form>
  <label for="email">Email</label>
  <input id="email" type="email" name="email" required />
  <button type="submit">Join</button>
  <p class="error">Enter an email</p>
</form>`,
        preview: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>Form</title>
<style>
body{font-family:system-ui,sans-serif;margin:1.5rem;background:#f8fafc;color:#0f172a}
label{display:block;margin-bottom:.35rem;font-size:.9rem}
input{padding:.5rem;border:1px solid #cbd5e1;border-radius:6px;width:14rem}
button{display:block;margin-top:.75rem;padding:.5rem 1rem;border:0;border-radius:6px;background:#2563eb;color:#fff}
.error{color:#dc2626;margin:.75rem 0 0;font-size:.9rem}
</style>
</head>
<body>
<form>
  <label for="email">Email</label>
  <input id="email" type="email" name="email" required />
  <button type="submit">Join</button>
  <p class="error">Enter an email</p>
</form>
</body>
</html>`,
      },
    ],
    prompts: [
      {
        en: "Write a small HTML form with an email input that has required, a submit button, and a red error line under it.",
        he: "כתבו טופס HTML קטן עם שדה email שיש לו required, כפתור שליחה, ושורת שגיאה אדומה מתחת.",
      },
      {
        en: "Show a three-line server check that rejects a missing email even if the browser skipped required. Plain TypeScript.",
        he: "הראו בדיקת שרת בת שלוש שורות שדוחה email חסר גם אם הדפדפן דילג על required. TypeScript פשוט.",
      },
      {
        en: "Ask the AI for a diff that adds type=email and required to this signup form, and a matching error message paragraph.",
        he: "בקשו מה-AI diff שמוסיף type=email ו-required לטופס ההרשמה הזה, ופסקת הודעת שגיאה תואמת.",
      },
    ],
  },

  "SEO basics": {
    look: [
      {
        cap: {
          en: "Title and description are what search results show.",
          he: "Title ו-description הם מה שמופיע בתוצאות חיפוש.",
        },
        code: `<title>Vibe to Dev — learn to ship</title>
<meta name="description" content="A short course that teaches beginners how to build and ship real web apps with AI." />`,
        preview: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>SEO mock</title>
<style>
body{font-family:Arial,Helvetica,sans-serif;margin:1.5rem;background:#fff;color:#202124;max-width:38rem}
.t{color:#1a0dab;font-size:1.25rem;margin:0 0 .15rem;text-decoration:underline;cursor:pointer}
.u{color:#006621;font-size:.85rem;margin:0 0 .25rem}
.s{color:#4d5156;font-size:.9rem;margin:0;line-height:1.4}
</style>
</head>
<body>
<p class="t">Vibe to Dev — learn to ship</p>
<p class="u">https://www.example.com/course</p>
<p class="s">A short course that teaches beginners how to build and ship real web apps with AI.</p>
</body>
</html>`,
      },
    ],
    prompts: [
      {
        en: "Write a title under sixty characters and a meta description under 160 characters for a beginner coding course landing page.",
        he: "כתבו title מתחת לשישים תווים ו-meta description מתחת ל-160 תווים לדף נחיתה של קורס קוד למתחילים.",
      },
      {
        en: "Show the two head tags only: title and meta name=description. No other HTML. Keep the copy concrete.",
        he: "הראו רק את שתי תגיות ה-head: title ו-meta name=description. בלי HTML אחר. השאירו את הטקסט קונקרטי.",
      },
      {
        en: "Paste a prompt that asks the AI to audit our homepage head for missing title or description and suggest a three-line fix.",
        he: "הדביקו prompt שמבקש מה-AI לבדוק את ה-head בדף הבית ל-title או description חסרים ולהציע תיקון בשלוש שורות.",
      },
    ],
  },

  "Link previews (Open Graph)": {
    look: [
      {
        cap: {
          en: "og tags tell chat apps what title, text, and image to show.",
          he: "תגיות og אומרות לאפליקציות צ'אט איזה title, טקסט ותמונה להציג.",
        },
        code: `<meta property="og:title" content="Vibe to Dev" />
<meta property="og:description" content="Learn to ship real apps." />
<meta property="og:image" content="https://example.com/og.png" />`,
        preview: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>OG card</title>
<style>
body{font-family:system-ui,sans-serif;margin:1.5rem;background:#e2e8f0;color:#0f172a}
.card{background:#fff;border-radius:10px;overflow:hidden;max-width:18rem;border:1px solid #cbd5e1}
.img{height:100px;background:#2563eb}
.body{padding:.85rem 1rem 1rem}
h3{margin:0 0 .35rem;font-size:1rem}
p{margin:0;color:#475569;font-size:.85rem;line-height:1.35}
</style>
</head>
<body>
<div class="card">
  <div class="img"></div>
  <div class="body">
    <h3>Vibe to Dev</h3>
    <p>Learn to ship real apps.</p>
  </div>
</div>
</body>
</html>`,
      },
    ],
    prompts: [
      {
        en: "Write three Open Graph meta tags for og:title, og:description, and og:image for our course homepage. Absolute image URL only.",
        he: "כתבו שלוש תגיות meta של Open Graph ל-og:title, og:description ו-og:image לדף הבית של הקורס. רק URL מלא לתמונה.",
      },
      {
        en: "Explain in four sentences why og tags must be in the first HTML from the server, not added later by client JavaScript.",
        he: "הסבירו בארבעה משפטים למה תגיות og חייבות להיות ב-HTML הראשון מהשרת, לא להתווסף אחר כך ב-JavaScript בצד הלקוח.",
      },
      {
        en: "Ask the AI for a three-line checklist to verify WhatsApp and LinkedIn can read our share preview after deploy.",
        he: "בקשו מה-AI רשימת בדיקה בת שלוש שורות לוודא שוואטסאפ ולינקדאין יכולים לקרוא את תצוגת השיתוף אחרי deploy.",
      },
    ],
  },

  "Measuring speed (Lighthouse)": {
    look: [
      {
        cap: {
          en: "Lighthouse scores the page under a slow phone simulation.",
          he: "Lighthouse נותן ציון לדף תחת סימולציה של טלפון איטי.",
        },
        code: `Lighthouse (Chrome DevTools)
Performance     72
Accessibility   96
Best Practices  90
SEO             100
# lab number — compare before vs after`,
      },
    ],
    prompts: [
      {
        en: "Write a five-step checklist to run Lighthouse on our staging URL in Chrome DevTools and save the Performance score.",
        he: "כתבו רשימת חמש שלבים להריץ Lighthouse על כתובת ה-staging ב-Chrome DevTools ולשמור את ציון ה-Performance.",
      },
      {
        en: "Ask the AI to read this Lighthouse JSON and list the top three opportunities with one-line fixes each.",
        he: "בקשו מה-AI לקרוא את ה-JSON הזה של Lighthouse ולרשום את שלוש ההזדמנויות המובילות עם תיקון של שורה אחת לכל אחת.",
      },
      {
        en: "In three sentences, why should we compare two Lighthouse runs before trusting that a change made the page faster?",
        he: "בשלושה משפטים, למה כדאי להשוות שני ריצות Lighthouse לפני שסומכים על כך ששינוי באמת האיץ את הדף?",
      },
    ],
  },

  "Core Web Vitals": {
    look: [
      {
        cap: {
          en: "Three field numbers Google cares about for real users.",
          he: "שלושה מספרי שטח שגוגל אכפת לו מהם למשתמשים אמיתיים.",
        },
        code: `LCP  largest content paint   < 2.5s  good
INP  interaction to next paint < 200ms good
CLS  layout shift score      < 0.1   good`,
      },
    ],
    prompts: [
      {
        en: "Define LCP, INP, and CLS in one sentence each, and add the good threshold number beside each name.",
        he: "הגדירו LCP, INP ו-CLS במשפט אחד לכל אחד, והוסיפו ליד כל שם את סף ה-good.",
      },
      {
        en: "Give three concrete fixes: one for slow LCP, one for high INP, one for CLS from images without size. Three lines total.",
        he: "תנו שלושה תיקונים קונקרטיים: אחד ל-LCP איטי, אחד ל-INP גבוה, אחד ל-CLS מתמונות בלי גודל. שלוש שורות בסך הכול.",
      },
      {
        en: "Paste a prompt asking the AI which Core Web Vital our hero image size attributes would improve, in two sentences.",
        he: "הדביקו prompt שמבקש מה-AI איזה Core Web Vital ישפרו attributes של גודל לתמונת ה-hero, בשני משפטים.",
      },
    ],
  },

  "Request / Response": {
    look: [
      {
        cap: {
          en: "The browser asks; the server answers. That pair is one round trip.",
          he: "הדפדפן מבקש; השרת עונה. הזוג הזה הוא סיבוב אחד.",
        },
        code: `→ REQUEST
GET /hello HTTP/1.1
Host: api.example.com

← RESPONSE
HTTP/1.1 200 OK
Content-Type: text/plain

hi`,
      },
    ],
    prompts: [
      {
        en: "Draw a six-line request and matching response for GET /hello that returns the plain text hi with status 200.",
        he: "ציירו בקשה ותשובה תואמת בשיש שורות ל-GET /hello שמחזיר את הטקסט hi עם status 200.",
      },
      {
        en: "Label each line of this pair as request line, header, or body in a short annotated copy under twelve lines.",
        he: "סמנו כל שורה בזוג הזה כשורת בקשה, header או body בעותק מפורש קצר מתחת לשתים-עשרה שורות.",
      },
      {
        en: "Ask the AI for a three-bullet story of what happens when a user clicks a link: request out, response in, page paints.",
        he: "בקשו מה-AI סיפור בשלוש נקודות על מה קורה כשמשתמש לוחץ על קישור: בקשה יוצאת, תשובה נכנסת, הדף נצבע.",
      },
    ],
  },

  Endpoint: {
    look: [
      {
        cap: {
          en: "An endpoint is one URL plus a method the server handles.",
          he: "Endpoint הוא כתובת אחת פלוס method שהשרת מטפל בו.",
        },
        code: `GET  /api/orders          list orders
POST /api/orders          create one order
GET  /api/orders/42       one order by id`,
      },
    ],
    prompts: [
      {
        en: "List three endpoints for a tiny shop API: list products, get one product, create an order. Method and path only.",
        he: "רשמו שלושה endpoints ל-API קטן של חנות: רשימת מוצרים, מוצר אחד, יצירת הזמנה. רק method ונתיב.",
      },
      {
        en: "Write a four-line comment above a route file explaining what an endpoint is for someone new to HTTP.",
        he: "כתבו הערה בת ארבע שורות מעל קובץ route שמסבירה מה זה endpoint למי שחדש ב-HTTP.",
      },
      {
        en: "Ask the AI to map every /api path in this repo into a three-column table: method, path, one-line purpose.",
        he: "בקשו מה-AI למפות כל נתיב /api בריפו לטבלה בת שלוש עמודות: method, path, ומטרה בשורה אחת.",
      },
    ],
  },

  GET: {
    look: [
      {
        cap: {
          en: "GET reads data. It should not change anything on the server.",
          he: "GET קורא נתונים. הוא לא אמור לשנות כלום בשרת.",
        },
        code: `GET /api/products/7 HTTP/1.1
Host: shop.example.com
Accept: application/json

→ 200 OK
{"id":7,"name":"Mug","price":12}`,
      },
    ],
    prompts: [
      {
        en: "Show a tiny GET request for /api/products/7 and a JSON response with id, name, and price. Under twelve lines.",
        he: "הראו בקשת GET קטנה ל-/api/products/7 ותשובת JSON עם id, name ו-price. פחות משתים-עשרה שורות.",
      },
      {
        en: "In three sentences, why bookmarking or refreshing a GET URL is safe, but repeating a payment POST is not.",
        he: "בשלושה משפטים, למה שמירת סימנייה או רענון של כתובת GET בטוחים, אבל חזרה על POST של תשלום לא.",
      },
      {
        en: "Ask the AI for a one-line fetch call in JavaScript that GETs /api/products and logs the JSON.",
        he: "בקשו מה-AI קריאת fetch בשורה אחת ב-JavaScript שעושה GET ל-/api/products וכותבת את ה-JSON ללוג.",
      },
    ],
  },

  "POST / PUT / PATCH / DELETE": {
    look: [
      {
        cap: {
          en: "These methods change data: create, replace, tweak, or remove.",
          he: "ה-methods האלה משנים נתונים: ליצור, להחליף, לתקן או למחוק.",
        },
        code: `POST   /api/orders     create
PUT    /api/orders/1   replace whole order
PATCH  /api/orders/1   change a few fields
DELETE /api/orders/1   remove`,
      },
    ],
    prompts: [
      {
        en: "Make a four-line cheat sheet: POST, PUT, PATCH, DELETE with one verb each for the same /api/orders resource.",
        he: "עשו דף רמאות בן ארבע שורות: POST, PUT, PATCH, DELETE עם פועל אחד לכל אחד על אותו משאב /api/orders.",
      },
      {
        en: "Show a tiny PATCH body that only updates status to shipped for order 1. JSON only, three lines.",
        he: "הראו גוף PATCH קטן שמעדכן רק את status ל-shipped להזמנה 1. רק JSON, שלוש שורות.",
      },
      {
        en: "Ask the AI which method fits create cart, rename title, and remove item — three answers, one sentence each.",
        he: "בקשו מה-AI איזה method מתאים ליצירת עגלה, שינוי כותרת ומחיקת פריט — שלוש תשובות, משפט אחד לכל אחת.",
      },
    ],
  },

  "Status codes": {
    look: [
      {
        cap: {
          en: "The number tells you how the request went.",
          he: "המספר אומר איך הבקשה הסתיימה.",
        },
        code: `200  OK — the request worked as expected
301  Moved — please use this other address
404  Not Found — there is no matching resource
401  Unauthorized — please sign in before continuing
500  Server Error — something broke on our server`,
      },
    ],
    prompts: [
      {
        en: "List five status codes — 200, 301, 404, 401, 500 — each with a five-word meaning a beginner can memorize.",
        he: "רשמו חמישה קודי status — 200, 301, 404, 401, 500 — לכל אחד משמעות בחמש מילים שמתחיל יכול לזכור.",
      },
      {
        en: "Write a three-line handler snippet that returns 404 when a product id is missing from the database.",
        he: "כתבו קטע handler בן שלוש שורות שמחזיר 404 כש-id של מוצר חסר במסד הנתונים.",
      },
      {
        en: "Ask the AI to classify this API error log into client mistakes versus server bugs using status code ranges.",
        he: "בקשו מה-AI לסווג את לוג השגיאות הזה של ה-API לטעויות לקוח מול באגים בשרת לפי טווחי status code.",
      },
    ],
  },

  Headers: {
    look: [
      {
        cap: {
          en: "Headers are small labeled notes on the request or response.",
          he: "Headers הן פתקים קטנים עם תווית על הבקשה או התשובה.",
        },
        code: `Content-Type: application/json
Authorization: Bearer tok_abc
Accept-Language: he`,
      },
    ],
    prompts: [
      {
        en: "Show three common headers with a one-line purpose each: Content-Type, Authorization, and Accept-Language.",
        he: "הראו שלושה headers נפוצים עם מטרה בשורה אחת לכל אחד: Content-Type, Authorization ו-Accept-Language.",
      },
      {
        en: "Write a four-line fetch example that sends Content-Type application/json and an Authorization bearer token.",
        he: "כתבו דוגמת fetch בת ארבע שורות ששולחת Content-Type application/json ו-Authorization עם bearer token.",
      },
      {
        en: "Ask the AI which response header tells the browser this body is JSON, and paste a one-line correct example.",
        he: "בקשו מה-AI איזה response header אומר לדפדפן שהגוף הוא JSON, והדביקו דוגמה נכונה בשורה אחת.",
      },
    ],
  },

  "Payload / Body": {
    look: [
      {
        cap: {
          en: "The body is the data riding under the headers.",
          he: "ה-body הוא הנתונים שנוסעים מתחת ל-headers.",
        },
        code: `POST /api/orders HTTP/1.1
Content-Type: application/json

{"productId":7,"qty":2}`,
      },
    ],
    prompts: [
      {
        en: "Show a POST with a JSON body that creates an order for product 7 with quantity 2. Include the Content-Type header.",
        he: "הראו POST עם גוף JSON שיוצר הזמנה למוצר 7 עם כמות 2. כללו את ה-header של Content-Type.",
      },
      {
        en: "In three sentences, explain the difference between URL query params and a request body for the same order fields.",
        he: "בשלושה משפטים, הסבירו את ההבדל בין query params בכתובת לבין request body לאותם שדות הזמנה.",
      },
      {
        en: "Ask the AI for a tiny TypeScript type that matches this order payload and a one-line parse from request.json().",
        he: "בקשו מה-AI type קטן ב-TypeScript שתואם ל-payload ההזמנה הזה ופענוח בשורה אחת מ-request.json().",
      },
    ],
  },

  JSON: {
    look: [
      {
        cap: {
          en: "JSON is text that looks like an object with typed values.",
          he: "JSON הוא טקסט שנראה כמו אובייקט עם ערכים מסוגים.",
        },
        code: `{
  "name": "Maya",
  "age": 28,
  "active": true,
  "nickname": null
}`,
      },
    ],
    prompts: [
      {
        en: "Write one JSON object with a string, a number, a boolean, and a null field. No trailing commas. Under ten lines.",
        he: "כתבו אובייקט JSON אחד עם שדה string, number, boolean ו-null. בלי פסיקים מיותרים בסוף. פחות מעשר שורות.",
      },
      {
        en: "Show JSON.parse and JSON.stringify each in one line on the object above, with a short comment on what each returns.",
        he: "הראו JSON.parse ו-JSON.stringify כל אחד בשורה אחת על האובייקט למעלה, עם הערה קצרה מה כל אחד מחזיר.",
      },
      {
        en: "Ask the AI to fix this almost-JSON: single quotes and a trailing comma, and return only the corrected object.",
        he: "בקשו מה-AI לתקן את ה-almost-JSON הזה: גרשיים בודדים ופסיק בסוף, ולהחזיר רק את האובייקט המתוקן.",
      },
    ],
  },

  REST: {
    look: [
      {
        cap: {
          en: "REST uses URLs for things and HTTP methods for actions.",
          he: "REST משתמש בכתובות לדברים וב-HTTP methods לפעולות.",
        },
        code: `/api/users       collection
/api/users/15    one user
GET = read   POST = create
PUT/PATCH = update   DELETE = remove`,
      },
    ],
    prompts: [
      {
        en: "Sketch a tiny REST map for users: collection path, item path, and which method creates versus deletes. Six lines max.",
        he: "שרטטו מפת REST קטנה למשתמשים: נתיב אוסף, נתיב פריט, ואיזה method יוצר מול מוחק. לכל היותר שש שורות.",
      },
      {
        en: "Rewrite these two RPC-style paths into REST: /getUser?id=15 and /createUser. Show before and after only.",
        he: "שכתבו את שני נתיבי ה-RPC האלה ל-REST: /getUser?id=15 ו-/createUser. הראו רק before ו-after.",
      },
      {
        en: "Ask the AI whether our /api routes look RESTful and list three concrete renames if they do not.",
        he: "בקשו מה-AI אם ה-routes של /api נראים RESTful, ושימנו שלושה שינויי שם קונקרטיים אם לא.",
      },
    ],
  },

  Webhook: {
    look: [
      {
        cap: {
          en: "Their server POSTs you when something happened.",
          he: "השרת שלהם עושה לכם POST כשמשהו קרה.",
        },
        code: `POST /api/billing/webhook HTTP/1.1
Content-Type: application/json

{
  "id": "evt_9f3a2c",
  "type": "payment.completed",
  "amount": 49
}`,
      },
    ],
    prompts: [
      {
        en: "Write one fake payment webhook POST body with id, type payment.completed, and amount. Under twelve lines of JSON.",
        he: "כתבו גוף POST אחד מזויף של webhook תשלום עם id, type payment.completed ו-amount. פחות משתים-עשרה שורות JSON.",
      },
      {
        en: "In four sentences, explain why a webhook handler must answer fast and stay safe if the same event arrives twice.",
        he: "בארבעה משפטים, הסבירו למה handler של webhook חייב לענות מהר ולהישאר בטוח אם אותו אירוע מגיע פעמיים.",
      },
      {
        en: "Ask the AI for a three-line checklist to verify our webhook URL, secret header, and idempotent handling of evt ids.",
        he: "בקשו מה-AI רשימת בדיקה בת שלוש שורות לוודא את כתובת ה-webhook, header הסוד, וטיפול idempotent ב-evt ids.",
      },
    ],
  },
};
