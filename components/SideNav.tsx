"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useApp } from "./Providers";
import { LevelFilter, LevelTag } from "./LevelTag";
import { ARCHITECTURES, CHECKLIST, MODULES, PROJECT, QUIZ, termKey, totalTerms } from "@/lib/course";

export function SideNav() {
  const { lang, done, levels, t } = useApp();
  const pathname = usePathname();

  const lessonMatch = pathname.match(/^\/lesson\/([^/]+)/);
  const activeLesson = lessonMatch?.[1] ?? "";
  const termMatch = pathname.match(/^\/lesson\/[^/]+\/(\d+)/);
  const activeTerm = termMatch ? Number(termMatch[1]) : null;
  const quizOpen = pathname.endsWith("/quiz");
  const archOnRoute = pathname.startsWith("/architectures");

  // the route decides which group is open; clicking its header overrides that until you navigate
  const routeGroup = activeLesson || (archOnRoute ? "architectures" : "");
  const [openId, setOpenId] = useState(routeGroup);
  useEffect(() => setOpenId(routeGroup), [routeGroup]);
  /** on a phone the nav is an overlay — anything that navigates should close it */
  const closeOnMobile = () => {
    if (window.matchMedia("(max-width:900px)").matches) document.body.classList.remove("nav-toggled");
  };
  /** a header click on the open group collapses it and stays put; on a closed one it opens and follows the link */
  const headerClick = (id: string) => (e: React.MouseEvent) => {
    if (openId === id) {
      e.preventDefault();
      setOpenId("");
      return;
    }
    setOpenId(id);
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
      <h3 id="navTitle">{t("lessons")}</h3>
      <LevelFilter />
      <div id="nav">
        {navLink("/", "◫", t("allLessons"), `${done.size}/${totalTerms()}`)}
        {navLink("/courses", "◇", t("paths"))}
        {MODULES.map((m) => {
          const shown = m.terms.map((tm, i) => ({ tm, i })).filter(({ tm }) => levels.has(tm.lvl));
          if (!shown.length) return null;
          const d = shown.filter(({ i }) => done.has(termKey(m, i))).length;
          const open = openId === m.id;
          return (
            <div key={m.id} className={`nav-lesson${open ? " open" : ""}`}>
              <Link
                href={`/lesson/${m.id}/0`}
                className={`nav-lesson-h${open ? " on" : ""}`}
                aria-expanded={open}
                onClick={headerClick(m.id)}
              >
                <span className="ic">{m.icon}</span>
                <span>{m.title[lang]}</span>
                <span className="cnt">{d}/{shown.length}</span>
              </Link>
              <div className="nav-subs">
                {shown.map(({ tm, i }) => (
                  <Link
                    key={i}
                    href={`/lesson/${m.id}/${i}`}
                    className={`${open && activeTerm === i && !quizOpen ? "on" : ""}${done.has(termKey(m, i)) ? " done" : ""}`}
                  >
                    <LevelTag lvl={tm.lvl} />
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
        {ARCHITECTURES?.id ? (
          <div className={`nav-lesson${openId === "architectures" ? " open" : ""}`}>
            <Link
              href="/architectures"
              className={`nav-lesson-h${openId === "architectures" ? " on" : ""}`}
              aria-expanded={openId === "architectures"}
              onClick={headerClick("architectures")}
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
