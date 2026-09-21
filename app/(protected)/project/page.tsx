import { AppShell } from "@/components/AppShell";
import { ProjectClient } from "@/components/ProjectClient";
import { CHECKLIST, PROJECT } from "@/lib/course";
import { serverLang } from "@/lib/lang-server";

export default async function ProjectPage() {
  const lang = await serverLang();
  const P = PROJECT;

  return (
    <AppShell>
      <ProjectClient
        title={P.title[lang]}
        blurb={P.blurb[lang]}
        warn={P.warn[lang]}
        icon={P.icon}
        steps={P.steps}
        checklistTitle={CHECKLIST.title[lang]}
      />
    </AppShell>
  );
}
