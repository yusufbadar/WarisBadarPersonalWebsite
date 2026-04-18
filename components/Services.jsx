"use client";

import { useEffect, useRef } from "react";
import { revealOnScroll } from "@/lib/anime";

const SERVICES = [
  {
    n: "S / 01",
    title: "Fractional Executive Leadership",
    body:
      "6–18 month engagements as acting CEO, CDO, CMO, Head of BI, or Head of Strategy.",
    size: "tall",
  },
  {
    n: "S / 02",
    title: "Business Intelligence Strategy",
    body:
      "Stack architecture, governance, and decision frameworks that turn reporting into leverage.",
  },
  {
    n: "S / 03",
    title: "Marketing & Growth Analytics",
    body:
      "MMM, MTA, incrementality, audience modeling, and measurement that compounds campaign ROI.",
    size: "alt",
  },
  {
    n: "S / 04",
    title: "Enterprise Data Transformation",
    body:
      "Identity, lineage, martech, and compliance — enterprise-grade and activation-ready.",
    size: "wide",
  },
  {
    n: "S / 05",
    title: "AI-Enabled Advisory",
    body:
      "Model selection, adoption pathways, and production pipelines for decision-grade AI.",
  },
  {
    n: "S / 06",
    title: "Measurement & Performance Frameworks",
    body:
      "Operating KPIs, executive dashboards, and incrementality systems for the boardroom.",
    size: "alt",
  },
  {
    n: "S / 07",
    title: "Customer & Revenue Strategy",
    body:
      "Segmentation, lifecycle economics, and cross-platform growth engines — boardroom ready.",
  },
];

export default function Services() {
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
    <section id="services" ref={rootRef} className="services-stage">
      <div style={{ maxWidth: 1480, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
            marginBottom: 60,
          }}
        >
          <div>
            <div className="eyebrow reveal-el" style={{ marginBottom: 22 }}>
              ⟡ No. 07 — Engagement Matrix
            </div>
            <h2
              className="display reveal-el"
              style={{ fontSize: "clamp(40px, 5.2vw, 86px)", maxWidth: "15ch" }}
            >
              How we work together.
            </h2>
          </div>
          <div
            className="reveal-el"
            style={{
              maxWidth: 420,
              fontSize: 16,
              lineHeight: 1.55,
              color: "rgba(18,18,18,0.78)",
              alignSelf: "flex-end",
            }}
          >
            Choose a lane or combine several. Every engagement opens
            with a 2-week diagnostic and closes with a measurable
            operating system your team owns.
          </div>
        </div>

        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <a
              key={i}
              href="#contact"
              className={`service-panel reveal-el ${
                s.size === "wide"
                  ? "wide"
                  : s.size === "tall"
                  ? "tall"
                  : s.size === "alt"
                  ? "alt"
                  : ""
              }`}
            >
              <div className="sv-num">{s.n}</div>
              <div className="sv-title">{s.title}</div>
              <div className="sv-body">{s.body}</div>
              <div className="sv-arrow">
                Begin brief
                <span>→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
