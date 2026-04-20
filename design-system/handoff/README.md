# LA Medspa — Handoff Package

For Claude Code. Read in this order:

1. **`design-system.md`** — source of truth. All token values, type scale, motion rule, voice.
2. **`tailwind.config.ts`** — drop into project root. Token names in here are load-bearing; do not rename the category triplet keys (`tone / line / ink`) or the warm neutral scale — components consume them by name.
3. **`components/`** — primitive React components in TSX. Tailwind classes assume the config above.
   - `Button.tsx` — pill, 5 variants × 5 states
   - `Navigation.tsx` — `DesktopNav` + `MobileNav`, flat 2-level
   - `FormControls.tsx` — `Input`, `Textarea`, `Select`, `Field`, `ConcernCheckCard`, `RadioCard`
   - `TreatmentCard.tsx` — tag-based, multi-category, 3px primary rail
   - `ConcernFinder.tsx` — 3-step conversion unit, with empty-state fallback
4. **`../LA MedSpa Design System.html`** — the visual spec sheet in the project root. Every state is rendered; use it to sanity-check component output.

## Load-bearing decisions (do not re-derive)

- **Motion default**: `400ms cubic-bezier(0.22, 1, 0.36, 1)`, fade + 8px translate. No scale, no bounce. Hover = temperature shift.
- **Primary button hover inverts** to transparent-with-gold-border. Not darken.
- **Focus ring** is warm gold (`#C98A1C`), never default browser blue.
- **Medical category** is oxblood (`line: #8A3A30`). Intentional warm authority.
- **Photography** is portrait-first. Side-by-side column layout is the primary pattern.

## Latitude (your call)

Scroll-trigger thresholds, exact per-section animation timings, footer layout, SEO/schema, cookie chrome, responsive breakpoint count (3 or 4 — your call). Pick sensibly; don't wait for design approval.
