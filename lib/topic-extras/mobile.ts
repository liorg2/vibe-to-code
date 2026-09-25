import type { TopicExtra } from "./types";

export const extras: Record<string, TopicExtra> = {
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
        "en": "Compare three options for putting my web app on phones: improve the web app, wrap it with Capacitor, or rebuild in React Native. Give cost, time and what I'd maintain.",
        "he": "תשוו בין שלוש אפשרויות להביא את ה-web app שלי לטלפונים: לשפר את ה-web app, לעטוף אותו ב-Capacitor, או לבנות מחדש ב-React Native. תנו עלות, זמן ומה אצטרך לתחזק."
      },
      {
        "en": "Before writing any code, explain in plain words what Apple would say about my app if I only wrapped the website. What would I need to add?",
        "he": "לפני שאתם כותבים קוד, תסבירו במילים פשוטות איך Apple תגיב לאפליקציה שלי אם רק אעטוף את האתר. מה אצטרך להוסיף?"
      }
    ]
  },
  "Mobile-first design": {
    "look": [
      {
        "cap": {
          "en": "A contacts list designed for a 320px phone first.",
          "he": "רשימת אנשי קשר שעוצבה קודם לטלפון ברוחב 320px."
        },
        "code": ".list { display: grid; gap: 10px; }\n.card {\n  display: flex;\n  justify-content: space-between;\n  min-height: 56px;          /* a full row is the tap target */\n  padding: 12px;\n  border-radius: 12px;\n}\n.add { width: 100%; min-height: 48px; }  /* main action, full width */",
        "preview": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\"/>\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"/>\n<title>Mobile first</title>\n<style>\n*{box-sizing:border-box}\nbody{font-family:system-ui,sans-serif;margin:0;background:#e2e8f0;color:#0f172a;display:flex;justify-content:center;padding:1rem}\n.phone{width:320px;background:#fff;border:8px solid #0f172a;border-radius:28px;padding:16px;font-size:16px}\nh1{font-size:1.2rem;margin:0 0 12px}\n.list{display:grid;gap:10px}\n.card{border:1px solid #cbd5e1;border-radius:12px;padding:12px;display:flex;justify-content:space-between;align-items:center;min-height:56px}\n.card b{display:block}\n.card small{color:#475569}\n.stage{font-size:.8rem;background:#dbeafe;color:#1e40af;padding:4px 8px;border-radius:999px}\n.add{margin-top:14px;width:100%;min-height:48px;border:0;border-radius:12px;background:#2563eb;color:#fff;font-size:1rem}\n</style>\n</head>\n<body>\n<div class=\"phone\">\n<h1>Contacts</h1>\n<div class=\"list\">\n<div class=\"card\"><span><b>Dana Levi</b><small>Acme</small></span><span class=\"stage\">lead</span></div>\n<div class=\"card\"><span><b>Omar Haddad</b><small>Northwind</small></span><span class=\"stage\">qualified</span></div>\n<div class=\"card\"><span><b>Mia Chen</b><small>Globex</small></span><span class=\"stage\">won</span></div>\n</div>\n<button class=\"add\">+ Add contact</button>\n</div>\n</body>\n</html>"
      }
    ],
    "prompts": [
      {
        "en": "Rewrite the CSS for my contacts page mobile-first: base styles for a 375px screen, then min-width media queries for tablet and desktop. Show the before and after.",
        "he": "תכתבו מחדש את ה-CSS של דף אנשי הקשר בגישת mobile-first: עיצוב בסיסי למסך ברוחב 375px, ואז media queries עם min-width לטאבלט ולמחשב. תראו לפני ואחרי."
      },
      {
        "en": "Check my pages for mobile-first problems: missing viewport tag, fixed widths, hover-only actions, inputs under 16px, tables that scroll sideways. List each one with the file and line.",
        "he": "תבדקו את הדפים שלי לבעיות mobile-first: viewport tag חסר, רוחב קבוע, פעולות שיש רק ב-hover, שדות מתחת ל-16px, טבלאות שנגללות הצידה. תפרטו כל אחת עם הקובץ והשורה."
      },
      {
        "en": "My contacts table has six columns. Suggest how it should look on a 375px phone, what goes on the card and what hides behind a tap.",
        "he": "לטבלת אנשי הקשר שלי יש שש עמודות. תציעו איך היא צריכה להיראות בטלפון ברוחב 375px, מה נכנס לכרטיס ומה מסתתר מאחורי הקשה."
      }
    ]
  },
  "Touch targets & gestures": {
    "look": [
      {
        "cap": {
          "en": "The same two actions, sized for a mouse and for a thumb.",
          "he": "אותן שתי פעולות, בגודל של עכבר ובגודל של אגודל."
        },
        "code": "<!-- too small, too close -->\n<button class=\"tiny\">E</button><button class=\"tiny\">X</button>\n\n<!-- thumb-sized -->\n<div class=\"acts\">            <!-- gap: 8px -->\n  <button>Edit</button>       <!-- min 44 x 44 -->\n  <button class=\"del\">Delete</button>\n</div>",
        "preview": "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\"/>\n<title>Touch targets</title>\n<style>\nbody{font-family:system-ui,sans-serif;margin:1.5rem;background:#f8fafc;color:#0f172a}\nh2{font-size:.9rem;margin:1rem 0 .4rem;color:#475569}\n.row{display:flex;align-items:center;justify-content:space-between;background:#fff;border:1px solid #cbd5e1;border-radius:10px;padding:8px 12px;max-width:340px}\n.bad button{width:20px;height:20px;padding:0;margin-left:2px;border:1px solid #94a3b8;border-radius:4px;background:#fff;font-size:11px}\n.good .acts{display:flex;gap:8px}\n.good button{min-width:44px;min-height:44px;border:1px solid #94a3b8;border-radius:10px;background:#fff;font-size:15px}\n.good .del{color:#b91c1c}\n</style>\n</head>\n<body>\n<h2>Too small, too close: 20px, 2px apart</h2>\n<div class=\"row bad\"><span>Dana Levi</span><span><button>E</button><button>X</button></span></div>\n<h2>Thumb-sized: 44px, 8px apart</h2>\n<div class=\"row good\"><span>Dana Levi</span><span class=\"acts\"><button>Edit</button><button class=\"del\">Delete</button></span></div>\n</body>\n</html>"
      }
    ],
    "prompts": [
      {
        "en": "Find every button, link and field on my pages whose tap area is smaller than 44 by 44 pixels. List them, then fix them with padding without changing how they look.",
        "he": "תמצאו כל כפתור, קישור ושדה בדפים שלי ששטח הלחיצה שלו קטן מ-44 על 44 פיקסלים. תפרטו אותם, ואז תתקנו עם padding בלי לשנות איך הם נראים."
      },
      {
        "en": "Add a browser test that opens each page at phone size and fails if any tappable element is under 44 by 44 pixels, printing which ones.",
        "he": "תוסיפו טסט בדפדפן שפותח כל דף בגודל טלפון ונכשל אם אלמנט לחיץ כלשהו קטן מ-44 על 44 פיקסלים, ומדפיס אילו."
      },
      {
        "en": "List every action in my app that works only by hover or by a gesture. For each one, suggest a visible button that does the same thing.",
        "he": "תפרטו כל פעולה באפליקציה שלי שעובדת רק ב-hover או ב-gesture. לכל אחת, תציעו כפתור גלוי שעושה את אותו דבר."
      }
    ]
  },
  "PWA (installable web app)": {
    "look": [
      {
        "cap": {
          "en": "What the phone reads, and what the person taps.",
          "he": "מה הטלפון קורא, ועל מה האדם לוחץ."
        },
        "code": "GET /manifest.webmanifest\n{ \"name\": \"Pocket CRM\", \"short_name\": \"CRM\",\n  \"start_url\": \"/contacts\", \"display\": \"standalone\",\n  \"icons\": [ { \"src\": \"/icon-192.png\", \"sizes\": \"192x192\" },\n             { \"src\": \"/icon-512.png\", \"sizes\": \"512x512\" } ] }\n\nAndroid:  Chrome menu > Install app\niPhone:   Share > Add to Home Screen\nThen:     the CRM icon opens /contacts full screen"
      }
    ],
    "prompts": [
      {
        "en": "Make my app installable with a web app manifest and icons at 192, 512 and 180 pixels. No service worker. Tell me how to install it on iPhone and Android.",
        "he": "תהפכו את האפליקציה שלי לכזו שאפשר להתקין, עם web app manifest ואייקונים בגודל 192, 512 ו-180 פיקסלים. בלי service worker. תגידו לי איך מתקינים אותה ב-iPhone וב-Android."
      },
      {
        "en": "Check my manifest: does it load, does every icon it lists exist, and is anything missing that stops phones from installing it? Show the Lighthouse result.",
        "he": "תבדקו את ה-manifest שלי: האם הוא נטען, האם כל אייקון שמופיע בו קיים, והאם חסר משהו שמונע מטלפונים להתקין אותו? תראו את התוצאה של Lighthouse."
      },
      {
        "en": "If we added a service worker, explain in plain words what it would store and exactly how a user gets the new version after I deploy.",
        "he": "אם נוסיף service worker, תסבירו במילים פשוטות מה הוא ישמור ואיך בדיוק משתמש מקבל את הגרסה החדשה אחרי שאני עושה deploy."
      }
    ]
  },
  "React Native / Expo": {
    "look": [
      {
        "cap": {
          "en": "From zero to the app on your phone.",
          "he": "מאפס לאפליקציה בטלפון שלכם."
        },
        "code": "npx create-expo-app@latest pocket-crm-mobile\ncd pocket-crm-mobile\nnpx expo start\n# prints a QR code: scan it with the Expo Go app,\n# the app opens on your phone and reloads on every save\n\nnpm install -g eas-cli\neas build --platform ios      # built in the cloud, no Mac needed"
      }
    ],
    "prompts": [
      {
        "en": "Before starting a React Native app, list what we can share with my web app (API, types, validation) and what must be rewritten. Suggest a folder layout for the shared part.",
        "he": "לפני שמתחילים אפליקציית React Native, תפרטו מה אפשר לחלוק עם ה-web app שלי (API, types, ולידציה) ומה חייבים לכתוב מחדש. תציעו מבנה תיקיות לחלק המשותף."
      },
      {
        "en": "Create an Expo app with one screen that lists contacts from my existing API. The API address must come from config, never localhost. Tell me how to open it on my phone.",
        "he": "תיצרו אפליקציית Expo עם מסך אחד שמציג אנשי קשר מה-API הקיים שלי. כתובת ה-API חייבת להגיע מהגדרות, אף פעם לא localhost. תגידו לי איך לפתוח אותה בטלפון."
      },
      {
        "en": "Search my React Native code for API keys or secrets that would ship inside the app. Explain why each is a risk and where it should live instead.",
        "he": "תחפשו בקוד ה-React Native שלי מפתחות API או סודות שייצאו בתוך האפליקציה. תסבירו למה כל אחד מהם הוא סיכון ואיפה הוא צריך לשבת במקום."
      }
    ]
  },
  "App Store & Play Store review": {
    "look": [
      {
        "cap": {
          "en": "Review notes that save a rejection.",
          "he": "הערות לבודק שחוסכות דחייה."
        },
        "code": "Notes for the reviewer\n- Demo account: review@pocketcrm.app (password in the sign-in field above)\n- Delete account: Settings > Account > Delete account\n- Camera: only used to scan a business card (Add contact > Scan card)\n- No purchases inside the app\n- Privacy policy: https://pocketcrm.app/privacy"
      }
    ],
    "prompts": [
      {
        "en": "Go through Apple's App Store Review Guidelines and Google Play's policies for my app. List every rule we might break, with the guideline number and what to change.",
        "he": "תעברו על App Store Review Guidelines של Apple ועל המדיניות של Google Play עבור האפליקציה שלי. תפרטו כל כלל שאנחנו עלולים להפר, עם מספר ההנחיה ומה לשנות."
      },
      {
        "en": "Write the review notes for my app: a demo account, where each feature that needs login is, why we ask for each permission, and how to delete an account.",
        "he": "תכתבו את ההערות לבודק עבור האפליקציה שלי: חשבון לדוגמה, איפה נמצאת כל יכולת שדורשת login, למה אנחנו מבקשים כל הרשאה, ואיך מוחקים חשבון."
      },
      {
        "en": "List every kind of data my app and its packages collect, including analytics and crash reports, so I can fill in the store's privacy answers honestly.",
        "he": "תפרטו כל סוג נתונים שהאפליקציה שלי וה-packages שלה אוספים, כולל analytics ודוחות קריסה, כדי שאוכל למלא בכנות את תשובות הפרטיות בחנות."
      }
    ]
  },
  "Push notifications": {
    "look": [
      {
        "cap": {
          "en": "Who talks to whom, in order.",
          "he": "מי מדבר עם מי, לפי הסדר."
        },
        "code": "1. app    -> person        \"Want a nudge at 9am?\"   person taps Allow\n2. phone  -> app           device token (the address of this phone)\n3. app    -> your server   save the token for this device\n4. server -> Apple/Google  { token, \"Follow up with Dana today\" }\n5. Apple/Google -> phone   shown on the lock screen, app closed\n6. tap    -> app           opens Dana's contact screen"
      }
    ],
    "prompts": [
      {
        "en": "Add reminder notifications to my app. Ask for permission only right after the user sets a follow-up date, explain why in one line, and do nothing if they say no.",
        "he": "תוסיפו התראות תזכורת לאפליקציה שלי. תבקשו רשות רק מיד אחרי שהמשתמש קובע תאריך מעקב, תסבירו למה בשורה אחת, ואל תעשו כלום אם הוא אומר לא."
      },
      {
        "en": "Show me how push tokens are stored on my server. Make it one row per device, and delete tokens the push service says are no longer valid.",
        "he": "תראו לי איך ה-push tokens נשמרים אצלי בשרת. תעשו שורה אחת לכל מכשיר, ותמחקו tokens ששירות ה-push אומר שכבר לא תקפים."
      },
      {
        "en": "Explain in plain words what happens, step by step, between my server deciding to send a reminder and it appearing on a locked phone. Where can it get lost?",
        "he": "תסבירו במילים פשוטות מה קורה, צעד אחרי צעד, מהרגע שהשרת שלי מחליט לשלוח תזכורת ועד שהיא מופיעה בטלפון נעול. איפה היא יכולה ללכת לאיבוד?"
      }
    ]
  },
  "Deep link": {
    "look": [
      {
        "cap": {
          "en": "Two kinds of link to the same screen.",
          "he": "שני סוגי קישורים לאותו מסך."
        },
        "code": "pocketcrm://contacts/42\n  app installed:  opens Dana's contact\n  not installed:  nothing happens\n\nhttps://pocketcrm.app/contacts/42\n  app installed:  opens Dana's contact in the app\n  not installed:  opens Dana's contact on the website\n  logged out:     sign in, then back to Dana"
      }
    ],
    "prompts": [
      {
        "en": "Set up deep links so https://my-domain/contacts/ID opens that contact in the app when installed and on the website otherwise. Include both ownership files.",
        "he": "תגדירו deep links כך ש-https://my-domain/contacts/ID יפתח את איש הקשר באפליקציה כשהיא מותקנת, ובאתר אם לא. תכללו את שני קובצי הבעלות."
      },
      {
        "en": "Check my /.well-known files: do they load directly with no redirect, as JSON, with the right app id? Show the real response headers.",
        "he": "תבדקו את הקבצים שלי ב-/.well-known: האם הם נטענים ישירות בלי redirect, כ-JSON, עם מזהה האפליקציה הנכון? תראו את ה-headers האמיתיים של התשובה."
      },
      {
        "en": "List what should happen when a deep link opens and the user is logged out, the contact was deleted, or the id is invalid. Then add a test for each case.",
        "he": "תפרטו מה צריך לקרות כש-deep link נפתח והמשתמש לא מחובר, איש הקשר נמחק, או שהמזהה לא תקין. ואז תוסיפו טסט לכל מקרה."
      }
    ]
  },
  "Offline & flaky networks": {
    "look": [
      {
        "cap": {
          "en": "A two-minute test anyone can run.",
          "he": "בדיקה של שתי דקות שכל אחד יכול להריץ."
        },
        "code": "DevTools > Network > throttling: Offline\n  tap Save      expect \"Not saved yet. Retry\", form still filled\nthrottling: No throttling\n  tap Retry     expect the contact in the list\n  tap Retry again\n                expect still one contact, not two"
      }
    ],
    "prompts": [
      {
        "en": "Make saving a contact safe on a bad connection: a 10 second timeout, keep the form until the server confirms, a clear \"Not saved yet\" message with Retry, and no duplicates on retry.",
        "he": "תהפכו את שמירת איש קשר לבטוחה בחיבור גרוע: timeout של 10 שניות, לשמור את הטופס עד שהשרת מאשר, הודעה ברורה של \"עוד לא נשמר\" עם כפתור לנסות שוב, ובלי כפילויות בניסיון חוזר."
      },
      {
        "en": "Explain what happens in my app, step by step, if the save reaches the server but the answer never comes back. Then show how to make the retry safe.",
        "he": "תסבירו מה קורה באפליקציה שלי, צעד אחרי צעד, אם השמירה מגיעה לשרת אבל התשובה אף פעם לא חוזרת. ואז תראו איך הופכים את הניסיון החוזר לבטוח."
      },
      {
        "en": "Add a browser test that goes offline, taps Save, checks the form is kept and a message shows, goes back online, retries twice, and expects exactly one new contact.",
        "he": "תוסיפו טסט בדפדפן שעובר ל-offline, לוחץ על שמירה, בודק שהטופס נשמר ושמופיעה הודעה, חוזר ל-online, מנסה שוב פעמיים, ומצפה לאיש קשר חדש אחד בדיוק."
      }
    ]
  },
  "Over-the-air update": {
    "look": [
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
        "en": "Look at what changed since the last store build and tell me whether it can ship as an over-the-air update, or needs a new build. Explain why for each change.",
        "he": "תסתכלו על מה שהשתנה מאז ה-build האחרון לחנות ותגידו לי אם זה יכול לצאת כ-over-the-air update, או שצריך build חדש. תסבירו למה לכל שינוי."
      },
      {
        "en": "Set up over-the-air updates with a fingerprint runtime version, a 10% rollout first, and a written rollback command. Show me the exact steps for one release.",
        "he": "תגדירו over-the-air updates עם runtime version לפי fingerprint, שחרור קודם ל-10%, ופקודת rollback כתובה. תראו לי את הצעדים המדויקים לשחרור אחד."
      },
      {
        "en": "Explain in plain words what happens on a phone that has an old build when I publish an update that needs a new native package, and how we prevent it.",
        "he": "תסבירו במילים פשוטות מה קורה בטלפון עם build ישן כשאני מפרסם עדכון שצריך package חדש של native, ואיך אנחנו מונעים את זה."
      }
    ]
  },
  "Swift / Kotlin / Flutter": {
    "look": [
      {
        "cap": {
          "en": "The same row for Android in Kotlin, and for both in Flutter.",
          "he": "אותה שורה ל-Android ב-Kotlin, ולשניהם ב-Flutter."
        },
        "code": "// Kotlin + Jetpack Compose (Android)\n@Composable\nfun ContactRow(name: String, stage: String) {\n    Row(Modifier.heightIn(min = 48.dp)) {\n        Text(name, fontWeight = FontWeight.Bold)\n        Spacer(Modifier.weight(1f))\n        Text(stage)\n    }\n}\n\n// Flutter, in Dart (iPhone and Android)\nListTile(title: Text(name), trailing: Text(stage))"
      }
    ],
    "prompts": [
      {
        "en": "For my app, compare React Native, Flutter, and separate Swift and Kotlin apps. Name the features we need that only one of them handles well, and what each costs to maintain.",
        "he": "עבור האפליקציה שלי, תשוו בין React Native, Flutter, ואפליקציות נפרדות ב-Swift וב-Kotlin. תציינו את היכולות שאנחנו צריכים שרק אחת מהן מטפלת בהן טוב, וכמה עולה לתחזק כל אחת."
      },
      {
        "en": "Explain this Swift file to me line by line in plain words, as if I have never seen Swift, and point out anything that looks like an older way of doing it.",
        "he": "תסבירו לי את קובץ ה-Swift הזה שורה אחרי שורה במילים פשוטות, כאילו אף פעם לא ראיתי Swift, ותצביעו על כל דבר שנראה כמו דרך ישנה לעשות את זה."
      },
      {
        "en": "I want an iPhone home screen widget showing today's follow-ups. Explain what must be written in Swift, how it gets data from my app, and whether I need a Mac.",
        "he": "אני רוצה widget במסך הבית של iPhone שמציג את המעקבים של היום. תסבירו מה חייב להיכתב ב-Swift, איך הוא מקבל נתונים מהאפליקציה שלי, והאם אני צריך Mac."
      }
    ]
  }
};
