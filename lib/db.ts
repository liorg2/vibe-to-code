import { neon } from "@neondatabase/serverless";

/** ponytail: lazy so `next build` can collect page data without DATABASE_URL set */
let client: ReturnType<typeof neon> | undefined;
function sql(...args: Parameters<ReturnType<typeof neon>>) {
  client ??= neon(process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? "");
  return client(...args);
}

/** ponytail: one CREATE IF NOT EXISTS per lambda instance beats a migration runner for one table */
let ready: Promise<unknown> | undefined;
function ensure() {
  ready ??= sql`
    create table if not exists progress (
      uid     text primary key,
      done    jsonb       not null default '[]'::jsonb,
      ticked  jsonb       not null default '[]'::jsonb,
      updated timestamptz not null default now()
    )`;
  return ready;
}

export type Progress = { done: string[]; ticked: string[] };

export async function getProgress(uid: string): Promise<Progress> {
  await ensure();
  const [row] = (await sql`select done, ticked from progress where uid = ${uid}`) as Progress[];
  return { done: row?.done ?? [], ticked: row?.ticked ?? [] };
}

export async function saveProgress(uid: string, p: Progress): Promise<void> {
  await ensure();
  await sql`
    insert into progress (uid, done, ticked, updated)
    values (${uid}, ${JSON.stringify(p.done)}::jsonb, ${JSON.stringify(p.ticked)}::jsonb, now())
    on conflict (uid) do update
      set done = excluded.done, ticked = excluded.ticked, updated = now()`;
}
