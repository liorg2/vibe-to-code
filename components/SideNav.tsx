"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useApp } from "./Providers";
import { ARCHITECTURES, CHECKLIST, MODULES, PROJECT, QUIZ, termKey, totalTerms } from "@/lib/course";

export function SideNav() {
  const { lang, done, t } = useApp();
  const pathname = usePathname();

  const lessonMatch = pathname.match(/^\/lesson\/([^/]+)/);
  const activeLesson = lessonMatch?.[1] ?? "";
  const termMatch = pathname.match(/^\/lesson\/[^/]+\/(\d+)/);
  const activeTerm = termMatch ? Number(termMatch[1]) : null;
  const quizOpen = pathname.endsWith("/quiz");

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

  return (
    <nav
      ref={navRef}
      className="side"
      onClick={() => {
        // on a phone the nav is an overlay — a link tap should close it
        if (window.matchMedia("(max-width:900px)").matches) document.body.classList.remove("nav-toggled");
      }}
    >
      <h3 id="navTitle">{t("lessons")}</h3>
      <div id="nav">
        {navLink("/", "◫", t("allLessons"), `${done.size}/${totalTerms()}`)}
        {navLink("/courses", "◇", t("paths"))}
        {MODULES.map((m) => {
          const d = m.terms.filter((_, i) => done.has(termKey(m, i))).length;
          const open = activeLesson === m.id;
          return (
            <div key={m.id} className={`nav-lesson${open ? " open" : ""}`}>
              <Link href={`/lesson/${m.id}/0`} className={`nav-lesson-h${open ? " on" : ""}`}>
                <span className="ic">{m.icon}</span>
                <span>{m.title[lang]}</span>
                <span className="cnt">{d}/{m.terms.length}</span>
              </Link>
              <div className="nav-subs">
                {m.terms.map((tm, i) => (
                  <Link
                    key={i}
                    href={`/lesson/${m.id}/${i}`}
                    className={`${open && activeTerm === i && !quizOpen ? "on" : ""}${done.has(termKey(m, i)) ? " done" : ""}`}
                  >
                    {tm.t[lang]}
                  </Link>
                ))}
                {QUIZ[m.id] ? (
                  <Link href={`/lesson/${m.id}/quiz`} className={open && quizOpen ? "on" : ""}>
                    {t("test")}
                  </Link>
                ) : null}
              </div>
            </div>
          );
        })}
        <hr />
        {PROJECT?.id && navLink("/project", PROJECT.icon, PROJECT.title[lang])}
        {ARCHITECTURES?.id && navLink("/architectures", ARCHITECTURES.icon, ARCHITECTURES.title[lang])}
        {CHECKLIST?.id && navLink("/checklist", CHECKLIST.icon, CHECKLIST.title[lang])}
        {navLink("/glossary", "☰", t("glossary"))}
        {navLink("/review", "🗐", t("review"))}
      </div>
    </nav>
  );
}
