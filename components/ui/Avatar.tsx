import { cn } from "@/lib/utils";

const PALETTES = [
  ["#0B3D91", "#3080FF"],
  ["#14B8A6", "#2EC4B6"],
  ["#3080FF", "#2EC4B6"],
  ["#0E8177", "#14B8A6"],
  ["#082B66", "#0B3D91"],
] as const;

/**
 * Deterministic gradient monogram. Testimonials need a face; using stock
 * photography for people who did not consent to it would be worse than none,
 * so this generates a distinctive mark from the person's own initials.
 */
export function Avatar({ name, className }: { name: string; className?: string }) {
  const initials = name
    .replace(/(Dr\.|Mr\.|Ms\.|Mrs\.)\s*/gi, "")
    .split(/[\s,]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

  const seed = [...name].reduce((a, c) => a + c.charCodeAt(0), 0);
  const [from, to] = PALETTES[seed % PALETTES.length];
  const id = `av-${seed}`;

  return (
    <span
      className={cn("relative inline-flex h-11 w-11 shrink-0 overflow-hidden rounded-full ring-1 ring-border", className)}
      aria-hidden="true"
    >
      <svg viewBox="0 0 44 44" className="h-full w-full">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
        </defs>
        <rect width="44" height="44" fill={`url(#${id})`} />
        <text
          x="50%" y="50%" dy="0.36em" textAnchor="middle"
          fill="#F8FAFC" fontSize="16" fontWeight="600"
          fontFamily="var(--font-instrument), system-ui, sans-serif"
        >
          {initials}
        </text>
      </svg>
    </span>
  );
}
