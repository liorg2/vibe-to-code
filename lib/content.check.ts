/** Run: npx esbuild lib/content.check.ts --bundle --platform=node --outfile=check.mjs --format=esm && node check.mjs */
import assert from "node:assert/strict";
import { BUILDS } from "./builds";
import { BUILD_DONE_N } from "./builds/counts";
import { tipsFor } from "./builds/tips";
import { MODULES, PATHS } from "./course";
import { SCENES } from "./scenes";

const slugs = new Set(MODULES.flatMap((m) => m.terms.map((t) => t.k)));
const words = (s: string) => s.trim().split(/\s+/).length;
const both = (x: { en: string; he: string }, where: string) =>
  assert.ok(x.en.trim() && x.he.trim(), `${where}: missing en or he`);

// the build track: one step for every lesson, each one a build prompt and a check prompt that runs the suite
for (const id of PATHS.find((p) => p.id === "advanced")!.mods) {
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
