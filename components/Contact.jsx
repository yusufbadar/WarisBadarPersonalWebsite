"use client";

import { useEffect, useRef, useState } from "react";
import { anime, animateChars, revealOnScroll } from "@/lib/anime";

const MANDATES = [
  "Fractional CEO",
  "Chief Data Officer",
  "Head of BI",
  "Head of Analytics",
  "Head of Strategy",
  "CMO / SVP Marketing",
  "AI Advisory",
  "Board Advisory",
];

export default function Contact() {
  const rootRef = useRef(null);
  const titleRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const cleanup = revealOnScroll(el.querySelectorAll(".reveal-el"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && titleRef.current) {
            animateChars(titleRef.current.querySelector("[data-split]"));
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    if (titleRef.current) io.observe(titleRef.current);

    return () => {
      cleanup();
      io.disconnect();
    };
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const btn = form.querySelector("button[type=submit]");
    anime({
      targets: btn,
      scale: [1, 0.96, 1],
      duration: 420,
      easing: "cubicBezier(.2,.8,.2,1)",
    });

    const data = new FormData(form);
    const name = (data.get("name") || "").toString().trim();
    const email = (data.get("email") || "").toString().trim();
    const company = (data.get("company") || "").toString().trim();
    const brief = (data.get("brief") || "").toString().trim();

    const subject = `Mandate brief — ${name || "Inbound"}${
      company ? " · " + company : ""
    }`;
    const body =
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Company: ${company}\n\n` +
      `Brief\n-----\n${brief}\n`;

    const mailto = `mailto:warisbadar@hotmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // Open the user's mail client with the prefilled brief.
    window.location.href = mailto;

    setTimeout(() => setSubmitted(true), 500);
  };

  return (
    <section id="contact" ref={rootRef} className="contact-stage">
      <div
        style={{
          maxWidth: 1480,
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div className="eyebrow reveal-el" style={{ color: "rgba(237,233,227,0.55)", marginBottom: 22 }}>
          ⟡ No. 09 — Start a mandate
        </div>

        <h2
          ref={titleRef}
          className="display"
          style={{
            fontSize: "clamp(56px, 9vw, 168px)",
            color: "#ede9e3",
            letterSpacing: "-0.055em",
            lineHeight: 0.92,
            maxWidth: "16ch",
          }}
        >
          <span data-split>Let&apos;s build.</span>
        </h2>

        <div
          className="reveal-el"
          style={{
            marginTop: 36,
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            maxWidth: 720,
          }}
        >
          {MANDATES.map((m) => (
            <span
              key={m}
              className="mono"
              style={{
                padding: "6px 14px 7px",
                border: "1px solid rgba(237,233,227,0.35)",
                borderRadius: 100,
                fontSize: 12,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(237,233,227,0.85)",
              }}
            >
              {m}
            </span>
          ))}
        </div>

        <div
          style={{
            marginTop: 96,
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "6vw",
          }}
          className="contact-grid"
        >
          <div className="reveal-el">
            <div
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(237,233,227,0.55)",
                marginBottom: 18,
              }}
            >
              Direct
            </div>
            <a
              href="mailto:warisbadar@hotmail.com"
              style={{
                fontSize: "clamp(24px, 2.2vw, 34px)",
                letterSpacing: "-0.02em",
                borderBottom: "1px solid rgba(237,233,227,0.35)",
                paddingBottom: 4,
              }}
            >
              warisbadar@hotmail.com
            </a>
            <div style={{ marginTop: 28, fontSize: 17, lineHeight: 1.5, opacity: 0.82 }}>
              +1 (718) 570 — 5518
              <br />
              New York City, NY
              <br />
              Engagements accepted globally.
            </div>

            <div style={{ marginTop: 48, display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a
                className="btn-primary"
                style={{ background: "#ede9e3", color: "#0a0a0a" }}
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
              >
                <span className="dot" style={{ background: "#0a0a0a", boxShadow: "0 0 10px rgba(10,10,10,0.4)" }} />
                LinkedIn
              </a>
              <a className="btn-ghost" style={{ borderColor: "#ede9e3", color: "#ede9e3" }} href="mailto:warisbadar@hotmail.com">
                Email dossier ↘
              </a>
            </div>
          </div>

          <form className="contact-form reveal-el" onSubmit={onSubmit}>
            {submitted ? (
              <div
                className="mono"
                style={{
                  fontSize: 14,
                  letterSpacing: "0.08em",
                  padding: 40,
                  border: "1px dashed rgba(237,233,227,0.35)",
                  textAlign: "center",
                  textTransform: "uppercase",
                }}
              >
                Thank you. Your brief has been logged.
                <br />
                <span style={{ opacity: 0.6 }}>A confidential reply follows within 48 hours.</span>
              </div>
            ) : (
              <div className="contact-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                <div style={{ gridColumn: "span 2" }}>
                  <div
                    className="mono"
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "rgba(237,233,227,0.5)",
                    }}
                  >
                    01 — Your name
                  </div>
                  <input name="name" type="text" required placeholder="Jane Doe" />
                </div>
                <div>
                  <div
                    className="mono"
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "rgba(237,233,227,0.5)",
                    }}
                  >
                    02 — Email
                  </div>
                  <input name="email" type="email" required placeholder="jane@company.com" />
                </div>
                <div>
                  <div
                    className="mono"
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "rgba(237,233,227,0.5)",
                    }}
                  >
                    03 — Company
                  </div>
                  <input name="company" type="text" required placeholder="Organization" />
                </div>
                <div style={{ gridColumn: "span 2" }}>
                  <div
                    className="mono"
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "rgba(237,233,227,0.5)",
                    }}
                  >
                    04 — Mandate / brief
                  </div>
                  <textarea name="brief" required placeholder="The challenge, the timeline, the stakes." />
                </div>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    gridColumn: "span 2",
                    background: "#ede9e3",
                    color: "#0a0a0a",
                    padding: "18px 26px",
                    justifyContent: "center",
                    fontSize: 16,
                  }}
                >
                  <span className="dot" style={{ background: "#c8362d", boxShadow: "0 0 12px rgba(200,54,45,0.8)" }} />
                  Transmit the brief
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          :global(.contact-grid) {
            grid-template-columns: 1fr !important;
            gap: 56px !important;
            margin-top: 64px !important;
          }
          :global(.contact-form-grid) {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
