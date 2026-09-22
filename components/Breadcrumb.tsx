import Link from "@/components/Link";
import { MODULES, lessonNo } from "@/lib/course";
import type { Lang, Path } from "@/lib/types";
import { CrumbMenu, type MenuItem } from "./CrumbMenu";

export type Crumb = { label: string; href?: string; menu?: MenuItem[] };

/** The lesson crumb's menu: every lesson of the course, to switch without going back up. */
export function lessonMenu(path: Path | undefined, current: string, lang: Lang, q: (href: string) => string): MenuItem[] | undefined {
  return path?.mods
    .map((id) => MODULES.find((m) => m.id === id))
    .filter((m) => !!m)
    .map((m) => ({ label: `${lessonNo(m.id)} · ${m.title[lang]}`, href: q(`/lesson/${m.id}/overview`), on: m.id === current }));
}

/** Trail for the deep pages: the last item is the current page and is not a link. */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      {items.map((c, i) => (
        <span key={i} className="crumbs-item">
          {c.menu ? (
            <CrumbMenu label={c.label} items={c.menu} />
          ) : c.href ? (
            <Link href={c.href}>{c.label}</Link>
          ) : (
            <span aria-current="page">{c.label}</span>
          )}
          {i < items.length - 1 ? (
            <span className="sep" aria-hidden="true">&rsaquo;</span>
          ) : null}
        </span>
      ))}
    </nav>
  );
}
