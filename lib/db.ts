import { neon } from "@neondatabase/serverless";

/** ponytail: lazy so `next build` can collect page data without DATABASE_URL set */
let client: ReturnType<typeof neon> | undefined;
function db() {
  return (client ??= neon(process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? ""));
}

/** ponytail: one CREATE IF NOT EXISTS per lambda instance beats a migration runner for two tables */
let ready: Promise<unknown> | undefined;
function ensure() {
  ready ??= db()`
    create table if not exists progress_topic (
      uid     text        not null,
      lesson  text        not null,
      topic   text        not null,
      pct     smallint    not null,
      updated timestamptz not null default now(),
      primary key (uid, lesson, topic)
    )`;
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
