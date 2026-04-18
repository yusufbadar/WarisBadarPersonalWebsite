"use client";

import anime from "animejs";

/**
 * Reveal an array of DOM nodes when they enter the viewport.
 * Uses IntersectionObserver + anime.js.
 */
export function revealOnScroll(nodes, opts = {}) {
  if (typeof window === "undefined") return () => {};
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const {
    translateY = [60, 0],
    opacity = [0, 1],
    duration = 1100,
    delay = anime.stagger(60),
    easing = "cubicBezier(.2,.8,.2,1)",
  } = opts;

  const list = Array.from(nodes).filter(Boolean);
  if (!list.length) return () => {};

  const revealed = new WeakSet();

  const reveal = (el) => {
    if (revealed.has(el)) return;
    revealed.add(el);
    if (reduced) {
      el.style.opacity = 1;
      el.style.transform = "none";
    } else {
      anime({
        targets: el,
        translateY,
        opacity,
        duration,
        delay,
        easing,
      });
    }
  };

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        reveal(e.target);
        obs.unobserve(e.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );

  list.forEach((n) => io.observe(n));

  // Safety net: if the page was reached via anchor jump (e.g. #contact)
  // or the preloader masked the initial paint, some elements below the
  // viewport may never re-trigger the observer. Re-check and flush any
  // still-unrevealed nodes whenever the user scrolls, and force-reveal
  // on a short timeout in case scrolling never happens.
  let raf = 0;
  const flush = () => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      const vh = window.innerHeight || 800;
      list.forEach((el) => {
        if (revealed.has(el)) return;
        const r = el.getBoundingClientRect();
        if (r.bottom > 0 && r.top < vh + 120) {
          reveal(el);
          io.unobserve(el);
        }
      });
    });
  };
  window.addEventListener("scroll", flush, { passive: true });
  const bail = setTimeout(() => {
    list.forEach((el) => {
      if (!revealed.has(el)) {
        reveal(el);
        io.unobserve(el);
      }
    });
  }, 4000);

  return () => {
    io.disconnect();
    window.removeEventListener("scroll", flush);
    clearTimeout(bail);
    if (raf) cancelAnimationFrame(raf);
  };
}

/** Split a heading element's text into per-character spans for animation. */
export function splitChars(el) {
  if (!el || el.dataset.split === "true") return;
  const text = el.textContent;
  el.textContent = "";
  el.dataset.split = "true";
  const frag = document.createDocumentFragment();
  for (const ch of text) {
    const s = document.createElement("span");
    s.className = "split-char";
    s.textContent = ch === " " ? "\u00A0" : ch;
    frag.appendChild(s);
  }
  el.appendChild(frag);
  return el.querySelectorAll(".split-char");
}

export function animateChars(el, { delay = 0 } = {}) {
  const chars = splitChars(el);
  if (!chars || !chars.length) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    chars.forEach((c) => {
      c.style.opacity = 1;
      c.style.transform = "none";
    });
    return;
  }
  anime({
    targets: chars,
    opacity: [0, 1],
    translateY: ["60%", "0%"],
    duration: 1100,
    delay: anime.stagger(18, { start: delay }),
    easing: "cubicBezier(.2,.8,.2,1)",
  });
}

/** Counter animation from 0 → target. */
export function animateCounter(el, target, { duration = 1600, suffix = "" } = {}) {
  if (!el) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.textContent = `${target}${suffix}`;
    return;
  }
  const obj = { v: 0 };
  anime({
    targets: obj,
    v: target,
    duration,
    easing: "cubicBezier(.2,.8,.2,1)",
    round: target % 1 === 0 ? 1 : 10,
    update: () => {
      el.textContent = `${obj.v}${suffix}`;
    },
  });
}

export { anime };
