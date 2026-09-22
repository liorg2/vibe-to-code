import { AppShell } from "@/components/AppShell";
import { Courses } from "@/components/Courses";
import { PacManGame } from "@/components/PacManGame";

export default function HomePage() {
  return (
    <AppShell showHero showNav={false}>
      <PacManGame />
      <Courses />
    </AppShell>
  );
}
