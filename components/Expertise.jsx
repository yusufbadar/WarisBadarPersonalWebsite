"use client";

import { useEffect, useRef } from "react";
import { revealOnScroll } from "@/lib/anime";

const ITEMS = [
  {
    n: "01",
    title: "Fractional CEO & C-Suite",
    body:
      "Embed as acting CEO, CDO, CMO, or Head of Strategy for 6–18 months. Operating rhythm, hiring architecture, and revenue systems that outlive the engagement.",
    tag: "Leadership",
  },
  {
    n: "02",
    title: "Business Intelligence Strategy",
    body:
      "Design the BI stack, data models, and governance that turn reporting into decision-making — across enterprise, marketing, finance, and product.",
    tag: "BI · Analytics",
  },
  {
    n: "03",
    title: "Marketing & Growth Analytics",
    body:
      "MMM, MTA, incrementality, audience architecture, and measurement frameworks that unlock double-digit lift in platform performance and ROI.",
    tag: "Measurement",
  },
  {
    n: "04",
    title: "Enterprise Data Transformation",
    body:
      "Identity resolution, data lineage, governance, and martech integration at Citi, Macy&apos;s, and Audible-scale. Compliance-grade, activation-ready.",
    tag: "Transformation",
  },
  {
    n: "05",
    title: "AI-Enabled Advisory",
    body:
      "Frontier-model adoption for investment research, client advisory, portfolio optimization, and enterprise decision support. From pilot to production.",
    tag: "AI · ML",
  },
  {
    n: "06",
    title: "Customer & Revenue Strategy",
    body:
      "Audience strategy, segmentation, lifecycle economics, and cross-platform engagement. Revenue unit-economics that sharpen board narratives.",
    tag: "Growth",
  },
];

export default function Expertise() {
  const rootRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const cleanup = revealOnScroll(el.querySelectorAll(".reveal-el"), {
      translateY: [60, 0],
    });
    return cleanup;
  }, []);

  return (
    <section id="expertise" ref={rootRef} className="section">
      <div style={{ maxWidth: 1480, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 24,
            marginBottom: 54,
          }}
        >
          <div>
            <div className="eyebrow reveal-el" style={{ marginBottom: 22 }}>
              ⟡ No. 03 — Executive Expertise
            </div>
            <h2
              className="display reveal-el"
              style={{ fontSize: "clamp(40px, 5.2vw, 86px)", maxWidth: "14ch" }}
            >
              Six practices. One operating philosophy.
            </h2>
          </div>
          <div
            className="reveal-el"
            style={{
              maxWidth: 440,
              fontSize: 16,
              lineHeight: 1.5,
              color: "rgba(18,18,18,0.72)",
            }}
          >
            Every engagement is bespoke. The throughline is the same:
            translate complexity into leverage, and leverage into
            compound growth.
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 14,
          }}
          className="expertise-grid"
        >
          {ITEMS.map((it) => (
            <article key={it.n} className="card reveal-el">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span className="card__num">N° {it.n}</span>
                <span className="card__num">/ 06</span>
              </div>
              <h3 className="card__title">{it.title}</h3>
              <p className="card__body" dangerouslySetInnerHTML={{ __html: it.body }} />
              <div className="card__label">{it.tag}</div>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          :global(.expertise-grid) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
