"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Card with a radial highlight that follows the cursor. Coordinates are written
 * to CSS custom properties rather than React state so the effect never
 * re-renders and never costs a frame.
 */
export function SpotlightCard({
  children, className, as: As = "div",
}: { children: ReactNode; className?: string; as?: "div" | "article" | "li" }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <As
      ref={ref as never}
      onPointerMove={(e: React.PointerEvent) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className={cn(
        "spotlight group relative min-w-0 overflow-hidden rounded-2xl border border-border bg-surface p-5 transition-all duration-300 sm:p-6",
        "hover:-translate-y-1 hover:border-accent/35 hover:shadow-lift",
        className,
      )}
    >
      {children}
    </As>
  );
}
