import { AppShell } from "@/components/AppShell";
import { Courses } from "@/components/Courses";

export default function HomePage() {
  return (
    <AppShell showHero>
      <Courses />
    </AppShell>
  );
}
