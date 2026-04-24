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

type DrawerView = 'root' | 'services' | 'category';

interface MobileNavCtx {
  open: boolean;
  view: DrawerView;
  activeCategory: CategoryKey | null;
  setOpen: (v: boolean) => void;
  setView: (v: DrawerView) => void;
  setActiveCategory: (v: CategoryKey | null) => void;
  treatmentsByCategory: Record<CategoryKey, Treatment[]>;
  bookHref: string;
  shopHref: string;
  /** Current pathname, passed from Nav.astro — drives the drawer's active-row styling. */
  currentPath: string;
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
  /** Outbound Shopify URL — rendered as a secondary drawer link with an ↗ glyph. */
  shopHref: string;
  /** Current pathname from the parent Astro template — used to mark the active drawer row. */
  currentPath?: string;
  children: React.ReactNode;
}

export const MobileNavProvider: React.FC<MobileNavProviderProps> = ({
  treatmentsByCategory, bookHref, shopHref, currentPath = '', children,
}) => {
  const [open, setOpen] = React.useState(false);
  const [view, setView] = React.useState<DrawerView>('root');
  const [activeCategory, setActiveCategory] = React.useState<CategoryKey | null>(null);
  const value: MobileNavCtx = {
    open, view, activeCategory,
    setOpen, setView, setActiveCategory,
    treatmentsByCategory, bookHref, shopHref, currentPath,
  };
  return (
    <MobileNavContext.Provider value={value}>
      {children}
    </MobileNavContext.Provider>
  );
};

export const MobileNavHeader: React.FC = () => {
  const { open, setOpen, setView, setActiveCategory } = useMobileNav();
  return (
    <header className="la-nav sticky top-0 z-40">
      <div className="flex items-center justify-between px-[20px] py-[16px]">
        <a href="/" className="la-nav-logo font-display font-medium text-[15px] tracking-[0.2em] uppercase">
          LA Medspa
        </a>
        <button
          onClick={() => {
            if (open) {
              setOpen(false);
              setView('root');
              setActiveCategory(null);
            } else {
              setOpen(true);
            }
          }}
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
    open, view, activeCategory,
    setOpen, setView, setActiveCategory,
    treatmentsByCategory, bookHref, shopHref, currentPath,
  } = useMobileNav();

  if (!open) return null;

  const isAbout = currentPath === '/about' || currentPath === '/about/';

  const drawerCx = 'fixed inset-x-0 top-[64px] bottom-0 bg-cream z-50 overflow-y-auto animate-la-fade-rise';
  const rowCx = (
    'w-full text-left px-[24px] py-[18px] border-b border-beige ' +
    'font-display font-medium text-[16px] uppercase tracking-[0.1em] text-brown ' +
    'flex justify-between items-center no-underline'
  );
  const backCx = (
    'w-full text-left px-[24px] py-[14px] font-display text-[11px] uppercase tracking-[0.14em] ' +
    'text-charcoal-soft bg-transparent border-none'
  );
  const close = () => { setOpen(false); setView('root'); setActiveCategory(null); };

  // Level 3 — treatments for the selected category
  if (view === 'category' && activeCategory) {
    const cat = CATEGORIES.find((c) => c.key === activeCategory);
    return (
      <div className={drawerCx}>
        <button
          onClick={() => { setView('services'); setActiveCategory(null); }}
          className={backCx}
        >
          ← Services
        </button>
        <div className="px-[24px] py-[10px] font-display font-medium text-[13px] uppercase tracking-[0.14em] text-charcoal-soft">
          {cat?.label}
        </div>
        {(treatmentsByCategory[activeCategory] ?? []).map((t) => (
          <a
            key={t.name}
            href={t.href}
            onClick={close}
            className="block px-[24px] py-[16px] border-b border-beige no-underline"
          >
            <div className="font-display font-medium text-[15px] uppercase text-brown">{t.name}</div>
            <div className="font-body font-light text-[12px] text-charcoal-soft mt-[2px]">{t.meta}</div>
          </a>
        ))}
      </div>
    );
  }

  // Level 2 — the 6 categories under Services
  if (view === 'services') {
    return (
      <div className={drawerCx}>
        <button onClick={() => setView('root')} className={backCx}>
          ← Menu
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => { setActiveCategory(c.key); setView('category'); }}
            className={rowCx + ' bg-transparent border-l-0 border-r-0 border-t-0'}
          >
            {c.label}
            <span aria-hidden="true" className="text-[#B8A898]">→</span>
          </button>
        ))}
      </div>
    );
  }

  // Level 1 — root menu
  return (
    <div className={drawerCx}>
      {/* Services — drills into the 6 categories */}
      <button
        onClick={() => setView('services')}
        className={rowCx + ' bg-transparent border-l-0 border-r-0 border-t-0'}
      >
        <span>Services</span>
        <span aria-hidden="true" className="text-[#B8A898]">→</span>
      </button>
      {/* Before & After — outbound to WordPress until Phase 3 brings it in-house */}
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
      {/* Specials — in-page anchor */}
      <a href="#specials" onClick={close} className={rowCx}>
        <span>Specials</span>
        <span aria-hidden="true" className="text-[#B8A898]">→</span>
      </a>
      {/* About — /about route; active row swaps brown for gold when on /about */}
      <a
        href="/about"
        onClick={close}
        aria-current={isAbout ? 'page' : undefined}
        className={rowCx + (isAbout ? ' !text-gold' : '')}
      >
        <span>About</span>
        <span aria-hidden="true" className="text-[#B8A898]">→</span>
      </a>
      <div className="px-[24px] py-[18px] flex flex-col gap-[12px]">
        <Button
          variant="primary"
          className="w-full justify-center"
          onClick={() => window.open(bookHref, '_blank', 'noopener,noreferrer')}
        >
          Book Consultation
        </Button>
        <a
          href={shopHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={close}
          className="inline-flex items-center justify-center gap-[6px] font-display font-medium text-[12px] uppercase tracking-[0.14em] text-charcoal-soft no-underline py-[6px] hover:text-gold focus-visible:text-gold"
        >
          Shop <span aria-hidden="true">↗</span>
        </a>
      </div>
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
