# -*- coding: utf-8 -*-
"""Hebrew copy pass over data/course.json.

  extract <dir> [--max-chars N]   every Hebrew string, with its English source, split into batch files
  apply   <dir>                   write <dir>/out/*.json ({id: new_he}) back into course.json
  lint    [--all]                 count machine-translation tells in the current Hebrew

Batch item: {"id": "DETAIL/Terminal / CLI/he", "en": ..., "he": ...}. The id is the JSON path.
"""
from __future__ import annotations

import io
import json
import re
import sys
from collections import Counter
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")
ROOT = Path(__file__).resolve().parents[1]
COURSE = ROOT / "data" / "course.json"
HEB = re.compile("[֐-׿]")
SEP = " :: "  # path separator; keys contain "/" and spaces, never "::"

# ponytail: regex tells, not a grammar model. Good enough to rank and to prove the pass did something.
TELLS = {
    "em-dash": re.compile("—"),
    "singular-you": re.compile(r"(^|[\s,.:;(\"'])(אתה|אתך|שלך|לך|אותך|תקרא|תלמד|תריץ|תבקש|תשאל|תראה|תוסיף|תבדוק|תכתוב|תפתח|תשמור|תמצא|תסמוך|תיתן|תעשה|תוודא|תגיד)(?=[\s,.:;)\"'?!]|$)"),
    "zehu": re.compile(r"(^|\s)זהו(\s|$|[,.:])"),
    "formal-connectors": re.compile(r"(יש לציין|חשוב לציין|כמו כן|בנוסף לכך|על מנת|באמצעות|לפיכך|כאמור|ראוי לציין|במילים אחרות)"),
    "nitan": re.compile(r"(^|\s)ניתן\s"),
    "curly-quotes": re.compile("[״“”]"),
    "kone-buys": re.compile(r"\bקונ(ה|ים|ות|א)\s"),
}


def load():
    return json.loads(COURSE.read_text(encoding="utf-8"))


def save(d):
    COURSE.write_text(json.dumps(d, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")


def walk(o, path=()):
    if isinstance(o, dict):
        for k, v in o.items():
            yield from walk(v, path + (k,))
    elif isinstance(o, list):
        for i, v in enumerate(o):
            yield from walk(v, path + (i,))
    elif isinstance(o, str) and HEB.search(o):
        yield path, o


def get(d, path):
    for p in path:
        d = d[p]
    return d


def set_(d, path, v):
    for p in path[:-1]:
        d = d[p]
    d[path[-1]] = v


def en_of(d, path):
    """The English sibling of a Hebrew leaf, if the structure has one."""
    try:
        if path[-1] == "he":
            return get(d, path[:-1] + ("en",))
        if path[-2] == "he":  # TLDR: {en: [...], he: [...]}
            return get(d, path[:-2] + ("en", path[-1]))
    except (KeyError, IndexError, TypeError):
        pass
    return ""


def pid(path):
    return SEP.join(str(p) for p in path)


def parse_id(s):
    return tuple(int(p) if p.isdigit() else p for p in s.split(SEP))


def extract(out: Path, max_chars: int):
    d = load()
    out.mkdir(parents=True, exist_ok=True)
    items = [{"id": pid(p), "en": en_of(d, p), "he": s} for p, s in walk(d)]
    # group by top-level section so a batch shares one register
    items.sort(key=lambda x: x["id"].split(SEP)[0])
    batch, size, n = [], 0, 0
    for it in items:
        c = len(it["he"]) + len(it["en"])
        if batch and size + c > max_chars:
            (out / f"b{n:03d}.json").write_text(json.dumps(batch, ensure_ascii=False, indent=1), encoding="utf-8")
            n += 1
            batch, size = [], 0
        batch.append(it)
        size += c
    if batch:
        (out / f"b{n:03d}.json").write_text(json.dumps(batch, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"{len(items)} strings -> {n + 1} batches in {out}")


def apply(src: Path):
    d = load()
    done, skipped = 0, []
    for f in sorted((src / "out").glob("*.json")):
        for k, v in json.loads(f.read_text(encoding="utf-8")).items():
            path = parse_id(k)
            try:
                old = get(d, path)
            except (KeyError, IndexError):
                skipped.append((f.name, k, "no such path"))
                continue
            if not isinstance(v, str) or not v.strip() or not HEB.search(v):
                skipped.append((f.name, k, "empty or not Hebrew"))
                continue
            if old.count("\n\n") != v.count("\n\n"):
                skipped.append((f.name, k, "paragraph count changed"))
                continue
            if old != v:
                set_(d, path, v)
                done += 1
    save(d)
    print(f"applied {done}, skipped {len(skipped)}")
    for s in skipped:
        print("  skip", *s)


def lint(show_all: bool):
    d = load()
    counts, hits = Counter(), []
    for p, s in walk(d):
        for name, rx in TELLS.items():
            for m in rx.finditer(s):
                counts[name] += 1
                hits.append((name, pid(p).replace(SEP, "/"), s[max(0, m.start() - 30): m.end() + 30].replace("\n", " ")))
    for k, v in counts.most_common():
        print(f"{v:5d} {k}")
    if show_all:
        for h in hits:
            print(*h, sep=" | ")


if __name__ == "__main__":
    a = sys.argv[1:]
    if a and a[0] == "extract":
        mc = int(a[a.index("--max-chars") + 1]) if "--max-chars" in a else 14000
        extract(Path(a[1]), mc)
    elif a and a[0] == "apply":
        apply(Path(a[1]))
    elif a and a[0] == "lint":
        lint("--all" in a)
    else:
        print(__doc__)
