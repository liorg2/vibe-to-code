/**
 * Homepage Pac-Man: eat Advanced course term titles.
 * Arrow keys / WASD / on-screen pads. Canvas only — no deps.
 */
"use client";

import { useEffect, useRef, useState } from "react";
import { useApp } from "./Providers";
import { pacmanTerms } from "@/lib/pacman-terms";

// 0 open, 1 wall — mini maze (19×13)
const MAZE = [
  "1111111111111111111",
  "1000000010000000001",
  "1011111010111110101",
  "1000000000000000001",
  "1011011111110110101",
  "1001000000000010001",
  "1111011010110110111",
  "0000010000100001000",
  "1111011111110110111",
  "1000000000000000001",
  "1011111010111110101",
  "1000000010000000001",
  "1111111111111111111",
];
const ROWS = MAZE.length;
const COLS = MAZE[0].length;
const CELL = 28;

type Dir = { x: number; y: number };
const DIRS: Record<string, Dir> = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  w: { x: 0, y: -1 },
  s: { x: 0, y: 1 },
  a: { x: -1, y: 0 },
  d: { x: 1, y: 0 },
};

type Pellet = { c: number; r: number; label: string; eaten: boolean };

type Game = {
  pc: number;
  pr: number;
  dir: Dir;
  next: Dir;
  mouth: number;
  gc: number;
  gr: number;
  gdir: Dir;
  pellets: Pellet[];
  tick: number;
  total: number;
  alive: boolean;
  won: boolean;
};

function openCells(): { c: number; r: number }[] {
  const out: { c: number; r: number }[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (MAZE[r][c] === "0") out.push({ c, r });
    }
  }
  return out;
}

function isWall(c: number, r: number): boolean {
  if (r < 0 || r >= ROWS) return true;
  if (c < 0 || c >= COLS) return r !== 7;
  return MAZE[r][c] === "1";
}

function wrap(c: number, r: number): { c: number; r: number } {
  if (r === 7 && c < 0) return { c: COLS - 1, r };
  if (r === 7 && c >= COLS) return { c: 0, r };
  return { c, r };
}

function buildGame(labels: string[]): Game {
  const cells = openCells().filter(({ c, r }) => !(c === 1 && r === 1) && !(c === COLS - 2 && r === ROWS - 2));
  const step = Math.max(1, Math.floor(cells.length / Math.max(labels.length, 1)));
  const pellets: Pellet[] = [];
  for (let i = 0; i < labels.length && i * step < cells.length; i++) {
    const { c, r } = cells[i * step];
    pellets.push({ c, r, label: labels[i], eaten: false });
  }
  return {
    pc: 1,
    pr: 1,
    dir: { x: 1, y: 0 },
    next: { x: 1, y: 0 },
    mouth: 0,
    gc: COLS - 2,
    gr: ROWS - 2,
    gdir: { x: -1, y: 0 },
    pellets,
    tick: 0,
    total: pellets.length,
    alive: true,
    won: false,
  };
}

export function PacManGame() {
  const { lang } = useApp();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const game = useRef<Game>(buildGame(pacmanTerms(lang)));
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(game.current.total);
  const [status, setStatus] = useState<"play" | "win" | "lose">("play");

  const copy =
    lang === "he"
      ? { title: "Pac-Man של מושגים", hint: "חיצים / WASD — אכול מושגי Advanced", again: "שוב", win: "אכלת את כולם!", lose: "הרוח תפס אותך" }
      : { title: "Term Pac-Man", hint: "Arrows / WASD — eat Advanced course terms", again: "Play again", win: "You ate them all!", lose: "Ghost got you" };

  const reset = () => {
    game.current = buildGame(pacmanTerms(lang));
    setScore(0);
    setTotal(game.current.total);
    setStatus("play");
  };

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const d = DIRS[e.key] ?? DIRS[e.key.toLowerCase()];
      if (!d) return;
      e.preventDefault();
      game.current.next = d;
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let last = 0;
    const MOVE_MS = 140;

    const css = () => getComputedStyle(canvas);
    const tryTurn = (c: number, r: number, d: Dir) => !isWall(c + d.x, r + d.y);

    const stepEntity = (c: number, r: number, dir: Dir, next?: Dir) => {
      let d = dir;
      if (next && tryTurn(c, r, next)) d = next;
      else if (!tryTurn(c, r, d)) return { c, r, dir: d };
      const w = wrap(c + d.x, r + d.y);
      if (isWall(w.c, w.r)) return { c, r, dir: d };
      return { c: w.c, r: w.r, dir: d };
    };

    const ghostStep = (s: Game) => {
      const opts: Dir[] = [
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: -1 },
      ].filter((d) => tryTurn(s.gc, s.gr, d) && !(d.x === -s.gdir.x && d.y === -s.gdir.y));
      if (!opts.length) {
        s.gdir = { x: -s.gdir.x, y: -s.gdir.y };
        return;
      }
      opts.sort((a, b) => {
        const da = Math.abs(s.gc + a.x - s.pc) + Math.abs(s.gr + a.y - s.pr);
        const db = Math.abs(s.gc + b.x - s.pc) + Math.abs(s.gr + b.y - s.pr);
        return da - db;
      });
      const pick = Math.random() < 0.7 ? opts[0] : opts[Math.floor(Math.random() * opts.length)];
      const moved = stepEntity(s.gc, s.gr, pick);
      s.gc = moved.c;
      s.gr = moved.r;
      s.gdir = moved.dir;
    };

    const draw = (t: number) => {
      const s = game.current;
      if (!last) last = t;
      if (s.alive && !s.won && t - last >= MOVE_MS) {
        last = t;
        s.tick++;
        s.mouth = (s.mouth + 1) % 4;
        const moved = stepEntity(s.pc, s.pr, s.dir, s.next);
        s.pc = moved.c;
        s.pr = moved.r;
        s.dir = moved.dir;
        ghostStep(s);

        for (const p of s.pellets) {
          if (!p.eaten && p.c === s.pc && p.r === s.pr) {
            p.eaten = true;
            const left = s.pellets.filter((x) => !x.eaten).length;
            setScore(s.total - left);
            if (left === 0) {
              s.won = true;
              setStatus("win");
            }
          }
        }
        if (s.gc === s.pc && s.gr === s.pr) {
          s.alive = false;
          setStatus("lose");
        }
      }

      const w = COLS * CELL;
      const h = ROWS * CELL;
      const sty = css();
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = sty.getPropertyValue("--pc-board").trim() || "#0e1017";
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = sty.getPropertyValue("--pc-wall").trim() || "#6c5ce7";
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          if (MAZE[r][c] !== "1") continue;
          ctx.beginPath();
          ctx.roundRect(c * CELL + 2, r * CELL + 2, CELL - 4, CELL - 4, 4);
          ctx.fill();
        }
      }

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `600 8px ${getComputedStyle(document.body).fontFamily}`;
      for (const p of s.pellets) {
        if (p.eaten) continue;
        const x = p.c * CELL + CELL / 2;
        const y = p.r * CELL + CELL / 2;
        ctx.fillStyle = sty.getPropertyValue("--pc-pellet").trim() || "#00d2b8";
        ctx.beginPath();
        ctx.arc(x, y - 4, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = sty.getPropertyValue("--pc-label").trim() || "#9aa1b4";
        ctx.fillText(p.label, x, y + 6, CELL - 2);
      }

      {
        const x = s.gc * CELL + CELL / 2;
        const y = s.gr * CELL + CELL / 2;
        ctx.fillStyle = "#ff5c72";
        ctx.beginPath();
        ctx.arc(x, y - 2, 9, Math.PI, 0);
        ctx.lineTo(x + 9, y + 8);
        ctx.lineTo(x + 5, y + 4);
        ctx.lineTo(x, y + 8);
        ctx.lineTo(x - 5, y + 4);
        ctx.lineTo(x - 9, y + 8);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(x - 3, y - 3, 2.2, 0, Math.PI * 2);
        ctx.arc(x + 3, y - 3, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      {
        const x = s.pc * CELL + CELL / 2;
        const y = s.pr * CELL + CELL / 2;
        const open = s.mouth < 2 ? 0.35 : 0.08;
        let start = open;
        let end = Math.PI * 2 - open;
        if (s.dir.x === -1) {
          start = Math.PI + open;
          end = Math.PI - open;
        } else if (s.dir.y === -1) {
          start = -Math.PI / 2 + open;
          end = -Math.PI / 2 - open;
        } else if (s.dir.y === 1) {
          start = Math.PI / 2 + open;
          end = Math.PI / 2 - open;
        }
        ctx.fillStyle = "#ffb020";
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.arc(x, y, 10, start, end, false);
        ctx.closePath();
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  const nudge = (key: string) => {
    const d = DIRS[key];
    if (d) game.current.next = d;
  };

  return (
    <section className="pacman" aria-label={copy.title}>
      <div className="pacman-head">
        <h3>{copy.title}</h3>
        <p>{copy.hint}</p>
        <div className="pacman-score" aria-live="polite">
          {score}/{total}
          {status === "win" ? ` · ${copy.win}` : status === "lose" ? ` · ${copy.lose}` : null}
        </div>
      </div>
      <div className="pacman-stage">
        <canvas
          ref={canvasRef}
          width={COLS * CELL}
          height={ROWS * CELL}
          className="pacman-canvas"
          role="img"
          aria-label={copy.title}
        />
        {status !== "play" && (
          <button type="button" className="pacman-again" onClick={reset}>
            {copy.again}
          </button>
        )}
      </div>
      <div className="pacman-pads" aria-hidden="true">
        <button type="button" onClick={() => nudge("ArrowUp")}>
          ↑
        </button>
        <div className="pacman-pads-mid">
          <button type="button" onClick={() => nudge("ArrowLeft")}>
            ←
          </button>
          <button type="button" onClick={() => nudge("ArrowDown")}>
            ↓
          </button>
          <button type="button" onClick={() => nudge("ArrowRight")}>
            →
          </button>
        </div>
      </div>
    </section>
  );
}
