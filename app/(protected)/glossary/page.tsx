import Link from "@/components/Link";
import { AppShell } from "@/components/AppShell";
import { GlossaryList } from "@/components/GlossaryList";
import { MODULES, UI } from "@/lib/course";
import { allowedLevels } from "@/lib/entitlement";
import { serverLang } from "@/lib/lang-server";

export default async function GlossaryPage() {
  const lang = await serverLang();
  // filtered here, not in GlossaryList — a locked term's definition must not reach the browser
  const allowed = await allowedLevels();
  const all = MODULES.flatMap((m) =>
    m.terms.map((tm, i) => ({ m, i, tm })).filter(({ tm }) => allowed.has(tm.lvl)),
  );
  all.sort((a, b) => a.tm.t[lang].localeCompare(b.tm.t[lang], lang === "he" ? "he" : "en"));

  return (
    <AppShell>
      <Link className="crumb" href="/">← All lessons</Link>
      <section className="mod">
        <div className="mhead">
          <div className="ic">☰</div>
          <div><h2>Glossary</h2></div>
          <div className="n">{all.length}</div>
        </div>
        <p className="mblurb">{UI.glossaryAll?.[lang] ?? "Every topic in the course, A to Z."}</p>
      </section>
      <GlossaryList items={all} />
    </AppShell>
  );
}
