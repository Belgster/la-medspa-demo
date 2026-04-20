// ——— 07 TREATMENT CARD ———
// Tag-based, multi-category. A treatment can wear multiple tags without duplicating in the IA.

const TreatmentCard = ({ name, categoryKey, categories, price, duration, concerns, imageLabel }) => {
  const cat = window.LA_TOKENS.categories[categoryKey];
  return (
    <div
      className="la-treatment-card"
      style={{
        background: '#FEFDF7',
        border: '1px solid #E8E1D8',
        borderRadius: 10,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'all 300ms cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: cat.line,
          zIndex: 2,
        }}
      />
      <Placeholder label={imageLabel} ratio="4 / 5" tone={cat.tone} ink={cat.ink} style={{ borderRadius: 0 }} />
      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {categories.map((ck) => {
            const c = window.LA_TOKENS.categories[ck];
            return (
              <span
                key={ck}
                style={{
                  background: c.tone,
                  color: c.ink,
                  padding: '4px 10px',
                  borderRadius: 999,
                  fontFamily: "'Figtree', sans-serif",
                  fontWeight: 500,
                  fontSize: 10,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                {c.label}
              </span>
            );
          })}
        </div>
        <div>
          <div
            className="la-display"
            style={{
              fontSize: 20,
              textTransform: 'uppercase',
              color: '#2B211B',
              fontWeight: 500,
              lineHeight: 1.15,
              marginBottom: 6,
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 300,
              fontSize: 13,
              color: '#6B6461',
              lineHeight: 1.55,
            }}
          >
            Addresses {concerns.slice(0, 3).join(' · ')}.
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: 16,
            paddingTop: 14,
            borderTop: '1px solid #F1EDE9',
            marginTop: 'auto',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'ui-monospace, Menlo, monospace',
                fontSize: 10,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#8A7F78',
                marginBottom: 2,
              }}
            >
              From
            </div>
            <div
              className="la-display"
              style={{ fontSize: 17, color: '#16110E', fontWeight: 500 }}
            >
              {price}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div
              style={{
                fontFamily: 'ui-monospace, Menlo, monospace',
                fontSize: 10,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#8A7F78',
                marginBottom: 2,
              }}
            >
              Duration
            </div>
            <div
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 300,
                fontSize: 14,
                color: '#2B211B',
              }}
            >
              {duration}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CARD_HOVER_CSS = `
  .la-treatment-card:hover { border-color: #D4C8B8; box-shadow: 0 2px 6px rgba(43,33,27,0.05), 0 10px 32px rgba(43,33,27,0.06); }
`;

const TreatmentCardSection = () => (
  <Section num="07" kicker="Components" title="Treatment Card" id="treatment-card">
    <style>{CARD_HOVER_CSS}</style>
    <SpecLabel>The Conversion Unit, Part One</SpecLabel>
    <Rationale>
      The card carries every service. Tags (not nesting) let a treatment belong to more than one
      category without being duplicated in the information architecture — Bela MD wears both
      <b> Face</b> and <b>Skin Care</b> on a single card. The 3px top rail picks up the card's
      primary category; tags below declare the rest.
    </Rationale>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 20,
        marginBottom: 36,
      }}
    >
      <TreatmentCard
        name="Botox Cosmetic"
        categoryKey="face"
        categories={['face']}
        price="$12 / unit"
        duration="30 min"
        concerns={['Fine lines', 'Forehead', 'Crow\'s feet']}
        imageLabel="Slot · 121.jpg hero clinician"
      />
      <TreatmentCard
        name="Bela MD Facial"
        categoryKey="face"
        categories={['face', 'skincare']}
        price="$275"
        duration="60 min"
        concerns={['Tone & texture', 'Hydration', 'Acne']}
        imageLabel="Slot · treatment room"
      />
      <TreatmentCard
        name="Morpheus8"
        categoryKey="face"
        categories={['face', 'body']}
        price="$950"
        duration="90 min"
        concerns={['Skin tightening', 'Scarring', 'Tone']}
        imageLabel="Slot · equipment"
      />
    </div>
    <SpecLabel state="Hover rail picks up primary category">Reads Across Categories</SpecLabel>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 20,
      }}
    >
      <TreatmentCard
        name="IV Hydration"
        categoryKey="wellness"
        categories={['wellness', 'medical']}
        price="$185"
        duration="45 min"
        concerns={['Fatigue', 'Recovery', 'Immunity']}
        imageLabel="Slot · wellness room"
      />
      <TreatmentCard
        name="Laser Hair Removal"
        categoryKey="hair"
        categories={['hair', 'body']}
        price="$120"
        duration="30 min"
        concerns={['Unwanted hair', 'Ingrowns']}
        imageLabel="Slot · equipment"
      />
      <TreatmentCard
        name="Chemical Peel"
        categoryKey="skincare"
        categories={['skincare', 'face']}
        price="$160"
        duration="45 min"
        concerns={['Pigment', 'Texture', 'Dullness']}
        imageLabel="Slot · product shelf"
      />
    </div>
  </Section>
);

window.TreatmentCard = TreatmentCard;
window.TreatmentCardSection = TreatmentCardSection;
