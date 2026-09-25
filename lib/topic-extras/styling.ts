import type { TopicExtra } from "./types";

export const extras: Record<string, TopicExtra> = {
  "Tailwind / utility CSS": {
    "look": [
      {
        "cap": {
          "en": "Each class is one small CSS rule. Read the list and you know the look.",
          "he": "כל class הוא חוק CSS קטן אחד. קוראים את הרשימה ויודעים איך זה נראה."
        },
        "code": "<div class=\"p-4 rounded-xl bg-white border shadow-sm flex items-center gap-3\">\n  <div class=\"w-10 h-10 rounded-full bg-blue-600 text-white grid place-items-center font-bold\">DL</div>\n  <div>\n    <p class=\"font-semibold text-slate-900\">Dana Levi</p>\n    <p class=\"text-sm text-slate-500\">dana@example.com</p>\n  </div>\n  <span class=\"ml-auto text-xs px-2 py-1 rounded-full bg-green-100 text-green-700\">Active</span>\n</div>",
        "preview": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\"/>\n<title>Tailwind</title>\n<style>\n/* each class is one small rule, the way Tailwind generates them */\n*{box-sizing:border-box}\nbody{font-family:system-ui,sans-serif;margin:1.5rem;background:#f1f5f9}\np{margin:0}\n.p-4{padding:1rem}.px-2{padding-left:.5rem;padding-right:.5rem}.py-1{padding-top:.25rem;padding-bottom:.25rem}\n.rounded-xl{border-radius:.75rem}.rounded-full{border-radius:9999px}\n.bg-white{background:#fff}.bg-blue-600{background:#2563eb}.bg-green-100{background:#dcfce7}\n.border{border:1px solid #e5e7eb}.shadow-sm{box-shadow:0 1px 2px rgba(0,0,0,.05)}\n.flex{display:flex}.grid{display:grid}.items-center{align-items:center}.place-items-center{place-items:center}\n.gap-3{gap:.75rem}.ml-auto{margin-left:auto}.w-10{width:2.5rem}.h-10{height:2.5rem}\n.font-bold{font-weight:700}.font-semibold{font-weight:600}\n.text-sm{font-size:.875rem;line-height:1.25rem}.text-xs{font-size:.75rem;line-height:1rem}\n.text-white{color:#fff}.text-slate-900{color:#0f172a}.text-slate-500{color:#64748b}.text-green-700{color:#15803d}\n</style>\n</head>\n<body>\n<div class=\"p-4 rounded-xl bg-white border shadow-sm flex items-center gap-3\">\n  <div class=\"w-10 h-10 rounded-full bg-blue-600 text-white grid place-items-center font-bold\">DL</div>\n  <div>\n    <p class=\"font-semibold text-slate-900\">Dana Levi</p>\n    <p class=\"text-sm text-slate-500\">dana@example.com</p>\n  </div>\n  <span class=\"ml-auto text-xs px-2 py-1 rounded-full bg-green-100 text-green-700\">Active</span>\n</div>\n</body>\n</html>"
      }
    ],
    "prompts": [
      {
        "en": "Go through this component and explain every Tailwind class on it in plain words, one line each. Then tell me which classes could be removed without changing how it looks.",
        "he": "עברו על ה-component הזה והסבירו כל class של Tailwind במילים פשוטות, שורה לכל אחד. אחר כך תגידו לי אילו classes אפשר להוריד בלי לשנות איך הוא נראה."
      },
      {
        "en": "Search the project for Tailwind values in square brackets, like p-[13px] or w-[347px]. List each one with the nearest standard class, and replace them only after I approve the list.",
        "he": "חפשו בפרויקט ערכי Tailwind בסוגריים מרובעים, כמו p-[13px] או w-[347px]. רשמו כל אחד עם ה-class הרגיל הכי קרוב, והחליפו אותם רק אחרי שאאשר את הרשימה."
      },
      {
        "en": "Find class names built from pieces, like bg-${color}-500, that Tailwind cannot detect at build time. Rewrite each one as a lookup of full class names and show me the change.",
        "he": "מצאו שמות classes שנבנים מחתיכות, כמו bg-${color}-500, ש-Tailwind לא מזהה בזמן ה-build. כתבו כל אחד מחדש כטבלה של שמות classes מלאים, והראו לי את השינוי."
      }
    ]
  },
  "Dark mode & CSS variables": {
    "look": [
      {
        "cap": {
          "en": "Same markup twice. Only the variable values change.",
          "he": "אותו markup פעמיים. רק הערכים של המשתנים משתנים."
        },
        "code": ":root {                  /* light values */\n  --bg: #ffffff;\n  --text: #0f172a;\n  --muted: #64748b;\n  --accent: #2563eb;\n  --on-accent: #ffffff;\n}\n.dark {                  /* same names, dark values */\n  --bg: #0f172a;\n  --text: #f1f5f9;\n  --muted: #94a3b8;\n  --accent: #60a5fa;\n  --on-accent: #0f172a;\n}\n.card        { background: var(--bg); color: var(--text); }\n.card small  { color: var(--muted); }\n.card button { background: var(--accent); color: var(--on-accent); }",
        "preview": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\"/>\n<title>Dark mode</title>\n<style>\n:root{--bg:#ffffff;--text:#0f172a;--muted:#64748b;--accent:#2563eb;--on-accent:#ffffff}\n.dark{--bg:#0f172a;--text:#f1f5f9;--muted:#94a3b8;--accent:#60a5fa;--on-accent:#0f172a}\n*{box-sizing:border-box}\nbody{font-family:system-ui,sans-serif;margin:1.5rem;background:#e2e8f0;color:#0f172a}\n.row{display:flex;flex-wrap:wrap;gap:16px}\n.col{flex:1;min-width:180px}\n.col p{margin:0 0 .4rem;font-size:.8rem;color:#475569}\n.card{background:var(--bg);color:var(--text);padding:16px;border-radius:12px;display:flex;flex-direction:column;gap:6px;border:1px solid #cbd5e1}\n.card small{color:var(--muted)}\n.card button{align-self:flex-start;margin-top:6px;border:0;border-radius:6px;padding:6px 14px;background:var(--accent);color:var(--on-accent);font-weight:600}\n</style>\n</head>\n<body>\n<div class=\"row\">\n  <div class=\"col\"><p>no class</p><div class=\"card\"><b>Dana Levi</b><small>Last contact: 3 days ago</small><button>Call</button></div></div>\n  <div class=\"col dark\"><p>class=\"dark\"</p><div class=\"card\"><b>Dana Levi</b><small>Last contact: 3 days ago</small><button>Call</button></div></div>\n</div>\n</body>\n</html>"
      }
    ],
    "prompts": [
      {
        "en": "Before adding dark mode, list every colour used in this project, including hex codes, rgb() values and Tailwind colour classes. Group them and propose at most 12 named CSS variables to replace them. Do not change files yet.",
        "he": "לפני שמוסיפים dark mode, רשמו כל צבע שמשמש בפרויקט, כולל קודי hex, ערכי rgb() ו-classes של צבע ב-Tailwind. קבצו אותם והציעו עד 12 משתני CSS עם שם שיחליפו אותם. אל תשנו קבצים עדיין."
      },
      {
        "en": "Add a dark theme using only the named colour variables. Follow the device setting by default, add a toggle that remembers the choice, and make sure the page does not flash white on load.",
        "he": "הוסיפו theme כהה רק דרך משתני הצבע עם השם. ברירת המחדל היא הגדרת המכשיר, הוסיפו מתג שזוכר את הבחירה, ותוודאו שהדף לא מהבהב בלבן בטעינה."
      },
      {
        "en": "Check text contrast in both the light and dark themes for body text, muted text, buttons and links. List every pair below 4.5 to 1 and suggest a replacement value from our variables.",
        "he": "בדקו ניגודיות טקסט ב-theme הבהיר וב-theme הכהה: טקסט רגיל, טקסט משני, כפתורים וקישורים. רשמו כל זוג מתחת ל-4.5 ל-1 והציעו ערך חלופי מהמשתנים שלנו."
      }
    ]
  },
  "Component library (shadcn/ui)": {
    "look": [
      {
        "cap": {
          "en": "A delete confirmation built from two library components",
          "he": "אישור מחיקה שבנוי משני components של הספרייה"
        },
        "code": "import { Button } from \"@/components/ui/button\";\nimport {\n  Dialog, DialogTrigger, DialogContent, DialogTitle,\n} from \"@/components/ui/dialog\";\n\n<Dialog>\n  <DialogTrigger asChild>\n    <Button variant=\"outline\">Delete</Button>\n  </DialogTrigger>\n  <DialogContent>\n    <DialogTitle>Delete Dana Levi?</DialogTitle>\n    <Button variant=\"destructive\" onClick={remove}>Yes, delete</Button>\n  </DialogContent>\n</Dialog>\n// for free: Esc closes it, focus stays inside,\n// a screen reader announces the title"
      }
    ],
    "prompts": [
      {
        "en": "List every file in components/ui and say in one line what each component is for. Then find places in the app that hand-build a popup, dropdown or button instead of using one of them.",
        "he": "רשמו כל קובץ ב-components/ui ותגידו בשורה אחת למה כל component משמש. אחר כך מצאו מקומות באפליקציה שבונים ביד חלון קופץ, תפריט נפתח או כפתור במקום להשתמש באחד מהם."
      },
      {
        "en": "Add a confirmation step before deleting a contact. Use the shadcn Dialog and Button from components/ui. If Dialog is not there yet, add it with npx shadcn@latest add dialog instead of writing your own.",
        "he": "הוסיפו שלב אישור לפני מחיקה של איש קשר. השתמשו ב-Dialog וב-Button של shadcn מ-components/ui. אם Dialog עוד לא קיים, הוסיפו אותו עם npx shadcn@latest add dialog, ואל תכתבו אחד משלכם."
      },
      {
        "en": "The contacts page needs a green success button. Add a new variant to components/ui/button.tsx instead of editing the default style, and show me every place in the app that the change could affect.",
        "he": "בדף אנשי הקשר צריך כפתור ירוק של הצלחה. הוסיפו variant חדש ל-components/ui/button.tsx במקום לשנות את העיצוב הרגיל, והראו לי כל מקום באפליקציה שהשינוי יכול להשפיע עליו."
      }
    ]
  },
  "Docker Compose": {
    "look": [
      {
        "cap": {
          "en": "The six commands you will use every day",
          "he": "שש הפקודות שתשתמשו בהן כל יום"
        },
        "code": "docker compose up -d          # start app + db in the background\ndocker compose ps             # what is running, and is db \"healthy\"?\ndocker compose logs -f app    # follow the app's output\ndocker compose exec db psql -U postgres crm   # SQL prompt inside db\ndocker compose down           # stop and remove containers, keep the data\ndocker compose down -v        # also delete the volume: the database is gone"
      }
    ],
    "prompts": [
      {
        "en": "Write a compose.yaml that runs this app and Postgres 17 for local development. Use a named volume for the data, a pg_isready health check, and a DATABASE_URL that points at the db service, not localhost.",
        "he": "כתבו compose.yaml שמריץ את האפליקציה הזו ו-Postgres 17 לפיתוח מקומי. השתמשו ב-volume עם שם בשביל הנתונים, ב-health check של pg_isready, וב-DATABASE_URL שמצביע על השירות db ולא על localhost."
      },
      {
        "en": "Review our compose.yaml for the usual mistakes: localhost inside a container, a missing volume, latest tags, passwords written into the file, and the app starting before the database is ready. List what you find before changing anything.",
        "he": "עברו על ה-compose.yaml שלנו ובדקו את הטעויות הרגילות: localhost בתוך container, volume חסר, תגיות latest, סיסמאות שכתובות בקובץ, ואפליקציה שעולה לפני שמסד הנתונים מוכן. רשמו מה מצאתם לפני שמשנים משהו."
      },
      {
        "en": "Update the setup section of the README so a new developer goes from git clone to a running app with docker compose up. Include how to reset the database, and warn that down -v deletes all local data.",
        "he": "עדכנו את חלק ההתקנה ב-README כך שמפתחים חדשים יעברו מ-git clone לאפליקציה שרצה עם docker compose up. הוסיפו איך מאפסים את מסד הנתונים, ואזהרה ש-down -v מוחק את כל הנתונים המקומיים."
      }
    ]
  }
};
