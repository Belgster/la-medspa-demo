import { useState } from 'react';

export interface TeamMember {
  name: string;
  role: string;
  specialty: string;
  bio: string;
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
}

interface Props {
  team: TeamMember[];
}

export function TeamGrid({ team }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      {/* Mobile: 2-col compact + tap-to-expand. One open at a time. */}
      <div className="grid grid-cols-2 gap-[12px] md:hidden">
        {team.map((p, i) => {
          const open = openIndex === i;
          return (
            <article
              key={p.name}
              className="bg-cream border border-hairline rounded-card overflow-hidden flex flex-col"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : i)}
                aria-expanded={open}
                className="w-full p-[14px] flex flex-col items-center text-center bg-transparent border-0 cursor-pointer"
              >
                <div className="w-[96px] h-[96px] rounded-pill overflow-hidden border border-gold/30 mb-[12px]">
                  <img
                    src={p.imageSrc}
                    width={p.imageWidth}
                    height={p.imageHeight}
                    alt={`${p.name} — ${p.role}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-[center_20%]"
                  />
                </div>
                <div className="font-display font-medium uppercase text-ink text-[13px] leading-[1.2]">
                  {p.name}
                </div>
                <div className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-charcoal-soft mt-[5px]">
                  {p.role}
                </div>
                <div className="font-body font-light text-[12px] leading-[1.5] text-charcoal mt-[8px]">
                  {p.specialty}
                </div>
                <div className="mt-[10px] flex items-center gap-[6px] font-display font-medium text-[10px] uppercase tracking-[0.14em] text-gold">
                  <span>{open ? 'Less' : 'Read more'}</span>
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-la-base ease-la-ease"
                    style={{ transform: open ? 'rotate(180deg)' : 'none' }}
                  >
                    ↓
                  </span>
                </div>
              </button>
              {open && (
                <div className="px-[14px] pb-[16px] -mt-[2px]">
                  <p className="font-body font-light text-[12.5px] leading-[1.6] text-charcoal text-left">
                    {p.bio}
                  </p>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* Desktop: 3-col full bios — unchanged from prior layout. */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-stack">
        {team.map((p) => (
          <article
            key={p.name}
            className="bg-cream border border-hairline rounded-card p-card flex flex-col items-start gap-card"
          >
            <div className="w-[140px] h-[140px] rounded-pill overflow-hidden border border-gold/30 flex-shrink-0">
              <img
                src={p.imageSrc}
                width={p.imageWidth}
                height={p.imageHeight}
                alt={`${p.name} — ${p.role}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-[center_20%]"
              />
            </div>
            <div className="flex-1">
              <div className="font-display font-medium uppercase text-ink text-[18px] leading-[1.2]">
                {p.name}
              </div>
              <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-charcoal-soft mt-[6px] mb-comfort">
                {p.role}
              </div>
              <p className="font-body font-light text-[14px] leading-[1.65] text-charcoal">
                {p.bio}
              </p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
