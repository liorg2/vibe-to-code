import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { Arrow, LaneBackdrop, travelProgress } from "../components/Arrow";
import { BUTTON_X, BUTTON_Y, BrowserBox } from "../components/BrowserBox";
import { Caption, TitleCard } from "../components/Caption";
import { ClickCursor } from "../components/ClickCursor";
import { ContactsCard } from "../components/ContactsCard";
import { Frame } from "../components/Frame";
import { Packet } from "../components/Packet";
import { SuccessBurst } from "../components/SuccessBurst";
import { layoutBeats, totalFrames, type Positioned, type PacketSpec } from "../components/timeline";
import { BOX_H, BOX_W, BROWSER_CENTER_X, BROWSER_LEFT, COLORS, SERVER_CENTER_X } from "../components/theme";
import { UserIcon } from "../components/UserIcon";
import { SCRIPT, type CacheBeat } from "../scripts/cache";
import { Badge } from "./cache/Badge";
import { CACHE_CENTER_X, CacheBox } from "./cache/CacheBox";
import { DatabaseBox } from "./cache/DatabaseBox";
import { EditReveal } from "./cache/EditReveal";
import { BC, CD } from "./cache/lanes";

const INTRO_DUR = 95;
const STAGE_FROM = 80;
const LAID: Positioned<CacheBeat>[] = layoutBeats(SCRIPT.beats);
const STAGE_DUR = totalFrames(SCRIPT.beats);
const CLOSING_DUR = 160;
const CLOSING_FROM = STAGE_FROM + STAGE_DUR - 20; // slight crossfade with the stage's own fade-out
const DURATION_IN_FRAMES = CLOSING_FROM + CLOSING_DUR;

export const meta = { id: "CacheHitMissTtl", slug: "cache", durationInFrames: DURATION_IN_FRAMES };

function packetColor(kind: "req" | "ok" | "err") {
  return kind === "req" ? COLORS.acc : kind === "ok" ? COLORS.good : COLORS.bad;
}

const CACHE_TOP_Y = 520 - BOX_H / 2 - 40; // just above the cache box, for badges
const DB_TOP_Y = 520 - BOX_H / 2 - 20; // just above the database box, for the edit reveal

/** Everything one beat can add on top of the always-on boxes: a caption, a packet, a badge, ... */
function BeatOverlay({ beat, duration }: { beat: CacheBeat; duration: number }) {
  const frame = useCurrentFrame();
  const lane = beat.packet ? (beat.packet.lane === "bc" ? BC : CD)[beat.packet.dir === "forward" ? "fwd" : "bwd"] : null;
  // Packet (shared component) just needs a `dir` for its type — it never reads it, our own
  // `lane` field already picked the actual path, so "forward" -> toServer is an arbitrary but harmless fit.
  const packetSpec: PacketSpec | null = beat.packet
    ? { dir: beat.packet.dir === "forward" ? "toServer" : "toBrowser", kind: beat.packet.kind, method: beat.packet.method, path: beat.packet.path, status: beat.packet.status, statusText: beat.packet.statusText }
    : null;

  return (
    <>
      {beat.click ? <ClickCursor x={BUTTON_X} y={BUTTON_Y} /> : null}

      {beat.packet && lane && packetSpec ? (
        <>
          <Arrow lane={lane} color={packetColor(beat.packet.kind)} progress={travelProgress(frame, duration)} />
          <Packet lane={lane} spec={packetSpec} duration={duration} />
        </>
      ) : null}

      {beat.badge ? <Badge text={beat.badge.text} tone={beat.badge.tone} x={CACHE_CENTER_X} y={CACHE_TOP_Y} duration={duration} /> : null}

      {beat.edit ? <EditReveal x={SERVER_CENTER_X} y={DB_TOP_Y} duration={duration} /> : null}

      {beat.contacts ? <ContactsCard /> : null}

      {beat.celebrate ? (
        <Sequence from={Math.max(0, duration - 46)} durationInFrames={46} layout="none">
          {beat.celebrate === "browser" ? (
            <SuccessBurst x={BROWSER_LEFT + BOX_W + 70} y={520 - BOX_H / 2 - 30} />
          ) : (
            <SuccessBurst x={CACHE_CENTER_X} y={CACHE_TOP_Y} />
          )}
        </Sequence>
      ) : null}

      {beat.caption ? <Caption text={beat.caption} duration={duration} /> : null}
    </>
  );
}

/** The three boxes, the user, the lanes, and every beat's overlay — the persistent middle act. */
function Stage() {
  const frame = useCurrentFrame();
  const fadeIn = Math.min(1, Math.max(0, frame / 40));
  const fadeOut = Math.min(1, Math.max(0, (STAGE_DUR - frame) / 40));
  const opacity = Math.min(fadeIn, fadeOut);

  const idx = LAID.findIndex((x) => frame >= x.from && frame < x.from + x.duration);
  const current = idx >= 0 ? LAID[idx] : LAID[LAID.length - 1];
  const prevCache = idx > 0 ? LAID[idx - 1].beat.cache : undefined;
  const targetCache = current.beat.cache;
  const localFrame = frame - current.from;

  const fromTtl = prevCache?.ttl ?? targetCache?.ttl ?? 0;
  const ttlDisplay = targetCache
    ? interpolate(localFrame, [0, current.duration], [fromTtl, targetCache.ttl], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : prevCache?.ttl ?? 0;
  const entryDisplay = targetCache?.entry ?? prevCache?.entry ?? false;
  const staleDisplay = targetCache?.stale ?? false;

  const actors = current.beat.actors ?? [];
  const buttonScale = current.beat.click
    ? interpolate(frame - current.from, [22, 28, 34], [1, 0.94, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;

  return (
    <AbsoluteFill style={{ opacity }}>
      <LaneBackdrop lane={BC.fwd} color={COLORS.acc} />
      <LaneBackdrop lane={BC.bwd} color={COLORS.good} />
      <LaneBackdrop lane={CD.fwd} color={COLORS.acc} />
      <LaneBackdrop lane={CD.bwd} color={COLORS.good} />

      <UserIcon x={BROWSER_CENTER_X} y={520 - BOX_H / 2 - 110} active={actors.includes("user")} />
      <BrowserBox active={actors.includes("browser")} buttonScale={buttonScale} />
      <CacheBox active={actors.includes("cache")} hasEntry={entryDisplay} stale={staleDisplay} ttlProgress={ttlDisplay} />
      <DatabaseBox active={actors.includes("database")} slow={current.beat.dbBusy} />

      {LAID.map(({ beat, from, duration }, i) => (
        <Sequence key={i} from={from} durationInFrames={duration} layout="none">
          <BeatOverlay beat={beat} duration={duration} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
}

export default function CacheHitMissTtl() {
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
