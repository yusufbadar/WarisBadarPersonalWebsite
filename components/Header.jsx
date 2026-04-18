"use client";

import { useEffect, useRef, useState } from "react";

const LINKS = [
  { id: "expertise", label: "Expertise" },
  { id: "journey", label: "Journey" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

export default function Header() {
  const [time, setTime] = useState("");
  const [active, setActive] = useState("expertise");
  const [theme, setTheme] = useState("light");
  const blobRef = useRef(null);
  const pillRef = useRef(null);

  useEffect(() => {
    const saved =
      typeof window !== "undefined"
        ? window.localStorage.getItem("wb-theme")
        : null;
    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = saved || (prefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      window.localStorage.setItem("wb-theme", next);
    } catch {}
  };

  useEffect(() => {
    const t = () => {
      const n = new Date();
      const ny = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(n);
      setTime(ny);
    };
    t();
    const iv = setInterval(t, 30000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.4) {
            setActive(e.target.id);
          }
        });
      },
      { threshold: [0.4, 0.6, 0.8] }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const pill = pillRef.current;
    const blob = blobRef.current;
    if (!pill || !blob) return;
    const link = pill.querySelector(`a[data-id="${active}"]`);
    if (!link) {
      blob.style.opacity = 0;
      return;
    }
    const pillRect = pill.getBoundingClientRect();
    const r = link.getBoundingClientRect();
    blob.style.opacity = 1;
    blob.style.left = `${r.left - pillRect.left}px`;
    blob.style.width = `${r.width}px`;
  }, [active]);

  const onHover = (id) => {
    const pill = pillRef.current;
    const blob = blobRef.current;
    if (!pill || !blob) return;
    const link = pill.querySelector(`a[data-id="${id}"]`);
    if (!link) return;
    const pillRect = pill.getBoundingClientRect();
    const r = link.getBoundingClientRect();
    blob.style.opacity = 1;
    blob.style.left = `${r.left - pillRect.left}px`;
    blob.style.width = `${r.width}px`;
  };

  const onLeave = () => {
    const pill = pillRef.current;
    const blob = blobRef.current;
    if (!pill || !blob) return;
    const link = pill.querySelector(`a[data-id="${active}"]`);
    if (!link) return;
    const pillRect = pill.getBoundingClientRect();
    const r = link.getBoundingClientRect();
    blob.style.left = `${r.left - pillRect.left}px`;
    blob.style.width = `${r.width}px`;
  };

  return (
    <>
      <div className="nav-shell">
        <div>
          <div>WARIS M. BADAR</div>
          <div style={{ marginTop: 6, opacity: 0.6 }}>Fractional Executive</div>
        </div>

        <div className="hide-sm" />

        <div className="hide-sm" style={{ textAlign: "center" }}>
          <div>New York</div>
          <div style={{ marginTop: 6, opacity: 0.6 }}>
            {time ? `NYC · ${time}` : "—"}
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div>Advisory — ∞</div>
          <div style={{ marginTop: 6, opacity: 0.6 }}>EN</div>
        </div>
      </div>

      <button
        type="button"
        onClick={toggleTheme}
        className="theme-toggle"
        aria-label={`Activate ${theme === "dark" ? "light" : "dark"} mode`}
        title={`${theme === "dark" ? "Light" : "Dark"} mode`}
      >
        <span className="theme-toggle__icon" aria-hidden>
          {theme === "dark" ? (
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
            </svg>
          )}
        </span>
        <span className="theme-toggle__label">{theme === "dark" ? "Light" : "Dark"}</span>
      </button>

      <nav
        className="nav-pill"
        ref={pillRef}
        onMouseLeave={onLeave}
        aria-label="Primary"
      >
        {LINKS.map((l) => (
          <a
            key={l.id}
            data-id={l.id}
            href={`#${l.id}`}
            className={active === l.id ? "active" : ""}
            onMouseEnter={() => onHover(l.id)}
          >
            {l.label}
          </a>
        ))}
        <span ref={blobRef} className="pill-blob" />
      </nav>
    </>
  );
}
