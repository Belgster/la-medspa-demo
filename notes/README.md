# LA MedSpa — Project workspace

Demo homepage build for LA MedSpa (Laser Advantage), Sault Ste. Marie, Ontario.
This is the Phase 2 demo artifact — what Jennifer Kapur sees before signing off
on the full site rebuild.

## Folder map

- **`design-system/`** — Claude Design v0.2 export (April 2026)
  - `LA MedSpa Design System.html` — visual spec sheet (open in browser to review)
  - `handoff/` — the files Claude Code reads first
    - `README.md` — read-in-this-order instructions
    - `design-system.md` — source of truth (tokens, voice, motion rule)
    - `tailwind.config.ts` — drop into demo/ as-is
    - `components/` — production-ready `.tsx` primitives
  - `components/` — internal JSX used by the spec sheet (reference only)

- **`demo/`** — Astro + Tailwind project, deploys to Cloudflare Pages
  - Empty until Claude Code scaffolds it

- **`assets/`** — 20 curated photos from the client's brand shoot
  - `ASSET_MANIFEST.md` — read first, maps images to component slots
  - Standouts: `121.jpg` (injectables hero), `245.jpg` (portrait with overlay
    space), `332.jpg` (consultation), `157.jpg` (hydrafacial)

- **`notes/`** — this file, plus anything else worth keeping

## Stack

- Astro + Tailwind CSS
- Deploy: Cloudflare Pages (via `@astrojs/cloudflare`)
- Booking: Jane App external link → `https://laseradvantage.janeapp.com/`
- Current site (for content mining): `https://ssmlaseradvantage.com/`
- Rebrand: Laser Advantage → LA MedSpa, March 2025
- Voice: "Less is more. Simple is best. Always natural."

## Phase boundaries

- **Phase 1** (done): Design system v0.2
- **Phase 2** (now): Single demo homepage, polished for owner sign-off
- **Phase 3** (after sign-off): Full rebuild — all service pages, WPGraphQL
  integration, Jane App embed, GA4 + Facebook Pixel, SEO migration
