import type { Concern, Area, FinderTreatment } from '../components/ui/ConcernFinder';
export type { Concern, Area, FinderTreatment };

/*
 * Concern values double as their display labels — the shipped TreatmentCard
 * joins them into "Addresses concern1 · concern2" on the result card, so we
 * want display-ready strings throughout, not machine ids.
 */
export const concerns: Concern[] = [
  { v: 'Fine Lines & Wrinkles', label: 'Lines & Wrinkles',      meta: "Crow's feet, 11s, forehead" },
  { v: 'Acne & Blemishes',      label: 'Acne & Blemishes',      meta: 'Breakouts, scarring, hormonal' },
  { v: 'Pigmentation',          label: 'Pigmentation',          meta: 'Sun damage, melasma, spots' },
  { v: 'Skin Texture',          label: 'Skin Texture',          meta: 'Pores, roughness, dullness' },
  { v: 'Volume Loss',           label: 'Volume Loss',           meta: 'Cheeks, temples, lips' },
  { v: 'Body Contouring',       label: 'Body Contouring',       meta: 'Stubborn fat, tone, laxity' },
  { v: 'Unwanted Hair',         label: 'Unwanted Hair',         meta: 'Face, body, underarms' },
  { v: 'Hair Thinning',         label: 'Hair Thinning',         meta: 'Density, shedding, scalp' },
  { v: 'Hormonal Changes',      label: 'Hormonal Changes',      meta: 'Energy, sleep, libido' },
];

export const areas: Area[] = [
  { v: 'face',             label: 'Face',              meta: 'Forehead, cheeks, jawline' },
  { v: 'eye-area',         label: 'Eye Area',          meta: 'Crow\'s feet, under-eye, lids' },
  { v: 'lips',             label: 'Lips',              meta: 'Lip line, hydration, volume' },
  { v: 'neck-decolletage', label: 'Neck & Décolleté',  meta: 'Neck, chest, décolletage' },
  { v: 'body',             label: 'Body',              meta: 'Abdomen, flanks, thighs, arms' },
  { v: 'whole-body',       label: 'Whole-Body',        meta: 'Internal, systemic, hormonal' },
];

/*
 * Treatments drawn from demo/src/data/navigation.ts — each assigned its
 * primary category, concerns it actually addresses, and the areas it's
 * applied to. Mappings cross-reference the live site's /services/ taxonomy.
 */
export const treatments: FinderTreatment[] = [
  {
    name: 'Botox',
    cats: ['face', 'medical'],
    concerns: ['Fine Lines & Wrinkles'],
    areas: ['face', 'eye-area'],
    duration: '30 min',
    blurb: 'Neuromodulator. Softens expression lines without freezing expression.',
  },
  {
    name: 'Dermal Fillers',
    cats: ['face'],
    concerns: ['Volume Loss', 'Fine Lines & Wrinkles'],
    areas: ['face', 'lips'],
    duration: '45 min',
    blurb: 'Hyaluronic acid fillers. Restores volume where the face has hollowed.',
  },
  {
    name: 'Hydrafacial',
    cats: ['face'],
    concerns: ['Skin Texture', 'Pigmentation', 'Acne & Blemishes'],
    areas: ['face', 'neck-decolletage'],
    duration: '60 min',
    blurb: 'Hydrodermabrasion. Cleanses, extracts, and hydrates in one session.',
  },
  {
    name: 'Bela MD Medical Facial',
    cats: ['face', 'skincare'],
    concerns: ['Skin Texture', 'Acne & Blemishes', 'Pigmentation'],
    areas: ['face', 'neck-decolletage'],
    duration: '75 min',
    blurb: 'Multi-step medical facial with serums matched to your skin that day.',
  },
  {
    name: 'Microneedling',
    cats: ['face'],
    concerns: ['Fine Lines & Wrinkles', 'Skin Texture', 'Acne & Blemishes'],
    areas: ['face', 'neck-decolletage'],
    duration: '60 min',
    blurb: 'Collagen induction. Fine micro-channels prompt the skin to rebuild.',
  },
  {
    name: 'Clear + Brilliant',
    cats: ['face'],
    concerns: ['Pigmentation', 'Skin Texture'],
    areas: ['face'],
    duration: '45 min',
    blurb: 'Gentle laser resurfacing. Reads as "glow" the week after.',
  },
  {
    name: 'IPL Photofacial',
    cats: ['face'],
    concerns: ['Pigmentation'],
    areas: ['face', 'neck-decolletage'],
    duration: '45 min',
    blurb: 'Intense pulsed light. Lifts sun damage and redness at the surface.',
  },
  {
    name: 'Chemical Peel',
    cats: ['face', 'skincare'],
    concerns: ['Pigmentation', 'Skin Texture', 'Acne & Blemishes'],
    areas: ['face', 'neck-decolletage'],
    duration: '45 min',
    blurb: 'Graded resurfacing peels. Matched to downtime you can afford.',
  },
  {
    name: 'SmoothEye',
    cats: ['skincare'],
    concerns: ['Fine Lines & Wrinkles', 'Skin Texture'],
    areas: ['eye-area'],
    duration: '30 min',
    blurb: 'Fotona laser for the eye area. No needles, no downtime.',
  },
  {
    name: 'LipLase',
    cats: ['face'],
    concerns: ['Volume Loss'],
    areas: ['lips'],
    duration: '30 min',
    blurb: 'Laser lip plumping. A filler-free option for subtle enhancement.',
  },
  {
    name: 'CoolSculpting',
    cats: ['body'],
    concerns: ['Body Contouring'],
    areas: ['body'],
    duration: '60 min',
    blurb: 'Cryolipolysis. Freezes stubborn fat; body processes the rest over weeks.',
  },
  {
    name: 'TightSculpting',
    cats: ['body'],
    concerns: ['Body Contouring'],
    areas: ['body'],
    duration: '60 min',
    blurb: 'Dual-laser. Reduces fat and tightens skin in the same session.',
  },
  {
    name: 'TightWave',
    cats: ['body'],
    concerns: ['Body Contouring'],
    areas: ['body'],
    duration: '60 min',
    blurb: 'Non-invasive body contouring using focused radiofrequency.',
  },
  {
    name: 'Laser Hair Removal',
    cats: ['body'],
    concerns: ['Unwanted Hair'],
    areas: ['face', 'body'],
    duration: '30 min',
    blurb: 'Permanent reduction across the full body. Built for all skin tones.',
  },
  {
    name: 'PRP Hair Restoration',
    cats: ['hair'],
    concerns: ['Hair Thinning'],
    areas: ['whole-body'],
    duration: '60 min',
    blurb: 'Your own platelet-rich plasma injected at the scalp. Evidence-backed.',
  },
  {
    name: 'Keravive',
    cats: ['hair'],
    concerns: ['Hair Thinning'],
    areas: ['whole-body'],
    duration: '60 min',
    blurb: 'Scalp hydrafacial. Cleanses follicles and seeds a growth serum.',
  },
  {
    name: 'Hormone Therapy',
    cats: ['medical', 'wellness'],
    concerns: ['Hormonal Changes'],
    areas: ['whole-body'],
    duration: '60 min',
    blurb: 'Bioidentical hormone therapy. Prescriber-led, built from lab work.',
  },
  {
    name: 'IV Therapy',
    cats: ['wellness'],
    concerns: ['Hormonal Changes'],
    areas: ['whole-body'],
    duration: '45 min',
    blurb: 'Hydration, B-complex, glutathione. Delivered intravenously.',
  },
];
