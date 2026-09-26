/** Topic explainer videos, keyed by Term.k. Shown as a "Video" tab on the slide when present. */
const SLUGS = ["request-response", "commit-branch-merge", "session-and-cookie", "cache", "background-job", "deploy"];

export const VIDEOS: Record<string, { src: string; poster: string }> = Object.fromEntries(
  SLUGS.map((k) => [k, { src: `/videos/${k}.mp4`, poster: `/videos/${k}.jpg` }]),
);
