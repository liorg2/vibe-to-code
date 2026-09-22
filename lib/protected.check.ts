/** Run: npx esbuild lib/protected.check.ts --bundle --platform=node --outfile=check.mjs --format=esm && node check.mjs */
import assert from "node:assert";
import { PATHS } from "./course";
import { PREVIEW_MODULES, isPreviewPath, isProtectedPath } from "./protected";

// the preview list is hardcoded for the edge bundle — it must track the first module of each course
assert.deepStrictEqual([...PREVIEW_MODULES], PATHS.map((p) => p.mods[0]));

assert.ok(isPreviewPath("/lesson/ground"));
assert.ok(isPreviewPath("/lesson/ground/3"));
assert.ok(isPreviewPath("/lesson/async/quiz"));
assert.ok(!isPreviewPath("/lesson/groundx/1")); // prefix must not leak
assert.ok(!isPreviewPath("/lesson/http/3"));
assert.ok(!isPreviewPath("/lesson"));

assert.ok(!isProtectedPath("/lesson/ground/3"));
assert.ok(isProtectedPath("/lesson/http/3"));
assert.ok(isProtectedPath("/lesson/groundx/1"));
assert.ok(isProtectedPath("/lesson"));
assert.ok(isProtectedPath("/glossary"));
assert.ok(!isProtectedPath("/courses"));

console.log("protected ok");
