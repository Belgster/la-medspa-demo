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

/**
 * MobileNav — split into Provider / Header / Drawer so the drawer can render
 * as a sibling of <header> (not a descendant). That matters because a fixed-
 * positioned drawer rendered inside the sticky header can collapse to near-
 * zero height on some browsers (iOS Safari in particular treats sticky as a
 * containing block for fixed descendants). Splitting also gives us one React
 * root that spans header + drawer, with shared state via context.
 *
 * Consumers should import the composed `MobileNav` wrapper — Nesting Provider
 * + Header + Drawer inline in an .astro template creates three separate
 * hydration islands and context won't flow. The wrapper composes them in
 * React so they share one tree.
 */

interface MobileNavCtx {
  open: boolean;
  active: CategoryKey | null;
  setOpen: (v: boolean) => void;
  setActive: (v: CategoryKey | null) => void;
  treatmentsByCategory: Record<CategoryKey, Treatment[]>;
  bookHref: string;
  shopHref: string;
}

const MobileNavContext = React.createContext<MobileNavCtx | null>(null);

const useMobileNav = (): MobileNavCtx => {
  const ctx = React.useContext(MobileNavContext);
  if (!ctx) throw new Error('MobileNav components must be used inside <MobileNavProvider>');
  return ctx;
};

interface MobileNavProviderProps {
  treatmentsByCategory: Record<CategoryKey, Treatment[]>;
  bookHref: string;
  /** Outbound Shopify URL — rendered as a drawer link with an ↗ glyph. */
  shopHref: string;
  children: React.ReactNode;
}

export const MobileNavProvider: React.FC<MobileNavProviderProps> = ({
  treatmentsByCategory, bookHref, shopHref, children,
}) => {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<CategoryKey | null>(null);
  const value: MobileNavCtx = {
    open, active, setOpen, setActive,
    treatmentsByCategory, bookHref, shopHref,
  };
  return (
    <MobileNavContext.Provider value={value}>
      {children}
    </MobileNavContext.Provider>
  );
};

export const MobileNavHeader: React.FC = () => {
  const { open, setOpen, setActive } = useMobileNav();
  return (
    <header className="la-nav sticky top-0 z-40">
      <div className="flex items-center justify-between px-[20px] py-[16px]">
        <a href="/" className="la-nav-logo font-display font-medium text-[15px] tracking-[0.2em] uppercase">
          LA Medspa
        </a>
        <button
          onClick={() => { setOpen(!open); setActive(null); }}
          className="la-nav-item font-display font-medium text-[11px] uppercase tracking-[0.14em] bg-transparent border-none px-[12px] py-[8px]"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>
    </header>
  );
};

export const MobileNavDrawer: React.FC = () => {
  const {
    open, active, setOpen, setActive,
    treatmentsByCategory, bookHref, shopHref,
  } = useMobileNav();

  if (!open) return null;

  const drawerCx = 'fixed inset-x-0 top-[64px] bottom-0 bg-cream z-50 overflow-y-auto animate-la-fade-rise';
  const rowCx = (
    'w-full text-left px-[24px] py-[18px] border-b border-beige ' +
    'font-display font-medium text-[16px] uppercase tracking-[0.1em] text-brown ' +
    'flex justify-between items-center no-underline'
  );
  const close = () => setOpen(false);
  const closeAndClear = () => { setOpen(false); setActive(null); };

  if (!active) {
    return (
      <div className={drawerCx}>
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => setActive(c.key)}
            className={rowCx + ' bg-transparent border-none border-b border-beige'}
          >
            {c.label}
            <span className="text-[#B8A898]">→</span>
          </button>
        ))}
        {/* Specials — in-page anchor to FeaturedSpecial section */}
        <a href="#specials" onClick={close} className={rowCx}>
          <span>Specials</span>
          <span aria-hidden="true" className="text-[#B8A898]">→</span>
        </a>
        {/* Before & After — outbound until Phase 3 brings it in-house */}
        <a
          href="https://ssmlaseradvantage.com/before-after/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={close}
          className={rowCx}
        >
          <span>Before &amp; After</span>
          <span aria-hidden="true" className="text-[#B8A898]">↗</span>
        </a>
        {/* Shopify — outbound */}
        <a
          href={shopHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={close}
          className={rowCx}
        >
          <span>Shop</span>
          <span aria-hidden="true" className="text-[#B8A898]">↗</span>
        </a>
        <div className="px-[24px] py-[18px]">
          <Button
            variant="primary"
            className="w-full justify-center"
            onClick={() => window.open(bookHref, '_blank', 'noopener,noreferrer')}
          >
            Book Consultation
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={drawerCx}>
      <button
        onClick={() => setActive(null)}
        className="w-full text-left px-[24px] py-[14px] font-display text-[11px] uppercase tracking-[0.14em] text-charcoal-soft bg-transparent border-none"
      >
        ← All Categories
      </button>
      {(treatmentsByCategory[active] ?? []).map((t) => (
        <a
          key={t.name}
          href={t.href}
          onClick={closeAndClear}
          className="block px-[24px] py-[16px] border-b border-beige no-underline"
        >
          <div className="font-display font-medium text-[15px] uppercase text-brown">{t.name}</div>
          <div className="font-body font-light text-[12px] text-charcoal-soft mt-[2px]">{t.meta}</div>
        </a>
      ))}
    </div>
  );
};

/**
 * Composed wrapper — the island Nav.astro actually renders. Keeps Provider,
 * Header, and Drawer in one React root so context flows. If a consumer needs
 * to render Header and Drawer in different places, they can compose the
 * primitives manually — but both pieces must still live inside one island.
 */
type MobileNavProps = Omit<MobileNavProviderProps, 'children'>;

export const MobileNav: React.FC<MobileNavProps> = (props) => (
  <MobileNavProvider {...props}>
    <MobileNavHeader />
    <MobileNavDrawer />
  </MobileNavProvider>
);
