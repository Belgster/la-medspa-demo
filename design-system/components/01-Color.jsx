// ——— 01 COLOR ———
// Brand palette + treatment-category IA system

const Swatch = ({ name, hex, role, light = false, size = 'md' }) => {
  const h = size === 'lg' ? 140 : 104;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div
        style={{
          height: h,
          background: hex,
          borderRadius: 10,
          border: light ? '1px solid #E8E1D8' : 'none',
        }}
      />
      <div>
        <div
          className="la-display"
          style={{
            fontSize: 13,
            textTransform: 'uppercase',
            letterSpacing: '0.02em',
            color: '#2B211B',
            fontWeight: 500,
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontFamily: 'ui-monospace, Menlo, monospace',
            fontSize: 11,
            color: '#8A7F78',
            marginTop: 2,
          }}
        >
          {hex}
        </div>
        {role && (
          <div
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 300,
              fontSize: 12,
              color: '#464646',
              marginTop: 6,
              lineHeight: 1.5,
            }}
          >
            {role}
          </div>
        )}
      </div>
    </div>
  );
};

const CategoryChip = ({ k, cat }) => (
  <div
    style={{
      background: '#FEFDF7',
      border: '1px solid #E8E1D8',
      borderRadius: 10,
      padding: 20,
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        position: 'absolute',
        top: 0, left: 0, bottom: 0,
        width: 3,
        background: cat.line,
      }}
    />
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
      <span
        style={{
          background: cat.tone,
          color: cat.ink,
          padding: '5px 11px',
          borderRadius: 999,
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 500,
          fontSize: 11,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        {cat.label}
      </span>
      <span
        style={{
          fontFamily: 'ui-monospace, Menlo, monospace',
          fontSize: 10,
          color: '#8A7F78',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
      >
        {k}
      </span>
    </div>
    <div style={{ display: 'flex', gap: 8 }}>
      {[
        { hex: cat.tone, name: 'Tone' },
        { hex: cat.line, name: 'Line' },
        { hex: cat.ink, name: 'Ink' },
      ].map((s) => (
        <div key={s.name} style={{ flex: 1 }}>
          <div style={{ height: 44, background: s.hex, borderRadius: 6 }} />
          <div
            style={{
              fontFamily: 'ui-monospace, Menlo, monospace',
              fontSize: 10,
              color: '#8A7F78',
              marginTop: 6,
            }}
          >
            {s.name} · {s.hex}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ColorSection = () => {
  const palette = window.LA_TOKENS;
  return (
    <Section num="01" kicker="Foundations" title="Color" id="color">
      <SpecLabel>Brand Palette</SpecLabel>
      <Rationale>
        The page background is a warm cream — never pure white. Gold is the single load-bearing
        accent (CTAs, key numerals). Dark brown carries every heading; charcoal carries body.
        Warmth is a brand value: test any neutral on a plain card; if it reads cool, it is wrong.
      </Rationale>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 20,
          marginBottom: 56,
        }}
      >
        <Swatch name="Warm Cream" hex={palette.cream} role="Page background. Never pure white." light />
        <Swatch name="Primary Gold" hex={palette.gold} role="CTAs, focal accents, key numerals." />
        <Swatch name="Dark Brown" hex={palette.brown} role="All headings H2–H6." />
        <Swatch name="Near Black" hex={palette.ink} role="Deepest contrast, H1." />
        <Swatch name="Warm Beige" hex={palette.beige} role="Card + quiet surfaces." light />
        <Swatch name="Charcoal" hex={palette.charcoal} role="Body copy." />
        <Swatch name="Soft Peach" hex={palette.peach} role="Secondary support, editorial." />
        <Swatch name="Gold Wash" hex={palette.goldWash} role="Tint background, gold field." light />
      </div>

      <SpecLabel>Treatment-Category System</SpecLabel>
      <Rationale>
        This is not decoration — it is an IA tool. Each service category gets one hue that lets
        a returning visitor orient across Face, Body, Hair, Medical, Wellness, and Skin Care
        without reading labels. All six share matched lightness and chroma so the system reads
        as a family, not a rainbow. Three tokens per category: <b>Tone</b> (pill background),
        <b> Line</b> (2–3px card rail), <b>Ink</b> (label text).
      </Rationale>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 14,
          marginBottom: 48,
        }}
      >
        {Object.entries(palette.categories).map(([k, cat]) => (
          <CategoryChip key={k} k={k} cat={cat} />
        ))}
      </div>

      <SpecLabel>Semantic</SpecLabel>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 20,
        }}
      >
        <Swatch name="Success" hex="#6E8A5E" role="Booking confirmed, form saved." />
        <Swatch name="Info" hex="#6F7E8A" role="Quiet info notes." />
        <Swatch name="Warning" hex="#C28A3A" role="Waitlist, limited availability." />
        <Swatch name="Error" hex="#A8553A" role="Form validation." />
      </div>
    </Section>
  );
};

window.ColorSection = ColorSection;
