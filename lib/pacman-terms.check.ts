/** Run: npx esbuild lib/pacman-terms.check.ts --bundle --platform=node --outfile=check.mjs --format=esm && node check.mjs */
import assert from "node:assert/strict";
import { pacmanTerms } from "./pacman-terms";

const en = pacmanTerms("en");
const he = pacmanTerms("he");
assert.ok(en.length >= 12, `expected ≥12 EN pellets, got ${en.length}`);
assert.equal(en.length, he.length);
assert.ok(en.every((t) => t.length > 0));
assert.ok(en.includes("OAuth") || en.includes("CI/CD") || en.includes("Deploy"));
console.log(`pacman-terms.check: ${en.length} pellets ok`);
