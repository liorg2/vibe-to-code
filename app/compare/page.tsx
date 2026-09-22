import Link from "@/components/Link";
import { AppShell } from "@/components/AppShell";
import { Breadcrumb } from "@/components/Breadcrumb";
import { UPGRADE_PRICE } from "@/components/Courses";
import { buttonVariants } from "@/components/ui/button";
import { buildsFor } from "@/lib/builds";
import { MODULES, PATHS, UI, archesFor, mins } from "@/lib/course";
import { INTRO } from "@/lib/intro";
import { serverLang } from "@/lib/lang-server";
import { cn } from "@/lib/utils";
import type { Lang, Path } from "@/lib/types";

export const metadata = { title: "Compare courses" };

type L = Record<Lang, string>;

/** ponytail: themes are a hand-picked grouping of lesson ids; whether a course covers one is read
 *  from PATHS, so moving a lesson between courses updates the table on its own. */
const THEMES: { t: L; mods: string[] }[] = [
  { t: { en: "How code works: files, git, client and server, languages", he: "איך קוד עובד: קבצים, git, לקוח ושרת, שפות" }, mods: ["ground", "vcs", "sides", "langs"] },
  { t: { en: "The web: browser, HTTP, databases", he: "הווב: דפדפן, HTTP, מסדי נתונים" }, mods: ["frontend", "http", "data"] },
  { t: { en: "Integrations and background jobs", he: "אינטגרציות ועבודות רקע" }, mods: ["apis", "async"] },
  { t: { en: "Speed: memory, caching, scale", he: "מהירות: זיכרון, קאש, סקייל" }, mods: ["memory", "cache", "scale"] },
  { t: { en: "Quality and safety: tests, sign-in, security", he: "איכות ובטיחות: טסטים, התחברות, אבטחה" }, mods: ["testing", "auth", "security"] },
  { t: { en: "Shipping: domains, cloud, deploys, monitoring", he: "שחרור: דומיינים, ענן, פריסות, ניטור" }, mods: ["net", "cloud", "devops", "observe"] },
  { t: { en: "Working with a team and with AI", he: "עבודה עם צוות ועם AI" }, mods: ["team", "ai"] },
];

const X = {
  title: { en: "Basic or Advanced?", he: "בסיס או מתקדם?" },
  lede: {
    en: "Advanced includes every Basic lesson, so you never need both. Start with Basic to learn the ground floor and ship a first app; take Advanced to take that app all the way to production.",
    he: "המתקדם כולל את כל שיעורי הבסיס, כך שאף פעם לא צריך את שניהם. התחילו בבסיס כדי ללמוד את היסודות ולשחרר אפליקציה ראשונה; קחו את המתקדם כדי להביא את האפליקציה עד לפרודקשן.",
  },
  lessons: { en: "Lessons", he: "שיעורים" },
  topics: { en: "Topics", he: "נושאים" },
  time: { en: "Reading time", he: "זמן קריאה" },
  steps: { en: "Build steps", he: "שלבי בנייה" },
  arch: { en: "Architectures", he: "ארכיטקטורות" },
  land: { en: "Where you land", he: "איפה נוחתים" },
  price: { en: "Price", he: "מחיר" },
  once: { en: "one-time", he: "תשלום חד-פעמי" },
  covered: { en: "What's covered", he: "מה מכוסה" },
  some: { en: "the basics", he: "היסודות" },
  upgrade: {
    en: `Already bought Basic? Add Advanced for ₪${UPGRADE_PRICE}, the difference in price.`,
    he: `כבר רכשתם את הבסיס? הוסיפו את המתקדם ב-₪${UPGRADE_PRICE}, הפרש המחיר.`,
  },
};

export default async function ComparePage() {
  const lang = await serverLang();
  const t = (k: string) => UI[k]?.[lang] ?? k;
  const cols = PATHS.map((p: Path) => {
    const mods = MODULES.filter((m) => p.mods.includes(m.id));
    return {
      p,
      topics: mods.reduce((n, m) => n + m.terms.length, 0),
      hours: (mods.reduce((n, m) => n + mins(m), 0) / 60).toFixed(1),
      steps: buildsFor(p.id).length,
      arch: archesFor(p.id).map((a) => a.title[lang]).join(", "),
    };
  });
  const cover = (p: Path, mods: string[]) => {
    const n = mods.filter((id) => p.mods.includes(id)).length;
    return n === mods.length ? "✓" : n ? X.some[lang] : "—";
  };
  const row = (label: string, cell: (c: (typeof cols)[number]) => React.ReactNode) => (
    <tr key={label}>
      <th scope="row">{label}</th>
      {cols.map((c) => (
        <td key={c.p.id}>{cell(c)}</td>
      ))}
    </tr>
  );

  return (
    <AppShell showNav={false}>
      <Breadcrumb items={[{ label: t("paths"), href: "/courses" }, { label: X.title[lang] }]} />
      <section className="compare">
        <h2>{X.title[lang]}</h2>
        <p className="lede">{X.lede[lang]}</p>
        <div className="cmp-wrap">
          <table className="cmp">
            <thead>
              <tr>
                <td />
                {cols.map(({ p }) => (
                  <th key={p.id} scope="col">
                    <span className="ic">{p.icon}</span>
                    {p.title[lang].split(": ").pop()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {row(X.lessons[lang], (c) => c.p.mods.length)}
              {row(X.topics[lang], (c) => c.topics)}
              {row(X.time[lang], (c) => `~${c.hours} ${t("hours")}`)}
              {row(X.steps[lang], (c) => c.steps)}
              {row(X.arch[lang], (c) => c.arch)}
              {row(X.land[lang], (c) => INTRO.end[c.p.id as "basic" | "advanced"][lang].replace(/^[^:]+:\s*(.)/, (_, ch: string) => ch.toUpperCase()))}
              {row(X.price[lang], (c) => (
                <>
                  <b>₪{c.p.price}</b> <span className="sub">{X.once[lang]}</span>
                </>
              ))}
              <tr className="cmp-sec">
                <th colSpan={cols.length + 1}>{X.covered[lang]}</th>
              </tr>
              {THEMES.map((th) => row(th.t[lang], (c) => cover(c.p, th.mods)))}
              <tr>
                <td />
                {cols.map(({ p }) => (
                  <td key={p.id}>
                    <Link
                      href={`/courses/${p.id}`}
                      className={cn(buttonVariants({ variant: p.id === "advanced" ? "brand" : "outline", size: "lg" }), "no-underline")}
                    >
                      {t("viewLessons")}
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <p className="sub cmp-note">{X.upgrade[lang]}</p>
      </section>
    </AppShell>
  );
}
