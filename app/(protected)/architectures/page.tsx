import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { ARCHITECTURES } from "@/lib/course";
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
      <div className="cards">
        {A.items.map((a, i) => (
          <Link key={a.id} className="mcard" href={`/architectures/${a.id}`}>
            <div className="row">
              <div className="ic">{i + 1}</div>
              <div>
                <div className="num">{a.tag[lang]}</div>
                <h3>{a.title[lang]}</h3>
              </div>
            </div>
            <pre className="code mini-dia">{a.diagram}</pre>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
