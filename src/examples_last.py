# -*- coding: utf-8 -*-
"""The last eleven slide examples: Testing module + AI module terms."""

EXAMPLES_LAST = {

"Pull request & code review": {
 "cap": {"en": "The description, the commands, the three questions", "he": "התיאור, הפקודות, ושלוש השאלות"},
 "code": "## What changed\nCheckout returned 500 on an empty cart. Now 400 {error:'cart_empty'}.\n\n## How to verify\nnpm test -- checkout      # new test fails on main, passes here\n\n## Risk / rollback\nOne route file. Revert the commit, nothing to migrate.\n\n$ gh pr create --fill --base main\n$ gh pr diff 214          # read this, not the summary\n\n# the reviewer asks exactly three things:\n#  1. does the diff do what the description says - and nothing else?\n#  2. what was DELETED or defaulted differently?\n#  3. if this is wrong in production, how do we find out and undo it?"},

"Assertion": {
 "cap": {"en": "The same test, weak assertion then strong", "he": "אותה בדיקה, טענה חלשה מול חזקה"},
 "code": "const res = await api.post('/orders', { sku: 'ABC-1', qty: 2 }).as(user)\n\n// WEAK - passes on almost anything\nexpect(res).toBeTruthy()\n// a 500 body passes. an empty {} passes. someone else's order passes.\n// even a typo'd route that returns the 404 page passes.\n\n// STRONG - states what you would actually be upset about\nexpect(res.status).toBe(201)\nexpect(res.body).toMatchObject({ sku: 'ABC-1', qty: 2, status: 'pending' })\nexpect(res.body.userId).toBe(user.id)      // the ownership rule\nexpect(res.body.amount_cents).toBe(4998)   // 2 x 24.99, as an integer\n\n// rule of thumb: if you cannot name the bug it would catch, it is weak."},

"Unit / Integration / E2E": {
 "cap": {"en": "One order, three levels, three runtimes", "he": "אותה הזמנה, שלוש רמות, שלושה זמני ריצה"},
 "code": "// UNIT - one function, no database, no network           ~2ms\nexpect(orderTotal([{ price: 2499, qty: 2 }])).toBe(4998)\n\n// INTEGRATION - real Postgres, real service layer          ~180ms\nconst order = await orders.place(user.id, [{ sku: 'ABC-1', qty: 2 }])\nexpect(await db.stock.get('ABC-1')).toBe(8)   // stock really moved\n\n// E2E - a real browser, the whole app, like a user            ~6s\nawait page.click('#add-to-cart')\nawait page.click('#checkout')\nawait expect(page.locator('.confirmation')).toContainText('Order placed')\n\n// 3000 of the first, 200 of the second, 12 of the third.\n// invert that ratio and CI takes 40 minutes to tell you nothing precise."},

"Regression": {
 "cap": {"en": "Report, failing test, fix — one commit", "he": "דיווח, בדיקה שנכשלת, תיקון — קומיט אחד"},
 "code": "# 1. THE REPORT\n#    \"Coupon SAVE10 made my total negative. Order 7c3f: -180 agorot.\"\n\n# 2. THE FAILING TEST - written first, and it must fail for the right reason\ntest('a coupon never takes the total below zero', () => {\n  expect(applyCoupon(500, { percent: 110 })).toBe(0)\n})\n#    FAIL  expected 0, received -50      <- the bug, now reproducible forever\n\n# 3. THE FIX - one line\n- return total - discount\n+ return Math.max(0, total - discount)\n#    PASS\n\n$ git commit -m \"fix(coupons): clamp discounted total at zero (#412)\"\n# the test is the permanent part. the bug can never come back silently."},

"Coverage": {
 "cap": {"en": "A hundred percent that proves nothing", "he": "מאה אחוז שלא מוכיחים כלום"},
 "code": "$ npx vitest run --coverage\n\nFile              | % Stmts | % Branch | Uncovered lines\n------------------|---------|----------|-----------------\nsrc/orders.ts     |   94.1  |   88.0   | 142-147\nsrc/coupons.ts    |  100.0  |  100.0   |                  <- see below\nsrc/auth/owner.ts |    0.0  |    0.0   | 1-38             <- the real finding\n\n// coupons.ts is 100% because of this test:\ntest('applyCoupon runs', () => { applyCoupon(500, { percent: 10 }) })\n// every line executed. nothing asserted. it would pass if the\n// function returned -50, null, or your home address.\n\n// read coverage as a map of what was NEVER visited (owner.ts: 0%),\n// never as a score to raise."},

"Test-first (TDD)": {
 "cap": {"en": "Red, green, refactor, in the terminal", "he": "אדום, ירוק, ריפקטור — בטרמינל"},
 "code": "$ npx vitest run shipping\n FAIL  free shipping over 200 ILS\n   ReferenceError: shippingCost is not defined\n Tests  1 failed          # RED - it must fail first, or it proves nothing\n\n# now, and only now, ask for the implementation\n$ npx vitest run shipping\n PASS  free shipping over 200 ILS\n Tests  1 passed                                    # GREEN - simplest thing that works\n\n# tidy the code with the test as a net. behaviour must not change.\n$ npx vitest run shipping\n PASS  free shipping over 200 ILS\n Tests  1 passed                                    # REFACTOR - still green\n\n# the failing test is the spec you hand the model. green is not an opinion."},

"State the shape of the answer": {
 "cap": {"en": "Same task, vague prompt versus shaped one", "he": "אותה משימה, פרומפט מעורפל מול מוגדר"},
 "code": "// VAGUE\n\"how should I store user preferences?\"\n-> 900 words: an intro, four paragraphs on databases, a code sample in\n   a stack you do not use, and a closing 'it depends on your needs'.\n\n// SHAPED\n\"Give me a markdown table, exactly 3 rows, no prose before or after.\n Columns: option | where it lives | what breaks at 2 instances | when to pick it.\n Options must be: cookie, our Postgres, Redis. One line per cell.\"\n\n-> | option   | where        | breaks at 2 instances | pick when        |\n   | cookie   | the browser  | never (per-device)    | UI only, tiny    |\n   | Postgres | our DB       | never                 | the default      |\n   | Redis    | memory, TTL  | no, but can vanish    | cache, not truth |\n\n// the shape is the control: three options, comparable, in one screen."},

"Ask for the trade-off first": {
 "cap": {"en": "Three options with costs, before any code", "he": "שלוש אפשרויות עם מחיר, לפני שורת קוד"},
 "code": "\"Our order list page takes 4s at 50k orders. Do NOT write code yet.\n Give me 3 approaches. For each: the change, the effort in hours,\n what it costs us later, and how it fails. Then recommend one and\n say what would make you change your mind. Max 150 words.\"\n\n-> 1. Add index on (user_id, created_at)   ~1h   cost: none real\n      fails: does nothing if the slow part is the N+1, measure first\n   2. Paginate with a cursor              ~4h   cost: no jump-to-page\n      fails: needs a stable sort key, breaks deep-link bookmarks\n   3. Redis cache of page 1              ~6h   cost: staleness, an ops\n      dependency. fails: invalidation on every write. do this last.\n\n   Recommend 1, then measure. Change my mind: EXPLAIN shows an index scan.\n\n// you just avoided building #3 for a problem #1 solves in an hour."},

"Hallucination": {
 "cap": {"en": "A package that does not exist", "he": "חבילה שלא קיימת, ועשר שניות של אימות"},
 "code": "// the model wrote this, confidently, with usage examples:\nimport { formatILS } from 'intl-currency-utils'\n\n// ten seconds, two commands:\n$ npm view intl-currency-utils\nnpm ERR! 404 'intl-currency-utils' is not in the npm registry.\n\n$ npm view react-currency-formatter repository.url homepage\n# exists - but: last publish 2019, 3 weekly downloads, repo archived.\n# existing is not the same as safe.\n\n// why this matters more than a typo: attackers watch for the names\n// models invent and register them, with real install scripts inside.\n// a hallucinated import is a supply-chain attack waiting for you.\n\n// highest-risk answers: package names, versions, flags, config keys."},

"Small steps over one big ask": {
 "cap": {"en": "One huge ask versus five checkpoints", "he": "בקשה אחת ענקית מול חמש עם נקודות בדיקה"},
 "code": "// ONE ASK: \"add user accounts with login, roles and an admin page\"\n-> 412 lines across 14 files, including a migration, a new dependency\n   and a changed auth default. you will skim it. you will accept it.\n\n// FIVE ASKS, each ending somewhere you can verify or throw away:\ngit switch -c feat/accounts\n1. \"Migration + users table only. No routes.\"      -> npm run migrate   ✓\n2. \"POST /signup, argon2 hash. Test first.\"        -> npm test          ✓\n3. \"POST /login, session cookie, 4 flags. Test.\"   -> npm test          ✓\n4. \"Role column + one requireRole middleware.\"     -> npm test          ✓\n5. \"Admin page, using requireRole. No new deps.\"   -> npm run dev       ✓\n\n// each step: git diff, then commit. step 3 wrong?\n// git reset --hard HEAD~1 costs you twenty minutes, not two days."},

"Vibe coding vs vibe engineering": {
 "cap": {"en": "Same request, two ways, as checkboxes", "he": "אותה בקשה, שתי דרכים — מה נוסף"},
 "code": "REQUEST: \"let customers cancel an order within 30 minutes\"\n\n  vibe coding                      vibe engineering\n  -----------                      ----------------\n  [x] prompt the model             [x] prompt the model\n  [ ] ...                        + [x] git switch -c feat/cancel-window\n  [ ] ...                        + [x] a failing test: cancel at 31 min -> 409\n  [ ] ...                        + [x] git diff, read every line\n  [ ] ...                        + [x] a second pair of eyes on the PR\n  [x] accept                       [x] accept\n  [x] deploy                       [x] deploy behind a flag\n  [ ] ...                        + [x] rollback plan: flag off, 10 seconds\n\n// four extra checkboxes, about twenty minutes.\n// same model, same code. the difference is entirely in what you verified."},

}
