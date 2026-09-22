"use client";

import Link from "@/components/Link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { stripLang } from "@/lib/lang";
import { useApp } from "./Providers";
import {
  ARCHITECTURES,
  CHECKLIST,
  MODULES,
  PATHS,
  PROJECT,
  QUIZ,
  pathForModule,
  termKey,
  totalTerms,
} from "@/lib/course";
import { isPreviewModule } from "@/lib/protected";
import type { Module } from "@/lib/types";

export function SideNav() {
  const { lang, done, t, user } = useApp();
  const pathname = stripLang(usePathname());

  const lessonMatch = pathname.match(/^\/lesson\/([^/]+)/);
  const activeLesson = lessonMatch?.[1] ?? "";
  const termMatch = pathname.match(/^\/lesson\/[^/]+\/(\d+)/);
  const activeTerm = termMatch ? Number(termMatch[1]) : null;
  const sub = pathname.match(/^\/lesson\/[^/]+\/(overview|summary|quiz)$/)?.[1] ?? "";
  const archOnRoute = pathname.startsWith("/architectures");

  // the route decides which course and which lesson are open; a header click overrides until you navigate
  const routeGroup = activeLesson || (archOnRoute ? "architectures" : "");
  const routeCourse =
    pathForModule(activeLesson)?.id ?? pathname.match(/^\/courses\/([^/]+)/)?.[1] ?? "";
  const [openId, setOpenId] = useState(routeGroup);
  const [openCourse, setOpenCourse] = useState(routeCourse);
  useEffect(() => setOpenId(routeGroup), [routeGroup]);
  useEffect(() => setOpenCourse(routeCourse), [routeCourse]);
  /** on a phone the nav is an overlay — anything that navigates should close it */
  const closeOnMobile = () => {
    if (window.matchMedia("(max-width:900px)").matches) document.body.classList.remove("nav-toggled");
  };
  /** a header click on the open group collapses it and stays put; on a closed one it opens and follows the link */
  const headerClick =
    (id: string, open: string, set: (v: string) => void) => (e: React.MouseEvent) => {
      if (open === id) {
        e.preventDefault();
        set("");
        return;
      }
      set(id);
      closeOnMobile();
    };

  // the nav scrolls inside itself — bring the current item into view on load
  const navRef = useRef<HTMLElement>(null);
  useEffect(() => {
    navRef.current?.querySelector(".on")?.scrollIntoView({ block: "nearest" });
  }, [pathname]);

  const navLink = (href: string, icon: string, label: string, cnt?: string) => {
    const on = pathname === href || (href !== "/" && pathname.startsWith(href));
    return (
      <Link href={href} className={cn(on && "on")}>
        <span className="ic">{icon}</span>
        <span>{label}</span>
        {cnt ? <span className="cnt">{cnt}</span> : null}
      </Link>
    );
  };

  const lesson = (m: Module) => {
    const d = m.terms.filter((_, i) => done.has(termKey(m, i))).length;
    const open = openId === m.id;
    const here = open && activeLesson === m.id;
    return (
      <div key={m.id} className={cn("nav-lesson", open && "open")}>
        <Link
          href={`/lesson/${m.id}/overview`}
          className={cn("nav-lesson-h", open && "on")}
          aria-expanded={open}
          onClick={headerClick(m.id, openId, setOpenId)}
        >
          <span className="ic">{m.icon}</span>
          <span>{m.title[lang]}</span>
          <span className="cnt">{d}/{m.terms.length}</span>
        </Link>
        <div className="nav-subs">
          <Link href={`/lesson/${m.id}/overview`} className={cn(here && sub === "overview" && "on")}>
            {t("overview")}
          </Link>
          {m.terms.map((tm, i) => (
            <Link
              key={i}
              href={`/lesson/${m.id}/${i}`}
              className={cn(
                here && activeTerm === i && "on",
                done.has(termKey(m, i)) && "done",
              )}
            >
              {tm.t[lang]}
            </Link>
          ))}
          <Link href={`/lesson/${m.id}/summary`} className={cn(here && sub === "summary" && "on")}>
            {t("summary")}
          </Link>
          {QUIZ[m.id] ? (
            <Link href={`/lesson/${m.id}/quiz`} className={cn(here && sub === "quiz" && "on")}>
              {t("test")}
            </Link>
          ) : null}
        </div>
      </div>
    );
  };

  // ponytail: anonymous visitor on a preview lesson — everything else is gated, so show only what opens
  if (!user) {
    return (
      <nav ref={navRef} className="side" onClick={closeOnMobile}>
        <h3 id="navTitle">{t("paths")}</h3>
        <div id="nav">
          {navLink("/courses", "◇", t("paths"))}
          {PATHS.map((p) => (
            <div key={p.id} className="nav-course open">
              <Link href={`/courses/${p.id}`} className="nav-lesson-h">
                <span className="ic">{p.icon}</span>
                <span>{p.title[lang]}</span>
              </Link>
              <div className="nav-course-body">
                {MODULES.filter((m) => p.mods.includes(m.id) && isPreviewModule(m.id)).map(lesson)}
              </div>
            </div>
          ))}
          <Button variant="brand" className="m-1.5 w-[calc(100%-12px)]" nativeButton={false} render={<Link href="/courses" />}>
            {t("unlock")}
          </Button>
        </div>
      </nav>
    );
  }

  return (
    <nav
      ref={navRef}
      className="side"
      onClick={(e) => {
        // group headers decide for themselves — collapsing one should not close the drawer
        if ((e.target as HTMLElement).closest(".nav-lesson-h")) return;
        closeOnMobile();
      }}
    >
      <h3 id="navTitle">{t("paths")}</h3>
      <div id="nav">
        {navLink("/courses", "◇", t("paths"), `${done.size}/${totalTerms()}`)}
        {PATHS.map((p) => {
          const open = openCourse === p.id;
          return (
            <div key={p.id} className={cn("nav-course", open && "open")}>
              <Link
                href={`/courses/${p.id}`}
                className={cn("nav-lesson-h", open && "on")}
                aria-expanded={open}
                onClick={headerClick(p.id, openCourse, setOpenCourse)}
              >
                <span className="ic">{p.icon}</span>
                <span>{p.title[lang]}</span>
                <span className="cnt">{p.mods.length}</span>
              </Link>
              <div className="nav-course-body">
                {p.mods.map((id) => MODULES.find((m) => m.id === id)).filter(Boolean).map((m) => lesson(m!))}
              </div>
            </div>
          );
        })}
        <Separator className="my-2 mx-1.5" />
        {PROJECT?.id && navLink("/project", PROJECT.icon, PROJECT.title[lang])}
        {ARCHITECTURES?.id ? (
          <div className={cn("nav-lesson", openId === "architectures" && "open")}>
            <Link
              href="/architectures"
              className={cn("nav-lesson-h", openId === "architectures" && "on")}
              aria-expanded={openId === "architectures"}
              onClick={headerClick("architectures", openId, setOpenId)}
            >
              <span className="ic">{ARCHITECTURES.icon}</span>
              <span>{ARCHITECTURES.title[lang]}</span>
              <span className="cnt">{ARCHITECTURES.items.length}</span>
            </Link>
            <div className="nav-subs">
              {ARCHITECTURES.items.map((a) => (
                <Link
                  key={a.id}
                  href={`/architectures/${a.id}`}
                  className={cn(pathname === `/architectures/${a.id}` && "on")}
                >
                  {a.title[lang]}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
        {CHECKLIST?.id && navLink("/checklist", CHECKLIST.icon, CHECKLIST.title[lang])}
        {navLink("/glossary", "☰", t("glossary"))}
        {navLink("/review", "🗐", t("review"))}
      </div>
    </nav>
  );
}
