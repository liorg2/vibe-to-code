import type { MetadataRoute } from "next";
import { PATHS } from "@/lib/course";
import { LANGS } from "@/lib/lang";
import { abs } from "@/lib/site";

/** ponytail: only the pages a signed-out visitor can actually reach. */
const ROUTES = ["/", "/courses", "/pricing", "/compare", "/terms", "/privacy", ...PATHS.map((p) => `/courses/${p.id}`)];

export default function sitemap(): MetadataRoute.Sitemap {
  return LANGS.flatMap((lang) =>
    ROUTES.map((path) => ({
      url: abs(lang, path),
      alternates: { languages: Object.fromEntries(LANGS.map((l) => [l, abs(l, path)])) },
    })),
  );
}
