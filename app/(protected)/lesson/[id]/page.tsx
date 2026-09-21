import { redirect } from "next/navigation";
import { withLang } from "@/lib/lang";
import { serverLang } from "@/lib/lang-server";

export default async function LessonIndex({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(withLang(await serverLang(), `/lesson/${id}/overview`));
}
