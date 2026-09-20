# -*- coding: utf-8 -*-
"""Widening pass: module order, learning paths, and UI strings for the new pages."""

# final module order; new modules slot in next to the ones they extend
ORDER = ["ground", "sides", "http", "apis", "data", "frontend", "langs", "testing",
         "memory", "cache", "async", "auth", "security", "net", "cloud", "devops",
         "observe", "scale", "team", "ai"]

PATHS = [
 {"id": "basic", "icon": "🌱",
  "title": {"en": "Programming concepts for vibe coders",
            "he": "מושגי תכנות ל-Vibe Coders"},
  "blurb": {"en": "How software actually works — from an empty folder to a page talking to a database.",
            "he": "איך תוכנה באמת עובדת — מתיקייה ריקה לדף שמדבר עם בסיס נתונים."},
  "mods": ["ground", "sides", "http", "apis", "data", "frontend", "langs", "testing",
           "memory", "cache"]},
 {"id": "advanced", "icon": "⚡",
  "title": {"en": "Shipping and running it for real",
            "he": "לשחרר ולהריץ באמת"},
  "blurb": {"en": "Running it for real: auth, security, deploys, scale and the habits of a team.",
            "he": "להריץ את זה באמת: הרשאות, אבטחה, פריסות, סקייל והרגלים של צוות."},
  "mods": ["async", "auth", "security", "net", "cloud", "devops", "observe", "scale",
           "team", "ai"]},
]

UI_WIDE = {
 "paths":       {"en": "Courses",                "he": "קורסים"},
 "pathsSub":    {"en": "Two levels. Start at basic; move up when it clicks.",
                 "he": "שתי רמות. להתחיל בבסיסי, לעלות כשזה מתחבר."},
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
