"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useApp } from "./Providers";
import type { QuizQ } from "@/lib/types";

export function QuizBlock({ modId, questions }: { modId: string; questions: QuizQ[] }) {
  const { lang, t } = useApp();
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const got = questions.filter((q, i) => answers[i] === q.c).length;
  const answered = questions.filter((_, i) => answers[i] !== undefined).length;

  return (
    <div className="quiz">
      <h3>{t("test")}</h3>
      <p className="sub">{t("testSub")}</p>
      {questions.map((q, qi) => {
        const pick = answers[qi];
        return (
          <div key={qi} className="q">
            <div className="qt"><i>{qi + 1}.</i>{q.q[lang]}</div>
            {q.a.map((a, ai) => {
              let cls = "";
              let mk = "";
              if (pick !== undefined) {
                if (ai === q.c) { cls = "right"; mk = "✓"; }
                else if (ai === pick) { cls = "wrong"; mk = "×"; }
              }
              return (
                <Button
                  key={ai}
                  type="button"
                  variant="outline"
                  className={cn("opt", cls)}
                  disabled={pick !== undefined}
                  onClick={() => setAnswers((prev) => ({ ...prev, [qi]: ai }))}
                >
                  <span className="mk">{mk}</span>
                  {a[lang]}
                </Button>
              );
            })}
            {pick !== undefined ? <div className="ans">{q.why[lang]}</div> : null}
          </div>
        );
      })}
      {answered === questions.length ? (
        <div className={cn("score", got === questions.length && "pass")}>
          {got} / {questions.length}
          {got === questions.length ? ` — ${t("perfect")}` : ""}
        </div>
      ) : null}
    </div>
  );
}
