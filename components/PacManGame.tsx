/**
 * Decorative Pac-Man in the gap between the two course cards.
 * Wanders on its own and eats random course-term words. Not a game.
 */
"use client";

import { useEffect, useRef } from "react";
import { useApp } from "./Providers";
import { pacmanWords } from "@/lib/pacman-terms";

const DOTS = 5;

type Dot = { word: string; x: number; y: number; eaten: boolean };

function pick(pool: string[], used: Set<string>): string {
  const free = pool.filter((w) => !used.has(w));
  const bag = free.length ? free : pool;
  return bag[Math.floor(Math.random() * bag.length)] ?? "";
}

export function PacManLane() {
  const { lang } = useApp();
  const lane = useRef<HTMLDivElement>(null);
  const man = useRef<HTMLDivElement>(null);
  const dots = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const root = lane.current;
    const pc = man.current;
    if (!root || !pc) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const pool = pacmanWords(lang);
    if (!pool.length) return;

    const state = {
      x: 8,
      y: 8,
      vx: 1.1,
      vy: 0.4,
      dots: [] as Dot[],
    };

    const place = (avoid?: { x: number; y: number }) => {
      const w = root.clientWidth;
      const h = root.clientHeight;
      for (let n = 0; n < 12; n++) {
        const x = 8 + Math.random() * Math.max(8, w - 72);
        const y = 8 + Math.random() * Math.max(8, h - 28);
        if (!avoid || Math.hypot(x - avoid.x, y - avoid.y) > 36) return { x, y };
      }
      return { x: 8, y: 8 };
    };

    const used = () => new Set(state.dots.filter((d) => !d.eaten).map((d) => d.word));
    state.dots = Array.from({ length: DOTS }, () => {
      const p = place();
      return { word: pick(pool, used()), ...p, eaten: false };
    });

    let raf = 0;
    let last = 0;
    const turnAt = { t: 0 };
    const timers: number[] = [];

    const frame = (t: number) => {
      const w = root.clientWidth;
      const h = root.clientHeight;
      const dt = last ? Math.min(32, t - last) : 16;
      last = t;

      if (t > turnAt.t) {
        const a = Math.random() * Math.PI * 2;
        const speed = 0.06 + Math.random() * 0.05;
        state.vx = Math.cos(a) * speed;
        state.vy = Math.sin(a) * speed;
        turnAt.t = t + 700 + Math.random() * 1400;
      }

      state.x += state.vx * dt;
      state.y += state.vy * dt;
      if (state.x < 0 || state.x > w - 22) state.vx *= -1;
      if (state.y < 0 || state.y > h - 22) state.vy *= -1;
      state.x = Math.max(0, Math.min(w - 22, state.x));
      state.y = Math.max(0, Math.min(h - 22, state.y));

      const ang = (Math.atan2(state.vy, state.vx) * 180) / Math.PI;
      pc.style.transform = `translate(${state.x}px, ${state.y}px) rotate(${ang}deg)`;

      state.dots.forEach((d, i) => {
        const el = dots.current[i];
        if (!el) return;
        if (!d.eaten && Math.hypot(state.x + 11 - (d.x + 20), state.y + 11 - (d.y + 8)) < 22) {
          d.eaten = true;
          el.classList.add("eaten");
          timers.push(window.setTimeout(() => {
            const p = place({ x: state.x, y: state.y });
            d.x = p.x;
            d.y = p.y;
            d.word = pick(pool, used());
            d.eaten = false;
            el.textContent = d.word;
            el.style.left = `${d.x}px`;
            el.style.top = `${d.y}px`;
            el.classList.remove("eaten");
          }, 280));
        }
        if (!d.eaten) {
          el.textContent = d.word;
          el.style.left = `${d.x}px`;
          el.style.top = `${d.y}px`;
        }
      });

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [lang]);

  return (
    <div className="pac-lane" ref={lane} aria-hidden="true">
      {Array.from({ length: DOTS }, (_, i) => (
        <span key={i} className="pac-word" ref={(el) => { dots.current[i] = el; }} />
      ))}
      <div className="pac-man" ref={man} />
    </div>
  );
}
