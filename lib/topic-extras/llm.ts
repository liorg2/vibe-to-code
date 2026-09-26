import type { TopicExtra } from "./types";

export const extras: Record<string, TopicExtra> = {
  "System prompt": {
    "prompts": [
      {
        "en": "Rewrite our system prompt so it is specific: the job, three rules, what to do when unsure, and the answer's length. Under 120 words.",
        "he": "כתבו מחדש את ה-system prompt שלנו כך שיהיה ספציפי: התפקיד, שלושה כללים, מה עושים כשלא בטוחים, ואורך התשובה. מתחת ל-120 מילים."
      },
      {
        "en": "Check if any user text is pasted into our system prompt. If so, move it into the user message and show me the change.",
        "he": "בדקו אם טקסט כלשהו של משתמש מודבק לתוך ה-system prompt שלנו. אם כן, העבירו אותו להודעת המשתמש ותראו לי את השינוי."
      },
      {
        "en": "Write ten tricky user questions that try to make our assistant break its rules. We'll run them after every prompt change.",
        "he": "כתבו עשר שאלות משתמש מכשילות שמנסות לגרום לעוזר שלנו לשבור את הכללים שלו. נריץ אותן אחרי כל שינוי ב-prompt."
      }
    ]
  },
  "Streaming response": {
    "prompts": [
      {
        "en": "Make our summary stream into the page word by word. The key stays on the server. Show me the first-word time before and after.",
        "he": "גרמו לסיכום שלנו להגיע לדף ב-streaming, מילה אחרי מילה. המפתח נשאר בשרת. תראו לי את הזמן עד המילה הראשונה לפני ואחרי."
      },
      {
        "en": "What happens today if a user closes the tab mid-answer? Make it cancel the model call and still log the usage.",
        "he": "מה קורה היום אם משתמש סוגר את הלשונית באמצע תשובה? גרמו לזה לבטל את הקריאה למודל ועדיין לרשום את השימוש."
      },
      {
        "en": "If the stream drops halfway, show 'this answer was cut off' and a retry button. Add a test that simulates the drop.",
        "he": "אם ה-stream נופל באמצע, הציגו 'התשובה נקטעה' וכפתור לנסות שוב. הוסיפו test שמדמה את הנפילה."
      }
    ]
  },
  "Evals": {
    "prompts": [
      {
        "en": "Build a 20-item eval for our contact summary from real notes with names removed. Each item lists the facts the summary must keep.",
        "he": "בנו eval של 20 פריטים לסיכום איש הקשר שלנו מהערות אמיתיות בלי שמות. כל פריט מפרט את העובדות שהסיכום חייב לשמור."
      },
      {
        "en": "Run our eval with the current prompt and with my proposed change. Show both pass rates and the items that changed.",
        "he": "הריצו את ה-eval שלנו עם ה-prompt הנוכחי ועם השינוי שהצעתי. תראו את שני אחוזי ההצלחה ואת הפריטים שהשתנו."
      },
      {
        "en": "Add five awkward cases to our eval: an empty note, a very long one, one in Hebrew, one full of emoji, one that gives orders.",
        "he": "הוסיפו ל-eval שלנו חמישה מקרים מביכים: הערה ריקה, הערה ארוכה מאוד, אחת בעברית, אחת מלאה באימוג'י, ואחת שנותנת פקודות."
      }
    ]
  },
};
