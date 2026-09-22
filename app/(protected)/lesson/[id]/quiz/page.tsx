import Link from "@/components/Link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { Breadcrumb } from "@/components/Breadcrumb";
import { LessonSubNav } from "@/components/LessonSubNav";
import { ModuleHead } from "@/components/ModuleHead";
import { QuizBlock } from "@/components/QuizBlock";
import { Upsell } from "@/components/Upsell";
import { ARCHITECTURES, QUIZ, UI, getModule, moduleIndex, neighbors, pathForModule } from "@/lib/course";
import { ownsModule } from "@/lib/entitlement";
import { serverLang } from "@/lib/lang-server";

export default async function QuizPage({
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
  const mi = moduleIndex(id);
  const qs = QUIZ[id];
  if (!m || mi < 0 || !qs) notFound();

  // the quiz belongs to the module — own the module, sit the quiz
  if (!(await ownsModule(m.id))) {
    return (
      <AppShell>
        <Upsell title={m.title[lang]} />
      </AppShell>
    );
  }

  const t = (k: string) => UI[k]?.[lang] ?? k;
  const coursePath = pathForModule(m.id, course);
  const { next } = neighbors(m.id, course);
  const q = (href: string) => (course ? `${href}?course=${course}` : href);
  const nextLink = next ? q(`/lesson/${next.id}/overview`) : q("/architectures");
  const nextName = next ? next.title[lang] : ARCHITECTURES.title[lang];

  return (
    <AppShell>
      <Breadcrumb
        items={[
          { label: t("paths"), href: "/courses" },
          ...(coursePath ? [{ label: coursePath.title[lang], href: `/courses/${coursePath.id}` }] : []),
          { label: m.title[lang], href: q(`/lesson/${m.id}/overview`) },
          { label: t("test") },
        ]}
      />
      <LessonSubNav m={m} active={m.terms.length - 1} quiz course={course} />
      <section className="mod">
        <ModuleHead m={m} lang={lang} doneCount={0} />
      </section>
      <QuizBlock modId={id} questions={qs} />
      <div className="pager">
        <Link href={q(`/lesson/${m.id}/build`)}>
          <b>{t("prev")}</b><span>{t("build")}</span>
        </Link>
        <Link className="nx" href={nextLink}>
          <b>{t("nextTerm")}</b><span>{nextName}</span>
        </Link>
      </div>
    </AppShell>
  );
}
