# -*- coding: utf-8 -*-
"""Assemble index.html from the existing base data + the new content modules."""
import io, json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
OUT = r"C:\Users\LiorGoldemberg\OneDrive - Global-e\MyCode\vibe-to-code\index.html"

from detail_data import DETAIL
from ai_project_data import AI_MODULE, AI_DETAIL, PROJECT
from quiz_data import QUIZ
from additions_data import TESTING_MODULE, TESTING_DETAIL, TESTING_QUIZ, EXTRA_TERMS
from example_checklist_data import EXAMPLES, CHECKLIST
from devtools_data import DEVTOOLS_TERMS

# ---------- 1. keep the original UI + MODULES block verbatim ----------
src = io.open(OUT, encoding="utf-8").read()
m = re.search(r"<script>\s*(// Course content.*?)\s*</script>", src, re.S)
assert m, "could not find the base data script"
base = m.group(1)

# cross-references were written as module numbers; names survive reordering
base = base.replace("module 08", "the Auth module").replace("module 10", "the Scale module")
for d in (DETAIL, AI_DETAIL, TESTING_DETAIL):
    for v in d.values():
        v["en"] = v["en"].replace("module 08", "the Auth module").replace("module 10", "the Scale module")
        v["he"] = v["he"].replace("מודול 08", "מודול ההזדהות").replace("מודול 10", "מודול הסקייל")

# ---------- 2. extra UI strings ----------
UI_ADD = {
 "noCode":    {"en": "no code required",      "he": "בלי לכתוב קוד"},
 "min":       {"en": "min",                   "he": "דק׳"},
 "open":      {"en": "Open",                  "he": "פתח"},
 "gotYes":    {"en": "Learned",               "he": "נלמד"},
 "prevTerm":  {"en": "Previous",              "he": "הקודם"},
 "nextTerm":  {"en": "Next",                  "he": "הבא"},
 "toTest":    {"en": "Take the test",         "he": "למבחן"},
 "test":      {"en": "Test yourself",         "he": "מבחן עצמי"},
 "testSub":   {"en": "Three questions. You only get the explanation after you commit to an answer.",
               "he": "שלוש שאלות. ההסבר מגיע רק אחרי שאתה מתחייב לתשובה."},
 "perfect":   {"en": "clean sweep",           "he": "מושלם"},
 "lesson":    {"en": "Module",                "he": "מודול"},
 "allMods":   {"en": "All modules",           "he": "כל המודולים"},
 "backHome":  {"en": "← All modules",         "he": "כל המודולים →"},
 "capstone":  {"en": "Capstone",              "he": "פרויקט מסכם"},
 "beforeShip":{"en": "Before you ship",       "he": "לפני שמשחררים"},
 "steps":     {"en": "steps",                 "he": "שלבים"},
 "goal":      {"en": "Goal",                  "he": "מטרה"},
 "prompt":    {"en": "Prompt to paste",       "he": "פרומפט להדבקה"},
 "copy":      {"en": "Copy",                  "he": "העתק"},
 "copied":    {"en": "Copied",                "he": "הועתק"},
 "copyFail":  {"en": "Select manually",       "he": "בחר ידנית"},
 "doThis":    {"en": "Always",                "he": "תמיד"},
 "doSub":     {"en": "Tick these off before anything meets a real user.",
               "he": "לסמן את כל אלה לפני שמשהו פוגש משתמש אמיתי."},
 "neverThis": {"en": "Never",                 "he": "אף פעם לא"},
 "neverSub":  {"en": "Each of these has taken down a real product.",
               "he": "כל אחד מאלה הפיל מוצר אמיתי."},
}

def js(name, obj):
    # a literal </script> inside a string would close the block; <\/ is identical in JS
    body = json.dumps(obj, ensure_ascii=False, indent=1).replace("</", "<\\/")
    return "const %s = %s;\n" % (name, body)

data = (
    js("UI_ADD", UI_ADD)
  + js("DETAIL", DETAIL)
  + js("EXAMPLES", EXAMPLES)
  + js("QUIZ", QUIZ)
  + js("TESTING_MODULE", TESTING_MODULE)
  + js("TESTING_DETAIL", TESTING_DETAIL)
  + js("TESTING_QUIZ", TESTING_QUIZ)
  + js("AI_MODULE", AI_MODULE)
  + js("AI_DETAIL", AI_DETAIL)
  + js("EXTRA_TERMS", EXTRA_TERMS)
  + js("DEVTOOLS_TERMS", DEVTOOLS_TERMS)
  + js("PROJECT", PROJECT)
  + js("CHECKLIST", CHECKLIST)
  + "Object.assign(UI, UI_ADD);\n"
)

css = io.open(os.path.join(HERE, "style.css"), encoding="utf-8").read()
app = io.open(os.path.join(HERE, "app.js"), encoding="utf-8").read()

# ---------- 3. emit ----------
html = u"""<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Vibe \u2192 Code</title>
<meta name="description" content="The vocabulary and mental models of professional software development, for people who build with AI. English and Hebrew.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Heebo:wght@400;500;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
%s
</style>
</head>
<body dir="ltr">
<div class="wrap">

<header>
  <div class="bar">
    <a class="logo" href="#/"><span class="dot">\u25c6</span><span id="brand">Vibe \u2192 Code</span></a>
    <div class="spacer"></div>
    <input id="search" placeholder="Search a term\u2026" autocomplete="off">
    <div class="seg">
      <button data-lang="en" aria-pressed="true">EN</button>
      <button data-lang="he" aria-pressed="false">\u05e2\u05d1</button>
    </div>
    <span id="who"></span>
    <button class="btn" id="auth" hidden>Sign in</button>
    <button class="btn" id="theme" title="Theme">\u25d0</button>
  </div>
  <div class="progbar"><i id="pbar"></i></div>
</header>

<div class="hero">
  <div class="pill" id="intro"></div>
  <h1 id="h1"></h1>
  <p id="tagline"></p>
  <div class="cta">
    <button class="btn prim big" id="startBtn"></button>
    <button class="btn big" id="resetBtn"></button>
  </div>
  <p id="heroNote" style="font-size:15px;margin-top:26px"></p>
</div>

<main>
  <nav class="side"><h3 id="navTitle"></h3><div id="nav"></div></nav>
  <div id="content"></div>
</main>

<footer>One static page. No tracking, no backend \u2014 progress lives in your browser.</footer>
</div>

<script>
%s
</script>
<script>
%s
</script>
<script>
%s
</script>
<script type="module" src="auth.js"></script>
</body>
</html>
""" % (css, base, data, app)

io.open(OUT, "w", encoding="utf-8").write(html)

nmod = 10 + 1 + 1  # base + testing + ai
nterms = 82 + len(TESTING_MODULE["terms"]) + len(AI_MODULE["terms"]) + len(EXTRA_TERMS) + len(DEVTOOLS_TERMS)
print("wrote %d bytes | %d modules | ~%d terms | %d examples | %d quizzes | %d project steps"
      % (len(html), nmod, nterms, len(EXAMPLES) + len(DEVTOOLS_TERMS), len(QUIZ) + 1, len(PROJECT["steps"])))
