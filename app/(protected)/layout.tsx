import { headers } from "next/headers";
import { isPreviewPath } from "@/lib/protected";
import { requireSession } from "@/lib/verify-session";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  // middleware hands the locale-stripped path back on a header; preview lessons need no session
  if (!isPreviewPath((await headers()).get("x-vibe-path") ?? "")) await requireSession();
  return children;
}
