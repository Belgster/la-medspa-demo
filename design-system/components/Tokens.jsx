// LA MedSpa — foundational tokens exposed as a window-level object
// Tweakable at runtime via postMessage __edit_mode_set_keys

window.LA_TOKENS = window.LA_TOKENS || {
  // ——— Palette (baseline, in-market) ———
  cream:       '#FEFDF7',   // page bg — never pure white
  gold:        '#F1AC32',   // primary CTA
  goldHover:   '#D9962A',
  goldWash:    '#FFF0D4',
  peach:       '#FFBC7D',
  brown:       '#2B211B',   // H2–H6
  ink:         '#16110E',   // deepest contrast
  beige:       '#F1EDE9',   // card surface
  charcoal:    '#464646',   // body
  charcoalSoft:'#6B6461',
  hairline:    '#E8E1D8',   // warm divider
  focus:       '#C98A1C',   // warm focus ring

  // ——— Treatment-category IA (editorial: distinct warm hues, matched lightness) ———
  // Each has: ink (label text), tone (pill bg), line (2px rail on cards)
  categories: {
    face:      { label: 'Face',      ink: '#7A3A2A', tone: '#F4E0D4', line: '#C9765A' }, // terracotta
    body:      { label: 'Body',      ink: '#4A5A3C', tone: '#E3E8D8', line: '#8AA06C' }, // sage
    hair:      { label: 'Hair',      ink: '#6B4426', tone: '#EEE0CE', line: '#B88250' }, // clay
    medical:   { label: 'Medical',   ink: '#4A1F1C', tone: '#E8D4CE', line: '#8A3A30' }, // oxblood — warm authority
    wellness:  { label: 'Wellness',  ink: '#7A4458', tone: '#F1DEE3', line: '#B8798E' }, // dusty rose
    skincare:  { label: 'Skin Care', ink: '#5C5A2A', tone: '#E9E6CC', line: '#99955A' }, // olive
  },

  // ——— Type ———
  fontDisplay: "'Figtree', system-ui, sans-serif",
  fontBody:    "'Montserrat', system-ui, sans-serif",
  fontSerif:   "'Karma', Georgia, serif",

  // ——— Radii ———
  radiusCard: '10px',
  radiusPill: '999px',

  // ——— Shadow (warm undertone, restrained) ———
  shadowSm: '0 1px 2px rgba(43, 33, 27, 0.04), 0 2px 8px rgba(43, 33, 27, 0.04)',
  shadowMd: '0 2px 6px rgba(43, 33, 27, 0.05), 0 10px 32px rgba(43, 33, 27, 0.06)',

  // ——— Motion ———
  ease: 'cubic-bezier(0.22, 1, 0.36, 1)',    // ease-out, restrained
  durBase: '400ms',
  durSlow: '600ms',
};
