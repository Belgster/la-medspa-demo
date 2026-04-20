import * as React from 'react';

/**
 * Button — pill, five required states (default, hover, focus-visible, active, disabled).
 * Primary inverts to transparent-with-gold-border on hover (not darken).
 */

type Variant = 'primary' | 'secondary' | 'ghost' | 'on-dark' | 'icon';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const base =
  "inline-flex items-center gap-[10px] font-display font-medium uppercase tracking-[0.12em] " +
  "rounded-pill border border-transparent whitespace-nowrap cursor-pointer " +
  "transition-all duration-la-base ease-la-ease " +
  "focus-visible:outline-none focus-visible:shadow-focus " +
  "disabled:cursor-not-allowed";

const sizes: Record<Size, string> = {
  sm: 'text-[11px] px-[20px] py-[10px]',
  md: 'text-[13px] px-[28px] py-[14px]',
  lg: 'text-[14px] px-[36px] py-[18px]',
};

const variants: Record<Variant, string> = {
  primary:
    'bg-gold text-ink border-gold ' +
    'hover:bg-transparent hover:text-brown hover:border-gold ' +
    'active:bg-gold-hover active:border-gold-hover ' +
    'disabled:bg-beige disabled:text-[#B8A898] disabled:border-beige',
  secondary:
    'bg-transparent text-brown border-brown ' +
    'hover:bg-brown hover:text-cream',
  ghost:
    'bg-transparent text-brown border-transparent px-[14px] ' +
    'hover:bg-gold-wash hover:text-ink',
  'on-dark':
    'bg-transparent text-cream border-cream ' +
    'hover:bg-gold hover:text-ink hover:border-gold',
  icon:
    'bg-cream border border-hairline rounded-pill w-[44px] h-[44px] p-0 justify-center text-brown ' +
    'hover:bg-gold-wash hover:border-gold',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}) => (
  <button
    className={`${base} ${variant === 'icon' ? '' : sizes[size]} ${variants[variant]} ${className}`}
    {...rest}
  >
    {children}
  </button>
);
