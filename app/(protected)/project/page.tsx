import Link from "@/components/Link";
import { AppShell } from "@/components/AppShell";
import { BuildBody } from "@/components/BuildBody";
import { BuildTick } from "@/components/BuildTick";
import { buildsFor } from "@/lib/builds";
import { ARCHITECTURES, CHECKLIST, UI, lessonNo } from "@/lib/course";
import { ownsModule } from "@/lib/entitlement";
import { serverLang } from "@/lib/lang-server";

/** The whole build track on one page: each step opens in place, so there is no page to find the way back from. */
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
  const steps = await Promise.all(buildsFor(course).map(async (s) => ({ ...s, owned: await ownsModule(s.id) })));
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
        {steps.map(({ id, step, owned }) => (
          <li key={id}>
            <details>
              <summary>
                <span className="n">{lessonNo(id)}</span>
                <div>
                  <b>{step.title[lang]}</b>
                  <p>{step.goal[lang]}</p>
                </div>
                <BuildTick id={id} />
              </summary>
              <div className="build">
                {owned ? (
                  <BuildBody id={id} b={step} lang={lang} q={q} />
                ) : (
                  <p className="build-how">
                    🔒 <Link href="/courses">{t("unlock")} →</Link>
                  </p>
                )}
              </div>
            </details>
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
