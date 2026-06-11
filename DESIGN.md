# DESIGN.md — Process to Pixels

Editorial, grid-driven brand system for Process to Pixels — Lisa Demchenko's strategic UX & product design studio. Use it to style any P2P-owned site or interface in one consistent direction.

This file is written to be read and acted on by AI coding tools (Claude Code, Cursor, Stitch, Windsurf). Every token says what it's for and where it cannot go. When a rule isn't stated, the tool will invent a default — so the constraints here are deliberate. The look is brand-first: editorial layout and generous whitespace come before density, even in functional UI.

## Product brief

Process to Pixels is the studio brand of Lisa Demchenko, a strategic product designer who helps startups and businesses build products people love through UX research, product design, and design systems. The web presence spans a marketing/portfolio site, a designer-resources area, and (over time) small web apps and tools.

The audience is founders, product teams, and fellow designers. The interface must read as editorial, confident, and quietly premium — like a design publication, not a SaaS template. It uses hairline rules, big serif display type, and a lot of air. Across every property, a visitor should immediately feel they're on the same brand.

This is a brand-first system: it covers both marketing pages and functional app UI, but when the two conflict, the editorial brand look wins over information density.

## Design principles

1. **Structure is the decoration.** The grid, hairline borders (1px in `cream-dark`), and disciplined alignment carry the design. Avoid shadows, gradients, and ornament — the layout does the work.
2. **Air communicates quality.** Generous section padding and line-height are part of the brand. When unsure, add space. Crowding reads as cheap.
3. **Two voices, never more.** Serif display (Boldonse) for impact, grotesk sans (Cabinet Grotesk) for everything else. Type contrast does the expressing; don't reach for a third family or decorative weights.
4. **Color is a signal, not a coat of paint.** Purple means "act here." Olive means "this is a brand moment / label." Everything else is a neutral. Misusing either dilutes the whole system.
5. **Motion is a reveal, not a performance.** Content fades and slides up gently on scroll. Nothing bounces, spins, or competes for attention.

## Color tokens

Format below is value → intent → boundary. The boundary is the part that keeps the system consistent across sites. Color roles are locked — treat the boundaries as hard rules.

### Brand / interactive

```yaml
accent: "#5C3AFF"   # "Studio Purple"
# The single interactive + brand-emphasis color. Use for: primary CTAs, active nav/tab
# states, focus rings, links, italic emphasis inside a headline, and small accent marks.
# NEVER use as a large background fill or decorative block. NEVER pair two purples on one
# element. One primary purple CTA per screen — if you want a second, make it btn-outline.

accent-light: "#7B5FFF"
# Hover/active shade of accent ONLY. Never a resting color, never text.

accent-pale: "#EDE8FF"
# Tint of purple for subtle fills: badge backgrounds, "free/featured" pills, soft highlight
# panels. Pair with accent text/border. Not for body backgrounds or large sections.

accent-on-dark: "#8DAA44"
# The accent color WHEN the surface is olive or dark. On olive panels, "purple" reads poorly,
# so olive's lighter sibling stands in for emphasis (e.g., credit highlights, checkmarks).
```

### Olive (brand secondary)

```yaml
olive: "#8DAA44"
# The brand's signature surface + label color. TWO sanctioned uses, nothing else:
#   1. As an eyebrow/section-marker/label text color (small, uppercase, tracked).
#   2. As a full-panel BACKGROUND for "brand moment" blocks — hero-right, CTA section,
#      featured pricing/review card. On olive, body text is rgba(26,23,48,0.85), not pure ink.
# NEVER use olive for body text, for buttons, or as a 1px border. It is either a tiny label
# or a whole panel — never an in-between accent.

olive-light: "#A3C050"
# Hover/lighter variant of olive. Use sparingly (e.g., number/icon hover on light surfaces).

green-light: "#E8F0D2"
# Very pale olive tint. Optional soft background for olive-themed callouts. Rare.
```

### Neutrals — surfaces

```yaml
cream: "#FAFAFA"
# The default page background and the default card surface. This is the "paper."

cream-dark: "#EBEBEB"
# The workhorse hairline. Used for: 1px borders, dividers, the gap color behind 1px-gap card
# grids (the grid background shows through as hairlines), inactive tags, and ghost numbers.
# Whenever you see a thin line in this brand, it is this color at 1px.

hover-tint: "#F2F4ED"
# Subtle hover background for interactive cards/rows on cream surfaces. Barely-there warm grey.

black: "#0F0D1F"   # "brand-black"
# Reserved for the rare true-dark surface or maximum-contrast text. Not the default text color
# (that's ink). Use only when a near-black is intentional.
```

### Neutrals — text hierarchy

```yaml
ink: "#1A1730"
# Primary text + the default foreground. Headlines, body copy, strong labels.

ink-mid: "#3D3A5C"
# Secondary body text — supporting paragraphs, feature descriptions inside cards.

ink-soft: "#6B6880"
# Tertiary text — labels, nav links at rest, captions, list sublabels.

ink-faint: "#B0AEC4"
# Quietest text — meta labels, footer links, placeholder-adjacent text, ghost states.
# Below this, text fails contrast. Don't go lighter for anything readable.
```

On olive or dark panels, do not use the ink ramp. Use `rgba(26,23,48,0.85 / 0.7 / 0.5 / 0.3)` to step down the same way ink → ink-faint steps down on cream.

## Typography

Two families. Headlines are serif-display; everything else is grotesk sans. Reach-for guidance matters more than the numbers — it stops display type from leaking into cards and tables.

```yaml
families:
  display: '"Boldonse", "Playfair Display", Georgia, serif'   # impact headlines only
  sans:    '"Cabinet Grotesk", system-ui, sans-serif'         # body, UI, buttons, labels
  quote:   '"Playfair Display", Georgia, serif'               # italic pull-quotes only
  mono:    '"JetBrains Mono", monospace'                      # code / numeric meta, rare
# Loaded but situational: Bricolage Grotesque, Inter Tight. Don't introduce new families.
# Cabinet Grotesk weights available: 300, 400, 500, 700.
```

### Display scale (serif — Boldonse)

```yaml
display-xl:
  size: clamp(32px, 3.8vw, 56px) / weight 400 / line-height 1.08 / tracking -0.02em
  usage: The hero headline / single biggest statement on a page. One per page, top of fold.

display-lg:
  size: clamp(24px, 2.8vw, 38px) / weight 400 / line-height 1.1 / tracking -0.02em
  usage: Section headings ("Services", "Process"). The main title of a content section.

display-md:
  size: clamp(20px, 2.2vw, 30px) / weight 400 / line-height 1.15
  usage: Card titles and sub-section headings. The largest type allowed INSIDE a component.

display-sm:
  size: 20px / weight 400 / line-height 1.2
  usage: Small headings, compact card titles. Floor for serif display — below this, use sans.
```

Serif display is always weight 400. The drama comes from size and the typeface, never bold. Don't bold Boldonse.

### Functional type (sans — Cabinet Grotesk)

```yaml
body:
  size: 15-16px / weight 400 / line-height 1.75
  usage: All paragraph copy. The roomy 1.75 line-height is part of the brand — keep it.

lead:
  size: 16-18px / weight 400 / line-height ~1.6 / color ink-mid
  usage: The intro sentence beside a section header (the right side of .section-header).

label:
  size: 11px / weight 500 / tracking 0.12em / UPPERCASE / color ink-soft
  usage: Input labels, meta labels, nav links, small UI labels. Never for clickable body text.

label-sm / section-marker:
  size: 10px / weight 500 / tracking 0.18em / UPPERCASE
  usage: Eyebrows and section markers. section-marker is colored OLIVE; generic label-sm
         is ink-faint. This tiny tracked label is the most repeated brand signature — use it
         to open most sections.

quote:
  family: Playfair Display, italic / size clamp(20px, 2.5vw, 28px) / weight 500 / lh 1.45
  usage: Pull-quotes and testimonials only. Italic serif. Never for UI or headings.
```

## Spacing

Base unit is 4px; the system leans on a small set of multiples. Philosophy: this is an airy editorial brand — when in doubt, add space. Density is reserved for genuine data views, and even there, keep hairline breathing room.

```yaml
scale: 4 · 8 · 12 · 16 · 20 · 24 · 28 · 32 · 40 · 48 · 56 · 60 · 80 · 120  (px)

section_padding:
  desktop: 120px vertical / 56px horizontal   (.section)
  compact: 80px vertical / 56px horizontal     (.section-sm)
  mobile:  80px/24px  (compact 60px/24px)
# 56px is the canonical horizontal page gutter on desktop; 24px on mobile (<900px).

card_padding: 32-48px   # cards breathe: pricing/process ~40-48px, tighter cards ~32px
gap_hairline: 1px       # card grids use a 1px gap over a cream-dark background = hairlines
gap_standard: 16 / 40 / 48 / 80px   # 16 tight grids · 40-48 card rows · 80 two-column splits
ghost_grid: 56px        # decorative background grid cell size
```

## Radius

```yaml
button: 2px        # sharp, intentional — buttons are nearly square-cornered
input: 8px         # form fields
card_cluster: 20px # the OUTER radius of a clustered card grid (process/why/about/resources)
pill: 999px        # tags, badges, status pills, toggles
image: 4px         # work-grid thumbnails
```

Note the deliberate split: individual buttons are crisp (2px), but a cluster of cards gets a soft 20px outer radius with hairline-divided cells inside. Don't round individual cells inside a cluster — only the outer container.

## Components

Decision logic first, visual spec second. The goal is for an AI tool to pick the right pattern without a designer present.

### Buttons

There are three roles. Use exactly one primary (purple, filled) CTA per screen. Everything secondary is outline or light.

`btn-dark` / `btn-accent` is the primary: filled `accent` purple, white text, hover `accent-light`. This is the one action you most want taken. `btn-outline` is secondary: transparent with a 1px `cream-dark` border and `ink` text, hover fills `cream-dark`. Use it for "learn more," "secondary path," or any second button next to a primary. `btn-light` is for placement on dark/olive panels: `cream` background, `ink` text. All buttons share the same skin — 11px, weight 700, uppercase, 0.1em tracking, 14px×24px padding, 2px radius. Buttons are tiny, tracked, and sharp-cornered; never make them large rounded pills.

### Section header

Most sections open with the same structure: a left column holding an olive `section-marker` eyebrow above a serif `display-lg` heading, and a right column with a single `lead` sentence in `ink-mid`. On mobile (<900px) it stacks, marker → heading → lead. Reuse this header rather than inventing per-section layouts — its repetition is what makes the sites feel like one brand.

### Cards vs. list rows

Decide by how the user reads the content. List rows (full-width, separated by a single 1px `cream-dark` bottom border, ~40px vertical padding) are for sequential content the user moves through top-to-bottom — services, process steps shown linearly, feature lists. Card clusters are for parallel options the user scans and compares — pricing tiers, testimonials, resource categories, stat grids. If the reader will look at every item in order, use rows; if they're hunting for the one that fits, use a cluster.

A card cluster is built as a CSS grid with a `1px` gap over a `cream-dark` background, each cell filled `cream`, wrapped in a container with `20px` radius and `overflow: hidden`. The gap is the border system — you get perfect hairlines between every cell for free. Don't give individual cells their own borders or radius. To highlight one card in a cluster (the recommended pricing tier, the headline testimonial), fill it `olive` and switch its text to the `rgba(26,23,48,...)` ramp — that's the single sanctioned "featured" treatment.

### Ghost numbers

Large serif numerals (`display` family, e.g. 30–48px, weight 400) in `cream-dark` sit quietly behind service/process/category items. On hover of the parent card they transition to `olive`. This is a recurring brand device — use it to enumerate steps or items, and keep the resting state faint (cream-dark) so it reads as texture, not content.

### Tags, badges & pills

`tag` is a neutral chip: 11px, `cream-dark` background, `ink-soft` text, 999px radius — for non-interactive metadata (skills, tools, categories). `badge`/`pill` adds meaning: a "featured/free" pill uses `accent-pale` fill with `accent` text and a 1px `accent` border; a status pill uses a translucent dark fill with an animated green dot. Keep pills small and quiet; they label, they don't shout.

### Forms

Inputs are `8px` radius, filled with a translucent dark wash (`rgba(26,23,48,0.05)`), 1px translucent border, 15px Cabinet Grotesk. On focus, the border becomes semi-transparent purple (`rgba(92,58,255,0.5)`) — purple is the focus signal everywhere, consistent with its interactive role. Labels above fields use the 11px uppercase `label` style. Placeholders are very faint. Error states must always be text + color, never color alone (see don'ts).

### Navigation

Fixed two-tier bar on a blurred translucent `cream` background (`rgba(250,250,250,0.92)` + 16px backdrop blur) with a 1px `cream-dark` bottom border. Top tier (52px) holds the serif `nav-logo` and utility links; bottom tier (42px) holds primary nav links — 11px uppercase, `ink-soft` at rest, `ink` when hovered or `.active`. A small olive dot (`nav-switcher-dot`) marks the brand/site switcher. Keep nav type tiny and tracked; the logo is the only serif element in the bar.

### Brand-moment panels (olive)

Hero-right, the CTA section, and featured cards are the brand's olive surfaces. On these: background `olive`, body text `rgba(26,23,48,0.85)`, dividers `rgba(26,23,48,0.08–0.18)`, and emphasis/checkmarks in `accent-on-dark` (the olive-light green) rather than purple. Use olive panels sparingly — one or two per page — so they stay special.

## Motion

The brand has one motion idea: fade + slide up. Content reveals with `fadeSlideUp` (opacity 0→1, translateY 20–28px→0) over ~0.6–0.9s, staggered via delay classes (`anim-d1`…`anim-d5`) or scroll-triggered (`.reveal`). Service cards get a slightly stronger parallax reveal. Always respect `prefers-reduced-motion: reduce` (disable transforms/animation). The marquee/work-grid auto-scroll is the only continuous motion — keep it slow and linear. No bounce, no spin, no attention-grabbing motion on data or rows.

## Explicit don'ts

```
- No gradients anywhere — backgrounds, buttons, text. Flat color only.
- No drop shadows. Depth and separation come from 1px cream-dark hairlines, never shadow.
- Purple (#5C3AFF) is interactive/brand-emphasis only. Never a large background, never decorative.
- Olive (#8DAA44) is only a tiny label OR a full panel background. Never body text, never a button, never a 1px border, never an in-between accent.
- Status/signal colors are reserved. The green status dot means "available/active" — never decorative.
- No more than one primary (filled purple) CTA per screen. A second action is btn-outline.
- Serif display type (Boldonse) is for headings only — never inside tables, list rows, inputs, or as body. And never bolded; it stays weight 400.
- No third type family and no decorative weights. Two voices: Boldonse display + Cabinet Grotesk sans.
- Don't round individual cells inside a card cluster. Only the outer container gets the 20px radius; inner separation is the 1px gap.
- Buttons stay small, uppercase, tracked, and nearly square (2px radius). No large pill-shaped buttons.
- Error and status states are always text label + color, never color alone.
- No tooltips for critical information. If the user must hover to understand it, rewrite the label.
- No full-width buttons on desktop — that's a mobile-only pattern.
- No motion on data tables or list rows. The only sanctioned motion is fade-slide-up reveal and the slow linear marquee. Always honor prefers-reduced-motion.
- Don't crowd. Keep the 56px desktop gutter, 120px section rhythm, and 1.75 body line-height — whitespace is brand equity here.
```

## Diagnostic loop

To pressure-test this file: drop it into Claude Code or Stitch and ask for three variations of the most complex screen (e.g., a pricing or services page). Don't judge whether it "looks nice" — look at where it deviates from the rules above. Each deviation is a constraint this file hasn't stated clearly enough. Add it, regenerate, repeat. Most files stabilize after two or three passes.
