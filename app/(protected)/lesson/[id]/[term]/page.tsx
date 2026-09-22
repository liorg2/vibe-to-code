import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Chart } from "@/components/Chart";
import { LessonIntro } from "@/components/LessonIntro";
import { LessonSubNav } from "@/components/LessonSubNav";
import Link from "@/components/Link";
import { Scene } from "@/components/Scene";
import { SlideActions } from "@/components/SlideActions";
import { Upsell } from "@/components/Upsell";
import {
  DETAIL,
  EXAMPLES,
  SIMPLE,
  UI,
  getModule,
  lessonNo,
  moduleIndex,
  pathForModule,
} from "@/lib/course";
import { LIFECYCLE } from "@/lib/diagrams";
import { SCENES } from "@/lib/scenes";
import { ownsModule } from "@/lib/entitlement";
import { serverLang } from "@/lib/lang-server";
import { para } from "@/lib/utils";

export default async function SlidePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string; term: string }>;
  searchParams: Promise<{ course?: string }>;
}) {
  const { id, term: termStr } = await params;
  const { course: courseRaw } = await searchParams;
  const course = courseRaw === "basic" || courseRaw === "advanced" ? courseRaw : undefined;
  const lang = await serverLang();
  const t = (k: string) => UI[k]?.[lang] ?? k;
  const m = getModule(id);
  const mi = moduleIndex(id);
  if (!m || mi < 0) notFound();
  // the two bookends share this route so the lesson's sub-nav reads as one sequence
  if (termStr === "overview" || termStr === "summary") {
    return (
      <AppShell>
        <LessonIntro m={m} mi={mi} kind={termStr} lang={lang} course={course} />
      </AppShell>
    );
  }
  const i = Number(termStr);
  if (!Number.isInteger(i) || i < 0 || i >= m.terms.length) notFound();

  const tm = m.terms[i];
  // the URL is the whole attack surface here — own the module, own every term in it
  if (!(await ownsModule(m.id))) {
    return (
      <AppShell>
        <Upsell title={tm.t[lang]} />
      </AppShell>
    );
  }

  const simple = SIMPLE[tm.t.en];
  const det = DETAIL[tm.t.en];
  const ex = EXAMPLES[tm.t.en];
  const scene = SCENES[tm.k];
  const coursePath = pathForModule(m.id, course);
  const q = (href: string) => (course ? `${href}?course=${course}` : href);

  const prevHref = q(i > 0 ? `/lesson/${m.id}/${i - 1}` : `/lesson/${m.id}/overview`);
  const nextHref = q(i < m.terms.length - 1 ? `/lesson/${m.id}/${i + 1}` : `/lesson/${m.id}/summary`);
  const prevLabel = i > 0 ? t("prevTerm") : t("overview");
  const nextLabel = i < m.terms.length - 1 ? t("nextTerm") : t("summary");

  return (
    <AppShell>
      <Breadcrumb
        items={[
          { label: t("paths"), href: "/courses" },
          ...(coursePath ? [{ label: coursePath.title[lang], href: `/courses/${coursePath.id}` }] : []),
          { label: m.title[lang], href: q(`/lesson/${m.id}/overview`) },
          { label: tm.t[lang] },
        ]}
      />
      <LessonSubNav m={m} active={i} course={course} />
      <article className="slide">
        <div className="kicker">
          {lessonNo(id)} {m.title[lang]} · {i + 1}/{m.terms.length}
        </div>
        <h2>{tm.t[lang]}</h2>
        <div className="lede">{tm.d[lang]}</div>
        {tm.t.en === "App lifecycle" ? (
          <Chart def={LIFECYCLE} caption={t("lifeCap")} />
        ) : null}
        {scene ? <Scene scene={scene} /> : null}
        {simple ? (
          <div className="plain">
            <h3>{simple.q[lang]}</h3>
            {para(simple.s[lang]).map((p, idx) => <p key={idx}>{p}</p>)}
          </div>
        ) : null}
        <div className="cal"><b>{t("why")}</b><p>{tm.w[lang]}</p></div>
        {det || ex ? (
          <details className="deeper" open={!simple}>
            <summary>{t("deeper")}<span className="sub">{t("deeperSub")}</span></summary>
            {det ? (
              <div className="body">
                {para(det[lang]).map((p, idx) => <p key={idx}>{p}</p>)}
              </div>
            ) : null}
            {ex ? (
              <div className="ex">
                <div className="cap">{ex.cap[lang]}</div>
                <pre className="code">{ex.code}</pre>
              </div>
            ) : null}
          </details>
        ) : null}
        <SlideActions
          m={m}
          i={i}
          prevHref={prevHref}
          nextHref={nextHref}
          prevLabel={prevLabel}
          nextLabel={nextLabel}
        />
      </article>
    </AppShell>
  );
}
