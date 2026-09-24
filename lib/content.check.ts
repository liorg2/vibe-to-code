/** Run: npx esbuild lib/content.check.ts --bundle --platform=node --outfile=check.mjs --format=esm && node check.mjs */
import assert from "node:assert/strict";
import { BUILDS } from "./builds";
import { BUILD_DONE_N } from "./builds/counts";
import { tipsFor } from "./builds/tips";
import { DETAIL, EXAMPLES, MODULES, PATHS, SIMPLE } from "./course";
import { SCENES } from "./scenes";

const slugs = new Set(MODULES.flatMap((m) => m.terms.map((t) => t.k)));
const words = (s: string) => s.trim().split(/\s+/).length;
const both = (x: { en: string; he: string }, where: string) =>
  assert.ok(x.en.trim() && x.he.trim(), `${where}: missing en or he`);

// Curriculum integrity: navigation, glossary order and keyed content must describe the same course.
const advanced = PATHS.find((p) => p.id === "advanced")!;
const basic = PATHS.find((p) => p.id === "basic")!;
const titles = new Set(MODULES.flatMap((m) => m.terms.map((t) => t.t.en)));
assert.deepEqual(MODULES.map((m) => m.id), advanced.mods, "MODULES and Advanced path order drifted");
assert.deepEqual(basic.mods, advanced.mods.slice(0, basic.mods.length), "Basic must remain an Advanced prefix");
assert.equal(slugs.size, [...titles].length, "topic slugs or English titles are not unique");
// levels: A/B/E only; every lesson keeps a core the TL;DR can show (expert topics are left out of it)
for (const m of MODULES) {
  m.terms.forEach((t) => assert.ok(["A", "B", "E"].includes(t.lvl), `${m.id}:${t.k}: bad level ${t.lvl}`));
  assert.ok(m.terms.filter((t) => t.lvl !== "E").length >= 3, `${m.id}: fewer than 3 non-expert topics`);
}
for (const title of titles) {
  assert.ok(SIMPLE[title], `${title}: missing simple explanation`);
  assert.ok(DETAIL[title], `${title}: missing detail`);
  if (title !== "App lifecycle") assert.ok(EXAMPLES[title], `${title}: missing example`);
}
for (const [name, keyed] of [["SIMPLE", SIMPLE], ["DETAIL", DETAIL], ["EXAMPLES", EXAMPLES]] as const) {
  for (const title of Object.keys(keyed)) assert.ok(titles.has(title), `${name}: orphan content for ${title}`);
}

const before = (moduleId: string, first: string, second: string) => {
  const keys = MODULES.find((m) => m.id === moduleId)!.terms.map((t) => t.k);
  assert.ok(keys.indexOf(first) < keys.indexOf(second), `${moduleId}: ${first} must precede ${second}`);
};
before("vcs", "commit-branch-merge", "clone-push-pull");
before("sides", "api", "full-stack");
before("langs", "semantic-versioning", "framework-vs-library");
before("http", "endpoint", "get");
before("http", "status-codes", "headers");
before("memory", "data-structures", "big-o");
before("testing", "test-first-tdd", "unit-integration-e2e");
before("ai", "agents-md", "specificity-beats-politeness");

// the build track: one step for every lesson, each one a build prompt and a check prompt that runs the suite
for (const id of advanced.mods) {
  const b = BUILDS[id];
  assert.ok(b, `no build step for lesson ${id}`);
  [b.title, b.goal, b.why, ...b.done].forEach((x) => both(x, `build ${id}`));
  assert.ok(b.done.length >= 2 && b.done.length <= 4, `build ${id}: 2-4 done items`);
  assert.ok(b.uses.length >= 2, `build ${id}: uses too few topics`);
  b.uses.forEach((k) => assert.ok(slugs.has(k), `build ${id}: unknown topic ${k}`));
  for (const [name, p] of [["build", b.build], ["check", b.check]] as const) {
    const n = words(p);
    assert.ok(n >= 40 && n <= 200, `build ${id}.${name}: ${n} words`);
    assert.ok(p.includes("STEPS.md"), `build ${id}.${name}: never mentions STEPS.md`);
  }
  assert.match(b.check, /npm run (check|test:all)/, `build ${id}.check: does not run the suite`);
  assert.ok(tipsFor(id).length, `build ${id}: no tips`);
  tipsFor(id).forEach((x) => both(x, `build ${id} tip`));
  assert.equal(BUILD_DONE_N[id], b.done.length, `lib/builds/counts.ts: ${id} should be ${b.done.length}`);
}

// scenes: every key is a real topic, every beat moves between actors that exist, packets stay readable
for (const [k, s] of Object.entries(SCENES)) {
  assert.ok(slugs.has(k), `scene for unknown topic ${k}`);
  both(s.cap, `scene ${k} cap`);
  assert.ok(s.actors.length >= 2 && s.actors.length <= 4, `scene ${k}: 2-4 actors`);
  assert.ok(s.beats.length >= 3 && s.beats.length <= 10, `scene ${k}: ${s.beats.length} beats`);
  const ids = new Set(s.actors.map((a) => a.id));
  s.actors.forEach((a) => both(a.label, `scene ${k} actor ${a.id}`));
  s.beats.forEach((b, i) => {
    assert.ok(ids.has(b.from) && ids.has(b.to), `scene ${k} beat ${i + 1}: unknown actor`);
    both(b.say, `scene ${k} beat ${i + 1}`);
    assert.ok((b.body?.length ?? 0) <= 4, `scene ${k} beat ${i + 1}: body over 4 lines`);
    b.body?.forEach((l) => assert.ok(l.length <= 48, `scene ${k} beat ${i + 1}: body line over 48 chars`));
  });
}

console.log("content ok:", Object.keys(BUILDS).length, "build steps,", Object.keys(SCENES).length, "scenes");
