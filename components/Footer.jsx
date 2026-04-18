"use client";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-foot">
      <div>© {year} Waris M. Badar — Advisory & Intelligence</div>
      <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
        <a href="mailto:warisbadar@hotmail.com" style={{ textDecoration: "underline" }}>
          warisbadar@hotmail.com
        </a>
        <a href="#contact" style={{ textDecoration: "underline" }}>
          Book engagement
        </a>
        <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>
          LinkedIn
        </a>
      </div>
      <div>New York City, NY · MMXXVI</div>
    </footer>
  );
}
