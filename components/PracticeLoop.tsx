"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useApp } from "./Providers";

/** Plan → ask AI (below) → verify cues. No per-term content. */
export function PracticeLoop() {
  const { t } = useApp();
  const [plan, setPlan] = useState("");
  const [checks, setChecks] = useState([false, false, false]);
  const cues = [t("practiceV1"), t("practiceV2"), t("practiceV3")];

  return (
    <details className="practice">
      <summary>
        {t("practice")}
        <span className="sub">{t("practiceSub")}</span>
      </summary>
      <label className="practice-plan">
        <span>{t("practicePlan")}</span>
        <textarea
          rows={2}
          value={plan}
          placeholder={t("practicePlanPh")}
          onChange={(e) => setPlan(e.target.value)}
        />
      </label>
      <p className="practice-go">{t("practiceGo")}</p>
      <div className="practice-verify">
        <div className="lbl">{t("practiceVerifyTitle")}</div>
        {cues.map((label, i) => (
          <label key={i} className="practice-check">
            <Checkbox
              checked={checks[i]}
              onCheckedChange={() =>
                setChecks((prev) => prev.map((v, j) => (j === i ? !v : v)))
              }
            />
            <span>{label}</span>
          </label>
        ))}
      </div>
    </details>
  );
}
