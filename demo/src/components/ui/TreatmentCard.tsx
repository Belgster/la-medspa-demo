import * as React from 'react';

/**
 * TreatmentCard — tag-based, multi-category.
 * Category tags are monochrome (beige/brown) — information preserved, color-coding removed.
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

const TAG_CLASS = 'bg-beige text-brown';

export interface TreatmentCardProps {
  name: string;
  /** Tag pills under the image. First entry is treated as primary for data purposes only. */
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

  return (
    <Tag
      href={href}
      className={
        'group relative flex flex-col bg-cream border border-hairline rounded-card overflow-hidden ' +
        'no-underline transition-all duration-la-base ease-la-ease ' +
        'hover:border-[#D4C8B8] hover:shadow-md'
      }
    >
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
                TAG_CLASS
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
              <div className="font-display font-medium text-[17px] text-gold">{price}</div>
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
