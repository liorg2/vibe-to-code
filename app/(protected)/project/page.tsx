import { AppShell } from "@/components/AppShell";
import { ProjectClient } from "@/components/ProjectClient";
import { ARCHITECTURES, CHECKLIST, projectFor } from "@/lib/course";
import { serverLang } from "@/lib/lang-server";

export default async function ProjectPage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string }>;
}) {
  const { course } = await searchParams;
  const which = course === "basic" ? "basic" : "advanced";
  const lang = await serverLang();
  const P = projectFor(which);

  return (
    <AppShell>
      <ProjectClient
        title={P.title[lang]}
        blurb={P.blurb[lang]}
        warn={P.warn[lang]}
        icon={P.icon}
        steps={P.steps}
        planPrefix={which === "basic" ? "basic" : ""}
        nextHref={which === "basic" ? "/architectures?course=basic" : "/checklist?course=advanced"}
        nextLabel={which === "basic" ? ARCHITECTURES.title[lang] : CHECKLIST.title[lang]}
      />
    </AppShell>
  );
}
