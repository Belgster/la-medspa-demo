// ——— 08 CONCERN-BASED TREATMENT FINDER ———
// Documentation: all three steps stacked, static. Plus a fused 2-step alternative.

const CONCERNS = [
  { v: 'fine-lines', label: 'Fine Lines & Wrinkles', meta: 'Forehead, crow\'s feet, frown' },
  { v: 'volume',     label: 'Volume Loss',           meta: 'Cheeks, temples, lips' },
  { v: 'tone',       label: 'Tone & Texture',        meta: 'Dullness, pores, uneven' },
  { v: 'acne',       label: 'Acne & Scarring',       meta: 'Active, post-inflammatory' },
  { v: 'pigment',    label: 'Pigment & Sun',         meta: 'Sun damage, melasma' },
  { v: 'redness',    label: 'Redness & Rosacea',     meta: 'Flushing, capillaries' },
];

const AREAS = [
  { v: 'face',     label: 'Face',     meta: 'Forehead, cheeks, lips, jawline' },
  { v: 'neck',     label: 'Neck',     meta: 'Platysma bands, tech neck' },
  { v: 'chest',    label: 'Chest',    meta: 'Décolletage, sun damage' },
  { v: 'body',     label: 'Body',     meta: 'Abdomen, arms, thighs' },
  { v: 'hands',    label: 'Hands',    meta: 'Volume loss, pigment' },
  { v: 'wellness', label: 'Whole-Body Wellness', meta: 'IV, hormone, recovery' },
];

const RESULTS = [
  { name: 'Botox Cosmetic',   cats: ['face'],              price: '$12 / unit', duration: '30 min', blurb: 'Softens the movement responsible for fine lines.' },
  { name: 'Dermal Fillers',   cats: ['face'],              price: 'From $695',  duration: '60 min', blurb: 'Restores volume and subtle structural support.' },
  { name: 'Morpheus8',        cats: ['face', 'body'],      price: '$950',       duration: '90 min', blurb: 'RF microneedling for tightening and texture.' },
];

const StepHeader = ({ n, label, required = false }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'baseline',
      gap: 14,
      marginBottom: 18,
      paddingBottom: 14,
      borderBottom: '1px solid #D4C8B8',
    }}
  >
    <span
      style={{
        width: 28, height: 28, borderRadius: 999,
        background: '#F1AC32', color: '#16110E',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Figtree', sans-serif", fontWeight: 500, fontSize: 12,
      }}
    >
      {n}
    </span>
    <span
      className="la-display"
      style={{
        fontSize: 13, letterSpacing: '0.16em', textTransform: 'uppercase',
        color: '#16110E', fontWeight: 500,
      }}
    >
      Step {n} of 3 · {label}
    </span>
    {!required && (
      <span
        style={{
          fontFamily: 'ui-monospace, Menlo, monospace',
          fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase',
          color: '#8A3A30',
        }}
      >
        Optional
      </span>
    )}
  </div>
);

const StepFrame = ({ children, label }) => (
  <div
    style={{
      background: '#F1EDE9',
      borderRadius: 14,
      padding: 'clamp(28px, 3vw, 44px)',
      marginBottom: 20,
      position: 'relative',
    }}
  >
    <div
      style={{
        position: 'absolute',
        top: -10, left: 32,
        background: '#2B211B', color: '#FEFDF7',
        fontFamily: 'ui-monospace, Menlo, monospace',
        fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase',
        padding: '4px 10px', borderRadius: 4,
      }}
    >
      {label}
    </div>
    {children}
  </div>
);

// Step 1 — Concern
const Step1 = () => (
  <StepFrame label="State · Documentation">
    <StepHeader n={1} label="Concern" required />
    <h3
      className="la-display"
      style={{
        fontSize: 32, textTransform: 'uppercase', color: '#16110E',
        fontWeight: 500, lineHeight: 1.05, margin: '0 0 10px',
      }}
    >
      What Would You Like<br />To Address?
    </h3>
    <p style={{
      fontFamily: "'Montserrat', sans-serif", fontWeight: 300,
      fontSize: 14, color: '#464646', lineHeight: 1.7, maxWidth: 520,
      margin: '0 0 28px',
    }}>
      Pick one or a few. We'll show you the treatments that best address these concerns.
    </p>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 28 }}>
      {CONCERNS.map((c, i) => (
        <div key={c.v} className={`la-check-card ${i < 2 ? 'checked' : ''}`}>
          <div className="la-check" />
          <div>
            <div className="la-display" style={{
              fontSize: 14, textTransform: 'uppercase', color: '#2B211B', fontWeight: 500,
            }}>
              {c.label}
            </div>
            <div style={{
              fontFamily: "'Montserrat', sans-serif", fontWeight: 300,
              fontSize: 12, color: '#6B6461', marginTop: 4,
            }}>
              {c.meta}
            </div>
          </div>
        </div>
      ))}
    </div>
    <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
      <button style={baseBtn} className="la-btn-primary">Continue →</button>
      <button style={{ ...baseBtn, fontSize: 11 }} className="la-btn-ghost">
        Skip — I'll browse by area
      </button>
    </div>
  </StepFrame>
);

// Step 2 — Area (with prominent skip)
const Step2 = () => (
  <StepFrame label="State · Documentation">
    <StepHeader n={2} label="Area (Optional)" />
    <div style={{
      display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
      gap: 24, flexWrap: 'wrap', marginBottom: 24,
    }}>
      <div>
        <h3
          className="la-display"
          style={{
            fontSize: 32, textTransform: 'uppercase', color: '#16110E',
            fontWeight: 500, lineHeight: 1.05, margin: '0 0 10px',
          }}
        >
          Where Would You<br />Like To Focus?
        </h3>
        <p style={{
          fontFamily: "'Montserrat', sans-serif", fontWeight: 300,
          fontSize: 14, color: '#464646', lineHeight: 1.7, maxWidth: 520,
          margin: 0,
        }}>
          Narrow the results, or skip to see everything that matches your concerns.
        </p>
      </div>
      <button style={{ ...baseBtn }} className="la-btn-ghost">
        Skip this step →
      </button>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 28 }}>
      {AREAS.map((a, i) => (
        <div key={a.v} className={`la-check-card ${i === 0 ? 'checked' : ''}`}>
          <div className="la-radio" />
          <div>
            <div className="la-display" style={{
              fontSize: 15, textTransform: 'uppercase', color: '#2B211B', fontWeight: 500,
            }}>
              {a.label}
            </div>
            <div style={{
              fontFamily: "'Montserrat', sans-serif", fontWeight: 300,
              fontSize: 12, color: '#6B6461', marginTop: 4,
            }}>
              {a.meta}
            </div>
          </div>
        </div>
      ))}
    </div>
    <div style={{ display: 'flex', gap: 14 }}>
      <button style={baseBtn} className="la-btn-secondary">← Back</button>
      <button style={baseBtn} className="la-btn-primary">See Matches →</button>
    </div>
  </StepFrame>
);

// Step 3 — Results
const Step3 = () => (
  <StepFrame label="State · Documentation">
    <StepHeader n={3} label="Results" required />
    <div style={{
      display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      gap: 24, flexWrap: 'wrap', marginBottom: 20,
    }}>
      <div>
        <div style={{
          fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 11,
          letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8A7F78',
          marginBottom: 10,
        }}>
          3 matches
        </div>
        <h3
          className="la-display"
          style={{
            fontSize: 32, textTransform: 'uppercase', color: '#16110E',
            fontWeight: 500, lineHeight: 1.05, margin: 0,
          }}
        >
          Recommended<br />For You
        </h3>
      </div>
      <button style={{ ...baseBtn, fontSize: 11 }} className="la-btn-ghost">
        Clear all ↻
      </button>
    </div>

    {/* Active filter chips */}
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
      {[
        { label: 'Fine Lines & Wrinkles', tone: '#FEFDF7' },
        { label: 'Volume Loss',           tone: '#FEFDF7' },
        { label: 'Area · Face',           tone: '#FFF0D4' },
      ].map((chip) => (
        <span
          key={chip.label}
          style={{
            background: chip.tone,
            color: '#2B211B',
            border: '1px solid #E8E1D8',
            padding: '6px 14px',
            borderRadius: 999,
            fontFamily: "'Figtree', sans-serif", fontWeight: 500, fontSize: 11,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}
        >
          {chip.label}
          <span style={{ color: '#8A7F78', fontSize: 14, lineHeight: 1 }}>×</span>
        </span>
      ))}
    </div>

    {/* Result cards */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
      {RESULTS.map((t) => {
        const cat = window.LA_TOKENS.categories[t.cats[0]];
        return (
          <div key={t.name}
            className="la-treatment-card"
            style={{
              background: '#FEFDF7',
              border: '1px solid #E8E1D8',
              borderRadius: 10,
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: cat.line, zIndex: 2 }} />
            <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {t.cats.map((ck) => {
                  const c = window.LA_TOKENS.categories[ck];
                  return (
                    <span key={ck} style={{
                      background: c.tone, color: c.ink,
                      padding: '4px 10px', borderRadius: 999,
                      fontFamily: "'Figtree', sans-serif", fontWeight: 500,
                      fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
                    }}>
                      {c.label}
                    </span>
                  );
                })}
              </div>
              <div className="la-display" style={{
                fontSize: 18, textTransform: 'uppercase', color: '#2B211B',
                fontWeight: 500, lineHeight: 1.15,
              }}>
                {t.name}
              </div>
              <div style={{
                fontFamily: "'Montserrat', sans-serif", fontWeight: 300,
                fontSize: 13, color: '#6B6461', lineHeight: 1.6, flex: 1,
              }}>
                {t.blurb}
              </div>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                gap: 16, paddingTop: 12, borderTop: '1px solid #F1EDE9',
              }}>
                <div className="la-display" style={{ fontSize: 14, color: '#16110E', fontWeight: 500 }}>
                  {t.price}
                </div>
                <div style={{
                  fontFamily: 'ui-monospace, Menlo, monospace',
                  fontSize: 11, color: '#8A7F78',
                }}>
                  {t.duration}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </StepFrame>
);

// Step 3 — Empty state fallback (separate mini-layout)
const Step3Empty = () => (
  <StepFrame label="State · Empty / No Matches">
    <StepHeader n={3} label="Results · Empty" required />
    <div style={{
      display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      gap: 24, flexWrap: 'wrap', marginBottom: 20,
    }}>
      <div>
        <div style={{
          fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 11,
          letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8A7F78',
          marginBottom: 10,
        }}>
          0 matches
        </div>
        <h3
          className="la-display"
          style={{
            fontSize: 32, textTransform: 'uppercase', color: '#16110E',
            fontWeight: 500, lineHeight: 1.05, margin: 0,
          }}
        >
          No Direct Match
        </h3>
      </div>
    </div>
    <div style={{
      background: '#FEFDF7', borderRadius: 10, padding: 40,
      textAlign: 'center', border: '1px solid #E8E1D8',
    }}>
      <div className="la-display" style={{
        fontSize: 22, textTransform: 'uppercase', color: '#2B211B',
        fontWeight: 500, marginBottom: 10,
      }}>
        Not Sure What You Need?
      </div>
      <p style={{
        fontFamily: "'Montserrat', sans-serif", fontWeight: 300,
        fontSize: 14, color: '#6B6461', maxWidth: 460,
        margin: '0 auto 22px', lineHeight: 1.7,
      }}>
        That's what a consultation is for. Our medical team will walk through options in
        person, no pressure.
      </p>
      <button style={baseBtn} className="la-btn-primary">Book Consultation</button>
    </div>
  </StepFrame>
);

// Fused alternative — Step 1 + Step 2 on a single screen
const FusedAlt = () => (
  <StepFrame label="Alternative · Fused 1+2 Into A Single Screen">
    <div style={{
      display: 'flex', alignItems: 'baseline', gap: 14,
      marginBottom: 18, paddingBottom: 14, borderBottom: '1px solid #D4C8B8',
    }}>
      <span className="la-display" style={{
        fontSize: 13, letterSpacing: '0.16em', textTransform: 'uppercase',
        color: '#16110E', fontWeight: 500,
      }}>
        Step 1 of 2 · Concern + Area
      </span>
      <span style={{
        fontFamily: 'ui-monospace, Menlo, monospace',
        fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase',
        color: '#8A3A30',
      }}>
        Area row optional
      </span>
    </div>
    <h3 className="la-display" style={{
      fontSize: 32, textTransform: 'uppercase', color: '#16110E',
      fontWeight: 500, lineHeight: 1.05, margin: '0 0 10px',
    }}>
      Tell Us What You'd<br />Like To Address
    </h3>
    <p style={{
      fontFamily: "'Montserrat', sans-serif", fontWeight: 300,
      fontSize: 14, color: '#464646', lineHeight: 1.7, maxWidth: 560,
      margin: '0 0 28px',
    }}>
      One screen instead of two. Concern is required, area narrows the result set but can be
      left blank. Recommended when analytics show a high drop-off on a separate Step 2 screen.
    </p>

    <div style={{
      fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 10.5,
      letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8A7F78',
      marginBottom: 10,
    }}>
      Concern · required
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
      {CONCERNS.slice(0, 6).map((c, i) => (
        <div key={c.v} className={`la-check-card ${i < 2 ? 'checked' : ''}`}>
          <div className="la-check" />
          <div>
            <div className="la-display" style={{
              fontSize: 14, textTransform: 'uppercase', color: '#2B211B', fontWeight: 500,
            }}>
              {c.label}
            </div>
          </div>
        </div>
      ))}
    </div>

    <div style={{
      fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 10.5,
      letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8A7F78',
      marginBottom: 10,
    }}>
      Area · Optional — Inline Pill Row
    </div>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
      {AREAS.map((a, i) => (
        <button
          key={a.v}
          style={{
            fontFamily: "'Figtree', sans-serif", fontWeight: 500,
            fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '10px 18px', borderRadius: 999,
            border: `1px solid ${i === 0 ? '#F1AC32' : '#E8E1D8'}`,
            background: i === 0 ? '#FFF0D4' : 'transparent',
            color: '#2B211B', cursor: 'pointer',
          }}
        >
          {a.label}
        </button>
      ))}
    </div>

    <button style={baseBtn} className="la-btn-primary">See Matches →</button>
  </StepFrame>
);

const FinderSection = () => (
  <Section num="08" kicker="Components" title="Concern-Based Finder" id="finder">
    <SpecLabel>The Conversion Unit, Part Two</SpecLabel>
    <Rationale>
      The finder replaces the 4-level mega menu as the primary discovery surface. Three steps:
      pick concerns, optionally pick an area, see matching treatments. Step 2 is skippable.
      Results use the same tag tokens used throughout the system. The empty state routes to
      consultation — the correct fallback for a medical-led service.
    </Rationale>
    <Rationale>
      Below, all three steps are stacked as static documentation so each pattern is visible
      simultaneously. A fused alternative that collapses Steps 1 and 2 into one screen is
      shown at the end for consideration.
    </Rationale>

    <Step1 />
    <Step2 />
    <Step3 />
    <Step3Empty />

    <div style={{ height: 48 }} />
    <SpecLabel state="For consideration">Alternative · Fused Flow</SpecLabel>
    <Rationale>
      Step 2 already carries an explicit skip affordance, which is a signal the screen may not
      be earning its own step. This fused version puts concern (required) and area (optional
      pill row) on a single screen, cutting the flow to two steps. Worth A/B testing once the
      finder has real traffic.
    </Rationale>
    <FusedAlt />
  </Section>
);

window.FinderSection = FinderSection;
