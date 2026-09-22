import { AppShell } from "@/components/AppShell";
import { serverLang } from "@/lib/lang-server";
import type { Lang } from "@/lib/types";

export type LegalText = { title: string; lede: string; s: { h: string; p: string[] }[] };

/** Terms and Privacy: plain bilingual sections. ponytail: arrays in the page, not course.json —
 *  legal text changes rarely and must be readable in review. */
export async function LegalPage({ text, updated }: { text: Record<Lang, LegalText>; updated: string }) {
  const lang = await serverLang();
  const x = text[lang];
  return (
    <AppShell showNav={false}>
      <article className="slide legal">
        <div className="kicker">Vibe → Code</div>
        <h2>{x.title}</h2>
        <p className="lede">{x.lede}</p>
        <p className="sub">
          {lang === "he" ? "עודכן לאחרונה" : "Last updated"}: {updated}
        </p>
        {x.s.map((s) => (
          <section key={s.h}>
            <h3>{s.h}</h3>
            {s.p.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </section>
        ))}
      </article>
    </AppShell>
  );
}
