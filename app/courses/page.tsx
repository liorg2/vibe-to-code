import { AppShell } from "@/components/AppShell";
import { CoursesContent } from "@/components/CoursesContent";

export const metadata = { title: "Courses" };

export default function CoursesPage() {
  return (
    <AppShell>
      <CoursesContent />
    </AppShell>
  );
}
