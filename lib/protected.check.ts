/** Run: npx esbuild lib/protected.check.ts --bundle --platform=node --outfile=check.mjs --format=esm && node check.mjs */
import assert from "node:assert";
import { PATHS } from "./course";
import { PREVIEW, isPreviewPath, isProtectedPath } from "./protected";

// the preview list is hardcoded for the edge bundle — Basic's is its first lesson, Advanced's one Basic lacks
const mods = (id: string) => PATHS.find((p) => p.id === id)!.mods;
assert.equal(PREVIEW.basic, mods("basic")[0]);
assert.ok(mods("advanced").includes(PREVIEW.advanced));
assert.ok(!mods("basic").includes(PREVIEW.advanced));
assert.ok(isPreviewPath(`/lesson/${PREVIEW.advanced}/build`));

assert.ok(isPreviewPath("/lesson/ground"));
assert.ok(isPreviewPath("/lesson/ground/3"));
assert.ok(!isPreviewPath("/lesson/integrations/quiz"));
assert.ok(!isPreviewPath("/lesson/groundx/1")); // prefix must not leak
assert.ok(!isPreviewPath("/lesson/httpdata/3"));
assert.ok(!isPreviewPath("/lesson"));

assert.ok(!isProtectedPath("/lesson/ground/3"));
assert.ok(isProtectedPath("/lesson/httpdata/3"));
assert.ok(isProtectedPath("/lesson/groundx/1"));
assert.ok(isProtectedPath("/lesson"));
assert.ok(isProtectedPath("/glossary"));
assert.ok(!isProtectedPath("/courses"));

console.log("protected ok");
