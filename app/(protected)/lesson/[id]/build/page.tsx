import Link from "@/components/Link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BuildBody } from "@/components/BuildBody";
import { LessonSubNav } from "@/components/LessonSubNav";
import { Upsell } from "@/components/Upsell";
import { BUILDS } from "@/lib/builds";
import { QUIZ, UI, getModule, lessonNo, neighbors, pathForModule } from "@/lib/course";
import { ownsModule } from "@/lib/entitlement";
import { serverLang } from "@/lib/lang-server";

export default async function BuildPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ course?: string }>;
}) {
  const { id } = await params;
  const { course: courseRaw } = await searchParams;
  const course = courseRaw === "basic" || courseRaw === "advanced" ? courseRaw : undefined;
  const lang = await serverLang();
  const m = getModule(id);
  const b = BUILDS[id];
  if (!m || !b) notFound();
  if (!(await ownsModule(m.id))) {
    return (
      <AppShell>
        <Upsell title={m.title[lang]} />
      </AppShell>
    );
  }

  const t = (k: string) => UI[k]?.[lang] ?? k;
  const q = (href: string) => (course ? `${href}?course=${course}` : href);
  const coursePath = pathForModule(m.id, course);
  const { next: nextM } = neighbors(m.id, course);
  const next = QUIZ[m.id]
    ? { href: q(`/lesson/${m.id}/quiz`), label: t("toTest") }
    : nextM
      ? { href: q(`/lesson/${nextM.id}/overview`), label: nextM.title[lang] }
      : { href: q("/project"), label: t("buildTrack") };

  return (
    <AppShell>
      <Breadcrumb
        items={[
          { label: t("paths"), href: "/courses" },
          ...(coursePath ? [{ label: coursePath.title[lang], href: `/courses/${coursePath.id}` }] : []),
          { label: m.title[lang], href: q(`/lesson/${m.id}/overview`) },
          { label: t("build") },
        ]}
      />
      <LessonSubNav m={m} active="build" course={course} />
      <article className="slide build">
        <div className="kicker">
          {t("buildStep")} {lessonNo(m.id)} · {m.title[lang]}
        </div>
        <h2>{b.title[lang]}</h2>
        <div className="lede">{b.goal[lang]}</div>
        <p className="build-how">
          {t("buildHow")} <Link href={q("/project")}>{t("buildTrack")} →</Link>
        </p>
        <BuildBody id={id} b={b} lang={lang} q={q} />
        <div className="pager">
          <Link href={q(`/lesson/${m.id}/summary`)}><b>{t("prev")}</b><span>{t("summary")}</span></Link>
          <Link className="nx" href={next.href}><b>{t("nextTerm")}</b><span>{next.label}</span></Link>
        </div>
      </article>
    </AppShell>
  );
}
