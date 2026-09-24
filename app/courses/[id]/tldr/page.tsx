import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CourseMode } from "@/components/CourseMode";
import Link from "@/components/Link";
import { MODULES, PATHS, UI, lessonNo } from "@/lib/course";
import { coursesOfModule, ownedCourses } from "@/lib/entitlement";
import { serverLang } from "@/lib/lang-server";
import { isPreviewModule } from "@/lib/protected";
import { para } from "@/lib/utils";
import { sessionClaims } from "@/lib/verify-session";

/**
 * The whole course on one page: each lesson's summary, then its core topics one line each.
 * Expert topics are left out. Summaries are public (like each lesson's own summary page);
 * the topic one-liners follow the same rule as the lesson overview — only for lessons you own.
 */
export default async function TldrPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = PATHS.find((x) => x.id === id);
  if (!p) notFound();
  const lang = await serverLang();
  const t = (k: string) => UI[k]?.[lang] ?? k;
  const signedIn = !!(await sessionClaims());
  const mine = await ownedCourses();
  const owns = (mid: string) =>
    isPreviewModule(mid) || (signedIn && coursesOfModule(mid).some((c) => mine.has(c)));
  const mods = p.mods.map((mid) => MODULES.find((m) => m.id === mid)!).filter(Boolean);
  const q = `?course=${p.id}`;
  // ponytail: reading time of the summaries only — the topic lists are folded away
  const readMins = Math.max(1, Math.round(mods.reduce((n, m) => n + m.summary[lang].split(/\s+/).length, 0) / 200));

  return (
    <AppShell showNav={signedIn}>
      <Breadcrumb
        items={[
          { label: t("paths"), href: "/courses" },
          { label: p.title[lang], href: `/courses/${p.id}` },
          { label: t("tldr") },
        ]}
      />
      <section className="mod intro tldr">
        <div className="mhead">
          <div className="ic">⚡</div>
          <div><h2>{t("tldr")} · {p.title[lang]}</h2></div>
          <div className="n">~{readMins} {t("min")}</div>
        </div>
        <p className="mblurb">{p.blurb[lang]}</p>
        <CourseMode id={p.id} active="tldr" lang={lang} />
        <ol className="tldr-list">
          {mods.map((m) => {
            const core = m.terms.map((tm, j) => ({ tm, j })).filter(({ tm }) => tm.lvl !== "E");
            const expert = m.terms.length - core.length;
            const open = owns(m.id);
            return (
              <li key={m.id} className="intro-card">
                <div className="num">{t("lesson")} {lessonNo(m.id)}</div>
                <h3>{m.title[lang]}</h3>
                {para(m.summary[lang]).map((x, i) => <p key={i}>{x}</p>)}
                {open ? (
                  <details>
                    <summary>{t("tldrTopics")} ({core.length})</summary>
                    <ul>
                      {core.map(({ tm, j }) => (
                        <li key={tm.k}>
                          <Link href={`/lesson/${m.id}/${j}${q}`}><b>{tm.t[lang]}</b></Link>: {tm.d[lang]}
                        </li>
                      ))}
                    </ul>
                    {expert ? <p className="more">+{expert} {t("tldrExpert")}</p> : null}
                  </details>
                ) : null}
                <Link className="go" href={`/lesson/${m.id}/overview${q}`}>{open ? t("tldrOpen") : `🔒 ${t("tldrOpen")}`} &rarr;</Link>
              </li>
            );
          })}
        </ol>
      </section>
    </AppShell>
  );
}
