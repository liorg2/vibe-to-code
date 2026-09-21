/** Run: npx esbuild lib/progress.check.ts --bundle --platform=node --outfile=check.mjs --format=esm && node check.mjs */
import assert from "node:assert";
import { MODULES, CHECKLIST } from "./course";
import { fromRows, toRows } from "./progress";

const m = MODULES[0];
const done = [`${m.id}:${m.terms[0].k}`, `${m.id}:${m.terms[1].k}`, "ground:nope", "junk"];
const ticked = [`do:${CHECKLIST.do[0].k}`, "do:nope"];

const rows = toRows(done, ticked);
// unknown keys never reach the table
assert.deepStrictEqual(fromRows(rows).done.sort(), done.slice(0, 2).sort());
assert.deepStrictEqual(fromRows(rows).ticked, [`do:${CHECKLIST.do[0].k}`]);
// one roll-up row per lesson, carrying the percentage
const roll = rows.find((r) => r.lesson === m.id && r.topic === "")!;
assert.strictEqual(roll.pct, Math.round((2 / m.terms.length) * 100));
assert.strictEqual(rows.filter((r) => !r.topic).length, 2); // lesson + checklist
console.log("progress keys ok:", rows.length, "rows");
