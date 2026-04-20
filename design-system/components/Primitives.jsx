// Small shared bits used throughout the doc.

const Placeholder = ({ label, ratio = '3 / 4', tone = '#E8DFD2', ink = '#6B4426', style = {} }) => (
  <div
    style={{
      aspectRatio: ratio,
      width: '100%',
      background: `repeating-linear-gradient(135deg, ${tone} 0 12px, ${tone}CC 12px 24px)`,
      borderRadius: 10,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
      padding: 14,
      color: ink,
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
      fontSize: 11,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      ...style,
    }}
  >
    <span style={{ background: 'rgba(254, 253, 247, 0.78)', padding: '4px 8px', borderRadius: 4 }}>
      {label}
    </span>
  </div>
);

// Section scaffolding: left gutter with section # + label, right column content
const Section = ({ num, kicker, title, children, id }) => (
  <section
    id={id}
    style={{
      borderTop: '1px solid #E8E1D8',
      padding: '96px 0 120px',
      display: 'grid',
      gridTemplateColumns: 'minmax(220px, 260px) 1fr',
      gap: 48,
    }}
  >
    <div style={{ position: 'sticky', top: 96, alignSelf: 'start' }}>
      <div
        style={{
          fontFamily: 'ui-monospace, Menlo, monospace',
          fontSize: 11,
          letterSpacing: '0.14em',
          color: '#8A7F78',
          textTransform: 'uppercase',
          marginBottom: 12,
        }}
      >
        {num} — {kicker}
      </div>
      <h2
        className="la-display"
        style={{
          fontSize: 36,
          lineHeight: 1.05,
          color: '#2B211B',
          margin: 0,
          textTransform: 'uppercase',
          letterSpacing: '-0.01em',
          fontWeight: 500,
        }}
      >
        {title}
      </h2>
    </div>
    <div>{children}</div>
  </section>
);

// Small label above every component, so the marketing manager can point and name things
const SpecLabel = ({ children, state }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'baseline',
      gap: 10,
      fontFamily: 'ui-monospace, Menlo, monospace',
      fontSize: 10.5,
      letterSpacing: '0.14em',
      color: '#8A7F78',
      textTransform: 'uppercase',
      marginBottom: 14,
    }}
  >
    <span style={{ color: '#2B211B' }}>{children}</span>
    {state && <span style={{ color: '#B8A898' }}>· {state}</span>}
  </div>
);

// A small "why this exists" note — plain English, no jargon
const Rationale = ({ children }) => (
  <p
    style={{
      fontFamily: "'Montserrat', system-ui, sans-serif",
      fontWeight: 300,
      fontSize: 14,
      lineHeight: 1.6,
      color: '#464646',
      maxWidth: 560,
      margin: '0 0 32px',
    }}
  >
    {children}
  </p>
);

Object.assign(window, { Placeholder, Section, SpecLabel, Rationale });
