"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll-driven 3D wordmark for between-section choreography.
 * A massive word sits in its own viewport-height stage. As the user
 * scrolls through the stage, the word rotates on X/Y/Z, translates in Z,
 * and shifts opacity — producing a BPCO-style "letters moving through
 * space" moment between content sections.
 *
 * Props:
 *  - word: the word to render
 *  - variant: "chrome" | "outline" | "ink"
 *  - direction: "tiltIn" | "tiltOut" | "spinY"
 *  - caption: optional mono caption displayed at the top of the stage
 *  - tagLeft / tagRight: optional mono ticker texts at the base
 */
export default function ScrollWordmark({
  word = "STRATEGY",
  variant = "chrome",
  direction = "tiltIn",
  caption,
  tagLeft,
  tagRight,
  accent = true,
  height = "120vh",
}) {
  const stageRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    const inner = innerRef.current;
    if (!stage || !inner) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      inner.style.setProperty("--p", "0.5");
      return;
    }

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const rect = stage.getBoundingClientRect();
        const vh = window.innerHeight;
        // 0 when stage just entered bottom, 1 when it just left top
        const p = Math.min(
          Math.max(1 - (rect.top + rect.height) / (rect.height + vh), 0),
          1
        );
        inner.style.setProperty("--p", String(p));
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={stageRef}
      className={`scroll-wordmark scroll-wordmark--${variant} scroll-wordmark--${direction}`}
      style={{ height }}
      aria-hidden
    >
      <div className="scroll-wordmark__sticky">
        {caption && (
          <div className="scroll-wordmark__caption mono">{caption}</div>
        )}

        <div ref={innerRef} className="scroll-wordmark__inner">
          <span className="scroll-wordmark__word scroll-wordmark__word--back">
            {word}
          </span>
          <span className="scroll-wordmark__word scroll-wordmark__word--front">
            {word}
          </span>
          {accent && (
            <span className="scroll-wordmark__word scroll-wordmark__word--accent">
              {word}
            </span>
          )}
        </div>

        {(tagLeft || tagRight) && (
          <div className="scroll-wordmark__rail mono">
            <span>{tagLeft}</span>
            <span>{tagRight}</span>
          </div>
        )}
      </div>
    </section>
  );
}
