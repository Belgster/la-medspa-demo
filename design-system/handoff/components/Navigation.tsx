import * as React from 'react';
import { Button } from './Button';

/**
 * Navigation — flat, 2-level max.
 * Desktop: top bar + single flat flyout (no sub-sub categories).
 * Mobile: root → category → treatment. Two taps max.
 * Discovery by concern lives in the Finder, NOT the menu.
 */

export const CATEGORIES = [
  { key: 'face',     label: 'Face' },
  { key: 'body',     label: 'Body' },
  { key: 'hair',     label: 'Hair' },
  { key: 'medical',  label: 'Medical' },
  { key: 'wellness', label: 'Wellness' },
  { key: 'skincare', label: 'Skin Care' },
] as const;

type CategoryKey = typeof CATEGORIES[number]['key'];

interface Treatment { name: string; meta: string; href: string; }

interface DesktopNavProps {
  treatmentsByCategory: Record<CategoryKey, Treatment[]>;
}

export const DesktopNav: React.FC<DesktopNavProps> = ({ treatmentsByCategory }) => {
  const [open, setOpen] = React.useState<CategoryKey | null>(null);

  return (
    <header
      className="bg-cream border-b border-hairline"
      onMouseLeave={() => setOpen(null)}
    >
      <div className="flex items-center justify-between px-card py-[20px]">
        <a href="/" className="font-display font-medium text-[20px] tracking-[0.24em] uppercase text-ink">
          LA Medspa
        </a>
        <nav className="flex gap-[36px]">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              onMouseEnter={() => setOpen(c.key)}
              onFocus={() => setOpen(c.key)}
              className={
                'font-display font-medium text-[12px] uppercase tracking-[0.14em] py-[6px] ' +
                'bg-transparent border-none cursor-pointer transition-all duration-la-base ease-la-ease ' +
                (open === c.key
                  ? 'text-ink border-b border-gold'
                  : 'text-brown border-b border-transparent')
              }
            >
              {c.label}
            </button>
          ))}
        </nav>
        <Button variant="primary">Book Consultation</Button>
      </div>

      {open && (
        <div
          key={open}
          className="animate-la-fade-rise grid grid-cols-[220px_1fr] gap-stack px-card py-card"
        >
          <div>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-charcoal-soft mb-[14px]">
              Category
            </div>
            <div className="font-display font-medium text-[32px] uppercase leading-[1.05] text-ink mb-[12px]">
              {CATEGORIES.find((c) => c.key === open)?.label}
            </div>
            <Button variant="secondary" size="sm">
              See all {CATEGORIES.find((c) => c.key === open)?.label.toLowerCase()} →
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-[4px]">
            {(treatmentsByCategory[open] ?? []).map((t) => (
              <a
                key={t.name}
                href={t.href}
                className={
                  'block px-[18px] py-[14px] rounded-[8px] no-underline ' +
                  'transition-colors duration-la-base ease-la-ease hover:bg-gold-wash'
                }
              >
                <div className="font-display font-medium text-[14px] uppercase text-brown mb-[4px]">
                  {t.name}
                </div>
                <div className="font-body font-light text-[12px] text-charcoal-soft">
                  {t.meta}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

interface MobileNavProps {
  treatmentsByCategory: Record<CategoryKey, Treatment[]>;
}

export const MobileNav: React.FC<MobileNavProps> = ({ treatmentsByCategory }) => {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<CategoryKey | null>(null);

  return (
    <header className="bg-cream border-b border-hairline">
      <div className="flex items-center justify-between px-[20px] py-[16px]">
        <a href="/" className="font-display font-medium text-[15px] tracking-[0.2em] uppercase text-ink">
          LA Medspa
        </a>
        <button
          onClick={() => { setOpen(!open); setActive(null); }}
          className="font-display font-medium text-[11px] uppercase tracking-[0.14em] text-brown bg-transparent border-none px-[12px] py-[8px]"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>
      {open && !active && (
        <div className="animate-la-fade-rise py-[12px]">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => setActive(c.key)}
              className={
                'w-full text-left px-[24px] py-[18px] bg-transparent border-none ' +
                'border-b border-beige font-display font-medium text-[16px] ' +
                'uppercase tracking-[0.1em] text-brown flex justify-between items-center'
              }
            >
              {c.label}
              <span className="text-[#B8A898]">→</span>
            </button>
          ))}
          <div className="px-[24px] py-[18px]">
            <Button variant="primary" className="w-full justify-center">Book Consultation</Button>
          </div>
        </div>
      )}
      {open && active && (
        <div className="animate-la-fade-rise py-[12px]">
          <button
            onClick={() => setActive(null)}
            className="w-full text-left px-[24px] py-[14px] font-display text-[11px] uppercase tracking-[0.14em] text-charcoal-soft bg-transparent border-none"
          >
            ← All Categories
          </button>
          {(treatmentsByCategory[active] ?? []).map((t) => (
            <a key={t.name} href={t.href} className="block px-[24px] py-[16px] border-b border-beige no-underline">
              <div className="font-display font-medium text-[15px] uppercase text-brown">{t.name}</div>
              <div className="font-body font-light text-[12px] text-charcoal-soft mt-[2px]">{t.meta}</div>
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
