// ——— 05 NAVIGATION ———
// Flat, 2-level-max. Top-level category → treatment. No deeper.

const NAV_CATEGORIES = [
  { key: 'face',     label: 'Face' },
  { key: 'body',     label: 'Body' },
  { key: 'hair',     label: 'Hair' },
  { key: 'medical',  label: 'Medical' },
  { key: 'wellness', label: 'Wellness' },
  { key: 'skincare', label: 'Skin Care' },
];

const FACE_TREATMENTS = [
  { name: 'Botox Cosmetic',     meta: 'Neuromodulator' },
  { name: 'Dermal Fillers',     meta: 'Restylane · Juvéderm' },
  { name: 'Bela MD',            meta: 'Medical facial' },
  { name: 'Microneedling',      meta: 'Skin rejuvenation' },
  { name: 'Chemical Peel',      meta: 'Resurfacing' },
  { name: 'Morpheus8',          meta: 'RF microneedling' },
];

const NavSection = () => {
  const [open, setOpen] = React.useState('face');
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mobileStep, setMobileStep] = React.useState('root'); // root | category

  return (
    <Section num="05" kicker="Components" title="Navigation" id="nav">
      <SpecLabel>Desktop · Top Bar + Single Flat Flyout</SpecLabel>
      <Rationale>
        Two levels, never three. Hovering a category opens a single flat flyout of its
        treatments — no sub-sub categories, no concern nesting. A Bela MD appears on the Bela MD
        treatment page; it does not re-appear under Acne and Wrinkles and Hydration. Discovery
        by concern belongs to the Finder — not to the menu.
      </Rationale>

      <div
        style={{
          border: '1px solid #E8E1D8',
          borderRadius: 10,
          background: '#FEFDF7',
          overflow: 'hidden',
          marginBottom: 20,
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 32px',
            borderBottom: '1px solid #F1EDE9',
          }}
        >
          <div
            className="la-display"
            style={{
              fontSize: 20,
              letterSpacing: '0.2em',
              color: '#16110E',
              fontWeight: 500,
            }}
          >
            LA MEDSPA
          </div>
          <nav style={{ display: 'flex', gap: 36 }}>
            {NAV_CATEGORIES.map((c) => (
              <button
                key={c.key}
                onMouseEnter={() => setOpen(c.key)}
                onFocus={() => setOpen(c.key)}
                style={{
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 500,
                  fontSize: 12,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: open === c.key ? '#16110E' : '#2B211B',
                  background: 'transparent',
                  border: 'none',
                  padding: '6px 0',
                  cursor: 'pointer',
                  borderBottom: open === c.key ? '1px solid #F1AC32' : '1px solid transparent',
                  transition: 'all 300ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                {c.label}
              </button>
            ))}
          </nav>
          <button style={baseBtn} className="la-btn-primary">Book Consultation</button>
        </div>

        {/* Flyout */}
        <div
          onMouseLeave={() => {}}
          style={{
            background: '#FEFDF7',
            padding: '32px 32px 40px',
            display: 'grid',
            gridTemplateColumns: '220px 1fr',
            gap: 48,
            animation: 'la-fadeIn 400ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
          key={open}
        >
          <div>
            <div
              style={{
                fontFamily: 'ui-monospace, Menlo, monospace',
                fontSize: 10.5,
                letterSpacing: '0.14em',
                color: '#8A7F78',
                textTransform: 'uppercase',
                marginBottom: 14,
              }}
            >
              Category
            </div>
            <div
              className="la-display"
              style={{
                fontSize: 32,
                textTransform: 'uppercase',
                color: '#16110E',
                fontWeight: 500,
                lineHeight: 1.05,
                marginBottom: 12,
              }}
            >
              {NAV_CATEGORIES.find((c) => c.key === open).label}
            </div>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 300,
                fontSize: 13,
                color: '#6B6461',
                lineHeight: 1.65,
                marginBottom: 20,
              }}
            >
              Injectables, resurfacing, and medical facials — the treatments most clients start
              with.
            </p>
            <button style={{ ...baseBtn, fontSize: 11, padding: '10px 20px' }} className="la-btn-secondary">
              See all {NAV_CATEGORIES.find((c) => c.key === open).label.toLowerCase()} →
            </button>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 4,
            }}
          >
            {FACE_TREATMENTS.map((t) => (
              <a
                key={t.name}
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{
                  padding: '14px 18px',
                  borderRadius: 8,
                  textDecoration: 'none',
                  display: 'block',
                  transition: 'background 300ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#FFF0D4')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <div
                  className="la-display"
                  style={{
                    fontSize: 14,
                    textTransform: 'uppercase',
                    color: '#2B211B',
                    fontWeight: 500,
                    marginBottom: 4,
                  }}
                >
                  {t.name}
                </div>
                <div
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 300,
                    fontSize: 12,
                    color: '#6B6461',
                  }}
                >
                  {t.meta}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <SpecLabel>Mobile · Two-Tap Maximum</SpecLabel>
      <Rationale>
        Instagram + Google Maps traffic is thumb-driven. The menu never nests. Tap a category,
        land on its treatments, tap one. That is the whole mobile IA for services.
      </Rationale>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 20,
          alignItems: 'start',
        }}
      >
        {/* Closed state */}
        <div
          style={{
            maxWidth: 360,
            margin: '0 auto',
            border: '1px solid #E8E1D8',
            borderRadius: 14,
            overflow: 'hidden',
            background: '#FEFDF7',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              borderBottom: '1px solid #F1EDE9',
            }}
          >
            <div
              className="la-display"
              style={{
                fontSize: 15,
                letterSpacing: '0.2em',
                color: '#16110E',
                fontWeight: 500,
              }}
            >
              LA MEDSPA
            </div>
            <button
              onClick={() => { setMobileOpen(!mobileOpen); setMobileStep('root'); }}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'Figtree', sans-serif",
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#2B211B',
                padding: '8px 12px',
              }}
            >
              {mobileOpen ? 'Close' : 'Menu'}
            </button>
          </div>

          {mobileOpen && mobileStep === 'root' && (
            <div style={{ padding: '12px 0', animation: 'la-fadeIn 300ms ease-out' }}>
              {NAV_CATEGORIES.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setMobileStep('category')}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '18px 24px',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid #F1EDE9',
                    cursor: 'pointer',
                    fontFamily: "'Figtree', sans-serif",
                    fontWeight: 500,
                    fontSize: 16,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#2B211B',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  {c.label}
                  <span style={{ color: '#B8A898' }}>→</span>
                </button>
              ))}
              <div style={{ padding: '18px 24px' }}>
                <button style={{ ...baseBtn, width: '100%', justifyContent: 'center' }} className="la-btn-primary">
                  Book Consultation
                </button>
              </div>
            </div>
          )}
          {mobileOpen && mobileStep === 'category' && (
            <div style={{ padding: '12px 0', animation: 'la-fadeIn 300ms ease-out' }}>
              <button
                onClick={() => setMobileStep('root')}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '14px 24px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'Figtree', sans-serif",
                  fontSize: 11,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#8A7F78',
                }}
              >
                ← All Categories
              </button>
              {FACE_TREATMENTS.map((t) => (
                <div
                  key={t.name}
                  style={{
                    padding: '16px 24px',
                    borderBottom: '1px solid #F1EDE9',
                  }}
                >
                  <div
                    className="la-display"
                    style={{
                      fontSize: 15,
                      textTransform: 'uppercase',
                      color: '#2B211B',
                      fontWeight: 500,
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 300,
                      fontSize: 12,
                      color: '#6B6461',
                      marginTop: 2,
                    }}
                  >
                    {t.meta}
                  </div>
                </div>
              ))}
            </div>
          )}
          {!mobileOpen && (
            <div style={{ padding: 24, textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 300,
                  fontSize: 12,
                  color: '#8A7F78',
                }}
              >
                Tap Menu to open
              </div>
            </div>
          )}
        </div>

        {/* State labels */}
        <div
          style={{
            border: '1px solid #E8E1D8',
            borderRadius: 10,
            padding: 24,
            background: '#F1EDE9',
          }}
        >
          <SpecLabel>States</SpecLabel>
          <ul
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 300,
              fontSize: 13,
              color: '#464646',
              lineHeight: 1.8,
              margin: 0,
              paddingLeft: 18,
            }}
          >
            <li><b>Closed</b> — logo + Menu trigger only.</li>
            <li><b>Root open</b> — six categories, full-width tap targets.</li>
            <li><b>Category open</b> — flat treatment list + Back.</li>
            <li>No deeper nesting, ever.</li>
            <li>Primary CTA pinned at root level.</li>
          </ul>
          <div style={{ marginTop: 18, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button
              onClick={() => { setMobileOpen(true); setMobileStep('root'); }}
              style={{ ...baseBtn, fontSize: 10, padding: '8px 14px' }}
              className="la-btn-ghost"
            >
              Show root
            </button>
            <button
              onClick={() => { setMobileOpen(true); setMobileStep('category'); }}
              style={{ ...baseBtn, fontSize: 10, padding: '8px 14px' }}
              className="la-btn-ghost"
            >
              Show category
            </button>
            <button
              onClick={() => setMobileOpen(false)}
              style={{ ...baseBtn, fontSize: 10, padding: '8px 14px' }}
              className="la-btn-ghost"
            >
              Show closed
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
};

window.NavSection = NavSection;
