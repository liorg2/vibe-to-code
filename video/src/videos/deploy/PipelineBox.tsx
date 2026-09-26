import { CheckCircle2, Circle, MinusCircle, Workflow, XCircle } from "lucide-react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { focusGlow } from "../../components/glow";
import { BOX_H, BOX_W, COLORS, FONT, SERVER_LEFT, STAGE_Y } from "../../components/theme";

export type StepState = "pending" | "running" | "pass" | "fail" | "skip";

const LABELS = ["Install", "Test", "Build"];

function StepIcon({ state, frame }: { state: StepState; frame: number }) {
  if (state === "pass") return <CheckCircle2 size={19} color={COLORS.good} strokeWidth={2.4} />;
  if (state === "fail") return <XCircle size={19} color={COLORS.bad} strokeWidth={2.4} />;
  if (state === "skip") return <MinusCircle size={19} color={COLORS.tx3} strokeWidth={2} />;
  if (state === "running") {
    const angle = (frame * 14) % 360;
    return (
      <div style={{ transform: `rotate(${angle}deg)`, display: "flex" }}>
        <Circle size={19} color={COLORS.warn} strokeWidth={3} strokeDasharray="34 60" />
      </div>
    );
  }
  return <Circle size={19} color={COLORS.line} strokeWidth={2.4} />;
}

function StepRow({ label, state, frame }: { label: string; state: StepState; frame: number }) {
  const textColor = state === "pending" || state === "skip" ? COLORS.tx3 : COLORS.tx;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 30,
        borderRadius: 7,
        background: COLORS.card2,
        border: `1px solid ${COLORS.line}`,
        padding: "0 12px",
      }}
    >
      <span style={{ fontFamily: FONT, fontWeight: 600, fontSize: 16, color: textColor }}>{label}</span>
      <StepIcon state={state} frame={frame} />
    </div>
  );
}

/** The CI/CD pipeline: three checks that turn green (or red) one after another. */
export function PipelineBox({ active, steps, blocked }: { active: boolean; steps: StepState[]; blocked?: boolean }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame, fps, config: { damping: 200, mass: 0.6 } });
  const glow = focusGlow(active, COLORS.acc2);
  return (
    <div
      style={{
        position: "absolute",
        left: SERVER_LEFT,
        top: STAGE_Y - BOX_H / 2,
        width: BOX_W,
        height: BOX_H,
        opacity: p,
        transform: `translateY(${(1 - p) * 24}px) scale(${0.94 + p * 0.06})`,
        background: COLORS.card,
        border: `2px solid ${COLORS.line}`,
        borderRadius: 20,
        transition: "border-color .25s, box-shadow .25s",
        ...glow,
      }}
    >
      <div style={{ padding: "16px 20px 0", display: "flex", alignItems: "center", gap: 8 }}>
        <Workflow size={19} color={COLORS.acc2} strokeWidth={2} />
        <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 15, color: COLORS.tx2 }}>GitHub Actions</span>
      </div>
      <div style={{ padding: "12px 20px 0", display: "flex", flexDirection: "column", gap: 7 }}>
        {LABELS.map((label, i) => (
          <StepRow key={label} label={label} state={steps[i] ?? "pending"} frame={frame} />
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: blocked ? 22 : 26,
          color: blocked ? COLORS.bad : COLORS.tx,
        }}
      >
        {blocked ? "Blocked" : "CI/CD"}
      </div>
    </div>
  );
}
