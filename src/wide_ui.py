# -*- coding: utf-8 -*-
"""Widening pass: module order, learning paths, and UI strings for the new pages."""

# final module order; new modules slot in next to the ones they extend
ORDER = ["ground", "sides", "http", "api", "apis", "data", "frontend", "langs", "testing",
         "memory", "cache", "async", "auth", "security", "net", "cloud", "devops",
         "observe", "scale", "team", "ai"]

PATHS = [
 {"id": "ship", "icon": "🚀",
  "title": {"en": "Ship your first real app", "he": "לשחרר אפליקציה אמיתית ראשונה"},
  "blurb": {"en": "The straight line from an empty folder to two instances on AWS. Skip nothing here.",
            "he": "הקו הישר מתיקייה ריקה לשני מופעים ב-AWS. לא לדלג על כלום כאן."},
  "mods": ["ground", "sides", "http", "data", "frontend", "auth", "cloud", "devops", "project"]},
 {"id": "understand", "icon": "🔍",
  "title": {"en": "Understand what the AI wrote", "he": "להבין מה ה-AI כתב"},
  "blurb": {"en": "For when the code works and you have no idea why. Mental models over syntax.",
            "he": "למקרה שהקוד עובד ואין לך מושג למה. מודלים מנטליים לפני תחביר."},
  "mods": ["langs", "testing", "memory", "cache", "async", "apis", "scale", "architectures"]},
 {"id": "pro", "icon": "🛠",
  "title": {"en": "Work like a professional", "he": "לעבוד כמו מקצוען"},
  "blurb": {"en": "Security, production visibility and team habits — the parts nobody's demo shows.",
            "he": "אבטחה, נראות בפרודקשן והרגלי צוות — החלקים שאף דמו לא מראה."},
  "mods": ["security", "net", "observe", "team", "ai", "checklist"]},
]

UI_WIDE = {
 "paths":       {"en": "Pick a path",            "he": "בחר מסלול"},
 "pathsSub":    {"en": "Or just start at the top — every module stands on its own.",
                 "he": "או פשוט להתחיל מלמעלה — כל מודול עומד בפני עצמו."},
 "glossary":    {"en": "Glossary",               "he": "מילון מונחים"},
 "glossarySub": {"en": "Every term in the course, A to Z. Click one to open its slide.",
                 "he": "כל מונח בקורס, מא׳ עד ת׳. לחיצה פותחת את השקף שלו."},
 "review":      {"en": "Review",                 "he": "חזרה"},
 "reviewSub":   {"en": "Flashcards for the terms you have not marked as learned. Guess, flip, decide.",
                 "he": "כרטיסיות למונחים שעוד לא סימנת כנלמדו. לנחש, להפוך, להחליט."},
 "reviewAll":   {"en": "You have learned everything. Reviewing the whole course instead.",
                 "he": "למדת הכל. חוזרים על כל הקורס במקום."},
 "flip":        {"en": "Flip",                   "he": "הפוך"},
 "tapToFlip":   {"en": "Tap to reveal",          "he": "לחץ לחשיפה"},
 "skip":        {"en": "Not yet",                "he": "עוד לא"},
 "left":        {"en": "left",                   "he": "נותרו"},
 "openSlide":   {"en": "Open the slide",         "he": "פתח את השקף"},
 "askAI":       {"en": "Ask your AI about this", "he": "שאל את ה-AI שלך על זה"},
 "askSub":      {"en": "Paste into Claude, Cursor or Copilot with your project open.",
                 "he": "להדביק ל-Claude, Cursor או Copilot כשהפרויקט שלך פתוח."},
 "archParts":   {"en": "The pieces",             "he": "החלקים"},
 "archFlow":    {"en": "One request, start to finish", "he": "בקשה אחת, מההתחלה עד הסוף"},
 "archGood":    {"en": "Right when",             "he": "נכון כאשר"},
 "archBad":     {"en": "Breaks when",            "he": "נשבר כאשר"},
 "archCost":    {"en": "What it costs",          "he": "כמה זה עולה"},
 "archScale":   {"en": "How far it goes",        "he": "עד כמה זה מגיע"},
 "archPrompt":  {"en": "Prompt to scaffold it",  "he": "פרומפט להקמה"},
 "more":        {"en": "More",                   "he": "עוד"},
 "hfCap":       {"en": "One exchange — request first, response second, always paired",
                 "he": "חילופים אחד — ריקווסט קודם, רספונס אחר כך, תמיד בזוגות"},
 "hfClient":    {"en": "Client",                 "he": "קליינט"},
 "hfServer":    {"en": "Server",                 "he": "שרת"},
 "hfReq":       {"en": "Request",                "he": "ריקווסט"},
 "hfRes":       {"en": "Response",               "he": "רספונס"},
}

# the English prompt every slide offers; {term} is substituted at render time
ASK_PROMPT = """I'm learning the concept "{term}". Explain it to me the way a senior developer would explain it to a junior on their team:

1. A one-paragraph mental model. No code.
2. Where it shows up in MY project - look at the codebase, or ask me two questions about it first.
3. The most common mistake beginners make with it, and how I would notice that mistake happening.
4. One small, safe experiment I can run in 10 minutes to see it in action.

Keep it under 300 words. Do not change any code."""
