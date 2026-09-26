import type { TopicExtra } from "./types";

/** Topics that were two or three slides before the course was cut to one idea per slide. */
export const extras: Record<string, TopicExtra> = {
  "Terminal / CLI": {
    "look": [
      {
        "cap": {
          "en": "Type a command, get a reply",
          "he": "מקלידים פקודה, מקבלים תשובה"
        },
        "code": "$ pwd\n/Users/dana/shop\n\n$ ls\npackage.json  src  README.md"
      }
    ],
    "prompts": [
      {
        "en": "Give me the exact terminal commands to open this project folder, list its files, and print the current directory path.",
        "he": "תנו את פקודות הטרמינל המדויקות לפתיחת תיקיית הפרויקט, לרשימת הקבצים ולהדפסת נתיב התיקייה הנוכחית."
      },
      {
        "en": "I get \"command not found\" for this tool. Before installing anything, check whether it is already installed, show every copy the terminal can find, and print my PATH.",
        "he": "מתקבל אצלי \"command not found\" על הכלי הזה. לפני שמתקינים משהו, תבדקו אם הוא כבר מותקן, תראו כל עותק שהטרמינל מוצא, ותדפיסו את ה-PATH שלי."
      },
      {
        "en": "This project needs a specific Node.js version. Show me how to check which node the terminal actually runs, and its version, in one command.",
        "he": "הפרויקט הזה צריך גרסה מסוימת של Node.js. תראו לי איך בודקים באיזה node הטרמינל באמת משתמש, ומה הגרסה שלו, בפקודה אחת."
      }
    ]
  },
  "Test & assertion": {
    "look": [
      {
        "cap": {
          "en": "Code that checks other code",
          "he": "קוד שבודק קוד אחר"
        },
        "code": "// cart.test.js\ntest(\"empty cart totals zero\", () => {\n  expect(cartTotal([])).toBe(0);\n});\n\n$ npm test\nPASS  cart.test.js"
      }
    ],
    "prompts": [
      {
        "en": "Write one failing test for this function with a single strong assertion that states the exact expected result, not just that something is returned.",
        "he": "כתבו בדיקה אחת שנכשלת לפונקציה הזאת, עם assertion חזקה אחת שמצהירה על התוצאה המדויקת הצפויה, לא רק שמשהו הוחזר."
      },
      {
        "en": "Find existing tests in this repo and tell me the exact command to run only the file that covers the cart or checkout logic.",
        "he": "מצאו בדיקות קיימות ב-repo ואמרו את הפקודה המדויקת להריץ רק את הקובץ שמכסה את לוגיקת העגלה או הקופה."
      },
      {
        "en": "Rewrite this test so it has one strong assertion, and delete any assertion that always passes or checks nothing useful.",
        "he": "כתבו מחדש את הבדיקה כך שתהיה לה assertion חזקה אחת, ומחקו כל assertion שתמיד עוברת או לא בודקת כלום שימושי."
      }
    ]
  },
  "Undo: revert, reset & stash": {
    "look": [
      {
        "cap": {
          "en": "The three strengths of reset",
          "he": "שלוש העוצמות של reset"
        },
        "code": "# you are here: 3 commits on top of a1b2c3d\n$ git reset --soft a1b2c3d   # commits gone, changes staged, ready to recommit\n$ git reset        a1b2c3d   # commits gone, changes kept in your files\n$ git reset --hard a1b2c3d   # commits gone, changes gone, files match a1b2c3d\n\n# same family, these also delete uncommitted work:\n$ git checkout .\n$ git restore .\n$ git clean -fd              # removes new files Git never tracked"
      }
    ],
    "prompts": [
      {
        "en": "Undo your last change without losing my uncommitted work. Run git status first, tell me whether the commit is pushed, and use revert if it is.",
        "he": "תבטלו את השינוי האחרון שלכם בלי לאבד את העבודה שלי שלא נשמרה ב-commit. תריצו קודם git status, תגידו לי אם ה-commit כבר עלה ב-push, ואם כן תשתמשו ב-revert."
      },
      {
        "en": "Before you pull, switch branch or undo anything, stash my uncommitted changes with a clear message, and tell me the exact command to bring them back.",
        "he": "לפני שאתם עושים pull, עוברים branch או מבטלים משהו, תעשו stash לשינויים שלי שלא נשמרו ב-commit עם הודעה ברורה, ותגידו לי את הפקודה המדויקת להחזיר אותם."
      },
      {
        "en": "Before you run any reset, checkout, restore, clean or stash drop command, print exactly which files and changes it would throw away, and wait for my yes.",
        "he": "לפני שאתם מריצים פקודת reset, checkout, restore, clean או stash drop, תדפיסו בדיוק אילו קבצים ושינויים היא תזרוק, ותחכו לאישור שלי."
      }
    ]
  },
  "Clone / push / pull": {
    "look": [
      {
        "cap": {
          "en": "Copy down, send up, bring others down",
          "he": "מורידים, שולחים למעלה, מושכים אחרים"
        },
        "code": "$ git clone https://github.com/team/shop.git\nCloning into 'shop'...\nremote: Counting objects: 120, done."
      }
    ],
    "prompts": [
      {
        "en": "Give me the exact clone command for this remote URL, then the push and pull commands I will use on a normal workday.",
        "he": "תנו את פקודת ה-clone המדויקת ל-URL המרוחק הזה, ואז את פקודות push ו-pull ליום עבודה רגיל."
      },
      {
        "en": "Set up an SSH key for GitHub on this machine. Explain each command before you run it, and show me exactly which file to paste into GitHub.",
        "he": "תגדירו SSH key ל-GitHub על המחשב הזה. תסבירו כל פקודה לפני שאתם מריצים אותה, ותראו לי בדיוק איזה קובץ להדביק ב-GitHub."
      },
      {
        "en": "My push says \"Permission denied (publickey)\". Diagnose it step by step: is there a key, is it loaded, does the remote use SSH, and what does ssh -T say?",
        "he": "ה-push שלי כותב \"Permission denied (publickey)\". תאבחנו את זה צעד אחרי צעד: יש מפתח, הוא טעון, ה-remote משתמש ב-SSH, ומה ssh -T אומר?"
      }
    ]
  },
  "Client & server": {
    "look": [
      {
        "cap": {
          "en": "The browser asks; it does not decide",
          "he": "הדפדפן מבקש; הוא לא מחליט"
        },
        "code": "// Running in the user's browser\nfetch(\"/api/cart\")\n  .then((res) => res.json())\n  .then((cart) => renderCart(cart));\n\n# The user can open DevTools and change this."
      }
    ],
    "prompts": [
      {
        "en": "Point to every place in this feature that runs on the client. Mark anything that trusts a price or permission from the browser.",
        "he": "הצביעו על כל מקום בפיצ'ר הזה שרץ ב-client. סמנו כל דבר שסומך על מחיר או הרשאה מהדפדפן."
      },
      {
        "en": "Rewrite this client code so it only displays data and never decides final price or admin rights.",
        "he": "כתבו מחדש את קוד ה-client כך שהוא רק מציג נתונים ולעולם לא מחליט על מחיר סופי או הרשאות admin."
      },
      {
        "en": "Find the server entry file and tell me which port it listens on, then list three checks that must run there for checkout, never only in the browser.",
        "he": "מצאו את קובץ הכניסה של השרת ואמרו על איזה פורט הוא מאזין, ואז רשמו שלוש בדיקות שחייבות לרוץ שם בקופה, אף פעם לא רק בדפדפן."
      }
    ]
  },
  "Frontend, backend & full stack": {
    "look": [
      {
        "cap": {
          "en": "What the user sees and clicks",
          "he": "מה שהמשתמש רואה ולוחץ"
        },
        "code": "<button type=\"button\">Save</button>",
        "preview": "<!DOCTYPE html><html><head><meta charset=\"utf-8\"><style>body{font-family:sans-serif;padding:24px}</style></head><body><button type=\"button\">Save</button></body></html>"
      }
    ],
    "prompts": [
      {
        "en": "List every user-visible state this form needs: empty, typing, saving, success, and error. Keep each state to one short line.",
        "he": "רשמו כל מצב גלוי למשתמש שהטופס צריך: ריק, מקלידים, שומרים, הצלחה ושגיאה. כל מצב בשורה קצרה אחת."
      },
      {
        "en": "Move every pricing and permission rule out of the UI into the backend. Show the new endpoint body and status codes.",
        "he": "העבירו כל חוק תמחור והרשאות מה-UI ל-backend. הראו את גוף ה-endpoint החדש ואת קודי הסטטוס."
      },
      {
        "en": "Trace one invoice total from the screen to the database. Name each layer and the file or table that owns that step.",
        "he": "עקבו אחרי סכום חשבונית אחד מהמסך עד ה-database. ציינו כל שכבה ואת הקובץ או הטבלה שאחראית על הצעד."
      }
    ]
  },
  "Addresses: localhost, ports & DNS": {
    "look": [
      {
        "cap": {
          "en": "This computer, door number 3000",
          "he": "המחשב הזה, דלת מספר 3000"
        },
        "code": "$ npm run dev\nready on http://localhost:3000\n\n# \"Port 3000 already in use\" means another process holds the door.\nlsof -i :3000                   # mac/linux: shows the PID\nkill <PID>\nnetstat -ano | findstr :3000    # windows: last column is the PID\ntaskkill /PID <PID> /F"
      }
    ],
    "prompts": [
      {
        "en": "Tell me which localhost URL and port this project uses. Give the command to start it and how to free a busy port.",
        "he": "אמרו איזה URL של localhost ופורט הפרויקט משתמש. תנו את פקודת ההפעלה ואיך לשחרר פורט תפוס."
      },
      {
        "en": "I see two servers fighting over a port. Show the exact steps to find the old process and shut only that one down.",
        "he": "אני רואה שני שרתים נלחמים על פורט. הראו את הצעדים המדויקים למצוא את התהליך הישן ולכבות רק אותו."
      },
      {
        "en": "Look up this domain and show its IP. Explain in one sentence why the site may still look old for a few hours after a change.",
        "he": "בדקו את הדומיין הזה והראו את ה-IP שלו. הסבירו במשפט אחד למה האתר עלול עדיין להיראות ישן כמה שעות אחרי שינוי."
      }
    ]
  },
  "DevTools: Network & Console": {
    "look": [
      {
        "cap": {
          "en": "F12 opens the browser's workshop",
          "he": "F12 פותח את הסדנה של הדפדפן"
        },
        "code": "# Chrome / Edge / Firefox\nF12   or   Ctrl+Shift+I   (Mac: Cmd+Option+I)\n\nTabs you will use first:\nElements | Console | Network | Sources"
      }
    ],
    "prompts": [
      {
        "en": "Tell me exactly which DevTools tab to open for a wrong label, a failed request, and a JavaScript crash. One tab each.",
        "he": "אמרו בדיוק איזו לשונית DevTools לפתוח לתווית שגויה, לבקשה שנכשלה ולקריסת JavaScript. לשונית אחת לכל מקרה."
      },
      {
        "en": "Open the Network tab for this flow and tell me which request failed. Quote status code, URL, and the first line of the response body.",
        "he": "פתחו את לשונית Network לזרימה הזאת ואמרו איזו בקשה נכשלה. ציטטו קוד סטטוס, URL, ואת השורה הראשונה בגוף התשובה."
      },
      {
        "en": "Set one breakpoint on the line that computes total. Tell me which variable is wrong when execution pauses.",
        "he": "שימו breakpoint אחד על השורה שמחשבת את הסכום. אמרו איזה משתנה שגוי כשהריצה נעצרת."
      }
    ]
  },
  "Typed vs untyped": {
    "look": [
      {
        "cap": {
          "en": "Catch the wrong kind of value early",
          "he": "תופסים סוג ערך שגוי מוקדם"
        },
        "code": "// JavaScript — finds out while running\nfunction addTax(n) { return n * 1.17; }\naddTax(\"49\"); // \"4949\"... wait, what?\n\n// TypeScript — complains before run\nfunction addTax(n: number): number { return n * 1.17; }\naddTax(\"49\"); // Error: Argument of type 'string'..."
      }
    ],
    "prompts": [
      {
        "en": "Find one place where a string might be used as a number. Show the TypeScript type that would have blocked it.",
        "he": "מצאו מקום אחד שבו מחרוזת עלולה לשמש כמספר. הראו את טיפוס ה-TypeScript שהיה חוסם את זה."
      },
      {
        "en": "Add the smallest type annotations that would stop this AI mistake: passing null where an order object is required.",
        "he": "הוסיפו את הערות הטיפוס הקטנות ביותר שעוצרות את טעות ה-AI הזאת: העברת null במקום אובייקט הזמנה."
      },
      {
        "en": "Say whether this project's main language is closer to compiled or interpreted, and name the command that proves it.",
        "he": "אמרו אם שפת הפרויקט הראשית קרובה יותר ל-compiled או ל-interpreted, וציינו את הפקודה שמוכיחה זאת."
      }
    ]
  },
  "The common languages": {
    "look": [
      {
        "cap": {
          "en": "Browser language, with optional types",
          "he": "שפת הדפדפן, עם טיפוסים אופציונליים"
        },
        "code": "// JavaScript\nconst total = items.reduce((s, i) => s + i.price, 0);\n\n// TypeScript — same idea, checked\nconst total: number = items.reduce(\n  (s: number, i: { price: number }) => s + i.price,\n  0,\n);"
      }
    ],
    "prompts": [
      {
        "en": "Convert this JavaScript function to TypeScript with clear parameter and return types. Keep the behaviour identical.",
        "he": "המירו את פונקציית ה-JavaScript הזאת ל-TypeScript עם טיפוסי פרמטרים והחזרה ברורים. שמרו על אותה התנהגות."
      },
      {
        "en": "Tell me when Python is the shortest path for this task versus staying in TypeScript. Give one concrete example from this repo.",
        "he": "אמרו מתי Python היא הדרך הקצרה למשימה הזאת לעומת להישאר ב-TypeScript. תנו דוגמה קונקרטית אחת מה-repo."
      },
      {
        "en": "From this job post or repo, say which of Go, Rust, Java, or C# dominates and what that usually means about the team.",
        "he": "ממודעת הדרושים או מה-repo, אמרו איזו מבין Go, Rust, Java או C# שולטת ומה זה בדרך כלל אומר על הצוות."
      }
    ]
  },
  "Packages & dependencies": {
    "look": [
      {
        "cap": {
          "en": "Download other people's code safely",
          "he": "מורידים קוד של אחרים בבטחה"
        },
        "code": "$ npm install lodash\nadded 1 package in 1s\n\n# package-lock.json pins exact versions — commit it."
      }
    ],
    "prompts": [
      {
        "en": "Show the exact install command for this project and name the lock file I must commit after dependencies change.",
        "he": "הראו את פקודת ההתקנה המדויקת לפרויקט וציינו את קובץ ה-lock שחייבים לעשות לו commit אחרי שינוי dependencies."
      },
      {
        "en": "Count direct dependencies in this project and flag any that look unused. Suggest one I could delete safely.",
        "he": "ספרו dependencies ישירות בפרויקט וסמנו כאלה שנראות לא בשימוש. הציעו אחת שאפשר למחוק בבטחה."
      },
      {
        "en": "Before adding a new dependency, ask me what problem it solves and what we would write by hand instead in under thirty lines.",
        "he": "לפני שמוסיפים dependency חדשה, שאלו אותי איזו בעיה היא פותרת ומה היינו כותבים ביד במקומה בפחות משלושים שורות."
      }
    ]
  },
  "CSS & responsive layout": {
    "look": [
      {
        "cap": {
          "en": "CSS paints a blue card and puts two boxes in a row.",
          "he": "CSS צובע כרטיס כחול ומניח שתי קופסאות בשורה."
        },
        "code": ".card {\n  background: #2563eb;\n  color: #fff;\n  padding: 16px;\n  border-radius: 12px;\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n}\n.card b { width: 100%; }\n.box {\n  background: #fff;\n  color: #111;\n  padding: 12px;\n  border-radius: 8px;\n  flex: 1;\n}",
        "preview": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\"/>\n<title>CSS card</title>\n<style>\nbody{font-family:system-ui,sans-serif;margin:1.5rem;background:#f1f5f9}\n.card{background:#2563eb;color:#fff;padding:16px;border-radius:12px;display:flex;flex-wrap:wrap;gap:12px}\n.card b{width:100%}\n.box{background:#fff;color:#111;padding:12px;border-radius:8px;flex:1}\n</style>\n</head>\n<body>\n<div class=\"card\">\n  <b>card</b>\n  <div class=\"box\">box</div>\n  <div class=\"box\">box</div>\n</div>\n</body>\n</html>"
      }
    ],
    "prompts": [
      {
        "en": "Add one media query that stacks two boxes vertically under 600px. Show only the changed CSS lines.",
        "he": "הוסיפו media query אחד שמעמיד את שתי הקופסאות אחת מעל השנייה מתחת ל-600px. הראו רק את שורות ה-CSS שהשתנו."
      },
      {
        "en": "Search the project for Tailwind values in square brackets, like p-[13px] or w-[347px]. List each one with the nearest standard class, and replace them only after I approve the list.",
        "he": "חפשו בפרויקט ערכי Tailwind בסוגריים מרובעים, כמו p-[13px] או w-[347px]. רשמו כל אחד עם ה-class הרגיל הכי קרוב, והחליפו אותם רק אחרי שאאשר את הרשימה."
      },
      {
        "en": "Before adding dark mode, list every colour used in this project, including hex codes, rgb() values and Tailwind colour classes. Group them and propose at most 12 named CSS variables to replace them. Do not change files yet.",
        "he": "לפני שמוסיפים dark mode, רשמו כל צבע שמשמש בפרויקט, כולל קודי hex, ערכי rgb() ו-classes של צבע ב-Tailwind. קבצו אותם והציעו עד 12 משתני CSS עם שם שיחליפו אותם. אל תשנו קבצים עדיין."
      }
    ]
  },
  "Component": {
    "look": [
      {
        "cap": {
          "en": "A small function returns the markup for a price card.",
          "he": "פונקציה קטנה מחזירה את ה-markup של כרטיס מחיר."
        },
        "code": "function PriceCard() {\n  return (\n    <div className=\"card\">\n      <h2>Pro plan</h2>\n      <p>$9 / month</p>\n      <button>Buy</button>\n    </div>\n  );\n}",
        "preview": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\"/>\n<title>Component</title>\n<style>\nbody{font-family:system-ui,sans-serif;margin:1.5rem;background:#f1f5f9;color:#0f172a}\n.card{background:#fff;padding:1.25rem;border-radius:10px;border:1px solid #e2e8f0;max-width:14rem}\nh2{margin:0 0 .35rem;font-size:1.15rem}\np{margin:0 0 1rem;color:#334155;font-size:1.25rem;font-weight:600}\nbutton{padding:.5rem 1rem;border:0;border-radius:6px;background:#2563eb;color:#fff;cursor:pointer}\n</style>\n</head>\n<body>\n<div class=\"card\">\n  <h2>Pro plan</h2>\n  <p>$9 / month</p>\n  <button>Buy</button>\n</div>\n</body>\n</html>"
      }
    ],
    "prompts": [
      {
        "en": "Write a tiny JSX function component named PriceCard with a title, a price, and a Buy button. Under fifteen lines.",
        "he": "כתבו function component קטן ב-JSX בשם PriceCard עם כותרת, מחיר וכפתור Buy. פחות מחמש-עשרה שורות."
      },
      {
        "en": "When is plain HTML enough and a framework overkill? Give three concrete page types in one short paragraph.",
        "he": "מתי HTML רגיל מספיק ו-framework מיותר? תנו שלושה סוגי דפים קונקרטיים בפסקה קצרה אחת."
      },
      {
        "en": "List every file in components/ui and say in one line what each component is for. Then find places in the app that hand-build a popup, dropdown or button instead of using one of them.",
        "he": "רשמו כל קובץ ב-components/ui ותגידו בשורה אחת למה כל component משמש. אחר כך מצאו מקומות באפליקציה שבונים ביד חלון קופץ, תפריט נפתח או כפתור במקום להשתמש באחד מהם."
      }
    ]
  },
  "Browser cache & CDN": {
    "look": [
      {
        "cap": {
          "en": "The edge near the user serves the file — origin is skipped",
          "he": "ה-edge הקרוב למשתמש מגיש את הקובץ — מדלגים על ה-origin"
        },
        "code": "user (Tel Aviv)\n  → CDN edge HIT  /static/app.js\n  // origin server in US never sees this request"
      }
    ],
    "prompts": [
      {
        "en": "Explain how to force a fresh CSS file after deploy using a content hash in the filename. Three lines.",
        "he": "בקשו מה-AI להסביר איך לכפות קובץ CSS טרי אחרי deploy עם hash בתוכן שם הקובץ. שלוש שורות."
      },
      {
        "en": "Say which responses in this app should use browser cache, and which must send Cache-Control: no-store.",
        "he": "בקשו מה-AI לומר אילו תשובות באפליקציה צריכות browser cache, ואילו חייבות לשלוח Cache-Control: no-store."
      },
      {
        "en": "List two file types this site should put on a CDN, and one response type that must stay on the origin.",
        "he": "בקשו מה-AI לרשום שני סוגי קבצים שהאתר הזה צריך לשים על CDN, וסוג תשובה אחד שחייב להישאר ב-origin."
      }
    ]
  },
  "Measuring speed": {
    "look": [
      {
        "cap": {
          "en": "Lighthouse scores the page under a slow phone simulation.",
          "he": "Lighthouse נותן ציון לדף תחת סימולציה של טלפון איטי."
        },
        "code": "Lighthouse (Chrome DevTools)\nPerformance     72\nAccessibility   96\nBest Practices  90\nSEO             100\n# lab number — compare before vs after"
      }
    ],
    "prompts": [
      {
        "en": "Write a five-step checklist to run Lighthouse on our staging URL in Chrome DevTools and save the Performance score.",
        "he": "כתבו רשימת חמש שלבים להריץ Lighthouse על כתובת ה-staging ב-Chrome DevTools ולשמור את ציון ה-Performance."
      },
      {
        "en": "In three sentences, why should we compare two Lighthouse runs before trusting that a change made the page faster?",
        "he": "בשלושה משפטים, למה כדאי להשוות שני ריצות Lighthouse לפני שסומכים על כך ששינוי באמת האיץ את הדף?"
      },
      {
        "en": "Give three concrete fixes: one for slow LCP, one for high INP, one for CLS from images without size. Three lines total.",
        "he": "תנו שלושה תיקונים קונקרטיים: אחד ל-LCP איטי, אחד ל-INP גבוה, אחד ל-CLS מתמונות בלי גודל. שלוש שורות בסך הכול."
      }
    ]
  },
  "SEO & link previews": {
    "look": [
      {
        "cap": {
          "en": "Title and description are what search results show.",
          "he": "Title ו-description הם מה שמופיע בתוצאות חיפוש."
        },
        "code": "<title>Vibe to Dev — learn to ship</title>\n<meta name=\"description\" content=\"A short course that teaches beginners how to build and ship real web apps with AI.\" />",
        "preview": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\"/>\n<title>SEO mock</title>\n<style>\nbody{font-family:Arial,Helvetica,sans-serif;margin:1.5rem;background:#fff;color:#202124;max-width:38rem}\n.t{color:#1a0dab;font-size:1.25rem;margin:0 0 .15rem;text-decoration:underline;cursor:pointer}\n.u{color:#006621;font-size:.85rem;margin:0 0 .25rem}\n.s{color:#4d5156;font-size:.9rem;margin:0;line-height:1.4}\n</style>\n</head>\n<body>\n<p class=\"t\">Vibe to Dev — learn to ship</p>\n<p class=\"u\">https://www.example.com/course</p>\n<p class=\"s\">A short course that teaches beginners how to build and ship real web apps with AI.</p>\n</body>\n</html>"
      }
    ],
    "prompts": [
      {
        "en": "Write a title under sixty characters and a meta description under 160 characters for a beginner coding course landing page.",
        "he": "כתבו title מתחת לשישים תווים ו-meta description מתחת ל-160 תווים לדף נחיתה של קורס קוד למתחילים."
      },
      {
        "en": "Write three Open Graph meta tags for og:title, og:description, and og:image for our course homepage. Absolute image URL only.",
        "he": "כתבו שלוש תגיות meta של Open Graph ל-og:title, og:description ו-og:image לדף הבית של הקורס. רק URL מלא לתמונה."
      },
      {
        "en": "Ask the AI for a three-line checklist to verify WhatsApp and LinkedIn can read our share preview after deploy.",
        "he": "בקשו מה-AI רשימת בדיקה בת שלוש שורות לוודא שוואטסאפ ולינקדאין יכולים לקרוא את תצוגת השיתוף אחרי deploy."
      }
    ]
  },
  "Web app vs native app": {
    "look": [
      {
        "cap": {
          "en": "What changes when you leave the browser.",
          "he": "מה משתנה כשיוצאים מהדפדפן."
        },
        "code": "                  web app            native app\nhow people get it a link             an app store\nshipping a fix    deploy, live now   new build + review\ncamera, GPS       yes                yes\nbackground work   very limited       yes\ncode to maintain  one                one per phone, or React Native\ncost to publish   $0                 $99/yr Apple, $25 once Google"
      }
    ],
    "prompts": [
      {
        "en": "List every phone feature my app would need as a mobile app, and for each one say whether a web app in the phone's browser can already do it.",
        "he": "תפרטו כל יכולת של הטלפון שהאפליקציה שלי תצטרך כאפליקציה לטלפון, ולכל אחת תגידו אם web app בדפדפן של הטלפון כבר יכול לעשות את זה."
      },
      {
        "en": "Compare three options for putting my app on phones: improve the web app, wrap it with Capacitor, or build a React Native app that shares my API. Give cost, time, and what I'd maintain long-term.",
        "he": "תשוו בין שלוש אפשרויות להביא את האפליקציה שלי לטלפונים: לשפר את ה-web app, לעטוף אותו ב-Capacitor, או לבנות אפליקציית React Native שחולקת את ה-API שלי. תנו עלות, זמן, ומה אצטרך לתחזק לטווח ארוך."
      },
      {
        "en": "For my app, compare React Native, Flutter, and separate Swift and Kotlin apps. Name the features we need that only one of them handles well, and what each costs to maintain.",
        "he": "עבור האפליקציה שלי, תשוו בין React Native, Flutter, ואפליקציות נפרדות ב-Swift וב-Kotlin. תציינו את היכולות שאנחנו צריכים שרק אחת מהן מטפלת בהן טוב, וכמה עולה לתחזק כל אחת."
      }
    ]
  },
  "Mobile-first design": {
    "look": [
      {
        "cap": {
          "en": "A contacts list built phone-first, with thumb-sized tap targets.",
          "he": "רשימת אנשי קשר בנויה קודם לטלפון, עם שטחי לחיצה בגודל אגודל."
        },
        "code": ".list { display: grid; gap: 10px; }\n.card {\n  display: flex;\n  justify-content: space-between;\n  min-height: 56px;          /* a full row is the tap target */\n  padding: 12px;\n  border-radius: 12px;\n}\n.add { width: 100%; min-height: 48px; }  /* main action, full width */",
        "preview": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\"/>\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"/>\n<title>Mobile first</title>\n<style>\n*{box-sizing:border-box}\nbody{font-family:system-ui,sans-serif;margin:0;background:#e2e8f0;color:#0f172a;display:flex;justify-content:center;padding:1rem}\n.phone{width:320px;background:#fff;border:8px solid #0f172a;border-radius:28px;padding:16px;font-size:16px}\nh1{font-size:1.2rem;margin:0 0 12px}\n.list{display:grid;gap:10px}\n.card{border:1px solid #cbd5e1;border-radius:12px;padding:12px;display:flex;justify-content:space-between;align-items:center;min-height:56px}\n.card b{display:block}\n.card small{color:#475569}\n.stage{font-size:.8rem;background:#dbeafe;color:#1e40af;padding:4px 8px;border-radius:999px}\n.add{margin-top:14px;width:100%;min-height:48px;border:0;border-radius:12px;background:#2563eb;color:#fff;font-size:1rem}\n</style>\n</head>\n<body>\n<div class=\"phone\">\n<h1>Contacts</h1>\n<div class=\"list\">\n<div class=\"card\"><span><b>Dana Levi</b><small>Acme</small></span><span class=\"stage\">lead</span></div>\n<div class=\"card\"><span><b>Omar Haddad</b><small>Northwind</small></span><span class=\"stage\">qualified</span></div>\n<div class=\"card\"><span><b>Mia Chen</b><small>Globex</small></span><span class=\"stage\">won</span></div>\n</div>\n<button class=\"add\">+ Add contact</button>\n</div>\n</body>\n</html>"
      }
    ],
    "prompts": [
      {
        "en": "Rewrite the CSS for my contacts page mobile-first: base styles for a 375px screen, then min-width media queries for tablet and desktop, with every tappable element at least 44 by 44 pixels.",
        "he": "תכתבו מחדש את ה-CSS של דף אנשי הקשר בגישת mobile-first: עיצוב בסיסי למסך של 375px, ואז media queries עם min-width לטאבלט ולמחשב, עם כל אלמנט לחיץ בגודל של לפחות 44 על 44 פיקסלים."
      },
      {
        "en": "Check my pages for mobile-first and touch-target problems: missing viewport tag, fixed widths, hover-only actions, inputs under 16px, and any button or link under 44 by 44 pixels. List each with file and line.",
        "he": "תבדקו את הדפים שלי לבעיות mobile-first ו-touch target: viewport tag חסר, רוחב קבוע, פעולות שיש רק ב-hover, שדות מתחת ל-16px, וכל כפתור או קישור מתחת ל-44 על 44 פיקסלים. תפרטו כל אחת עם הקובץ והשורה."
      },
      {
        "en": "List every action in my app that works only by hover or by a gesture. For each one, suggest a visible button that does the same thing, sized for a thumb.",
        "he": "תפרטו כל פעולה באפליקציה שלי שעובדת רק ב-hover או ב-gesture. לכל אחת, תציעו כפתור גלוי שעושה את אותו דבר, בגודל מתאים לאגודל."
      }
    ]
  },
  "Push notifications & deep links": {
    "look": [
      {
        "cap": {
          "en": "Two kinds of link to the same screen.",
          "he": "שני סוגי קישורים לאותו מסך."
        },
        "code": "pocketcrm://contacts/42\n  app installed:  opens Dana's contact\n  not installed:  nothing happens\n\nhttps://pocketcrm.app/contacts/42\n  app installed:  opens Dana's contact in the app\n  not installed:  opens Dana's contact on the website\n  logged out:     sign in, then back to Dana"
      },
      {
        "cap": {
          "en": "The two files that prove the app and site belong together.",
          "he": "שני הקבצים שמוכיחים שהאפליקציה והאתר שייכים יחד."
        },
        "code": "# https://pocketcrm.app/.well-known/apple-app-site-association  (iPhone)\n{ \"applinks\": { \"details\": [ {\n    \"appIDs\": [\"ABCDE12345.com.example.pocketcrm\"],\n    \"components\": [ { \"/\": \"/contacts/*\" } ]\n} ] } }\n\n# https://pocketcrm.app/.well-known/assetlinks.json  (Android)\n[ { \"relation\": [\"delegate_permission/common.handle_all_urls\"],\n    \"target\": { \"namespace\": \"android_app\",\n                \"package_name\": \"com.example.pocketcrm\",\n                \"sha256_cert_fingerprints\": [\"AB:CD:EF:...\"] } } ]\n\n# both: served as JSON, straight from this address, no redirect"
      }
    ],
    "prompts": [
      {
        "en": "Add reminder notifications to my app. Ask for permission only right after the user sets a follow-up date, explain why in one line, and do nothing if they say no.",
        "he": "תוסיפו התראות תזכורת לאפליקציה שלי. תבקשו רשות רק מיד אחרי שהמשתמש קובע תאריך מעקב, תסבירו למה בשורה אחת, ואל תעשו כלום אם הוא אומר לא."
      },
      {
        "en": "Set up deep links so https://my-domain/contacts/ID opens that contact in the app when installed and on the website otherwise, with the notification linking straight to it. Include both ownership files.",
        "he": "תגדירו deep links כך ש-https://my-domain/contacts/ID יפתח את איש הקשר באפליקציה כשהיא מותקנת ובאתר אם לא, כשההתראה מקשרת ישר אליו. תכללו את שני קובצי הבעלות."
      },
      {
        "en": "Show me how push tokens are stored on my server, one row per device, deleting any the push service says are no longer valid, and check my ownership files load directly with no redirect.",
        "he": "תראו לי איך push tokens נשמרים אצלי בשרת, שורה אחת לכל מכשיר, מחיקת tokens ששירות ה-push אומר שכבר לא תקפים, ובדיקה שקובצי הבעלות שלי נטענים ישירות בלי redirect."
      }
    ]
  },
  "App Store review & updates": {
    "look": [
      {
        "cap": {
          "en": "Review notes that save a rejection.",
          "he": "הערות לבודק שחוסכות דחייה."
        },
        "code": "Notes for the reviewer\n- Demo account: review@pocketcrm.app (password in the sign-in field above)\n- Delete account: Settings > Account > Delete account\n- Camera: only used to scan a business card (Add contact > Scan card)\n- No purchases inside the app\n- Privacy policy: https://pocketcrm.app/privacy"
      },
      {
        "cap": {
          "en": "What can ship in minutes, and what waits for review.",
          "he": "מה אפשר לשלוח בדקות, ומה מחכה לבדיקה."
        },
        "code": "over the air (minutes)             needs a store build (days)\ntext, layout, styles               a new package with native code\nJavaScript logic and bug fixes     a new permission (camera, location)\nimages bundled with the app        app icon, name, splash screen\n                                   a new version of React Native or Expo"
      }
    ],
    "prompts": [
      {
        "en": "Go through Apple's App Store Review Guidelines and Google Play's policies for my app. List every rule we might break, with the guideline number and what to change before I submit.",
        "he": "תעברו על App Store Review Guidelines של Apple ועל המדיניות של Google Play עבור האפליקציה שלי. תפרטו כל כלל שאנחנו עלולים להפר, עם מספר ההנחיה ומה לשנות לפני שאני מגיש."
      },
      {
        "en": "Write the review notes for my app: a demo account, where each feature needing login is, why we ask for each permission, and how to delete an account, so a rejection doesn't cost us days.",
        "he": "תכתבו את ההערות לבודק עבור האפליקציה שלי: חשבון לדוגמה, איפה נמצאת כל יכולת שדורשת login, למה אנחנו מבקשים כל הרשאה, ואיך מוחקים חשבון, כדי שדחייה לא תעלה לנו ימים."
      },
      {
        "en": "Look at what changed since the last store build and tell me whether it can ship as an over-the-air update or needs a new build and review, with a staged rollout and rollback plan.",
        "he": "תסתכלו על מה שהשתנה מאז ה-build האחרון לחנות ותגידו לי אם זה יכול לצאת כ-over-the-air update או שצריך build חדש ובדיקה, עם שחרור הדרגתי ותוכנית rollback."
      }
    ]
  },
  "Request / Response": {
    "look": [
      {
        "cap": {
          "en": "The browser asks a specific endpoint; the server answers. That pair is one round trip.",
          "he": "הדפדפן פונה ל-endpoint ספציפי; השרת עונה. הזוג הזה הוא סיבוב אחד."
        },
        "code": "→ REQUEST\nGET /api/orders/42 HTTP/1.1\nHost: api.example.com\n\n← RESPONSE\nHTTP/1.1 200 OK\nContent-Type: application/json\n\n{\"id\":42,\"status\":\"pending\"}"
      }
    ],
    "prompts": [
      {
        "en": "Draw a six-line request and matching response for GET /orders/42 that returns a JSON order with status pending and status code 200.",
        "he": "ציירו בקשה ותשובה תואמת בשש שורות ל-GET /orders/42 שמחזירה הזמנה ב-JSON עם status pending וקוד 200."
      },
      {
        "en": "List three endpoints for a tiny shop API (list products, get one product, create an order) using method and path only, then say which one you would measure first for slowness.",
        "he": "רשמו שלושה endpoints ל-API קטן של חנות (רשימת מוצרים, מוצר אחד, יצירת הזמנה) עם method ונתיב בלבד, ואז אמרו איזה מהם תמדדו קודם לאיטיות."
      },
      {
        "en": "Ask the AI for a three-bullet story of what happens when a user clicks a link: which endpoint gets called, the request that goes out, and the response that comes back.",
        "he": "בקשו מה-AI סיפור בשלוש נקודות על מה קורה כשמשתמש לוחץ על קישור: איזה endpoint נקרא, הבקשה שיוצאת, והתשובה שחוזרת."
      }
    ]
  },
  "HTTP methods (GET, POST…)": {
    "look": [
      {
        "cap": {
          "en": "Read is GET. Anything with consequences is POST, PUT, PATCH, or DELETE.",
          "he": "קריאה היא GET. כל דבר עם תוצאה הוא POST, PUT, PATCH או DELETE."
        },
        "code": "GET    /api/orders/1   read one order\nPOST   /api/orders     create\nPUT    /api/orders/1   replace whole order\nPATCH  /api/orders/1   change a few fields\nDELETE /api/orders/1   remove"
      }
    ],
    "prompts": [
      {
        "en": "Make a five-line cheat sheet for the same /api/orders resource: GET, POST, PUT, PATCH, and DELETE, each with one verb describing what it does.",
        "he": "עשו דף רמאות בן חמש שורות לאותו משאב /api/orders: GET, POST, PUT, PATCH ו-DELETE, כל אחד עם פועל אחד שמתאר מה הוא עושה."
      },
      {
        "en": "In three sentences, explain why repeating a GET or a DELETE is safe but repeating a payment POST can charge someone twice, and how an idempotency key fixes that.",
        "he": "בשלושה משפטים, הסבירו למה חזרה על GET או DELETE בטוחה אבל חזרה על POST של תשלום יכולה לחייב מישהו פעמיים, ואיך idempotency key פותר את זה."
      },
      {
        "en": "Ask the AI which method fits: read one product, create a cart, rename a title, and remove an item, three answers, one sentence each.",
        "he": "בקשו מה-AI איזה method מתאים: לקרוא מוצר אחד, ליצור עגלה, לשנות כותרת ולהסיר פריט, שלוש תשובות, משפט אחד לכל אחת."
      }
    ]
  },
  "Headers & body (JSON)": {
    "look": [
      {
        "cap": {
          "en": "Headers label the message; the body underneath is JSON data.",
          "he": "Headers מתייגים את ההודעה; ה-body מתחתיהם הוא נתוני JSON."
        },
        "code": "Content-Type: application/json\nAuthorization: Bearer tok_abc\n\n{\"name\":\"Maya\",\"age\":28,\"active\":true,\"nickname\":null}"
      }
    ],
    "prompts": [
      {
        "en": "Show three common headers with a one-line purpose each (Content-Type, Authorization, Accept-Language), then a JSON body they might sit above.",
        "he": "הראו שלושה headers נפוצים עם מטרה בשורה אחת לכל אחד (Content-Type, Authorization, Accept-Language), ואז גוף JSON שהם עשויים לשבת מעליו."
      },
      {
        "en": "Write one JSON object with a string, a number, a boolean, and a null field, no trailing commas, then a four-line fetch call that sends it as the request body with the right Content-Type header.",
        "he": "כתבו אובייקט JSON אחד עם שדה string, number, boolean ו-null, בלי פסיק בסוף, ואז קריאת fetch בת ארבע שורות ששולחת אותו כ-body עם ה-Content-Type הנכון."
      },
      {
        "en": "Ask the AI why a request with a wrong Content-Type header can make a perfectly valid JSON body look empty to the server, and how to fix it in one line.",
        "he": "בקשו מה-AI למה בקשה עם Content-Type שגוי יכולה לגרום ל-body של JSON תקין להיראות ריק לשרת, ואיך לתקן את זה בשורה אחת."
      }
    ]
  },
  "Database: SQL vs NoSQL": {
    "look": [
      {
        "cap": {
          "en": "A table named users, three rows, three columns",
          "he": "טבלה בשם users, שלוש שורות, שלוש עמודות"
        },
        "code": "users\n id | email              | plan\n----+--------------------+-------\n  1 | dana@example.com   | free\n  2 | avi@example.com    | pro\n  3 | noa@example.com    | free"
      },
      {
        "cap": {
          "en": "Same person: one SQL row, one NoSQL document",
          "he": "אותו אדם: שורת SQL אחת ומסמך NoSQL אחד"
        },
        "code": "-- SQL (table row)\nusers: id=1, email='dana@example.com'\n\n-- NoSQL (JSON document)\n{\n  \"_id\": \"1\",\n  \"email\": \"dana@example.com\",\n  \"tags\": [\"pro\", \"israel\"]\n}"
      }
    ],
    "prompts": [
      {
        "en": "List every table in this project and one sentence on what each stores. Reply with a short bullet list only.",
        "he": "בקשו מה-AI לרשום כל טבלה בפרויקט הזה, ומשפט אחד על מה כל אחת שומרת. רק רשימת נקודות קצרה."
      },
      {
        "en": "Rewrite this SQL users row as a short NoSQL JSON document, keeping only id, email, and one nested field.",
        "he": "בקשו מה-AI להמיר שורת user ב-SQL למסמך NoSQL קצר ב-JSON. רק id, email, ושדה מקונן אחד."
      },
      {
        "en": "Show me how this app connects to the database: file name, connection string location, and one sample query.",
        "he": "בקשו מה-AI להראות איך האפליקציה מתחברת ל-database: שם הקובץ, איפה מחרוזת החיבור, ודוגמת query אחת."
      }
    ]
  },
  "Schema & migration": {
    "look": [
      {
        "cap": {
          "en": "The shape of users before any data exists",
          "he": "הצורה של users לפני שיש נתונים"
        },
        "code": "CREATE TABLE users (\n  id         SERIAL PRIMARY KEY,\n  email      TEXT NOT NULL UNIQUE,\n  created_at TIMESTAMPTZ NOT NULL DEFAULT now()\n);"
      },
      {
        "cap": {
          "en": "One file that adds a plan column, run once, in order",
          "he": "קובץ אחד שמוסיף עמודת plan, רץ פעם אחת, לפי הסדר"
        },
        "code": "-- file: 004_add_plan.sql\nALTER TABLE users\n  ADD COLUMN plan TEXT NOT NULL DEFAULT 'free';"
      }
    ],
    "prompts": [
      {
        "en": "Write a CREATE TABLE for products with id, name, and price_cents. Show only the SQL, nothing else.",
        "he": "בקשו מה-AI לכתוב CREATE TABLE ל-products עם id, name ו-price_cents. רק את ה-SQL, בלי שום דבר אחר."
      },
      {
        "en": "Write a migration file named 005_add_phone.sql that adds a nullable phone column to users. SQL only.",
        "he": "בקשו מה-AI לכתוב קובץ migration בשם 005_add_phone.sql שמוסיף עמודת phone ריקה ל-users. רק SQL."
      },
      {
        "en": "Find the schema file for users in this repo and quote the column list, then find the latest migration and say what it changes.",
        "he": "בקשו מה-AI למצוא את קובץ ה-schema של users ולצטט את רשימת העמודות, ואז למצוא את ה-migration האחרון ולומר מה הוא משנה."
      }
    ]
  },
  "Query & index": {
    "look": [
      {
        "cap": {
          "en": "Ask for free plans, three matching rows come back",
          "he": "שואלים על תוכניות free, חוזרות שלוש שורות מתאימות"
        },
        "code": "SELECT id, email, plan\nFROM users\nWHERE plan = 'free';\n\n-- result\n id | email            | plan\n----+------------------+------\n  1 | dana@example.com | free\n  3 | noa@example.com  | free\n  7 | eli@example.com  | free"
      },
      {
        "cap": {
          "en": "An index on email so lookups skip the full scan",
          "he": "index על email כדי שחיפוש ידלג על סריקה מלאה"
        },
        "code": "-- without index: scan every row\nSELECT * FROM users WHERE email = 'dana@example.com';\n\n-- with index: jump straight to the row\nCREATE INDEX users_email_idx ON users (email);"
      }
    ],
    "prompts": [
      {
        "en": "Write a SELECT that returns email and created_at for users created today. Show the SQL only.",
        "he": "בקשו מה-AI לכתוב SELECT שמחזיר email ו-created_at למשתמשים שנוצרו היום. רק את ה-SQL."
      },
      {
        "en": "Suggest one index for a users table queried often by email. Show the CREATE INDEX line only.",
        "he": "בקשו מה-AI להציע index אחד לטבלת users שמחפשים בה הרבה לפי email. רק שורת CREATE INDEX."
      },
      {
        "en": "Explain in three sentences when an index helps a WHERE clause and when it just slows writes.",
        "he": "בקשו מה-AI להסביר בשלושה משפטים מתי index עוזר ל-WHERE ומתי הוא רק מאט כתיבות."
      }
    ]
  },
  "Unit / Integration / E2E": {
    "look": [
      {
        "cap": {
          "en": "One function, a few pieces together, or the whole app in a browser",
          "he": "פונקציה אחת, כמה חלקים ביחד, או כל האפליקציה בדפדפן"
        },
        "code": "# unit — pure function, no network\nexpect(add(2, 3)).toBe(5);\n\n# integration — API + database\nconst res = await request(app).get(\"/users/42\");\nexpect(res.status).toBe(200);\n\n# E2E — real browser clicks\nawait page.click(\"text=Sign in\");\nawait expect(page).toHaveURL(\"/dashboard\");"
      },
      {
        "cap": {
          "en": "Fake the outside world; fixture is the sample data",
          "he": "מזייפים את העולם החיצוני; fixture הוא נתון הדוגמה"
        },
        "code": "// fixture — known sample row\nconst user = { id: 42, email: \"ada@example.com\" };\n\n// mock — fake the HTTP call\nfetch.mockResolvedValue({\n  ok: true,\n  json: async () => user,\n});\n\nconst got = await loadUser(42);\nexpect(got.email).toBe(\"ada@example.com\");"
      }
    ],
    "prompts": [
      {
        "en": "Explain unit, integration, and E2E with one example each for a login feature, and say which layer should catch a wrong password hash.",
        "he": "הסבירו unit, integration ו-E2E עם דוגמה אחת לכל שכבה לפיצ'ר login, ואמרו איזו שכבה אמורה לתפוס hash סיסמה שגוי."
      },
      {
        "en": "Review this test file and say which mocks hide real bugs, then flag any tests that are too slow or brittle to run on every commit.",
        "he": "עברו על קובץ הטסט ואמרו אילו mocks מסתירים באגים אמיתיים, וסמנו טסטים שאיטיים או שבריריים מדי כדי לרוץ בכל commit."
      },
      {
        "en": "For this bug, name the smallest test level that would have caught it, sketch that one test, and say what it should mock versus run for real.",
        "he": "עבור הבאג הזה, ציינו את רמת הטסט הכי קטנה שהייתה תופסת אותו, שרטטו את הטסט הזה, ואמרו למה לעשות mock ומה להריץ באמת."
      }
    ]
  },
  "Regression & coverage": {
    "look": [
      {
        "cap": {
          "en": "A bug came back — lock it with a test that stays",
          "he": "באג חזר — נועלים אותו עם טסט שנשאר"
        },
        "code": "// bug: shippingCost(200) returned 15 again after a refactor\ntest(\"regression: free shipping at exactly 200\", () => {\n  expect(shippingCost(200)).toBe(0);\n});\n\n# once green, keep this test forever\n# so the same mistake cannot sneak back in"
      },
      {
        "cap": {
          "en": "How much of the code the tests actually ran",
          "he": "כמה מהקוד הטסטים באמת הריצו"
        },
        "code": "$ npm test -- --coverage\n\nFile          | % Stmts\n--------------|--------\nshipping.js   |   100\norders.js     |    72\nauth.js       |    40   <-- almost untested\n\n# coverage is a flashlight, not a grade\n# 100% still misses the wrong rule"
      }
    ],
    "prompts": [
      {
        "en": "Explain what a regression test is, and why we keep it forever even after the bug it describes is fixed.",
        "he": "הסבירו מהו regression test, ולמה משאירים אותו לנצח גם אחרי שהבאג שהוא מתאר תוקן."
      },
      {
        "en": "This bug was fixed twice before it came back. Write one regression test that would have blocked the second return, and explain why 100% coverage didn't stop it.",
        "he": "הבאג הזה תוקן פעמיים לפני שחזר. כתבו regression test אחד שהיה חוסם את החזרה השנייה, והסבירו למה 100% coverage לא עצר את זה."
      },
      {
        "en": "Run coverage on this package, list the three files with the lowest numbers, and draft one regression-style test for the riskiest file among them.",
        "he": "הריצו coverage על החבילה, רשמו את שלושת הקבצים עם המספרים הנמוכים ביותר, ונסחו regression test אחד לקובץ הכי מסוכן מביניהם."
      }
    ]
  },
  "Refactoring & tech debt": {
    "look": [
      {
        "cap": {
          "en": "Same behaviour. Clearer names. No new features.",
          "he": "אותה התנהגות. שמות ברורים יותר. בלי features חדשים."
        },
        "code": "// before\nfunction calc(a, b) { return a + a * b; }\n\n// after — same maths, readable names\nfunction priceWithTax(cents, taxRate) {\n  return cents + cents * taxRate;\n}"
      }
    ],
    "prompts": [
      {
        "en": "Refactor only the names in this function without changing behavior, and say what technical debt it would leave behind if we stopped there.",
        "he": "עשו refactor רק לשמות בפונקציה הזו בלי לשנות התנהגות, ואמרו איזה חוב טכני זה היה משאיר אם היינו עוצרים שם."
      },
      {
        "en": "Extract the repeated discount math into one helper, keep existing tests green, and tell me what interest we'd pay if we copy it three more times instead.",
        "he": "חלצו את חישוב ההנחה החוזר ל-helper אחד, השאירו את ה-tests הקיימים ירוקים, ותגידו איזו ריבית היינו משלמים אם היינו מעתיקים אותו עוד שלוש פעמים."
      },
      {
        "en": "List three safe refactors for this file ranked by risk, and note which shortcuts each one would pay down instead of adding new debt.",
        "he": "רשמו שלושה refactors בטוחים לקובץ הזה מדורגים לפי סיכון, וציינו אילו קיצורי דרך כל אחד מהם היה מחזיר במקום להוסיף חוב חדש."
      }
    ]
  },
  "Session, cookie & token": {
    "look": [
      {
        "cap": {
          "en": "One cookie line the browser stores for you",
          "he": "שורת cookie אחת שהדפדפן שומר בשבילכם"
        },
        "code": "Set-Cookie: sid=abc123; HttpOnly; Secure; SameSite=Lax"
      },
      {
        "cap": {
          "en": "Three parts: header.payload.signature - payload is readable",
          "he": "שלושה חלקים: header.payload.signature - ה-payload קריא"
        },
        "code": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0MiIsInJvbGUiOiJ1c2VyIn0.sig_demo\n#      header      .         payload              . signature\n\n# decode payload (base64) -> {\"sub\":\"42\",\"role\":\"user\"}\n# anyone holding the JWT can READ the payload\n# do not put secrets inside; verify the signature on the server"
      }
    ],
    "prompts": [
      {
        "en": "Explain HttpOnly, Secure, and SameSite=Lax on a session cookie, and separately explain why a JWT payload is readable by anyone. What does each protect against?",
        "he": "הסבירו HttpOnly, Secure ו-SameSite=Lax על session cookie, ובנפרד הסבירו למה ה-payload של JWT קריא לכל אחד. ממה כל אחד מהם מגן?"
      },
      {
        "en": "Review how we set the session cookie and how we handle JWTs. Are HttpOnly, Secure, and SameSite present? Do we call verify instead of decode? Fix any gaps.",
        "he": "עברו על איך אנחנו מגדירים את ה-session cookie ואיך מטפלים ב-JWT. האם יש HttpOnly, Secure ו-SameSite? האם קוראים ל-verify ולא ל-decode? תקנו כל פער."
      },
      {
        "en": "Harden logout end to end: clear the session cookie, delete the server-side session row, and confirm any JWT we issue expires in minutes, not days.",
        "he": "חזקו את ה-logout מקצה לקצה: נקו את ה-cookie של ה-session, מחקו את שורת ה-session בשרת, ותוודאו שכל JWT שאנחנו מנפיקים פג תוך דקות, לא ימים."
      }
    ]
  },
  "HTTPS & encryption": {
    "look": [
      {
        "cap": {
          "en": "The lock in the address bar: traffic is encrypted on the wire",
          "he": "המנעול בשורת הכתובת: התעבורה מוצפנת על הקו"
        },
        "code": "http://api.example.com   # plain text on the wire - bad for passwords\nhttps://api.example.com  # TLS wraps the connection\n\n# browser checks the certificate, then encrypts\nGET /login\nAuthorization: Bearer tok_user_42\n# outsiders see only scrambled bytes"
      },
      {
        "cap": {
          "en": "Hash is one-way; encryption can be unlocked with a key",
          "he": "Hash הוא חד-כיווני; הצפנה אפשר לפתוח עם מפתח"
        },
        "code": "# hashing - store passwords this way (one-way)\npassword \"secret\" -> hash \"$2b$10$...\"\n# you can check a guess; you cannot get the password back\n\n# encryption - hide data you must read later\n\"card last4 4242\" + key -> \"a8f3...\"\n# with the same key you can decrypt back to text"
      }
    ],
    "prompts": [
      {
        "en": "Explain HTTPS and TLS, and separately explain hashing versus encryption. Which one protects data in transit, and which do we use for stored passwords?",
        "he": "הסבירו HTTPS ו-TLS, ובנפרד הסבירו hashing מול הצפנה. מה מגן על נתונים בתנועה, ובמה משתמשים לסיסמאות שמורות?"
      },
      {
        "en": "Review our public URLs and password storage together. Is every login on https? Do we hash passwords with bcrypt or argon2 instead of encrypting them?",
        "he": "עברו יחד על הכתובות הציבוריות ואחסון הסיסמאות. האם כל login עובר ב-https? האם עושים hashing לסיסמאות עם bcrypt או argon2 במקום להצפין אותן?"
      },
      {
        "en": "Harden production: redirect http to https, enable HSTS, and confirm no password field anywhere gets encrypted instead of hashed.",
        "he": "חזקו פרודקשן: הפנו http ל-https, הפעילו HSTS, וודאו ששום שדה סיסמה לא מוצפן במקום לעבור hashing."
      }
    ]
  },
  "Secrets & env vars": {
    "look": [
      {
        "cap": {
          "en": "Secrets live in env, never in source code",
          "he": "סודות חיים ב-env, אף פעם לא בקוד המקור"
        },
        "code": "# .env.local  (gitignored)\nDATABASE_URL=postgres://user:pass@localhost:5432/app\nAPI_KEY=sk_test_123\n\n# in code - read, do not hard-code\nconst key = process.env.API_KEY;\n\n# .env.example  (safe to commit)\nAPI_KEY=sk_test_xxx\nDATABASE_URL=postgres://USER:PASS@HOST:5432/DB"
      },
      {
        "cap": {
          "en": "Find a leaked secret in old commits, then rotate it",
          "he": "מוצאים סוד שדלף ב-commits ישנים, ואז מחליפים אותו"
        },
        "code": "git log -S \"API_KEY\" --oneline\n# if it shows up in history, the secret is burned\n# 1) rotate / revoke the key at the provider\n# 2) put the new value only in env / secret store\n# 3) never commit .env again"
      }
    ],
    "prompts": [
      {
        "en": "Explain why secrets belong in environment variables, not code, and why deleting a committed key from the latest commit is not enough to remove it.",
        "he": "הסבירו למה סודות שייכים למשתני סביבה ולא לקוד, ולמה מחיקת מפתח שעבר commit מה-commit האחרון לא מספיקה כדי להסיר אותו."
      },
      {
        "en": "Scan the repo and its git history for hard-coded secrets, .env files that are not ignored, and any past commits containing keys like sk_live_ or API_KEY.",
        "he": "סרקו את הריפו ואת היסטוריית ה-git שלו לסודות בקוד, קבצי .env שלא ב-.gitignore, וכל commit ישן שמכיל מפתחות כמו sk_live_ או API_KEY."
      },
      {
        "en": "Add a pre-commit check that blocks files named .env and strings that look like sk_live_ or API_KEY, and a startup check that exits if a required secret is missing.",
        "he": "הוסיפו בדיקת pre-commit שחוסמת קבצים בשם .env ומחרוזות שנראות כמו sk_live_ או API_KEY, ובדיקת עלייה שיוצאת אם סוד נדרש חסר."
      }
    ]
  },
  "Threat model & OWASP Top 10": {
    "look": [
      {
        "cap": {
          "en": "A tiny threat model, and the checklist that follows it",
          "he": "מודל איומים זעיר, והצ'ק-ליסט שבא אחריו"
        },
        "code": "# tiny threat model for a shop\nAssets:   orders, passwords, API keys\nActors:   random internet, jealous rival, curious staff\nEntry:    /login, /api/orders, admin panel\n\n# now walk OWASP against those entry points\nA01 Broken access   - GET /orders/42 with no owner check\nA03 Injection       - use WHERE email = $1, not string glue\nA07 Auth failures   - rate-limit /login, add MFA"
      }
    ],
    "prompts": [
      {
        "en": "Write a one-page threat model for this app: assets, actors, entry points, and the top three worries, then note which OWASP Top 10 category each worry maps to.",
        "he": "כתבו threat model של עמוד אחד לאפליקציה: נכסים, שחקנים, נקודות כניסה ושלוש הדאגות העליונות, וציינו לאיזו קטגוריית OWASP Top 10 כל דאגה שייכת."
      },
      {
        "en": "Walk the OWASP Top 10 against these handlers one item at a time. For each, say whether it applies and cite the exact line, using our threat model's list of doors as the starting point.",
        "he": "עברו על OWASP Top 10 מול ה-handlers האלה פריט אחר פריט. לכל אחד אמרו אם רלוונטי וציינו שורה מדויקת, תוך שימוש ברשימת הדלתות ממודל האיומים שלנו כנקודת התחלה."
      },
      {
        "en": "Pick our top threat model worry and our top OWASP risk, then write one failing test or checklist item a junior developer could finish this week for each.",
        "he": "בחרו את הדאגה העליונה ממודל האיומים ואת סיכון ה-OWASP העליון, וכתבו לכל אחד טסט שנכשל או פריט צ'ק-ליסט שג'וניור יכול לסיים השבוע."
      }
    ]
  },
  "XSS, CSRF & CORS": {
    "look": [
      {
        "cap": {
          "en": "Put user text into the page as text, not HTML",
          "he": "שימו טקסט משתמש בעמוד כטקסט, לא כ-HTML"
        },
        "code": "// SAFE - text stays text (no HTML runs)\nconst el = document.getElementById(\"bio\");\nel.textContent = user.bio;\n\n// also set a strict cookie for session forms\n// Set-Cookie: sid=abc; HttpOnly; Secure; SameSite=Lax"
      },
      {
        "cap": {
          "en": "The browser asks if another origin may call your API",
          "he": "הדפדפן שואל אם מקור אחר רשאי לקרוא ל-API שלכם"
        },
        "code": "# browser on https://shop.example calls https://api.example\nOrigin: https://shop.example\n\n# API answers (allowlist - not *)\nAccess-Control-Allow-Origin: https://shop.example\nAccess-Control-Allow-Credentials: true\n\n# wrong for cookie sessions:\n# Access-Control-Allow-Origin: *"
      }
    ],
    "prompts": [
      {
        "en": "Explain XSS, CSRF, and CORS in plain words, and be clear that CORS is a browser rule, not an attack. For each, describe one fix we should apply in our app.",
        "he": "הסבירו XSS, CSRF ו-CORS במילים פשוטות, והבהירו ש-CORS הוא כלל של הדפדפן ולא התקפה. לכל אחד תארו תיקון אחד ליישום אצלנו."
      },
      {
        "en": "Review every place we render user bio or comments and replace innerHTML with textContent or a safe escape helper, then confirm SameSite and a CSRF token on state-changing forms.",
        "he": "עברו על כל מקום שמציגים bio או תגובות משתמש והחליפו innerHTML ב-textContent או helper בטוח, ואז ודאו SameSite וטוקן CSRF על טפסים שמשנים מצב."
      },
      {
        "en": "Our frontend is at https://app.example. Review our CORS config, list allowed origins and whether credentials are on, and tighten any wildcard you find.",
        "he": "הפרונט שלנו ב-https://app.example. עברו על הגדרת ה-CORS, רשמו origins מורשים והאם credentials דלוקים, וחזקו כל wildcard שתמצאו."
      }
    ]
  },
  "Supply chain & patching": {
    "look": [
      {
        "cap": {
          "en": "Your app includes other people's packages - review them",
          "he": "האפליקציה כוללת חבילות של אחרים, בודקים אותן"
        },
        "code": "$ npm install left-pad@1.0.0\n# package-lock.json pins exact versions\n\n$ npm audit\n# 2 high severity in transitive deps\n\n# habits: prefer known maintainers, pin versions,\n# read the changelog before a major bump"
      },
      {
        "cap": {
          "en": "A named hole in a package, and the version that closes it",
          "he": "חור עם שם בחבילה, והגרסה שסוגרת אותו"
        },
        "code": "CVE-2024-12345  in  lodash  < 4.17.21\nfixed in        lodash  4.17.21\n\n$ npm update lodash\n# package-lock.json now shows 4.17.21\n\n# patch soon, then redeploy so production actually runs it"
      }
    ],
    "prompts": [
      {
        "en": "Explain software supply chain risk for npm packages, including why AI-hallucinated package names are dangerous and why the lockfile matters for security.",
        "he": "הסבירו סיכון supply chain לחבילות npm, כולל למה שמות packages שה-AI ממציא מסוכנים ולמה ה-lockfile חשוב לאבטחה."
      },
      {
        "en": "Before adding this new dependency, check its weekly downloads, last publish date, and open critical issues, and say whether a few lines of our own code would do instead.",
        "he": "לפני שמוסיפים את התלות החדשה, בדקו הורדות שבועיות, תאריך פרסום אחרון ו-issues קריטיים פתוחים, ותגידו אם כמה שורות קוד משלנו יספיקו במקום."
      },
      {
        "en": "Run npm audit on this project, list outdated packages with known CVEs, and propose the minimal safe upgrades that keep the tests passing.",
        "he": "הריצו npm audit על הפרויקט, רשמו חבילות מיושנות עם CVE ידועים, והציעו את השדרוגים הבטוחים המינימליים ששומרים על הטסטים ירוקים."
      }
    ]
  },
  "Security headers & encryption at rest": {
    "look": [
      {
        "cap": {
          "en": "One header that limits where scripts and pages may load from",
          "he": "כותרת אחת שמגבילה מאיפה מותר לטעון סקריפטים ועמודים"
        },
        "code": "Content-Security-Policy: default-src 'self'"
      },
      {
        "cap": {
          "en": "Locked on disk, and locked while moving on the network",
          "he": "נעול על הדיסק, ונעול בזמן תנועה ברשת"
        },
        "code": "# in transit - HTTPS / TLS\nhttps://api.example.com/users/42\n\n# at rest - disk or database encryption\n# cloud Postgres: \"encryption at rest\" toggle ON\n# backups: stored encrypted in the bucket\n\n# both matter: TLS protects the road; at-rest protects the parked car"
      }
    ],
    "prompts": [
      {
        "en": "Review our response headers and confirm CSP, X-Frame-Options, and HSTS are set. Suggest the smallest missing lines using a middleware like helmet.",
        "he": "עברו על כותרות התשובה וודאו ש-CSP, X-Frame-Options ו-HSTS מוגדרים. הציעו את השורות החסרות הקטנות ביותר עם middleware כמו helmet."
      },
      {
        "en": "Explain encryption in transit versus at rest with a database example, and confirm whether our database and cache connections actually use TLS.",
        "he": "הסבירו הצפנה in transit מול at rest עם דוגמת מסד נתונים, וודאו האם החיבורים שלנו למסד ול-cache באמת משתמשים ב-TLS."
      },
      {
        "en": "Confirm our backups are encrypted at rest, that restore still works, and document the one test restore we ran this quarter.",
        "he": "ודאו שהגיבויים שלנו מוצפנים at rest, ששחזור עדיין עובד, ותעדו את שחזור הבדיקה האחד שביצענו הרבעון."
      }
    ]
  },
  "API keys: sandbox vs live": {
    "look": [
      {
        "cap": {
          "en": "Only the prefix tells you which world you're in",
          "he": "רק ה-prefix אומר לכם באיזה עולם אתם"
        },
        "code": "# .env.local  (never commit real values)\nSTRIPE_KEY=sk_test_123     # sandbox: fake cards, no real money\n# STRIPE_KEY=sk_live_456   # live: real charges - only in production\n\n# rule of thumb:\n# sk_test_...  -> safe to play\n# sk_live_...  -> real money, real emails"
      }
    ],
    "prompts": [
      {
        "en": "Explain the difference between an API key and OAuth, and between sandbox and live keys, using one example of each for a small shop app.",
        "he": "הסבירו את ההבדל בין API key ל-OAuth, ובין מפתחות sandbox ל-live, עם דוגמה אחת לכל אחד עבור אפליקציית חנות קטנה."
      },
      {
        "en": "Review this repo for any live API keys such as sk_live_ in source files or example env files. List every match and how to remove it safely.",
        "he": "בדקו את הריפו הזה עבור מפתחות live כמו sk_live_ בקבצי קוד או קבצי env לדוגמה. רשמו כל ממצא ואיך להסיר אותו בבטחה."
      },
      {
        "en": "Harden our config so the app refuses to start in production with a sandbox key, and refuses to run locally with a live key.",
        "he": "חזקו את הקונפיג שלנו כך שהאפליקציה תסרב לעלות ב-production עם מפתח sandbox, ותסרב לרוץ מקומית עם מפתח live."
      }
    ]
  },
  "Timeouts & retries": {
    "look": [
      {
        "cap": {
          "en": "A timeout and a growing wait between tries",
          "he": "timeout והפסקה שגדלה בין ניסיון לניסיון"
        },
        "code": "async function getOrder(id) {\n  for (let i = 0; i < 3; i++) {\n    const res = await fetch(`/orders/${id}`, { signal: AbortSignal.timeout(5000) }); // 5s timeout\n    if (res.ok) return res.json();\n    if (res.status < 500) throw new Error(\"no retry\"); // 4xx: stop\n    await sleep(200 * (i + 1)); // 200ms, 400ms, 600ms\n  }\n}"
      },
      {
        "cap": {
          "en": "Library call vs writing the HTTP yourself",
          "he": "קריאה דרך ספרייה מול כתיבת ה-HTTP בעצמכם"
        },
        "code": "// SDK — the vendor's helper\nconst user = await client.users.get(42);\n\n// same idea with raw HTTP\nconst res = await fetch(\"https://api.example.com/v1/users/42\", {\n  headers: { Authorization: \"Bearer sk_test_123\" },\n});\nconst user2 = await res.json();"
      }
    ],
    "prompts": [
      {
        "en": "Explain timeout and retry for an outbound API call. When is it safe to retry automatically, and when should we stop and use the SDK instead of raw HTTP?",
        "he": "הסבירו timeout ו-retry לקריאת API יוצאת. מתי בטוח לנסות שוב אוטומטית, ומתי צריך לעצור ולהשתמש ב-SDK במקום HTTP גולמי?"
      },
      {
        "en": "Review every outbound call in this file. Where is the timeout, which status codes retry, and would the provider's own SDK already handle any of this for us?",
        "he": "עברו על כל קריאה יוצאת בקובץ הזה. איפה ה-timeout, אילו קודי סטטוס מנסים שוב, וייתכן שה-SDK של הספק כבר מטפל בזה בשבילנו?"
      },
      {
        "en": "Harden this retry loop: cap it at three tries with backoff, never retry a POST that charges a card without an idempotency key, and note if an SDK already does this safely.",
        "he": "חזקו את לולאת ה-retry: מקסימום שלושה ניסיונות עם backoff, לעולם לא לנסות שוב POST שמחייב כרטיס בלי idempotency key, וציינו אם יש SDK שכבר עושה את זה בבטחה."
      }
    ]
  },
  "API styles & versions": {
    "look": [
      {
        "cap": {
          "en": "Many fixed URLs vs one query that asks for fields",
          "he": "הרבה כתובות קבועות מול שאילתה אחת שמבקשת שדות"
        },
        "code": "# REST — one URL, fixed shape\nGET /users/42\n{ \"id\": 42, \"name\": \"Ada\", \"email\": \"a@x.com\" }\n\n# GraphQL — one endpoint, you pick fields\nPOST /graphql\n{ \"query\": \"{ user(id: 42) { name } }\" }\n{ \"data\": { \"user\": { \"name\": \"Ada\" } } }"
      },
      {
        "cap": {
          "en": "Old clients keep /v1 while new ones use /v2",
          "he": "קליינטים ישנים נשארים ב-/v1 וחדשים עוברים ל-/v2"
        },
        "code": "# v1 — email was a string\nGET /v1/users/42\n{ \"id\": 42, \"email\": \"a@x.com\" }\n\n# v2 — email became an object (breaking change)\nGET /v2/users/42\n{ \"id\": 42, \"email\": { \"address\": \"a@x.com\", \"verified\": true } }\n\n# rule: never break /v1; add /v2 instead"
      }
    ],
    "prompts": [
      {
        "en": "Explain REST vs GraphQL for a beginner, and when is a simple REST endpoint enough instead of reaching for GraphQL?",
        "he": "הסבירו REST מול GraphQL למתחילים, ומתי endpoint פשוט של REST מספיק במקום לפנות ל-GraphQL?"
      },
      {
        "en": "Here is our OpenAPI spec. Review this client and point out every field or status code that doesn't match it.",
        "he": "הנה ה-OpenAPI spec שלנו, עברו על הקליינט הזה וציינו כל שדה או קוד סטטוס שלא תואם אותו."
      },
      {
        "en": "Review this PR that changes the JSON shape of GET /users. Is it safe for current clients, or do we need a new /v2 version?",
        "he": "עברו על ה-PR שמשנה את צורת ה-JSON של GET /users. האם זה בטוח ללקוחות הנוכחיים, או שצריך גרסה חדשה /v2?"
      }
    ]
  },
  "Background job & queue": {
    "look": [
      {
        "cap": {
          "en": "API enqueues, worker does the slow work",
          "he": "ה-API מכניס ל-queue, ה-worker עושה את העבודה האיטית"
        },
        "code": "API:    enqueue send_email job\nqueue:  [job_41, job_42]\nworker: pop job_41 -> send email"
      }
    ],
    "prompts": [
      {
        "en": "Write a tiny job payload to send a welcome email to user 812. Show JSON only: type and userId.",
        "he": "בקשו מה-AI לכתוב payload קטן של job לשליחת welcome email למשתמש 812. רק JSON: type ו-userId."
      },
      {
        "en": "List three tasks in this codebase that should use a queue. For each, say why doing it inside the HTTP request is a bad idea.",
        "he": "רשמו שלוש משימות בקוד שצריכות queue. לכל אחת, אמרו למה לעשות אותה בתוך בקשת HTTP זה רעיון רע."
      },
      {
        "en": "Move this slow email send off the request path into a queue and worker. Show the API response and the worker function only.",
        "he": "העבירו את שליחת המייל האיטית מחוץ לנתיב הבקשה ל-queue ו-worker. הראו רק את תשובת ה-API ואת פונקציית ה-worker."
      }
    ]
  },
  "Long tasks & real-time": {
    "look": [
      {
        "cap": {
          "en": "Status field the client polls",
          "he": "שדה סטטוס שהלקוח עושה עליו polling"
        },
        "code": "job export id=91\n  status: queued\n  status: running   progress: 46%\n  status: done       url: ..."
      },
      {
        "cap": {
          "en": "Server pushes without a new request",
          "he": "השרת דוחף בלי בקשה חדשה"
        },
        "code": "// WebSocket - server pushes\n{ \"type\": \"chat\", \"text\": \"hi Dana\" }\n\n// SSE - one open stream of events\nevent: progress\ndata: {\"pct\": 40}"
      }
    ],
    "prompts": [
      {
        "en": "Design a tiny status object for a 5,000-row import: id, status, and a done count. Show one JSON object only.",
        "he": "בקשו מה-AI לעצב אובייקט סטטוס קטן לייבוא של 5,000 שורות: id, status, ומספר שורות שהושלמו. רק אובייקט JSON אחד."
      },
      {
        "en": "Say whether this feature needs polling, SSE, or WebSocket, and give one sentence why. Feature: a live order-status bar on checkout.",
        "he": "בקשו מה-AI לומר אם הפיצ'ר הזה צריך polling, SSE או WebSocket, ומשפט אחד למה. הפיצ'ר: סרגל סטטוס הזמנה חי במסך הקופה."
      },
      {
        "en": "Find any queue, task-status, WebSocket, or SSE code already in this project, and name the file plus what it's used for.",
        "he": "בקשו מה-AI למצוא קוד של queue, סטטוס task, WebSocket או SSE שכבר קיים בפרויקט, ולציין את הקובץ ולמה הוא משמש."
      }
    ]
  },
  "Events, dead letters & eventual consistency": {
    "look": [
      {
        "cap": {
          "en": "The order exists before the invoice does",
          "he": "ההזמנה קיימת לפני שהחשבונית קיימת"
        },
        "code": "t=0.00s  POST /orders             -> 201 { id: \"7c3f\", status: \"placed\" }\nt=0.05s  GET  /orders/7c3f/invoice -> 404   // not a bug, not yet\nt=2.10s  worker: invoice created\nt=2.11s  GET  /orders/7c3f/invoice -> 200"
      }
    ],
    "prompts": [
      {
        "en": "Write one event name and payload for 'user signed up', and list two subscribers this app should have for it, one action each.",
        "he": "בקשו מה-AI לכתוב שם event אחד ו-payload ל-'user signed up', ולרשום שני subscribers שהאפליקציה צריכה בשבילו, פעולה אחת לכל אחד."
      },
      {
        "en": "Add a dedupe check to this event subscriber so it stays safe if the broker delivers the same message twice. Show only the changed lines.",
        "he": "הוסיפו בדיקת דדופ ל-subscriber הזה כדי שהוא יישאר בטוח אם ה-broker מוסר את אותה הודעה פעמיים. תראו רק את השורות שהשתנו."
      },
      {
        "en": "Find whether this project has a dead-letter or failed-jobs queue already, and name the file or table if one exists.",
        "he": "בקשו מה-AI לבדוק אם לפרויקט כבר יש dead-letter queue או failed-jobs, ולציין את הקובץ או הטבלה אם קיימים."
      }
    ]
  },
  "Hosted checkout & merchant of record": {
    "look": [
      {
        "cap": {
          "en": "Card stays on the provider's page.",
          "he": "הכרטיס נשאר בדף של הספק."
        },
        "code": "// your app\nopenCheckout({ priceId: \"pri_abc123\" })\n\n// browser goes to provider.example/checkout/...\n// card fields live on THEIR page, not yours"
      },
      {
        "cap": {
          "en": "They sell; you get paid.",
          "he": "הם מוכרים; אתם מקבלים תשלום."
        },
        "code": "Buyer receipt\n  Sold by: Acme Payments Inc. (merchant of record)\n  Item: Starter pack - $29\n\nYour dashboard\n  payout_id: pay_9f2a\n  net: $24.80 after fees"
      }
    ],
    "prompts": [
      {
        "en": "Explain the difference between hosted checkout and merchant of record in plain words. Which one keeps card data off my server, and which one takes tax and legal-seller duties off my plate?",
        "he": "הסבירו בפשטות את ההבדל בין hosted checkout ל-merchant of record. מי שומר את נתוני הכרטיס מחוץ לשרת שלי, ומי לוקח מעליי את המס ואת תפקיד המוכר החוקי?"
      },
      {
        "en": "Review our checkout flow and tell me whether any card number, CVC, or expiry could reach our server or logs. Also tell me whether our provider acts as a merchant of record or a plain processor here.",
        "he": "עברו על זרימת הצ׳קאאוט שלנו ובדקו אם מספר כרטיס, CVC או תוקף עלולים להגיע לשרת או ללוגים. ספרו לי גם אם הספק שלנו פועל כ-merchant of record או כמעבד רגיל."
      },
      {
        "en": "We're about to sell a digital course to buyers in random countries. Compare two real payment providers on hosted checkout support, merchant-of-record coverage and total fees, and recommend one for a solo builder.",
        "he": "אנחנו עומדים למכור קורס דיגיטלי לקונים במדינות אקראיות. השוו שני ספקי תשלום אמיתיים לפי תמיכה ב-hosted checkout, כיסוי merchant of record ועמלה כוללת, והמליצו אחד לבונה עצמאי."
      }
    ]
  },
  "Trust the signed webhook": {
    "look": [
      {
        "cap": {
          "en": "Believe the webhook, not the redirect.",
          "he": "תאמינו ל-webhook, לא ל-redirect."
        },
        "code": "browser redirect -> /success?status=paid\nwebhook body    -> { \"event\": \"payment.failed\", \"id\": \"txn_7c1e\" }"
      },
      {
        "cap": {
          "en": "Check the signature before you trust it.",
          "he": "בדקו את החתימה לפני שאתם סומכים עליה."
        },
        "code": "Paddle-Signature: ts=1710000000;h1=abc\n# verify this before you unlock anything"
      }
    ],
    "prompts": [
      {
        "en": "Explain why a success redirect is not proof of payment, and why my webhook also needs a signature check even though it comes from the provider's own server.",
        "he": "הסבירו למה redirect של הצלחה אינו הוכחת תשלום, ולמה ה-webhook שלי גם צריך בדיקת חתימה למרות שהוא מגיע מהשרת של הספק עצמו."
      },
      {
        "en": "Review our post-checkout flow end to end. Find any place we grant access from the browser's return URL, and confirm our webhook route verifies the signature against the raw body before parsing it.",
        "he": "עברו על הזרימה אחרי הצ׳קאאוט מקצה לקצה. מצאו כל מקום שנותנים גישה מכתובת ההחזרה בדפדפן, וודאו שנתיב ה-webhook מאמת את החתימה מול ה-body הגולמי לפני פענוח."
      },
      {
        "en": "Sketch a safe handler: on redirect, show a waiting message only; on a verified payment.completed webhook, mark order ord_42 as paid. Reject any webhook with a bad or missing signature.",
        "he": "שרטטו handler בטוח: ב-redirect רק הודעת המתנה; ב-webhook מאומת של payment.completed סמנו את הזמנה ord_42 כשולמה. דחו כל webhook עם חתימה שגויה או חסרה."
      }
    ]
  },
  "Entitlement & plans": {
    "look": [
      {
        "cap": {
          "en": "Paid means unlocked.",
          "he": "שולם אומר פתוח."
        },
        "code": "user_id: usr_18\nplan: pro\nentitlement: course_access = true\nsource: txn_7c1e (webhook)"
      },
      {
        "cap": {
          "en": "Pay once, or pay again later.",
          "he": "משלמים פעם אחת, או שוב אחר כך."
        },
        "code": "one_time:   status active, ends_at NULL       -> lifetime\nsubscribe:  status active, ends_at 2026-01-01 -> renews or lapses\npast_due:   status past_due                   -> grace period, still unlocked"
      }
    ],
    "prompts": [
      {
        "en": "Explain entitlement versus a payment receipt for both a one-time purchase and a subscription. Where should the app check before it unlocks a paid page?",
        "he": "הסבירו את ההבדל בין entitlement לבין קבלה על תשלום, גם לרכישה חד-פעמית וגם למנוי. איפה האפליקציה צריכה לבדוק לפני שהיא פותחת דף בתשלום?"
      },
      {
        "en": "Review our billing webhook handler. Confirm every event, renewal, payment failed, canceled, and refunded, updates one entitlement row's status instead of only ever setting paid to true.",
        "he": "עברו על ה-handler של webhook הבילינג שלנו. ודאו שכל אירוע, חידוש, תשלום שנכשל, ביטול והחזר, מעדכן את הסטטוס של שורת entitlement אחת במקום רק להדליק paid."
      },
      {
        "en": "Draft the entitlements table and the one hasAccess(userId, product) function every paid route should call, covering both a lifetime purchase and a monthly subscription.",
        "he": "שרטטו את טבלת ה-entitlements ואת הפונקציה האחת hasAccess(userId, product) שכל route בתשלום צריך לקרוא לה, כך שתכסה גם רכישה חד-פעמית וגם מנוי חודשי."
      }
    ]
  },
  "RAM vs disk & memory leaks": {
    "look": [
      {
        "cap": {
          "en": "Same Map, fine for a while, fatal without a limit",
          "he": "אותו Map, בסדר לזמן מה, קטלני בלי הגבלה"
        },
        "code": "const cache = new Map()   // no restart survival, no size limit\ncache.set(key, value)     // fine at 100 keys, fatal at 10M"
      }
    ],
    "prompts": [
      {
        "en": "For session tokens, say whether RAM or disk is the better default store, and why in two sentences.",
        "he": "בקשו מה-AI לומר לגבי session tokens אם RAM או דיסק הוא ברירת המחדל הטובה יותר, ולמה בשני משפטים."
      },
      {
        "en": "Find a place in this code that pushes into a global array or map and never removes entries. Quote the lines.",
        "he": "בקשו מה-AI למצוא מקום בקוד שדוחף למערך או map גלובלי ולא מסיר ערכים. לצטט את השורות."
      },
      {
        "en": "Explain in three sentences why a counter kept only in a variable disappears on restart while a leak grows even without one.",
        "he": "בקשו מה-AI להסביר בשלושה משפטים למה מונה שנשמר רק במשתנה נעלם ב-restart, בעוד leak גדל גם בלעדיו."
      }
    ]
  },
  "Blocking & race conditions": {
    "look": [
      {
        "cap": {
          "en": "Two workers both read 1 and both write 2, one increment is lost",
          "he": "שני workers קוראים 1 וכותבים 2, increment אחד נעלם"
        },
        "code": "// count starts at 1\nworker A: read count -> 1    worker B: read count -> 1\nworker A: write count -> 2   worker B: write count -> 2\n// expected 3, got 2"
      }
    ],
    "prompts": [
      {
        "en": "Rewrite this blocking sleep as async await delay. Show before and after, four lines total.",
        "he": "בקשו מה-AI להמיר את ה-sleep החוסם ל-async await delay. להראות לפני ואחרי, ארבע שורות בסך הכל."
      },
      {
        "en": "Find a place in this code where two requests might update the same row at once. Suggest one lock or atomic fix.",
        "he": "בקשו מה-AI למצוא מקום בקוד שבו שתי בקשות עלולות לעדכן את אותה שורה בו זמנית. להציע lock אחד או תיקון atomic."
      },
      {
        "en": "Find one blocking call in this project that sits on the request path, and say what happens to other users while it runs.",
        "he": "בקשו מה-AI למצוא קריאה חוסמת אחת בפרויקט שנמצאת על נתיב הבקשה, ולומר מה קורה למשתמשים אחרים בזמן שהיא רצה."
      }
    ]
  },
  "Stack, heap & garbage collection": {
    "look": [
      {
        "cap": {
          "en": "Stack holds the call; heap holds the object that outlives it",
          "he": "Stack מחזיק את הקריאה; heap מחזיק את האובייקט שחי אחריה"
        },
        "code": "function greet(name) {          // name on the stack\n  const user = { name };        // object on the heap\n  return user;\n}"
      }
    ],
    "prompts": [
      {
        "en": "Label each value in this function as stack or heap: the parameter, the local number, and the returned object.",
        "he": "בקשו מה-AI לסמן כל ערך בפונקציה הזאת כ-stack או heap: הפרמטר, המספר המקומי, והאובייקט שחוזר."
      },
      {
        "en": "Explain in three sentences what a sawtooth memory graph means versus one that only ever climbs.",
        "he": "בקשו מה-AI להסביר בשלושה משפטים מה אומר גרף זיכרון משונן לעומת גרף שרק עולה."
      },
      {
        "en": "Find a recursive function in this project and say what stops it, or whether it could loop forever on bad input.",
        "he": "בקשו מה-AI למצוא פונקציה רקורסיבית בפרויקט ולומר מה עוצר אותה, או אם היא עלולה לרוץ לנצח על קלט רע."
      }
    ]
  },
  "Data structures & Big-O": {
    "look": [
      {
        "cap": {
          "en": "Array for order; map for lookup by key",
          "he": "מערך לסדר; map לחיפוש לפי מפתח"
        },
        "code": "// array, keeps order\n[\"dana\", \"avi\", \"noa\"]\n\n// map, find by id\n{ \"1\": \"dana\", \"2\": \"avi\", \"3\": \"noa\" }"
      }
    ],
    "prompts": [
      {
        "en": "Pick array, map or set for a list of recent chat messages shown in order. Say why in one sentence.",
        "he": "בקשו מה-AI לבחור array, map או set לרשימת הודעות צ'אט אחרונות שמוצגות לפי סדר. למה במשפט אחד."
      },
      {
        "en": "Find one nested loop or search-inside-a-loop in this codebase and say whether it looks O(n) or O(n squared).",
        "he": "בקשו מה-AI למצוא לולאה מקוננת אחת או חיפוש בתוך לולאה בקוד, ולומר אם היא נראית O(n) או O(n) בריבוע."
      },
      {
        "en": "Explain Big-O to a beginner in four lines using a guest list that doubles in size each time.",
        "he": "בקשו מה-AI להסביר Big-O למתחיל בארבע שורות עם רשימת אורחים שמוכפלת בגודל בכל פעם."
      }
    ]
  },
  "Cache: hit, miss & TTL": {
    "look": [
      {
        "cap": {
          "en": "One Redis key: written once, read as a hit, then it expires",
          "he": "מפתח אחד ב-Redis: נכתב פעם, נקרא כ-hit, ואז פג"
        },
        "code": "SET user:1 '{\"plan\":\"pro\"}' EX 60\nGET user:1              // HIT: returns the JSON\n// after 60s...\nGET user:1              // MISS: key is gone, ask the database again"
      }
    ],
    "prompts": [
      {
        "en": "Propose one cache key for a product by id and category, plus a TTL in seconds you can justify in one sentence. Show only the key pattern and the TTL.",
        "he": "בקשו מה-AI להציע מפתח cache אחד למוצר לפי id וקטגוריה, וגם TTL בשניות שאפשר להצדיק במשפט אחד. רק תבנית המפתח וה-TTL."
      },
      {
        "en": "Find any caching code in this project. For each one, say what counts as a hit, what counts as a miss, and whether the hit rate is ever logged.",
        "he": "בקשו מה-AI למצוא קוד caching בפרויקט. לכל אחד, לומר מה נחשב hit, מה נחשב miss, והאם ה-hit rate בכלל נמדד."
      },
      {
        "en": "We are about to run two servers. List everything in this codebase that stores state in a plain variable, and say which of it belongs in Redis instead.",
        "he": "אנחנו עומדים להריץ שני שרתים. רשמו כל דבר בקוד שהוא state שנשמר במשתנה רגיל, ואמרו מה מזה צריך לעבור ל-Redis."
      }
    ]
  },
  "Scaling up vs out": {
    "look": [
      {
        "cap": {
          "en": "Bigger box vs. more boxes behind one address",
          "he": "קופסה גדולה יותר מול עוד קופסאות מאחורי כתובת אחת"
        },
        "code": "scale up:  4 CPU -> 16 CPU        (one machine)\nscale out: 1 server -> 3 servers  (behind a load balancer)\n\nclient -> load balancer\n              |-- server A\n              |-- server B\n              |-- server C"
      }
    ],
    "prompts": [
      {
        "en": "Our database CPU is at 90%. Compare scaling up versus scaling out for this stack, and recommend one next step under four hundred dollars a month.",
        "he": "בקשו מה-AI: ה-CPU של ה-database ב-90%. השוו scaling up מול scaling out ל-stack הזה, והמליצו על צעד אחד מתחת לארבע מאות דולר לחודש."
      },
      {
        "en": "Before we add servers behind a load balancer, list everything in this code that assumes there is only one instance. Flag in-memory sessions and local file uploads first.",
        "he": "לפני שמוסיפים שרתים מאחורי load balancer, רשמו כל דבר בקוד שמניח instance יחיד. סמנו קודם sessions בזיכרון והעלאות קבצים מקומיות."
      },
      {
        "en": "Write a health check endpoint for this service that actually proves it can serve requests, not just that the process is alive. Explain what it should check.",
        "he": "כתבו endpoint של health check לשירות הזה שבאמת מוכיח שהוא יכול לשרת בקשות, לא רק שהתהליך חי. הסבירו מה הוא צריך לבדוק."
      }
    ]
  },
  "Domain & DNS records": {
    "look": [
      {
        "cap": {
          "en": "Three common DNS lines.",
          "he": "שלוש שורות DNS נפוצות."
        },
        "code": "A     @       → 203.0.113.10\nCNAME www     → vibetodev.com\nTXT   @       → verify=abc123"
      }
    ],
    "prompts": [
      {
        "en": "Explain domain, registrar and DNS records like I'm brand new. Who owns the name, and where do A, CNAME and TXT records actually live?",
        "he": "הסבירו domain, registrar ורשומות DNS כאילו אני חדש לגמרי. מי מחזיק את השם, ואיפה בפועל יושבות רשומות A, CNAME ו-TXT?"
      },
      {
        "en": "I need www to follow our apex domain and a TXT token for email verification. Draft the DNS lines to add, and remind me to lower the TTL first.",
        "he": "צריך ש-www יעקוב אחרי הדומיין הראשי ו-TXT לאימות מייל. נסחו את שורות ה-DNS להוספה, והזכירו לי להוריד קודם את ה-TTL."
      },
      {
        "en": "Checklist before we rely on this domain for the course launch: renewal date, auto-renew, transfer lock, and which nameservers actually hold our records.",
        "he": "צ׳קליסט לפני שאנחנו נשענים על הדומיין הזה להשקת הקורס: תאריך חידוש, חידוש אוטומטי, נעילת העברה, ואילו nameservers מחזיקים בפועל את הרשומות שלנו."
      }
    ]
  },
  "Private networks & firewalls": {
    "look": [
      {
        "cap": {
          "en": "Public front door, private everything else.",
          "he": "דלת כניסה ציבורית, כל השאר פרטי."
        },
        "code": "public:  203.0.113.10   ← the world can route here\nprivate: 10.0.1.25      ← only inside our VPC\nfirewall: allow 443 from anywhere, allow 5432 only from the app"
      }
    ],
    "prompts": [
      {
        "en": "Explain private IPs, VPCs and firewalls together with one small story. Why should a database have no public address at all?",
        "he": "הסבירו IP פרטי, VPC ו-firewall יחד עם סיפור קטן אחד. למה מסד נתונים צריך שלא תהיה לו בכלל כתובת ציבורית?"
      },
      {
        "en": "Draw a two-subnet layout for our course app: public web behind a load balancer, private database with a firewall rule that only allows the app's security group.",
        "he": "ציירו פריסת שני subnets לאפליקציית הקורס: ווב ציבורי מאחורי load balancer, מסד פרטי עם חוק firewall שמאפשר רק את ה-security group של האפליקציה."
      },
      {
        "en": "Review our cloud setup notes and flag any rule or address that exposes a database port or a private service to the whole internet.",
        "he": "עברו על הערות הקמת הענן שלנו וסמנו כל חוק או כתובת שחושפים פורט מסד נתונים או שירות פרטי לכל האינטרנט."
      }
    ]
  },
  "The cloud: AWS / Azure / GCP": {
    "look": [
      {
        "cap": {
          "en": "Same idea, different brands.",
          "he": "אותו רעיון, מותגים שונים."
        },
        "code": "need: virtual machine + object storage\nAWS:   EC2 + S3\nAzure: VM  + Blob\nGCP:   GCE + Cloud Storage\nbill:  pay for what's running, not what you used"
      }
    ],
    "prompts": [
      {
        "en": "Explain the cloud and the AWS/Azure/GCP choice without jargon. What do we rent, and what's the smallest host that fits a tiny course site?",
        "he": "הסבירו את הענן ואת הבחירה בין AWS/Azure/GCP בלי מונחים מסובכים. מה שוכרים, ומה ההוסטינג הקטן ביותר שמתאים לאתר קורס קטן?"
      },
      {
        "en": "I already know AWS names. Translate EC2, S3 and Lambda into the Azure and GCP names I'll see in docs, and note if a simpler PaaS would skip all three.",
        "he": "אני כבר מכיר שמות AWS. תרגמו EC2, S3 ו-Lambda לשמות Azure ו-GCP שאראה בתיעוד, וציינו אם PaaS פשוט יותר יחסוך את כל השלושה."
      },
      {
        "en": "Help me set up a billing alert for whichever cloud we pick, before our first deploy, so a forgotten resource can't surprise us next month.",
        "he": "עזרו לי להגדיר התראת חיוב לענן שנבחר, לפני ה-deploy הראשון, כדי שמשאב שנשכח לא יפתיע אותנו בחודש הבא."
      }
    ]
  },
  "Container / Docker": {
    "look": [
      {
        "cap": {
          "en": "Same box, every machine, named by commit.",
          "he": "אותה קופסה, כל מכונה, בשם ה-commit."
        },
        "code": "FROM node:20-alpine\nWORKDIR /app\nCOPY package.json . && COPY . .\nCMD [\"node\", \"server.js\"]\n\n# tag it: docker build -t app:4f3a .   (never :latest in prod)"
      }
    ],
    "prompts": [
      {
        "en": "Explain Docker, Docker Compose and image tags together to a beginner: what problem does packaging the app solve, and why avoid the tag \"latest\" in production?",
        "he": "הסבירו Docker, Docker Compose ו-image tags יחד למתחילים: איזו בעיה פותר אריזת האפליקציה, ולמה להימנע מ-tag \"latest\" ב-production?"
      },
      {
        "en": "Write a Dockerfile and a compose.yaml for this app and Postgres 17, with a named volume, a non-root user, and DATABASE_URL pointing at the db service, not localhost.",
        "he": "כתבו Dockerfile ו-compose.yaml לאפליקציה הזו ול-Postgres 17, עם volume בעל שם, משתמש שאינו root, ו-DATABASE_URL שמצביע על השירות db ולא על localhost."
      },
      {
        "en": "Review our build and deploy setup for the classic mistakes: latest tags, localhost inside a container, missing volumes, and staging or production not sharing the same image tag.",
        "he": "עברו על הקמת ה-build וה-deploy שלנו לטעויות הקלאסיות: תגיות latest, localhost בתוך container, volumes חסרים, ו-staging או production שלא חולקים אותו image tag."
      }
    ]
  },
  "Deploy & CI/CD": {
    "look": [
      {
        "cap": {
          "en": "Code leaves your laptop.",
          "he": "הקוד יוצא מהלפטופ."
        },
        "code": "git push origin main\n→ CI installs, lints, tests\n→ if green, host builds and runs image app:4f3a\n→ https://vibetodev.com is live"
      }
    ],
    "prompts": [
      {
        "en": "Explain deploy and CI/CD together in one short story: commit, push, automatic tests, host builds, users see the new version. Name each step plainly and say what stops a broken one from going out.",
        "he": "הסבירו deploy ו-CI/CD יחד בסיפור קצר: commit, push, בדיקות אוטומטיות, ה-host בונה, המשתמשים רואים גרסה חדשה. תנו שם ברור לכל שלב ותסבירו מה עוצר שינוי שבור מלצאת."
      },
      {
        "en": "Draft a six-line GitHub Actions workflow that runs npm test on every push, plus one line explaining why a failing test should block the merge instead of just being reported.",
        "he": "נסחו workflow של GitHub Actions בשש שורות שמריץ npm test בכל push, ועוד שורה שמסבירה למה בדיקה שנכשלת צריכה לחסום merge ולא רק להתריע."
      },
      {
        "en": "Review our pipeline idea and separate the continuous integration checks from the actual production deploy step, then tell me the minimum checks that must run before every production deploy.",
        "he": "עברו על רעיון ה-pipeline והפרידו את בדיקות ה-continuous integration משלב ה-deploy האמיתי ל-production, ואז תגידו לי מה בדיקות המינימום שחייבות לרוץ לפני כל deploy ל-production."
      }
    ]
  },
  "Environments & config": {
    "look": [
      {
        "cap": {
          "en": "Three rooms, one codebase.",
          "he": "שלושה חדרים, codebase אחד."
        },
        "code": "dev      → laptop, fake data\nstaging  → like prod, safe to break\nprod     → real users, real money"
      },
      {
        "cap": {
          "en": "Keys live outside the repo.",
          "he": "המפתחות חיים מחוץ ל-repo."
        },
        "code": "# NOT in git\nPADDLE_API_KEY=****\n# fetched at runtime from secrets manager\nsecret_name: prod/paddle/api_key"
      }
    ],
    "prompts": [
      {
        "en": "Explain dev, staging and production for beginners, including which config values and secret keys change between them and what must never appear in git, a screenshot or a chat log.",
        "he": "הסבירו dev, staging ו-production למתחילים, כולל אילו ערכי config ומפתחות סוד משתנים ביניהם ומה אסור שיופיע ב-git, בצילום מסך או בלוג צ'אט."
      },
      {
        "en": "Review our staging setup and list every place it differs from production that it isn't allowed to, like a different database engine, a skipped proxy, or a missing environment variable.",
        "he": "עברו על הגדרת ה-staging שלנו ורשמו כל מקום שבו הוא שונה מ-production בצורה שלא מותרת, כמו מנוע מסד נתונים אחר, proxy שדולג, או משתנה סביבה חסר."
      },
      {
        "en": "Help move a hardcoded Stripe key into a secrets manager entry, and rewrite any if (NODE_ENV === 'production') branch in our config as a named variable with a default instead.",
        "he": "עזרו להעביר מפתח Stripe קשיח לתוך ערך ב-secrets manager, ושכתבו כל הסתעפות if (NODE_ENV === 'production') בקונפיג שלנו למשתנה עם שם וברירת מחדל במקום."
      }
    ]
  },
  "Rollback & backups": {
    "look": [
      {
        "cap": {
          "en": "Put the old image back.",
          "he": "מחזירים את ה-image הישן."
        },
        "code": "deploy image sha 4f3a again"
      },
      {
        "cap": {
          "en": "A copy you can actually restore, tested, not only scheduled",
          "he": "עותק שאפשר באמת לשחזר, נבדק, לא רק מתוזמן"
        },
        "code": "# nightly backup (concept)\n0 3 * * *  pg_dump app > /backups/app-$(date +%F).sql\n\n# the part people skip:\n# restore to a scratch database once a month\npg_restore /backups/app-2026-09-01.sql\n# then: can we read user 42 again?"
      }
    ],
    "prompts": [
      {
        "en": "Explain rollback and backup recovery together for beginners. When do we redeploy an old image instead of writing a rushed hotfix, and why doesn't an unrestored backup count as safe?",
        "he": "הסבירו rollback ושחזור גיבויים יחד למתחילים. מתי פורסים שוב image ישן במקום לכתוב hotfix חפוז, ולמה גיבוי שלא שוחזר לא נחשב בטוח?"
      },
      {
        "en": "Draft a monthly staging drill that rolls back a deploy on purpose and separately restores last night's backup into a scratch database, then confirms both actually worked.",
        "he": "נסחו תרגיל חודשי ב-staging שעושה rollback בכוונה ל-deploy, ובנפרד משחזר את הגיבוי של אתמול בלילה למסד נתונים זמני, ואז מוודא ששניהם באמת עבדו."
      },
      {
        "en": "Review our deploy plan for this migration: if we roll back ten minutes after it ships, will the old code still work against the changed schema?",
        "he": "עברו על תוכנית ה-deploy למיגרציה הזו: אם נעשה rollback עשר דקות אחרי שהיא יוצאת, האם הקוד הישן עדיין יעבוד מול ה-schema שהשתנה?"
      }
    ]
  },
  "Zero-downtime deploys & migrations": {
    "look": [
      {
        "cap": {
          "en": "New version, no blank page.",
          "he": "גרסה חדשה, בלי דף ריק."
        },
        "code": "1 start app:9bc1 beside app:4f3a\n2 wait until health ok\n3 send traffic to 9bc1\n4 stop 4f3a"
      },
      {
        "cap": {
          "en": "Three steps, no big bang.",
          "he": "שלושה שלבים, בלי מכה אחת."
        },
        "code": "1 add column plan_code (nullable)\n2 backfill plan_code from plan_id\n3 drop old column plan_id"
      }
    ],
    "prompts": [
      {
        "en": "Explain zero-downtime deploys and expand/contract migrations together. Why do old and new code run side by side for a minute, and what does that mean for a database schema change shipped in the same release?",
        "he": "הסבירו יחד zero-downtime deploy ומיגרציית expand/contract. למה קוד ישן וחדש רצים זה לצד זה במשך דקה, ומה זה אומר על שינוי schema שיוצא באותו release?"
      },
      {
        "en": "Draft a health endpoint that actually checks the database and migration status, so the load balancer only routes traffic to an instance once it's truly ready.",
        "he": "נסחו health endpoint שבאמת בודק את מסד הנתונים ואת סטטוס ה-migrations, כך שה-load balancer יעביר תעבורה ל-instance רק כשהוא באמת מוכן."
      },
      {
        "en": "Review a migration plan that renames a column in the same release it ships in. Rewrite it as separate expand, backfill, switch and contract deploys instead.",
        "he": "עברו על תוכנית migration ששונה שם עמודה באותו release שהיא יוצאת בו. שכתבו אותה כ-deploys נפרדים של expand, backfill, switch ו-contract."
      }
    ]
  },
  "Logs": {
    "look": [
      {
        "cap": {
          "en": "One log line, fields you can filter",
          "he": "שורה אחת של לוג, עם שדות שאפשר לסנן"
        },
        "code": "{\"level\":\"info\",\"msg\":\"order created\",\"request_id\":\"req_8f3a\"}"
      }
    ],
    "prompts": [
      {
        "en": "Scan this project for console.log and print-style logs. Show me three places to turn into one JSON line with level, msg, and request_id.",
        "he": "סרקו את הפרויקט אחרי console.log ולוגים בסגנון print. הראו לי שלושה מקומות להפוך לשורת JSON אחת עם level, msg ו-request_id."
      },
      {
        "en": "Write a tiny helper that logs one JSON object per line, with fields level, msg, and request_id. No pretty-print, no nested objects.",
        "he": "כתבו helper קטן שכותב אובייקט JSON אחד בכל שורה, עם שדות level, msg ו-request_id. בלי pretty-print ובלי אובייקטים מקוננים."
      },
      {
        "en": "Suggest five structured log fields for our billing webhook handler. Use fake ids only, never real card data.",
        "he": "הציעו חמישה שדות לוג מובנים ל-handler של webhook הבילינג. השתמשו רק במזהים מדומים, לעולם לא בנתוני כרטיס אמיתיים."
      }
    ]
  },
  "Metrics & dashboards": {
    "look": [
      {
        "cap": {
          "en": "Counter, gauge, histogram, each with a number",
          "he": "Counter, gauge ו-histogram, לכל אחד מספר"
        },
        "code": "orders_total 1842\ncpu_percent 67\nrequest_duration_ms 45"
      },
      {
        "cap": {
          "en": "Four numbers that answer is it okay",
          "he": "ארבעה מספרים שעונים האם הכול בסדר"
        },
        "code": "requests/min     420\nerror rate        0.4%\np95 latency     180ms\nactive users     1,204"
      }
    ],
    "prompts": [
      {
        "en": "List five metrics for a checkout API. Mark each as counter, gauge, or histogram, and say what a rising number would mean.",
        "he": "רשמו חמישה metrics ל-API של checkout. סמנו כל אחד כ-counter, gauge או histogram, והסבירו מה עלייה במספר אומרת."
      },
      {
        "en": "Design a one-screen dashboard for this API with at most four panels. Name each metric and the question it answers in one sentence.",
        "he": "עצבו dashboard של מסך אחד ל-API הזה עם ארבעה פאנלים לכל היותר. תנו שם לכל metric ולשאלה שהוא עונה עליה במשפט אחד."
      },
      {
        "en": "I only have logs today. Which three log fields could become metrics, and which type should each be?",
        "he": "יש לי היום רק logs. אילו שלושה שדות logs יכולים להפוך ל-metrics, ואיזה סוג מתאים לכל אחד?"
      }
    ]
  },
  "Alerts & uptime": {
    "look": [
      {
        "cap": {
          "en": "A rule that pages a human",
          "he": "כלל שמעיר אדם"
        },
        "code": "error_rate > 2% for 5m -> page"
      },
      {
        "cap": {
          "en": "A probe that only asks are you up",
          "he": "בדיקה ששואלת רק האם אתם חיים"
        },
        "code": "GET /health -> 200 {\"ok\":true}"
      }
    ],
    "prompts": [
      {
        "en": "Draft one alert for this service: a clear condition, a five-minute window, and who gets paged. No dashboard noise, only something that wakes a person.",
        "he": "נסחו alert אחד לשירות הזה: תנאי ברור, חלון של חמש דקות, ומי מקבל page. בלי רעש ב-dashboard, רק משהו שמעיר בן אדם."
      },
      {
        "en": "Add a GET /health endpoint that returns 200 and {\"ok\":true} when the process is up. Do not check the database yet, keep it simple.",
        "he": "הוסיפו endpoint של GET /health שמחזיר 200 ו-{\"ok\":true} כשהתהליך חי. אל תבדקו עדיין את ה-database, השאירו את זה פשוט."
      },
      {
        "en": "Set up an external uptime check that hits /health every minute and emails us if three checks fail. List the settings only.",
        "he": "הגדירו בדיקת uptime חיצונית שפוגעת ב-/health כל דקה ושולחת מייל אחרי שלושה כישלונות. רשמו רק את ההגדרות."
      }
    ]
  },
  "Tracing & SLOs": {
    "look": [
      {
        "cap": {
          "en": "One id follows the request",
          "he": "מזהה אחד עוקב אחרי הבקשה"
        },
        "code": "request_id: req_8f3a\napi     started checkout\nworker  charged card\nemail   sent receipt\n(all lines share req_8f3a)"
      },
      {
        "cap": {
          "en": "99.9% leaves a small monthly budget",
          "he": "99.9% משאיר תקציב חודשי קטן"
        },
        "code": "SLO: 99.9% uptime\nerror budget: about 43 minutes a month"
      }
    ],
    "prompts": [
      {
        "en": "Add a request_id to every log line in this handler. Generate it once at the edge and pass it into the worker call.",
        "he": "הוסיפו request_id לכל שורת log ב-handler הזה. יצרו אותו פעם אחת בקצה והעבירו אותו לקריאת ה-worker."
      },
      {
        "en": "I have three services and scattered logs. Propose the smallest correlation-id scheme: header name, format, and where to read it.",
        "he": "יש לי שלושה שירותים ולוגים מפוזרים. הציעו את סכמת ה-correlation-id הקטנה ביותר: שם header, פורמט, ואיפה לקרוא אותו."
      },
      {
        "en": "Pick an SLO for this API between 99% and 99.9%. Convert it to minutes of downtime per month and say when we pause feature work.",
        "he": "בחרו SLO ל-API הזה בין 99% ל-99.9%. המירו לדקות downtime בחודש ואמרו מתי עוצרים עבודת features."
      }
    ]
  },
  "Ticket & definition of done": {
    "look": [
      {
        "cap": {
          "en": "A tiny ticket: title, why, done-when.",
          "he": "טיקט קטן: כותרת, למה, מתי זה גמור."
        },
        "code": "Title: Cart total ignores discount codes\n\nWhy: Buyers with a valid code still pay full price at checkout.\n\nDone when: Applying code SAVE10 on a ₪100 cart shows ₪90 before pay."
      },
      {
        "cap": {
          "en": "Four boxes. Nothing ships until they are checked.",
          "he": "ארבעה ריבועים. לא משחררים לפני שכולם מסומנים."
        },
        "code": "- [ ] Code compiles and npm test is green\n- [ ] Diff reviewed by a human\n- [ ] README or AGENTS.md updated if behaviour changed\n- [ ] Done-when from the ticket is true in the app"
      }
    ],
    "prompts": [
      {
        "en": "Rewrite this bug report into a ticket with Title, Why, and one Done-when line. Keep it under 80 words. Paste only the ticket.",
        "he": "כתבו מחדש את דיווח הבאג הזה כטיקט עם Title, Why, ושורת Done-when אחת. עד 80 מילים. הדביקו רק את הטיקט."
      },
      {
        "en": "Write a definition of done with exactly four checkboxes for our Next.js course app. Keep each line under twelve words.",
        "he": "כתבו definition of done עם בדיוק ארבעה checkboxes לאפליקציית הקורס ב-Next.js. כל שורה עד שתים-עשרה מילים."
      },
      {
        "en": "Compare our current PR to this definition of done. Reply only with pass or fail per checkbox and one fix if failed.",
        "he": "השוו את ה-PR הנוכחי ל-definition of done הזה. ענו רק pass או fail לכל checkbox, ותיקון אחד אם נכשל."
      }
    ]
  },
  "Docs: README, ADR & changelog": {
    "look": [
      {
        "cap": {
          "en": "Situation, decision, cost: five lines total.",
          "he": "מצב, החלטה, מחיר: חמש שורות בסך הכל."
        },
        "code": "Situation: We need money in the database.\nDecision: Store prices as integer cents, never float.\nCost: Every UI must format cents to shekels.\nRejected: float columns - rounding bugs in checkout.\nOwner: Cart team, 2026-03-01"
      },
      {
        "cap": {
          "en": "What changed in 1.4.0: added and fixed.",
          "he": "מה השתנה ב-1.4.0: נוסף ותוקן."
        },
        "code": "## 1.4.0\n\n### Added\n- Discount codes at checkout\n\n### Fixed\n- Cart total ignored tax for guest users"
      }
    ],
    "prompts": [
      {
        "en": "Write a README with Run, Test, and What this is. Assume Node 20 and npm. Under forty lines. No badges.",
        "he": "כתבו README עם Run, Test, ו-What this is. הניחו Node 20 ו-npm. מתחת לארבעים שורות. בלי badges."
      },
      {
        "en": "Write a five-line ADR for choosing Postgres over a JSON file for orders. Include Situation, Decision, and Cost.",
        "he": "כתבו ADR בן חמש שורות לבחירת Postgres על פני קובץ JSON להזמנות. כללו Situation, Decision, ו-Cost."
      },
      {
        "en": "Write release notes for version 1.4.0 with one Added and one Fixed bullet from this PR title list. Markdown only.",
        "he": "כתבו הערות שחרור לגרסה 1.4.0 עם bullet אחד של Added ואחד של Fixed מרשימת כותרות ה-PR הזו. רק Markdown."
      }
    ]
  },
  "Product analytics: events & funnels": {
    "look": [
      {
        "cap": {
          "en": "A page load is not a click",
          "he": "טעינת עמוד זה לא לחיצה"
        },
        "code": "pageview  path=/pricing\nevent     name=plan_selected  plan=pro"
      },
      {
        "cap": {
          "en": "Useful event, no email, no name",
          "he": "event שימושי, בלי email ובלי שם"
        },
        "code": "{\"event\":\"plan_selected\",\"user_id\":\"u_91c2\",\"plan\":\"pro\",\"source\":\"pricing\"}"
      }
    ],
    "prompts": [
      {
        "en": "Explain pageview versus event using this site map. Give one example of each and when a dashboard should use which.",
        "he": "הסבירו pageview מול event לפי מפת האתר הזו. תנו דוגמה אחת לכל סוג ומתי dashboard צריך להשתמש בכל אחד."
      },
      {
        "en": "Our funnel drops hardest between signup and activate. Suggest three product questions and which event would answer each.",
        "he": "ה-funnel שלנו נופל הכי חזק בין signup ל-activate. הציעו שלוש שאלות מוצר ואיזה event יענה על כל אחת."
      },
      {
        "en": "Audit this tracking plan for PII. Flag email, name, phone, and IP. Rewrite each bad property as a safe id or category.",
        "he": "בדקו את תוכנית ה-tracking הזו ל-PII. סמנו email, name, phone ו-IP. שכתבו כל property רע כ-id בטוח או קטגוריה."
      }
    ]
  },
  "Backlog, sprints & estimates": {
    "look": [
      {
        "cap": {
          "en": "This week: three tickets, one goal.",
          "he": "השבוע: שלושה טיקטים, מטרה אחת."
        },
        "code": "Sprint goal: Buyers can apply one discount code\n\nBacklog (this week)\n1. Ticket: validate code at checkout\n2. Ticket: show new total before pay\n3. Ticket: reject expired codes with a clear error"
      }
    ],
    "prompts": [
      {
        "en": "From this backlog, pick three tickets for a one-week sprint with goal: guest checkout works. Say why each was chosen.",
        "he": "מה-backlog הזה, בחרו שלושה טיקטים לספרינט של שבוע עם מטרה: checkout לאורח עובד. הסבירו למה כל אחד נבחר."
      },
      {
        "en": "Reorder this backlog for next Monday. Put blockers first. Reply as a numbered list of titles only.",
        "he": "סדרו מחדש את ה-backlog ליום שני. שימו blockers ראשונים. ענו כרשימה ממוספרת של כותרות בלבד."
      },
      {
        "en": "Estimate these three tickets in half-days. State one risk per ticket. If unsure, give a range, not a fake exact hour.",
        "he": "העריכו את שלושת הטיקטים האלה בחצאי ימים. ציינו סיכון אחד לכל טיקט. אם לא בטוחים, תנו טווח, לא שעה מדויקת מזויפת."
      }
    ]
  },
  "LLM API call & tokens": {
    "look": [
      {
        "cap": {
          "en": "What comes back: text, why it stopped, and what it cost",
          "he": "מה חוזר: טקסט, למה הוא עצר, וכמה זה עלה"
        },
        "code": "{\n  \"model\": \"<the model you asked for>\",\n  \"stop_reason\": \"end_turn\",        // or \"max_tokens\": cut off by your cap\n  \"content\": [{ \"type\": \"text\", \"text\": \"This invoice is for 12 hours of design work...\" }],\n  \"usage\": { \"input_tokens\": 812, \"output_tokens\": 164 }\n}"
      },
      {
        "cap": {
          "en": "Why the tenth message costs more than the first",
          "he": "למה ההודעה העשירית עולה יותר מהראשונה"
        },
        "code": "message 1:   [system 6k] [q1]                              ~6k in\nmessage 5:   [system 6k] [q1 a1 q2 a2 q3 a3 q4 a4] [q5]      ~9k in\nmessage 25:  [system 6k] [24 turns of history ........] [q25] ~18k in\n\n# every call pays for everything to its left, again.\n# fix: keep the last 8 turns + a short summary, trim the system prompt."
      }
    ],
    "prompts": [
      {
        "en": "Find every place this app calls an AI model. For each one, say whether it runs in the browser or the server, where the key comes from, and whether tokens and cost get logged.",
        "he": "מצאו כל מקום שבו האפליקציה הזו קוראת למודל AI. לכל אחד, תגידו אם הוא רץ בדפדפן או בשרת, מאיפה המפתח מגיע, ואם tokens ועלות נרשמים."
      },
      {
        "en": "Add a 20-second timeout and a 400-token answer cap to our model call, and log the model, tokens in, tokens out and cost on every call.",
        "he": "הוסיפו timeout של 20 שניות ותקרה של 400 tokens לתשובה בקריאה שלנו למודל, ורשמו את המודל, tokens שנכנסו, tokens שיצאו ועלות בכל קריאה."
      },
      {
        "en": "Estimate our monthly AI cost at 1,000 daily users doing 10 chat messages each. Show the math, and which part of a long chat costs the most.",
        "he": "העריכו את עלות ה-AI החודשית שלנו עם 1,000 משתמשים ביום שעושים 10 הודעות צ'אט כל אחד. תראו את החישוב, ואיזה חלק מצ'אט ארוך עולה הכי הרבה."
      }
    ]
  },
  "Structured output & tool calling": {
    "look": [
      {
        "cap": {
          "en": "The same email, asked two ways",
          "he": "אותו מייל, בשתי דרכים לבקש"
        },
        "code": "prompt says \"reply in JSON\":\n  Sure! Here is the JSON:\n  { \"company\": \"Brightwave\", \"teamSize\": 40, \"budg\n                                                ^ cut off at the length cap\n\nschema enforced by the API:\n  { \"company\": \"Brightwave\", \"teamSize\": 40, \"budget\": null }"
      },
      {
        "cap": {
          "en": "One question, two model turns, one tool run by your code",
          "he": "שאלה אחת, שני תורות של המודל, tool אחד שהקוד שלכם מריץ"
        },
        "code": "user:      Where is my order 1042?\nmodel:     tool_use  get_order { \"orderId\": \"1042\" }      <- a request, nothing ran yet\nyour code: checks 1042 belongs to this user, reads the database\nyour code: tool_result { \"status\": \"shipped\", \"eta\": \"Thursday\" }\nmodel:     Your order shipped and should arrive on Thursday."
      }
    ],
    "prompts": [
      {
        "en": "Find every place we parse JSON from a model or let it call a tool. Switch the JSON ones to schema mode, and check each tool takes the user's id from the session, not the model.",
        "he": "מצאו כל מקום שבו אנחנו מפענחים JSON ממודל או נותנים לו לקרוא ל-tool. העבירו את מקרי ה-JSON למצב schema, ובדקו שכל tool לוקח את מזהה המשתמש מה-session ולא מהמודל."
      },
      {
        "en": "Write tests where a fake model returns chatty cut-off JSON, and where it asks for another customer's order. Both must land somewhere a person will see them, never fail silently.",
        "he": "כתבו tests שבהם מודל מזויף מחזיר JSON מפטפט וקטוע, ושבהם הוא מבקש הזמנה של לקוח אחר. שניהם חייבים לנחות במקום שבן אדם יראה, ולא להיכשל בשקט."
      },
      {
        "en": "Design the smallest schema and the smallest tool for pulling a contact's name, company and next step from a note, and updating it. Explain each field in one line.",
        "he": "תכננו את ה-schema הכי קטן ואת ה-tool הכי קטן לשליפת שם, חברה והצעד הבא של איש קשר מתוך הערה, ולעדכון שלו. הסבירו כל שדה בשורה אחת."
      }
    ]
  },
  "Agent & MCP": {
    "prompts": [
      {
        "en": "Find the loop in our agent and list every way it can end. Add a step cap, a token budget and a stop after three failures in a row.",
        "he": "מצאו את הלולאה ב-agent שלנו ורשמו כל דרך שבה היא יכולה להיגמר. הוסיפו מגבלת צעדים, תקציב tokens ועצירה אחרי שלושה כשלונות ברצף."
      },
      {
        "en": "List every MCP server our agent or AI tool is connected to. For each, say what it can change and whose credentials it uses.",
        "he": "רשמו כל שרת MCP שה-agent או כלי ה-AI שלנו מחובר אליו. לכל אחד, תגידו מה הוא יכול לשנות ועם ההרשאות של מי הוא עובד."
      },
      {
        "en": "Could this feature be three fixed calls instead of an agent with live tools? Compare both on cost, speed and how easy each is to test.",
        "he": "האם ה-feature הזה יכול להיות שלוש קריאות קבועות במקום agent עם tools חיים? השוו את שניהם בעלות, במהירות ובכמה קל לבדוק כל אחד."
      }
    ]
  },
  "Embeddings & RAG": {
    "look": [
      {
        "cap": {
          "en": "Where RAG goes wrong: the search, not the writing",
          "he": "איפה RAG משתבש: בחיפוש, לא בכתיבה"
        },
        "code": "question: \"How long is parental leave?\"   (asked from Tel Aviv)\n\nno filter:    [UK policy 0.91] [IL policy 0.88] [US policy 0.86] ...\n              -> a fluent answer with UK numbers\n\nwith filter:  country = IL, active today\n              [IL policy 0.88] [IL FAQ 0.79]\n              -> the right answer, citing [1]"
      }
    ],
    "prompts": [
      {
        "en": "Add meaning-based search to our contact notes with pgvector. Store the embedding model name with each row, and search only the signed-in user's notes before ranking.",
        "he": "הוסיפו לחיפוש בהערות אנשי הקשר שלנו חיפוש לפי משמעות עם pgvector. שמרו את שם מודל ה-embedding ליד כל שורה, וחפשו רק בהערות של המשתמש המחובר לפני הדירוג."
      },
      {
        "en": "Show me what our assistant retrieves for this question before it answers: each passage, its score, its owner and its date.",
        "he": "תראו לי מה העוזר שלנו שולף לשאלה הזו לפני שהוא עונה: כל קטע, הציון שלו, הבעלים שלו והתאריך שלו."
      },
      {
        "en": "Write a test proving that editing a note re-embeds it, and that one team's search never returns another team's notes.",
        "he": "כתבו test שמוכיח שעריכת הערה עושה לה embedding מחדש, ושחיפוש של צוות אחד אף פעם לא מחזיר הערות של צוות אחר."
      }
    ]
  },
  "Prompt caching & model choice": {
    "prompts": [
      {
        "en": "Check our AI calls for anything that changes at the start of the prompt: dates, ids, names, tool order. List each one and where to move it.",
        "he": "בדקו בקריאות ה-AI שלנו כל דבר שמשתנה בהתחלה של ה-prompt: תאריכים, מזהים, שמות, סדר tools. רשמו כל אחד ולאן להעביר אותו."
      },
      {
        "en": "Run our eval for the contact summary on our current model and one smaller model, with caching on for both. Show pass rate, cost and speed.",
        "he": "הריצו את ה-eval של סיכום איש הקשר על המודל הנוכחי שלנו ועל מודל קטן יותר, עם caching מופעל בשניהם. תראו אחוז הצלחה, עלות ומהירות."
      },
      {
        "en": "Add a fallback model to our AI calls, and a test where the first one returns 429. Prove the fallback answers and gets logged.",
        "he": "הוסיפו מודל fallback לקריאות ה-AI שלנו, ו-test שבו הראשון מחזיר 429. הוכיחו שה-fallback עונה ונרשם."
      }
    ]
  },
  "Context window & fresh threads": {
    "prompts": [
      {
        "en": "Summarise this long chat into ten bullets an agent needs next session. Drop small talk. Keep file paths and constraints.",
        "he": "סכמו את השיחה הארוכה הזו לעשרה bullets שסוכן צריך ב-session הבא. זרקו small talk. השאירו נתיבי קבצים ואילוצים."
      },
      {
        "en": "Write a ten-line handoff for a new chat: goal, failing test, files touched, and what already failed. No code.",
        "he": "כתבו handoff של עשר שורות לצ'אט חדש: מטרה, test שנכשל, קבצים שנגעו, ומה כבר נכשל. בלי קוד."
      },
      {
        "en": "Decide whether to kill this thread. If context is muddy, say kill and list the three facts to carry over.",
        "he": "החליטו אם להרוג את ה-thread הזה. אם ה-context עכור, אמרו kill ורשמו את שלושת העובדות להעברה."
      }
    ]
  },
  "Be specific, state the shape": {
    "look": [
      {
        "cap": {
          "en": "Vague vs specific, same ask, different results.",
          "he": "עמום מול ספציפי, אותה בקשה, תוצאות שונות."
        },
        "code": "Vague:\nCan you maybe improve the cart a bit?\n\nSpecific:\nIn src/cart.ts, fix tax so ₪100 + 17% shows ₪117.\nDo not edit other files. Run npm test."
      },
      {
        "cap": {
          "en": "Tell the model the shape before it writes.",
          "he": "תגידו למודל את הצורה לפני שהוא כותב."
        },
        "code": "Reply as a table with two columns: option, cost."
      }
    ],
    "prompts": [
      {
        "en": "Rewrite this polite vague prompt into one specific ask: file path, expected output, and what not to touch.",
        "he": "כתבו מחדש את ה-prompt המנומס והעמום הזה לבקשה ספציפית אחת: נתיב קובץ, פלט צפוי, ומה לא לגעת."
      },
      {
        "en": "Compare Redis and Postgres for promo codes. Reply as a table with columns option, cost, and failure mode. Recommend one.",
        "he": "השוו Redis ו-Postgres לקודי מבצע. ענו כטבלה עם עמודות option, cost, ו-failure mode. המליצו על אחת."
      },
      {
        "en": "Answer only as a unified diff for src/price.ts. No prose before or after the diff.",
        "he": "ענו רק כ-unified diff עבור src/price.ts. בלי פרוזה לפני או אחרי ה-diff."
      }
    ]
  },
  "Small steps, small blast radius": {
    "look": [
      {
        "cap": {
          "en": "One file. Clear fences. No surprise edits.",
          "he": "קובץ אחד. גדרות ברורות. בלי עריכות בהפתעה."
        },
        "code": "Only edit src/price.ts. Do not touch auth."
      }
    ],
    "prompts": [
      {
        "en": "Fix the tax bug. Only edit src/price.ts. Do not touch auth or billing. Show the diff, then run npm test.",
        "he": "תקנו את באג המס. ערכו רק את src/price.ts. אל תגעו ב-auth או billing. הראו את ה-diff, ואז הריצו npm test."
      },
      {
        "en": "Split rewrite auth and billing into three prompts. Each changes one behaviour and ends with npm test. Titles only first.",
        "he": "פצלו את rewrite auth and billing לשלושה prompts. כל אחד משנה התנהגות אחת ומסתיים ב-npm test. קודם רק כותרות."
      },
      {
        "en": "Take this huge ask and cut it in half. Return the first half as a paste-ready prompt under forty words.",
        "he": "קחו את הבקשה הענקית הזו וחתכו אותה לחצי. החזירו את החצי הראשון כ-prompt מוכן להדבקה מתחת לארבעים מילים."
      }
    ]
  },
  "Make it verify, read the diff": {
    "look": [
      {
        "cap": {
          "en": "Demand a failing test, then a green run.",
          "he": "דרשו test שנכשל, ואז ריצה ירוקה."
        },
        "code": "Write the test that fails, then make it pass. Run npm test."
      },
      {
        "cap": {
          "en": "A five-line unified diff you can actually read.",
          "he": "unified diff של חמש שורות שאפשר באמת לקרוא."
        },
        "code": "--- a/src/price.ts\n+++ b/src/price.ts\n@@ -1,3 +1,3 @@\n-export const tax = (cents) => cents * 0.17;\n+export const tax = (cents) => Math.round(cents * 0.17);\n export const total = (cents) => cents + tax(cents);"
      }
    ],
    "prompts": [
      {
        "en": "Add a failing test for tax on ₪100 at 17 percent, then fix the code until npm test is green. Show both steps.",
        "he": "הוסיפו test שנכשל למס על ₪100 ב-17 אחוז, ואז תקנו את הקוד עד ש-npm test ירוק. הראו את שני השלבים."
      },
      {
        "en": "Show only the unified diff for your change. I will read it before merge. No summary paragraph.",
        "he": "הראו רק את ה-unified diff לשינוי שלכם. אני אקרא אותו לפני merge. בלי פסקת סיכום."
      },
      {
        "en": "Review this diff for money bugs. List each risky line with file and line number. Suggest one safer change.",
        "he": "עברו על ה-diff הזה לחיפוש באגי כסף. רשמו כל שורה מסוכנת עם קובץ ומספר שורה. הציעו שינוי בטוח אחד."
      }
    ]
  },
  "Hallucination": {
    "look": [
      {
        "cap": {
          "en": "Looks real. This function is not in the project.",
          "he": "נראה אמיתי. הפונקציה הזו לא קיימת בפרויקט."
        },
        "code": "// This function does not exist in our codebase.\nimport { chargeWalletUltra } from \"@/lib/payments\";\n\nawait chargeWalletUltra(userId, 200);"
      },
      {
        "cap": {
          "en": "A confident install of a package that is not real.",
          "he": "התקנה בטוחה בעצמה של חבילה שאינה אמיתית."
        },
        "code": "# This package is not real. Do not install it.\nnpm install left-pad-ultra"
      }
    ],
    "prompts": [
      {
        "en": "Search the repo for chargeWalletUltra. If it is missing, say so and propose a real function from src/payments.ts instead.",
        "he": "חפשו בריפו את chargeWalletUltra. אם היא חסרה, אמרו זאת והציעו פונקציה אמיתית מ-src/payments.ts במקום."
      },
      {
        "en": "Before npm install, verify left-pad-ultra exists on the registry. If not, suggest a real package we already use.",
        "he": "לפני npm install, אמתו ש-left-pad-ultra קיים ב-registry. אם לא, הציעו חבילה אמיתית שאנחנו כבר משתמשים בה."
      },
      {
        "en": "Before using any helper the model invents, ask it to quote the file path and export name from disk. Refuse invented ones.",
        "he": "לפני שימוש ב-helper שהמודל ממציא, בקשו ממנו לצטט נתיב קובץ ושם export מהדיסק. סרבו להמצאות."
      }
    ]
  },
  "Demo vs production": {
    "prompts": [
      {
        "en": "Rewrite this vibe-coding prompt into a vibe-engineering ask: branch, failing test, read the diff, definition of done.",
        "he": "כתבו מחדש את ה-prompt של vibe-coding לבקשת vibe-engineering: branch, test שנכשל, קריאת ה-diff, definition of done."
      },
      {
        "en": "Given this PR, mark each change demo-only or production-ready. If demo-only, name the missing check.",
        "he": "בהינתן ה-PR הזה, סמנו כל שינוי כ-demo-only או production-ready. אם demo-only, ציינו את הבדיקה החסרה."
      },
      {
        "en": "List five things that are fine in a demo cart but must change before production money. One line each. No code.",
        "he": "רשמו חמישה דברים שסבירים בעגלת דמו אבל חייבים להשתנות לפני כסף ב-production. שורה אחת לכל אחד. בלי קוד."
      }
    ]
  }
};
