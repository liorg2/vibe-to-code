import { neon } from "@neondatabase/serverless";

/** ponytail: lazy so `next build` can collect page data without DATABASE_URL set */
let client: ReturnType<typeof neon> | undefined;
function db() {
  return (client ??= neon(process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? ""));
}

/** ponytail: one CREATE IF NOT EXISTS per lambda instance beats a migration runner for two tables */
let ready: Promise<unknown> | undefined;
function ensure() {
  ready ??= Promise.all([
    db()`
    create table if not exists progress_topic (
      uid     text        not null,
      lesson  text        not null,
      topic   text        not null,
      pct     smallint    not null,
      updated timestamptz not null default now(),
      primary key (uid, lesson, topic)
    )`,
    db()`
    create table if not exists entitlement_course (
      uid     text        not null,
      course  text        not null,
      txn     text        not null,
      paid_at timestamptz not null default now(),
      updated timestamptz not null default now(),
      primary key (uid, course)
    )`,
  ]).then(
    // Backfill from the pre-split `entitlement` table (one tier per uid): each legacy tier grants
    // the course of the SAME name and nothing else — a legacy `advanced` row does not hand out basic.
    // ponytail: idempotent, so re-running it per cold start beats owning a migration runner; the
    // exception handler is what makes it a no-op once the old table is dropped.
    () => db()`
    do $$ begin
      insert into entitlement_course (uid, course, txn)
      select uid, tier, txn from entitlement
      on conflict do nothing;
    exception when undefined_table then end $$`,
  );
  return ready;
}

/**
 * One row per topic, plus one roll-up row per lesson (topic = '').
 * `lesson` and `topic` are the stable slugs from the course, never positions — a term can be
 * retitled or reordered and the row still points at it.
 */
export type Row = { lesson: string; topic: string; pct: number };

export async function getRows(uid: string): Promise<Row[]> {
  await ensure();
  return (await db()`
    select lesson, topic, pct from progress_topic where uid = ${uid}`) as Row[];
}

/** Replaces everything stored for this user: what is not in `rows` is no longer true. */
export async function saveRows(uid: string, rows: Row[]): Promise<void> {
  await ensure();
  const json = JSON.stringify(rows);
  const sql = db();
  await sql.transaction([
    sql`
      delete from progress_topic p
       where p.uid = ${uid}
         and not exists (
           select 1 from jsonb_array_elements(${json}::jsonb) r
            where r->>'lesson' = p.lesson and r->>'topic' = p.topic)`,
    sql`
      insert into progress_topic (uid, lesson, topic, pct, updated)
      select ${uid}, r->>'lesson', r->>'topic', (r->>'pct')::smallint, now()
        from jsonb_array_elements(${json}::jsonb) r
      on conflict (uid, lesson, topic)
        do update set pct = excluded.pct, updated = now()`,
  ]);
}

/** One row per course owned, forever — one-time purchases, so there is nothing to expire. */
export type Course = "basic" | "advanced";

export async function getCourses(uid: string): Promise<Course[]> {
  await ensure();
  const rows = (await db()`
    select course from entitlement_course where uid = ${uid}`) as { course: Course }[];
  return rows.map((r) => r.course);
}

/**
 * Idempotent: the webhook and the return-URL re-check can both land the same transaction.
 * ponytail: `do nothing` rather than `do update` — the first payment for a course is the one that
 * bought it, and a replayed event must not rewrite its txn.
 */
export async function grantCourse(uid: string, course: Course, txn: string): Promise<void> {
  await ensure();
  await db()`
    insert into entitlement_course (uid, course, txn, paid_at, updated)
    values (${uid}, ${course}, ${txn}, now(), now())
    on conflict (uid, course) do nothing`;
}
