"use client";

import Link from "@/components/Link";
import { cn } from "@/lib/utils";
import { useApp } from "./Providers";
import { ARCHITECTURES } from "@/lib/course";
import type { Architecture } from "@/lib/types";

export function ArchSubNav({ active, items, course }: { active: string; items: Architecture[]; course: string }) {
  const { lang } = useApp();
  return (
    <nav className="subnav" aria-label={ARCHITECTURES.title[lang]}>
      {items.map((a, j) => (
        <Link
          key={a.id}
          href={`/architectures/${a.id}?course=${course}`}
          className={cn(a.id === active && "on")}
        >
          <span className="sn">{j + 1}</span>
          {a.title[lang]}
        </Link>
      ))}
    </nav>
  );
}
