// ——— 06 FORM CONTROLS ———
// Designed to carry the concern-based finder. Warm focus rings, pill inputs.

const FORM_CSS = `
  .la-input {
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
    font-size: 15px;
    color: #2B211B;
    background: #FEFDF7;
    border: 1px solid #E8E1D8;
    border-radius: 999px;
    padding: 14px 22px;
    width: 100%;
    transition: all 300ms cubic-bezier(0.22, 1, 0.36, 1);
    outline: none;
  }
  .la-input::placeholder { color: #B8A898; }
  .la-input:hover { border-color: #D4C8B8; }
  .la-input:focus { border-color: #F1AC32; box-shadow: 0 0 0 3px rgba(201,138,28,0.2); }
  .la-input.error { border-color: #A8553A; box-shadow: 0 0 0 3px rgba(168,85,58,0.15); }

  .la-textarea {
    border-radius: 18px;
    padding: 16px 22px;
    resize: vertical;
    min-height: 120px;
  }

  .la-select-wrap { position: relative; }
  .la-select-wrap::after {
    content: '';
    position: absolute;
    right: 22px;
    top: 50%;
    width: 8px; height: 8px;
    border-right: 1.5px solid #8A7F78;
    border-bottom: 1.5px solid #8A7F78;
    transform: translateY(-75%) rotate(45deg);
    pointer-events: none;
  }
  .la-select { appearance: none; padding-right: 44px; }

  .la-check-card {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding: 18px 22px;
    border: 1px solid #E8E1D8;
    border-radius: 14px;
    background: #FEFDF7;
    cursor: pointer;
    transition: all 300ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  .la-check-card:hover { background: #FFF0D4; border-color: #F1AC32; }
  .la-check-card.checked { background: #FFF0D4; border-color: #F1AC32; }

  .la-check {
    width: 20px; height: 20px;
    border: 1.5px solid #B8A898;
    border-radius: 6px;
    background: #FEFDF7;
    flex-shrink: 0;
    margin-top: 2px;
    display: flex; align-items: center; justify-content: center;
    transition: all 300ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  .la-check-card.checked .la-check { background: #F1AC32; border-color: #F1AC32; }
  .la-check-card.checked .la-check::after {
    content: '';
    width: 10px; height: 5px;
    border-left: 2px solid #16110E;
    border-bottom: 2px solid #16110E;
    transform: rotate(-45deg) translate(1px, -1px);
  }

  .la-radio {
    width: 20px; height: 20px;
    border: 1.5px solid #B8A898;
    border-radius: 999px;
    flex-shrink: 0;
    margin-top: 2px;
    position: relative;
    transition: all 300ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  .la-check-card.checked .la-radio { border-color: #F1AC32; }
  .la-check-card.checked .la-radio::after {
    content: '';
    position: absolute; inset: 3px;
    border-radius: 999px;
    background: #F1AC32;
  }
`;

const LabeledField = ({ label, hint, children, state }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
      <label
        className="la-display"
        style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2B211B', fontWeight: 500 }}
      >
        {label}
      </label>
      {state && (
        <span
          style={{
            fontFamily: 'ui-monospace, Menlo, monospace',
            fontSize: 10,
            color: '#8A7F78',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          {state}
        </span>
      )}
    </div>
    {children}
    {hint && (
      <div
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 300,
          fontSize: 12,
          color: '#6B6461',
        }}
      >
        {hint}
      </div>
    )}
  </div>
);

const FormSection = () => {
  const [checked, setChecked] = React.useState(new Set(['fine-lines']));
  const [radio, setRadio] = React.useState('face');
  const toggleCheck = (v) => {
    setChecked((prev) => {
      const n = new Set(prev);
      n.has(v) ? n.delete(v) : n.add(v);
      return n;
    });
  };

  return (
    <Section num="06" kicker="Components" title="Form Controls" id="forms">
      <style>{FORM_CSS}</style>
      <SpecLabel>Inputs</SpecLabel>
      <Rationale>
        Pill-shaped to match the button system. Border transitions to gold on focus with a warm
        ring — never default browser blue. Error is a warm terracotta, not stock red.
      </Rationale>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 28,
          marginBottom: 48,
        }}
      >
        <LabeledField label="Name" state="Default">
          <input className="la-input" placeholder="Your name" />
        </LabeledField>
        <LabeledField label="Email" state="Filled">
          <input className="la-input" defaultValue="sarah@example.com" />
        </LabeledField>
        <LabeledField label="Phone" state="Focus (click in)">
          <input className="la-input" placeholder="(705) 000-0000" />
        </LabeledField>
        <LabeledField label="Email" state="Error" hint="Enter a valid email address.">
          <input className="la-input error" defaultValue="sarah@example" />
        </LabeledField>
        <LabeledField label="Area of Interest" state="Select">
          <div className="la-select-wrap">
            <select className="la-input la-select" defaultValue="face">
              <option value="face">Face — Injectables, resurfacing</option>
              <option value="body">Body — Contouring, tightening</option>
              <option value="hair">Hair — Restoration, removal</option>
              <option value="medical">Medical — Clinical treatments</option>
              <option value="wellness">Wellness — IV, hormone</option>
              <option value="skincare">Skin Care — Products, facials</option>
            </select>
          </div>
        </LabeledField>
        <LabeledField label="Notes" state="Textarea">
          <textarea
            className="la-input la-textarea"
            placeholder="Share anything you'd like the team to know — we read every one."
          />
        </LabeledField>
      </div>

      <SpecLabel>Concern Selectors · Checkbox Card</SpecLabel>
      <Rationale>
        The finder asks users to pick their concerns — this is that control. Full-card tap
        target, warm selected state, gold check mark.
      </Rationale>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 12,
          marginBottom: 40,
        }}
      >
        {[
          { v: 'fine-lines', label: 'Fine Lines & Wrinkles', meta: 'Forehead, crow\'s feet, frown' },
          { v: 'volume', label: 'Volume Loss', meta: 'Cheeks, temples, lips' },
          { v: 'tone', label: 'Tone & Texture', meta: 'Dullness, pores, uneven' },
          { v: 'acne', label: 'Acne & Scarring', meta: 'Active, post-inflammatory' },
          { v: 'pigment', label: 'Pigment & Sun', meta: 'Sun damage, melasma' },
          { v: 'redness', label: 'Redness & Rosacea', meta: 'Flushing, capillaries' },
        ].map((c) => (
          <div
            key={c.v}
            className={`la-check-card ${checked.has(c.v) ? 'checked' : ''}`}
            onClick={() => toggleCheck(c.v)}
          >
            <div className="la-check" />
            <div>
              <div
                className="la-display"
                style={{ fontSize: 14, textTransform: 'uppercase', color: '#2B211B', fontWeight: 500 }}
              >
                {c.label}
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
                {c.meta}
              </div>
            </div>
          </div>
        ))}
      </div>

      <SpecLabel>Radio Card · Single Select</SpecLabel>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 12,
        }}
      >
        {[
          { v: 'face',     label: 'Face' },
          { v: 'body',     label: 'Body' },
          { v: 'wellness', label: 'Wellness' },
        ].map((c) => (
          <div
            key={c.v}
            className={`la-check-card ${radio === c.v ? 'checked' : ''}`}
            onClick={() => setRadio(c.v)}
          >
            <div className="la-radio" />
            <div
              className="la-display"
              style={{ fontSize: 14, textTransform: 'uppercase', color: '#2B211B', fontWeight: 500 }}
            >
              {c.label}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

window.FormSection = FormSection;
