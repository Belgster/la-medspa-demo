# Phase 3 refinements

Items deferred to the full-site rebuild. Not demo blockers — revisit when the
production site ships.

## Nav / hero layering

The Phase 2 hero sits cleanly **below** the nav rather than extending under it.
Visually acceptable (Cienega, VIO, Seaport all separate nav and hero the same
way), and the scroll-reveal still runs — it just reveals `transparent-over-
cream → solid-over-cream` instead of the premium `transparent-over-photo →
solid-over-cream` effect originally scoped.

If we want the under-nav hero in Phase 3:
- Either `position: fixed` the nav (content flows under it from y=0), OR
- Wrap `<main>` in `display: flow-root` to block margin-collapse, then give
  the first hero section `margin-top: -72px; padding-top: 72px;`.

Earlier attempt hit a margin-collapse bug that pulled the body up 28px — the
flow-root wrapper is the clean fix, not the negative-margin trick alone.

## Karma italic

`@fontsource/karma` ships normal-weight only. Pull-quote moments currently
synthesize italic via `font-style: italic` at 32px display. Readable but not
a real italic face.

Source a real Karma Italic WOFF2 from Google Fonts (or a commercial foundry)
and add a matching `@font-face` declaration in `global.css`.

## Cloudflare adapter

Dropped in Phase 2 (`output: 'static'`, no adapter). When Phase 3 adds SSR
routes for WordPress content fetches, re-add `@astrojs/cloudflare` and switch
`output: 'server'` with `export const prerender = true` on the pages that
should still prerender. `image.service` stays pinned to sharp so static
assets bypass the Cloudflare Images runtime endpoint.

## Category page routing

`#category-<key>` anchors resolve nowhere in Phase 2 — the demo is a single
page. Phase 3 wires real routes (`/face/`, `/body/`, etc.) and the DesktopNav
flyouts + footer Explore column update automatically via the nav data file.

## Before & After slider

Phase 2 §6 is a styled "Coming soon" placeholder. Phase 3 needs a consented
B&A library from the client, then an actual slider primitive. Confirm with
Jennifer that a consented library exists before scoping the component.

B&A gallery — source exists at ssmlaseradvantage.com/before-after/ with
~25+ images organized by concern (Acne, Fine Lines & Deep Wrinkles,
Tightening, Lifting, Body Contouring, Pigmentation & Redness, Hair, Volume
Loss, Tattoo Removal, Skin Tone & Texture, Men). Needs consent verification
with Jennifer before republication — the current site hosting them doesn't
imply consent to republish on the demo URL. Propose as a standalone Phase 3
conversation — confirm each pair has a signed release, then migrate.
Existing §6 placeholder is acceptable until that clears.
