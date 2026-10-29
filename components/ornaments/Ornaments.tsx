/**
 * Decorative SVG ornaments: Mughal arch, floral rosette, dividers and corners.
 * All are purely decorative and hidden from assistive technology.
 */

type SvgProps = { className?: string };

const GOLD = "url(#gold-stroke)";

/** Shared gradient definitions; render once near the top of the page. */
export function OrnamentDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="gold-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#A07D45" />
          <stop offset="50%" stopColor="#E2CA96" />
          <stop offset="100%" stopColor="#A07D45" />
        </linearGradient>
        <linearGradient id="violet-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A27AD2" />
          <stop offset="100%" stopColor="#563285" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function RosettePaths({ petal = "url(#violet-fill)" }: { petal?: string }) {
  return (
    <g>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((r) => (
        <path
          key={r}
          d="M24 24 C20 17 21 9 24 4 C27 9 28 17 24 24 Z"
          transform={`rotate(${r} 24 24)`}
          fill={petal}
          fillOpacity={r % 90 === 0 ? 0.9 : 0.55}
          stroke={GOLD}
          strokeWidth="0.6"
        />
      ))}
      <circle cx="24" cy="24" r="4.2" fill="#fff" stroke={GOLD} strokeWidth="1.2" />
      <circle cx="24" cy="24" r="1.6" fill="#BF9A5C" />
    </g>
  );
}

/** Eight-petal rosette, the recurring floral motif. */
export function Rosette({ className, petal }: SvgProps & { petal?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <RosettePaths petal={petal} />
    </svg>
  );
}

/**
 * Mughal (ogee) arch frame that fills its relatively positioned parent.
 * The cap keeps a fixed aspect ratio so the curve never distorts; only the
 * straight sides stretch with the content. Cap height = 54% of the width.
 */
export function ArchFrame({ className = "", fill, inner = "#C5A8E5" }: SvgProps & { fill?: string; inner?: string }) {
  const stroke = { fill: "none", vectorEffect: "non-scaling-stroke" as const };
  return (
    <div className={`pointer-events-none absolute inset-0 flex flex-col ${className}`} aria-hidden="true">
      <svg viewBox="0 0 400 216" preserveAspectRatio="none" className="block aspect-[400/216] w-full shrink-0" focusable="false">
        {fill && <path d="M6 217 C6 128 118 104 200 6 C282 104 394 128 394 217 Z" fill={fill} />}
        <path d="M6 216 C6 128 118 104 200 6 C282 104 394 128 394 216" stroke={GOLD} strokeWidth="1.6" {...stroke} />
        <path d="M20 216 C20 142 126 118 200 30 C274 118 380 142 380 216" stroke={inner} strokeWidth="1" {...stroke} />
        <path d="M30 216 C30 150 132 128 200 46 C268 128 370 150 370 216" stroke={GOLD} strokeWidth="0.8" strokeDasharray="2 5" {...stroke} />
      </svg>
      <svg viewBox="0 0 400 100" preserveAspectRatio="none" className="-mt-px block w-full flex-1" focusable="false">
        {fill && <rect x="6" y="0" width="388" height="100" fill={fill} />}
        <path d="M6 0 V100 M394 0 V100" stroke={GOLD} strokeWidth="1.6" {...stroke} />
        <path d="M20 0 V100 M380 0 V100" stroke={inner} strokeWidth="1" {...stroke} />
        <path d="M30 0 V100 M370 0 V100" stroke={GOLD} strokeWidth="0.8" strokeDasharray="2 5" {...stroke} />
        <path d="M6 99.5 H394" stroke={GOLD} strokeWidth="1.6" {...stroke} />
      </svg>
    </div>
  );
}

/** Horizontal floral divider with a central rosette and trailing vines. */
export function FloralDivider({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 320 40" className={className} aria-hidden="true" focusable="false">
      <g fill="none" stroke={GOLD} strokeWidth="1" strokeLinecap="round">
        <path d="M8 20 H120" />
        <path d="M200 20 H312" />
        <path d="M120 20 C128 10 138 10 142 16" />
        <path d="M200 20 C192 30 182 30 178 24" />
        <path d="M70 20 C76 12 86 12 88 18" />
        <path d="M250 20 C244 28 234 28 232 22" />
      </g>
      <g fill="#C5A8E5">
        <ellipse cx="96" cy="15" rx="5" ry="2.2" transform="rotate(-25 96 15)" />
        <ellipse cx="224" cy="25" rx="5" ry="2.2" transform="rotate(-25 224 25)" />
        <ellipse cx="40" cy="24" rx="4" ry="1.8" transform="rotate(20 40 24)" />
        <ellipse cx="280" cy="16" rx="4" ry="1.8" transform="rotate(20 280 16)" />
      </g>
      <circle cx="8" cy="20" r="2" fill="#BF9A5C" />
      <circle cx="312" cy="20" r="2" fill="#BF9A5C" />
      <g transform="translate(142 2) scale(0.75)">
        <RosettePaths />
      </g>
    </svg>
  );
}

/** A floral corner flourish; rotate/flip with CSS for each corner. */
export function CornerFlourish({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" focusable="false">
      <g fill="none" stroke={GOLD} strokeWidth="1.1" strokeLinecap="round">
        <path d="M4 116 V40 C4 18 18 4 40 4 H116" />
        <path d="M14 116 V46 C14 28 28 14 46 14 H116" strokeOpacity="0.6" />
        <path d="M24 60 C24 38 38 24 60 24" />
        <path d="M40 40 C52 46 58 56 56 70" />
        <path d="M40 40 C46 52 56 58 70 56" />
      </g>
      <g fill="#C5A8E5" fillOpacity="0.85">
        <path d="M40 40 C30 34 28 24 34 18 C40 24 44 32 40 40 Z" />
        <path d="M40 40 C34 30 24 28 18 34 C24 40 32 44 40 40 Z" />
      </g>
      <circle cx="40" cy="40" r="3.4" fill="#fff" stroke={GOLD} strokeWidth="1" />
      <circle cx="116" cy="4" r="2" fill="#BF9A5C" />
      <circle cx="4" cy="116" r="2" fill="#BF9A5C" />
    </svg>
  );
}

/** Four corner flourishes positioned inside a relatively positioned parent. */
export function Corners({ size = "h-16 w-16 sm:h-24 sm:w-24" }: { size?: string }) {
  return (
    <>
      <CornerFlourish className={`pointer-events-none absolute right-2 top-2 -scale-x-100 ${size}`} />
      <CornerFlourish className={`pointer-events-none absolute left-2 top-2 ${size}`} />
      <CornerFlourish className={`pointer-events-none absolute bottom-2 right-2 rotate-180 ${size}`} />
      <CornerFlourish className={`pointer-events-none absolute bottom-2 left-2 -scale-y-100 ${size}`} />
    </>
  );
}

/** Small hanging lantern/drop finial used at the top of arches. */
export function Finial({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 24 48" className={className} aria-hidden="true" focusable="false">
      <path d="M12 0 V14" stroke={GOLD} strokeWidth="1" />
      <path d="M12 14 C20 22 18 32 12 40 C6 32 4 22 12 14 Z" fill="url(#violet-fill)" stroke={GOLD} strokeWidth="0.8" />
      <circle cx="12" cy="44" r="2.4" fill="#BF9A5C" />
    </svg>
  );
}

/** Mehndi motif: a stylised henna leaf cluster. */
export function HennaIcon({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <g stroke={GOLD} strokeWidth="1" fill="url(#violet-fill)">
        <path d="M32 58 C30 44 31 30 32 16" fill="none" />
        <path d="M32 18 C24 12 24 4 32 2 C40 4 40 12 32 18 Z" />
        <path d="M32 32 C22 32 16 24 18 18 C26 18 32 24 32 32 Z" fillOpacity="0.75" />
        <path d="M32 32 C42 32 48 24 46 18 C38 18 32 24 32 32 Z" fillOpacity="0.75" />
        <path d="M32 46 C22 46 16 40 16 34 C24 34 31 38 32 46 Z" fillOpacity="0.55" />
        <path d="M32 46 C42 46 48 40 48 34 C40 34 33 38 32 46 Z" fillOpacity="0.55" />
      </g>
    </svg>
  );
}

/** Baraat motif: a domed pavilion (chhatri). */
export function PavilionIcon({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <g stroke={GOLD} strokeWidth="1" strokeLinejoin="round">
        <path d="M32 4 V10" fill="none" />
        <path d="M14 26 C14 16 24 10 32 10 C40 10 50 16 50 26 Z" fill="url(#violet-fill)" />
        <path d="M10 26 H54 V30 H10 Z" fill="#E2CA96" />
        <path d="M14 30 V56 M50 30 V56" fill="none" />
        <path d="M20 56 V42 C20 36 26 32 32 32 C38 32 44 36 44 42 V56" fill="#F0E7FA" />
        <path d="M8 58 H56" fill="none" />
      </g>
      <circle cx="32" cy="4" r="2" fill="#BF9A5C" />
    </svg>
  );
}
