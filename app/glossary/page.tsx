import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { GlossaryList } from "@/components/GlossaryList";
import { MODULES } from "@/lib/course";
import { serverLang } from "@/lib/lang-server";

export default async function GlossaryPage() {
  const lang = await serverLang();
  const all = MODULES.flatMap((m) => m.terms.map((tm, i) => ({ m, i, tm })));
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
        <p className="mblurb">Every term in the course, A to Z.</p>
      </section>
      <GlossaryList items={all} />
    </AppShell>
  );
}
