"use client";

import { useEffect, useRef } from "react";
import { revealOnScroll } from "@/lib/anime";

const STACK = {
  Cloud: ["AWS", "BigQuery", "Redshift", "Snowflake"],
  "BI & Viz": ["Tableau", "Power BI", "Looker", "Datorama"],
  "Analytics & Code": ["SQL", "R", "SAS", "Python", "Hive", "Hadoop"],
  "Martech & AdTech": ["DV360", "The Trade Desk", "DBM", "Turn", "Krux", "Salesforce"],
  "Measurement": ["Google Analytics", "Omniture", "Nielsen", "Epsilon", "Core ID"],
  "AI & Governance": ["OpenAI API", "LR Models", "CCPA", "GDPR", "BAM"],
};

export default function TechStack() {
  const rootRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const cleanup = revealOnScroll(el.querySelectorAll(".reveal-el"));
    return cleanup;
  }, []);

  return (
    <section ref={rootRef} className="section" style={{ paddingTop: 70, paddingBottom: 80 }}>
      <div style={{ maxWidth: 1480, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
            marginBottom: 56,
          }}
        >
          <div>
            <div className="eyebrow reveal-el" style={{ marginBottom: 22 }}>
              ⟡ No. 08 — Capability Stack
            </div>
            <h2
              className="display reveal-el"
              style={{ fontSize: "clamp(36px, 4.6vw, 72px)", maxWidth: "18ch" }}
            >
              Tool-agnostic. <span className="editorial" style={{ fontStyle: "italic", fontWeight: 400 }}>Outcome-obsessed.</span>
            </h2>
          </div>
          <div
            className="reveal-el mono"
            style={{
              maxWidth: 360,
              fontSize: 12,
              lineHeight: 1.6,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(18,18,18,0.6)",
            }}
          >
            Executed hands-on or in partnership with your teams
            and vendors. Swap tools, not the operating principles.
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 14,
            borderTop: "1px solid rgba(18,18,18,0.18)",
          }}
          className="stack-grid"
        >
          {Object.entries(STACK).map(([cat, items], i) => (
            <div
              key={cat}
              className="reveal-el"
              style={{
                borderBottom: "1px solid rgba(18,18,18,0.12)",
                padding: "28px 6px 32px",
                display: "flex",
                gap: 32,
                alignItems: "flex-start",
              }}
            >
              <div
                className="mono"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  width: 54,
                  color: "rgba(18,18,18,0.55)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "Helvetica Neue, Inter Tight, sans-serif",
                    fontWeight: 600,
                    fontSize: 22,
                    letterSpacing: "-0.02em",
                    marginBottom: 14,
                  }}
                >
                  {cat}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {items.map((it) => (
                    <span
                      key={it}
                      className="mono"
                      style={{
                        fontSize: 12,
                        letterSpacing: "0.04em",
                        padding: "5px 12px 6px",
                        border: "1px solid rgba(18,18,18,0.18)",
                        borderRadius: 100,
                        color: "rgba(18,18,18,0.85)",
                      }}
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          :global(.stack-grid) { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
