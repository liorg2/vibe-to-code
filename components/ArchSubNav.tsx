"use client";

import Link from "next/link";
import { useApp } from "./Providers";
import { ARCHITECTURES } from "@/lib/course";

export function ArchSubNav({ active }: { active: string }) {
  const { lang } = useApp();
  return (
    <nav className="subnav" aria-label={ARCHITECTURES.title[lang]}>
      {ARCHITECTURES.items.map((a, j) => (
        <Link key={a.id} href={`/architectures/${a.id}`} className={a.id === active ? "on" : ""}>
          <span className="sn">{j + 1}</span>
          {a.title[lang]}
        </Link>
      ))}
    </nav>
  );
}
