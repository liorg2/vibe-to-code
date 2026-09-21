"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef, type ComponentProps } from "react";
import { parseLangFromPath, withLang } from "@/lib/lang";

const Link = forwardRef<HTMLAnchorElement, ComponentProps<typeof NextLink>>(function Link(
  { href, ...props },
  ref,
) {
  const lang = parseLangFromPath(usePathname());
  const next =
    typeof href === "string"
      ? withLang(lang, href)
      : href && typeof href === "object" && "pathname" in href && href.pathname
        ? { ...href, pathname: withLang(lang, href.pathname) }
        : href;
  return <NextLink ref={ref} href={next} {...props} />;
});

export default Link;
