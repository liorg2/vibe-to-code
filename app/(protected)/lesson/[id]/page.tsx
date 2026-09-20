import { redirect } from "next/navigation";

export default async function LessonIndex({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`/lesson/${id}/0`);
}
