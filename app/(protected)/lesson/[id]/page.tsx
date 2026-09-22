import { redirect } from "next/navigation";
import { withLang } from "@/lib/lang";
import { serverLang } from "@/lib/lang-server";

export default async function LessonIndex({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ course?: string }>;
}) {
  const { id } = await params;
  const { course } = await searchParams;
  const q = course === "basic" || course === "advanced" ? `?course=${course}` : "";
  redirect(withLang(await serverLang(), `/lesson/${id}/overview${q}`));
}
