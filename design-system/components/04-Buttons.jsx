// ——— 04 BUTTONS ———

const baseBtn = {
  fontFamily: "'Figtree', sans-serif",
  fontWeight: 500,
  fontSize: 13,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  padding: '14px 28px',
  borderRadius: 999,
  border: '1px solid transparent',
  cursor: 'pointer',
  transition: 'all 300ms cubic-bezier(0.22, 1, 0.36, 1)',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
  textDecoration: 'none',
  whiteSpace: 'nowrap',
};

// Local stylesheet for hover/focus that inline styles can't express
const BUTTON_CSS = `
  .la-btn-primary { background:#F1AC32; color:#16110E; border-color:#F1AC32; }
  .la-btn-primary:hover { background:transparent; color:#2B211B; border-color:#F1AC32; }
  .la-btn-primary:focus-visible { outline:none; box-shadow:0 0 0 3px rgba(201,138,28,0.35); }
  .la-btn-primary:active { background:#D9962A; border-color:#D9962A; }

  .la-btn-secondary { background:transparent; color:#2B211B; border-color:#2B211B; }
  .la-btn-secondary:hover { background:#2B211B; color:#FEFDF7; }
  .la-btn-secondary:focus-visible { outline:none; box-shadow:0 0 0 3px rgba(201,138,28,0.35); }

  .la-btn-ghost { background:transparent; color:#2B211B; border-color:transparent; padding-left:14px; padding-right:14px; }
  .la-btn-ghost:hover { color:#16110E; background:#FFF0D4; }

  .la-btn-ondark { background:transparent; color:#FEFDF7; border-color:#FEFDF7; }
  .la-btn-ondark:hover { background:#F1AC32; color:#16110E; border-color:#F1AC32; }

  .la-btn-icon { width:44px; height:44px; padding:0; justify-content:center; background:#FEFDF7; border:1px solid #E8E1D8; border-radius:999px; color:#2B211B; }
  .la-btn-icon:hover { background:#FFF0D4; border-color:#F1AC32; }

  .la-btn-disabled { background:#F1EDE9; color:#B8A898; border-color:#F1EDE9; cursor:not-allowed; }
`;

const BtnCell = ({ label, children }) => (
  <div
    style={{
      border: '1px solid #E8E1D8',
      borderRadius: 10,
      padding: 24,
      background: '#FEFDF7',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      minHeight: 140,
    }}
  >
    <div
      style={{
        fontFamily: 'ui-monospace, Menlo, monospace',
        fontSize: 10.5,
        letterSpacing: '0.14em',
        color: '#8A7F78',
        textTransform: 'uppercase',
      }}
    >
      {label}
    </div>
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>{children}</div>
  </div>
);

const ButtonSection = () => (
  <Section num="04" kicker="Components" title="Buttons" id="buttons">
    <style>{BUTTON_CSS}</style>

    <SpecLabel>The System</SpecLabel>
    <Rationale>
      All buttons are pills. Primary is gold → transparent-with-gold-border on hover (not the
      other way around). Secondary is dark on cream. Ghost is for quieter links inside dense
      areas. Focus uses a warm gold ring — never the default browser blue.
    </Rationale>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginBottom: 48 }}>
      <BtnCell label="Primary · Default">
        <button style={baseBtn} className="la-btn-primary">Book Consultation</button>
      </BtnCell>
      <BtnCell label="Primary · Hover (live)">
        <button style={baseBtn} className="la-btn-primary">Book Consultation →</button>
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 300,
            fontSize: 12,
            color: '#6B6461',
          }}
        >
          Hover to see the invert.
        </span>
      </BtnCell>
      <BtnCell label="Primary · Focus">
        <button
          style={{
            ...baseBtn,
            background: '#F1AC32',
            color: '#16110E',
            borderColor: '#F1AC32',
            boxShadow: '0 0 0 3px rgba(201,138,28,0.35)',
          }}
        >
          Book Consultation
        </button>
      </BtnCell>
      <BtnCell label="Primary · Disabled">
        <button style={baseBtn} className="la-btn-disabled" disabled>Unavailable</button>
      </BtnCell>

      <BtnCell label="Secondary · Default">
        <button style={baseBtn} className="la-btn-secondary">View Treatments</button>
      </BtnCell>
      <BtnCell label="Secondary · Hover (live)">
        <button style={baseBtn} className="la-btn-secondary">View Treatments</button>
      </BtnCell>

      <BtnCell label="Ghost · Quiet Link">
        <button style={baseBtn} className="la-btn-ghost">Learn more</button>
      </BtnCell>
      <BtnCell label="On Dark · For Image Overlays">
        <div
          style={{
            background: '#2B211B',
            padding: 24,
            borderRadius: 8,
            flex: 1,
            display: 'flex',
            gap: 12,
          }}
        >
          <button style={baseBtn} className="la-btn-ondark">Book Now</button>
        </div>
      </BtnCell>

      <BtnCell label="Icon · Default + Hover">
        <button style={baseBtn} className="la-btn-icon" aria-label="Previous">←</button>
        <button style={baseBtn} className="la-btn-icon" aria-label="Next">→</button>
        <button style={baseBtn} className="la-btn-icon" aria-label="Menu">☰</button>
      </BtnCell>
      <BtnCell label="Sizes">
        <button style={{ ...baseBtn, fontSize: 11, padding: '10px 20px' }} className="la-btn-primary">Small</button>
        <button style={baseBtn} className="la-btn-primary">Default</button>
        <button style={{ ...baseBtn, fontSize: 14, padding: '18px 36px' }} className="la-btn-primary">Large</button>
      </BtnCell>
    </div>

    <SpecLabel>Anatomy</SpecLabel>
    <div
      style={{
        border: '1px solid #E8E1D8',
        borderRadius: 10,
        padding: 40,
        background: '#FEFDF7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 64,
      }}
    >
      <div style={{ position: 'relative' }}>
        <button style={baseBtn} className="la-btn-primary">Book Consultation</button>
        <div
          style={{
            position: 'absolute',
            top: -24,
            left: 0,
            right: 0,
            height: 1,
            background: '#C9765A',
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: -18,
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: 'ui-monospace, Menlo, monospace',
              fontSize: 10,
              color: '#8A7F78',
              whiteSpace: 'nowrap',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            28px · 28px
          </span>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: -24,
            left: 0,
            right: 0,
            height: 1,
            background: '#C9765A',
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: 6,
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: 'ui-monospace, Menlo, monospace',
              fontSize: 10,
              color: '#8A7F78',
              whiteSpace: 'nowrap',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            14px top · 14px bottom · 999px radius
          </span>
        </div>
      </div>
    </div>
  </Section>
);

window.ButtonSection = ButtonSection;
window.BUTTON_CSS = BUTTON_CSS;
window.baseBtn = baseBtn;
