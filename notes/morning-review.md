# Morning review — autonomous pass + five refinements + mobile/B&A pass

Autonomous pass executed 2026-04-20, starting from commit `277290f` (§3 approved).
All 11 brief sections landed. Five Natalie refinements executed 2026-04-21 on
top of that. Mobile polish + real B/A landed in a follow-up pass the same day.
Lighthouse mobile targets held (LCP improved). Deploy-ready, not deployed.

## Commits — mobile polish + real B/A (2026-04-21, later)

```
d742d20  §6: real lip-filler B/A — drag-comparison slider, two pairs (replaces placeholder)
f9eacbd  mobile polish: iPhone 14 Pro (390px) — hero svh, §5 tighten, section padding
```

## Commits — Natalie refinement pass (2026-04-21)

```
ff9cb45  refine #5: log B&A gallery deferral (legal/consent, not design)
dbe8c18  refine #4: three Shopify touchpoints
17baeba  refine #2: real team headshots, 11 members
81f709c  refine #1: bridge the 21px nav-flyout hover gap
```

Note on #3: no commit. Confirmed via web_fetch that neither the current
site's homepage nor /about-us/ embeds any review widget (Trustindex,
Elfsight, or equivalent), and the Google Maps listing URL returned no
scrapable review content through web_fetch. Per the directive "If no
reviews are findable through either path, keep the current placeholder
pattern and move on — don't fabricate," the §7 testimonials strip keeps
its cartouche + placeholder cards. Phase 3 wires the live Google Business
Profile feed.

## Commits — autonomous pass (2026-04-20)

```
b7a2e7c  Autonomous pass complete — morning review for deploy
35c2df6  §9: a11y contrast + LCP under 2s
300f9af  §9: mobile responsive fixes on Concern Finder
60a7cdf  §8: Financing + Instagram split
2dd6acb  §7: Testimonials placeholder + Team preview
956f9b7  §6: Before & After placeholder — "Real client results, coming Phase 3"
3a6fe41  §5: a11y — drop opacity-50 on inactive step buttons
31bf340  §5: Concern Finder — wire shipped TSX as client:visible React island
34635e6  §4: Hormone Therapy spotlight — BHRT, prescriber-led, Medical-accented
277290f  §3: six service categories grid — tone/line/ink system live   ← your original approval
```

Earlier session (your review):

```
a3a5ebf  §2: "The Leader in Medical Aesthetics" — intro + stat bar
dbc8b86  §1: hero — 245.jpg, overlay tagline, 2 CTAs, end-of-hero nav reveal
1a76e50  §0: static dark nav text (kill the inverted color interpolation)
6e3ea1a  §0 verify: puppeteer-core + headless scroll-sweep script
0a0a545  §0: scroll-driven nav reveal + legibility fixes
5b98f61  §0: Astro + Tailwind scaffold, nav chrome, footer
```

## Mobile Lighthouse — post-refinement production build

```
Performance    : 99     (target 95+ ✓)
Accessibility  : 100
Best Practices : 100
SEO            : 100

LCP            : 1.9s   (1880 ms — target < 2.0s ✓)   ← was 1955ms pre-refinement
CLS            : 0      (target < 0.05 ✓)
TBT            : 0 ms   (proxy for INP < 150ms ✓)
FCP            : 1.4s
Speed Index    : 1.4s
```

All scores held or improved through the four refinement commits.
LCP improved by ~75ms — the Shopify links added no new images or JS, and
the team-headshot WebPs went through Astro's sharp pipeline (AVIF+WebP
generated at [144, 216] widths for the 72px circles, lazy-loaded below
the fold).

Reproducible — `npm run build && npm run preview` then run [`verify-hero.mjs`](../demo/scripts/verify-hero.mjs) or lighthouse CLI. Lighthouse config defaults to Moto G4 4G throttled profile.

## Total bundle size

Production `dist/` total: **21 MB** (dominated by 50+ responsive image variants — AVIF/WebP/JPG × 6 widths × 7 source images; only one width per image downloads per request).

Critical path on a 1440px mobile emulation:

| Asset | Size |
|---|---|
| `dist/index.html` | **116 KB** |
| `dist/_astro/index@_@astro.CjjsS0O3.css` | **36 KB** |
| `dist/_astro/client.mxV3x1Xx.js` (astro + react runtime) | **184 KB** |
| `dist/_astro/ConcernFinder.*.js` + Navigation + Button + index | **32 KB** |
| Hero `245.*_G8a11.avif` (2400w) | **44 KB** |
| Fonts (Figtree + Montserrat latin WOFF2, self-hosted) | **~60 KB** |
| **Estimated first-paint weight** | **~260 KB** HTML + CSS + hero image + Figtree |
| **First-paint excluding hero** | **~216 KB** (well under the 800KB brief ceiling) |

React runtime only downloads when an island hydrates. MobileNav hydrates on `client:visible` above the fold on mobile; the ConcernFinder island hydrates on scroll-into-view, i.e., *after* the LCP measurement window.

## Team headshot audit (resolved filenames)

For your visual sanity-check before deploy. All 11 images downloaded from
`ssmlaseradvantage.com/wp-content/uploads/2026/02/` and live in
`demo/src/assets/team/`. Each was spot-checked visually against the source
filename before commit — no mix-ups found in the sample.

| Team member | Source WP filename | Stored as |
|---|---|---|
| Jennifer Kapur   · RN · Managing Director    | `Jen-Team-1.webp` | `jennifer-kapur.webp` |
| Dr. Cory Goldberg · MD · Plastic Surgeon     | `Cory-1.webp`     | `cory-goldberg.webp`  |
| Sara Rocchetta   · NP · Aesthetic Specialist | `Sara-1.webp`     | `sara-rocchetta.webp` |
| Andrew Metcalfe  · NP · Medical Aesthetics   | `Andrew.webp`     | `andrew-metcalfe.webp`|
| Angie Glavota    · RN                        | `Angie-1.webp`    | `angie-glavota.webp`  |
| Riley Guzzo      · Medical Esthetician       | `Riley-1.webp`    | `riley-guzzo.webp`    |
| Jenna Battisti   · Medical Esthetician       | `Jenna-1.webp`    | `jenna-battisti.webp` |
| Mariah Ruscio    · Medical Esthetician       | `Mariah-1.webp`   | `mariah-ruscio.webp`  |
| Nikka Merena     · Medical Esthetician       | `nikah-1.webp`    | `nikka-merena.webp`   |
| Raea Caruso      · Clinic Manager            | `Raea-1.webp`     | `raea-caruso.webp`    |
| Natalie Yuen     · Digital Marketing Manager | `Natalie-1.webp`  | `natalie-yuen.webp`   |

One WP filename caveat worth noting: `nikah-1.webp` is misspelled upstream
(should be `nikka`). Stored locally as `nikka-merena.webp` — the WP slug is
the only thing referencing the typo.

## PAUSE items

None. Every refinement executed except #3 (reviews) which was explicitly
log-and-skip per the "don't fabricate" directive.

Original autonomous pass also had no PAUSE items.

Two soft flags worth seeing:

- **§7 testimonials are placeholder cards + "Coming Phase 3" cartouche.** The live site publishes no reviews on `/`, `/about-us/`, `/specials/`, or `/testimonials/` (404). Per the hard-limit "no testimonials you can't source," the demo ships a layout preview. Phase 3 wires the live Google Business Profile reviews feed.

- **§6 Before & After now ships two real lip-filler pairs** (commit `d742d20`) — mirrored from the existing public display on `ssmlaseradvantage.com/wp-content/uploads/2024/04/{1-4,2,3,4}.png`. Interactive drag-comparison slider (zero-dep React island, client:visible). Phase 3 still needs the full consented B&A library from Jennifer to open the gallery wider — the "View all results →" link stubs to `#phase3-ba`.

## Deploy command

**Do not run this; you asked to run it yourself.** From the project root:

```bash
cd demo
npm run build
npx wrangler pages deploy dist \
  --project-name lamedspa \
  --branch main \
  --commit-dirty=true
```

Notes:
- `wrangler.toml` at `demo/wrangler.toml` already has `pages_build_output_dir = "./dist"`. If you prefer the config-driven deploy: `cd demo && npm run build && npx wrangler pages deploy`.
- First-time Pages deploy may prompt to create the project if `lamedspa` doesn't exist in your Cloudflare account. The flag `--project-name lamedspa` will create it.
- The generated `dist/server/wrangler.json` has an `ASSETS` binding warning — that's a vestige from an earlier adapter-based build. With `output: 'static'` the worker side is unused; Pages will serve `dist/` as static files directly. Safe to ignore.
- Your account needs Cloudflare Pages + Workers; both are free tier.

## Top 3 things I'd spend another hour on

1. **Real Karma Italic for the pull-quote moment.** Currently Testimonials placeholders use synthesized italic from `@fontsource/karma/400.css` (regular weight). Chrome synthesizes via `font-style: italic` at 32px-ish display sizes decently, but a real Karma Italic WOFF2 from Google Fonts would make the testimonials read authored rather than rendered. Swap is a single `@font-face` declaration in `global.css` + a woff2 file in `public/fonts/`.

2. **Critical-CSS inlining.** The 36 KB CSS file is render-blocking on mobile — inlining just the above-the-fold rules (nav + hero + first-paragraph typography) into `<head>` would shave another ~100–200ms off LCP. Astro has no built-in critical-CSS extraction, so this is a Vite plugin pull (`vite-plugin-critical` or manual extraction via puppeteer). Worth it if you want LCP closer to 1.5s.

3. **Nav-over-hero layering (the Phase 3 refinement).** The current demo has the hero visually separate from the nav — `transparent-over-cream → solid-over-cream` instead of the intended `transparent-over-photo → solid-over-cream`. The clean fix is wrapping `<main>` in `display: flow-root`, then giving `<section class="...hero...">` a `margin-top: -72px; padding-top: 72px;`. I tried the negative-margin trick in §0 but hit a margin-collapse bug (28px body offset); the `flow-root` wrapper stops the collapse. I logged it in `notes/phase3-refinements.md` — 15 min of work if you want me to actually land it before Jennifer sees the demo.
