import type { ComponentType } from "react";
import { Composition } from "remotion";

const FPS = 30;

type VideoModule = {
  default: ComponentType;
  meta: { id: string; slug: string; durationInFrames: number };
};

// Every file in src/videos registers itself here — drop a new one in, no shared file to edit.
const ctx = require.context("./videos", false, /\.tsx$/);
const videos: VideoModule[] = ctx.keys().map((key) => ctx(key) as VideoModule);

export const Root: React.FC = () => {
  return (
    <>
      {videos.map(({ default: Component, meta }) => (
        <Composition
          key={meta.id}
          id={meta.id}
          component={Component}
          durationInFrames={meta.durationInFrames}
          fps={FPS}
          width={1920}
          height={1080}
        />
      ))}
    </>
  );
};
