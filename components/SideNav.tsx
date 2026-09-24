"use client";

import Link from "@/components/Link";
import { usePathname, useSearchParams } from "next/navigation";
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
  QUIZ,
  archesFor,
  termKey,
} from "@/lib/course";
import { buildFinished } from "@/lib/builds/counts";
import { isPreviewModule } from "@/lib/protected";
import { LessonIcon } from "./LessonIcon";
import type { Module } from "@/lib/types";

const COURSE_KEY = "vibe.navCourse";
const HIDE_KEY = "v2c.hideDone";

function asCourse(id: string): "basic" | "advanced" | "" {
  return id === "basic" || id === "advanced" ? id : "";
}

export function SideNav() {
  const { lang, done, ticked, t, user, hideExpert, toggleHideExpert } = useApp();
  const pathname = stripLang(usePathname());
  const queryCourse = asCourse(useSearchParams().get("course") ?? "");

  const lessonMatch = pathname.match(/^\/lesson\/([^/]+)/);
  const activeLesson = lessonMatch?.[1] ?? "";
  const termMatch = pathname.match(/^\/lesson\/[^/]+\/(\d+)/);
  const activeTerm = termMatch ? Number(termMatch[1]) : null;
  const sub = pathname.match(/^\/lesson\/[^/]+\/(overview|summary|build|quiz)$/)?.[1] ?? "";
  const archOnRoute = pathname.startsWith("/architectures");

  const homes = PATHS.filter((p) => activeLesson && p.mods.includes(activeLesson)).map((p) => p.id);
  const fromPath = asCourse(pathname.match(/^\/courses\/(basic|advanced)/)?.[1] ?? "");
  const [remembered, setRemembered] = useState("");
  // hide lessons whose topics are all done; the lesson you are in always stays
  const [hideDone, setHideDone] = useState(false);
  useEffect(() => {
    try {
      setHideDone(localStorage.getItem(HIDE_KEY) === "1");
    } catch {}
  }, []);
  const flipHideDone = () => {
    setHideDone(!hideDone);
    try {
      localStorage.setItem(HIDE_KEY, hideDone ? "0" : "1");
    } catch {}
  };
  useEffect(() => {
    const explicit = queryCourse && (homes.length === 0 || homes.includes(queryCourse)) ? queryCourse : fromPath;
    if (explicit) {
      sessionStorage.setItem(COURSE_KEY, explicit);
      setRemembered(explicit);
      return;
    }
    const saved = asCourse(sessionStorage.getItem(COURSE_KEY) ?? "");
    if (saved && (homes.length === 0 || homes.includes(saved))) {
      setRemembered(saved);
      return;
    }
    const home = asCourse(homes[0] ?? "");
    if (home) {
      sessionStorage.setItem(COURSE_KEY, home);
      setRemembered(home);
    }
  }, [queryCourse, fromPath, activeLesson]);
  const courseId =
    (queryCourse && (!activeLesson || homes.includes(queryCourse)) ? queryCourse : "") ||
    fromPath ||
    (remembered && (!activeLesson || homes.includes(remembered)) ? remembered : "") ||
    asCourse(homes[0] ?? "");

  const routeGroup = activeLesson || (archOnRoute ? "architectures" : "");
  const [openId, setOpenId] = useState(routeGroup);
  useEffect(() => setOpenId(routeGroup), [routeGroup]);
  const closeOnMobile = () => {
    if (window.matchMedia("(max-width:900px)").matches) document.body.classList.remove("nav-toggled");
  };
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

  const navRef = useRef<HTMLElement>(null);
  // the open lesson sits at the top of the menu, with its active topic still in view below it.
  // Scrolls the nav itself, never the page (the sticky nav is every link's offsetParent).
  // Re-runs when the signed-in user arrives: that is when the full lesson list renders.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const nav = navRef.current;
      if (!nav) return;
      const head = nav.querySelector<HTMLElement>(".nav-lesson.open");
      const on = nav.querySelector<HTMLElement>("a.on:not(.nav-lesson-h)") ?? nav.querySelector<HTMLElement>("a.on");
      if (head) nav.scrollTop = head.offsetTop - 12;
      if (!on) return;
      if (on.offsetTop + on.offsetHeight > nav.scrollTop + nav.clientHeight)
        nav.scrollTop = on.offsetTop + on.offsetHeight - nav.clientHeight + 12;
      else if (on.offsetTop < nav.scrollTop) nav.scrollTop = on.offsetTop - 12;
    });
    return () => cancelAnimationFrame(id);
  }, [pathname, openId, user]);

  const q = (href: string) => (courseId ? `${href}?course=${courseId}` : href);
  const navLink = (href: string, icon: string, label: string, cnt?: string) => {
    const path = href.split("?")[0];
    // course pages match exactly, so the intro isn't lit on the other course pages
    const on = pathname === path || (path !== "/" && !path.startsWith("/courses/") && pathname.startsWith(path));
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
          href={q(`/lesson/${m.id}/overview`)}
          className={cn("nav-lesson-h", open && "on")}
          aria-expanded={open}
          onClick={headerClick(m.id, openId, setOpenId)}
        >
          <span className="ic"><LessonIcon m={m} size={15} /></span>
          <span>{m.title[lang]}</span>
          <span className="cnt">{d}/{m.terms.length}</span>
        </Link>
        <div className="nav-subs">
          <Link href={q(`/lesson/${m.id}/overview`)} className={cn(here && sub === "overview" && "on")}>
            {t("overview")}
          </Link>
          {m.terms.map((tm, i) =>
            // the topic you are on always stays, even when expert topics are hidden
            hideExpert && tm.lvl === "E" && !(here && activeTerm === i) ? null : (
              <Link
                key={i}
                href={q(`/lesson/${m.id}/${i}`)}
                className={cn(here && activeTerm === i && "on", done.has(termKey(m, i)) && "done")}
              >
                {tm.t[lang]}
                {tm.lvl === "E" ? <span className="xbadge ms-1.5">{t("expert")}</span> : null}
              </Link>
            ),
          )}
          <Link href={q(`/lesson/${m.id}/summary`)} className={cn(here && sub === "summary" && "on")}>
            {t("summary")}
          </Link>
          <Link href={q(`/lesson/${m.id}/build`)} className={cn(here && sub === "build" && "on")}>
            {t("build")}
          </Link>
          {QUIZ[m.id] ? (
            <Link href={q(`/lesson/${m.id}/quiz`)} className={cn(here && sub === "quiz" && "on")}>
              {t("test")}
            </Link>
          ) : null}
        </div>
      </div>
    );
  };

  const ids = PATHS.find((p) => p.id === courseId)?.mods ?? [];
  const mods = ids
    .filter((id) => user || isPreviewModule(id))
    .map((id) => MODULES.find((m) => m.id === id))
    .filter((m): m is Module => !!m);
  const finished = mods.filter((m) => m.id !== activeLesson && m.terms.every((_, i) => done.has(termKey(m, i))));
  const lessons = (hideDone ? mods.filter((m) => !finished.includes(m)) : mods).map(lesson);
  const arches = courseId ? archesFor(courseId) : [];
  const expertN = mods.reduce((n, m) => n + m.terms.filter((tm) => tm.lvl === "E").length, 0);

  return (
    <nav
      ref={navRef}
      className="side"
      onClick={(e) => {
        if (!user) {
          closeOnMobile();
          return;
        }
        if ((e.target as HTMLElement).closest(".nav-lesson-h")) return;
        closeOnMobile();
      }}
    >
      <div className="nav-top">
        <h3 id="navTitle">{t("lessons")}</h3>
        {/* desktop only: folds the menu to a thin strip; phones use the header's ☰ instead */}
        <button
          type="button"
          className="nav-fold"
          title={t("lessons")}
          aria-label={t("lessons")}
          onClick={(e) => {
            e.stopPropagation();
            const on = document.body.classList.toggle("nav-collapsed");
            try {
              localStorage.setItem("v2c.nav", on ? "1" : "0");
            } catch {}
          }}
        >
          «
        </button>
      </div>
      <div id="nav">
        {finished.length ? (
          <button type="button" className="nav-hide" aria-pressed={hideDone}
            // keeps the phone sheet open: the nav's own click handler closes it
            onClick={(e) => {
              e.stopPropagation();
              flipHideDone();
            }}
          >
            {t(hideDone ? "showDone" : "hideDone")} ({finished.length})
          </button>
        ) : null}
        {expertN ? (
          <button type="button" className="nav-hide" aria-pressed={hideExpert}
            onClick={(e) => {
              e.stopPropagation();
              toggleHideExpert();
            }}
          >
            {t(hideExpert ? "showExpert" : "hideExpert")} ({expertN})
          </button>
        ) : null}
        {courseId ? navLink(`/courses/${courseId}`, "🚩", t("courseIntro")) : null}
        {lessons}
        {user && courseId ? (
          <>
            <Separator className="my-2 mx-1.5" />
            {navLink(q("/project"), "🛠", t("buildTrack"), `${ids.filter((id) => buildFinished(ticked, id)).length}/${ids.length}`)}
            {arches.length ? (
              <div className={cn("nav-lesson", openId === "architectures" && "open")}>
                <Link
                  href={q("/architectures")}
                  className={cn("nav-lesson-h", openId === "architectures" && "on")}
                  aria-expanded={openId === "architectures"}
                  onClick={headerClick("architectures", openId, setOpenId)}
                >
                  <span className="ic">{ARCHITECTURES.icon}</span>
                  <span>{ARCHITECTURES.title[lang]}</span>
                  <span className="cnt">{arches.length}</span>
                </Link>
                <div className="nav-subs">
                  {arches.map((a) => (
                    <Link
                      key={a.id}
                      href={`/architectures/${a.id}?course=${courseId}`}
                      className={cn(pathname === `/architectures/${a.id}` && "on")}
                    >
                      {a.title[lang]}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
            {courseId === "advanced" && CHECKLIST?.id
              ? navLink(q("/checklist"), CHECKLIST.icon, CHECKLIST.title[lang])
              : null}
            {navLink(q("/glossary"), "☰", t("glossary"))}
            {navLink(q("/review"), "🗐", t("review"))}
          </>
        ) : null}
        {!user ? (
          <Button variant="brand" className="m-1.5 w-[calc(100%-12px)]" nativeButton={false} render={<Link href="/courses" />}>
            {t("unlock")}
          </Button>
        ) : null}
      </div>
    </nav>
  );
}
