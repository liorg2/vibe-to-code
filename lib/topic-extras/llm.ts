import type { TopicExtra } from "./types";

export const extras: Record<string, TopicExtra> = {
  "LLM API call": {
    "look": [
      {
        "cap": {
          "en": "What comes back: text, why it stopped, and what it cost",
          "he": "מה חוזר: טקסט, למה הוא עצר, וכמה זה עלה"
        },
        "code": "{\n  \"model\": \"<the model you asked for>\",\n  \"stop_reason\": \"end_turn\",        // or \"max_tokens\": cut off by your cap\n  \"content\": [{ \"type\": \"text\", \"text\": \"This invoice is for 12 hours of design work...\" }],\n  \"usage\": { \"input_tokens\": 812, \"output_tokens\": 164 }\n}"
      }
    ],
    "prompts": [
      {
        "en": "Find every place this app calls an AI model. For each one, tell me if it runs in the browser or on the server, and where the key is read from.",
        "he": "מצאו כל מקום שבו האפליקציה הזו קוראת למודל AI. לכל אחד, תגידו לי אם הוא רץ בדפדפן או בשרת, ומאיפה המפתח נקרא."
      },
      {
        "en": "Add a 20-second timeout and a 400-token answer cap to our model call. Show me what the user sees when it times out.",
        "he": "הוסיפו timeout של 20 שניות ותקרה של 400 tokens לתשובה בקריאה שלנו למודל. תראו לי מה המשתמש רואה כשנגמר הזמן."
      },
      {
        "en": "Explain in plain words what our app sends to the model on each call and what comes back. No code, five lines at most.",
        "he": "הסבירו במילים פשוטות מה האפליקציה שלנו שולחת למודל בכל קריאה ומה חוזר. בלי קוד, חמש שורות לכל היותר."
      }
    ]
  },
  "Tokens & cost": {
    "look": [
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
        "en": "Add usage logging to every AI call: model, input tokens, output tokens and cost from one price table. No user text in the log.",
        "he": "הוסיפו רישום שימוש לכל קריאת AI: מודל, tokens של input, tokens של output ועלות מטבלת מחירים אחת. בלי טקסט של משתמשים ב-log."
      },
      {
        "en": "From our logs, estimate the monthly AI cost at 1,000 daily users. Show the math and which part of each call costs the most.",
        "he": "לפי ה-logs שלנו, תעריכו את עלות ה-AI החודשית ב-1,000 משתמשים ביום. תראו את החישוב ואיזה חלק מכל קריאה עולה הכי הרבה."
      },
      {
        "en": "Our chat resends the full history every time. Propose two ways to keep it shorter and tell me what each one might lose.",
        "he": "הצ'אט שלנו שולח את כל ההיסטוריה בכל פעם. הציעו שתי דרכים לקצר אותה ותגידו לי מה כל אחת עלולה לאבד."
      }
    ]
  },
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
  "Structured output": {
    "look": [
      {
        "cap": {
          "en": "The same email, asked two ways",
          "he": "אותו מייל, בשתי דרכים לבקש"
        },
        "code": "prompt says \"reply in JSON\":\n  Sure! Here is the JSON:\n  { \"company\": \"Brightwave\", \"teamSize\": 40, \"budg\n                                                ^ cut off at the length cap\n\nschema enforced by the API:\n  { \"company\": \"Brightwave\", \"teamSize\": 40, \"budget\": null }"
      }
    ],
    "prompts": [
      {
        "en": "Find every place we parse JSON from a model. Switch each one to the API's schema mode and validate the result with a schema.",
        "he": "מצאו כל מקום שבו אנחנו מפענחים JSON ממודל. העבירו כל אחד למצב ה-schema של ה-API ובדקו את התוצאה מול schema."
      },
      {
        "en": "Write tests with a fake model that returns chatty text, cut-off JSON and a missing field. Each must land in the review list.",
        "he": "כתבו tests עם מודל מזויף שמחזיר טקסט מפטפט, JSON קטוע ושדה חסר. כל אחד מהם חייב לנחות ברשימת הבדיקה."
      },
      {
        "en": "Design the smallest schema for pulling a contact's name, company and next step from a note. Explain each field in one line.",
        "he": "תכננו את ה-schema הכי קטן לשליפת שם, חברה והצעד הבא של איש קשר מתוך הערה. הסבירו כל שדה בשורה אחת."
      }
    ]
  },
  "Tool calling": {
    "look": [
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
        "en": "List every tool our AI can call. For each, say what it can change and where it gets the user's identity from.",
        "he": "רשמו כל tool שה-AI שלנו יכול לקרוא לו. לכל אחד, תגידו מה הוא יכול לשנות ומאיפה הוא לוקח את זהות המשתמש."
      },
      {
        "en": "Add a test where the model asks for another customer's order. The tool must answer 'not found' and log the attempt.",
        "he": "הוסיפו test שבו המודל מבקש הזמנה של לקוח אחר. ה-tool חייב לענות 'not found' ולרשום את הניסיון."
      },
      {
        "en": "Change our refund tool so it only drafts the refund. A person approves it with one click before any money moves.",
        "he": "שנו את tool ההחזרים שלנו כך שהוא רק מכין טיוטת החזר. בן אדם מאשר אותה בלחיצה אחת לפני שכסף זז."
      }
    ]
  },
  "Agent": {
    "prompts": [
      {
        "en": "Find the loop in our agent and list every way it can end. Add a step cap, a token budget and a stop after three failures in a row.",
        "he": "מצאו את הלולאה ב-agent שלנו ורשמו כל דרך שבה היא יכולה להיגמר. הוסיפו מגבלת צעדים, תקציב tokens ועצירה אחרי שלושה כשלונות ברצף."
      },
      {
        "en": "Could this feature be three fixed calls instead of an agent? Compare both on cost, speed and how easy each is to test.",
        "he": "האם ה-feature הזה יכול להיות שלוש קריאות קבועות במקום agent? השוו את שניהם בעלות, במהירות ובכמה קל לבדוק כל אחד."
      },
      {
        "en": "Write a test where one tool always fails. Prove the agent stops, tells the user why, and logs how many tokens it used.",
        "he": "כתבו test שבו tool אחד תמיד נכשל. הוכיחו שה-agent עוצר, אומר למשתמש למה, ורושם כמה tokens הוא צרך."
      }
    ]
  },
  "MCP": {
    "prompts": [
      {
        "en": "List every MCP server this project or my AI tool is connected to. For each: what it can change, and whose credentials it uses.",
        "he": "רשמו כל שרת MCP שהפרויקט הזה או כלי ה-AI שלי מחוברים אליו. לכל אחד: מה הוא יכול לשנות, ועם ההרשאות של מי הוא עובד."
      },
      {
        "en": "Create a read-only database user for our staging database, and point our database MCP server at it instead of the current one.",
        "he": "צרו משתמש לקריאה בלבד למסד הנתונים של staging, וכוונו אליו את שרת ה-MCP של מסד הנתונים במקום המשתמש הנוכחי."
      },
      {
        "en": "Explain in five plain lines how MCP differs from our app's own tool calling. Use our CRM as the example.",
        "he": "הסבירו בחמש שורות פשוטות במה MCP שונה מה-tool calling של האפליקציה שלנו. השתמשו ב-CRM שלנו כדוגמה."
      }
    ]
  },
  "Embeddings & vector search": {
    "prompts": [
      {
        "en": "Add meaning-based search to our contact notes with pgvector. Store the embedding model name, and search only the signed-in user's notes.",
        "he": "הוסיפו לחיפוש בהערות של אנשי הקשר שלנו חיפוש לפי משמעות עם pgvector. שמרו את שם מודל ה-embedding, וחפשו רק בהערות של המשתמש המחובר."
      },
      {
        "en": "Write a test proving that editing a note re-embeds it, and that one user's search never returns another user's note.",
        "he": "כתבו test שמוכיח שעריכת הערה מחשבת לה embedding מחדש, ושהחיפוש של משתמש אחד אף פעם לא מחזיר הערה של משתמש אחר."
      },
      {
        "en": "Compare keyword search and vector search on ten real queries from our app. Show which one found the right result for each.",
        "he": "השוו חיפוש לפי מילים ו-vector search על עשר שאילתות אמיתיות מהאפליקציה שלנו. תראו מי מהם מצא את התוצאה הנכונה בכל אחת."
      }
    ]
  },
  "RAG": {
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
        "en": "Show me what our assistant retrieves for this question before it answers: each passage, its score, its owner and its date.",
        "he": "תראו לי מה העוזר שלנו שולף לשאלה הזו לפני שהוא עונה: כל קטע, הציון שלו, הבעלים שלו והתאריך שלו."
      },
      {
        "en": "Make our RAG filter by the signed-in user's team before ranking, and add a test that another team's notes never come back.",
        "he": "גרמו ל-RAG שלנו לסנן לפי הצוות של המשתמש המחובר לפני הדירוג, והוסיפו test שהערות של צוות אחר אף פעם לא חוזרות."
      },
      {
        "en": "Add an 'I don't know' answer when the best passage scores below a threshold. Suggest the threshold from ten real questions.",
        "he": "הוסיפו תשובת 'אני לא יודע' כשהקטע הכי טוב מקבל ציון מתחת לסף. הציעו את הסף לפי עשר שאלות אמיתיות."
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
  "Prompt caching": {
    "prompts": [
      {
        "en": "Check our AI calls for anything that changes at the start of the prompt: dates, ids, names, tool order. List each one and where to move it.",
        "he": "בדקו בקריאות ה-AI שלנו כל דבר שמשתנה בהתחלה של ה-prompt: תאריכים, מזהים, שמות, סדר tools. רשמו כל אחד ולאן להעביר אותו."
      },
      {
        "en": "Turn on prompt caching for our longest system prompt. Run three calls and show me the cache-read tokens for each.",
        "he": "הפעילו prompt caching ל-system prompt הכי ארוך שלנו. הריצו שלוש קריאות ותראו לי את ה-tokens שנקראו מה-cache בכל אחת."
      },
      {
        "en": "Explain the difference between prompt caching and caching the AI's answer in our app. When would we want each?",
        "he": "הסבירו את ההבדל בין prompt caching לבין שמירת התשובה של ה-AI ב-cache באפליקציה שלנו. מתי נרצה כל אחד?"
      }
    ]
  },
  "Model choice & fallback": {
    "prompts": [
      {
        "en": "Run our eval for the contact summary on our current model and one smaller model. Show pass rate, average cost and speed for each.",
        "he": "הריצו את ה-eval של סיכום איש הקשר על המודל הנוכחי שלנו ועל מודל אחד קטן יותר. תראו אחוז הצלחה, עלות ממוצעת ומהירות לכל אחד."
      },
      {
        "en": "Add a fallback model to our AI calls, and a test where the first one returns 429. Prove the fallback answers and is logged.",
        "he": "הוסיפו מודל fallback לקריאות ה-AI שלנו, ו-test שבו הראשון מחזיר 429. הוכיחו שה-fallback עונה ונרשם."
      },
      {
        "en": "Find every hard-coded model name in our code and move them into one setting. Show me the list before you change anything.",
        "he": "מצאו כל שם מודל שכתוב ישירות בקוד שלנו והעבירו את כולם להגדרה אחת. תראו לי את הרשימה לפני שאתם משנים משהו."
      }
    ]
  }
};
