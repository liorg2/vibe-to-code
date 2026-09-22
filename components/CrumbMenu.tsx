"use client";

import { useEffect, useRef, useState } from "react";
import Link from "@/components/Link";

export type MenuItem = { label: string; href: string; on?: boolean };

/** A breadcrumb item that opens a list to jump sideways, e.g. to another lesson of the course. */
export function CrumbMenu({ label, items }: { label: string; items: MenuItem[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const away = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", away);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", away);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  return (
    <span className="crumb-menu" ref={ref}>
      <button type="button" aria-expanded={open} aria-haspopup="true" onClick={() => setOpen(!open)}>
        {label} <span aria-hidden="true">▾</span>
      </button>
      {open ? (
        <ul>
          {items.map((it) => (
            <li key={it.href}>
              <Link href={it.href} className={it.on ? "on" : undefined} aria-current={it.on ? "page" : undefined} onClick={() => setOpen(false)}>
                {it.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </span>
  );
}
