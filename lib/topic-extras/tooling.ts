import type { TopicExtra } from "./types";

export const extras: Record<string, TopicExtra> = {
  "PATH & command not found": {
    "look": [
      {
        "cap": {
          "en": "Installed a minute ago, still not found",
          "he": "הותקן לפני דקה, ועדיין לא נמצא"
        },
        "code": "> winget install OpenJS.NodeJS.LTS\nSuccessfully installed\n\n> node -v\nnode : The term 'node' is not recognized as the name of a cmdlet...\n\n# the installer added a folder to PATH,\n# but this window read PATH when it opened.\n# close it, open a new terminal:\n\n> node -v\nv20.11.0"
      }
    ],
    "prompts": [
      {
        "en": "I get \"command not found\" for this tool. Before installing anything, check whether it is already installed, show every copy the terminal can find, and print my PATH.",
        "he": "מתקבל אצלי \"command not found\" על הכלי הזה. לפני שמתקינים משהו, תבדקו אם הוא כבר מותקן, תראו כל עותק שהטרמינל מוצא, ותדפיסו את ה-PATH שלי."
      },
      {
        "en": "List every line you or an installer added to my shell settings file for PATH. Explain each one, and tell me which are duplicates I can remove.",
        "he": "תרשמו כל שורה שאתם או תוכנת התקנה הוספתם לקובץ ההגדרות של ה-shell בשביל PATH. תסבירו כל אחת, ותגידו לי אילו כפולות ואפשר למחוק אותן."
      },
      {
        "en": "This project needs a specific Node.js version. Show me how to check which node the terminal actually runs, and its version, in one command.",
        "he": "הפרויקט הזה צריך גרסה מסוימת של Node.js. תראו לי איך בודקים באיזה node הטרמינל באמת משתמש, ומה הגרסה שלו, בפקודה אחת."
      }
    ]
  },
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
  "SSH key": {
    "look": [
      {
        "cap": {
          "en": "Which address, which key?",
          "he": "איזו כתובת, איזה מפתח?"
        },
        "code": "$ git push\ngit@github.com: Permission denied (publickey).\nfatal: Could not read from remote repository.\n\n$ ls ~/.ssh                  # any key on this machine?\nknown_hosts                  # no id_ed25519: never created here\n\n$ git remote -v\norigin  git@github.com:acme/shop.git   # an SSH address, so it needs a key\n# https://github.com/acme/shop.git would use a token instead"
      }
    ],
    "prompts": [
      {
        "en": "Set up an SSH key for GitHub on this machine. Explain each command before you run it, and show me exactly which file to paste into GitHub.",
        "he": "תגדירו SSH key ל-GitHub על המחשב הזה. תסבירו כל פקודה לפני שאתם מריצים אותה, ותראו לי בדיוק איזה קובץ להדביק ב-GitHub."
      },
      {
        "en": "My push says \"Permission denied (publickey)\". Diagnose it step by step: is there a key, is it loaded, does the remote use SSH, and what does ssh -T say?",
        "he": "ה-push שלי כותב \"Permission denied (publickey)\". תאבחנו את זה צעד אחרי צעד: יש מפתח, הוא טעון, ה-remote משתמש ב-SSH, ומה ssh -T אומר?"
      },
      {
        "en": "Check whether any private key, token or password is committed anywhere in this repo or its history. List what you find without printing the secret values.",
        "he": "תבדקו אם private key, token או סיסמה נשמרו ב-commit איפשהו ב-repo הזה או בהיסטוריה שלו. תרשמו מה מצאתם בלי להדפיס את הערכים הסודיים."
      }
    ]
  },
  "Undo: revert vs reset": {
    "look": [
      {
        "cap": {
          "en": "The three strengths of reset",
          "he": "שלוש העוצמות של reset"
        },
        "code": "# you are here: 3 commits on top of a1b2c3d\n$ git reset --soft a1b2c3d   # commits gone, changes staged, ready to recommit\n$ git reset        a1b2c3d   # commits gone, changes kept in your files\n$ git reset --hard a1b2c3d   # commits gone, changes gone, files match a1b2c3d\n\n# the same family, these also delete uncommitted work:\n$ git checkout .\n$ git restore .\n$ git clean -fd              # removes new files Git never tracked"
      }
    ],
    "prompts": [
      {
        "en": "Undo your last change without losing my uncommitted work. Run git status first, tell me whether the commit is pushed, and use revert if it is.",
        "he": "תבטלו את השינוי האחרון שלכם בלי לאבד את העבודה שלי שלא נשמרה ב-commit. תריצו קודם git status, תגידו לי אם ה-commit כבר עלה ב-push, ואם כן תשתמשו ב-revert."
      },
      {
        "en": "Before you run any reset, checkout, restore or clean command, print exactly which files and changes it would throw away, and wait for my yes.",
        "he": "לפני שאתם מריצים פקודת reset, checkout, restore או clean, תדפיסו בדיוק אילו קבצים ושינויים היא תזרוק, ותחכו לאישור שלי."
      },
      {
        "en": "Something broke in the last few commits. Show git log --oneline, find the last commit where the app worked, and explain how to go back to it safely.",
        "he": "משהו נשבר באחד ה-commits האחרונים. תראו git log --oneline, תמצאו את ה-commit האחרון שבו האפליקציה עבדה, ותסבירו איך חוזרים אליו בבטחה."
      }
    ]
  },
  "Stash": {
    "look": [
      {
        "cap": {
          "en": "When pop hits a conflict",
          "he": "כש-pop נתקל ב-conflict"
        },
        "code": "$ git stash pop\nAuto-merging src/search.ts\nCONFLICT (content): Merge conflict in src/search.ts\nThe stash entry is kept in case you need it again.\n\n# fix the conflict markers in src/search.ts, then:\n$ git add src/search.ts\n$ git stash drop                    # only now remove it from the shelf"
      }
    ],
    "prompts": [
      {
        "en": "Before you pull, switch branch or undo anything, stash my uncommitted changes with a clear message, and tell me the exact command to bring them back.",
        "he": "לפני שאתם עושים pull, עוברים branch או מבטלים משהו, תעשו stash לשינויים שלי שלא נשמרו ב-commit עם הודעה ברורה, ותגידו לי את הפקודה המדויקת להחזיר אותם."
      },
      {
        "en": "Show my git stash list and, for each entry, which branch it came from and which files it changes. Do not drop anything.",
        "he": "תראו את git stash list שלי, ולכל רשומה, מאיזה branch היא הגיעה ואילו קבצים היא משנה. אל תמחקו כלום."
      },
      {
        "en": "I have a stash I will need for days. Turn it into a commit on its own branch instead, and push it so it is not only on my laptop.",
        "he": "יש לי stash שאצטרך עוד כמה ימים. תהפכו אותו ל-commit על branch משלו, ותעשו לו push כדי שהוא לא יהיה רק על הלפטופ שלי."
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
