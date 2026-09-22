import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { Breadcrumb } from "@/components/Breadcrumb";
import { LessonCards } from "@/components/LessonCards";
import { PATHS, UI } from "@/lib/course";
import { serverLang } from "@/lib/lang-server";
import { billingOn, ownedCourses, type Course } from "@/lib/entitlement";
import { sessionClaims } from "@/lib/verify-session";

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = PATHS.find((x) => x.id === id);
  if (!p) notFound();
  const lang = await serverLang();
  const t = (k: string) => UI[k]?.[lang] ?? k;
  // no session, or billing on and this course unpaid: only the preview module is readable
  const locked = !(await sessionClaims()) || (billingOn() && !(await ownedCourses()).has(id as Course));

  return (
    <AppShell showNav={false}>
      <Breadcrumb items={[{ label: t("paths"), href: "/courses" }, { label: p.title[lang] }]} />
      <section className="mod">
        <div className="mhead">
          <div className="ic">{p.icon}</div>
          <div><h2>{p.title[lang]}</h2></div>
          <div className="n">{p.mods.length} {t("lessonsN")} · ₪{p.price}</div>
        </div>
        <p className="mblurb">{p.blurb[lang]}</p>
        <LessonCards ids={p.mods} locked={locked} />
      </section>
    </AppShell>
  );
}
