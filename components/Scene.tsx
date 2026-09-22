"use client";

import { useEffect, useRef, useState } from "react";
import type { Beat, Scene as SceneT } from "@/lib/scenes/types";
import { useApp } from "./Providers";

const BEAT_MS = 2800;

function tone(b: Beat): string {
  if (b.tone) return b.tone;
  if (!b.status) return "";
  if (b.status === 429) return "warn";
  if (b.status >= 400) return "err";
  if (b.status >= 300) return "info";
  return "ok";
}

/**
 * A story told in beats: a packet leaves one actor, lands on another, and the request log below
 * fills up like a Network tab. Plays when on screen, pauses on click, steps with the arrows.
 */
export function Scene({ scene }: { scene: SceneT }) {
  const { lang, t } = useApp();
  const [beat, setBeat] = useState(0);
  const [loop, setLoop] = useState(0);
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLElement>(null);
  // once the learner pauses or steps, scrolling back into view must not restart it
  const held = useRef(false);
  const n = scene.beats.length;
  const idx = new Map(scene.actors.map((a, i) => [a.id, i]));
  const pos = (id: string) => (scene.actors.length > 1 ? (idx.get(id) ?? 0) / (scene.actors.length - 1) : 0.5);

  // start only when the learner can see it; reduced motion means they drive it by hand
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !ref.current) return;
    const io = new IntersectionObserver(([e]) => setPlaying(e.isIntersecting && !held.current), { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    // the last beat holds a little longer so the ending lands before the replay
    const id = setTimeout(() => {
      if (beat < n - 1) setBeat(beat + 1);
      else {
        setBeat(0);
        setLoop((l) => l + 1);
      }
    }, beat === n - 1 ? BEAT_MS * 2 : BEAT_MS);
    return () => clearTimeout(id);
  }, [playing, beat, n]);

  const go = (b: number) => {
    held.current = true;
    setPlaying(false);
    setBeat((b + n) % n);
  };
  const b = scene.beats[beat];
  const inPlace = b.from === b.to;
  const log = scene.beats
    .map((x, i) => ({ x, i }))
    .slice(0, beat + 1)
    .filter(({ x }) => x.from !== x.to)
    .slice(-4);
  const name = (id: string) => scene.actors[idx.get(id) ?? 0]?.label[lang];

  return (
    <figure className="scene" ref={ref}>
      <figcaption className="sc-cap">{scene.cap[lang]}</figcaption>
      <div className="sc-stage" aria-hidden="true">
        <div className="sc-actors">
          {scene.actors.map((a) => (
            <div key={a.id} className={`sc-actor${a.id === b.from || a.id === b.to ? " on" : ""}`}>
              <span className="ic">{a.icon}</span>
              <span>{a.label[lang]}</span>
            </div>
          ))}
        </div>
        <div className="sc-lane">
          <div
            key={`${loop}-${beat}`}
            className={`sc-pkt ${tone(b)}${inPlace ? " here" : ""}`}
            style={{ ["--p0" as string]: pos(b.from), ["--p1" as string]: pos(b.to) }}
          >
            <b>
              {b.label}
              {b.status ? <em>{b.status}</em> : null}
            </b>
            {b.body?.length ? <pre dir="ltr">{b.body.join("\n")}</pre> : null}
          </div>
        </div>
      </div>
      <p className="sc-say" aria-hidden="true">
        <span className="no">{beat + 1}/{n}</span> {b.say[lang]}
      </p>
      <div className="sc-foot">
        <ol className="sc-log" aria-hidden="true" dir="ltr">
          {log.map(({ x, i }) => (
            <li key={`${loop}-${i}`} className={tone(x)}>
              <span className="who">{name(x.from)} → {name(x.to)}</span>
              <span className="what">{x.label}</span>
              <span className="st">{x.status ?? ""}</span>
            </li>
          ))}
        </ol>
        <div className="sc-ctl">
          <button type="button" className="dir" onClick={() => go(beat - 1)} aria-label={t("scenePrev")}>‹</button>
          <button type="button" onClick={() => {
            held.current = playing;
            setPlaying(!playing);
          }} aria-label={playing ? t("scenePause") : t("scenePlay")}>
            {playing ? "❚❚" : "▶"}
          </button>
          <button type="button" className="dir" onClick={() => go(beat + 1)} aria-label={t("sceneNext")}>›</button>
        </div>
      </div>
      {/* the whole story, once, for screen readers — the animation above is decoration */}
      <ol className="sr-only">
        {scene.beats.map((x, i) => (
          <li key={i}>{x.say[lang]}</li>
        ))}
      </ol>
    </figure>
  );
}
