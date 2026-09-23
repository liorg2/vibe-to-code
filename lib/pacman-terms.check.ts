/** Run: npx esbuild lib/pacman-terms.check.ts --bundle --platform=node --outfile=check.mjs --format=esm && node check.mjs */
import assert from "node:assert/strict";
import { pacmanWords } from "./pacman-terms";

const en = pacmanWords();
assert.ok(en.length >= 12, `expected ≥12 EN words, got ${en.length}`);
assert.ok(en.every((t) => t.length > 1 && t.length <= 16));
assert.ok(en.includes("OAuth") || en.includes("Deploy") || en.includes("CORS"));
console.log(`pacman-terms.check: ${en.length} words ok`);
