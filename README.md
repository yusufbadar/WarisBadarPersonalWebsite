# Waris M. Badar — Fractional Executive Advisory

An immersive, editorial, motion-forward portfolio site for Waris M. Badar — fractional CEO, Chief Data Officer, Head of Business Intelligence, and CMO-grade advisor. Built in Next.js 14 (App Router) with Tailwind CSS, anime.js, and Spline.

Aesthetic north star: the cinematic pacing and editorial restraint of premium studios like bpco.kr — reinterpreted for executive advisory.

---

## Quickstart

```bash
npm install
npm run dev
# → http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

---

## 1. Creative concept

**Title:** *The Index — a dossier of signal, not noise.*

The site is framed as a premium dossier for retained advisory. Every section is numbered (N° 01 … N° 09), set on a warm bone-paper canvas, and broken by a single disciplined accent red (`#C8362D`). The visual vocabulary — dashed pill navigation, mono labels with numeric captions, oversized editorial type, horizontal reveals — signals *editorial quality* over SaaS energy.

Where bpco uses its references to build an agency-studio feel, we convert that energy into an executive register: stronger ledger metaphors (counters, indices, mandates), more restrained color, denser information in the timeline card, and a Spline 3D hero that reads as intelligence rather than decoration.

## 2. Visual & motion direction

- **Typography.** Helvetica Neue (preferred, falls back to Inter Tight). Mono set in JetBrains Mono for meta and captions. Accent italics in Instrument Serif to evoke editorial voice. Handwritten Caveat margin notes for warmth.
- **Color.** Paper gradient `#E8E3DC → #F3F0EA → #EDE9E3`; ink `#0A0A0A`; accent `#C8362D`; gold `#C8A464` for subtle luxury reinforcement.
- **Layout.** 40-px gutters, 1480-px maximum stage, single-accent grid system. Sections breathe (140-px vertical) with deliberate pacing.
- **Motion.**
  - Anime.js drives all scroll reveals, character splits, counters, pill blob, preloader progress.
  - CSS cubic bezier `(0.77, 0, 0.175, 1)` powers hero orb, service-panel lifts, timeline card drift.
  - `prefers-reduced-motion` kills all non-essential motion globally.
- **3D.** Spline scene loads lazily in the hero and fades over a permanent CSS-gradient orb, guaranteeing a beautiful hero whether the 3D asset loads or not.

## 3. Site architecture

```
/
├── Preloader (cinematic, branded)
├── Header (sticky pill nav + meta ribbon with NYC time)
├── Hero (Spline + orb + editorial headline)
├── Marquee (executive roles)
├── About (positioning)
├── Expertise (6 cards)
├── Timeline (horizontal scroll career dossier)
├── Industries / Functions / Clients
├── Impact ledger (animated counters)
├── Services (variable-grid engagement matrix)
├── Tech stack
├── Contact (dark stage + brief form)
└── Footer
```

## 4. Homepage wireframe (narrative)

1. **Black preloader** — percent counter, mono status line, dossier subtitle, then the shutter lifts upward.
2. **Hero** — mono ribbon top-right, eyebrow status pill, 4-line editorial headline with a Caveat margin note, meta row of 4 vital signs, Spline/orb on the right.
3. **Marquee** — outlined type of executive titles, single accent dot — an identity pulse.
4. **About** — two-column editorial with pull-quote, deep positioning paragraph, and a sub-ledger of clients.
5. **Expertise** — 3×2 grid of black-on-paper cards that invert to paper-on-black on hover with an accent rule.
6. **Timeline** — horizontal scroll powered by sticky-stage transform. Six dossier cards, right-aligned number tag, accent micro-rule bullets.
7. **Industries / Functions / Clients** — three-column pill taxonomy with a dashed-underline client ledger.
8. **Impact** — counter-animated metrics with hover inversion.
9. **Services** — variable-span dice grid. One tall, one wide, one paper-inverted.
10. **Tech stack** — indexed rows of capability categories.
11. **Contact** — dark stage with oversize headline, mandate pills, direct details on the left, brief form on the right.
12. **Footer** — mono, three-part: mark, utility, location.

## 5. Polished homepage copy

Already embedded in the React components. Headline example:

> Intelligence, engineered for category leaders. — measurable growth.

Sub-copy:

> Waris M. Badar is a fractional executive — Chief Data Officer, Head of Business Intelligence, CMO — advising boards and founders on data strategy, analytics transformation, and AI-enabled growth.

CTA copy:

- `Book a strategy session` (primary)
- `View career dossier ↘` (ghost)
- `Transmit the brief` (form)
- `Email dossier ↘` (secondary)

## 6. Implementation

- **Framework:** Next.js 14 (App Router), React 18, JavaScript (JSDoc-friendly).
- **Styling:** Tailwind CSS 3 + a hand-authored `globals.css` token system.
- **Motion:** `animejs` + IntersectionObserver in `lib/anime.js`.
- **3D:** `@splinetool/react-spline` lazy-loaded with a permanent CSS orb fallback.
- **No GSAP** — anime.js is the single motion library, per the brief.

File map:

```
app/
  globals.css        # design system (tokens, header, hero, timeline, contact, etc.)
  layout.jsx
  page.jsx
components/
  Preloader.jsx
  Header.jsx
  Cursor.jsx
  Hero.jsx
  Marquee.jsx
  About.jsx
  Expertise.jsx
  Timeline.jsx
  Industries.jsx
  Impact.jsx
  Services.jsx
  TechStack.jsx
  Contact.jsx
  Footer.jsx
lib/
  anime.js           # revealOnScroll, splitChars, animateChars, animateCounter
```

## 7. Spline asset notes

The default scene URL in `components/Hero.jsx` is:

```js
const SPLINE_SCENE = "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode";
```

Recommended replacements for the executive-advisory tone:

1. A brushed-chrome liquid sphere with a chamfered plinth (dossier feel).
2. A slowly-orbiting polyhedral data shard, amber-gold over charcoal.
3. A wireframe globe with flowing lines between NYC and Dubai (reinforces geography).
4. An ink-black torus with a red interior ring (strategy/focus metaphor).

To swap:

1. Build in [spline.design](https://spline.design).
2. Publish as a `scene.splinecode` URL.
3. Paste the URL into `SPLINE_SCENE` and ship.

The hero already renders a luminous CSS orb underneath so the visual never breaks if Spline is blocked, slow, or unavailable.

## 8. Anime.js integration notes

- **Scroll reveals** use `revealOnScroll(nodes)` — every component opts-in by adding `.reveal-el` to elements and `useRef` plus a one-line effect.
- **Character splits** use `animateChars(el)` against `<h2 data-split>`.
- **Counters** use `animateCounter(el, target, { suffix })`.
- **Horizontal timeline** is driven by a manual RAF loop reading the sticky stage's bounding rect — no extra library.
- **Pill navigation** uses a bezier-animated `.pill-blob` that tracks the active link and hover link via bounding-rect math.

## 9. Microinteractions

- Cursor: 36-px difference-mode ring with a 6-px red dot; ring expands to 60 px over interactive elements.
- Service panels: lift on hover + radial red glow wash.
- Hero orb: parallaxes opposite to the cursor on mousemove.
- Footer pill CTA: background swap to accent on hover with a 2-px Y-lift.

## 10. Accessibility & performance

- Respects `prefers-reduced-motion` in `globals.css` and inside each component's useEffect.
- Semantic sections (`section`, `nav`, `main`, `footer`, `article`).
- Focus-visible dashed outline preserved.
- Spline loaded via `React.lazy` + `Suspense` so initial paint is fast.
- `overflow-x: hidden` on body to guard against any transform overshoot on small screens.

## 11. Future enhancements

- Swap the community Spline scene for a branded bespoke asset (see above).
- Case studies modal: transition from the timeline card into a full-viewport black-on-white detail view (mirrors bpco project detail).
- Testimonials marquee with client logos fetched from a CMS (Sanity or Contentlayer).
- `/book` page with a direct Calendly / Savvycal embed tokenized by client.
- Optional `/en` `/ar` routing using `next-intl` — the meta already hints at EN / AR.
- Programmatic OG image generation via `next/og`.
- Lighthouse pass + Core Web Vitals optimization (image subsetting, font preloads, idle-callback for the cursor loop).

---

Built to look and operate like a retained advisory firm, not a SaaS landing page. Contact: `warisbadar@hotmail.com`.
