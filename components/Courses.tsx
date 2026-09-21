import Link from "next/link";
import { BuyButton } from "./BuyButton";
import { CourseProgress } from "./CourseProgress";
import { LevelTag } from "./LevelTag";
import { MODULES, PATHS, UI, mins } from "@/lib/course";
import { billingOn, currentTier } from "@/lib/entitlement";
import { serverLang } from "@/lib/lang-server";
import { priceId } from "@/lib/paddle";
import { sessionClaims } from "@/lib/verify-session";
import type { Tier } from "@/lib/db";
import type { Module, Path } from "@/lib/types";

/** ILS, VAT included — the gap between the two courses. */
export const UPGRADE_PRICE = 50;

export function modsOf(p: Path): Module[] {
  return p.mods.map((id) => MODULES.find((m) => m.id === id)).filter(Boolean) as Module[];
}

/** The two courses as buyable cards. Server component: price/ownership never trusts the client. */
export async function Courses({ paid }: { paid?: boolean }) {
  const lang = await serverLang();
  const t = (k: string) => UI[k]?.[lang] ?? k;
  const claims = await sessionClaims();
  const tier = await currentTier();
  const open = !billingOn();

  const card = (p: Path) => {
    const which = p.id as Tier;
    const mods = modsOf(p);
    const terms = mods.reduce((n, m) => n + m.terms.length, 0);
    const time = mods.reduce((n, m) => n + mins(m), 0);
    const owned = tier === which || (which === "basic" && tier === "advanced");
    const view = (
      <Link className={`btn big${owned || open ? " prim" : ""}`} href={`/courses/${p.id}`}>
        {owned ? t("continue") : t("viewLessons")}
      </Link>
    );
    return (
      <article key={p.id} className={`course${which === "advanced" ? " adv" : ""}`}>
        <div className="row">
          <span className="ic">{p.icon}</span>
          <div>
            <div className="num">
              <LevelTag lvl="A" />{which === "advanced" ? <LevelTag lvl="B" /> : null}
            </div>
            <h4>{p.title[lang]}</h4>
          </div>
        </div>
        <p className="blurb">{p.blurb[lang]}</p>
        <div className="meta">
          <span>{mods.length} {t("lessonsN")}</span>
          <span>{terms} {t("terms")}</span>
          <span>~{time} {t("min")}</span>
        </div>
        <CourseProgress ids={p.mods} />
        <div className="price">
          <b>₪{p.price}</b>
          <span>{t("payOnce")}</span>
        </div>
        <div className="cta">
          {owned ? (
            <>{view}<span className="btn big">✓ {t("owned")}</span></>
          ) : open ? (
            view
          ) : !claims ? (
            <><Link className="btn prim big" href="/login?next=/courses">{t("signInBuy")}</Link>{view}</>
          ) : (
            <>
              <BuyButton
                endpoint="/api/billing/checkout"
                tier={which}
                label={`${t("buy")} · ₪${p.price}`}
                disabled={!priceId(which)}
              />
              {view}
            </>
          )}
        </div>
      </article>
    );
  };

  return (
    <section className="paths">
      <div className="phead">
        <h3>{t("paths")}</h3>
        <p>{t("coursesSub")}</p>
      </div>
      {paid ? <p className="note">{tier ? t("paidOk") : t("paidWait")}</p> : null}
      <div className="pgrid">{PATHS.map(card)}</div>
      {tier === "basic" && !open ? (
        <div className="note" style={{ marginTop: 18 }}>
          <p style={{ marginBottom: 12 }}>{t("upgradeSub")}</p>
          <BuyButton
            endpoint="/api/billing/upgrade"
            label={`${t("upgrade")} · ₪${UPGRADE_PRICE}`}
            disabled={!priceId("upgrade")}
          />
        </div>
      ) : null}
      {open ? <p className="empty">{t("allOpen")}</p> : null}
    </section>
  );
}
