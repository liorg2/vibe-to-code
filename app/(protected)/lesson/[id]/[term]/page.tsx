import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { Breadcrumb, lessonMenu } from "@/components/Breadcrumb";
import { Chart } from "@/components/Chart";
import { LessonIntro } from "@/components/LessonIntro";
import { LessonSubNav } from "@/components/LessonSubNav";
import Link from "@/components/Link";
import { Scene } from "@/components/Scene";
import { SlideMode } from "@/components/SlideMode";
import { SlideActions } from "@/components/SlideActions";
import { Upsell } from "@/components/Upsell";
import {
  DETAIL,
  EXAMPLES,
  SIMPLE,
  TLDR,
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
import { cookies } from "next/headers";
import { TOPIC_EXTRAS } from "@/lib/topic-extras";
import { TopicExtras } from "@/components/TopicExtras";
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
  const isBookend = termStr === "overview" || termStr === "summary";
  const i = isBookend ? -1 : Number(termStr);
  if (!isBookend && (!Number.isInteger(i) || i < 0 || i >= m.terms.length)) notFound();

  // the URL is the whole attack surface here — own the module, own every term in it.
  // Unowned: every route in the lesson (overview/summary/any term) shows the same
  // locked overview + upsell, one code path regardless of which URL got them here.
  if (!(await ownsModule(m.id))) {
    return (
      <AppShell>
        <LessonIntro m={m} mi={mi} kind={termStr === "summary" ? "summary" : "overview"} lang={lang} course={course} />
        <Upsell title={m.title[lang]} />
      </AppShell>
    );
  }

  // the two bookends share this route so the lesson's sub-nav reads as one sequence
  if (isBookend) {
    return (
      <AppShell>
        <LessonIntro m={m} mi={mi} kind={termStr as "overview" | "summary"} lang={lang} course={course} />
      </AppShell>
    );
  }

  const tm = m.terms[i];
  const simple = SIMPLE[tm.t.en];
  const det = DETAIL[tm.t.en];
  const short = TLDR[tm.t.en];
  const ex = EXAMPLES[tm.t.en];
  const scene = SCENES[tm.k];
  const coursePath = pathForModule(m.id, course);
  const q = (href: string) => (course ? `${href}?course=${course}` : href);
  const tldr = (await cookies()).get("vibe.tldr")?.value === "1";

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
          { label: m.title[lang], href: q(`/lesson/${m.id}/overview`), menu: lessonMenu(coursePath, m.id, lang, q) },
          { label: tm.t[lang] },
        ]}
      />
      <LessonSubNav m={m} active={i} course={course} />
      <SlideMode initial={tldr} extra={TOPIC_EXTRAS[tm.t.en]}>
      <article className="slide">
        <div className="kicker">
          {lessonNo(id)} {m.title[lang]} · {i + 1}/{m.terms.length}
        </div>
        <h2>{tm.t[lang]}</h2>
        {tm.lvl === "E" ? (
          <p className="xnote"><span className="xbadge">{t("expert")}</span> {t("expertNote")}</p>
        ) : null}
        <div className="lede">{tm.d[lang]}</div>
        {short ? (
          <ul className="tldr-only body">
            {short[lang].map((p, idx) => <li key={idx}>{p}</li>)}
          </ul>
        ) : null}
        <div className="cal"><b>{t("why")}</b><p>{tm.w[lang]}</p></div>
        <div className="full-only">
        {tm.t.en === "App lifecycle" ? (
          <Chart def={LIFECYCLE} caption={t("lifeCap")} />
        ) : null}
        {scene ? <Scene scene={scene} /> : null}
        {simple || det ? (
          <div className="body">
            {simple ? <h3>{simple.q[lang]}</h3> : null}
            {simple ? para(simple.s[lang]).map((p, idx) => <p key={idx}>{p}</p>) : null}
            {det ? para(det[lang]).map((p, idx) => <p key={idx}>{p}</p>) : null}
          </div>
        ) : null}
        {ex ? (
          <div className="ex">
            <div className="cap">{ex.cap[lang]}</div>
            <pre className="code">{ex.code}</pre>
          </div>
        ) : null}
        </div>
        <TopicExtras extra={TOPIC_EXTRAS[tm.t.en]} />
        <SlideActions
          m={m}
          i={i}
          prevHref={prevHref}
          nextHref={nextHref}
          prevLabel={prevLabel}
          nextLabel={nextLabel}
        />
      </article>
      </SlideMode>
    </AppShell>
  );
}
