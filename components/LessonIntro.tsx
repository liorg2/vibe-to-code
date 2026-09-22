import Link from "@/components/Link";
import { LessonSubNav } from "./LessonSubNav";
import { Breadcrumb } from "./Breadcrumb";
import { UI, lessonNo, neighbors, pathForModule } from "@/lib/course";
import { ownsModule } from "@/lib/entitlement";
import { para } from "@/lib/utils";
import type { Lang, Module } from "@/lib/types";

/**
 * The two pseudo-topics that bracket a lesson. Neither is a term, so neither is progress —
 * they frame the terms, and the list in each doubles as the lesson's table of contents.
 */
export async function LessonIntro({
  m,
  mi,
  kind,
  lang,
  course,
}: {
  m: Module;
  mi: number;
  kind: "overview" | "summary";
  lang: Lang;
  course?: string;
}) {
  const t = (k: string) => UI[k]?.[lang] ?? k;
  const owns = await ownsModule(m.id);
  const coursePath = pathForModule(m.id, course);
  const { prev: prevM } = neighbors(m.id, course);
  const last = m.terms.length - 1;
  const q = (href: string) => (course ? `${href}?course=${course}` : href);

  const prev =
    kind === "overview"
      ? prevM ? { href: q(`/lesson/${prevM.id}/summary`), label: prevM.title[lang] } : null
      : { href: q(`/lesson/${m.id}/${last}`), label: m.terms[last].t[lang] };
  const next =
    kind === "overview"
      ? { href: q(`/lesson/${m.id}/0`), label: t("startLesson") }
      : { href: q(`/lesson/${m.id}/build`), label: t("toBuild") };

  return (
    <>
      <Breadcrumb
        items={[
          { label: t("paths"), href: "/courses" },
          ...(coursePath ? [{ label: coursePath.title[lang], href: `/courses/${coursePath.id}` }] : []),
          { label: m.title[lang], href: q(`/lesson/${m.id}/overview`) },
          { label: t(kind) },
        ]}
      />
      <LessonSubNav m={m} active={kind} course={course} />
      <article className="slide">
        <div className="kicker">
          {t("lesson")} {lessonNo(m.id)} · {t(kind)}
        </div>
        <h2>{m.title[lang]}</h2>
        <div className="lede">{m.blurb[lang]}</div>
        <div className="plain">
          {para(m[kind][lang]).map((p, idx) => <p key={idx}>{p}</p>)}
          <h3>{t(kind === "overview" ? "inLesson" : "recap")}</h3>
        </div>
        <ol className="ov-list">
          {m.terms.map((tm, j) => (
            <li key={tm.k}>
              <span className="n">{j + 1}</span>
              <div>
                <Link href={q(`/lesson/${m.id}/${j}`)}>{tm.t[lang]}</Link>
                {owns ? <p>{tm.d[lang]}</p> : <p className="lock">🔒 {t("locked")}</p>}
              </div>
            </li>
          ))}
        </ol>
        <div className="pager">
          {prev ? (
            <Link href={prev.href}><b>{t("prev")}</b><span>{prev.label}</span></Link>
          ) : null}
          <Link className="nx" href={next.href}><b>{t("nextTerm")}</b><span>{next.label}</span></Link>
        </div>
      </article>
    </>
  );
}
