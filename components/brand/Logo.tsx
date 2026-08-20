import { cn } from "@/lib/utils";

/**
 * Rebuilt as inline SVG. The reference shipped a 3428x1104 PNG with a baked
 * white background and JPEG artifacts — unusable on a dark canvas, and 640KB.
 * This is ~2KB, crisp at any size, and inherits theme colors.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={cn("h-8 w-8", className)} aria-hidden="true">
      <defs>
        <linearGradient id="mx-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3080FF" />
          <stop offset="100%" stopColor="#0B3D91" />
        </linearGradient>
        <linearGradient id="mx-b" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#14B8A6" />
          <stop offset="100%" stopColor="#2EC4B6" />
        </linearGradient>
      </defs>
      {/* interlocking rounded squares forming an abstract cross */}
      <rect x="17" y="2" width="14" height="17" rx="5" fill="url(#mx-a)" />
      <rect x="2" y="17" width="17" height="14" rx="5" fill="url(#mx-b)" opacity="0.95" />
      <rect x="29" y="17" width="17" height="14" rx="5" fill="url(#mx-a)" />
      <rect x="17" y="29" width="14" height="17" rx="5" fill="url(#mx-b)" opacity="0.95" />
      <rect x="17" y="17" width="14" height="14" rx="4" fill="#0B3D91" />
      <path d="M24 20.5v7M20.5 24h7" stroke="#2EC4B6" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ className, showWord = true }: { className?: string; showWord?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      {showWord && (
        <span className="font-display text-[1.35rem] font-700 tracking-[-0.04em] text-ink">
          Vizora
        </span>
      )}
    </span>
  );
}
