"use client";

import { useEffect, useRef } from "react";

/**
 * HeroParticles
 * Interactive constellation canvas. Particles drift; nearby nodes
 * connect with thin lines; the cursor gently attracts nearby nodes
 * and brightens the filaments near it. Theme-aware (reads
 * CSS variables --ink, --paper, --accent).
 */
export default function HeroParticles() {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const state = {
      w: 0,
      h: 0,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
      particles: [],
      mouse: { x: -9999, y: -9999, active: false },
      time: 0,
      theme: getThemeColors(),
    };

    function getThemeColors() {
      const style = getComputedStyle(document.documentElement);
      const isDark =
        document.documentElement.getAttribute("data-theme") === "dark";
      const accent = (style.getPropertyValue("--accent") || "#c8362d").trim();
      const ink = isDark ? "237,233,227" : "18,18,18";
      return { accent, ink, isDark };
    }

    function resize() {
      const rect = wrap.getBoundingClientRect();
      state.w = rect.width;
      state.h = rect.height;
      canvas.width = Math.floor(rect.width * state.dpr);
      canvas.height = Math.floor(rect.height * state.dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
      seed();
    }

    function seed() {
      const area = state.w * state.h;
      const target = Math.max(44, Math.min(120, Math.round(area / 8500)));
      state.particles = new Array(target).fill(0).map((_, i) => {
        const accent = i % 14 === 0;
        return {
          x: Math.random() * state.w,
          y: Math.random() * state.h,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          r: accent ? 2.4 + Math.random() * 1.2 : 0.9 + Math.random() * 1.1,
          accent,
          phase: Math.random() * Math.PI * 2,
        };
      });
    }

    function onMove(e) {
      const rect = wrap.getBoundingClientRect();
      const t = e.touches && e.touches[0];
      const cx = (t ? t.clientX : e.clientX) - rect.left;
      const cy = (t ? t.clientY : e.clientY) - rect.top;
      state.mouse.x = cx;
      state.mouse.y = cy;
      state.mouse.active = true;
    }
    function onLeave() {
      state.mouse.active = false;
      state.mouse.x = -9999;
      state.mouse.y = -9999;
    }

    function step() {
      const { w, h } = state;
      state.time += 0.016;
      ctx.clearRect(0, 0, w, h);

      // Soft ambient glow behind the network
      const grad = ctx.createRadialGradient(
        w * 0.32,
        h * 0.28,
        0,
        w * 0.5,
        h * 0.5,
        Math.max(w, h) * 0.75
      );
      grad.addColorStop(0, state.theme.isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.55)");
      grad.addColorStop(0.55, state.theme.isDark ? "rgba(0,0,0,0)" : "rgba(232,227,220,0)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      const mx = state.mouse.x;
      const my = state.mouse.y;
      const active = state.mouse.active;

      const P = state.particles;
      const LINK = 128;
      const LINK2 = LINK * LINK;

      for (let i = 0; i < P.length; i++) {
        const p = P[i];

        // Mouse attraction (gentle)
        if (active) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 180 * 180) {
            const d = Math.sqrt(d2) || 1;
            const pull = (1 - d / 180) * 0.06;
            p.vx += (dx / d) * pull;
            p.vy += (dy / d) * pull;
          }
        }

        // Light sinusoidal drift so it feels alive at rest
        p.vx += Math.cos(state.time * 0.4 + p.phase) * 0.0015;
        p.vy += Math.sin(state.time * 0.4 + p.phase * 1.1) * 0.0015;

        // Damping + integration
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.x += p.vx;
        p.y += p.vy;

        // Edge wrap
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
      }

      // Draw edges
      for (let i = 0; i < P.length; i++) {
        const a = P[i];
        for (let j = i + 1; j < P.length; j++) {
          const b = P[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK2) continue;
          const t = 1 - d2 / LINK2;
          let alpha = 0.09 + t * 0.22;

          // Brighten filaments near the cursor
          if (active) {
            const midx = (a.x + b.x) * 0.5;
            const midy = (a.y + b.y) * 0.5;
            const mdx = midx - mx;
            const mdy = midy - my;
            const md2 = mdx * mdx + mdy * mdy;
            if (md2 < 190 * 190) {
              alpha += (1 - md2 / (190 * 190)) * 0.35;
            }
          }

          const isAccent = a.accent || b.accent;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          if (isAccent) {
            ctx.strokeStyle = hexToRgba(state.theme.accent, Math.min(0.65, alpha + 0.1));
            ctx.lineWidth = 1;
          } else {
            ctx.strokeStyle = `rgba(${state.theme.ink},${alpha})`;
            ctx.lineWidth = 0.7;
          }
          ctx.stroke();
        }
      }

      // Draw nodes
      for (let i = 0; i < P.length; i++) {
        const p = P[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        if (p.accent) {
          ctx.fillStyle = state.theme.accent;
          ctx.shadowColor = hexToRgba(state.theme.accent, 0.55);
          ctx.shadowBlur = 14;
        } else {
          ctx.fillStyle = `rgba(${state.theme.ink},0.78)`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      if (!reduced) raf = requestAnimationFrame(step);
    }

    function hexToRgba(hex, a) {
      const h = hex.replace("#", "").trim();
      const n = h.length === 3
        ? h.split("").map((c) => c + c).join("")
        : h;
      const r = parseInt(n.slice(0, 2), 16);
      const g = parseInt(n.slice(2, 4), 16);
      const b = parseInt(n.slice(4, 6), 16);
      return `rgba(${r},${g},${b},${a})`;
    }

    let raf = 0;
    const onThemeChange = () => {
      state.theme = getThemeColors();
    };
    const mo = new MutationObserver(onThemeChange);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    resize();
    window.addEventListener("resize", resize);
    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("touchmove", onMove, { passive: true });
    wrap.addEventListener("mouseleave", onLeave);
    wrap.addEventListener("touchend", onLeave);

    if (reduced) {
      step();
    } else {
      raf = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("touchmove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
      wrap.removeEventListener("touchend", onLeave);
      mo.disconnect();
    };
  }, []);

  return (
    <div className="hero-particles" ref={wrapRef} aria-hidden>
      <canvas ref={canvasRef} className="hero-particles__canvas" />
      <div className="hero-particles__frame" aria-hidden />
      <div className="hero-particles__corners" aria-hidden>
        <span /><span /><span /><span />
      </div>
      <div className="hero-particles__meta mono">
        <span>⟡ Constellation</span>
        <span>N° 03 · Intelligence Field</span>
      </div>
      <div className="hero-particles__hint mono">
        <span className="hero-particles__pulse" /> move to disturb
      </div>
    </div>
  );
}
