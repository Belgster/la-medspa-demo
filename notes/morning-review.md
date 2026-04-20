# Morning review — autonomous §4 through §9

Autonomous pass executed 2026-04-20, starting from commit `277290f` (§3 approved).
All 11 brief sections are landed. Lighthouse mobile targets met. Deploy-ready,
not deployed.

## Commits

```
35c2df6  §9: a11y contrast + LCP under 2s
300f9af  §9: mobile responsive fixes on Concern Finder
60a7cdf  §8: Financing + Instagram split
2dd6acb  §7: Testimonials placeholder + Team preview
956f9b7  §6: Before & After placeholder — "Real client results, coming Phase 3"
3a6fe41  §5: a11y — drop opacity-50 on inactive step buttons
31bf340  §5: Concern Finder — wire shipped TSX as client:visible React island
34635e6  §4: Hormone Therapy spotlight — BHRT, prescriber-led, Medical-accented
277290f  §3: six service categories grid — tone/line/ink system live   ← your last approval
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

## Mobile Lighthouse — production build, `npm run preview`

```
Performance    : 99    (target 95+ ✓)
Accessibility  : 100
Best Practices : 100
SEO            : 100

LCP            : 1.9s  (1955 ms — target < 2.0s ✓)
CLS            : 0     (target < 0.05 ✓)
TBT            : 0 ms  (proxy for INP < 150ms ✓)
FCP            : 1.4s
Speed Index    : 1.4s
TTI            : 2.0s
```

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

## PAUSE items

None. Every section landed without a blocker that required skipping.

Two soft flags worth seeing:

- **§7 testimonials are placeholder cards + "Coming Phase 3" cartouche.** The live site publishes no reviews on `/`, `/about-us/`, `/specials/`, or `/testimonials/` (404). Per the hard-limit "no testimonials you can't source," the demo ships a layout preview. Phase 3 wires the live Google Business Profile reviews feed.

- **§6 Before & After is a styled placeholder with the same cartouche treatment.** The asset manifest flags "no before/after imagery." Phase 3 requires a consented B&A library from Jennifer before the component can take real content.

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
