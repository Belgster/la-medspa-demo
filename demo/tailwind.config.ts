import type { Config } from 'tailwindcss';

/**
 * LA Medspa — Tailwind design tokens
 * Paired with handoff/design-system.md and handoff/components/*.
 *
 * DO NOT RENAME the category triplet keys (tone/line/ink) or the warm
 * neutral scale — category-aware components consume them by name.
 */
const config: Config = {
  content: ['./src/**/*.{astro,ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // ——— Brand ———
        cream:         '#FEFDF7',
        gold:          '#F1AC32',
        'gold-hover':  '#D9962A',
        'gold-wash':   '#FFF0D4',
        peach:         '#FFBC7D',
        brown:         '#2B211B',
        ink:           '#16110E',
        beige:         '#F1EDE9',
        charcoal:      '#464646',
        'charcoal-soft': '#6B6461',
        hairline:      '#E8E1D8',
        focus:         '#C98A1C',

        // ——— Treatment-category IA (editorial, warm) ———
        // Tone/Line/Ink triplet — API contract for category-aware components.
        category: {
          face:     { tone: '#F4E0D4', line: '#C9765A', ink: '#7A3A2A' }, // terracotta
          body:     { tone: '#E3E8D8', line: '#8AA06C', ink: '#4A5A3C' }, // sage
          hair:     { tone: '#EEE0CE', line: '#B88250', ink: '#6B4426' }, // clay
          medical:  { tone: '#E8D4CE', line: '#8A3A30', ink: '#4A1F1C' }, // oxblood — warm authority
          wellness: { tone: '#F1DEE3', line: '#B8798E', ink: '#7A4458' }, // dusty rose
          skincare: { tone: '#E9E6CC', line: '#99955A', ink: '#5C5A2A' }, // olive
        },

        // ——— Semantic ———
        success: '#6E8A5E',
        info:    '#6F7E8A',
        warning: '#C28A3A',
        error:   '#A8553A',
      },

      fontFamily: {
        display: ['Figtree', 'system-ui', 'sans-serif'],
        body:    ['Montserrat', 'system-ui', 'sans-serif'],
        serif:   ['Karma', 'Georgia', 'serif'],
        mono:    ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },

      fontSize: {
        // [size, { lineHeight, letterSpacing }]
        display: ['72px', { lineHeight: '1.05', letterSpacing: '-0.015em' }],
        h1:      ['56px', { lineHeight: '1.08', letterSpacing: '-0.01em' }],
        h2:      ['40px', { lineHeight: '1.10', letterSpacing: '-0.01em' }],
        h3:      ['28px', { lineHeight: '1.15' }],
        h4:      ['20px', { lineHeight: '1.25' }],
        'body-l':['18px', { lineHeight: '1.7' }],
        body:    ['15px', { lineHeight: '1.75' }],
        caption: ['11px', { lineHeight: '1.4', letterSpacing: '0.14em' }],
        editorial: ['32px', { lineHeight: '1.35' }],
      },

      // 4 · 8 · 16 · 24 · 32 · 48 · 80 · 96 · 128
      spacing: {
        'micro':     '4px',
        'tight':     '8px',
        'base':      '16px',
        'comfort':   '24px',
        'card':      '32px',
        'stack':     '48px',
        'section-s': '80px',
        'section-m': '96px',
        'section-l': '128px',
      },

      borderRadius: {
        none: '0',
        card: '10px',
        pill: '9999px',
      },

      boxShadow: {
        sm: '0 1px 2px rgba(43, 33, 27, 0.04), 0 2px 8px rgba(43, 33, 27, 0.04)',
        md: '0 2px 6px rgba(43, 33, 27, 0.05), 0 10px 32px rgba(43, 33, 27, 0.06)',
        // Warm focus ring — use instead of default outline.
        focus: '0 0 0 3px rgba(201, 138, 28, 0.35)',
      },

      transitionTimingFunction: {
        'la-ease': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },

      transitionDuration: {
        'la-base': '400ms',
        'la-slow': '600ms',
      },

      keyframes: {
        'la-fade-rise': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'la-fade-rise': 'la-fade-rise 400ms cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};

export default config;
