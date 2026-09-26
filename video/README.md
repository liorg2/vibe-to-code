# video

Remotion project that renders topic explainer videos for the site. Output lands in `../public/videos/`.

## Adding a video (drop-in, no shared file to edit)

1. Create `src/videos/<slug>.tsx`. It must:
   - `export default` the component (the video itself).
   - `export const meta = { id: "<PascalCaseId>", slug: "<slug>", durationInFrames: <number> }`.
2. That's it — `Root.tsx` auto-registers every file in `src/videos/` via `require.context`, so parallel authors never touch a shared file.

Always wrap your video's root in `<Frame>` (`src/components/Frame.tsx`): it gives you the site's gradient
background and the brand mark (logo + "Vibe → Code"), pinned top-left, for free. Never put content in the
top ~110px of the frame — that's the brand's space.

## Building blocks (`src/components/`)

- `Frame` — background + brand wrapper, always the outermost element.
- `Brand` — the logo mark itself (used by `Frame`, no need to use directly).
- `Caption` / `TitleCard` — bottom caption pill and full-screen title cards for intro/outro.
- `Arrow`, `Packet`, `MiniPulse` — animated request/response traffic between two boxes.
- `BrowserBox`, `ServerBox`, `UserIcon`, `ContactsCard`, `NetworkTabIcon` — actors and props for a client/server story.
- `ClickCursor`, `SuccessBurst`, `StatusChip` — small interaction/feedback accents.
- `timeline.ts` — turns a flat list of `{ frames, ... }` beats into absolute `from`/`duration` pairs, so a
  script only states durations and never hand-computes offsets.
- `theme.ts` — shared colors, font, and stage geometry, copied from the site's own `app/globals.css`.

The usual shape for a new video: a `SCRIPT` object (like `src/scripts/requestResponse.ts`) describing an
intro line, a closing line, and a list of beats — then a component that lays those beats out on a
`<Sequence>` timeline, the same way `src/videos/request-response.tsx` does.

## Caption rules

- 10 words or fewer per caption.
- No em-dashes.
- One idea per beat — if a beat needs two ideas, split it into two beats.

## Length and tone

40-60 seconds total. Colourful and friendly: icons, arrows, status chips, a bit of pop/bounce on entrances
— not a static slide deck.

## Rendering

Every video's `meta` gives you its composition `id` and its `slug`. Render with:

```
cd video
npx remotion render <id> ../public/videos/<slug>.mp4 --codec h264 --crf 28
npx remotion still <id> ../public/videos/<slug>.jpg --frame <a-good-frame>
```

For example, for `request-response` (id `RequestResponse`):

```
cd video
npx remotion render RequestResponse ../public/videos/request-response.mp4 --codec h264 --crf 28
npx remotion still RequestResponse ../public/videos/request-response.jpg --frame 300
```

`npm run render -- <id> <output.mp4> --codec h264 --crf 28` and `npm run still -- <id> <output.jpg> --frame <n>`
work the same way (both scripts are plain passthroughs to the Remotion CLI).
