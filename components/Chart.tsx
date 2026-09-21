"use client";

import { useEffect, useRef, useState } from "react";
import { useApp } from "./Providers";

/** ponytail: mermaid is ~1MB, so it loads on demand inside the effect — a page
 *  without a chart never pays for it. */
export function Chart({ def, caption }: { def: string; caption?: string }) {
  const { theme } = useApp();
  const [svg, setSvg] = useState("");
  const idRef = useRef(`dia-${Math.random().toString(36).slice(2, 9)}`);

  useEffect(() => {
    let live = true;
    (async () => {
      const { default: mermaid } = await import("mermaid");
      const dark = theme === "dark";
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        theme: "base",
        fontFamily: "Inter, system-ui, sans-serif",
        themeVariables: {
          background: "transparent",
          primaryColor: dark ? "#1b1f2c" : "#f3f5fa",
          primaryTextColor: dark ? "#e8eaf0" : "#12141c",
          primaryBorderColor: dark ? "#39405a" : "#c9d0e2",
          lineColor: dark ? "#6b7286" : "#8a91a6",
          secondaryColor: dark ? "#241f45" : "#ece9fd",
          tertiaryColor: dark ? "#102b2a" : "#e2f7f3",
          fontSize: "14px",
        },
      });
      const { svg: out } = await mermaid.render(idRef.current, def);
      if (live) setSvg(out);
    })().catch(() => {
      // a broken definition shouldn't blank the page — the caption still says what it is
      if (live) setSvg("");
    });
    return () => {
      live = false;
    };
  }, [def, theme]);

  return (
    <figure className="chart">
      {svg ? (
        <div className="chart-svg" dangerouslySetInnerHTML={{ __html: svg }} />
      ) : (
        <div className="chart-load" aria-hidden="true" />
      )}
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
