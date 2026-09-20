import { cookies } from "next/headers";
import type { Lang } from "./types";

export async function serverLang(): Promise<Lang> {
  const c = await cookies();
  return c.get("vibe.lang")?.value === "he" ? "he" : "en";
}
