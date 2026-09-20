import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { PromptBox } from "@/components/PromptBox";
import { CHECKLIST, PROJECT, findTerm } from "@/lib/course";
import { serverLang } from "@/lib/lang-server";

export default async function ProjectPage() {
  const lang = await serverLang();
  const P = PROJECT;

  return (
    <AppShell>
      <Link className="crumb" href="/">← All lessons</Link>
      <section className="mod">
        <div className="mhead">
          <div className="ic">{P.icon}</div>
          <div><h2>{P.title[lang]}</h2></div>
          <div className="n">{P.steps.length} steps</div>
        </div>
        <p className="mblurb">{P.blurb[lang]}</p>
      </section>
      <div className="note">⚠ {P.warn[lang]}</div>
      {P.steps.map((s) => (
        <div key={s.n} className="step">
          <div className="top"><div className="no">{s.n}</div><h3>{s.title[lang]}</h3></div>
          <p className="goal"><b>Goal:</b> {s.goal[lang]}</p>
          <p className="whyp">{s.why[lang]}</p>
          <div className="tags">
            {s.uses.map((u) => {
              const loc = findTerm(u);
              return loc ? (
                <Link key={u} href={`/lesson/${loc.m.id}/${loc.i}`}>{loc.tm.t[lang]}</Link>
              ) : null;
            })}
          </div>
          <PromptBox id={s.n} text={s.prompt} label="Prompt to paste" />
        </div>
      ))}
      <div className="pager">
        <Link className="nx" href="/checklist"><b>Next</b><span>{CHECKLIST.title[lang]}</span></Link>
      </div>
    </AppShell>
  );
}
