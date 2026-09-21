import Link from "@/components/Link";
import { AppShell } from "@/components/AppShell";
import { ModuleHead } from "@/components/ModuleHead";
import { TermCard } from "@/components/TermCard";
import { MODULES } from "@/lib/course";
import { allowedLevels } from "@/lib/entitlement";
import { serverLang } from "@/lib/lang-server";

export default async function LessonSearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const lang = await serverLang();
  const query = q.trim().toLowerCase();
  const hit = (tm: { t: { en: string; he: string }; d: Record<string, string>; w: Record<string, string> }) =>
    (tm.t.en + tm.t.he + tm.d[lang] + tm.w[lang]).toLowerCase().includes(query);

  // search reads d and w — without this a non-buyer could read a locked term straight out of ?q=
  const allowed = await allowedLevels();

  const secs = MODULES.map((m, i) => {
    const hits = m.terms
      .map((tm, j) => ({ tm, j }))
      .filter(({ tm }) => allowed.has(tm.lvl) && hit(tm));
    if (!hits.length) return null;
    const doneCount = 0;
    return (
      <section key={m.id} className="mod">
        <ModuleHead m={m} mi={i} lang={lang} doneCount={doneCount} />
        <div className="cardgrid">
          {hits.map(({ tm, j }) => <TermCard key={j} m={m} i={j} tm={tm} />)}
        </div>
      </section>
    );
  }).filter(Boolean);

  return (
    <AppShell>
      {query ? (
        secs.length ? secs : <div className="empty">Nothing matched.</div>
      ) : (
        <div className="empty">Type in the search box to find a topic.</div>
      )}
      <p><Link className="crumb" href="/">← All lessons</Link></p>
    </AppShell>
  );
}
