"use client";

import Link from "@/components/Link";
import { useRouter } from "next/navigation";
import { LANGS, withLang } from "@/lib/lang";
import { useState } from "react";
import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import { ProgressIndicator, ProgressTrack } from "@/components/ui/progress";
import { useApp } from "./Providers";
import { useSignOut } from "./AuthButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { MODULES, totalTerms } from "@/lib/course";
import { cn } from "@/lib/utils";
import type { Lang } from "@/lib/types";
import { CircleUser } from "lucide-react";
import { firebaseReady } from "@/lib/firebase/client";

export function Header({ showHero, showNav }: { showHero: boolean; showNav: boolean }) {
  const { lang, setLang, toggleTheme, t, progressPct } = useApp();
  const { user, onClick: onSignOut } = useSignOut();
  const [q, setQ] = useState("");
  const router = useRouter();
  const onSearch = (value: string) => {
    setQ(value);
    if (!value.trim()) return;
    router.push(withLang(lang, `/lesson?${new URLSearchParams({ q: value.trim() }).toString()}`));
  };

  return (
    <>
      <header>
        <div className="bar">
          {showNav && (
            <Button
              variant="outline"
              id="navtoggle"
              type="button"
              title={t("lessons")}
              aria-label={t("lessons")}
              onClick={() => document.body.classList.toggle("nav-toggled")}
            >
              ☰
            </Button>
          )}
          <Link className="logo" href="/">
            <img className="mark" src="/icon.svg" alt="" width={28} height={28} />
            <span id="brand">{t("brand")}</span>
          </Link>
          <div className="spacer" />
          <Input
            id="search"
            placeholder={t("search")}
            value={q}
            onChange={(e) => onSearch(e.target.value)}
            autoComplete="off"
            className="w-[200px]"
          />
          <Popover>
            <PopoverTrigger
              render={
                <Button variant="outline" size="icon" type="button" aria-label="Account" title="Account" />
              }
            >
              <CircleUser className="size-4" />
            </PopoverTrigger>
            <PopoverContent align={lang === "he" ? "start" : "end"} className="flex flex-col gap-1">
              <span id="who" className="px-2 py-1.5 text-sm text-[var(--tx2)]">
                {firebaseReady && user ? user.displayName || user.email || "" : "Not signed in"}
              </span>
              {LANGS.length > 1 && (
              <ToggleGroup
                className="seg"
                variant="outline"
                spacing={0}
                value={[lang]}
                onValueChange={(vals) => vals[0] && setLang(vals[0] as Lang)}
                aria-label="Language"
              >
                {LANGS.map((l) => (
                  <ToggleGroupItem
                    key={l}
                    value={l}
                    data-lang={l}
                    aria-pressed={lang === l}
                    className="font-semibold text-[var(--tx2)] data-pressed:bg-[var(--acc)] data-pressed:text-white"
                  >
                    {l === "en" ? "EN" : "עב"}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
              )}
              <Button variant="ghost" id="theme" type="button" onClick={toggleTheme} className="justify-start">
                ◐ Theme
              </Button>
              {firebaseReady && (
                <Button variant="ghost" type="button" onClick={onSignOut} className="justify-start">
                  {user ? "Sign out" : "Sign in"}
                </Button>
              )}
            </PopoverContent>
          </Popover>
        </div>
        <ProgressPrimitive.Root value={progressPct} className={cn("progbar", "block h-[3px]")}>
          <ProgressTrack className="h-[3px] rounded-none bg-[var(--line)]">
            <ProgressIndicator id="pbar" className="bg-[var(--grad)]" />
          </ProgressTrack>
        </ProgressPrimitive.Root>
      </header>

      {showHero && (
        <div className="hero">
          <div className="pill" id="intro">
            {MODULES.length} {t("lessons")} · {totalTerms()} {t("terms")} · {t("noCode")}
          </div>
          <h1 id="h1">
            {lang === "he" ? (
              <>מ-<span>Vibe</span> למפתח</>
            ) : (
              <>From <span>vibe</span> to developer</>
            )}
          </h1>
          <p id="tagline">{t("tagline")}</p>
          <div className="cta">
            <Button
              variant="brand"
              size="lg"
              id="startBtn"
              nativeButton={false}
              render={<Link href={`/lesson/${MODULES[0].id}/overview`} />}
            >
              {t("start")}
            </Button>
          </div>
          <p id="heroNote" style={{ fontSize: 15, marginTop: 26 }}>{t("heroNote")}</p>
        </div>
      )}
    </>
  );
}
