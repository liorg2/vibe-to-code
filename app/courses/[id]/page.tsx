import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CourseStart } from "@/components/CourseStart";
import { LessonCards } from "@/components/LessonCards";
import { buildsFor } from "@/lib/builds";
import { MODULES, PATHS, UI, lessonNo, mins } from "@/lib/course";
import { INTRO } from "@/lib/intro";
import { serverLang } from "@/lib/lang-server";
import { billingOn, ownedCourses, type Course } from "@/lib/entitlement";
import { sessionClaims } from "@/lib/verify-session";

/** The course intro: progress, what to have ready, how a lesson runs, the app you build, then the lessons. */
export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = PATHS.find((x) => x.id === id);
  if (!p) notFound();
  const lang = await serverLang();
  const t = (k: string) => UI[k]?.[lang] ?? k;
  const signedIn = !!(await sessionClaims());
  // no session, or billing on and this course unpaid: only the preview module is readable
  const locked = !signedIn || (billingOn() && !(await ownedCourses()).has(id as Course));
  const course = id as "basic" | "advanced";
  // titles and goals only — the prompts are paid content and never leave the server
  const steps = buildsFor(course);
  const builds = Object.fromEntries(steps.map(({ id, step }) => [id, step.done.length]));
  const hours = Math.round(MODULES.filter((m) => p.mods.includes(m.id)).reduce((n, m) => n + mins(m), 0) / 60);
  const H = INTRO.h;

  return (
    <AppShell showNav={signedIn}>
      <Breadcrumb items={[{ label: t("paths"), href: "/courses" }, { label: p.title[lang] }]} />
      <section className="mod intro">
        <div className="mhead">
          <div className="ic">{p.icon}</div>
          <div><h2>{p.title[lang]}</h2></div>
          <div className="n">{p.mods.length} {t("lessonsN")} · ₪{p.price}</div>
        </div>
        <p className="mblurb">{p.blurb[lang]}</p>
        <CourseStart course={course} ids={p.mods} builds={builds} locked={locked} />

        <h3 className="intro-h">🎒 {H.need[lang]}</h3>
        <div className="intro-grid">
          {INTRO.need.map((x) => (
            <div key={x.icon} className="intro-card">
              <b><span className="ic">{x.icon}</span>{x.t[lang]}</b>
              <p>{x.d[lang]}</p>
            </div>
          ))}
          <div className="intro-card">
            <b><span className="ic">🔑</span>{INTRO.accounts.t[lang]}</b>
            <p>{INTRO.accounts[course][lang]}</p>
          </div>
          <div className="intro-card">
            <b><span className="ic">⏱</span>~{hours} {t("hours")}</b>
            <p>{H.reading[lang]}</p>
          </div>
        </div>

        <h3 className="intro-h">🧭 {H.flow[lang]}</h3>
        <ol className="intro-flow">
          {INTRO.flow.map((x) => (
            <li key={x.icon} className="intro-card">
              <b><span className="ic">{x.icon}</span>{x.t[lang]}</b>
              <p>{x.d[lang]}</p>
            </li>
          ))}
        </ol>

        <h3 className="intro-h">🛠 {H.app[lang]}</h3>
        <p className="intro-p">{INTRO.app[lang]}</p>
        <ol className="intro-steps">
          {steps.map(({ id, step }) => (
            <li key={id} title={step.goal[lang]}>
              <span className="n">{lessonNo(id)}</span>
              {step.title[lang]}
            </li>
          ))}
        </ol>
        <p className="intro-end">🏁 {INTRO.end[course][lang]}</p>

        <h3 className="intro-h">📚 {H.syllabus[lang]}</h3>
        <LessonCards ids={p.mods} locked={locked} courseId={p.id} />
      </section>
    </AppShell>
  );
}
