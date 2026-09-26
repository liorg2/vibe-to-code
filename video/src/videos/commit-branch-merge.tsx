import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { Caption, TitleCard } from "../components/Caption";
import { ClickCursor } from "../components/ClickCursor";
import { Frame } from "../components/Frame";
import { SuccessBurst } from "../components/SuccessBurst";
import { layoutBeats, totalFrames } from "../components/timeline";
import { MAIN_Y, SCRIPT, type GBeat } from "../scripts/commitBranchMerge";
import { BranchStage, MainLine } from "./commit-branch-merge/GitGraph";

const INTRO_DUR = 110;
const STAGE_FROM = 95;
const LAID = layoutBeats(SCRIPT.beats);
const STAGE_DUR = totalFrames(SCRIPT.beats);
const CLOSING_DUR = 190;
const CLOSING_FROM = STAGE_FROM + STAGE_DUR - 20; // slight crossfade with the stage's own fade-out
const DURATION_IN_FRAMES = CLOSING_FROM + CLOSING_DUR;

export const meta = { id: "CommitBranchMerge", slug: "commit-branch-merge", durationInFrames: DURATION_IN_FRAMES };

/** Everything transient a beat can add on top of the persistent graph: a caption, a click, a burst. */
function BeatOverlay({ beat, duration }: { beat: GBeat; duration: number }) {
  const mergeX = beat.mainDots.find((d) => d.kind === "merge")?.x;
  return (
    <>
      {beat.click ? <ClickCursor x={beat.click.x} y={beat.click.y} /> : null}
      {beat.celebrate && mergeX ? (
        <Sequence from={Math.max(0, duration - 60)} durationInFrames={60} layout="none">
          <SuccessBurst x={mergeX} y={MAIN_Y - 90} />
        </Sequence>
      ) : null}
      {beat.caption ? <Caption text={beat.caption} duration={duration} /> : null}
    </>
  );
}

/** The main/branch graph and every beat's overlay — the persistent middle act. */
function Stage() {
  const frame = useCurrentFrame();
  const fadeIn = Math.min(1, Math.max(0, frame / 40));
  const fadeOut = Math.min(1, Math.max(0, (STAGE_DUR - frame) / 40));
  const opacity = Math.min(fadeIn, fadeOut);

  const current = LAID.find((x) => frame >= x.from && frame < x.from + x.duration) ?? LAID[LAID.length - 1];
  const localFrame = frame - current.from;
  const sceneOpacity = current.beat.sceneFadeIn
    ? interpolate(localFrame, [0, 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;
  const mergeTargetX = current.beat.mainDots.find((d) => d.kind === "merge")?.x;

  return (
    <AbsoluteFill style={{ opacity }}>
      <AbsoluteFill style={{ opacity: sceneOpacity }}>
        <MainLine dots={current.beat.mainDots} crackFromX={current.beat.crackFromX} localFrame={localFrame} />
        {current.beat.branch ? <BranchStage branch={current.beat.branch} mergeTargetX={mergeTargetX} localFrame={localFrame} /> : null}
      </AbsoluteFill>

      {LAID.map(({ beat, from, duration }, idx) => (
        <Sequence key={idx} from={from} durationInFrames={duration} layout="none">
          <BeatOverlay beat={beat} duration={duration} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
}

export default function CommitBranchMerge() {
  return (
    <Frame>
      <Sequence from={0} durationInFrames={INTRO_DUR} layout="none">
        <TitleCard text={SCRIPT.introText} duration={INTRO_DUR} />
      </Sequence>

      <Sequence from={STAGE_FROM} durationInFrames={STAGE_DUR} layout="none">
        <Stage />
      </Sequence>

      <Sequence from={CLOSING_FROM} durationInFrames={CLOSING_DUR} layout="none">
        <TitleCard text={SCRIPT.closingText} duration={CLOSING_DUR} />
      </Sequence>
    </Frame>
  );
}
