import type { TopicExtra } from "./types";

export const extras: Record<string, TopicExtra> = {
  "Process & port already in use": {
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
  }
};
