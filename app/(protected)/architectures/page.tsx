import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { ArchSubNav } from "@/components/ArchSubNav";
import { Chart } from "@/components/Chart";
import { ARCHITECTURES } from "@/lib/course";
import { ARCH_MINI } from "@/lib/diagrams";
import { serverLang } from "@/lib/lang-server";

export default async function ArchitecturesPage() {
  const lang = await serverLang();
  const A = ARCHITECTURES;

  return (
    <AppShell>
      <Link className="crumb" href="/">← All lessons</Link>
      <section className="mod">
        <div className="mhead">
          <div className="ic">{A.icon}</div>
          <div><h2>{A.title[lang]}</h2></div>
          <div className="n">{A.items.length}</div>
        </div>
        <p className="mblurb">{A.blurb[lang]}</p>
      </section>
      <ArchSubNav active="" />
      <div className="cards arch-cards">
        {A.items.map((a, i) => (
          <Link key={a.id} className="mcard arch-card" href={`/architectures/${a.id}`}>
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
