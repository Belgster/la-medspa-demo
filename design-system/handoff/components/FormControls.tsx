import * as React from 'react';

/**
 * Form controls — pill inputs, warm focus ring (#C98A1C), never default browser blue.
 * Error is warm terracotta (#A8553A).
 * Required states: default, hover, focus, filled, error.
 */

const inputBase =
  "w-full font-body font-light text-[15px] text-brown bg-cream " +
  "border border-hairline rounded-pill px-[22px] py-[14px] " +
  "placeholder:text-[#B8A898] outline-none " +
  "transition-all duration-la-base ease-la-ease " +
  "hover:border-[#D4C8B8] " +
  "focus:border-gold focus:shadow-focus";

const errorRing = "border-error focus:border-error focus:shadow-[0_0_0_3px_rgba(168,85,58,0.15)]";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}
export const Input: React.FC<InputProps> = ({ error, className = '', ...rest }) => (
  <input className={`${inputBase} ${error ? errorRing : ''} ${className}`} {...rest} />
);

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}
export const Textarea: React.FC<TextareaProps> = ({ error, className = '', ...rest }) => (
  <textarea
    className={
      `${inputBase} rounded-[18px] resize-y min-h-[120px] py-[16px] ` +
      `${error ? errorRing : ''} ${className}`
    }
    {...rest}
  />
);

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}
export const Select: React.FC<SelectProps> = ({ error, className = '', children, ...rest }) => (
  <div className="relative">
    <select className={`${inputBase} appearance-none pr-[44px] ${error ? errorRing : ''} ${className}`} {...rest}>
      {children}
    </select>
    <span
      aria-hidden
      className="pointer-events-none absolute right-[22px] top-1/2 -translate-y-[75%] rotate-45 w-[8px] h-[8px] border-r-[1.5px] border-b-[1.5px] border-charcoal-soft"
    />
  </div>
);

export interface FieldProps {
  label: string;
  state?: string; // "Default" / "Error" / etc — surfaces in labels for spec-sheet handoff
  hint?: string;
  children: React.ReactNode;
}
export const Field: React.FC<FieldProps> = ({ label, state, hint, children }) => (
  <div className="flex flex-col gap-[8px]">
    <div className="flex items-baseline justify-between">
      <label className="font-display font-medium text-[11px] uppercase tracking-[0.14em] text-brown">
        {label}
      </label>
      {state && (
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-charcoal-soft">
          {state}
        </span>
      )}
    </div>
    {children}
    {hint && <div className="font-body font-light text-[12px] text-charcoal-soft">{hint}</div>}
  </div>
);

/** ConcernCheckCard — the control the Finder consumes. Full-card tap target, gold check on select. */
export interface ConcernCheckCardProps {
  checked: boolean;
  onToggle: () => void;
  label: string;
  meta?: string;
}
export const ConcernCheckCard: React.FC<ConcernCheckCardProps> = ({ checked, onToggle, label, meta }) => (
  <button
    type="button"
    onClick={onToggle}
    aria-pressed={checked}
    className={
      'group w-full flex items-start gap-[14px] px-[22px] py-[18px] text-left ' +
      'border rounded-[14px] cursor-pointer bg-cream ' +
      'transition-all duration-la-base ease-la-ease ' +
      'hover:bg-gold-wash hover:border-gold ' +
      (checked ? 'bg-gold-wash border-gold' : 'border-hairline')
    }
  >
    <span
      aria-hidden
      className={
        'relative flex-shrink-0 mt-[2px] w-[20px] h-[20px] rounded-[6px] ' +
        'flex items-center justify-center transition-all duration-la-base ease-la-ease ' +
        (checked ? 'bg-gold border-gold' : 'bg-cream border-[1.5px] border-[#B8A898]')
      }
    >
      {checked && (
        <span className="block w-[10px] h-[5px] border-l-2 border-b-2 border-ink -rotate-45 translate-x-[0.5px] -translate-y-[0.5px]" />
      )}
    </span>
    <span>
      <span className="block font-display font-medium text-[14px] uppercase text-brown">{label}</span>
      {meta && <span className="block font-body font-light text-[12px] text-charcoal-soft mt-[4px]">{meta}</span>}
    </span>
  </button>
);

/** RadioCard — Finder Step 2 single-select. */
export interface RadioCardProps {
  selected: boolean;
  onSelect: () => void;
  label: string;
  meta?: string;
}
export const RadioCard: React.FC<RadioCardProps> = ({ selected, onSelect, label, meta }) => (
  <button
    type="button"
    onClick={onSelect}
    aria-pressed={selected}
    className={
      'w-full flex items-start gap-[14px] px-[22px] py-[18px] text-left ' +
      'border rounded-[14px] cursor-pointer bg-cream ' +
      'transition-all duration-la-base ease-la-ease ' +
      'hover:bg-gold-wash hover:border-gold ' +
      (selected ? 'bg-gold-wash border-gold' : 'border-hairline')
    }
  >
    <span
      aria-hidden
      className={
        'relative flex-shrink-0 mt-[2px] w-[20px] h-[20px] rounded-pill border-[1.5px] ' +
        'transition-all duration-la-base ease-la-ease ' +
        (selected ? 'border-gold' : 'border-[#B8A898]')
      }
    >
      {selected && <span className="absolute inset-[3px] rounded-pill bg-gold" />}
    </span>
    <span>
      <span className="block font-display font-medium text-[15px] uppercase text-brown">{label}</span>
      {meta && <span className="block font-body font-light text-[12px] text-charcoal-soft mt-[4px]">{meta}</span>}
    </span>
  </button>
);
