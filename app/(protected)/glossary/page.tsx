import Link from "@/components/Link";
import { AppShell } from "@/components/AppShell";
import { GlossaryList } from "@/components/GlossaryList";
import { MODULES, PATHS, UI } from "@/lib/course";
import { ownedCourses, type Course } from "@/lib/entitlement";
import { serverLang } from "@/lib/lang-server";

export default async function GlossaryPage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string }>;
}) {
  const { course } = await searchParams;
  const lang = await serverLang();
  // filtered here, not in GlossaryList — a locked term's definition must not reach the browser
  const mine = await ownedCourses();
  const asked = PATHS.find((p) => p.id === course);
  const paths = asked && mine.has(asked.id as Course) ? [asked] : PATHS.filter((p) => mine.has(p.id as Course));
  const open = new Set(paths.flatMap((p) => p.mods));
  const all = MODULES.filter((m) => open.has(m.id)).flatMap((m) =>
    m.terms.map((tm, i) => ({ m, i, tm })),
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
