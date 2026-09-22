import Link from "@/components/Link";
import { BuildDone } from "@/components/BuildDone";
import { PromptBox } from "@/components/PromptBox";
import { promptFor } from "@/lib/builds";
import type { BuildStep } from "@/lib/builds/types";
import { UI, findTermK } from "@/lib/course";
import type { Lang } from "@/lib/types";

/** A build step's working part: why, the topics it uses, the two prompts and the "done when" ticks.
 *  Server-only: the prompts are paid content. Shared by the lesson's Build page and the Build track. */
export function BuildBody({ id, b, lang, q }: { id: string; b: BuildStep; lang: Lang; q: (href: string) => string }) {
  const t = (k: string) => UI[k]?.[lang] ?? k;
  return (
    <>
      <p className="build-why">{b.why[lang]}</p>
      <div className="tags">
        {b.uses.map((k) => {
          const loc = findTermK(k);
          return loc ? (
            <Link key={k} href={q(`/lesson/${loc.m.id}/${loc.i}`)}>
              {loc.tm.t[lang]}
            </Link>
          ) : null;
        })}
      </div>
      <h3 className="build-h">{t("buildDo")}</h3>
      <p className="sub">{t("buildDoSub")}</p>
      <PromptBox id={`${id}-build`} text={promptFor(b.build, lang)} label={t("prompt")} />
      <h3 className="build-h">{t("buildCheck")}</h3>
      <p className="sub">{t("buildCheckSub")}</p>
      <PromptBox id={`${id}-check`} text={promptFor(b.check, lang)} label={t("prompt")} />
      <h3 className="build-h">{t("buildDone")}</h3>
      <BuildDone id={id} items={b.done.map((d) => d[lang])} />
    </>
  );
}
