# LA Medspa — Design System

**Version** 0.2 · April 2026
**Source of truth** for the LA Medspa rebuild. This doc is paired with `tailwind.config.ts` and the JSX component files in `handoff/components/`.

Read the visual spec sheet (`LA MedSpa Design System.html`) alongside this file.

---

## 1. Voice

> Less is more. Simple is best. Always natural.

Medical-grade expertise delivered with the warmth and restraint of a high-end spa. Never clinical, never salesy. Writing is low-density; white space does the lifting.

---

## 2. Color

### Brand palette

| Token | Hex | Role |
|---|---|---|
| `cream` | `#FEFDF7` | Page background — never pure white |
| `gold` | `#F1AC32` | Primary CTA, focal accents, key numerals |
| `goldHover` | `#D9962A` | CTA active/pressed |
| `goldWash` | `#FFF0D4` | Tint background on gold field |
| `peach` | `#FFBC7D` | Secondary support, editorial |
| `brown` | `#2B211B` | Headings H2–H6 |
| `ink` | `#16110E` | Deepest contrast, H1 |
| `beige` | `#F1EDE9` | Card / quiet surface |
| `charcoal` | `#464646` | Body copy |
| `charcoalSoft` | `#6B6461` | Secondary copy, captions |
| `hairline` | `#E8E1D8` | Warm divider |
| `focus` | `#C98A1C` | Warm focus ring — never default browser blue |

### Treatment-category IA (editorial, warm)

The category system is an IA tool, not decoration. Each service wears one hue so returning visitors orient across categories without reading labels. All six share matched lightness/chroma so the system reads as a family.

Three tokens per category: **Tone** (pill background), **Line** (2–3px card rail), **Ink** (label text).

| Category | Ink | Tone | Line | Mood |
|---|---|---|---|---|
| Face | `#7A3A2A` | `#F4E0D4` | `#C9765A` | Terracotta |
| Body | `#4A5A3C` | `#E3E8D8` | `#8AA06C` | Sage |
| Hair | `#6B4426` | `#EEE0CE` | `#B88250` | Clay |
| **Medical** | `#4A1F1C` | `#E8D4CE` | `#8A3A30` | **Oxblood — warm authority** |
| Wellness | `#7A4458` | `#F1DEE3` | `#B8798E` | Dusty rose |
| Skin Care | `#5C5A2A` | `#E9E6CC` | `#99955A` | Olive |

The Tone/Line/Ink triplet structure is the API every category-aware component consumes. Preserve it.

### Semantic

| Token | Hex | Role |
|---|---|---|
| `success` | `#6E8A5E` | Booking confirmed, form saved |
| `info` | `#6F7E8A` | Quiet info notes |
| `warning` | `#C28A3A` | Waitlist, limited availability |
| `error` | `#A8553A` | Form validation (warm terracotta, not stock red) |

---

## 3. Typography

**Figtree 500** capitalized does all display and heading work. Tight line-height (1.1), tracking just shy of neutral.
**Montserrat 300** carries body copy. The light weight is intentional editorial restraint.
**Karma 400 italic** is reserved for one or two pull-quote moments per page. Sparing.

| Role | Family | Weight | Size / LH | Tracking | Case |
|---|---|---|---|---|---|
| Display | Figtree | 500 | 72 / 1.05 | -0.015em | UPPER |
| H1 | Figtree | 500 | 56 / 1.08 | -0.01em | UPPER |
| H2 | Figtree | 500 | 40 / 1.10 | -0.01em | UPPER |
| H3 | Figtree | 500 | 28 / 1.15 | 0 | UPPER |
| H4 | Figtree | 500 | 20 / 1.25 | 0 | UPPER |
| Body L | Montserrat | 300 | 18 / 1.7 | 0 | Sentence |
| Body | Montserrat | 300 | 15 / 1.75 | 0 | Sentence |
| Caption | Figtree | 500 | 11 / 1.4 | 0.14em | UPPER |
| Editorial | Karma italic | 400 | 32 / 1.35 | 0 | Sentence |

---

## 4. Spacing, Radii, Shadow, Motion

### Spacing scale (px)

4 · 8 · 16 · 24 · 32 · 48 · 80 · 96 · 128

- Section padding: **128px desktop**, 96 tablet, 80 mobile. Never below 80.
- Card internal: 32.
- Form field vertical rhythm: 16.

### Radii

- `0` — editorial blocks, image frames
- `10` — all cards (8–12 acceptable)
- `999` — buttons, pills, tags — every state

### Shadow

Warm undertone, restrained. Heavy shadows read as dated — prefer hairline border first.

- `shadow-sm` — `0 1px 2px rgba(43,33,27,.04), 0 2px 8px rgba(43,33,27,.04)`
- `shadow-md` — `0 2px 6px rgba(43,33,27,.05), 0 10px 32px rgba(43,33,27,.06)`

### Motion

**Rule for anything not explicitly specced:** `400ms cubic-bezier(0.22, 1, 0.36, 1)`, fade + 8px translate. No scale, no bounce. Hover is a temperature shift, never a size change.

---

## 5. Components

Each has its own JSX file in `handoff/components/`.

### Button
Pill. Primary = gold → transparent-with-gold-border on hover (invert, not darken). Secondary = dark on cream. Ghost for quieter links. All five states required: default, hover, focus-visible, active, disabled.

### Navigation
Two levels, never three. Desktop: top-bar + single flat flyout. Mobile: root → category → treatment, two taps max. Discovery by concern belongs to the Finder, not the menu.

### Form Controls
Pill inputs (999px), warm gold focus ring (never default browser blue). Error is warm terracotta (`#A8553A`). Concern selector is a full-card checkbox with gold check mark.

### Treatment Card
Tag-based, multi-category. A 3px top rail picks up the card's primary category; tags below declare the rest. Bela MD wears both Face and Skin Care without being duplicated in the IA.

### Concern Finder
Three steps: Concern (required) → Area (optional, skippable) → Results. Results use the same category tag tokens used throughout the system. 0-match empty state routes to consultation. A fused 1+2 alternative exists for A/B testing once there's real traffic.

---

## 6. Photography

Portrait-orientation only. Side-by-side column is the **primary pattern** when images appear next to copy; landscape crops are a variant, not the default.

`121.jpg` (blonde clinician, face-line art) is the hero slot and the tone-setter for the system. If a component looks wrong next to that image, the component is wrong.

Placeholder blocks in the spec reference real asset-pack filenames — swap in `<img>` against those files during implementation.
