import type { Scene } from "./types";
import { EARLY_SCENES } from "./early";
import { HTTP_SCENES } from "./http";
import { LATE_SCENES } from "./late";
import { MIDDLE_SCENES } from "./middle";
import { SECURE_SCENES } from "./secure";

/** Every topic animation, keyed by the term's stable slug (`Term.k`). */
export const SCENES: Record<string, Scene> = {
  ...EARLY_SCENES,
  ...HTTP_SCENES,
  ...MIDDLE_SCENES,
  ...SECURE_SCENES,
  ...LATE_SCENES,
};
