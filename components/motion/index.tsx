"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useHasBeenSeen } from "./useHasBeenSeen";
import { useReducedMotion } from "./useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * Scroll-triggered reveal, driven by `useHasBeenSeen` rather than framer's
 * `whileInView`. The difference matters: `whileInView` with `once: true` can
 * miss fast scrolls and leave the section stuck at opacity 0 forever, which
 * hides real content. This resolves in that case instead.
 */
export function Reveal({
  children, delay = 0, className, y = 18,
}: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { seen, immediate } = useHasBeenSeen(ref, { disabled: !!reduced });

  if (reduced) return <div className={className}>{children}</div>;

  // Transform only — deliberately no opacity fade.
  //
  // A fade renders text at partial opacity for the duration of the animation,
  // and at the low end our muted greys drop below the 4.5:1 contrast floor
  // while it runs. Sliding into place is GPU-cheap, reads just as well, and
  // never makes content unreadable at any frame.
  //
  // `immediate` covers content already on screen at load, which should simply
  // be there rather than animate at all — so it gets no transition and snaps.
  //
  // A plain div with a CSS transition rather than `motion.div`: identical
  // output, and it keeps framer-motion off the critical path.
  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: seen ? "translateY(0)" : `translateY(${y}px)`,
        transition: immediate
          ? undefined
          : `transform 0.55s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: seen ? undefined : "transform",
      }}
    >
      {children}
    </div>
  );
}

/**
 * Parses a display string into an animatable number plus its prefix/suffix.
 * Returns null for anything that should not animate.
 */
function parseCountValue(value: string) {
  // Ranges ("5–10%", "2–4 weeks", "35–45") read badly when only the first
  // number animates, so they are rendered as-is.
  if (/\d\s*[–—-]\s*\d/.test(value)) return null;

  const m = value.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!m) return null;

  const [, prefix, raw, suffix] = m;
  const target = parseFloat(raw.replace(/,/g, ""));
  if (!Number.isFinite(target)) return null;

  const decimals = (raw.split(".")[1] ?? "").length;
  const grouped = raw.includes(",");

  const format = (n: number) => {
    const body = grouped
      ? n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
      : n.toFixed(decimals);
    return `${prefix}${body}${suffix}`;
  };

  return { target, format, zero: format(0) };
}

/**
 * Counts up once when scrolled into view, then lands exactly on the source
 * string so the final rendered text always matches the data.
 *
 * The dependency array holds primitives only. An earlier version passed the
 * result of `value.match()` as a dependency — a fresh array on every render —
 * which cancelled and restarted the animation on every frame, so counters
 * froze a few percent above zero and never resolved.
 */
export function CountUp({
  value, className, duration = 1600,
}: { value: string; className?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const { seen: inView } = useHasBeenSeen(ref, { disabled: !!reduced });
  // Initialised to `value` so the server and first client render agree.
  const [display, setDisplay] = useState(value);

  /* eslint-disable react-hooks/set-state-in-effect --
     The counter is driven by requestAnimationFrame, an external system. Each
     setDisplay is either a frame of that animation or the terminal value it
     lands on; none of it can be computed during render. The early returns are
     the non-animating cases (reduced motion, unparseable values, not yet
     scrolled to) and must still set the displayed string. */
  useEffect(() => {
    if (reduced) { setDisplay(value); return; }

    const parsed = parseCountValue(value);
    if (!parsed) { setDisplay(value); return; }

    // Primed but not yet scrolled to: hold at zero rather than flashing the
    // final number and snapping back.
    if (!inView) { setDisplay(parsed.zero); return; }

    let frame = 0;
    const started = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - started) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      if (p < 1) {
        setDisplay(parsed.format(parsed.target * eased));
        frame = requestAnimationFrame(tick);
      } else {
        setDisplay(value); // land on the exact source string
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, value, duration]);
  /* eslint-enable react-hooks/set-state-in-effect */

  return (
    <span ref={ref} data-countup={value} className={className}>
      {display}
    </span>
  );
}

/** Continuous horizontal scroll. Pauses on hover; static under reduced motion. */
export function Marquee({ items, className }: { items: string[]; className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) {
    return (
      <div className={cn("flex flex-wrap justify-center gap-x-8 gap-y-3", className)}>
        {items.map((i) => (
          <span key={i} className="text-sm text-faint">{i}</span>
        ))}
      </div>
    );
  }
  return (
    <div
      className={cn("group relative overflow-hidden", className)}
      style={{
        maskImage: "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
      }}
    >
      <div className="flex w-max animate-marquee gap-10 group-hover:[animation-play-state:paused]">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="whitespace-nowrap text-sm font-500 text-faint">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
