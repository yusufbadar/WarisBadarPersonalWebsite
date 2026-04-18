"use client";

import { useEffect, useRef, useState } from "react";
import SplineSafe from "@/components/SplineSafe";

/**
 * SplineScroll
 * ---------------------------------------------------------------
 * A sticky 3D Spline scene that reacts to scroll. Pass either a
 * Spline runtime URL (`scene` ending in `.splinecode`) for the
 * @splinetool/react-spline runtime, or an `iframeSrc` (a public
 * `my.spline.design/...` URL) for an embedded iframe.
 *
 * The wrapping stage is transformed via a CSS `--p` variable
 * (0 → 1) computed from the scroll position, producing a
 * cinematic rotate / scale / translate as the user scrolls past.
 *
 * Props:
 *   scene        — runtime URL ("https://prod.spline.design/<id>/scene.splinecode")
 *   iframeSrc    — fallback or alternative public iframe URL
 *   caption      — small label top-left
 *   tagLeft / tagRight — bottom rail meta
 *   variant      — "tilt" | "spin" | "drift"  (driver-style)
 *   height       — total stage scroll-height (e.g. "180vh")
 *   align        — "center" | "right" | "left"
 *   id           — anchor id
 */
export default function SplineScroll({
  scene,
  iframeSrc,
  caption,
  tagLeft,
  tagRight,
  variant = "tilt",
  height = "180vh",
  align = "center",
  id,
}) {
  const stageRef = useRef(null);
  const innerRef = useRef(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    const inner = innerRef.current;
    if (!stage || !inner || reduced) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const rect = stage.getBoundingClientRect();
        const vh = window.innerHeight || 800;
        // p = 0 when stage just entered viewport, 1 as it leaves.
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
  }, [reduced]);

  const useIframe = !scene && !!iframeSrc;
  // Always-visible liquid-glass CSS fallback used when the Spline
  // runtime can't load a scene (e.g. unpublished editor URL → 403).
  const cssFallback = (
    <div className="spline-glass">
      <div className="spline-glass__ring spline-glass__ring--1" />
      <div className="spline-glass__ring spline-glass__ring--2" />
      <div className="spline-glass__ring spline-glass__ring--3" />
      <div className="spline-glass__core" />
      <div className="spline-glass__orb" />
      <div className="spline-glass__label mono">Liquid glass · interactive</div>
    </div>
  );

  return (
    <section
      ref={stageRef}
      id={id}
      className={`spline-scroll spline-scroll--${variant} spline-scroll--${align}`}
      style={{ height }}
      aria-hidden
    >
      <div className="spline-scroll__sticky">
        {caption && (
          <div className="spline-scroll__caption mono">{caption}</div>
        )}

        <div ref={innerRef} className="spline-scroll__inner">
          <div className="spline-scroll__frame">
            {useIframe ? (
              <iframe
                src={iframeSrc}
                title={caption || "Spline 3D scene"}
                loading="lazy"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                style={{
                  width: "100%",
                  height: "100%",
                  border: "0",
                  background: "transparent",
                  display: "block",
                }}
              />
            ) : scene ? (
              <SplineSafe
                scene={scene}
                fallback={
                  iframeSrc ? (
                    <iframe
                      src={iframeSrc}
                      title={caption || "Spline 3D scene"}
                      loading="lazy"
                      allow="autoplay; fullscreen; xr-spatial-tracking"
                      style={{
                        width: "100%",
                        height: "100%",
                        border: "0",
                        background: "transparent",
                        display: "block",
                      }}
                    />
                  ) : (
                    cssFallback
                  )
                }
                loading={<div className="spline-scroll__skel" />}
              />
            ) : (
              <div className="spline-scroll__skel" />
            )}
          </div>
        </div>

        {(tagLeft || tagRight) && (
          <div className="spline-scroll__rail mono">
            <span>{tagLeft}</span>
            <span>{tagRight}</span>
          </div>
        )}
      </div>
    </section>
  );
}
