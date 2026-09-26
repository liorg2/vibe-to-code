import { Sequence, interpolate, useCurrentFrame } from "remotion";
import { AbsoluteFill } from "remotion";
import { Arrow, DOWN_LANE, LaneBackdrop, UP_LANE, laneFor, travelProgress } from "../components/Arrow";
import { Caption, TitleCard } from "../components/Caption";
import { ClickCursor } from "../components/ClickCursor";
import { ContactsCard } from "../components/ContactsCard";
import { Frame } from "../components/Frame";
import { Packet } from "../components/Packet";
import { ServerBox } from "../components/ServerBox";
import { SuccessBurst } from "../components/SuccessBurst";
import { layoutBeats, totalFrames, type Positioned } from "../components/timeline";
import { BOX_H, BOX_W, BROWSER_LEFT, BROWSER_CENTER_X, COLORS, STAGE_Y } from "../components/theme";
import { UserIcon } from "../components/UserIcon";
import { SCRIPT, type Beat } from "../scripts/sessionAndCookie";
import { BUTTON_X, BUTTON_Y, Browser } from "./session-and-cookie/Browser";
import { CookiePacket } from "./session-and-cookie/CookiePacket";
import { CookieResident } from "./session-and-cookie/CookieResident";
import { XssReader } from "./session-and-cookie/XssReader";

const INTRO_DUR = 105;
const STAGE_FROM = 90;
const LAID: Positioned<Beat>[] = layoutBeats(SCRIPT.beats);
const STAGE_DUR = totalFrames(SCRIPT.beats);
const CLOSING_DUR = 190;
const CLOSING_FROM = STAGE_FROM + STAGE_DUR - 20; // slight crossfade with the stage's own fade-out
const DURATION_IN_FRAMES = CLOSING_FROM + CLOSING_DUR;

export const meta = { id: "SessionCookieToken", slug: "session-and-cookie", durationInFrames: DURATION_IN_FRAMES };

function packetColor(kind: "req" | "ok" | "err") {
  return kind === "req" ? COLORS.acc : kind === "ok" ? COLORS.good : COLORS.bad;
}

/** Everything one beat can add on top of the always-on boxes: a caption, a packet, a card, ... */
function BeatOverlay({ beat, duration }: { beat: Beat; duration: number }) {
  const frame = useCurrentFrame();
  return (
    <>
      {beat.click ? <ClickCursor x={BUTTON_X} y={BUTTON_Y} /> : null}

      {beat.packet ? (
        <>
          <Arrow lane={laneFor(beat.packet.dir)} color={packetColor(beat.packet.kind)} progress={travelProgress(frame, duration)} />
          <Packet lane={laneFor(beat.packet.dir)} spec={beat.packet} duration={duration} />
        </>
      ) : null}

      {beat.cookiePacket ? (
        <>
          <Arrow lane={laneFor(beat.cookiePacket.dir)} color={COLORS.warn} progress={travelProgress(frame, duration)} />
          <CookiePacket lane={laneFor(beat.cookiePacket.dir)} spec={beat.cookiePacket} duration={duration} />
        </>
      ) : null}

      {beat.cookie ? <CookieResident secure={beat.cookie.secure} /> : null}
      {beat.xss ? <XssReader /> : null}

      {beat.contacts ? <ContactsCard /> : null}

      {beat.celebrate ? (
        <Sequence from={Math.max(0, duration - 46)} durationInFrames={46} layout="none">
          {/* Open space beside the browser box — never over its button or an arriving packet. */}
          <SuccessBurst x={BROWSER_LEFT + BOX_W + 70} y={STAGE_Y - BOX_H / 2 - 30} />
        </Sequence>
      ) : null}

      {beat.caption ? <Caption text={beat.caption} duration={duration} /> : null}
    </>
  );
}

/** The two boxes, the user, the lanes, and every beat's overlay — the persistent middle act. */
function Stage() {
  const frame = useCurrentFrame();
  const fadeIn = Math.min(1, Math.max(0, frame / 40));
  const fadeOut = Math.min(1, Math.max(0, (STAGE_DUR - frame) / 40));
  const opacity = Math.min(fadeIn, fadeOut);

  const current = LAID.find((x) => frame >= x.from && frame < x.from + x.duration) ?? LAID[LAID.length - 1];
  const actors = current.beat.actors ?? [];
  const buttonScale = current.beat.click
    ? interpolate(frame - current.from, [22, 28, 34], [1, 0.94, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;

  return (
    <AbsoluteFill style={{ opacity }}>
      <LaneBackdrop lane={UP_LANE} color={COLORS.acc} />
      <LaneBackdrop lane={DOWN_LANE} color={COLORS.good} />
      <UserIcon x={BROWSER_CENTER_X} y={STAGE_Y - BOX_H / 2 - 110} active={actors.includes("user")} />
      <Browser active={actors.includes("browser")} buttonScale={buttonScale} />
      <ServerBox active={actors.includes("server")} />

      {LAID.map(({ beat, from, duration }, idx) => (
        <Sequence key={idx} from={from} durationInFrames={duration} layout="none">
          <BeatOverlay beat={beat} duration={duration} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
}

export default function SessionAndCookie() {
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
