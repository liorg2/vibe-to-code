import type { L10n } from "@/lib/types";

/** Working-with-AI tips shown on a build step: which model, when to start fresh, how to watch the bill. */
const TIP: Record<string, L10n> = {
  usage: {
    en: "Watch what the AI costs you from day one. Most tools show it: /usage or /cost in Claude Code, the usage page in Cursor or ChatGPT. Glance at it after each step so a long session never surprises you.",
    he: "עקבו אחרי כמה ה-AI עולה לכם כבר מהיום הראשון. רוב הכלים מראים את זה: /usage או /cost ב-Claude Code, ועמוד השימוש ב-Cursor או ב-ChatGPT. הציצו בו אחרי כל שלב, כדי ששיחה ארוכה לא תפתיע אתכם.",
  },
  fresh: {
    en: "Start a new conversation for every step (/clear in Claude Code, a new chat elsewhere). AGENTS.md and STEPS.md carry the memory, and a short conversation is cheaper, faster and makes fewer mistakes.",
    he: "פתחו שיחה חדשה לכל שלב (/clear ב-Claude Code, צ'אט חדש בכלים אחרים). AGENTS.md ו-STEPS.md זוכרים בשבילכם, ושיחה קצרה זולה יותר, מהירה יותר ועושה פחות טעויות.",
  },
  cheap: {
    en: "This step is small and low-risk, so a faster, cheaper model is enough (for example Sonnet or Haiku instead of Opus, or a \"mini\" model). Keep the strongest model for the risky steps.",
    he: "השלב הזה קטן ובסיכון נמוך, אז מודל מהיר וזול יותר מספיק (למשל Sonnet או Haiku במקום Opus, או מודל \"mini\"). את המודל החזק ביותר שמרו לשלבים המסוכנים.",
  },
  strong: {
    en: "Risky step: switch to your strongest model and let it plan before it writes anything (plan mode in Claude Code or Cursor). Paying a little more here is cheaper than fixing lost data.",
    he: "שלב מסוכן: עברו למודל החזק ביותר שלכם ותנו לו לתכנן לפני שהוא כותב משהו (מצב plan ב-Claude Code או ב-Cursor). לשלם קצת יותר כאן זול יותר מלתקן מידע שאבד.",
  },
  save: {
    en: "Before you paste the build prompt, make sure the last step is saved (committed). If this one goes wrong, you can throw it away and be back where you were in one command.",
    he: "לפני שמדביקים את פרומפט הבנייה, ודאו שהשלב הקודם שמור (commit). אם השלב הזה ישתבש, אפשר לזרוק אותו ולחזור בדיוק לאן שהייתם בפקודה אחת.",
  },
  long: {
    en: "If the conversation gets long and the AI starts forgetting or repeating itself, don't argue with it. Ask for a short summary of where things stand, start a new conversation and paste the summary.",
    he: "אם השיחה מתארכת וה-AI מתחיל לשכוח או לחזור על עצמו, אל תתווכחו איתו. בקשו סיכום קצר של המצב, פתחו שיחה חדשה והדביקו את הסיכום.",
  },
  read: {
    en: "Before the check prompt, skim what changed (the diff in your editor or on GitHub). You don't need to understand every line, just notice anything that touches parts this step shouldn't.",
    he: "לפני פרומפט הבדיקה, עברו בקצרה על מה שהשתנה (ה-diff בעורך או ב-GitHub). לא צריך להבין כל שורה, רק לשים לב לדברים שנוגעים בחלקים שהשלב הזה לא אמור לגעת בהם.",
  },
};

/** Which tips each lesson's step shows, in order. */
const BY_STEP: Record<string, (keyof typeof TIP)[]> = {
  ground: ["usage", "fresh"],
  vcs: ["fresh", "save"],
  sides: ["cheap"],
  langs: ["cheap", "read"],
  frontend: ["cheap"],
  http: ["cheap", "read"],
  data: ["strong", "save"],
  async: ["fresh", "usage"],
  memory: ["long"],
  cache: ["cheap", "read"],
  apis: ["save"],
  testing: ["cheap", "long"],
  auth: ["strong", "save"],
  security: ["strong", "read"],
  net: ["cheap"],
  cloud: ["save", "usage"],
  devops: ["strong", "save"],
  observe: ["long", "usage"],
  scale: ["strong", "read"],
  team: ["cheap", "fresh"],
  ai: ["fresh", "usage"],
};

export const tipsFor = (id: string): L10n[] => (BY_STEP[id] ?? []).map((k) => TIP[k]);
