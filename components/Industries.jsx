"use client";

import { useEffect, useRef } from "react";
import { revealOnScroll } from "@/lib/anime";

const INDUSTRY_GROUPS = [
  {
    label: "Financial Services",
    items: ["Wealth & Asset Mgmt", "Banking & Cards", "Insurance"],
  },
  {
    label: "Consumer & Retail",
    items: ["CPG / Global Brands", "Retail & E-commerce", "Food & Beverage"],
  },
  {
    label: "Media & Technology",
    items: [
      "Media & Publishing",
      "AdTech & Programmatic",
      "Entertainment",
      "Telecommunications",
    ],
  },
  {
    label: "Health & Life Sciences",
    items: ["Pharma", "Healthcare Payers"],
  },
  {
    label: "Mobility",
    items: ["Automotive"],
  },
];

const FUNCTION_GROUPS = [
  {
    label: "Leadership",
    items: ["Board Advisory", "Executive Leadership", "Fractional C-suite"],
  },
  {
    label: "Data & Intelligence",
    items: [
      "Data Strategy",
      "Enterprise BI",
      "AI & ML Adoption",
      "Measurement & MMM",
    ],
  },
  {
    label: "Growth & Marketing",
    items: [
      "Marketing Intelligence",
      "Customer Analytics",
      "Audience Strategy",
    ],
  },
  {
    label: "Operations",
    items: [
      "Governance & Compliance",
      "Martech Integration",
      "Revenue Operations",
    ],
  },
];

const CLIENT_GROUPS = [
  {
    label: "Consumer & CPG",
    items: [
      { name: "Mars", era: "2019 — 2022" },
      { name: "Coca-Cola", era: "2017 — 2019" },
      { name: "Johnson & Johnson", era: "2016 — 2018" },
    ],
  },
  {
    label: "Retail & Commerce",
    items: [
      { name: "Macy's", era: "2020 — 2022" },
      { name: "Amazon", era: "2015 — 2017" },
    ],
  },
  {
    label: "Financial Services",
    items: [{ name: "Citi", era: "2018 — 2021" }],
  },
  {
    label: "Media & Entertainment",
    items: [
      { name: "Audible", era: "2014 — 2016" },
      { name: "Sony", era: "2016 — 2018" },
    ],
  },
  {
    label: "Health & Mobility",
    items: [
      { name: "EmblemHealth", era: "2021 — 2023" },
      { name: "Chrysler", era: "2015 — 2017" },
    ],
  },
];

function Column({ eyebrow, count, groups, renderItem }) {
  return (
    <div className="reveal-el ind-col">
      <div className="ind-col__head">
        <span className="mono ind-col__eyebrow">{eyebrow}</span>
        <span className="mono ind-col__count">{String(count).padStart(2, "0")}</span>
      </div>
      <div className="ind-col__body">
        {groups.map((g) => (
          <div key={g.label} className="ind-group">
            <div className="ind-group__label mono">— {g.label}</div>
            <div className="ind-group__items">{g.items.map(renderItem)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Industries() {
  const rootRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const cleanup = revealOnScroll(el.querySelectorAll(".reveal-el"));
    return cleanup;
  }, []);

  const industriesCount = INDUSTRY_GROUPS.reduce((n, g) => n + g.items.length, 0);
  const functionsCount = FUNCTION_GROUPS.reduce((n, g) => n + g.items.length, 0);
  const clientsCount = CLIENT_GROUPS.reduce((n, g) => n + g.items.length, 0);

  return (
    <section
      ref={rootRef}
      className="section"
      style={{ paddingTop: 70, paddingBottom: 80 }}
    >
      <div style={{ maxWidth: 1480, margin: "0 auto" }}>
        <div className="eyebrow reveal-el" style={{ marginBottom: 24 }}>
          ⟡ No. 05 — Where & How
        </div>
        <h2
          className="display reveal-el"
          style={{
            fontSize: "clamp(40px, 5.2vw, 86px)",
            maxWidth: "18ch",
            marginBottom: 80,
          }}
        >
          Industries, functions, and the companies already on the ledger.
        </h2>

        <div className="ind-grid">
          <Column
            eyebrow="Industries"
            count={industriesCount}
            groups={INDUSTRY_GROUPS}
            renderItem={(x) => (
              <span key={x} className="pill">
                {x}
              </span>
            )}
          />

          <Column
            eyebrow="Functions"
            count={functionsCount}
            groups={FUNCTION_GROUPS}
            renderItem={(x) => (
              <span key={x} className="pill">
                {x}
              </span>
            )}
          />

          <div className="reveal-el ind-col">
            <div className="ind-col__head">
              <span className="mono ind-col__eyebrow">Selected clients</span>
              <span className="mono ind-col__count">
                {String(clientsCount).padStart(2, "0")}
              </span>
            </div>
            <div className="ind-col__body">
              {CLIENT_GROUPS.map((g) => (
                <div key={g.label} className="ind-group">
                  <div className="ind-group__label mono">— {g.label}</div>
                  <ul className="ind-clients">
                    {g.items.map((c) => (
                      <li key={c.name} className="ind-client">
                        <span className="ind-client__name">{c.name}</span>
                        <span className="ind-client__era mono">{c.era}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        :global(.ind-grid) {
          display: grid;
          grid-template-columns: 1fr 1fr 1.15fr;
          gap: 56px;
        }
        :global(.ind-col__head) {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(18, 18, 18, 0.2);
        }
        :global(.ind-col__eyebrow) {
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        :global(.ind-col__count) {
          font-size: 11px;
          letter-spacing: 0.18em;
          opacity: 0.5;
        }
        :global(.ind-col__body) {
          margin-top: 26px;
          display: flex;
          flex-direction: column;
          gap: 26px;
        }
        :global(.ind-group__label) {
          font-size: 10.5px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          opacity: 0.55;
          margin-bottom: 12px;
        }
        :global(.ind-group__items) {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        :global(.ind-clients) {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
        }
        :global(.ind-client) {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding: 12px 0;
          border-bottom: 1px dashed rgba(18, 18, 18, 0.16);
          font-size: 17px;
          letter-spacing: -0.01em;
        }
        :global(.ind-client:last-child) {
          border-bottom: none;
        }
        :global(.ind-client__era) {
          font-size: 10.5px;
          letter-spacing: 0.18em;
          opacity: 0.55;
        }
        :global([data-theme="dark"] .ind-col__head) {
          border-bottom-color: var(--line);
        }
        :global([data-theme="dark"] .ind-client) {
          border-bottom-color: var(--line);
        }
        @media (max-width: 900px) {
          :global(.ind-grid) {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}
