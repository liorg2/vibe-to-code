import Link from "@/components/Link";
import { BuyButton } from "./BuyButton";
import { CourseProgress } from "./CourseProgress";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MODULES, PATHS, UI, courseHours } from "@/lib/course";
import { billingOn, ownedCourses, type Course } from "@/lib/entitlement";
import { serverLang } from "@/lib/lang-server";
import { priceId } from "@/lib/paddle";
import { sessionClaims } from "@/lib/verify-session";
import type { Module, Path } from "@/lib/types";
import { PacManLane } from "./PacManGame";

/** ILS, VAT included — the gap between the two courses. */
export const UPGRADE_PRICE = 50;

export function modsOf(p: Path): Module[] {
  return p.mods.map((id) => MODULES.find((m) => m.id === id)).filter(Boolean) as Module[];
}

/** The two courses as buyable cards. Server component: price/ownership never trusts the client. */
export async function Courses({ paid, lane }: { paid?: boolean; lane?: boolean }) {
  const lang = await serverLang();
  const t = (k: string) => UI[k]?.[lang] ?? k;
  const claims = await sessionClaims();
  const mine = await ownedCourses();
  const open = !billingOn();

  const card = (p: Path) => {
    const which = p.id as Course;
    const mods = modsOf(p);
    const terms = mods.reduce((n, m) => n + m.terms.length, 0);
    const owned = mine.has(which);
    const view = (
      <Link
        href={`/courses/${p.id}`}
        className={cn(
          buttonVariants({ variant: owned || open ? "brand" : "outline", size: "lg" }),
          "no-underline",
        )}
      >
        {owned ? t("continue") : t("viewLessons")}
      </Link>
    );
    return (
      <Card key={p.id} className={cn("course overflow-visible ring-0 py-0 shadow-none", which === "advanced" && "adv")}>
        <CardContent className="flex flex-col gap-3 p-0">
          <div className="row">
            <span className="ic">{p.icon}</span>
            <div>
              <h4>{p.title[lang]}</h4>
            </div>
          </div>
          <p className="blurb">{p.blurb[lang]}</p>
          <div className="meta">
            <span>{mods.length} {t("lessonsN")}</span>
            <span>{terms} {t("terms")}</span>
            <span>~{courseHours(mods)} {t("hours")}</span>
          </div>
          <CourseProgress ids={p.mods} />
          <div className="price">
            <b>₪{p.price}</b>
            <span>{t("payOnce")}</span>
          </div>
        </CardContent>
        <CardFooter className="cta mt-auto flex-col items-stretch gap-2 border-0 bg-transparent p-0">
          {owned ? (
            <>
              {view}
              <Button variant="outline" size="lg" disabled>
                ✓ {t("owned")}
              </Button>
            </>
          ) : open ? (
            view
          ) : !claims ? (
            <>
              <Link
                href="/login?next=/courses"
                className={cn(buttonVariants({ variant: "brand", size: "lg" }), "no-underline")}
              >
                {t("signInBuy")}
              </Link>
              {view}
            </>
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
        </CardFooter>
      </Card>
    );
  };

  return (
    <section className="paths">
      <div className="phead">
        <h3>{t("paths")}</h3>
        <p>{t("coursesSub")}</p>
      </div>
      {paid ? <p className="note">{mine.size ? t("paidOk") : t("paidWait")}</p> : null}
      <div className={cn("pgrid", lane && "pgrid-lane")}>
        {PATHS.map(card)}
        {lane ? <PacManLane /> : null}
      </div>
      <p className="sub legal-note">
        <Link href="/compare">{lang === "he" ? "בסיס או מתקדם? השוואה בין הקורסים ←" : "Basic or Advanced? Compare the courses →"}</Link>
      </p>
      {mine.size === 1 && !open ? (
        <div className="note" style={{ marginTop: 18 }}>
          <p style={{ marginBottom: 12 }}>{t("addCourseSub")}</p>
          <BuyButton
            endpoint="/api/billing/upgrade"
            label={`${t("addCourse")} · ₪${UPGRADE_PRICE}`}
            disabled={!priceId("upgrade")}
          />
        </div>
      ) : null}
      {open ? <p className="empty">{t("allOpen")}</p> : null}
      <p className="sub legal-note">
        <Link href="/terms">
          {lang === "he"
            ? "רכישה מהווה הסכמה לתנאי השימוש. עלויות של שירותי AI, ענן ומסדי נתונים שתפתחו במהלך הקורס הן באחריותכם."
            : "Buying means you accept the terms. Costs of AI, cloud and database services you open during the course are yours."}
        </Link>
      </p>
    </section>
  );
}
