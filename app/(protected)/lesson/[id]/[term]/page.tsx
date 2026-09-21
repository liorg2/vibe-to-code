import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Chart } from "@/components/Chart";
import { LessonSubNav } from "@/components/LessonSubNav";
import { PracticeLoop } from "@/components/PracticeLoop";
import { PromptBox } from "@/components/PromptBox";
import { SlideActions } from "@/components/SlideActions";
import {
  ASK_PROMPT,
  DETAIL,
  EXAMPLES,
  MODULES,
  QUIZ,
  SIMPLE,
  UI,
  getModule,
  moduleIndex,
  pathForModule,
} from "@/lib/course";
import { LIFECYCLE } from "@/lib/diagrams";
import { serverLang } from "@/lib/lang-server";
import { para } from "@/lib/utils";

export default async function SlidePage({
  params,
}: {
  params: Promise<{ id: string; term: string }>;
}) {
  const { id, term: termStr } = await params;
  const lang = await serverLang();
  const t = (k: string) => UI[k]?.[lang] ?? k;
  const i = Number(termStr);
  const m = getModule(id);
  const mi = moduleIndex(id);
  if (!m || mi < 0 || !Number.isInteger(i) || i < 0 || i >= m.terms.length) notFound();

  const tm = m.terms[i];
  const simple = SIMPLE[tm.t.en];
  const det = DETAIL[tm.t.en];
  const ex = EXAMPLES[tm.t.en];
  const coursePath = pathForModule(m.id);
  const prevM = MODULES[mi - 1];
  const nextM = MODULES[mi + 1];

  const prevHref = i > 0 ? `/lesson/${m.id}/${i - 1}` : prevM ? `/lesson/${prevM.id}/${prevM.terms.length - 1}` : null;
  const nextHref =
    i < m.terms.length - 1
      ? `/lesson/${m.id}/${i + 1}`
      : QUIZ[m.id]
        ? `/lesson/${m.id}/quiz`
        : nextM
          ? `/lesson/${nextM.id}/0`
          : "/";

  const prevLabel = i > 0 ? t("prevTerm") : prevM ? prevM.title[lang] : t("prevTerm");
  const nextLabel =
    i < m.terms.length - 1 ? t("nextTerm") : QUIZ[m.id] ? t("toTest") : nextM ? nextM.title[lang] : t("toTest");

  return (
    <AppShell>
      <Breadcrumb
        items={[
          { label: t("allLessons"), href: "/" },
          ...(coursePath ? [{ label: coursePath.title[lang], href: "/courses" }] : []),
          { label: m.title[lang], href: `/lesson/${m.id}/0` },
          { label: tm.t[lang] },
        ]}
      />
      <LessonSubNav m={m} active={i} />
      <article className="slide">
        <div className="kicker">
          {String(mi + 1).padStart(2, "0")} {m.title[lang]} · {i + 1}/{m.terms.length}
        </div>
        <h2>{tm.t[lang]}</h2>
        <div className="lede">{tm.d[lang]}</div>
        {tm.t.en === "App lifecycle" ? (
          <Chart def={LIFECYCLE} caption={t("lifeCap")} />
        ) : null}
        {tm.t.en === "Request / Response" ? (
          <div className="http-flow" aria-hidden="true">
            <div className="hf-cap">{t("hfCap")}</div>
            <div className="hf-row">
              <div className="hf-node hf-client">{t("hfClient")}</div>
              <div className="hf-track">
                <div className="hf-packet hf-req">{t("hfReq")}</div>
                <div className="hf-packet hf-res">{t("hfRes")}</div>
              </div>
              <div className="hf-node hf-server">{t("hfServer")}</div>
            </div>
          </div>
        ) : null}
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
        <PracticeLoop />
        <details className="ask">
          <summary>{t("askAI")}</summary>
          <p className="sub">{t("askSub")}</p>
          <PromptBox id="ask" text={ASK_PROMPT.replace("{term}", tm.t.en)} label={t("prompt")} />
        </details>
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
