import Link from "@/components/Link";
import { AppShell } from "@/components/AppShell";
import { ArchSubNav } from "@/components/ArchSubNav";
import { Chart } from "@/components/Chart";
import { ARCHITECTURES, archesFor } from "@/lib/course";
import { ARCH_MINI } from "@/lib/diagrams";
import { serverLang } from "@/lib/lang-server";

export default async function ArchitecturesPage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string }>;
}) {
  const { course } = await searchParams;
  const which = course === "basic" ? "basic" : "advanced";
  const lang = await serverLang();
  const A = ARCHITECTURES;
  const items = archesFor(which);

  return (
    <AppShell>
      <Link className="crumb" href="/">← All lessons</Link>
      <section className="mod">
        <div className="mhead">
          <div className="ic">{A.icon}</div>
          <div><h2>{A.title[lang]}</h2></div>
          <div className="n">{items.length}</div>
        </div>
        <p className="mblurb">{A.blurb[lang]}</p>
      </section>
      <ArchSubNav active="" items={items} course={which} />
      <div className="cards arch-cards">
        {items.map((a, i) => (
          <Link key={a.id} className="mcard arch-card" href={`/architectures/${a.id}?course=${which}`}>
            <div className="row">
              <div className="ic">{i + 1}</div>
              <div>
                <div className="num">{a.tag[lang]}</div>
                <h3>{a.title[lang]}</h3>
              </div>
            </div>
            {ARCH_MINI[a.id] ? <Chart def={ARCH_MINI[a.id]} /> : null}
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
