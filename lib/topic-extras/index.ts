import type { TopicExtra } from "./types";
import { extras as foundations } from "./foundations";
import { extras as browser } from "./browser";
import { extras as datawork } from "./datawork";
import { extras as trust } from "./trust";
import { extras as ship } from "./ship";
import { extras as observe } from "./observe";
import { extras as people } from "./people";

export const TOPIC_EXTRAS: Record<string, TopicExtra> = {
  ...foundations,
  ...browser,
  ...datawork,
  ...trust,
  ...ship,
  ...observe,
  ...people,
};
