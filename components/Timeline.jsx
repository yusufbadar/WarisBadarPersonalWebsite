"use client";

import { useEffect, useRef } from "react";

const ENTRIES = [
  {
    year: "2023 — 2026",
    num: "N° 06",
    role: "Founder & CEO",
    org: "Altus & Co. LLC — UAE · NYC",
    tag: "Wealth Advisory",
    bullets: [
      "Founded an AI-driven wealth advisory firm for high-net-worth clients.",
      "Built an advisory model optimizing growth, risk, and allocation for $1M+ portfolios.",
      "Operates across New York and the United Arab Emirates.",
    ],
  },
  {
    year: "2022 — 2023",
    num: "N° 05",
    role: "Managing Partner, Global & US Intelligence",
    org: "EssenceMediacom / GroupM",
    tag: "Media Intelligence",
    bullets: [
      "Recruited to lead global data strategy for Mars Inc.",
      "Led a 50+ member team across Analytics, Business Science, Planning, and Data Strategy.",
      "Implemented MMM & MTA frameworks — double-digit platform performance gains.",
      "Grew analytics tool adoption by 30% via tailored enablement programs.",
    ],
  },
  {
    year: "2019 — 2021",
    num: "N° 04",
    role: "Vice President, Data Architecture",
    org: "Spark Foundry / Publicis Media",
    tag: "Ad/Martech",
    bullets: [
      "Directed omnichannel data strategy for Citi, Macy&apos;s, and Audible.",
      "Deployed identity and data-management solutions across platforms.",
      "Negotiated strategic vendor partnerships — reduced cost, expanded capability.",
    ],
  },
  {
    year: "2018 — 2019",
    num: "N° 03",
    role: "Vice President, Digital Analytics (Contract)",
    org: "Citi — Long Island City, NY",
    tag: "Enterprise Analytics",
    bullets: [
      "Supported infrastructure for Client Cards Marketing Information Management.",
      "Built auditing frameworks validating campaign metrics and compliance.",
      "Designed data lineage across marketing systems.",
    ],
  },
  {
    year: "2016 — 2017",
    num: "N° 02",
    role: "Vice President, Data Analytics",
    org: "Open Road Media — New York, NY",
    tag: "Analytics Build",
    bullets: [
      "Established and scaled the analytics function.",
      "Implemented Google Analytics & AWS Redshift — precision segmentation.",
      "Delivered dashboards that accelerated campaign decision-making.",
    ],
  },
  {
    year: "2014 — 2016",
    num: "N° 01",
    role: "Business Insights & Analytics Lead",
    org: "Cadreon / IPG Mediabrands",
    tag: "Programmatic",
    bullets: [
      "Oversaw analytics for J&amp;J, Sony, Chrysler, Amazon, EmblemHealth, Coke.",
      "Built advanced frameworks for programmatic buying — boosted ROI.",
      "Delivered predictive models in SQL, Tableau, and R.",
    ],
  },
];

export default function Timeline() {
  const stageRef = useRef(null);
  const trackRef = useRef(null);
  const ghostRef = useRef(null);
  const progressRef = useRef(null);
  const cardsRef = useRef([]);
  const dotsRef = useRef([]);

  useEffect(() => {
    const stage = stageRef.current;
    const track = trackRef.current;
    const ghost = ghostRef.current;
    const progress = progressRef.current;
    if (!stage || !track) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const update = () => {
      const rect = stage.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = stage.offsetHeight - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const progressP = total > 0 ? scrolled / total : 0;
      const maxX = track.scrollWidth - window.innerWidth;

      if (!reduced) {
        track.style.transform = `translate3d(${-progressP * maxX}px, 0, 0)`;
      } else {
        track.style.transform = "none";
      }

      // Ghost wordmark: translates horizontally + rotates on Y with scroll
      if (ghost && !reduced) {
        const ghostX = -progressP * 200; // slow drift
        const ghostRot = progressP * -18;
        ghost.style.transform = `translate(calc(-50% + ${ghostX}px), -50%) rotateY(${ghostRot}deg) scale(${1 + progressP * 0.05})`;
        ghost.style.opacity = String(0.35 + Math.sin(progressP * Math.PI) * 0.35);
      }

      // Progress bar
      if (progress) {
        progress.style.width = `${progressP * 100}%`;
      }

      // Progress dots — mark the active one
      if (dotsRef.current.length) {
        const activeIndex = Math.round(progressP * (ENTRIES.length - 1));
        dotsRef.current.forEach((dot, i) => {
          if (!dot) return;
          dot.classList.toggle("is-active", i <= activeIndex);
        });
      }

      // 3D tilt per card based on distance from viewport center
      if (!reduced && cardsRef.current.length) {
        const centerX = window.innerWidth / 2;
        cardsRef.current.forEach((card) => {
          if (!card) return;
          const cardRect = card.getBoundingClientRect();
          const cardCenter = cardRect.left + cardRect.width / 2;
          const dist = (cardCenter - centerX) / window.innerWidth;
          const clamped = Math.max(-1.2, Math.min(1.2, dist));
          const rotY = clamped * -22;
          const translateZ = -Math.abs(clamped) * 120;
          const scale = 1 - Math.abs(clamped) * 0.07;
          const opacity = 1 - Math.abs(clamped) * 0.3;
          card.style.transform = `rotateY(${rotY}deg) translateZ(${translateZ}px) scale(${scale})`;
          card.style.opacity = String(Math.max(0.4, opacity));
          card.classList.toggle("is-focus", Math.abs(clamped) < 0.18);
        });
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        update();
        raf = 0;
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section id="journey" ref={stageRef} className="timeline-stage">
      <div className="timeline-sticky">
        {/* Giant ghost wordmark behind cards */}
        <div ref={ghostRef} className="timeline-ghost">
          DOSSIER
        </div>

        {/* Heading overlay */}
        <div
          style={{
            position: "absolute",
            top: 80,
            left: 40,
            right: 40,
            zIndex: 5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 24,
            pointerEvents: "none",
          }}
        >
          <div style={{ maxWidth: "min(720px, 60vw)" }}>
            <div className="eyebrow">⟡ No. 04 — Career Dossier</div>
            <h2
              className="display"
              style={{ fontSize: "clamp(36px, 4.6vw, 72px)", marginTop: 18 }}
            >
              Twelve years.&nbsp;
              <span className="editorial" style={{ fontStyle: "italic", fontWeight: 400 }}>
                one compounding
              </span>{" "}
              thesis.
            </h2>
          </div>
          <div
            className="mono"
            style={{
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textAlign: "right",
              maxWidth: 280,
              lineHeight: 1.6,
              color: "rgba(18,18,18,0.6)",
            }}
          >
            N° 01 → N° 06
            <br />
            Fourteen years.
            <br />
            Six operating chapters.
          </div>
        </div>

        {/* Scroll progress bar */}
        <div className="timeline-progress">
          <div ref={progressRef} className="timeline-progress__fill" />
          <div className="timeline-progress__dots">
            {ENTRIES.map((_, i) => (
              <span
                key={i}
                ref={(el) => (dotsRef.current[i] = el)}
                className="timeline-progress__dot"
              />
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 40,
            right: 40,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 5,
          }}
          className="mono"
        >
          <span style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            ← Scroll — horizontal unfold
          </span>
          <span style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            01 — {String(ENTRIES.length).padStart(2, "0")}
          </span>
        </div>

        {/* Horizontal card track */}
        <div ref={trackRef} className="timeline-track">
          {ENTRIES.map((e, i) => (
            <article
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="timeline-card"
            >
              <span className="tag">{e.tag}</span>
              <div>
                <div className="year">
                  {e.num} &nbsp;·&nbsp; {e.year}
                </div>
                <h3>{e.role}</h3>
                <div className="sub">{e.org}</div>
              </div>
              <ul>
                {e.bullets.map((b, j) => (
                  <li key={j} dangerouslySetInnerHTML={{ __html: b }} />
                ))}
              </ul>
              <span className="timeline-card__num">{e.num.replace("N° ", "")}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
