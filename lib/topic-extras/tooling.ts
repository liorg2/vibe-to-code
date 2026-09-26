import type { TopicExtra } from "./types";

export const extras: Record<string, TopicExtra> = {
  "Process (a running program)": {
    "look": [
      {
        "cap": {
          "en": "Stop it the normal way first",
          "he": "קודם עוצרים בדרך הרגילה"
        },
        "code": "$ npm run dev\n  > ready on http://localhost:3000\n\n^C                          # Ctrl+C: stops the process in this window\n$                           # the prompt is back = nothing runs here\n\n# closing the window with the X can leave it running.\n# see which node processes are still alive:\n$ ps aux | grep node        # mac / linux\n> tasklist | findstr node   # windows"
      }
    ],
    "prompts": [
      {
        "en": "Port 3000 is already in use. Before changing any config, show me which process holds it, its PID, and when it started. Do not stop anything yet.",
        "he": "port 3000 תפוס. לפני שמשנים הגדרות, תראו לי איזה process מחזיק אותו, מה ה-PID שלו ומתי הוא הופעל. אל תעצרו עדיין כלום."
      },
      {
        "en": "List every node or dev server process running on my machine right now, which project folder each one came from, and which ones I can safely stop.",
        "he": "תרשמו כל process של node או של dev server שרץ עכשיו על המחשב שלי, מאיזו תיקיית פרויקט כל אחד הגיע, ואילו מהם בטוח לעצור."
      },
      {
        "en": "When you start the app for me, run it in a terminal I can see, and tell me exactly how to stop it when I am done.",
        "he": "כשאתם מפעילים לי את האפליקציה, תריצו אותה בטרמינל שאני רואה, ותגידו לי בדיוק איך עוצרים אותה כשסיימתי."
      }
    ]
  },
  "File permissions": {
    "look": [
      {
        "cap": {
          "en": "Who owns it, and who am I?",
          "he": "למי זה שייך, ומי אני?"
        },
        "code": "$ npm install\nnpm ERR! EACCES: permission denied, open '/Users/maya/.npm/_cacache/...'\n\n$ whoami\nmaya\n$ ls -ld ~/.npm\ndrwxr-xr-x  12 root  staff  384  /Users/maya/.npm   # owned by root, not maya\n\n# an earlier \"sudo npm install -g\" left these behind.\n# give them back to their real owner, once:\n$ sudo chown -R maya ~/.npm"
      }
    ],
    "prompts": [
      {
        "en": "I got \"permission denied\". Tell me which file, which permission was missing (read, write or execute), who owns it, and the smallest fix. Do not use sudo or chmod 777.",
        "he": "קיבלתי \"permission denied\". תגידו לי איזה קובץ, איזו הרשאה חסרה (קריאה, כתיבה או הרצה), למי הוא שייך, ומה התיקון הכי קטן. בלי sudo ובלי chmod 777."
      },
      {
        "en": "Explain the permission string ls -l shows for each file in this folder, in plain words: who can read it, change it, or run it.",
        "he": "תסבירו במילים פשוטות את מחרוזת ההרשאות ש-ls -l מציג לכל קובץ בתיקייה הזו: מי יכול לקרוא אותו, לשנות אותו או להריץ אותו."
      },
      {
        "en": "Before you run any command with sudo, stop and tell me why it needs administrator rights and what it will change outside this project.",
        "he": "לפני שאתם מריצים פקודה כלשהי עם sudo, תעצרו ותגידו לי למה היא צריכה הרשאות מנהל ומה היא תשנה מחוץ לפרויקט הזה."
      }
    ]
  },
  ".gitignore": {
    "look": [
      {
        "cap": {
          "en": "Already tracked? Ignoring is not enough",
          "he": "כבר במעקב? להתעלם זה לא מספיק"
        },
        "code": "$ echo \".env\" >> .gitignore\n$ git status\nmodified: .env                 # still tracked, the new rule changes nothing\n\n$ git log --oneline --all -- .env\na1b2c3d first commit           # it is in the history already\n\n$ git rm --cached .env         # stop tracking, keep the file on disk\n$ git commit -m \"Stop tracking .env\"\n# the key is still readable in a1b2c3d: replace it with a new one"
      }
    ],
    "prompts": [
      {
        "en": "Show me this project's .gitignore and check that it covers secrets, installed packages, build output and OS clutter. List anything tracked right now that should not be.",
        "he": "תראו לי את ה-.gitignore של הפרויקט ותבדקו שהוא מכסה סודות, חבילות מותקנות, תוצרי build ופסולת של מערכת ההפעלה. תרשמו כל קובץ שנמצא עכשיו במעקב ולא אמור להיות."
      },
      {
        "en": "Check whether .env or any key file was ever committed anywhere in this repo's history. Show the commits, and tell me which secrets I need to replace.",
        "he": "תבדקו אם .env או קובץ מפתח כלשהו נשמרו אי פעם ב-commit בהיסטוריה של ה-repo. תראו את ה-commits, ותגידו לי אילו סודות צריך להחליף."
      },
      {
        "en": "Create a .env.example with every variable name this app reads and no real values, and make sure .gitignore allows it while still blocking .env.",
        "he": "צרו .env.example עם כל שמות המשתנים שהאפליקציה קוראת ובלי ערכים אמיתיים, ותוודאו ש-.gitignore מאפשר אותו ועדיין חוסם את .env."
      }
    ]
  },
  "Regex": {
    "look": [
      {
        "cap": {
          "en": "Accept and reject lists, run as a test",
          "he": "רשימות לקבל ולדחות, שרצות כ-test"
        },
        "code": "const email = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/   // loose on purpose\n\nconst ok  = [\"dana@shop.com\", \"dana+news@gmail.com\",\n             \"o'neil@mail.co.il\", \"x@studio.design\"]\nconst bad = [\"\", \"dana\", \"dana@\", \"@shop.com\", \"dana @shop.com\"]\n\nfor (const s of ok)  console.assert(email.test(s), \"should pass:\", s)\nfor (const s of bad) console.assert(!email.test(s), \"should fail:\", s)\n// then prove the address is real with a confirmation email"
      }
    ],
    "prompts": [
      {
        "en": "Explain this regex piece by piece in plain words, then list five inputs it accepts and five it rejects that I might not expect.",
        "he": "תסבירו את ה-regex הזה חלק אחרי חלק במילים פשוטות, ואז תרשמו חמישה קלטים שהוא מקבל וחמישה שהוא דוחה, שאולי לא הייתי מצפה להם."
      },
      {
        "en": "Write a test for this regex with real-world cases that should pass and fail, including plus signs, apostrophes, accents, Hebrew letters and empty strings. Run it.",
        "he": "כתבו test ל-regex הזה עם מקרים מהעולם האמיתי שצריכים לעבור ולהיכשל, כולל סימני פלוס, גרשים, אותיות עם סימנים, אותיות בעברית ומחרוזות ריקות. תריצו אותו."
      },
      {
        "en": "Is there a built-in or well-known library function that does this check better than a regex? If yes, replace the regex and explain why.",
        "he": "יש פונקציה מובנית או פונקציה מספרייה מוכרת שעושה את הבדיקה הזו טוב יותר מ-regex? אם כן, תחליפו את ה-regex ותסבירו למה."
      }
    ]
  },
  "Variables, functions & imports": {
    "look": [
      {
        "cap": {
          "en": "Values come in a few shapes",
          "he": "לערכים יש כמה צורות"
        },
        "code": "const count = 3;                            // a number\nconst name = \"Maya\";                        // text, called a string\nconst isPaid = false;                       // true or false, a boolean\nconst tags = [\"new\", \"sale\"];               // a list, called an array\nconst user = { name: \"Maya\", plan: \"pro\" };  // an object: named fields\n\nuser.plan   // → \"pro\"\ntags[0]     // → \"new\"   (lists count from 0)"
      }
    ],
    "prompts": [
      {
        "en": "Explain this function in plain words: what goes in, what comes out, and every if that changes the path. Do not rewrite anything.",
        "he": "תסבירו את ה-function הזו במילים פשוטות: מה נכנס, מה יוצא, וכל if שמשנה את המסלול. אל תשכתבו כלום."
      },
      {
        "en": "List the imports at the top of this file. For each one, say which file or package it comes from and what this file uses it for.",
        "he": "תרשמו את ה-imports בראש הקובץ הזה. לכל אחד, תגידו מאיזה קובץ או package הוא מגיע ולמה הקובץ הזה משתמש בו."
      },
      {
        "en": "Before you change any function, tell me its current inputs and return value and whether your change alters either. If it does, list every place that calls it.",
        "he": "לפני שאתם משנים function כלשהי, תגידו לי מה הקלטים וה-return value שלה עכשיו, והאם השינוי שלכם משנה אחד מהם. אם כן, תרשמו כל מקום שקורא לה."
      }
    ]
  },
  "Errors, exceptions & null": {
    "look": [
      {
        "cap": {
          "en": "Say what \"nothing\" should mean",
          "he": "תגידו מה \"כלום\" אמור להיות"
        },
        "code": "user?.name ?? \"Guest\"      // no user → \"Guest\", not a crash\nitems?.length ?? 0         // no list → 0\n\n// fine when nothing is a normal answer.\n// wrong when the user should never be missing:\nif (!user) throw new Error(\"order \" + order.id + \" has no user\");"
      }
    ],
    "prompts": [
      {
        "en": "Go through this function and list every value that could be null or undefined, and what the code currently does when it is. Do not fix anything yet.",
        "he": "תעברו על ה-function הזו ותרשמו כל ערך שיכול להיות null או undefined, ומה הקוד עושה היום כשהוא כזה. אל תתקנו עדיין כלום."
      },
      {
        "en": "Find every catch block in this project that is empty, only logs to the console, or hides the error. Show each one with its file and line.",
        "he": "תמצאו כל בלוק catch בפרויקט שהוא ריק, שרק כותב ל-console, או שמסתיר את השגיאה. תראו כל אחד עם הקובץ והשורה."
      },
      {
        "en": "For this error message, tell me exactly which value was undefined, where it came from, and the smallest check that handles that case properly.",
        "he": "להודעת השגיאה הזו, תגידו לי בדיוק איזה ערך היה undefined, מאיפה הוא הגיע, ומה הבדיקה הכי קטנה שמטפלת במקרה הזה כמו שצריך."
      }
    ]
  },
  "Linter, formatter & type check": {
    "prompts": [
      {
        "en": "Run the formatter, the linter and the type check for this project and paste the raw output. Then fix the errors one by one without disabling any rule.",
        "he": "תריצו את ה-formatter, ה-linter וה-type check של הפרויקט ותדביקו את הפלט כמו שהוא. אחר כך תתקנו את השגיאות אחת אחת, בלי לכבות אף כלל."
      },
      {
        "en": "Search the codebase for eslint-disable, @ts-ignore, @ts-expect-error and casts to any. List each with its file, and say which warning it is hiding.",
        "he": "תחפשו בקוד eslint-disable, @ts-ignore, @ts-expect-error והמרות ל-any. תרשמו כל אחד עם הקובץ שלו, ותגידו איזו אזהרה הוא מסתיר."
      },
      {
        "en": "Add format, lint and typecheck scripts to package.json if they are missing, and make the CI workflow run all three and fail on any error.",
        "he": "תוסיפו ל-package.json scripts של format, lint ו-typecheck אם הם חסרים, ותגרמו ל-CI להריץ את שלושתם ולהיכשל על כל שגיאה."
      }
    ]
  },
  "Personal data & privacy (GDPR)": {
    "prompts": [
      {
        "en": "List every piece of personal data this app collects, where it is stored, which logs contain it, and which third-party services receive it. Put it in a table.",
        "he": "תרשמו כל פריט של מידע אישי שהאפליקציה אוספת, איפה הוא נשמר, באילו logs הוא מופיע, ואילו שירותים חיצוניים מקבלים אותו. בטבלה."
      },
      {
        "en": "Build a delete-account flow that removes or anonymises this user in every table, clears their uploaded files, and tells me what must be kept for invoices.",
        "he": "תבנו תהליך מחיקת חשבון שמסיר או הופך לאנונימי את המשתמש בכל טבלה, מוחק את הקבצים שהעלה, ואומר לי מה חייבים לשמור בשביל חשבוניות."
      },
      {
        "en": "Find every place this code logs or sends a whole request body, an email or other personal fields to logs, analytics or error tracking, and replace them with ids.",
        "he": "תמצאו כל מקום שבו הקוד רושם ב-log או שולח request body שלם, אימייל או שדות אישיים אחרים ל-logs, ל-analytics או ל-error tracking, ותחליפו אותם ב-ids."
      }
    ]
  }
};
