"use client";

import { useEffect, useId, useRef, useState } from "react";

export default function MermaidBlock({ chart }: { chart: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const reactId = useId();
  const diagramId = `mermaid-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const mermaid = (await import("mermaid")).default;

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "base",
          themeVariables: {
            darkMode: true,
            background: "transparent",
            primaryColor: "rgb(142 150 204 / 0.12)",
            primaryTextColor: "#ece9e2",
            primaryBorderColor: "rgb(142 150 204 / 0.4)",
            secondaryColor: "rgb(236 233 226 / 0.06)",
            tertiaryColor: "rgb(236 233 226 / 0.04)",
            lineColor: "#8e96cc",
            fontFamily: "var(--font-mono), monospace",
            fontSize: "14px",
          },
        });

        const { svg } = await mermaid.render(diagramId, chart);

        if (!cancelled && hostRef.current) {
          hostRef.current.innerHTML = svg;
        }
      } catch {
        if (!cancelled) setFailed(true);
      }
    }

    render();

    return () => {
      cancelled = true;
    };
  }, [chart, diagramId]);

  if (failed) {
    return (
      <div className="my-7 rounded-xl border border-line bg-[rgb(236_233_226/0.03)] p-4">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
          Diagram
        </p>
        <pre className="overflow-x-auto font-mono text-sm leading-relaxed text-muted">
          {chart}
        </pre>
      </div>
    );
  }

  return (
    <div
      ref={hostRef}
      role="img"
      aria-label="Mermaid diagram"
      className="my-7 flex min-h-16 justify-center overflow-x-auto rounded-xl border border-line bg-[rgb(236_233_226/0.02)] p-5 [&_svg]:h-auto [&_svg]:max-w-full"
    />
  );
}
