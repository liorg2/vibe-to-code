import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { Arrow, LaneBackdrop, UP_LANE, travelProgress } from "../components/Arrow";
import { Caption, TitleCard } from "../components/Caption";
import { ClickCursor } from "../components/ClickCursor";
import { Frame } from "../components/Frame";
import { Packet } from "../components/Packet";
import { SuccessBurst } from "../components/SuccessBurst";
import { layoutBeats, totalFrames, type Positioned } from "../components/timeline";
import { BOX_H, BOX_W, BROWSER_LEFT, BROWSER_CENTER_X, COLORS, STAGE_Y } from "../components/theme";
import { UserIcon } from "../components/UserIcon";
import { SCRIPT, type DeployBeat } from "../scripts/deployCiCd";
import { LAPTOP_BUTTON_X, LAPTOP_BUTTON_Y, LaptopBox } from "./deploy/LaptopBox";
import { PipelineBadge } from "./deploy/PipelineBadge";
import { PipelineBox, type StepState } from "./deploy/PipelineBox";
import { UsersLive } from "./deploy/UsersLive";

const INTRO_DUR = 105;
const STAGE_FROM = 90;
const LAID: Positioned<DeployBeat>[] = layoutBeats(SCRIPT.beats);
const STAGE_DUR = totalFrames(SCRIPT.beats);
const CLOSING_DUR = 190;
const CLOSING_FROM = STAGE_FROM + STAGE_DUR - 20; // slight crossfade with the stage's own fade-out
const DURATION_IN_FRAMES = CLOSING_FROM + CLOSING_DUR;

export const meta = { id: "DeployCiCd", slug: "deploy", durationInFrames: DURATION_IN_FRAMES };

const PENDING: StepState[] = ["pending", "pending", "pending"];
const SETTLE = 16; // frames before a step's own slot ends that it settles into its final state

/** Turns a beat's `run` outcome into a per-step state for the current frame inside that beat. */
function stepsForRun(outcome: "pass" | "failTest", localFrame: number, duration: number): StepState[] {
  const third = duration / 3;
  const stateAt = (i: number): StepState => {
    const start = i * third;
    if (localFrame < start) return "pending";
    if (outcome === "failTest" && i === 2) return "skip"; // build never runs once the test failed
    const settled = localFrame >= start + third - SETTLE;
    if (!settled) return "running";
    return outcome === "failTest" && i === 1 ? "fail" : "pass";
  };
  return [stateAt(0), stateAt(1), stateAt(2)];
}

/** Everything one beat can add on top of the always-on boxes: a caption, a packet, a card, ... */
function BeatOverlay({ beat, duration }: { beat: DeployBeat; duration: number }) {
  const frame = useCurrentFrame();
  return (
    <>
      {beat.click ? <ClickCursor x={LAPTOP_BUTTON_X} y={LAPTOP_BUTTON_Y} /> : null}

      {beat.push ? (
        <>
          <Arrow lane={UP_LANE} color={COLORS.acc} progress={travelProgress(frame, duration)} />
          <Packet lane={UP_LANE} spec={{ dir: "toServer", kind: "req", method: "PUSH", path: "main" }} duration={duration} />
        </>
      ) : null}

      {beat.deploy ? <UsersLive /> : null}

      {beat.celebrate ? (
        <Sequence from={Math.max(0, duration - 46)} durationInFrames={46} layout="none">
          {/* Open space beside the laptop box — never over its button or an arriving packet. */}
          <SuccessBurst x={BROWSER_LEFT + BOX_W + 70} y={STAGE_Y - BOX_H / 2 - 30} />
        </Sequence>
      ) : null}

      {beat.caption ? <Caption text={beat.caption} duration={duration} /> : null}
    </>
  );
}

/** The two boxes, the developer, the lane, and every beat's overlay — the persistent middle act. */
function Stage() {
  const frame = useCurrentFrame();
  const fadeIn = Math.min(1, Math.max(0, frame / 40));
  const fadeOut = Math.min(1, Math.max(0, (STAGE_DUR - frame) / 40));
  const opacity = Math.min(fadeIn, fadeOut);

  const current = LAID.find((x) => frame >= x.from && frame < x.from + x.duration) ?? LAID[LAID.length - 1];
  const localFrame = frame - current.from;
  const actors = current.beat.actors ?? [];
  const steps = current.beat.run ? stepsForRun(current.beat.run, localFrame, current.duration) : current.beat.steps ?? PENDING;
  const buttonScale = current.beat.click
    ? interpolate(localFrame, [22, 28, 34], [1, 0.94, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;

  return (
    <AbsoluteFill style={{ opacity }}>
      <LaneBackdrop lane={UP_LANE} color={COLORS.acc} />
      <UserIcon x={BROWSER_CENTER_X} y={STAGE_Y - BOX_H / 2 - 110} active={actors.includes("dev")} />
      <LaptopBox active={actors.includes("laptop")} buttonScale={buttonScale} />
      <PipelineBox active={actors.includes("ci")} steps={steps} blocked={current.beat.blocked} />

      {LAID.map(({ beat, from, duration }, idx) => (
        <Sequence key={idx} from={from} durationInFrames={duration} layout="none">
          <BeatOverlay beat={beat} duration={duration} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
}

export default function DeployCiCd() {
  return (
    <Frame>
      <Sequence from={0} durationInFrames={INTRO_DUR} layout="none">
        <TitleCard text={SCRIPT.introText} duration={INTRO_DUR} />
      </Sequence>

      <Sequence from={STAGE_FROM} durationInFrames={STAGE_DUR} layout="none">
        <Stage />
      </Sequence>

      <Sequence from={CLOSING_FROM} durationInFrames={CLOSING_DUR} layout="none">
        <TitleCard text={SCRIPT.closingText} duration={CLOSING_DUR} sub={<PipelineBadge />} />
      </Sequence>
    </Frame>
  );
}
