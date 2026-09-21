import Link from "@/components/Link";

export type Crumb = { label: string; href?: string };

/** Trail for the deep pages: the last item is the current page and is not a link. */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      {items.map((c, i) => (
        <span key={i} className="crumbs-item">
          {c.href ? (
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
