import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { LessonSubNav } from "@/components/LessonSubNav";
import { ModuleHead } from "@/components/ModuleHead";
import { QuizBlock } from "@/components/QuizBlock";
import { ARCHITECTURES, MODULES, QUIZ, getModule, moduleIndex } from "@/lib/course";
import { serverLang } from "@/lib/lang-server";

export default async function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lang = await serverLang();
  const m = getModule(id);
  const mi = moduleIndex(id);
  const qs = QUIZ[id];
  if (!m || mi < 0 || !qs) notFound();

  const prev = MODULES[mi - 1];
  const next = MODULES[mi + 1];
  const nextLink = next ? `/lesson/${next.id}/0` : "/architectures";
  const nextName = next ? next.title[lang] : ARCHITECTURES.title[lang];
  const done = m.terms.filter((_, j) => false).length;

  return (
    <AppShell>
      <Link className="crumb" href={`/lesson/${m.id}/${m.terms.length - 1}`}>
        &larr; {m.title[lang]}
      </Link>
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
