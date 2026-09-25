/**
 * How many "done when" items each lesson's build step has. A step is finished once all are ticked.
 * ponytail: hardcoded, not derived — deriving it would pull the paid prompts into client bundles
 * (AppShell is imported by the client login page). lib/content.check.ts fails if it drifts.
 */
export const BUILD_DONE_N: Record<string, number> = {
  ground: 4, vcs: 4, sides: 4, langs: 3, frontend: 4, mobile: 3, http: 3, data: 4,
  async: 4, memory: 3, cache: 4, apis: 4, testing: 3, auth: 4, security: 4, pay: 4,
  net: 4, cloud: 4, devops: 4, observe: 4, scale: 4, team: 3, llm: 4, ai: 4,
};

/** Every "done when" item of the step is ticked. */
export const buildFinished = (ticked: Set<string>, id: string): boolean =>
  !!BUILD_DONE_N[id] && Array.from({ length: BUILD_DONE_N[id] }, (_, i) => ticked.has(`build:${id}:${i}`)).every(Boolean);
