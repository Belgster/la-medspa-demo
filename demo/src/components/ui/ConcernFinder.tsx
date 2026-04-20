import * as React from 'react';
import { Button } from './Button';
import { ConcernCheckCard, RadioCard } from './FormControls';
import { TreatmentCard, type CategoryKey } from './TreatmentCard';

/**
 * ConcernFinder — the conversion unit.
 * Three steps: Concern (required) → Area (optional) → Results.
 * Step 2 is skippable. Results use the same category tag tokens as the rest of the system.
 * 0-match empty state routes to consultation.
 */

export interface Concern { v: string; label: string; meta: string; }
export interface Area    { v: string; label: string; meta: string; }
export interface FinderTreatment {
  name: string;
  cats: CategoryKey[];
  concerns: string[];
  areas: string[];
  /** Optional. The wrapping TreatmentCard hides the "From" column when absent. */
  price?: string;
  duration: string;
  blurb: string;
}

interface ConcernFinderProps {
  concerns: Concern[];
  areas: Area[];
  treatments: FinderTreatment[];
  /** External booking URL — opens in a new tab. Astro islands can't serialize
   *  function props across the SSR boundary, so we take a string and window.open. */
  bookHref: string;
}

export const ConcernFinder: React.FC<ConcernFinderProps> = ({
  concerns, areas, treatments, bookHref,
}) => {
  const book = () => window.open(bookHref, '_blank', 'noopener,noreferrer');
  const [step, setStep] = React.useState<1 | 2 | 3>(1);
  const [picked, setPicked] = React.useState<Set<string>>(new Set());
  const [area, setArea] = React.useState<string | null>(null);

  const toggle = (v: string) =>
    setPicked((prev) => {
      const n = new Set(prev);
      n.has(v) ? n.delete(v) : n.add(v);
      return n;
    });

  const matches = treatments.filter((t) => {
    const areaOk = !area || t.areas.includes(area);
    const concernOk = picked.size === 0 || t.concerns.some((c) => picked.has(c));
    return areaOk && concernOk;
  });

  const reset = () => { setPicked(new Set()); setArea(null); setStep(1); };

  return (
    <div className="bg-beige rounded-[14px] p-stack">
      {/* Progress */}
      <div className="flex items-center gap-[16px] mb-stack flex-wrap">
        {[
          { n: 1, label: 'Concern' },
          { n: 2, label: 'Area' },
          { n: 3, label: 'Results' },
        ].map((s, i) => (
          <React.Fragment key={s.n}>
            <button
              onClick={() => setStep(s.n as 1|2|3)}
              disabled={s.n === 3 && picked.size === 0 && !area}
              className="flex items-center gap-[10px] bg-transparent border-none cursor-pointer p-0 disabled:cursor-not-allowed"
            >
              <span
                className={
                  'w-[28px] h-[28px] rounded-pill flex items-center justify-center ' +
                  'font-display font-medium text-[12px] transition-all duration-la-base ease-la-ease ' +
                  (step >= s.n
                    ? 'bg-gold border border-gold text-ink'
                    : 'bg-transparent border border-[#B8A898] text-charcoal-soft')
                }
              >
                {s.n}
              </span>
              <span
                className={
                  'font-display font-medium text-[12px] uppercase tracking-[0.14em] ' +
                  (step >= s.n ? 'text-ink' : 'text-charcoal-soft')
                }
              >
                {s.label}
              </span>
            </button>
            {i < 2 && <span className="flex-1 max-w-[80px] h-[1px] bg-[#D4C8B8]" />}
          </React.Fragment>
        ))}
      </div>

      {step === 1 && (
        <div className="animate-la-fade-rise">
          <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-charcoal-soft mb-[14px]">
            Step 1 of 3
          </div>
          <h3 className="font-display font-medium uppercase text-ink leading-[1.05] m-0 mb-[12px] text-[clamp(28px,3vw,40px)]">
            What Would You Like<br />To Address?
          </h3>
          <p className="font-body font-light text-[15px] text-charcoal leading-[1.75] max-w-[520px] m-0 mb-card">
            Pick one or a few. We'll show you the treatments that best address these concerns.
          </p>
          <div className="grid grid-cols-3 gap-[12px] mb-card">
            {concerns.map((c) => (
              <ConcernCheckCard
                key={c.v}
                checked={picked.has(c.v)}
                onToggle={() => toggle(c.v)}
                label={c.label}
                meta={c.meta}
              />
            ))}
          </div>
          <div className="flex gap-[14px] items-center">
            <Button variant="primary" onClick={() => setStep(2)} disabled={picked.size === 0}>
              Continue →
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setStep(2)}>
              Skip — I'll browse by area
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-la-fade-rise">
          <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-charcoal-soft mb-[14px]">
            Step 2 of 3 · Optional
          </div>
          <h3 className="font-display font-medium uppercase text-ink leading-[1.05] m-0 mb-[12px] text-[clamp(28px,3vw,40px)]">
            Where Would You<br />Like To Focus?
          </h3>
          <p className="font-body font-light text-[15px] text-charcoal leading-[1.75] max-w-[520px] m-0 mb-card">
            Optional. Pick an area if you already know — otherwise we'll show everything that matches your concerns.
          </p>
          <div className="grid grid-cols-3 gap-[12px] mb-card">
            {areas.map((a) => (
              <RadioCard
                key={a.v}
                selected={area === a.v}
                onSelect={() => setArea(area === a.v ? null : a.v)}
                label={a.label}
                meta={a.meta}
              />
            ))}
          </div>
          <div className="flex gap-[14px]">
            <Button variant="secondary" onClick={() => setStep(1)}>← Back</Button>
            <Button variant="primary" onClick={() => setStep(3)}>See Matches →</Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="animate-la-fade-rise">
          <div className="flex items-end justify-between gap-[24px] flex-wrap mb-[28px]">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-charcoal-soft mb-[10px]">
                {matches.length} match{matches.length === 1 ? '' : 'es'}
              </div>
              <h3 className="font-display font-medium uppercase text-ink leading-[1.05] m-0 text-[clamp(28px,3vw,40px)]">
                Recommended<br />For You
              </h3>
            </div>
            <Button variant="ghost" size="sm" onClick={reset}>Start Over ↻</Button>
          </div>

          {/* Active filter chips */}
          <div className="flex gap-[8px] flex-wrap mb-[28px]">
            {[...picked].map((c) => {
              const cc = concerns.find((x) => x.v === c);
              return (
                <span
                  key={c}
                  className="bg-cream border border-hairline text-brown px-[14px] py-[6px] rounded-pill font-display font-medium text-[11px] uppercase tracking-[0.1em] inline-flex items-center gap-[8px]"
                >
                  {cc?.label}
                  <button onClick={() => toggle(c)} className="bg-transparent border-none p-0 cursor-pointer text-charcoal-soft text-[14px] leading-none">×</button>
                </span>
              );
            })}
            {area && (
              <span className="bg-gold-wash text-brown px-[14px] py-[6px] rounded-pill font-display font-medium text-[11px] uppercase tracking-[0.1em] inline-flex items-center gap-[8px]">
                Area · {areas.find((a) => a.v === area)?.label}
                <button onClick={() => setArea(null)} className="bg-transparent border-none p-0 cursor-pointer text-charcoal-soft text-[14px] leading-none">×</button>
              </span>
            )}
          </div>

          {matches.length === 0 ? (
            <div className="bg-cream rounded-card p-[40px] text-center border border-hairline">
              <div className="font-display font-medium text-[20px] uppercase text-brown mb-[8px]">
                Not Sure What You Need?
              </div>
              <p className="font-body font-light text-[14px] text-charcoal-soft max-w-[440px] m-0 mx-auto mb-[20px] leading-[1.7]">
                That's what a consultation is for. Our medical team will walk through options in person, no pressure.
              </p>
              <Button variant="primary" onClick={book}>Book Consultation</Button>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-[14px]">
              {matches.slice(0, 6).map((t) => (
                <TreatmentCard
                  key={t.name}
                  name={t.name}
                  categories={t.cats}
                  price={t.price}
                  duration={t.duration}
                  concerns={t.concerns}
                />
              ))}
            </div>
          )}

          <div className="mt-stack p-[28px] bg-cream rounded-card border border-hairline flex items-center justify-between gap-[24px] flex-wrap">
            <div>
              <div className="font-display font-medium text-[18px] uppercase text-brown mb-[4px]">Still Deciding?</div>
              <div className="font-body font-light text-[14px] text-charcoal-soft">A consultation is the shortest path to the right plan.</div>
            </div>
            <Button variant="primary" onClick={book}>Book Consultation →</Button>
          </div>
        </div>
      )}
    </div>
  );
};
