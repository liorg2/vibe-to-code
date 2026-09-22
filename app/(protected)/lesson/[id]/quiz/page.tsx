import Link from "@/components/Link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { Breadcrumb } from "@/components/Breadcrumb";
import { LessonSubNav } from "@/components/LessonSubNav";
import { ModuleHead } from "@/components/ModuleHead";
import { QuizBlock } from "@/components/QuizBlock";
import { Upsell } from "@/components/Upsell";
import { ARCHITECTURES, MODULES, QUIZ, UI, getModule, moduleIndex, pathForModule } from "@/lib/course";
import { ownsModule } from "@/lib/entitlement";
import { serverLang } from "@/lib/lang-server";

export default async function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
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
  const coursePath = pathForModule(m.id);
  const prev = MODULES[mi - 1];
  const next = MODULES[mi + 1];
  const nextLink = next ? `/lesson/${next.id}/overview` : "/architectures";
  const nextName = next ? next.title[lang] : ARCHITECTURES.title[lang];
  const done = m.terms.filter((_, j) => false).length;

  return (
    <AppShell>
      <Breadcrumb
        items={[
          { label: t("paths"), href: "/courses" },
          ...(coursePath ? [{ label: coursePath.title[lang], href: `/courses/${coursePath.id}` }] : []),
          { label: m.title[lang], href: `/lesson/${m.id}/overview` },
          { label: t("test") },
        ]}
      />
      <LessonSubNav m={m} active={m.terms.length - 1} quiz />
      <section className="mod">
        <ModuleHead m={m} mi={mi} lang={lang} doneCount={done} />
      </section>
      <QuizBlock modId={id} questions={qs} />
      <div className="pager">
        {prev ? (
          <Link href={`/lesson/${prev.id}/quiz`}>
            <b>Previous</b><span>{prev.title[lang]}</span>
          </Link>
        ) : null}
        <Link className="nx" href={nextLink}>
          <b>Next</b><span>{nextName}</span>
        </Link>
      </div>
    </AppShell>
  );
}
