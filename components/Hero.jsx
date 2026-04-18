"use client";

import { useEffect, useRef } from "react";
import { anime, animateChars } from "@/lib/anime";
import HeroParticles from "@/components/HeroParticles";

/**
 * Hero
 * - LEFT: massive editorial WARIS / BADAR. wordmark with scroll-driven 3D
 * - RIGHT: liquid-glass orb composition that tilts/scales as the user scrolls
 * - Below: editorial strap, copy column, CTA, ledger meta row
 */
export default function Hero() {
  const titleRef = useRef(null);
  const stripRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const metaRef = useRef(null);
  const eyebrowRef = useRef(null);
  const wordRef = useRef(null);
  const splineWrapRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    animateChars(titleRef.current?.querySelector("[data-split]"));

    const tl = anime.timeline({ easing: "cubicBezier(.2,.8,.2,1)" });

    tl.add({
      targets: eyebrowRef.current,
      opacity: [0, 1],
      translateY: [-10, 0],
      duration: 600,
    })
      .add(
        {
          targets: wordRef.current?.querySelectorAll("[data-layer]") || [],
          opacity: [0, (el) => el.dataset.op || 1],
          translateY: ["6vh", 0],
          duration: 1100,
          delay: anime.stagger(70),
        },
        180
      )
      .add(
        {
          targets: splineWrapRef.current,
          opacity: [0, 1],
          translateX: [40, 0],
          duration: 1000,
        },
        320
      )
      .add(
        {
          targets: stripRef.current,
          opacity: [0, 1],
          translateY: [24, 0],
          duration: 700,
        },
        700
      )
      .add(
        {
          targets: subRef.current,
          opacity: [0, 1],
          translateY: [16, 0],
          duration: 700,
        },
        820
      )
      .add(
        {
          targets: ctaRef.current?.children || [],
          opacity: [0, 1],
          translateY: [16, 0],
          duration: 600,
          delay: anime.stagger(60),
        },
        920
      )
      .add(
        {
          targets: metaRef.current?.children || [],
          opacity: [0, 1],
          translateY: [12, 0],
          duration: 600,
          delay: anime.stagger(45),
        },
        1060
      );

    if (reduced) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY || window.pageYOffset;
        const vh = window.innerHeight || 800;
        const p = Math.min(Math.max(y / (vh * 1.3), 0), 1);
        document.documentElement.style.setProperty("--hero-p", String(p));
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      className="hero-section"
      style={{ paddingTop: 100, paddingBottom: 0, position: "relative" }}
    >
      {/* Top ledger line */}
      <div
        ref={eyebrowRef}
        className="mono hero-ledger"
        style={{ opacity: 0 }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#c8362d",
              boxShadow: "0 0 12px rgba(200,54,45,.7)",
            }}
          />
          Available for Q3 · Q4 2026 engagements
        </span>
        <span style={{ textAlign: "right" }}>
          N° 01 / The Index &nbsp;·&nbsp; MMXXVI — Ongoing
        </span>
      </div>

      {/* Two-column hero stage: name on left, Spline 3D on right */}
      <div className="hero-stage">
        <div className="hero-name" ref={wordRef} aria-label="Waris Badar">
          <div className="hero-name__line">
            <span className="hero-name__word hero-name__word--back" data-layer data-op="0.22">WARIS</span>
            <span className="hero-name__word hero-name__word--mid" data-layer data-op="0.5">WARIS</span>
            <span className="hero-name__word hero-name__word--front" data-layer data-op="1">WARIS</span>
            <span className="hero-name__word hero-name__word--accent" data-layer data-op="1">WARIS</span>
          </div>
          <div className="hero-name__line hero-name__line--two">
            <span className="hero-name__word hero-name__word--back" data-layer data-op="0.22">BADAR</span>
            <span className="hero-name__word hero-name__word--mid" data-layer data-op="0.5">BADAR</span>
            <span className="hero-name__word hero-name__word--front" data-layer data-op="1">BADAR</span>
            <span className="hero-name__word hero-name__word--accent" data-layer data-op="1">BADAR</span>
          </div>
          <div className="hero-name__tag mono">
            <span>(001)</span>
            <span>Fractional · Strategic · Data-forward</span>
          </div>
        </div>

        <div
          className="hero-spline"
          ref={splineWrapRef}
          aria-hidden
          style={{ opacity: 0 }}
        >
          <div className="hero-spline__inner">
            <HeroParticles />
          </div>
          <div className="hero-spline__tag mono">
            <span>⟡ Interactive field</span>
            <span>03 / Intelligence graph</span>
          </div>
        </div>
      </div>

      {/* Editorial strap */}
      <h1 ref={titleRef} className="hero-strap">
        <span data-split>Engineered for category leaders.</span>
      </h1>

      {/* Red accent footnote */}
      <div ref={stripRef} className="hero-footnote">
        <span className="hero-footnote__line" />
        <span className="mono hero-footnote__tag">— measurable growth.</span>
        <span
          className="hand"
          style={{
            color: "#c8362d",
            fontSize: "clamp(15px, 1.2vw, 20px)",
            transform: "rotate(-3deg)",
          }}
        >
          a fractional operating thesis
        </span>
      </div>

      {/* Copy column */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          padding: "34px 40px 50px",
          maxWidth: 1480,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: 80,
          alignItems: "start",
        }}
        className="hero-columns"
      >
        <p ref={subRef} className="hero-sub">
          Waris M. Badar is a fractional executive — Chief Data Officer, Head of
          Business Intelligence, CMO — advising boards and founders on data
          strategy, analytics transformation, and AI-enabled growth. Trusted by
          Mars, Citi, Macy&apos;s, Audible, J&amp;J, Sony, and Amazon.
        </p>

        <div ref={ctaRef} className="hero-ctas">
          <a className="btn-primary" href="#contact">
            <span className="dot" /> Book a strategy session
          </a>
          <a className="btn-ghost" href="#journey">
            View career dossier ↘
          </a>
          <div className="hero-signature mono">
            ⟡ Engagements begin with a 2-week strategic diagnostic.
          </div>
        </div>
      </div>

      <div
        ref={metaRef}
        className="hero-meta"
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          padding: "0 40px 30px",
          position: "relative",
          zIndex: 3,
        }}
      >
        <div>
          <span>(01) Roles</span>
          <b>Fractional CEO / CDO / CMO</b>
        </div>
        <div>
          <span>(02) Disciplines</span>
          <b>BI · Analytics · AI · Growth</b>
        </div>
        <div>
          <span>(03) Leadership</span>
          <b>Teams of 50+ · Global</b>
        </div>
        <div>
          <span>(04) Operating</span>
          <b>New York · Remote</b>
        </div>
      </div>
    </section>
  );
}

