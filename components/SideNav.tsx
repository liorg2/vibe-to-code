"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useApp } from "./Providers";
import { LevelFilter, LevelTag } from "./LevelTag";
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
import type { Module } from "@/lib/types";

export function SideNav() {
  const { lang, done, levels, t } = useApp();
  const pathname = usePathname();

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
      <Link href={href} className={on ? "on" : ""}>
        <span className="ic">{icon}</span>
        <span>{label}</span>
        {cnt ? <span className="cnt">{cnt}</span> : null}
      </Link>
    );
  };

  const lesson = (m: Module) => {
    const shown = m.terms.map((tm, i) => ({ tm, i })).filter(({ tm }) => levels.has(tm.lvl));
    if (!shown.length) return null;
    const d = shown.filter(({ i }) => done.has(termKey(m, i))).length;
    const open = openId === m.id;
    const here = open && activeLesson === m.id;
    return (
      <div key={m.id} className={`nav-lesson${open ? " open" : ""}`}>
        <Link
          href={`/lesson/${m.id}/overview`}
          className={`nav-lesson-h${open ? " on" : ""}`}
          aria-expanded={open}
          onClick={headerClick(m.id, openId, setOpenId)}
        >
          <span className="ic">{m.icon}</span>
          <span>{m.title[lang]}</span>
          <span className="cnt">{d}/{shown.length}</span>
        </Link>
        <div className="nav-subs">
          <Link href={`/lesson/${m.id}/overview`} className={here && sub === "overview" ? "on" : ""}>
            {t("overview")}
          </Link>
          {shown.map(({ tm, i }) => (
            <Link
              key={i}
              href={`/lesson/${m.id}/${i}`}
              className={`${here && activeTerm === i ? "on" : ""}${done.has(termKey(m, i)) ? " done" : ""}`}
            >
              <LevelTag lvl={tm.lvl} />
              {tm.t[lang]}
            </Link>
          ))}
          <Link href={`/lesson/${m.id}/summary`} className={here && sub === "summary" ? "on" : ""}>
            {t("summary")}
          </Link>
          {QUIZ[m.id] ? (
            <Link href={`/lesson/${m.id}/quiz`} className={here && sub === "quiz" ? "on" : ""}>
              {t("test")}
            </Link>
          ) : null}
        </div>
      </div>
    );
  };

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
      <LevelFilter />
      <div id="nav">
        {navLink("/courses", "◇", t("paths"), `${done.size}/${totalTerms()}`)}
        {PATHS.map((p) => {
          const open = openCourse === p.id;
          return (
            <div key={p.id} className={`nav-course${open ? " open" : ""}`}>
              <Link
                href={`/courses/${p.id}`}
                className={`nav-lesson-h${open ? " on" : ""}`}
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
        <hr />
        {PROJECT?.id && navLink("/project", PROJECT.icon, PROJECT.title[lang])}
        {ARCHITECTURES?.id ? (
          <div className={`nav-lesson${openId === "architectures" ? " open" : ""}`}>
            <Link
              href="/architectures"
              className={`nav-lesson-h${openId === "architectures" ? " on" : ""}`}
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
                  className={pathname === `/architectures/${a.id}` ? "on" : ""}
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
