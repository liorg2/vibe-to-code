import assert from "node:assert/strict";
import { parseLangFromPath, stripLang, withLang } from "./lang.ts";

assert.equal(stripLang("/he/lesson/foo"), "/lesson/foo");
assert.equal(stripLang("/en"), "/");
assert.equal(stripLang("/glossary"), "/glossary");
assert.equal(parseLangFromPath("/he/lesson"), "he");
assert.equal(withLang("he", "/lesson/foo"), "/he/lesson/foo");
assert.equal(withLang("he", "/en/lesson/foo"), "/he/lesson/foo");
assert.equal(withLang("en", "/"), "/en");
assert.equal(withLang("he", "/lesson?q=x"), "/he/lesson?q=x");
assert.equal(withLang("he", "/api/progress"), "/api/progress");
console.log("lang ok");
