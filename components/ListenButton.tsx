"use client";

import { useEffect, useRef, useState } from "react";
import { useApp } from "@/components/Providers";

// ponytail: hardcoded like SlideMode's VIDEO_LABEL, move to course.json's UI table if more strings join it.
const LABEL = { listen: { en: "Listen", he: "האזנה" }, stop: { en: "Stop", he: "עצירה" } };

// what gets read: headings and prose, never code, buttons or prompt boxes
const READ = "h2, h3, .lede, .cal b, .cal p, .body p, .body li";

/**
 * Reads the visible slide aloud with the browser's own voice. It reads what's on screen,
 * so the Full / TL;DR tab decides what you hear. One utterance per block: Chrome cuts
 * off a single long utterance after ~15s.
 */
export function ListenButton() {
  const { lang } = useApp();
  const [on, setOn] = useState(false);
  const [ok, setOk] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOk("speechSynthesis" in window);
    return () => window.speechSynthesis?.cancel(); // stop when leaving the slide
  }, []);

  if (!ok) return null;

  const toggle = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
    if (on) return setOn(false);
    const slide = ref.current?.closest(".slide");
    const blocks = [...(slide?.querySelectorAll<HTMLElement>(READ) ?? [])]
      .filter((el) => el.offsetParent !== null) // hidden by the current tab
      .map((el) => el.innerText.trim())
      .filter(Boolean);
    if (!blocks.length) return;
    const voiceLang = lang === "he" ? "he-IL" : "en-US";
    blocks.forEach((text, i) => {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = voiceLang;
      if (i === blocks.length - 1) u.onend = () => setOn(false);
      synth.speak(u);
    });
    setOn(true);
  };

  return (
    <button ref={ref} type="button" className="listen" aria-pressed={on} onClick={toggle}>
      {on ? "■" : "▶"} {LABEL[on ? "stop" : "listen"][lang]}
    </button>
  );
}
