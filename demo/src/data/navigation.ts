export const CATEGORIES = [
  { key: 'face',     label: 'Face' },
  { key: 'body',     label: 'Body' },
  { key: 'hair',     label: 'Hair' },
  { key: 'medical',  label: 'Medical' },
  { key: 'wellness', label: 'Wellness' },
  { key: 'skincare', label: 'Skin Care' },
] as const;

export type CategoryKey = typeof CATEGORIES[number]['key'];

export interface NavTreatment { name: string; meta: string; href: string; }

export const treatmentsByCategory: Record<CategoryKey, NavTreatment[]> = {
  face: [
    { name: 'Botox', meta: 'Neuromodulator · 30 min', href: '#' },
    { name: 'Dermal Fillers', meta: 'Volume & contour · 45 min', href: '#' },
    { name: 'Hydrafacial', meta: 'Hydration · 60 min', href: '#' },
    { name: 'Bela MD', meta: 'Medical facial · 75 min', href: '#' },
    { name: 'Microneedling', meta: 'Collagen induction · 60 min', href: '#' },
    { name: 'Chemical Peel', meta: 'Resurfacing · 45 min', href: '#' },
    { name: 'IPL Photofacial', meta: 'Pigmentation · 45 min', href: '#' },
    { name: 'Clear + Brilliant', meta: 'Laser resurfacing · 45 min', href: '#' },
    { name: 'Fotona Tightening', meta: 'Skin tightening · 60 min', href: '#' },
  ],
  body: [
    { name: 'CoolSculpting', meta: 'Fat reduction · 60 min', href: '#' },
    { name: 'TightSculpting', meta: 'Skin tightening · 60 min', href: '#' },
    { name: 'TightWave', meta: 'Non-invasive lift · 60 min', href: '#' },
    { name: 'Laser Hair Removal', meta: 'Permanent reduction · 30 min', href: '#' },
    { name: 'Votiva', meta: 'Feminine wellness · 45 min', href: '#' },
    { name: 'Tattoo Removal', meta: 'PicoSure laser · 20 min', href: '#' },
    { name: 'Sclerotherapy', meta: 'Vein treatment · 45 min', href: '#' },
    { name: 'Pink Intimate', meta: 'Lightening · 30 min', href: '#' },
    { name: 'IV Therapy', meta: 'Vitamin drip · 45 min', href: '#' },
  ],
  hair: [
    { name: 'PRP Hair Restoration', meta: 'Platelet-rich plasma · 60 min', href: '#' },
    { name: 'Keravive', meta: 'Scalp hydrafacial · 60 min', href: '#' },
    { name: 'HAIRestart', meta: 'Laser therapy · 45 min', href: '#' },
    { name: 'Mesotherapy', meta: 'Nutrient injections · 45 min', href: '#' },
  ],
  medical: [
    { name: 'Hormone Therapy · Women', meta: 'Consultation led · 60 min', href: '#' },
    { name: 'Hormone Therapy · Men', meta: 'Consultation led · 60 min', href: '#' },
    { name: 'Botox for Migraines', meta: 'Neurological · 30 min', href: '#' },
    { name: 'Botox for Hyperhidrosis', meta: 'Sweat reduction · 30 min', href: '#' },
    { name: 'Botox for TMJ', meta: 'Jaw tension · 30 min', href: '#' },
    { name: 'NightLase', meta: 'Snoring treatment · 30 min', href: '#' },
  ],
  wellness: [
    { name: 'IV Therapy', meta: 'Hydration & vitamins · 45 min', href: '#' },
    { name: 'Vitamin Injections', meta: 'B12, Glutathione · 15 min', href: '#' },
    { name: 'Hormone Therapy', meta: 'Consultation led · 60 min', href: '#' },
    { name: 'NightLase', meta: 'Sleep & snoring · 30 min', href: '#' },
  ],
  skincare: [
    { name: 'Bela MD Medical Facial', meta: 'Full regimen · 75 min', href: '#' },
    { name: 'Skin Booster', meta: 'Hydration · 45 min', href: '#' },
    { name: 'Chemical Peel', meta: 'Resurfacing · 45 min', href: '#' },
    { name: 'SmoothEye', meta: 'Eye rejuvenation · 30 min', href: '#' },
    { name: 'Medical-Grade Products', meta: 'In-clinic consultation', href: '#' },
  ],
};

export const CATEGORY_LABEL: Record<CategoryKey, string> = CATEGORIES.reduce(
  (acc, c) => ({ ...acc, [c.key]: c.label }),
  {} as Record<CategoryKey, string>,
);
