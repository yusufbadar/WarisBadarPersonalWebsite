"use client";

import { useEffect, useRef } from "react";
import { revealOnScroll, animateChars, anime } from "@/lib/anime";

/**
 * Small editorial "signal readout" that lives under the
 * "Data is the ledger. Leadership is the signal." quote.
 * - Animated SVG compounding curve (the signal)
 * - Pulsing accent node at the latest point
 * - Year rule (2014 → 2026) with ticks
 * - Ledger strip with deltas (YoY ▲ pills)
 */
function AboutSignal() {
  const rootRef = useRef(null);
  const pathRef = useRef(null);
  const dotRef = useRef(null);
  const ledgerRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const path = pathRef.current;
    const dot = dotRef.current;
    const ledger = ledgerRef.current;
    if (!root || !path) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          io.disconnect();

          if (reduced) {
            path.style.strokeDashoffset = "0";
            if (dot) dot.style.opacity = "1";
            if (ledger) {
              ledger
                .querySelectorAll(".abt-ledger__row")
                .forEach((r) => {
                  r.style.opacity = "1";
                  r.style.transform = "none";
                });
            }
            return;
          }

          anime({
            targets: path,
            strokeDashoffset: [len, 0],
            duration: 1600,
            easing: "cubicBezier(.2,.8,.2,1)",
          });
          if (dot) {
            anime({
              targets: dot,
              opacity: [0, 1],
              scale: [0.4, 1],
              duration: 500,
              delay: 1500,
              easing: "cubicBezier(.2,.8,.2,1)",
            });
          }
          if (ledger) {
            anime({
              targets: ledger.querySelectorAll(".abt-ledger__row"),
              opacity: [0, 1],
              translateX: [-14, 0],
              duration: 700,
              delay: anime.stagger(90, { start: 700 }),
              easing: "cubicBezier(.2,.8,.2,1)",
            });
          }
        });
      },
      { threshold: 0.35 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  const LEDGER = [
    { yr: "2014", tag: "Audible", delta: "+ entry" },
    { yr: "2017", tag: "Citi · Coca-Cola", delta: "▲ 2.1×" },
    { yr: "2020", tag: "Mars · Macy's", delta: "▲ 3.4×" },
    { yr: "2023", tag: "EmblemHealth", delta: "▲ 4.8×" },
    { yr: "2026", tag: "Fractional C-suite", delta: "∞ ongoing" },
  ];

  return (
    <div ref={rootRef} className="abt-signal">
      <div className="abt-signal__head mono">
        <span>⟡ Signal · N° 002</span>
        <span>↗ compounding</span>
      </div>

      <svg
        className="abt-signal__chart"
        viewBox="0 0 300 90"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="abt-signal-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="0" y1="80" x2="300" y2="80" className="abt-signal__axis" />
        {[0, 60, 120, 180, 240, 300].map((x, i) => (
          <line
            key={i}
            x1={x}
            y1="78"
            x2={x}
            y2="82"
            className="abt-signal__tick"
          />
        ))}
        <path
          d="M0,78 C40,74 60,68 90,58 C118,48 150,42 180,32 C210,22 240,16 270,10 L300,6"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.6"
          strokeLinecap="round"
          ref={pathRef}
          className="abt-signal__path"
        />
        <path
          d="M0,78 C40,74 60,68 90,58 C118,48 150,42 180,32 C210,22 240,16 270,10 L300,6 L300,80 L0,80 Z"
          fill="url(#abt-signal-fill)"
          className="abt-signal__area"
        />
        <g ref={dotRef} className="abt-signal__dot">
          <circle cx="300" cy="6" r="3.2" fill="var(--accent)" />
          <circle
            cx="300"
            cy="6"
            r="3.2"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1"
            className="abt-signal__dot-ring"
          />
        </g>
      </svg>

      <div className="abt-signal__years mono">
        <span>2014</span>
        <span>·</span>
        <span>2020</span>
        <span>·</span>
        <span>2026</span>
      </div>

      <div className="abt-ledger" ref={ledgerRef}>
        {LEDGER.map((row) => (
          <div key={row.yr} className="abt-ledger__row mono">
            <span className="abt-ledger__yr">{row.yr}</span>
            <span className="abt-ledger__tag">{row.tag}</span>
            <span className="abt-ledger__delta">{row.delta}</span>
          </div>
        ))}
      </div>

      <div className="abt-signal__foot mono">
        12 yrs · 6 chapters · ∞ mandate
      </div>
    </div>
  );
}

export default function About() {
  const rootRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const nodes = el.querySelectorAll(".reveal-el");
    const cleanup = revealOnScroll(nodes, { translateY: [40, 0] });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && headingRef.current) {
            animateChars(headingRef.current.querySelector("[data-split]"));
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    if (headingRef.current) io.observe(headingRef.current);

    return () => {
      cleanup();
      io.disconnect();
    };
  }, []);

  return (
    <section
      id="about"
      ref={rootRef}
      className="section"
      style={{ paddingTop: 80, paddingBottom: 70 }}
    >
      <div
        className="about-grid"
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1.25fr",
          gap: "6vw",
        }}
      >
        <div className="reveal-el">
          <div className="eyebrow" style={{ marginBottom: 24 }}>
            ⟡ No. 02 — Positioning
          </div>

          <div
            className="mono"
            style={{
              fontSize: 13,
              letterSpacing: "0.04em",
              lineHeight: 1.55,
              color: "rgba(18,18,18,0.7)",
              borderTop: "1px solid rgba(18,18,18,0.15)",
              paddingTop: 24,
              marginTop: 48,
              maxWidth: 360,
            }}
          >
            A senior operator for companies that have outgrown
            guesswork — and the frameworks that got them here.
          </div>

          <div
            className="hand reveal-el"
            style={{
              color: "#c8362d",
              fontSize: 28,
              marginTop: 60,
              transform: "rotate(-2deg)",
              maxWidth: 260,
            }}
          >
            &ldquo;Data is the ledger.
            <br /> Leadership is the signal.&rdquo;
          </div>

          <AboutSignal />
        </div>

        <div>
          <h2
            ref={headingRef}
            className="display reveal-el"
            style={{
              fontSize: "clamp(44px, 5.6vw, 96px)",
              letterSpacing: "-0.045em",
              lineHeight: 0.95,
            }}
          >
            <span data-split>A fractional operator for the next decade of enterprise.</span>
          </h2>

          <div
            className="reveal-el"
            style={{
              marginTop: 48,
              fontSize: "clamp(18px, 1.35vw, 22px)",
              lineHeight: 1.5,
              letterSpacing: "-0.01em",
              color: "rgba(18,18,18,0.82)",
              maxWidth: 760,
            }}
          >
            Over a decade of executive leadership across{" "}
            <b>consulting, wealth advisory, media, analytics, adtech,</b> and{" "}
            <b>enterprise transformation</b>. Waris partners with founders,
            boards, and C-suites to translate ambition into operating
            reality — measurement frameworks, AI-enabled decisions,
            organizational design, and revenue systems that compound.
          </div>

          <div
            className="reveal-el"
            style={{
              marginTop: 56,
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 32,
              paddingTop: 32,
              borderTop: "1px solid rgba(18,18,18,0.15)",
            }}
          >
            <div>
              <div className="eyebrow">Retained by</div>
              <div style={{ fontSize: 16, marginTop: 10, lineHeight: 1.45 }}>
                Mars, Citi, Macy&apos;s, Audible, J&amp;J, Sony,
                Chrysler, Amazon, Coca-Cola, EmblemHealth.
              </div>
            </div>
            <div>
              <div className="eyebrow">Operating Mandate</div>
              <div style={{ fontSize: 16, marginTop: 10, lineHeight: 1.45 }}>
                Board advisory · Fractional C-suite · Transformation
                sprints · 6–18 month engagements.
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          :global(.about-grid) {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}
