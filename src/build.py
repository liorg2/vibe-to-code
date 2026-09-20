# -*- coding: utf-8 -*-
"""Assemble index.html. All merging happens here so app.js only renders."""
import io, json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)
OUT = os.path.join(ROOT, "index.html")

from detail_data import DETAIL
from ai_project_data import AI_MODULE, AI_DETAIL, PROJECT
from quiz_data import QUIZ
from additions_data import TESTING_MODULE, TESTING_DETAIL, TESTING_QUIZ, EXTRA_TERMS
from example_checklist_data import EXAMPLES, CHECKLIST
from devtools_data import DEVTOOLS_TERMS
from wide_ui import ORDER, PATHS, UI_WIDE, ASK_PROMPT

def opt(mod, *names):
    """Import names from a module that may not exist yet (agents still writing)."""
    try:
        m = __import__(mod)
    except (ImportError, SyntaxError) as e:
        print("  .. skipping %s (%s)" % (mod, type(e).__name__))
        return [None] * len(names)
    return [getattr(m, n, None) for n in names]

# ---------- base course data ----------
base = json.load(io.open(os.path.join(HERE, "base_data.json"), encoding="utf-8"))
UI, MODULES = base["UI"], base["MODULES"]

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
UI.update(UI_ADD)
UI.update(UI_WIDE)

# cross-references were written as module numbers; names survive reordering
def denumber(s, he=False):
    if he:
        return s.replace("מודול 08", "מודול ההזדהות").replace("מודול 10", "מודול הסקייל")
    return s.replace("module 08", "the Auth module").replace("module 10", "the Scale module")

# ---------- assemble modules ----------
by_id = {m["id"]: m for m in MODULES}
for m in (TESTING_MODULE, AI_MODULE):
    by_id[m["id"]] = m

for mod_id, term, detail in EXTRA_TERMS:
    by_id[mod_id]["terms"].append(term)
    DETAIL[term["t"]["en"]] = detail
for term, detail, example in DEVTOOLS_TERMS:
    by_id["sides"]["terms"].append(term)
    DETAIL[term["t"]["en"]] = detail
    EXAMPLES[term["t"]["en"]] = example

DETAIL.update(TESTING_DETAIL)
DETAIL.update(AI_DETAIL)
QUIZ["testing"] = TESTING_QUIZ

# new modules + their content, written by the widening pass
WIDE = [
    ("wide_a", ("APIS_MODULE", "FRONTEND_MODULE"), "DETAIL_A", "EXAMPLES_A", "QUIZ_A"),
    ("wide_b", ("ASYNC_MODULE", "SECURITY_MODULE"), "DETAIL_B", "EXAMPLES_B", "QUIZ_B"),
    ("wide_c", ("NET_MODULE", "DEVOPS_MODULE"), "DETAIL_C", "EXAMPLES_C", "QUIZ_C"),
    ("wide_d", ("OBSERVE_MODULE", "TEAM_MODULE"), "DETAIL_D", "EXAMPLES_D", "QUIZ_D"),
]
for mod, mod_names, d, e, q in WIDE:
    vals = opt(mod, *(mod_names + (d, e, q)))
    for m in vals[:len(mod_names)]:
        if m:
            by_id[m["id"]] = m
    detail, example, quiz = vals[len(mod_names):]
    if detail: DETAIL.update(detail)
    if example: EXAMPLES.update(example)
    if quiz: QUIZ.update(quiz)

# deeper rewrites of the original 82 terms + Hebrew corrections
he_fixes = 0
for mod in ["deep_%d" % i for i in range(1, 11)]:
    detail, example, he = opt(mod, "DETAIL_FIX", "EXAMPLES_FIX", "HE_FIX")
    if detail: DETAIL.update(detail)
    if example: EXAMPLES.update(example)
    if he:
        for m in by_id.values():
            for term in m["terms"]:
                fix = he.get(term["t"]["en"])
                if not fix:
                    continue
                for field in ("t", "d", "w"):
                    if field in fix:
                        term[field]["he"] = fix[field]["he"]
                        he_fixes += 1

MODULES = [by_id[i] for i in ORDER if i in by_id]
missing = set(by_id) - set(ORDER)
assert not missing, "module not placed in ORDER: %s" % missing

for d in (DETAIL,):
    for v in d.values():
        v["en"] = denumber(v["en"])
        v["he"] = denumber(v["he"], he=True)

ARCHITECTURES, = opt("arch_data", "ARCHITECTURES")

EXAMPLES_LAST, = opt("examples_last", "EXAMPLES_LAST")
if EXAMPLES_LAST: EXAMPLES.update(EXAMPLES_LAST)

# ---------- Hebrew house style ----------
# several passes wrote these differently; one spelling each, everywhere
HE_STYLE = [
    ("בסיסי הנתונים", "מסדי הנתונים"), ("בסיסי נתונים", "מסדי נתונים"),
    ("בסיס הנתונים", "מסד הנתונים"), ("בסיס נתונים", "מסד נתונים"),
    # deploy: the noun is a loanword in speech; the verb stays Hebrew
    ("הפריסה", "הדיפלוי"), ("פריסה", "דיפלוי"), ("פריסות", "דיפלויים"),
]

def he_style(node):
    if isinstance(node, dict):
        for k, v in node.items():
            if k == "he" and isinstance(v, str):
                for a, b in HE_STYLE:
                    v = v.replace(a, b)
                node[k] = v
            else:
                he_style(v)
    elif isinstance(node, list):
        for v in node:
            he_style(v)


# ---------- emit ----------
def js(name, obj):
    # a literal </script> inside a string would close the block; <\/ is identical in JS
    body = json.dumps(obj, ensure_ascii=False, indent=1).replace("</", "<\\/")
    return "const %s = %s;\n" % (name, body)

for _n in (UI, MODULES, DETAIL, EXAMPLES, QUIZ, PROJECT, CHECKLIST, ARCHITECTURES, PATHS):
    he_style(_n)

data = "".join(js(n, v) for n, v in [
    ("UI", UI), ("MODULES", MODULES), ("DETAIL", DETAIL), ("EXAMPLES", EXAMPLES),
    ("QUIZ", QUIZ), ("PROJECT", PROJECT), ("CHECKLIST", CHECKLIST),
    ("ARCHITECTURES", ARCHITECTURES or {}), ("PATHS", PATHS), ("ASK_PROMPT", ASK_PROMPT),
])

css = io.open(os.path.join(HERE, "style.css"), encoding="utf-8").read()
app = io.open(os.path.join(HERE, "app.js"), encoding="utf-8").read()

html = u"""<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Vibe → Code</title>
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
    <a class="logo" href="#/"><span class="dot">◆</span><span id="brand">Vibe → Code</span></a>
    <div class="spacer"></div>
    <input id="search" placeholder="Search a term…" autocomplete="off">
    <div class="seg">
      <button data-lang="en" aria-pressed="true">EN</button>
      <button data-lang="he" aria-pressed="false">עב</button>
    </div>
    <span id="who"></span>
    <button class="btn" id="auth" hidden>Sign in</button>
    <button class="btn" id="theme" title="Theme">◐</button>
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

<footer>One static page. No tracking — progress lives in your browser, and in your account if you sign in.</footer>
</div>

<script>
%s
</script>
<script>
%s
</script>
<script type="module" src="auth.js"></script>
</body>
</html>
""" % (css, data, app)

io.open(OUT, "w", encoding="utf-8").write(html)

nterms = sum(len(m["terms"]) for m in MODULES)
print("wrote %d bytes | %d modules | %d terms | %d deep-dives | %d examples | %d quizzes | %d he-fixes | %d architectures"
      % (len(html), len(MODULES), nterms, len(DETAIL), len(EXAMPLES), len(QUIZ), he_fixes,
         len((ARCHITECTURES or {}).get("items", []))))
missing_detail = [t["t"]["en"] for m in MODULES for t in m["terms"] if t["t"]["en"] not in DETAIL]
missing_quiz = [m["id"] for m in MODULES if m["id"] not in QUIZ]
no_example = [t["t"]["en"] for m in MODULES for t in m["terms"] if t["t"]["en"] not in EXAMPLES]
if missing_detail: print("  !! no deep-dive:", missing_detail)
if missing_quiz:   print("  !! no quiz:", missing_quiz)
if no_example:     print("  .. no example (%d):" % len(no_example), ", ".join(no_example[:8]))
