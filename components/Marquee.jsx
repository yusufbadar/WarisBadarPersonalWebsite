"use client";

const ITEMS = [
  "Fractional CEO",
  "Chief Data Officer",
  "Head of Business Intelligence",
  "Head of Analytics",
  "Chief Marketing Officer",
  "Head of Strategy",
  "SVP, Marketing",
  "AI-Enabled Advisory",
];

export default function Marquee() {
  const double = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee__track">
        {double.map((it, i) => (
          <span key={i} className="marquee__item">
            {it} <span className="marquee__dot">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}
