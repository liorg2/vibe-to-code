import type { MetadataRoute } from "next";
import { LANGS } from "@/lib/lang";
import { PROTECTED } from "@/lib/protected";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // lesson content sits behind a session; crawling it only yields login redirects
      disallow: [
        "/api/",
        ...LANGS.flatMap((l) => [`/${l}/login`, `/${l}/no-access`, ...PROTECTED.map((p) => `/${l}/${p}`)]),
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
