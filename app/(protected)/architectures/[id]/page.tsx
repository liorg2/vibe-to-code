import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { PromptBox } from "@/components/PromptBox";
import { ARCHITECTURES, findTerm } from "@/lib/course";
import { serverLang } from "@/lib/lang-server";

export default async function ArchitectureDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lang = await serverLang();
  const A = ARCHITECTURES;
  const i = A.items.findIndex((x) => x.id === id);
  if (i < 0) notFound();
  const a = A.items[i];
  const next = A.items[i + 1];

  const box = (title: string, text: string, cls = "") => (
    <div className={`abox ${cls}`}><b>{title}</b><p>{text}</p></div>
  );

  return (
    <AppShell>
      <Link className="crumb" href="/architectures">&larr; {A.title[lang]}</Link>
      <article className="slide arch">
        <div className="kicker">{String(i + 1).padStart(2, "0")} {A.title[lang]} · {a.tag[lang]}</div>
        <h2>{a.title[lang]}</h2>
        <pre className="code dia">{a.diagram}</pre>
        <h3>One request, start to finish</h3>
        <div className="body"><p>{a.flow[lang]}</p></div>
        <h3>The pieces</h3>
        <div className="parts">
          {a.parts.map((p, idx) => (
            <div key={idx} className="part"><b>{p.n[lang]}</b><p>{p.d[lang]}</p></div>
          ))}
        </div>
        <div className="aboxes">
          {box("Right when", a.good[lang], "ok")}
          {box("Breaks when", a.bad[lang], "no")}
          {box("What it costs", a.cost[lang])}
          {box("How far it goes", a.scale[lang])}
        </div>
        <div className="tags">
          {a.uses.map((u) => {
            const loc = findTerm(u);
            return loc ? <Link key={u} href={`/lesson/${loc.m.id}/${loc.i}`}>{loc.tm.t[lang]}</Link> : null;
          })}
        </div>
        <PromptBox id="arch" text={a.prompt} label="Prompt to scaffold it" />
        <div className="pager">
          {next ? (
            <Link className="nx" href={`/architectures/${next.id}`}>
              <b>Next</b><span>{next.title[lang]}</span>
            </Link>
          ) : null}
        </div>
      </article>
    </AppShell>
  );
}
