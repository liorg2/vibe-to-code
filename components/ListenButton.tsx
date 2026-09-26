"use client";

import { Square, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/components/Providers";
import { parseLangFromPath, withLang } from "@/lib/lang";

// ponytail: hardcoded like SlideMode's VIDEO_LABEL, move to course.json's UI table if more strings join it.
const LABEL = { listen: { en: "Listen", he: "האזנה" }, stop: { en: "Stop", he: "עצירה" }, auto: { en: "Auto-next", he: "המשך אוטומטי" } };

// auto-next preference survives reloads; the hand-off flag only lives until the next slide mounts
const AUTO_KEY = "vibe.listen.auto";
const GO_KEY = "vibe.listen.go";
// Page-wide run id, bumped on every start/stop. The speech queue is global too, and Next
// unmounts the old slide *after* the new one mounted, so each slide only stops its own run.
let active = 0;

const store = (s: () => Storage, k: string, v?: string | null) => {
  try {
    if (v === undefined) return s().getItem(k);
    if (v === null) s().removeItem(k);
    else s().setItem(k, v);
  } catch {}
  return null;
};

// what gets read: headings and prose, never code, buttons or prompt boxes
const READ = "h2, h3, .lede, .cal b, .cal p, .body p, .body li";

// The browser's default voice is usually the robotic one (Windows: "Microsoft David").
// Prefer the neural ones: Edge "…Online (Natural)", Chrome "Google …", Apple "Premium"/"Enhanced".
const GOOD = [/natural/i, /google/i, /premium|enhanced/i];
function bestVoice(lang: string) {
  const mine = window.speechSynthesis.getVoices().filter((v) => v.lang.startsWith(lang));
  for (const re of GOOD) {
    const v = mine.find((x) => re.test(x.name));
    if (v) return v;
  }
  return mine[0];
}

/**
 * Reads the visible slide aloud with the browser's own voice. It reads what's on screen,
 * so the Full / TL;DR tab decides what you hear. One utterance per block: Chrome cuts
 * off a single long utterance after ~15s.
 * Auto-next: when the slide finishes, go to `next` and keep reading there. That's a
 * client-side navigation, so the click that started it still counts as the user's gesture.
 */
export function ListenButton({ next }: { next?: string }) {
  const { lang } = useApp();
  const router = useRouter();
  const pathLang = parseLangFromPath(usePathname());
  const [on, setOn] = useState(false);
  const [auto, setAuto] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const mine = useRef(-1); // this slide's run id, if it started one

  const stop = () => {
    active++;
    window.speechSynthesis.cancel();
    setOn(false);
  };

  const start = () => {
    stop();
    const slide = ref.current?.closest(".slide");
    const blocks = [...(slide?.querySelectorAll<HTMLElement>(READ) ?? [])]
      .filter((el) => el.offsetParent !== null) // hidden by the current tab
      .map((el) => el.innerText.trim())
      .filter(Boolean);
    if (!blocks.length) return;
    const me = (mine.current = active);
    const voiceLang = lang === "he" ? "he-IL" : "en-US";
    const voice = bestVoice(voiceLang);
    blocks.forEach((text, i) => {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = voiceLang;
      if (voice) u.voice = voice;
      // an auto-next hand-off is done once the voice actually starts (not on mount:
      // Strict Mode mounts twice and the first mount's cleanup cancels the speech)
      if (i === 0) u.onstart = () => store(() => sessionStorage, GO_KEY, null);
      if (i === blocks.length - 1)
        u.onend = () => {
          if (active !== me) return; // stopped or restarted: don't advance
          setOn(false);
          if (next && store(() => localStorage, AUTO_KEY) === "1") {
            store(() => sessionStorage, GO_KEY, "1");
            router.push(withLang(pathLang, next));
          }
        };
      window.speechSynthesis.speak(u);
    });
    setOn(true);
  };

  useEffect(() => {
    setAuto(store(() => localStorage, AUTO_KEY) === "1");
    if (store(() => sessionStorage, GO_KEY) === "1") start();
    return () => {
      if (mine.current !== active) return; // a newer slide owns the voice now
      active++;
      window.speechSynthesis.cancel(); // stop when leaving the slide
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span className="listen-bar">
      <button ref={ref} type="button" className="listen" aria-pressed={on} onClick={on ? stop : start}>
        {on ? <Square size={12} aria-hidden /> : <Volume2 size={14} aria-hidden />} {LABEL[on ? "stop" : "listen"][lang]}
      </button>
      <label className="listen-auto">
        <input
          type="checkbox"
          checked={auto}
          onChange={(e) => {
            setAuto(e.target.checked);
            store(() => localStorage, AUTO_KEY, e.target.checked ? "1" : null);
          }}
        />
        {LABEL.auto[lang]}
      </label>
    </span>
  );
}
