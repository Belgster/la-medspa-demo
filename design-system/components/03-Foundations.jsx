// ——— 03 SPACE · SURFACES · MOTION ———

const SpaceRow = ({ name, px, role }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '120px 80px 1fr 1fr',
      gap: 24,
      alignItems: 'center',
      padding: '14px 0',
      borderBottom: '1px solid #F1EDE9',
    }}
  >
    <div
      className="la-display"
      style={{ fontSize: 13, textTransform: 'uppercase', color: '#2B211B', fontWeight: 500 }}
    >
      {name}
    </div>
    <div style={{ fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 12, color: '#8A7F78' }}>
      {px}px
    </div>
    <div>
      <div style={{ height: 4, background: '#F1AC32', width: px, maxWidth: '100%', borderRadius: 2 }} />
    </div>
    <div
      style={{
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 300,
        fontSize: 13,
        color: '#6B6461',
      }}
    >
      {role}
    </div>
  </div>
);

const FoundationsSection = () => (
  <Section num="03" kicker="Foundations" title="Space · Surfaces · Motion" id="foundations">
    <SpecLabel>Spacing Scale</SpecLabel>
    <Rationale>
      Density is low on purpose. Section rhythm is the single strongest signal that this is a
      rebuilt site and not the old one. Desktop section padding never goes below 96px; 128px is
      the default. Mobile drops to 72/80.
    </Rationale>

    <div style={{ marginBottom: 56 }}>
      <SpaceRow name="Micro" px={4} role="Inline icon gap." />
      <SpaceRow name="Tight" px={8} role="Inside pill labels." />
      <SpaceRow name="Base" px={16} role="Form field vertical rhythm." />
      <SpaceRow name="Comfort" px={24} role="Default component gap." />
      <SpaceRow name="Card" px={32} role="Card internal padding." />
      <SpaceRow name="Stack" px={48} role="Between related blocks." />
      <SpaceRow name="Section S" px={80} role="Mobile section padding." />
      <SpaceRow name="Section M" px={96} role="Tablet section padding." />
      <SpaceRow name="Section L" px={128} role="Desktop section padding — default." />
    </div>

    <SpecLabel>Radii</SpecLabel>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 20,
        marginBottom: 56,
      }}
    >
      {[
        { name: 'None', r: 0, role: 'Editorial blocks, image frames.' },
        { name: 'Card', r: 10, role: 'All cards. 8–12 ok.' },
        { name: 'Tag', r: 999, role: 'Category pills, meta chips.' },
        { name: 'Pill', r: 999, role: 'Every button, every state.' },
      ].map((x) => (
        <div key={x.name}>
          <div
            style={{
              background: '#F1EDE9',
              height: 96,
              borderRadius: x.r,
              borderTopLeftRadius: x.r,
              borderTopRightRadius: x.r,
            }}
          />
          <div
            className="la-display"
            style={{
              fontSize: 13,
              textTransform: 'uppercase',
              color: '#2B211B',
              fontWeight: 500,
              marginTop: 12,
            }}
          >
            {x.name}{' '}
            <span
              style={{
                fontFamily: 'ui-monospace, Menlo, monospace',
                fontSize: 11,
                color: '#8A7F78',
                fontWeight: 400,
                letterSpacing: 0,
                textTransform: 'none',
              }}
            >
              · {x.r}px
            </span>
          </div>
          <div
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 300,
              fontSize: 12,
              color: '#6B6461',
              marginTop: 4,
            }}
          >
            {x.role}
          </div>
        </div>
      ))}
    </div>

    <SpecLabel>Shadows</SpecLabel>
    <Rationale>
      Restrained. Warm undertone. Heavy shadows read as dated — if a card needs separation,
      first try a hairline border, then reach for shadow-sm.
    </Rationale>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 20,
        marginBottom: 56,
      }}
    >
      {[
        { name: 'None', shadow: 'none', role: 'Default. Hairline border preferred.' },
        {
          name: 'Small',
          shadow: '0 1px 2px rgba(43, 33, 27, 0.04), 0 2px 8px rgba(43, 33, 27, 0.04)',
          role: 'Cards lifted from cream bg.',
        },
        {
          name: 'Medium',
          shadow: '0 2px 6px rgba(43, 33, 27, 0.05), 0 10px 32px rgba(43, 33, 27, 0.06)',
          role: 'Active/hover card, sticky nav.',
        },
      ].map((s) => (
        <div
          key={s.name}
          style={{
            background: '#FEFDF7',
            border: '1px solid #E8E1D8',
            borderRadius: 10,
            padding: 28,
            boxShadow: s.shadow,
          }}
        >
          <div
            className="la-display"
            style={{ fontSize: 13, textTransform: 'uppercase', color: '#2B211B', fontWeight: 500 }}
          >
            {s.name}
          </div>
          <div
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 300,
              fontSize: 12,
              color: '#6B6461',
              marginTop: 6,
            }}
          >
            {s.role}
          </div>
        </div>
      ))}
    </div>

    <SpecLabel>Motion</SpecLabel>
    <Rationale>
      Restrained and slow. 300–600ms, ease-out. Never bouncy, no scale. Hover states are
      temperature shifts, not size changes. Motion should feel like a spa, not an app.
    </Rationale>

    <MotionDemos />
  </Section>
);

// ——— Live motion demos ———
const MotionDemos = () => {
  const [fadeKey, setFadeKey] = React.useState(0);
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 14,
      }}
    >
      {/* Fade + translate (scroll-in) */}
      <div
        style={{
          border: '1px solid #E8E1D8',
          borderRadius: 10,
          padding: 24,
          background: '#FEFDF7',
        }}
      >
        <SpecLabel state="400ms ease-out">Fade + Rise</SpecLabel>
        <div
          style={{
            height: 120,
            borderRadius: 8,
            background: '#F1EDE9',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: 14,
          }}
        >
          <div
            key={fadeKey}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'la-fadeIn 500ms cubic-bezier(0.22, 1, 0.36, 1) both',
              fontFamily: "'Figtree', sans-serif",
              fontSize: 15,
              fontWeight: 500,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: '#2B211B',
            }}
          >
            Section content
          </div>
        </div>
        <button
          onClick={() => setFadeKey((k) => k + 1)}
          style={linkBtn}
        >
          Replay ↻
        </button>
      </div>

      {/* Hover temperature shift */}
      <div
        style={{
          border: '1px solid #E8E1D8',
          borderRadius: 10,
          padding: 24,
          background: '#FEFDF7',
        }}
      >
        <SpecLabel state="300ms ease-out · hover me">Temperature Shift</SpecLabel>
        <div
          className="la-temp-demo"
          style={{
            height: 120,
            borderRadius: 8,
            background: '#F1EDE9',
            transition: 'background 300ms cubic-bezier(0.22, 1, 0.36, 1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Figtree', sans-serif",
            fontSize: 15,
            fontWeight: 500,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: '#2B211B',
            cursor: 'pointer',
          }}
        >
          Hover
        </div>
        <style>{`.la-temp-demo:hover { background: #FFF0D4; }`}</style>
        <div
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 300,
            fontSize: 12,
            color: '#6B6461',
            marginTop: 10,
          }}
        >
          Beige → gold wash. No scale.
        </div>
      </div>

      {/* Easing curve */}
      <div
        style={{
          border: '1px solid #E8E1D8',
          borderRadius: 10,
          padding: 24,
          background: '#FEFDF7',
        }}
      >
        <SpecLabel state="cubic-bezier(.22,1,.36,1)">Easing</SpecLabel>
        <svg viewBox="0 0 100 100" style={{ width: '100%', height: 120 }}>
          <line x1="0" y1="100" x2="100" y2="0" stroke="#E8E1D8" strokeDasharray="2 2" />
          <path d="M 0 100 C 22 100, 36 0, 100 0" fill="none" stroke="#F1AC32" strokeWidth="2" />
        </svg>
        <div
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 300,
            fontSize: 12,
            color: '#6B6461',
            marginTop: 10,
          }}
        >
          Arrives quickly, settles slowly. Never overshoots.
        </div>
      </div>
    </div>
  );
};

const linkBtn = {
  fontFamily: "'Figtree', sans-serif",
  fontSize: 11,
  fontWeight: 500,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#2B211B',
  background: 'transparent',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  borderBottom: '1px solid #2B211B',
  paddingBottom: 2,
};

window.FoundationsSection = FoundationsSection;
