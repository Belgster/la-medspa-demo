import * as React from 'react';

interface Props {
  beforeAvif: string;
  beforeWebp: string;
  afterAvif: string;
  afterWebp: string;
  alt: string;
  caption: string;
}

export const BeforeAfterPair: React.FC<Props> = ({
  beforeAvif, beforeWebp, afterAvif, afterWebp, alt, caption,
}) => {
  const [pos, setPos] = React.useState(50);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const draggingRef = React.useRef(false);

  const updateFromClientX = React.useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft')       { e.preventDefault(); setPos((p) => Math.max(0, p - 2)); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); setPos((p) => Math.min(100, p + 2)); }
    else if (e.key === 'Home')       { e.preventDefault(); setPos(0); }
    else if (e.key === 'End')        { e.preventDefault(); setPos(100); }
  };

  return (
    <figure className="m-0">
      <div
        ref={containerRef}
        className="relative aspect-square rounded-card overflow-hidden border border-hairline select-none cursor-ew-resize touch-none bg-beige"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <picture>
          <source type="image/avif" srcSet={beforeAvif} />
          <img
            src={beforeWebp}
            alt={`${alt} — before`}
            className="block w-full h-full object-cover"
            draggable={false}
          />
        </picture>

        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
          aria-hidden="true"
        >
          <picture>
            <source type="image/avif" srcSet={afterAvif} />
            <img
              src={afterWebp}
              alt=""
              className="block w-full h-full object-cover"
              draggable={false}
            />
          </picture>
        </div>

        <span className="absolute top-[14px] left-[14px] bg-cream/90 backdrop-blur-sm border border-hairline rounded-pill px-[10px] py-[4px] font-display font-medium text-[10px] uppercase tracking-[0.18em] text-brown pointer-events-none">
          Before
        </span>
        <span className="absolute top-[14px] right-[14px] bg-cream/90 backdrop-blur-sm border border-hairline rounded-pill px-[10px] py-[4px] font-display font-medium text-[10px] uppercase tracking-[0.18em] text-brown pointer-events-none">
          After
        </span>

        <div
          aria-hidden="true"
          className="absolute inset-y-0 w-[2px] bg-cream pointer-events-none shadow-sm"
          style={{ left: `calc(${pos}% - 1px)` }}
        />

        <div
          role="slider"
          aria-label={`${alt} — drag to compare`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="absolute top-1/2 w-[44px] h-[44px] rounded-pill bg-cream border border-hairline shadow-md flex items-center justify-center gap-[4px] -translate-x-1/2 -translate-y-1/2 outline-none focus-visible:shadow-focus"
          style={{ left: `${pos}%` }}
        >
          <span aria-hidden="true" className="text-brown text-[12px] leading-none">◂</span>
          <span aria-hidden="true" className="text-brown text-[12px] leading-none">▸</span>
        </div>
      </div>
      <figcaption className="font-display font-medium text-[11px] uppercase tracking-[0.18em] text-charcoal-soft mt-comfort text-center">
        {caption}
      </figcaption>
    </figure>
  );
};
