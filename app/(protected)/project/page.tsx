import Link from "@/components/Link";
import { AppShell } from "@/components/AppShell";
import { buildsFor } from "@/lib/builds";
import { ARCHITECTURES, CHECKLIST, UI, lessonNo } from "@/lib/course";
import { serverLang } from "@/lib/lang-server";

/** The build track at a glance: one app, one step per lesson, each linking to its lesson's Build page. */
export default async function ProjectPage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string }>;
}) {
  const { course: raw } = await searchParams;
  const course = raw === "basic" ? "basic" : "advanced";
  const lang = await serverLang();
  const t = (k: string) => UI[k]?.[lang] ?? k;
  const q = (href: string) => `${href}${href.includes("?") ? "&" : "?"}course=${course}`;
  const steps = buildsFor(course);
  const next =
    course === "basic"
      ? { href: q("/architectures"), label: ARCHITECTURES.title[lang] }
      : { href: q("/checklist"), label: CHECKLIST.title[lang] };

  return (
    <AppShell>
      <Link className="crumb" href={`/courses/${course}`}>
        ← {t("paths")}
      </Link>
      <section className="mod">
        <div className="mhead">
          <div className="ic">🛠</div>
          <div>
            <h2>{t("buildTrack")}</h2>
          </div>
          <div className="n">{steps.length}</div>
        </div>
        <p className="mblurb">{t("buildTrackBlurb")}</p>
      </section>
      <div className="note">⚠ {t("buildTrackWarn")}</div>
      <ol className="roadmap">
        {steps.map(({ id, step }) => (
          <li key={id}>
            <Link href={q(`/lesson/${id}/build`)}>
              <span className="n">{lessonNo(id)}</span>
              <div>
                <b>{step.title[lang]}</b>
                <p>{step.goal[lang]}</p>
              </div>
            </Link>
          </li>
        ))}
      </ol>
      <div className="pager">
        <Link className="nx" href={next.href}>
          <b>{t("nextTerm")}</b>
          <span>{next.label}</span>
        </Link>
      </div>
    </AppShell>
  );
}
