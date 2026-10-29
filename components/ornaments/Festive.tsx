/**
 * Festive decorations: hanging pearl garlands, fairy lights, falling
 * petals, the wax seal and the scalloped bunting band. All decorative.
 */

/**
 * Strands of pearls with amethyst drops, longer at the edges like a jhoomar
 * curtain. Each swag scales to the container's height (so every strand and
 * its drop stays visible) and swags repeat across wide screens.
 */
export function PearlGarland({ className = "", strands = 15 }: { className?: string; strands?: number }) {
  return (
    <div className={`pointer-events-none flex justify-center overflow-hidden ${className}`} aria-hidden="true">
      {Array.from({ length: 9 }, (_, k) => (
        <GarlandSwag key={k} strands={strands} />
      ))}
    </div>
  );
}

function GarlandSwag({ strands }: { strands: number }) {
  const mid = (strands - 1) / 2;
  const gap = 400 / strands;
  return (
    <svg viewBox="0 0 400 190" preserveAspectRatio="xMidYMin meet" className="aspect-[400/190] h-full w-auto shrink-0" focusable="false">
      <defs>
        <radialGradient id="pearl" cx="35%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#F1ECF7" />
          <stop offset="100%" stopColor="#CFC3DE" />
        </radialGradient>
        <radialGradient id="amethyst" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#D9C2F2" />
          <stop offset="45%" stopColor="#8154BC" />
          <stop offset="100%" stopColor="#3B1F63" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="400" height="5" fill="#BF9A5C" />
      {Array.from({ length: strands }, (_, i) => {
        const x = gap / 2 + i * gap;
        const count = 2 + Math.round(Math.abs(i - mid) * 1.55);
        return (
          <g key={i} className="garland-strand" style={{ animationDelay: `${(i % 5) * -0.9}s` }}>
            {Array.from({ length: count }, (_, j) => (
              <circle
                key={j}
                cx={x}
                cy={12 + j * 10}
                r={j % 4 === 3 ? 2.6 : 4.4}
                fill={j % 4 === 3 ? "#D2B278" : "url(#pearl)"}
              />
            ))}
            <circle cx={x} cy={12 + count * 10 + 2} r="7.5" fill="url(#amethyst)" />
            <circle cx={x - 2.2} cy={12 + count * 10 - 0.5} r="1.8" fill="#fff" fillOpacity="0.7" />
          </g>
        );
      })}
    </svg>
  );
}

/** A sagging string of twinkling bulbs. */
export function FairyLights({ className = "", color = "#F7EFDD" }: { className?: string; color?: string }) {
  const segments: [number, number][][] = [
    [[0, 8], [100, 70], [200, 8]],
    [[200, 8], [300, 70], [400, 8]],
  ];
  const bulbs: { x: number; y: number }[] = [];
  for (const [p0, p1, p2] of segments) {
    for (let t = 0.08; t < 1; t += 0.12) {
      const u = 1 - t;
      bulbs.push({
        x: u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0],
        y: u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1] + 5,
      });
    }
  }
  return (
    <svg viewBox="0 0 400 90" preserveAspectRatio="none" className={`pointer-events-none ${className}`} aria-hidden="true" focusable="false">
      <path d="M0 8 Q100 70 200 8 Q300 70 400 8" fill="none" stroke="#BF9A5C" strokeOpacity="0.7" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      {bulbs.map((b, i) => (
        <g key={i} className="twinkle" style={{ animationDelay: `${(i * 0.37) % 2.4}s` }}>
          <circle cx={b.x} cy={b.y} r="5" fill={color} fillOpacity="0.25" />
          <circle cx={b.x} cy={b.y} r="2" fill={color} />
        </g>
      ))}
    </svg>
  );
}

type PetalSpec = { left: number; delay: number; duration: number; size: number; color: number; round: boolean };

// Deterministic pseudo-random layout so server and client render identically.
function petalLayout(count: number, colors: number): PetalSpec[] {
  return Array.from({ length: count }, (_, i) => {
    const r = (n: number) => ((Math.sin((i + 1) * n) + 1) / 2) % 1;
    return {
      left: Math.round(r(12.9898) * 96) + 2,
      delay: Math.round(r(78.233) * 140) / 10,
      duration: 11 + Math.round(r(39.425) * 10),
      size: 7 + Math.round(r(4.1414) * 9),
      color: i % colors,
      round: i % 3 === 0,
    };
  });
}

/** Petals drifting down inside the parent (which needs `relative overflow-hidden`). */
export function FallingPetals({ colors, count = 14 }: { colors: string[]; count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {petalLayout(count, colors.length).map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${p.left}%`,
            animationDelay: `${-p.delay}s`,
            animationDuration: `${p.duration}s`,
            width: p.size,
            height: p.round ? p.size : p.size * 1.5,
            background: colors[p.color],
            borderRadius: p.round ? "50%" : "50% 0 50% 0",
          }}
        />
      ))}
    </div>
  );
}

/** Gold wax-seal disc with the couple's monogram. */
export function Seal({ monogram, className = "" }: { monogram: readonly [string, string]; className?: string }) {
  return (
    <span
      className={`relative grid aspect-square place-items-center rounded-full shadow-[0_18px_40px_-12px_rgba(0,0,0,0.55),inset_0_-6px_14px_rgba(125,96,52,0.45),inset_0_6px_14px_rgba(255,255,255,0.55)] ${className}`}
      style={{ background: "radial-gradient(circle at 35% 30%, #FBF3DD 0%, #E2CA96 35%, #BF9A5C 70%, #8C6A33 100%)" }}
    >
      <span className="absolute inset-[9%] rounded-full border border-dashed border-gold-700/60" />
      <span className="absolute inset-[16%] rounded-full border border-gold-700/30" />
      <span className="relative font-script text-[2.6em] leading-none text-royal-900/85 drop-shadow-[0_1px_0_rgba(255,255,255,0.5)]">
        {monogram[0]}
        <span className="mx-[0.05em] text-[0.6em] text-gold-700">&amp;</span>
        {monogram[1]}
      </span>
    </span>
  );
}

/** Striped band with scallops hanging below, used to top the paper sections. */
export function ScallopBand({ dark = false }: { dark?: boolean }) {
  const a = dark ? "#2F1B4C" : "#6A3FA1";
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0">
      <div className="h-3" style={{ background: `repeating-linear-gradient(90deg, ${a} 0 14px, #fff 14px 28px)` }} />
      <div
        className="h-3"
        style={{
          background: `radial-gradient(circle at 50% 0, ${a} 0 9px, transparent 9.5px) 0 0 / 28px 12px repeat-x`,
        }}
      />
    </div>
  );
}
