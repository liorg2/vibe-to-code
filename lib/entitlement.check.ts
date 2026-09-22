/** Run: npx esbuild lib/entitlement.check.ts --bundle --platform=node --outfile=check.mjs --format=esm && node check.mjs */
import assert from "node:assert";
import { createHmac } from "node:crypto";
import { PATHS } from "./course";
import { courseOfModule, coursesOfModule } from "./entitlement";
import { verifySignature } from "./paddle";

// shared lessons are listed in both; the home course is the earlier one
assert.strictEqual(courseOfModule("http"), "basic");
assert.deepStrictEqual(coursesOfModule("http"), ["basic", "advanced"]);
assert.strictEqual(courseOfModule("security"), "advanced");
assert.deepStrictEqual(coursesOfModule("security"), ["advanced"]);
assert.strictEqual(courseOfModule("nope"), undefined);
assert.strictEqual(courseOfModule(""), undefined);
assert.ok(!PATHS.find((p) => p.id === "basic")!.mods.includes("security"));

// the webhook signature: right secret in, wrong secret / tampered body out
const secret = "whsec_test_not_a_real_secret";
const raw = '{"event_type":"transaction.completed"}';
const sign = (ts: string, body: string, key: string) =>
  `ts=${ts};h1=${createHmac("sha256", key).update(`${ts}:${body}`).digest("hex")}`;

assert.ok(verifySignature(sign("1700000000", raw, secret), raw, secret));
assert.ok(!verifySignature(sign("1700000000", raw, "other"), raw, secret));
assert.ok(!verifySignature(sign("1700000000", raw, secret), raw + " ", secret));
assert.ok(!verifySignature(sign("1700000000", raw, secret).replace("1700000000", "1700000001"), raw, secret)); // ts is signed too
assert.ok(!verifySignature("h1=deadbeef", raw, secret));
assert.ok(!verifySignature("", raw, secret));

console.log("entitlement + webhook signature ok");
