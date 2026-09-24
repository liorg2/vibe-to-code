import Link from "@/components/Link";
import { UI } from "@/lib/course";
import type { Lang } from "@/lib/types";

/** The switch at the top of a course: every lesson in full, or the whole course on one page. */
export function CourseMode({ id, active, lang }: { id: string; active: "full" | "tldr"; lang: Lang }) {
  const t = (k: string) => UI[k]?.[lang] ?? k;
  return (
    <div className="mode-row">
      <nav className="mode-switch" aria-label={t("viewMode")}>
        <Link href={`/courses/${id}`} className={active === "full" ? "on" : ""} aria-current={active === "full" ? "page" : undefined}>
          📚 {t("fullCourse")}
        </Link>
        <Link href={`/courses/${id}/tldr`} className={active === "tldr" ? "on" : ""} aria-current={active === "tldr" ? "page" : undefined}>
          ⚡ {t("tldr")}
        </Link>
      </nav>
      <span className="mode-hint">{t(active === "full" ? "tldrCta" : "tldrSub")}</span>
    </div>
  );
}
