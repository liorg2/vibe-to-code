import { cookies, headers } from "next/headers";
import { parseLang } from "./lang";
import type { Lang } from "./types";

export async function serverLang(): Promise<Lang> {
  const h = await headers();
  const fromUrl = h.get("x-vibe-lang");
  if (fromUrl) return parseLang(fromUrl);
  const c = await cookies();
  return parseLang(c.get("vibe.lang")?.value);
}
