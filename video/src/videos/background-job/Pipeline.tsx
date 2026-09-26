import { CheckCircle2, Cog, Inbox, Loader2, Package } from "lucide-react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BOX_H, COLORS, FONT, MONO, STAGE_Y } from "../../components/theme";

type Phase = "drop" | "pickup" | "progress" | "done";

const CARD_W = 360;

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: COLORS.card,
        border: `1px solid ${COLORS.line}`,
        borderRadius: 14,
        padding: "16px 20px",
        width: CARD_W,
        boxShadow: "0 16px 34px rgba(0,0,0,.35)",
      }}
    >
      {children}
    </div>
  );
}

function Header({ icon, label, spin }: { icon: React.ReactNode; label: string; spin?: boolean }) {
  const frame = useCurrentFrame();
  const deg = spin ? (frame * 6) % 360 : 0;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
      <div style={{ transform: `rotate(${deg}deg)`, display: "flex" }}>{icon}</div>
      <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 20, color: COLORS.tx }}>{label}</span>
    </div>
  );
}

function JobChip({ text }: { text: string }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame, fps, config: { damping: 12, stiffness: 160, mass: 0.5 } });
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        opacity: p,
        transform: `scale(${0.7 + p * 0.3})`,
        background: COLORS.card2,
        border: `1px solid ${COLORS.acc}`,
        borderRadius: 999,
        padding: "8px 14px",
      }}
    >
      <Package size={16} color={COLORS.acc} />
      <span style={{ fontFamily: FONT, fontWeight: 600, fontSize: 15, color: COLORS.tx }}>{text}</span>
    </div>
  );
}

function ProgressBar({ pct }: { pct: number }) {
  return (
    <div style={{ width: "100%", height: 14, borderRadius: 999, background: COLORS.card2, border: `1px solid ${COLORS.line}`, overflow: "hidden" }}>
      <div
        style={{
          width: `${Math.round(pct * 100)}%`,
          height: "100%",
          borderRadius: 999,
          background: `linear-gradient(90deg, ${COLORS.acc}, ${COLORS.acc2})`,
        }}
      />
    </div>
  );
}

/** The "here's the queue and the worker" beats: a job dropping in, getting picked up, then progressing to done. */
export function JobPipeline({ phase, duration }: { phase: Phase; duration: number }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame, fps, config: { damping: 200, mass: 0.6 } });
  const pct = phase === "progress" ? interpolate(frame, [0, duration - 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : phase === "done" ? 1 : 0;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: STAGE_Y + BOX_H / 2 + 26,
        transform: `translate(-50%, ${(1 - p) * 18}px)`,
        opacity: p,
        display: "flex",
        gap: 28,
      }}
    >
      <Card>
        <Header icon={<Inbox size={20} color={COLORS.acc2} />} label="Queue" />
        {phase === "drop" ? (
          <JobChip text="Import job" />
        ) : (
          <span style={{ fontFamily: MONO, fontSize: 15, color: COLORS.tx3 }}>Empty, waiting for the next job</span>
        )}
      </Card>
      <Card>
        <Header icon={<Cog size={20} color={COLORS.acc2} />} label="Worker" spin={phase !== "drop"} />
        {phase === "drop" ? (
          <span style={{ fontFamily: MONO, fontSize: 15, color: COLORS.tx3 }}>Idle, watching the queue</span>
        ) : phase === "pickup" ? (
          <JobChip text="Picked up" />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <ProgressBar pct={pct} />
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {phase === "done" ? <CheckCircle2 size={16} color={COLORS.good} /> : null}
              <span style={{ fontFamily: FONT, fontWeight: 600, fontSize: 15, color: phase === "done" ? COLORS.good : COLORS.tx2 }}>
                {phase === "done" ? "Done, 5,000 imported" : `${Math.round(pct * 100)}% done`}
              </span>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

/** The "goes wrong" beats: no queue, the server just grinds on the request while the browser waits. */
export function InlineWork({ elapsedBaseFrames, duration, fps = 30 }: { elapsedBaseFrames: number; duration: number; fps?: number }) {
  const frame = useCurrentFrame();
  const opacity = elapsedBaseFrames === 0 ? interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 1;
  const totalFrames = elapsedBaseFrames + frame;
  const seconds = totalFrames / fps;
  const color = seconds < 4 ? COLORS.acc2 : seconds < 7 ? COLORS.warn : COLORS.bad;
  const spin = (frame * 8) % 360;

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: STAGE_Y + BOX_H / 2 + 26,
        transform: "translate(-50%, 0)",
        opacity,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          background: COLORS.card,
          border: `1px solid ${color}`,
          borderRadius: 999,
          padding: "16px 28px",
          boxShadow: `0 16px 34px rgba(0,0,0,.35)`,
        }}
      >
        <div style={{ transform: `rotate(${spin}deg)`, display: "flex" }}>
          <Loader2 size={24} color={color} />
        </div>
        <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 20, color: COLORS.tx }}>
          Working through 5,000 contacts...
        </span>
        <span style={{ fontFamily: MONO, fontSize: 20, fontWeight: 700, color }}>{seconds.toFixed(1)}s</span>
      </div>
    </div>
  );
}
