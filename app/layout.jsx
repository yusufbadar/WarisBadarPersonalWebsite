import "./globals.css";

export const metadata = {
  title: "Waris M. Badar — Fractional Executive & Strategic Advisor",
  description:
    "Fractional CEO, CDO, CMO & Head of Business Intelligence. Turning data, strategy, and leadership into measurable enterprise growth for category-defining brands.",
  keywords: [
    "Fractional CEO",
    "Chief Data Officer",
    "Head of Business Intelligence",
    "Chief Marketing Officer",
    "Head of Analytics",
    "Fractional Executive",
    "Strategy Consultant",
    "Waris Badar",
  ],
  openGraph: {
    title: "Waris M. Badar — Fractional Executive & Strategic Advisor",
    description:
      "Fractional executive leadership for modern business transformation. BI, analytics, AI, marketing, and growth strategy.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
