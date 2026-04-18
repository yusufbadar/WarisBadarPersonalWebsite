/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0A0A",
          900: "#0A0A0A",
          800: "#121212",
          700: "#1C1C1C",
          500: "#6B6B6B",
          300: "#CFCFCF",
          200: "#E5E5E5",
          100: "#F3F3F3",
        },
        bone: "#EDE9E3",
        accent: {
          DEFAULT: "#C8362D",
          hot: "#E5483B",
          ember: "#FF5F49",
        },
        gold: "#C8A464",
      },
      fontFamily: {
        sans: [
          "Helvetica Neue",
          "Inter Tight",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        display: [
          "Helvetica Neue",
          "Inter Tight",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "Space Mono", "ui-monospace", "monospace"],
        hand: ["Caveat", "Gloria Hallelujah", "cursive"],
        editorial: ["Instrument Serif", "Playfair Display", "serif"],
      },
      letterSpacing: {
        tightest: "-0.055em",
        "extra-tight": "-0.035em",
      },
      transitionTimingFunction: {
        cinema: "cubic-bezier(0.77, 0, 0.175, 1)",
      },
    },
  },
  plugins: [],
};
