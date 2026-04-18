"use client";

import { useEffect, useRef } from "react";
import { animateCounter, revealOnScroll } from "@/lib/anime";

const METRICS = [
  {
    value: 50,
    suffix: "+",
    label: "Team Led",
    note: "Analytics, Business Science, Planning, and Data Strategy — for global Mars Inc. media.",
  },
  {
    value: 30,
    suffix: "%",
    label: "Tool Adoption Lift",
    note: "Analytics enablement programs increased practitioner adoption at GroupM scale.",
  },
  {
    value: 2,
    suffix: "×",
    label: "Digit Platform Gains",
    note: "MMM + MTA measurement rollouts produced double-digit performance lift.",
  },
  {
    value: 1,
    suffix: "M+",
    label: "HNW Portfolios",
    note: "AI-driven advisory model serving high-net-worth clients at Altus & Co.",
  },
  {
    value: 6,
    suffix: "",
    label: "Fortune Brands",
    note: "Directly advised at GroupM, Publicis, IPG — Mars, Citi, Macy's, Audible, J&J, Sony.",
  },
  {
    value: 12,
    suffix: "yr",
    label: "Executive Track",
    note: "VP through Managing Partner and Founder — operator first, advisor second.",
  },
];

export default function Impact() {
  const rootRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const revealClean = revealOnScroll(el.querySelectorAll(".reveal-el"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const n = Number(e.target.dataset.value);
          animateCounter(e.target, n, {
            suffix: e.target.dataset.suffix || "",
            duration: 1800,
          });
          io.unobserve(e.target);
        });
      },
      { threshold: 0.5 }
    );
    el.querySelectorAll(".counter").forEach((c) => io.observe(c));
    return () => {
      revealClean();
      io.disconnect();
    };
  }, []);

  return (
    <section ref={rootRef} className="section" style={{ paddingTop: 70, paddingBottom: 80 }}>
      <div style={{ maxWidth: 1480, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
            marginBottom: 64,
          }}
        >
          <div>
            <div className="eyebrow reveal-el" style={{ marginBottom: 22 }}>
              ⟡ No. 06 — Impact Ledger
            </div>
            <h2
              className="display reveal-el"
              style={{ fontSize: "clamp(40px, 5.2vw, 86px)", maxWidth: "14ch" }}
            >
              Receipts over rhetoric.
            </h2>
          </div>
          <div
            className="reveal-el mono"
            style={{
              maxWidth: 380,
              fontSize: 12,
              lineHeight: 1.6,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(18,18,18,0.65)",
              alignSelf: "flex-end",
            }}
          >
            Selected outcomes from roles as Managing Partner,
            VP of Analytics, Data Architecture, and Founder.
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 14,
          }}
          className="imp-grid"
        >
          {METRICS.map((m, i) => (
            <div key={i} className="metric reveal-el">
              <div
                className="value counter"
                data-value={m.value}
                data-suffix={m.suffix}
              >
                0{m.suffix}
              </div>
              <div className="label">{m.label}</div>
              <div className="note">{m.note}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          :global(.imp-grid) {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
