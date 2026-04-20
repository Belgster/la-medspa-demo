import * as React from 'react';

/**
 * TreatmentCard — tag-based, multi-category.
 * A 3px top rail picks up the PRIMARY category; tag pills below declare all.
 * Bela MD wears both Face and Skin Care without being duplicated in the IA.
 */

export type CategoryKey = 'face' | 'body' | 'hair' | 'medical' | 'wellness' | 'skincare';

export const CATEGORY_LABEL: Record<CategoryKey, string> = {
  face: 'Face',
  body: 'Body',
  hair: 'Hair',
  medical: 'Medical',
  wellness: 'Wellness',
  skincare: 'Skin Care',
};

// Tailwind can't resolve nested palette keys to arbitrary bg-/text-/border-
// without safelisting — use a static lookup for the three emitted utilities.
const CAT_CLASSES: Record<CategoryKey, { tag: string; rail: string }> = {
  face:     { tag: 'bg-category-face-tone text-category-face-ink',       rail: 'bg-category-face-line' },
  body:     { tag: 'bg-category-body-tone text-category-body-ink',       rail: 'bg-category-body-line' },
  hair:     { tag: 'bg-category-hair-tone text-category-hair-ink',       rail: 'bg-category-hair-line' },
  medical:  { tag: 'bg-category-medical-tone text-category-medical-ink', rail: 'bg-category-medical-line' },
  wellness: { tag: 'bg-category-wellness-tone text-category-wellness-ink', rail: 'bg-category-wellness-line' },
  skincare: { tag: 'bg-category-skincare-tone text-category-skincare-ink', rail: 'bg-category-skincare-line' },
};

export interface TreatmentCardProps {
  name: string;
  /** Primary category — drives the top rail color. First entry in `categories`. */
  categories: CategoryKey[];
  /** Optional. Omit to hide the "From" column — duration stays, right-aligned. */
  price?: string;
  duration: string;
  concerns: string[];
  image?: { src: string; alt: string };
  href?: string;
}

export const TreatmentCard: React.FC<TreatmentCardProps> = ({
  name, categories, price, duration, concerns, image, href,
}) => {
  const Tag = href ? 'a' : 'div';
  const primary = categories[0];

  return (
    <Tag
      href={href}
      className={
        'group relative flex flex-col bg-cream border border-hairline rounded-card overflow-hidden ' +
        'no-underline transition-all duration-la-base ease-la-ease ' +
        'hover:border-[#D4C8B8] hover:shadow-md'
      }
    >
      <span aria-hidden className={`absolute top-0 inset-x-0 h-[3px] z-10 ${CAT_CLASSES[primary].rail}`} />
      {image && (
        <img src={image.src} alt={image.alt} className="w-full aspect-[4/5] object-cover" />
      )}
      <div className="flex flex-col gap-[14px] flex-1 p-[24px]">
        <div className="flex gap-[6px] flex-wrap">
          {categories.map((ck) => (
            <span
              key={ck}
              className={
                'font-display font-medium text-[10px] uppercase tracking-[0.12em] ' +
                'px-[10px] py-[4px] rounded-pill ' +
                CAT_CLASSES[ck].tag
              }
            >
              {CATEGORY_LABEL[ck]}
            </span>
          ))}
        </div>
        <div>
          <div className="font-display font-medium text-[20px] uppercase leading-[1.15] text-brown mb-[6px]">
            {name}
          </div>
          <div className="font-body font-light text-[13px] leading-[1.55] text-charcoal-soft">
            Addresses {concerns.slice(0, 3).join(' · ')}.
          </div>
        </div>
        <div className="flex justify-between items-baseline gap-[16px] pt-[14px] mt-auto border-t border-beige">
          {price && (
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-charcoal-soft mb-[2px]">From</div>
              <div className="font-display font-medium text-[17px] text-ink">{price}</div>
            </div>
          )}
          <div className={price ? 'text-right' : 'text-right ml-auto'}>
            <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-charcoal-soft mb-[2px]">Duration</div>
            <div className="font-body font-light text-[14px] text-brown">{duration}</div>
          </div>
        </div>
      </div>
    </Tag>
  );
};
