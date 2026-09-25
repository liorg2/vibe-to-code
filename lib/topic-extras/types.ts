import type { L10n } from "@/lib/types";

/** One concrete picture of the topic: a snippet, and a rendered page when there is something to see. */
export type Look = {
  cap: L10n;
  /** What the student reads. Commands, markup, or a few lines of code. */
  code: string;
  /** Full HTML document rendered beside the code. Same idea as `code`, wrapped so it can draw. */
  preview?: string;
};

export type TopicExtra = {
  /** Omitted when the topic is a way of thinking and a snippet would be fake. */
  look?: Look[];
  /** Three prompts a student can paste. */
  prompts: L10n[];
};
