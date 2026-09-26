import type { TopicExtra } from "./types";

export const extras: Record<string, TopicExtra> = {
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
};
