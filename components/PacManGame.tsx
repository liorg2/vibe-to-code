/**
 * Decorative Pac-Man around the two homepage course cards.
 * Words sit around each course name and around each card. He wanders and eats them.
 */
"use client";

import { useEffect, useRef } from "react";
import { pacmanWords } from "@/lib/pacman-terms";

const DOTS = 10;
const SIZE = 32;

type Spot = { x: number; y: number };
type Dot = { word: string; x: number; y: number; eaten: boolean };

function pick(pool: string[], used: Set<string>): string {
  const free = pool.filter((w) => !used.has(w));
  const bag = free.length ? free : pool;
  return bag[Math.floor(Math.random() * bag.length)] ?? "";
}

/** Spots that ring each course title and each card, plus the gap between them. */
function spotsFor(root: HTMLElement): Spot[] {
  const board = root.parentElement;
  if (!board) return [];
  const b = root.getBoundingClientRect();
  const cards = [...board.querySelectorAll<HTMLElement>(".course")];
  const raw: Spot[] = [];
  const push = (x: number, y: number) => {
    if (x < 0 || y < 0 || x > b.width - 70 || y > b.height - 14) return;
    for (const c of cards) {
      const r = c.getBoundingClientRect();
      const left = r.left - b.left;
      const top = r.top - b.top;
      if (x > left + 6 && x < left + r.width - 64 && y > top + 4 && y < top + r.height - 10) return;
    }
    raw.push({ x, y });
  };

  for (const c of cards) {
    const r = c.getBoundingClientRect();
    const x = r.left - b.left;
    const y = r.top - b.top;
    const w = r.width;
    const h = r.height;
    const title = c.querySelector("h4");
    const tr = title?.getBoundingClientRect();
    if (tr) {
      const tx = tr.left - b.left;
      const tw = Math.max(tr.width, 80);
      push(tx, y - 18);
      push(tx + tw * 0.42, y - 18);
      push(tx + tw - 56, y - 18);
    }
    push(x + 4, y - 18);
    push(x + w - 78, y - 18);
    push(x - 2, y + 28);
    push(x - 2, y + h * 0.42);
    push(x - 2, y + h - 36);
    push(x + w - 62, y + 36);
    push(x + w - 62, y + h * 0.5);
    push(x + w - 62, y + h - 36);
    push(x + 10, y + h + 4);
    push(x + w * 0.38, y + h + 4);
    push(x + w - 86, y + h + 4);
  }

  if (cards.length === 2) {
    const a = cards[0].getBoundingClientRect();
    const c = cards[1].getBoundingClientRect();
    if (a.right <= c.left + 4) {
      const x = a.right - b.left + 6;
      for (let i = 0; i < 4; i++) push(x, a.top - b.top + 20 + i * ((a.height - 30) / 3));
    } else if (a.bottom <= c.top + 4) {
      const y = a.bottom - b.top + 6;
      push(24, y);
      push(b.width * 0.4, y);
      push(b.width - 110, y);
    }
  }

  const out: Spot[] = [];
  for (const s of raw) {
    if (out.every((o) => Math.hypot(o.x - s.x, o.y - s.y) > 78)) out.push(s);
  }
  return out;
}

export function PacManLane() {
  const lane = useRef<HTMLDivElement>(null);
  const man = useRef<HTMLDivElement>(null);
  const dots = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const root = lane.current;
    const pc = man.current;
    if (!root || !pc) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const pool = pacmanWords();
    if (!pool.length) return;

    const state = {
      x: 8,
      y: 8,
      aim: 0,
      spots: [] as Spot[],
      dots: [] as Dot[],
    };

    const used = () => new Set(state.dots.filter((d) => !d.eaten).map((d) => d.word));

    const layout = () => {
      state.spots = spotsFor(root);
      if (!state.dots.length) {
        const chosen = state.spots.slice(0, DOTS);
        state.dots = chosen.map((s) => ({ word: pick(pool, used()), x: s.x, y: s.y, eaten: false }));
        state.x = chosen[0]?.x ?? 8;
        state.y = chosen[0]?.y ?? 8;
        state.aim = chosen.length > 1 ? 1 : 0;
        return;
      }
      state.dots.forEach((d, i) => {
        const s = state.spots[i % Math.max(state.spots.length, 1)];
        if (!s || d.eaten) return;
        d.x = s.x;
        d.y = s.y;
      });
    };

    layout();
    const ro = new ResizeObserver(layout);
    if (root.parentElement) ro.observe(root.parentElement);

    let raf = 0;
    let last = 0;
    const timers: number[] = [];

    const eat = (i: number) => {
      const hit = state.dots[i];
      if (!hit || hit.eaten) return;
      hit.eaten = true;
      dots.current[i]?.classList.add("eaten");
      if (state.aim === i) {
        const n = state.dots.findIndex((d) => !d.eaten);
        if (n >= 0) state.aim = n;
      }
      timers.push(window.setTimeout(() => {
        const free = state.spots.filter((s) => state.dots.every((d) => d.eaten || Math.hypot(d.x - s.x, d.y - s.y) > 40));
        const next = free[Math.floor(Math.random() * free.length)] ?? state.spots[Math.floor(Math.random() * state.spots.length)];
        if (next) {
          hit.x = next.x;
          hit.y = next.y;
        }
        hit.word = pick(pool, used());
        hit.eaten = false;
        const el = dots.current[i];
        if (el) {
          el.textContent = hit.word;
          el.style.left = `${hit.x}px`;
          el.style.top = `${hit.y}px`;
          el.classList.remove("eaten");
        }
      }, 240));
    };

    const frame = (t: number) => {
      if (!state.dots.length) layout();
      const dt = last ? Math.min(32, t - last) : 16;
      last = t;

      state.dots.forEach((d, i) => {
        const el = dots.current[i];
        if (!el || d.eaten) return;
        el.textContent = d.word;
        el.style.left = `${d.x}px`;
        el.style.top = `${d.y}px`;
      });

      if (!state.dots[state.aim] || state.dots[state.aim].eaten) {
        const n = state.dots.findIndex((d) => !d.eaten);
        if (n >= 0) state.aim = n;
      }
      const target = state.dots[state.aim];
      const pill = dots.current[state.aim];
      if (target && !target.eaten) {
        const tx = target.x + (pill?.offsetWidth ?? 36) / 2 - SIZE / 2;
        const ty = target.y + (pill?.offsetHeight ?? 18) / 2 - SIZE / 2;
        const dx = tx - state.x;
        const dy = ty - state.y;
        const dist = Math.hypot(dx, dy) || 1;
        const step = Math.min(dist, 0.11 * dt);
        state.x += (dx / dist) * step;
        state.y += (dy / dist) * step;
        pc.style.transform = `translate(${state.x}px, ${state.y}px) rotate(${(Math.atan2(dy, dx) * 180) / Math.PI}deg)`;
      }

      const box = pc.getBoundingClientRect();
      const mx = box.left + box.width / 2;
      const my = box.top + box.height / 2;
      state.dots.forEach((d, i) => {
        if (d.eaten) return;
        const el = dots.current[i];
        if (!el) return;
        const r = el.getBoundingClientRect();
        const cx = Math.max(r.left, Math.min(mx, r.right));
        const cy = Math.max(r.top, Math.min(my, r.bottom));
        if (Math.hypot(mx - cx, my - cy) < 6) eat(i);
      });

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  return (
    <div className="pac-board" ref={lane} aria-hidden="true">
      {Array.from({ length: DOTS }, (_, i) => (
        <span key={i} className="pac-word" ref={(el) => { dots.current[i] = el; }} />
      ))}
      <div className="pac-man" ref={man}>
        <svg viewBox="0 0 32 32" width={SIZE} height={SIZE}>
          <path fill="#ffb020" d="M16 16 L30 6 A14 14 0 1 0 30 26 Z">
            <animate
              attributeName="d"
              dur="0.28s"
              repeatCount="indefinite"
              values="M16 16 L30 5 A14 14 0 1 0 30 27 Z;M16 16 L30 13 A14 14 0 1 0 30 19 Z;M16 16 L30 5 A14 14 0 1 0 30 27 Z"
            />
          </path>
        </svg>
      </div>
    </div>
  );
}
