"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useApp } from "./Providers";

export function PromptBox({ id, text, label }: { id: string | number; text: string; label: string }) {
  const { t } = useApp();
  const [msg, setMsg] = useState(t("copy"));

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setMsg(t("copied"));
      setTimeout(() => setMsg(t("copy")), 1400);
    } catch {
      setMsg(t("copyFail"));
    }
  };

  return (
    <div className="promptbox">
      <div className="lbl">{label}</div>
      <Button className="copy" size="xs" variant="outline" type="button" onClick={copy}>
        {msg}
      </Button>
      <pre className="code" id={`p${id}`}>{text}</pre>
    </div>
  );
}
