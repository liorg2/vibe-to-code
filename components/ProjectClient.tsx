"use client";

import Link from "@/components/Link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PromptBox } from "./PromptBox";
import { useApp } from "./Providers";
import { findTerm } from "@/lib/course";
import type { ProjectStep } from "@/lib/types";

const PLANS_KEY = "vibe2code.v2.plans";

function loadPlans(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(PLANS_KEY) || "{}");
  } catch {
    return {};
  }
}

function savePlans(plans: Record<string, string>) {
  try {
    localStorage.setItem(PLANS_KEY, JSON.stringify(plans));
  } catch {
    /* ponytail: private mode */
  }
}

export function ProjectClient({
  title,
  blurb,
  warn,
  icon,
  steps,
  planPrefix = "",
  nextHref,
  nextLabel,
}: {
  title: string;
  blurb: string;
  warn: string;
  icon: string;
  steps: ProjectStep[];
  /** Keeps Basic and Advanced checkmarks from sharing step numbers. Empty keeps the old keys. */
  planPrefix?: string;
  nextHref: string;
  nextLabel: string;
}) {
  const { lang, t, ticked, toggleTicked } = useApp();
  const [plans, setPlans] = useState<Record<string, string>>({});
  const [unlocked, setUnlocked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = loadPlans();
    setPlans(saved);
    const u: Record<string, boolean> = {};
    for (const s of steps) {
      const k = planPrefix ? `${planPrefix}:${s.n}` : String(s.n);
      if ((saved[k] || "").trim().length >= 12) u[k] = true;
    }
    setUnlocked(u);
  }, [steps, planPrefix]);

  const setPlan = (n: number, text: string) => {
    const k = planPrefix ? `${planPrefix}:${n}` : String(n);
    const next = { ...plans, [k]: text };
    setPlans(next);
    savePlans(next);
  };

  const unlock = (n: number) => {
    const k = planPrefix ? `${planPrefix}:${n}` : String(n);
    if ((plans[k] || "").trim().length < 12) return;
    setUnlocked((u) => ({ ...u, [k]: true }));
  };

  return (
    <>
      <Link className="crumb" href="/">
        ← All lessons
      </Link>
      <section className="mod">
        <div className="mhead">
          <div className="ic">{icon}</div>
          <div>
            <h2>{title}</h2>
          </div>
          <div className="n">{steps.length} steps</div>
        </div>
        <p className="mblurb">{blurb}</p>
      </section>
      <div className="note">⚠ {warn}</div>
      {steps.map((s) => {
        const k = planPrefix ? `${planPrefix}:${s.n}` : String(s.n);
        const open = !!unlocked[k];
        const plan = plans[k] || "";
        return (
          <div key={s.n} className="step">
            <div className="top">
              <div className="no">{s.n}</div>
              <h3>{s.title[lang]}</h3>
            </div>
            <p className="goal">
              <b>Goal:</b> {s.goal[lang]}
            </p>
            <p className="whyp">{s.why[lang]}</p>
            <div className="tags">
              {s.uses.map((u) => {
                const loc = findTerm(u);
                return loc ? (
                  <Link key={u} href={`/lesson/${loc.m.id}/${loc.i}`}>
                    {loc.tm.t[lang]}
                  </Link>
                ) : null;
              })}
            </div>

            <div className="plan-gate">
              <div className="lbl">{t("planGate")}</div>
              <p className="sub">{s.acceptance?.[lang] || t("planGateSub")}</p>
              <textarea
                rows={2}
                value={plan}
                placeholder={t("planGatePh")}
                onChange={(e) => setPlan(s.n, e.target.value)}
                disabled={open}
              />
              {!open ? (
                <Button
                  type="button"
                  variant="outline"
                  disabled={plan.trim().length < 12}
                  onClick={() => unlock(s.n)}
                >
                  {t("planGateUnlock")}
                </Button>
              ) : null}
              {!open && plan.trim().length < 12 ? (
                <p className="hint">{t("planGateLocked")}</p>
              ) : null}
            </div>

            {open ? (
              <>
                <PromptBox id={s.n} text={s.prompt} label="Prompt to paste" />
                <div className="verify-gate">
                  <div className="lbl">{t("verifyGate")}</div>
                  <p className="sub">{t("verifyGateSub")}</p>
                  {(s.verify || []).map((item, i) => {
                    const ck = planPrefix ? `proj:${planPrefix}:${s.n}:v${i}` : `proj:${s.n}:v${i}`;
                    return (
                      <label key={ck} className="practice-check">
                        <Checkbox
                          checked={ticked.has(ck)}
                          onCheckedChange={(checked) => toggleTicked(ck, checked === true)}
                        />
                        <span>{item[lang]}</span>
                      </label>
                    );
                  })}
                </div>
              </>
            ) : null}
          </div>
        );
      })}
      <div className="pager">
        <Link className="nx" href={nextHref}>
          <b>Next</b>
          <span>{nextLabel}</span>
        </Link>
      </div>
    </>
  );
}
