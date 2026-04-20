// ——— 02 TYPOGRAPHY ———

const TypeRow = ({ name, spec, sample, style, kicker }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '200px 1fr',
      gap: 32,
      padding: '28px 0',
      borderBottom: '1px solid #F1EDE9',
      alignItems: 'baseline',
    }}
  >
    <div>
      <div
        className="la-display"
        style={{
          fontSize: 13,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: '#2B211B',
          fontWeight: 500,
          marginBottom: 6,
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontFamily: 'ui-monospace, Menlo, monospace',
          fontSize: 11,
          color: '#8A7F78',
          lineHeight: 1.5,
        }}
      >
        {spec}
      </div>
      {kicker && (
        <div
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 300,
            fontSize: 12,
            color: '#6B6461',
            marginTop: 8,
            lineHeight: 1.5,
          }}
        >
          {kicker}
        </div>
      )}
    </div>
    <div style={style}>{sample}</div>
  </div>
);

const TypeSection = () => (
  <Section num="02" kicker="Foundations" title="Typography" id="type">
    <SpecLabel>Type Pairing</SpecLabel>
    <Rationale>
      Figtree 500 capitalized does all display and heading work — tight line-height (1.1),
      letter-spacing just shy of neutral. Montserrat 300 carries body copy; the light weight
      is intentional editorial restraint. Karma serif italic appears in one or two places only,
      as a quiet pull-quote voice.
    </Rationale>

    <div style={{ marginBottom: 48 }}>
      <TypeRow
        name="Display"
        spec="Figtree 500 · 72/1.05 · tracking -0.015em · UPPERCASE"
        kicker="Used once per page. Hero only."
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 500,
          fontSize: 'clamp(48px, 5.5vw, 72px)',
          lineHeight: 1.05,
          letterSpacing: '-0.015em',
          textTransform: 'uppercase',
          color: '#16110E',
        }}
        sample={<>Medical-Grade<br />Aesthetics.</>}
      />
      <TypeRow
        name="H1"
        spec="Figtree 500 · 56/1.08 · UPPERCASE"
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 500,
          fontSize: 56,
          lineHeight: 1.08,
          textTransform: 'uppercase',
          color: '#16110E',
        }}
        sample="Less is more. Simple is best."
      />
      <TypeRow
        name="H2"
        spec="Figtree 500 · 40/1.1 · UPPERCASE · color: brown"
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 500,
          fontSize: 40,
          lineHeight: 1.1,
          textTransform: 'uppercase',
          color: '#2B211B',
        }}
        sample="Find Your Treatment"
      />
      <TypeRow
        name="H3"
        spec="Figtree 500 · 28/1.15 · UPPERCASE"
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 500,
          fontSize: 28,
          lineHeight: 1.15,
          textTransform: 'uppercase',
          color: '#2B211B',
        }}
        sample="Neuromodulators"
      />
      <TypeRow
        name="H4"
        spec="Figtree 500 · 20/1.25 · UPPERCASE"
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 500,
          fontSize: 20,
          lineHeight: 1.25,
          textTransform: 'uppercase',
          color: '#2B211B',
        }}
        sample="Botox Cosmetic"
      />
      <TypeRow
        name="Body L"
        spec="Montserrat 300 · 18/1.7 · sentence case"
        kicker="Lede, intro paragraphs."
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 300,
          fontSize: 18,
          lineHeight: 1.7,
          color: '#464646',
          maxWidth: 620,
        }}
        sample="Medical-grade expertise delivered with the warmth and restraint of a high-end spa, for clients who want natural-looking results without leaving the region."
      />
      <TypeRow
        name="Body"
        spec="Montserrat 300 · 15/1.75"
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 300,
          fontSize: 15,
          lineHeight: 1.75,
          color: '#464646',
          maxWidth: 620,
        }}
        sample="A wrinkle relaxer that softens the movement responsible for fine lines around the eyes, forehead, and brow. Results settle over ten to fourteen days and last three to four months."
      />
      <TypeRow
        name="Caption / Meta"
        spec="Figtree 500 · 11/1.4 · 0.12em · UPPERCASE"
        kicker="Kickers, labels, nav micro-copy."
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 500,
          fontSize: 11,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#8A7F78',
        }}
        sample="Medical Aesthetics · Sault Ste. Marie"
      />
      <TypeRow
        name="Editorial Serif"
        spec="Karma 400 italic · 32/1.35 — used sparingly"
        kicker="Pull quotes. Reserved moment."
        style={{
          fontFamily: "'Karma', Georgia, serif",
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 32,
          lineHeight: 1.35,
          color: '#2B211B',
          maxWidth: 620,
        }}
        sample={<>&ldquo;Always natural, never overdone.&rdquo;</>}
      />
    </div>

    <SpecLabel>Editorial Treatment · In Context</SpecLabel>
    <div
      style={{
        background: '#F1EDE9',
        borderRadius: 10,
        padding: '64px 56px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 48,
        alignItems: 'center',
      }}
    >
      <div>
        <div
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#8A7F78',
            marginBottom: 20,
          }}
        >
          Face · Neuromodulators
        </div>
        <div
          style={{
            fontFamily: "'Figtree', sans-serif",
            fontWeight: 500,
            fontSize: 44,
            lineHeight: 1.05,
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
            color: '#16110E',
            marginBottom: 24,
          }}
        >
          Softened,<br />not frozen.
        </div>
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 300,
            fontSize: 16,
            lineHeight: 1.75,
            color: '#464646',
            margin: 0,
          }}
        >
          Our injectors are medical-led and conservatively-handed. The goal is to look rested —
          not to erase what makes your face yours.
        </p>
      </div>
      <Placeholder label="Slot · 121.jpg — hero clinician, blonde, face-line art" />
    </div>
  </Section>
);

window.TypeSection = TypeSection;
