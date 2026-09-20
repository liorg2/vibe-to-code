"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useApp } from "./Providers";
import { AuthButton } from "./AuthButton";
import { MODULES, totalTerms } from "@/lib/course";
import type { Lang } from "@/lib/types";

export function Header({ showHero }: { showHero: boolean }) {
  const { lang, setLang, toggleTheme, t, progressPct } = useApp();
  const [q, setQ] = useState("");
  const router = useRouter();
  const onSearch = (value: string) => {
    setQ(value);
    if (!value.trim()) return;
    router.push(`/lesson?${new URLSearchParams({ q: value.trim() }).toString()}`);
  };

  return (
    <>
      <header>
        <div className="bar">
          <Link className="logo" href="/">
            <span className="dot">◆</span>
            <span id="brand">{t("brand")}</span>
          </Link>
          <div className="spacer" />
          <input
            id="search"
            placeholder={t("search")}
            value={q}
            onChange={(e) => onSearch(e.target.value)}
            autoComplete="off"
          />
          <div className="seg">
            {(["en", "he"] as Lang[]).map((l) => (
              <button
                key={l}
                type="button"
                data-lang={l}
                aria-pressed={lang === l}
                onClick={() => setLang(l)}
              >
                {l === "en" ? "EN" : "עב"}
              </button>
            ))}
          </div>
          <AuthButton />
          <button className="btn" id="theme" type="button" title="Theme" onClick={toggleTheme}>
            ◐
          </button>
        </div>
        <div className="progbar"><i id="pbar" style={{ width: `${progressPct}%` }} /></div>
      </header>

      {showHero && (
        <div className="hero">
          <div className="pill" id="intro">
            {MODULES.length} {t("lessons")} · {totalTerms()} {t("terms")} · {t("noCode")}
          </div>
          <h1 id="h1">
            {lang === "he" ? (
              <>מ<span>Vibe</span> למפתח</>
            ) : (
              <>From <span>vibe</span> to developer</>
            )}
          </h1>
          <p id="tagline">{t("tagline")}</p>
          <div className="cta">
            <Link className="btn prim big" href={`/lesson/${MODULES[0].id}/0`} id="startBtn">
              {t("start")}
            </Link>
          </div>
          <p id="heroNote" style={{ fontSize: 15, marginTop: 26 }}>{t("heroNote")}</p>
        </div>
      )}
    </>
  );
}
