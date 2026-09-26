import { AlertTriangle, GitBranch, GitCommit, GitMerge } from "lucide-react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { COLORS, FONT, MONO } from "../../components/theme";
import { BRANCH_Y, MAIN_Y, STAGE_LEFT, STAGE_RIGHT, type Branch, type Dot } from "../../scripts/commitBranchMerge";

const BEND_DX = 140;

/** A small floating chip above a dot, only while it's freshly introduced. */
function DotLabel({ x, y, text, localFrame }: { x: number; y: number; text: string; localFrame: number }) {
  const opacity = interpolate(localFrame, [0, 10, 70, 90], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const dy = interpolate(localFrame, [0, 14], [10, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, calc(-100% + ${dy}px))`,
        opacity,
        whiteSpace: "nowrap",
        fontFamily: FONT,
        fontWeight: 700,
        fontSize: 24,
        color: COLORS.tx,
        background: "color-mix(in srgb, #0a0b0f 78%, transparent)",
        border: `1px solid ${COLORS.line}`,
        borderRadius: 999,
        padding: "6px 16px",
      }}
    >
      {text}
    </div>
  );
}

const KIND_STYLE = {
  commit: { grad: [COLORS.acc2, COLORS.good] as const, Icon: GitCommit },
  merge: { grad: [COLORS.good, COLORS.acc2] as const, Icon: GitMerge },
  break: { grad: [COLORS.bad, "#c23"] as const, Icon: AlertTriangle },
};

/** One snapshot dot on a line: pops in with a spring, or shakes+flashes red the beat it breaks. */
function CommitDot({ dot, y, localFrame }: { dot: Dot; y: number; localFrame: number }) {
  const { fps } = useVideoConfig();
  const popFrame = localFrame - (dot.popDelay ?? 0);
  const scale = dot.isNew
    ? spring({ frame: popFrame, fps, config: { damping: 11, stiffness: 150, mass: 0.5 } })
    : 1;
  const opacity = dot.isNew ? interpolate(popFrame, [0, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 1;
  const shake = dot.justBroke
    ? interpolate(localFrame, [0, 6, 12, 18, 24, 30], [0, -7, 7, -5, 3, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;
  const { grad, Icon } = KIND_STYLE[dot.kind];
  const size = dot.kind === "merge" ? 60 : 52;

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: dot.x,
          top: y,
          transform: `translate(calc(-50% + ${shake}px), -50%) scale(${scale})`,
          opacity,
          width: size,
          height: size,
          borderRadius: 999,
          background: `linear-gradient(135deg, ${grad[0]}, ${grad[1]})`,
          display: "grid",
          placeItems: "center",
          boxShadow: `0 14px 30px rgba(0,0,0,.4)${dot.justBroke ? `, 0 0 0 6px ${COLORS.bad}33` : ""}`,
        }}
      >
        <Icon size={size * 0.46} color="#fff" strokeWidth={2.4} />
      </div>
      {dot.label && (dot.isNew || dot.justBroke) ? <DotLabel x={dot.x} y={y - size / 2 - 14} text={dot.label} localFrame={localFrame} /> : null}
    </>
  );
}

/** SVG path with the same pathLength/dash-offset reveal trick used by Arrow.tsx. */
function RevealPath({ d, color, reveal }: { d: string; color: string; reveal: number }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={5}
      strokeLinecap="round"
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={1 - reveal}
    />
  );
}

/** The persistent "main" line: a solid rail, turning into a dashed red break past crackFromX. */
export function MainLine({ dots, crackFromX, localFrame }: { dots: Dot[]; crackFromX?: number; localFrame: number }) {
  const solidRight = crackFromX ?? STAGE_RIGHT;
  const crackReveal = crackFromX
    ? interpolate(localFrame, [0, 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;
  return (
    <>
      <div style={{ position: "absolute", left: STAGE_LEFT, top: MAIN_Y - 2, width: solidRight - STAGE_LEFT, height: 4, borderRadius: 2, background: COLORS.acc2 }} />
      {crackFromX ? (
        <div
          style={{
            position: "absolute",
            left: crackFromX,
            top: MAIN_Y - 2,
            width: (STAGE_RIGHT - crackFromX) * crackReveal,
            height: 0,
            borderTop: `4px dashed ${COLORS.bad}`,
          }}
        />
      ) : null}
      <div
        style={{
          position: "absolute",
          left: STAGE_LEFT,
          top: MAIN_Y - 40,
          transform: "translateY(-50%)",
          fontFamily: MONO,
          fontWeight: 700,
          fontSize: 22,
          color: COLORS.tx2,
        }}
      >
        main
      </div>
      {dots.map((dot) => (
        <CommitDot key={dot.x} dot={dot} y={MAIN_Y} localFrame={localFrame} />
      ))}
    </>
  );
}

/** The branch: a diagonal split off main, a horizontal rail, its own commits, and (later) a connector merging back. */
export function BranchStage({ branch, mergeTargetX, localFrame }: { branch: Branch; mergeTargetX?: number; localFrame: number }) {
  const bendX = branch.originX + BEND_DX;
  const splitPath = `M ${branch.originX} ${MAIN_Y} L ${bendX} ${BRANCH_Y} L ${branch.railToX} ${BRANCH_Y}`;
  const splitReveal = branch.drawIn
    ? interpolate(localFrame, [0, 55], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;

  const mergeBendX = mergeTargetX ? mergeTargetX - BEND_DX : branch.railToX;
  const mergePath = mergeTargetX ? `M ${branch.railToX} ${BRANCH_Y} L ${mergeBendX} ${BRANCH_Y} L ${mergeTargetX} ${MAIN_Y}` : "";
  const mergeReveal = branch.merging
    ? interpolate(localFrame, [0, 55], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  return (
    <>
      <svg style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none" }} width={1920} height={1080}>
        <RevealPath d={splitPath} color={COLORS.acc} reveal={splitReveal} />
        {branch.merging && mergeTargetX ? <RevealPath d={mergePath} color={COLORS.good} reveal={mergeReveal} /> : null}
      </svg>
      <div
        style={{
          position: "absolute",
          left: bendX,
          top: BRANCH_Y - 125,
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontFamily: MONO,
          fontWeight: 700,
          fontSize: 22,
          color: COLORS.acc,
        }}
      >
        <GitBranch size={22} color={COLORS.acc} strokeWidth={2.4} />
        feature/search
      </div>
      {branch.dots.map((dot) => (
        <CommitDot key={dot.x} dot={dot} y={BRANCH_Y} localFrame={localFrame} />
      ))}
    </>
  );
}
